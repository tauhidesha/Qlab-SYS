
'use server';
/**
 * @fileOverview Flow AI utama untuk WhatsApp Customer Service QLAB.
 * Sekarang menangani semua logika layanan tanpa sub-flow.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { doc, getDoc as getFirestoreDoc } from 'firebase/firestore';
import { DEFAULT_AI_SETTINGS, DEFAULT_MAIN_PROMPT_ZOYA } from '@/types/aiSettings';

// Import tools modular
import { cariSizeMotorTool, type CariSizeMotorInput, type CariSizeMotorOutput, findMotorSize } from '@/ai/tools/cari-size-motor-tool';
import { getProductServiceDetailsByNameTool, type ProductLookupInput, findProductServiceByName } from '@/ai/tools/productLookupTool';
import { cariInfoLayananTool, type CariInfoLayananInput, type CariInfoLayananOutput, findLayananByCategory } from '@/ai/tools/cariInfoLayananTool';
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
  activeSpecificServiceInquiry: z.string().optional().describe("Layanan spesifik yang sedang aktif ditanyakan (mis. 'Cuci Premium') jika Zoya sebelumnya bertanya tipe motor untuk layanan ini."),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>;

// Schema output untuk wrapper function (digunakan oleh UI)
const WhatsAppReplyOutputSchema = z.object({
  suggestedReply: z.string().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.'),
  activeSpecificServiceInquiry: z.string().optional().describe("Jika AI bertanya tipe motor untuk layanan spesifik, layanan itu akan ada di sini."),
  detectedMotorcycleInfo: z.object({ name: z.string(), size: z.string().optional() }).optional().describe("Info motor yang terdeteksi atau diperbarui."),
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
    console.log("[CS-FLOW] zoyaChatFlow input:", JSON.stringify(input, null, 2));

    let customerMessageToProcess = input.customerMessage;
    let currentKnownMotorcycleInfo = input.knownMotorcycleInfo;
    let currentActiveSpecificServiceInquiry = input.activeSpecificServiceInquiry;
    let suggestedReply = "Maaf, Zoya lagi bingung nih.";

    if (!customerMessageToProcess || customerMessageToProcess.trim() === '') {
      return { suggestedReply: "Maaf, Zoya tidak menerima pesan yang jelas." };
    }

    const lowerCaseCustomerMessage = customerMessageToProcess.toLowerCase();
    
    // Deteksi kata kunci layanan umum (kategori)
    const generalServiceKeywords = ["cuci", "coating", "poles", "detailing", "repaint", "servis", "layanan", "produk", "jual", "harga", "info", "katalog"];
    let detectedGeneralServiceKeyword: string | null = null;
    for (const keyword of generalServiceKeywords) {
        if (lowerCaseCustomerMessage.includes(keyword)) {
            detectedGeneralServiceKeyword = keyword;
            if ((keyword === "cuci" && (lowerCaseCustomerMessage.includes("cuci motor") || lowerCaseCustomerMessage.includes("nyuci"))) ) detectedGeneralServiceKeyword = "cuci";
            else if (keyword === "coating" && (lowerCaseCustomerMessage.includes("coating motor") || lowerCaseCustomerMessage.includes("laminating"))) detectedGeneralServiceKeyword = "coating";
            else if (keyword === "poles" && (lowerCaseCustomerMessage.includes("poles motor") || lowerCaseCustomerMessage.includes("poles bodi"))) detectedGeneralServiceKeyword = "poles";
            else if (keyword === "detailing" && lowerCaseCustomerMessage.includes("detailing motor")) detectedGeneralServiceKeyword = "detailing";
            else if (keyword === "repaint" && (lowerCaseCustomerMessage.includes("repaint motor") || lowerCaseCustomerMessage.includes("cat motor"))) detectedGeneralServiceKeyword = "repaint";
            break;
        }
    }
    console.log("[CS-FLOW] Detected general service keyword from user message:", detectedGeneralServiceKeyword);

    const mainPromptFromSettings = input.mainPromptString || DEFAULT_MAIN_PROMPT_ZOYA;

    const finalSystemPrompt = mainPromptFromSettings
                                .replace("{{{dynamicContext}}}", `INFO_UMUM_BENGKEL: QLAB Moto Detailing, Jl. Sukasenang V No.1A, Cikutra, Bandung. Buka 09:00 - 21:00 WIB. Full Detailing hanya untuk cat glossy. Coating beda harga untuk doff & glossy. Tanggal hari ini: ${input.currentDate || new Date().toLocaleDateString('id-ID')}.`)
                                .replace("{{{knownMotorcycleName}}}", currentKnownMotorcycleInfo?.name || "belum diketahui")
                                .replace("{{{knownMotorcycleSize}}}", currentKnownMotorcycleInfo?.size || "belum diketahui")
                                .replace("{{{detectedGeneralServiceKeyword}}}", detectedGeneralServiceKeyword || "tidak ada kategori spesifik terdeteksi")
                                .replace("{{{activeSpecificServiceInquiry}}}", currentActiveSpecificServiceInquiry || "tidak ada");


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

    console.log(`[CS-FLOW] Calling MAIN ai.generate. History Length: ${historyForAI.length}. Prompt snippet: ${finalSystemPrompt.substring(0, 300)}...`);

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: finalSystemPrompt,
        messages: messagesForAI,
        tools: [cariSizeMotorTool, getProductServiceDetailsByNameTool, cariInfoLayananTool],
        toolChoice: 'auto',
        config: { temperature: 0.3, topP: 0.9 },
      });

      console.log("[CS-FLOW] Raw MAIN AI generate result:", JSON.stringify(result, null, 2));

      suggestedReply = result.text || "";
      const toolRequest = result.toolRequest;
      let nextActiveSpecificServiceInquiry: string | undefined = undefined;
      let updatedMotorcycleInfo = currentKnownMotorcycleInfo;

      if (toolRequest) {
        console.log("[CS-FLOW] MAIN AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
        let toolOutputToRelay: any = "Error: Tool output tidak diset.";

        if (toolRequest.name === 'cariSizeMotor' && toolRequest.input) {
          toolOutputToRelay = await findMotorSize(toolRequest.input as CariSizeMotorInput);
          if (toolOutputToRelay.success && toolOutputToRelay.size && toolOutputToRelay.vehicleModelFound) {
              updatedMotorcycleInfo = { name: toolOutputToRelay.vehicleModelFound, size: toolOutputToRelay.size };
          }
        } else if (toolRequest.name === 'getProductServiceDetailsByNameTool' && toolRequest.input) {
          toolOutputToRelay = await findProductServiceByName(toolRequest.input as ProductLookupInput);
          // Jika tool ini dipanggil, kemungkinan AI bertanya tipe motor untuk layanan ini.
          // Kita set activeSpecificServiceInquiry jika motor belum diketahui.
          if (!currentKnownMotorcycleInfo?.name && (toolRequest.input as ProductLookupInput).productName) {
             nextActiveSpecificServiceInquiry = (toolRequest.input as ProductLookupInput).productName;
          }

        } else if (toolRequest.name === 'cariInfoLayananTool' && toolRequest.input) {
          toolOutputToRelay = await findLayananByCategory(toolRequest.input as CariInfoLayananInput);
        }

        if (toolOutputToRelay !== "Error: Tool output tidak diset.") {
            console.log(`[CS-FLOW] Output from tool '${toolRequest.name}':`, JSON.stringify(toolOutputToRelay, null, 2));

            const messagesAfterTool = [
                ...messagesForAI,
                result.message, // Pesan dari AI yang berisi permintaan tool
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
            
            // Update prompt dengan info motor jika baru didapat dari cariSizeMotorTool
            const promptForSecondCall = finalSystemPrompt
                .replace("{{{knownMotorcycleName}}}", updatedMotorcycleInfo?.name || "belum diketahui")
                .replace("{{{knownMotorcycleSize}}}", updatedMotorcycleInfo?.size || "belum diketahui");


            const modelResponseAfterTool = await ai.generate({
                model: 'googleai/gemini-1.5-flash-latest',
                prompt: promptForSecondCall,
                messages: messagesAfterTool,
                config: { temperature: 0.3, topP: 0.9 },
                // Di panggilan kedua, AI seharusnya tidak perlu tool lagi.
            });
            suggestedReply = modelResponseAfterTool.text || `Zoya dapet info dari alat ${toolRequest.name}, tapi bingung mau ngomong apa.`;
            
            // Cek apakah AI di panggilan kedua bertanya tipe motor
            // Ini kurang ideal, idealnya AI langsung jawab spesifik. Tapi sebagai fallback.
            if (!updatedMotorcycleInfo?.name && suggestedReply.toLowerCase().includes("motornya tipe apa")) {
                const specificServiceMentionedInAIReply = extractSpecificServiceFromAIReply(suggestedReply, toolOutputToRelay);
                if (specificServiceMentionedInAIReply) {
                    nextActiveSpecificServiceInquiry = specificServiceMentionedInAIReply;
                }
            }

        }
      } else if (suggestedReply) {
        // Tidak ada tool request, AI langsung menjawab
        const finishReason = result.finishReason;
        console.log(`[CS-FLOW] MAIN AI Finish Reason (no tool): ${finishReason}`);
        if (!suggestedReply && finishReason !== "stop") {
            console.error(`[CS-FLOW] ❌ MAIN AI generation failed or no text output. Finish Reason: ${finishReason}.`);
            suggestedReply = "Maaf, Zoya lagi agak bingung nih boskuu. Coba tanya lagi dengan cara lain ya.";
        }
        // Cek apakah AI bertanya tipe motor di sini
        if (!currentKnownMotorcycleInfo?.name && suggestedReply.toLowerCase().includes("motornya tipe apa")) {
            // Mencoba ekstrak nama layanan spesifik dari pesan user atau konteks sebelumnya.
            // Ini adalah bagian yang perlu diperhalus, untuk sekarang kita coba dari currentActiveSpecificServiceInquiry
            // atau dari pesan user terakhir jika mengandung nama layanan yang dikenal.
            const specificServiceMentioned = currentActiveSpecificServiceInquiry || extractServiceNameFromUserMessage(customerMessageToProcess, await getAllServiceNames());
            if (specificServiceMentioned) {
                nextActiveSpecificServiceInquiry = specificServiceMentioned;
            }
        }
      } else {
        console.error(`[CS-FLOW] ❌ No tool request and no text output from MAIN AI. Result: ${JSON.stringify(result, null, 2)}`);
        suggestedReply = "Waduh, Zoya lagi nggak bisa jawab nih. Coba lagi ya.";
      }

      return { suggestedReply, activeSpecificServiceInquiry: nextActiveSpecificServiceInquiry, detectedMotorcycleInfo: updatedMotorcycleInfo };

    } catch (flowError: any) {
        console.error("[CS-FLOW] ❌ Critical error dalam MAIN zoyaChatFlow:", flowError);
        if (flowError.cause) console.error("[CS-FLOW] Error Cause:", JSON.stringify(flowError.cause, null, 2));
        return { suggestedReply: `Waduh, Zoya lagi error nih, boskuu. Coba tanya lagi nanti ya. (Error: ${flowError.message || 'Kesalahan internal'})` };
    }
  }
);

// Helper sederhana untuk mencoba ekstrak nama layanan dari pesan AI jika AI bertanya tipe motor
function extractSpecificServiceFromAIReply(aiReply: string, toolOutput: any): string | undefined {
    // Jika tool output adalah detail layanan tunggal (dari getProductServiceDetailsByNameTool)
    if (toolOutput && typeof toolOutput === 'object' && toolOutput.name && typeof toolOutput.name === 'string') {
        if (aiReply.toLowerCase().includes("motornya tipe apa") && aiReply.toLowerCase().includes(toolOutput.name.toLowerCase().substring(0,5))) { // Cocokkan sebagian nama layanan
            return toolOutput.name;
        }
    }
    // Jika tool output adalah array layanan (dari cariInfoLayananTool) dan AI bertanya tipe motor,
    // kita tidak bisa tahu layanan spesifik mana yang user minati hanya dari sini.
    // Mungkin perlu analisa lebih lanjut atau biarkan kosong.
    return undefined;
}
async function getAllServiceNames(): Promise<string[]> {
    // Fungsi ini akan mengambil semua nama layanan dari Firestore untuk pencocokan.
    // Implementasi di-skip untuk keringkasan, asumsikan ini mengembalikan array nama layanan.
    // Contoh: ['Cuci Premium', 'Coating Nano Ceramic', 'Ganti Oli Shell']
    const items = await findLayananByCategory({ keyword: "" }); // Hack untuk dapat semua, atau query langsung
    return items.map(i => i.name);
}

function extractServiceNameFromUserMessage(userMessage: string, serviceNames: string[]): string | undefined {
    const lowerUserMessage = userMessage.toLowerCase();
    for (const serviceName of serviceNames) {
        if (lowerUserMessage.includes(serviceName.toLowerCase())) {
            return serviceName;
        }
    }
    return undefined;
}

// Wrapper function yang akan dipanggil oleh UI atau API route
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<WhatsAppReplyOutput> {
  console.log("[CS-FLOW Wrapper] generateWhatsAppReply input:", JSON.stringify(input, null, 2));

  let mainPromptToUse = input.mainPromptString;

  if (!mainPromptToUse) {
    try {
      if (db) {
        const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
        const docSnap = await getFirestoreDoc(settingsDocRef);
        if (docSnap.exists() && docSnap.data()?.mainPrompt) {
          mainPromptToUse = docSnap.data().mainPrompt;
          console.log("[CS-FLOW Wrapper]: Using mainPromptString from Firestore.");
        } else {
          mainPromptToUse = DEFAULT_MAIN_PROMPT_ZOYA;
          console.log("[CS-FLOW Wrapper]: Using DEFAULT_MAIN_PROMPT_ZOYA.");
        }
      } else {
        mainPromptToUse = DEFAULT_MAIN_PROMPT_ZOYA;
        console.log("[CS-FLOW Wrapper]: Firestore (db) not available. Using default for mainPrompt.");
      }
    } catch (error) {
      console.error("[CS-FLOW Wrapper]: Error fetching mainPrompt from Firestore. Using default.", error);
      mainPromptToUse = DEFAULT_MAIN_PROMPT_ZOYA;
    }
  } else {
     console.log("[CS-FLOW Wrapper]: Using mainPromptString directly from input.");
  }

  const flowInput: ZoyaChatInput = {
    ...input,
    messages: input.messages || [],
    mainPromptString: mainPromptToUse,
  };

  try {
    const result = await zoyaChatFlow(flowInput);
    return result;
  } catch (error: any) {
    console.error("[CS-FLOW Wrapper] Error running zoyaChatFlow:", error);
    return { suggestedReply: `Maaf, Zoya sedang ada kendala teknis. (${error.message || 'Tidak diketahui'})` };
  }
}
