// File: app/ai/tools/getServiceDescriptionTool.ts

'use server';

import { z } from 'zod';
// --- PERBAIKAN 1: Impor JSON langsung di sini ---
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

export async function getServiceDescription(input: Input): Promise<{ description?: string, error?: string }> {
  try {
    const { service_name } = InputSchema.parse(input);

    // --- PERBAIKAN 2: Langsung gunakan data dari import ---
    const allDescriptions: ServiceDescription[] = allDescriptionsData;

    // Gunakan .find() untuk mencari layanan. Pencocokan toLowerCase() sudah bagus.
    const service = allDescriptions.find(s => s.name.toLowerCase().includes(service_name.toLowerCase()));

    if (!service) {
      return { error: `Tidak ditemukan penjelasan untuk layanan "${service_name}".` };
    }

    // Gabungkan summary dan description untuk jawaban yang lengkap
    const fullDescription = `${service.summary}\n\n${service.description}`;

    return { description: fullDescription };

  } catch (err: any) {
    console.error('[getServiceDescription Tool] Error:', err);
    return { error: 'Gagal mengambil deskripsi layanan.' };
  }
}