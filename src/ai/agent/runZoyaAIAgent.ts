// @file: src/ai/agent/runZoyaAIAgent-optimized.ts
'use server';

import { openai } from '@/lib/openai';
import { toolFunctionMap, zoyaTools } from '../config/aiConfig';
import { runToolCalls } from '../utils/runToolCalls';
import { masterPrompt, lightweightPrompt, minimalPrompt } from '@/ai/config/aiPrompts';
import { optimizeConversationHistory, monitorTokenUsage, calculateConversationTokens } from '@/ai/utils/contextManagement';
import type { Session } from '@/types/ai/session';
import type OpenAI from 'openai';
import { traceable } from 'langsmith/traceable';
import { wrapOpenAI } from 'langsmith/wrappers';
import { createTraceable, TRACE_TAGS, createTraceMetadata, LANGSMITH_CONFIG } from '@/lib/langsmith';

interface ZoyaAgentInput {
  chatHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  session: Session;
  senderNumber: string;
  senderName?: string;
  imageContext?: {
    imageUrl?: string;
    analysisType?: 'condition' | 'damage' | 'color' | 'license_plate' | 'detailing' | 'coating' | 'general';
    analysisResult?: any;
  };
}

interface ZoyaAgentResult {
  suggestedReply: string;
  toolCalls: Array<{
    id: string;
    toolName: string;
    arguments: any;
  }>;
  metadata: {
    toolsUsed: string[];
    iterations: number;
    tokenUsage: {
      estimated: number;
      actual?: number;
    };
    langsmith?: any; // Optional LangSmith metadata
  };
}

interface NormalizedToolCall {
  id: string;
  toolName: string;
  arguments: any;
  result: any;
}

