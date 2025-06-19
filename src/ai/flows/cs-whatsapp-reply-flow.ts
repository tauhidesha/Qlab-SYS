
'use server';
/**
 * @fileOverview AI flow for WhatsApp customer service replies.
 * - whatsAppReplyFlowSimplified - Main flow for generating WhatsApp replies.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { extractMotorInfoTool } from '@/ai/tools/extractMotorInfoTool';
import { searchServiceByKeywordTool } from '@/ai/tools/searchServiceByKeywordTool';
import { createBookingTool } from '@/ai/tools/createBookingTool';
import type { WhatsAppReplyInput, WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema } from '@/types/ai/cs-whatsapp-reply';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';


/**
 * Define prompt untuk Zoya dengan tool yang diperlukan
 */
const replyPromptSimplified = ai.definePrompt({
  name: 'whatsAppReplyPromptSimplified',
  input: { schema: WhatsAppReplyInputSchema }, // Skema input sekarang termasuk mainPromptString
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [extractMotorInfoTool, searchServiceByKeywordTool, createBookingTool],
  prompt: async (input: WhatsAppReplyInput): Promise<string> => {
    if (!input.mainPromptString || input.mainPromptString.trim() === "") {
      console.warn("[CS-FLOW] mainPromptString from input is empty or missing. Using emergency fallback prompt.");
      // Emergency fallback jika mainPromptString yang dilempar ke flow kosong
      return "Anda adalah Customer Service AI. Tolong jawab pertanyaan pengguna: {{{customerMessage}}}";
    }
    console.log("[CS-FLOW] Using mainPromptString for Handlebars template (length):", input.mainPromptString.length);
    // console.log("[CS-FLOW] Full mainPromptString for Handlebars:", input.mainPromptString); // Uncomment for full prompt logging if needed
    return input.mainPromptString; // String prompt dari settings digunakan di sini
  },
});

/**
 * Flow utama untuk digunakan di API/function/genkit handler
 */
export const whatsAppReplyFlowSimplified = ai.defineFlow(
  {
    name: 'whatsAppReplyFlowSimplified',
    inputSchema: WhatsAppReplyInputSchema, // Skema input Flow juga perlu konsisten
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput): Promise<WhatsAppReplyOutput> => {
    try { 
      console.log("[CS-FLOW] whatsAppReplyFlowSimplified input (sudah termasuk prompt dari settings):", JSON.stringify({ ...input, mainPromptString: `Prompt Length: ${input.mainPromptString?.length || 0}` }, null, 2));
      
      try { 
        const { output } = await replyPromptSimplified(input); // Langsung pass input
        if (!output || !output.suggestedReply) { 
          console.error('[CS-FLOW] ❌ Gagal mendapatkan balasan dari AI atau output tidak sesuai skema (output atau suggestedReply null/undefined). Mengembalikan default.');
          return { suggestedReply: "Maaf, Zoya lagi bingung nih. Bisa diulang pertanyaannya atau coba beberapa saat lagi?" };
        }
        console.log("[CS-FLOW] whatsAppReplyFlowSimplified output dari prompt:", output);
        return output;
      } catch (aiError: any) { 
        console.error('[CS-FLOW] ❌ Error saat menjalankan prompt AI atau memproses outputnya:', aiError);
        let finalErrorMessage = "Maaf, ada sedikit gangguan teknis di sistem Zoya.";
        if (aiError instanceof Error && aiError.message) {
            finalErrorMessage = `Duh, Zoya lagi ada kendala nih: ${aiError.message.substring(0, 80)}... Coba lagi ya.`;
        } else if (typeof aiError === 'string') {
            finalErrorMessage = `Duh, Zoya lagi ada kendala: ${aiError.substring(0, 80)}... Coba lagi ya.`;
        }
        return { suggestedReply: finalErrorMessage };
      }
    } catch (flowError: any) { 
        console.error('[CS-FLOW] ❌ Critical error dalam flow whatsAppReplyFlowSimplified:', flowError);
        return { suggestedReply: "Waduh, sistem Zoya lagi ada kendala besar nih. Mohon coba beberapa saat lagi ya." };
    }
  }
);

