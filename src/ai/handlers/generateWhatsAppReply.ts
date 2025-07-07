
'use server';

import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import { getSession, updateSession } from '@/ai/utils/session';
// Impor dari lokasi yang benar di dalam /handlers
import { determineRoute } from '@/ai/handlers/routeRouter';
import { routeHandlers } from '@/ai/handlers/routeHandlers';
import { mapTermToOfficialService } from '@/ai/utils/messageParsers';
import { Timestamp } from 'firebase/firestore';
import type { SessionData } from '@/ai/utils/session';

/**
 * Ini adalah Flow Controller utama yang sudah di-refactor.
 * Tugasnya hanya sebagai "konduktor" yang mengarahkan alur.
 */
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<WhatsAppReplyOutput | null> {
  const senderNumber = input.senderNumber || 'playground_user';
  let session = await getSession(senderNumber);

  console.log(`\n\n================ Zoya New Turn for ${senderNumber} ================`);
  console.log(`[PESAN MASUK]: "${input.customerMessage}"`);
  console.log(`[LOG SESI AWAL]:`, JSON.stringify(session, null, 2));

  // === TAHAP 1: PRE-FLIGHT CHECKS & SESSION MANAGEMENT ===
  if (session?.snoozeUntil && Date.now() < session.snoozeUntil) {
    console.log(`[FlowController] Mode diam aktif. Tidak ada balasan.`);
    return null;
  }

  if (session?.followUpState) {
    console.log(`[FlowController] Follow-up dibatalkan karena ada pesan baru.`);
    session.followUpState = null;
  }

  if (!session) {
    console.log(`[FlowController] Sesi baru dibuat untuk ${senderNumber}.`);
    session = {
      flow: 'general',
      inquiry: {},
      lastInteraction: Timestamp.now(),
      followUpState: null,
      lastRoute: 'init',
    };
  }

  // === TAHAP 2: PRE-PROCESSING PESAN ===
  const detectedServiceName = mapTermToOfficialService(input.customerMessage);
  if (detectedServiceName && session.inquiry) {
    console.log(`[FlowController] Istilah terpetakan ke: "${detectedServiceName}"`);
    session.inquiry.lastMentionedService = detectedServiceName;
  }

  // === TAHAP 3: ROUTING ===
  const routeName = await determineRoute(input.customerMessage, session);
  console.log(`[FlowController] Pesan dialihkan ke rute: "${routeName}"`);

  // === TAHAP 4: HANDLING ===
  const handler = routeHandlers[routeName];

  if (!handler) {
    console.error(`[FlowController] FATAL: Tidak ada handler untuk rute "${routeName}".`);
    return { suggestedReply: "Aduh, Zoya lagi bingung nih, sistemnya ada yang aneh. Bentar ya." };
  }

  const handlerResult = await handler({
    session: session,
    message: input.customerMessage,
    chatHistory: input.chatHistory,
    senderNumber: senderNumber,
    senderName: input.senderName,
  });

  // === TAHAP 5: FINALISASI ===
  if (handlerResult.updatedSession) {
    await updateSession(senderNumber, handlerResult.updatedSession);
    console.log(`[FlowController] Sesi untuk ${senderNumber} di-update.`);
  }

  const replyMessage = handlerResult.reply.message || handlerResult.reply.suggestedReply || '';
  return { suggestedReply: replyMessage };
}
