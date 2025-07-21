// @file: src/ai/tools/getSpecificServicePriceTool.ts

import { z } from 'zod';
import type { GetPriceResult } from '../../types/ai/tools';
import hargaLayanan from '../../data/hargaLayanan';
import type { Session } from '../../types/ai';

// --- Input Schema ---
const InputSchema = z.object({
  service_name: z.string().describe('Nama layanan yang ingin dicek harga detailnya'),
  size: z.enum(['S', 'M', 'L', 'XL']).describe('Ukuran motor untuk layanan ini (S/M/L/XL)'),
  session: z.any().optional(),
});
export type Input = z.infer<typeof InputSchema>;

// --- Helper Types ---
type ServiceVariant = { name: 'S' | 'M' | 'L' | 'XL'; price: number };
type Service = {
  name: string;
  category: string;
  price?: number;
  estimatedDuration?: string; // Durasi dalam menit
  variants?: ServiceVariant[];
};

// --- Fuzzy Match Utility ---
function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
    }
  }
  return dp[a.length][b.length];
}

function stringSimilarity(a: string, b: string): number {
  const distance = levenshtein(a.toLowerCase(), b.toLowerCase());
  const maxLen = Math.max(a.length, b.length);
  return maxLen === 0 ? 1 : 1 - distance / maxLen;
}

// --- REVISI: Logika format durasi diubah untuk menampilkan "hari kerja" ---
/**
 * Mengubah durasi dari string menit ke format hari kerja dan jam.
 * 1 hari kerja dianggap 8 jam.
 * @param minutesStr - Durasi dalam format string menit (misal: "2400" untuk 40 jam).
 * @returns String yang sudah diformat (contoh: "5 hari kerja" atau "1 hari kerja 2 jam").
 */
