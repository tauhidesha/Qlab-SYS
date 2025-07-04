// src/ai/utils/humanHandoverTool.ts
'use server';

import { updateSession } from './session';

const BOS_MAMAT_NUMBER = '628179481010'; 
const SNOOZE_DURATION_MS = 60 * 60 * 1000; // 1 jam

export async function notifyBosMamat(senderNumber: string, customerMessage: string): Promise<void> {
    console.log(`[Handover] Memicu notifikasi ke Bos Mamat untuk nomor ${senderNumber}`);
    
    // SEMUA LOGIKA URL HARUS BERADA DI DALAM FUNGSI INI
    const baseUrl = process.env.WHATSAPP_SERVER_URL;

    if (!baseUrl) {
        console.error('[Handover Error] Konfigurasi error: WHATSAPP_SERVER_URL tidak diatur.');
        return; 
    }

    const endpoint = `${baseUrl}/send-manual-message`;

    const messageToMamat = `⚠️ Bro, ada pelanggan (${senderNumber}) butuh bantuan lo. Pesan terakhirnya: "${customerMessage}". Cek WA sekarang!`;

    try {
        await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                number: BOS_MAMAT_NUMBER,
                message: messageToMamat,
            }),
        });
        console.log('[Handover] Notifikasi ke Bos Mamat berhasil dikirim.');
    } catch (error) {
        console.error('[Handover Error] Gagal mengirim notifikasi ke Bos Mamat:', error);
    }
}

export async function setSnoozeMode(senderNumber: string): Promise<void> {
    const snoozeUntil = Date.now() + SNOOZE_DURATION_MS;
    try {
        await updateSession(senderNumber, { snoozeUntil });
        console.log(`[Handover] Zoya di-snooze untuk nomor ${senderNumber} sampai ${new Date(snoozeUntil).toLocaleTimeString('id-ID')}`);
    } catch (error) {
        console.error('[Handover Error] Gagal update sesi untuk snooze mode:', error);
    }
}