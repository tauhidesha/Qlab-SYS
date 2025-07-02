'use server';

import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';
import type { GetMotorSizeResult } from '@/types/ai/tools';

// --- Tipe Data & Skema Internal ---
type Motor = {
  model: string;
  motor_db_size: 'S' | 'M' | 'L' | 'XL';
  repaint_size: 'S' | 'M' | 'L' | 'XL';
};

const InputSchema = z.object({
  motor_query: z.string(),
});
type Input = z.infer<typeof InputSchema>;


// --- Fungsi Utama Tool ---

export async function getMotorSizeDetails(input: Input): Promise<GetMotorSizeResult> {
  try {
    const { motor_query } = InputSchema.parse(input);

    const motorsJsonPath = path.join(process.cwd(), 'docs', 'daftarUkuranMotor.json');
    const motorsFile = await fs.readFile(motorsJsonPath, 'utf-8');
    const allMotors: Motor[] = JSON.parse(motorsFile);

    const lowerCaseQuery = motor_query.toLowerCase();
    
    // Cari semua motor yang cocok dengan query
    const matches = allMotors.filter(motor => motor.model.toLowerCase().includes(lowerCaseQuery));

    if (matches.length === 0) {
      // HILIGHT: Mengembalikan error dengan format baru
      return { error: 'generic_error', message: `Motor dengan nama "${motor_query}" tidak ditemukan di database kami.` };
    }

    if (matches.length > 1) {
       // Cek apakah ada satu match yang sama persis (case-insensitive)
      const exactMatch = matches.find(m => m.model.toLowerCase() === lowerCaseQuery);
      if (exactMatch) {
         // Jika ada match yang sama persis, langsung gunakan itu
         return {
            details: {
              motor_model: exactMatch.model,
              general_size: exactMatch.motor_db_size,
              repaint_size: exactMatch.repaint_size,
            }
         };
      }

      // Jika tidak ada yang sama persis dan ada banyak hasil, motornya ambigu
      return {
        error: 'ambiguous_motor',
        ambiguous_options: matches.map(m => m.model),
      };
    }

    // Jika hanya ada satu match, kembalikan detailnya (kasus sukses)
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
    // HILIGHT: Mengembalikan error dengan format baru
    return { error: 'generic_error', message: `Error internal di tool ukuran motor: ${err.message}` };
  }
}