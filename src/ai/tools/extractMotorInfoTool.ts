
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
    if (!adminDb) {
      console.error("[extractMotorInfoTool] FATAL: adminDb is not available. Firebase Admin init failed or import order issue.");
      throw new Error("Layanan database untuk informasi motor tidak tersedia saat ini.");
    }

    const cleanText = input.text.toLowerCase().trim();
    console.log(`[extractMotorInfoTool] Input text: "${input.text}", Cleaned text: "${cleanText}"`);

    if (!cleanText) {
      console.log('[extractMotorInfoTool] Input text is empty. Throwing error.');
      throw new Error('Teks input kosong, tidak bisa mendeteksi motor.');
    }

    try {
      const vehicleTypesSnapshot = await adminDb.collection('vehicleTypes').get();
      console.log(`[extractMotorInfoTool] Raw snapshot size from 'vehicleTypes': ${vehicleTypesSnapshot.size}`);

      if (vehicleTypesSnapshot.empty) {
        console.log('[extractMotorInfoTool] Collection "vehicleTypes" is empty or does not exist in Firestore.');
        throw new Error('Database tipe kendaraan kosong atau tidak ditemukan.');
      }

      const mappedVehicleTypes = vehicleTypesSnapshot.docs.map(doc => {
        const data = doc.data();
        const validationErrorMessages: string[] = [];

        if (!data.brand || typeof data.brand !== 'string') {
            validationErrorMessages.push('field "brand" is missing or not a string');
        }
        if (!data.model || typeof data.model !== 'string') {
            validationErrorMessages.push('field "model" is missing or not a string');
        }
        if (!data.size || typeof data.size !== 'string' || !['S', 'M', 'L', 'XL'].includes(data.size)) {
            validationErrorMessages.push('field "size" is missing, not a string, or not S/M/L/XL');
        }
        if (!data.aliases || !Array.isArray(data.aliases)) {
            validationErrorMessages.push('field "aliases" is missing or not an array');
        } else if (!data.aliases.every((a: any) => typeof a === 'string')) {
            validationErrorMessages.push('field "aliases" contains non-string elements');
        }

        if (validationErrorMessages.length > 0) {
            console.warn(`[extractMotorInfoTool] Dokumen ${doc.id} di 'vehicleTypes' GAGAL VALIDASI. Alasan: ${validationErrorMessages.join('; ')}. Data mentah: ${JSON.stringify(data)}. Dokumen ini akan dilewati.`);
            return null; 
        }
        
        return {
          id: doc.id,
          brand: data.brand as string,
          model: data.model as string,
          size: data.size as 'S' | 'M' | 'L' | 'XL',
          aliases: (data.aliases as string[]).map(alias => alias.toLowerCase()),
        };
      });
      
      console.log(`[extractMotorInfoTool] Mapped vehicle types (before filtering nulls): ${mappedVehicleTypes.length}`);
      const allVehicleTypes = mappedVehicleTypes.filter(item => item !== null) as { id: string; brand: string; model: string; size: 'S' | 'M' | 'L' | 'XL'; aliases: string[]; }[];
      
      console.log(`[extractMotorInfoTool] Total valid vehicle types after filtering: ${allVehicleTypes.length}.`);

      if (allVehicleTypes.length === 0) {
        console.log('[extractMotorInfoTool] No valid vehicle types found after filtering. Check Firestore data format and console warnings above for details on invalid documents.');
        throw new Error('Tidak ada data tipe kendaraan yang valid di database. Periksa format data di Firestore dan log peringatan di konsol.');
      }

      for (const vehicleType of allVehicleTypes) {
        // console.log(`[extractMotorInfoTool] Checking vehicle: ${vehicleType.brand} ${vehicleType.model}, Aliases: ${vehicleType.aliases.join(', ')}`);
        for (const alias of vehicleType.aliases) {
          if (cleanText.includes(alias)) {
            console.log(`[extractMotorInfoTool] !!! MATCH FOUND !!! Alias "${alias}" (from vehicle: ${vehicleType.brand} ${vehicleType.model}) found in cleaned text: "${cleanText}"`);
            return {
              brand: vehicleType.brand,
              model: vehicleType.model,
              size: vehicleType.size,
            };
          }
        }
      }

      console.log('[extractMotorInfoTool] No match found for the input text after checking all vehicle types and aliases.');
      throw new Error('Motor tidak dikenali dari teks yang diberikan. Pastikan alias di database mencakup variasi nama motor tersebut.');

    } catch (error: any) {
      console.error('[extractMotorInfoTool] Error during execution:', error);
      if (error instanceof Error) {
        throw new Error(`Kesalahan pada tool extractMotorInfo: ${error.message}`);
      }
      throw new Error(`Terjadi kesalahan internal pada tool extractMotorInfo: ${String(error)}`);
    }
  }
);
