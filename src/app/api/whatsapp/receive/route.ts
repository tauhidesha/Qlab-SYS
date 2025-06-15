
// src/app/api/whatsapp/receive/route.ts
import { NextResponse } from 'next/server';
import { generateWhatsAppReply, type WhatsAppReplyInput, type WhatsAppReplyOutput } from '@/ai/flows/cs-whatsapp-reply-flow';
import { sendWhatsAppMessage } from '@/services/whatsappService';

export async function POST(request: Request) {
  console.log('API Route /api/whatsapp/receive: Received POST request.');

  try {
    const body = await request.json();
    const { senderNumber, customerMessage } = body;

    console.log(`API Route /api/whatsapp/receive: Parsed body: senderNumber=${senderNumber}, customerMessage="${customerMessage}"`);

    if (!senderNumber || !customerMessage) {
      console.error('API Route /api/whatsapp/receive: Missing senderNumber or customerMessage.');
      return NextResponse.json({ success: false, error: 'Nomor pengirim dan isi pesan diperlukan.' }, { status: 400 });
    }

    // 1. Dapatkan balasan dari AI
    const aiInput: WhatsAppReplyInput = { customerMessage };
    let aiReplyText = "Maaf, saya belum bisa memproses permintaan Anda saat ini."; // Default reply
    let aiSuccess = false;

    try {
      console.log('API Route /api/whatsapp/receive: Calling AI flow generateWhatsAppReply...');
      const aiResult: WhatsAppReplyOutput = await generateWhatsAppReply(aiInput);
      if (aiResult && aiResult.suggestedReply) {
        aiReplyText = aiResult.suggestedReply;
        aiSuccess = true;
        console.log(`API Route /api/whatsapp/receive: AI suggested reply: "${aiReplyText}"`);
      } else {
        console.warn('API Route /api/whatsapp/receive: AI did not provide a valid reply.');
      }
    } catch (aiError) {
      console.error('API Route /api/whatsapp/receive: Error calling AI flow:', aiError);
      // Tetap gunakan default reply jika AI error
    }

    // 2. Kirim balasan AI kembali ke pelanggan via server WhatsApp lokal
    console.log(`API Route /api/whatsapp/receive: Attempting to send AI reply ("${aiReplyText}") to ${senderNumber} via local WhatsApp server.`);
    const sendResult = await sendWhatsAppMessage(senderNumber, aiReplyText);

    if (sendResult.success) {
      console.log(`API Route /api/whatsapp/receive: AI reply successfully sent to ${senderNumber}. Message ID: ${sendResult.messageId}`);
      return NextResponse.json({ 
        success: true, 
        message: 'Pesan diterima, AI memproses, dan balasan dikirim.', 
        aiGeneratedReply: aiReplyText, 
        aiSuccess: aiSuccess,
        localServerResponseStatus: sendResult // Menyertakan status dari server lokal
      });
    } else {
      console.error(`API Route /api/whatsapp/receive: Failed to send AI reply to ${senderNumber} via local server. Error: ${sendResult.error}`);
      return NextResponse.json({ 
        success: false, 
        error: `Pesan diterima dan AI diproses, tapi gagal mengirim balasan ke pelanggan: ${sendResult.error}`,
        aiGeneratedReply: aiReplyText, 
        aiSuccess: aiSuccess,
        localServerResponseStatus: sendResult // Menyertakan status dari server lokal
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('API Route /api/whatsapp/receive: Top-level internal server error:', error);
    let errorMessage = 'Kesalahan internal server.';
    // Cek apakah error disebabkan oleh parsing JSON yang gagal
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
        errorMessage = 'Gagal mem-parsing JSON dari body request. Pastikan format request benar.';
        console.error('API Route /api/whatsapp/receive: Error detail: Gagal parsing JSON request body.');
        return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }
    // Pastikan selalu mengembalikan JSON, bahkan untuk error tak terduga
    return NextResponse.json({ success: false, error: `Internal server error in /api/whatsapp/receive: ${errorMessage}` }, { status: 500 });
  }
}
