import { NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';
import { type Session, updateSession } from '@/ai/utils/session';
import { sendWhatsAppMessage } from '@/services/whatsappService';
import { OpenAI } from 'openai';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// --- Utils: auth Vercel Cron ---
function isAuthorized(req: Request) {
  const url = new URL(req.url);
  const qpSecret = url.searchParams.get('secret');
  const auth = req.headers.get('authorization') || '';
  const bearer = auth.toLowerCase().startsWith('bearer ') ? auth.slice(7) : null;

  const expected = process.env.CRON_SECRET;
  return !!expected && (qpSecret === expected || bearer === expected);
}

// --- (1) H-1 confirmations ---
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

// --- Helper function untuk menentukan interval follow-up ---
function shouldSendFollowUp(level: number, daysPassed: number): boolean {
  const intervals = {
    1: 3,     // Level 1: 3 hari setelah chat terakhir
    2: 14,    // Level 2: 2 minggu
    3: 30,    // Level 3: 1 bulan  
    4: 60,    // Level 4: 2 bulan
    5: 90,    // Level 5: 3 bulan (seasonal/promo)
    6: 180,   // Level 6: 6 bulan (final attempt)
  };
  
  const requiredDays = intervals[level as keyof typeof intervals] || 999;
  return daysPassed >= requiredDays;
}

// --- Enhanced educational content generator ---
function getEducationalContent(level: number): string {
  const educationalContent = {
    1: {
      topic: "Bahaya cuci motor sembarangan",
      content: "Tau ga sih kenapa motor yang jarang di-detailing catnya jadi kusam? Karena debu dan polusi numpuk jadi lapisan tipis yang bikin cat kehilangan kilau alaminya."
    },
    2: {
      topic: "Tips perawatan motor",
      content: "Tips nih: jangan cuci motor pake sabun cuci piring! Kandungan alkaline-nya terlalu keras buat cat motor. Mending pake shampoo khusus motor atau minimal sabun mandi bayi 😊"
    },
    3: {
      topic: "Investasi jangka panjang",
      content: "Fun fact: motor yang rutin di-detailing (2-3 bulan sekali) nilai jualnya bisa lebih tinggi 15-20% lho dibanding yang ga pernah dirawat. Investasi jangka panjang banget kan?"
    },
    4: {
      topic: "Perbedaan coating vs wax",
      content: "Sharing info nih: kenapa coating nano ceramic lebih awet dari wax biasa? Karena ikatan molekulnya lebih kuat ke cat, jadi tahan 6-12 bulan vs wax yang cuma 1-2 bulan."
    },
    5: {
      topic: "Seasonal care tips",
      content: "Motor yang parkir outdoor sebaiknya di-detailing 2 bulan sekali karena lebih cepat kena polusi. Indoor bisa 3-4 bulan sekali. Motornya biasa parkir dimana nih?"
    },
    6: {
      topic: "Final check-in",
      content: "Cara cek motor butuh detailing: coba teteskan air di body motor. Kalau airnya menyebar (ga bulat), artinya lapisan proteksi udah hilang dan perlu treatment."
    }
  };

  return educationalContent[level as keyof typeof educationalContent]?.content || 
         "Gimana kabar motornya? Masih butuh treatment ga?";
}

// --- (2) ENHANCED FOLLOW-UP DENGAN GPT + EDUKASI ---
async function sendFollowUps(): Promise<number> {
  console.log('--- Memulai Tugas Follow-up GPT-integrated dengan Edukasi ---');
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
      const daysPassed = Math.floor(timePassed / DAY_IN_MS);
      
      // Check if it's time for this level follow-up
      if (!shouldSendFollowUp(state.level, daysPassed)) continue;
      
      // Stop follow-ups after level 6 (6 months)
      if (state.level > 6) {
        console.log(`Max follow-up level reached for ${senderNumber}, removing from queue`);
        await updateSession(senderNumber, {
          ...session,
          followUpState: undefined, // Changed from null to undefined
        });
        continue;
      }

      // Get educational content based on level
      const educationalTip = getEducationalContent(state.level);
      
      // Enhanced follow-up prompt with educational content
      const followUpPrompt = `
Kamu adalah Zoya, asisten AI Bosmat Detailing & Repainting Studio. Gaya chat kamu WAJIB santai, ramah, profesional, dan selalu pakai gaya chat WhatsApp yang natural — kayak ngobrol sama temen bengkel.

KONTEKS CUSTOMER:
- Nama: ${session.senderName || 'mas'}
- Topik pembahasan terakhir: "${state.context}"
- Follow-up level: ${state.level} (dari 6 level max)
- Hari berlalu sejak flag: ${daysPassed} hari

TUGAS:
1. Mulai dengan educational tip ini (wajib include): "${educationalTip}"
2. Natural transition ke sapaan personal
3. Tanya kabar motor atau lanjut diskusi ringan terkait topik sebelumnya
4. Jangan langsung hard selling, fokus relationship building
5. Style tetap friendly dan conversational

RULES:
- Sapaan: gunakan nama customer jika ada, atau "mas" jika tidak ada
- Format WhatsApp: *tebal*, _miring_, emoji seperlunya
- Panjang: 2-4 kalimat max
- Tone: seperti teman bengkel yang care, bukan sales formal

CONTOH FLOW:
[Educational tip] + "Nah, gimana kabar motor [nama]nya? [personal follow-up question]"

Output WAJIB hanya isi pesan WhatsApp, tanpa penjelasan tambahan.
`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: followUpPrompt },
          { role: 'user', content: `Generate follow-up message level ${state.level}` }
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      const reply = completion.choices?.[0]?.message?.content?.trim();
      if (!reply) continue;

      await sendWhatsAppMessage(senderNumber, reply);
      console.log(`✅ Follow-up level ${state.level} terkirim ke ${senderNumber}: ${reply}`);
      followUpCount++;

      // Update session with next level and current timestamp
      await updateSession(senderNumber, {
        ...session,
        followUpState: {
          ...state,
          level: state.level + 1,
          flaggedAt: now, // Reset timer for next interval
        },
      });
    }

  } catch (err) {
    console.error('[GPT Follow-up] Error:', err);
  }

  return followUpCount;
}

