
/**
 * @fileOverview Genkit tool for finding the size of a motorcycle model.
 * This tool is intended to be used by flows.
 *
 * - cariSizeMotorTool - The Genkit tool definition.
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

async function findMotorSize(input: CariSizeMotorInput): Promise<CariSizeMotorOutput> {
    const { namaMotor } = input;
    const namaMotorLower = namaMotor.toLowerCase().trim();
    console.log(`[findMotorSize Tool] Mencari ukuran untuk: "${namaMotorLower}"`);

    if (!db) {
      console.error("[findMotorSize Tool] Firestore DB (db) is not initialized.");
      return { success: false, message: "Database tidak terhubung, tidak bisa mencari ukuran motor." };
    }

    try {
      const vehicleTypesRef = collection(db, 'vehicleTypes');
      let q;
      let querySnapshot;
      let foundVehicleData: any = null;

      // Coba cari berdasarkan alias dulu
      q = firestoreQuery(vehicleTypesRef, where('aliases', 'array-contains', namaMotorLower), limit(1));
      querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        foundVehicleData = querySnapshot.docs[0].data();
      } else {
        // Jika tidak ketemu di alias, coba cari berdasarkan model_lowercase (jika ada field itu)
        // Atau bisa juga ambil semua lalu filter, tapi kurang efisien.
        // Untuk contoh ini, kita asumsikan ada model_lowercase atau kita ambil semua
        const allVehiclesSnapshot = await getDocs(vehicleTypesRef);
        for (const doc of allVehiclesSnapshot.docs) {
          const vehicle = doc.data();
          if (vehicle.model && vehicle.model.toLowerCase() === namaMotorLower) {
            foundVehicleData = vehicle;
            break;
          }
           // Check model_lowercase as fallback
          if (vehicle.model_lowercase && vehicle.model_lowercase === namaMotorLower) {
            foundVehicleData = vehicle;
            break;
          }
        }
      }

      if (foundVehicleData && foundVehicleData.size) {
        console.log(`[findMotorSize Tool] Ditemukan: ${foundVehicleData.model} ukuran ${foundVehicleData.size}`);
        return {
          success: true,
          size: foundVehicleData.size,
          message: `Motor ${foundVehicleData.model} (${namaMotor}) termasuk ukuran ${foundVehicleData.size}.`,
          vehicleModelFound: foundVehicleData.model,
        };
      } else {
        console.log(`[findMotorSize Tool] Ukuran untuk "${namaMotor}" tidak ditemukan.`);
        return {
          success: false,
          message: `Maaf, Zoya tidak menemukan ukuran untuk motor "${namaMotor}". Mungkin bisa coba nama model yang lebih spesifik atau umum?`,
        };
      }
    } catch (error) {
      console.error("[findMotorSize Tool] Error saat mencari ukuran motor:", error);
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
  findMotorSize
);
