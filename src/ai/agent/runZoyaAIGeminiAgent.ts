// @file: src/ai/agent/runZoyaAIGeminiAgent.ts
'use server';

import { gemini, generateChatCompletion, GEMINI_MODELS } from '@/lib/gemini';
import { toolFunctionMap, zoyaTools } from '../config/aiConfig';
import { runToolCalls } from '../utils/runToolCalls';
import { masterPrompt, lightweightPrompt, minimalPrompt } from '@/ai/config/aiPrompts';
import { optimizeConversationHistory, monitorTokenUsage, calculateConversationTokens } from '@/ai/utils/contextManagement';
import type { Session } from '@/types/ai/session';
import { traceable } from 'langsmith/traceable';
import { createTraceable, TRACE_TAGS, createTraceMetadata, LANGSMITH_CONFIG } from '@/lib/langsmith';

interface ZoyaGeminiAgentInput {
  chatHistory: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    parts?: any[];
  }>;
  session: Session;
  senderNumber: string;
  senderName?: string;
  imageContext?: {
    imageUrl?: string;
    analysisType?: 'condition' | 'damage' | 'color' | 'license_plate' | 'detailing' | 'coating' | 'general';
    analysisResult?: any;
  };
}

interface ZoyaGeminiAgentResult {
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
    langsmith?: any;
  };
}

interface NormalizedToolCall {
  id: string;
  toolName: string;
  arguments: any;
  result: any;
}

async function runZoyaAIGeminiAgentCore({ 
  chatHistory, 
  session, 
  senderNumber, 
  senderName,
  imageContext
}: ZoyaGeminiAgentInput): Promise<ZoyaGeminiAgentResult> {
  
  console.log('[runZoyaAIGeminiAgent] Starting Gemini agent');
  
  try {
    // Select prompt based on conversation length to manage tokens
    const conversationStats = calculateConversationTokens(chatHistory);
    let selectedPrompt = masterPrompt;
    
    if (conversationStats.totalTokens > 4000) {
      selectedPrompt = lightweightPrompt;
      console.log('[runZoyaAIGeminiAgent] Using lightweight prompt due to high token count');
    } else if (conversationStats.totalTokens > 2500) {
      selectedPrompt = masterPrompt;
      console.log('[runZoyaAIGeminiAgent] Using optimized prompt');
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
      console.log(`[runZoyaAIGeminiAgent] System prompt injected with customer: ${senderName || senderNumber}`);
    } else {
      // Update existing system prompt with customer context
      const systemPromptIndex = optimizedHistory.findIndex(p => p.role === 'system');
      if (systemPromptIndex !== -1) {
        const currentSystemPrompt = optimizedHistory[systemPromptIndex].content as string;
        optimizedHistory[systemPromptIndex].content = currentSystemPrompt + customerContext + imageContextText;
      }
    }

    // Convert OpenAI format to Gemini format
    const geminiMessages = optimizedHistory
      .filter(msg => ['user', 'assistant', 'system'].includes(msg.role))
      .map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content as string,
      }));

    // Add tools configuration for Gemini
    const toolsConfig = zoyaTools.map(tool => ({
      functionDeclarations: [{
        name: tool.function.name,
        description: tool.function.description,
        parameters: tool.function.parameters,
      }],
    }));

    // Generate response using Gemini
    const result = await generateChatCompletion(geminiMessages, {
      temperature: 0.7,
      maxOutputTokens: 2048,
      tools: toolsConfig,
    });

    // Parse tool calls from Gemini response
    const toolCalls: Array<{
      id: string;
      toolName: string;
      arguments: any;
    }> = [];

    // Extract tool calls from Gemini response
    // Note: Gemini handles tool calls differently than OpenAI
    // This is a simplified implementation
    const responseText = result.content;
    
    // Look for tool call patterns in the response
    const toolCallMatches = responseText.match(/\[TOOL_CALL:(\w+):(.*?)\]/g);
    if (toolCallMatches) {
      toolCallMatches.forEach((match, index) => {
        const [, toolName, argsString] = match.match(/\[TOOL_CALL:(\w+):(.*?)\]/) || [];
        if (toolName && argsString) {
          try {
            const arguments_ = JSON.parse(argsString);
            toolCalls.push({
              id: `call_${Date.now()}_${index}`,
              toolName,
              arguments: arguments_,
            });
          } catch (error) {
            console.error(`[runZoyaAIGeminiAgent] Failed to parse tool call arguments:`, error);
          }
        }
      });
    }

    // Execute tool calls if any
    let toolResults: any[] = [];
    if (toolCalls.length > 0) {
      console.log(`[runZoyaAIGeminiAgent] Executing ${toolCalls.length} tool calls`);
      toolResults = await runToolCalls(toolCalls, { session });
    }

    // Generate final response considering tool results
    let finalResponse = responseText;
    if (toolResults.length > 0) {
      const toolResultsText = toolResults.map(tool => 
        `[TOOL_RESULT:${tool.toolName}:${JSON.stringify(tool.result)}]`
      ).join('\n');
      
      const finalPrompt = `${responseText}\n\nTool Results:\n${toolResultsText}\n\nGenerate a natural response incorporating the tool results:`;
      
      const finalResult = await generateChatCompletion([
        { role: 'user', content: finalPrompt }
      ], {
        temperature: 0.7,
        maxOutputTokens: 1024,
      });
      
      finalResponse = finalResult.content;
    }

    // Monitor token usage
    const actualTokenUsage = result.usage?.totalTokens || 0;
    monitorTokenUsage(optimizedHistory, { usage: { total_tokens: actualTokenUsage } });

    console.log(`[runZoyaAIGeminiAgent] Generated response with ${toolCalls.length} tool calls`);

    return {
      suggestedReply: finalResponse,
      toolCalls,
      metadata: {
        toolsUsed: toolCalls.map(tc => tc.toolName),
        iterations: 1,
        tokenUsage: {
          estimated: conversationStats.totalTokens,
          actual: actualTokenUsage,
        },
        langsmith: LANGSMITH_CONFIG.enabled ? createTraceMetadata('runZoyaAIGeminiAgent', 'agent_execution') : undefined,
      },
    };

  } catch (error) {
    console.error('[runZoyaAIGeminiAgent] Error:', error);
    
    // Fallback response
    return {
      suggestedReply: `Maaf mas, ada sedikit gangguan teknis. Bisa tolong ulangi pertanyaannya? 🙏`,
      toolCalls: [],
      metadata: {
        toolsUsed: [],
        iterations: 0,
        tokenUsage: {
          estimated: 0,
          actual: 0,
        },
      },
    };
  }
}

// Export the traceable version
export const runZoyaAIGeminiAgent = createTraceable(runZoyaAIGeminiAgentCore, 'runZoyaAIGeminiAgent', ['ai-agent', 'gemini']);

// Export for backward compatibility
export const runZoyaAIAgent = runZoyaAIGeminiAgent;
