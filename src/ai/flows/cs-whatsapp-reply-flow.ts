
'use server';
/**
 * @fileOverview Flow AI untuk WhatsApp Customer Service QLAB (Versi Disederhanakan).
 * Versi ini FOKUS pada pemanggilan model dasar dengan SATU tool sederhana.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, where, getDocs as getFirestoreDocs, Timestamp, doc, getDoc as getFirestoreDoc, limit } from 'firebase/firestore';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';
import { cariSizeMotorTool, type CariSizeMotorInput, type CariSizeMotorOutput } from '@/ai/tools/cari-size-motor-tool'; // Import tool baru

// Skema internal untuk validasi input chat history di flow
const ChatMessageSchemaInternal = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
type ChatMessage = z.infer<typeof ChatMessageSchemaInternal>;

// Skema input untuk ZoyaChatFlow
const ZoyaChatInputSchema = z.object({
  messages: z.array(ChatMessageSchemaInternal).optional().describe("Riwayat percakapan lengkap, jika ada."),
  customerMessage: z.string().min(1, "Pesan pelanggan tidak boleh kosong.").describe("Pesan terbaru dari customer."),
  senderNumber: z.string().optional().describe("Nomor WhatsApp pengirim (opsional)."),
  mainPromptString: z.string().optional().describe("String prompt utama yang mungkin dikirim dari UI atau diambil dari Firestore."),
  currentDate: z.string().optional(),
  currentTime: z.string().optional(),
  tomorrowDate: z.string().optional(),
  dayAfterTomorrowDate: z.string().optional(),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>;

// Skema output tetap sama, hanya teks balasan
const ZoyaChatOutputSchema = z.string().describe("Balasan teks dari Zoya.");

// Flow utama Zoya - Sekarang dengan tool sederhana
const zoyaChatFlow = ai.defineFlow(
  {
    name: 'zoyaChatFlow',
    inputSchema: ZoyaChatInputSchema,
    outputSchema: ZoyaChatOutputSchema,
  },
  async (input: ZoyaChatInput): Promise<string> => {
    console.log("[CS-FLOW] zoyaChatFlow input. Customer Message:", input.customerMessage, "History Length:", (input.messages || []).length);

    const lastUserMessageContent = input.customerMessage ||
                                   (input.messages && input.messages.length > 0 ? input.messages[input.messages.length - 1].content : '');

    if (!lastUserMessageContent || lastUserMessageContent.trim() === '') {
      console.warn("[CS-FLOW] No valid last user message content. Returning empty reply.");
      return "Maaf, Zoya tidak menerima pesan yang jelas.";
    }

    let dynamicContext = `INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.`;
    if (!db) {
        console.warn("[CS-FLOW] Firestore DB (db) is not initialized. Some context might be missing.");
        dynamicContext += " WARNING: Database tidak terhubung, info detail mungkin tidak akurat.";
    }
    console.log(`[CS-FLOW] Dynamic context built: ${dynamicContext}`);

    const historyForAI = (input.messages || [])
      .filter(msg => msg.content && msg.content.trim() !== '')
      .map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }],
    }));

    const mainPromptFromSettings = input.mainPromptString || DEFAULT_AI_SETTINGS.mainPrompt;

    const finalSystemPrompt = mainPromptFromSettings
                                .replace("{{{dynamicContext}}}", dynamicContext)
                                .replace("{{{customerMessage}}}", input.customerMessage) // Placeholder for actual customer message in prompt
                                .replace(/{{#if messages.length}}[\s\S]*?{{\/if}}/g, "") // Remove handlebars for history
                                .replace(/{{#if senderNumber}}[\s\S]*?{{\/if}}/g, "")
                                .replace(/{{#if currentDate}}[\s\S]*?{{\/if}}/g, "")
                                .replace(/{{#if tomorrowDate}}[\s\S]*?{{\/if}}/g, "");

    const messagesForAI = [
      ...historyForAI,
      { role: 'user' as const, content: [{ text: input.customerMessage }] } // User's latest message
    ];

    console.log(`[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. History Length: ${historyForAI.length}`);
    console.log(`[CS-FLOW] System Prompt being used (simplified): ${finalSystemPrompt.substring(0, 300)}...`);

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: finalSystemPrompt, // System-level instructions
        messages: messagesForAI,   // Conversation history and latest user message
        tools: [cariSizeMotorTool], // Tambahkan tool baru di sini
        toolChoice: 'auto',         // Biarkan AI yang menentukan kapan pakai tool
        config: { temperature: 0.5 },
      });

      console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));
      
      let suggestedReply = "";

      // Penanganan jika AI meminta pemanggilan tool
      // Untuk Genkit v1.x, kita cek `result.toolRequest` (properti)
      // atau `result.message.content[0].toolRequest`
      const toolRequestData = result.toolRequest || (result.message?.content?.[0]?.toolRequest);

      if (toolRequestData) {
        console.log("[CS-FLOW] AI requested a tool call:", JSON.stringify(toolRequestData, null, 2));
        let toolOutput: any = { success: false, message: "Tool tidak dikenal atau input salah." };

        if (toolRequestData.name === 'cariSizeMotor' && toolRequestData.input) {
          // Memanggil fungsi tool secara langsung (karena defineTool sudah membuat tool object)
          // Kita asumsikan cariSizeMotorTool.fn adalah fungsi yang menjalankan logika tool
          // Perlu disesuaikan jika struktur tool object berbeda
          if (typeof (cariSizeMotorTool as any).fn === 'function') {
            toolOutput = await (cariSizeMotorTool as any).fn(toolRequestData.input as CariSizeMotorInput);
          } else {
             console.error("[CS-FLOW] Tool 'cariSizeMotor' tidak memiliki fungsi 'fn' yang bisa dipanggil.");
             // Mencoba fallback ke pemanggilan tool via Genkit jika ada cara standar,
             // tapi untuk sekarang, kita anggap tool.fn ada atau logic tool inline.
             // Untuk tool yang didefinisikan dengan ai.defineTool, fungsi logikanya adalah argumen kedua.
             // Kita bisa panggil langsung fungsi implementasi tool jika kita export
             // Atau, Genkit akan handle ini secara otomatis jika toolChoice: 'auto' dan modelnya mendukung.
             // Kita coba dulu apakah Genkit 'auto' akan handle ini dan langsung memberikan text.
             // Jika tidak, dan kita dapat toolRequest, kita perlu cara untuk execute tool.
             // Untuk sekarang, kita akan return pesan dari toolOutput jika success.
             toolOutput = { success: false, message: "Struktur tool tidak sesuai untuk pemanggilan manual." };
          }
        }
        console.log("[CS-FLOW] Tool output:", JSON.stringify(toolOutput, null, 2));

        // Untuk kesederhanaan, kita langsung gunakan message dari tool jika sukses,
        // atau pesan errornya jika gagal.
        // Idealnya, output tool ini dikirim balik ke AI untuk dirangkai jadi jawaban natural.
        if (toolOutput.success) {
          suggestedReply = toolOutput.message || "Berhasil mendapatkan info, tapi pesannya kosong.";
        } else {
          suggestedReply = toolOutput.message || "Gagal memproses permintaan dengan tool.";
        }
        // Jika ingin AI yang merangkai kata:
        // const modelResponseAfterTool = await ai.generate({
        //   model: 'googleai/gemini-1.5-flash-latest',
        //   messages: [
        //     ...messagesForAI,
        //     result.message, // Pesan model sebelumnya yang berisi toolRequest
        //     { // Pesan respons dari tool
        //       role: 'tool',
        //       content: [{
        //         toolResponse: {
        //           name: toolRequestData.name,
        //           output: toolOutput,
        //         }
        //       }]
        //     }
        //   ],
        //   prompt: finalSystemPrompt,
        //   config: { temperature: 0.5 },
        // });
        // suggestedReply = modelResponseAfterTool.text || "Zoya bingung setelah pakai alat, coba lagi ya.";

      } else {
        suggestedReply = result.text || ""; // Akses teks langsung dari result
      }

      const finishReason = result.finishReason;
      const safetyRatings = result.safetyRatings;

      console.log(`[CS-FLOW] AI Finish Reason: ${finishReason}`);
      if (safetyRatings && safetyRatings.length > 0) {
        console.log('[CS-FLOW] AI Safety Ratings:', JSON.stringify(safetyRatings, null, 2));
      }

      if (!suggestedReply && finishReason !== "stop") {
        console.error(`[CS-FLOW] ❌ AI generation failed or tool handling error. Finish Reason: ${finishReason}. Safety: ${JSON.stringify(safetyRatings)}`);
        return "Maaf, Zoya lagi agak bingung nih boskuu. Coba tanya lagi dengan cara lain ya, atau hubungi CS langsung.";
      }
      return suggestedReply;

    } catch (flowError: any) {
        console.error("[CS-FLOW] ❌ Critical error dalam flow zoyaChatFlow:", flowError);
        if (flowError.cause) {
            console.error("[CS-FLOW] Error Cause:", JSON.stringify(flowError.cause, null, 2));
        }
        return `Waduh, Zoya lagi error nih, boskuu. Coba tanya lagi nanti ya. (Pesan Error: ${flowError.message || 'Kesalahan internal tidak diketahui'})`;
    }
  }
);

// Fungsi wrapper yang akan dipanggil oleh UI atau API route
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<{ suggestedReply: string }> {
  console.log("[CS-FLOW] generateWhatsAppReply input:", JSON.stringify(input, null, 2));

  let mainPromptToUse = input.mainPromptString;

  if (!mainPromptToUse) {
    try {
      if (db) {
        const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
        const docSnap = await getFirestoreDoc(settingsDocRef);
        if (docSnap.exists() && docSnap.data()?.mainPrompt) {
          mainPromptToUse = docSnap.data().mainPrompt;
          console.log("[CS-FLOW] generateWhatsAppReply: Using mainPromptString from Firestore.");
        } else {
          console.log("[CS-FLOW] generateWhatsAppReply: mainPrompt not found in Firestore or is empty. Checking default.");
          mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt;
          console.log("[CS-FLOW] generateWhatsAppReply: Using DEFAULT_AI_SETTINGS.mainPrompt.");
        }
      } else {
        console.log("[CS-FLOW] generateWhatsAppReply: Firestore (db) not available. Using DEFAULT_AI_SETTINGS.mainPrompt.");
        mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt;
      }
    } catch (error) {
      console.error("[CS-FLOW] generateWhatsAppReply: Error fetching mainPrompt from Firestore. Using default.", error);
      mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt;
    }
  } else {
     console.log("[CS-FLOW] generateWhatsAppReply: Using mainPromptString directly from input.");
  }

  const flowInput: ZoyaChatInput = {
    messages: input.messages || [],
    customerMessage: input.customerMessage,
    senderNumber: input.senderNumber,
    mainPromptString: mainPromptToUse,
    currentDate: input.currentDate,
    currentTime: input.currentTime,
    tomorrowDate: input.tomorrowDate,
    dayAfterTomorrowDate: input.dayAfterTomorrowDate,
  };

  try {
    const replyText = await zoyaChatFlow(flowInput);
    return { suggestedReply: replyText };
  } catch (error: any) {
    console.error("[CS-FLOW Wrapper] Error running zoyaChatFlow:", error);
    return { suggestedReply: `Maaf, Zoya sedang ada kendala teknis. (${error.message || 'Tidak diketahui'})` };
  }
}
