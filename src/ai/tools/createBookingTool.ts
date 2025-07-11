import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

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
          serviceName: { type: 'string', description: 'Nama layanan yang dibooking' },
          bookingDate: { type: 'string', description: 'Tanggal booking, format YYYY-MM-DD' },
          bookingTime: { type: 'string', description: 'Jam booking, format HH:mm' },
          vehicleInfo: { type: 'string', description: "Informasi kendaraan, cth: 'Vario 160 Merah'" },
        },
        required: ['customerPhone', 'serviceName', 'bookingDate', 'bookingTime', 'vehicleInfo'],
      },
    },
  },

  implementation: async ({
  customerPhone,
  serviceName,
  bookingDate,
  bookingTime,
  vehicleInfo,
}: {
  customerPhone: string;
  serviceName: string;
  bookingDate: string;
  bookingTime: string;
  vehicleInfo: string;
}) => {
  try {
    const today = new Date();
const inputDate = new Date(`${bookingDate}T${bookingTime}:00`);

if (inputDate < today) {
  // ⛑️ Kalau tanggal sudah lewat, auto perbaiki jadi besok
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  bookingDate = tomorrow.toISOString().slice(0, 10);
}

    const combinedDateTime = new Date(`${bookingDate}T${bookingTime}:00`);
    const bookingDateTime = Timestamp.fromDate(combinedDateTime);

    const docRef = await addDoc(collection(db, 'bookings'), {
      customerPhone,
      serviceName,
      bookingDate,
      bookingTime,
      vehicleInfo,
      bookingDateTime, // ✅ disimpan sesuai format POS
      createdAt: Timestamp.now(),
      status: 'pending', // default status
    });

    return {
      success: true,
      message: `Booking berhasil dicatat untuk ${serviceName} pada ${bookingDate} jam ${bookingTime}`,
      bookingId: docRef.id,
    };
  } catch (error) {
    console.error('[createBookingTool] Gagal menyimpan booking:', error);
    return {
      success: false,
      message: 'Gagal menyimpan booking. Coba lagi nanti.',
    };
  }
},
};
