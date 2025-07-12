// @file: src/ai/tools/listServicesByCategoryTool.ts

import { z } from 'zod'; // REVISI: Tambahkan import Zod
import type { SessionData } from '@/ai/utils/session';
import hargaLayanan from '@/data/hargaLayanan';

type Service = {
  name: string;
  category: string;
  price?: number;
  estimatedDuration?: string;
  variants?: { name: string; price: number }[];
};

// REVISI: Tambahkan skema Zod untuk validasi input yang kuat
const InputSchema = z.object({
  category: z.string().describe('Kategori layanan: "coating", "detailing", "repaint", atau "cuci".'),
});
type Input = z.infer<typeof InputSchema>;

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

// REVISI: Ubah signature untuk menerima input yang sudah divalidasi
async function implementation(input: Input): Promise<Output> {
  // REVISI: Hapus impor dan panggilan lama ke normalizeToolInput
  // Validasi sekarang ditangani oleh Zod sebelum fungsi ini dipanggil
  const { category } = InputSchema.parse(input);
  const categoryQuery = category.trim().toLowerCase();

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
    // REVISI: Perbaiki format durasi agar lebih akurat
    estimatedDuration: s.estimatedDuration
      ? `${s.estimatedDuration} menit`
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