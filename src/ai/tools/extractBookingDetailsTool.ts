'use server';

import { z } from 'zod';
import allServicesData from '../../../docs/harga_layanan.json';
import { parse } from 'chrono-node'; // kalau mau parsing tanggal lokal

// --- Input schema ---
const InputSchema = z.object({
  user_query: z.string().describe("Pesan pelanggan yang ingin melakukan booking."),
});
type Input = z.infer<typeof InputSchema>;

// --- Output type ---
type Result =
  | {
      success: true;
      bookingDate: string;
      bookingTime: string;
      serviceName: string;
      estimatedDurationMinutes: number;
    }
  | {
      success: false;
      message: string;
    };

// --- Implementasi Tool ---
export async function extractBookingDetailsTool(input: Input): Promise<Result> {
  const { user_query } = InputSchema.parse(input);

  try {
    // --- Cari tanggal & jam dengan chrono-node ---
    const parsedDate = parse(user_query, new Date(), { forwardDate: true })?.[0];
    const date = parsedDate?.start?.isCertain('day') ? parsedDate.start.date() : null;

    if (!date) {
      return { success: false, message: 'Zoya belum bisa nemuin tanggal dari pesan itu.' };
    }

    const bookingDate = date.toISOString().split('T')[0];
    const hour = date.getHours();
    const minute = date.getMinutes();
    const bookingTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    // --- Cari nama layanan yang cocok ---
    const lowerMsg = user_query.toLowerCase();
    const matchedService = allServicesData.find(service =>
      lowerMsg.includes(service.name.toLowerCase())
    );

    if (!matchedService) {
      return { success: false, message: 'Zoya belum nemuin nama layanan di pesan itu.' };
    }

    const estimatedDuration = matchedService.estimatedDuration;
    const estimatedMinutes = estimatedDuration
      ? parseInt(estimatedDuration) * 60
      : 120; // default 2 jam kalau nggak ada estimasi

    return {
      success: true,
      bookingDate,
      bookingTime,
      serviceName: matchedService.name,
      estimatedDurationMinutes: estimatedMinutes,
    };
  } catch (err) {
    console.error('[extractBookingDetailsTool] Gagal:', err);
    return { success: false, message: 'Terjadi kesalahan saat mengekstrak informasi booking.' };
  }
}
