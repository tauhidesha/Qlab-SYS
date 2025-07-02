// File: app/ai/tools/getServiceDescriptionTool.ts
// BUAT ATAU GANTI ISI FILE INI DENGAN KODE DI BAWAH

'use server';

import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

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

    const descJsonPath = path.join(process.cwd(), 'docs', 'deskripsi_layanan.json');
    const fileContent = await fs.readFile(descJsonPath, 'utf-8');
    const allDescriptions: ServiceDescription[] = JSON.parse(fileContent);

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