import { NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '@/services/whatsappService';

export async function POST(request: Request) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    console.log(`API Route [${requestId}]: [${Date.now() - startTime}ms] 🚀 Menerima request WhatsApp`);
    
    const body = await request.json();
    const { number, message } = body;

    console.log(`API Route [${requestId}]: [${Date.now() - startTime}ms] 📝 Payload received - number: "${number}", message length: ${message?.length || 0}`);

    if (!number || !message) {
      console.log(`API Route [${requestId}]: [${Date.now() - startTime}ms] ❌ Missing required fields`);
      return NextResponse.json({ success: false, error: 'Nomor dan pesan diperlukan.' }, { status: 400 });
    }

    // Validasi nomor sederhana (bisa diperketat)
    if (!/^\d{10,15}$/.test(number.replace(/\D/g, ''))) {
        console.log(`API Route [${requestId}]: [${Date.now() - startTime}ms] ❌ Invalid number format`);
        return NextResponse.json({ success: false, error: 'Format nomor tidak valid.' }, { status: 400 });
    }
    
    console.log(`API Route [${requestId}]: [${Date.now() - startTime}ms] ✅ Validation passed, calling whatsappService`);

    const result = await sendWhatsAppMessage(number, message);

    if (result.success) {
      const elapsedTime = Date.now() - startTime;
      console.log(`API Route [${requestId}]: [${elapsedTime}ms] ✅ SUCCESS - Pesan berhasil dikirim ke ${number}, ID: ${result.messageId || 'N/A'}`);
      return NextResponse.json({ success: true, messageId: result.messageId });
    } else {
      const elapsedTime = Date.now() - startTime;
      console.error(`API Route [${requestId}]: [${elapsedTime}ms] ❌ FAILED - Gagal mengirim pesan ke ${number}, Error: ${result.error}`);
      return NextResponse.json({ success: false, error: result.error || 'Gagal mengirim pesan via layanan WhatsApp.' }, { status: 500 });
    }
  } catch (error) {
    const elapsedTime = Date.now() - startTime;
    console.error(`API Route [${requestId}]: [${elapsedTime}ms] 💥 EXCEPTION - Error internal:`, error);
    
    let errorMessage = 'Terjadi kesalahan internal pada server.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
