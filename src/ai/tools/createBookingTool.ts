
'use server';
/**
 * @fileOverview Genkit tool for creating bookings and adding to queue for same-day.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { collection, addDoc, Timestamp, serverTimestamp, query, where, getDocs, updateDoc, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { CreateBookingToolInput, CreateBookingToolOutput, BookingEntry, BookingStatus } from '@/types/booking';
import type { QueueItem } from '@/app/(app)/queue/page';
import { format as formatDateFns, parse, startOfDay, isSameDay } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';


const CreateBookingInputSchema = z.object({
  customerName: z.string().describe("Nama lengkap pelanggan."),
  customerPhone: z.string().optional().describe("Nomor telepon WhatsApp pelanggan (format 62xxx)."),
  clientId: z.string().optional().describe("ID klien jika pelanggan sudah terdaftar."),
  serviceId: z.string().describe("ID dari layanan yang di-booking."),
  serviceName: z.string().describe("Nama lengkap layanan yang di-booking (bisa termasuk varian)."),
  vehicleInfo: z.string().describe("Informasi kendaraan pelanggan (mis. Honda Vario B 1234 XYZ)."),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Tanggal booking dalam format YYYY-MM-DD."),
  bookingTime: z.string().regex(/^\d{2}:\d{2}$/).describe("Waktu booking dalam format HH:MM (24 jam)."),
  estimatedDuration: z.string().optional().describe("Estimasi durasi layanan (mis. '30 menit', '1 jam')."),
  notes: z.string().optional().describe("Catatan tambahan untuk booking (mis. permintaan khusus pelanggan).")
});

const CreateBookingOutputSchema = z.object({
  success: z.boolean().describe("Apakah pembuatan booking berhasil."),
  bookingId: z.string().optional().describe("ID booking yang baru dibuat jika sukses."),
  queueItemId: z.string().optional().describe("ID item antrian jika booking langsung ditambahkan ke antrian."),
  message: z.string().describe("Pesan status hasil operasi booking."),
  status: z.string().optional().describe("Status booking yang baru dibuat (mis. 'Pending', 'Confirmed', 'In Queue').")
});

export const createBookingTool = ai.defineTool(
  {
    name: 'createBookingTool',
    description: 'Membuat jadwal booking layanan untuk pelanggan. Jika booking untuk hari ini, akan otomatis ditambahkan ke antrian. Wajib konfirmasi KETERSEDIAAN SLOT jika pelanggan meminta waktu spesifik sebelum memanggil tool ini. Asumsikan slot selalu tersedia jika pelanggan tidak bertanya spesifik atau AI sudah mengkonfirmasi ketersediaan berdasarkan informasi sebelumnya.',
    inputSchema: CreateBookingInputSchema,
    outputSchema: CreateBookingOutputSchema,
  },
  async (input: CreateBookingToolInput): Promise<CreateBookingToolOutput> => {
    console.log("createBookingTool input:", input);
    try {
      const bookingDateTimeStr = `${input.bookingDate}T${input.bookingTime}:00`;
      let parsedBookingDateTime: Date;
      try {
        parsedBookingDateTime = parse(bookingDateTimeStr, "yyyy-MM-dd'T'HH:mm:ss", new Date());
        if (isNaN(parsedBookingDateTime.getTime())) {
          throw new Error('Format tanggal atau waktu tidak valid.');
        }
      } catch (parseError) {
        console.error("Error parsing booking date/time:", parseError);
        return { success: false, message: `Format tanggal booking (${input.bookingDate}) atau waktu booking (${input.bookingTime}) tidak valid. Gunakan YYYY-MM-DD dan HH:MM.` };
      }

      const bookingTimestamp = Timestamp.fromDate(parsedBookingDateTime);

      if (startOfDay(parsedBookingDateTime) < startOfDay(new Date()) && !isSameDay(parsedBookingDateTime, new Date())) {
        return { success: false, message: "Tidak bisa membuat booking untuk tanggal atau waktu yang sudah lewat." };
      }

      const newBookingData: Omit<BookingEntry, 'id' | 'createdAt' | 'updatedAt' | 'queueItemId'> = {
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        clientId: input.clientId,
        serviceId: input.serviceId,
        serviceName: input.serviceName,
        vehicleInfo: input.vehicleInfo,
        bookingDateTime: bookingTimestamp,
        estimatedDuration: input.estimatedDuration,
        status: isSameDay(parsedBookingDateTime, new Date()) ? 'In Queue' : 'Confirmed', // Default to In Queue if today
        notes: input.notes,
        source: 'WhatsApp', // Source from AI/WhatsApp
      };

      const bookingsCollectionRef = collection(db, 'bookings');
      const bookingDocRef = await addDoc(bookingsCollectionRef, {
        ...newBookingData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log(`Booking created with ID: ${bookingDocRef.id}`);

      let queueItemId: string | undefined = undefined;
      let queueMessage = "";

      if (isSameDay(parsedBookingDateTime, new Date())) {
        const queueCollectionRef = collection(db, 'queueItems');
        // Check if queue item for this booking already exists
        const q = query(queueCollectionRef, where("bookingId", "==", bookingDocRef.id), limit(1));
        const existingQueueSnap = await getDocs(q);

        if (existingQueueSnap.empty) {
            const newQueueItem: Omit<QueueItem, 'id' | 'createdAt' | 'completedAt' | 'serviceStartTime'> = {
            customerName: input.customerName,
            clientId: input.clientId,
            vehicleInfo: input.vehicleInfo,
            service: input.serviceName, // serviceName from booking input
            serviceId: input.serviceId, // serviceId from booking input
            bookingId: bookingDocRef.id, // Link to booking
            status: 'Menunggu', // Default status for new queue item
            estimatedTime: input.estimatedDuration || 'N/A',
          };

          const queueDocRef = await addDoc(queueCollectionRef, {
            ...newQueueItem,
            createdAt: bookingTimestamp, // Masuk antrian sesuai waktu booking jika hari ini
          });
          queueItemId = queueDocRef.id;
          // Update booking entry with queueItemId
          await updateDoc(bookingDocRef, { queueItemId: queueItemId, status: 'In Queue' });
          queueMessage = " dan langsung ditambahkan ke antrian hari ini";
          console.log(`Booking for today added to queue with ID: ${queueItemId}`);
        } else {
            queueItemId = existingQueueSnap.docs[0].id;
            // Ensure booking status is 'In Queue' if already in queue
            if (newBookingData.status !== 'In Queue') {
                 await updateDoc(bookingDocRef, { queueItemId: queueItemId, status: 'In Queue' });
            }
            queueMessage = " dan sudah ada dalam antrian hari ini";
            console.log(`Booking for today already in queue with ID: ${queueItemId}`);
        }
      }

      return {
        success: true,
        bookingId: bookingDocRef.id,
        queueItemId: queueItemId,
        message: `Booking untuk ${input.serviceName} pada ${formatDateFns(parsedBookingDateTime, "dd MMMM yyyy 'pukul' HH:mm", {locale: indonesiaLocale})} berhasil dibuat${queueMessage}.`,
        status: newBookingData.status,
      };

    } catch (error) {
      console.error("Error in createBookingTool:", error);
      let errorMessage = "Terjadi kesalahan saat membuat booking.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return { success: false, message: errorMessage };
    }
  }
);

