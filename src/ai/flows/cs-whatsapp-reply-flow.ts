
'use server';
/**
 * @fileOverview Flow AI utama untuk WhatsApp Customer Service QLAB.
 * Menggunakan tools modular dan bisa mendelegasikan ke sub-flow.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod'; // Tetap butuh z untuk schema internal
import { db } from '@/lib/firebase';
import { doc, getDoc as getFirestoreDoc } from 'firebase/firestore';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';

// Import tools modular (non 'use server' files)
import { cariSizeMotorTool, type CariSizeMotorInput, type CariSizeMotorOutput } from '@/ai/tools/cari-size-motor-tool';
// cariInfoLayananTool TIDAK diimpor di sini, karena akan di-"intercept"

// Import sub-flow dan tipenya
import { handleServiceInquiry, type HandleServiceInquiryInput, type HandleServiceInquiryOutput } from './handle-service-inquiry-flow';

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
  senderNumber: z.string().optional().describe("Nomor WhatsApp pengirim (opsional)."),
  mainPromptString: z.string().optional().describe("String prompt utama yang mungkin dikirim dari UI atau diambil dari Firestore."),
  currentDate: z.string().optional(),
  currentTime: z.string().optional(),
  tomorrowDate: z.string().optional(),
  dayAfterTomorrowDate: z.string().optional(),
  knownMotorcycleInfo: z.object({
    name: z.string(),
    size: z.string().optional(),
  }).optional().describe("Informasi motor pelanggan jika sudah diketahui dari interaksi sebelumnya atau database."),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>;

// Skema output untuk wrapper function (digunakan oleh UI)
const WhatsAppReplyOutputSchema = z.object({
  suggestedReply: z.string().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.'),
});
export type WhatsAppReplyOutput = z.infer<typeof WhatsAppReplyOutputSchema>;


// Flow utama
const zoyaChatFlow = ai.defineFlow(
  {
    name: 'zoyaChatFlow',
    inputSchema: ZoyaChatInputSchema, 
    outputSchema: z.string(), // Output flow adalah string balasan
  },
  async (input: ZoyaChatInput): Promise<string> => {
    console.log("[CS-FLOW] zoyaChatFlow input. Customer Message:", input.customerMessage, "History Length:", (input.messages || []).length);

    const lastUserMessageContent = input.customerMessage || 
                                   (input.messages && input.messages.length > 0 ? input.messages[input.messages.length - 1].content : '');

    if (!lastUserMessageContent || lastUserMessageContent.trim() === '') {
      return "Maaf, Zoya tidak menerima pesan yang jelas.";
    }
    
    let dynamicContext = `INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.`;
    if (!db) {
        console.warn("[CS-FLOW] Firestore DB (db) is not initialized. Some context might be missing.");
        dynamicContext += " WARNING: Database tidak terhubung, info detail mungkin tidak akurat.";
    } else {
        console.log("[CS-FLOW] Firestore DB (db) is available. Context should be complete.");
    }
    
    const mainPromptFromSettings = input.mainPromptString || DEFAULT_AI_SETTINGS.mainPrompt;

    const finalSystemPrompt = mainPromptFromSettings
                                .replace("{{{dynamicContext}}}", dynamicContext)
                                .replace("{{{customerMessage}}}", input.customerMessage) // Ini mungkin tidak perlu jika pesan pelanggan sudah ada di messagesForAI
                                .replace("{{{knownMotorcycleName}}}", input.knownMotorcycleInfo?.name || "belum diketahui")
                                .replace("{{{knownMotorcycleSize}}}", input.knownMotorcycleInfo?.size || "belum diketahui");


    const historyForAI = (input.messages || [])
      .filter(msg => msg.content && msg.content.trim() !== '') 
      .map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }], 
    }));
    
    // Gabungkan history dengan pesan customer terbaru
    const messagesForAI = [
      ...historyForAI,
      { role: 'user' as const, content: [{ text: input.customerMessage }] } 
    ];

    console.log(`[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. History Length: ${historyForAI.length}`);
    console.log(`[CS-FLOW] System Prompt being used (simplified): ${finalSystemPrompt.substring(0, 300)}...`);

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: finalSystemPrompt, 
        messages: messagesForAI,
        tools: [cariSizeMotorTool], // Hanya tool cariSizeMotor yang benar-benar di-provide ke LLM utama
        toolChoice: 'auto', 
        config: { temperature: 0.5 }, // Sesuaikan temperatur jika perlu
      });

      console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));
      
      let suggestedReply = result.text || ""; // Balasan teks jika AI tidak minta tool
      const toolRequest = result.toolRequest; // Akses sebagai properti

      if (toolRequest) {
        console.log("[CS-FLOW] AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
        let finalReplyFromToolOrSubFlow = "Maaf, Zoya lagi bingung mau pakai alat apa.";

        if (toolRequest.name === 'cariSizeMotor' && toolRequest.input) {
          const sizeOutput: CariSizeMotorOutput = await (cariSizeMotorTool.fn as Function)(toolRequest.input as CariSizeMotorInput);
          
          // Kirim kembali hasil tool ini ke AI untuk dirangkai jadi jawaban natural
          const modelResponseAfterSizeTool = await ai.generate({
            model: 'googleai/gemini-1.5-flash-latest',
            prompt: finalSystemPrompt, // Gunakan prompt sistem yang sama
            messages: [ // Bangun history baru untuk panggilan ini
              ...messagesForAI, // Sertakan history dan pesan user awal
              result.message,   // Ini adalah pesan dari AI yang meminta pemanggilan tool
              {                 // Ini adalah pesan "tool response" yang berisi hasil dari tool
                role: 'tool',
                content: [{
                  toolResponse: {
                    name: toolRequest.name,
                    output: sizeOutput,
                  }
                }]
              }
            ],
            config: { temperature: 0.5 },
          });
          finalReplyFromToolOrSubFlow = modelResponseAfterSizeTool.text || "Zoya dapet ukuran motornya, tapi bingung mau ngomong apa.";
        
        } else if (toolRequest.name === 'cariInfoLayanan' && toolRequest.input) {
          // Ini adalah "intercept" point. AI di flow utama minta 'cariInfoLayananTool'.
          // Kita panggil sub-flow handleServiceInquiry sebagai gantinya.
          // Input untuk tool `cariInfoLayanan` yang diminta AI HANYA `{ keyword: string }`
          const serviceInquiryKeyword = (toolRequest.input as { keyword: string }).keyword;
          console.log(`[CS-FLOW] Intercepting 'cariInfoLayanan' tool request from main AI. Keyword: ${serviceInquiryKeyword}. Calling sub-flow 'handleServiceInquiry'.`);

          const subFlowInput: HandleServiceInquiryInput = {
            serviceKeyword: serviceInquiryKeyword,
            customerQuery: input.customerMessage, // Pesan asli pelanggan
            knownMotorcycleInfo: input.knownMotorcycleInfo,
          };
          const subFlowOutput: HandleServiceInquiryOutput = await handleServiceInquiry(subFlowInput);
          finalReplyFromToolOrSubFlow = subFlowOutput.responseText;
          // Di sini, kita langsung pakai output sub-flow sebagai jawaban akhir.
        }
        // ... (logika untuk tool lain jika ada di flow utama)
        return finalReplyFromToolOrSubFlow; // Kembalikan hasil dari tool/sub-flow
      
      } else if (suggestedReply) {
         // Jika tidak ada tool request, gunakan balasan teks langsung dari AI
        const finishReason = result.finishReason;
        const safetyRatings = result.safetyRatings; 
        console.log(`[CS-FLOW] AI Finish Reason (no tool): ${finishReason}`);
        if (safetyRatings && safetyRatings.length > 0) {
            console.log('[CS-FLOW] AI Safety Ratings (no tool):', JSON.stringify(safetyRatings, null, 2));
        }

        if (!suggestedReply && finishReason !== "stop") {
            console.error(`[CS-FLOW] ❌ AI generation failed or no text output. Finish Reason: ${finishReason}. Safety: ${JSON.stringify(safetyRatings)}`);
            return "Maaf, Zoya lagi agak bingung nih boskuu. Coba tanya lagi dengan cara lain ya, atau hubungi CS langsung.";
        }
        return suggestedReply;
      } else {
        // Fallback jika tidak ada tool request dan tidak ada suggestedReply
        console.error(`[CS-FLOW] ❌ No tool request and no text output from AI. Result: ${JSON.stringify(result, null, 2)}`);
        return "Waduh, Zoya lagi nggak bisa jawab nih. Coba lagi ya.";
      }

    } catch (flowError: any) {
        console.error("[CS-FLOW] ❌ Critical error dalam flow zoyaChatFlow:", flowError);
        if (flowError.cause) console.error("[CS-FLOW] Error Cause:", JSON.stringify(flowError.cause, null, 2));
        return `Waduh, Zoya lagi error nih, boskuu. Coba tanya lagi nanti ya. (Pesan Error: ${flowError.message || 'Kesalahan internal tidak diketahui'})`;
    }
  }
);

// Wrapper function yang akan dipanggil oleh UI atau API route
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<WhatsAppReplyOutput> {
  console.log("[CS-FLOW] generateWhatsAppReply (wrapper) input:", JSON.stringify(input, null, 2));

  let mainPromptToUse = input.mainPromptString;

  if (!mainPromptToUse) {
    try {
      if (db) {
        const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
        const docSnap = await getFirestoreDoc(settingsDocRef);
        if (docSnap.exists() && docSnap.data()?.mainPrompt) {
          mainPromptToUse = docSnap.data().mainPrompt;
          console.log("[CS-FLOW] generateWhatsAppReply (wrapper): Using mainPromptString from Firestore.");
        } else {
          console.log("[CS-FLOW] generateWhatsAppReply (wrapper): mainPrompt not found in Firestore or is empty. Checking default.");
          mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt;
          console.log("[CS-FLOW] generateWhatsAppReply (wrapper): Using DEFAULT_AI_SETTINGS.mainPrompt.");
        }
      } else { 
        console.log("[CS-FLOW] generateWhatsAppReply (wrapper): Firestore (db) not available. Using default for mainPrompt.");
        mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt;
      }
    } catch (error) {
      console.error("[CS-FLOW] generateWhatsAppReply (wrapper): Error fetching mainPrompt from Firestore. Using default.", error);
      mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt;
    }
  } else {
     console.log("[CS-FLOW] generateWhatsAppReply (wrapper): Using mainPromptString directly from input.");
  }

  const flowInput: ZoyaChatInput = {
    ...input, 
    messages: input.messages || [], 
    mainPromptString: mainPromptToUse, 
  };

  try {
    const replyText = await zoyaChatFlow(flowInput);
    return { suggestedReply: replyText };
  } catch (error: any) {
    console.error("[CS-FLOW Wrapper] Error running zoyaChatFlow:", error);
    return { suggestedReply: `Maaf, Zoya sedang ada kendala teknis. (${error.message || 'Tidak diketahui'})` };
  }
}
