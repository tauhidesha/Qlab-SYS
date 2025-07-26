// @file: src/ai/tools/updateCartTool.ts

import { z } from 'zod';
import { getSession, updateSession } from '../utils/session';

const InputSchema = z.object({
  services: z.array(z.string()).describe('Daftar lengkap layanan yang ada di keranjang.'),
  // Anda bisa tambahkan field lain di sini jika perlu, misal: motor, warna, dll.
});

async function implementation(input: z.infer<typeof InputSchema>, sessionData: { senderNumber: string }) {
  try {
    const { services } = InputSchema.parse(input);
    const { senderNumber } = sessionData;

    console.log(`[UpdateCartTool] Menerima perintah untuk mengupdate cart untuk ${senderNumber} dengan layanan:`, services);

    let session = await getSession(senderNumber);
    if (!session) {
      throw new Error(`Sesi tidak ditemukan untuk ${senderNumber}`);
    }

    session.cartServices = services; // Timpa cart dengan daftar baru yang paling update dari AI
    await updateSession(senderNumber, session);

    return {
      success: true,
      message: 'Keranjang berhasil di-update.',
    };

  } catch (error: any) {
    console.error('[UpdateCartTool] Error:', error);
    return { success: false, error: error.message };
  }
}

// Skema untuk OpenAI Assistant
export const updateCartToolDefinition = {
  type: 'function' as const,
  function: {
    name: 'updateCart',
    description: 'Gunakan tool ini untuk mengupdate atau menyinkronkan daftar layanan di keranjang belanja user. Panggil ini setiap kali user menambah, mengubah, atau mengkonfirmasi layanan.',
    parameters: {
      type: 'object',
      properties: {
        services: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Daftar LENGKAP semua layanan yang diinginkan user saat ini.'
        },
      },
      required: ['services'],
    },
  },
};

// Kita butuh sedikit modifikasi pada tool map agar bisa mengirim senderNumber
// Untuk sekarang, kita siapkan implementasinya
export const updateCartToolImplementation = implementation;
