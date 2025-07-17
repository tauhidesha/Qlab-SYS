

'use server';
import admin from 'firebase-admin';
import daftarUkuranMotor from '@/data/daftarUkuranMotor';
// @file: src/ai/flows/cs-whatsapp-reply-flow.ts (VERSI FINAL)

import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import { getSession, updateSession } from '@/ai/utils/session';
import { mapTermToOfficialService } from '../handlers/routes/lib/classifiers/mapTermToOfficialService';
import type { SessionData } from '@/ai/utils/session';
import { mergeSession } from '@/ai/utils/mergeSession';
import { runZoyaAIAgent } from '@/ai/agent/runZoyaAIAgent';
import { notifyBosMamat, setSnoozeMode } from '@/ai/utils/humanHandoverTool';
import { updateSessionFromToolResults } from '@/ai/utils/updateSessionFromToolResults';
import { isInterventionLockActive } from '@/ai/utils/interventionLock';

import { masterPrompt } from '@/ai/config/aiPrompts';
import { createToolCallMessage, runToolCalls } from '@/ai/utils/runToolCalls';

function normalizeSenderNumber(raw: string): string {
  return raw?.replace(/@c\.us$/, '') || '';
}

export async function generateWhatsAppReply(
  input: ZoyaChatInput
): Promise<WhatsAppReplyOutput | null> {

  const senderNumber = normalizeSenderNumber(input.senderNumber || 'playground_user');
  const senderName = input.senderName || undefined;

  let session = await getSession(senderNumber);

  // Variabel untuk menandai pesan pertama, akan digunakan di akhir
  const isFirstMessage = !input.chatHistory || input.chatHistory.length === 0;

  // Variabel "wadah" untuk menampung output. Awalnya null.
  let finalOutput: WhatsAppReplyOutput | null = null;

  console.log(`\n\n================ Zoya New Turn for ${senderNumber} ================`);
  console.log(`[PESAN MASUK]: "${input.customerMessage}"`);
  
  // --- TAHAP 0: PENGECEKAN LOCK INTERVENSI MANUAL ---
  const isLocked = await isInterventionLockActive(senderNumber);
  if (isLocked) {
    console.log(`[LOCK ACTIVE] AI tidak merespons karena lock intervensi manual aktif.`);
    return null; // Berhenti total, jangan balas apa pun.
  }

  // --- TAHAP 1: SETUP SESI & PENGECEKAN AWAL ---
  if (session?.snoozeUntil && Date.now() < session.snoozeUntil) {
    return { suggestedReply: '', toolCalls: [], route: 'snoozed', metadata: { snoozeUntil: session.snoozeUntil } };
  }

  if (!session) {
    session = { flow: 'general', inquiry: {}, lastInteraction: admin.firestore.Timestamp.now(), followUpState: null, lastRoute: 'init', senderName };
  } else {
    if (!session.senderName && senderName) session.senderName = senderName;
    // followUpState dipertahankan untuk cron job, tidak di-reset atau di-handle di sini
  }
  


  // --- PATCH: Deteksi motor otomatis dari pesan user, pakai daftarUkuranMotor ---
  function detectMotorName(text: string): string | null {
    const lower = text.toLowerCase();
    for (const entry of daftarUkuranMotor) {
      if (lower.includes(entry.model)) return entry.model;
      if (Array.isArray(entry.aliases)) {
        for (const alias of entry.aliases) {
          if (lower.includes(alias)) return entry.model;
        }
      }
    }
    return null;
  }


  // Deteksi motor dari pesan user
  const detectedMotor = detectMotorName(input.customerMessage);
  if (detectedMotor) {
    session.inquiry ??= {};
    session.inquiry.lastMentionedMotor = detectedMotor;
  }
  const mappedServiceResult = await mapTermToOfficialService(
    input.customerMessage,
    {
      lastService: session.inquiry?.lastMentionedService?.serviceName,
      lastIntent: session.inquiry?.lastMentionedService?.serviceName,
    }
  );
  console.log('[mapTermToOfficialService RESULT]', mappedServiceResult);
  if (mappedServiceResult?.serviceName) {
    session.inquiry ??= {};
    session.inquiry.lastMentionedService = { serviceName: mappedServiceResult.serviceName, isAmbiguous: mappedServiceResult.isAmbiguous ?? false };
    // PATCH: Klarifikasi motor jika layanan sudah jelas tapi model motor belum diketahui
    const isServiceRelatedIntent = !['General Inquiry', 'Handover to Human', 'Clarification Needed'].includes(mappedServiceResult.serviceName);
    if (
      !mappedServiceResult.isAmbiguous &&
      isServiceRelatedIntent &&
      !session.inquiry?.lastMentionedMotor
    ) {
      console.log(`[CLARIFICATION] Niat layanan jelas (${mappedServiceResult.serviceName}), tapi model motor belum diketahui. Minta klarifikasi motor.`);
      const motorClarificationMsg = `Oke, siap! Untuk layanan *${mappedServiceResult.serviceName}*, oiya om, motornya apa ya?.`;
      await updateSession(senderNumber, { inquiry: session.inquiry });
      finalOutput = {
          suggestedReply: motorClarificationMsg,
          toolCalls: [],
          route: 'clarification_motor',
          metadata: {}
      };
    }
    // Jika hasil mapping ambiguous, langsung klarifikasi ke user, jangan lanjut ke agent/tool call
    if (mappedServiceResult.isAmbiguous) {
      let klarifikasiMsg = '';
      // Klarifikasi khusus untuk coating, detailing, atau complete service
      if (/coating|detailing|complete service/i.test(mappedServiceResult.serviceName)) {
        klarifikasiMsg = 'Motornya doff atau glossy om? terus rencananya sekalian detailing bongkar bodi atau biasa aja?';
        await updateSession(senderNumber, { inquiry: session.inquiry });
        finalOutput = { suggestedReply: klarifikasiMsg, toolCalls: [], route: 'clarification', metadata: {} };
      } else {
        // Fallback: coba searchKnowledgeBaseTool
        const { searchKnowledgeBaseTool } = require('@/ai/tools/searchKnowledgeBaseTool');
        if (searchKnowledgeBaseTool && typeof searchKnowledgeBaseTool.implementation === 'function') {
          const kbResult = await searchKnowledgeBaseTool.implementation({ query: input.customerMessage });
          if (kbResult && kbResult.answer && kbResult.answer.trim()) {
            await updateSession(senderNumber, { inquiry: session.inquiry });
            finalOutput = { suggestedReply: kbResult.answer, toolCalls: [], route: 'clarification_kb', metadata: {} };
          }
        }
        // Jika tetap tidak ada hasil, trigger Bos Mamat
        if (!finalOutput) {
          await setSnoozeMode(senderNumber);
          await notifyBosMamat(senderNumber, input.customerMessage);
          finalOutput = { suggestedReply: 'Zoya agak bingung nih om, bentar ya, Zoya panggilin Bos Mamat dulu 🙏', toolCalls: [], route: 'clarification_handover', metadata: { snoozeUntil: Date.now() + 60 * 60 * 1000 } };
        }
      }
    }
    // Jika kita sampai di sini, artinya tidak ada klarifikasi yang dibutuhkan.
    // Kita bisa update session sekali saja.
    if (!finalOutput) await updateSession(senderNumber, { inquiry: session.inquiry });
  }
  

  // --- TAHAP 3: HUMAN HANDOVER & AGENT LOOP ---
  // Hanya jalankan blok ini jika belum ada output yang diputuskan dari tahap klarifikasi
  if (!finalOutput) {
    const msg = input.customerMessage.toLowerCase();
    const mintaBosMamat = ['bos mamat', 'admin', 'cs', 'customer service', 'orang', 'manusia', 'langsung'].some((keyword) => msg.includes(keyword)) && ['mau', 'panggil', 'bicara', 'ngomong', 'hubungi', 'ketemu'].some((trigger) => msg.includes(trigger));
    if (mintaBosMamat) {
      await setSnoozeMode(senderNumber);
      await notifyBosMamat(senderNumber, input.customerMessage);
      finalOutput = { suggestedReply: 'Oke bro, Zoya panggilin Bos Mamat dulu ya. Tunggu sebentar 🙏', toolCalls: [], route: 'handover_request', metadata: { snoozeUntil: Date.now() + 60 * 60 * 1000 }};
    }

    // --- TAHAP 2: LOOPING AGENT ---
    const MAX_LOOPS = 5;
    let currentSession = { ...session };

    // Batasi chat history ke 3 conversation terakhir untuk efisiensi token
    const recentChatHistory = input.chatHistory.slice(-6); // 6 = 3 conversations (user + assistant pairs)

    // Inject context motor & layanan terakhir dari session ke prompt AI
    let contextNote = '';
    if (session.inquiry?.lastMentionedMotor) {
      contextNote += `Motor customer sebelumnya: ${session.inquiry.lastMentionedMotor}. `;
    }
    if (session.inquiry?.lastMentionedService?.serviceName) {
      contextNote += `Layanan yang dimaksud user adalah: ${session.inquiry.lastMentionedService.serviceName}. Jangan ganti atau turunkan layanan ini. Jika sudah pasti, jangan tawarkan layanan lain, cukup jawab detail dan harga untuk layanan ini saja.`;
    }
    let messagesForAI: any[] = [
      { role: 'system', content: masterPrompt },
      ...recentChatHistory,
      ...(contextNote ? [{ role: 'assistant', content: contextNote.trim() }] : []),
      { role: 'user', content: input.customerMessage },
    ];

    for (let i = 0; i < MAX_LOOPS; i++) {
      console.log(`\n[Loop ${i + 1}] Mulai loop. Session inquiry:`, JSON.stringify(currentSession.inquiry));
      const agentResult = await runZoyaAIAgent({
        session: currentSession,
        message: '',
        chatHistory: messagesForAI,
        senderNumber: senderNumber,
        senderName: senderName,
      });

      console.log(`[Loop ${i + 1}] agentResult.toolCalls:`, agentResult.toolCalls);
      console.log(`[Loop ${i + 1}] agentResult.suggestedReply:`, agentResult.suggestedReply);
      const toolCalls = agentResult.toolCalls;

      if (agentResult.suggestedReply && (!toolCalls || toolCalls.length === 0)) {
        finalOutput = {
          suggestedReply: agentResult.suggestedReply,
          toolCalls: toolCalls,
          route: agentResult.route,
          metadata: (typeof (agentResult as any).metadata === 'object' && (agentResult as any).metadata !== null) ? (agentResult as any).metadata : {}
        };
        break;
      }

      if (toolCalls && toolCalls.length > 0) {
        console.log(`[Loop ${i + 1}] AI meminta untuk memanggil tool:`, toolCalls.map(t => t.toolName));
        messagesForAI.push(createToolCallMessage(toolCalls));
        const toolResponses = await runToolCalls(toolCalls, { input, session: currentSession });
        const updatedSessionData = updateSessionFromToolResults(currentSession, toolCalls, toolResponses);
        currentSession = mergeSession(currentSession, updatedSessionData);
        for (const resp of toolResponses) {
          messagesForAI.push({
            role: 'tool',
            content: resp.content,
            tool_call_id: resp.tool_call_id || resp.id
          });
        }
        continue;
      }
      break;
    }
  }

  // --- TAHAP 4: FALLBACK & FINALISASI ---

  // Jika setelah semua proses masih belum ada output, gunakan fallback
  if (!finalOutput) {
    await setSnoozeMode(senderNumber);
    await notifyBosMamat(senderNumber, input.customerMessage);
    finalOutput = {
      suggestedReply: 'Waduh, Zoya pusing nih. Langsung tanya Bos Mamat aja ya!',
      toolCalls: [], route: 'fallback_handover', metadata: {}
    };
  }

  // FINALISASI: Tambahkan sapaan jika ini pesan pertama & ada balasan teks
  if (finalOutput && finalOutput.suggestedReply && isFirstMessage) {
    const greetName = session?.senderName;
    const greetingText = greetName ? `Halo om ${greetName}! 👋 dengan Zoya disini.\n` : `Halo om! 👋 dengan Zoya disini.\n`;
    finalOutput.suggestedReply = greetingText + finalOutput.suggestedReply;
  }

  // Simpan interaksi terakhir sebelum mengirim
  if(session) await updateSession(senderNumber, { lastInteraction: admin.firestore.Timestamp.now() });

  // Inilah satu-satunya titik keluar utama dari fungsi Anda
  return finalOutput;
}