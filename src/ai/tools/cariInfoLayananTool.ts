
/**
 * @fileOverview Genkit tool for searching services by category.
 * This tool is intended to be used by sub-flows or specialized flows.
 *
 * - cariInfoLayananTool - The Genkit tool definition.
 * - findLayananByCategory - The actual function performing the lookup (exported for direct use).
 * - CariInfoLayananInput - Zod type for the tool's input.
 * - CariInfoLayananOutput - Zod type for the tool's output.
 */

import { ai } from '@/ai/genkit'; // Harus dari @/ai/genkit
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, getDocs, where } from 'firebase/firestore';
import type { ProductServiceInfo } from '@/types/aiToolSchemas';
import { ProductServiceInfoSchema } from '@/types/aiToolSchemas';
import { v4 as uuidv4 } from 'uuid'; // Ensure uuid is imported if variants might need new IDs

// Schemas for the actual tool (NOT exported directly from this file if it's not 'use server')
const CariInfoLayananInputSchema = z.object({
  keyword: z.string().min(1, "Kata kunci kategori pencarian tidak boleh kosong.").describe('Nama KATEGORI layanan yang ingin dicari, mis. "cuci", "coating", "detailing". Akan dicocokkan (case-insensitive) dengan field "category" pada data layanan.'),
});
export type CariInfoLayananInput = z.infer<typeof CariInfoLayananInputSchema>;

const CariInfoLayananOutputSchema = z.array(ProductServiceInfoSchema).describe("Daftar layanan yang cocok dengan KATEGORI yang dicari, bisa kosong.");
export type CariInfoLayananOutput = z.infer<typeof CariInfoLayananOutputSchema>;

// This function contains the actual server-side logic (DB access)
// Export this function so it can be called directly from other flows if needed.
export async function findLayananByCategory(input: CariInfoLayananInput): Promise<CariInfoLayananOutput> {
  const { keyword } = input;
  const categoryKeywordLower = keyword.toLowerCase().trim();
  console.log(`[findLayananByCategory Tool Function] Attempting to find services for CATEGORY: "${categoryKeywordLower}"`);

  if (!db) {
    console.error("[findLayananByCategory Tool Function] FATAL: Firestore DB (db) is not initialized. Cannot query.");
    return [];
  }
  console.log(`[findLayananByCategory Tool Function] Using Firestore Project ID: ${db.app.options.projectId || 'PROJECT ID NOT AVAILABLE ON DB INSTANCE'}`);


  const matchingServices: ProductServiceInfo[] = [];
  try {
    const servicesCollectionRef = collection(db, 'services');
    console.log(`[findLayananByCategory Tool Function] Querying collection 'services' WHERE "category" == "${categoryKeywordLower}"`);
    // Query Firestore. Pastikan field 'category' di Firestore juga lowercase atau lakukan perbandingan case-insensitive jika memungkinkan
    const q = firestoreQuery(servicesCollectionRef, where("category", "==", categoryKeywordLower));
    const querySnapshot = await getDocs(q);

    console.log(`[findLayananByCategory Tool Function] Query successful. Found ${querySnapshot.size} documents matching category "${categoryKeywordLower}".`);

    querySnapshot.forEach((docSnap) => {
      const serviceData = docSnap.data();
      let itemTypeFormatted: 'Layanan' | 'Produk' | undefined = undefined;
      if (typeof serviceData.type === 'string') {
        if (serviceData.type.toLowerCase() === 'layanan') {
          itemTypeFormatted = 'Layanan';
        } else if (serviceData.type.toLowerCase() === 'produk') {
          itemTypeFormatted = 'Produk';
        }
      }

      const serviceItem = {
        id: docSnap.id,
        name: serviceData.name,
        type: itemTypeFormatted,
        category: serviceData.category,
        price: typeof serviceData.price === 'number' ? serviceData.price : 0,
        description: serviceData.description || undefined,
        pointsAwarded: serviceData.pointsAwarded || undefined,
        estimatedDuration: serviceData.estimatedDuration || undefined,
        variants: serviceData.variants?.map((v: any) => ({
          id: v.id || uuidv4(), 
          name: v.name,
          price: v.price,
          pointsAwarded: v.pointsAwarded || undefined,
          estimatedDuration: v.estimatedDuration || undefined,
        })) || undefined,
      };
      
      const validationResult = ProductServiceInfoSchema.safeParse(serviceItem);
      if (validationResult.success) {
        matchingServices.push(validationResult.data);
      } else {
        console.warn(`[findLayananByCategory Tool Function] Data layanan ${docSnap.id} (Nama: ${serviceData.name || 'N/A'}) tidak valid:`, JSON.stringify(validationResult.error.format(), null, 2));
        console.warn(`[findLayananByCategory Tool Function] Data yang gagal validasi:`, JSON.stringify(serviceItem, null, 2));
      }
    });

    console.log(`[findLayananByCategory Tool Function] Successfully validated and pushed ${matchingServices.length} services for CATEGORY "${categoryKeywordLower}".`);
    if (matchingServices.length === 0 && querySnapshot.size > 0) {
        console.warn(`[findLayananByCategory Tool Function] WARNING: Found ${querySnapshot.size} documents for category "${categoryKeywordLower}", but ALL FAILED Zod validation.`);
    } else if (matchingServices.length === 0 && querySnapshot.size === 0) {
        console.log(`[findLayananByCategory Tool Function] INFO: No documents found for category "${categoryKeywordLower}" in Firestore, or the field 'category' does not exactly match "${categoryKeywordLower}".`);
    }
    return matchingServices;
  } catch (error) {
    console.error("[findLayananByCategory Tool Function] Error saat mencari layanan berdasarkan KATEGORI:", error);
    return []; // Return empty array on error
  }
}

// Define the Genkit tool, using the function above as its implementation
export const cariInfoLayananTool = ai.defineTool(
  {
    name: 'cariInfoLayananTool',
    description: 'Mencari daftar layanan atau produk yang tersedia berdasarkan NAMA KATEGORI layanan yang spesifik. Input adalah nama kategori (mis. "Cuci Motor", "Coating"), output adalah daftar layanan dalam kategori tersebut.',
    inputSchema: CariInfoLayananInputSchema,
    outputSchema: CariInfoLayananOutputSchema,
  },
  findLayananByCategory // Pass the actual function here
);


    