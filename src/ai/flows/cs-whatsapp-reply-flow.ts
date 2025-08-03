// @file: src/ai/flows/cs-whatsapp-reply-flow.ts (OPTIMIZED)
'use server';

import { updateSession, getSession } from '@/ai/utils/session';
import { runZoyaAIAgentOptimized } from '@/ai/agent/runZoyaAIAgent';
import { getConversationHistory, saveAIResponse } from '@/ai/utils/conversationHistory';
import { optimizeConversationHistory, monitorTokenUsage, calculateConversationTokens } from '@/ai/utils/contextManagement';
import { lightweightPrompt } from '@/ai/config/aiPrompts';
import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import type { Session } from '@/types/ai/session';
import { createTraceable, TRACE_TAGS, createTraceMetadata } from '@/lib/langsmith';

export const generateWhatsAppReplyOptimized = createTraceable(async (input: ZoyaChatInput): Promise<WhatsAppReplyOutput> => {
  console.log('[generateWhatsAppReplyOptimized] Starting optimized flow');
  
  const { customerMessage, senderNumber, senderName } = input;
  
  if (!senderNumber) {
    throw new Error('senderNumber is required');
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

    // Get conversation history with optimization
    let history = await getConversationHistory(senderNumber);
    console.log(`[generateWhatsAppReplyOptimized] Retrieved ${history.length} messages from history`);
    
    // Monitor initial token usage
    const initialStats = calculateConversationTokens(history);
    console.log(`[generateWhatsAppReplyOptimized] Initial conversation tokens: ${initialStats.totalTokens}`);
    
    // Apply aggressive optimization if needed
    if (initialStats.totalTokens > 2500) {
      history = optimizeConversationHistory(history, 2000);
      console.log('[generateWhatsAppReplyOptimized] Applied aggressive conversation optimization');
    }
    
    // Ensure lightweight system prompt for long conversations
    const hasSystemPrompt = history.some(p => p.role === 'system' && p.content?.toString().includes('Zoya'));
    
    if (!hasSystemPrompt) {
      const userAndAssistantHistory = history.filter(p => p.role !== 'system');
      history = [{ role: 'system', content: lightweightPrompt }, ...userAndAssistantHistory];
      console.log('[generateWhatsAppReplyOptimized] Lightweight system prompt injected');
    }

    // Add current user message
    history.push({ role: 'user', content: customerMessage });
    console.log(`[generateWhatsAppReplyOptimized] Added user message: ${customerMessage.substring(0, 50)}...`);

    // Add current date context (minimal)
    const currentDate = new Date();
    const dateContext = `Tanggal: ${currentDate.toLocaleDateString('id-ID')}`;
    history.push({ role: 'system', content: dateContext });

    // Run optimized agent
    const agentResult = await runZoyaAIAgentOptimized({
      chatHistory: history,
      session,
      senderNumber,
      senderName,
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
    };

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

    const finalOutput: WhatsAppReplyOutput = {
      suggestedReply: agentResult.suggestedReply,
      toolCalls: agentResult.toolCalls || [],
      route: agentResult.toolCalls.length > 0 ? 'optimized_with_tools' : 'optimized_completion',
      metadata: { 
        ...agentResult.metadata,
        optimized: true,
        promptVersion: 'lightweight'
      },
    };

    console.log('[generateWhatsAppReplyOptimized] Flow completed successfully');
    return finalOutput;

  } catch (error) {
    console.error('[generateWhatsAppReplyOptimized] Critical error:', error);
    
    // Fallback response
    return {
      suggestedReply: "Maaf mas, Zoya lagi ada masalah teknis. Bisa coba lagi nanti?",
      toolCalls: [],
      route: 'error_fallback',
      metadata: { 
        toolsUsed: [],
        iterations: 0,
        tokenUsage: { estimated: 0 },
        error: error instanceof Error ? error.message : String(error)
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
