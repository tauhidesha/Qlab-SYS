"use server";

// Local interface for tool response filtering
interface ToolResponse {
  tool_call_id: string;
  role: 'tool';
  name: string;
  content: string;
}
// @file: src/ai/flows/cs-whatsapp-reply-flow.ts (REFACTORED - DENGAN AUTO-TRIGGER)

import type { ZoyaChatInput, WhatsAppReplyOutput } from '../../types/ai/cs-whatsapp-reply';
import type { Session, LastInteractionObject } from '../../types/ai';
// ToolResponse type is now local to this file
import { getSession, updateSession } from '../utils/session';
import { mapTermToOfficialService } from '../handlers/routes/lib/classifiers/mapTermToOfficialService';
import { searchKnowledgeBaseTool } from '../tools/searchKnowledgeBaseTool';
import { processCart } from '../agent/cartAgent';
import { runZoyaAIAgent } from '../agent/runZoyaAIAgent';
import { isInterventionLockActive } from '../utils/interventionLock';
import { notifyBosMamat, setSnoozeMode } from '../utils/humanHandoverTool';
import daftarUkuranMotor from '../../data/daftarUkuranMotor';
import { masterPrompt } from '../config/aiPrompts';
import admin from 'firebase-admin';
import { traceable } from 'langsmith/traceable';
import { manageSessionState } from '../agent/sessionAgent';
// START: Perubahan 1 - Import tool yang akan di-trigger
import { getServiceDescriptionTool } from '../tools/getServiceDescriptionTool';
// END: Perubahan 1

function normalizeSenderNumber(raw: string): string {
  return raw?.replace(/@c\.us$/, '') || '';
}

