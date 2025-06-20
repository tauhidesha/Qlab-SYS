
'use server';
/**
 * @fileOverview Genkit tool for finding the size of a motorcycle model.
 *
 * - cariSizeMotorTool - The Genkit tool definition.
 * - CariSizeMotorInputSchema - Zod schema for the tool's input.
 * - CariSizeMotorOutputSchema - Zod schema for the tool's output.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, where, getDocs, limit } from 'firebase/firestore';

export const CariSizeMotorInputSchema = z.object({
  namaMotor: z.string().min(1, "Nama motor tidak boleh kosong.").describe('Nama atau model motor yang ingin dicari ukurannya, contoh: NMAX, PCX, Vario.'),
});
export type CariSizeMotorInput = z.infer<typeof CariSizeMotorInputSchema>;

export const CariSizeMotorOutputSchema = z.object({
  success: z.boolean().describe('Apakah pencarian berhasil atau tidak.'),
  size: z.string().optional().describe('Ukuran motor (S, M, L, XL) jika ditemukan.'),
  message: z.string().describe('Pesan hasil pencarian, termasuk ukuran jika berhasil atau pesan error jika gagal.'),
  vehicleModelFound: z.string().optional().describe('Nama model motor yang sebenarnya ditemukan di database.'),
});
export type CariSizeMotorOutput = z.infer<typeof CariSizeMotorOutputSchema>;

// Fungsi ini TIDAK diexport, hanya digunakan oleh tool di bawah
async function findMotorSize(input: CariSizeMotorInput): Promise<CariSizeMotorOutput> {
    const { namaMotor } = input;
    const namaMotorLower = namaMotor.toLowerCase().trim();
    console.log(`[cariSizeMotorTool.fn] Mencari ukuran untuk: "${namaMotorLower}"`);

    if (!db) {
      console.error("[cariSizeMotorTool.fn] Firestore DB (db) is not initialized.");
      return { success: false, message: "Database tidak terhubung, tidak bisa mencari ukuran motor." };
    }

    try {
      const vehicleTypesRef = collection(db, 'vehicleTypes');
      let q;
      let querySnapshot;
      let foundVehicleData: any = null;

      // 1. Try searching by alias (case-insensitive as aliases should be stored in lowercase)
      q = firestoreQuery(vehicleTypesRef, where('aliases', 'array-contains', namaMotorLower), limit(1));
      querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        foundVehicleData = querySnapshot.docs[0].data();
      } else {
        // 2. If not found by alias, try searching by model_lowercase (exact match)
        console.log(`[cariSizeMotorTool.fn] Tidak ditemukan via alias, mencoba model_lowercase: "${namaMotorLower}"`);
        q = firestoreQuery(vehicleTypesRef, where('model_lowercase', '==', namaMotorLower), limit(1));
        querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          foundVehicleData = querySnapshot.docs[0].data();
        } else {
          // 3. Fallback: search by model name (case-insensitive by client-side filtering)
          console.log(`[cariSizeMotorTool.fn] Tidak ditemukan via model_lowercase, mencoba model (client-side filter): "${namaMotorLower}"`);
          const allVehiclesSnapshot = await getDocs(vehicleTypesRef); // Get all
          for (const doc of allVehiclesSnapshot.docs) {
            const vehicle = doc.data();
            if (vehicle.model && vehicle.model.toLowerCase() === namaMotorLower) {
              foundVehicleData = vehicle;
              break;
            }
          }
        }
      }

      if (foundVehicleData && foundVehicleData.size) {
        console.log(`[cariSizeMotorTool.fn] Ditemukan: Model "${foundVehicleData.model}", Size "${foundVehicleData.size}"`);
        return {
          success: true,
          size: foundVehicleData.size,
          message: `Motor ${foundVehicleData.model} (${namaMotor}) termasuk ukuran ${foundVehicleData.size}.`,
          vehicleModelFound: foundVehicleData.model,
        };
      } else {
        console.log(`[cariSizeMotorTool.fn] Ukuran motor untuk "${namaMotor}" tidak ditemukan.`);
        return {
          success: false,
          message: `Maaf, Zoya tidak menemukan ukuran untuk motor "${namaMotor}". Mungkin bisa coba nama model yang lebih spesifik atau umum?`,
        };
      }
    } catch (error) {
      console.error("[cariSizeMotorTool.fn] Error saat mencari ukuran motor:", error);
      return {
        success: false,
        message: "Terjadi kesalahan internal saat mencari ukuran motor. Coba lagi nanti.",
      };
    }
}

export const cariSizeMotorTool = ai.defineTool(
  {
    name: 'cariSizeMotor',
    description: 'Mencari ukuran (S, M, L, XL) untuk model motor tertentu. Gunakan tool ini jika perlu mengetahui ukuran motor untuk menentukan harga layanan atau informasi lain, atau jika user menanyakan ukuran motornya.',
    inputSchema: CariSizeMotorInputSchema,
    outputSchema: CariSizeMotorOutputSchema,
  },
  findMotorSize // Menggunakan fungsi terpisah untuk logika utama
);
