// @file: src/ai/agents/runZoyaAIAgent.ts (REFACTORED - TOOL LIMITED)

import { OpenAI } from 'openai';
import { wrapOpenAI } from 'langsmith/wrappers';
import { zoyaTools, toolFunctionMap } from '../config/aiConfig';
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
    const start = Date.now();
    const completion = await openAIClient.chat.completions.create({
      model: 'gpt-4o',
      messages: chatHistory,
      temperature: 0.7,
    });
    const latencyMs = Date.now() - start;

    const gptMessage = completion.choices[0]?.message;
    const suggestedReply = gptMessage?.content || "Maaf, Zoya lagi bingung nih. Boleh coba tanya lagi, om?";

    console.log('[runZoyaAIAgent] Berhasil menghasilkan balasan:', suggestedReply);

    return {
      suggestedReply,
      route: 'main_agent_reply',
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
