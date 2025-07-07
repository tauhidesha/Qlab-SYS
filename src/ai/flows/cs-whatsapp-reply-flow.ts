'use server';

import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import { getSession, updateSession } from '@/ai/utils/session';
import { determineRoute } from '@/ai/handlers/routeRouter';
import { routeHandlers } from '@/ai/handlers/routeHandlers';
import { mapTermToOfficialService } from '@/ai/utils/messageParsers';
import { Timestamp } from 'firebase/firestore';
import type { SessionData } from '@/ai/utils/session';

/**
 * Ini adalah Flow Controller utama yang sudah di-refactor.
 * Tugasnya hanya sebagai "konduktor" yang mengarahkan alur, bukan lagi sebagai "pemain".
 */
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<WhatsAppReplyOutput | null> {
  const senderNumber = input.senderNumber || 'playground_user';
  let session = await getSession(senderNumber);

  console.log(`\n\n================ Zoya New Turn for ${senderNumber} ================`);
  console.log(`[PESAN MASUK]: "${input.customerMessage}"`);
  console.log(`[LOG SESI AWAL]:`, JSON.stringify(session, null, 2));

  // === TAHAP 1: PRE-FLIGHT CHECKS & SESSION MANAGEMENT ===
  // Cek mode diam (snooze)
  if (session?.snoozeUntil && Date.now() < session.snoozeUntil) {
    console.log(`[FlowController] Mode diam aktif. Tidak ada balasan.`);
    return null;
  }

  // Batalkan follow-up otomatis jika ada pesan baru
  if (session?.followUpState) {
    console.log(`[FlowController] Follow-up dibatalkan karena ada pesan baru.`);
    session.followUpState = null;
  }

  

  // Inisialisasi sesi baru jika belum ada
  if (!session) {
    console.log(`[FlowController] Sesi baru dibuat untuk ${senderNumber}.`);
    session = {
      flow: 'general',
      inquiry: {},
      lastInteraction: Timestamp.now(),
      followUpState: null,
      lastRoute: 'init',
    };

     if (!session) {
    console.log(`[FlowController] Sesi baru dibuat untuk ${senderNumber}.`);
    session = {
      flow: 'general',
      inquiry: {},
      lastInteraction: Timestamp.now(),
      followUpState: null,
      lastRoute: 'init',
      // Langsung simpan nama saat sesi pertama kali dibuat
      senderName: input.senderName, 
    };
  }
   // --- PERBAIKAN TAMBAHAN (OPSIONAL TAPI BAGUS) ---
  // Update nama jika sesi sudah ada tapi belum punya nama
  if (session && !session.senderName && input.senderName) {
      session.senderName = input.senderName;
      // Tidak perlu await update di sini, karena akan di-update di akhir alur
  }
  }

  // === TAHAP 2: PRE-PROCESSING PESAN ===
  // Coba petakan istilah awam ke nama layanan resmi di awal
  const detectedServiceName = mapTermToOfficialService(input.customerMessage);
  if (detectedServiceName && session.inquiry) {
    console.log(`[FlowController] Istilah terpetakan ke: "${detectedServiceName}"`);
    session.inquiry.lastMentionedService = detectedServiceName;
  }

  // === TAHAP 3: ROUTING ===
  // Serahkan keputusan alur sepenuhnya ke router
  const routeName = await determineRoute(input.customerMessage, session);
  console.log(`[FlowController] Pesan dialihkan ke rute: "${routeName}"`);

  // === TAHAP 4: HANDLING ===
  // Ambil fungsi handler yang sesuai dari peta rute
  const handler = routeHandlers[routeName];

  if (!handler) {
    console.error(`[FlowController] FATAL: Tidak ada handler untuk rute "${routeName}".`);
    // Ini adalah fallback darurat jika ada rute yang tidak terdaftar di routeHandlers
    return { suggestedReply: "Aduh, Zoya lagi bingung nih, sistemnya ada yang aneh. Bentar ya." };
  }

  // Jalankan handler yang terpilih
  const handlerResult = await handler({
    session: session,
    message: input.customerMessage,
    chatHistory: input.chatHistory,
    senderNumber: senderNumber,
    senderName: input.senderName,
  });

  // === TAHAP 5: FINALISASI ===
  // Update sesi dengan data baru dari handler
  if (handlerResult.updatedSession) {
    await updateSession(senderNumber, handlerResult.updatedSession);
    console.log(`[FlowController] Sesi untuk ${senderNumber} di-update.`);
  }

  // Kirim balasan yang disarankan oleh handler
const replyMessage = handlerResult.reply.message || handlerResult.reply.suggestedReply || '';
return { suggestedReply: replyMessage };
}
