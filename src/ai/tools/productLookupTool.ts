
'use server';
/**
 * @fileOverview Genkit tool for looking up product or service details from Firestore.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';
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
      // Firestore case-insensitive search is tricky. For now, we'll try to match name as is,
      // then try with capitalized words if not found. A more robust solution might involve
      // storing a lowercased version of the name or using a third-party search service.
      
      // Attempt 1: Exact match (case-sensitive from client, Firestore is case-sensitive by default on equals)
      // For a pseudo case-insensitive, we can query a range or fetch and filter client-side for small datasets.
      // Let's try to fetch and filter for more flexibility in a small dataset context.
      // In a larger dataset, this would be inefficient.
      
      const q = query(servicesRef); // Potentially add orderBy('name') if needed
      const querySnapshot = await getDocs(q);
      
      let foundItem: ServiceProduct | null = null;
      const searchTermLower = input.productName.toLowerCase();

      for (const doc of querySnapshot.docs) {
        const item = { id: doc.id, ...doc.data() } as ServiceProduct;
        if (item.name.toLowerCase() === searchTermLower) {
          foundItem = item;
          break;
        }
        // Check variants as well
        if (item.variants) {
            for (const variant of item.variants) {
                const fullVariantName = `${item.name} - ${variant.name}`;
                if (fullVariantName.toLowerCase() === searchTermLower) {
                    // If a variant matches, we return the base item but could adjust to return variant-specific info
                    foundItem = {
                        ...item, // Base item info
                        name: fullVariantName, // Use full variant name
                        price: variant.price, // Use variant price
                        pointsAwarded: variant.pointsAwarded ?? item.pointsAwarded,
                        estimatedDuration: variant.estimatedDuration ?? item.estimatedDuration,
                        // Note: We are not creating a new variants array here, as the match is on a specific variant name
                    };
                    // To avoid returning the base item's variants array when a specific variant is matched:
                    if (foundItem) delete foundItem.variants; 
                    break;
                }
            }
        }
        if (foundItem) break;
      }


      if (foundItem) {
        console.log(`ProductLookupTool: Ditemukan item: ${foundItem.name}`);
        const result: ProductServiceInfo = {
          id: foundItem.id,
          name: foundItem.name,
          type: foundItem.type,
          category: foundItem.category,
          price: foundItem.price,
          description: foundItem.description || undefined,
          pointsAwarded: foundItem.pointsAwarded || undefined,
          estimatedDuration: foundItem.estimatedDuration || undefined,
          variants: foundItem.variants?.map(v => ({
            name: v.name,
            price: v.price,
            pointsAwarded: v.pointsAwarded || undefined,
            estimatedDuration: v.estimatedDuration || undefined,
          })) || undefined,
        };
        // Validate with Zod before returning
        try {
            ProductServiceInfoSchema.parse(result);
            return result;
        } catch (zodError) {
            console.error("ProductLookupTool: Zod validation error for found item:", zodError);
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
