'use server';

// import { ai } from '@/ai/genkit'; // DIHAPUS
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, Timestamp, updateDoc, doc, getDoc } from 'firebase/firestore';
import { CreateBookingToolInputSchema, CreateBookingToolOutputSchema, type CreateBookingToolInput, type CreateBookingToolOutput } from '@/types/booking';
import { type ServiceProduct } from '@/app/(app)/services/page';
import { isSameDay, setHours, setMinutes, parse } from 'date-fns';

// Helper function untuk mendapatkan kategori dari nama layanan.
function getServiceCategory(serviceName: string): 'detailing' | 'coating' | 'repaint' | 'other' {
  const name = serviceName.toLowerCase();
  if (name.includes('detailing') || name.includes('poles')) return 'detailing';
  if (name.includes('coating')) return 'coating';
  if (name.includes('repaint')) return 'repaint';
  return 'other';
}

// Fungsi implementasi tool, sekarang diekspor secara langsung
export async function createBookingImplementation(input: CreateBookingToolInput): Promise<CreateBookingToolOutput> {
  console.log("[createBookingTool] Input received:", JSON.stringify(input, null, 2));

  try {
    // 1. Validasi input
    const parsedDate = parse(input.bookingDate, 'yyyy-MM-dd', new Date());
    if (isNaN(parsedDate.getTime())) {
      return { success: false, message: "Format tanggal booking tidak valid." };
    }
    const [hour, minute] = input.bookingTime.split(':').map(Number);
    const bookingDateTime = setMinutes(setHours(parsedDate, hour), minute);
    const bookingTimestamp = Timestamp.fromDate(bookingDateTime);

    // 2. Ambil detail layanan untuk estimasi durasi
    let estimatedDuration = input.estimatedDuration;
    if (!estimatedDuration && input.serviceId) {
      try {
        const serviceDocRef = doc(db, 'services', input.serviceId);
        const serviceSnap = await getDoc(serviceDocRef);
        if (serviceSnap.exists()) {
          const serviceData = serviceSnap.data() as ServiceProduct;
          estimatedDuration = serviceData.estimatedDuration || 'N/A';
        }
      } catch (e) {
        console.warn("[createBookingTool] Gagal mengambil durasi dari serviceId.", e);
      }
    }

    const category = getServiceCategory(input.serviceName);

    // 3. Siapkan data untuk Firestore
   const bookingDataPayload: any = { // Gunakan 'any' sementara untuk fleksibilitas
  customerName: input.customerName,
  vehicleInfo: input.vehicleInfo,
  serviceId: input.serviceId,
  serviceName: input.serviceName,
  category: category,
  bookingDateTime: bookingTimestamp,
  status: 'Confirmed',
  source: 'WhatsApp',
  estimatedDuration: estimatedDuration || 'N/A',
};


    // 4. Simpan ke koleksi 'bookings'
    const bookingDocRef = await addDoc(collection(db, "bookings"), {
      ...bookingDataPayload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`[createBookingTool] Booking berhasil dibuat dengan ID: ${bookingDocRef.id}`);

    let queueItemId: string | undefined = undefined;
    let queueMessage: string = "";

    // 5. Jika booking untuk hari ini, tambahkan ke 'queueItems'
    if (isSameDay(bookingDateTime, new Date())) {
      const queueItemData = {
        customerName: input.customerName,
        clientId: input.clientId,
        vehicleInfo: input.vehicleInfo,
        service: input.serviceName,
        serviceId: input.serviceId,
        status: 'Menunggu' as 'Menunggu',
        estimatedTime: estimatedDuration || 'N/A',
        bookingId: bookingDocRef.id,
        createdAt: bookingTimestamp,
      };
      const queueDocRef = await addDoc(collection(db, 'queueItems'), queueItemData);
      queueItemId = queueDocRef.id;
      await updateDoc(bookingDocRef, { queueItemId: queueDocRef.id, status: 'In Queue' });
      console.log(`[createBookingTool] Booking untuk hari ini, ditambahkan ke antrian dengan ID: ${queueItemId}`);
      queueMessage = " dan sudah masuk antrian hari ini.";
    }

    return {
      success: true,
      bookingId: bookingDocRef.id,
      queueItemId: queueItemId,
      message: `Booking untuk ${input.customerName} pada ${input.bookingDate} jam ${input.bookingTime} untuk layanan "${input.serviceName}" berhasil dibuat${queueMessage}`,
      status: queueItemId ? 'In Queue' : 'Confirmed',
    };

  } catch (error: any) {
    console.error('[createBookingTool] Error:', error);
    return {
      success: false,
      message: `Gagal membuat booking: ${error.message || 'Kesalahan internal server.'}`,
    };
  }
}

// Bagian ai.defineTool DIHAPUS TOTAL
