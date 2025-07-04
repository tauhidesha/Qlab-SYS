// File: app/ai/tools/listServicesByCategoryTool.ts

'use server';

import { z } from 'zod';
// Impor data JSON secara langsung di atas
import servicesData from '../../../docs/deskripsi_layanan.json';

// Skema input untuk validasi
const InputSchema = z.object({
  category: z.enum(['coating', 'detailing', 'cuci', 'repaint']),
});
type Input = z.infer<typeof InputSchema>;

// Tipe data untuk output dan data internal
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

/**
 * Mengambil daftar layanan berdasarkan kategori dari data yang sudah diimpor.
 */
export async function listServicesByCategory(input: Input): Promise<{ services?: ServiceOutput[], error?: string }> {
  try {
    const { category } = InputSchema.parse(input);
    
    // Langsung gunakan data dari import, tidak perlu membaca file lagi
    const allServices: ServiceData[] = servicesData;

    const filteredServices = allServices
      .filter((service) => service.category === category && service.summary)
      .map((service) => ({
        name: service.name,
        summary: service.summary,
      }));

    if (filteredServices.length === 0) {
      return { error: `Tidak ada layanan dengan deskripsi ringkas (summary) untuk kategori '${category}'.` };
    }

    console.log(`[Tool] Menemukan ${filteredServices.length} layanan untuk kategori '${category}'.`);
    return { services: filteredServices };

  } catch (err: any) {
    console.error('[listServicesByCategory Tool] Error:', err);
    return { error: 'Terjadi kesalahan internal saat mengambil daftar layanan.' };
  }
}