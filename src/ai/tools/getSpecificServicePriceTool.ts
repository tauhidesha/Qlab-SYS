// File: src/ai/tools/getSpecificServicePriceTool.ts

import { z } from 'zod';
import type { GetPriceResult } from '@/types/ai/tools';
import allServicesData from '../../../docs/harga_layanan.json';
import type { SessionData } from '@/ai/utils/session';

// --- Input Schema ---
const InputSchema = z.object({
  service_name: z.string().describe('Nama layanan yang ingin dicek harga detailnya'),
  size: z.enum(['S', 'M', 'L', 'XL']).describe('Ukuran motor untuk layanan ini (S/M/L/XL)'),
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

  for (const service of allServicesData as Service[]) {
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
async function implementation(input: Input, session?: SessionData): Promise<GetPriceResult> {
  try {
    let { service_name, size } = InputSchema.parse(input);

    // Kalau ini repaint, dan repaintSize tersedia, override size
    if (session?.inquiry?.lastMentionedService?.serviceName?.toLowerCase().includes('repaint')) {
      size = session.inquiry.repaintSize || size;
    }

    // Cari layanan dengan fuzzy match
    const matchedServiceName = getBestMatchServiceName(service_name);
    if (!matchedServiceName) {
      return {
        success: false,
        error: 'generic_error',
        message: `Layanan "${service_name}" tidak ditemukan atau terlalu berbeda.`,
      };
    }

    const service = (allServicesData as Service[]).find(s => s.name === matchedServiceName);
    if (!service) {
      return {
        success: false,
        error: 'generic_error',
        message: `Data layanan "${matchedServiceName}" tidak tersedia di database.`,
      };
    }

    const variant = service.variants?.find(v => v.name === size);
    const basePrice = variant?.price ?? service.price;

    if (basePrice === undefined) {
      return {
        success: false,
        error: 'price_not_available_for_size',
        message: `Harga belum tersedia untuk size ${size} pada layanan "${service.name}".`,
        service_name: service.name,
        motor_size: size,
      };
    }

    const summary =
      `Harga untuk layanan *${service.name}* untuk motor ukuran ${size} adalah Rp${basePrice.toLocaleString('id-ID')}.` +
      (service.estimatedDuration ? ` Estimasi pengerjaan: ${formatDuration(service.estimatedDuration)}.` : '');

    return {
      success: true,
      service_name: service.name,
      motor_size: size,
      price: basePrice,
      estimated_duration: formatDuration(service.estimatedDuration),
      summary,
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
