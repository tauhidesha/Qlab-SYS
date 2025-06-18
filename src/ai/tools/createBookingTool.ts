
'use server';
/**
 * @fileOverview Genkit tool for creating a booking entry.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import type { BookingEntry, CreateBookingToolInput, CreateBookingToolOutput } from '@/types/booking';
import { isSameDay, parse as parseDateFns, setHours, setMinutes, startOfDay } from 'date-fns';

const CreateBookingInputSchema = z.object({
  customerName: z.string().describe("Nama lengkap pelanggan."),
  customerPhone: z.string().optional().describe("Nomor HP pelanggan (opsional)."),
  clientId: z.string().optional().describe("ID Klien jika pelanggan terdaftar (opsional)."),
  serviceId: z.string().describe("ID dari layanan/produk yang dibooking."),
  serviceName: z.string().describe("Nama layanan/produk yang dibooking (bisa termasuk varian)."),
  vehicleInfo: z.string().describe("Informasi kendaraan pelanggan (mis. 'NMAX Merah', 'Vario 125 Hitam AB 1234 CD')."),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Tanggal booking dalam format YYYY-MM-DD."),
  bookingTime: z.string().regex(/^\d{2}:\d{2}$/).describe("Waktu booking dalam format HH:MM (24 jam)."),
  estimatedDuration: z.string().optional().describe("Estimasi durasi layanan (mis. '30 mnt', '1 jam')."),
  notes: z.string().optional().describe("Catatan tambahan untuk booking (opsional)."),
});

const CreateBookingOutputSchema = z.object({
  success: z.boolean().describe("Status keberhasilan pembuatan booking."),
  bookingId: z.string().optional().describe("ID booking yang baru dibuat jika sukses."),
  queueItemId: z.string().optional().describe("ID item antrian jika booking untuk hari ini dan berhasil ditambahkan ke antrian."),
  message: z.string().describe("Pesan hasil operasi (mis. 'Booking berhasil dibuat.')"),
  status: z.string().optional().describe("Status booking yang dibuat."),
});

export const createBookingTool = ai.defineTool(
  {
    name: 'createBookingTool',
    description: 'Membuat entri booking baru di sistem. Jika booking untuk hari ini, otomatis tambahkan ke antrian.',
    inputSchema: CreateBookingInputSchema,
    outputSchema: CreateBookingOutputSchema,
  },
  async (input: CreateBookingToolInput): Promise<CreateBookingToolOutput> => {
    if (!db) {
      throw new Error("[createBookingTool.ts] FATAL: Client Firestore 'db' is not available. Firebase Client init failed.");
    }
    console.log('[createBookingTool] Input received:', input);

    try {
      const { bookingDate, bookingTime, ...restOfInput } = input;
      
      let parsedBookingDate: Date;
      try {
        parsedBookingDate = parseDateFns(bookingDate, 'yyyy-MM-dd', new Date());
      } catch (e) {
        console.error('[createBookingTool] Invalid bookingDate format:', bookingDate);
        return { success: false, message: `Format tanggal booking (${bookingDate}) tidak valid. Gunakan YYYY-MM-DD.` };
      }

      const [hourStr, minuteStr] = bookingTime.split(':');
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        console.error('[createBookingTool] Invalid bookingTime format:', bookingTime);
        return { success: false, message: `Format waktu booking (${bookingTime}) tidak valid. Gunakan HH:MM.` };
      }

      const bookingDateTimeWithClientTimezone = setMinutes(setHours(parsedBookingDate, hour), minute);
      const bookingTimestamp = Timestamp.fromDate(bookingDateTimeWithClientTimezone);

      const newBookingData: Omit<BookingEntry, 'id' | 'createdAt' | 'updatedAt' | 'queueItemId'> = {
        ...restOfInput,
        bookingDateTime: bookingTimestamp,
        status: 'Confirmed', // Default status
        source: 'WhatsApp', // Default source for AI bookings
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };

      const bookingDocRef = await addDoc(collection(db, 'bookings'), newBookingData);
      console.log('[createBookingTool] Booking successfully created with ID:', bookingDocRef.id);

      let queueItemId: string | undefined = undefined;
      let message = `Booking untuk ${input.customerName} tanggal ${bookingDate} jam ${bookingTime} untuk layanan "${input.serviceName}" berhasil dicatat.`;

      // Jika booking untuk hari ini, tambahkan ke antrian
      if (isSameDay(bookingDateTimeWithClientTimezone, new Date())) {
        const queueItemData = {
          customerName: input.customerName,
          clientId: input.clientId,
          vehicleInfo: input.vehicleInfo,
          service: input.serviceName,
          serviceId: input.serviceId,
          // variantId: input.variantId, // Assuming variant info is part of serviceName for booking
          status: 'Menunggu' as 'Menunggu',
          estimatedTime: input.estimatedDuration || 'N/A',
          bookingId: bookingDocRef.id,
          createdAt: bookingTimestamp, // Gunakan waktu booking untuk createdAt antrian
        };
        const queueDocRef = await addDoc(collection(db, 'queueItems'), queueItemData);
        queueItemId = queueDocRef.id;
        await updateDoc(bookingDocRef, { queueItemId: queueItemId, status: 'In Queue' });
        message += " Karena booking untuk hari ini, pelanggan juga sudah otomatis ditambahkan ke antrian.";
        console.log('[createBookingTool] Booking for today, added to queue with ID:', queueItemId);
      }

      return {
        success: true,
        bookingId: bookingDocRef.id,
        queueItemId: queueItemId,
        message: message,
        status: queueItemId ? 'In Queue' : 'Confirmed',
      };

    } catch (error: any) {
      console.error('[createBookingTool] Error creating booking:', error);
      return {
        success: false,
        message: `Gagal membuat booking: ${error.message || 'Terjadi kesalahan tidak diketahui.'}`,
      };
    }
  }
);
