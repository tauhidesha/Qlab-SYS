// src/ai/utils/sendMessageToBosMamat.ts

import { sendWhatsAppMessage } from '@/services/whatsappService';

export async function sendMessageToBosMamat({
  customerNumber,
  question,
  reason,
}: {
  customerNumber: string;
  question: string;
  reason?: string;
}) {
  const message = `
📩 *Zoya Butuh Bantuan Bos Mamat*

Pelanggan *${customerNumber}* nanya:
"${question}"

Zoya belum yakin jawabannya${reason ? `, karena:\n_${reason}_` : ''}

Kalau udah siap jawaban, balas aja langsung di sini ya. Nanti Zoya terusin ke pelanggan. 🙏
  `.trim();

  const bosMamatNumber = '628179481010'; // Ganti ke nomormu (format internasional TANPA +)

  const result = await sendWhatsAppMessage(bosMamatNumber, message);

  if (!result.success) {
    console.error('[sendMessageToBosMamat] Gagal kirim pesan ke Bos Mamat:', result.error);
  }
}
