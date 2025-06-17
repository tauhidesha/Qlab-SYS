
import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import { WhatsAppReplyInputSchema, ChatMessageSchema } from '@/types/ai/cs-whatsapp-reply';
import type { DirectMessage } from '@/types/directMessage';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit, doc, getDoc, Timestamp } from 'firebase/firestore';
import { z } from 'zod';

// Pastikan genkit diinisialisasi
import '@/ai/genkit';

const AI_LOCK_DURATION_MS = 1 * 60 * 60 * 1000; // 1 jam

const ApiReceiveInputSchema = z.object({
  customerMessage: z.string().min(1, "Pesan pelanggan tidak boleh kosong."),
  senderNumber: z.string().optional(), 
  chatHistory: z.array(ChatMessageSchema).optional(),
});

// Fungsi untuk memformat nomor telepon ke format standar untuk query Firestore (mis. 62xxxx)
function formatPhoneNumberForDbQuery(number?: string): string {
  if (!number || typeof number !== 'string' || number.trim() === '') {
    return '';
  }
  let cleaned = number.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13 && /^\d+$/.test(cleaned)) {
    cleaned = '62' + cleaned;
  } else if (!cleaned.startsWith('62') && /^\d{9,13}$/.test(cleaned) && !cleaned.startsWith('+')) {
    cleaned = '62' + cleaned;
  }
  
  if (cleaned.startsWith('62') && cleaned.length >= 10) {
    return cleaned;
  }
  return ''; // Kembalikan string kosong jika format akhir tidak sesuai
}


async function getClientInfo(formattedSenderNumber?: string): Promise<{ clientId?: string; customerName?: string }> {
  if (!formattedSenderNumber) return {}; // Jika nomor sudah tidak valid dari awal
  try {
    const clientsRef = collection(db, 'clients');
    // Query hanya dengan nomor yang sudah diformat dan valid
    const q = query(
      clientsRef,
      where("phone", "==", formattedSenderNumber), // Langsung gunakan nomor yang sudah diformat
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const clientDoc = querySnapshot.docs[0];
      return { clientId: clientDoc.id, customerName: clientDoc.data().name };
    }
  } catch (error) {
    console.error(`Error fetching client info for ${formattedSenderNumber}:`, error);
  }
  return { customerName: `Pelanggan ${formattedSenderNumber}` };
}

export async function POST(request: Request) {
  console.log("=== API /api/whatsapp/receive ENTERED POST HANDLER ===");
  try {
    const body = await request.json();
    console.log("Request body parsed:", body);

    if (body.chatHistory === null) {
      body.chatHistory = undefined;
    }

    const apiInputValidation = ApiReceiveInputSchema.safeParse(body);

    if (!apiInputValidation.success) {
      console.error("API Input validation failed:", apiInputValidation.error.format());
      return NextResponse.json({ success: false, error: 'Invalid input for API.', details: apiInputValidation.error.format() }, { status: 400 });
    }

    const { customerMessage, chatHistory, senderNumber: rawSenderNumber } = apiInputValidation.data;
    console.log("API Input validated. Customer message:", customerMessage, "Raw Sender:", rawSenderNumber);

    const directMessagesRef = collection(db, 'directMessages');
    let clientInfo: { clientId?: string; customerName?: string } = {};
    const formattedSenderNumber = formatPhoneNumberForDbQuery(rawSenderNumber); // Format nomornya di sini

    if (formattedSenderNumber) { // Hanya proses jika nomornya valid setelah diformat
      clientInfo = await getClientInfo(formattedSenderNumber);

      const customerMessageData: Omit<DirectMessage, 'id'> = {
        senderNumber: formattedSenderNumber, // Simpan nomor yang sudah diformat
        text: customerMessage,
        sender: 'customer',
        timestamp: serverTimestamp() as any, 
        customerId: clientInfo.clientId,
        customerName: clientInfo.customerName,
        read: false, 
      };
      await addDoc(directMessagesRef, customerMessageData);
      console.log(`Customer message from ${formattedSenderNumber} saved to directMessages.`);

      const interventionLockRef = doc(db, 'ai_intervention_locks', formattedSenderNumber);
      const lockSnap = await getDoc(interventionLockRef);
      if (lockSnap.exists()) {
        const lockData = lockSnap.data();
        const lockExpiresAt = lockData.lockExpiresAt as Timestamp; 
        if (lockExpiresAt && new Date() < lockExpiresAt.toDate()) {
          console.log(`AI response locked for ${formattedSenderNumber} until ${lockExpiresAt.toDate().toLocaleString()}. Human intervention active.`);
          return NextResponse.json({ success: true, message: "AI response deferred due to human intervention." });
        } else {
          console.log(`AI lock for ${formattedSenderNumber} has expired or does not exist.`);
        }
      } else {
        console.log(`No AI lock found for ${formattedSenderNumber}. Proceeding with AI.`);
      }

    } else {
      console.warn("senderNumber is undefined or invalid after formatting. AI will process without saving message or client context.");
    }
    
    console.log("Calling generateWhatsAppReply flow...");
    const aiResponse = await generateWhatsAppReply({
      customerMessage,
      senderNumber: formattedSenderNumber || undefined, // Teruskan nomor yang sudah diformat (atau undefined)
      chatHistory
    });
    console.log("AI Flow response received:", aiResponse);

    if (formattedSenderNumber && aiResponse.suggestedReply) {
      const aiMessageData: Omit<DirectMessage, 'id'> = {
        senderNumber: formattedSenderNumber, // Simpan nomor yang sudah diformat
        text: aiResponse.suggestedReply,
        sender: 'ai',
        timestamp: serverTimestamp() as any, 
        customerId: clientInfo.clientId,
        customerName: clientInfo.customerName,
        read: true, 
      };
      await addDoc(directMessagesRef, aiMessageData);
      console.log(`AI reply to ${formattedSenderNumber} saved to directMessages.`);
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
