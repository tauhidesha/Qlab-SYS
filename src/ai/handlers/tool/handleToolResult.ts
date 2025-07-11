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
  needsHumanHelp?: boolean;
  humanHelpReason?: string;
  customerQuestion?: string;
}> {
  // --- Normalisasi panggilan tool ---
  const normalizedCalls: NormalizedToolCall[] = toolCalls.map((call) => ({
    toolName: call.toolName || call.function?.name,
    arguments: typeof call.arguments === 'string'
      ? JSON.parse(call.arguments)
      : call.arguments || call.function?.arguments,
    id: call.id || call.tool_call_id || 'no_id',
  }));

  // --- Jalankan semua tools ---
const toolResponses = await runToolCalls(normalizedCalls, {
  input,
  session,
});


  // --- Generate response dari GPT berdasarkan hasil tool ---
  const toolNames = normalizedCalls.map(c => c.toolName);
  const hasPrice = toolNames.includes('getSpecificServicePrice');
  const hasSurcharge = toolNames.includes('getRepaintSurcharge');

  let replyMessage: string | undefined;

  // Kalau dua tool ini terpanggil, gabungkan manual
  if (hasPrice && hasSurcharge) {
    const priceCall = normalizedCalls.find(c => c.toolName === 'getSpecificServicePrice');
    const surchargeCall = normalizedCalls.find(c => c.toolName === 'getRepaintSurcharge');
    const priceResult = toolResponses[normalizedCalls.findIndex(c => c.toolName === 'getSpecificServicePrice')]?.result;
    const surchargeResult = toolResponses[normalizedCalls.findIndex(c => c.toolName === 'getRepaintSurcharge')]?.result;

    const basePrice = priceResult?.price;
    const effect = surchargeCall?.arguments?.effect;
    const surcharge = surchargeResult?.surcharge;

    if (typeof basePrice === 'number' && typeof surcharge === 'number') {
      replyMessage = generateToolSummary('__combo_price_with_surcharge', {
        basePrice,
        effect,
        surcharge
      });
    }
  }

  // Fallback ke GPT kalau belum digabung
  if (!replyMessage) {
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

    replyMessage = followUp.choices[0]?.message?.content?.trim();
  }

  // Fallback terakhir: pakai summary tool manual
  if (!replyMessage || replyMessage.startsWith('[AI]')) {
    const toolName = normalizedCalls[0]?.toolName;
    const toolResult = toolResponses[0];
    replyMessage = generateToolSummary(toolName, toolResult);

    // Kalau masih gak jelas, minta bantuan manusia
    if (!replyMessage || replyMessage.startsWith('[AI]') || replyMessage.includes('maaf') || replyMessage.length < 15) {
      return {
        replyMessage: "Hmm, aku belum yakin jawabannya. Aku tanya dulu ke Bos Mamat ya 🙏",
        updatedSession: {},
        needsHumanHelp: true,
        humanHelpReason: `Hasil tool "${toolName}" belum cukup jelas atau GPT gak bisa kasih jawaban pasti.`,
        customerQuestion: input.customerMessage,
      };
    }
  }

  // --- Update session berdasarkan hasil tool ---
  const updatedSession: Partial<SessionData> = {
    inquiry: { ...session.inquiry },
  };

  for (let i = 0; i < normalizedCalls.length; i++) {
    const toolCall = normalizedCalls[i];
    const toolResult = toolResponses[i];
    const args = toolCall.arguments;

    try {
      switch (toolCall.toolName) {
        case 'getMotorSizeDetails': {
          const details = toolResult?.data?.details;
          if (details) {
            if (details.motor_model) {
              updatedSession.inquiry!.lastMentionedMotor = details.motor_model;
            }
            if (['S', 'M', 'L', 'XL'].includes(details.repaint_size)) {
              updatedSession.inquiry!.repaintSize = details.repaint_size;
            }
            if (['S', 'M', 'L', 'XL'].includes(details.general_size)) {
              updatedSession.inquiry!.serviceSize = details.general_size;
            }
          }
          break;
        }

        case 'extractBookingDetailsTool': {
          const motorQuery = toolResult?.data?.motorQuery;
          if (motorQuery && !updatedSession.inquiry?.lastMentionedMotor) {
            updatedSession.inquiry!.lastMentionedMotor = motorQuery;
          }
          break;
        }

        case 'createBooking': {
          const { customerPhone, serviceName, bookingDate, bookingTime, vehicleInfo } = args;

          updatedSession.inquiry!.lastBooking = {
            customerPhone,
            serviceName,
            bookingDate,
            bookingTime,
            vehicleInfo,
            createdAt: Date.now(),
          };

          if (serviceName) {
            updatedSession.inquiry!.lastMentionedService = {
              serviceName,
              isAmbiguous: false,
            };
          }
          break;
        }

        case 'getPromoBundleDetails': {
          updatedSession.inquiry!.lastMentionedService = {
            serviceName: 'Repaint Bodi Halus',
            isAmbiguous: false,
          };
          break;
        }

        case 'getSpecificServicePrice': {
          const serviceName = args.serviceName || args.service_name;
          if (serviceName) {
            updatedSession.inquiry!.lastMentionedService = {
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
          const surcharge = toolResult?.data?.surcharge;

          if (effect && typeof surcharge === 'number') {
            updatedSession.inquiry!.repaintSurcharge = {
              effect,
              surcharge,
            };
          }
          break;
        }

        default: {
          const serviceName = args.serviceName || args.service_name;
          if (serviceName) {
            updatedSession.inquiry!.lastMentionedService = {
              serviceName,
              isAmbiguous: false,
            };
          }

          const motorQuery = args.motor_query;
          if (motorQuery && !updatedSession.inquiry?.lastMentionedMotor) {
            updatedSession.inquiry!.lastMentionedMotor = motorQuery;
          }

          break;
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
