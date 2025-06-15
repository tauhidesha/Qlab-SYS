
import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
// Skema input utama untuk API route ini mungkin masih hanya customerMessage dan senderNumber.
// Penambahan agentBehavior dan knowledgeBase akan dilakukan di dalam generateWhatsAppReply flow.
// Namun, kita tetap bisa menggunakan WhatsAppReplyInputSchema dari flow untuk validasi dasar jika diperlukan,
// atau membuat skema terpisah khusus untuk API route ini.
// Untuk konsistensi, kita akan pakai WhatsAppReplyInputSchema namun hanya mengisi customerMessage dari request body.
import { WhatsAppReplyInputSchema } from '@/types/ai/cs-whatsapp-reply';
import { ZodError } from 'zod';

// Pastikan genkit diinisialisasi
import '@/ai/genkit';


export async function POST(request: Request) {
  console.log("=== API /api/whatsapp/receive ENTERED POST HANDLER ===");
  try {
    console.log("Attempting to parse request body...");
    const body = await request.json();
    console.log("Request body parsed successfully:", body);

    // Validasi hanya customerMessage dari body yang masuk ke API route ini
    const apiInputValidation = z.object({
      customerMessage: z.string().min(1, "Pesan pelanggan tidak boleh kosong."),
      // senderNumber: z.string().optional(), // Jika Anda mengirimnya dari whatsapp.js
    }).safeParse(body);


    if (!apiInputValidation.success) {
      console.error("API Input validation failed:", apiInputValidation.error.format());
      return NextResponse.json({ success: false, error: 'Invalid input for API.', details: apiInputValidation.error.format() }, { status: 400 });
    }
    
    const { customerMessage } = apiInputValidation.data;
    console.log("API Input validated. Customer message:", customerMessage);
    
    console.log("Calling generateWhatsAppReply flow (which will fetch AI settings)...");
    // Fungsi generateWhatsAppReply sekarang akan menangani pengambilan pengaturan AI dari Firestore
    // dan meneruskannya ke prompt internal.
    const aiResponse = await generateWhatsAppReply({ customerMessage }); // Hanya customerMessage yang perlu di-pass ke fungsi wrapper
    console.log("AI Flow response received:", aiResponse);

    // TODO: Kirim `aiResponse.suggestedReply` kembali ke nomor WhatsApp pengirim
    // Ini memerlukan logika untuk mengirim pesan WhatsApp keluar, yang mungkin melibatkan
    // pemanggilan ke server WhatsApp lokal Anda lagi atau layanan pihak ketiga.
    // Untuk saat ini, kita hanya log dan return sukses.
    // Untuk integrasi penuh, server WhatsApp lokal Anda harus mampu menerima permintaan kirim pesan dari sini.

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
      errorDetails: errorDetails
    }, { status: 500 });
  }
}
