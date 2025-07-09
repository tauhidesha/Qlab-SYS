// File: src/ai/handlers/tool/handleToolResult.ts

import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';
import type { SessionData } from '@/ai/utils/session';
import { runToolCalls, createToolCallMessage } from '@/ai/utils/runToolCalls';
import { masterPrompt } from '@/ai/config/aiPrompts';
import { OpenAI } from 'openai';
import { generateToolSummary } from './generateToolSummary';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

type NormalizedToolCall = {
  toolName: string;
  arguments: any;
  id: string;
};

export async function handleToolResult({
  toolCalls,
  input,
  session,
}: {
  toolCalls: {
    toolName: string;
    arguments: any;
    id?: string;
    function?: { name: string; arguments: any };
    tool_call_id?: string;
  }[];
  input: ZoyaChatInput;
  session: SessionData;
}): Promise<{
  replyMessage: string;
  updatedSession: Partial<SessionData>;
}> {
  const normalizedCalls: NormalizedToolCall[] = toolCalls.map((call) => ({
    toolName: call.toolName || call.function?.name,
    arguments: call.arguments || call.function?.arguments,
    id: call.id || call.tool_call_id || 'no_id',
  }));

  const toolResponses = await runToolCalls(normalizedCalls);

  const followUp = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: masterPrompt },
      ...input.chatHistory,
      { role: 'user', content: input.customerMessage },
      createToolCallMessage(normalizedCalls),
      ...toolResponses,
    ],
  });

  let replyMessage = followUp.choices[0]?.message?.content?.trim();

  if (!replyMessage || replyMessage.startsWith('[AI]')) {
    const toolName = normalizedCalls[0]?.toolName;
    const toolResult = toolResponses[0];
    replyMessage = generateToolSummary(toolName, toolResult);
  }

  const updatedSession: Partial<SessionData> = {
    inquiry: { ...session.inquiry },
  };

  for (const toolCall of normalizedCalls) {
    const args = toolCall.arguments;
    if (!args) continue;

    try {
      const parsedArgs = typeof args === 'string' ? JSON.parse(args) : args;

      if (parsedArgs.motor_query) {
        updatedSession.inquiry!.lastMentionedMotor = parsedArgs.motor_query;
      }

      if (parsedArgs.serviceName) {
        updatedSession.inquiry!.lastMentionedService = {
          serviceName: parsedArgs.serviceName,
          isAmbiguous: false,
        };
      } else if (parsedArgs.service_name) {
        updatedSession.inquiry!.lastMentionedService = {
          serviceName: parsedArgs.service_name,
          isAmbiguous: false,
        };
      }

      if (toolCall.toolName === 'getPromoBundleDetails') {
        updatedSession.inquiry!.lastMentionedService = {
          serviceName: 'Repaint Bodi Halus',
          isAmbiguous: false,
        };
      }
    } catch (err) {
      console.warn('[handleToolResult] Gagal parse tool arguments:', err);
    }
  }

  return {
    replyMessage,
    updatedSession,
  };
}
