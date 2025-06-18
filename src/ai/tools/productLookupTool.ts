
'use server';
/**
 * @fileOverview Genkit tool for looking up product or service details from Firestore.
 * - getProductServiceDetailsByNameTool - The Genkit tool definition.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { collection, query, getDocs as getFirestoreDocs, where, limit } from 'firebase/firestore'; // Explicitly import getDocs
import { db } from '@/lib/firebase'; // Assuming your Firebase init is here
import { ProductServiceInfoSchema, type ProductServiceInfo } from '@/types/aiToolSchemas';

const ProductLookupInputSchema = z.object({
  productName: z.string().describe("Nama produk atau layanan yang ingin dicari detailnya. Harus spesifik."),
});
export type ProductLookupInput = z.infer<typeof ProductLookupInputSchema>;


export const getProductServiceDetailsByNameTool = ai.defineTool(
  {
    name: 'getProductServiceDetailsByNameTool',
    description: 'Mencari dan mengembalikan detail spesifik dari sebuah produk atau layanan berdasarkan namanya. Berguna untuk menjawab pertanyaan pelanggan tentang harga, durasi, ketersediaan, atau deskripsi item tertentu.',
    inputSchema: ProductLookupInputSchema,
    outputSchema: z.union([ProductServiceInfoSchema, z.null()]).describe("Objek berisi detail produk/layanan, atau null jika tidak ditemukan."),
  },
  async (input: ProductLookupInput): Promise<ProductServiceInfo | null> => {
    if (!input.productName || input.productName.trim() === '') {
      console.log("ProductLookupTool: Nama produk kosong.");
      return null;
    }
    const productNameTrimmed = input.productName.trim();
    console.log(`ProductLookupTool: Mencari produk/layanan dengan nama: "${productNameTrimmed}"`);

    try {
      const servicesRef = collection(db, 'services');
      // Attempt to find an exact match first (case-insensitive via software filter after fetch)
      // Firestore's native querying is case-sensitive and doesn't support case-insensitive 'contains' easily.
      // So we fetch candidates and filter. This might be inefficient for very large catalogs.

      const querySnapshot = await getFirestoreDocs(servicesRef); // Fetch all services
      if (querySnapshot.empty) {
        console.log("ProductLookupTool: Koleksi 'services' kosong atau tidak ditemukan.");
        return null;
      }

      let foundItem: ProductServiceInfo | null = null;
      const searchTermLower = productNameTrimmed.toLowerCase();
      
      let bestMatchCandidate: (ProductServiceInfo & { matchScore: number }) | null = null;


      for (const doc of querySnapshot.docs) {
        const item = { id: doc.id, ...doc.data() } as ProductServiceInfo;

        // Check variants first for more specific matches
        if (item.variants && Array.isArray(item.variants)) {
          for (const variant of item.variants) {
            const fullVariantName = `${item.name} - ${variant.name}`;
            if (fullVariantName.toLowerCase().includes(searchTermLower)) {
              let score = 0;
              if (fullVariantName.toLowerCase() === searchTermLower) score = 100; // Exact match
              else if (searchTermLower.startsWith(fullVariantName.toLowerCase())) score = 90;
              else score = 70; // Partial match

              const candidate = {
                ...item, // Base item data
                id: doc.id, // ensure doc.id is used
                name: fullVariantName, // Use full variant name
                price: variant.price,
                pointsAwarded: variant.pointsAwarded ?? item.pointsAwarded,
                estimatedDuration: variant.estimatedDuration ?? item.estimatedDuration,
                variants: undefined, // Remove variants array from specific variant result
                matchScore: score,
              };
              if (!bestMatchCandidate || score > bestMatchCandidate.matchScore) {
                bestMatchCandidate = candidate;
              }
            }
          }
        }

        // Check base item name
        if (item.name.toLowerCase().includes(searchTermLower)) {
            let score = 0;
            if (item.name.toLowerCase() === searchTermLower) score = 80; // Exact base match
            else if (searchTermLower.startsWith(item.name.toLowerCase())) score = 75;
            else score = 60; // Partial base match
            
            const candidate = { ...item, id: doc.id, matchScore: score };
             if (!bestMatchCandidate || score > bestMatchCandidate.matchScore) {
                bestMatchCandidate = candidate;
            }
        }
      }
      
      foundItem = bestMatchCandidate ? { ...bestMatchCandidate, variants: bestMatchCandidate.matchScore < 80 ? bestMatchCandidate.variants : undefined } : null;


      if (foundItem) {
        console.log(`ProductLookupTool: Ditemukan item kandidat terbaik: ${foundItem.name}`);
        // Validate with Zod before returning
        const zodValidation = ProductServiceInfoSchema.safeParse(foundItem);
        if (zodValidation.success) {
            return zodValidation.data;
        } else {
            console.error("ProductLookupTool: Zod validation error for found item:", zodValidation.error.format());
            console.error("ProductLookupTool: Data causing error:", JSON.stringify(foundItem, null, 2));
            return null;
        }
      } else {
        console.log(`ProductLookupTool: Tidak ada produk/layanan yang cocok dengan nama "${productNameTrimmed}".`);
        return null;
      }
    } catch (error) {
      console.error('ProductLookupTool: Error saat mengambil data dari Firestore:', error);
      return null;
    }
  }
);
