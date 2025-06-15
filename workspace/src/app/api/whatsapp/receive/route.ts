
// src/app/api/whatsapp/receive/route.ts
import { NextResponse } from 'next/server';
// Comment out AI and WhatsApp service imports for now to isolate the issue
// import { generateWhatsAppReply, type WhatsAppReplyInput, type WhatsAppReplyOutput } from '@/ai/flows/cs-whatsapp-reply-flow';
// import { sendWhatsAppMessage } from '@/services/whatsappService';

export async function POST(request: Request) {
  console.log('API Route /api/whatsapp/receive: Received POST request (Bare Minimum Test).');

  // Cek API Key Google (ini mungkin tidak akan tereksekusi jika error terjadi sebelumnya)
  const googleApiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!googleApiKey || googleApiKey === "MASUKKAN_API_KEY_GOOGLE_AI_KAMU_DI_SINI") {
    console.error('API Route /api/whatsapp/receive: CRITICAL - GOOGLE_API_KEY tidak di-set atau placeholder. Ini bisa menyebabkan error sebelum handler ini berjalan penuh.');
    // Mengembalikan JSON error bahkan di sini, meskipun mungkin tidak akan sampai jika error sudah terjadi
    return NextResponse.json({ 
      success: false, 
      error: 'Konfigurasi server error: API Key untuk layanan AI tidak ditemukan atau tidak valid. Mohon cek file .env (Bare Minimum Test).' 
    }, { status: 500 });
  }
  console.log('API Route /api/whatsapp/receive (Bare Minimum Test): GOOGLE_API_KEY terdeteksi.');


  try {
    const body = await request.json();
    const { senderNumber, customerMessage } = body;

    console.log(`API Route /api/whatsapp/receive (Bare Minimum Test): Parsed body: senderNumber=${senderNumber}, customerMessage="${customerMessage}"`);

    if (!senderNumber || !customerMessage) {
      console.error('API Route /api/whatsapp/receive (Bare Minimum Test): Missing senderNumber or customerMessage.');
      return NextResponse.json({ success: false, error: 'Nomor pengirim dan isi pesan diperlukan (Bare Minimum Test).' }, { status: 400 });
    }

    // Just acknowledge receipt and send a dummy success response
    const dummyAiReply = `Pesan diterima dari ${senderNumber}: "${customerMessage}". Ini adalah tes dari endpoint minimal Next.js.`;
    console.log(`API Route /api/whatsapp/receive (Bare Minimum Test): Sending dummy success response.`);
    
    // We are NOT sending a WhatsApp message back in this bare minimum test.
    // We are just checking if this endpoint can be called and return JSON.
    
    return NextResponse.json({ 
      success: true, 
      message: 'Pesan diterima oleh endpoint minimal Next.js.', 
      aiGeneratedReply: dummyAiReply, 
      aiSuccess: true, // Faking AI success for this test
      localServerResponseStatus: { success: true, message: "Not sending back to WhatsApp in this test." }
    });

  } catch (error: any) {
    console.error('API Route /api/whatsapp/receive (Bare Minimum Test): Top-level internal server error:', error);
    let errorMessage = 'Kesalahan internal server (Bare Minimum Test).';
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
        errorMessage = 'Gagal mem-parsing JSON dari body request (Bare Minimum Test). Pastikan format request benar.';
        console.error('API Route /api/whatsapp/receive (Bare Minimum Test): Error detail: Gagal parsing JSON request body.');
        return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    } else if (error.name === 'AbortError') {
        errorMessage = 'Request timeout atau dibatalkan (Bare Minimum Test).';
        console.error('API Route /api/whatsapp/receive (Bare Minimum Test): Error detail: Request Aborted.');
        return NextResponse.json({ success: false, error: errorMessage }, { status: 504 }); // Gateway Timeout
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: `Internal server error in /api/whatsapp/receive (Bare Minimum Test): ${errorMessage}` }, { status: 500 });
  }
}

export async function GET(request: Request) {
  console.log('API Route /api/whatsapp/receive: Received GET request (Bare Minimum Test). Method not allowed.');
  return NextResponse.json({ success: false, error: 'Method Not Allowed (Bare Minimum Test)' }, { status: 405 });
}

export async function PUT(request: Request) {
  console.log('API Route /api/whatsapp/receive: Received PUT request (Bare Minimum Test). Method not allowed.');
  return NextResponse.json({ success: false, error: 'Method Not Allowed (Bare Minimum Test)' }, { status: 405 });
}
