// @file: src/ai/flows/cs-whatsapp-reply-flow.ts (VERSI FINAL)

'use server';

import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import { getSession, updateSession } from '@/ai/utils/session';
import { mapTermToOfficialService } from '../handlers/routes/lib/classifiers/mapTermToOfficialService';
import { Timestamp } from 'firebase/firestore';
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
    session = { flow: 'general', inquiry: {}, lastInteraction: Timestamp.now(), followUpState: null, lastRoute: 'init', senderName };
  } else {
    if (!session.senderName && senderName) session.senderName = senderName;
    // followUpState dipertahankan untuk cron job, tidak di-reset atau di-handle di sini
  }
  
  // --- TAHAP 1.6: DETEKSI SERVICE & MOTOR ---
  const mappedServiceResult = mapTermToOfficialService(input.customerMessage);
  if (mappedServiceResult?.serviceName) {
    session.inquiry ??= {};
    session.inquiry.lastMentionedService = { serviceName: mappedServiceResult.serviceName, isAmbiguous: mappedServiceResult.isAmbiguous ?? false };
  }

  const knownMotors = ['nmax', 'pcx', 'vario', 'beat', 'cbr', 'supra', 'vespa', 'yamaha', 'honda'];
  function detectMotorModel(message: string): string | null {
    const msg = message.toLowerCase();
    for (const motor of knownMotors) { if (msg.includes(motor)) return motor; }
    return null;
  }
  const detectedMotor = detectMotorModel(input.customerMessage);
  if (detectedMotor) {
    session.inquiry ??= {};
    session.inquiry.lastMentionedMotor = detectedMotor;
  }
  
  const msg = input.customerMessage.toLowerCase();
  const mintaBosMamat = ['bos mamat', 'admin', 'cs', 'customer service', 'orang', 'manusia', 'langsung'].some((keyword) => msg.includes(keyword)) && ['mau', 'panggil', 'bicara', 'ngomong', 'hubungi', 'ketemu'].some((trigger) => msg.includes(trigger));
  if (mintaBosMamat) {
    await setSnoozeMode(senderNumber);
    await notifyBosMamat(senderNumber, input.customerMessage);
    return { suggestedReply: 'Oke bro, Zoya panggilin Bos Mamat dulu ya. Tunggu sebentar 🙏', toolCalls: [], route: 'handover_request', metadata: { snoozeUntil: Date.now() + 60 * 60 * 1000 }};
  }

  // --- TAHAP 2: LOOPING AGENT ---
  const MAX_LOOPS = 5;
  let currentSession = { ...session };

  // Batasi chat history ke 3 conversation terakhir untuk efisiensi token
  const recentChatHistory = input.chatHistory.slice(-6); // 6 = 3 conversations (user + assistant pairs)

  let messagesForAI: any[] = [
    { role: 'system', content: masterPrompt },
    ...recentChatHistory,
    { role: 'user', content: input.customerMessage },
  ];

  for (let i = 0; i < MAX_LOOPS; i++) {
    const agentResult = await runZoyaAIAgent({
      session: currentSession,
      message: '', // Dikosongkan karena pesan utama sudah ada di `messagesForAI`
      chatHistory: messagesForAI,
      senderNumber: senderNumber,
      senderName: senderName,
    });

    if (agentResult.suggestedReply && (!agentResult.toolCalls || agentResult.toolCalls.length === 0)) {

      console.log(`[Loop ${i + 1}] AI memberikan jawaban akhir. Loop berhenti.`);
      const finalSession = mergeSession(currentSession, { lastInteraction: Timestamp.now(), lastRoute: 'ai_agent_final_reply' });
      await updateSession(senderNumber, finalSession);
      return agentResult;
    }

    if (agentResult.toolCalls && agentResult.toolCalls.length > 0) {
      console.log(`[Loop ${i + 1}] AI meminta untuk memanggil tool:`, agentResult.toolCalls.map(t => t.toolName));
      messagesForAI.push(createToolCallMessage(agentResult.toolCalls));

      const toolResponses = await runToolCalls(agentResult.toolCalls, { input, session: currentSession });
      
      // --- LOGIKA BARU: Update sesi DENGAN hasil tool ---
      const updatedSessionData = updateSessionFromToolResults(currentSession, agentResult.toolCalls, toolResponses);
      currentSession = mergeSession(currentSession, updatedSessionData);
      // --- AKHIR LOGIKA BARU ---

      // --- LOGIKA LAMA: Ekstrak reason dan langsung short-circuit ---
      let reasonFound: string | undefined;
      for (const resp of toolResponses) {
        if (resp && resp.content) {
          try {
            const toolResult = JSON.parse(resp.content);
            if (toolResult && typeof toolResult.reason === 'string' && toolResult.reason.trim()) {
              reasonFound = toolResult.reason.trim();
              console.log(`[REASON EXTRACTED & SHORT-CIRCUIT] Ditemukan reason dari tool: "${reasonFound}". Menghentikan loop AI.`);
              break; 
            }
          } catch (e) {
            console.warn('[REASON EXTRACTION] Gagal parse JSON dari content tool:', resp.content);
          }
        }
      }

      if (reasonFound) {
        const finalSession = mergeSession(currentSession, { lastInteraction: Timestamp.now(), lastRoute: 'tool_reason_short_circuit' });
        await updateSession(senderNumber, finalSession);
        return { suggestedReply: reasonFound, toolCalls: [], route: 'tool_reason_short_circuit' };
      }
      // --- AKHIR LOGIKA LAMA ---

      messagesForAI.push(...toolResponses);
      continue;
    }
    break;
  }

  // --- TAHAP 3: FALLBACK JIKA LOOP GAGAL ---
  const fallbackReply = 'Waduh, Zoya pusing nih muter-muter terus. Langsung tanya Bos Mamat aja ya!';
  const fallbackSession = mergeSession(currentSession, { lastInteraction: Timestamp.now(), lastRoute: 'ai_agent_loop_failed' });
  await updateSession(senderNumber, fallbackSession);
  await setSnoozeMode(senderNumber);
  await notifyBosMamat(senderNumber, input.customerMessage);
  return { suggestedReply: fallbackReply, toolCalls: [], route: 'ai_agent_loop_failed' };
}