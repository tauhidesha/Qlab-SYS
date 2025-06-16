
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
    const searchTerm = input.productName.trim();
    const searchTermLower = searchTerm.toLowerCase();
    console.log(`ProductLookupTool: Mencari produk/layanan dengan nama/term: "${searchTerm}" (lowercase: "${searchTermLower}")`);

    try {
      const servicesRef = collection(db, 'services');
      const q = query(servicesRef); // Get all services for now, can be optimized later if needed
      const querySnapshot = await getDocs(q);

      let bestMatchCandidate: ServiceProduct | null = null;
      let bestMatchScore = 0; // 0: no match, 1: partial base, 2: exact base, 3: partial variant, 4: exact variant

      for (const doc of querySnapshot.docs) {
        const item = { id: doc.id, ...doc.data() } as ServiceProduct;
        const itemNameLower = item.name.toLowerCase();

        // Check for exact match with base item name
        if (itemNameLower === searchTermLower) {
          if (bestMatchScore < 2) { // Prefer exact base match over partial
            bestMatchCandidate = item;
            bestMatchScore = 2;
          }
        }
        // Check for partial match with base item name
        else if (itemNameLower.includes(searchTermLower)) {
          if (bestMatchScore < 1) {
            bestMatchCandidate = item;
            bestMatchScore = 1;
          }
        }

        // Check variants
        if (Array.isArray(item.variants)) {
          for (const variant of item.variants) {
            const fullVariantName = `${item.name} - ${variant.name}`;
            const fullVariantNameLower = fullVariantName.toLowerCase();

            if (fullVariantNameLower === searchTermLower) { // Exact variant match is highest priority
              bestMatchCandidate = {
                ...item,
                name: fullVariantName,
                price: variant.price,
                pointsAwarded: variant.pointsAwarded ?? item.pointsAwarded,
                estimatedDuration: variant.estimatedDuration ?? item.estimatedDuration,
                variants: undefined, // This is now a specific variant, not a base item with variants
              };
              bestMatchScore = 4;
              break; // Found exact variant match, stop checking other variants for this item
            } else if (fullVariantNameLower.includes(searchTermLower)) {
              if (bestMatchScore < 3) {
                bestMatchCandidate = {
                  ...item,
                  name: fullVariantName,
                  price: variant.price,
                  pointsAwarded: variant.pointsAwarded ?? item.pointsAwarded,
                  estimatedDuration: variant.estimatedDuration ?? item.estimatedDuration,
                  variants: undefined,
                };
                bestMatchScore = 3;
              }
            }
          }
        }
        if (bestMatchScore === 4) break; // Found exact variant match, no need to check other items
      }

      if (bestMatchCandidate) {
        console.log(`ProductLookupTool: Ditemukan kandidat terbaik: "${bestMatchCandidate.name}" dengan skor: ${bestMatchScore}`);

        let mappedVariantsForOutput: ProductServiceInfo['variants'] = undefined;
        // If the best match was a BASE item (score 1 or 2) AND it originally had variants, map them for output.
        // If bestMatchScore is 3 or 4, it means a variant was selected, and bestMatchCandidate.variants is already undefined.
        if ((bestMatchScore === 1 || bestMatchScore === 2) && Array.isArray(bestMatchCandidate.variants)) {
            mappedVariantsForOutput = bestMatchCandidate.variants.map(v => ({
                name: v.name,
                price: v.price,
                pointsAwarded: v.pointsAwarded || undefined,
                estimatedDuration: v.estimatedDuration || undefined,
            }));
        }

        const result: ProductServiceInfo = {
          id: bestMatchCandidate.id,
          name: bestMatchCandidate.name, // This will be the full variant name if a variant was the best match
          type: bestMatchCandidate.type,
          category: bestMatchCandidate.category,
          price: bestMatchCandidate.price, // This will be the variant price if a variant was the best match
          description: bestMatchCandidate.description || undefined,
          pointsAwarded: bestMatchCandidate.pointsAwarded || undefined,
          estimatedDuration: bestMatchCandidate.estimatedDuration || undefined,
          variants: mappedVariantsForOutput,
        };

        try {
            ProductServiceInfoSchema.parse(result);
            return result;
        } catch (zodError: any) {
            console.error("ProductLookupTool: Zod validation error for found item:", zodError.errors);
            console.error("ProductLookupTool: Data causing error:", JSON.stringify(result, null, 2));
            return null;
        }
      } else {
        console.log(`ProductLookupTool: Tidak ada produk/layanan yang cocok dengan nama/term "${searchTerm}".`);
        return null;
      }
    } catch (error) {
      console.error('ProductLookupTool: Error saat mengambil data dari Firestore:', error);
      return null;
    }
  }
);
