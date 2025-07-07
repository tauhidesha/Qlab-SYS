// File: src/ai/handlers/routes/handleBookingConfirmation.ts

import type { RouteHandlerFn } from './types';
import { Timestamp } from 'firebase/firestore';
import type { SessionData } from '@/ai/utils/session';

export const handleBookingConfirmation: RouteHandlerFn = async ({
  session,
  senderNumber,
  senderName,
}) => {
  // --- Ekstrak data dari sesi ---
  const inquiry = session.inquiry || {};
  const pendingDate = inquiry.pendingBookingDate;
  const pendingTime = inquiry.pendingBookingTime;
  const serviceName = inquiry.lastMentionedService || 'layanan yang dibicarakan';
  const vehicleInfo = inquiry.lastMentionedMotor || 'motor';

  // --- Validasi: tanggal & jam booking harus ada ---
  if (!pendingDate || !pendingTime) {
    return {
      reply: {
        message: 'Zoya belum punya slot yang pasti nih bro. Coba minta jadwal dulu ya.',
      },
      updatedSession: {
        lastInteraction: Timestamp.now(),
        lastRoute: 'booking_confirmation',
      },
    };
  }

  // --- Prefilled data untuk form ---
  const prefilledName = senderName || session.senderName || 'Pelanggan WhatsApp';
  const prefilledPhone = senderNumber.replace('@c.us', '');

  const formTemplate = `Siap bro! Isi form ini ya biar Zoya bisa catat:

Nama: ${prefilledName}
No HP: ${prefilledPhone}
Motor: ${vehicleInfo}
Plat Nomor:
Tanggal: ${pendingDate}
Jam: ${pendingTime}
Layanan: ${serviceName}

Kirim balik aja setelah diisi. Nanti Zoya langsung proses bookingnya.`;

  // --- Update sesi dengan state baru ---
  const updatedSession: Partial<SessionData> = {
    flow: 'awaiting_booking_form',
    lastInteraction: Timestamp.now(),
    lastRoute: 'booking_confirmation',
    senderName: prefilledName,
    inquiry: {
      ...session.inquiry,
    },
    followUpState: null,
  };

  return {
    reply: { message: formTemplate },
    updatedSession,
  };
};
