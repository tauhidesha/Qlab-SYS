// File: src/ai/tools/getServiceDescriptionTool.ts

import { z } from 'zod';
import allServicesData from '../../../docs/deskripsi_layanan.json';

// --- Input Schema ---
const InputSchema = z.object({
  service_name: z.string().describe('Nama layanan spesifik yang ingin dijelaskan atau dijual ke pelanggan'),
});
export type Input = z.infer<typeof InputSchema>;

// --- Output Type ---
type Output = {
  success: boolean;
  description?: string;
  summary?: string;
  error?: string;
  message?: string;
};

async function implementation(input: Input): Promise<Output> {
  try {
    const { service_name } = InputSchema.parse(input);

    // Cari layanan dengan pencocokan case-insensitive, boleh pakai contains (agar fleksibel)
    const service = (allServicesData as any[]).find(
      (s) => s.name.toLowerCase().includes(service_name.toLowerCase())
    );
    if (!service) {
      return {
        success: false,
        error: `not_found`,
        message: `Layanan "${service_name}" tidak ditemukan di database.`,
      };
    }
    // Bisa return summary kalau tersedia
    return {
      success: true,
      description: service.description || '',
      summary: service.summary || '',
    };
  } catch (err: any) {
    return {
      success: false,
      error: 'internal_error',
      message: err?.message || 'Terjadi error saat mengambil deskripsi layanan.',
    };
  }
}

// --- Function-calling export (PASTIKAN type: 'function' as const) ---
export const getServiceDescriptionTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'getServiceDescription',
      description: 'Dapatkan deskripsi detail dan keunggulan layanan spesifik untuk pelanggan.',
      parameters: {
        type: 'object',
        properties: {
          service_name: { type: 'string', description: 'Nama layanan spesifik yang ingin dijelaskan.' },
        },
        required: ['service_name'],
      },
    },
  },
  implementation,
};
