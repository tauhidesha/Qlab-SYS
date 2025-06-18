'use server';
/**
 * @fileOverview Genkit tool for extracting motorcycle information from text.
 * - extractMotorInfoTool - The Genkit tool definition.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const ExtractMotorInfoInputSchema = z.object({
  text: z.string().describe("Teks deskriptif dari pelanggan yang menyebutkan jenis motor, mis. 'motor saya vario 150' atau 'nmax connected'."),
});

const ExtractMotorInfoOutputSchema = z.object({
  brand: z.string().describe("Merek motor yang terdeteksi, mis. 'Honda', 'Yamaha'."),
  model: z.string().describe("Model motor yang terdeteksi, mis. 'Vario 150', 'NMAX Connected'."),
  size: z.enum(['S', 'M', 'L', 'XL']).describe("Ukuran motor yang terdeteksi berdasarkan modelnya."),
});
export type ExtractMotorInfoOutput = z.infer<typeof ExtractMotorInfoOutputSchema>;

interface VehicleTypeDoc {
  brand: string;
  model: string;
  size: 'S' | 'M' | 'L' | 'XL';
  aliases: string[];
}

export const extractMotorInfoTool = ai.defineTool(
  {
    name: 'extractMotorInfo',
    description: 'Mendeteksi dan mengekstrak informasi merek, model, dan ukuran motor dari teks deskriptif pelanggan dengan membandingkannya terhadap database alias jenis kendaraan. Hanya panggil jika pelanggan menyebutkan jenis motornya secara spesifik.',
    inputSchema: ExtractMotorInfoInputSchema,
    outputSchema: ExtractMotorInfoOutputSchema,
  },
  async ({ text }) => {
    const cleanText = text.toLowerCase().trim();
    if (!cleanText) {
      console.warn('[extractMotorInfoTool] Input teks kosong.');
      throw new Error('Teks input untuk deteksi motor kosong.');
    }

    console.log(`[extractMotorInfoTool] Menerima teks: "${text}", teks bersih: "${cleanText}"`);

    try {
      const vehicleTypesRef = collection(db, 'vehicleTypes');
      const snapshot = await getDocs(vehicleTypesRef);

      if (snapshot.empty) {
        console.warn('[extractMotorInfoTool] Koleksi "vehicleTypes" kosong atau tidak ditemukan di Firestore.');
        throw new Error('Database jenis kendaraan tidak tersedia saat ini.');
      }

      const allVehicleTypes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VehicleTypeDoc & {id: string}));
      console.log(`[extractMotorInfoTool] Mengambil ${allVehicleTypes.length} tipe kendaraan dari Firestore.`);

      for (const item of allVehicleTypes) {
        if (item.aliases && Array.isArray(item.aliases)) {
          for (const alias of item.aliases) {
            const cleanAlias = alias.toLowerCase().trim();
            if (cleanAlias && cleanText.includes(cleanAlias)) {
              console.log(`[extractMotorInfoTool] Cocok! Alias: "${cleanAlias}" dalam teks: "${cleanText}". Mengembalikan: Brand=${item.brand}, Model=${item.model}, Size=${item.size}`);
              return {
                brand: item.brand,
                model: item.model,
                size: item.size,
              };
            }
          }
        }
      }

      console.log(`[extractMotorInfoTool] Tidak ada kecocokan untuk teks: "${cleanText}" dalam alias kendaraan manapun.`);
      throw new Error('Motor tidak dikenali dari teks yang diberikan. Coba minta pelanggan menyebutkan modelnya lebih jelas.');
    } catch (error: any) {
      console.error('[extractMotorInfoTool] Error saat eksekusi:', error);
      if (error.message.startsWith('Motor tidak dikenali') || error.message.startsWith('Database jenis kendaraan tidak tersedia') || error.message.startsWith('Teks input untuk deteksi motor kosong')) {
        throw error; // Lempar ulang error yang sudah diketahui
      }
      throw new Error('Gagal memproses informasi motor: Terjadi kesalahan internal pada tool.');
    }
  }
);
