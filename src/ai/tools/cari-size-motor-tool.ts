
/**
 * @fileOverview Genkit tool for finding the size of a motorcycle model.
 * This tool is intended to be used by flows.
 *
 * - cariSizeMotorTool - The Genkit tool definition.
 * - findMotorSize - The actual function performing the lookup (exported for direct use).
 * - CariSizeMotorInput - Zod type for the tool's input.
 * - CariSizeMotorOutput - Zod type for the tool's output.
 */

import { ai } from '@/ai/genkit'; // Harus dari @/ai/genkit
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, where, getDocs, limit } from 'firebase/firestore';

// Schemas for the actual tool
const CariSizeMotorInputSchema = z.object({
  namaMotor: z.string().min(1, "Nama motor tidak boleh kosong.").describe('Nama atau model motor yang ingin dicari ukurannya, contoh: NMAX, PCX, Vario.'),
});
export type CariSizeMotorInput = z.infer<typeof CariSizeMotorInputSchema>;

const CariSizeMotorOutputSchema = z.object({
  success: z.boolean().describe('Apakah pencarian berhasil atau tidak.'),
  size: z.string().optional().describe('Ukuran motor (S, M, L, XL) jika ditemukan.'),
  message: z.string().describe('Pesan hasil pencarian, termasuk ukuran jika berhasil atau pesan error jika gagal.'),
  vehicleModelFound: z.string().optional().describe('Nama model motor yang sebenarnya ditemukan di database.'),
});
export type CariSizeMotorOutput = z.infer<typeof CariSizeMotorOutputSchema>;

// Export this function so it can be called directly from other flows if needed.
export async function findMotorSize(input: CariSizeMotorInput): Promise<CariSizeMotorOutput> {
    const { namaMotor } = input;
    const namaMotorLower = namaMotor.toLowerCase().trim();
    console.log(`[findMotorSize Tool Function] Mencari ukuran untuk: "${namaMotorLower}"`);

    if (!db) {
      console.error("[findMotorSize Tool Function] Firestore DB (db) is not initialized.");
      return { success: false, message: "Database tidak terhubung, tidak bisa mencari ukuran motor." };
    }

    try {
      const vehicleTypesRef = collection(db, 'vehicleTypes');
      let foundVehicleData: any = null;

      // 1. Coba cari berdasarkan model_lowercase (lebih spesifik dan efisien jika field ada)
      console.log(`[findMotorSize Tool Function] Attempt 1: Querying by model_lowercase == "${namaMotorLower}"`);
      const modelLowercaseQuery = firestoreQuery(vehicleTypesRef, where('model_lowercase', '==', namaMotorLower), limit(1));
      let querySnapshot = await getDocs(modelLowercaseQuery);

      if (!querySnapshot.empty) {
        foundVehicleData = querySnapshot.docs[0].data();
        console.log(`[findMotorSize Tool Function] Found via model_lowercase: ${foundVehicleData.model}`);
      } else {
        // 2. Jika tidak ketemu, coba cari berdasarkan alias
        console.log(`[findMotorSize Tool Function] Attempt 2: Querying by aliases array-contains "${namaMotorLower}"`);
        const aliasQuery = firestoreQuery(vehicleTypesRef, where('aliases', 'array-contains', namaMotorLower), limit(1));
        querySnapshot = await getDocs(aliasQuery);
        if (!querySnapshot.empty) {
          foundVehicleData = querySnapshot.docs[0].data();
          console.log(`[findMotorSize Tool Function] Found via aliases: ${foundVehicleData.model}`);
        }
      }

      // 3. Fallback: Jika belum ketemu dan untuk data lama yang mungkin belum punya model_lowercase,
      //    iterasi dan cek model (case-insensitive). Ini kurang efisien.
      if (!foundVehicleData) {
        console.log(`[findMotorSize Tool Function] Attempt 3: Fallback to iterating and checking model.toLowerCase() for "${namaMotorLower}" (less efficient).`);
        const allVehiclesSnapshot = await getDocs(vehicleTypesRef); // Pertimbangkan untuk membatasi ini jika koleksi sangat besar
        for (const doc of allVehiclesSnapshot.docs) {
          const vehicle = doc.data();
          if (vehicle.model && vehicle.model.toLowerCase() === namaMotorLower) {
            foundVehicleData = vehicle;
            console.log(`[findMotorSize Tool Function] Found via iteration on model.toLowerCase(): ${foundVehicleData.model}`);
            break;
          }
        }
      }

      if (foundVehicleData && foundVehicleData.size) {
        console.log(`[findMotorSize Tool Function] Final Result: ${foundVehicleData.model} (Size: ${foundVehicleData.size}) for input "${namaMotor}"`);
        return {
          success: true,
          size: foundVehicleData.size,
          message: `Motor ${foundVehicleData.model} (dari input "${namaMotor}") termasuk ukuran ${foundVehicleData.size}.`,
          vehicleModelFound: foundVehicleData.model,
        };
      } else {
        console.log(`[findMotorSize Tool Function] Ukuran untuk "${namaMotor}" tidak ditemukan setelah semua attempt.`);
        return {
          success: false,
          message: `Maaf, Zoya tidak menemukan ukuran untuk motor "${namaMotor}". Mungkin bisa coba nama model yang lebih spesifik atau umum?`,
        };
      }
    } catch (error) {
      console.error("[findMotorSize Tool Function] Error saat mencari ukuran motor:", error);
      return {
        success: false,
        message: "Terjadi kesalahan internal saat mencari ukuran motor. Coba lagi nanti.",
      };
    }
}

export const cariSizeMotorTool = ai.defineTool(
  {
    name: 'cariSizeMotor',
    description: 'Mencari ukuran (S, M, L, XL) untuk model motor tertentu. Gunakan jika user bertanya ukuran motornya, atau jika perlu tahu ukuran motor untuk menentukan harga layanan atau informasi lain.',
    inputSchema: CariSizeMotorInputSchema,
    outputSchema: CariSizeMotorOutputSchema,
  },
  findMotorSize // Pass the actual function here
);
