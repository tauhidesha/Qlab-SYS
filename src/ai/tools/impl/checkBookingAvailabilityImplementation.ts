// File: src/ai/tools/impl/checkBookingAvailabilityImplementation.ts

import admin from 'firebase-admin';
import { getFirebaseAdmin } from '../../../lib/firebase-admin';
import { checkBookingAvailabilitySchema } from '../../schema/checkBookingAvailabilitySchema';
import { getServiceCategory } from '../../utils/getServiceCategory';

import { z } from 'zod';

type Input = z.infer<typeof checkBookingAvailabilitySchema>;

type Result = {
  isAvailable: boolean;
  reason?: string;
  overnightWarning?: string;
};

export async function checkBookingAvailabilityImplementation(input: Input): Promise<Result> {
  const {
    bookingDate,
    bookingTime,
    serviceName,
    estimatedDurationMinutes
  } = checkBookingAvailabilitySchema.parse(input);

  console.log(`[CheckAvailTool] Cek slot untuk ${serviceName} pada ${bookingDate} ${bookingTime}`);

  const [hours] = bookingTime.split(':').map(Number);
  if (hours < 9 || hours >= 17) {
    return {
      isAvailable: false,
      reason: 'Pemesanan hanya bisa dilakukan antara jam 09:00 - 16:59.'
    };
  }

  const db = getFirebaseAdmin().firestore();
  const bookingsRef = db.collection('bookings');
  const category = getServiceCategory(serviceName);

  // --- Kapasitas Harian Detailing & Coating ---
  if (category === 'detailing' || category === 'coating') {
    const startOfDay = new Date(`${bookingDate}T00:00:00`);
    const endOfDay = new Date(`${bookingDate}T23:59:59`);

    const snapshot = await bookingsRef
      .where('bookingDateTime', '>=', admin.firestore.Timestamp.fromDate(startOfDay))
      .where('bookingDateTime', '<=', admin.firestore.Timestamp.fromDate(endOfDay))
      .where('category', 'in', ['detailing', 'coating'])
      .get();
    if (snapshot.size >= 2) {
      return {
        isAvailable: false,
        reason: `Maaf, kuota layanan Detailing & Coating pada ${bookingDate} sudah penuh (maksimal 2 per hari).`
      };
    }
  }

  // --- Kapasitas Aktif Repaint ---
  if (category === 'repaint') {
    const now = new Date(`${bookingDate}T${bookingTime}:00`);
    const fiveDaysAgo = new Date(now);
    fiveDaysAgo.setDate(now.getDate() - 5);

    const snapshot = await bookingsRef
      .where('category', '==', 'repaint')
      .where('bookingDateTime', '>=', admin.firestore.Timestamp.fromDate(fiveDaysAgo))
      .where('bookingDateTime', '<=', admin.firestore.Timestamp.fromDate(now))
      .where('status', 'in', ['Confirmed', 'In Queue', 'In Progress'])
      .get();

    if (snapshot.size >= 2) {
      return {
        isAvailable: false,
        reason: `Slot Repaint sedang penuh. Maksimal 2 motor dalam periode aktif (5 hari terakhir).`
      };
    }
  }


  // --- Estimasi waktu menginap jika lewat jam 17.00 ---
  const bookingStartTime = new Date(`${bookingDate}T${bookingTime}:00`);
  const bookingEndTime = new Date(bookingStartTime.getTime() + estimatedDurationMinutes * 60000);
  const closingTime = new Date(`${bookingDate}T17:00:00`);

  let overnightWarning: string | undefined;
  if (bookingEndTime > closingTime) {
    const estHours = Math.round(estimatedDurationMinutes / 60);
    overnightWarning = `Karena durasi layanan sekitar ${estHours} jam, motornya kemungkinan besar perlu menginap.`;
  }

  return {
    isAvailable: true,
    overnightWarning
  };
}