'use server';

// import { ai } from '@/ai/genkit'; // DIHAPUS
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

const CheckAvailabilityInputSchema = z.object({
  bookingDate: z.string().describe("Tanggal yang ingin diperiksa, format YYYY-MM-DD."),
  bookingTime: z.string().describe("Jam yang ingin diperiksa, format HH:MM."),
  serviceName: z.string().describe("Nama layanan yang akan dibooking."),
  estimatedDurationMinutes: z.number().describe("Estimasi durasi pengerjaan layanan dalam menit."),
});

// Helper untuk mengecek kategori layanan
function getServiceCategory(serviceName: string): 'detailing' | 'coating' | 'repaint' | 'other' {
  const name = serviceName.toLowerCase();
  if (name.includes('detailing') || name.includes('poles')) return 'detailing';
  if (name.includes('coating')) return 'coating';
  if (name.includes('repaint')) return 'repaint';
  return 'other';
}

// Fungsi implementasi tool, sekarang diekspor secara langsung
export async function checkBookingAvailabilityImplementation(
    { bookingDate, bookingTime, serviceName, estimatedDurationMinutes }: z.infer<typeof CheckAvailabilityInputSchema>
) {
    console.log(`[CheckAvailTool] Memeriksa jadwal untuk ${serviceName} pada ${bookingDate} jam ${bookingTime}`);

    // 1. Cek Jam Operasional
    const [hours] = bookingTime.split(':').map(Number);
    if (hours < 9 || hours >= 17) {
      return { isAvailable: false, reason: 'Pemesanan hanya bisa dilakukan antara jam 09:00 - 16:59.' };
    }

    const bookingsRef = collection(db, "bookings");
    const category = getServiceCategory(serviceName);

    // 2. Cek Kapasitas Detailing & Coating (Maks 2 per hari)
    if (category === 'detailing' || category === 'coating') {
      const startOfDay = new Date(`${bookingDate}T00:00:00`);
      const endOfDay = new Date(`${bookingDate}T23:59:59`);
      
      const q = query(
        bookingsRef, 
        where('bookingDateTime', '>=', Timestamp.fromDate(startOfDay)),
        where('bookingDateTime', '<=', Timestamp.fromDate(endOfDay)),
        where('category', 'in', ['detailing', 'coating'])
      );
      
      const snapshot = await getDocs(q);
      if (snapshot.size >= 2) {
        return { isAvailable: false, reason: `Maaf, untuk tanggal ${bookingDate}, kuota layanan Detailing & Coating sudah penuh (maksimal 2 per hari).` };
      }
    }

    // 3. Cek Kapasitas Repaint (Maks 2 berjalan pararel)
    if (category === 'repaint') {
      const q = query(bookingsRef, where('category', '==', 'repaint'), where('status', 'in', ['Confirmed', 'In Queue', 'In Progress']));
      const snapshot = await getDocs(q);
      if (snapshot.size >= 2) {
        return { isAvailable: false, reason: 'Maaf, slot untuk layanan Repaint saat ini sedang penuh (maksimal 2 motor berjalan bersamaan). Mohon coba beberapa hari lagi.' };
      }
    }

    // 4. Cek Potensi Menginap
    let overnightWarning: string | undefined = undefined;
    const bookingStartTime = new Date(`${bookingDate}T${bookingTime}:00`);
    const bookingEndTime = new Date(bookingStartTime.getTime() + estimatedDurationMinutes * 60000);
    
    const closingTime = new Date(`${bookingDate}T17:00:00`);

    if (bookingEndTime > closingTime) {
      overnightWarning = `Info ya kak, karena pengerjaannya butuh waktu sekitar ${Math.round(estimatedDurationMinutes / 60)} jam, kemungkinan besar motornya baru selesai besok dan perlu menginap.`;
    }
    
    // 5. Jika semua lolos, slot tersedia
    return { isAvailable: true, overnightWarning };
}

// Bagian ai.defineTool DIHAPUS TOTAL
