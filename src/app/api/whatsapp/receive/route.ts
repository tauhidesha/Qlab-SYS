
import { NextResponse } from 'next/server';
import { generateWhatsAppReply, type WhatsAppReplyInput, WhatsAppReplyInputSchema } from '@/ai/flows/cs-whatsapp-reply-flow';
import { ZodError } from 'zod';

// Pastikan genkit diinisialisasi
import '@/ai/genkit';


export async function POST(request: Request) {
  console.log("=== API /api/whatsapp/receive ENTERED POST HANDLER ===");
  try {
    console.log("Attempting to parse request body...");
    const body = await request.json();
    console.log("Request body parsed successfully:", body);

    const validationResult = WhatsAppReplyInputSchema.safeParse(body);

    if (!validationResult.success) {
      console.error("Input validation failed:", validationResult.error.format());
      return NextResponse.json({ success: false, error: 'Invalid input.', details: validationResult.error.format() }, { status: 400 });
    }
    
    const { customerMessage } = validationResult.data;
    console.log("Input validated. Customer message:", customerMessage);

    // Di sini, Anda tidak memiliki `senderNumber` secara langsung dari input skema WhatsAppReplyInput
    // Jika Anda membutuhkannya untuk logika AI atau respons, Anda perlu menambahkannya ke WhatsAppReplyInputSchema
    // atau meneruskannya secara terpisah jika flow Anda membutuhkannya.
    // Untuk contoh ini, kita asumsikan flow hanya butuh `customerMessage`.
    
    // const senderNumber = body.senderNumber; // Jika Anda mengirimnya dari whatsapp.js

    console.log("Calling generateWhatsAppReply flow...");
    const aiResponse = await generateWhatsAppReply({ customerMessage });
    console.log("AI Flow response received:", aiResponse);

    // TODO: Kirim `aiResponse.suggestedReply` kembali ke nomor WhatsApp pengirim
    // Ini memerlukan logika untuk mengirim pesan WhatsApp keluar, yang mungkin melibatkan
    // pemanggilan ke server WhatsApp lokal Anda lagi atau layanan pihak ketiga.
    // Untuk saat ini, kita hanya log dan return sukses.

    // Contoh jika Anda ingin mengirim balasan kembali melalui endpoint lain di server WhatsApp lokal Anda:
    // (Ini hanya ilustrasi, sesuaikan dengan setup Anda)
    /*
    if (process.env.WHATSAPP_SERVER_URL && senderNumber) {
      const sendResponse = await fetch(`${process.env.WHATSAPP_SERVER_URL}/send-message`, { // Ganti dengan URL yang benar
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: senderNumber, message: aiResponse.suggestedReply }),
      });
      if (!sendResponse.ok) {
        console.error("Failed to send AI reply via WhatsApp server:", await sendResponse.text());
        // Mungkin Anda ingin melempar error di sini atau menanganinya secara berbeda
      } else {
        console.log("AI reply successfully sent to WhatsApp server for delivery.");
      }
    }
    */

    return NextResponse.json({ success: true, reply: aiResponse });

  } catch (error: any) {
    console.error("Internal server error in /api/whatsapp/receive:", error);
    let errorMessage = 'Internal Server Error';
    let errorDetails: any = {};
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = { name: error.name, message: error.message, stack: error.stack };
    } else if (typeof error === 'object' && error !== null) {
      errorDetails = { ...error };
    }
    
    return NextResponse.json({ 
      success: false, 
      error: errorMessage,
      errorDetails: errorDetails // Kirim detail error untuk debugging di client (run.js)
    }, { status: 500 });
  }
}
