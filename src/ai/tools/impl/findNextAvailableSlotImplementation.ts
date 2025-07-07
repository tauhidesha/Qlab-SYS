// File: src/ai/tools/impl/findNextAvailableSlotImplementation.ts

import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { getServiceCategory } from '@/ai/utils/getServiceCategory';
import { parseDateTime } from '@/ai/utils/dateTimeParser';

interface SlotInput {
  preferred_date?: string;
  service_name?: string; // Tambahkan parameter ini untuk mengetahui jenis layanan
}

interface SlotResult {
  success: boolean;
  date?: string;
  availableSlots?: string[];
  reason?: string;
}

export async function findNextAvailableSlotImplementation(
  input: SlotInput,
): Promise<SlotResult> {
  try {
    // --- PERUBAHAN LOGIKA UNTUK REPAINT ---
    // Jika layanan yang ditanyakan adalah repaint, jalankan logika khusus
    if (input.service_name && getServiceCategory(input.service_name) === 'repaint') {
      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('category', '==', 'repaint'),
        where('status', 'in', ['Confirmed', 'In Queue', 'In Progress'])
      );
      const snapshot = await getDocs(q);

      if (snapshot.size >= 2) {
        return {
          success: false,
          reason: 'Maaf, slot Repaint saat ini sedang penuh (maksimal 2 motor dikerjakan bersamaan). Mungkin bisa coba tanya lagi beberapa hari ke depan.',
        };
      } else {
        // Jika ada slot, berikan jawaban umum karena repaint tidak terikat jam harian
        return {
          success: true,
          availableSlots: ['tersedia'], // Flag sederhana bahwa slot ada
        };
      }
    }
    // --- AKHIR PERUBAHAN LOGIKA REPAINT ---


    // Logika lama untuk layanan selain repaint (berdasarkan kuota harian)
    const parsedDateResult = await parseDateTime(input.preferred_date || 'hari ini');
    if (!parsedDateResult.date) {
      return { success: false, reason: 'Format tanggal tidak dikenali.' };
    }
    const targetDate = parsedDateResult.date;

    const startOfDay = new Date(`${targetDate}T00:00:00`);
    const endOfDay = new Date(`${targetDate}T23:59:59`);
    const bookingsRef = collection(db, 'bookings');
    const q = query(
      bookingsRef,
      where('bookingDateTime', '>=', Timestamp.fromDate(startOfDay)),
      where('bookingDateTime', '<=', Timestamp.fromDate(endOfDay)),
    );
    const snapshot = await getDocs(q);

    let detailingCoatingCount = 0;
    snapshot.docs.forEach(doc => {
      const category = doc.data().category;
      if (category === 'detailing' || category === 'coating') {
        detailingCoatingCount++;
      }
    });

    const availableSlots: string[] = [];
    if (detailingCoatingCount < 2) {
      availableSlots.push('Pagi (09:00 - 12:00)', 'Siang (13:00 - 16:00)');
    }

    if (availableSlots.length === 0) {
      return {
        success: true,
        date: targetDate,
        availableSlots: [],
        reason: `Maaf, untuk tanggal ${targetDate} sepertinya sudah penuh.`,
      };
    }

    return {
      success: true,
      date: targetDate,
      availableSlots: availableSlots,
    };

  } catch (error) {
    console.error('[findNextAvailableSlot] Terjadi error:', error);
    return { success: false, reason: 'Terjadi kendala teknis saat cek jadwal.' };
  }
}
