// @file: src/ai/flows/cs-whatsapp-reply-flow.ts (OPTIMIZED)
'use server';

import { updateSession, getSession } from '@/ai/utils/session';
import { runZoyaAIAgentOptimized } from '@/ai/agent/runZoyaAIAgent';
import { getConversationHistory, saveAIResponse } from '@/ai/utils/conversationHistory';
import { optimizeConversationHistory, monitorTokenUsage, calculateConversationTokens } from '@/ai/utils/contextManagement';
import { masterPrompt } from '@/ai/config/aiPrompts';
import { isInterventionLockActive } from '@/ai/utils/interventionLock';
import { triggerBosMatTool } from '@/ai/tools/impl/triggerBosMamatTool';
import { sendBookingConversion } from '@/services/metaConversionApi'; // 🔥 NEW: Meta Conversion API
import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import type { Session } from '@/types/ai/session';
import { createTraceable, TRACE_TAGS, createTraceMetadata } from '@/lib/langsmith';
import { recordAIMetrics, recordAIError, type AIMetrics } from '@/lib/monitoring/aiMetrics'; // 🔥 NEW

export const generateWhatsAppReplyOptimized = createTraceable(async (input: ZoyaChatInput, options?: { bypassInterventionLock?: boolean }): Promise<WhatsAppReplyOutput> => {
  const { customerMessage, senderNumber, senderName } = input;
  const startTime = Date.now();
  const conversationId = `conv_${senderNumber}_${startTime}`;
  
  console.log('[generateWhatsAppReplyOptimized] Starting optimized flow');
  
  if (!senderNumber) {
    throw new Error('senderNumber is required');
  }
  
  // Check intervention lock first (unless bypassed for ghost writing)
  const locked = await isInterventionLockActive(senderNumber);
  console.log('[INTERVENTION LOCK CHECK]', { senderNumber, locked, bypassEnabled: options?.bypassInterventionLock });
  if (locked && !options?.bypassInterventionLock) {
    console.log(`[InterventionLock] Sesi ${senderNumber} sedang di-lock untuk intervensi manusia. Tidak memproses balasan otomatis.`);
    return {
      suggestedReply: "", // Empty reply means no AI response
      toolCalls: [],
      route: 'intervention_locked',
      metadata: { 
        toolsUsed: [],
        iterations: 0,
        tokenUsage: { estimated: 0 },
        interventionLocked: true
      },
    };
  }
  
  try {
    // Get or create session
    let session = await getSession(senderNumber) as Session | null;
    console.log('[generateWhatsAppReplyOptimized] Session:', session ? 'Found' : 'Creating new');
    
    if (!session) {
      session = {
        senderNumber,
        senderName,
        lastInteraction: { type: 'system', at: Date.now() },
        cartServices: [],
        history: [],
      };
      await updateSession(senderNumber, session);
      console.log('[generateWhatsAppReplyOptimized] New session created');
    }

    // Get conversation history with optimization - prioritize input chatHistory if provided
    let history;
    if (input.chatHistory && input.chatHistory.length > 0) {
      history = input.chatHistory;
      console.log(`[generateWhatsAppReplyOptimized] Using provided chatHistory: ${history.length} messages`);
    } else {
      history = await getConversationHistory(senderNumber);
      console.log(`[generateWhatsAppReplyOptimized] Retrieved from database: ${history.length} messages from history`);
    }
    
    // 🚨 NEW: Check conversation relevance to prevent unnecessary responses
    const conversationContext = history.slice(-4).map(h => h.content).join(' ');
    
    // Quick relevance check for obvious stop conditions
    const lowerMessage = customerMessage.toLowerCase();
    const shouldStopKeywords = [
      'bandung', 'di bandung', 'jakarta', 'surabaya', 'yogya', 'medan', 'makassar',
      'jauh banget', 'terlalu jauh', 'di luar kota', 'beda kota',
      'cara berhenti', 'stop balas', 'jangan balas', 'matiin notif',
      'ga jadi', 'tidak jadi', 'batal', 'sudah tidak perlu'
    ];
    
    const shouldStopConversation = shouldStopKeywords.some(keyword => lowerMessage.includes(keyword));
    
    if (shouldStopConversation) {
      console.log('[CONVERSATION STOP] Detected stop condition, ending conversation gracefully');
      
      let stopMessage = '';
      if (lowerMessage.includes('bandung') || lowerMessage.includes('di bandung')) {
        stopMessage = 'Wah mas di Bandung ya? Sayang sekali Bosmat hanya melayani area Depok-Jakarta. Terima kasih sudah menanyakan layanan kami! 😊';
      } else if (lowerMessage.includes('cara berhenti') || lowerMessage.includes('stop balas')) {
        stopMessage = 'Baik mas, chat otomatis sudah distop. Kalau butuh info layanan Bosmat lagi nanti bisa chat ulang ya! 😊';
      } else if (lowerMessage.includes('jauh') || lowerMessage.includes('luar kota')) {
        stopMessage = 'Oke mas, memang agak jauh ya. Kalau nanti ada rencana ke area Depok-Jakarta, bisa hubungi kami lagi! 😊';
      } else {
        stopMessage = 'Oke mas, terima kasih sudah bertanya tentang Bosmat. Kalau nanti butuh info lagi, silakan chat ya! 😊';
      }
      
      // Save the stop response and end conversation
      await saveAIResponse(senderNumber, stopMessage, { 
        toolsUsed: ['conversation_stopped'], 
        iterations: 0
      });
      
      return {
        suggestedReply: stopMessage,
        toolCalls: [],
        route: 'conversation_stopped',
        metadata: { 
          toolsUsed: ['conversation_stopped'],
          iterations: 0,
          tokenUsage: { estimated: 50 },
          stopReason: 'irrelevant_conversation'
        },
      };
    }
    
    // Monitor initial token usage
    const initialStats = calculateConversationTokens(history);
    console.log(`[generateWhatsAppReplyOptimized] Initial conversation tokens: ${initialStats.totalTokens}`);
    
    // Apply aggressive optimization if needed
    if (initialStats.totalTokens > 2500) {
      history = optimizeConversationHistory(history, 2000);
      console.log('[generateWhatsAppReplyOptimized] Applied aggressive conversation optimization');
    }
    
    // Use enhanced lightweight prompt for optimal format (bullet points, concise)
    // while maintaining comprehensive service information
    const hasSystemPrompt = history.some(p => p.role === 'system' && p.content?.toString().includes('Zoya'));
    
    if (!hasSystemPrompt) {
      const userAndAssistantHistory = history.filter(p => p.role !== 'system');
      history = [{ role: 'system', content: masterPrompt }, ...userAndAssistantHistory];
      console.log('[generateWhatsAppReplyOptimized] Enhanced lightweight prompt injected');
    }

    // Add current user message
    history.push({ role: 'user', content: customerMessage });
    console.log(`[generateWhatsAppReplyOptimized] Added user message: ${customerMessage.substring(0, 50)}...`);

        // 🔥 IG ADS TRAFFIC DETECTION: Smart detection for general inquiries
    const isGeneralInquiry = /^(halo|hai|hi|info|bisakah|bisa|mau tanya|pengen tahu|berapa|harga|promo|detail|selengkapnya|paket|layanan|service)(\s|$|!|\?)/i.test(customerMessage.trim());
    const isBookingInquiry = /(booking|book|reservasi|pesan|jadwal|slot|antri|giliran)/i.test(customerMessage.trim());
    const isSpecificInquiry = /^(motor\s|sudah\s|status\s|kapan\s|jam\s|alamat\s|lokasi\s|hari\s|tanggal\s)/i.test(customerMessage.trim());
    const isSpecificServiceInquiry = /(poles|detailing|coating|repaint|cat|cuci|wax|nano|graphene|ceramic)/i.test(customerMessage.trim());
    const isFirstMessage = history.filter(p => p.role === 'user').length === 1; // Only current message
    
    // Only trigger promo for truly general inquiries, NOT booking inquiries OR specific service inquiries
    if (isGeneralInquiry && isFirstMessage && !isSpecificInquiry && !isBookingInquiry && !isSpecificServiceInquiry) {
      console.log('[IG ADS TRAFFIC] Detected general inquiry from potential IG ads traffic, prioritizing promo bundling');
      // Add promo context to help AI prioritize bundling promo
      history.push({ 
        role: 'system', 
        content: `PRIORITAS: Customer baru dengan pertanyaan umum - langsung kasih info promo bundling terbaik dengan getPromoBundleDetails untuk tarik minat!`
      });
    }

    // Add current date context (SUPER EXPLICIT untuk AI)
    const currentDate = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const timeOptions: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    };
    
    const explicitDateContext = `KONTEKS WAKTU SEKARANG - WAJIB DIGUNAKAN:
- Hari ini: ${currentDate.toLocaleDateString('id-ID', dateOptions)}
- Jam sekarang: ${currentDate.toLocaleTimeString('id-ID', timeOptions)} WIB
- Tahun sekarang: 2025 (BUKAN 2024!)
- Bulan sekarang: Agustus 2025
- Tanggal sekarang: ${currentDate.getDate()} Agustus 2025

PENTING: Jika customer minta booking atau bicara tentang tanggal, gunakan referensi waktu di atas. Jangan salah tahun!`;
    
    history.push({ role: 'system', content: explicitDateContext });

    // Run optimized agent
    const agentResult = await runZoyaAIAgentOptimized({
      chatHistory: history,
      session,
      senderNumber,
      senderName,
      imageContext: input.imageContext, // 🔥 NEW: Pass image context
    });

    console.log('[generateWhatsAppReplyOptimized] Agent completed');
    console.log(`[generateWhatsAppReplyOptimized] Token usage - Estimated: ${agentResult.metadata.tokenUsage.estimated}, Actual: ${agentResult.metadata.tokenUsage.actual || 'N/A'}`);
    console.log(`[generateWhatsAppReplyOptimized] Tools used: ${agentResult.metadata.toolsUsed.join(', ') || 'None'}`);
    console.log(`[generateWhatsAppReplyOptimized] Iterations: ${agentResult.metadata.iterations}`);

    // Update session with minimal changes
    const sessionUpdate: Partial<Session> = {
      lastInteraction: { 
        type: 'ai_response', 
        at: Date.now()
      },
      lastAssistantMessage: agentResult.suggestedReply,
    };

    // Set followUpState for daily follow-up automation
    if (!session.followUpState) {
      sessionUpdate.followUpState = {
        level: 1,
        flaggedAt: Date.now(),
        context: customerMessage || 'unknown',
      };
    } else {
      // Only reset follow-up state if customer made a booking
      // Check if any booking-related tools were used
      const bookingTools = ['createBooking', 'checkBookingAvailability', 'findNextAvailableSlot'];
      const hasBookingActivity = agentResult.metadata.toolsUsed.some(tool => 
        bookingTools.includes(tool)
      );
      
      if (hasBookingActivity) {
        // Customer made booking progress, reset follow-up state
        sessionUpdate.followUpState = {
          level: 1,
          flaggedAt: Date.now(),
          context: `Booking activity: ${customerMessage}`,
        };
        console.log('[generateWhatsAppReplyOptimized] Follow-up reset due to booking activity');
      } else {
        // Customer is just chatting, don't reset - let cron job follow up later
        // Just update the context but keep the existing flaggedAt and level
        sessionUpdate.followUpState = {
          ...session.followUpState,
          context: customerMessage || session.followUpState.context,
        };
        console.log('[generateWhatsAppReplyOptimized] Follow-up state maintained for future cron follow-up');
      }
    }

    // Clean undefined values
    Object.keys(sessionUpdate).forEach((k) => {
      if (sessionUpdate[k] === undefined) {
        delete sessionUpdate[k];
      }
    });
    
    await updateSession(senderNumber, sessionUpdate);

    // Save AI response to conversation history
    await saveAIResponse(
      senderNumber, 
      agentResult.suggestedReply,
      {
        toolsUsed: agentResult.metadata.toolsUsed,
        iterations: agentResult.metadata.iterations
      }
    );

    // 🔥 NEW: Record AI metrics for monitoring
    const endTime = Date.now();
    
    // 🔥 META CONVERSION API: Track booking conversions for IG ads
    const hasBookingConversion = agentResult.metadata.toolsUsed.includes('createBooking');
    if (hasBookingConversion) {
      console.log('[META CONVERSION] Booking detected, triggering Meta Conversion API...');
      
      try {
        // Extract booking data from AI response or session
        const bookingData = {
          customerPhone: senderNumber,
          customerName: senderName || 'Customer',
          services: session.cartServices || [{ serviceName: 'Service Booking', price: 100000 }], // Default or from session
          totalValue: session.cartServices?.reduce((total, service) => total + (service.price || 100000), 0) || 100000,
          bookingId: conversationId
        };
        
        const conversionResult = await sendBookingConversion(bookingData);
        
        if (conversionResult.success) {
          console.log('[META CONVERSION] Successfully sent to Meta:', conversionResult.eventId);
        } else {
          console.warn('[META CONVERSION] Failed to send:', conversionResult.error);
        }
      } catch (conversionError) {
        console.error('[META CONVERSION] Error:', conversionError);
        // Don't fail the main flow if conversion tracking fails
      }
    }
    
    const aiMetrics: Omit<AIMetrics, 'timestamp' | 'version'> = {
      conversationId,
      customerPhone: senderNumber,
      startTime,
      endTime,
      responseTime: endTime - startTime,
      toolsUsed: agentResult.metadata.toolsUsed,
      iterations: agentResult.metadata.iterations,
      tokenUsage: {
        input: agentResult.metadata.tokenUsage.estimated || 0,
        output: agentResult.metadata.tokenUsage.actual || 0,
        estimated: agentResult.metadata.tokenUsage.estimated || 0,
        actual: agentResult.metadata.tokenUsage.actual,
        cost: ((agentResult.metadata.tokenUsage.estimated || 0) * 0.00015 / 1000) // Rough GPT-4 cost estimate
      },
      conversionType: hasBookingConversion ? 'booking' : 
                     agentResult.metadata.toolsUsed.includes('triggerBosMatTool') ? 'handover' : 'info',
      humanHandover: agentResult.metadata.toolsUsed.includes('triggerBosMatTool'),
      errors: [],
      messageType: input.imageContext ? 'image' : 'text',
      promptVersion: 'lightweight',
      environment: process.env.NODE_ENV || 'development'
    };

    // Record metrics (non-blocking)
    recordAIMetrics(aiMetrics).catch(error => 
      console.error('[Monitoring] Failed to record metrics:', error)
    );

    const finalOutput: WhatsAppReplyOutput = {
      suggestedReply: agentResult.suggestedReply,
      toolCalls: agentResult.toolCalls || [],
      route: agentResult.toolCalls.length > 0 ? 'optimized_with_tools' : 'optimized_completion',
      metadata: { 
        ...agentResult.metadata,
        optimized: true,
        promptVersion: 'lightweight',
        conversationId // Add conversation ID to output
      },
    };

    console.log('[generateWhatsAppReplyOptimized] Flow completed successfully');
    return finalOutput;

  } catch (error) {
    console.error('[generateWhatsAppReplyOptimized] Critical error:', error);
    
    // Trigger BosMAT for critical errors
    try {
      console.log('[generateWhatsAppReplyOptimized] Triggering BosMAT due to critical error');
      await triggerBosMatTool.implementation({
        reason: 'Critical error in WhatsApp AI flow',
        customerQuestion: customerMessage || 'Unknown message'
      }, { 
        senderNumber, 
        senderName, 
        session: await getSession(senderNumber) as Session | null 
      });
    } catch (bosmatError) {
      console.error('[generateWhatsAppReplyOptimized] Failed to trigger BosMAT:', bosmatError);
    }
    
    // 🔥 NEW: Record error metrics
    recordAIError(conversationId, error, undefined, senderNumber).catch(metricError => 
      console.error('[Monitoring] Failed to record error metrics:', metricError)
    );
    
    // Fallback response
    return {
      suggestedReply: "Maaf mas, Zoya lagi ada masalah teknis. Bisa coba lagi nanti?",
      toolCalls: [],
      route: 'error_fallback',
      metadata: { 
        toolsUsed: [],
        iterations: 0,
        tokenUsage: { estimated: 0 },
        error: error instanceof Error ? error.message : String(error),
        bosmatTriggered: true,
        conversationId // Add conversation ID to error output
      },
    };
  }
}, 'generateWhatsAppReplyOptimized',
[...TRACE_TAGS.WHATSAPP, ...TRACE_TAGS.AI_AGENT],
createTraceMetadata('whatsapp-flow', 'message-processing', {
  optimized: true
}));

