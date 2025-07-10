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

  // Fallback to tool summary if AI doesn't reply with content
  if (!replyMessage || replyMessage.startsWith('[AI]')) {
    const toolName = normalizedCalls[0]?.toolName;
    const toolResult = toolResponses[0];
    replyMessage = generateToolSummary(toolName, toolResult);
  }

  // Start with a shallow clone of the current session
  const updatedSession: Partial<SessionData> = {
    inquiry: { ...session.inquiry },
  };

  for (let i = 0; i < normalizedCalls.length; i++) {
    const toolCall = normalizedCalls[i];
    const toolResult = toolResponses[i];

    try {
      const args = typeof toolCall.arguments === 'string'
        ? JSON.parse(toolCall.arguments)
        : toolCall.arguments;

      // ===== 🛠 MOTOR DETECTION =====

      // 1. From getMotorSizeDetails result
      if (toolCall.toolName === 'getMotorSizeDetails' && toolResult?.data?.details?.motor_model) {
        updatedSession.inquiry!.lastMentionedMotor = toolResult.data.details.motor_model;

      // 2. From extractBookingDetailsTool result
      } else if (
        toolCall.toolName === 'extractBookingDetailsTool' &&
        toolResult?.data?.motorQuery &&
        !updatedSession.inquiry?.lastMentionedMotor
      ) {
        updatedSession.inquiry!.lastMentionedMotor = toolResult.data.motorQuery;

      // 3. Fallback from args.motor_query
      } else if (args.motor_query && !updatedSession.inquiry?.lastMentionedMotor) {
        updatedSession.inquiry!.lastMentionedMotor = args.motor_query;
      }

      // ===== 📦 SERVICE DETECTION =====

      const serviceName = args.serviceName || args.service_name;
      if (serviceName) {
        updatedSession.inquiry!.lastMentionedService = {
          serviceName,
          isAmbiguous: false,
        };
      }

      // Hardcode khusus untuk promo bundle → map ke satu layanan default
      if (toolCall.toolName === 'getPromoBundleDetails') {
        updatedSession.inquiry!.lastMentionedService = {
          serviceName: 'Repaint Bodi Halus',
          isAmbiguous: false,
        };
      }

    } catch (err) {
      console.warn('[handleToolResult] Gagal parse atau proses toolCall:', err);
    }
  }

  return {
    replyMessage,
    updatedSession,
  };
}
