// File: src/ai/tools/checkBookingAvailabilityTool.ts

import { z } from 'zod';
import { checkBookingAvailabilityImplementation } from './impl/checkBookingAvailabilityImplementation';
import { parseDateTime } from '@/ai/utils/dateTimeParser';
import { getFirebaseAdmin } from '@/lib/firebase-admin';
import admin from 'firebase-admin';
import { getServiceCategory } from './createBookingTool';

// --- Input Schema (untuk validasi backend + prompt AI) ---
const InputSchema = z.object({
  bookingDate: z.string().describe('Tanggal booking. Bisa format YYYY-MM-DD atau bahasa alami seperti "besok", "minggu depan", dll.'),
  bookingTime: z.string().describe('Jam booking, format HH:mm atau bahasa alami seperti "jam 2 siang".'),
  serviceName: z.string().describe('Nama layanan yang ingin dibooking'),
  estimatedDurationMinutes: z.number().describe('Estimasi durasi layanan dalam menit'),
});
export type Input = z.infer<typeof InputSchema>;

// --- Output Type (hasil dikembalikan ke AI) ---
type Output = {
  available: boolean;
  conflictReason?: string;
  summary?: string;
};

// --- Tool Definition untuk digunakan oleh AI Agent ---
export const checkBookingAvailabilityTool = {
  toolDefinition: {
    type: "function" as const,
    function: {
      name: "checkBookingAvailability",
      description: "Cek ketersediaan slot untuk booking layanan.",
      parameters: {
        type: "object",
        properties: {
          bookingDate: { type: "string", description: "Tanggal booking (YYYY-MM-DD)." },
          bookingTime: { type: "string", description: "Jam booking (HH:mm)." },
          serviceName: { type: "string", description: "Nama layanan." },
          estimatedDurationMinutes: { type: "number", description: "Estimasi durasi booking (menit)." },
        },
        required: ["bookingDate", "bookingTime", "serviceName", "estimatedDurationMinutes"],
      },
    },
  },

  // --- Implementation (panggil logika sebenarnya di folder impl) ---
  implementation: async (input: Input): Promise<Output> => {
    // --- Parsing natural language date/time jika perlu ---
    let bookingDate = input.bookingDate;
    let bookingTime = input.bookingTime;
    // Jika bookingDate atau bookingTime bukan format standar, parse
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!dateRegex.test(bookingDate) || !timeRegex.test(bookingTime)) {
      const parsed = await parseDateTime(`${input.bookingDate} ${input.bookingTime}`);
      if (parsed.date) bookingDate = parsed.date;
      if (parsed.time) bookingTime = parsed.time;
    }
    // Gantikan input dengan hasil parsing
    input = { ...input, bookingDate, bookingTime };
    // --- Penentuan jenis layanan ---
    const service = input.serviceName.toLowerCase();
    const isRepaint = service.includes("repaint");
    const isDetailingOrCoating = service.includes("detailing") || service.includes("coating");

    // --- Hitung waktu selesai pengerjaan (untuk warning menginap) ---
    const [startHour, startMinute] = input.bookingTime.split(":").map(Number);
    const startDate = new Date(`${input.bookingDate}T${input.bookingTime}:00`);
    const finishDate = new Date(startDate.getTime() + input.estimatedDurationMinutes * 60000);
    const finishHour = finishDate.getHours();
    const finishMinute = finishDate.getMinutes();
    const finishTimeString = `${finishHour.toString().padStart(2, "0")}:${finishMinute.toString().padStart(2, "0")}`;
    let overnightWarning: string | undefined = undefined;
    if (!isRepaint && (finishHour > 17 || (finishHour === 17 && finishMinute > 0))) {
      overnightWarning = `Pengerjaan diperkirakan selesai jam ${finishTimeString}, melebihi jam operasional (17:00). Ada kemungkinan motor harus menginap.`;
    }

    // --- Cek ketersediaan slot ---
    let available = false;
    let conflictReason: string = '';
    if (isRepaint) {
      // Untuk repaint, cek overlap 5 hari (termasuk hari booking)
      const overlapDates: string[] = [];
      for (let i = 0; i < 5; i++) {
        const d = new Date(input.bookingDate);
        d.setDate(d.getDate() + i);
        overlapDates.push(d.toISOString().split('T')[0]);
      }
      // Ambil semua booking repaint yang overlap 5 hari (gunakan implementation khusus di backend)
      const repaintBookings = await getRepaintBookingsOverlap(overlapDates);
      if (repaintBookings.length < 2) {
        available = true;
      } else {
        available = false;
        conflictReason = 'Kapasitas repaint penuh (maksimal 2 motor dalam proses 5 hari).';
      }
    } else if (isDetailingOrCoating) {
      // Untuk detailing/coating, cek kapasitas harian
      const dailyBookings = await getDailyBookings(input.bookingDate, service);
      if (dailyBookings.length < 2) {
        available = true;
      } else {
        available = false;
        conflictReason = 'Kapasitas harian penuh (maksimal 2 motor per hari).';
      }
    } else {
      // Default: fallback ke implementasi lama
      const result = await checkBookingAvailabilityImplementation(input);
      available = result.isAvailable;
      conflictReason = result.reason || '';
    }

    if (available) {
      return {
        available: true,
        summary: `Slot tersedia untuk booking layanan ${input.serviceName} pada ${input.bookingDate} jam ${input.bookingTime}` + (overnightWarning ? `\n${overnightWarning}` : ""),
      } as Output;
    }

    // --- Cari slot berikutnya yang tersedia ---
    const nextAvailableSlot = await findNextAvailableSlotCustom(input, 30, isRepaint, isDetailingOrCoating);
    if (nextAvailableSlot) {
      return {
        available: false,
        conflictReason,
        summary: `Slot tidak tersedia pada tanggal yang diminta. Slot berikutnya yang tersedia adalah pada ${nextAvailableSlot.date} jam ${nextAvailableSlot.time}` + (overnightWarning ? `\n${overnightWarning}` : ""),
      } as Output;
    }

    return {
      available: false,
      conflictReason,
      summary: conflictReason || overnightWarning || `Slot tidak tersedia untuk booking layanan ${input.serviceName} pada ${input.bookingDate} jam ${input.bookingTime}`,
    } as Output;
  },
};