/**
 * Token usage monitoring wrapper for the optimized flow
 */
export async function generateWhatsAppReplyWithMonitoring(input: ZoyaChatInput): Promise<WhatsAppReplyOutput & { performanceMetrics?: any }> {
  const startTime = Date.now();
  const startMemory = process.memoryUsage();
  
  try {
    const result = await generateWhatsAppReplyOptimized(input);
    
    const endTime = Date.now();
    const endMemory = process.memoryUsage();
    
    const performanceMetrics = {
      totalLatency: endTime - startTime,
      memoryDelta: {
        heapUsed: endMemory.heapUsed - startMemory.heapUsed,
        heapTotal: endMemory.heapTotal - startMemory.heapTotal,
      },
      tokenEfficiency: result.metadata?.tokenUsage ? {
        estimated: result.metadata.tokenUsage.estimated,
        actual: result.metadata.tokenUsage.actual,
        efficiency: result.metadata.tokenUsage.actual ? 
          (result.metadata.tokenUsage.estimated / result.metadata.tokenUsage.actual) : 1
      } : undefined
    };
    
    console.log('[generateWhatsAppReplyWithMonitoring] Performance metrics:', performanceMetrics);
    
    return {
      ...result,
      performanceMetrics
    };
    
  } catch (error) {
    console.error('[generateWhatsAppReplyWithMonitoring] Error:', error);
    throw error;
  }
}

// Export alias for backward compatibility
export const generateWhatsAppReply = generateWhatsAppReplyOptimized;