// --- (3) SEASONAL/PROMO FOLLOW-UP (Optional - run monthly) ---
async function sendPromoFollowUps(): Promise<number> {
  console.log('--- Memulai Promo Follow-ups ---');
  let promoCount = 0;
  
  try {
    const adminApp = getFirebaseAdmin();
    const db = adminApp.firestore();
    
    // Get customers who haven't been contacted in 30+ days
    const sessionsRef = db.collection('zoya_sessions');
    const snapshot = await sessionsRef.get();
    const now = Date.now();
    const monthAgo = now - (30 * DAY_IN_MS);
    
    for (const doc of snapshot.docs) {
      const session = doc.data() as Session;
      const senderNumber = doc.id;
      
      // Skip if recently contacted or in active follow-up
      if (session.followUpState?.flaggedAt && session.followUpState.flaggedAt > monthAgo) continue;
      
      const promoMessage = `Halo ${session.senderName || 'mas'}! 🎉\n\n*PROMO SPESIAL BULAN INI*\nDetailing + Nano Coating cuma *150rb* (normal 200rb)\nTerbatas 20 orang pertama aja!\n\nGimana, mau refresh motornya? Chat balik kalau tertarik ya 🏍️✨`;
      
      await sendWhatsAppMessage(senderNumber, promoMessage);
      console.log(`✅ Promo sent to ${senderNumber}`);
      promoCount++;
      
      // Small delay to avoid spam detection
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (err) {
    console.error('[Promo Follow-up] Error:', err);
  }
  
  return promoCount;
}

// --- (4) Core executor ---
async function runJob(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log(`[CRON JOB] Start: ${new Date().toISOString()}`);

  try {
    const followUpCount = await sendFollowUps();
    const confirmationCount = await sendH1Confirmations();
    
    // Optional: Run promo follow-ups on first day of month
    const today = new Date();
    let promoCount = 0;
    if (today.getDate() === 1) {
      promoCount = await sendPromoFollowUps();
    }

    const summary = `Selesai ✅ Follow-up: ${followUpCount}, Konfirmasi H-1: ${confirmationCount}, Promo: ${promoCount}`;
    console.log(`[CRON JOB] ${summary}`);

    return NextResponse.json({
      success: true,
      summary,
      processed: {
        followUps: followUpCount,
        confirmations: confirmationCount,
        promos: promoCount,
      },
    });
  } catch (err) {
    console.error('[CRON JOB] Fatal error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// --- (5) Handlers for Vercel Cron ---
export async function GET(req: Request) {
  return runJob(req);
}

export async function POST(req: Request) {
  return runJob(req);
}

export async function HEAD() {
  return new Response(null, { status: 200 });
}
