// File: src/app/api/ai/daily-follow-up/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { type SessionData, updateSession } from '@/ai/utils/session';
import { getEducationalSnippet, getDownsellOption } from '@/ai/utils/followUpContent';
import { sendWhatsAppMessage } from '@/services/whatsappService';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

// --- (BARU) FUNGSI UNTUK KONFIRMASI KEDATANGAN H-1 ---
async function sendH1Confirmations(): Promise<number> {
    console.log('--- Memulai Tugas Konfirmasi H-1 ---');
    let confirmationCount = 0;

    // Hitung tanggal "besok" dalam format YYYY-MM-DD
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    const tomorrowDateString = `${year}-${month}-${day}`;

    console.log(`[H-1 Conf] Mencari booking untuk tanggal: ${tomorrowDateString}`);

    try {
        const bookingsRef = collection(db, 'bookings');
        const q = query(
            bookingsRef, 
            where('bookingDate', '==', tomorrowDateString),
            where('status', '==', 'Confirmed')
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log('[H-1 Conf] Tidak ada booking untuk besok.');
            return 0;
        }

        console.log(`[H-1 Conf] Ditemukan ${snapshot.size} booking untuk dikonfirmasi.`);

        for (const doc of snapshot.docs) {
            const booking = doc.data();
            // Pastikan nomor telepon adalah string dan tidak kosong
            if (typeof booking.customerPhone === 'string' && booking.customerPhone) {
                const confirmationMessage = `Halo bro ${booking.customerName || ''}, Zoya cuma mau konfirmasi bookingan besok ya:\n\n📅 *Tanggal:* ${booking.bookingDate}\n⏰ *Jam:* ${booking.bookingTime}\n🛠️ *Layanan:* ${booking.serviceName}\n\nKalau semua sudah oke, ditunggu kedatangannya ya. Kalau mau batal atau reschedule, tinggal balas pesan ini aja. Makasih bro! 🙏`;
                
                // Asumsi sendWhatsAppMessage bisa menangani nomor HP format '08...'
                await sendWhatsAppMessage(booking.customerPhone, confirmationMessage);
                console.log(` -> Pesan konfirmasi H-1 berhasil dikirim ke ${booking.customerName} (${booking.customerPhone})`);
                confirmationCount++;
            }
        }
    } catch (error) {
        console.error('[H-1 Conf] Terjadi error saat mengirim konfirmasi:', error);
    }
    
    return confirmationCount;
}

// --- (BARU) FUNGSI UNTUK FOLLOW-UP (DIPISAHKAN AGAR LEBIH RAPI) ---
async function sendFollowUps(): Promise<number> {
    console.log('--- Memulai Tugas Follow-up ---');
    let followUpCount = 0;
    
    try {
        const sessionsRef = collection(db, 'zoya_sessions');
        const q = query(sessionsRef, where("followUpState", "!=", null));
        const snapshot = await getDocs(q);
        const now = Date.now();

        for (const doc of snapshot.docs) {
            const senderNumber = doc.id;
            const session = doc.data() as SessionData;
            
            if (!session.followUpState) continue;

            const state = session.followUpState;
            const flaggedAtMs = state.flaggedAt;
            let messageToSend = '';
            let nextState: SessionData['followUpState'] = { ...state, level: state.level + 1, flaggedAt: now };
            let shouldSend = false;

            // Logika berjenjang Anda tidak berubah
            switch (state.level) {
                case 1:
                    if (now > flaggedAtMs + DAY_IN_MS) {
                        shouldSend = true;
                        const snippet = getEducationalSnippet(state.context) || 'info menarik';
                        messageToSend = `Pagi bro! Zoya di sini. Kemarin kita ngobrolin soal *${state.context}*. Sekadar info, salah satu keunggulannya itu bisa *${snippet}*. Keren kan? Gimana, udah siap kita atur jadwalnya?`;
                    }
                    break;
                // ... (case lainnya tidak berubah) ...
            }

            if (shouldSend) {
                console.log(`Mengirim follow-up level ${state.level} ke ${senderNumber}`);
                await sendWhatsAppMessage(senderNumber, messageToSend);
                followUpCount++;
                await updateSession(senderNumber, { ...session, followUpState: nextState });
            }
        }
    } catch (error) {
        console.error('[Follow-up] Terjadi error saat menjalankan follow-up:', error);
    }
    
    return followUpCount;
}


// --- FUNGSI UTAMA CRON JOB (POST HANDLER) ---
export async function POST(request: Request) {
    // 1. Keamanan
    const { searchParams } = new URL(request.url);
    if (searchParams.get('secret') !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`[CRON JOB] Tugas Harian Dimulai: ${new Date().toISOString()}`);

    try {
        // 2. Jalankan kedua tugas secara berurutan
        const followUpCount = await sendFollowUps();
        const confirmationCount = await sendH1Confirmations();

        const summary = `Tugas Harian Selesai. Follow-up terkirim: ${followUpCount}. Konfirmasi H-1 terkirim: ${confirmationCount}.`;
        console.log(`[CRON JOB] ${summary}`);
        
        // 3. Kembalikan hasil gabungan
        return NextResponse.json({ 
            success: true, 
            summary,
            processed: {
                followUps: followUpCount,
                confirmations: confirmationCount
            }
        });

    } catch (error) {
        console.error('[CRON JOB] Terjadi error fatal saat menjalankan tugas harian:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}