export const generateWhatsAppReply = traceable(async function generateWhatsAppReply(
  input: ZoyaChatInput
): Promise<WhatsAppReplyOutput | null> {
  
  // ==================================================================
  // TAHAP 1: SETUP & KONDISI AWAL
  // ==================================================================
  const senderNumber = normalizeSenderNumber(input.senderNumber || 'playground_user');
  let senderName = input.senderName || undefined;

  const isLocked = await isInterventionLockActive(senderNumber);
  if (isLocked) return null;

  let initialSession: Session | null = await getSession(senderNumber) as Session | null;
  if (initialSession?.snoozeUntil && Date.now() < initialSession.snoozeUntil) return null;
  
  if (!initialSession) {
    initialSession = {
      cartServices: [],
      inquiry: {},
      lastInteraction: { type: 'system', at: Date.now() },
      senderName,
      flow: 'general',
    };
  }

  // ==================================================================
  // TAHAP 2: PRE-PROCESSING (Deteksi Cepat & Mapping)
  // ==================================================================
  function detectMotorName(message: string): string | null {
    const normalizedMessage = message.toLowerCase();
    for (const motor of daftarUkuranMotor) {
      if (normalizedMessage.includes(motor.model.toLowerCase())) {
        return motor.model;
      }
      if (motor.aliases && Array.isArray(motor.aliases)) {
        for (const alias of motor.aliases) {
          if (normalizedMessage.includes(alias.toLowerCase())) {
            return motor.model;
          }
        }
      }
    }
    return null;
  }
  const detectedMotorName = detectMotorName(input.customerMessage);
  const mappedResult = await mapTermToOfficialService({ message: input.customerMessage, session: initialSession });
  if (!mappedResult) {
    await notifyBosMamat(senderNumber, input.customerMessage);
    return { suggestedReply: 'Waduh, Zoya lagi pusing nih. Zoya panggilin Bos Mamat aja ya!', route: 'fallback_handover', toolCalls: [] };
  }

  let knowledgeBaseAnswer: string | null = null;
  if (
    mappedResult.requestedServices.length === 1 &&
    mappedResult.requestedServices[0].serviceName === 'General Inquiry' 
  ) {
    const kbResult = await searchKnowledgeBaseTool.implementation({ query: input.customerMessage });
    if (kbResult.success && kbResult.answer) {
      knowledgeBaseAnswer = kbResult.answer;
    } else if (kbResult.message) {
      knowledgeBaseAnswer = kbResult.message;
    } else {
      knowledgeBaseAnswer = 'Maaf, belum ada jawaban di knowledge base.';
    }
  }

  // ==================================================================
  // TAHAP 3: UPDATE STATE SESI (Panggil Session Agent)
  // ==================================================================
  console.log('[Flow] Memanggil SessionAgent untuk mengelola state...');
  const isFirstMessage = !input.chatHistory || input.chatHistory.length === 0;
  if (isFirstMessage && !senderName) {
    try {
      const nameSnap = await admin.firestore()
        .doc(`directMessages/${senderNumber}/meta/info`)
        .get();
      const nameData = nameSnap.exists ? nameSnap.data() : undefined;
      if (nameData && nameData.name) {
        senderName = nameData.name;
        console.log('[Flow] Nama pengirim diambil dari Firestore:', senderName);
      }
    } catch (err) {
      console.warn('[Flow] Gagal mengambil nama pengirim dari Firestore:', err);
    }
  }
  let session = manageSessionState({
      currentSession: initialSession,
      customerMessage: input.customerMessage,
      detectedMotorName,
      mappedResult,
      isFirstMessage,
      senderName
  });

  // ==================================================================
  // START: Perubahan 2 - TAHAP 3.5: PROACTIVE TOOL CALL (Get Service Descriptions)
  // ==================================================================
  let serviceDescriptionContext = '';
  // Ambil deskripsi hanya untuk layanan yang baru terdeteksi dan bukan inquiry umum
  const servicesToDescribe = mappedResult.requestedServices.filter(
    s => s.serviceName !== 'General Inquiry' && s.serviceName !== 'Handover to Human'
  );

  if (servicesToDescribe.length > 0) {
    console.log(`[Flow] Auto-trigger: Mengambil deskripsi untuk layanan: ${servicesToDescribe.map(s => s.serviceName).join(', ')}`);
    
    const descriptionPromises = servicesToDescribe.map(service => 
      getServiceDescriptionTool.implementation({ service_name: service.serviceName })
    );
    const descriptionResults = await Promise.all(descriptionPromises);
    
    const successfulDescriptions = descriptionResults
      .filter(res => res.success && res.description)
      // Format deskripsi agar mudah dibaca oleh AI
      .map(res => `### Deskripsi Layanan: ${res.matched_service}\n${res.description}`);

    if (successfulDescriptions.length > 0) {
      // Siapkan konteks ini untuk diberikan ke AI Utama
      serviceDescriptionContext = `[KONTEKS TAMBAHAN DARI SISTEM]:\n${successfulDescriptions.join('\n\n')}\n------\n\n`;
    }
  }
  // END: Perubahan 2
  // ==================================================================


  // ==================================================================
  // TAHAP 4: PERSIAPAN KONTEKS (Berdasarkan State Sesi yang Baru)
  // ==================================================================
  let contextNoteForMainAI = '';

  const initialClarificationServices = mappedResult.requestedServices.filter(item => item.status === 'clarification_needed');
  const confirmedServices = mappedResult.requestedServices.filter(item => item.status === 'confirmed');
  const generalIntent = mappedResult.requestedServices[0];

  const pendingClarifications = initialClarificationServices.filter(service => {
    return service.missingInfo.some(infoNeeded => {
      if (infoNeeded === 'color' || infoNeeded === 'specific_part') {
        const details = session.inquiry.repaintDetails?.[service.serviceName];
        return !details || !details[infoNeeded];
      }
      if (infoNeeded === 'finish') {
        const details = session.inquiry.detailingDetails?.[service.serviceName];
        return !details || !details.finish;
      }
      return true;
    });
  }).map(service => {
    const stillMissing = service.missingInfo.filter(infoNeeded => {
      if (infoNeeded === 'color' || infoNeeded === 'specific_part') {
        const details = session.inquiry.repaintDetails?.[service.serviceName];
        return !details || !details[infoNeeded];
      }
      if (infoNeeded === 'finish') {
        const details = session.inquiry.detailingDetails?.[service.serviceName];
        return !details || !details.finish;
      }
      return true;
    });
    return { ...service, missingInfo: stillMissing };
  });

  const needAskMotor = !session.inquiry.lastMentionedMotor;

  if (knowledgeBaseAnswer) {
    console.log('[Flow] Skenario: General Inquiry dari KB.');
    contextNoteForMainAI = `[KONTEKS DARI SISTEM]:\n[HASIL KNOWLEDGE BASE]: ${knowledgeBaseAnswer}\n\n[TUGAS ANDA]: Sampaikan jawaban knowledge base di atas ke user dengan bahasa yang ramah dan mudah dipahami.\n\nWAJIB berikan jawaban knowledge base jika sudah ditemukan, meskipun skor kemiripan rendah.\nJangan pernah menolak atau mengalihkan ke Bos Mamat jika sudah ada jawaban KB.\nJangan pernah fallback ke Bos Mamat jika KB sudah ditemukan.\nJika perlu, tambahkan penjelasan atau follow-up yang relevan.\n\n[CATATAN]: Jika jawaban knowledge base sudah ditemukan, selalu sampaikan ke user, apapun skornya.`;
  } else if (pendingClarifications.length > 0 && needAskMotor) {
    console.log('[Flow] Skenario: Klarifikasi (multi) + Motor tidak terdeteksi. Menyiapkan pertanyaan ke user.');
    let notes = [`[TUGAS ANDA]: Tanyakan dengan ramah tipe/jenis motor yang ingin dilayani. Contoh: "Motornya apa ya, om?"`];
    pendingClarifications.forEach(item => {
      item.missingInfo.forEach(infoNeeded => {
        let exampleQuestion = '';
        if (infoNeeded === 'finish') exampleQuestion = 'Motornya glossy atau doff ya, om?';
        if (infoNeeded === 'risk_confirmation_doff') exampleQuestion = 'Untuk cat doff, ada risiko jadi sedikit lebih kilap setelah dipoles. Apakah tidak apa-apa?';
        if (infoNeeded === 'color') exampleQuestion = `Untuk ${item.serviceName}, mau pakai warna apa ya`;
        if (infoNeeded === 'detailing_level') exampleQuestion = 'detailing nya mau sampai ke rangka atau hanya bodi, mesin dan kaki kaki saja om?';
        if (infoNeeded === 'specific_part') exampleQuestion = 'mau cat bodi halus aja atau sekalian bodi kasar dan velgnya nih om?';
        notes.push(`[TUGAS ANDA]: Buatlah pertanyaan klarifikasi yang ramah kepada pengguna. Informasi yang hilang adalah '${infoNeeded}' untuk layanan ${item.serviceName}. Contoh pertanyaan: "${exampleQuestion}"`);
      });
    });
    contextNoteForMainAI = notes.join('\n\n');
  } else if (pendingClarifications.length > 0) {
    console.log('[Flow] Skenario: Klarifikasi (multi). Menyiapkan pertanyaan ke user.');
    let notes: string[] = [];
    pendingClarifications.forEach(item => {
      item.missingInfo.forEach(infoNeeded => {
        let exampleQuestion = '';
        if (infoNeeded === 'finish') exampleQuestion = 'Motornya glossy atau doff ya, om?';
        if (infoNeeded === 'risk_confirmation_doff') exampleQuestion = 'Untuk cat doff, ada risiko jadi sedikit lebih kilap setelah dipoles. Apakah tidak apa-apa?';
        if (infoNeeded === 'color') exampleQuestion = `Untuk ${item.serviceName}, mau pakai warna apa ya`;
        if (infoNeeded === 'detailing_level') exampleQuestion = 'detailing nya mau sampai ke rangka atau hanya bodi, mesin dan kaki kaki saja om?';
        if (infoNeeded === 'specific_part') exampleQuestion = 'mau cat bodi halus aja atau sekalian bodi kasar dan velgnya nih om?';
        notes.push(`[TUGAS ANDA]: Buatlah pertanyaan klarifikasi yang ramah kepada pengguna. Informasi yang hilang adalah '${infoNeeded}' untuk layanan ${item.serviceName}. Contoh pertanyaan: "${exampleQuestion}"`);
      });
    });
    contextNoteForMainAI = notes.join('\n\n');
  } else if (needAskMotor) {
    console.log('[Flow] Skenario: Motor tidak terdeteksi. Menyiapkan pertanyaan ke user.');
    contextNoteForMainAI = `[TUGAS ANDA]: Tanya motor, info motor belum ada. Contoh: "Motornya apa ya, om?"`;
  } else if (confirmedServices.length > 0 || initialClarificationServices.length > 0) {
    console.log('[Flow] Skenario: Layanan Terkonfirmasi. Memproses keranjang.');
    const cartResult = await processCart({ session });
    const priceItems = cartResult.priceDetails.map(item => `- ${item.name}: Rp ${item.price.toLocaleString('id-ID')}`);
    contextNoteForMainAI = `[RINCIAN HARGA FINAL]:\n${priceItems.join('\n')}\nTotal Biaya: Rp ${cartResult.total.toLocaleString('id-ID')}`;
    if (cartResult.promoApplied) {
        contextNoteForMainAI += `\nPromo: Anda dapat ${cartResult.promoApplied.name}!`;
    }
    contextNoteForMainAI += `\n\n[TUGAS ANDA]: Sampaikan rincian harga beserta deskripsi layanan lengkap di atas secara jelas dan ramah kepada pengguna. Jangan ubah, jangan ringkas, dan jangan hilangkan detail harga apapun. Rincian harga WAJIB dicantumkan utuh di balasan. Setelah itu, tanyakan langkah selanjutnya (misalnya: "mau lanjut booking?", "ada yang mau diubah?").`;
  } else if (generalIntent.serviceName === 'Handover to Human') {
    console.log('[Flow] Skenario: Handover ke Manusia.');
    await setSnoozeMode(senderNumber);
    await notifyBosMamat(senderNumber, input.customerMessage);
    return { suggestedReply: 'Oke om, Zoya panggilin Bos Mamat dulu ya. Tunggu sebentar 🙏', route: 'handover_request', toolCalls: [] };
  } else {
    console.log('[Flow] Skenario: Dialog Umum.');
    contextNoteForMainAI = `[TUGAS ANDA]: Balas pesan pengguna dengan ramah sebagai percakapan umum. Jika ada konteks tambahan dari sistem, gunakan itu untuk memperkaya jawabanmu.`;
  }

  // ==================================================================
  // TAHAP 5: EKSEKUSI FINAL (AI Utama)
  // ==================================================================
  // START: Perubahan 3 - Gabungkan konteks dari tool trigger dengan tugas utama
  const finalContextForAI = serviceDescriptionContext + contextNoteForMainAI;
  // END: Perubahan 3
  
  console.log('[Flow] Memanggil AI Utama dengan tugas:', finalContextForAI);
  const recentChatHistory = input.chatHistory ? input.chatHistory.slice(-6) : [];
  const messagesForAI: any[] = [
    { role: 'system', content: masterPrompt },
    ...recentChatHistory,
    // Gunakan konteks yang sudah digabung
    { role: 'assistant', content: finalContextForAI },
    { role: 'user', content: input.customerMessage },
    ...(isFirstMessage ? [{ role: 'system', content: `[SIGNAL] isFirstMessage: true${senderName ? `; customerName: ${senderName}` : ''}` }] : [])
  ];
  const agentResult = await runZoyaAIAgent({
    chatHistory: messagesForAI,
    session,
  });

  if (agentResult.toolCalls?.length && session) {
    const { toolFunctionMap } = await import('../config/aiConfig');
    const { updateSessionFromToolResults } = await import('../utils/updateSessionFromToolResults');
    const toolResponses = await Promise.all(
      agentResult.toolCalls.map(async (call) => {
        const tool = toolFunctionMap[call.toolName];
        if (!tool || typeof tool.implementation !== 'function') return null;
        const toolOutput = await tool.implementation(call.arguments, { session, input });
        return {
          tool_call_id: call.id,
          role: 'tool',
          name: call.toolName,
          content: JSON.stringify(toolOutput),
        };
      })
    );
    session = updateSessionFromToolResults(
      session,
      agentResult.toolCalls,
      toolResponses.filter((r): r is ToolResponse => !!r)
    );
  }

  // ==================================================================
  // TAHAP 6: FINALISASI (Tidak Berubah)
  // ...existing code...
  let finalOutput: WhatsAppReplyOutput = {
    suggestedReply: agentResult.suggestedReply,
    toolCalls: agentResult.toolCalls || [],
    route: agentResult.route || 'main_agent_reply',
    metadata: {},
  };

  // Fallback detection: If AI reply indicates confusion or fallback, trigger Bos Mamat
  const fallbackPhrases = [
    'Zoya agak kurang paham',
    'Zoya coba tanyain ke Bos Mamat',
    'Zoya panggilin Bos Mamat',
    'Zoya lagi pusing',
    'Bos Mamat dulu ya'
  ];
  const replyLower = (agentResult.suggestedReply || '').toLowerCase();
  if (fallbackPhrases.some(phrase => replyLower.includes(phrase.toLowerCase()))) {
    await setSnoozeMode(senderNumber);
    await notifyBosMamat(senderNumber, input.customerMessage);
    finalOutput = {
      suggestedReply: 'Oke om, Zoya panggilin Bos Mamat dulu ya. Tunggu sebentar 🙏',
      route: 'handover_request',
      toolCalls: [],
      metadata: {},
    };
  }

  await updateSession(senderNumber, { ...session, lastInteraction: { type: 'system', at: Date.now() } });
  return finalOutput;
});