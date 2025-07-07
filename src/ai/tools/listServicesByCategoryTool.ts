// File: app/ai/tools/listServicesByCategoryTool.ts

'use server';

import { z } from 'zod';
import servicesData from '../../../docs/deskripsi_layanan.json';

// Skema input
const InputSchema = z.object({
  category: z.enum(['coating', 'detailing', 'cuci', 'repaint']),
});
type Input = z.infer<typeof InputSchema>;

// Tipe internal & output
type ServiceOutput = {
  name: string;
  summary: string;
};

type ServiceData = {
  name: string;
  category: string;
  summary: string;
  [key: string]: any;
};

type Result = {
  success: boolean;
  services?: ServiceOutput[];
  summary?: string;
  error?: string;
};

export async function listServicesByCategory(input: Input): Promise<Result> {
  try {
    const { category } = InputSchema.parse(input);
    const allServices: ServiceData[] = servicesData;

    const filteredServices = allServices
      .filter((service) => service.category === category && service.summary)
      .map((service) => ({
        name: service.name,
        summary: service.summary,
      }));

    if (filteredServices.length === 0) {
      return {
        success: false,
        error: `Tidak ada layanan dengan deskripsi ringkas (summary) untuk kategori '${category}'.`
      };
    }

    const summaryText = `Berikut daftar layanan untuk kategori *${category}*:\n` +
      filteredServices.map(s => `- ${s.name}`).join('\n');

    console.log(`[Tool] Menemukan ${filteredServices.length} layanan untuk kategori '${category}'.`);

    return {
      success: true,
      services: filteredServices,
      summary: summaryText
    };

  } catch (err: any) {
    console.error('[listServicesByCategory Tool] Error:', err);
    return {
      success: false,
      error: 'Terjadi kesalahan internal saat mengambil daftar layanan.'
    };
  }
}
