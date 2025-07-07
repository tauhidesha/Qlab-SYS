// File: src/ai/handlers/routes/handleBookingFormSubmission.ts

import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';
import { parseBookingForm } from '../../utils/messageParsers';
import { createBookingImplementation } from '../../tools/impl/createBookingImplementation';
import { updateSession } from '../../utils/session';
import { getServiceIdByName } from '../../utils/dbHelpers';
import { findOrCreateClientByPhone } from '../../utils/clientHelpers';
import { getServiceCategory } from '../../utils/getServiceCategory';
import { checkBookingAvailabilityImplementation } from '../../tools/impl/checkBookingAvailabilityImplementation';
import { Timestamp } from 'firebase/firestore';

export const handleBookingFormSubmission: RouteHandlerFn = async ({
  session,
  message,
  senderNumber,
}) => {
  const formDetails = parseBookingForm(message!);

  if (!formDetails) {
    return {
      reply: { message: 'Waduh bro, sepertinya format isiannya ada yang salah.' },
      updatedSession: { ...session, flow: 'general' } as SessionData,
    };
  }
  
  const serviceName = formDetails.serviceName;
  const category = getServiceCategory(serviceName);

  if (category !== 'repaint') {
    const availabilityResult = await checkBookingAvailabilityImplementation({
      bookingDate: formDetails.bookingDate,
      bookingTime: formDetails.bookingTime,
      serviceName: serviceName,
      estimatedDurationMinutes: 180,
    });

    if (!availabilityResult.isAvailable) {
      return {
        reply: { message: availabilityResult.reason || 'Maaf bro, jadwal di waktu itu nggak tersedia.' },
        updatedSession: { ...session, flow: 'general' } as SessionData,
      };
    }
  }

  const clientName = formDetails.customerName || session?.senderName || 'Pelanggan WhatsApp';
  const clientId = await findOrCreateClientByPhone(formDetails.customerPhone, clientName);

  const serviceId = await getServiceIdByName(serviceName);
  const bookingResult = await createBookingImplementation({
    customerName: clientName,
    customerPhone: formDetails.customerPhone,
    vehicleInfo: formDetails.vehicleInfo,
    licensePlate: formDetails.licensePlate || '',
    serviceName: serviceName,
    bookingDate: formDetails.bookingDate,
    bookingTime: formDetails.bookingTime,
    serviceId: serviceId || '',
    clientId: clientId,
  });

  if (bookingResult.success === false) {
    return {
        reply: { message: bookingResult.message || 'Gagal membuat booking dari form.'},
        updatedSession: session,
    };
  }

  // --- INI PERBAIKANNYA ---
  const newSession: Partial<SessionData> = {
    flow: 'general',
    inquiry: {},
    lastInteraction: Timestamp.now(),
    followUpState: null,
    lastRoute: 'booking_form_submission',
  };

  // Hanya tambahkan senderName jika ada di sesi lama
  if (session?.senderName) {
    newSession.senderName = session.senderName;
  }
  // --- AKHIR PERBAIKAN ---

  await updateSession(senderNumber!, newSession);

  return {
    reply: { message: '✅ Oke, booking dari form sudah Zoya catat! Makasih ya, bro.' },
    updatedSession: newSession,
  };
};