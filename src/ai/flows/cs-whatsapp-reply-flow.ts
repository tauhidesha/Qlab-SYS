// @file: src/ai/flows/cs-whatsapp-reply-flow.ts (VERSI BARU - ASSISTANTS API)

"use server";

// Perbaiki import: gunakan path dan tipe yang benar sesuai struktur QLAB-SYS
import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import type { Session } from '@/types/ai';
import { getSession, updateSession } from '../utils/session';
import { openai } from '@/lib/openai';
import { toolFunctionMap } from '../config/aiConfig';
import hargaLayanan from '@/data/hargaLayanan';

// --- KONFIGURASI ---
const ASSISTANT_ID = "asst_JyaduA3bLsVjEkQQKYux52JA"; // <-- GANTI DENGAN ID ASISTEN ANDA

function normalizeSenderNumber(raw: string): string {
  return raw?.replace(/@c\.us$/, '') || '';
}

/**
 * Fungsi ini adalah jantung dari agent loop. Ia menunggu Asisten menyelesaikan tugasnya.
 */
async function waitForRunCompletion(threadId: string, runId: string, session: Session): Promise<string> {
  while (true) {
    console.log("[Assistants API] Checking run status...");
    // Perbaiki parameter retrieve
    const runStatus = await openai.beta.threads.runs.retrieve(runId, { thread_id: threadId });

    // 1. Jika Run sudah selesai
    if (runStatus.status === 'completed') {
      console.log("[Assistants API] Run completed.");
      const messages = await openai.beta.threads.messages.list(threadId, { limit: 1 });
      const lastMessage = messages.data[0];
      if (lastMessage && lastMessage.content[0]?.type === 'text') {
        return lastMessage.content[0].text.value;
      }
      return "Zoya selesai memproses, tapi tidak ada balasan teks.";
    }

    // 2. Jika Asisten butuh memanggil tool
    if (runStatus.status === 'requires_action') {
      console.log("[Assistants API] Run requires action (memanggil tool)...");
      const toolCalls = runStatus.required_action?.submit_tool_outputs.tool_calls || [];
      // --- "TOOL GUARD" LOGIC DIPINDAHKAN KE SINI ---
      const correctedToolCalls = toolCalls.map(call => {
        const toolsToCorrect = ['checkBookingAvailability', 'createBooking', 'findNextAvailableSlot'];
        if (toolsToCorrect.includes(call.function.name)) {
          console.log(`[Flow][Tool Guard] Mengintersep tool: ${call.function.name}. Memaksa data dari sesi.`);
          const args = JSON.parse(call.function.arguments);
          const actualServices = (session.cartServices || []).filter(s => s && s !== 'General Inquiry');
          let primaryServiceName = actualServices.find(s => s.includes('Repaint Bodi Halus')) || actualServices[0] || 'Layanan Umum';
          args.serviceName = primaryServiceName;
          let totalMinutes = 0;
          for (const serviceName of actualServices) {
            const serviceData = hargaLayanan.find((s: any) => s.name === serviceName);
            if (serviceData && serviceData.estimatedDuration) {
              const duration = parseInt(serviceData.estimatedDuration as string, 10);
              if (!isNaN(duration)) totalMinutes += duration;
            }
          }
          args.estimatedDurationMinutes = totalMinutes > 0 ? totalMinutes : 60;
          call.function.arguments = JSON.stringify(args);
          console.log('[Flow][Tool Guard] Argumen setelah dikoreksi:', args);
        }
        return call;
      });
      // --- AKHIR "TOOL GUARD" ---

      const finalBookingCall = correctedToolCalls.find(tc => tc.function.name === 'finalizeBooking');
      if (finalBookingCall) {
        // ... (logika handoff booking Anda)
      }

      const toolOutputs = await Promise.all(correctedToolCalls.map(async (toolCall) => {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        const toolImplementation = toolFunctionMap[functionName]?.implementation;
        let output = { success: false, error: `Tool ${functionName} tidak ditemukan.` };
        if (toolImplementation) {
          output = await toolImplementation(args, { session });
        }
        return { tool_call_id: toolCall.id, output: JSON.stringify(output) };
      }));

      await openai.beta.threads.runs.submitToolOutputs(runId, {
        thread_id: threadId,
        tool_outputs: toolOutputs,
      });
    }

    // 3. Jika Run gagal
    if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
      console.error(`[Assistants API] Run failed with status: ${runStatus.status}`, runStatus.last_error);
      return `Waduh, Zoya lagi ada kendala teknis nih. (Error: ${runStatus.status})`;
    }

    // Tunggu sejenak sebelum cek status lagi
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
}

export async function generateWhatsAppReply(
  input: ZoyaChatInput
): Promise<WhatsAppReplyOutput | null> {
  console.log('[RAW INPUT PAYLOAD]', JSON.stringify(input, null, 2));
  const senderNumber = normalizeSenderNumber(input.senderNumber || 'playground_user');
  const senderName = input.senderName || undefined;

  // Ambil sesi hanya untuk mendapatkan thread_id
  let session = await getSession(senderNumber) as Session | null;

  try {
    // 1. Dapatkan atau buat thread_id untuk user ini
    let threadId = session?.threadId;
    if (!threadId) {
      console.log(`[Assistants API] Membuat thread baru untuk ${senderNumber}`);
      const thread = await openai.beta.threads.create({
        metadata: {
          customer_name: senderName || 'Belum diketahui',
          customer_phone: senderNumber,
        }
      });
      threadId = thread.id;
      // Inisialisasi sesi jika belum ada
      if (!session) {
        session = {
          senderNumber,
          senderName,
          lastInteraction: { type: 'system', at: Date.now() },
          cartServices: [],
          threadId: threadId,
        };
      } else {
        session.threadId = threadId;
      }
      await updateSession(senderNumber, session as Partial<Session>);
    }

    // 2. Tambahkan pesan user ke thread
    console.log(`[Assistants API] Menambahkan pesan ke thread ${threadId}`);
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: input.customerMessage,
    });

    // 3. Buat dan jalankan Run pada thread
    console.log(`[Assistants API] Menjalankan asisten ${ASSISTANT_ID} pada thread ${threadId}`);
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
      // Di sini Anda bisa menambahkan instruksi tambahan jika perlu
      // instructions: "Tolong tanggapi pesan terakhir dari user."
    });

    // 4. Tunggu hasilnya (teks final dari Asisten)
    if (!session) {
      throw new Error('Session tidak ditemukan saat menjalankan agent loop.');
    }
    const assistantReply = await waitForRunCompletion(threadId, run.id, session);
    
    // 5. Finalisasi output
    const finalOutput: WhatsAppReplyOutput = {
      suggestedReply: assistantReply,
      toolCalls: [],
      route: 'assistant_api_reply',
      metadata: {},
    };
    
    // Simpan balasan Zoya ke sesi jika diperlukan untuk logika lain
    if (session) {
      await updateSession(senderNumber, { ...session, lastAssistantMessage: finalOutput.suggestedReply });
    }

    return finalOutput;

  } catch (error) {
    console.error("Error besar di alur utama Asisten:", error);
    return { 
      suggestedReply: "Waduh, Zoya lagi pusing nih. Coba lagi nanti ya atau hubungi BosMat.",
      toolCalls: [],
      route: 'unhandled_error'
    };
  }
}