// File: src/ai/handlers/routes/handleBookingIntent.ts

import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';
import { extractBookingDetailsTool } from '@/ai/tools/extractBookingDetailsTool';
import { checkBookingAvailabilityImplementation } from '@/ai/tools/impl/checkBookingAvailabilityImplementation';
import { updateSession } from '../../utils/session';
// --- INI PERBAIKANNYA ---
// Tambahkan baris ini untuk mengimpor fungsi getClientName
import { getClientName } from '../../utils/clientHelpers';
// -------------------------

export const handleBookingIntent: RouteHandlerFn = async ({
  session,
  message,
  senderNumber,
}) => {
  const customerMessage = message || '';

  // Cek dulu apakah ini adalah konfirmasi dari penawaran jadwal sebelumnya
  if (session?.lastRoute === 'schedule' && session.inquiry?.pendingBookingDate) {
    console.log('[Handler] Konfirmasi jadwal terdeteksi. Mengirim form booking...');

    // Panggil fungsi untuk mengambil nama dari Firestore
    const clientName = await getClientName(senderNumber!);

    const layanan = session.inquiry.lastMentionedService || '';
    const motor = session.inquiry.lastMentionedMotor || '';
    const tanggal = session.inquiry.pendingBookingDate;
    const jam = layanan.toLowerCase().includes('repaint') ? '(Sesuai antrian)' : '';

    const bookingTemplate = `Siap, gaskeun! 🔥
Biar cepet, tolong isi data di bawah ini ya bro, tinggal copy-paste aja.

Nama : ${clientName || ''}
No Hp : ${senderNumber?.replace('@c.us', '') || ''}
TANGGAL : ${tanggal}
JAM : ${jam}
LAYANAN: ${layanan}
MOTOR: ${motor}
`;
    
    const updatedSession = {
      ...session,
      flow: 'awaiting_booking_form',
      lastRoute: 'booking_intent',
    } as SessionData;
    await updateSession(senderNumber!, updatedSession);

    return {
      reply: { message: bookingTemplate },
      updatedSession: updatedSession,
    };
  }

  // Jika bukan konfirmasi, jalankan alur lama (mencoba ekstrak dari pesan)
  const extracted = await extractBookingDetailsTool({ user_query: customerMessage });

  if (!extracted.success) {
    return {
      reply: { message: 'Zoya belum bisa nangkep detail bookingnya nih 🧐. Bisa sebutin tanggal, jam, dan layanan yang kamu mau?' },
      updatedSession: { ...session, lastRoute: 'booking_intent_failed' } as SessionData,
    };
  }

  // Jika ekstraksi berhasil, lanjutkan ke pengecekan ketersediaan
  const { bookingDate, bookingTime, serviceName, estimatedDurationMinutes } = extracted;
  const availability = await checkBookingAvailabilityImplementation({
    bookingDate,
    bookingTime,
    serviceName,
    estimatedDurationMinutes,
  });

  if (availability.isAvailable) {
    const updatedSession: SessionData = {
      ...session,
      lastRoute: 'booking_intent',
      inquiry: {
        ...session?.inquiry,
        bookingState: { bookingDate, bookingTime, serviceName, estimatedDurationMinutes },
      },
    } as SessionData;
    await updateSession(senderNumber!, updatedSession);
    return {
      reply: {
        message: `Slot tersedia untuk layanan *${serviceName}* pada ${bookingDate} jam ${bookingTime} ✅${
          availability.overnightWarning ? `\n⚠️ ${availability.overnightWarning}` : ''
        }\n\nKalau cocok, tinggal bilang *"ya"* atau *"setuju"*, biar Zoya langsung bookingin. �`,
      },
      updatedSession: updatedSession,
    };
  } else {
    return {
      reply: {
        message: availability.reason || 'Maaf, jadwalnya lagi penuh 😔. Coba waktu lain ya!',
      },
      updatedSession: { ...session, lastRoute: 'booking_intent_unavailable' } as SessionData,
    };
  }
};