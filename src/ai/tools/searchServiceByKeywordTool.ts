'use server';
/**
 * @fileOverview Genkit tool for searching services by keyword and optional size.
 * - searchServiceByKeywordTool - The Genkit tool definition.
 * - SearchServiceInput - Input schema for the tool.
 * - SearchServiceOutput - Output schema for the tool.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit'; // Genkit's Zod
import { adminDb } from '@/lib/firebase-admin';
import type { ServiceProduct } from '@/app/(app)/services/page'; // Assuming this type is suitable

const SearchServiceInputSchema = z.object({
  keyword: z.string().describe("Kata kunci untuk mencari layanan, mis. 'cuci', 'coating', 'nmax'.") ,
  size: z.enum(['S', 'M', 'L', 'XL']).optional().describe("Ukuran motor (S, M, L, XL) jika spesifik."),
});
export type SearchServiceInput = z.infer<typeof SearchServiceInputSchema>;

const SearchServiceOutputSchema = z.object({
  name: z.string().describe("Nama layanan yang ditemukan."),
  description: z.string().optional().describe("Deskripsi layanan."),
  price: z.number().optional().describe("Harga layanan untuk ukuran yang cocok (jika ada)."),
  size: z.enum(['S', 'M', 'L', 'XL']).optional().describe("Ukuran motor yang dicari (jika relevan dengan varian)."),
  duration: z.string().optional().describe("Estimasi durasi pengerjaan layanan."),
  variantMatched: z.string().optional().describe("Nama varian yang cocok (jika ada dan relevan).")
});
export type SearchServiceOutput = z.infer<typeof SearchServiceOutputSchema>;

export const searchServiceByKeywordTool = ai.defineTool(
  {
    name: 'searchServiceByKeywordTool',
    description: 'Cari layanan berdasarkan keyword dari pelanggan dan ukuran motor (opsional). Berguna untuk menemukan layanan yang relevan beserta harganya.',
    inputSchema: SearchServiceInputSchema,
    outputSchema: SearchServiceOutputSchema,
  },
  async (input) => {
    const { keyword, size } = input;
    console.log(`[searchServiceByKeywordTool] Searching for keyword: "${keyword}", size: "${size || 'any'}"`);
    
    const snapshot = await adminDb.collection('services').get();
    
    const servicesFromDb: ServiceProduct[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct));

    if (servicesFromDb.length === 0) {
      console.warn('[searchServiceByKeywordTool] No services found in the database.');
      throw new Error('Tidak ada layanan yang terdaftar di database.');
    }

    const keywordLower = keyword.toLowerCase();
    let bestMatch: ServiceProduct | undefined = undefined;
    let highestScore = -1;

    for (const svc of servicesFromDb) {
      let currentScore = 0;
      const nameLower = svc.name.toLowerCase();
      
      if (nameLower.includes(keywordLower)) {
        currentScore += 10;
        if (nameLower === keywordLower) currentScore += 15; // Stronger match for exact name
      }
      if (svc.description?.toLowerCase().includes(keywordLower)) {
        currentScore += 3;
      }
      if (svc.category?.toLowerCase().includes(keywordLower)) {
        currentScore += 2;
      }
      // Consider aliases from ServiceProduct if it exists and is an array of strings
      if (svc.aliases && Array.isArray(svc.aliases)) {
        if (svc.aliases.some(alias => alias.toLowerCase().includes(keywordLower))) {
           currentScore += 8;
           if (svc.aliases.some(alias => alias.toLowerCase() === keywordLower)) currentScore += 7; // Exact alias match
        }
      }
      // Consider variant names in scoring too
      if (svc.variants && svc.variants.length > 0) {
        svc.variants.forEach(variant => {
          if (variant.name.toLowerCase().includes(keywordLower)) {
            currentScore += 5; // Add score if keyword matches a variant name
          }
        });
      }

      if (currentScore > highestScore) {
        highestScore = currentScore;
        bestMatch = svc;
      }
    }
    
    if (!bestMatch || highestScore === 0) {
      console.log(`[searchServiceByKeywordTool] No service found matching keyword: "${keyword}"`);
      // Returning a structured error or a specific "not found" object might be better for the AI
      // For now, throwing error as in original user code.
      throw new Error(`Layanan tidak ditemukan untuk kata kunci "${keyword}".`);
    }
    console.log(`[searchServiceByKeywordTool] Best match found: ${bestMatch.name} with score ${highestScore}`);

    let finalPrice: number | undefined = undefined;
    let matchedVariantName: string | undefined = undefined;
    let finalDuration = bestMatch.estimatedDuration || undefined;

    if (bestMatch.variants && bestMatch.variants.length > 0) {
      let variantToUse;
      if (size) {
        // Attempt to find a variant that explicitly mentions the size
        variantToUse = bestMatch.variants.find(variant => 
          variant.name.toLowerCase().includes(size.toLowerCase())
        );
        if (variantToUse) {
          console.log(`[searchServiceByKeywordTool] Matched variant by size "${size}": ${variantToUse.name}`);
        } else {
          console.log(`[searchServiceByKeywordTool] No variant specifically matched size "${size}", considering first variant or base price.`);
        }
      }

      // If size-specific variant not found, or no size provided, use the first variant.
      // Or, if base price is relevant and variants are add-ons, this logic might need adjustment.
      // For now, if a size-specific variant is found, use it. Otherwise, if variants exist, pick first.
      if (variantToUse) {
        finalPrice = variantToUse.price;
        matchedVariantName = variantToUse.name;
        finalDuration = variantToUse.estimatedDuration || finalDuration;
      } else if (bestMatch.variants.length > 0) {
        // Fallback to first variant if no size match or no size provided, but variants exist.
        // This mirrors user's original logic of `bestMatch.variants?.[0]` somewhat.
        // finalPrice = bestMatch.variants[0].price;
        // matchedVariantName = bestMatch.variants[0].name;
        // finalDuration = bestMatch.variants[0].estimatedDuration || finalDuration;
        // console.log(`[searchServiceByKeywordTool] No size specific match, or no size provided. Using first variant: ${matchedVariantName}`);
        // Let's default to base price if no specific variant matched, and only use first variant if base price is 0/undefined
        if (bestMatch.price && bestMatch.price > 0) {
            finalPrice = bestMatch.price;
        } else {
            finalPrice = bestMatch.variants[0].price;
            matchedVariantName = bestMatch.variants[0].name;
            finalDuration = bestMatch.variants[0].estimatedDuration || finalDuration;
            console.log(`[searchServiceByKeywordTool] Base price is 0 or undefined. Using first variant: ${matchedVariantName}`);
        }

      } else { // No variants, use base price
         finalPrice = bestMatch.price;
      }
    } else {
      // No variants for the service
      finalPrice = bestMatch.price;
    }
    
    console.log(`[searchServiceByKeywordTool] Final price for "${bestMatch.name}" (Size: ${size || 'any'}, Variant: ${matchedVariantName || 'N/A'}): ${finalPrice}`);

    if (finalPrice === undefined) {
        console.warn(`[searchServiceByKeywordTool] Could not determine a price for "${bestMatch.name}" with keyword "${keyword}" and size "${size}".`);
    }

    return {
      name: bestMatch.name,
      description: bestMatch.description || undefined,
      price: finalPrice,
      size: size, // Echo back the input size
      duration: finalDuration,
      variantMatched: matchedVariantName,
    };
  }
);
