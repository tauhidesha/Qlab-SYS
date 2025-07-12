// @file: src/ai/tools/extractBookingDetailsTool.ts

import { z } from 'zod';
import hargaLayanan from '@/data/hargaLayanan';
import { parse } from 'chrono-node';

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
      motorQuery: string | null;
    }
  | {
      success: false;
      message: string;
    };

// --- Helper: Cari kemungkinan model motor ---
function extractMotorModel(text: string): string | null {
  const motorRegex = /\b(honda|yamaha|suzuki|kawasaki|vespa|piaggio|benelli|kymco|triumph|ducati|harley|royal enfield)?\s?(motobi|vario|nmax|aerox|beat|scoopy|klx|crf|revo|genio|vespa|lx|gts|sprint|primavera|kdx|z900|mt07|zx25r|r25|r15|satria|gsx|cb150|cbr250|monkey|mt15|benelli|motobi)?\s?([\w\d\-]{0,10})?\b/gi;
  const matches = [...text.matchAll(motorRegex)]
    .map(match => match[0])
    .filter(Boolean)
    .map(m => m.trim())
    .filter(m => m.length >= 4); // minimal panjang

  return matches.length > 0 ? matches[0] : null;
}

// --- Implementation utama ---
async function implementation(input: Input): Promise<Result> {
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
    const matchedService = hargaLayanan.find(service =>
      lowerMsg.includes(service.name.toLowerCase())
    );

    if (!matchedService) {
      return { success: false, message: 'Zoya belum nemuin nama layanan di pesan itu.' };
    }

    const estimatedDuration = matchedService.estimatedDuration;
    const estimatedMinutes = estimatedDuration
      ? parseInt(estimatedDuration) * 60
      : 120;

    // --- Ekstrak model motor ---
    const motorQuery = extractMotorModel(user_query);

    return {
      success: true,
      bookingDate,
      bookingTime,
      serviceName: matchedService.name,
      estimatedDurationMinutes: estimatedMinutes,
      motorQuery,
    };
  } catch (err) {
    console.error('[extractBookingDetailsTool] Gagal:', err);
    return { success: false, message: 'Terjadi kesalahan saat mengekstrak informasi booking.' };
  }
}

// --- Tool wrapper untuk GPT ---
export const extractBookingDetailsTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'extractBookingDetailsTool',
      description: 'Mengekstrak informasi booking dari pesan pelanggan (tanggal, jam, layanan, motor)',
      parameters: {
        type: 'object',
        properties: {
          user_query: {
            type: 'string',
            description: 'Isi pesan pelanggan, misalnya "Saya mau coating hari Minggu jam 2 untuk Nmax"'
          }
        },
        required: ['user_query'],
      },
    },
  },
  implementation,
};
