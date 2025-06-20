/**
 * @fileOverview Genkit tool for looking up product or service details from Firestore.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { collection, query as firestoreQuery, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ProductServiceInfoSchema, type ProductServiceInfo, type ProductVariantInfo } from '@/types/aiToolSchemas';
import { v4 as uuidv4 } from 'uuid';


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
    console.log(`ProductLookupTool: Mencari produk/layanan dengan nama: "${input.productName}"`);

    try {
      const servicesRef = collection(db, 'services');
      const q = firestoreQuery(servicesRef); // Get all services/products
      const querySnapshot = await getDocs(q);

      let foundItem: ProductServiceInfo | null = null;
      const searchTermLower = input.productName.toLowerCase().trim();

      // Priority for exact matches or more specific variant matches
      let bestMatchCandidate: (ProductServiceInfo & { originalItem?: any, isVariantMatch?: boolean }) | null = null;

      for (const doc of querySnapshot.docs) {
        const item = { id: doc.id, ...doc.data() } as ServiceProduct; // Assuming ServiceProduct type from services/page

        // Check base item name
        if (item.name.toLowerCase().includes(searchTermLower)) {
          if (!bestMatchCandidate || item.name.toLowerCase() === searchTermLower || 
              (bestMatchCandidate && !bestMatchCandidate.isVariantMatch && item.name.length > bestMatchCandidate.name.length)) {
             bestMatchCandidate = { ...item, originalItem: item, isVariantMatch: false };
          }
        }

        // Check variants
        if (item.variants) {
          for (const variant of item.variants) {
            const fullVariantName = `${item.name} - ${variant.name}`;
            if (fullVariantName.toLowerCase().includes(searchTermLower)) {
              const variantDetail: ProductServiceInfo = {
                id: item.id, // Base item ID
                name: fullVariantName, // Combined name
                type: item.type,
                category: item.category,
                price: variant.price, // Variant price
                description: item.description, // Base item description
                pointsAwarded: variant.pointsAwarded ?? item.pointsAwarded,
                estimatedDuration: variant.estimatedDuration ?? item.estimatedDuration,
                variants: undefined, // No deeper variants for a matched variant
              };
              // If this variant match is more specific or an exact match, prioritize it
              if (!bestMatchCandidate || fullVariantName.toLowerCase() === searchTermLower || 
                  (bestMatchCandidate && (bestMatchCandidate.isVariantMatch === false || fullVariantName.length > bestMatchCandidate.name.length))) {
                bestMatchCandidate = { ...variantDetail, originalItem: item, isVariantMatch: true };
              }
            }
          }
        }
      }
      
      if (bestMatchCandidate) {
        console.log(`ProductLookupTool: Ditemukan kandidat terbaik: ${bestMatchCandidate.name}`);
        foundItem = {
            id: bestMatchCandidate.id,
            name: bestMatchCandidate.name,
            type: bestMatchCandidate.type,
            category: bestMatchCandidate.category,
            price: bestMatchCandidate.price,
            description: bestMatchCandidate.description || undefined,
            pointsAwarded: bestMatchCandidate.pointsAwarded || undefined,
            estimatedDuration: bestMatchCandidate.estimatedDuration || undefined,
            // If the best match was a base item, include its variants.
            // If it was a variant match, variants field is undefined.
            variants: !bestMatchCandidate.isVariantMatch && bestMatchCandidate.originalItem?.variants 
                ? bestMatchCandidate.originalItem.variants.map((v: any) => ({
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
          console.error("ProductLookupTool: Zod validation error for found item:", zodError.errors);
          return null;
        }
      } else {
        console.log(`ProductLookupTool: Tidak ada produk/layanan yang cocok dengan nama "${input.productName}".`);
        return null;
      }
    } catch (error) {
      console.error('ProductLookupTool: Error saat mengambil data dari Firestore:', error);
      return null;
    }
  }
);
