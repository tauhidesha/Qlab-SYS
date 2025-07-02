// File: app/ai/utils/humanHandoverTool.ts
// BUAT FILE BARU INI

'use server';

import { updateSession } from './session'; // Asumsi file session ada di folder yang sama

const BOS_MAMAT_NUMBER = '628179481010';
// PENTING: Ganti localhost dengan URL publik jika dideploy.
const WHATSAPP_API_ENDPOINT = 'http://localhost:3000/send-message'; 
const SNOOZE_DURATION_MS = 60 * 60 * 1000; // 1 jam

/**
 * Mengirim notifikasi ke Bos Mamat bahwa ada pelanggan yang butuh bantuan.
 * @param senderNumber - Nomor pelanggan yang butuh bantuan.
 * @param customerMessage - Pesan terakhir dari pelanggan.
 */
export async function notifyBosMamat(senderNumber: string, customerMessage: string): Promise<void> {
    console.log(`[Handover] Memicu notifikasi ke Bos Mamat untuk nomor ${senderNumber}`);
    
    const messageToMamat = `⚠️ Bro, ada pelanggan (${senderNumber}) butuh bantuan lo. Pesan terakhirnya: "${customerMessage}". Cek WA sekarang!`;

    try {
        // Ini adalah panggilan API ke service whatsapp-web.js lo
        const response = await fetch(WHATSAPP_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                number: BOS_MAMAT_NUMBER,
                message: messageToMamat,
            }),
        });

        if (!response.ok) {
            throw new Error(`API WhatsApp merespons dengan status ${response.status}`);
        }
        console.log('[Handover] Notifikasi ke Bos Mamat berhasil dikirim.');

    } catch (error) {
        console.error('[Handover Error] Gagal mengirim notifikasi ke Bos Mamat:', error);
        // Gagal kirim notif ke lo jangan sampai menghentikan alur ke pelanggan
    }
}

/**
 * Mengaktifkan mode diam untuk Zoya selama 1 jam pada sesi pelanggan.
 * @param senderNumber - Nomor pelanggan yang sesinya akan di-snooze.
 */
export async function setSnoozeMode(senderNumber: string): Promise<void> {
    const snoozeUntil = Date.now() + SNOOZE_DURATION_MS;
    await updateSession(senderNumber, { snoozeUntil });
    console.log(`[Handover] Zoya di-snooze untuk nomor ${senderNumber} sampai ${new Date(snoozeUntil).toLocaleTimeString('id-ID')}`);
}