export async function generateWhatsAppReply(input: Omit<WhatsAppReplyInput, 'mainPromptString'>): Promise<WhatsAppReplyOutput> {
  let promptFromSettings = ""; // Initialize as empty string

  try {
    const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
    const settingsSnap = await getDoc(settingsDocRef);
    if (settingsSnap.exists() && settingsSnap.data()?.mainPrompt && settingsSnap.data()?.mainPrompt.trim() !== "") {
      promptFromSettings = settingsSnap.data()?.mainPrompt;
      console.log("[CS-FLOW] Berhasil memuat prompt utama dari Firestore.");
    } else {
      console.warn("[CS-FLOW] Gagal memuat prompt utama dari Firestore atau field mainPrompt kosong/tidak ada. Mencoba fallback ke default.");
      // Fallback ke DEFAULT_AI_SETTINGS.mainPrompt jika Firestore gagal atau kosong
      if (DEFAULT_AI_SETTINGS.mainPrompt && DEFAULT_AI_SETTINGS.mainPrompt.trim() !== "") {
        promptFromSettings = DEFAULT_AI_SETTINGS.mainPrompt;
        console.log("[CS-FLOW] Menggunakan prompt default dari DEFAULT_AI_SETTINGS.");
      } else {
        console.error("[CS-FLOW] KRITIS: Prompt utama dari Firestore KOSONG DAN prompt default juga KOSONG. Menggunakan fallback minimal darurat.");
        promptFromSettings = "Anda adalah asisten AI. Tolong jawab pertanyaan pengguna: {{{customerMessage}}}"; // Darurat fallback
      }
    }
  } catch (error) {
    console.error("[CS-FLOW] Error saat mengambil prompt utama dari Firestore:", error);
    console.warn("[CS-FLOW] Menggunakan prompt default karena gagal fetch atau prompt Firestore kosong.");
    if (DEFAULT_AI_SETTINGS.mainPrompt && DEFAULT_AI_SETTINGS.mainPrompt.trim() !== "") {
        promptFromSettings = DEFAULT_AI_SETTINGS.mainPrompt;
        console.log("[CS-FLOW] Menggunakan prompt default dari DEFAULT_AI_SETTINGS setelah error fetch.");
    } else {
        console.error("[CS-FLOW] KRITIS: Gagal fetch Firestore DAN prompt default juga KOSONG. Menggunakan fallback minimal darurat.");
        promptFromSettings = "Anda adalah asisten AI. Tolong jawab pertanyaan pengguna: {{{customerMessage}}}"; // Darurat fallback
    }
  }

  if (!promptFromSettings || promptFromSettings.trim() === "") {
      console.error("[CS-FLOW] KRITIS FINAL CHECK: Prompt utama tetap kosong setelah semua fallback. Ini tidak seharusnya terjadi. Menggunakan fallback minimal darurat terakhir.");
      promptFromSettings = "Anda adalah asisten AI. Tolong jawab pertanyaan pengguna: {{{customerMessage}}}"; // Darurat fallback paling akhir
  }
  
  const flowInput: WhatsAppReplyInput = {
    ...input,
    mainPromptString: promptFromSettings, // Tambahkan prompt yang diambil
    customerMessage: input.customerMessage,
    senderNumber: input.senderNumber, 
    chatHistory: input.chatHistory || [],
    currentDate: input.currentDate || new Date().toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    currentTime: input.currentTime || new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
    tomorrowDate: input.tomorrowDate || new Date(Date.now() + 86400000).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    dayAfterTomorrowDate: input.dayAfterTomorrowDate || new Date(Date.now() + 2 * 86400000).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    agentBehavior: input.agentBehavior || DEFAULT_AI_SETTINGS.agentBehavior, 
    knowledgeBase: input.knowledgeBase || DEFAULT_AI_SETTINGS.knowledgeBaseDescription, 
  };
  return whatsAppReplyFlowSimplified(flowInput);
}
