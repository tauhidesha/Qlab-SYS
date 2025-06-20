
'use server';
/**
 * @fileOverview Flow AI utama untuk WhatsApp Customer Service QLAB.
 * Sekarang menangani semua logika layanan tanpa sub-flow.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { doc, getDoc as getFirestoreDoc } from 'firebase/firestore';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';

// Import tools modular
import { cariSizeMotorTool, type CariSizeMotorInput, type CariSizeMotorOutput } from '@/ai/tools/cari-size-motor-tool';
import { getProductServiceDetailsByNameTool, type ProductLookupInput } from '@/ai/tools/productLookupTool';
import { cariInfoLayananTool, type CariInfoLayananInput, type CariInfoLayananOutput } from '@/ai/tools/cariInfoLayananTool'; // Tool untuk kategori umum
import type { ProductServiceInfo } from '@/types/aiToolSchemas';

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

// Schema output untuk wrapper function (digunakan oleh UI)
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
    console.log("[CS-FLOW] zoyaChatFlow input. Customer Message:", input.customerMessage, "History Length:", (input.messages || []).length, "KnownMotorcycleInfo:", JSON.stringify(input.knownMotorcycleInfo));

    const lastUserMessageContent = input.customerMessage ||
                                   (input.messages && input.messages.length > 0 ? input.messages[input.messages.length - 1].content : '');

    if (!lastUserMessageContent || lastUserMessageContent.trim() === '') {
      return "Maaf, Zoya tidak menerima pesan yang jelas.";
    }

    const lowerCaseCustomerMessage = lastUserMessageContent.toLowerCase();
    // Kata kunci umum untuk layanan (kategori)
    const generalServiceKeywords = ["cuci", "coating", "poles", "detailing", "repaint", "servis", "layanan", "produk", "jual"];
    let detectedGeneralServiceKeyword: string | null = null;

    for (const keyword of generalServiceKeywords) {
        if (lowerCaseCustomerMessage.includes(keyword)) {
            detectedGeneralServiceKeyword = keyword;
            // Disambiguasi sederhana
            if ((keyword === "cuci" && lowerCaseCustomerMessage.includes("cuci motor")) || (keyword === "layanan" && lowerCaseCustomerMessage.includes("layanan cuci"))) detectedGeneralServiceKeyword = "cuci";
            else if ((keyword === "coating" && lowerCaseCustomerMessage.includes("coating motor")) || (keyword === "layanan" && lowerCaseCustomerMessage.includes("layanan coating"))) detectedGeneralServiceKeyword = "coating";
            else if ((keyword === "poles" && lowerCaseCustomerMessage.includes("poles motor")) || (keyword === "layanan" && lowerCaseCustomerMessage.includes("layanan poles"))) detectedGeneralServiceKeyword = "poles";
            else if ((keyword === "detailing" && lowerCaseCustomerMessage.includes("detailing motor")) || (keyword === "layanan" && lowerCaseCustomerMessage.includes("layanan detailing"))) detectedGeneralServiceKeyword = "detailing";
            else if ((keyword === "repaint" && lowerCaseCustomerMessage.includes("repaint motor")) || (keyword === "layanan" && lowerCaseCustomerMessage.includes("layanan repaint"))) detectedGeneralServiceKeyword = "repaint";
            break;
        }
    }
    console.log("[CS-FLOW] Detected general service keyword from user message:", detectedGeneralServiceKeyword);


    // --- Logika Flow Utama Zoya (tanpa sub-flow) ---
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
                                .replace("{{{knownMotorcycleName}}}", input.knownMotorcycleInfo?.name || "belum diketahui")
                                .replace("{{{knownMotorcycleSize}}}", input.knownMotorcycleInfo?.size || "belum diketahui")
                                .replace("{{{detectedGeneralServiceKeyword}}}", detectedGeneralServiceKeyword || "tidak ada kategori spesifik terdeteksi");


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

    console.log(`[CS-FLOW] Calling MAIN ai.generate with model googleai/gemini-1.5-flash-latest. History Length: ${historyForAI.length}`);
    console.log(`[CS-FLOW] System Prompt being used (simplified): ${finalSystemPrompt.substring(0, 300)}...`);

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: finalSystemPrompt,
        messages: messagesForAI,
        tools: [cariSizeMotorTool, getProductServiceDetailsByNameTool, cariInfoLayananTool], // Semua tool tersedia untuk Zoya utama
        toolChoice: 'auto',
        config: { temperature: 0.5 },
      });

      console.log("[CS-FLOW] Raw MAIN AI generate result:", JSON.stringify(result, null, 2));

      let suggestedReply = result.text || "";
      const toolRequest = result.toolRequest;

      if (toolRequest) {
        console.log("[CS-FLOW] MAIN AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
        let finalReplyFromTool = "Maaf, Zoya lagi bingung mau pakai alat apa.";
        let toolOutputToRelay: any = "Error: Tool output tidak diset.";

        if (toolRequest.name === 'cariSizeMotor' && toolRequest.input) {
          toolOutputToRelay = await (cariSizeMotorTool.fn as Function)(toolRequest.input as CariSizeMotorInput);
        } else if (toolRequest.name === 'getProductServiceDetailsByNameTool' && toolRequest.input) {
          toolOutputToRelay = await (getProductServiceDetailsByNameTool.fn as Function)(toolRequest.input as ProductLookupInput);
        } else if (toolRequest.name === 'cariInfoLayananTool' && toolRequest.input) {
          toolOutputToRelay = await (cariInfoLayananTool.fn as Function)(toolRequest.input as CariInfoLayananInput);
        }

        if (toolOutputToRelay !== "Error: Tool output tidak diset.") {
            console.log(`[CS-FLOW] Output from tool '${toolRequest.name}':`, JSON.stringify(toolOutputToRelay, null, 2));

            const messagesAfterTool = [
                ...messagesForAI,
                result.message,
                {
                    role: 'tool' as const,
                    content: [{
                    toolResponse: {
                        name: toolRequest.name,
                        output: toolOutputToRelay,
                    }
                    }]
                }
            ];

            const modelResponseAfterTool = await ai.generate({
                model: 'googleai/gemini-1.5-flash-latest',
                prompt: finalSystemPrompt,
                messages: messagesAfterTool,
                config: { temperature: 0.5 },
                // No tools needed for the second call, as it's just processing the tool output
            });
            finalReplyFromTool = modelResponseAfterTool.text || `Zoya dapet info dari alat ${toolRequest.name}, tapi bingung mau ngomong apa.`;
        }
        return finalReplyFromTool;

      } else if (suggestedReply) {
        const finishReason = result.finishReason;
        const safetyRatings = result.safetyRatings;
        console.log(`[CS-FLOW] MAIN AI Finish Reason (no tool): ${finishReason}`);
        if (safetyRatings && safetyRatings.length > 0) {
            console.log('[CS-FLOW] MAIN AI Safety Ratings (no tool):', JSON.stringify(safetyRatings, null, 2));
        }

        if (!suggestedReply && finishReason !== "stop") {
            console.error(`[CS-FLOW] ❌ MAIN AI generation failed or no text output. Finish Reason: ${finishReason}. Safety: ${JSON.stringify(safetyRatings)}`);
            return "Maaf, Zoya lagi agak bingung nih boskuu. Coba tanya lagi dengan cara lain ya, atau hubungi CS langsung.";
        }
        return suggestedReply;
      } else {
        console.error(`[CS-FLOW] ❌ No tool request and no text output from MAIN AI. Result: ${JSON.stringify(result, null, 2)}`);
        return "Waduh, Zoya lagi nggak bisa jawab nih. Coba lagi ya.";
      }

    } catch (flowError: any) {
        console.error("[CS-FLOW] ❌ Critical error dalam MAIN zoyaChatFlow:", flowError);
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
