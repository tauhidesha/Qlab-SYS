// @file: src/app/api/ai/ghost-writing/route.ts
// API endpoint khusus untuk Ghost Writing - mengkonversi pesan ke style Zoya

import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';

export async function POST(request: Request) {
  let body: any = {};
  
  try {
    body = await request.json();
    console.log('[Ghost Writing API] Request body:', { 
      hasMessage: !!body?.message,
      messageLength: body?.message?.length || 0,
      customerName: body?.customerName,
      customerPhone: body?.customerPhone
    });
    
    const { message, customerName, customerPhone } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { 
          success: false, 
          shouldCancel: true,
          error: 'Message is required - empty message'
        },
        { status: 400 }
      );
    }

    console.log('[Ghost Writing API] Converting message to Zoya style:', message);

    // Create ghost writing instruction for AI
    const ghostInput: ZoyaChatInput = {
      customerMessage: `[INSTRUKSI GHOST WRITING]: Tolong sampaikan pesan berikut ke pelanggan dengan gaya bahasa Zoya yang santai, ramah, dan natural seperti teman bengkel. Gunakan format WhatsApp dengan *tebal*, _miring_, emoji yang sesuai, dan panggil "mas". Pesan: "${message.trim()}"`,
      senderNumber: customerPhone || 'ghost_writing_session',
      senderName: customerName || 'Customer',
      chatHistory: []
    };

    const result = await generateWhatsAppReply(ghostInput);

    console.log('[Ghost Writing API] AI Response:', {
      hasResult: !!result,
      hasSuggestedReply: !!result?.suggestedReply,
      suggestedReplyLength: result?.suggestedReply?.length || 0,
      route: result?.route
    });

    if (!result || !result.suggestedReply?.trim()) {
      console.warn('[Ghost Writing API] AI response tidak valid, membatalkan pengiriman');
      
      return new Response(JSON.stringify({
        success: false,
        shouldCancel: true,
        error: 'Ghost writing gagal - hasil AI tidak valid'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('[Ghost Writing API] Conversion successful:', result.suggestedReply);

    return NextResponse.json({
      success: true,
      originalMessage: message,
      zoyaMessage: result.suggestedReply,
      metadata: {
        toolsUsed: result.metadata?.toolsUsed || [],
        route: result.route
      }
    });

  } catch (error) {
    console.error('[Ghost Writing API] Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      errorType: typeof error
    });
    
    // CANCEL KIRIM - jangan berikan fallback, langsung fail
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error during ghost writing',
        shouldCancel: true,
        originalMessage: body?.message || ''
      },
      { status: 400 }
    );
  }
}
