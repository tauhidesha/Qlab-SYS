// File: src/ai/tools/handleToolResult.ts

import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';
import type { SessionData } from '@/ai/utils/session';
import { runToolCalls, createToolCallMessage } from '@/ai/utils/runToolCalls';
import { masterPrompt } from '@/ai/config/aiPrompts';
import { OpenAI } from 'openai';
import { setPendingHumanReply } from '@/ai/utils/sessions/setPendingHumanReply';
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
  needsHumanHelp?: boolean;
  humanHelpReason?: string;
  customerQuestion?: string;
}> {
  const normalizedCalls: NormalizedToolCall[] = toolCalls.map((call) => ({
    toolName: call.toolName || call.function?.name,
    arguments: typeof call.arguments === 'string'
      ? JSON.parse(call.arguments)
      : call.arguments || call.function?.arguments,
    id: call.id || call.tool_call_id || 'no_id',
  }));

  const toolResponses = await runToolCalls(normalizedCalls, { input, session });

  // =================================================================
  // [INVESTIGASI] Tambahkan log ini untuk melihat apa isi toolResponses
  console.log('🕵️ [INVESTIGATION LOG] Raw tool responses:', JSON.stringify(toolResponses, null, 2));
  // ==
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

  let replyMessage = followUp.choices?.[0]?.message?.content?.trim();

  const toolName = normalizedCalls[0]?.toolName;
  const fallbackTrigger =
    !replyMessage ||
    replyMessage.startsWith('[AI]') ||
    replyMessage.length < 15;

  if (fallbackTrigger) {
    const toolResult = toolResponses[0];
    const fallback = generateToolSummary(toolName, toolResult);

    if (fallback && fallback.length >= 15) {
      replyMessage = fallback;
    } else {
      await setPendingHumanReply({
        customerNumber: input.senderNumber,
        question: input.customerMessage,
      });

      return {
        replyMessage: "Hmm, aku belum yakin jawabannya. Aku tanya dulu ke Bos Mamat ya 🙏",
        updatedSession: {},
        needsHumanHelp: true,
        humanHelpReason: `Hasil tool "${toolName}" belum cukup jelas atau GPT & fallback gagal.`,
        customerQuestion: input.customerMessage,
      };
    }
  }

  const updatedSession: Partial<SessionData> = {
    inquiry: session.inquiry ? { ...session.inquiry } : {},
  };

  for (let i = 0; i < normalizedCalls.length; i++) {
    const toolCall = normalizedCalls[i];
    const toolResult = toolResponses[i];
    const args = toolCall.arguments;

    try {
      // PATCH: Menambahkan pengecekan 'if (updatedSession.inquiry)' 
      // untuk memastikan objek ada sebelum diisi.
      if (updatedSession.inquiry) {
        switch (toolCall.toolName) {
          case 'getMotorSizeDetails': {
            const model = toolResult?.result?.matched_model || toolResult?.result?.motor_query;
            const general = toolResult?.result?.motor_size || toolResult?.result?.general_size;
            const repaint = toolResult?.result?.repaint_size;

            if (model) updatedSession.inquiry.lastMentionedMotor = model;
            if (['S', 'M', 'L', 'XL'].includes(general)) updatedSession.inquiry.serviceSize = general;
            if (['S', 'M', 'L', 'XL'].includes(repaint)) updatedSession.inquiry.repaintSize = repaint;
            break;
          }

          case 'createBooking': {
            const { customerPhone, serviceName, bookingDate, bookingTime, vehicleInfo } = args;
            updatedSession.inquiry.lastBooking = {
              customerPhone,
              serviceName,
              bookingDate,
              bookingTime,
              vehicleInfo,
              createdAt: Date.now(),
            };
            if (serviceName) {
              updatedSession.inquiry.lastMentionedService = {
                serviceName,
                isAmbiguous: false,
              };
            }
            break;
          }

          case 'getPromoBundleDetails': {
            updatedSession.inquiry.lastMentionedService = {
              serviceName: 'Repaint Bodi Halus',
              isAmbiguous: false,
            };
            break;
          }

          case 'getSpecificServicePrice': {
            const serviceName = args.serviceName || args.service_name;
            if (serviceName) {
              updatedSession.inquiry.lastMentionedService = {
                serviceName,
                isAmbiguous: false,
              };
            }
            const hasBookingInfo = session.inquiry?.bookingState?.bookingDate !== undefined;
            if (!hasBookingInfo) {
              updatedSession.followUpState = {
                level: 1,
                flaggedAt: Date.now(),
                context: serviceName || 'unknown_service',
              };
            }
            break;
          }

          case 'getRepaintSurcharge': {
            const effect = args.effect;
            const surcharge = toolResult?.result?.surcharge;
            if (effect && typeof surcharge === 'number') {
              updatedSession.inquiry.repaintSurcharge = { effect, surcharge };
            }
            break;
          }

          default: {
            const serviceName = args.serviceName || args.service_name;
            if (serviceName) {
              updatedSession.inquiry.lastMentionedService = {
                serviceName,
                isAmbiguous: false,
              };
            }
            const motorQuery = args.motor_query;
            if (motorQuery && !updatedSession.inquiry.lastMentionedMotor) {
              updatedSession.inquiry.lastMentionedMotor = motorQuery;
            }
            break;
          }
        }
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