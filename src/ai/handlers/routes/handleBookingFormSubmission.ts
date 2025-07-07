// File: src/ai/handlers/routes/handleBookingFormSubmission.ts

import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';
import { parseBookingForm } from '../../utils/messageParsers';
import { createBookingImplementation } from '../../tools/impl/createBookingImplementation';
import { getServiceIdByName } from '../../utils/dbHelpers';
import { findOrCreateClientByPhone } from '../../utils/clientHelpers';
import { getServiceCategory } from '../../utils/getServiceCategory';
import { checkBookingAvailabilityImplementation } from '../../tools/impl/checkBookingAvailabilityImplementation';
import { Timestamp } from 'firebase/firestore';

export const handleBookingFormSubmission: RouteHandlerFn = async ({
  session,
  message,
  senderNumber,
  senderName,
}) => {
  console.log(`[Handler] Mencoba parsing form booking dari pesan pengguna.`);
  const formDetails = parseBookingForm(message!);

  if (!formDetails) {
    return {
      reply: {
        message:
          'Waduh bro, format isiannya ada yang kurang pas nih. Boleh tolong copy-paste template sebelumnya dan isi ulang ya?',
      },
      updatedSession: { ...session, flow: 'general' } as SessionData,
    };
  }

  const serviceName = formDetails.serviceName;
  const category = getServiceCategory(serviceName);

  if (category !== 'repaint') {
    console.log(`[Handler] Mengecek ketersediaan slot untuk layanan non-repaint.`);
    const availabilityResult = await checkBookingAvailabilityImplementation({
      bookingDate: formDetails.bookingDate,
      bookingTime: formDetails.bookingTime,
      serviceName: serviceName,
      estimatedDurationMinutes: 180,
    });

    if (!availabilityResult.isAvailable) {
      return {
        reply: {
          message:
            availabilityResult.reason ||
            'Maaf bro, jadwal di waktu itu nggak tersedia. Coba pilih waktu lain ya.',
        },
        updatedSession: { ...session, flow: 'general' } as SessionData,
      };
    }
  } else {
    console.log(`[Handler] Layanan repaint, slot tidak perlu dicek.`);
  }

  const clientName = formDetails.customerName || session?.senderName || 'Pelanggan WhatsApp';
  const clientPhone = formDetails.customerPhone || senderNumber!.replace('@c.us', '');
  const clientId = await findOrCreateClientByPhone(clientPhone, clientName);

  const serviceId = await getServiceIdByName(serviceName);

  const bookingResult = await createBookingImplementation({
    customerName: clientName,
    customerPhone: clientPhone,
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
      reply: {
        message: bookingResult.message || 'Gagal membuat booking dari form. Coba lagi nanti ya.',
      },
      updatedSession: session,
    };
  }

  // Reset sesi setelah booking berhasil
  const newSession: Partial<SessionData> = {
  flow: 'general',
  inquiry: {},
  lastInteraction: Timestamp.now(),
  followUpState: null,
  lastRoute: 'booking_form_submission',
  senderName: session?.senderName || senderName || 'Pelanggan WhatsApp',
};

  if (session?.senderName) {
    newSession.senderName = session.senderName;
  }

  // Tidak perlu updateSession langsung — generateWhatsAppReply akan melakukannya

  const confirmationMessage = `✅ Booking berhasil! Zoya udah catat detailnya:\n\n👤 *Nama:* ${clientName}\n📅 *Tanggal:* ${formDetails.bookingDate}\n⏰ *Jam:* ${formDetails.bookingTime}\n🛠️ *Layanan:* ${serviceName}\n🏍️ *Motor:* ${formDetails.vehicleInfo}\n🔢 *Plat Nomor:* ${formDetails.licensePlate || '-'}\n\nTinggal datang aja ya, bro! Kalau mau ubah atau batal, tinggal kabarin Zoya lagi 🙌`;

  return {
    reply: { message: confirmationMessage },
    updatedSession: newSession,
  };
};
