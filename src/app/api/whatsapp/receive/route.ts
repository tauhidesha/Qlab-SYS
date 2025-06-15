
// src/app/api/whatsapp/receive/route.ts
import { NextResponse } from 'next/server';
import { generateWhatsAppReply, type WhatsAppReplyInput, type WhatsAppReplyOutput } from '@/ai/flows/cs-whatsapp-reply-flow';
import { sendWhatsAppMessage } from '@/services/whatsappService';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit } from 'firebase/firestore';
import type { DirectMessage } from '@/types/directMessage';
import type { Client } from '@/types/client';

// Fungsi untuk memformat nomor telepon ke format internasional (mis. 62xxxx)
function formatPhoneNumberForMatching(number: string): string {
  let cleaned = number.replace(/\D/g, ''); 
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13) { 
    cleaned = '62' + cleaned;
  } else if (!cleaned.startsWith('62')) {
    if (cleaned.length >= 9 && cleaned.length <=13 && !cleaned.startsWith('+')) { 
        cleaned = '62' + cleaned;
    }
  }
  return cleaned;
}


export async function POST(request: Request) {
  console.log('API Route /api/whatsapp/receive: === ENTERED POST HANDLER ===');

  try {
    console.log('API Route /api/whatsapp/receive: Attempting to parse request body...');
    const body = await request.json();
    let { senderNumber, customerMessage } = body; 

    console.log(`API Route /api/whatsapp/receive: Parsed body: rawSenderNumber=${senderNumber}, customerMessage="${customerMessage}"`);

    if (!senderNumber || !customerMessage) {
      console.error('API Route /api/whatsapp/receive: Missing senderNumber or customerMessage.');
      return NextResponse.json({ success: false, error: 'Nomor pengirim dan isi pesan diperlukan.' }, { status: 400 });
    }

    const formattedSenderNumber = formatPhoneNumberForMatching(senderNumber);
    console.log(`API Route /api/whatsapp/receive: Formatted senderNumber for matching: ${formattedSenderNumber}`);

    let clientId: string | undefined = undefined;
    let clientName: string | undefined = undefined;
    try {
      console.log('API Route /api/whatsapp/receive: Attempting to find client in Firestore...');
      const clientsRef = collection(db, 'clients');
      const qClient = query(clientsRef, where("phone", "==", formattedSenderNumber), limit(1));
      const clientSnapshot = await getDocs(qClient);
      if (!clientSnapshot.empty) {
        const clientDoc = clientSnapshot.docs[0];
        clientId = clientDoc.id;
        clientName = (clientDoc.data() as Client).name;
        console.log(`API Route /api/whatsapp/receive: Client found: ID=${clientId}, Name=${clientName}`);
      } else {
        console.log(`API Route /api/whatsapp/receive: No client found matching phone ${formattedSenderNumber}.`);
        clientName = `Pelanggan (${formattedSenderNumber})`;
      }
    } catch (dbError: any) {
      console.error('API Route /api/whatsapp/receive: Error querying client:', dbError);
      clientName = `Pelanggan (${formattedSenderNumber})`; // Fallback client name
      // Do not rethrow, proceed with fallback name
    }

    try {
      console.log('API Route /api/whatsapp/receive: Attempting to save incoming message to directMessages...');
      const directMessagesRef = collection(db, 'directMessages');
      const incomingMessageData: Omit<DirectMessage, 'id'> = {
        customerId: clientId,
        customerName: clientName,
        senderNumber: formattedSenderNumber,
        text: customerMessage,
        sender: 'customer',
        timestamp: serverTimestamp() as any,
      };
      await addDoc(directMessagesRef, incomingMessageData);
      console.log('API Route /api/whatsapp/receive: Incoming message saved to directMessages.');
    } catch (dbError: any) {
      console.error('API Route /api/whatsapp/receive: Error saving incoming message to directMessages:', dbError);
      // Continue, but log the error
    }

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
    } catch (aiError: any) {
      console.error('API Route /api/whatsapp/receive: Error calling AI flow:', aiError);
      // Use default AI reply text
    }

    console.log(`API Route /api/whatsapp/receive: Attempting to send AI reply ("${aiReplyText}") to ${formattedSenderNumber} via local WhatsApp server.`);
    const sendResult = await sendWhatsAppMessage(formattedSenderNumber, aiReplyText);

    if (aiSuccess) { 
      try {
        console.log('API Route /api/whatsapp/receive: Attempting to save AI reply to directMessages...');
        const directMessagesRef = collection(db, 'directMessages');
        const aiReplyMessageData: Omit<DirectMessage, 'id'> = {
          customerId: clientId,
          customerName: clientName,
          senderNumber: formattedSenderNumber, 
          text: aiReplyText,
          sender: 'ai',
          timestamp: serverTimestamp() as any,
        };
        await addDoc(directMessagesRef, aiReplyMessageData);
        console.log('API Route /api/whatsapp/receive: AI reply saved to directMessages.');
      } catch (dbError: any) {
        console.error('API Route /api/whatsapp/receive: Error saving AI reply to directMessages:', dbError);
      }
    }

    if (sendResult.success) {
      console.log(`API Route /api/whatsapp/receive: AI reply successfully sent to ${formattedSenderNumber}. Message ID: ${sendResult.messageId}`);
      console.log('API Route /api/whatsapp/receive: === SUCCESSFULLY PROCESSED AND EXITING POST HANDLER ===');
      return NextResponse.json({ 
        success: true, 
        message: 'Pesan diterima, AI memproses, dan balasan dikirim.', 
        aiGeneratedReply: aiReplyText, 
        aiSuccess: aiSuccess,
        localServerResponseStatus: sendResult 
      });
    } else {
      console.error(`API Route /api/whatsapp/receive: Failed to send AI reply to ${formattedSenderNumber} via local server. Error: ${sendResult.error}`);
      console.log('API Route /api/whatsapp/receive: === EXITING POST HANDLER WITH SEND FAILURE ===');
      return NextResponse.json({ 
        success: false, 
        error: `Pesan diterima dan AI diproses, tapi gagal mengirim balasan ke pelanggan: ${sendResult.error}`,
        aiGeneratedReply: aiReplyText, 
        aiSuccess: aiSuccess,
        localServerResponseStatus: sendResult 
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('API Route /api/whatsapp/receive: === CAUGHT ERROR IN POST HANDLER ===');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);

    let errorMessage = 'Terjadi kesalahan internal server.';
    let statusCode = 500;

    if (error.name === 'SyntaxError' && error.message.toLowerCase().includes('json')) {
        errorMessage = 'Gagal mem-parsing JSON dari body request. Pastikan format request benar dan Content-Type adalah application/json.';
        statusCode = 400;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }
    
    console.log(`API Route /api/whatsapp/receive: Sending JSON error response: status=${statusCode}, message="${errorMessage}"`);
    return NextResponse.json({ 
        success: false, 
        error: errorMessage, 
        errorDetails: { name: error.name, message: error.message, stack: error.stack } // Include more details for debugging
    }, { status: statusCode });
  }
}
