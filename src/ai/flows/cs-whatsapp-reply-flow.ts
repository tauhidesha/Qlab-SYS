
// @file: src/ai/flows/cs-whatsapp-reply-flow.ts (FINAL ATTEMPT)

"use server";

import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import type { Session } from '@/types/ai/session';
import { getSession, updateSession } from '../utils/session';
import { getConversationHistory, saveAIResponse } from '../utils/conversationHistory';
import { isInterventionLockActive } from '../utils/interventionLock';
import { toolFunctionMap, zoyaTools } from '../config/aiConfig';
import { masterPrompt } from '../config/aiPrompts';
import OpenAI from 'openai';
import { wrapOpenAI } from 'langsmith/wrappers';
import { traceable } from 'langsmith/traceable';

const openAIClient = wrapOpenAI(new OpenAI({ apiKey: process.env.OPENAI_API_KEY! }));

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

  // Ensure master prompt is always present at the start of the conversation
  if (history.length === 0 || !history[0].content?.toString().includes('INFO LOKASI')) {
    // Filter out any other system messages to avoid duplication
    const userAndAssistantHistory = history.filter(p => p.role !== 'system');
    history = [{ role: 'system', content: masterPrompt }, ...userAndAssistantHistory];
    console.log('[SYSTEM PROMPT ADDED/PREPENDED]', 'Master prompt injected into conversation history.');
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
    console.log('[CALLING OPENAI]', { model: 'gpt-4o-mini', messagesCount: history.length, toolsEnabled: true });

    let finalResponse = '';
    let allToolResults: Array<{ toolName: string; arguments: any; }> = [];
    let maxIterations = 4; // Prevent infinite loops - limited to 4 iterations
    let iteration = 0;
    
    while (iteration < maxIterations) {
      iteration++;
      console.log(`[ITERATION ${iteration}] Starting OpenAI call`);
      
      const completion = await openAIClient.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: history,
        temperature: 1,
        tools: zoyaTools,
        tool_choice: 'auto',
      });

      const message = completion.choices[0]?.message;
      const messageContent = message?.content || '';
      const toolCalls = message?.tool_calls || [];
      
      console.log(`[ITERATION ${iteration}] Response:`, messageContent);
      console.log(`[ITERATION ${iteration}] Tool calls:`, toolCalls.length);
      
      // Add assistant message to history
      if (messageContent || toolCalls.length > 0) {
        history.push({
          role: 'assistant',
          content: messageContent,
          tool_calls: toolCalls.length > 0 ? toolCalls : undefined
        });
      }
      
      // If no tool calls, this is the final response
      if (toolCalls.length === 0) {
        finalResponse = messageContent || "Maaf, Zoya lagi bingung nih. Boleh coba tanya lagi, om?";
        console.log(`[ITERATION ${iteration}] Final response received`);
        break;
      }
      
      // Process tool calls
      console.log(`[ITERATION ${iteration}] Processing ${toolCalls.length} tool calls`);
      for (const toolCall of toolCalls) {
        try {
          const functionName = toolCall.function.name;
          const args = JSON.parse(toolCall.function.arguments);
          
          console.log(`[TOOL CALL] ${functionName}`, args);
          
          const toolImpl = toolFunctionMap[functionName];
          if (toolImpl && toolImpl.implementation) {
            // Wrap tool execution with tracing
            const traceableToolExecution = traceable(
              async (args: any, context: any) => {
                return await toolImpl.implementation(args, context);
              },
              {
                name: `tool_${functionName}`,
                metadata: {
                  tool_name: functionName,
                  tool_args: JSON.stringify(args)
                }
              }
            );
            
            const result = await traceableToolExecution(args, { session, senderNumber });
            console.log(`[TOOL RESULT] ${functionName}`, result);
            
            allToolResults.push({
              toolName: functionName,
              arguments: args
            });
            
            // Add tool result to history
            history.push({
              role: 'tool',
              content: JSON.stringify(result),
              tool_call_id: toolCall.id
            });
          } else {
            console.error(`[TOOL ERROR] Tool implementation not found: ${functionName}`);
            // Add error result to history
            history.push({
              role: 'tool',
              content: JSON.stringify({ error: `Tool ${functionName} not implemented` }),
              tool_call_id: toolCall.id
            });
          }
        } catch (toolError) {
          console.error(`[TOOL ERROR] ${toolCall.function.name}:`, toolError);
          const errorArgs = JSON.parse(toolCall.function.arguments);
          allToolResults.push({
            toolName: toolCall.function.name,
            arguments: errorArgs
          });
          
          // Add error result to history
          history.push({
            role: 'tool',
            content: JSON.stringify({ error: toolError instanceof Error ? toolError.message : String(toolError) }),
            tool_call_id: toolCall.id
          });
        }
      }
    }
    
    if (iteration >= maxIterations) {
      console.warn('[MAX ITERATIONS REACHED] Stopping loop to prevent infinite execution');
      finalResponse = finalResponse || "Maaf, Zoya butuh waktu lebih lama untuk memproses. Coba tanya lagi ya, mas!";
    }
    
    console.log('[FINAL PROCESSING] Response ready:', finalResponse);
    console.log('[FINAL PROCESSING] Total tools used:', allToolResults.length);

    // Save only AI response to directMessages subcollection (user messages already saved by WhatsApp server)
    if (finalResponse) {
      await saveAIResponse(senderNumber, finalResponse, {
        toolsUsed: allToolResults.map(t => t.toolName),
        iterations: iteration
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
        iterations: iteration
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
