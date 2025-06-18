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
  paintType: z.enum(['doff', 'glossy']).optional().describe("Jenis cat motor (doff atau glossy) jika relevan, terutama untuk coating."),
});
export type SearchServiceInput = z.infer<typeof SearchServiceInputSchema>;

const SearchServiceOutputSchema = z.object({
  name: z.string().describe("Nama layanan yang ditemukan."),
  description: z.string().optional().describe("Deskripsi layanan."),
  price: z.number().optional().describe("Harga layanan untuk ukuran/jenis cat yang cocok (jika ada)."),
  size: z.enum(['S', 'M', 'L', 'XL']).optional().describe("Ukuran motor yang dicari (jika relevan dengan varian)."),
  duration: z.string().optional().describe("Estimasi durasi pengerjaan layanan."),
  variantMatched: z.string().optional().describe("Nama varian yang cocok (jika ada dan relevan, mis. 'Doff', 'Glossy', 'Ukuran M - Doff').")
});
export type SearchServiceOutput = z.infer<typeof SearchServiceOutputSchema>;

export const searchServiceByKeywordTool = ai.defineTool(
  {
    name: 'searchServiceByKeywordTool',
    description: 'Cari layanan berdasarkan keyword dari pelanggan dan (opsional) ukuran motor serta jenis cat. Berguna untuk menemukan layanan yang relevan beserta harganya.',
    inputSchema: SearchServiceInputSchema,
    outputSchema: SearchServiceOutputSchema,
  },
  async (input) => {
    const { keyword, size, paintType } = input;
    console.log(`[searchServiceByKeywordTool] Searching for keyword: "${keyword}", size: "${size || 'any'}", paintType: "${paintType || 'any'}"`);
    
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
        if (nameLower === keywordLower) currentScore += 15; 
      }
      if (svc.description?.toLowerCase().includes(keywordLower)) {
        currentScore += 3;
      }
      if (svc.category?.toLowerCase().includes(keywordLower)) {
        currentScore += 2;
      }
      if (svc.aliases && Array.isArray(svc.aliases)) {
        if (svc.aliases.some(alias => alias.toLowerCase().includes(keywordLower))) {
           currentScore += 8;
           if (svc.aliases.some(alias => alias.toLowerCase() === keywordLower)) currentScore += 7;
        }
      }
      if (svc.variants && svc.variants.length > 0) {
        svc.variants.forEach(variant => {
          if (variant.name.toLowerCase().includes(keywordLower)) {
            currentScore += 5; 
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
      throw new Error(`Layanan tidak ditemukan untuk kata kunci "${keyword}".`);
    }
    console.log(`[searchServiceByKeywordTool] Best match found: ${bestMatch.name} with score ${highestScore}`);

    let finalPrice: number | undefined = undefined;
    let matchedVariantName: string | undefined = undefined;
    let finalDuration = bestMatch.estimatedDuration || undefined;
    let finalDescription = bestMatch.description || undefined;

    if (bestMatch.variants && bestMatch.variants.length > 0) {
      let suitableVariants = bestMatch.variants;

      if (size) {
        suitableVariants = suitableVariants.filter(v => v.name.toLowerCase().includes(size.toLowerCase()));
      }
      if (paintType) {
        suitableVariants = suitableVariants.filter(v => v.name.toLowerCase().includes(paintType.toLowerCase()));
      }

      if (suitableVariants.length > 0) {
        const variantToUse = suitableVariants[0]; // Prefer the most specific match
        finalPrice = variantToUse.price;
        matchedVariantName = variantToUse.name; // This could be "Ukuran M - Doff"
        finalDuration = variantToUse.estimatedDuration || finalDuration;
        // Variant description could override base description if available, or append
        // finalDescription = variantToUse.description || finalDescription; 
      } else if (keyword.toLowerCase().includes("coating") && (size || paintType)) {
         // If specific variant for coating with size/paintType not found, return general info
         // Price will remain undefined, prompting Zoya to ask for more details or state price depends on type.
         console.log(`[searchServiceByKeywordTool] Coating query with size/paintType but no exact variant match. Returning general info for ${bestMatch.name}.`);
      } else if (bestMatch.variants.length > 0 && (!size && !paintType)) {
        // No specific filter, but variants exist. Maybe return base price or first variant.
        // Or, if it's coating, Zoya should ask more.
        // For now, if it's not coating or no specific filter, try base price or first variant.
        if (bestMatch.price && bestMatch.price > 0) {
            finalPrice = bestMatch.price;
        } else {
            finalPrice = bestMatch.variants[0].price;
            matchedVariantName = bestMatch.variants[0].name;
            finalDuration = bestMatch.variants[0].estimatedDuration || finalDuration;
        }
      }
    } else {
      // No variants for the service
      finalPrice = bestMatch.price;
    }
    
    console.log(`[searchServiceByKeywordTool] Final price for "${bestMatch.name}" (Keyword: ${keyword}, Size: ${size || 'any'}, Paint: ${paintType || 'any'}, MatchedVariant: ${matchedVariantName || 'N/A'}): ${finalPrice === undefined ? 'Not Found/Specific' : finalPrice}`);

    return {
      name: bestMatch.name,
      description: finalDescription,
      price: finalPrice,
      size: size, 
      duration: finalDuration,
      variantMatched: matchedVariantName,
    };
  }
);
