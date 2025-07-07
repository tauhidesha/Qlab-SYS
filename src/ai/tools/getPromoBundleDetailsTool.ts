'use server';

import { z } from 'zod';
import promoData from '../../../docs/promo_bundling.json';
import allMotorsData from '../../../docs/daftarUkuranMotor.json';

type MotorSize = "S" | "M" | "L" | "XL";

type Motor = {
  model: string;
  motor_db_size: MotorSize;
  repaint_size: MotorSize;
};

const isValidSize = (size: any): size is MotorSize => {
  return ["S", "M", "L", "XL"].includes(size);
};

const allMotors: Motor[] = (allMotorsData as any[]).map((m) => {
  if (!isValidSize(m.motor_db_size) || !isValidSize(m.repaint_size)) {
    throw new Error(`Invalid size in daftarUkuranMotor.json for model: ${m.model}`);
  }
  return m as Motor;
});

const InputSchema = z.object({
  motor_query: z.string().optional(),
});
export type Input = z.infer<typeof InputSchema>;

export type Result = {
  isPromoAvailable: boolean;
  promoDetails?: any;
  motor_model?: string;
  note: string;
  summary?: string;
};

export async function getPromoBundleDetails(input: Input): Promise<Result> {
  try {
    const { motor_query } = InputSchema.parse(input);

    if (!motor_query || motor_query === 'N/A' || motor_query.toLowerCase().trim() === 'umum') {
  return {
    isPromoAvailable: true,
    promoDetails: promoData,
    note: `🔥 Ada promo spesial buat semua tipe motor nih bro, biar makin kinclong tanpa bikin kantong bolong!`,
    summary: `✅ *Repaint Bodi Halus* + *Full Detailing Glossy*
💰 Hemat sampai *300rb-an*! Buruan sebelum slot-nya habis ya, bro 😎`,
  };
}

    const lowerCaseQuery = motor_query.toLowerCase();
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
      summary: `Ada promo bundling keren buat ${motor.model} (size ${repaintSize}) nih, bro!

👉 Normal price: Rp${specificPromo.normalPrice.toLocaleString('id-ID')}
👉 Harga promo: Rp${specificPromo.promoPrice.toLocaleString('id-ID')}
💰 Hemat: Rp${specificPromo.savings.toLocaleString('id-ID')}

Udah termasuk:
✅ Repaint Bodi Halus
✅ Full Detailing Glossy

Langsung gaskeun sebelum slot penuh ya!`
    };
  } catch (err: any) {
    console.error('[getPromoBundleDetails] Error:', err);
    return {
      isPromoAvailable: false,
      note: 'Terjadi kesalahan saat mencari promo.',
    };
  }
}
