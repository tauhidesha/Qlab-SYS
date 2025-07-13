// File: src/app/api/whatsapp/receive/route.ts
// Endpoint ini sekarang menjadi "penerima cepat".

import { NextResponse } from 'next/server';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';
import { handleHumanReplyForwarding } from '@/ai/utils/handsoff/handleHumanReplyForwarding';

export async function POST(request: Request) {
  // ... di dalam fungsi POST
try {
    // Baca body sebagai teks terlebih dahulu
    const textBody = await request.text();

    // Jika body kosong, anggap sebagai health check dan balas OK
    if (!textBody) {
      console.log('[API /receive] Menerima request kosong (kemungkinan health check).');
      return NextResponse.json({ status: 'ok', message: 'Endpoint is healthy.' });
    }

    // Jika tidak kosong, baru parse sebagai JSON
    const body = JSON.parse(textBody);
    console.log('[API /receive] Menerima request:', body);
    // ... sisa kode

    const { customerMessage, senderNumber, chatHistory, senderName } = body;

    if (!customerMessage || !senderNumber) {
      return NextResponse.json(
        { success: false, error: 'customerMessage dan senderNumber wajib diisi.' },
        { status: 400 }
      );
    }

    const forwarded = await handleHumanReplyForwarding(senderNumber, customerMessage);
    if (forwarded) {
      return NextResponse.json({ status: 'forwarded_to_customer' });
    }

    // =======================================================
    // --- BAGIAN INI DIUBAH TOTAL ---
    // =======================================================
    
    // 1. Siapkan payload untuk dikirim ke worker.
    const jobPayload: ZoyaChatInput = {
      senderNumber,
      customerMessage,
      chatHistory: chatHistory || [],
      senderName,
    };
    
    // 2. Dapatkan URL worker dari environment variables.
   const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const workerUrl = `${baseUrl}/api/whatsapp/do-work`;

    // 3. Tembak request ke worker dan JANGAN DITUNGGU (fire and forget).
    fetch(workerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}`, 
      },
      body: JSON.stringify(jobPayload),
    }).catch(err => {
      // Tambahkan error handling jika trigger gagal
      console.error('[API /receive] Gagal memicu worker:', err);
    });

    console.log(`[API /receive] Job untuk ${senderNumber} telah dikirim ke worker.`);

    // 4. Langsung balas ke UI/pemanggil awal bahwa request sedang diproses.
    return NextResponse.json({ 
      status: 'processing', 
      message: 'Request diterima dan sedang diproses di latar belakang.' 
    });

  } catch (error: any) {
    console.error('Error di /api/receive:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}