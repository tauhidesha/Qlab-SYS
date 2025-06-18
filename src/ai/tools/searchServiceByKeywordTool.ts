
'use server';
/**
 * @fileOverview Genkit tool for searching services by keyword and optional size/paint type.
 * - searchServiceByKeywordTool - The Genkit tool definition.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { db } from '@/lib/firebase'; // Use client-side SDK
import { collection, getDocs, query as firestoreQuery } from 'firebase/firestore'; // Use client-side SDK functions
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
  async (input: SearchServiceInput): Promise<SearchServiceOutput> => {
    if (!db) {
      throw new Error("[searchServiceByKeywordTool.ts] FATAL: Client Firestore 'db' is not available. Firebase Client init failed or import order issue.");
    }

    const { keyword, size, paintType } = input;
    console.log(`[searchServiceByKeywordTool] Searching for keyword: "${keyword}", size: "${size || 'any'}", paintType: "${paintType || 'any'}"`);
    
    const servicesCollectionRef = collection(db, 'services');
    const snapshot = await getDocs(firestoreQuery(servicesCollectionRef)); 
    
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
          // Check if variant name itself contains the keyword (e.g., keyword "doff", variant "Coating Doff")
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
    console.log(`[searchServiceByKeywordTool] Best match found for keyword "${keyword}": ${bestMatch.name} with score ${highestScore}`);

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
        const variantToUse = suitableVariants[0]; 
        finalPrice = variantToUse.price;
        matchedVariantName = variantToUse.name; 
        finalDuration = variantToUse.estimatedDuration || finalDuration;
      } else if (keyword.toLowerCase().includes("coating") && (size || paintType)) {
         console.log(`[searchServiceByKeywordTool] Coating query with size/paintType but no exact variant match for '${bestMatch.name}'. Price will be undefined.`);
         // finalPrice remains undefined, matchedVariantName remains undefined
      } else if (bestMatch.variants.length > 0 && (!size && !paintType)) {
        // This case: variants exist, but NO size AND NO paintType were provided by the user.
        // Fallback to base price of the main service if it exists and is > 0, otherwise use first variant's price.
        if (bestMatch.price && bestMatch.price > 0) {
            finalPrice = bestMatch.price;
            // matchedVariantName remains undefined as we are using the base service price
        } else {
            finalPrice = bestMatch.variants[0].price;
            matchedVariantName = bestMatch.variants[0].name;
            finalDuration = bestMatch.variants[0].estimatedDuration || finalDuration;
        }
      }
      // If suitableVariants is empty and it wasn't a coating query with specifics, or if size/paintType were not provided
      // and the above fallback didn't set a price (e.g. base price 0 and no variants), price remains undefined.
    } else {
      // No variants for the service, use base price of the bestMatch.
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

