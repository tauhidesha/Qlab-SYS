// interpreters/serviceMapper.ts

import { mapTermToOfficialService } from "@/ai/handlers/routes/lib/classifiers/mapTermToOfficialService";


/**
 * Fungsi untuk menebak nama layanan resmi berdasarkan isi pesan user.
 * Akan mengembalikan string nama layanan (jika dikenali) atau null.
 */
export function detectServiceName(message: string): string | null {
  return mapTermToOfficialService(message);
}
