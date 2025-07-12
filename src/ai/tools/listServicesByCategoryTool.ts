// @file: src/ai/tools/listServicesByCategoryTool.ts

import type { SessionData } from '@/ai/utils/session';
import hargaLayanan from '@/data/hargaLayanan';

type Service = {
  name: string;
  category: string;
  price?: number;
  estimatedDuration?: string;
  variants?: { name: string; price: number }[];
};

type Input = {
  category: string;
};

type Output =
  | {
      success: true;
      category: string;
      services: {
        name: string;
        variants: string[];
        estimatedDuration?: string;
      }[];
      message: string;
    }
  | {
      success: false;
      message: string;
    };

async function implementation(
  rawInput: any,
  session?: SessionData
): Promise<Output> {
  // Ambil category dengan helper universal agar AI agent/function calling selalu konsisten
  // @ts-ignore
  const { normalizeToolInput } = await import('@/ai/utils/runToolCalls');
  const categoryQuery = normalizeToolInput(rawInput, 'category')?.trim().toLowerCase();

  if (!categoryQuery) {
    return {
      success: false,
      message: 'Kategori layanan tidak boleh kosong.',
    };
  }

  const matchedServices = (hargaLayanan as Service[]).filter(
    (s) => s.category.toLowerCase() === categoryQuery
  );

  if (matchedServices.length === 0) {
    return {
      success: false,
      message: `Tidak ditemukan layanan dengan kategori "${categoryQuery}".`,
    };
  }

  const summaries = matchedServices.map((s) => ({
    name: s.name,
    variants: s.variants?.map(
      (v) => `${v.name}: Rp${v.price.toLocaleString('id-ID')}`
    ) ?? [],
    estimatedDuration: s.estimatedDuration
      ? `${parseInt(s.estimatedDuration, 10) / 60} menit`
      : undefined,
  }));

  return {
    success: true,
    category: categoryQuery,
    services: summaries,
    message: `Ditemukan ${summaries.length} layanan untuk kategori "${categoryQuery}".`,
  };
}

export const listServicesByCategoryTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'listServicesByCategory',
      description:
        'Menampilkan daftar layanan berdasarkan kategori seperti coating, detailing, atau repaint.',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description:
              'Kategori layanan: "coating", "detailing", "repaint", atau "cuci".',
          },
        },
        required: ['category'],
      },
    },
  },
  implementation,
};
