// File: src/ai/tools/getMotorSizeDetailsTool.ts
'use server';

import { z } from 'zod';
// Path impor sudah benar menggunakan alias '@/'
import type { GetMotorSizeResult } from '@/types/ai/tools';
import allMotorsData from '@/../docs/daftarUkuranMotor.json';

const InputSchema = z.object({
  motor_query: z.string(),
});

type Input = z.infer<typeof InputSchema>;

// Asumsi struktur data dari JSON Anda
interface MotorData {
  model: string;
  aliases?: string[]; // Dibuat opsional untuk mencegah error
  motor_db_size: string;
  repaint_size: string;
}

export async function getMotorSizeDetails(
  input: Input,
): Promise<GetMotorSizeResult> {
  try {
    const { motor_query } = InputSchema.parse(input);
    const lowerCaseQuery = motor_query.toLowerCase();

    const matches: MotorData[] = (allMotorsData as MotorData[]).filter(
      (motor) =>
        motor.model.toLowerCase() === lowerCaseQuery ||
        // Perbaikan: Cek dulu apakah 'motor.aliases' ada sebelum menjalankan .some()
        (motor.aliases && motor.aliases.some((alias) => lowerCaseQuery.includes(alias.toLowerCase())))
    );

    if (matches.length === 0) {
      return {
        success: false,
        error: 'generic_error',
        message: `Motor dengan nama "${motor_query}" tidak ditemukan di database kami.`,
      };
    }

    if (matches.length > 1) {
      // Jika ada beberapa hasil, coba cari yang namanya sama persis
      const exactMatch = matches.find(m => m.model.toLowerCase() === lowerCaseQuery);
      if (exactMatch) {
        return {
          success: true,
          details: {
            motor_model: exactMatch.model,
            general_size: exactMatch.motor_db_size,
            repaint_size: exactMatch.repaint_size,
          },
          summary: `Motor ${exactMatch.model} tergolong size ${exactMatch.motor_db_size} (umum) dan ${exactMatch.repaint_size} untuk repaint.`,
        };
      }
      
      // Jika tidak ada yang sama persis, kembalikan error ambigu
      return {
        success: false,
        error: 'ambiguous_motor',
        message: `Nama motor terlalu umum, bisa jadi: ${matches.map((m) => m.model).join(', ')}`,
        ambiguous_options: matches.map((m) => m.model),
      };
    }

    const motor = matches[0];
    return {
      success: true,
      details: {
        motor_model: motor.model,
        general_size: motor.motor_db_size,
        repaint_size: motor.repaint_size,
      },
      summary: `Motor ${motor.model} tergolong size ${motor.motor_db_size} (umum) dan ${motor.repaint_size} untuk repaint.`,
    };

  } catch (error: any) {
    console.error('[getMotorSizeDetailsTool] Error:', error);
    return {
      success: false,
      error: 'generic_error',
      message: `Terjadi kesalahan internal: ${error.message}`,
    };
  }
}
