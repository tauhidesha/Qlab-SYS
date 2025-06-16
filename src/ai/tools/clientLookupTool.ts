
'use server';
/**
 * @fileOverview Genkit tool for looking up client details from Firestore.
 */
import {ai}from '@/ai/genkit';
import {z}from 'genkit';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Client, Motorcycle } from '@/types/client'; // Motorcycle type might be needed
import { ClientInfoSchema, type ClientInfo } from '@/types/aiToolSchemas';

const ClientLookupInputSchema = z.object({
  searchQuery: z.string().describe("Nama atau nomor telepon klien yang ingin dicari. Jika nomor telepon, harus angka saja atau dengan +62. Jika nama, bisa nama lengkap atau sebagian."),
});

export const getClientDetailsTool = ai.defineTool(
  {
    name: 'getClientDetailsTool',
    description: 'Mencari dan mengembalikan detail klien berdasarkan nama atau nomor telepon. Berguna untuk menjawab pertanyaan pelanggan tentang data mereka seperti poin loyalitas, motor terdaftar, atau histori layanan (jika ada).',
    inputSchema: ClientLookupInputSchema,
    outputSchema: z.union([ClientInfoSchema, z.null()]).describe("Objek berisi detail klien, atau null jika tidak ditemukan."),
  },
  async (input) => {
    if (!input.searchQuery || input.searchQuery.trim() === '') {
      console.log("ClientLookupTool: Query pencarian klien kosong.");
      return null;
    }
    const searchTerm = input.searchQuery.trim();
    console.log(`ClientLookupTool: Mencari klien dengan query: "${searchTerm}"`);

    try {
      const clientsRef = collection(db, 'clients');
      let q;
      let foundClientData: Client | null = null; // Use a more specific type if available, e.g., your Client type

      // Basic check if it's a phone number (contains mostly digits)
      if (/^\+?[0-9\s-]{7,}$/.test(searchTerm)) {
        // Try to match phone number
        const phoneQuery = query(clientsRef, where("phone", "==", searchTerm), limit(1));
        const phoneSnapshot = await getDocs(phoneQuery);
        if (!phoneSnapshot.empty) {
          // Explicitly cast to Client type if you have one, or ensure data structure matches
          foundClientData = { id: phoneSnapshot.docs[0].id, ...phoneSnapshot.docs[0].data() } as Client;
        }
      }

      // If not found by phone or if it wasn't a phone-like query, try by name
      if (!foundClientData) {
        const nameQuery = query(clientsRef); // Fetch all and filter for demo purposes
        const nameSnapshot = await getDocs(nameQuery);
        const searchTermLower = searchTerm.toLowerCase();
        for (const doc of nameSnapshot.docs) {
            // Explicitly cast to Client type
            const clientData = { id: doc.id, ...doc.data() } as Client;
            if (clientData.name && clientData.name.toLowerCase().includes(searchTermLower)) {
                foundClientData = clientData;
                break; // Take the first match
            }
        }
      }

      if (foundClientData) {
        console.log(`ClientLookupTool: Ditemukan klien: ${foundClientData.name}`);

        let mappedMotorcycles: ClientInfo['motorcycles'] = undefined;
        // Ensure motorcycles is an array before mapping
        if (Array.isArray(foundClientData.motorcycles)) {
            mappedMotorcycles = foundClientData.motorcycles.map(m => ({ name: m.name, licensePlate: m.licensePlate }));
        } else if (foundClientData.motorcycles) {
            console.warn(`ClientLookupTool: motorcycles field for client ${foundClientData.id} is not an array, skipping.`);
        }


        const result: ClientInfo = {
          id: foundClientData.id,
          name: foundClientData.name,
          phone: foundClientData.phone,
          loyaltyPoints: foundClientData.loyaltyPoints || 0,
          motorcycles: mappedMotorcycles, // Use the safely mapped motorcycles
          lastVisit: foundClientData.lastVisit || undefined,
        };

        // Validate with Zod before returning
        try {
            ClientInfoSchema.parse(result);
            return result;
        } catch (zodError: any) { // Catch any error from Zod
            console.error("ClientLookupTool: Zod validation error for found client:", zodError);
            return null; // Or handle error appropriately
        }
      } else {
        console.log(`ClientLookupTool: Tidak ada klien yang cocok dengan query "${searchTerm}".`);
        return null;
      }
    } catch (error) {
      console.error('ClientLookupTool: Error saat mengambil data klien dari Firestore:', error);
      return null;
    }
  }
);
