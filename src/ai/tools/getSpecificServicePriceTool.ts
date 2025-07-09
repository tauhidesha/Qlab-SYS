// File: src/ai/tools/getSpecificServicePriceTool.ts

import { z } from 'zod';
import type { GetPriceResult } from '@/types/ai/tools';
import allServicesData from '../../../docs/harga_layanan.json';
import allMotorsData from '../../../docs/daftarUkuranMotor.json';

// --- Input Schema ---
const InputSchema = z.object({
  service_name: z.string().describe('Nama layanan yang ingin dicek harga detailnya'),
  motor_query: z.string().describe('Nama/model motor yang ingin dicek harganya'),
  original_query: z.string().optional().describe('Isi pesan asli user (untuk deteksi warna spesial)'),
});
export type Input = z.infer<typeof InputSchema>;

// --- Helper Types ---
type Service = { 
  name: string; 
  category: string; 
  price?: number; 
  estimated_duration?: string;
  variants?: { name: string; price: number }[]; 
};
type MotorSize = "S" | "M" | "L" | "XL";
type Motor = {
  model: string;
  motor_db_size: MotorSize;
  repaint_size: MotorSize;
};

// --- Validasi Data Motor Saat Load ---
const isValidSize = (size: any): size is MotorSize =>
  ["S", "M", "L", "XL"].includes(size);
const allMotors: Motor[] = (allMotorsData as any[]).map((m) => {
  if (!isValidSize(m.motor_db_size) || !isValidSize(m.repaint_size)) {
    throw new Error(`Invalid size in daftarUkuranMotor.json for model: ${m.model}`);
  }
  return m as Motor;
});

// --- Helper ---
function formatDuration(minutesStr?: string): string | undefined {
  if (!minutesStr) return undefined;
  const totalMinutes = parseInt(minutesStr, 10);
  if (isNaN(totalMinutes) || totalMinutes === 0) return undefined;
  const totalHours = totalMinutes / 60;
  const workingDayHours = 8;
  if (totalHours > 12) {
    const days = Math.ceil(totalHours / workingDayHours);
    return `sekitar ${days} hari kerja`;
  }
  const hours = Math.floor(totalHours);
  const minutes = totalMinutes % 60;
  let result = 'sekitar ';
  if (hours > 0) result += `${hours} jam `;
  if (minutes > 0) result += `${minutes} menit`;
  return result.trim();
}
function findBestMotorMatch(query: string, allMotors: Motor[]): Motor | null {
  const lowerCaseQuery = query.toLowerCase();
  const matches = allMotors.filter(motor => motor.model.toLowerCase().includes(lowerCaseQuery));
  if (matches.length === 0) return null;
  if (matches.length > 1) {
    matches.sort((a, b) => b.model.length - a.model.length);
  }
  return matches[0];
}

// --- Implementation ---
async function implementation(input: Input): Promise<GetPriceResult> {
  try {
    const { service_name, motor_query, original_query } = InputSchema.parse(input);

    const serviceInfo = (allServicesData as Service[]).find(s => s.name.toLowerCase().includes(service_name.toLowerCase()));
    if (!serviceInfo) {
      return { success: false, error: 'generic_error', message: `Layanan "${service_name}" tidak ditemukan.` };
    }
    
    const motor = findBestMotorMatch(motor_query, allMotors);
    if (!motor) {
      return { success: false, error: 'generic_error', message: `Motor yang cocok dengan "${motor_query}" tidak ditemukan.` };
    }
    
    const isVespa = motor.model.toLowerCase().includes('vespa');
    const isRepaint = serviceInfo.category === 'repaint';

    if (isVespa && isRepaint) {
      return { success: false, error: 'requires_human_assistance', message: `Kasus repaint Vespa butuh penanganan khusus.` };
    }

    const motorSize = serviceInfo.category === 'repaint' ? motor.repaint_size : motor.motor_db_size;
    const variant = serviceInfo.variants?.find(v => v.name === motorSize);
    const basePrice = variant ? variant.price : serviceInfo.price;

    if (basePrice === undefined) {
      return {
        success: false,
        error: 'price_not_available_for_size',
        message: `Harga belum tersedia untuk motor ukuran ${motorSize}.`,
        service_name: serviceInfo.name,
        motor_size: motorSize,
      };
    }

    let finalPrice = basePrice;
    let noteForResult: string | undefined = undefined;
    if (serviceInfo.name.toLowerCase().includes('repaint bodi halus') && original_query) {
      const lowerCaseQuery = original_query.toLowerCase();
      const specialPaintKeywords = ['candy', 'lembayung', 'xyralic', 'xyrallic', 'bunglon', 'hologram', 'warna efek'];
      if (specialPaintKeywords.some(keyword => lowerCaseQuery.includes(keyword))) {
        const specialPaintSurcharges = { 'S': 150000, 'M': 250000, 'L': 350000, 'XL': 400000 };
        const surcharge = specialPaintSurcharges[motorSize as keyof typeof specialPaintSurcharges];
        if (surcharge) {
          finalPrice += surcharge;
          noteForResult = `Harga dasarnya Rp${basePrice.toLocaleString('id-ID')}, tapi karena ini warna spesial, ada tambahan Rp${surcharge.toLocaleString('id-ID')}.`;
        }
      }
    }

    const summaryText = `Harga untuk layanan *${serviceInfo.name}* pada motor ${motor.model} (size ${motorSize}) adalah Rp${finalPrice.toLocaleString('id-ID')}.` +
      (serviceInfo.estimated_duration ? ` Estimasi pengerjaan: ${formatDuration(serviceInfo.estimated_duration)}.` : '') +
      (noteForResult ? `\n\nCatatan: ${noteForResult}` : '');

    return {
      success: true,
      motor_model: motor.model,
      motor_size: motorSize,
      service_name: serviceInfo.name,
      price: finalPrice,
      estimated_duration: formatDuration(serviceInfo.estimated_duration),
      note: noteForResult,
      summary: summaryText
    };

  } catch (err: any) {
    console.error('[getSpecificServicePrice Tool] Error:', err);
    return {
      success: false,
      error: 'generic_error',
      message: `Error internal di tool harga: ${err.message}`
    };
  }
}

// ✅ EXPORT YANG BENAR UNTUK FUNCTION CALLING
export const getSpecificServicePriceTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: "getSpecificServicePrice",
      description: "Dapatkan harga layanan spesifik untuk motor tertentu.",
      parameters: {
        type: "object",
        properties: {
          service_name: { type: "string", description: "Nama layanan spesifik." },
          motor_query: { type: "string", description: "Nama/tipe motor user." },
          original_query: { type: "string", description: "Pesan asli dari user (opsional, untuk deteksi warna spesial)." },
        },
        required: ["service_name", "motor_query"],
      },
    },
  },
  implementation,
};
