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
  const bosMamatNumber = process.env.BOS_MAMAT_NUMBER;

  if (!bosMamatNumber) {
    console.error('[sendMessageToBosMamat] BOS_MAMAT_NUMBER belum diatur di .env');
    return;
  }

  const message = `
📩 *Zoya Butuh Bantuan Bos Mamat*

Pelanggan *${customerNumber}* nanya:
"${question}"

Zoya belum yakin jawabannya${reason ? `, karena:\n_${reason}_` : ''}

Kalau udah siap jawaban, balas aja langsung di sini ya. Nanti Zoya terusin ke pelanggan. 🙏
  `.trim();

  const result = await sendWhatsAppMessage(bosMamatNumber, message);

  if (!result.success) {
    console.error('[sendMessageToBosMamat] Gagal kirim pesan ke Bos Mamat:', result.error);
  }
}
