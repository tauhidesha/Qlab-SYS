import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[API /receive] Menerima request:', body);

    // Validasi input sederhana
    const customerMessage = body.customerMessage;
    const senderNumber = body.senderNumber;
    
    if (!customerMessage || !senderNumber) {
        return NextResponse.json({ success: false, error: 'customerMessage dan senderNumber wajib diisi.' }, { status: 400 });
    }
    
   const input: ZoyaChatInput = {
    senderNumber: senderNumber,
    customerMessage: customerMessage,
    chatHistory: body.chatHistory || [],
    senderName: body.senderName, // ✅ Tambahkan ini
};
    
    const aiResponse = await generateWhatsAppReply(input);

    // Ini adalah 'mata-mata' kita yang harusnya muncul
    console.log('[DEBUG] Hasil dari AI Flow sebelum dikirim:', JSON.stringify(aiResponse, null, 2));

    return NextResponse.json(aiResponse);

  } catch (error: any) {
    console.error("Error di /api/whatsapp/receive:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}