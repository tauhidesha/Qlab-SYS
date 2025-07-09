'use server';

import { OpenAI } from 'openai';
import { masterPrompt } from '../config/aiPrompts';
import { zoyaTools } from '../config/aiConfig';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function runZoyaAIAgent({
  session,
  message,
  chatHistory,
  senderNumber,
  senderName,
  toolCalls = [],
  toolResults = [],
}: {
  session: any;
  message: string;
  chatHistory: any[];
  senderNumber: string;
  senderName: string | undefined;
  toolCalls?: {
    toolName: string;
    arguments: any;
    id: string;
  }[];
  toolResults?: any[];
}) {
  let systemPrompt = masterPrompt;

  const usedPriceTool = toolCalls.some(tc =>
    tc.toolName === 'getSpecificServicePrice'
  );

  if (usedPriceTool) {
    systemPrompt = `Kamu adalah Zoya, AI Sales Agent ... (isi prompt harga khusus kalau ada)`;
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory,
    { role: 'user', content: message },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
    tools: zoyaTools,
    tool_choice: 'auto',
  });

  console.log('[GPT RAW COMPLETION]', JSON.stringify(completion, null, 2));

  const gptMessage = completion.choices[0]?.message;

  const suggestedReply = gptMessage?.content || '';
  const extractedToolCalls = (gptMessage?.tool_calls || []).map((toolCall) => ({
    toolName: toolCall.function.name,
    arguments: JSON.parse(toolCall.function.arguments || '{}'),
    id: toolCall.id,
  }));

  return {
    suggestedReply,
    route: 'ai_agent',
    toolCalls: extractedToolCalls,
    toolResults,
    updatedSession: session,
  };
}
