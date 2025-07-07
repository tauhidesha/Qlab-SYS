// File: src/ai/handlers/routes/handlePromoBundleRequest.ts

import type { RouteHandlerFn } from './types';
import type { SessionData } from '../utils/session';
import { getPromoBundleDetails } from '@/ai/tools/getPromoBundleDetailsTool';
import allMotorsData from '@/../docs/daftarUkuranMotor.json';

// Fungsi helper untuk mengekstrak nama motor dari pesan
function extractMotorFromQuery(message: string): string | null {
    const lowerCaseMessage = message.toLowerCase();
    // Cari model motor yang paling panjang yang cocok untuk akurasi
    const foundMotor = (allMotorsData as any[])
        .map(m => m.model.toLowerCase())
        .sort((a, b) => b.length - a.length)
        .find(model => lowerCaseMessage.includes(model));
    
    return foundMotor || null;
}

export const handlePromoBundleRequest: RouteHandlerFn = async ({ session, message }) => {
  try {
    const customerMessage = message || '';

    const detectedMotor = extractMotorFromQuery(customerMessage);
    console.log(`[PromoHandler] Motor terdeteksi: ${detectedMotor}`);

    const result = await getPromoBundleDetails({
      motor_query: detectedMotor || 'umum',
    });

    // Cek dulu apakah tool berhasil menemukan promo
    if (!result.isPromoAvailable) {
      // Jika tidak ada promo, kembalikan catatannya sebagai balasan
      return {
        reply: {
          // --- PERBAIKAN DI SINI ---
          // Ubah 'message' menjadi 'suggestedReply' agar sesuai tipe
          suggestedReply: result.note,
        },
        updatedSession: { ...session, lastRoute: 'promo_bundle' } as SessionData,
      };
    }

    const combinedMessage = `${result.note}\n\n${result.summary ?? ''}`.trim();

    // Jika berhasil, simpan konteks yang benar ke sesi
    const updatedSession: SessionData = {
        ...session,
        lastRoute: 'promo_bundle',
        inquiry: {
          ...session?.inquiry,
          // Simpan nama layanan inti, bukan nama promo
          lastMentionedService: 'Repaint Bodi Halus', 
          // Hanya simpan motor jika berhasil dideteksi secara spesifik
          ...(result.motor_model && { lastMentionedMotor: result.motor_model }),
        },
    } as SessionData;

    return {
      reply: {
        // --- PERBAIKAN DI SINI ---
        // Ubah 'message' menjadi 'suggestedReply' agar sesuai tipe
        suggestedReply: combinedMessage,
      },
      updatedSession: updatedSession,
    };

  } catch (error: any) {
    console.error('[PromoHandler] Terjadi error tak terduga:', error);
    return {
      reply: {
        // --- PERBAIKAN DI SINI ---
        suggestedReply: 'Waduh, ada sedikit kendala teknis saat Zoya cek promo. Coba lagi sebentar ya, bro.',
      },
      updatedSession: session,
    };
  }
};
