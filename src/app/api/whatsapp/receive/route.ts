// File: src/app/api/whatsapp/receive/route.ts

import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';
import { handleHumanReplyForwarding } from '@/ai/utils/handsoff/handleHumanReplyForwarding';
import { handlePaymentFlow } from '@/ai/utils/payment/handlePaymentFlow';

export async function POST(request: Request) {
  try {
    const textBody = await request.text();
    if (!textBody) {
      return NextResponse.json({ status: 'ok', message: 'Endpoint is healthy.' });
    }
    
    const body = JSON.parse(textBody);
    console.log('[API /receive] Menerima request:', body);

    const { customerMessage, senderNumber, chatHistory, senderName } = body;

    if (!senderNumber) {
      return NextResponse.json(
        { success: false, error: 'senderNumber wajib diisi.' },
        { status: 400 }
      );
    }

    // --- ALUR BARU: Modular Handlers ---

    // 1. Coba proses alur pembayaran terlebih dahulu
    const paymentResult = await handlePaymentFlow(body);
    if (paymentResult) {
      console.log('[API /receive] Hasil dari handlePaymentFlow:', paymentResult);
      // Jika alur pembayaran menghasilkan pesan balasan untuk customer
      if (paymentResult.message) {
        return NextResponse.json({ suggestedReply: paymentResult.message });
      }
      // Jika tidak ada pesan balasan (misalnya, hanya aksi internal seperti konfirmasi oleh Bos Mamat)
      return NextResponse.json({ status: paymentResult.status, result: paymentResult.result || 'ok' });
    }

    // 2. Jika bukan alur pembayaran, coba proses sebagai balasan manual dari Bos Mamat
    const forwarded = await handleHumanReplyForwarding(senderNumber, customerMessage);
    if (forwarded) {
      return NextResponse.json({ status: 'forwarded_to_customer' });
    }

    // 3. Jika bukan keduanya, dan pesan teks kosong, abaikan
    if (!customerMessage) {
      return NextResponse.json({ status: 'ok', message: 'No actionable text content.' });
    }

    // 4. Jika semua handler di atas tidak cocok, lanjutkan ke AI
    const input: ZoyaChatInput = {
      senderNumber,
      customerMessage,
      chatHistory: chatHistory || [],
      senderName,
    };

    const aiResponse = await generateWhatsAppReply(input);

    console.log('[DEBUG] Hasil dari AI Flow sebelum dikirim:', JSON.stringify(aiResponse, null, 2));

    return NextResponse.json(aiResponse);

  } catch (error: any) {
    console.error('Error di /api/whatsapp/receive:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}