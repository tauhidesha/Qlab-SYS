// File: src/ai/handlers/handlePromoBundleRequest.ts

import type { RouteHandlerFn } from './routes/types';
// --- INI PERBAIKANNYA ---
// Path diubah dari '../../utils/session' menjadi '../utils/session'
import type { SessionData } from '../utils/session';
// -------------------------

import { getPromoBundleDetails } from '@/ai/tools/getPromoBundleDetailsTool';
import allMotorsData from '@/../docs/daftarUkuranMotor.json';

// Gunakan 'input' standar yang sudah kita definisikan di types.ts
export const handlePromoBundleRequest: RouteHandlerFn = async ({ session, message }) => {
  // Ambil query dari 'message' agar konsisten dengan handler lain
  const motorQuery = message || '';

  // Deteksi kasar apakah user menyebut nama motor dari daftar
  const allModels = (allMotorsData as any[]).map(m => m.model.toLowerCase());
  const containsMotor = allModels.some(model => motorQuery.toLowerCase().includes(model));

  const result = await getPromoBundleDetails({
    motor_query: containsMotor ? motorQuery : 'umum',
  });

  const combinedMessage = `${result.note}\n\n${result.summary ?? ''}`.trim();

  // Pastikan return value sesuai dengan RouteHandlerOutput ({ reply: { message: ... } })
  return {
    reply: {
      message: combinedMessage,
    },
    updatedSession: {
      ...session,
      lastRoute: 'promo_bundle',
      inquiry: {
        ...session?.inquiry,
        ...(result.motor_model && { lastMentionedMotor: result.motor_model }),
      },
    } as SessionData,
  };
};