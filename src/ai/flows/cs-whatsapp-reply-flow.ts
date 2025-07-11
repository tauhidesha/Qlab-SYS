'use server';

import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import { getSession, updateSession } from '@/ai/utils/session';
import { mapTermToOfficialService } from '../handlers/routes/lib/classifiers/mapTermToOfficialService';
import { Timestamp } from 'firebase/firestore';
import type { SessionData } from '@/ai/utils/session';
import { mergeSession } from '@/ai/utils/mergeSession';
import { runZoyaAIAgent } from '@/ai/agent/runZoyaAIAgent';
import { handleToolResult } from '../handlers/tool/handleToolResult';
import { notifyBosMamat, setSnoozeMode } from '@/ai/utils/humanHandoverTool';
import { setPendingHumanReply } from '../utils/sessions/setPendingHumanReply';

export async function generateWhatsAppReply(
  input: ZoyaChatInput
): Promise<WhatsAppReplyOutput | null> {
  const senderNumber = input.senderNumber || 'playground_user';
  const senderName = input.senderName || undefined;

  let session = await getSession(senderNumber);

  console.log(`\n\n================ Zoya New Turn for ${senderNumber} ================`);
  console.log(`[PESAN MASUK]: "${input.customerMessage}"`);
  console.log(`[LOG SESI AWAL]:`, JSON.stringify(session, null, 2));

  // Cegah balasan jika sedang dalam mode snooze
  if (session?.snoozeUntil && Date.now() < session.snoozeUntil) {
    console.log(`[FlowController] Mode diam aktif. Tidak ada balasan.`);
    return {
      suggestedReply: '',
      toolCalls: [],
      route: 'snoozed',
      metadata: { snoozeUntil: session.snoozeUntil },
    };
  }

  // Inisialisasi sesi baru jika belum ada
  if (!session) {
    console.log(`[FlowController] Sesi baru dibuat untuk ${senderNumber}.`);
    session = {
      flow: 'general',
      inquiry: {},
      lastInteraction: Timestamp.now(),
      followUpState: null,
      lastRoute: 'init',
      senderName,
    };
  } else {
    // Tambal data yang belum ada
    if (!session.senderName && senderName) {
      session.senderName = senderName;
    }
    if (session.followUpState) {
      console.log(`[FlowController] Follow-up dibatalkan karena ada pesan baru.`);
      session.followUpState = null;
    }
  }

  // 🔍 Deteksi layanan dari pesan
  const mappedServiceResult = mapTermToOfficialService(input.customerMessage);
  if (mappedServiceResult?.serviceName) {
    session.inquiry ??= {};
    session.inquiry.lastMentionedService = {
      serviceName: mappedServiceResult.serviceName,
      isAmbiguous: mappedServiceResult.isAmbiguous ?? false,
    };
  }

  // 🔍 Deteksi motor dari keyword umum
  const knownMotors = ['nmax', 'pcx', 'vario', 'beat', 'cbr', 'supra', 'vespa', 'yamaha', 'honda'];
  function detectMotorModel(message: string): string | null {
    const msg = message.toLowerCase();
    for (const motor of knownMotors) {
      if (msg.includes(motor)) return motor;
    }
    return null;
  }

  const detectedMotor = detectMotorModel(input.customerMessage);
  if (detectedMotor) {
    session.inquiry ??= {};
    session.inquiry.lastMentionedMotor = detectedMotor;
  }

  // 🤖 Deteksi permintaan eksplisit ke manusia
  const msg = input.customerMessage.toLowerCase();
  const mintaBosMamat =
    ['bos mamat', 'admin', 'cs', 'customer service', 'orang', 'manusia', 'langsung'].some((keyword) =>
      msg.includes(keyword),
    ) &&
    ['mau', 'panggil', 'bicara', 'ngomong', 'hubungi', 'ketemu'].some((trigger) => msg.includes(trigger));

  if (mintaBosMamat) {
    await setSnoozeMode(senderNumber);
    await notifyBosMamat(senderNumber, input.customerMessage);
    return {
      suggestedReply: 'Oke bro, Zoya panggilin Bos Mamat dulu ya. Tunggu sebentar 🙏',
      toolCalls: [],
      route: 'handover_request',
      metadata: { snoozeUntil: Date.now() + 60 * 60 * 1000 },
    };
  }

  // 🔮 Jalankan AI Agent
  const agentResult = await runZoyaAIAgent({
    session,
    message: input.customerMessage,
    chatHistory: input.chatHistory,
    senderNumber,
    senderName,
  });

  let replyMessage = agentResult.suggestedReply || '';

  // ⚙️ Jalankan Tool jika diperlukan
  if (agentResult.toolCalls?.length > 0) {
    console.log(`[DEBUG][AI HANDLER][TOOLCALL]`, agentResult.toolCalls);

    const result = await handleToolResult({
      toolCalls: agentResult.toolCalls,
      input,
      session,
    });

    // ✅ PATCH: Jika toolResult minta bantuan manusia
    if (result.needsHumanHelp) {
      replyMessage = result.replyMessage;

      await notifyBosMamat(senderNumber, result.customerQuestion || input.customerMessage);
      await setSnoozeMode(senderNumber);

      return {
        suggestedReply: replyMessage,
        toolCalls: [],
        route: 'ai_agent_need_human',
        metadata: { snoozeUntil: Date.now() + 60 * 60 * 1000 },
      };
    }

    replyMessage = result.replyMessage;
    session = mergeSession(session, result.updatedSession);
  }

  // ✅ PATCH: Deteksi jika GPT memutuskan untuk tanya ke Bos Mamat
  const msgLower = replyMessage.toLowerCase();
  if (msgLower.includes('zoya bantu tanyain dulu ke bos mamat')) {
    console.log(`[HandoverTrigger] Zoya minta bantu Bos Mamat.`);

    await notifyBosMamat(senderNumber, input.customerMessage);
    await setPendingHumanReply({ customerNumber: senderNumber, question: input.customerMessage });
    await setSnoozeMode(senderNumber);

    return {
      suggestedReply: replyMessage,
      toolCalls: [],
      route: 'handover_consult',
      metadata: { snoozeUntil: Date.now() + 60 * 60 * 1000 },
    };
  }

  // 🧯 Fallback jika GPT kosong & tidak ada tool
  if (
    (!replyMessage || replyMessage.trim() === '' || replyMessage.startsWith('[AI] Tidak ada jawaban')) &&
    (!agentResult.toolCalls || agentResult.toolCalls.length === 0)
  ) {
    replyMessage = 'Aduh, Zoya bingung nih. Bentar ya, Zoya panggilin Bos Mamat. 🙏';
    await setSnoozeMode(senderNumber);
    await notifyBosMamat(senderNumber, input.customerMessage);
  }

  // 💾 Update session terakhir
  const finalSession = mergeSession(session, {
    ...agentResult.updatedSession,
    lastInteraction: Timestamp.now(),
    lastRoute: agentResult.route || 'ai_agent',
  });

  if (!finalSession.senderName) finalSession.senderName = senderName;

  await updateSession(senderNumber, finalSession);
  console.log(`[FlowController] Sesi untuk ${senderNumber} di-update.`);

  const sessionForClient = {
    ...finalSession,
    lastInteraction: finalSession.lastInteraction
      ? {
          seconds: finalSession.lastInteraction.seconds,
          nanoseconds: finalSession.lastInteraction.nanoseconds,
        }
      : null,
  };

  console.log(`🤖 Zoya AI Reply: "${replyMessage}"`);
  if (agentResult.toolCalls?.length) {
    console.log(`🧰 Tool Calls:`);
    for (const tool of agentResult.toolCalls) {
      console.log(`  - ${tool.toolName}: ${JSON.stringify(tool.arguments)}`);
    }
  }

  return {
    suggestedReply: replyMessage,
    toolCalls: agentResult.toolCalls || [],
    route: agentResult.route || 'ai_agent',
    metadata: {
      sessionDebug: sessionForClient,
    },
  };
}
