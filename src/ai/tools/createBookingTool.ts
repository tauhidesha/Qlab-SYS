import { getFirebaseAdmin } from '../../lib/firebase-admin';
import admin from 'firebase-admin';

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

function getServiceCategory(serviceName: string): 'detailing' | 'coating' | 'repaint' | 'other' {
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
          serviceName: { type: 'string', description: 'Nama layanan yang dibooking' },
          bookingDate: { type: 'string', description: 'Tanggal booking, format YYYY-MM-DD' },
          bookingTime: { type: 'string', description: 'Jam booking, format HH:mm' },
          vehicleInfo: { type: 'string', description: "Informasi kendaraan, cth: 'Vario 160 Merah'" },
          notes: { type: 'string', description: 'Catatan tambahan', nullable: true },
        },
        required: ['customerPhone', 'customerName', 'serviceName', 'bookingDate', 'bookingTime', 'vehicleInfo'],
      },
    },
  },

  implementation: async ({
    customerPhone,
    customerName,
    serviceName,
    bookingDate,
    bookingTime,
    vehicleInfo,
    notes,
  }: {
    customerPhone: string;
    customerName: string;
    serviceName: string;
    bookingDate: string;
    bookingTime: string;
    vehicleInfo: string;
    notes?: string;
  }) => {
    try {
      const today = new Date();
      let inputDate = new Date(`${bookingDate}T${bookingTime}:00`);
      if (inputDate < today) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        bookingDate = tomorrow.toISOString().slice(0, 10);
        inputDate = new Date(`${bookingDate}T${bookingTime}:00`);
      }
      const bookingDateTime = admin.firestore.Timestamp.fromDate(inputDate);

      // Lookup clientId dari Firestore berdasarkan customerPhone
      let clientId: string | undefined = undefined;
      const db = getFirebaseAdmin().firestore();
      const clientSnap = await db.collection('clients').where('phone', '==', customerPhone).get();
      if (!clientSnap.empty) {
        clientId = clientSnap.docs[0].id;
      }

      // Lookup serviceId dari Firestore (case-insensitive, fuzzy)
      let serviceId: string | undefined = undefined;
      let estimatedDuration = undefined;
      let foundServiceName = serviceName;
      let serviceCategory: 'detailing' | 'coating' | 'repaint' | 'other' | undefined = undefined;
      const servicesSnap = await db.collection('services').get();
      let bestScore = 0;
      servicesSnap.forEach(docSnap => {
        const data = docSnap.data();
        const score = stringSimilarity(serviceName, data.name);
        if (score > bestScore && score > 0.7) {
          bestScore = score;
          serviceId = docSnap.id;
          foundServiceName = data.name;
          estimatedDuration = data.estimatedDuration;
          serviceCategory = data.category; // Ambil kategori dari data service
        }
      });

      // Jika kategori tidak ada di service, coba tentukan dari nama.
      const category = serviceCategory || getServiceCategory(foundServiceName);

      // Simpan booking ke Firestore
      const bookingPayload: any = {
        customerName,
        customerPhone,
        clientId: clientId ?? null,
        vehicleInfo,
        serviceId,
        serviceName: foundServiceName,
        category,
        bookingDateTime,
        status: 'Pending',
        notes: notes || '',
        source: 'AI',
        estimatedDuration: estimatedDuration || undefined,
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now(),
      };

      const docRef = await db.collection('bookings').add(bookingPayload);

      // Jika booking untuk hari ini, buat queueItems dan update status booking
      const isToday = inputDate.toDateString() === today.toDateString();
      let queueItemId: string | undefined = undefined;
      if (isToday) {
        const queueItemData = {
          customerName,
          clientId,
          vehicleInfo,
          service: foundServiceName,
          serviceId,
          variantId: undefined,
          status: 'Menunggu',
          estimatedTime: estimatedDuration || 'N/A',
          bookingId: docRef.id,
          createdAt: bookingDateTime,
        };
        const queueDocRef = await db.collection('queueItems').add(queueItemData);
        queueItemId = queueDocRef.id;
        // Update booking yang sudah ada dengan queueItemId dan status baru
        await docRef.update({ queueItemId, status: 'In Queue' });
      }

      return {
        success: true,
        message: `Booking berhasil dicatat untuk ${foundServiceName} pada ${bookingDate} jam ${bookingTime}`,
        bookingId: docRef.id,
        serviceId,
        clientId,
        queueItemId,
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
