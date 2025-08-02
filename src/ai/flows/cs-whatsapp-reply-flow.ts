
// @file: src/ai/flows/cs-whatsapp-reply-flow.ts (FINAL ATTEMPT)

"use server";

import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import type { Session } from '@/types/ai/session';
import { getSession, updateSession } from '../utils/session';
import { getConversationHistory, saveAIResponse } from '../utils/conversationHistory';
import { isInterventionLockActive } from '../utils/interventionLock';
import { toolFunctionMap } from '../config/aiConfig';
import { masterPrompt } from '../config/aiPrompts';
import { runZoyaAIAgent } from '../agent/runZoyaAIAgent';
import { traceable } from 'langsmith/traceable';
import type OpenAI from 'openai';

// Log LangSmith configuration
console.log('[LANGSMITH CONFIG]', {
  tracing: process.env.LANGSMITH_TRACING,
  project: process.env.LANGSMITH_PROJECT,
  endpoint: process.env.LANGSMITH_ENDPOINT ? 'configured' : 'not set'
});

function normalizeSenderNumber(raw: string): string {
  return raw?.replace(/@c\.us$/, '') || '';
}

export const generateWhatsAppReply = traceable(
  async function generateWhatsAppReply(
    input: ZoyaChatInput
  ): Promise<WhatsAppReplyOutput | null> {
    console.log('[RAW INPUT PAYLOAD]', JSON.stringify(input, null, 2));
    const senderNumber = normalizeSenderNumber(input.senderNumber || 'playground_user');
    console.log('[SENDER NUMBER]', senderNumber);
    if (!senderNumber) {
      throw new Error('senderNumber wajib diisi untuk getSession');
    }
  const senderName = input.senderName || undefined;
  console.log('[SENDER NAME]', senderName);

  const locked = await isInterventionLockActive(senderNumber);
  console.log('[INTERVENTION LOCK CHECK]', { senderNumber, locked });
  if (locked) {
    console.log(`[InterventionLock] Sesi ${senderNumber} sedang di-lock untuk intervensi manusia. Tidak memproses balasan otomatis.`);
    return null;
  }

  let session = await getSession(senderNumber) as Session | null;
  console.log('[SESSION FROM DB]', session ? 'Found existing session' : 'No session found, creating new one');
  if (!session) {
    console.log('[CREATING NEW SESSION]', senderNumber);
    session = {
      senderNumber,
      senderName,
      lastInteraction: { type: 'system', at: Date.now() },
      cartServices: [],
      history: [], // Keep for backward compatibility but won't be used
    };
    const cleanSession = { ...session };
    Object.keys(cleanSession).forEach((k) => {
      if (cleanSession[k] === undefined) {
        delete cleanSession[k];
      }
    });
    await updateSession(senderNumber, cleanSession);
    console.log('[NEW SESSION CREATED]', cleanSession);
  }

  // Get conversation history from directMessages/{senderNumber}/messages subcollection
  let history: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = await getConversationHistory(senderNumber);
  console.log('[CONVERSATION HISTORY LENGTH]', history.length, 'from directMessages subcollection');

  // --- AGGRESSIVE PROMPT INJECTION ---
  // Ensure master prompt is always present to avoid context loss in long conversations.
  const hasMasterPrompt = history.some(p => p.role === 'system' && p.content?.toString().includes('INFO LOKASI'));
  
  if (!hasMasterPrompt) {
    // Filter out any other (potentially old) system messages
    const userAndAssistantHistory = history.filter(p => p.role !== 'system');
    // Prepend the master prompt to the start of the history
    history = [{ role: 'system', content: masterPrompt }, ...userAndAssistantHistory];
    console.log('[MASTER PROMPT INJECTED]', 'Core instructions were missing and have been re-added.');
  }

  history.push({ role: 'user', content: input.customerMessage });
  console.log('[ADDED USER MESSAGE]', input.customerMessage);

  // Add current date context for date-related operations
  const currentDate = new Date();
  const currentDateString = currentDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric', 
    month: 'long',
    day: 'numeric'
  });
  const currentDateIso = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format
  
  const dateContextMessage = `[INFORMASI TANGGAL HARI INI]
Tanggal hari ini: ${currentDateString} (${currentDateIso})
Gunakan informasi ini untuk menghitung tanggal relatif seperti "besok", "lusa", "minggu depan", dll.`;

  history.push({ role: 'system', content: dateContextMessage });
  console.log('[DATE CONTEXT ADDED]', `Current date: ${currentDateString} (${currentDateIso})`);

  try {
    console.log('[CALLING ZOYA AI AGENT]', { messagesCount: history.length, toolsEnabled: true });

    // Use the runZoyaAIAgent instead of direct OpenAI calls
    const agentResult = await runZoyaAIAgent({ 
      chatHistory: history, 
      session,
      senderNumber,
      senderName
    });

    const finalResponse = agentResult.suggestedReply;
    const allToolResults = agentResult.toolCalls || [];

    console.log('[AGENT PROCESSING] Response ready:', finalResponse);
    console.log('[AGENT PROCESSING] Total tools used:', allToolResults.length);

    // Save only AI response to directMessages subcollection (user messages already saved by WhatsApp server)
    if (finalResponse) {
      await saveAIResponse(senderNumber, finalResponse, {
        toolsUsed: allToolResults.map(t => t.toolName),
        iterations: 1
      });
      console.log('[AI RESPONSE SAVED] to directMessages subcollection');
    }

    // Update session with final response (but remove history from session)
    session.lastAssistantMessage = finalResponse;
    
    if (!session.followUpState) {
      session.followUpState = {
        level: 1,
        flaggedAt: Date.now(),
        context: input.customerMessage || 'unknown',
      };
    }

    const cleanSessionUpdate = { ...session };
    Object.keys(cleanSessionUpdate).forEach((k) => {
      if (cleanSessionUpdate[k] === undefined) {
        delete cleanSessionUpdate[k];
      }
    });
    await updateSession(senderNumber, cleanSessionUpdate);
    console.log('[SESSION UPDATED]', { senderNumber, conversationLength: history.length });

    const finalOutput: WhatsAppReplyOutput = {
      suggestedReply: finalResponse,
      toolCalls: allToolResults,
      route: allToolResults.length > 0 ? 'openai_with_tools' : 'openai_completion_reply',
      metadata: { 
        toolsUsed: allToolResults.map(t => t.toolName),
        iterations: 1
      },
    };
    console.log('[FINAL OUTPUT]', finalOutput);
    return finalOutput;
  } catch (error) {
    console.error("Error besar di alur utama OpenAI Completion:", error);
    try {
      const triggerBosMat = toolFunctionMap['triggerBosMatTool']?.implementation;
      if (triggerBosMat && session) {
        await triggerBosMat({
          reason: 'Unhandled error in WhatsApp AI flow',
          customerQuestion: input.customerMessage || 'unknown',
          error: (error instanceof Error ? error.message : String(error))
        }, { session, senderNumber });
      }
    } catch (e) {
      console.error('Gagal triggerBosMatTool di fallback error:', e);
    }
    return {
      suggestedReply: "Waduh, Zoya lagi pusing nih. Coba lagi nanti ya atau hubungi BosMat.",
      toolCalls: [],
      route: 'unhandled_error'
    };
  }
}, {
  name: "generateWhatsAppReply",
  metadata: {
    component: "cs-whatsapp-flow",
    version: "v1.0"
  },
  // Add input/output data to LangSmith trace
  run_type: "chain"
});
