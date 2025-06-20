
/**
 * @fileOverview Genkit tool for looking up product or service details from Firestore.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { collection, query as firestoreQuery, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ProductServiceInfoSchema, type ProductServiceInfo, type ProductVariantInfo } from '@/types/aiToolSchemas';
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
  variants?: ServiceProductVariant[];
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
    console.log(`ProductLookupTool Function: Mencari produk/layanan dengan nama: "${input.productName}"`);

    if (!db) {
      console.error("[ProductLookupTool Function] FATAL: Firestore DB (db) is not initialized. Cannot query.");
      return null;
    }

    try {
      const servicesRef = collection(db, 'services');
      const q = firestoreQuery(servicesRef); // Get all services/products
      const querySnapshot = await getDocs(q);

      let foundItem: ProductServiceInfo | null = null;
      const searchTermLower = input.productName.toLowerCase().trim();

      let bestMatchCandidate: (ProductServiceInfo & { originalItem?: ServiceProductDbData, isVariantMatch?: boolean, matchScore?: number }) | null = null;

      for (const doc of querySnapshot.docs) {
        const item = { id: doc.id, ...doc.data() } as ServiceProductDbData; 

        // Check base item name
        if (item.name.toLowerCase().includes(searchTermLower)) {
          let score = 0;
          if (item.name.toLowerCase() === searchTermLower) score = 100; // Exact match
          else if (item.name.toLowerCase().startsWith(searchTermLower)) score = 50; // Starts with
          else score = 20; // Includes

          if (!bestMatchCandidate || score > (bestMatchCandidate.matchScore || 0) || (score === bestMatchCandidate.matchScore && item.name.length < bestMatchCandidate.name.length)) {
             bestMatchCandidate = { 
                ...item, // Spread all fields from item
                // Ensure all required fields for ProductServiceInfo are present
                id: item.id,
                name: item.name,
                type: item.type,
                category: item.category,
                price: item.price,
                // Optional fields:
                description: item.description || undefined,
                pointsAwarded: item.pointsAwarded || undefined,
                estimatedDuration: item.estimatedDuration || undefined,
                variants: item.variants?.map(v => ({...v, id: v.id || uuidv4()})) || undefined,
                originalItem: item, 
                isVariantMatch: false, 
                matchScore: score 
            };
          }
        }

        // Check variants
        if (item.variants) {
          for (const variant of item.variants) {
            const fullVariantName = `${item.name} - ${variant.name}`;
            if (fullVariantName.toLowerCase().includes(searchTermLower)) {
              let score = 0;
              if (fullVariantName.toLowerCase() === searchTermLower) score = 110; // Higher score for exact variant match
              else if (fullVariantName.toLowerCase().startsWith(searchTermLower)) score = 60;
              else score = 30;

              if (!bestMatchCandidate || score > (bestMatchCandidate.matchScore || 0) || (score === bestMatchCandidate.matchScore && fullVariantName.length < bestMatchCandidate.name.length)) {
                bestMatchCandidate = {
                  id: item.id, 
                  name: fullVariantName, 
                  type: item.type,
                  category: item.category,
                  price: variant.price, 
                  description: item.description || undefined, 
                  pointsAwarded: variant.pointsAwarded ?? item.pointsAwarded,
                  estimatedDuration: variant.estimatedDuration ?? item.estimatedDuration,
                  variants: undefined, 
                  originalItem: item, 
                  isVariantMatch: true, 
                  matchScore: score
                };
              }
            }
          }
        }
      }
      
      if (bestMatchCandidate) {
        console.log(`ProductLookupTool Function: Ditemukan kandidat terbaik: ${bestMatchCandidate.name} (Score: ${bestMatchCandidate.matchScore})`);
        // Construct the final item to return, ensuring it matches ProductServiceInfoSchema
        foundItem = {
            id: bestMatchCandidate.id,
            name: bestMatchCandidate.name,
            type: bestMatchCandidate.type,
            category: bestMatchCandidate.category,
            price: bestMatchCandidate.price,
            description: bestMatchCandidate.description || undefined,
            pointsAwarded: bestMatchCandidate.pointsAwarded || undefined,
            estimatedDuration: bestMatchCandidate.estimatedDuration || undefined,
            variants: !bestMatchCandidate.isVariantMatch && bestMatchCandidate.originalItem?.variants 
                ? bestMatchCandidate.originalItem.variants.map((v: any) => ({ // Ensure v has id or generate one
                    id: v.id || uuidv4(),
                    name: v.name,
                    price: v.price,
                    pointsAwarded: v.pointsAwarded,
                    estimatedDuration: v.estimatedDuration,
                  })) 
                : undefined,
        };

        try {
          ProductServiceInfoSchema.parse(foundItem);
          return foundItem;
        } catch (zodError: any) {
          console.error("ProductLookupTool Function: Zod validation error for found item:", JSON.stringify(zodError.format(), null, 2));
          console.error("ProductLookupTool Function: Data that failed validation:", JSON.stringify(foundItem, null, 2));
          return null;
        }
      } else {
        console.log(`ProductLookupTool Function: Tidak ada produk/layanan yang cocok dengan nama "${input.productName}".`);
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


    