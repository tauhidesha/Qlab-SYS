
// src/app/api/whatsapp/receive/route.ts
import { NextResponse } from 'next/server';
import { generateWhatsAppReply, type WhatsAppReplyInput, type WhatsAppReplyOutput } from '@/ai/flows/cs-whatsapp-reply-flow';
import { sendWhatsAppMessage } from '@/services/whatsappService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderNumber, customerMessage } = body;

    if (!senderNumber || !customerMessage) {
      return NextResponse.json({ success: false, error: 'Nomor pengirim dan isi pesan diperlukan.' }, { status: 400 });
    }

    console.log(`API Route /whatsapp/receive: Menerima pesan dari ${senderNumber}: "${customerMessage}"`);

    // 1. Dapatkan balasan dari AI
    const aiInput: WhatsAppReplyInput = { customerMessage };
    let aiReplyText = "Maaf, saya belum bisa memproses permintaan Anda saat ini."; // Default reply
    let aiSuccess = false;

    try {
      const aiResult: WhatsAppReplyOutput = await generateWhatsAppReply(aiInput);
      if (aiResult && aiResult.suggestedReply) {
        aiReplyText = aiResult.suggestedReply;
        aiSuccess = true;
        console.log(`API Route /whatsapp/receive: AI menyarankan balasan: "${aiReplyText}"`);
      } else {
        console.warn(`API Route /whatsapp/receive: AI tidak memberikan balasan yang valid.`);
      }
    } catch (aiError) {
      console.error('API Route /whatsapp/receive: Error saat memanggil AI flow:', aiError);
      // Tetap gunakan default reply jika AI error
    }

    // 2. Kirim balasan AI kembali ke pelanggan via server WhatsApp lokal
    // Kita akan mengirimkan balasan meskipun AI gagal, dengan pesan default.
    const sendResult = await sendWhatsAppMessage(senderNumber, aiReplyText);

    if (sendResult.success) {
      console.log(`API Route /whatsapp/receive: Balasan AI berhasil dikirim ke ${senderNumber}`);
      return NextResponse.json({ success: true, message: 'Pesan diterima, AI memproses, dan balasan dikirim.', aiGeneratedReply: aiReplyText, aiSuccess: aiSuccess });
    } else {
      console.error(`API Route /whatsapp/receive: Gagal mengirim balasan AI ke ${senderNumber} via server lokal. Error: ${sendResult.error}`);
      return NextResponse.json({ 
        success: false, 
        error: `Pesan diterima dan AI diproses, tapi gagal mengirim balasan ke pelanggan: ${sendResult.error}`,
        aiGeneratedReply: aiReplyText, 
        aiSuccess: aiSuccess 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('API Route /whatsapp/receive: Error internal:', error);
    const errorMessage = error instanceof Error ? error.message : 'Kesalahan internal server.';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
