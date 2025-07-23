// File: src/ai/tools/findNextAvailableSlotTool.ts

import { z } from 'zod';
import { getFirebaseAdmin } from '../../lib/firebase-admin';
// Pastikan path DB/helper sudah benar di proyek kamu
import admin from 'firebase-admin';
import { parseDateTime } from '../utils/dateTimeParser';
import { getOvernightWarning, getServiceCategory } from '../utils/bookingSlotUtils';

// --- Input Schema for Type Checking Only ---
const InputSchema = z.object({
  preferred_date: z.string().optional().describe('Tanggal atau hari preferensi user (misal: "besok", "minggu depan")'),
  service_name: z.string().optional().describe('Nama layanan yang diinginkan'),
});
export type Input = z.infer<typeof InputSchema>;

// --- Output Type ---
type Slot = { date: string; time: string; day: string; };
type Output = {
  success: boolean;
  requestedDate?: string | null;
  availableSlots?: Slot[];
  reason?: string;
};

// --- Implementation ---
async function implementation(input: Input): Promise<Output> {
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

    // Logika khusus kategori repaint (antrian mingguan)
    if (category === 'repaint') {
      const db = getFirebaseAdmin().firestore();
      const bookingsRef = db.collection('bookings');
      // Ambil SEMUA booking yang statusnya aktif
      const allActiveBookingsSnapshot = await bookingsRef
        .where('status', 'in', ['Confirmed', 'In Queue', 'In Progress', 'pending', 'Pending'])
        .get();
      // Saring di sisi aplikasi untuk menemukan booking repaint yang sebenarnya
      const repaintBookings = allActiveBookingsSnapshot.docs.filter(doc => {
        const data = doc.data();
        const hasRepaintCategory = data.category === 'repaint';
        const hasRepaintInName = data.serviceName && typeof data.serviceName === 'string' && data.serviceName.toLowerCase().includes('repaint');
        return hasRepaintCategory || hasRepaintInName;
      });

      if (repaintBookings.length >= 2) {
        const finishTimes = repaintBookings.map(doc => {
          const data = doc.data() as any;
          const startDate = data.bookingDateTime!.toDate();
          const durationDays = data.estimatedDuration ? parseInt(data.estimatedDuration, 10) / (24 * 60) : 7;
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + Math.ceil(durationDays));
          return endDate;
        });
        const earliestFinishDate = new Date(Math.min(...finishTimes.map(time => time.getTime())));
        const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        
        const d = earliestFinishDate.getDate().toString().padStart(2, '0');
        const m = (earliestFinishDate.getMonth() + 1).toString().padStart(2, '0');
        const y = earliestFinishDate.getFullYear();
        const formattedDate = `${d}-${m}-${y}`;

        const nextAvailableSlot = {
          date: formattedDate,
          time: '09:00',
          day: dayNames[earliestFinishDate.getDay()],
        };
        
        const reason = `Untuk repaint, antrian sedang penuh. Slot paling cepat tersedia untuk masuk pengerjaan mulai ${nextAvailableSlot.day}, ${nextAvailableSlot.date}.`;

        return {
          success: true,
          requestedDate,
          availableSlots: [nextAvailableSlot],
          reason,
        };
      } else {
        const reason = `Untuk repaint, antrian masih tersedia. Bisa langsung booking untuk masuk antrian pengerjaan.`;
        return {
          success: true,
          requestedDate,
          availableSlots: [{ date: 'Tersedia', time: 'Antrian', day: 'Repaint' }],
          reason,
        };
      }
    }

    // Pengecekan slot harian untuk kategori selain repaint
    let searchStartDate = new Date();
    if (requestedDate) {
      const [y, m, d] = requestedDate.split('-').map(Number);
      searchStartDate = new Date(y, m - 1, d, 9, 0, 0);
    }
    const searchLimitDate = new Date(searchStartDate);
    searchLimitDate.setDate(searchStartDate.getDate() + 30);

    const db = getFirebaseAdmin().firestore();
    const bookingsRef = db.collection('bookings');
    const querySnapshot = await bookingsRef
      .where('bookingDateTime', '>=', admin.firestore.Timestamp.fromDate(searchStartDate))
      .where('bookingDateTime', '<=', admin.firestore.Timestamp.fromDate(searchLimitDate))
      .where('category', '!=', 'repaint')
      .get();

    const existingBookings = querySnapshot.docs.map(doc => {
      const data = doc.data() as any;
      const startDate = data.bookingDateTime.toDate();
      const durationInMinutes = parseInt(data.estimatedDuration || '180', 10);
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
        requestedDate,
        reason: `Maaf bro, sepertinya jadwal untuk ${requestedDate || 'waktu dekat'} sangat padat.`,
      };
    }

    const formattedSlots = foundSlots.map(date => {
      const isRepaint = String(category) === 'repaint';
      const overnightWarning = getOvernightWarning(date, 180, isRepaint);
      
      const d = date.getDate().toString().padStart(2, '0');
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const y = date.getFullYear();
      const formattedDate = `${d}-${m}-${y}`;

      return {
        date: formattedDate,
        time: date.toTimeString().substring(0, 5),
        day: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'][date.getDay()],
        overnightWarning,
      };
    });

    // --- Selalu tambahkan summary tanggal slot terdekat di reason jika ada ---
    const firstSlot = formattedSlots[0];
    const slotSummary = firstSlot
      ? `Slot terdekat tersedia pada ${firstSlot.day}, ${firstSlot.date} jam ${firstSlot.time}.`
      : '';

    return {
      success: true,
      requestedDate,
      availableSlots: formattedSlots,
      reason: slotSummary,
    };

  } catch (error: any) {
    return {
      success: false,
      requestedDate: null,
      reason: `Terjadi error saat mencari jadwal: ${error.message}`,
    };
  }
}

// --- Export untuk AI Agent (function calling compatible) ---
export const findNextAvailableSlotTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'findNextAvailableSlot',
      description: 'Cari slot jadwal kosong terdekat untuk booking.',
      parameters: {
        type: 'object',
        properties: {
          preferred_date: { type: 'string', description: 'Tanggal/hari pilihan user (opsional).' },
          service_name: { type: 'string', description: 'Nama layanan (opsional, untuk filtering kategori).' },
        },
        required: [],
      },
    },
  },
  implementation,
};
