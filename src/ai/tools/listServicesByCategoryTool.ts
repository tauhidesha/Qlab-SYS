// File: app/ai/tools/listServicesByCategoryTool.ts (atau apapun nama file tool lo)
// Ganti seluruh isi file dengan kode di bawah ini.

'use server';

import { z } from 'zod';
import { promises as fs } from 'fs'; // Gunakan 'fs/promises' untuk I/O asinkron
import path from 'path';

// Skema input sudah benar
const InputSchema = z.object({
  category: z.enum(['coating', 'detailing', 'cuci', 'repaint']),
});
type Input = z.infer<typeof InputSchema>;

// Tipe data untuk output
type ServiceOutput = {
  name: string;
  summary: string;
};

/**
 * Mengambil daftar layanan berdasarkan kategori dari file deskripsi_layanan.json
 * @param input - Objek berisi 'category' yang sudah divalidasi Zod.
 * @returns Objek promise berisi daftar layanan atau pesan error.
 */
export async function listServicesByCategory(input: Input): Promise<{ services?: ServiceOutput[], error?: string }> {
  try {
    const { category } = InputSchema.parse(input);
    
    // --- FIX UTAMA ADA DI SINI ---
    // Nama file disesuaikan dengan file asli yang lo punya.
    const servicesJsonPath = path.join(process.cwd(), 'docs', 'deskripsi_layanan.json');

    // BEST PRACTICE: Gunakan fs.promises.readFile agar non-blocking di server
    const fileContent = await fs.readFile(servicesJsonPath, 'utf-8');
    const servicesData = JSON.parse(fileContent);

    // Logika filter dan map sudah benar.
    // Pastikan kita mengambil 'name' dan 'summary' dengan benar.
    const filteredServices = servicesData
      .filter((service: any) => service.category === category && service.summary) // Filter yang punya summary
      .map((service: any) => ({
        name: service.name,
        summary: service.summary, // Ambil field 'summary' dari JSON
      }));

    if (filteredServices.length === 0) {
      // Pesan error ini lebih deskriptif, memberitahu bahwa layanan ada tapi mungkin tidak punya 'summary'
      return { error: `Tidak ada layanan dengan deskripsi ringkas (summary) untuk kategori '${category}'.` };
    }

    console.log(`[Tool] Menemukan ${filteredServices.length} layanan untuk kategori '${category}'.`);
    return { services: filteredServices };

  } catch (err: any) {
    // Memberi detail error yang lebih baik saat development
    if (err.code === 'ENOENT') {
        console.error('[Tool Error] File tidak ditemukan di path:', path.join(process.cwd(), 'docs', 'deskripsi_layanan.json'));
        return { error: 'Gagal menemukan file data layanan.' };
    }
    console.error('[listServicesByCategory Tool] Error:', err);
    return { error: 'Terjadi kesalahan internal saat mengambil daftar layanan.' };
  }
}