
'use server';
/**
 * @fileOverview Genkit tool for searching services by category.
 *
 * - cariInfoLayananTool - The Genkit tool definition.
 * - CariInfoLayananInput - Zod type for the tool's input.
 * - CariInfoLayananOutput - Zod type for the tool's output.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, getDocs, where } from 'firebase/firestore';
import type { ProductServiceInfo } from '@/types/aiToolSchemas'; // Keep this if ProductServiceInfoSchema is used for output
import { ProductServiceInfoSchema } from '@/types/aiToolSchemas'; // Keep this if ProductServiceInfoSchema is used for output


// Schemas are NOT exported from here for 'use server' compatibility if tool is imported by a server module
const CariInfoLayananInputSchema = z.object({
  keyword: z.string().min(1, "Kata kunci kategori pencarian tidak boleh kosong.").describe('Kategori layanan yang ingin dicari, mis. "Cuci Motor", "Coating", "Detailing". Harus cocok dengan nama kategori di database.'),
});
export type CariInfoLayananInput = z.infer<typeof CariInfoLayananInputSchema>;

const CariInfoLayananOutputSchema = z.array(ProductServiceInfoSchema).describe("Daftar layanan yang cocok dengan kategori yang dicari, bisa kosong.");
export type CariInfoLayananOutput = z.infer<typeof CariInfoLayananOutputSchema>;


// This function contains the actual server-side logic (DB access)
async function findLayananByCategory(input: CariInfoLayananInput): Promise<CariInfoLayananOutput> {
  const { keyword } = input;
  const categoryKeywordLower = keyword.toLowerCase().trim();
  console.log(`[findLayananByCategory] Mencari layanan dengan kategori: "${categoryKeywordLower}"`);

  if (!db) {
    console.error("[findLayananByCategory] Firestore DB (db) is not initialized.");
    return [];
  }

  const matchingServices: ProductServiceInfo[] = [];
  try {
    const servicesCollectionRef = collection(db, 'services');
    // Query Firestore for documents where the 'category' field matches the keyword (case-insensitive can be tricky directly)
    // Firestore's default querying is case-sensitive. For case-insensitive, we might need to store a lowercase version of the category
    // or fetch more data and filter client-side (less ideal for large datasets).
    // For now, let's assume we store categories consistently or the keyword matches case.
    // A more robust solution would be to query all and then filter, or store a lowercase category field.
    
    // Simpler approach: Fetch all and filter locally for case-insensitivity
    const q = firestoreQuery(servicesCollectionRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnap) => {
      const serviceData = docSnap.data();
      const serviceCategoryLower = serviceData.category?.toLowerCase();

      if (serviceCategoryLower && serviceCategoryLower === categoryKeywordLower) {
        // Construct the ProductServiceInfo object based on your schema
        const serviceItem: ProductServiceInfo = {
          id: docSnap.id,
          name: serviceData.name,
          type: serviceData.type as 'Layanan' | 'Produk', // Assuming 'type' exists and is one of these
          category: serviceData.category,
          price: serviceData.price, // Assuming 'price' is a number
          description: serviceData.description || undefined,
          pointsAwarded: serviceData.pointsAwarded || undefined,
          estimatedDuration: serviceData.estimatedDuration || undefined,
          variants: serviceData.variants?.map((v: any) => ({
            id: v.id || undefined, // Ensure variants also have IDs if possible
            name: v.name,
            price: v.price,
            pointsAwarded: v.pointsAwarded,
            estimatedDuration: v.estimatedDuration,
            // stockQuantity and costPrice are specific to Products, handle if necessary
          })) || undefined,
        };
        
        // Validate with Zod before pushing
        const validationResult = ProductServiceInfoSchema.safeParse(serviceItem);
        if (validationResult.success) {
          matchingServices.push(validationResult.data);
        } else {
          console.warn(`[findLayananByCategory] Data layanan ${docSnap.id} tidak valid:`, validationResult.error.format());
        }
      }
    });

    console.log(`[findLayananByCategory] Ditemukan ${matchingServices.length} layanan untuk kategori "${categoryKeywordLower}".`);
    return matchingServices;
  } catch (error) {
    console.error("[findLayananByCategory] Error saat mencari layanan berdasarkan kategori:", error);
    return []; // Return empty array on error
  }
}


// Define the Genkit tool
export const cariInfoLayananTool = ai.defineTool(
  {
    name: 'cariInfoLayanan',
    description: 'Mencari daftar layanan atau produk yang tersedia berdasarkan KATEGORI layanan. Berguna jika pelanggan bertanya layanan apa saja yang ada dalam satu kategori tertentu (mis. "Cuci Motor", "Coating", "Detailing").',
    inputSchema: CariInfoLayananInputSchema,
    outputSchema: CariInfoLayananOutputSchema,
  },
  findLayananByCategory // Use the updated function
);
