'use server';
/**
 * @fileOverview Genkit tool for extracting motorcycle information from text.
 * - extractMotorInfoTool - The Genkit tool definition.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { adminDb } from '@/lib/firebase-admin'; // Pastikan file ini ada dan terkonfigurasi

// Skema input untuk tool
const ExtractMotorInfoInputSchema = z.object({
  text: z.string().describe('Teks dari pengguna yang mungkin berisi nama atau deskripsi motor.'),
});
export type ExtractMotorInfoInput = z.infer<typeof ExtractMotorInfoInputSchema>;

// Skema output untuk tool
const ExtractMotorInfoOutputSchema = z.object({
  brand: z.string().describe('Merek motor yang terdeteksi.'),
  model: z.string().describe('Model motor yang terdeteksi.'),
  size: z.enum(['S', 'M', 'L', 'XL']).describe('Ukuran motor yang terdeteksi (S, M, L, XL).'),
});
export type ExtractMotorInfoOutput = z.infer<typeof ExtractMotorInfoOutputSchema>;

// Definisi tool Genkit
export const extractMotorInfoTool = ai.defineTool(
  {
    name: 'extractMotorInfoTool', // Nama tool di Genkit, bisa beda dari nama variabel
    description: 'Mendeteksi merek, model, dan ukuran motor dari teks deskriptif pengguna dengan mencocokkan ke database tipe kendaraan.',
    inputSchema: ExtractMotorInfoInputSchema,
    outputSchema: ExtractMotorInfoOutputSchema,
  },
  async (input: ExtractMotorInfoInput): Promise<ExtractMotorInfoOutput> => {
    const cleanText = input.text.toLowerCase().trim();
    console.log(`[extractMotorInfoTool] Input text: "${input.text}", Cleaned text: "${cleanText}"`);

    if (!cleanText) {
      console.log('[extractMotorInfoTool] Input text is empty. Throwing error.');
      throw new Error('Teks input kosong, tidak bisa mendeteksi motor.');
    }

    try {
      const vehicleTypesSnapshot = await adminDb.collection('vehicleTypes').get();
      
      if (vehicleTypesSnapshot.empty) {
        console.log('[extractMotorInfoTool] Collection "vehicleTypes" is empty or does not exist.');
        throw new Error('Database tipe kendaraan kosong atau tidak ditemukan.');
      }

      const allVehicleTypes = vehicleTypesSnapshot.docs.map(doc => {
        const data = doc.data();
        // Validasi dasar struktur data dari Firestore
        if (!data.brand || !data.model || !data.size || !Array.isArray(data.aliases)) {
            console.warn(`[extractMotorInfoTool] Dokumen ${doc.id} memiliki format tidak lengkap/valid.`);
            return null; 
        }
        return {
          id: doc.id, // Sertakan ID untuk debugging jika perlu
          brand: data.brand as string,
          model: data.model as string,
          size: data.size as 'S' | 'M' | 'L' | 'XL',
          aliases: (data.aliases as string[]).map(alias => alias.toLowerCase()), // Pastikan alias juga lowercase
        };
      }).filter(item => item !== null) as { id: string; brand: string; model: string; size: 'S' | 'M' | 'L' | 'XL'; aliases: string[]; }[];

      console.log(`[extractMotorInfoTool] Fetched ${allVehicleTypes.length} vehicle types from Firestore.`);

      for (const vehicleType of allVehicleTypes) {
        // console.log(`[extractMotorInfoTool] Checking vehicle: ${vehicleType.brand} ${vehicleType.model}, Aliases: ${vehicleType.aliases.join(', ')}`);
        for (const alias of vehicleType.aliases) {
          if (cleanText.includes(alias)) {
            console.log(`[extractMotorInfoTool] MATCH FOUND! Alias "${alias}" in "${cleanText}". Returning: ${vehicleType.brand} ${vehicleType.model} (${vehicleType.size})`);
            return {
              brand: vehicleType.brand,
              model: vehicleType.model,
              size: vehicleType.size,
            };
          }
        }
      }

      console.log('[extractMotorInfoTool] No match found for the input text.');
      throw new Error('Motor tidak dikenali dari teks yang diberikan. Coba minta pelanggan menyebutkan modelnya lebih jelas.');

    } catch (error: any) {
      console.error('[extractMotorInfoTool] Error during execution:', error);
      // Lempar ulang error agar bisa ditangani oleh Genkit atau flow pemanggil
      if (error instanceof Error) {
        throw error; // Lempar ulang error yang sudah Error instance
      }
      throw new Error(`Terjadi kesalahan internal pada tool extractMotorInfo: ${error.message || String(error)}`);
    }
  }
);

// Anda juga bisa mengekspor tool-nya jika ingin menggunakannya di tempat lain secara langsung
// export { extractMotorInfoTool };
