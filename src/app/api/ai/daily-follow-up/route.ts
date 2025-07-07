// src/app/api/ai/daily-follow-up/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { type SessionData, updateSession } from '@/ai/utils/session';
import { getEducationalSnippet, getDownsellOption } from '@/ai/utils/followUpContent';
import { sendWhatsAppMessage } from '@/services/whatsappService';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
    // 1. KEAMANAN: Memastikan hanya Vercel Cron yang bisa menjalankan ini
    const { searchParams } = new URL(request.url);
    if (searchParams.get('secret') !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`[CRON JOB] Daily Follow-up Dimulai: ${new Date().toISOString()}`);
    let processedCount = 0;

    try {
        const sessionsRef = collection(db, 'zoya_sessions');
        // 2. AMBIL SEMUA SESI YANG PERLU DI-FOLLOW-UP
        const q = query(sessionsRef, where("followUpState", "!=", null));
        const snapshot = await getDocs(q);

        const now = Date.now();

        for (const doc of snapshot.docs) {
            const senderNumber = doc.id;
            const session = doc.data() as SessionData;
            
            if (!session.followUpState) continue; // Lewati jika state tidak valid

            const state = session.followUpState;
             // --- INI PERBAIKANNYA ---
            // Ubah Firestore Timestamp (jika ada) menjadi angka milidetik agar bisa dibandingkan
            const flaggedAtMs = state.flaggedAt;
            // 
            let messageToSend = '';
            let nextState: SessionData['followUpState'] = { ...state, level: state.level + 1, flaggedAt: now };
            let shouldSend = false;

            // 3. LOGIKA BERJENJANG
            switch (state.level) {
                case 1: // Follow-up Hari ke-1
                    if (now > state.flaggedAt + DAY_IN_MS) {
                        shouldSend = true;
                        const snippet = getEducationalSnippet(state.context) || 'info menarik seputar layanan kami';
                        messageToSend = `Pagi bro! Zoya di sini. Kemarin kita ngobrolin soal *${state.context}*. Sekadar info, salah satu keunggulannya itu bisa *${snippet}*. Keren kan? Gimana, udah siap kita atur jadwalnya?`;
                    }
                    break;

                case 2: // Follow-up Hari ke-3
                    if (now > state.flaggedAt + 3 * DAY_IN_MS) {
                        shouldSend = true;
                        const downsell = getDownsellOption(state.context);
                        if (downsell) {
                            messageToSend = `Pagi bro, Zoya mau follow-up lagi soal *${state.context}*. Kalau mungkin budgetnya belum pas, ada alternatif lain lho yaitu *${downsell.name}*. Mau Zoya jelasin bedanya?`;
                        } else {
                            messageToSend = `Pagi bro, Zoya mau ingetin lagi soal rencana bikin ganteng motornya. Jadwal minggu ini masih ada yang kosong, mau dibantu amankan?`;
                        }
                    }
                    break;
                
                case 3:
                case 4:
                case 5:
                case 6: // Follow-up Mingguan
                    if (now > state.flaggedAt + 7 * DAY_IN_MS) {
                        shouldSend = true;
                        messageToSend = `Pagi bro, Zoya cuma mau info kalau slot untuk *${state.context}* masih tersedia buat minggu ini. Kalau butuh info lagi, kabarin aja ya!`;
                    }
                    break;

                case 7: // Follow-up Terakhir
                     if (now > state.flaggedAt + 7 * DAY_IN_MS) {
                        shouldSend = true;
                        nextState = null; // Hentikan siklus follow-up
                        messageToSend = `Pagi bro, ini Zoya info untuk terakhir kali ya soal *${state.context}*. Setelah ini Zoya nggak akan follow-up lagi biar nggak ganggu. Kalau nanti butuh, kontak Zoya aja. Thanks bro!`;
                    }
                    break;

                default: // Jika level di luar 1-7, hapus state untuk pembersihan
                    console.log(`[CRON JOB] Menghapus state follow-up tidak valid untuk ${senderNumber}`);
                    nextState = null;
                    await updateSession(senderNumber, { ...session, followUpState: nextState });
                    break;
            }

            // 4. KIRIM PESAN & UPDATE SESI
            if (shouldSend) {
                console.log(`Mengirim follow-up level ${state.level} ke ${senderNumber}`);
                
                // PENTING: Hapus comment di bawah ini jika Anda sudah siap mengirim pesan sungguhan
                 await sendWhatsAppMessage(senderNumber, messageToSend);
                
                processedCount++;
                
                // Update sesi dengan level berikutnya atau hapus state-nya
                await updateSession(senderNumber, { ...session, followUpState: nextState });
            }
        }

        console.log(`[CRON JOB] Selesai. Total ${processedCount} pesan follow-up diproses.`);
        return NextResponse.json({ success: true, processedCount });

    } catch (error) {
        console.error('[CRON JOB] Terjadi error saat menjalankan follow-up harian:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}