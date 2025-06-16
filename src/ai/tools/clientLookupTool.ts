
'use server';
/**
 * @fileOverview Genkit tool for looking up client details from Firestore.
 */
import {ai}from '@/ai/genkit';
import {z}from 'genkit';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Client, Motorcycle } from '@/types/client';
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
      let foundClient: Client | null = null;

      if (/^\+?[0-9\s-]{7,}$/.test(searchTerm)) {
        const phoneQuery = query(clientsRef, where("phone", "==", searchTerm), limit(1));
        const phoneSnapshot = await getDocs(phoneQuery);
        if (!phoneSnapshot.empty) {
          foundClient = { id: phoneSnapshot.docs[0].id, ...phoneSnapshot.docs[0].data() } as Client;
        }
      }

      if (!foundClient) {
        const nameQuery = query(clientsRef);
        const nameSnapshot = await getDocs(nameQuery);
        const searchTermLower = searchTerm.toLowerCase();
        for (const doc of nameSnapshot.docs) {
            const clientData = { id: doc.id, ...doc.data() } as Client;
            if (clientData.name.toLowerCase().includes(searchTermLower)) {
                foundClient = clientData;
                break;
            }
        }
      }

      if (foundClient) {
        console.log(`ClientLookupTool: Ditemukan klien: ${foundClient.name}`);

        let mappedMotorcycles: ClientInfo['motorcycles'] = undefined;
        if (Array.isArray(foundClient.motorcycles)) {
            mappedMotorcycles = foundClient.motorcycles.map(m => ({ name: m.name, licensePlate: m.licensePlate }));
        }

        const result: ClientInfo = {
          id: foundClient.id,
          name: foundClient.name,
          phone: foundClient.phone,
          loyaltyPoints: foundClient.loyaltyPoints || 0,
          motorcycles: mappedMotorcycles,
          lastVisit: foundClient.lastVisit || undefined,
        };

        try {
            ClientInfoSchema.parse(result);
            return result;
        } catch (zodError) {
            console.error("ClientLookupTool: Zod validation error for found client:", zodError);
            return null;
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