// --- Fungsi untuk mencari slot berikutnya yang tersedia sesuai logika kapasitas ---
async function findNextAvailableSlotCustom(
  input: Input,
  daysRange: number,
  isRepaint: boolean,
  isDetailingOrCoating: boolean
): Promise<{ date: string; time: string } | null> {
  for (let i = 1; i <= daysRange; i++) {
    const nextDate = new Date(input.bookingDate);
    nextDate.setDate(nextDate.getDate() + i);
    const nextDateString = nextDate.toISOString().split('T')[0];
    if (isRepaint) {
      // Cek overlap 5 hari ke depan
      const overlapDates: string[] = [];
      for (let j = 0; j < 5; j++) {
        const d = new Date(nextDateString);
        d.setDate(d.getDate() + j);
        overlapDates.push(d.toISOString().split('T')[0]);
      }
      const repaintBookings = await getRepaintBookingsOverlap(overlapDates);
      if (repaintBookings.length < 2) {
        return { date: nextDateString, time: input.bookingTime };
      }
    } else if (isDetailingOrCoating) {
      const dailyBookings = await getDailyBookings(nextDateString, input.serviceName.toLowerCase());
      if (dailyBookings.length < 2) {
        return { date: nextDateString, time: input.bookingTime };
      }
    } else {
      // fallback ke implementasi lama
      const result = await checkBookingAvailabilityImplementation({ ...input, bookingDate: nextDateString });
      if (result.isAvailable) {
        return { date: nextDateString, time: input.bookingTime };
      }
    }
  }
  return null;
}

// --- Dummy: Fungsi untuk ambil booking harian untuk detailing/coating ---
async function getDailyBookings(date: string, service: string): Promise<any[]> {
  const db = getFirebaseAdmin().firestore();
  // Tentukan awal dan akhir hari dari tanggal yang diberikan
  const startOfDay = new Date(`${date}T00:00:00.000Z`);
  const endOfDay = new Date(`${date}T23:59:59.999Z`);
  const category = getServiceCategory(service);
  const querySnapshot = await db.collection('bookings')
    .where('bookingDateTime', '>=', admin.firestore.Timestamp.fromDate(startOfDay))
    .where('bookingDateTime', '<=', admin.firestore.Timestamp.fromDate(endOfDay))
    .where('category', '==', category)
    .get();
  console.log(`[getDailyBookings] Ditemukan ${querySnapshot.docs.length} booking ${category} pada ${date}.`);
  return querySnapshot.docs.map(doc => doc.data());
}

// --- Dummy: Fungsi untuk ambil booking repaint overlap 5 hari ---
async function getRepaintBookingsOverlap(dates: string[]): Promise<any[]> {
  // Karena Firestore tidak bisa melakukan query 'date overlap' secara langsung,
  // kita ambil data dalam rentang waktu yang lebih besar lalu filter di sisi server.
  const db = getFirebaseAdmin().firestore();
  // Ambil tanggal paling awal dan paling akhir dari rentang 5 hari
  const startDate = new Date(`${dates[0]}T00:00:00.000Z`);
  const endDate = new Date(`${dates[dates.length - 1]}T23:59:59.999Z`);
  const querySnapshot = await db.collection('bookings')
    .where('category', '==', 'repaint')
    .where('status', 'in', ['Confirmed', 'In Progress', 'In Queue'])
    .where('bookingDateTime', '<=', admin.firestore.Timestamp.fromDate(endDate))
    .get();
  // Filter manual untuk booking yang benar-benar overlap
  const overlappingBookings = querySnapshot.docs.filter(doc => {
    const data = doc.data();
    const bookingStart = (data.bookingDateTime as admin.firestore.Timestamp).toDate();
    // Asumsikan durasi repaint rata-rata 5 hari jika tidak ada data spesifik
    const durationDays = data.estimatedDuration ? Math.ceil(parseInt(data.estimatedDuration) / (24 * 60)) : 5;
    const bookingEnd = new Date(bookingStart);
    bookingEnd.setDate(bookingStart.getDate() + durationDays);
    // Cek apakah rentang [bookingStart, bookingEnd] bersinggungan dengan rentang [startDate, endDate]
    return bookingStart < endDate && bookingEnd > startDate;
  });
  console.log(`[getRepaintBookingsOverlap] Ditemukan ${overlappingBookings.length} booking repaint yang overlap.`);
  return overlappingBookings.map(doc => doc.data());
}
