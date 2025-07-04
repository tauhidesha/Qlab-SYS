'use server';

import { z } from 'zod';
import type { GetMotorSizeResult } from '@/types/ai/tools';
import allMotorsData from '../../../docs/daftarUkuranMotor.json';


// Tipe data & validasi sudah Anda buat dengan sangat baik
type MotorSize = "S" | "M" | "L" | "XL";

type Motor = {
  model: string;
  motor_db_size: MotorSize;
  repaint_size: MotorSize;
};

const isValidSize = (size: string): size is MotorSize => {
  return ["S", "M", "L", "XL"].includes(size);
};

// Variabel ini dibuat sekali di sini dengan validasi,
// lalu bisa dipakai di mana saja dalam file ini.
const allMotors: Motor[] = allMotorsData.map((m: any) => {
  if (!isValidSize(m.motor_db_size) || !isValidSize(m.repaint_size)) {
    throw new Error(`Invalid size in motor data: ${m.model}`);
  }
  return {
    model: m.model,
    motor_db_size: m.motor_db_size,
    repaint_size: m.repaint_size,
  };
});

const InputSchema = z.object({
  motor_query: z.string(),
});
type Input = z.infer<typeof InputSchema>;


// --- Fungsi Utama Tool ---
export async function getMotorSizeDetails(input: Input): Promise<GetMotorSizeResult> {
  try {
    const { motor_query } = InputSchema.parse(input);

    // --- PERBAIKAN: HAPUS BARIS INI ---
    // const allMotors: Motor[] = allMotorsData; // Baris ini tidak lagi diperlukan

    // Langsung gunakan 'allMotors' yang sudah kita buat di atas
    const lowerCaseQuery = motor_query.toLowerCase();
    const matches = allMotors.filter(motor => motor.model.toLowerCase().includes(lowerCaseQuery));

    if (matches.length === 0) {
      return { error: 'generic_error', message: `Motor dengan nama "${motor_query}" tidak ditemukan di database kami.` };
    }

    if (matches.length > 1) {
      const exactMatch = matches.find(m => m.model.toLowerCase() === lowerCaseQuery);
      if (exactMatch) {
         return {
            details: {
              motor_model: exactMatch.model,
              general_size: exactMatch.motor_db_size,
              repaint_size: exactMatch.repaint_size,
            }
         };
      }
      return {
        error: 'ambiguous_motor',
        ambiguous_options: matches.map(m => m.model),
      };
    }

    const motor = matches[0];
    return {
      details: {
        motor_model: motor.model,
        general_size: motor.motor_db_size,
        repaint_size: motor.repaint_size,
      }
    };

  } catch (err: any) {
    console.error('[getMotorSizeDetails Tool] Error:', err);
    return { error: 'generic_error', message: `Error internal di tool ukuran motor: ${err.message}` };
  }
}