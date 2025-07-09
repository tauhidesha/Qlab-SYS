// File: src/ai/tools/getPromoBundleDetailsTool.ts

import { z } from 'zod';
import promoData from '../../../docs/promo_bundling.json';
import allMotorsData from '../../../docs/daftarUkuranMotor.json';

// --- Input Schema (untuk validasi dan typing di backend, bukan function-calling) ---
const InputSchema = z.object({
  motor_query: z.string().optional().describe('Model motor (jika spesifik, misal "PCX" atau "Vario")'),
});
export type Input = z.infer<typeof InputSchema>;

// --- Output Type ---
type Output = {
  isPromoAvailable: boolean;
  promoDetails?: any;
  motor_model?: string;
  note: string;
  summary?: string;
};

// --- Implementation ---
async function implementation(input: Input): Promise<Output> {
  try {
    const { motor_query } = InputSchema.parse(input);

    if (!motor_query || motor_query === 'N/A' || motor_query.toLowerCase().trim() === 'umum') {
      return {
        isPromoAvailable: true,
        promoDetails: promoData,
        note: `🔥 Ada promo spesial buat semua tipe motor nih bro, biar makin kinclong tanpa bikin kantong bolong!`,
        summary: `✅ *Repaint Bodi Halus* + *Full Detailing Glossy*\n💰 Hemat sampai *300rb-an*! Buruan sebelum slot-nya habis ya, bro 😎`,
      };
    }

    const lowerCaseQuery = motor_query.toLowerCase();
    const allMotors = (allMotorsData as any[]).filter(m => m.model && m.repaint_size);
    const matches = allMotors.filter(motor => motor.model.toLowerCase().includes(lowerCaseQuery));

    if (matches.length === 0) {
      return { isPromoAvailable: false, note: `Motor "${motor_query}" tidak ditemukan.` };
    }

    matches.sort((a, b) => b.model.length - a.model.length);
    const motor = matches[0];
    const repaintSize = motor.repaint_size;
    const specificPromo = (promoData as any[]).find(p => p.repaintSize === repaintSize);

    if (!specificPromo) {
      return {
        isPromoAvailable: false,
        note: `Maaf, untuk motor ${motor.model} (size ${repaintSize}) saat ini belum ada promo bundling.`
      };
    }

    return {
      isPromoAvailable: true,
      motor_model: motor.model,
      promoDetails: specificPromo,
      note: `Untuk motor ${motor.model} (size ${repaintSize}), ada promo bundling!`,
      summary: `Ada promo bundling keren buat ${motor.model} (size ${repaintSize}) nih, bro!\n\n👉 Normal price: Rp${specificPromo.normalPrice.toLocaleString('id-ID')}\n👉 Harga promo: Rp${specificPromo.promoPrice.toLocaleString('id-ID')}\n💰 Hemat: Rp${specificPromo.savings.toLocaleString('id-ID')}\n\nUdah termasuk:\n✅ Repaint Bodi Halus\n✅ Full Detailing Glossy\n\nLangsung gaskeun sebelum slot penuh ya!`
    };
  } catch (err: any) {
    return {
      isPromoAvailable: false,
      note: 'Terjadi kesalahan saat mencari promo.',
    };
  }
}

// --- Export for AI Agent (function-calling compatible) ---
export const getPromoBundleDetailsTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'getPromoBundleDetails',
      description: 'Ambil detail promo bundling berdasarkan model/size motor.',
      parameters: {
        type: 'object',
        properties: {
          motor_query: { type: 'string', description: 'Nama/tipe motor user (opsional).' },
        },
        required: [],
      },
    },
  },
  implementation,
};
