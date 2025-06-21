
'use server';
/**
 * @fileOverview Flow AI utama untuk WhatsApp Customer Service QLAB.
 * Sekarang menangani semua logika layanan dan menyimpan konteks percakapan di Firestore.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { doc, getDoc as getFirestoreDoc, setDoc as setFirestoreDoc, serverTimestamp, type Timestamp } from 'firebase/firestore';
import { DEFAULT_MAIN_PROMPT_ZOYA } from '@/types/aiSettings';
import { format, addDays, parse as parseDateFns } from 'date-fns'; // Import date-fns

import { getProductServiceDetailsByNameTool } from '@/ai/tools/productLookupTool';
import { createBookingTool } from '@/ai/tools/createBookingTool';
import { knowledgeBaseRetrieverTool } from '@/ai/tools/knowledgeBaseRetrieverTool';

// Skema internal untuk validasi input chat history di flow
const ChatMessageSchemaInternal = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchemaInternal>;


// Skema input utama untuk ZoyaChatFlow (digunakan oleh UI)
const ZoyaChatInputSchema = z.object({
  messages: z.array(ChatMessageSchemaInternal).optional().describe("Riwayat percakapan lengkap, jika ada."),
  customerMessage: z.string().min(1, "Pesan pelanggan tidak boleh kosong.").describe("Pesan terbaru dari customer."),
  senderNumber: z.string().optional().describe("Nomor WhatsApp pengirim (WAJIB untuk session jika mau persisten)."),
  mainPromptString: z.string().optional().describe("String prompt utama yang mungkin dikirim dari UI atau diambil dari Firestore."),
  // Tanggal-tanggal ini akan diisi oleh wrapper function
  currentDate: z.string().optional(),
  currentTime: z.string().optional(),
  tomorrowDate: z.string().optional(),
  dayAfterTomorrowDate: z.string().optional(),
  // Input dari UI untuk override/seed sesi. Sesi Firestore akan jadi sumber utama jika ada.
  knownMotorcycleInfo: z.object({
    name: z.string(),
    size: z.string().optional(),
  }).optional().describe("Informasi motor pelanggan jika sudah diketahui dari interaksi sebelumnya atau database."),
  activeSpecificServiceInquiry: z.string().optional().describe("Layanan spesifik yang sedang aktif ditanyakan jika Zoya sebelumnya bertanya tipe motor untuk layanan ini."),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>;

// Schema output untuk wrapper function (digunakan oleh UI)
const WhatsAppReplyOutputSchema = z.object({
  suggestedReply: z.string().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.'),
  sessionActiveSpecificServiceInquiry: z.string().optional(),
  sessionDetectedMotorcycleInfo: z.object({ name: z.string(), size: z.string().optional() }).optional(),
  sessionLastAiInteractionType: z.string().optional(),
});
export type WhatsAppReplyOutput = z.infer<typeof WhatsAppReplyOutputSchema>;


// Flow utama
const zoyaChatFlow = ai.defineFlow(
  {
    name: 'zoyaChatFlow',
    inputSchema: ZoyaChatInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: ZoyaChatInput): Promise<WhatsAppReplyOutput> => {
    console.log("[MAIN-FLOW] zoyaChatFlow input:", JSON.stringify(input, null, 2));

    let customerMessageToProcess = input.customerMessage;
    let suggestedReply = "Maaf, Zoya lagi bingung nih.";
    
    if (!customerMessageToProcess || customerMessageToProcess.trim() === '') {
      return { suggestedReply: "Maaf, Zoya tidak menerima pesan yang jelas." };
    }
    
    const finalSystemPrompt = input.mainPromptString || DEFAULT_MAIN_PROMPT_ZOYA;

    const historyForAI = (input.messages || [])
      .filter(msg => msg.content && msg.content.trim() !== '')
      .map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }],
    }));

    const messagesForAI = [
      ...historyForAI,
      { role: 'user' as const, content: [{ text: customerMessageToProcess }] }
    ];

    console.log(`[MAIN-FLOW] Calling MAIN ai.generate. History Length: ${historyForAI.length}. Prompt snippet: ${finalSystemPrompt.substring(0, 300)}...`);
    
    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: finalSystemPrompt,
        messages: messagesForAI,
        tools: [knowledgeBaseRetrieverTool, getProductServiceDetailsByNameTool, createBookingTool],
        toolChoice: 'auto',
        config: {
            temperature: 0.5,
            topP: 0.9,
        },
      });

      suggestedReply = result.text || `Maaf, Zoya tidak bisa memberikan jawaban saat ini. (Finish Reason: ${result.finishReason})`;
      console.log(`[MAIN-FLOW] Final response text: "${suggestedReply}"`);

      // We are simplifying the session management logic for now to rely on the RAG approach.
      // The AI's statefulness is now primarily in the conversation history, not complex session flags.
      return {
        suggestedReply,
      };

    } catch (flowError: any) {
        console.error("[MAIN-FLOW] ❌ Critical error dalam MAIN zoyaChatFlow:", flowError);
        if (flowError.cause) console.error("[MAIN-FLOW] Error Cause:", JSON.stringify(flowError.cause, null, 2));
        return { suggestedReply: `Waduh, Zoya lagi error nih, boskuu. Coba tanya lagi nanti ya. (Error: ${flowError.message || 'Kesalahan internal'})` };
    }
  }
);


export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<WhatsAppReplyOutput> {
  console.log("[MAIN-FLOW Wrapper] generateWhatsAppReply input:", JSON.stringify(input, null, 2));

  let mainPromptToUse = input.mainPromptString;

  if (!mainPromptToUse && db) {
    try {
        const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
        const docSnap = await getFirestoreDoc(settingsDocRef);
        if (docSnap.exists() && docSnap.data()?.mainPrompt) {
          mainPromptToUse = docSnap.data().mainPrompt;
          console.log("[MAIN-FLOW Wrapper]: Using mainPromptString from Firestore.");
        } else {
          mainPromptToUse = DEFAULT_MAIN_PROMPT_ZOYA;
          console.log("[MAIN-FLOW Wrapper]: Using DEFAULT_MAIN_PROMPT_ZOYA (Firestore doc not found or no mainPrompt).");
        }
    } catch (error) {
      console.error("[MAIN-FLOW Wrapper]: Error fetching mainPrompt from Firestore. Using default.", error);
      mainPromptToUse = DEFAULT_MAIN_PROMPT_ZOYA;
    }
  } else if (!mainPromptToUse) {
     mainPromptToUse = DEFAULT_MAIN_PROMPT_ZOYA;
     console.log("[MAIN-FLOW Wrapper]: Using DEFAULT_MAIN_PROMPT_ZOYA (db not available or prompt already provided).");
  } else {
     console.log("[MAIN-FLOW Wrapper]: Using mainPromptString directly from input.");
  }

  const today = new Date();
  const flowInput: ZoyaChatInput = {
    ...input,
    messages: input.messages || [],
    mainPromptString: mainPromptToUse,
    currentDate: format(today, 'yyyy-MM-dd'),
    currentTime: format(today, 'HH:mm'),
    tomorrowDate: format(addDays(today, 1), 'yyyy-MM-dd'),
    dayAfterTomorrowDate: format(addDays(today, 2), 'yyyy-MM-dd'),
  };

  try {
    const result = await zoyaChatFlow(flowInput);
    return result;
  } catch (error: any) {
    console.error("[MAIN-FLOW Wrapper] Error running zoyaChatFlow:", error);
    return { suggestedReply: `Maaf, Zoya sedang ada kendala teknis. (${error.message || 'Tidak diketahui'})` };
  }
}
