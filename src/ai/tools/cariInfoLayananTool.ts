'use server';
/**
 * @fileOverview Genkit tool for searching services by keyword.
 *
 * - cariInfoLayananTool - The Genkit tool definition.
 * - CariInfoLayananInputSchema - Zod schema for the tool's input.
 * - CariInfoLayananOutputSchema - Zod schema for the tool's output (array of ProductServiceInfoSchema).
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, getDocs } from 'firebase/firestore';
import type { ProductServiceInfo } from '@/types/aiToolSchemas'; // Menggunakan tipe yang sudah ada
import { ProductServiceInfoSchema } from '@/types/aiToolSchemas'; // Menggunakan skema yang sudah ada

// Skema input untuk tool
export const CariInfoLayananInputSchema = z.object({
  keyword: z.string().min(1, "Kata kunci pencarian tidak boleh kosong.").describe('Kata kunci untuk mencari layanan, mis. "cuci", "coating", "detailing".'),
});
export type CariInfoLayananInput = z.infer<typeof CariInfoLayananInputSchema>;

// Skema output tool (array dari ProductServiceInfoSchema)
export const CariInfoLayananOutputSchema = z.array(ProductServiceInfoSchema).describe("Daftar layanan yang cocok dengan kata kunci, bisa kosong.");
export type CariInfoLayananOutput = z.infer<typeof CariInfoLayananOutputSchema>;

// Fungsi implementasi tool
async function findLayananByKeyword(input: CariInfoLayananInput): Promise<CariInfoLayananOutput> {
  const { keyword } = input;
  const keywordLower = keyword.toLowerCase().trim();
  console.log(`[cariInfoLayananTool.fn] Mencari layanan dengan keyword: "${keywordLower}"`);

  if (!db) {
    console.error("[cariInfoLayananTool.fn] Firestore DB (db) is not initialized.");
    return []; // Kembalikan array kosong jika DB tidak ada
  }

  const matchingServices: ProductServiceInfo[] = [];

  try {
    const servicesCollectionRef = collection(db, 'services');
    const q = firestoreQuery(servicesCollectionRef); // Ambil semua layanan
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const serviceData = doc.data();
      const serviceNameLower = serviceData.name?.toLowerCase();

      if (serviceNameLower && serviceNameLower.includes(keywordLower)) {
        // Pastikan data sesuai dengan ProductServiceInfoSchema sebelum ditambahkan
        // Ini hanya contoh validasi dasar, idealnya Zod parse
        const serviceItem: ProductServiceInfo = {
          id: doc.id,
          name: serviceData.name,
          type: serviceData.type as 'Layanan' | 'Produk', // Pastikan tipe ini sesuai
          category: serviceData.category,
          price: serviceData.price,
          description: serviceData.description || undefined,
          pointsAwarded: serviceData.pointsAwarded || undefined,
          estimatedDuration: serviceData.estimatedDuration || undefined,
          variants: serviceData.variants?.map((v: any) => ({ // Map varian jika ada
            name: v.name,
            price: v.price,
            pointsAwarded: v.pointsAwarded,
            estimatedDuration: v.estimatedDuration,
            // id untuk varian tidak ada di ProductVariantInfoSchema kita saat ini, jadi diabaikan
          })) || undefined,
        };
        
        // Validasi dengan Zod (opsional tapi baik)
        const validationResult = ProductServiceInfoSchema.safeParse(serviceItem);
        if (validationResult.success) {
          matchingServices.push(validationResult.data);
        } else {
          console.warn(`[cariInfoLayananTool.fn] Data layanan ${doc.id} tidak valid:`, validationResult.error.format());
        }
      }
    });

    console.log(`[cariInfoLayananTool.fn] Ditemukan ${matchingServices.length} layanan yang cocok dengan keyword "${keywordLower}".`);
    return matchingServices;

  } catch (error) {
    console.error("[cariInfoLayananTool.fn] Error saat mencari layanan:", error);
    return []; // Kembalikan array kosong jika ada error
  }
}

// Definisi tool Genkit
export const cariInfoLayananTool = ai.defineTool(
  {
    name: 'cariInfoLayanan',
    description: 'Mencari daftar layanan yang tersedia berdasarkan kata kunci. Berguna jika pelanggan bertanya layanan apa saja yang ada atau menyebutkan jenis layanan secara umum.',
    inputSchema: CariInfoLayananInputSchema,
    outputSchema: CariInfoLayananOutputSchema,
  },
  findLayananByKeyword
);
