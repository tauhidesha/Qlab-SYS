// File: src/ai/handlers/routes/handleFallbackResponse.ts

import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';
import { openai } from '@/lib/openai';
import type { OpenAI } from 'openai';
import { masterPrompt, zoyaTools } from '../../config/aiConfig';
import { updateSession } from '../../utils/session';
import { notifyBosMamat, setSnoozeMode } from '../../utils/humanHandoverTool';
import { Timestamp } from 'firebase/firestore';

// Impor semua implementasi tool
import { getSpecificServicePrice } from '@/ai/tools/getSpecificServicePriceTool';
import { getPromoBundleDetails } from '../../tools/getPromoBundleDetailsTool';
import { getMotorSizeDetails } from '../../tools/getMotorSizeDetailsTool';

export const handleFallbackResponse: RouteHandlerFn = async ({
  session,
  message,
  chatHistory,
  senderNumber,
}) => {
  console.log('[Handler] Tidak ada jalur cepat, melempar ke AI Agent...');

  const HANDOVER_MESSAGE =
    'Aduh Zoya bingung, bentar Zoya panggilin Bos Mamat ya.';

  try {
    const messagesForAI: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: masterPrompt },
      {
        role: 'system',
        content: `Catatan sesi saat ini: ${JSON.stringify(
          session?.inquiry || { note: 'tidak ada catatan' },
        )}.`,
      },
      ...(chatHistory as OpenAI.Chat.Completions.ChatCompletionMessageParam[] || []),
      { role: 'user', content: message! },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messagesForAI,
      tools: zoyaTools,
      tool_choice: 'auto',
    });

    const responseMessage = response.choices[0].message;
    const toolCalls = responseMessage.tool_calls;

    if (!toolCalls) {
      if (responseMessage.content) {
        return {
          reply: { message: responseMessage.content },
          updatedSession: { ...session, lastRoute: 'ai_agent_text_reply' } as SessionData,
        };
      }
      throw new Error('AI Agent tidak memberikan respons atau tool call.');
    }

    messagesForAI.push(responseMessage);

    const toolResults = await Promise.all(toolCalls.map(async (toolCall) => {
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments);
      let result;

      console.log(`[AI Action] Memanggil tool: ${functionName}`, functionArgs);
      switch (functionName) {
        case 'getSpecificServicePrice':
          result = await getSpecificServicePrice(functionArgs);
          break;
        case 'getPromoBundleDetails':
          result = await getPromoBundleDetails(functionArgs);
          break;
        case 'getMotorSizeDetails':
          result = await getMotorSizeDetails(functionArgs);
          break;
        default:
          result = { error: `Tool tidak dikenal: ${functionName}` };
      }
      return { tool_call_id: toolCall.id, role: 'tool' as const, content: JSON.stringify(result) };
    }));
    
    messagesForAI.push(...toolResults);
    
    // --- INI PERBAIKAN UTAMANYA (SESUAI SARAN GPT) ---
    // Modifikasi objek inquiry secara langsung setelah semua tool berjalan
    if (session) {
        // Cari hasil dari tool getPromoBundleDetails
        const promoToolCall = toolCalls.find(tc => tc.function.name === 'getPromoBundleDetails');
        if (promoToolCall) {
            const promoResultRaw = toolResults.find(tr => tr.tool_call_id === promoToolCall.id)?.content;
            try {
                const promoResult = JSON.parse(promoResultRaw || '{}');
                console.log('[Debug] Hasil getPromoBundleDetails:', promoResult);

                // Tetapkan nama layanan inti, bukan nama promo
                session.inquiry.lastMentionedService = 'Repaint Bodi Halus';
                console.log('[Context] Konteks promo terdeteksi, menyimpan "Repaint Bodi Halus" ke sesi.');

                // Cek dan simpan nama motor jika ada di dalam hasil promo
                if (promoResult.motor_model) {
                    console.log(`[Context] Promo result mengandung motor: ${promoResult.motor_model}`);
                    session.inquiry.lastMentionedMotor = promoResult.motor_model;
                } else {
                    console.warn('[Context] Hasil dari getPromoBundleDetails tidak mengandung motor_model.');
                }
            } catch (e) {
                console.error('[Error] Gagal parsing hasil tool getPromoBundleDetails:', e);
            }
        }
    }
    // --- AKHIR PERBAIKAN ---
    
    const finalResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messagesForAI,
    });
    
    const finalContent = finalResponse.choices[0].message.content?.trim();
    if (!finalContent) {
      throw new Error('AI Agent gagal merangkum hasil tool.');
    }

    let needsFollowUp = false;
    const calledToolNames = toolCalls.map(tc => tc.function.name);
    if (
      calledToolNames.includes('getSpecificServicePrice') ||
      calledToolNames.includes('getServiceDescription') ||
      calledToolNames.includes('getPromoBundleDetails')
    ) {
      needsFollowUp = true;
    }

    let updatedSession = session;
    if (needsFollowUp) {
      console.log(`[Follow-up] Menandai ${senderNumber} untuk follow-up.`);
      updatedSession = {
        ...updatedSession,
        followUpState: {
          level: 1,
          flaggedAt: Date.now(),
          context: session?.inquiry?.lastMentionedService || message!.substring(0, 50),
        },
      };
    }
    
    updatedSession = { ...updatedSession, lastRoute: 'ai_agent' } as SessionData;

    return {
      reply: { message: finalContent },
      updatedSession: updatedSession,
    };

  } catch (error) {
    console.error('Error saat menjalankan AI Agent:', error);
    await notifyBosMamat(senderNumber!, message!);
    await setSnoozeMode(senderNumber!);
    return {
      reply: { message: HANDOVER_MESSAGE },
      updatedSession: { ...session, lastRoute: 'ai_agent_error' } as SessionData,
    };
  }
};