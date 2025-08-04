// @file: src/app/api/ai/ghost-writing/route.ts
// API endpoint khusus untuk Ghost Writing - mengkonversi pesan ke style Zoya

import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, customerName, customerPhone } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
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

    if (!result?.suggestedReply) {
      throw new Error('AI tidak memberikan response untuk ghost writing');
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
    console.error('[Ghost Writing API] Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error during ghost writing',
        fallback: true
      },
      { status: 500 }
    );
  }
}
