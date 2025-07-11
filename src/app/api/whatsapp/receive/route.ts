import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';
import { handleHumanReplyForwarding } from '@/ai/utils/humanHandoff/handleHumanReplyForwarding';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[API /receive] Menerima request:', body);

    // Validasi input sederhana
    const customerMessage = body.customerMessage;
    const senderNumber = body.senderNumber;

    if (!customerMessage || !senderNumber) {
      return NextResponse.json(
        { success: false, error: 'customerMessage dan senderNumber wajib diisi.' },
        { status: 400 }
      );
    }

    // Coba deteksi apakah ini balasan dari Bos Mamat
    const forwarded = await handleHumanReplyForwarding(senderNumber, customerMessage);
    if (forwarded) {
      return NextResponse.json({ status: 'forwarded_to_customer' });
    }

    const input: ZoyaChatInput = {
      senderNumber: senderNumber,
      customerMessage: customerMessage,
      chatHistory: body.chatHistory || [],
      senderName: body.senderName,
    };

    const aiResponse = await generateWhatsAppReply(input);

    console.log('[DEBUG] Hasil dari AI Flow sebelum dikirim:', JSON.stringify(aiResponse, null, 2));

    return NextResponse.json(aiResponse);
  } catch (error: any) {
    console.error('Error di /api/whatsapp/receive:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