function formatDuration(minutesStr?: string): string {
  if (!minutesStr) return 'Segera';
  
  const durationInMinutes = parseInt(minutesStr, 10);
  if (isNaN(durationInMinutes) || durationInMinutes <= 0) {
    return 'Segera';
  }

  const WORKDAY_HOURS = 8;
  const totalHours = Math.round(durationInMinutes / 60);

  // Jika kurang dari 1 hari kerja, tampilkan dalam jam
  if (totalHours < WORKDAY_HOURS) {
    if (totalHours < 1) {
        return `${durationInMinutes} menit`;
    }
    return `${totalHours} jam`;
  }

  const days = Math.floor(totalHours / WORKDAY_HOURS);
  const remainingHours = totalHours % WORKDAY_HOURS;

  let result = `${days} hari kerja`;

  // Tambahkan sisa jam jika ada
  if (remainingHours > 0) {
    result += ` ${remainingHours} jam`;
  }

  return result;
}
// --- Implementation (Fungsi Baru yang Sudah Diperbaiki) ---
async function implementation(input: any): Promise<GetPriceResult> {
  try {
    console.log('[getSpecificServicePriceTool] Input:', input);
    const parsed = InputSchema.safeParse(input);
    if (!parsed.success) {
      console.warn('[getSpecificServicePriceTool] InputSchema error:', parsed.error.issues);
      return {
        success: false,
        error: 'generic_error',
        message: parsed.error.issues.map(i => i.message).join(', '),
      };
    }

    const { service_name: parsedServiceName, size: sizeFromArgs } = parsed.data;
    const session: Session | undefined = parsed.data.session;

    let finalSize = sizeFromArgs;
    console.log('[getSpecificServicePriceTool] Parsed service_name:', parsedServiceName, '| size:', sizeFromArgs);

    if (session?.inquiry) {
      const isRepaintService = parsedServiceName.toLowerCase().includes('repaint');
      if (isRepaintService && session.inquiry.repaintSize) {
        finalSize = session.inquiry.repaintSize;
        console.log(`[getSpecificServicePriceTool] Layanan repaint terdeteksi. Menggunakan repaintSize dari sesi: '${finalSize}'`);
      } else if (!isRepaintService && session.inquiry.serviceSize) {
        finalSize = session.inquiry.serviceSize;
        console.log(`[getSpecificServicePriceTool] Layanan non-repaint terdeteksi. Menggunakan serviceSize dari sesi: '${finalSize}'`);
      } else {
        console.log(`[getSpecificServicePriceTool] Tidak ada size di sesi yang cocok. Menggunakan size dari argumen: '${finalSize}'`);
      }
    }

    if (parsedServiceName.trim().toLowerCase() === 'coating') {
      const names = ['Coating Motor Doff', 'Coating Motor Glossy'];
      const results = (hargaLayanan as Service[])
        .filter(s => names.includes(s.name))
        .map(service => {
          const variant = service.variants?.find(v => v.name === finalSize);
          const basePrice = variant?.price ?? service.price;
          if (basePrice === undefined) return null;
          return { service_name: service.name, motor_size: finalSize, price: basePrice, estimated_duration: formatDuration(service.estimatedDuration), similarity: 1 };
        })
        .filter((x): x is { service_name: string; motor_size: 'S' | 'M' | 'L' | 'XL'; price: number; estimated_duration: string; similarity: number } => x !== null);
      console.log('[getSpecificServicePriceTool] Coating special case, results:', results);
      return { success: true, multiple_candidates: true, candidates: results, message: `Ditemukan 2 layanan utama untuk "coating": Coating Motor Doff & Coating Motor Glossy.` };
    }

    const candidates = (hargaLayanan as Service[])
      .map(s => ({ ...s, similarity: stringSimilarity(parsedServiceName, s.name) }))
      .filter(s => s.similarity >= 0.5)
      .sort((a, b) => b.similarity - a.similarity);

    console.log('[getSpecificServicePriceTool] Candidates:', candidates.map(c => ({ name: c.name, similarity: c.similarity })));

    if (candidates.length === 0) {
      console.warn(`[getSpecificServicePriceTool] Tidak ditemukan kandidat untuk "${parsedServiceName}"`);
      return { success: false, error: 'generic_error', message: `Layanan "${parsedServiceName}" tidak ditemukan.` };
    }

    // PATCH: Jika similarity tertinggi = 1 (match persis), langsung return satu hasil saja
    if (candidates[0].similarity === 1) {
      const service = candidates[0];
      const variant = service.variants?.find(v => v.name === finalSize);
      const basePrice = variant?.price ?? service.price;
      if (basePrice === undefined) {
        console.warn(`[getSpecificServicePriceTool] Harga tidak tersedia untuk size ${finalSize} pada layanan "${service.name}"`);
        return { success: false, error: 'price_not_available_for_size', message: `Harga belum tersedia untuk size ${finalSize} pada layanan "${service.name}".`, service_name: service.name, motor_size: finalSize };
      }
      const summary = `Harga untuk layanan *${service.name}* untuk motor ukuran ${finalSize} adalah Rp${basePrice.toLocaleString('id-ID')}.` + (service.estimatedDuration ? ` Estimasi pengerjaan: ${formatDuration(service.estimatedDuration)}.` : '');
      console.log('[getSpecificServicePriceTool] Perfect match:', service.name, '| Harga:', basePrice);
      return { success: true, service_name: service.name, motor_size: finalSize, price: basePrice, estimated_duration: formatDuration(service.estimatedDuration), summary };
    }

    if (candidates.length === 1) {
      const service = candidates[0];
      const variant = service.variants?.find(v => v.name === finalSize);
      const basePrice = variant?.price ?? service.price;
      if (basePrice === undefined) {
        console.warn(`[getSpecificServicePriceTool] Harga tidak tersedia untuk size ${finalSize} pada layanan "${service.name}"`);
        return { success: false, error: 'price_not_available_for_size', message: `Harga belum tersedia untuk size ${finalSize} pada layanan "${service.name}".`, service_name: service.name, motor_size: finalSize };
      }
      const summary = `Harga untuk layanan *${service.name}* untuk motor ukuran ${finalSize} adalah Rp${basePrice.toLocaleString('id-ID')}.` + (service.estimatedDuration ? ` Estimasi pengerjaan: ${formatDuration(service.estimatedDuration)}.` : '');
      console.log('[getSpecificServicePriceTool] Single candidate:', service.name, '| Harga:', basePrice);
      return { success: true, service_name: service.name, motor_size: finalSize, price: basePrice, estimated_duration: formatDuration(service.estimatedDuration), summary };
    }

    const results = candidates
      .map(service => {
        const variant = service.variants?.find(v => v.name === finalSize);
        const basePrice = variant?.price ?? service.price;
        if (basePrice === undefined) return null;
        return { service_name: service.name, motor_size: finalSize, price: basePrice, estimated_duration: formatDuration(service.estimatedDuration), similarity: service.similarity };
      })
      .filter((x): x is { service_name: string; motor_size: 'S' | 'M' | 'L' | 'XL'; price: number; estimated_duration: string; similarity: number } => x !== null);

    console.log('[getSpecificServicePriceTool] Multiple candidates:', results);
    return { success: true, multiple_candidates: true, candidates: results, message: `Ditemukan ${results.length} layanan mirip dengan "${parsedServiceName}". Silakan pilih yang paling sesuai.` };

  } catch (err: any) {
    console.error('[getSpecificServicePriceTool] Error:', err);
    return { success: false, error: 'generic_error', message: `Terjadi error saat mengambil harga: ${err.message}` };
  }
}
// --- Export ---
export const getSpecificServicePriceTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: "getSpecificServicePrice",
      description: "Dapatkan harga layanan untuk motor size tertentu.",
      parameters: {
        type: "object",
        properties: {
          service_name: {
            type: "string",
            description: "Nama layanan, misalnya 'Coating Motor Doff', 'Full Detailing Glossy', dll."
          },
          size: {
            type: "string",
            enum: ["S", "M", "L", "XL"],
            description: "Ukuran motor berdasarkan hasil dari getMotorSizeDetails."
          }
        },
        required: ["service_name", "size"],
      },
    },
  },
  implementation,
};