// @file: src/app/api/ai/ghost-writing/route.ts
// API endpoint khusus untuk Ghost Writing - mengkonversi pesan ke style Zoya

import { NextResponse } from 'next/server';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import { getConversationHistory } from '@/ai/utils/conversationHistory';
import type { ZoyaChatInput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import type OpenAI from 'openai';

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

    // 🔍 Get chat history for context-aware ghost writing
    let chatHistory: ChatMessage[] = [];
    try {
      if (customerPhone && customerPhone !== 'ghost_writing_session') {
        // Format phone number for database lookup
        let formattedPhone = customerPhone;
        if (formattedPhone.startsWith('0')) {
          formattedPhone = '62' + formattedPhone.substring(1);
        } else if (!formattedPhone.startsWith('62')) {
          formattedPhone = '62' + formattedPhone;
        }
        
        console.log('[Ghost Writing API] Fetching chat history for:', formattedPhone);
        const rawHistory = await getConversationHistory(formattedPhone);
        console.log(`[Ghost Writing API] Retrieved ${rawHistory.length} messages from history`);
        
        // Convert OpenAI format to ChatMessage format
        chatHistory = rawHistory
          .filter(msg => msg.role !== 'developer') // Filter out developer messages
          .map(msg => ({
            role: msg.role as 'user' | 'assistant' | 'system' | 'tool',
            content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content),
            tool_calls: (msg as any).tool_calls,
            tool_call_id: (msg as any).tool_call_id
          }))
          .slice(-10); // Take only the last 10 messages
        
        console.log(`[Ghost Writing API] Converted to ${chatHistory.length} ChatMessage format`);
      }
    } catch (historyError) {
      console.warn('[Ghost Writing API] Could not fetch chat history:', historyError);
      // Continue with empty history if fetch fails
    }

    // Create ghost writing instruction for AI with enhanced context
    const ghostInstruction = `[INSTRUKSI GHOST WRITING]: 
Tolong sampaikan pesan berikut ke pelanggan dengan gaya bahasa Zoya yang santai, ramah, dan natural seperti teman bengkel. 
- Gunakan format WhatsApp dengan *tebal*, _miring_, emoji yang sesuai
- Panggil "mas" untuk customer 
- Jika pesan memerlukan informasi layanan/harga, gunakan tools yang tersedia untuk memberikan info yang akurat
- Integrasikan informasi dari chat history sebelumnya jika relevan
- Pesan CS: "${message.trim()}"`;

    const ghostInput: ZoyaChatInput = {
      customerMessage: ghostInstruction,
      senderNumber: customerPhone || 'ghost_writing_session',
      senderName: customerName || 'Customer',
      chatHistory: chatHistory
    };

    const result = await generateWhatsAppReply(ghostInput, { bypassInterventionLock: true });

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
