
'use server';
/**
 * @fileOverview Genkit tool for looking up product or service details from Firestore.
 */
import {ai}from '@/ai/genkit';
import {z}from 'genkit';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ServiceProduct, ServiceProductVariant } from '@/app/(app)/services/page';
import { ProductServiceInfoSchema, type ProductServiceInfo } from '@/types/aiToolSchemas';

const ProductLookupInputSchema = z.object({
  productName: z.string().describe("Nama produk atau layanan yang ingin dicari detailnya. Harus spesifik."),
});

export const getProductServiceDetailsByNameTool = ai.defineTool(
  {
    name: 'getProductServiceDetailsByNameTool',
    description: 'Mencari dan mengembalikan detail spesifik dari sebuah produk atau layanan berdasarkan namanya. Berguna untuk menjawab pertanyaan pelanggan tentang harga, durasi, ketersediaan, atau deskripsi item tertentu.',
    inputSchema: ProductLookupInputSchema,
    outputSchema: z.union([ProductServiceInfoSchema, z.null()]).describe("Objek berisi detail produk/layanan, atau null jika tidak ditemukan."),
  },
  async (input) => {
    if (!input.productName || input.productName.trim() === '') {
      console.log("ProductLookupTool: Nama produk kosong.");
      return null;
    }
    console.log(`ProductLookupTool: Mencari produk/layanan dengan nama: "${input.productName}"`);
    try {
      const servicesRef = collection(db, 'services');
      const q = query(servicesRef);
      const querySnapshot = await getDocs(q);

      let foundItem: ServiceProduct | null = null;
      const searchTermLower = input.productName.toLowerCase();

      let bestMatchCandidate: ServiceProduct | null = null;
      let bestMatchIsVariant = false;

      for (const doc of querySnapshot.docs) {
        const item = { id: doc.id, ...doc.data() } as ServiceProduct;

        if (Array.isArray(item.variants)) { // Safely check if variants is an array
            for (const variant of item.variants) {
                const fullVariantName = `${item.name} - ${variant.name}`;
                if (fullVariantName.toLowerCase().includes(searchTermLower)) {
                    const currentCandidateIsBetter = !bestMatchCandidate ||
                                                     (fullVariantName.toLowerCase() === searchTermLower && (!bestMatchIsVariant || (bestMatchCandidate.name && bestMatchCandidate.name.toLowerCase() !== searchTermLower))) ||
                                                     (!bestMatchIsVariant && searchTermLower.length > (bestMatchCandidate.name?.length || 0) );

                    if (currentCandidateIsBetter) {
                        bestMatchCandidate = {
                            ...item, // Spread base item properties
                            name: fullVariantName, // Override name with full variant name
                            price: variant.price, // Override price with variant price
                            pointsAwarded: variant.pointsAwarded ?? item.pointsAwarded, // Variant points or base points
                            estimatedDuration: variant.estimatedDuration ?? item.estimatedDuration, // Variant duration or base duration
                            // Variants array from base item should not be included here
                        };
                        delete bestMatchCandidate.variants; // Ensure variants array from base item is removed
                        bestMatchIsVariant = true;
                        if (fullVariantName.toLowerCase() === searchTermLower) { // Exact match, break all
                            foundItem = bestMatchCandidate;
                            break;
                        }
                    }
                }
            }
        }
        if (foundItem) break; // Exact variant match found

        // Check base item name if no exact variant match yet
        if (item.name.toLowerCase().includes(searchTermLower)) {
            if (!bestMatchCandidate || // No candidate yet
                (!bestMatchIsVariant && item.name.toLowerCase() === searchTermLower && bestMatchCandidate.name && bestMatchCandidate.name.toLowerCase() !== searchTermLower) || // Exact base name match is better than previous partial base
                (!bestMatchIsVariant && item.name.length < (bestMatchCandidate.name?.length || Infinity)) // Shorter base name that includes term (less specific but could be what user meant)
            ) {
                bestMatchCandidate = item;
                bestMatchIsVariant = false; // Mark that this candidate is a base item
            }
        }
      }

      foundItem = bestMatchCandidate || foundItem; // Ensure foundItem gets the candidate if no exact variant break

      if (foundItem) {
        console.log(`ProductLookupTool: Ditemukan item: ${foundItem.name}`);

        let mappedVariants: ProductServiceInfo['variants'] = undefined;
        // If the found item IS a base item (not a pre-selected variant) AND it has variants, map them.
        if (!bestMatchIsVariant && Array.isArray(foundItem.variants)) {
            mappedVariants = foundItem.variants.map(v => ({
                name: v.name,
                price: v.price,
                pointsAwarded: v.pointsAwarded || undefined,
                estimatedDuration: v.estimatedDuration || undefined,
            }));
        }


        const result: ProductServiceInfo = {
          id: foundItem.id,
          name: foundItem.name, // This will be the full variant name if a variant was the best match
          type: foundItem.type,
          category: foundItem.category,
          price: foundItem.price, // This will be the variant price if a variant was the best match
          description: foundItem.description || undefined,
          pointsAwarded: foundItem.pointsAwarded || undefined,
          estimatedDuration: foundItem.estimatedDuration || undefined,
          variants: mappedVariants, // Only include variants if the foundItem itself is a base item with variants
        };

        try {
            ProductServiceInfoSchema.parse(result);
            return result;
        } catch (zodError: any) {
            console.error("ProductLookupTool: Zod validation error for found item:", zodError.errors);
            // console.error("ProductLookupTool: Data causing error:", JSON.stringify(result, null, 2));
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
