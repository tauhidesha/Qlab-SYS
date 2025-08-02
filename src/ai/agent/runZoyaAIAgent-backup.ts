// @file: src/ai/agents/runZoyaAIAgent.ts (REFACTORED - TOOL LIMITED)

import { OpenAI } from 'openai';
import { wrapOpenAI } from 'langsmith/wrappers';
import { zoyaTools, toolFunctionMap } from '../config/aiConfig';
import { masterPrompt } from '../config/aiPrompts';
import type { NormalizedToolCall } from '../utils/updateSessionFromToolResults';

const openAIClient = wrapOpenAI(new OpenAI({ apiKey: process.env.OPENAI_API_KEY! }));

interface ZoyaAgentInput {
  chatHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  session?: any;
  senderNumber?: string;
  senderName?: string;
}

interface ZoyaAgentResult {
  suggestedReply: string;
  toolCalls?: NormalizedToolCall[];
  toolResponses?: any[];
  route: string;
}



export async function runZoyaAIAgent({ chatHistory, session, senderNumber, senderName }: ZoyaAgentInput): Promise<ZoyaAgentResult> {
  console.log('[runZoyaAIAgent] Menerima tugas. History terakhir:', chatHistory.slice(-2));
  console.log('[runZoyaAIAgent] Context:', { senderNumber, senderName });

  try {
    // Ensure master prompt is always present
    const hasMasterPrompt = chatHistory.some(p => p.role === 'system' && p.content?.toString().includes('Bosmat Detailing'));
    
    if (!hasMasterPrompt) {
      // Filter out any other system messages and prepend master prompt
      const userAndAssistantHistory = chatHistory.filter(p => p.role !== 'system');
      chatHistory = [{ role: 'system', content: masterPrompt }, ...userAndAssistantHistory];
      console.log('[runZoyaAIAgent] Master prompt injected into chat history');
    }

    // Process tool calls in iterations (like original flow)
    let finalResponse = '';
    let allToolResults: NormalizedToolCall[] = [];
    let maxIterations = 5; // Increase iterations to allow final response after tools
    let iteration = 0;
    
    while (iteration < maxIterations) {
      iteration++;
      console.log(`[runZoyaAIAgent] Iteration ${iteration}`);
      
      const start = Date.now();
      const completion = await openAIClient.chat.completions.create({
        model: 'gpt-4.1-mini', // Fixed model name
        messages: chatHistory,
        temperature: 0.7,
        tools: zoyaTools,
        tool_choice: 'auto',
      });
      const latencyMs = Date.now() - start;

      const gptMessage = completion.choices[0]?.message;
      const messageContent = gptMessage?.content || '';
      const toolCalls = gptMessage?.tool_calls || [];
      
      console.log(`[runZoyaAIAgent] Iteration ${iteration} Response:`, messageContent);
      console.log(`[runZoyaAIAgent] Iteration ${iteration} Tool calls:`, toolCalls.length);

      // Add assistant message to history
      if (messageContent || toolCalls.length > 0) {
        chatHistory.push({
          role: 'assistant',
          content: messageContent,
          tool_calls: toolCalls.length > 0 ? toolCalls : undefined
        });
      }

      // If no tool calls, this is the final response
      if (toolCalls.length === 0) {
        finalResponse = messageContent || "Maaf, Zoya lagi bingung nih. Boleh coba tanya lagi, om?";
        console.log(`[runZoyaAIAgent] Final response received at iteration ${iteration}`);
        break;
      }

      // Process tool calls
      console.log(`[runZoyaAIAgent] Processing ${toolCalls.length} tool calls`);
      for (const toolCall of toolCalls) {
        try {
          const functionName = toolCall.function.name;
          const args = JSON.parse(toolCall.function.arguments);
          
          console.log(`[runZoyaAIAgent] Executing tool: ${functionName}`, args);
          
          const toolImpl = toolFunctionMap[functionName];
          if (toolImpl && toolImpl.implementation) {
            const result = await toolImpl.implementation(args, { session, senderNumber, senderName });
            console.log(`[runZoyaAIAgent] Tool result: ${functionName}`, result);
            
            allToolResults.push({
              id: toolCall.id,
              toolName: functionName,
              arguments: args
            });
            
            // Add tool result to history for next iteration
            chatHistory.push({
              role: 'tool',
              content: JSON.stringify(result),
              tool_call_id: toolCall.id
            });
          } else {
            console.error(`[runZoyaAIAgent] Tool implementation not found: ${functionName}`);
            // Add error result to history
            chatHistory.push({
              role: 'tool',
              content: JSON.stringify({ error: `Tool ${functionName} not implemented` }),
              tool_call_id: toolCall.id
            });
          }
        } catch (toolError) {
          console.error(`[runZoyaAIAgent] Tool error: ${toolCall.function.name}`, toolError);
          // Add error result to history
          chatHistory.push({
            role: 'tool',
            content: JSON.stringify({ error: toolError instanceof Error ? toolError.message : String(toolError) }),
            tool_call_id: toolCall.id
          });
        }
      }
      
      // If we have tool results and this might be the last iteration, 
      // force a final response attempt
      if (iteration === maxIterations - 1 && allToolResults.length > 0) {
        console.log('[runZoyaAIAgent] Last iteration, forcing final response attempt');
        chatHistory.push({
          role: 'system',
          content: 'Based on the tool results above, provide a complete and helpful response to the users question. Do not call any more tools.'
        });
      }
    }
    
    if (iteration >= maxIterations && !finalResponse) {
      console.warn('[runZoyaAIAgent] Max iterations reached, using fallback response');
      finalResponse = "Maaf, Zoya butuh waktu lebih lama untuk memproses. Coba tanya lagi ya, mas!";
    }

    console.log('[runZoyaAIAgent] Final reply:', finalResponse);

    return {
      suggestedReply: finalResponse,
      toolCalls: allToolResults.length > 0 ? allToolResults : undefined,
      toolResponses: allToolResults.length > 0 ? allToolResults : undefined,
      route: allToolResults.length > 0 ? 'agent_with_tools' : 'agent_reply',
    };
  } catch (error) {
    console.error('[runZoyaAIAgent] TERJADI ERROR SAAT MEMANGGIL OPENAI:', error);
    return {
      suggestedReply: "Aduh, Zoya lagi pusing nih, coba tanya BosMat aja ya.",
      route: 'main_agent_reply',
    };
  }
}
