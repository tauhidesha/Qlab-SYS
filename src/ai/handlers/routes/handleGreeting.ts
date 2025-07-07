// File: src/ai/handlers/routes/handleGreeting.ts

import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';

export const handleGreeting: RouteHandlerFn = async ({ session }) => {
  // --- PERBAIKAN: Sapaan Personal ---
  // Cek apakah kita sudah tahu nama pelanggan dari sesi
  const clientName = session?.senderName;

  // Susun sapaan berdasarkan apakah nama ada atau tidak
  const greeting = clientName ? `Halo, bro ${clientName}! ` : 'Halo bro! ';
  
  const replyMessage =
    greeting +
    'Dengan Zoya di sini! 😎 Ada yang bisa Zoya bantu? Mau tanya-tanya soal detailing, repaint, atau mau langsung booking biar motornya makin ganteng?';
  // --- AKHIR PERBAIKAN ---

  return {
    reply: { message: replyMessage },
    updatedSession: { ...session, lastRoute: 'greeting' } as SessionData,
  };
};
