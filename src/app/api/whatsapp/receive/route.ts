// File: src/app/api/whatsapp/receive/route.ts

import { NextResponse } from 'next/server';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';
import { handleHumanReplyForwarding } from '@/ai/utils/handsoff/handleHumanReplyForwarding';

export async function POST(request: Request) {
  try {
    const textBody = await request.text();
    if (!textBody) {
      console.log('[API /receive] Menerima request kosong (kemungkinan health check).');
      return NextResponse.json({ status: 'ok', message: 'Endpoint is healthy.' });
    }
    
    const body = JSON.parse(textBody);
    console.log('[API /receive] Menerima request:', body);

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

    const jobPayload: ZoyaChatInput = {
      senderNumber,
      customerMessage,
      chatHistory: chatHistory || [],
      senderName,
    };
    
    // --- BAGIAN DEBUGGING ---
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;

    console.log(`[RECEIVE DEBUG] VERCEL_URL: ${process.env.VERCEL_URL}`);
    console.log(`[RECEIVE DEBUG] NEXT_PUBLIC_BASE_URL: ${process.env.NEXT_PUBLIC_BASE_URL}`);
    console.log(`[RECEIVE DEBUG] BASE_URL: ${process.env.BASE_URL}`);
    console.log(`[RECEIVE DEBUG] Base URL yang digunakan: ${baseUrl}`);

    if (!baseUrl) {
      const errorMsg = "[KRITIS] Tidak ada BASE URL yang terdefinisi. Tidak bisa memicu worker.";
      console.error(errorMsg);
      return NextResponse.json({ error: errorMsg }, { status: 500 });
    }
      
    const workerUrl = `${baseUrl}/api/whatsapp/do-work`;
    console.log(`[RECEIVE DEBUG] Mencoba memicu worker di URL: ${workerUrl}`);
    // --- AKHIR BAGIAN DEBUGGING ---

    fetch(workerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}`, 
      },
      body: JSON.stringify(jobPayload),
    }).catch(err => {
      console.error('[RECEIVE DEBUG] FETCH GAGAL SECARA EKSPLISIT:', err);
    });

    console.log(`[API /receive] Job untuk ${senderNumber} telah dikirim ke worker.`);

    return NextResponse.json({ 
      status: 'processing', 
      message: 'Request diterima dan sedang diproses di latar belakang.' 
    });

  } catch (error: any) {
    console.error('Error di /api/receive:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}