
'use server';
/**
 * @fileOverview Genkit tool for extracting motorcycle information from text.
 * Tool ini SEMENTARA dibuat sangat sederhana atau dikosongkan untuk mengurangi kompleksitas awal.
 * Implementasi lengkap akan bergantung pada kebutuhan flow utama.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Skema input untuk tool (jika diperlukan)
const ExtractMotorInfoInputSchema = z.object({
  text: z.string().describe('Teks dari pengguna yang mungkin berisi nama atau deskripsi motor.'),
});
export type ExtractMotorInfoInput = z.infer<typeof ExtractMotorInfoInputSchema>;

// Skema output untuk tool (jika diperlukan)
const ExtractMotorInfoOutputSchema = z.object({
  brand: z.string().optional().describe('Merek motor yang terdeteksi.'),
  model: z.string().optional().describe('Model motor yang terdeteksi.'),
  size: z.enum(['S', 'M', 'L', 'XL']).optional().describe('Ukuran motor yang terdeteksi (S, M, L, XL).'),
  message: z.string().describe('Pesan hasil deteksi atau jika tidak ditemukan.'),
});
export type ExtractMotorInfoOutput = z.infer<typeof ExtractMotorInfoOutputSchema>;

// Implementasi tool sederhana (atau kosong)
// export const extractMotorInfoTool = ai.defineTool(
//   {
//     name: 'extractMotorInfoTool',
//     description: 'Mendeteksi merek, model, dan ukuran motor dari teks. (Versi Sederhana)',
//     inputSchema: ExtractMotorInfoInputSchema,
//     outputSchema: ExtractMotorInfoOutputSchema,
//   },
//   async (input: ExtractMotorInfoInput): Promise<ExtractMotorInfoOutput> => {
//     console.log(`[extractMotorInfoTool - Simple] Input: ${input.text}`);
//     // Logika dummy
//     if (input.text.toLowerCase().includes("nmax")) {
//       return {
//         brand: "Yamaha",
//         model: "NMAX",
//         size: "M",
//         message: "Terdeteksi Yamaha NMAX (Ukuran M)."
//       };
//     }
//     return { message: "Motor tidak terdeteksi dari teks yang diberikan (versi simple)." };
//   }
// );

// Untuk saat ini, kita tidak export tool ini agar tidak terdaftar otomatis jika belum siap.
// Jika ingin diaktifkan, hapus komentar di atas dan pastikan diimport di src/ai/dev.ts
// dan di-pass ke flow yang menggunakannya.
console.log("[extractMotorInfoTool.ts] Tool is currently a placeholder and not actively exported.");
