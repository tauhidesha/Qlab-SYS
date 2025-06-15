import { NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '@/services/whatsappService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { number, message } = body;

    if (!number || !message) {
      return NextResponse.json({ success: false, error: 'Nomor dan pesan diperlukan.' }, { status: 400 });
    }

    // Validasi nomor sederhana (bisa diperketat)
    if (!/^\d{10,15}$/.test(number.replace(/\D/g, ''))) {
        return NextResponse.json({ success: false, error: 'Format nomor tidak valid.' }, { status: 400 });
    }
    
    console.log(`API Route: Menerima permintaan untuk mengirim WhatsApp ke ${number}`);

    const result = await sendWhatsAppMessage(number, message);

    if (result.success) {
      console.log(`API Route: Pesan berhasil dikirim ke ${number}, ID: ${result.messageId}`);
      return NextResponse.json({ success: true, messageId: result.messageId });
    } else {
      console.error(`API Route: Gagal mengirim pesan ke ${number}, Error: ${result.error}`);
      return NextResponse.json({ success: false, error: result.error || 'Gagal mengirim pesan via layanan WhatsApp.' }, { status: 500 });
    }
  } catch (error) {
    console.error('API Route: Error internal saat memproses permintaan WhatsApp:', error);
    let errorMessage = 'Terjadi kesalahan internal pada server.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
