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
import { notifyBosMat, setSnoozeMode } from '../utils/humanHandoverTool';
import daftarUkuranMotor from '../../data/daftarUkuranMotor';
import { masterPrompt } from '../config/aiPrompts';
import admin from 'firebase-admin';
import { traceable } from 'langsmith/traceable';
import { manageSessionState } from '../agent/sessionAgent';
// START: Perubahan 1 - Import tool yang akan di-trigger
import { getServiceDescriptionTool } from '../tools/getServiceDescriptionTool';
import { runRouterAgent } from '../agent/runRouterAgent';
import { runBookingAgent } from '../agent/runBookingAgent';
// END: Perubahan 1

function normalizeSenderNumber(raw: string): string {
  return raw?.replace(/@c\.us$/, '') || '';
}

export const generateWhatsAppReply = traceable(async function generateWhatsAppReply(
  input: ZoyaChatInput
): Promise<WhatsAppReplyOutput | null> {
  // TAMBAHKAN SATU BARIS INI DI PALING ATAS
  console.log('[RAW INPUT PAYLOAD]', JSON.stringify(input, null, 2));
  // ==================================================================
  // TAHAP 1: SETUP & KONDISI AWAL
  // ==================================================================
  const senderNumber = normalizeSenderNumber(input.senderNumber || 'playground_user');
  let senderName = input.senderName || undefined;

  const isLocked = await isInterventionLockActive(senderNumber);
  if (isLocked) return null;

  // --- PERBAIKAN DIMULAI DI SINI ---
  let isNewSession = false; // 1. Definisikan flag, default-nya false
  let initialSession: Session | null = await getSession(senderNumber) as Session | null;
  if (initialSession?.snoozeUntil && Date.now() < initialSession.snoozeUntil) return null;
  if (!initialSession) {
    isNewSession = true; // 2. Set flag menjadi true HANYA saat sesi baru dibuat
    initialSession = {
      cartServices: [],
      inquiry: {},
      lastInteraction: { type: 'system', at: Date.now() },
      senderName,
      flow: 'general',
    };
  }
  // --- PERBAIKAN SELESAI DI SINI ---

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
    await notifyBosMat(senderNumber, input.customerMessage);
    return { suggestedReply: 'Waduh, Zoya lagi pusing nih. Zoya panggilin BosMat aja ya!', route: 'fallback_handover', toolCalls: [] };
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
  // Gunakan isNewSession untuk penentuan nama
  if (isNewSession && !senderName) {
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
      isFirstMessage: isNewSession,
      senderName
  });

  // Utility: Sanitize chat history for agent calls
  const validRoles = ['user', 'assistant', 'system', 'tool'];
  const sanitizeHistory = (history: any[] = []) =>
    history
      .filter(msg => msg && typeof msg.role === 'string' && validRoles.includes(msg.role) && typeof msg.content === 'string')
      .map(msg => ({ role: msg.role, content: msg.content }));

  // ==================================================================
  // ==================================================================
  // Perubahan: Helper untuk deskripsi layanan
  async function getDescriptionsFor(serviceNames: string[]) {
    const descriptionPromises = serviceNames.map(name =>
      getServiceDescriptionTool.implementation({ service_name: name })
    );
    const results = await Promise.all(descriptionPromises);
    return results
      .filter(r => r.success && r.description)
      .map(r => `### Deskripsi Layanan: ${r.matched_service}\n${r.description}`)
      .join('\n\n');
  }


  // PATCH: TAHAP 4 DIROMBAK UNTUK MEMPRIORITASKAN KLARIFIKASI
  let agentResult: { suggestedReply: string; toolCalls?: any[]; route?: string; };

  // --- GERBANG KLARIFIKASI ---
  const pendingClarifications = mappedResult.requestedServices.filter(service => service.status === 'clarification_needed');
  const needAskMotor = !session.inquiry.lastMentionedMotor;

  if (pendingClarifications.length > 0) {
    console.log(`[Flow] Skenario Prioritas: Klarifikasi dibutuhkan untuk ${pendingClarifications.length} layanan.`);
    let notes: string[] = [];
    if (needAskMotor) {
      notes.push('[TUGAS ANDA]: Tanyakan dengan ramah tipe/jenis motor yang ingin dilayani. Contoh: "Motornya apa ya, om?"');
    }
    pendingClarifications.forEach(item => {
      item.missingInfo.forEach(infoNeeded => {
        let exampleQuestion = '';
        if (infoNeeded === 'finish') exampleQuestion = 'Motornya glossy atau doff ya, mas?';
        if (infoNeeded === 'risk_confirmation_doff') exampleQuestion = 'Untuk cat doff, ada risiko jadi sedikit lebih kilap setelah dipoles. Apakah tidak apa-apa?';
        if (infoNeeded === 'color') exampleQuestion = `Untuk ${item.serviceName}, mau pakai warna apa ya?`;
        if (infoNeeded === 'detailing_level') exampleQuestion = 'Detailingnya mau sampai ke rangka atau hanya bodi, mesin dan kaki-kaki saja mas?';
        if (infoNeeded === 'specific_part') exampleQuestion = 'mau repaint bodi halus saja atau sekalian velgnya nih mas?';
        notes.push(`[TUGAS ANDA]: Buatlah pertanyaan klarifikasi yang ramah kepada pengguna untuk layanan '${item.serviceName}'. Informasi yang hilang adalah '${infoNeeded}'. Contoh pertanyaan: "${exampleQuestion}"`);
      });
    });
    const clarificationContext = `[TUGAS ANDA]: Sampaikan pertanyaan klarifikasi berikut kepada pengguna secara natural dalam satu pesan yang ramah.\n\n${notes.join('\n')}`;
    agentResult = await runZoyaAIAgent({
      chatHistory: [
        { role: 'system', content: masterPrompt },
        ...sanitizeHistory(input.chatHistory),
        { role: 'assistant', content: clarificationContext },
        { role: 'user', content: input.customerMessage }
      ],
      session,
    });
    agentResult.route = 'clarification_needed';
  } else {
    console.log('[Flow] Tidak ada klarifikasi, menjalankan RouterAgent...');
    const { intent } = await runRouterAgent({ customerMessage: input.customerMessage });
    const recentChatHistory = (input.chatHistory || []).slice(-6);
    switch (intent) {
      case 'booking_flow': {
        console.log('[Flow][Route: Booking] Menjalankan Booking Agent...');
        session.flow = 'booking';
        const historyForBooking = [
          { role: 'system', content: masterPrompt },
          ...sanitizeHistory(recentChatHistory),
          { role: 'user', content: input.customerMessage }
        ];
        agentResult = await runBookingAgent({ chatHistory: historyForBooking, session });
        agentResult.route = 'booking_agent_reply';
        break;
      }
      case 'service_inquiry': {
        console.log('[Flow][Route: Service Inquiry] Menjalankan alur layanan/harga...');
        session.flow = 'general';
        const cartResult = await processCart({ session });
        const serviceNames = session.cartServices || [];
        const serviceDescriptionContext = await getDescriptionsFor(serviceNames);
        const priceItems = cartResult.priceDetails.map(item => `- ${item.name}: Rp ${item.price.toLocaleString('id-ID')}`);

        // 1. Siapkan konteks harga & layanan seperti biasa
        let priceContext = serviceDescriptionContext + '\n\n' + `[RINCIAN HARGA FINAL]:\n${priceItems.join('\n')}\nTotal Biaya: Rp ${cartResult.total.toLocaleString('id-ID')}`;
        if (cartResult.promoApplied) {
          priceContext += `\nPromo: Anda dapat ${cartResult.promoApplied.name}!`;
        }

        // 2. Buat instruksi final yang dinamis
        const finalSystemInstruction = `
[KONTEKS HARGA DAN LAYANAN UNTUK DISAMPAIKAN]:
${priceContext}

[PESAN TERBARU DARI PENGGUNA]:
${input.customerMessage}

[TUGAS FINAL ANDA - SANGAT PENTING!]:
Balas pesan terbaru pengguna dengan ramah. Setelah itu, Anda WAJIB menyampaikan KEMBALI seluruh rincian dari [KONTEKS HARGA DAN LAYANAN] di atas secara lengkap. 
Jangan berasumsi pengguna sudah tahu atau setuju dengan harga hanya karena mereka memberikan detail tambahan.
Tutup balasan Anda dengan menanyakan langkah selanjutnya (misalnya: "Gimana, om? Mau lanjut booking?").
`;

        // 3. Susun ulang 'messages' untuk AI
        agentResult = await runZoyaAIAgent({
            chatHistory: [
              { role: 'system', content: masterPrompt }, 
              ...sanitizeHistory(recentChatHistory),
              { role: 'user', content: input.customerMessage },
              { role: 'system', content: finalSystemInstruction }
            ],
            session,
        });
        break;
      }
      case 'general_question': {
        console.log('[Flow][Route: General Question] Mencari di Knowledge Base...');
        session.flow = 'general';
        const kbResult = await searchKnowledgeBaseTool.implementation({ query: input.customerMessage });
        const kbAnswer = (kbResult.success && kbResult.answer) ? kbResult.answer : 'Maaf, Zoya tidak menemukan jawaban untuk pertanyaan itu. Mungkin BosMat bisa bantu?';
        const kbContext = `[HASIL KNOWLEDGE BASE]: ${kbAnswer}\n\n[TUGAS ANDA]: Sampaikan jawaban di atas dengan ramah.`;
        agentResult = await runZoyaAIAgent({
          chatHistory: [
            { role: 'system', content: masterPrompt },
            ...sanitizeHistory(recentChatHistory),
            { role: 'assistant', content: kbContext },
            { role: 'user', content: input.customerMessage }
          ],
          session,
        });
        break;
      }
      case 'chitchat':
      default: {
        console.log('[Flow][Route: Chitchat] Menjalankan Zoya AI umum...');
        session.flow = 'general';
        agentResult = await runZoyaAIAgent({
          chatHistory: [
            { role: 'system', content: masterPrompt },
            ...sanitizeHistory(recentChatHistory),
            { role: 'user', content: input.customerMessage }
          ],
          session,
        });
        break;
      }
    }
  }


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
    'Zoya coba tanyain ke BosMat',
    'Zoya panggilin BosMat',
    'Zoya lagi pusing',
    'BosMat dulu ya'
  ];
  const replyLower = (agentResult.suggestedReply || '').toLowerCase();
  if (fallbackPhrases.some(phrase => replyLower.includes(phrase.toLowerCase()))) {
    await setSnoozeMode(senderNumber);
    await notifyBosMat(senderNumber, input.customerMessage);
    finalOutput = {
      suggestedReply: 'Oke om, Zoya panggilin BosMat dulu ya. Tunggu sebentar 🙏',
      route: 'handover_request',
      toolCalls: [],
      metadata: {},
    };
  }

  await updateSession(senderNumber, { ...session, lastInteraction: { type: 'system', at: Date.now() } });
  return finalOutput;
});