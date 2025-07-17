

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
import { traceAgentLoop } from '@/ai/utils/langsmith';

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
    session = { flow: 'general', inquiry: {}, lastInteraction: admin.firestore.Timestamp.now(), followUpState: null, lastRoute: 'init', senderName, cartServices: [] };
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




  // --- PATCH: Deteksi motor otomatis dari pesan user, pakai daftarUkuranMotor ---
  const detectedMotor = detectMotorName(input.customerMessage);
  if (detectedMotor) {
    session.inquiry ??= {};
    session.inquiry.lastMentionedMotor = detectedMotor;
    await updateSession(senderNumber, { inquiry: session.inquiry });
  }


  // Always run mapping and cart logic, let AI handle all clarifications
  const msgLower = input.customerMessage.toLowerCase();
  const mappedServiceResult = await mapTermToOfficialService(
    input.customerMessage,
    {
      lastService: session.inquiry?.lastMentionedService?.serviceNames?.[0],
      lastIntent: session.inquiry?.lastMentionedService?.serviceNames?.[0],
    }
  );
  console.log('[mapTermToOfficialService RESULT]', mappedServiceResult);
  // --- PATCH: Cart system for accumulating requested services ---
  // Initialize cartServices if not present
  session.cartServices = Array.isArray(session.cartServices) ? session.cartServices : [];

  if (mappedServiceResult?.serviceNames && mappedServiceResult.serviceNames.length > 0) {
    session.inquiry ??= {};
    // Only update lastMentionedService if the mapped service is actionable
    const nonActionableIntents = ['General Inquiry', 'Handover to Human', 'Clarification Needed'];
    const isServiceRelatedIntent = mappedServiceResult.serviceNames.every(s => !nonActionableIntents.includes(s));
    if (isServiceRelatedIntent) {
      // For lastMentionedService, use the first service in the array for context
      session.inquiry.lastMentionedService = { serviceNames: mappedServiceResult.serviceNames, isAmbiguous: mappedServiceResult.isAmbiguous ?? false };
    }

    // If user says "sudah"/"cukup"/"lanjut booking", trigger booking for all cartServices
    const bookingTriggers = ["sudah", "cukup", "lanjut booking", "lanjutkan booking", "booking semua", "simpan semua", "oke booking", "oke lanjut"];
    const isBookingTrigger = bookingTriggers.some(trigger => msgLower.includes(trigger));

    if (isBookingTrigger && session.cartServices.length > 0) {
      // PATCH: Trigger booking for all services in cart
      // Set inquiry.lastMentionedService to the first in cart for context
      session.inquiry.lastMentionedService = { serviceNames: [session.cartServices[0]], isAmbiguous: false };
      await updateSession(senderNumber, { inquiry: session.inquiry });
      finalOutput = {
        suggestedReply: `Siap om, Zoya proses booking untuk layanan berikut: *${session.cartServices.join(", ")}*. Mohon tunggu sebentar ya!`,
        toolCalls: [
          {
            toolName: "createBooking",
            arguments: {
              services: session.cartServices,
              // ...other booking args from session if needed
            }
          }
        ],
        route: 'booking_cart',
        metadata: { cartServices: session.cartServices }
      };
      // Clear cart after booking
      session.cartServices = [];
      await updateSession(senderNumber, { cartServices: [] });
    } else if (!mappedServiceResult.isAmbiguous && isServiceRelatedIntent) {
      // If services are clear and not ambiguous, add all to cart if not already present
      let added = false;
      for (const serviceName of mappedServiceResult.serviceNames) {
        if (!session.cartServices.includes(serviceName)) {
          session.cartServices.push(serviceName);
          added = true;
        }
      }
      // Only update if something was added
      if (added) {
        await updateSession(senderNumber, { cartServices: session.cartServices, inquiry: session.inquiry });
      }
    }
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
      contextNote += `Motor customer adalah: ${session.inquiry.lastMentionedMotor}. `;
    }
    if (session.inquiry?.lastMentionedService?.serviceNames && session.inquiry.lastMentionedService.serviceNames.length > 0) {
      const serviceList = session.inquiry.lastMentionedService.serviceNames.join(', ');
      contextNote += `KONTEKS FINAL: Layanan yang SUDAH DIKONFIRMASI dan HARUS diproses sekarang adalah: '${serviceList}'. TUGAS ANDA HANYA MEMPROSES LAYANAN INI. Jangan menganalisis ulang pesan user atau menggantinya dengan layanan lain.`;
    }

    // --- PATCH: Penggantian Pesan Bersyarat ---
    let userMessageForAI = input.customerMessage; // Defaultnya adalah pesan asli user
    const lastServiceInfo = session.inquiry?.lastMentionedService;
    const confirmedServices = lastServiceInfo?.serviceNames;
    const nonActionableIntents = ['General Inquiry', 'Handover to Human', 'Clarification Needed'];
    if (
      confirmedServices &&
      confirmedServices.length > 0 &&
      !lastServiceInfo.isAmbiguous &&
      !nonActionableIntents.includes(confirmedServices[0])
    ) {
      // Jika semua syarat terpenuhi, barulah kita ganti pesan user dengan fakta
      console.log('[MESSAGE REPLACEMENT] Mengganti pesan user dengan fakta terkonfirmasi untuk AI Utama.');
      userMessageForAI = `(User telah mengonfirmasi layanan spesifik berikut: ${confirmedServices.join(', ')}. Tugas Anda sekarang adalah melanjutkan proses untuk layanan ini, seperti mencari harga atau detail lainnya menggunakan tools yang tersedia.)`;
    } else {
      // Jika tidak, pertahankan pesan asli agar AI utama tahu apa yang sebenarnya ditanyakan user.
      console.log('[MESSAGE REPLACEMENT] Mempertahankan pesan asli user untuk AI Utama (kasus: pertanyaan umum/klarifikasi).');
    }

    // --- PATCH: AI message history handling ala LangChain ---
    let initialMessagesForAI: any[] = [
      { role: 'system', content: masterPrompt },
      ...recentChatHistory,
      ...(contextNote ? [{ role: 'assistant', content: contextNote.trim() }] : []),
      { role: 'user', content: userMessageForAI },
    ];
    // Loop berikutnya: tetap pakai system prompt
    let subsequentMessagesForAI: any[] = [
      { role: 'system', content: masterPrompt },
      ...recentChatHistory,
      ...(contextNote ? [{ role: 'assistant', content: contextNote.trim() }] : []),
      { role: 'user', content: userMessageForAI },
    ];

    for (let i = 0; i < MAX_LOOPS; i++) {
      console.log(`\n[Loop ${i + 1}] Mulai loop. Session inquiry:`, JSON.stringify(currentSession.inquiry));
      const messagesToSend = i === 0 ? initialMessagesForAI : subsequentMessagesForAI;
      const agentResult = await runZoyaAIAgent({
        session: currentSession,
        message: '',
        chatHistory: messagesToSend,
        senderNumber: senderNumber,
        senderName: senderName,
      });

      // --- DEBUG: Log aiMeta for tracing ---
      console.log('[LangSmith META]', {
        loop: i + 1,
        aiMeta: agentResult?.aiMeta
      });

      // --- LangSmith tracing for each agent loop ---
      const aiLatencyMs = agentResult?.aiMeta?.latencyMs ?? null;
      const aiTokenUsage = agentResult?.aiMeta?.usage ?? { prompt_tokens: null, completion_tokens: null, total_tokens: null };
      await traceAgentLoop({
        name: `WhatsApp Agent Loop #${i + 1}`,
        inputs: {
          session: currentSession,
          chatHistory: messagesToSend,
          senderNumber,
          senderName,
        },
        outputs: agentResult,
        metadata: {
          loop: i + 1,
          inquiry: currentSession.inquiry,
          aiLatencyMs,
          aiTokenUsage,
        },
        tags: ["whatsapp", "agent-loop"],
      });

      console.log(`[Loop ${i + 1}] agentResult.toolCalls:`, agentResult.toolCalls);
      console.log(`[Loop ${i + 1}] agentResult.suggestedReply:`, agentResult.suggestedReply);
      // --- PATCH: Filter toolCalls agar hanya untuk layanan hasil mapping ---
      let toolCalls = agentResult.toolCalls;
      // Ambil daftar layanan hasil mapping (dari session inquiry terbaru)
      const allowedServices = Array.isArray(currentSession.inquiry?.lastMentionedService?.serviceNames)
        ? currentSession.inquiry.lastMentionedService.serviceNames.map(s => s.toLowerCase())
        : [];
      if (toolCalls && toolCalls.length > 0 && allowedServices.length > 0) {
        const filteredToolCalls = toolCalls.filter(tc => {
          // Selalu izinkan getMotorSizeDetails
          if (tc.toolName === 'getMotorSizeDetails') return true;
          // Cek argumen service_name (atau services array) jika ada
          const argName = tc.arguments?.service_name?.toLowerCase?.();
          const argNames = Array.isArray(tc.arguments?.services)
            ? tc.arguments.services.map((s: string) => s.toLowerCase())
            : [];
          // Izinkan jika service_name atau salah satu services ada di allowedServices
          if (argName && allowedServices.includes(argName)) return true;
          if (argNames.length > 0 && argNames.some(n => allowedServices.includes(n))) return true;
          // Untuk tool lain (misal promo, dsb), izinkan tanpa filter
          if (!argName && !argNames.length) return true;
          // Jika tidak cocok, log dan skip
          console.warn('[TOOLCALL FILTER] Tool call dibuang karena tidak relevan:', tc);
          return false;
        });
        if (filteredToolCalls.length !== toolCalls.length) {
          console.warn('[TOOLCALL FILTER] Ada tool call yang tidak dieksekusi karena tidak sesuai hasil mapping.');
        }
        toolCalls = filteredToolCalls;
      }

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
        const toolCallMessage = createToolCallMessage(toolCalls);
        const toolResponses = await runToolCalls(toolCalls, { input, session: currentSession });
        const updatedSessionData = updateSessionFromToolResults(currentSession, toolCalls, toolResponses);
        currentSession = mergeSession(currentSession, updatedSessionData);
        // Untuk loop berikutnya, hanya tambahkan tool call dan hasilnya
        subsequentMessagesForAI = [
          ...messagesToSend,
          toolCallMessage,
          ...toolResponses.map(resp => ({
            role: 'tool',
            content: resp.content,
            tool_call_id: resp.tool_call_id || resp.id
          }))
        ];
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