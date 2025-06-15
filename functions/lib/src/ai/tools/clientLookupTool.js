"use strict";
'use server';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientDetailsTool = void 0;
/**
 * @fileOverview Genkit tool for looking up client details from Firestore.
 */
const genkit_1 = require("@/ai/genkit");
const genkit_2 = require("genkit");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("@/lib/firebase");
const aiToolSchemas_1 = require("@/types/aiToolSchemas");
const ClientLookupInputSchema = genkit_2.z.object({
    searchQuery: genkit_2.z.string().describe("Nama atau nomor telepon klien yang ingin dicari. Jika nomor telepon, harus angka saja atau dengan +62. Jika nama, bisa nama lengkap atau sebagian."),
});
exports.getClientDetailsTool = genkit_1.ai.defineTool({
    name: 'getClientDetailsTool',
    description: 'Mencari dan mengembalikan detail klien berdasarkan nama atau nomor telepon. Berguna untuk menjawab pertanyaan pelanggan tentang data mereka seperti poin loyalitas, motor terdaftar, atau histori layanan (jika ada).',
    inputSchema: ClientLookupInputSchema,
    outputSchema: genkit_2.z.union([aiToolSchemas_1.ClientInfoSchema, genkit_2.z.null()]).describe("Objek berisi detail klien, atau null jika tidak ditemukan."),
}, async (input) => {
    if (!input.searchQuery || input.searchQuery.trim() === '') {
        console.log("ClientLookupTool: Query pencarian klien kosong.");
        return null;
    }
    const searchTerm = input.searchQuery.trim();
    console.log(`ClientLookupTool: Mencari klien dengan query: "${searchTerm}"`);
    try {
        const clientsRef = (0, firestore_1.collection)(firebase_1.db, 'clients');
        let q;
        let foundClient = null;
        // Basic check if it's a phone number (contains mostly digits)
        if (/^\+?[0-9\s-]{7,}$/.test(searchTerm)) {
            // Try to match phone number
            // Firestore doesn't support partial matches on phone numbers easily.
            // We might need to fetch and filter or rely on exact matches if phone format is consistent.
            // For now, let's try an exact match on the 'phone' field.
            // This assumes phone numbers are stored consistently.
            const phoneQuery = (0, firestore_1.query)(clientsRef, (0, firestore_1.where)("phone", "==", searchTerm), (0, firestore_1.limit)(1));
            const phoneSnapshot = await (0, firestore_1.getDocs)(phoneQuery);
            if (!phoneSnapshot.empty) {
                foundClient = { id: phoneSnapshot.docs[0].id, ...phoneSnapshot.docs[0].data() };
            }
        }
        // If not found by phone or if it wasn't a phone-like query, try by name
        if (!foundClient) {
            // Case-insensitive name search is also tricky. Let's do a simple equality for now.
            // A more robust solution would be needed for partial/fuzzy name matching.
            const nameQuery = (0, firestore_1.query)(clientsRef); // Fetch all and filter for demo purposes
            const nameSnapshot = await (0, firestore_1.getDocs)(nameQuery);
            const searchTermLower = searchTerm.toLowerCase();
            for (const doc of nameSnapshot.docs) {
                const clientData = { id: doc.id, ...doc.data() };
                if (clientData.name.toLowerCase().includes(searchTermLower)) {
                    foundClient = clientData;
                    break; // Take the first match
                }
            }
        }
        if (foundClient) {
            console.log(`ClientLookupTool: Ditemukan klien: ${foundClient.name}`);
            const result = {
                id: foundClient.id,
                name: foundClient.name,
                phone: foundClient.phone,
                loyaltyPoints: foundClient.loyaltyPoints || 0,
                motorcycles: foundClient.motorcycles?.map(m => ({ name: m.name, licensePlate: m.licensePlate })) || undefined,
                lastVisit: foundClient.lastVisit || undefined,
            };
            // Validate with Zod before returning
            try {
                aiToolSchemas_1.ClientInfoSchema.parse(result);
                return result;
            }
            catch (zodError) {
                console.error("ClientLookupTool: Zod validation error for found client:", zodError);
                return null;
            }
        }
        else {
            console.log(`ClientLookupTool: Tidak ada klien yang cocok dengan query "${searchTerm}".`);
            return null;
        }
    }
    catch (error) {
        console.error('ClientLookupTool: Error saat mengambil data klien dari Firestore:', error);
        return null;
    }
});
//# sourceMappingURL=clientLookupTool.js.map