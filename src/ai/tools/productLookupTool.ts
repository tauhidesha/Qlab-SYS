
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

        if (Array.isArray(item.variants)) {
            for (const variant of item.variants) {
                const fullVariantName = `${item.name} - ${variant.name}`;
                if (fullVariantName.toLowerCase().includes(searchTermLower)) {
                    const currentCandidateIsBetter = !bestMatchCandidate ||
                                                     (fullVariantName.toLowerCase() === searchTermLower && (!bestMatchIsVariant || bestMatchCandidate.name.toLowerCase() !== searchTermLower)) ||
                                                     (!bestMatchIsVariant && searchTermLower.length > (bestMatchCandidate.name?.length || 0) );

                    if (currentCandidateIsBetter) {
                        bestMatchCandidate = {
                            ...item,
                            name: fullVariantName,
                            price: variant.price,
                            pointsAwarded: variant.pointsAwarded ?? item.pointsAwarded,
                            estimatedDuration: variant.estimatedDuration ?? item.estimatedDuration,
                        };
                        delete bestMatchCandidate.variants;
                        bestMatchIsVariant = true;
                        if (fullVariantName.toLowerCase() === searchTermLower) {
                            foundItem = bestMatchCandidate;
                            break;
                        }
                    }
                }
            }
        }
        if (foundItem) break;

        if (item.name.toLowerCase().includes(searchTermLower)) {
            if (!bestMatchCandidate ||
                (!bestMatchIsVariant && item.name.toLowerCase() === searchTermLower && bestMatchCandidate.name.toLowerCase() !== searchTermLower) ||
                (!bestMatchIsVariant && item.name.length < (bestMatchCandidate.name?.length || Infinity))
            ) {
                bestMatchCandidate = item;
                bestMatchIsVariant = false;
            }
        }
      }

      foundItem = bestMatchCandidate || foundItem;

      if (foundItem) {
        console.log(`ProductLookupTool: Ditemukan item: ${foundItem.name}`);

        let mappedVariants: ProductServiceInfo['variants'] = undefined;
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
          name: foundItem.name,
          type: foundItem.type,
          category: foundItem.category,
          price: foundItem.price,
          description: foundItem.description || undefined,
          pointsAwarded: foundItem.pointsAwarded || undefined,
          estimatedDuration: foundItem.estimatedDuration || undefined,
          variants: mappedVariants,
        };

        try {
            ProductServiceInfoSchema.parse(result);
            return result;
        } catch (zodError) {
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
