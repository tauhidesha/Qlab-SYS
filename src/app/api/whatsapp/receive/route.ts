// File: src/app/api/whatsapp/receive/route.ts


import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';
import { handleHumanReplyForwarding } from '@/ai/utils/handsoff/handleHumanReplyForwarding';
import { handlePaymentFlow } from '@/ai/utils/payment/handlePaymentFlow';
import { sendWhatsAppMessage } from '@/services/whatsappService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[API /receive] Menerima request:', body);

    const { 
      customerMessage, 
      senderNumber, 
      chatHistory, 
      senderName,
      mediaBase64,
      mediaMimeType,
      mediaType,
      imageAnalysisRequest
    } = body;

    if (!senderNumber) {
      return NextResponse.json({ success: false, error: 'senderNumber wajib diisi.' }, { status: 400 });
    }
    // No changes made. Committing current state.
    // 🔥 NEW: Handle Image Analysis - Only for actual images
    let imageContext: {
      imageUrl: string;
      analysisType: 'condition' | 'damage' | 'color' | 'license_plate' | 'detailing' | 'coating' | 'general';
      analysisResult: any;
    } | undefined = undefined;
    
    if (imageAnalysisRequest?.hasImage && mediaBase64 && mediaType === 'image' && mediaMimeType?.startsWith('image/')) {
      try {
        console.log('[IMAGE ANALYSIS] Processing image from WhatsApp...');
        console.log('[IMAGE ANALYSIS] Media type:', mediaType, 'MIME type:', mediaMimeType);
        
        // Convert base64 to data URL for GPT-4.1 mini
        const imageUrl = `data:${mediaMimeType};base64,${mediaBase64}`;
        
        // Import image utilities
        const { detectAnalysisType, logImageAnalysis } = await import('@/ai/utils/imageProcessing');
        const { analyzeMotorImageTool } = await import('@/ai/tools/vision/analyzeMotorImage');
        
        // Auto-detect analysis type
        const analysisType = detectAnalysisType(imageAnalysisRequest.customerMessage);
        console.log(`[IMAGE ANALYSIS] Detected type: ${analysisType}`);
        
        // Run image analysis
        const analysisResult = await analyzeMotorImageTool.implementation({
          imageUrl,
          analysisType,
          specificRequest: imageAnalysisRequest.customerMessage
        });
        
        // Log for monitoring
        logImageAnalysis(senderNumber, analysisType, analysisResult, imageUrl);
        
        // Create image context for AI agent
        if (analysisResult.success) {
          imageContext = {
            imageUrl,
            analysisType,
            analysisResult: {
              analysis: analysisResult.response,
              confidence: 0.8, // Default confidence
              tokenUsage: analysisResult.data?.tokenUsage
            }
          };
          console.log('[IMAGE ANALYSIS] Analysis successful, added to context');
        }
        
      } catch (imageError) {
        console.error('[IMAGE ANALYSIS] Error:', imageError);
        // Continue with normal flow even if image analysis fails
      }
    } else if (mediaType && !mediaMimeType?.startsWith('image/')) {
      console.log('[MESSAGE TYPE] Non-image media received:', { mediaType, mediaMimeType });
      // Handle other media types like location, document, etc.
    }

    // --- ALUR BARU: Modular Handlers dengan Ghostwriting ---
    const forwardingInstruction = await handleHumanReplyForwarding(senderNumber, customerMessage);
    if (forwardingInstruction) {
      console.log(`[API /receive] Meneruskan instruksi dari BosMat ke Zoya untuk pelanggan ${forwardingInstruction.targetCustomerNumber}`);
      
      const ghostwriterInput: ZoyaChatInput = {
        senderNumber: forwardingInstruction.targetCustomerNumber,
        customerMessage: forwardingInstruction.ghostwriterMessage,
        chatHistory: [],
        senderName: '', 
      };
      
      const aiResponse = await generateWhatsAppReply(ghostwriterInput);
      console.log('[DEBUG] Hasil Ghostwriting dari AI Flow:', JSON.stringify(aiResponse, null, 2));
      
      if (aiResponse.suggestedReply) {
        // 2. Kirim pesan ke pelanggan
        await sendWhatsAppMessage(
          forwardingInstruction.targetCustomerNumber,
          aiResponse.suggestedReply
        );
        console.log(`[API /receive] Pesan untuk pelanggan ${forwardingInstruction.targetCustomerNumber} telah dikirim.`);
      }
      
      // 3. Tutup request dari BosMat dengan jawaban "OK"
      return NextResponse.json({ status: 'ok', message: 'Forwarded instruction processed.' });
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
      customerMessage: customerMessage || (imageContext ? '[Image sent for analysis]' : ''),
      chatHistory: chatHistory || [],
      senderName,
      imageContext, // 🔥 NEW: Pass image analysis context
    };

    const aiResponse = await generateWhatsAppReply(input);
    console.log('[DEBUG] Hasil dari AI Flow sebelum dikirim:', JSON.stringify(aiResponse, null, 2));

    return NextResponse.json(aiResponse);

  } catch (error: any) {
    console.error('Error di /api/whatsapp/receive:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}