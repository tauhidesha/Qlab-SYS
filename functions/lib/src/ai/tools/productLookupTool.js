"use strict";
'use server';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductServiceDetailsByNameTool = void 0;
/**
 * @fileOverview Genkit tool for looking up product or service details from Firestore.
 */
const genkit_1 = require("@/ai/genkit");
const genkit_2 = require("genkit");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("@/lib/firebase");
const aiToolSchemas_1 = require("@/types/aiToolSchemas");
const ProductLookupInputSchema = genkit_2.z.object({
    productName: genkit_2.z.string().describe("Nama produk atau layanan yang ingin dicari detailnya. Harus spesifik."),
});
exports.getProductServiceDetailsByNameTool = genkit_1.ai.defineTool({
    name: 'getProductServiceDetailsByNameTool',
    description: 'Mencari dan mengembalikan detail spesifik dari sebuah produk atau layanan berdasarkan namanya. Berguna untuk menjawab pertanyaan pelanggan tentang harga, durasi, ketersediaan, atau deskripsi item tertentu.',
    inputSchema: ProductLookupInputSchema,
    outputSchema: genkit_2.z.union([aiToolSchemas_1.ProductServiceInfoSchema, genkit_2.z.null()]).describe("Objek berisi detail produk/layanan, atau null jika tidak ditemukan."),
}, async (input) => {
    if (!input.productName || input.productName.trim() === '') {
        console.log("ProductLookupTool: Nama produk kosong.");
        return null;
    }
    console.log(`ProductLookupTool: Mencari produk/layanan dengan nama: "${input.productName}"`);
    try {
        const servicesRef = (0, firestore_1.collection)(firebase_1.db, 'services');
        const q = (0, firestore_1.query)(servicesRef);
        const querySnapshot = await (0, firestore_1.getDocs)(q);
        let foundItem = null;
        const searchTermLower = input.productName.toLowerCase();
        // Priority for exact matches or more specific variant matches
        let bestMatchCandidate = null;
        let bestMatchIsVariant = false;
        for (const doc of querySnapshot.docs) {
            const item = { id: doc.id, ...doc.data() };
            // Check variants first for more specific matches
            if (item.variants) {
                for (const variant of item.variants) {
                    const fullVariantName = `${item.name} - ${variant.name}`;
                    if (fullVariantName.toLowerCase().includes(searchTermLower)) {
                        const currentCandidateIsBetter = !bestMatchCandidate ||
                            (fullVariantName.toLowerCase() === searchTermLower && (!bestMatchIsVariant || bestMatchCandidate.name.toLowerCase() !== searchTermLower)) || // Exact variant match is best
                            (!bestMatchIsVariant && searchTermLower.length > (bestMatchCandidate.name?.length || 0)); // More specific partial variant match
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
                            if (fullVariantName.toLowerCase() === searchTermLower) { // Exact match, break all
                                foundItem = bestMatchCandidate;
                                break;
                            }
                        }
                    }
                }
            }
            if (foundItem)
                break; // Exact variant match found
            // Check base item name if no exact variant match yet
            if (item.name.toLowerCase().includes(searchTermLower)) {
                if (!bestMatchCandidate || // No candidate yet
                    (!bestMatchIsVariant && item.name.toLowerCase() === searchTermLower && bestMatchCandidate.name.toLowerCase() !== searchTermLower) || // Exact base name match is better than previous partial base
                    (!bestMatchIsVariant && item.name.length < (bestMatchCandidate.name?.length || Infinity)) // Shorter base name that includes term (less specific but could be what user meant)
                ) {
                    bestMatchCandidate = item;
                    bestMatchIsVariant = false;
                    if (item.name.toLowerCase() === searchTermLower) { // If it's an exact base name match, this is good enough for now
                        // Potentially could be overridden by an exact variant match later, but good for now
                    }
                }
            }
        }
        foundItem = bestMatchCandidate || foundItem; // Ensure foundItem gets the candidate if no exact variant break
        if (foundItem) {
            console.log(`ProductLookupTool: Ditemukan item: ${foundItem.name}`);
            const result = {
                id: foundItem.id,
                name: foundItem.name,
                type: foundItem.type,
                category: foundItem.category,
                price: foundItem.price,
                description: foundItem.description || undefined,
                pointsAwarded: foundItem.pointsAwarded || undefined,
                estimatedDuration: foundItem.estimatedDuration || undefined,
                // If foundItem is a specific variant, its 'variants' array was already deleted.
                // If it's a base item, include its variants.
                variants: bestMatchIsVariant ? undefined : foundItem.variants?.map(v => ({
                    name: v.name,
                    price: v.price,
                    pointsAwarded: v.pointsAwarded || undefined,
                    estimatedDuration: v.estimatedDuration || undefined,
                })) || undefined,
            };
            try {
                aiToolSchemas_1.ProductServiceInfoSchema.parse(result);
                return result;
            }
            catch (zodError) {
                console.error("ProductLookupTool: Zod validation error for found item:", zodError.errors);
                // console.error("ProductLookupTool: Data causing error:", JSON.stringify(result, null, 2));
                return null;
            }
        }
        else {
            console.log(`ProductLookupTool: Tidak ada produk/layanan yang cocok dengan nama "${input.productName}".`);
            return null;
        }
    }
    catch (error) {
        console.error('ProductLookupTool: Error saat mengambil data dari Firestore:', error);
        return null;
    }
});
//# sourceMappingURL=productLookupTool.js.map