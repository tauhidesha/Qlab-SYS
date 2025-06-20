
'use server';
/**
 * @fileOverview Genkit tool for searching services by keyword.
 * Tool ini SEMENTARA dibuat sangat sederhana atau dikosongkan.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Skema input (jika diperlukan)
const SearchServiceInputSchema = z.object({
  keyword: z.string().describe("Kata kunci untuk mencari layanan, mis. 'cuci', 'coating'." ) ,
  size: z.enum(['S', 'M', 'L', 'XL']).optional().describe("Ukuran motor (S, M, L, XL) jika spesifik."),
  paintType: z.enum(['doff', 'glossy']).optional().describe("Jenis cat motor (doff atau glossy)."),
});
export type SearchServiceInput = z.infer<typeof SearchServiceInputSchema>;

// Skema output (jika diperlukan)
const SearchServiceOutputSchema = z.object({
  name: z.string().optional().describe("Nama layanan yang ditemukan."),
  price: z.number().optional().describe("Harga layanan."),
  duration: z.string().optional().describe("Estimasi durasi."),
  message: z.string().describe("Pesan hasil pencarian."),
});
export type SearchServiceOutput = z.infer<typeof SearchServiceOutputSchema>;

// Implementasi tool sederhana (atau kosong)
// export const searchServiceByKeywordTool = ai.defineTool(
//   {
//     name: 'searchServiceByKeywordTool',
//     description: 'Cari layanan berdasarkan keyword. (Versi Sederhana)',
//     inputSchema: SearchServiceInputSchema,
//     outputSchema: SearchServiceOutputSchema,
//   },
//   async (input: SearchServiceInput): Promise<SearchServiceOutput> => {
//     console.log(`[searchServiceByKeywordTool - Simple] Input: keyword=${input.keyword}, size=${input.size}, paint=${input.paintType}`);
//     // Logika dummy
//     if (input.keyword.toLowerCase().includes("coating")) {
//       return { name: "Coating Nano Ceramic", price: 500000, duration: "3 jam", message: "Coating Nano Ceramic ditemukan." };
//     }
//     return { message: "Layanan tidak ditemukan untuk kata kunci tersebut (versi simple)." };
//   }
// );

console.log("[searchServiceByKeywordTool.ts] Tool is currently a placeholder and not actively exported.");
