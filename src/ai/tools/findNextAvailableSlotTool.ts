// File: src/ai/tools/findNextAvailableSlotTool.ts

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import type { FindSlotResult } from '@/types/ai/tools';
import { parseDateTime } from '@/ai/utils/dateTimeParser';
import { getServiceCategory } from '@/ai/utils/getServiceCategory';

const InputSchema = z.object({
  preferred_date: z.string().optional(),
  service_name: z.string().optional(),
});
type Input = z.infer<typeof InputSchema>;

type Booking = {
  bookingDateTime: Timestamp;
  estimatedDuration: string;
  category: string;
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDurationToMinutes(duration: string | undefined): number {
    if (!duration) return 180;
    const minutes = parseInt(duration, 10);
    return isNaN(minutes) ? 180 : minutes;
}

const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export async function findNextAvailableSlotTool(input: Input): Promise<FindSlotResult> {
  try {
    const { preferred_date, service_name } = InputSchema.parse(input);
    const category = service_name ? getServiceCategory(service_name) : null;
    
    let requestedDate: string | null = null;
    if (preferred_date) {
        const parsed = await parseDateTime(preferred_date);
        if (parsed.date) {
            requestedDate = parsed.date;
        }
    }

    // --- LOGIKA 1: PENGECEKAN KUOTA REPAINT ---
    if (category === 'repaint') {
      console.log('[findNextAvailableSlotTool] Menjalankan logika pengecekan kuota REPAINT.');
      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('category', '==', 'repaint'),
        where('status', 'in', ['Confirmed', 'In Queue', 'In Progress'])
      );
      const snapshot = await getDocs(q);

      if (snapshot.size >= 2) {
        // Jika penuh, hitung kapan slot paling cepat akan tersedia
        const finishTimes = snapshot.docs.map(doc => {
          const data = doc.data() as Partial<Booking>;
          const startDate = data.bookingDateTime!.toDate();
          // Asumsikan durasi repaint minimal 7 hari jika tidak ada data
          const durationDays = data.estimatedDuration ? parseInt(data.estimatedDuration, 10) / (24 * 60) : 7;
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + Math.ceil(durationDays));
          return endDate;
        });

        const earliestFinishDate = new Date(Math.min(...finishTimes.map(time => time.getTime())));
        
        // Kembalikan ini sebagai slot alternatif
        const nextAvailableSlot = {
            date: formatDate(earliestFinishDate),
            time: '09:00', // Waktu default untuk penawaran
            day: dayNames[earliestFinishDate.getDay()],
        };
        
        return {
          success: true, // Sukses karena berhasil menemukan alternatif
          requestedDate: requestedDate,
          availableSlots: [nextAvailableSlot],
        };

      } else {
        // Jika tidak penuh, tawarkan antrian
        return {
          success: true,
          requestedDate: requestedDate,
          availableSlots: [{ date: 'Tersedia', time: 'Antrian', day: 'Repaint' }],
        };
      }
    }

    // --- LOGIKA 2: PENGECEKAN SLOT HARIAN ---
    console.log('[findNextAvailableSlotTool] Menjalankan logika pengecekan SLOT HARIAN.');
    let searchStartDate = new Date();
    if (requestedDate) {
        const [y, m, d] = requestedDate.split('-').map(Number);
        searchStartDate = new Date(y, m - 1, d, 9, 0, 0);
    }
    
    const searchLimitDate = new Date(searchStartDate);
    searchLimitDate.setDate(searchStartDate.getDate() + 30);

    const bookingsRef = collection(db, 'bookings');
    const q = query(
      bookingsRef,
      where('bookingDateTime', '>=', searchStartDate),
      where('bookingDateTime', '<=', searchLimitDate),
      where('category', '!=', 'repaint')
    );
    const querySnapshot = await getDocs(q);

    const existingBookings = querySnapshot.docs.map(doc => {
      const data = doc.data() as Partial<Booking>;
      const startDate = data.bookingDateTime!.toDate();
      const durationInMinutes = parseDurationToMinutes(data.estimatedDuration);
      const endDate = new Date(startDate.getTime() + durationInMinutes * 60000);
      return { start: startDate, end: endDate };
    });

    const WORKING_HOURS = { start: 9, end: 17 };
    const WORKING_DAYS = [1, 2, 3, 4, 5, 6];
    const SLOT_SEARCH_INCREMENT_MINUTES = 30;
    const NUM_SLOTS_TO_FIND = 3;

    let foundSlots: Date[] = [];
    let currentTime = new Date(searchStartDate);
    if (!preferred_date) {
      currentTime.setMinutes(Math.ceil(currentTime.getMinutes() / SLOT_SEARCH_INCREMENT_MINUTES) * SLOT_SEARCH_INCREMENT_MINUTES, 0, 0);
    }

    while (foundSlots.length < NUM_SLOTS_TO_FIND && currentTime < searchLimitDate) {
      const currentDay = currentTime.getDay();
      const currentHour = currentTime.getHours();
      const isWorkingTime = WORKING_DAYS.includes(currentDay) && currentHour >= WORKING_HOURS.start && currentHour < WORKING_HOURS.end;

      if (isWorkingTime) {
        let isConflict = false;
        for (const booking of existingBookings) {
          if (currentTime >= booking.start && currentTime < booking.end) {
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
      return {
        success: false,
        requestedDate: requestedDate,
        reason: `Maaf bro, sepertinya jadwal untuk ${requestedDate || 'waktu dekat'} sangat padat.`,
      };
    }

    const formattedSlots = foundSlots.map(date => ({
      date: date.toISOString().split('T')[0],
      time: date.toTimeString().substring(0, 5),
      day: dayNames[date.getDay()],
    }));

    return {
      success: true,
      requestedDate: requestedDate,
      availableSlots: formattedSlots,
    };

  } catch (error: any) {
    console.error("Error in findNextAvailableSlot:", error);
    return {
      success: false,
      requestedDate: null,
      reason: `Terjadi error saat mencari jadwal: ${error.message}`,
    };
  }
}