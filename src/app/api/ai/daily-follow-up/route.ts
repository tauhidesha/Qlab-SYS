import { NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';
import { type Session, updateSession } from '@/ai/utils/session';
import { sendWhatsAppMessage } from '@/services/whatsappService';
import { OpenAI } from 'openai';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// --- (1) KONFIRMASI BOOKING H-1 ---
async function sendH1Confirmations(): Promise<number> {
  console.log('--- Memulai Tugas Konfirmasi H-1 ---');
  let confirmationCount = 0;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const tomorrowDate = `${yyyy}-${mm}-${dd}`;

  try {
    const adminApp = getFirebaseAdmin();
    const db = adminApp.firestore();
    
    const bookingsRef = db.collection('bookings');
    const q = bookingsRef
      .where('bookingDate', '==', tomorrowDate)
      .where('status', '==', 'Confirmed');
    const snapshot = await q.get();

    for (const doc of snapshot.docs) {
      const booking = doc.data();
      if (typeof booking.customerPhone === 'string' && booking.customerPhone) {
        const msg = `Halo bro ${booking.customerName || ''}, Zoya cuma mau konfirmasi bookingan besok ya:\n\n📅 *Tanggal:* ${booking.bookingDate}\n⏰ *Jam:* ${booking.bookingTime}\n🛠️ *Layanan:* ${booking.serviceName}\n\nKalau semua sudah oke, ditunggu kedatangannya ya. Kalau mau batal atau reschedule, tinggal balas pesan ini aja. Makasih bro! 🙏`;

        await sendWhatsAppMessage(booking.customerPhone, msg);
        console.log(`✅ Konfirmasi dikirim ke ${booking.customerPhone}`);
        confirmationCount++;
      }
    }
  } catch (err) {
    console.error('[H-1 Conf] Error:', err);
  }

  return confirmationCount;
}

// --- (2) FOLLOW-UP DENGAN GPT ---
async function sendFollowUps(): Promise<number> {
  console.log('--- Memulai Tugas Follow-up GPT-integrated ---');
  let followUpCount = 0;

  try {
    const adminApp = getFirebaseAdmin();
    const db = adminApp.firestore();
    
    const sessionsRef = db.collection('zoya_sessions');
    const q = sessionsRef.where('followUpState', '!=', null);
    const snapshot = await q.get();
    const now = Date.now();

    for (const doc of snapshot.docs) {
      const senderNumber = doc.id;
      const session = doc.data() as Session;
      const state = session.followUpState;
      if (!state) continue;

      const timePassed = now - state.flaggedAt;
      if (timePassed < DAY_IN_MS) continue;

      const prompt = `
Kamu adalah Zoya, asisten WhatsApp untuk jasa detailing & repaint motor. Kemarin kamu bantu pelanggan ini untuk topik: "${state.context}".

Tugasmu sekarang: kirim pesan follow-up santai (pakai kata "bro") untuk ngajak dia nanya lagi atau booking. Gaya bahasa tetap informal & ramah.

Hanya kirim isi pesan WA-nya aja, tidak perlu penjelasan tambahan.
`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [{ role: 'system', content: prompt }],
      });

      const reply = completion.choices?.[0]?.message?.content?.trim();
      if (!reply) continue;

      await sendWhatsAppMessage(senderNumber, reply);
      console.log(`✅ Follow-up terkirim ke ${senderNumber}: ${reply}`);
      followUpCount++;

      await updateSession(senderNumber, {
        ...session,
        followUpState: {
          ...state,
          level: state.level + 1,
          flaggedAt: now,
        },
      });
    }

  } catch (err) {
    console.error('[GPT Follow-up] Error:', err);
  }

  return followUpCount;
}

// --- (3) POST HANDLER CRON JOB ---
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log(`[CRON JOB] Tugas Harian Dimulai: ${new Date().toISOString()}`);

  try {
    const followUpCount = await sendFollowUps();
    const confirmationCount = await sendH1Confirmations();

    const summary = `Selesai ✅ Follow-up: ${followUpCount}, Konfirmasi H-1: ${confirmationCount}`;
    console.log(`[CRON JOB] ${summary}`);

    return NextResponse.json({
      success: true,
      summary,
      processed: {
        followUps: followUpCount,
        confirmations: confirmationCount,
      },
    });
  } catch (err) {
    console.error('[CRON JOB] Fatal error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
