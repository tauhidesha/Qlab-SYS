// src/ai/utils/humanHandoverTool.ts
'use server';

import { updateSession } from './session';

const BOS_MAMAT_NUMBER = '628179481010';
const SNOOZE_DURATION_MS = 60 * 60 * 1000; // 1 jam

export async function notifyBosMat(
  senderNumber: string,
  customerMessage: string,
  reason?: string
): Promise<void> {
  console.log(`[Handover] Memicu notifikasi ke BosMat untuk nomor ${senderNumber}`);

  const baseUrl = process.env.WHATSAPP_SERVER_URL;

  if (!baseUrl) {
    console.error('[Handover Error] Konfigurasi error: WHATSAPP_SERVER_URL tidak diatur.');
    return;
  }

  const endpoint = `${baseUrl}/send-manual-message`;

  const messageToMamat = `
📩 *Zoya Butuh Bantuan BosMat*

Pelanggan *${senderNumber}* nanya:
"${customerMessage}"

Zoya belum yakin jawabannya${reason ? `, karena:\n_${reason}_` : ''}

Kalau udah siap jawaban, balas aja langsung di sini ya. Nanti Zoya terusin ke pelanggan. 🙏
  `.trim();

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: BOS_MAMAT_NUMBER,
        message: messageToMamat,
      }),
    });
    console.log('[Handover] Notifikasi ke BosMat berhasil dikirim.');
  } catch (error) {
    console.error('[Handover Error] Gagal mengirim notifikasi ke BosMat:', error);
  }
}

export async function setSnoozeMode(senderNumber: string): Promise<void> {
  const snoozeUntil = Date.now() + SNOOZE_DURATION_MS;
  try {
    await updateSession(senderNumber, { snoozeUntil });
    console.log(
      `[Handover] Zoya di-snooze untuk nomor ${senderNumber} sampai ${new Date(
        snoozeUntil
      ).toLocaleTimeString('id-ID')}`
    );
  } catch (error) {
    console.error('[Handover Error] Gagal update sesi untuk snooze mode:', error);
  }
}
