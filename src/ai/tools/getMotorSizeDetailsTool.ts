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
    const lowerCaseQuery = motor_query.toLowerCase();
    const matches = (allMotorsData as any[]).filter(
      (motor) =>
        motor.model.toLowerCase() === lowerCaseQuery ||
        (motor.aliases && motor.aliases.some((alias: string) => lowerCaseQuery.includes(alias.toLowerCase())))
    );

    if (matches.length === 0) {
      return { success: false, error: 'generic_error', message: `Motor "${motor_query}" tidak ditemukan.` };
    }

    if (matches.length > 1) {
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
