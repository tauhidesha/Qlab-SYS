
import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import { WhatsAppReplyInputSchema, ChatMessageSchema } from '@/types/ai/cs-whatsapp-reply';
import type { DirectMessage } from '@/types/directMessage';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit } from 'firebase/firestore';
import { z } from 'zod';

// Pastikan genkit diinisialisasi
import '@/ai/genkit';

const ApiReceiveInputSchema = z.object({
  customerMessage: z.string().min(1, "Pesan pelanggan tidak boleh kosong."),
  senderNumber: z.string().optional(),
  chatHistory: z.array(ChatMessageSchema).optional(),
});

async function getClientInfo(senderNumber: string): Promise<{ clientId?: string; customerName?: string }> {
  if (!senderNumber) return {};
  try {
    const clientsRef = collection(db, 'clients');
    // Mencoba mencocokkan dengan berbagai format nomor yang mungkin disimpan
    const q = query(
      clientsRef,
      where("phone", "in", [
        senderNumber, // 62812...
        `0${senderNumber.substring(2)}`, // 0812...
        `+${senderNumber}` // +62812...
      ]),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const clientDoc = querySnapshot.docs[0];
      return { clientId: clientDoc.id, customerName: clientDoc.data().name };
    }
  } catch (error) {
    console.error(`Error fetching client info for ${senderNumber}:`, error);
  }
  return { customerName: `Pelanggan ${senderNumber}` }; // Default name if not found
}

export async function POST(request: Request) {
  console.log("=== API /api/whatsapp/receive ENTERED POST HANDLER ===");
  try {
    console.log("Attempting to parse request body...");
    const body = await request.json();
    console.log("Request body parsed successfully:", body);

    if (body.chatHistory === null) {
      console.log("Sanitizing chatHistory: was null, setting to undefined.");
      body.chatHistory = undefined;
    }

    const apiInputValidation = ApiReceiveInputSchema.safeParse(body);

    if (!apiInputValidation.success) {
      console.error("API Input validation failed:", apiInputValidation.error.format());
      return NextResponse.json({ success: false, error: 'Invalid input for API.', details: apiInputValidation.error.format() }, { status: 400 });
    }
    
    const { customerMessage, chatHistory, senderNumber } = apiInputValidation.data;
    console.log("API Input validated. Customer message:", customerMessage, "Sender:", senderNumber);
    
    const directMessagesRef = collection(db, 'directMessages');
    let clientInfo: { clientId?: string; customerName?: string } = {};

    if (senderNumber) {
      clientInfo = await getClientInfo(senderNumber);
      
      // Simpan pesan pelanggan ke Firestore
      const customerMessageData: Omit<DirectMessage, 'id'> = {
        senderNumber: senderNumber,
        text: customerMessage,
        sender: 'customer',
        timestamp: serverTimestamp() as any,
        customerId: clientInfo.clientId,
        customerName: clientInfo.customerName,
        read: false, // Pesan baru dari customer defaultnya belum dibaca
      };
      await addDoc(directMessagesRef, customerMessageData);
      console.log(`Customer message from ${senderNumber} saved to directMessages.`);
    } else {
      console.warn("senderNumber is undefined, cannot save customer message or fetch client info accurately.");
    }
    
    console.log("Calling generateWhatsAppReply flow...");
    
    const aiResponse = await generateWhatsAppReply({ 
      customerMessage, 
      senderNumber, // Kirim senderNumber ke flow AI
      chatHistory 
    });
    console.log("AI Flow response received:", aiResponse);

    if (senderNumber && aiResponse.suggestedReply) {
      // Simpan balasan AI ke Firestore
      const aiMessageData: Omit<DirectMessage, 'id'> = {
        senderNumber: senderNumber, // Nomor pelanggan yang sama
        text: aiResponse.suggestedReply,
        sender: 'ai',
        timestamp: serverTimestamp() as any,
        customerId: clientInfo.clientId,
        customerName: clientInfo.customerName,
        read: true, // Balasan AI dianggap "sudah dibaca" oleh sistem
      };
      await addDoc(directMessagesRef, aiMessageData);
      console.log(`AI reply to ${senderNumber} saved to directMessages.`);
    }

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

    