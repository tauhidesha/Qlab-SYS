
/**
 * @fileOverview Genkit tool for searching services by category.
 * This tool is intended to be used by sub-flows or specialized flows.
 *
 * - cariInfoLayananTool - The Genkit tool definition.
 * - CariInfoLayananInput - Zod type for the tool's input.
 * - CariInfoLayananOutput - Zod type for the tool's output.
 */

import { ai } from '@/ai/genkit'; // Harus dari @/ai/genkit
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, getDocs, where } from 'firebase/firestore';
import type { ProductServiceInfo } from '@/types/aiToolSchemas';
import { ProductServiceInfoSchema } from '@/types/aiToolSchemas';

// Schemas for the actual tool (NOT exported directly from this file if it's not 'use server')
const CariInfoLayananInputSchema = z.object({
  keyword: z.string().min(1, "Kata kunci kategori pencarian tidak boleh kosong.").describe('KATEGORI layanan yang ingin dicari, mis. "Cuci Motor", "Coating", "Detailing". Harus cocok persis (case-insensitive) dengan nama kategori di database.'),
});
export type CariInfoLayananInput = z.infer<typeof CariInfoLayananInputSchema>;

const CariInfoLayananOutputSchema = z.array(ProductServiceInfoSchema).describe("Daftar layanan yang cocok dengan KATEGORI yang dicari, bisa kosong.");
export type CariInfoLayananOutput = z.infer<typeof CariInfoLayananOutputSchema>;

// This function contains the actual server-side logic (DB access)
async function findLayananByCategory(input: CariInfoLayananInput): Promise<CariInfoLayananOutput> {
  const { keyword } = input;
  const categoryKeywordLower = keyword.toLowerCase().trim();
  console.log(`[findLayananByCategory Tool] Mencari layanan dengan KATEGORI: "${categoryKeywordLower}"`);

  if (!db) {
    console.error("[findLayananByCategory Tool] Firestore DB (db) is not initialized.");
    return [];
  }

  const matchingServices: ProductServiceInfo[] = [];
  try {
    const servicesCollectionRef = collection(db, 'services');
    // Query Firestore for documents where the 'category_lowercase' field matches the keyword
    // This assumes you have a 'category_lowercase' field for case-insensitive search.
    // If not, you'd fetch more broadly and filter client-side, or adjust query.
    const q = firestoreQuery(servicesCollectionRef, where("category_lowercase", "==", categoryKeywordLower));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnap) => {
      const serviceData = docSnap.data();
      // Construct the ProductServiceInfo object based on your schema
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
          id: v.id || undefined, // Ensure variant ID is captured if present
        })) || undefined,
      };
      
      // Validate with Zod before pushing
      const validationResult = ProductServiceInfoSchema.safeParse(serviceItem);
      if (validationResult.success) {
        matchingServices.push(validationResult.data);
      } else {
        console.warn(`[findLayananByCategory Tool] Data layanan ${docSnap.id} tidak valid:`, validationResult.error.format());
      }
    });

    console.log(`[findLayananByCategory Tool] Ditemukan ${matchingServices.length} layanan untuk KATEGORI "${categoryKeywordLower}".`);
    if (matchingServices.length === 0) {
        console.log(`[findLayananByCategory Tool] INFO: Pastikan field 'category_lowercase' ada di dokumen 'services' dan nilainya sesuai dengan keyword pencarian (e.g., "coating", "cuci motor").`);
    }
    return matchingServices;
  } catch (error) {
    console.error("[findLayananByCategory Tool] Error saat mencari layanan berdasarkan KATEGORI:", error);
    return []; // Return empty array on error
  }
}

// Define the Genkit tool
export const cariInfoLayananTool = ai.defineTool(
  {
    name: 'cariInfoLayananTool', // Nama ini yang akan dipakai di prompt SUB-FLOW
    description: 'Mencari daftar layanan atau produk yang tersedia berdasarkan KATEGORI layanan. Input adalah nama kategori, output adalah daftar layanan dalam kategori tsb.',
    inputSchema: CariInfoLayananInputSchema,
    outputSchema: CariInfoLayananOutputSchema,
  },
  findLayananByCategory
);

