
// src/app/api/whatsapp/receive/route.ts
import { NextResponse } from 'next/server';
import { generateWhatsAppReply, type WhatsAppReplyInput, type WhatsAppReplyOutput } from '@/ai/flows/cs-whatsapp-reply-flow';
import { sendWhatsAppMessage } from '@/services/whatsappService';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit } from 'firebase/firestore';
import type { DirectMessage } from '@/types/directMessage';
import type { Client } from '@/types/client';

// Fungsi untuk memformat nomor telepon ke format internasional (mis. 62xxxx)
// Ini bisa diekspos dari whatsappService.ts atau didefinisikan ulang di sini jika perlu
function formatPhoneNumberForMatching(number: string): string {
  let cleaned = number.replace(/\D/g, ''); 
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13) { 
    cleaned = '62' + cleaned;
  } else if (!cleaned.startsWith('62')) {
    // Jika tidak ada '62' dan bukan '0' di depan, tambahkan '62' (asumsi nomor Indonesia tanpa kode)
    // Ini mungkin perlu penyesuaian lebih lanjut tergantung format nomor masuk
    if (cleaned.length >= 9 && cleaned.length <=13 && !cleaned.startsWith('+')) { // Hindari +6262...
        cleaned = '62' + cleaned;
    }
  }
  return cleaned;
}


export async function POST(request: Request) {
  console.log('API Route /api/whatsapp/receive: Received POST request.');

  try {
    const body = await request.json();
    let { senderNumber, customerMessage } = body; // senderNumber mungkin belum terformat

    console.log(`API Route /api/whatsapp/receive: Parsed body: rawSenderNumber=${senderNumber}, customerMessage="${customerMessage}"`);

    if (!senderNumber || !customerMessage) {
      console.error('API Route /api/whatsapp/receive: Missing senderNumber or customerMessage.');
      return NextResponse.json({ success: false, error: 'Nomor pengirim dan isi pesan diperlukan.' }, { status: 400 });
    }

    const formattedSenderNumber = formatPhoneNumberForMatching(senderNumber);
    console.log(`API Route /api/whatsapp/receive: Formatted senderNumber for matching: ${formattedSenderNumber}`);


    // 1. Attempt to find client by phone number
    let clientId: string | undefined = undefined;
    let clientName: string | undefined = undefined;
    try {
      const clientsRef = collection(db, 'clients');
      // Query for exact match first, then try other variations if necessary
      const qClient = query(clientsRef, where("phone", "==", formattedSenderNumber), limit(1));
      const clientSnapshot = await getDocs(qClient);
      if (!clientSnapshot.empty) {
        const clientDoc = clientSnapshot.docs[0];
        clientId = clientDoc.id;
        clientName = (clientDoc.data() as Client).name;
        console.log(`API Route /api/whatsapp/receive: Client found: ID=${clientId}, Name=${clientName}`);
      } else {
        console.log(`API Route /api/whatsapp/receive: No client found matching phone ${formattedSenderNumber}. Treating as new/unlinked sender.`);
        // clientName bisa diisi dengan formattedSenderNumber jika tidak ada nama klien
        clientName = `Pelanggan (${formattedSenderNumber})`;
      }
    } catch (dbError) {
      console.error('API Route /api/whatsapp/receive: Error querying client:', dbError);
      // Continue processing even if client lookup fails, just won't link to a client ID
      clientName = `Pelanggan (${formattedSenderNumber})`;
    }

    // 2. Save incoming message to 'directMessages'
    try {
      const directMessagesRef = collection(db, 'directMessages');
      const incomingMessageData: Omit<DirectMessage, 'id'> = {
        customerId: clientId,
        customerName: clientName || `Pelanggan (${formattedSenderNumber})`,
        senderNumber: formattedSenderNumber, // Simpan nomor yang sudah diformat
        text: customerMessage,
        sender: 'customer',
        timestamp: serverTimestamp() as any, // Firestore will fill this
      };
      await addDoc(directMessagesRef, incomingMessageData);
      console.log('API Route /api/whatsapp/receive: Incoming message saved to directMessages.');
    } catch (dbError) {
      console.error('API Route /api/whatsapp/receive: Error saving incoming message to directMessages:', dbError);
      // Continue, but log the error
    }

    // 3. Dapatkan balasan dari AI
    const aiInput: WhatsAppReplyInput = { customerMessage };
    let aiReplyText = "Maaf, saya belum bisa memproses permintaan Anda saat ini."; 
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
    }

    // 4. Kirim balasan AI kembali ke pelanggan via server WhatsApp lokal
    console.log(`API Route /api/whatsapp/receive: Attempting to send AI reply ("${aiReplyText}") to ${formattedSenderNumber} via local WhatsApp server.`);
    const sendResult = await sendWhatsAppMessage(formattedSenderNumber, aiReplyText);

    // 5. Save AI's reply to 'directMessages' if successfully sent (or even if attempted, for logging)
    if (aiSuccess) { // Simpan balasan AI jika AI berhasil membuat saran (terlepas dari sukses kirim atau tidak)
      try {
        const directMessagesRef = collection(db, 'directMessages');
        const aiReplyMessageData: Omit<DirectMessage, 'id'> = {
          customerId: clientId,
          customerName: clientName || `Pelanggan (${formattedSenderNumber})`,
          senderNumber: formattedSenderNumber, 
          text: aiReplyText,
          sender: 'ai',
          timestamp: serverTimestamp() as any,
        };
        await addDoc(directMessagesRef, aiReplyMessageData);
        console.log('API Route /api/whatsapp/receive: AI reply saved to directMessages.');
      } catch (dbError) {
        console.error('API Route /api/whatsapp/receive: Error saving AI reply to directMessages:', dbError);
      }
    }

    if (sendResult.success) {
      console.log(`API Route /api/whatsapp/receive: AI reply successfully sent to ${formattedSenderNumber}. Message ID: ${sendResult.messageId}`);
      return NextResponse.json({ 
        success: true, 
        message: 'Pesan diterima, AI memproses, dan balasan dikirim.', 
        aiGeneratedReply: aiReplyText, 
        aiSuccess: aiSuccess,
        localServerResponseStatus: sendResult 
      });
    } else {
      console.error(`API Route /api/whatsapp/receive: Failed to send AI reply to ${formattedSenderNumber} via local server. Error: ${sendResult.error}`);
      return NextResponse.json({ 
        success: false, 
        error: `Pesan diterima dan AI diproses, tapi gagal mengirim balasan ke pelanggan: ${sendResult.error}`,
        aiGeneratedReply: aiReplyText, 
        aiSuccess: aiSuccess,
        localServerResponseStatus: sendResult 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('API Route /api/whatsapp/receive: Top-level internal server error:', error);
    let errorMessage = 'Kesalahan internal server.';
    if (error instanceof SyntaxError && error.message.includes("JSON")) {
        errorMessage = 'Gagal mem-parsing JSON dari body request. Pastikan format request benar.';
        console.error('API Route /api/whatsapp/receive: Error detail: Gagal parsing JSON request body.');
        return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: `Internal server error in /api/whatsapp/receive: ${errorMessage}` }, { status: 500 });
  }
}
