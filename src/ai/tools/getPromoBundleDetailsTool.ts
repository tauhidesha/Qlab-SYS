// File: src/ai/tools/getPromoBundleDetailsTool.ts

import { z } from 'zod';
import promoBundling from '../../data/promoBundling';
import daftarUkuranMotor from '../../data/daftarUkuranMotor';
import { normalizeToolInput } from '../utils/normalizeToolInput';

// Tambahkan terms
import { promoTerms } from '../../data/promoBundling'; // <<< import baru

// --- Input Schema ---
const InputSchema = z.object({
  motor_query: z.string().optional().describe('Model motor (misal "PCX", "Vario", dll)'),
});
export type Input = z.infer<typeof InputSchema>;

// --- Output Type ---
type Output = {
  isPromoAvailable: boolean;
  promoDetails?: any;
  motor_model?: string;
  note: string;
  summary?: string;
  terms?: string[]; // <<< baru
};

// --- Implementation ---
async function implementation(input: Input): Promise<Output> {
  try {
    const motor_query = normalizeToolInput(input, 'motor_query');

    if (!motor_query || motor_query === 'N/A' || motor_query.toLowerCase().trim() === 'umum') {
      return {
        isPromoAvailable: true,
        promoDetails: promoBundling,
        terms: promoTerms, // <<< baru
        note: `🔥 Ada promo spesial buat semua tipe motor nih bro, biar makin kinclong tanpa bikin kantong bolong!`,
        summary: `✅ *Repaint Bodi Halus* + *Full Detailing Glossy*\n💰 Hemat sampai *300rb-an*! Buruan sebelum slot-nya habis ya, bro 😎`,
      };
    }

    const lowerCaseQuery = motor_query.toLowerCase();
    const allMotors = (daftarUkuranMotor as any[]).filter(m => m.model && m.repaint_size);
    
    // Use same matching logic as getMotorSizeDetails - check both model and aliases
    const matches = allMotors.filter(motor => {
      const model = motor.model?.toLowerCase() || '';
      const aliases = (motor.aliases || []).map((a: string) => a.toLowerCase());
      const candidates = [model, ...aliases];
      
      // Check if query matches any candidate (exact match or contains)
      return candidates.some(candidate => 
        candidate.includes(lowerCaseQuery) || lowerCaseQuery.includes(candidate)
      );
    });

    if (matches.length === 0) {
      return {
        isPromoAvailable: false,
        note: `Motor "${motor_query}" tidak ditemukan.`,
      };
    }

    matches.sort((a, b) => b.model.length - a.model.length);
    const motor = matches[0];
    const repaintSize = motor.repaint_size;
    const specificPromo = (promoBundling as any[]).find(p => p.repaintSize === repaintSize);

    if (!specificPromo) {
      return {
        isPromoAvailable: false,
        note: `Maaf, untuk motor ${motor.model} (size ${repaintSize}) saat ini belum ada promo bundling.`,
      };
    }

    return {
      isPromoAvailable: true,
      motor_model: motor.model,
      promoDetails: specificPromo,
      terms: promoTerms, // <<< baru
      note: `Untuk motor ${motor.model} (size ${repaintSize}), ada promo bundling!`,
      summary:
        `🔥 Promo bundling buat ${motor.model} (size ${repaintSize}):\n\n` +
        `• Harga normal: Rp${specificPromo.normalPrice.toLocaleString('id-ID')}\n` +
        `• Harga promo: *Rp${specificPromo.promoPrice.toLocaleString('id-ID')}*\n` +
        `• Hemat: *Rp${specificPromo.savings.toLocaleString('id-ID')}*\n\n` +
        `Termasuk:\n✅ Repaint Bodi Halus\n✅ Full Detailing Glossy\n\nGas sebelum kehabisan slot, bro!`,
    };
  } catch (err: any) {
    console.error('[getPromoBundleDetailsTool] Error:', err);
    return {
      isPromoAvailable: false,
      note: 'Terjadi kesalahan saat mencari promo.',
    };
  }
}

// --- Export (Function Calling) ---
export const getPromoBundleDetailsTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'getPromoBundleDetails',
      description: 'Cek apakah ada promo bundling untuk motor tertentu.',
      parameters: {
        type: 'object',
        properties: {
          motor_query: {
            type: 'string',
            description: 'Model motor (opsional, misalnya "Nmax", "Vario", "PCX")',
          },
        },
        required: [],
      },
    },
  },
  implementation,
};
