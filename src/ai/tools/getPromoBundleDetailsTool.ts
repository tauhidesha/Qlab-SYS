'use server';

import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

// Kita tidak lagi mengimpor dari 'utils'

// --- Tipe dan Skema tidak berubah ---
type Motor = { 
  model: string; 
  // Tambahkan tipe lain jika ada di file JSON Anda, contoh:
  motor_db_size: 'S' | 'M' | 'L' | 'XL'; 
  repaint_size: 'S' | 'M' | 'L' | 'XL'; 
};

const InputSchema = z.object({
  motor_query: z.string().optional(),
});
type Input = z.infer<typeof InputSchema>;

type Result = {
  isPromoAvailable: boolean;
  promoDetails?: any;
  note: string;
};


export async function getPromoBundleDetails(input: Input): Promise<Result> {
  try {
    const { motor_query } = InputSchema.parse(input);

    // Pastikan path ini sudah benar menunjuk ke folder 'docs' Anda
    const promoJsonPath = path.join(process.cwd(), 'docs', 'promo_bundling.json');
    const promoFile = await fs.readFile(promoJsonPath, 'utf-8');
    const promoData = JSON.parse(promoFile);

    // Skenario 1: Handle jika tidak ada query atau query umum
    if (!motor_query || motor_query === 'N/A' || motor_query.toLowerCase().trim() === 'umum') {
      const result = {
        isPromoAvailable: true,
        promoDetails: promoData,
        note: `Saat ini ada promo bundling Repaint Bodi Halus + Full Detailing untuk semua ukuran.`
      };
      console.log("[TOOL LOG] Mengembalikan semua promo:", result);
      return result;
    }

    // Skenario 2: Mencari motor spesifik dengan logika yang sudah diperbaiki
    const motorsJsonPath = path.join(process.cwd(), 'docs', 'daftarUkuranMotor.json');
    const motorsFile = await fs.readFile(motorsJsonPath, 'utf-8');
    const allMotors: Motor[] = JSON.parse(motorsFile);
    
    // --- LOGIKA PENCARIAN MOTOR BARU (DITANAM LANGSUNG DI SINI) ---
    const cleanedQuery = motor_query.trim().toLowerCase();
    const motor = allMotors.find(m => m.model.toLowerCase() === cleanedQuery);
    // -----------------------------------------------------------------

    if (!motor) {
      const result = { isPromoAvailable: false, note: `Motor "${motor_query}" tidak ditemukan dalam daftar kami.` };
      console.log("[TOOL LOG] Motor tidak ditemukan:", result);
      return result;
    }

    // Menggunakan 'repaint_size' sesuai keputusan kita
    const repaintSize = motor.repaint_size;
    const specificPromo = promoData.find((p: any) => p.repaintSize === repaintSize);

    if (!specificPromo) {
      const result = {
        isPromoAvailable: false,
        note: `Maaf, untuk motor ${motor.model} (size ${repaintSize}) saat ini belum ada promo bundling.`
      };
      console.log("[TOOL LOG] Promo spesifik tidak ada:", result);
      return result;
    }

    const result = {
      isPromoAvailable: true,
      promoDetails: specificPromo,
      note: `Untuk motor ${motor.model} (size ${repaintSize}), ada promo bundling!`
    };
    console.log("[TOOL LOG] Sukses menemukan promo spesifik:", result);
    return result;

  } catch (err: any) {
    const result = { isPromoAvailable: false, note: `Error internal: ${err.message}` };
    console.error("[TOOL LOG] Terjadi error:", result);
    return result;
  }
}