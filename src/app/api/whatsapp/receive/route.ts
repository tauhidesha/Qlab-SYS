// File: src/app/api/whatsapp/receive/route.ts


import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';
import { handleHumanReplyForwarding } from '@/ai/utils/handsoff/handleHumanReplyForwarding';
import { handlePaymentFlow } from '@/ai/utils/payment/handlePaymentFlow';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[API /receive] Menerima request:', body);

    const { customerMessage, senderNumber, chatHistory, senderName } = body;

    if (!senderNumber) {
      return NextResponse.json({ success: false, error: 'senderNumber wajib diisi.' }, { status: 400 });
    }

    // --- ALUR BARU: Modular Handlers dengan Ghostwriting ---

    // 1. Coba proses sebagai balasan dari BosMat (yang akan di-ghostwrite)
    const forwardingInstruction = await handleHumanReplyForwarding(senderNumber, customerMessage);
    if (forwardingInstruction) {
      console.log(`[API /receive] Meneruskan instruksi dari BosMat ke Zoya untuk pelanggan ${forwardingInstruction.targetCustomerNumber}`);
      
      // Panggil Zoya AI, TAPI dengan input yang sudah dimodifikasi
      const ghostwriterInput: ZoyaChatInput = {
        senderNumber: forwardingInstruction.targetCustomerNumber, // Jalankan sebagai pelanggan
        customerMessage: forwardingInstruction.ghostwriterMessage, // Dengan pesan instruksi
        chatHistory: [], // History tidak relevan untuk tugas ini
        senderName: '', // Nama tidak relevan
      };
      
      const aiResponse = await generateWhatsAppReply(ghostwriterInput);
      console.log('[DEBUG] Hasil Ghostwriting dari AI Flow:', JSON.stringify(aiResponse, null, 2));
      
      // Kirim balasan yang sudah dipoles ke pelanggan
      return NextResponse.json(aiResponse);
    }

    // 2. Jika bukan dari BosMat, coba proses alur pembayaran
    const paymentResult = await handlePaymentFlow(body);
    if (paymentResult) {
      console.log('[API /receive] Hasil dari handlePaymentFlow:', paymentResult);
      if (paymentResult.message) {
        return NextResponse.json({ suggestedReply: paymentResult.message });
      }
      return NextResponse.json({ status: paymentResult.status, result: paymentResult.result || 'ok' });
    }

    // 3. Jika bukan keduanya, dan pesan teks kosong, abaikan
    if (!customerMessage) {
      return NextResponse.json({ status: 'ok', message: 'No actionable text content.' });
    }

    // 4. Jika semua handler di atas tidak cocok, lanjutkan ke AI Zoya seperti biasa
    const input: ZoyaChatInput = {
      senderNumber,
      customerMessage,
      chatHistory: chatHistory || [],
      senderName,
    };

    const aiResponse = await generateWhatsAppReply(input);
    console.log('[DEBUG] Hasil dari AI Flow sebelum dikirim:', JSON.stringify(aiResponse, null, 2));

    return NextResponse.json(aiResponse);

  } catch (error: any) {
    console.error('Error di /api/whatsapp/receive:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}