// @file: src/ai/tools/getSpecificServicePriceTool.ts

import { z } from 'zod';
import type { GetPriceResult } from '@/types/ai/tools';
import hargaLayanan from '@/data/hargaLayanan';
import type { SessionData } from '@/ai/utils/session';

// --- Input Schema ---
const InputSchema = z.object({
  service_name: z.string().describe('Nama layanan yang ingin dicek harga detailnya'),
  size: z.enum(['S', 'M', 'L', 'XL']).describe('Ukuran motor untuk layanan ini (S/M/L/XL)'),
  // REVISI: Kita juga bisa menerima session langsung di dalam input Zod jika diperlukan
  session: z.any().optional(),
});
export type Input = z.infer<typeof InputSchema>;

// --- Helper Types ---
type ServiceVariant = { name: 'S' | 'M' | 'L' | 'XL'; price: number };
type Service = {
  name: string;
  category: string;
  price?: number;
  estimatedDuration?: string;
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

function getBestMatchServiceName(inputName: string): string | null {
  let bestMatch: { name: string; score: number } | null = null;

  for (const service of hargaLayanan as Service[]) {
    const score = stringSimilarity(inputName, service.name);
    if (!bestMatch || score > bestMatch.score) {
      bestMatch = { name: service.name, score };
    }
  }

  return bestMatch && bestMatch.score >= 0.75 ? bestMatch.name : null;
}

function formatDuration(minutesStr?: string): string | undefined {
  if (!minutesStr) return undefined;
  const minutes = parseInt(minutesStr, 10);
  if (isNaN(minutes) || minutes === 0) return undefined;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return [hours > 0 ? `${hours} jam` : '', mins > 0 ? `${mins} menit` : ''].filter(Boolean).join(' ');
}

// --- Implementation ---
async function implementation(input: any): Promise<GetPriceResult> {
  try {
    // REVISI: Hapus dynamic import dan panggilan ke normalizeToolInput.
    // REVISI: Gunakan Zod untuk mem-parse objek input secara langsung.
    const parsed = InputSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        error: 'generic_error',
        message: parsed.error.issues.map(i => i.message).join(', '),
      };
    }

    let { service_name: parsedServiceName, size: parsedSize } = parsed.data;
    const session: SessionData | undefined = parsed.data.session;

    if (session?.inquiry?.lastMentionedService?.serviceName?.toLowerCase().includes('repaint')) {
      parsedSize = session.inquiry.repaintSize || parsedSize;
    }

    // Khusus untuk input "coating", hanya kembalikan dua layanan utama
    if (parsedServiceName.trim().toLowerCase() === 'coating') {
      const names = ['Coating Motor Doff', 'Coating Motor Glossy'];
      const results = (hargaLayanan as Service[])
        .filter(s => names.includes(s.name))
        .map(service => {
          const variant = service.variants?.find(v => v.name === parsedSize);
          const basePrice = variant?.price ?? service.price;
          return {
            service_name: service.name,
            motor_size: parsedSize,
            price: basePrice,
            estimated_duration: formatDuration(service.estimatedDuration),
            similarity: 1,
          };
        });
      return {
        success: true,
        multiple_candidates: true,
        candidates: results,
        message: `Ditemukan 2 layanan utama untuk "coating": Coating Motor Doff & Coating Motor Glossy.`,
      };
    }

    // Default: fuzzy match seperti sebelumnya
    const candidates = (hargaLayanan as Service[])
      .map(s => ({
        ...s,
        similarity: stringSimilarity(parsedServiceName, s.name)
      }))
      .filter(s => s.similarity >= 0.5)
      .sort((a, b) => b.similarity - a.similarity);

    if (candidates.length === 0) {
      return {
        success: false,
        error: 'generic_error',
        message: `Layanan "${parsedServiceName}" tidak ditemukan atau terlalu berbeda.`,
      };
    }

    if (candidates.length === 1) {
      const service = candidates[0];
      const variant = service.variants?.find(v => v.name === parsedSize);
      const basePrice = variant?.price ?? service.price;
      if (basePrice === undefined) {
        return {
          success: false,
          error: 'price_not_available_for_size',
          message: `Harga belum tersedia untuk size ${parsedSize} pada layanan "${service.name}".`,
          service_name: service.name,
          motor_size: parsedSize,
        };
      }
      const summary =
        `Harga untuk layanan *${service.name}* untuk motor ukuran ${parsedSize} adalah Rp${basePrice.toLocaleString('id-ID')}.` +
        (service.estimatedDuration ? ` Estimasi pengerjaan: ${formatDuration(service.estimatedDuration)}.` : '');
      return {
        success: true,
        service_name: service.name,
        motor_size: parsedSize,
        price: basePrice,
        estimated_duration: formatDuration(service.estimatedDuration),
        summary,
      };
    }

    const results = candidates.map(service => {
      const variant = service.variants?.find(v => v.name === parsedSize);
      const basePrice = variant?.price ?? service.price;
      return {
        service_name: service.name,
        motor_size: parsedSize,
        price: basePrice,
        estimated_duration: formatDuration(service.estimatedDuration),
        similarity: service.similarity,
      };
    });

    return {
      success: true,
      multiple_candidates: true,
      candidates: results,
      message: `Ditemukan ${results.length} layanan mirip dengan "${parsedServiceName}". Silakan pilih yang paling sesuai.`,
    };

  } catch (err: any) {
    console.error('[getSpecificServicePriceTool] Error:', err);
    return {
      success: false,
      error: 'generic_error',
      message: `Terjadi error saat mengambil harga: ${err.message}`,
    };
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