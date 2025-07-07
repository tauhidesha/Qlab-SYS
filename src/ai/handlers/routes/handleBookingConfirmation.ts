// File: src/ai/handlers/routes/handleBookingConfirmation.ts

import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';
import { Timestamp } from 'firebase/firestore';

export const handleBookingConfirmation: RouteHandlerFn = async ({
  session,
  senderNumber,
  senderName,
}) => {
  const pendingDate = session?.inquiry?.pendingBookingDate;
  const pendingTime = session?.inquiry?.pendingBookingTime;
  const serviceName = session?.inquiry?.lastMentionedService || 'layanan yang dibicarakan';
  const vehicleInfo = session?.inquiry?.lastMentionedMotor || 'motor';

  if (!pendingDate || !pendingTime) {
    return {
      reply: { message: 'Zoya belum punya slot yang pasti nih bro. Coba minta jadwal dulu ya.' },
      updatedSession: session,
    };
  }

  const prefilledName = senderName || 'Pelanggan WhatsApp';
  const prefilledPhone = senderNumber?.replace('@c.us', '') || '-';

  const formTemplate = `Siap bro! Isi form ini ya biar Zoya bisa catat:

Nama: ${prefilledName}
No HP: ${prefilledPhone}
Motor: ${vehicleInfo}
Plat Nomor:
Tanggal: ${pendingDate}
Jam: ${pendingTime}
Layanan: ${serviceName}

Kirim balik aja setelah diisi. Nanti Zoya langsung proses bookingnya.`;

  const newSession: Partial<SessionData> = {
    ...session,
    flow: 'awaiting_booking_form',
    lastInteraction: Timestamp.now(),
    lastRoute: 'booking_confirmation',
  };

  return {
    reply: { message: formTemplate },
    updatedSession: newSession,
  };
};