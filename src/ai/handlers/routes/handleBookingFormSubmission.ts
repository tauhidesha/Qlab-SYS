// File: src/ai/handlers/routes/handleBookingFormSubmission.ts

import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';
import { parseBookingForm } from '../../utils/messageParsers';
import { parseDateTime } from '../../utils/dateTimeParser';
import { checkBookingAvailabilityImplementation } from '../../tools/impl/checkBookingAvailabilityImplementation';
import { createBookingImplementation } from '../../tools/impl/createBookingImplementation';
import { updateSession } from '../../utils/session';
import { getServiceIdByName } from '../../utils/dbHelpers';
import { findOrCreateClientByPhone } from '../../utils/clientHelpers';
import { getServiceCategory } from '../../utils/getServiceCategory';
import { Timestamp } from 'firebase/firestore';

export const handleBookingFormSubmission: RouteHandlerFn = async ({
  session,
  message,
  senderNumber,
}) => {
  console.log(`[Handler] Mencoba mem-parsing form booking dari user.`);
  const formDetails = parseBookingForm(message!);

  if (!formDetails) {
    return {
      reply: {
        message:
          'Waduh bro, sepertinya format isiannya ada yang salah. Boleh tolong copy-paste template sebelumnya dan isi lagi bagian yang kosong? Makasih ya.',
      },
      updatedSession: { ...session, flow: 'general' } as SessionData,
    };
  }

  const combinedDateTime = `${formDetails.bookingDate} ${formDetails.bookingTime}`;
  const parsedDateTime = await parseDateTime(combinedDateTime);

  if (!parsedDateTime.date || !parsedDateTime.time) {
    return {
      reply: {
        message:
          'Waduh bro, Zoya bingung sama format tanggal atau jamnya. Boleh tolong isi formnya lagi dengan format yang lebih jelas? (Contoh: TANGGAL: 5 Juli 2025, JAM: 14:00)',
      },
      updatedSession: { ...session, flow: 'general' } as SessionData,
    };
  }
  
  const serviceName = formDetails.serviceName;
  const category = getServiceCategory(serviceName);

  // --- INI PERBAIKAN UTAMANYA ---
  // Hanya jalankan pengecekan ketersediaan jika BUKAN repaint
  if (category !== 'repaint') {
    console.log(`[Handler] Menjalankan pengecekan ketersediaan untuk kategori: ${category}`);
    const availabilityResult = await checkBookingAvailabilityImplementation({
      bookingDate: parsedDateTime.date,
      bookingTime: parsedDateTime.time,
      serviceName: serviceName,
      estimatedDurationMinutes: 180, // Default
    });

    if (!availabilityResult.isAvailable) {
      return {
        reply: {
          message:
            availabilityResult.reason ||
            'Maaf bro, jadwal di waktu itu nggak tersedia. Mau coba isi form lagi dengan jadwal lain?',
        },
        updatedSession: { ...session, flow: 'general' } as SessionData,
      };
    }
  } else {
    console.log('[Handler] Layanan adalah repaint, melewati pengecekan ketersediaan akhir.');
  }
  // --- AKHIR PERBAIKAN ---

  // Dapatkan atau buat ID klien
  const clientName = formDetails.customerName || session?.senderName || 'Pelanggan WhatsApp';
  const clientId = await findOrCreateClientByPhone(formDetails.customerPhone, clientName);

  // Buat Booking
  const serviceId = await getServiceIdByName(serviceName);
  const bookingResult = await createBookingImplementation({
    customerName: clientName,
    customerPhone: formDetails.customerPhone,
    vehicleInfo: formDetails.vehicleInfo,
    serviceName: serviceName,
    bookingDate: parsedDateTime.date,
    bookingTime: parsedDateTime.time,
    serviceId: serviceId || '',
    clientId: clientId,
  });

  // Reset sesi setelah booking berhasil
  const newSession: SessionData = {
    flow: 'general',
    inquiry: {},
    lastInteraction: Timestamp.now(),
    followUpState: null,
    lastRoute: 'booking_form_submission',
    senderName: session?.senderName,
  };
  await updateSession(senderNumber!, newSession);

  return {
    reply: { message: bookingResult.message || 'Booking berhasil dibuat, bro! Makasih ya.' },
    updatedSession: newSession,
  };
};