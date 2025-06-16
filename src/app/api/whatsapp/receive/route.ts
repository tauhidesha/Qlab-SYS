
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
  senderNumber: z.string().optional(), // Tetap optional untuk kompatibilitas awal
  chatHistory: z.array(ChatMessageSchema).optional(),
});

async function getClientInfo(senderNumber: string): Promise<{ clientId?: string; customerName?: string }> {
  if (!senderNumber) return {};
  try {
    const clientsRef = collection(db, 'clients');
    // Mencoba berbagai format nomor telepon yang mungkin tersimpan
    const q = query(
      clientsRef,
      where("phone", "in", [
        senderNumber, // format 62xxxx
        `0${senderNumber.substring(2)}`, // format 0xxxx (jika senderNumber adalah 62xxxx)
        `+${senderNumber}` // format +62xxxx
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
  // Jika tidak ditemukan, gunakan senderNumber sebagai nama sementara
  return { customerName: `Pelanggan ${senderNumber}` };
}

export async function POST(request: Request) {
  console.log("=== API /api/whatsapp/receive ENTERED POST HANDLER ===");
  try {
    const body = await request.json();
    console.log("Request body parsed:", body);

    // Menangani chatHistory yang mungkin null dari beberapa implementasi whatsapp-web.js
    if (body.chatHistory === null) {
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
        timestamp: serverTimestamp() as any, // any untuk serverTimestamp
        customerId: clientInfo.clientId,
        customerName: clientInfo.customerName,
        read: false, // Pesan baru dari pelanggan, belum dibaca CS
      };
      await addDoc(directMessagesRef, customerMessageData);
      console.log(`Customer message from ${senderNumber} saved to directMessages.`);

      // Cek AI intervention lock
      const interventionLockRef = doc(db, 'ai_intervention_locks', senderNumber);
      const lockSnap = await getDoc(interventionLockRef);
      if (lockSnap.exists()) {
        const lockData = lockSnap.data();
        const lockExpiresAt = lockData.lockExpiresAt as Timestamp; // Cast ke Timestamp
        if (lockExpiresAt && new Date() < lockExpiresAt.toDate()) {
          console.log(`AI response locked for ${senderNumber} until ${lockExpiresAt.toDate().toLocaleString()}. Human intervention active.`);
          return NextResponse.json({ success: true, message: "AI response deferred due to human intervention." });
        } else {
          console.log(`AI lock for ${senderNumber} has expired or does not exist.`);
        }
      } else {
        console.log(`No AI lock found for ${senderNumber}. Proceeding with AI.`);
      }

    } else {
      // Jika tidak ada senderNumber, AI tetap bisa dipanggil untuk tujuan testing umum dari Playground,
      // tapi pesan tidak akan tersimpan dan tidak ada info klien.
      console.warn("senderNumber is undefined. AI will process without saving message or client context.");
    }
    
    console.log("Calling generateWhatsAppReply flow...");
    const aiResponse = await generateWhatsAppReply({
      customerMessage,
      senderNumber, // Teruskan senderNumber ke flow
      chatHistory
    });
    console.log("AI Flow response received:", aiResponse);

    // Jika ada balasan dari AI DAN ada senderNumber (artinya bukan dari playground tanpa nomor)
    if (senderNumber && aiResponse.suggestedReply) {
      const aiMessageData: Omit<DirectMessage, 'id'> = {
        senderNumber: senderNumber,
        text: aiResponse.suggestedReply,
        sender: 'ai',
        timestamp: serverTimestamp() as any, // any untuk serverTimestamp
        customerId: clientInfo.clientId,
        customerName: clientInfo.customerName,
        read: true, // Balasan AI dianggap "dibaca" oleh sistem
      };
      await addDoc(directMessagesRef, aiMessageData);
      console.log(`AI reply to ${senderNumber} saved to directMessages.`);
    }

    return NextResponse.json({ success: true, reply: aiResponse });

  } catch (error: any) {
    console.error("Internal server error in /api/whatsapp/receive:", error);
    let errorMessage = 'Internal Server Error';
    let errorDetails: any = {}; // Inisialisasi sebagai objek kosong
    if (error instanceof Error) {
      errorMessage = error.message;
      // Sertakan detail error yang lebih aman untuk logging
      errorDetails = { name: error.name, message: error.message, stack: error.stack };
    } else if (typeof error === 'object' && error !== null) {
      // Jika error bukan instance dari Error tapi adalah objek, coba ambil propertinya
      errorDetails = { ...error };
    }
    
    return NextResponse.json({ 
      success: false, 
      error: errorMessage,
      errorDetails: errorDetails // Sertakan detail error di respons (untuk debugging)
    }, { status: 500 });
  }
}
