// File: app/ai/tools/getServiceDescriptionTool.ts

'use server';

import { z } from 'zod';
import allDescriptionsData from '../../../docs/deskripsi_layanan.json';

const InputSchema = z.object({
  service_name: z.string(),
});
type Input = z.infer<typeof InputSchema>;

type ServiceDescription = {
  name: string;
  summary: string;
  description: string;
};

type Result = {
  success: boolean;
  service_name?: string;
  summary?: string;
  description?: string;
  error?: string;
  message?: string;
};

export async function getServiceDescription(input: Input): Promise<Result> {
  try {
    const { service_name } = InputSchema.parse(input);
    const allDescriptions: ServiceDescription[] = allDescriptionsData;

    const service = allDescriptions.find(s => s.name.toLowerCase().includes(service_name.toLowerCase()));

    if (!service) {
      return {
        success: false,
        error: 'not_found',
        message: `Deskripsi untuk layanan "${service_name}" tidak ditemukan.`,
      };
    }

    return {
      success: true,
      service_name: service.name,
      summary: service.summary,
      description: service.description,
    };

  } catch (err: any) {
    console.error('[getServiceDescription Tool] Error:', err);
    return {
      success: false,
      error: 'generic_error',
      message: 'Gagal mengambil deskripsi layanan.',
    };
  }
}
