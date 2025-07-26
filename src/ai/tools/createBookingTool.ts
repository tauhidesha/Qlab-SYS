import { getFirebaseAdmin } from '../../lib/firebase-admin';
import admin from 'firebase-admin';
import { z } from 'zod';

// Helper fuzzy match
function stringSimilarity(a: string, b: string): number {
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.9;
  let matches = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) matches++;
  }
  return matches / Math.max(a.length, b.length);
}

export function getServiceCategory(serviceName: string): 'detailing' | 'coating' | 'repaint' | 'other' {
  const name = serviceName.toLowerCase();
  if (name.includes('detailing') || name.includes('poles')) return 'detailing';
  if (name.includes('coating')) return 'coating';
  if (name.includes('repaint')) return 'repaint';
  return 'other';
}

export const createBookingTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'createBooking',
      description: 'Membuat booking baru di sistem setelah ketersediaan dikonfirmasi.',
      parameters: {
        type: 'object',
        properties: {
          customerPhone: { type: 'string', description: 'Nomor telepon pelanggan' },
          customerName: { type: 'string', description: 'Nama pelanggan' },
          serviceName: { type: 'string', description: 'Nama layanan yang dibooking (bisa lebih dari satu, dipisah koma)' },
          bookingDate: { type: 'string', description: 'Tanggal booking, format YYYY-MM-DD' },
          bookingTime: { type: 'string', description: 'Jam booking, format HH:mm' },
          vehicleInfo: { type: 'string', description: "Informasi kendaraan, cth: 'Vario 160 Merah'" },
        },
        required: ['customerPhone', 'customerName', 'serviceName', 'bookingDate', 'bookingTime', 'vehicleInfo'],
      },
    },
  },
  implementation: async (args) => {
    // 1. Validasi input dengan Zod
    const BookingArgsSchema = z.object({
      customerPhone: z.string(),
      customerName: z.string(),
      serviceName: z.string(),
      bookingDate: z.string(),
      bookingTime: z.string(),
      vehicleInfo: z.string(),
      clientId: z.string().optional(),
    });
    let parsed;
    try {
      parsed = BookingArgsSchema.parse(args);
    } catch (error) {
      return {
        success: false,
        error: 'Input tidak valid: ' + (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
    try {
      const { 
        customerName, 
        customerPhone, 
        serviceName, 
        bookingDate, 
        bookingTime, 
        vehicleInfo 
      } = parsed;

      // 2. Pecah string serviceName menjadi array
      const servicesArray = serviceName.split(',').map(s => s.trim());

      // 3. Gabungkan tanggal dan waktu menjadi satu objek Date JavaScript
      const dateTimeString = `${bookingDate}T${bookingTime}:00`;
      const bookingDateTime = new Date(dateTimeString);
      if (isNaN(bookingDateTime.getTime())) {
        throw new Error(`Format tanggal atau waktu tidak valid: ${dateTimeString}`);
      }

      // 4. Siapkan objek data yang BERSIH untuk disimpan ke Firestore
      const bookingData = {
        customerName,
        customerPhone,
        vehicleInfo,
        bookingDateTime: admin.firestore.Timestamp.fromDate(bookingDateTime),
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        services: servicesArray,
        category: getServiceCategory(servicesArray[0]),
      };

      const db = getFirebaseAdmin().firestore();
      const bookingRef = await db.collection('bookings').add(bookingData);

      console.log(`[createBookingTool] Booking berhasil dibuat dengan ID: ${bookingRef.id}`);
      return {
        success: true,
        bookingId: bookingRef.id,
        message: `Booking untuk ${customerName} pada ${bookingDate} jam ${bookingTime} berhasil dibuat.`,
      };
    } catch (error) {
      console.error('[createBookingTool] Gagal menyimpan booking:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : JSON.stringify(error),
      };
    }
  },
};