export const runZoyaAIAgentOptimized = createTraceable(async ({ 
  chatHistory, 
  session, 
  senderNumber, 
  senderName,
  imageContext
}: ZoyaAgentInput): Promise<ZoyaAgentResult> => {
  
  console.log('[runZoyaAIAgentOptimized] Starting optimized agent');
  
  try {
    // Select prompt based on conversation length to manage tokens
    const conversationStats = calculateConversationTokens(chatHistory);
    let selectedPrompt = masterPrompt;
    
    if (conversationStats.totalTokens > 4000) {
      selectedPrompt = lightweightPrompt;
      console.log('[runZoyaAIAgentOptimized] Using lightweight prompt due to high token count');
    } else if (conversationStats.totalTokens > 2500) {
      selectedPrompt = masterPrompt;
      console.log('[runZoyaAIAgentOptimized] Using optimized prompt');
    }
    
    // Optimize conversation history
    const optimizedHistory = optimizeConversationHistory(chatHistory, 3000);
    
    // Prepare customer context
    const customerContext = senderName 
      ? `\n\n**CUSTOMER INFO**: Sedang melayani mas ${senderName} (${senderNumber})`
      : `\n\n**CUSTOMER INFO**: Sedang melayani customer ${senderNumber}`;
    
    // Add image context if available
        const imageContextText = imageContext
      ? `\n\n**IMAGE CONTEXT**: Customer mengirim foto untuk analisis ${imageContext.analysisType}. ${imageContext.analysisResult ? `Hasil analisis: ${imageContext.analysisResult.analysis || imageContext.analysisResult}\n\nINSTRUKSI KHUSUS: Gunakan hasil analisis di atas untuk memberikan respons. JANGAN menganalisis ulang gambar yang sama.` : 'Sedang diproses...'}`
      : '';
    
    // Ensure system prompt is current with customer context
    const hasSystemPrompt = optimizedHistory.some(p => p.role === 'system' && p.content?.toString().includes('Zoya'));
    
    if (!hasSystemPrompt) {
      const userAndAssistantHistory = optimizedHistory.filter(p => p.role !== 'system');
      optimizedHistory.splice(0, 0, { 
        role: 'system', 
        content: selectedPrompt + customerContext + imageContextText
      });
      console.log(`[runZoyaAIAgentOptimized] System prompt injected with customer: ${senderName || senderNumber}`);
    } else {
      // Update existing system prompt with customer context
      const systemPromptIndex = optimizedHistory.findIndex(p => p.role === 'system');
      if (systemPromptIndex !== -1) {
        const existingPrompt = optimizedHistory[systemPromptIndex].content?.toString() || '';
        if (!existingPrompt.includes('CUSTOMER INFO')) {
          optimizedHistory[systemPromptIndex].content = existingPrompt + customerContext + imageContextText;
          console.log(`[runZoyaAIAgentOptimized] Updated system prompt with customer: ${senderName || senderNumber}`);
        }
      }
    }
    
    // Monitor initial token usage
    monitorTokenUsage(optimizedHistory);
    
    // Process with iterative tool calling (reduced iterations)
    let finalResponse = '';
    let allToolResults: NormalizedToolCall[] = [];
    const maxIterations = 3; // Reduced from 5 to save tokens
    let iteration = 0;
    let lastCompletion: OpenAI.Chat.Completions.ChatCompletion | undefined;
    
    while (iteration < maxIterations) {
      iteration++;
      console.log(`[runZoyaAIAgentOptimized] Iteration ${iteration}/${maxIterations}`);
      
      const start = Date.now();
      const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini', // Use 4.1 mini model for efficiency
        messages: optimizedHistory,
        temperature: 1, // Reduced temperature for more consistent responses
        tools: zoyaTools,
        tool_choice: 'auto',
        max_tokens: 1000, // Limit response tokens
      });
      const latencyMs = Date.now() - start;
      lastCompletion = completion;
      
      // Monitor API response token usage
      if (completion.usage) {
        monitorTokenUsage(optimizedHistory, completion);
      }
      
      const gptMessage = completion.choices[0]?.message;
      const messageContent = gptMessage?.content || '';
      const toolCalls = gptMessage?.tool_calls || [];
      
      console.log(`[runZoyaAIAgentOptimized] Iteration ${iteration} - Latency: ${latencyMs}ms`);
      console.log(`[runZoyaAIAgentOptimized] Response: ${messageContent.substring(0, 100)}...`);
      console.log(`[runZoyaAIAgentOptimized] Tool calls: ${toolCalls.length}`);
      
      // Add assistant message to history
      if (messageContent || toolCalls.length > 0) {
        optimizedHistory.push({
          role: 'assistant',
          content: messageContent,
          tool_calls: toolCalls.length > 0 ? toolCalls : undefined
        });
      }
      
      // If no tool calls, this is the final response
      if (toolCalls.length === 0) {
        finalResponse = messageContent || "Maaf, Zoya lagi bingung nih. Boleh coba tanya lagi, mas?";
        console.log(`[runZoyaAIAgentOptimized] Final response at iteration ${iteration}`);
        break;
      }
      
      // Execute tool calls using runToolCalls utility
      if (toolCalls.length > 0) {
        const toolCallRequests = toolCalls.map(toolCall => ({
          toolName: toolCall.function.name,
          arguments: toolCall.function.arguments,
          id: toolCall.id
        }));
        
        try {
          console.log(`[runZoyaAIAgentOptimized] Executing ${toolCalls.length} tools via runToolCalls`);
          
          // Track tool execution with LangSmith
          const tracedRunToolCalls = createTraceable(
            runToolCalls,
            'tool-execution',
            [...TRACE_TAGS.TOOLS],
            createTraceMetadata('tools', 'batch-execution', {
              toolCount: toolCalls.length,
              toolNames: toolCalls.map(tc => tc.function.name),
              iteration: iteration
            })
          );
          
          const toolResults = await tracedRunToolCalls(toolCallRequests, {
            session,
            input: { senderNumber, senderName }
          });
          
          // Track results for metadata
          for (const toolCall of toolCalls) {
            allToolResults.push({
              id: toolCall.id,
              toolName: toolCall.function.name,
              arguments: JSON.parse(toolCall.function.arguments),
              result: {} // Results are already in the tool response format
            });
          }
          
          // Add tool results to history
          optimizedHistory.push(...toolResults.map(result => ({
            role: 'tool' as const,
            content: result.content,
            tool_call_id: result.tool_call_id
          })));
          
        } catch (toolError) {
          console.error(`[runZoyaAIAgentOptimized] Tool execution error:`, toolError);
          // Add error responses for each tool call
          for (const toolCall of toolCalls) {
            optimizedHistory.push({
              role: 'tool',
              content: JSON.stringify({ error: toolError instanceof Error ? toolError.message : String(toolError) }),
              tool_call_id: toolCall.id
            });
          }
        }
      }
      
      // Force final response on last iteration
      if (iteration === maxIterations - 1 && allToolResults.length > 0) {
        console.log('[runZoyaAIAgentOptimized] Last iteration, forcing final response');
        optimizedHistory.push({
          role: 'system',
          content: 'Berikan respons final berdasarkan hasil tool di atas. Jangan panggil tool lagi.'
        });
      }
    }
    
    // Fallback if no final response
    if (iteration >= maxIterations && !finalResponse) {
      console.warn('[runZoyaAIAgentOptimized] Max iterations reached, using fallback');
      finalResponse = allToolResults.length > 0 
        ? "Zoya sudah cek infonya mas. Ada yang bisa Zoya bantu lagi?"
        : "Maaf mas, Zoya lagi ada gangguan. Bisa coba tanya lagi?";
    }
    
    const finalStats = calculateConversationTokens(optimizedHistory);
    
    // Prepare LangSmith metadata
    const langsmithMetadata = {
      customer: {
        number: senderNumber,
        name: senderName
      },
      conversation: {
        messageCount: chatHistory.length,
        optimizedMessageCount: optimizedHistory.length,
        tokenStats: finalStats
      },
      execution: {
        iterations: iteration,
        maxIterations,
        promptType: conversationStats.totalTokens > 4000 ? 'lightweight' : 
                   conversationStats.totalTokens > 2500 ? 'master' : 'optimized',
        toolsExecuted: allToolResults.length,
        finalResponseLength: finalResponse.length
      },
      performance: {
        estimatedTokens: finalStats.totalTokens,
        actualTokens: lastCompletion?.usage?.total_tokens,
        completionTokens: lastCompletion?.usage?.completion_tokens,
        promptTokens: lastCompletion?.usage?.prompt_tokens
      }
    };
    
    console.log('[runZoyaAIAgentOptimized] LangSmith metadata:', langsmithMetadata);
    
    return {
      suggestedReply: finalResponse,
      toolCalls: allToolResults.map(tc => ({
        id: tc.id,
        toolName: tc.toolName,
        arguments: tc.arguments,
      })),
      metadata: {
        toolsUsed: allToolResults.map(tc => tc.toolName),
        iterations: iteration,
        tokenUsage: {
          estimated: finalStats.totalTokens,
          actual: lastCompletion?.usage?.total_tokens
        },
        langsmith: langsmithMetadata
      },
    };
    
  } catch (error) {
    console.error('[runZoyaAIAgentOptimized] Critical error:', error);
    
    return {
      suggestedReply: "Maaf mas, Zoya lagi ada masalah teknis. Bisa coba lagi nanti?",
      toolCalls: [],
      metadata: {
        toolsUsed: [],
        iterations: 0,
        tokenUsage: { estimated: 0 },
        langsmith: {
          error: error instanceof Error ? error.message : String(error),
          customer: { number: senderNumber, name: senderName },
          timestamp: new Date().toISOString()
        }
      },
    };
  }
}, 'runZoyaAIAgentOptimized', 
[...TRACE_TAGS.AI_AGENT, ...TRACE_TAGS.WHATSAPP], 
createTraceMetadata('ai-agent', 'conversation-processing', {
  version: '2.0',
  optimized: true
}));

// Export alias for backward compatibility
export const runZoyaAIAgent = runZoyaAIAgentOptimized;
