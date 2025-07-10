// File: src/ai/tools/getSpecificServicePriceTool.ts

import { z } from 'zod';
import type { GetPriceResult } from '@/types/ai/tools';
import allServicesData from '../../../docs/harga_layanan.json';

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

// --- Utility ---
function formatDuration(minutesStr?: string): string | undefined {
  if (!minutesStr) return undefined;
  const totalMinutes = parseInt(minutesStr, 10);
  if (isNaN(totalMinutes) || totalMinutes === 0) return undefined;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return [
    hours > 0 ? `${hours} jam` : '',
    minutes > 0 ? `${minutes} menit` : ''
  ].filter(Boolean).join(' ');
}

// --- Implementation ---
async function implementation(input: Input): Promise<GetPriceResult> {
  try {
    const { service_name, size } = InputSchema.parse(input);

    const allServices = allServicesData as Service[];
    const service = allServices.find(
      s => s.name.toLowerCase() === service_name.toLowerCase()
    );

    if (!service) {
      return {
        success: false,
        error: 'generic_error',
        message: `Layanan "${service_name}" tidak ditemukan di database.`,
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

    const summary = `Harga untuk layanan *${service.name}* untuk motor ukuran ${size} adalah Rp${basePrice.toLocaleString('id-ID')}.` +
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

// --- Export untuk AI Agent (function calling compatible) ---
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
