
/**
 * @fileOverview Genkit tool for looking up product or service details from Firestore.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { collection, query as firestoreQuery, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ProductServiceInfoSchema, type ProductServiceInfo } from '@/types/aiToolSchemas';
import { v4 as uuidv4 } from 'uuid';

// Define ServiceProduct type locally or import if it's broadly used
interface ServiceProductDbData {
  id: string;
  name: string;
  type: 'Layanan' | 'Produk';
  category: string;
  price: number;
  description?: string;
  pointsAwarded?: number;
  estimatedDuration?: string;
  variants?: {
    id: string;
    name: string;
    price: number;
    pointsAwarded?: number;
    estimatedDuration?: string;
  }[];
  stockQuantity?: number;
  costPrice?: number;
  [key: string]: any; // Allow other fields that might exist in Firestore
}


const ProductLookupInputSchema = z.object({
  productName: z.string().describe("Nama produk atau layanan yang ingin dicari detailnya. Harus spesifik."),
});
export type ProductLookupInput = z.infer<typeof ProductLookupInputSchema>;

// Export this function so it can be called directly from other flows if needed.
export async function findProductServiceByName(input: ProductLookupInput): Promise<ProductServiceInfo | null> {
    if (!input.productName || input.productName.trim() === '') {
      console.log("ProductLookupTool Function: Nama produk kosong.");
      return null;
    }
    const searchTerm = input.productName.trim();
    console.log(`ProductLookupTool Function: Mencari produk/layanan dengan nama: "${searchTerm}"`);

    if (!db) {
      console.error("[ProductLookupTool Function] FATAL: Firestore DB (db) is not initialized. Cannot query.");
      return null;
    }

    try {
      const servicesRef = collection(db, 'services');
      const q = firestoreQuery(servicesRef); // Get all services/products
      const querySnapshot = await getDocs(q);

      let bestMatch: (ProductServiceInfo & { score: number }) | null = null;
      const searchTermLower = searchTerm.toLowerCase();

      for (const doc of querySnapshot.docs) {
        const item = { id: doc.id, ...doc.data() } as ServiceProductDbData;
        const itemNameLower = item.name.toLowerCase();

        // Check for base item match
        if (itemNameLower.includes(searchTermLower)) {
            let score = 0;
            if (itemNameLower === searchTermLower) score = 100; // Exact match = highest score
            else if (itemNameLower.startsWith(searchTermLower)) score = 50; // Starts with is good
            else score = 20; // Includes is okay
            
            const candidate: ProductServiceInfo & { score: number } = {
                ...item,
                price: item.price ?? 0,
                score: score,
            };

            if (!bestMatch || candidate.score > bestMatch.score || (candidate.score === bestMatch.score && candidate.name.length < bestMatch.name.length)) {
                bestMatch = candidate;
            }
        }

        // Check for variant matches (higher scores for more specific matches)
        if (item.variants) {
            for (const variant of item.variants) {
                const fullVariantName = `${item.name} - ${variant.name}`;
                const fullVariantNameLower = fullVariantName.toLowerCase();

                if (fullVariantNameLower.includes(searchTermLower)) {
                    let score = 0;
                    if (fullVariantNameLower === searchTermLower) score = 110; // Exact variant match is king
                    else if (fullVariantNameLower.startsWith(searchTermLower)) score = 60;
                    else score = 30;

                    const candidate: ProductServiceInfo & { score: number } = {
                      id: item.id,
                      name: fullVariantName,
                      type: item.type,
                      category: item.category,
                      price: variant.price,
                      description: item.description || undefined,
                      pointsAwarded: variant.pointsAwarded ?? item.pointsAwarded,
                      estimatedDuration: variant.estimatedDuration ?? item.estimatedDuration,
                      variants: undefined, // It's a specific variant, so no further variants
                      score: score,
                    };
                    
                    if (!bestMatch || candidate.score > bestMatch.score || (candidate.score === bestMatch.score && candidate.name.length < bestMatch.name.length)) {
                        bestMatch = candidate;
                    }
                }
            }
        }
      }
      
      if (bestMatch) {
        console.log(`ProductLookupTool Function: Ditemukan kandidat terbaik: "${bestMatch.name}" (Score: ${bestMatch.score})`);
        
        const { score, ...result } = bestMatch; // Remove score before returning

        try {
          ProductServiceInfoSchema.parse(result);
          return result;
        } catch (zodError: any) {
          console.error("ProductLookupTool Function: Zod validation error for found item:", JSON.stringify(zodError.format(), null, 2));
          console.error("ProductLookupTool Function: Data that failed validation:", JSON.stringify(result, null, 2));
          return null;
        }
      } else {
        console.log(`ProductLookupTool Function: Tidak ada produk/layanan yang cocok dengan nama "${searchTerm}".`);
        return null;
      }
    } catch (error) {
      console.error('ProductLookupTool Function: Error saat mengambil data dari Firestore:', error);
      return null;
    }
}

export const getProductServiceDetailsByNameTool = ai.defineTool(
  {
    name: 'getProductServiceDetailsByNameTool',
    description: 'Mencari dan mengembalikan detail spesifik dari sebuah produk atau layanan berdasarkan namanya. Berguna untuk menjawab pertanyaan pelanggan tentang harga, durasi, ketersediaan, atau deskripsi item tertentu.',
    inputSchema: ProductLookupInputSchema,
    outputSchema: z.union([ProductServiceInfoSchema, z.null()]).describe("Objek berisi detail produk/layanan, atau null jika tidak ditemukan."),
  },
  findProductServiceByName // Pass the actual function here
);
