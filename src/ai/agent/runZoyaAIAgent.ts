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
}

interface ZoyaAgentResult {
  suggestedReply: string;
  toolCalls?: NormalizedToolCall[];
  toolResponses?: any[];
  route: string;
}



export async function runZoyaAIAgent({ chatHistory, session }: ZoyaAgentInput): Promise<ZoyaAgentResult> {
  console.log('[runZoyaAIAgent] Menerima tugas. History terakhir:', chatHistory.slice(-2));

  try {
    // Ensure master prompt is always present
    const hasMasterPrompt = chatHistory.some(p => p.role === 'system' && p.content?.toString().includes('Bosmat Detailing'));
    
    if (!hasMasterPrompt) {
      // Filter out any other system messages and prepend master prompt
      const userAndAssistantHistory = chatHistory.filter(p => p.role !== 'system');
      chatHistory = [{ role: 'system', content: masterPrompt }, ...userAndAssistantHistory];
      console.log('[runZoyaAIAgent] Master prompt injected into chat history');
    }

    const start = Date.now();
    const completion = await openAIClient.chat.completions.create({
      model: 'gpt-4o-mini', // Updated to match the main flow
      messages: chatHistory,
      temperature: 0.7,
      tools: zoyaTools, // Enable tools for this agent
      tool_choice: 'auto',
    });
    const latencyMs = Date.now() - start;

    const gptMessage = completion.choices[0]?.message;
    const messageContent = gptMessage?.content || '';
    const toolCalls = gptMessage?.tool_calls || [];
    
    console.log('[runZoyaAIAgent] Response:', messageContent);
    console.log('[runZoyaAIAgent] Tool calls:', toolCalls.length);

    // Process tool calls if any
    const normalizedToolCalls: NormalizedToolCall[] = [];
    const toolResponses: any[] = [];

    if (toolCalls.length > 0) {
      for (const toolCall of toolCalls) {
        try {
          const functionName = toolCall.function.name;
          const args = JSON.parse(toolCall.function.arguments);
          
          console.log(`[runZoyaAIAgent] Executing tool: ${functionName}`, args);
          
          const toolImpl = toolFunctionMap[functionName];
          if (toolImpl && toolImpl.implementation) {
            const result = await toolImpl.implementation(args, { session });
            console.log(`[runZoyaAIAgent] Tool result: ${functionName}`, result);
            
            normalizedToolCalls.push({
              id: toolCall.id,
              toolName: functionName,
              arguments: args
            });
            toolResponses.push(result);
          }
        } catch (toolError) {
          console.error(`[runZoyaAIAgent] Tool error: ${toolCall.function.name}`, toolError);
        }
      }
    }

    const suggestedReply = messageContent || "Maaf, Zoya lagi bingung nih. Boleh coba tanya lagi, om?";
    console.log('[runZoyaAIAgent] Final reply:', suggestedReply);

    return {
      suggestedReply,
      toolCalls: normalizedToolCalls.length > 0 ? normalizedToolCalls : undefined,
      toolResponses: toolResponses.length > 0 ? toolResponses : undefined,
      route: toolCalls.length > 0 ? 'agent_with_tools' : 'agent_reply',
    };
  } catch (error) {
    console.error('[runZoyaAIAgent] TERJADI ERROR SAAT MEMANGGIL OPENAI:', error);
    return {
      suggestedReply: "Aduh, Zoya lagi pusing nih, coba tanya BosMat aja ya.",
      route: 'main_agent_reply',
    };
  }
  // Ensure a return value in case no return occurred above
  return {
    suggestedReply: "Aduh, Zoya lagi pusing nih, coba tanya BosMat aja ya.",
    route: 'main_agent_reply',
  };
}
