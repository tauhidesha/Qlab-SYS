// File: src/ai/tools/listServicesByCategoryTool.ts

import { z } from 'zod';
import servicesData from '../../../docs/deskripsi_layanan.json';

const InputSchema = z.object({
  category: z.enum(['coating', 'detailing', 'cuci', 'repaint']).describe('Kategori layanan (coating, detailing, cuci, repaint)'),
});
type Input = z.infer<typeof InputSchema>;

type ServiceOutput = { name: string; summary: string; };
type Result = {
  success: boolean;
  services?: ServiceOutput[];
  summary?: string;
  error?: string;
};

async function implementation(input: Input): Promise<Result> {
  try {
    const { category } = InputSchema.parse(input);
    const allServices: any[] = servicesData;
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
    return {
      success: true,
      services: filteredServices,
      summary: summaryText
    };
  } catch (err: any) {
    return {
      success: false,
      error: 'Terjadi kesalahan internal saat mengambil daftar layanan.'
    };
  }
}

export const listServicesByCategoryTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: "listServicesByCategory",
      description: "Tampilkan daftar layanan berdasarkan kategori (coating, detailing, cuci, repaint).",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: ["coating", "detailing", "cuci", "repaint"],
            description: "Kategori layanan yang ingin ditampilkan.",
          },
        },
        required: ["category"],
      },
    },
  },
  implementation,
};
