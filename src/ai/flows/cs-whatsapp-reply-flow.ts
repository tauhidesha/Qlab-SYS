
'use server';
/**
 * @fileOverview Flow AI utama untuk WhatsApp Customer Service QLAB.
 * Sekarang menangani semua logika layanan dan menyimpan konteks percakapan di Firestore.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { doc, getDoc as getFirestoreDoc, setDoc as setFirestoreDoc, serverTimestamp, type Timestamp } from 'firebase/firestore';
import { DEFAULT_AI_SETTINGS, DEFAULT_MAIN_PROMPT_ZOYA } from '@/types/aiSettings';

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

// --- User Session Structure (in Firestore: userAiSessions/{senderNumber}) ---
interface UserAiSession {
  userId: string;
  activeSpecificServiceInquiry?: string;
  knownMotorcycleName?: string;
  knownMotorcycleSize?: string;
  lastAiInteractionType?: 'asked_for_motor_type_for_specific_service' | 'provided_specific_service_details' | 'provided_category_service_list' | 'asked_for_service_after_motor_size' | 'general_response' | 'initial_greeting' | 'asked_for_paint_type_for_coating' | 'ready_for_booking_details';
  lastUpdatedAt: Timestamp;
  // Bisa ditambahkan field lain jika perlu, mis. lastDetectedIntent, dll.
}

// Skema input utama untuk ZoyaChatFlow (digunakan oleh UI)
const ZoyaChatInputSchema = z.object({
  messages: z.array(ChatMessageSchemaInternal).optional().describe("Riwayat percakapan lengkap, jika ada."),
  customerMessage: z.string().min(1, "Pesan pelanggan tidak boleh kosong.").describe("Pesan terbaru dari customer."),
  senderNumber: z.string().optional().describe("Nomor WhatsApp pengirim (WAJIB untuk session jika mau persisten)."), // Tetap opsional di input, tapi flow akan cek
  mainPromptString: z.string().optional().describe("String prompt utama yang mungkin dikirim dari UI atau diambil dari Firestore."),
  currentDate: z.string().optional(),
  currentTime: z.string().optional(),
  tomorrowDate: z.string().optional(),
  dayAfterTomorrowDate: z.string().optional(),
  // UI bisa mengirim ini sebagai override atau untuk sesi baru
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
  // Output ini lebih untuk UI tahu apa yang baru saja di-set/update di session Firestore
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
    let sessionDataToSave: Partial<UserAiSession> = {};

    if (!customerMessageToProcess || customerMessageToProcess.trim() === '') {
      return { suggestedReply: "Maaf, Zoya tidak menerima pesan yang jelas." };
    }
    if (!input.senderNumber) {
        console.warn("[MAIN-FLOW] WARNING: senderNumber tidak ada di input. Sesi Firestore tidak akan digunakan/disimpan. Konteks hanya dari input.");
        // Lanjutkan tanpa Firestore session jika senderNumber tidak ada, hanya mengandalkan input.
    }

    const userId = input.senderNumber || 'anonymous_user'; // Default ke anonymous jika tidak ada nomor
    const sessionDocRef = input.senderNumber ? doc(db, 'userAiSessions', userId) : null;
    let currentSession: Partial<UserAiSession> = {};

    // 1. Load Sesi dari Firestore (jika senderNumber ada)
    if (sessionDocRef) {
        try {
            const sessionSnap = await getFirestoreDoc(sessionDocRef);
            if (sessionSnap.exists()) {
                currentSession = sessionSnap.data() as UserAiSession;
                console.log(`[MAIN-FLOW] Sesi ditemukan untuk ${userId}:`, JSON.stringify(currentSession, null, 2));
            } else {
                console.log(`[MAIN-FLOW] Tidak ada sesi untuk ${userId}, sesi baru akan dibuat jika ada data untuk disimpan.`);
            }
        } catch (e) {
            console.error(`[MAIN-FLOW] Gagal memuat sesi untuk ${userId}:`, e);
            // Lanjut dengan sesi kosong jika gagal load
        }
    }

    // 2. Gabungkan Konteks dari Input UI (jika ada) dengan Sesi
    // Info dari UI (input ZoyaChatInput) lebih diutamakan jika ada, karena bisa jadi koreksi.
    let knownMotorcycleName = input.knownMotorcycleInfo?.name || currentSession.knownMotorcycleName || "belum diketahui";
    let knownMotorcycleSize = input.knownMotorcycleInfo?.size || currentSession.knownMotorcycleSize || "belum diketahui";
    let activeSpecificServiceInquiry = input.activeSpecificServiceInquiry || currentSession.activeSpecificServiceInquiry || "tidak ada";
    let lastAiInteractionType = currentSession.lastAiInteractionType || "initial_greeting";

    // Deteksi kata kunci layanan umum (kategori)
    const lowerCaseCustomerMessage = customerMessageToProcess.toLowerCase();
    const generalServiceKeywords = ["cuci", "coating", "poles", "detailing", "repaint", "servis", "layanan", "produk", "jual", "harga", "info", "katalog", "booking", "pesan tempat", "jadwal"];
    let detectedGeneralServiceKeyword: string | null = null;
    for (const keyword of generalServiceKeywords) {
        if (lowerCaseCustomerMessage.includes(keyword)) {
            detectedGeneralServiceKeyword = keyword;
            if ((keyword === "cuci" && (lowerCaseCustomerMessage.includes("cuci motor") || lowerCaseCustomerMessage.includes("nyuci"))) ) detectedGeneralServiceKeyword = "cuci";
            else if (keyword === "coating" && (lowerCaseCustomerMessage.includes("coating motor") || lowerCaseCustomerMessage.includes("laminating"))) detectedGeneralServiceKeyword = "coating";
            else if (keyword === "poles" && (lowerCaseCustomerMessage.includes("poles motor") || lowerCaseCustomerMessage.includes("poles bodi"))) detectedGeneralServiceKeyword = "poles";
            else if (keyword === "detailing" && lowerCaseCustomerMessage.includes("detailing motor")) detectedGeneralServiceKeyword = "detailing";
            else if (keyword === "repaint" && (lowerCaseCustomerMessage.includes("repaint motor") || lowerCaseCustomerMessage.includes("cat motor"))) detectedGeneralServiceKeyword = "repaint";
            else if (keyword === "booking" || keyword === "pesan tempat" || keyword === "jadwal") detectedGeneralServiceKeyword = "booking";
            break;
        }
    }
    console.log("[MAIN-FLOW] Detected general service keyword from user message:", detectedGeneralServiceKeyword);

    const mainPromptFromSettings = input.mainPromptString || DEFAULT_MAIN_PROMPT_ZOYA;

    const finalSystemPrompt = mainPromptFromSettings
                                .replace("{{{SESSION_MOTOR_NAME}}}", knownMotorcycleName)
                                .replace("{{{SESSION_MOTOR_SIZE}}}", knownMotorcycleSize)
                                .replace("{{{SESSION_ACTIVE_SERVICE}}}", activeSpecificServiceInquiry)
                                .replace("{{{SESSION_LAST_AI_INTERACTION_TYPE}}}", lastAiInteractionType)
                                .replace("{{{detectedGeneralServiceKeyword}}}", detectedGeneralServiceKeyword || "tidak ada")
                                .replace("{{{dynamicContext}}}", `INFO_UMUM_BENGKEL: QLAB Moto Detailing, Jl. Sukasenang V No.1A, Cikutra, Bandung. Buka 09:00 - 21:00 WIB. Full Detailing hanya untuk cat glossy. Coating beda harga untuk doff & glossy. Tanggal hari ini: ${input.currentDate || new Date().toLocaleDateString('id-ID')}.`);


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
    sessionDataToSave.lastAiInteractionType = 'general_response'; // Default

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: finalSystemPrompt,
        messages: messagesForAI,
        tools: [cariSizeMotorTool, getProductServiceDetailsByNameTool, cariInfoLayananTool], // Belum ada createBookingTool
        toolChoice: 'auto',
        config: { temperature: 0.3, topP: 0.9 },
      });

      console.log("[MAIN-FLOW] Raw MAIN AI generate result:", JSON.stringify(result, null, 2));
      suggestedReply = result.text || "";
      const toolRequest = result.toolRequest;

      if (toolRequest) {
        console.log("[MAIN-FLOW] MAIN AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
        let toolOutputToRelay: any = "Error: Tool output tidak diset.";
        let interactionTypeAfterTool: UserAiSession['lastAiInteractionType'] = 'general_response';
        let activeServiceAfterTool = activeSpecificServiceInquiry;


        if (toolRequest.name === 'cariSizeMotor' && toolRequest.input) {
          toolOutputToRelay = await findMotorSize(toolRequest.input as CariSizeMotorInput);
          if (toolOutputToRelay.success && toolOutputToRelay.size && toolOutputToRelay.vehicleModelFound) {
              knownMotorcycleName = toolOutputToRelay.vehicleModelFound;
              knownMotorcycleSize = toolOutputToRelay.size;
              sessionDataToSave.knownMotorcycleName = knownMotorcycleName;
              sessionDataToSave.knownMotorcycleSize = knownMotorcycleSize;
              interactionTypeAfterTool = 'asked_for_service_after_motor_size';
          }
        } else if (toolRequest.name === 'getProductServiceDetailsByNameTool' && toolRequest.input) {
          toolOutputToRelay = await findProductServiceByName(toolRequest.input as ProductLookupInput);
          if (toolOutputToRelay?.name) { 
            activeServiceAfterTool = toolOutputToRelay.name; // Simpan nama layanan yang ditemukan
            interactionTypeAfterTool = 'provided_specific_service_details';
          }
        } else if (toolRequest.name === 'cariInfoLayananTool' && toolRequest.input) {
          toolOutputToRelay = await findLayananByCategory(toolRequest.input as CariInfoLayananInput);
           if (Array.isArray(toolOutputToRelay) && toolOutputToRelay.length > 0) {
             interactionTypeAfterTool = 'provided_category_service_list';
           }
        }
        // Handle createBookingTool placeholder if needed
        // else if (toolRequest.name === 'createBookingTool' && toolRequest.input) { ... }

        sessionDataToSave.lastAiInteractionType = interactionTypeAfterTool;
        sessionDataToSave.activeSpecificServiceInquiry = activeServiceAfterTool;

        if (toolOutputToRelay !== "Error: Tool output tidak diset.") {
            console.log(`[MAIN-FLOW] Output from tool '${toolRequest.name}':`, JSON.stringify(toolOutputToRelay, null, 2));
            const messagesAfterTool = [
                ...messagesForAI,
                result.message,
                { role: 'tool' as const, content: [{ toolResponse: { name: toolRequest.name, output: toolOutputToRelay }}]}
            ];
            
            // Re-generate prompt with potentially updated session info for the second call
            const promptForSecondCall = mainPromptFromSettings
                .replace("{{{SESSION_MOTOR_NAME}}}", knownMotorcycleName)
                .replace("{{{SESSION_MOTOR_SIZE}}}", knownMotorcycleSize)
                .replace("{{{SESSION_ACTIVE_SERVICE}}}", activeServiceAfterTool) 
                .replace("{{{SESSION_LAST_AI_INTERACTION_TYPE}}}", interactionTypeAfterTool);


            const modelResponseAfterTool = await ai.generate({
                model: 'googleai/gemini-1.5-flash-latest',
                prompt: promptForSecondCall,
                messages: messagesAfterTool,
                config: { temperature: 0.3, topP: 0.9 },
                 tools: [cariSizeMotorTool, getProductServiceDetailsByNameTool, cariInfoLayananTool], // Sediakan tools lagi
                 toolChoice: 'auto',
            });
            suggestedReply = modelResponseAfterTool.text || `Zoya dapet info dari alat ${toolRequest.name}, tapi bingung mau ngomong apa.`;
            // Handle potential second tool call (e.g., asked for motor size, then service, then paint type)
            // This is a simplified version, more complex agentic behavior might need more robust state management or flow design
             if (modelResponseAfterTool.toolRequest) {
                console.warn("[MAIN-FLOW] AI requested another tool after a tool response. This is not deeply handled yet. Returning current text.");
             }
        }
      } else if (suggestedReply) {
        // Tidak ada tool request, AI langsung menjawab
        const finishReason = result.finishReason;
        console.log(`[MAIN-FLOW] MAIN AI Finish Reason (no tool): ${finishReason}`);
        if (!suggestedReply && finishReason !== "stop") {
            console.error(`[MAIN-FLOW] ❌ MAIN AI generation failed or no text output. Finish Reason: ${finishReason}.`);
            suggestedReply = "Maaf, Zoya lagi agak bingung nih boskuu. Coba tanya lagi dengan cara lain ya.";
        } else {
            // AI menjawab langsung, coba deteksi interaksi berikutnya berdasarkan jawaban AI
            const lowerReply = suggestedReply.toLowerCase();
            if (lowerReply.includes("tipe motornya apa") || lowerReply.includes("motornya apa") || lowerReply.includes("jenis motornya")) {
                sessionDataToSave.lastAiInteractionType = 'asked_for_motor_type_for_specific_service';
                // Coba ekstrak nama layanan dari pesan user JIKA AI bertanya tipe motor
                const serviceMentionedInUser = extractServiceNameFromUserMessage(customerMessageToProcess, await getAllServiceNames());
                if (serviceMentionedInUser) {
                    sessionDataToSave.activeSpecificServiceInquiry = serviceMentionedInUser;
                    activeSpecificServiceInquiry = serviceMentionedInUser; // Update for current turn
                }
            } else if (lowerReply.includes("pilihan layanan") || lowerReply.includes("daftar layanan")) {
                sessionDataToSave.lastAiInteractionType = 'provided_category_service_list';
            } else if (lowerReply.includes("harga") && (knownMotorcycleName !== "belum diketahui")) {
                sessionDataToSave.lastAiInteractionType = 'provided_specific_service_details';
            } else if (lowerReply.includes("booking") || lowerReply.includes("jadwal")) {
                 sessionDataToSave.lastAiInteractionType = 'ready_for_booking_details';
            }
            // (Tambahkan deteksi lain jika perlu)
        }
      } else {
        console.error(`[MAIN-FLOW] ❌ No tool request and no text output from MAIN AI. Result: ${JSON.stringify(result, null, 2)}`);
        suggestedReply = "Waduh, Zoya lagi nggak bisa jawab nih. Coba lagi ya.";
      }

      // 3. Simpan Sesi ke Firestore (jika senderNumber ada)
      if (sessionDocRef) {
          if (Object.keys(sessionDataToSave).length > 0 || 
              (knownMotorcycleName !== currentSession.knownMotorcycleName && knownMotorcycleName !== "belum diketahui") ||
              (knownMotorcycleSize !== currentSession.knownMotorcycleSize && knownMotorcycleSize !== "belum diketahui") ||
              (activeSpecificServiceInquiry !== currentSession.activeSpecificServiceInquiry && activeSpecificServiceInquiry !== "tidak ada") ||
              (sessionDataToSave.lastAiInteractionType !== currentSession.lastAiInteractionType && sessionDataToSave.lastAiInteractionType)
            ) {
            
            const finalSessionDataToSave: Partial<UserAiSession> = {
                userId: userId,
                knownMotorcycleName: (knownMotorcycleName !== "belum diketahui") ? knownMotorcycleName : undefined,
                knownMotorcycleSize: (knownMotorcycleSize !== "belum diketahui") ? knownMotorcycleSize : undefined,
                activeSpecificServiceInquiry: (activeSpecificServiceInquiry !== "tidak ada") ? activeSpecificServiceInquiry : undefined,
                lastAiInteractionType: sessionDataToSave.lastAiInteractionType || lastAiInteractionType,
                lastUpdatedAt: serverTimestamp() as Timestamp,
            };
            
            console.log(`[MAIN-FLOW] Menyimpan sesi untuk ${userId}:`, JSON.stringify(finalSessionDataToSave, null, 2));
            await setFirestoreDoc(sessionDocRef, finalSessionDataToSave, { merge: true });
          } else {
            console.log(`[MAIN-FLOW] Tidak ada perubahan signifikan pada sesi untuk ${userId}, tidak menyimpan.`);
          }
      }

      return {
        suggestedReply,
        sessionActiveSpecificServiceInquiry: (activeSpecificServiceInquiry !== "tidak ada") ? activeSpecificServiceInquiry : undefined,
        sessionDetectedMotorcycleInfo: (knownMotorcycleName !== "belum diketahui") ? { name: knownMotorcycleName, size: (knownMotorcycleSize !== "belum diketahui") ? knownMotorcycleSize : undefined } : undefined,
        sessionLastAiInteractionType: sessionDataToSave.lastAiInteractionType || lastAiInteractionType,
      };

    } catch (flowError: any) {
        console.error("[MAIN-FLOW] ❌ Critical error dalam MAIN zoyaChatFlow:", flowError);
        if (flowError.cause) console.error("[MAIN-FLOW] Error Cause:", JSON.stringify(flowError.cause, null, 2));
        return { suggestedReply: `Waduh, Zoya lagi error nih, boskuu. Coba tanya lagi nanti ya. (Error: ${flowError.message || 'Kesalahan internal'})` };
    }
  }
);

// Helper Functions (bisa dipindah ke utils jika banyak)
async function getAllServiceNames(): Promise<string[]> {
    try {
      const items = await findLayananByCategory({ keyword: "" }); // Mencoba ambil semua
      if (Array.isArray(items)) {
        return items.map(i => i.name).filter(Boolean);
      }
      return [];
    } catch (e) {
      console.error("Error in getAllServiceNames:", e);
      return [];
    }
}

function extractServiceNameFromUserMessage(userMessage: string, serviceNames: string[]): string | undefined {
    const lowerUserMessage = userMessage.toLowerCase();
    // Prioritaskan match yang lebih panjang dulu untuk menghindari partial match yang salah
    const sortedServiceNames = [...serviceNames].sort((a,b) => b.length - a.length);
    for (const serviceName of sortedServiceNames) {
        if (serviceName && lowerUserMessage.includes(serviceName.toLowerCase())) {
            return serviceName;
        }
    }
    return undefined;
}

// Wrapper function yang akan dipanggil oleh UI atau API route
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<WhatsAppReplyOutput> {
  console.log("[MAIN-FLOW Wrapper] generateWhatsAppReply input:", JSON.stringify(input, null, 2));

  let mainPromptToUse = input.mainPromptString;

  if (!mainPromptToUse && db && input.senderNumber) { // Hanya coba fetch dari Firestore jika db ada dan senderNumber ada
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
     console.log("[MAIN-FLOW Wrapper]: Using DEFAULT_MAIN_PROMPT_ZOYA (db or senderNumber not available for Firestore fetch, or prompt already provided).");
  } else {
     console.log("[MAIN-FLOW Wrapper]: Using mainPromptString directly from input.");
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
    console.error("[MAIN-FLOW Wrapper] Error running zoyaChatFlow:", error);
    return { suggestedReply: `Maaf, Zoya sedang ada kendala teknis. (${error.message || 'Tidak diketahui'})` };
  }
}

    