'use server';

import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import { getSession, updateSession } from '@/ai/utils/session';
import { determineRoute } from '@/ai/handlers/routeRouter';
import { routeHandlers } from '@/ai/handlers/routeHandlers';
import { mapTermToOfficialService } from '@/ai/utils/messageParsers';
import { Timestamp } from 'firebase/firestore';
import type { SessionData } from '@/ai/utils/session';
import { mergeSession } from '@/ai/utils/mergeSession';

/**
 * Flow Controller utama Zoya.
 * Bertugas mengarahkan alur, menyatukan logika handler, dan update sesi secara aman.
 */
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<WhatsAppReplyOutput | null> {
  const senderNumber = input.senderNumber || 'playground_user';
  const senderName = input.senderName || undefined;

  let session = await getSession(senderNumber);

  console.log(`\n\n================ Zoya New Turn for ${senderNumber} ================`);
  console.log(`[PESAN MASUK]: "${input.customerMessage}"`);
  console.log(`[LOG SESI AWAL]:`, JSON.stringify(session, null, 2));

  // === 1. MODE DIAM & FOLLOW-UP ===
  if (session?.snoozeUntil && Date.now() < session.snoozeUntil) {
    console.log(`[FlowController] Mode diam aktif. Tidak ada balasan.`);
    return null;
  }

  if (session?.followUpState) {
    console.log(`[FlowController] Follow-up dibatalkan karena ada pesan baru.`);
    session.followUpState = null;
  }

  // === 2. INISIALISASI SESI BARU JIKA PERLU ===
  if (!session) {
    console.log(`[FlowController] Sesi baru dibuat untuk ${senderNumber}.`);
    session = {
      flow: 'general',
      inquiry: {},
      lastInteraction: Timestamp.now(),
      followUpState: null,
      lastRoute: 'init',
      senderName: senderName,
    };
  } else if (!session.senderName && senderName) {
    session.senderName = senderName;
  }

  // === 3. DETEKSI LAYANAN (PRE-ROUTE) ===
  const detectedServiceName = mapTermToOfficialService(input.customerMessage);
  if (detectedServiceName && session.inquiry) {
    console.log(`[FlowController] Istilah terpetakan ke: "${detectedServiceName}"`);
    session.inquiry.lastMentionedService = detectedServiceName;
  }

  // === 4. ROUTING ===
  const routeName = await determineRoute(input.customerMessage, session);
  console.log(`[FlowController] Pesan dialihkan ke rute: "${routeName}"`);

  const handler = routeHandlers[routeName];
  if (!handler) {
    console.error(`[FlowController] FATAL: Tidak ada handler untuk rute "${routeName}".`);
    return {
      suggestedReply: "Aduh, Zoya lagi bingung nih, sistemnya ada yang aneh. Bentar ya.",
    };
  }

  // === 5. JALANKAN HANDLER ===
  const handlerResult = await handler({
    session,
    message: input.customerMessage,
    chatHistory: input.chatHistory,
    senderNumber,
    senderName,
  });

  // === 6. FINALISASI SESI ===
const finalSession = mergeSession(session, {
  ...handlerResult.updatedSession,
  senderName: handlerResult.updatedSession?.senderName ?? senderName,
  lastInteraction: Timestamp.now(),
});

await updateSession(senderNumber, finalSession);
console.log(`[FlowController] Sesi untuk ${senderNumber} di-update.`);


  // === 7. BALASAN ===
  const replyMessage =
    handlerResult.reply.message || handlerResult.reply.suggestedReply || '';

  return { suggestedReply: replyMessage };
}
