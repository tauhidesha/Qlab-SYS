
// @file: src/ai/flows/cs-whatsapp-reply-flow.ts (VERSI BARU - ASSISTANTS API)

"use server";

// Perbaiki import: gunakan path dan tipe yang benar sesuai struktur QLAB-SYS
import { traceable } from "langsmith/traceable";
import type { ZoyaChatInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import type { Session } from '@/types/ai';
import { getSession, updateSession } from '../utils/session';
import { isInterventionLockActive } from '../utils/interventionLock';
import { openai as baseOpenai } from '@/lib/openai';
import { toolFunctionMap } from '../config/aiConfig';
import hargaLayanan from '@/data/hargaLayanan';


// --- KONFIGURASI ---

const ASSISTANT_ID = "asst_JyaduA3bLsVjEkQQKYux52JA"; // <-- GANTI DENGAN ID ASISTEN ANDA

const openai = baseOpenai;

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
      // Kirim tool calls langsung tanpa tool guard
      const toolOutputs = await Promise.all(toolCalls.map(async (toolCall) => {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);

        // Fallback/validasi untuk triggerBosMatTool agar tidak error jika argumen kosong
        if (functionName === 'triggerBosMatTool') {
          if (!args.reason || !args.customerQuestion) {
            return {
              tool_call_id: toolCall.id,
              output: JSON.stringify({
                success: false,
                error: 'Argumen reason dan customerQuestion wajib diisi untuk triggerBosMatTool.'
              })
            };
          }
        }

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


export const generateWhatsAppReply = traceable(
  async function generateWhatsAppReply(
    input: ZoyaChatInput
  ): Promise<WhatsAppReplyOutput | null> {
    console.log('[RAW INPUT PAYLOAD]', JSON.stringify(input, null, 2));
    const senderNumber = normalizeSenderNumber(input.senderNumber || 'playground_user');
    if (!senderNumber) {
      throw new Error('senderNumber wajib diisi untuk getSession');
    }
    const senderName = input.senderName || undefined;

    // --- Intervention Lock Check ---
    const locked = await isInterventionLockActive(senderNumber);
    if (locked) {
      console.log(`[InterventionLock] Sesi ${senderNumber} sedang di-lock untuk intervensi manusia. Tidak memproses balasan otomatis.`);
      return null;
    }

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

      // 2. Kirim pesan user langsung ke thread, dengan blok [SENDER_INFO]
      console.log(`[Assistants API] Menambahkan pesan user ke thread ${threadId}`);
      const senderInfoBlock = `\n[SENDER_INFO]\nNama: ${senderName || 'Tidak diketahui'}\nNomor: ${senderNumber}`;
      const now = new Date();
      const dateInfoBlock = `\n[DATE_INFO]\nTanggal: ${now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\nWaktu: ${now.toLocaleTimeString('id-ID')}`;
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: `${input.customerMessage}${senderInfoBlock}${dateInfoBlock}`,
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
      
      // 5. Update followUpState jika belum ada (untuk kebutuhan follow-up otomatis)
      if (session && !session.followUpState) {
        session.followUpState = {
          level: 1,
          flaggedAt: Date.now(),
          context: input.customerMessage || 'unknown',
        };
        await updateSession(senderNumber, session);
      }
      // Finalisasi output
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
      // Fallback: triggerBosMatTool jika error besar
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
  }
);
