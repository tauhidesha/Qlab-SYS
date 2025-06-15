
import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import { WhatsAppReplyInputSchema, ChatMessageSchema } from '@/types/ai/cs-whatsapp-reply'; // Import ChatMessageSchema
import { z } from 'zod';

// Pastikan genkit diinisialisasi
import '@/ai/genkit';


// Skema input khusus untuk API route ini, bisa lebih fleksibel untuk chatHistory
const ApiReceiveInputSchema = z.object({
  customerMessage: z.string().min(1, "Pesan pelanggan tidak boleh kosong."),
  senderNumber: z.string().optional(), // Jika Anda mengirimnya dari whatsapp.js
  chatHistory: z.array(ChatMessageSchema).optional(), // Terima chat history jika dikirim
});

export async function POST(request: Request) {
  console.log("=== API /api/whatsapp/receive ENTERED POST HANDLER ===");
  try {
    console.log("Attempting to parse request body...");
    const body = await request.json();
    console.log("Request body parsed successfully:", body);

    const apiInputValidation = ApiReceiveInputSchema.safeParse(body);

    if (!apiInputValidation.success) {
      console.error("API Input validation failed:", apiInputValidation.error.format());
      return NextResponse.json({ success: false, error: 'Invalid input for API.', details: apiInputValidation.error.format() }, { status: 400 });
    }
    
    const { customerMessage, chatHistory, senderNumber } = apiInputValidation.data;
    console.log("API Input validated. Customer message:", customerMessage, "Chat history provided:", !!chatHistory, "Sender:", senderNumber);
    
    console.log("Calling generateWhatsAppReply flow...");
    
    const aiResponse = await generateWhatsAppReply({ 
      customerMessage, 
      chatHistory // Pass chatHistory to the flow
    });
    console.log("AI Flow response received:", aiResponse);

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
