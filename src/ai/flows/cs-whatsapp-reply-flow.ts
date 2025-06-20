'use server';
/**
 * @fileOverview Flow AI utama untuk WhatsApp Customer Service QLAB.
 * Menggunakan tools modular dan bisa mendelegasikan ke sub-flow.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { doc, getDoc as getFirestoreDoc } from 'firebase/firestore';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';

// Import tools modular
import { cariSizeMotorTool, type CariSizeMotorInput, type CariSizeMotorOutput } from '@/ai/tools/cari-size-motor-tool';
import { cariInfoLayananTool, type CariInfoLayananInput, type CariInfoLayananOutput } from '@/ai/tools/cariInfoLayananTool';

// Import sub-flow dan tipenya
import { handleServiceInquiry, HandleServiceInquiryInputSchema, HandleServiceInquiryOutputSchema, type HandleServiceInquiryInput, type HandleServiceInquiryOutput } from './handle-service-inquiry-flow';

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
  // Tambahkan field untuk info motor yang sudah diketahui jika ada
  knownMotorcycleInfo: z.object({
    name: z.string(),
    size: z.string().optional(),
  }).optional().describe("Informasi motor pelanggan jika sudah diketahui dari interaksi sebelumnya atau database."),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>; // Diexport untuk UI

// Skema output untuk wrapper function (digunakan oleh UI)
const WhatsAppReplyOutputSchema = z.object({
  suggestedReply: z.string().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.'),
});
export type WhatsAppReplyOutput = z.infer<typeof WhatsAppReplyOutputSchema>; // Diexport untuk UI

// Tool untuk mendelegasikan ke sub-flow handleServiceInquiry
const delegateServiceInquiryToSpecialistTool = ai.defineTool(
  {
    name: 'delegateServiceInquiryToSpecialist',
    description: 'Gunakan tool ini jika pelanggan bertanya tentang jenis layanan secara umum (misalnya, "coating itu apa?", "apa saja layanan detailing?", "info cuci dong"). Tool ini akan membantu menjelaskan layanan tersebut, mencari paket yang relevan, dan menanyakan detail motor jika diperlukan.',
    inputSchema: HandleServiceInquiryInputSchema, // Menggunakan input schema dari sub-flow
    outputSchema: HandleServiceInquiryOutputSchema, // Menggunakan output schema dari sub-flow
  },
  async (input: HandleServiceInquiryInput) => {
    console.log("[MainFlowTool:delegateServiceInquiry] Delegating to handleServiceInquiry sub-flow with input:", input);
    return handleServiceInquiry(input); // Memanggil sub-flow
  }
);


// Flow utama
const zoyaChatFlow = ai.defineFlow(
  {
    name: 'zoyaChatFlow',
    inputSchema: ZoyaChatInputSchema, // Menggunakan skema input yang diperbarui
    outputSchema: z.string(), 
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
    }
    
    const mainPromptFromSettings = input.mainPromptString || DEFAULT_AI_SETTINGS.mainPrompt;
    const finalSystemPrompt = mainPromptFromSettings
                                .replace("{{{dynamicContext}}}", dynamicContext)
                                .replace("{{{customerMessage}}}", input.customerMessage) // Ini akan digantikan oleh pesan user di array `messages`
                                .replace("{{{knownMotorcycleName}}}", input.knownMotorcycleInfo?.name || "belum diketahui")
                                .replace("{{{knownMotorcycleSize}}}", input.knownMotorcycleInfo?.size || "belum diketahui");


    const historyForAI = (input.messages || [])
      .filter(msg => msg.content && msg.content.trim() !== '')
      .map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }],
    }));
    
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
        tools: [cariSizeMotorTool, cariInfoLayananTool, delegateServiceInquiryToSpecialistTool], // Tools tersedia untuk AI
        toolChoice: 'auto',
        config: { temperature: 0.5 },
      });

      console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));
      
      let suggestedReply = result.text || "";
      const toolRequest = result.toolRequest;

      if (toolRequest) {
        console.log("[CS-FLOW] AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
        let toolOutputContent: any = "Tool tidak dikenal atau input salah.";
        let toolUsedSuccessfully = false;

        if (toolRequest.name === 'cariSizeMotor' && toolRequest.input) {
          const sizeOutput = await (cariSizeMotorTool.fn as Function)(toolRequest.input as CariSizeMotorInput);
          toolOutputContent = sizeOutput;
          toolUsedSuccessfully = true;
        } else if (toolRequest.name === 'cariInfoLayanan' && toolRequest.input) {
          const layananOutput = await (cariInfoLayananTool.fn as Function)(toolRequest.input as CariInfoLayananInput);
          toolOutputContent = layananOutput;
          toolUsedSuccessfully = true;
        } else if (toolRequest.name === 'delegateServiceInquiryToSpecialist' && toolRequest.input) {
          const subFlowOutput = await (delegateServiceInquiryToSpecialistTool.fn as Function)(toolRequest.input as HandleServiceInquiryInput);
          toolOutputContent = subFlowOutput; // Sub-flow's output is the tool's output
          // Jika sub-flow mengembalikan responseText, kita mungkin mau langsung pakai itu
          if (subFlowOutput && typeof subFlowOutput.responseText === 'string') {
            suggestedReply = subFlowOutput.responseText; // Langsung gunakan balasan dari sub-flow
            console.log("[CS-FLOW] Sub-flow returned responseText, using it directly:", suggestedReply);
            return suggestedReply; // Langsung return, tidak perlu panggil AI lagi untuk merangkai kata
          }
          toolUsedSuccessfully = true;
        }

        if (toolUsedSuccessfully && !(toolRequest.name === 'delegateServiceInquiryToSpecialist' && toolOutputContent?.responseText)) {
          console.log(`[CS-FLOW] Tool ${toolRequest.name} output:`, JSON.stringify(toolOutputContent, null, 2));
          // Panggil AI lagi dengan hasil tool
          const modelResponseAfterTool = await ai.generate({
            model: 'googleai/gemini-1.5-flash-latest',
            prompt: finalSystemPrompt, // Bisa juga prompt yang lebih spesifik untuk merangkai hasil tool
            messages: [ 
              ...messagesForAI, 
              result.message,  // Pesan AI sebelumnya (yang meminta tool)
              { 
                role: 'tool',
                content: [{
                  toolResponse: {
                    name: toolRequest.name,
                    output: toolOutputContent, 
                  }
                }]
              }
            ],
            config: { temperature: 0.5 },
          });
          suggestedReply = modelResponseAfterTool.text || "Zoya bingung setelah pakai alat, coba lagi ya.";
        } else if (!suggestedReply) {
          suggestedReply = "Maaf, Zoya tidak berhasil memproses permintaan alatnya atau tool tidak dikenal.";
        }
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
        if (flowError.cause) console.error("[CS-FLOW] Error Cause:", JSON.stringify(flowError.cause, null, 2));
        return `Waduh, Zoya lagi error nih, boskuu. Coba tanya lagi nanti ya. (Pesan Error: ${flowError.message || 'Kesalahan internal tidak diketahui'})`;
    }
  }
);

// Wrapper function yang akan dipanggil oleh UI atau API route
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<WhatsAppReplyOutput> {
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
        console.log("[CS-FLOW] generateWhatsAppReply: Firestore (db) not available. Using default for mainPrompt.");
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
    ...input, // Teruskan semua properti input asli, termasuk knownMotorcycleInfo jika ada
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
