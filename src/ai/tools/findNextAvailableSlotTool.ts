'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase'; 
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

// --- (BARU) Import fungsi parseDateTime yang sudah Anda punya ---
// Pastikan path-nya benar sesuai struktur proyek Anda
import { parseDateTime } from '@/ai/utils/dateTimeParser'; // Ganti path jika perlu

// --- Konfigurasi Bengkel (Tidak berubah) ---
const WORKING_HOURS = { start: 9, end: 17 };
const WORKING_DAYS = [1, 2, 3, 4, 5, 6];
const SLOT_SEARCH_INCREMENT_MINUTES = 30;
const NUM_SLOTS_TO_FIND = 2;

// --- (BARU) Skema Input di-update ---
const InputSchema = z.object({
  preferred_date: z.string().optional(),
});
type Input = z.infer<typeof InputSchema>;

type Booking = {
  bookingDate: Timestamp;
  bookingTime: string;
  estimatedDurationMinutes: number; 
};

type Result = {
  availableSlots: { date: string; time: string; day: string; }[];
  message: string;
};

// --- Fungsi Utama Tool (VERSI 2.0) ---
export async function findNextAvailableSlotImplementation(input: Input): Promise<Result> {
  try {
    const { preferred_date } = InputSchema.parse(input);
    
    let searchStartDate = new Date(); // Default: mulai dari sekarang

    // --- LOGIKA BARU: Tentukan tanggal mulai pencarian ---
    if (preferred_date) {
        console.log(`[findNextAvailableSlot] Mencari jadwal untuk preferensi: "${preferred_date}"`);
        const parsed = await parseDateTime(preferred_date);
        if (parsed.date) {
            const [year, month, day] = parsed.date.split('-').map(Number);
            // Set ke jam mulai kerja di hari yang diminta
            searchStartDate = new Date(year, month - 1, day, WORKING_HOURS.start, 0, 0);
        }
    }

    const searchLimitDate = new Date(searchStartDate);
    searchLimitDate.setDate(searchStartDate.getDate() + 30);

    // 1. Ambil semua booking yang sudah ada
    const bookingsRef = collection(db, 'bookings');
    const q = query(bookingsRef, where('bookingDate', '>=', searchStartDate), where('bookingDate', '<=', searchLimitDate));
    const querySnapshot = await getDocs(q);
    
    const existingBookings = querySnapshot.docs.map(doc => {
        // ... (logika ini tidak berubah)
        const data = doc.data() as Booking;
        const [hours, minutes] = data.bookingTime.split(':').map(Number);
        const startDate = data.bookingDate.toDate();
        startDate.setHours(hours, minutes, 0, 0);
        const endDate = new Date(startDate.getTime() + (data.estimatedDurationMinutes || 180) * 60000);
        return { start: startDate, end: endDate };
    });

    // 2. Mulai cari celah kosong
    let foundSlots: Date[] = [];
    // --- (BARU) Gunakan searchStartDate sebagai titik awal ---
    let currentTime = new Date(searchStartDate); 
    
    // Jika search hari ini, bulatkan ke 30 menit berikutnya
    if (!preferred_date) {
        currentTime.setMinutes(Math.ceil(currentTime.getMinutes() / SLOT_SEARCH_INCREMENT_MINUTES) * SLOT_SEARCH_INCREMENT_MINUTES, 0, 0);
    }
    
    // ... (Sisa dari logika pencarian tidak berubah)
    while (foundSlots.length < NUM_SLOTS_TO_FIND && currentTime < searchLimitDate) {
        const currentDay = currentTime.getDay();
        const currentHour = currentTime.getHours();
        const isWorkingTime = WORKING_DAYS.includes(currentDay) && currentHour >= WORKING_HOURS.start && currentHour < WORKING_HOURS.end;
        if (isWorkingTime) {
            let isConflict = false;
            for (const booking of existingBookings) {
                if (currentTime < booking.end && currentTime >= booking.start) { // Sedikit perbaikan logika tumpang tindih
                    isConflict = true;
                    currentTime = new Date(booking.end.getTime());
                    currentTime.setMinutes(Math.ceil(currentTime.getMinutes() / SLOT_SEARCH_INCREMENT_MINUTES) * SLOT_SEARCH_INCREMENT_MINUTES, 0, 0);
                    break;
                }
            }
            if (!isConflict) {
                foundSlots.push(new Date(currentTime.getTime()));
            }
        }
        currentTime.setMinutes(currentTime.getMinutes() + SLOT_SEARCH_INCREMENT_MINUTES);
    }
    
    if (foundSlots.length === 0) {
      return { availableSlots: [], message: `Maaf bro, sepertinya jadwal untuk ${preferred_date || 'waktu dekat'} sangat padat.` };
    }
    
    // 3. Format hasil (tidak berubah)
    const formattedSlots = foundSlots.map(date => {
        const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        return {
            date: date.toISOString().split('T')[0],
            time: date.toTimeString().substring(0, 5),
            day: dayNames[date.getDay()]
        };
    });

    return {
        availableSlots: formattedSlots,
        message: `Ditemukan ${formattedSlots.length} jadwal kosong terdekat.`
    };

  } catch (error: any) {
    console.error("Error in findNextAvailableSlot:", error);
    return { availableSlots: [], message: `Terjadi error: ${error.message}` };
  }
}