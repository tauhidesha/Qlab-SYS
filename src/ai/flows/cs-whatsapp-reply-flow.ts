
'use server';
/**
 * @fileOverview Flow AI untuk WhatsApp Customer Service QLAB.
 * Versi ini SANGAT disederhanakan, fokus pada pemanggilan model dasar TANPA tools.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, where, getDocs, Timestamp, doc, getDoc as getFirestoreDoc, limit } from 'firebase/firestore';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';

// Skema internal untuk validasi input chat history di flow
const ChatMessageSchemaInternal = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(), // Konten adalah string tunggal
});
export type ChatMessage = z.infer<typeof ChatMessageSchemaInternal>;


// Skema input untuk ZoyaChatFlow - Disederhanakan
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


// Flow utama Zoya - Sekarang tanpa tools
const zoyaChatFlow = ai.defineFlow(
  {
    name: 'zoyaChatFlow',
    inputSchema: ZoyaChatInputSchema,
    outputSchema: ZoyaChatOutputSchema,
  },
  async (input) => {
    const lastUserMessageContent = input.customerMessage || 
                                   (input.messages && input.messages.length > 0 ? input.messages[input.messages.length - 1].content : '');

    if (!lastUserMessageContent || lastUserMessageContent.trim() === '') {
      console.warn("[CS-FLOW] No valid last user message content. Returning empty reply.");
      return "Maaf, Zoya tidak menerima pesan yang jelas.";
    }
    
    let dynamicContext = `INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.`;
    if (!db) {
        console.warn("[CS-FLOW] Firestore DB (db) is not initialized. Some context might be missing.");
        dynamicContext += " WARNING: Database tidak terhubung, info harga detail mungkin tidak akurat.";
    } else {
        // Contoh sederhana deteksi entitas dari Firestore (jika diperlukan di masa depan)
        try {
            const vehicleTypesRef = collection(db, 'vehicleTypes');
            const qVehicle = firestoreQuery(vehicleTypesRef, where("model_lowercase", "==", "vario"), limit(1)); // Contoh saja
            const vehicleSnap = await getDocs(qVehicle);
            if (!vehicleSnap.empty) {
                dynamicContext += ` Info tambahan: Motor Vario terdeteksi.`;
            }
        } catch(e) {
            console.warn("[CS-FLOW] Error fetching example dynamic context from Firestore", e);
        }
    }
    console.log(`[CS-FLOW] Dynamic context built: ${dynamicContext}`);

    // Persiapkan riwayat pesan untuk AI
    // Genkit v1.x mengharapkan `content` berupa array of Part, [{text: "..."}]
    const historyForAI = (input.messages || [])
      .filter(msg => msg.content && msg.content.trim() !== '')
      .map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }], 
    }));
    
    const mainPromptFromSettings = input.mainPromptString || DEFAULT_AI_SETTINGS.mainPrompt;

    // Gabungkan system instruction dengan dynamic context dan placeholder lain
    const finalSystemPrompt = mainPromptFromSettings
                                .replace("{{{dynamicContext}}}", dynamicContext)
                                .replace("{{{customerMessage}}}", "") // customerMessage akan jadi pesan user terpisah
                                .replace(/{{#if messages.length}}[\s\S]*?{{\/if}}/g, "") 
                                .replace(/{{#if senderNumber}}[\s\S]*?{{\/if}}/g, "")
                                .replace(/{{#if currentDate}}[\s\S]*?{{\/if}}/g, "")
                                .replace(/{{#if tomorrowDate}}[\s\S]*?{{\/if}}/g, "");
    
    // Pesan yang akan dikirim ke model AI
    // Gabungkan historyForAI dengan pesan user terakhir
    const messagesForAI = [
      ...historyForAI,
      { role: 'user' as const, content: [{ text: lastUserMessageContent }] }
    ];
    
    console.log(`[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. History Length: ${historyForAI.length}`);
    console.log(`[CS-FLOW] System Prompt being used (simplified): ${finalSystemPrompt.substring(0, 200)}...`);

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: finalSystemPrompt, // System-level instructions
        messages: messagesForAI,   // Conversation history and latest user message
        config: { temperature: 0.5 },
        // Tidak ada tools atau toolChoice
      });

      console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));
      
      // Perbaikan: Gunakan result.text (properti) bukan result.text() (fungsi)
      const suggestedReply = result.text || ""; 
      const finishReason = result.finishReason;
      const safetyRatings = result.safetyRatings;

      console.log(`[CS-FLOW] AI Finish Reason: ${finishReason}`);
      if (safetyRatings && safetyRatings.length > 0) {
        console.log('[CS-FLOW] AI Safety Ratings:', JSON.stringify(safetyRatings, null, 2));
      }
      
      if (!suggestedReply) {
        if (finishReason !== "stop" && finishReason !== "STOP") { 
          console.error(`[CS-FLOW] ❌ AI generation failed. Finish Reason: ${finishReason}. Safety: ${JSON.stringify(safetyRatings)}`);
        } else {
          console.warn(`[CS-FLOW] ⚠️ AI returned an empty reply, but finishReason was '${finishReason}'. This might indicate an issue or unexpected model behavior. Safety Ratings: ${JSON.stringify(safetyRatings)}`);
        }
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
          mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt; // Pastikan DEFAULT_AI_SETTINGS diimpor dengan benar
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
    messages: input.messages || [], // Pastikan messages selalu array
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

// Export ZoyaChatInputSchema jika perlu untuk validasi di API route
// export { ZoyaChatInputSchema };
// Tidak perlu export ZoyaChatOutputSchema karena flow mengembalikan string langsung
