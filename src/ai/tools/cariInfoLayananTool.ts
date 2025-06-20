'use server';
/**
 * @fileOverview Genkit tool for searching services by keyword.
 *
 * - cariInfoLayananTool - The Genkit tool definition.
 * - CariInfoLayananInput - Zod type for the tool's input.
 * - CariInfoLayananOutput - Zod type for the tool's output.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, getDocs } from 'firebase/firestore';
import type { ProductServiceInfo } from '@/types/aiToolSchemas';
import { ProductServiceInfoSchema } from '@/types/aiToolSchemas';

// Schemas are NOT exported from here
const CariInfoLayananInputSchema = z.object({
  keyword: z.string().min(1, "Kata kunci pencarian tidak boleh kosong.").describe('Kata kunci untuk mencari layanan, mis. "cuci", "coating", "detailing".'),
});
export type CariInfoLayananInput = z.infer<typeof CariInfoLayananInputSchema>;

const CariInfoLayananOutputSchema = z.array(ProductServiceInfoSchema).describe("Daftar layanan yang cocok dengan kata kunci, bisa kosong.");
export type CariInfoLayananOutput = z.infer<typeof CariInfoLayananOutputSchema>;

async function findLayananByKeyword(input: CariInfoLayananInput): Promise<CariInfoLayananOutput> {
  const { keyword } = input;
  const keywordLower = keyword.toLowerCase().trim();
  console.log(`[findLayananByKeyword] Mencari layanan dengan keyword: "${keywordLower}"`);

  if (!db) {
    console.error("[findLayananByKeyword] Firestore DB (db) is not initialized.");
    return [];
  }

  const matchingServices: ProductServiceInfo[] = [];
  try {
    const servicesCollectionRef = collection(db, 'services');
    const q = firestoreQuery(servicesCollectionRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnap) => {
      const serviceData = docSnap.data();
      const serviceNameLower = serviceData.name?.toLowerCase();
      const serviceCategoryLower = serviceData.category?.toLowerCase();
      const serviceDescriptionLower = serviceData.description?.toLowerCase();

      if ( (serviceNameLower && serviceNameLower.includes(keywordLower)) ||
           (serviceCategoryLower && serviceCategoryLower.includes(keywordLower)) ||
           (serviceDescriptionLower && serviceDescriptionLower.includes(keywordLower))
         ) {
        const serviceItem: ProductServiceInfo = {
          id: docSnap.id,
          name: serviceData.name,
          type: serviceData.type as 'Layanan' | 'Produk',
          category: serviceData.category,
          price: serviceData.price,
          description: serviceData.description || undefined,
          pointsAwarded: serviceData.pointsAwarded || undefined,
          estimatedDuration: serviceData.estimatedDuration || undefined,
          variants: serviceData.variants?.map((v: any) => ({
            name: v.name,
            price: v.price,
            pointsAwarded: v.pointsAwarded,
            estimatedDuration: v.estimatedDuration,
          })) || undefined,
        };
        
        const validationResult = ProductServiceInfoSchema.safeParse(serviceItem);
        if (validationResult.success) {
          matchingServices.push(validationResult.data);
        } else {
          console.warn(`[findLayananByKeyword] Data layanan ${docSnap.id} tidak valid:`, validationResult.error.format());
        }
      }
    });
    return matchingServices;
  } catch (error) {
    console.error("[findLayananByKeyword] Error saat mencari layanan:", error);
    return [];
  }
}

export const cariInfoLayananTool = ai.defineTool(
  {
    name: 'cariInfoLayanan',
    description: 'Mencari daftar layanan atau produk yang tersedia berdasarkan kata kunci. Berguna jika pelanggan bertanya layanan apa saja yang ada atau menyebutkan jenis layanan secara umum.',
    inputSchema: CariInfoLayananInputSchema,
    outputSchema: CariInfoLayananOutputSchema,
  },
  findLayananByKeyword
);
