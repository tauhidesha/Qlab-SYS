'use server';

import { z } from 'zod';
import promoData from '../../../docs/promo_bundling.json';
import allMotorsData from '../../../docs/daftarUkuranMotor.json';

// --- Tipe Data & Validasi (Kita terapkan di sini juga) ---
type MotorSize = "S" | "M" | "L" | "XL";

type Motor = {
  model: string;
  motor_db_size: MotorSize;
  repaint_size: MotorSize;
};

const isValidSize = (size: any): size is MotorSize => {
  return ["S", "M", "L", "XL"].includes(size);
};

// Validasi data saat file di-import
const allMotors: Motor[] = (allMotorsData as any[]).map((m) => {
  if (!isValidSize(m.motor_db_size) || !isValidSize(m.repaint_size)) {
    // Error ini akan muncul saat build jika data JSON salah
    throw new Error(`Invalid size in daftarUkuranMotor.json for model: ${m.model}`);
  }
  return m as Motor;
});
// --- Akhir Blok Validasi ---


const InputSchema = z.object({
  motor_query: z.string().optional(),
});
type Input = z.infer<typeof InputSchema>;

type Result = {
  isPromoAvailable: boolean;
  promoDetails?: any;
  note: string;
};


export async function getPromoBundleDetails(input: Input): Promise<Result> {
  try {
    const { motor_query } = InputSchema.parse(input);

    if (!motor_query || motor_query === 'N/A' || motor_query.toLowerCase().trim() === 'umum') {
      return {
        isPromoAvailable: true,
        promoDetails: promoData,
        note: `Saat ini ada promo bundling Repaint Bodi Halus + Full Detailing untuk semua ukuran.`
      };
    }

    // Langsung gunakan 'allMotors' yang sudah divalidasi
    const cleanedQuery = motor_query.trim().toLowerCase();
    const motor = allMotors.find(m => m.model.toLowerCase() === cleanedQuery);

    if (!motor) {
      return { isPromoAvailable: false, note: `Motor "${motor_query}" tidak ditemukan dalam daftar kami.` };
    }

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
      promoDetails: specificPromo,
      note: `Untuk motor ${motor.model} (size ${repaintSize}), ada promo bundling!`
    };

  } catch (err: any) {
    return { isPromoAvailable: false, note: `Error internal: ${err.message}` };
  }
}