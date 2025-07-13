// File: src/app/api/whatsapp/receive/route.ts (Versi Revert ke Sinkron)

import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';
import { handleHumanReplyForwarding } from '@/ai/utils/handsoff/handleHumanReplyForwarding';

export async function POST(request: Request) {
  try {
    const textBody = await request.text();
    if (!textBody) {
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

    const input: ZoyaChatInput = {
      senderNumber,
      customerMessage,
      chatHistory: chatHistory || [],
      senderName,
    };

    // --- REVERT: Logika AI dikembalikan ke sini ---
    // Panggil fungsi AI secara langsung dan tunggu hasilnya (sinkron)
    const aiResponse = await generateWhatsAppReply(input);

    console.log('[DEBUG] Hasil dari AI Flow sebelum dikirim:', JSON.stringify(aiResponse, null, 2));

    // Langsung kembalikan hasil dari AI
    return NextResponse.json(aiResponse);

  } catch (error: any) {
    console.error('Error di /api/whatsapp/receive:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}