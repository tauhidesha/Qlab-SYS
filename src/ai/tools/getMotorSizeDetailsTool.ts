// File: src/ai/tools/getMotorSizeDetailsTool.ts

import { z } from 'zod';
import allMotorsData from '../../../docs/daftarUkuranMotor.json';

// --- Input Schema ---
const InputSchema = z.object({
  motor_query: z.string().describe('Nama/model motor yang ingin dicek ukurannya'),
});
export type Input = z.infer<typeof InputSchema>;

// --- Output Type ---
type Output = {
  success: boolean;
  details?: {
    motor_model: string;
    general_size: string;
    repaint_size: string;
  };
  summary?: string;
  error?: string;
  message?: string;
  ambiguous_options?: string[];
};

// --- Implementation ---
async function implementation(input: Input): Promise<Output> {
  try {
    const { motor_query } = InputSchema.parse(input);
    const query = motor_query.toLowerCase().trim();

    const allMotors = allMotorsData as any[];

    const exactMatch = allMotors.find(
      (motor) => motor.model.toLowerCase() === query
    );

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

    // Cari berdasarkan alias
    const aliasMatches = allMotors.filter((motor) => {
      const aliases = (motor.aliases || []) as string[];
      return aliases.some((alias) => query.includes(alias.toLowerCase()));
    });

    if (aliasMatches.length === 1) {
      const motor = aliasMatches[0];
      return {
        success: true,
        details: {
          motor_model: motor.model,
          general_size: motor.motor_db_size,
          repaint_size: motor.repaint_size,
        },
        summary: `Motor ${motor.model} tergolong size ${motor.motor_db_size} (umum) dan ${motor.repaint_size} untuk repaint.`,
      };
    }

    if (aliasMatches.length > 1) {
      return {
        success: false,
        error: 'ambiguous_motor',
        message: `Nama motor terlalu umum, bisa jadi: ${aliasMatches.map((m) => m.model).join(', ')}`,
        ambiguous_options: aliasMatches.map((m) => m.model),
      };
    }

    return {
      success: false,
      error: 'motor_not_found',
      message: `Zoya belum menemukan motor "${motor_query}" di database ukuran kami.`,
    };

  } catch (error: any) {
    return {
      success: false,
      error: 'generic_error',
      message: `Terjadi error internal: ${error.message}`,
    };
  }
}

// --- Export untuk AI Agent (function calling compatible) ---
export const getMotorSizeDetailsTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'getMotorSizeDetails',
      description: 'Cek motor ini masuk size apa (S/M/L/XL) untuk kebutuhan layanan.',
      parameters: {
        type: 'object',
        properties: {
          motor_query: { type: 'string', description: 'Nama/tipe motor user.' },
        },
        required: ['motor_query'],
      },
    },
  },
  implementation,
};
