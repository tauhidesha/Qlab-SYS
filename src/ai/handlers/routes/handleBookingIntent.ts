// File: src/ai/handlers/routes/handleBookingIntent.ts

import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';
import { extractBookingDetailsTool } from '@/ai/tools/extractBookingDetailsTool';
import { checkBookingAvailabilityImplementation } from '@/ai/tools/impl/checkBookingAvailabilityImplementation';
import { getClientName } from '../../utils/clientHelpers';
import { Timestamp } from 'firebase/firestore';

export const handleBookingIntent: RouteHandlerFn = async ({
  session,
  message,
  senderNumber,
}) => {
  const customerMessage = message || '';

  // === CASE 1: User menyetujui jadwal yang ditawarkan ===
  if (session?.lastRoute === 'schedule' && session.inquiry?.pendingBookingDate) {
    console.log('[BookingIntent] Deteksi user menyetujui jadwal → kirim template form booking.');

    const clientName = await getClientName(senderNumber!);
    const layanan = session.inquiry.lastMentionedService || '';
    const motor = session.inquiry.lastMentionedMotor || '';
    const tanggal = session.inquiry.pendingBookingDate;
    const jam = layanan.toLowerCase().includes('repaint') ? '(Sesuai antrian)' : '';
    const nohp = senderNumber?.replace('@c.us', '') || '';

    const bookingTemplate = `Siap, gaskeun! 🔥
Biar cepet, tolong isi data di bawah ini ya bro, tinggal copy-paste aja.

Nama : ${clientName || ''}
No Hp : ${nohp}
TANGGAL : ${tanggal}
JAM : ${jam}
LAYANAN: ${layanan}
MOTOR: ${motor}
PLAT NOMOR:`;

    const updatedSession: SessionData = {
      ...session,
      flow: 'awaiting_booking_form',
      lastRoute: 'booking_intent',
      lastInteraction: Timestamp.now(),
    };

    return {
      reply: { message: bookingTemplate },
      updatedSession,
    };
  }

  // === CASE 2: User langsung menyebut tanggal & jam ===
  const extracted = await extractBookingDetailsTool({ user_query: customerMessage });

  if (!extracted.success) {
    return {
      reply: {
        message: 'Zoya belum bisa nangkep detail bookingnya nih 🧐. Bisa sebutin tanggal, jam, dan layanan yang kamu mau?',
      },
      updatedSession: {
        ...session,
        lastRoute: 'booking_intent_failed',
        lastInteraction: Timestamp.now(),
      } as SessionData,
    };
  }

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
      lastInteraction: Timestamp.now(),
      inquiry: {
        ...session?.inquiry,
        bookingState: { bookingDate, bookingTime, serviceName, estimatedDurationMinutes },
      },
    };

    return {
      reply: {
        message: `Slot tersedia untuk layanan *${serviceName}* pada *${bookingDate}* jam *${bookingTime}* ✅${
          availability.overnightWarning ? `\n⚠️ ${availability.overnightWarning}` : ''
        }\n\nKalau cocok, tinggal bilang *"ya"* atau *"setuju"*, biar Zoya langsung bookingin.`,
      },
      updatedSession,
    };
  } else {
    return {
      reply: {
        message:
          availability.reason || 'Maaf, jadwalnya lagi penuh 😔. Coba pilih tanggal atau jam lain ya!',
      },
      updatedSession: {
        ...session,
        lastRoute: 'booking_intent_unavailable',
        lastInteraction: Timestamp.now(),
      } as SessionData,
    };
  }
};