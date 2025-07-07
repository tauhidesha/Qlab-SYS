// File: src/ai/handlers/routes/handleBookingConfirmation.ts

import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';
import { createBookingImplementation } from '@/ai/tools/impl/createBookingImplementation';
import { updateSession } from '../../utils/session';
import { Timestamp } from 'firebase/firestore';
import { findOrCreateClientByPhone } from '@/ai/utils/clientHelpers';

export const handleBookingConfirmation: RouteHandlerFn = async ({
  session,
  senderNumber,
  senderName,
}) => {
  const bookingState = session?.inquiry?.bookingState;
  const pendingDate = session?.inquiry?.pendingBookingDate;
  const pendingTime = session?.inquiry?.pendingBookingTime;

  let bookingDetails = null;

  if (bookingState?.bookingDate && bookingState.bookingTime && bookingState.serviceName) {
    bookingDetails = {
      bookingDate: bookingState.bookingDate,
      bookingTime: bookingState.bookingTime,
      serviceName: bookingState.serviceName,
      vehicleInfo: session.inquiry.lastMentionedMotor || 'Belum disebutkan',
    };
  } else if (pendingDate && pendingTime) {
    bookingDetails = {
      bookingDate: pendingDate,
      bookingTime: pendingTime,
      serviceName: session.inquiry.lastMentionedService || 'Layanan yang dibicarakan',
      vehicleInfo: session.inquiry.lastMentionedMotor || 'Belum disebutkan',
    };
  }

  if (!bookingDetails) {
    return {
      reply: { message: 'Maaf, Zoya belum punya data lengkap untuk membuat booking.' },
      updatedSession: session,
    };
  }
  
  const clientId = await findOrCreateClientByPhone(senderNumber!.replace('@c.us', ''), senderName || 'Pelanggan WhatsApp');

  const createBookingInput = {
    ...bookingDetails,
    customerPhone: senderNumber!.replace('@c.us', ''),
    customerName: senderName || 'Pelanggan WhatsApp',
    serviceId: '',
    clientId: clientId,
    licensePlate: '', // Tambahkan fallback
  };

  const result = await createBookingImplementation(createBookingInput);

  if (result.success === false) {
    return {
      reply: { message: result.message || 'Maaf, terjadi kesalahan saat membuat booking.' },
      updatedSession: session,
    };
  }

  // --- INI PERBAIKANNYA ---
  const newSession: Partial<SessionData> = {
    flow: 'general',
    inquiry: {},
    lastInteraction: Timestamp.now(),
    followUpState: null,
    lastRoute: 'booking_confirmation',
  };
  
  // Hanya tambahkan senderName jika ada di sesi lama
  if (session?.senderName) {
    newSession.senderName = session.senderName;
  }
  // --- AKHIR PERBAIKAN ---

  await updateSession(senderNumber!, newSession);

  return {
    reply: {
      message: `✅ Booking berhasil! Zoya udah catat:\n📅 *${bookingDetails.bookingDate}* jam *${bookingDetails.bookingTime}*\n🛠️ *${bookingDetails.serviceName}*\n🏍️ *${bookingDetails.vehicleInfo}*\n\nTinggal datang aja ya, bro!`,
    },
    updatedSession: newSession,
  };
};