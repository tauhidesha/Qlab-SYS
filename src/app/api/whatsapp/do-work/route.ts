// File: src/app/api/whatsapp/do-work/route.ts
// Endpoint ini adalah "pekerja keras" yang berjalan di latar belakang.

import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';
import { sendWhatsAppMessage } from '@/services/whatsappService';

export async function POST(request: Request) {
  // 1. Validasi Keamanan: Pastikan request datang dari server kita sendiri, bukan dari publik.
  const authToken = (request.headers.get('authorization') || '').split('Bearer ')[1];
  if (authToken !== process.env.INTERNAL_API_SECRET) {
    console.warn('[API /do-work] Unauthorized attempt detected.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: ZoyaChatInput = await request.json();
    console.log(`[API /do-work] Memulai pekerjaan untuk ${body.senderNumber}...`);

    // 2. Jalankan semua proses AI yang berat yang sebelumnya ada di 'receive'.
    const aiResponse = await generateWhatsAppReply(body);

    // --- REVISI DI SINI ---
    // Nama properti yang benar adalah 'suggestedReply'.
    const finalMessage = aiResponse?.suggestedReply;
    
    // 3. Jika ada pesan balasan, kirim sebagai pesan WhatsApp baru yang proaktif.
    if (finalMessage && finalMessage.trim() !== '') {
      console.log(`[API /do-work] Pekerjaan selesai. Mengirim pesan ke ${body.senderNumber}: "${finalMessage}"`);
      await sendWhatsAppMessage(body.senderNumber, finalMessage);
    } else {
      console.log(`[API /do-work] Pekerjaan selesai. Tidak ada pesan balasan yang perlu dikirim.`);
    }

    return NextResponse.json({ success: true, message: 'Job completed.' });

  } catch (error: any) {
    console.error('Error di /api/do-work:', error);
    // Anda bisa menambahkan logika untuk mengirim notifikasi error ke admin di sini.
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}