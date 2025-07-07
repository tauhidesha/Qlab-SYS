

import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getServiceCategory } from '@/ai/utils/getServiceCategory';

// --- PERBAIKAN DI SINI ---
// Tambahkan 'clientId' ke dalam tipe data input
interface BookingInput {
  customerName: string;
  customerPhone: string;
  vehicleInfo: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  serviceId: string;
  licensePlate: string;
  clientId: string; // <-- Tambahkan baris ini
}
// -------------------------

interface BookingResult {
  success: boolean;
  message: string;
  bookingId?: string;
}

export async function createBookingImplementation(
  input: BookingInput,
): Promise<BookingResult> {
  try {
    const {
      customerName,
      customerPhone,
      vehicleInfo,
      serviceName,
      bookingDate,
      bookingTime,
      serviceId,
      clientId, // <-- Ambil clientId dari input
    } = input;

    const bookingDateTime = new Date(`${bookingDate}T${bookingTime}:00`);
    const category = getServiceCategory(serviceName);

    const newBooking = {
      bookingDateTime: Timestamp.fromDate(bookingDateTime),
      clientId: clientId, // <-- Gunakan clientId yang sudah dinamis
      customerName,
      customerPhone,
      notes: '',
      serviceId,
      serviceName,
      source: 'AI-Form',
      status: 'Confirmed',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      vehicleInfo,
      category,
    };

    const docRef = await addDoc(collection(db, 'bookings'), newBooking);
    console.log(`[CreateBookingImpl] Booking berhasil dibuat dengan ID: ${docRef.id}`);

    return { success: true, message: '✅ Booking berhasil dibuat! Zoya udah catat jadwalnya.', bookingId: docRef.id };
  } catch (err: any) {
    console.error('[createBookingImplementation] Error saat membuat booking:', err);
    return { success: false, message: 'Gagal membuat booking. Coba lagi nanti ya.' };
  }
}