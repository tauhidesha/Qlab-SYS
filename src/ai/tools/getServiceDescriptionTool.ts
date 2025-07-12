// @file: src/ai/tools/getServiceDescriptionTool.ts

import { z } from 'zod';
import deskripsiLayanan from '@/data/deskripsiLayanan';

// --- Skema Input (tidak perlu diubah) ---
const InputSchema = z.object({
  service_name: z.string().describe('Nama layanan spesifik yang ingin dijelaskan atau dijual ke pelanggan'),
});
type Input = z.infer<typeof InputSchema>;

// --- Tipe Output (tidak perlu diubah) ---
type Output = {
  success: boolean;
  description?: string;
  summary?: string;
  error?: string;
  message?: string;
};

// --- Tool Export untuk AI Agent (Di sinilah perbaikannya) ---
export const getServiceDescriptionTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'getServiceDescription',
      description: 'Dapatkan deskripsi detail dan keunggulan layanan spesifik untuk pelanggan.',
      parameters: {
        type: 'object',
        properties: {
          service_name: {
            type: 'string',
            description: 'Nama layanan spesifik yang ingin dijelaskan.',
          },
        },
        required: ['service_name'],
      },
    },
  },

  // ✅ PERBAIKAN: Implementasi dibuat inline dan menerima 'bungkusan' objek
  // Ia akan membongkar properti 'arguments' dan menamainya 'input'
  implementation: async ({ arguments: input }: { arguments: Input }): Promise<Output> => {
    try {
      // Sekarang kita bisa mem-parse `input` karena isinya sudah benar `{ service_name: '...' }`
      const { service_name } = InputSchema.parse(input);

      const normalized = service_name.toLowerCase().trim();

      // Cari dengan contains match (lebih fleksibel)
      const service = (deskripsiLayanan as any[]).find(
        (s) => s.name.toLowerCase().includes(normalized)
      );

      if (!service) {
        return {
          success: false,
          error: 'not_found',
          message: `Layanan "${service_name}" tidak ditemukan di database deskripsi.`,
        };
      }

      return {
        success: true,
        description: service.description || '',
        summary: service.summary || '',
      };
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        console.error('[getServiceDescriptionTool] ZodError:', err.issues);
      } else {
        console.error('[getServiceDescriptionTool] Error:', err);
      }
      return {
        success: false,
        error: 'internal_error',
        message: err?.message || 'Terjadi error saat mengambil deskripsi layanan.',
      };
    }
  },
};