// @file: src/ai/agent/runZoyaAIAgent-optimized.ts
'use server';

import { openai } from '@/lib/openai';
import { zoyaTools, toolFunctionMap } from '@/ai/config/aiConfig';
import { optimizedMasterPrompt, lightweightPrompt, minimalPrompt } from '@/ai/config/aiPrompts-optimized';
import { optimizeConversationHistory, monitorTokenUsage, calculateConversationTokens } from '@/ai/utils/contextManagement';
import type { Session } from '@/types/ai/session';
import type OpenAI from 'openai';

interface ZoyaAgentInput {
  chatHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  session: Session;
  senderNumber: string;
  senderName?: string;
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
  };
}

interface NormalizedToolCall {
  id: string;
  toolName: string;
  arguments: any;
  result: any;
}

export async function runZoyaAIAgentOptimized({ 
  chatHistory, 
  session, 
  senderNumber, 
  senderName 
}: ZoyaAgentInput): Promise<ZoyaAgentResult> {
  
  console.log('[runZoyaAIAgentOptimized] Starting optimized agent');
  
  try {
    // Select prompt based on conversation length to manage tokens
    const conversationStats = calculateConversationTokens(chatHistory);
    let selectedPrompt = optimizedMasterPrompt;
    
    if (conversationStats.totalTokens > 4000) {
      selectedPrompt = lightweightPrompt;
      console.log('[runZoyaAIAgentOptimized] Using lightweight prompt due to high token count');
    } else if (conversationStats.totalTokens > 2500) {
      selectedPrompt = optimizedMasterPrompt;
      console.log('[runZoyaAIAgentOptimized] Using optimized prompt');
    }
    
    // Optimize conversation history
    const optimizedHistory = optimizeConversationHistory(chatHistory, 3000);
    
    // Ensure system prompt is current
    const hasSystemPrompt = optimizedHistory.some(p => p.role === 'system' && p.content?.toString().includes('Zoya'));
    
    if (!hasSystemPrompt) {
      const userAndAssistantHistory = optimizedHistory.filter(p => p.role !== 'system');
      optimizedHistory.splice(0, 0, { role: 'system', content: selectedPrompt });
      console.log('[runZoyaAIAgentOptimized] System prompt injected');
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
        temperature: 0.5, // Reduced temperature for more consistent responses
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
      
      // Execute tool calls
      for (const toolCall of toolCalls) {
        try {
          console.log(`[runZoyaAIAgentOptimized] Executing tool: ${toolCall.function.name}`);
          
          const toolFunction = toolFunctionMap[toolCall.function.name];
          if (!toolFunction?.implementation) {
            throw new Error(`Tool ${toolCall.function.name} not found`);
          }
          
          const toolArgs = JSON.parse(toolCall.function.arguments);
          const toolResult = await toolFunction.implementation(toolArgs);
          
          allToolResults.push({
            id: toolCall.id,
            toolName: toolCall.function.name,
            arguments: toolArgs,
            result: toolResult
          });
          
          // Add tool result to history
          optimizedHistory.push({
            role: 'tool',
            content: JSON.stringify(toolResult),
            tool_call_id: toolCall.id
          });
          
        } catch (toolError) {
          console.error(`[runZoyaAIAgentOptimized] Tool error:`, toolError);
          optimizedHistory.push({
            role: 'tool',
            content: JSON.stringify({ error: toolError instanceof Error ? toolError.message : String(toolError) }),
            tool_call_id: toolCall.id
          });
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
        }
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
        tokenUsage: { estimated: 0 }
      },
    };
  }
}
