
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

import { cariSizeMotorTool, type CariSizeMotorInput, findMotorSize } from '@/ai/tools/cari-size-motor-tool';
import { getProductServiceDetailsByNameTool, type ProductLookupInput, findProductServiceByName } from '@/ai/tools/productLookupTool';
// Mengimpor tool object 'cariInfoLayananTool' DAN fungsi 'findLayananByCategory'
import { cariInfoLayananTool, findLayananByCategory, type CariInfoLayananInput, type CariInfoLayananOutput } from '@/ai/tools/cariInfoLayananTool';
import { createBookingTool, type CreateBookingToolInput } from '@/ai/tools/createBookingTool';
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
  activeSpecificServiceInquiry?: string; // Nama layanan yang sedang aktif ditanyakan/dibahas
  activeSpecificServiceId?: string;    // ID layanan yang sedang aktif
  knownMotorcycleName?: string;
  knownMotorcycleSize?: string;
  // Untuk booking
  pendingBookingDate?: string; // YYYY-MM-DD
  pendingBookingTime?: string; // HH:MM
  lastAiInteractionType?:
    | 'asked_for_motor_type_for_specific_service'
    | 'provided_specific_service_details'
    | 'provided_category_service_list'
    | 'asked_for_service_after_motor_size'
    | 'general_response'
    | 'initial_greeting'
    | 'asked_for_paint_type_for_coating'
    | 'ready_for_booking_details' // User mengindikasikan mau booking
    | 'waiting_for_booking_datetime' // AI sudah tanya tanggal & jam
    | 'waiting_for_booking_notes' // AI sudah tanya catatan
    | 'booking_attempted'; // AI sudah panggil tool createBookingTool
  lastUpdatedAt: Timestamp;
}

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
    let sessionDataToSave: Partial<UserAiSession> = {};
    let dynamicContextFromPreToolCall = "";

    if (!customerMessageToProcess || customerMessageToProcess.trim() === '') {
      return { suggestedReply: "Maaf, Zoya tidak menerima pesan yang jelas." };
    }
    if (!input.senderNumber) {
        console.warn("[MAIN-FLOW] WARNING: senderNumber tidak ada di input. Sesi Firestore tidak akan digunakan/disimpan. Konteks hanya dari input.");
    }

    const userId = input.senderNumber || 'anonymous_user';
    const sessionDocRef = input.senderNumber ? doc(db, 'userAiSessions', userId) : null;
    let currentSession: Partial<UserAiSession> = {};

    if (sessionDocRef) {
        try {
            const sessionSnap = await getFirestoreDoc(sessionDocRef);
            if (sessionSnap.exists()) {
                currentSession = sessionSnap.data() as UserAiSession;
                console.log(`[MAIN-FLOW] Sesi ditemukan untuk ${userId}:`, JSON.stringify(currentSession, null, 2));
            }
        } catch (e) {
            console.error(`[MAIN-FLOW] Gagal memuat sesi untuk ${userId}:`, e);
        }
    }

    let knownMotorcycleName = input.knownMotorcycleInfo?.name || currentSession.knownMotorcycleName || "belum diketahui";
    let knownMotorcycleSize = input.knownMotorcycleInfo?.size || currentSession.knownMotorcycleSize || "belum diketahui";
    let activeSpecificServiceInquiry = input.activeSpecificServiceInquiry || currentSession.activeSpecificServiceInquiry || "tidak ada";
    let activeSpecificServiceId = currentSession.activeSpecificServiceId || "tidak ada";
    let lastAiInteractionType = currentSession.lastAiInteractionType || "initial_greeting";
    let pendingBookingDate = currentSession.pendingBookingDate;
    let pendingBookingTime = currentSession.pendingBookingTime;


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

    if (detectedGeneralServiceKeyword && lastAiInteractionType !== 'asked_for_motor_type_for_specific_service' && lastAiInteractionType !== 'asked_for_paint_type_for_coating' && !lowerCaseCustomerMessage.includes("booking") && !lowerCaseCustomerMessage.includes("pesan tempat") && !lowerCaseCustomerMessage.includes("jadwal")) {
        console.log(`[MAIN-FLOW] Melakukan pre-call findLayananByCategory (fungsi) untuk keyword: "${detectedGeneralServiceKeyword}"`);
        const layananByCategoryResult: CariInfoLayananOutput = await findLayananByCategory({ keyword: detectedGeneralServiceKeyword });
        if (layananByCategoryResult && layananByCategoryResult.length > 0) {
            dynamicContextFromPreToolCall = `Informasi layanan untuk kategori '${detectedGeneralServiceKeyword}' dari sistem:\n`;
            layananByCategoryResult.forEach(item => {
                dynamicContextFromPreToolCall += `- ${item.name}: ${item.description || 'Tidak ada deskripsi.'} (Harga dasar: Rp ${item.price.toLocaleString('id-ID')}, Estimasi: ${item.estimatedDuration || 'N/A'})\n`;
                if (item.variants && item.variants.length > 0) {
                    dynamicContextFromPreToolCall += `  Varian: ${item.variants.map(v => `${v.name} (Rp ${v.price.toLocaleString('id-ID')})`).join(', ')}\n`;
                }
            });
            console.log("[MAIN-FLOW] Pre-call findLayananByCategory berhasil, data dimasukkan ke dynamicContext.");
        } else {
            dynamicContextFromPreToolCall = `Informasi layanan untuk kategori '${detectedGeneralServiceKeyword}' dari sistem: Tidak ditemukan.`;
            console.log("[MAIN-FLOW] Pre-call findLayananByCategory tidak menemukan data.");
        }
    }


    // --- Logika untuk memproses tanggal & jam booking dari pesan user ---
    if (lastAiInteractionType === 'waiting_for_booking_datetime' && customerMessageToProcess) {
        let parsedDate: string | undefined;
        let parsedTime: string | undefined;

        const today = new Date();
        const tomorrow = addDays(today, 1);
        const dayAfterTomorrow = addDays(today, 2);

        if (lowerCaseCustomerMessage.includes("besok")) {
            parsedDate = format(tomorrow, 'yyyy-MM-dd');
        } else if (lowerCaseCustomerMessage.includes("lusa")) {
            parsedDate = format(dayAfterTomorrow, 'yyyy-MM-dd');
        } else if (lowerCaseCustomerMessage.includes("hari ini")) {
            parsedDate = format(today, 'yyyy-MM-dd');
        }
        
        const timeMatch = customerMessageToProcess.match(/(\d{1,2})[:.](\d{2})/);
        if (timeMatch) {
            parsedTime = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
        } else {
            const jamXMatch = lowerCaseCustomerMessage.match(/jam\s*(\d{1,2})\s*(pagi|siang|sore|malam)?/);
            if (jamXMatch) {
                let hour = parseInt(jamXMatch[1], 10);
                const period = jamXMatch[2];
                if (period === 'siang' && hour < 12) hour += 12; 
                else if (period === 'sore' && hour < 12) hour += 12; 
                else if (period === 'malam' && hour < 12) hour += 12; 
                if (hour >= 0 && hour <= 23) {
                    parsedTime = `${String(hour).padStart(2, '0')}:00`;
                }
            }
        }

        if (parsedDate && parsedTime) {
            sessionDataToSave.pendingBookingDate = parsedDate;
            sessionDataToSave.pendingBookingTime = parsedTime;
            pendingBookingDate = parsedDate; 
            pendingBookingTime = parsedTime; 
            console.log(`[MAIN-FLOW] Booking date/time parsed: ${parsedDate} ${parsedTime}`);
        } else {
            console.log("[MAIN-FLOW] Gagal parse booking date/time dari user message.");
        }
    }


    const mainPromptFromSettings = input.mainPromptString || DEFAULT_MAIN_PROMPT_ZOYA;

    const finalSystemPrompt = mainPromptFromSettings
                                .replace("{{{SESSION_MOTOR_NAME}}}", knownMotorcycleName)
                                .replace("{{{SESSION_MOTOR_SIZE}}}", knownMotorcycleSize)
                                .replace("{{{SESSION_ACTIVE_SERVICE}}}", activeSpecificServiceInquiry)
                                .replace("{{{SESSION_ACTIVE_SERVICE_ID}}}", activeSpecificServiceId)
                                .replace("{{{SESSION_LAST_AI_INTERACTION_TYPE}}}", lastAiInteractionType)
                                .replace("{{{detectedGeneralServiceKeyword}}}", detectedGeneralServiceKeyword || "tidak ada")
                                .replace("{{{dynamicContext}}}", dynamicContextFromPreToolCall || `INFO_UMUM_BENGKEL: QLAB Moto Detailing, Jl. Sukasenang V No.1A, Cikutra, Bandung. Buka 09:00 - 21:00 WIB. Full Detailing hanya untuk cat glossy. Coating beda harga untuk doff & glossy.`)
                                .replace("{{{currentDate}}}", input.currentDate || "tidak diketahui")
                                .replace("{{{tomorrowDate}}}", input.tomorrowDate || "tidak diketahui")
                                .replace("{{{dayAfterTomorrowDate}}}", input.dayAfterTomorrowDate || "tidak diketahui")
                                .replace("{{{senderNumber}}}", userId)
                                .replace("{{{pendingBookingDate}}}", pendingBookingDate || "belum ada")
                                .replace("{{{pendingBookingTime}}}", pendingBookingTime || "belum ada")
                                ;


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
    sessionDataToSave.lastAiInteractionType = 'general_response';

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: finalSystemPrompt,
        messages: messagesForAI,
        tools: [cariSizeMotorTool, getProductServiceDetailsByNameTool, cariInfoLayananTool, createBookingTool],
        toolChoice: 'auto',
        config: {
            temperature: 0.6,
            topP: 0.9,
        },
      });

      console.log("[MAIN-FLOW] Raw MAIN AI generate result:", JSON.stringify(result, null, 2));
      suggestedReply = result.text || "";
      const toolRequest = result.toolRequest;

      let interactionTypeAfterTool: UserAiSession['lastAiInteractionType'] = sessionDataToSave.lastAiInteractionType as UserAiSession['lastAiInteractionType'];
      let activeServiceAfterTool = activeSpecificServiceInquiry;
      let activeServiceIdAfterTool = activeSpecificServiceId;

      if (toolRequest) {
        console.log("[MAIN-FLOW] MAIN AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
        let toolOutputToRelay: any = "Error: Tool output tidak diset.";

        if (toolRequest.name === 'cariSizeMotor' && toolRequest.input) {
          toolOutputToRelay = await findMotorSize(toolRequest.input as CariSizeMotorInput);
          if (toolOutputToRelay.success && toolOutputToRelay.size && toolOutputToRelay.vehicleModelFound) {
              knownMotorcycleName = toolOutputToRelay.vehicleModelFound;
              knownMotorcycleSize = toolOutputToRelay.size;
              sessionDataToSave.knownMotorcycleName = knownMotorcycleName;
              sessionDataToSave.knownMotorcycleSize = knownMotorcycleSize;
              if (lastAiInteractionType === 'asked_for_motor_type_for_specific_service') {
                  interactionTypeAfterTool = 'provided_specific_service_details'; 
              } else {
                  interactionTypeAfterTool = 'asked_for_service_after_motor_size';
              }
          } else {
              interactionTypeAfterTool = 'asked_for_motor_type_for_specific_service';
          }
        } else if (toolRequest.name === 'getProductServiceDetailsByNameTool' && toolRequest.input) {
          toolOutputToRelay = await findProductServiceByName(toolRequest.input as ProductLookupInput);
          if (toolOutputToRelay?.name && toolOutputToRelay?.id) {
            activeServiceAfterTool = toolOutputToRelay.name;
            activeServiceIdAfterTool = toolOutputToRelay.id;
            interactionTypeAfterTool = 'provided_specific_service_details';
            sessionDataToSave.activeSpecificServiceInquiry = activeServiceAfterTool;
            sessionDataToSave.activeSpecificServiceId = activeServiceIdAfterTool;
          }
        } else if (toolRequest.name === 'findLayananByCategory' && toolRequest.input) {
          toolOutputToRelay = await findLayananByCategory(toolRequest.input as CariInfoLayananInput);
           if (Array.isArray(toolOutputToRelay) && toolOutputToRelay.length > 0) {
             interactionTypeAfterTool = 'provided_category_service_list';
           }
        } else if (toolRequest.name === 'createBookingTool' && toolRequest.input) {
            const bookingInput = toolRequest.input as CreateBookingToolInput;
            if (!bookingInput.serviceId && activeServiceIdAfterTool && activeServiceIdAfterTool !== "tidak ada") {
                bookingInput.serviceId = activeServiceIdAfterTool;
                bookingInput.serviceName = activeServiceAfterTool;
            }
            if (!bookingInput.customerPhone && userId !== 'anonymous_user') {
                bookingInput.customerPhone = userId;
            }
            if (!bookingInput.customerName || bookingInput.customerName.toLowerCase().includes("pelanggan whatsapp")) {
                bookingInput.customerName = knownMotorcycleName !== "belum diketahui" ? `Pelanggan ${knownMotorcycleName}` : `Pelanggan WhatsApp`;
            }


            toolOutputToRelay = await createBookingTool.fn!(bookingInput);
            interactionTypeAfterTool = 'booking_attempted';
            if ((toolOutputToRelay as any).success) {
                sessionDataToSave.activeSpecificServiceInquiry = undefined;
                sessionDataToSave.activeSpecificServiceId = undefined;
                sessionDataToSave.pendingBookingDate = undefined;
                sessionDataToSave.pendingBookingTime = undefined;
            }
        }

        sessionDataToSave.lastAiInteractionType = interactionTypeAfterTool;

        if (toolOutputToRelay !== "Error: Tool output tidak diset.") {
            console.log(`[MAIN-FLOW] Output from tool '${toolRequest.name}':`, JSON.stringify(toolOutputToRelay, null, 2));
            const messagesAfterTool = [
                ...messagesForAI,
                result.message,
                { role: 'tool' as const, content: [{ toolResponse: { name: toolRequest.name, output: toolOutputToRelay }}]}
            ];

            const promptForSecondCall = mainPromptFromSettings
                .replace("{{{SESSION_MOTOR_NAME}}}", knownMotorcycleName)
                .replace("{{{SESSION_MOTOR_SIZE}}}", knownMotorcycleSize)
                .replace("{{{SESSION_ACTIVE_SERVICE}}}", activeServiceAfterTool)
                .replace("{{{SESSION_ACTIVE_SERVICE_ID}}}", activeServiceIdAfterTool)
                .replace("{{{SESSION_LAST_AI_INTERACTION_TYPE}}}", interactionTypeAfterTool)
                .replace("{{{dynamicContext}}}", dynamicContextFromPreToolCall || "Tidak ada info tambahan dari sistem.")
                .replace("{{{currentDate}}}", input.currentDate || "tidak diketahui")
                .replace("{{{tomorrowDate}}}", input.tomorrowDate || "tidak diketahui")
                .replace("{{{dayAfterTomorrowDate}}}", input.dayAfterTomorrowDate || "tidak diketahui")
                .replace("{{{senderNumber}}}", userId)
                .replace("{{{pendingBookingDate}}}", sessionDataToSave.pendingBookingDate || pendingBookingDate || "belum ada")
                .replace("{{{pendingBookingTime}}}", sessionDataToSave.pendingBookingTime || pendingBookingTime || "belum ada");


            const modelResponseAfterTool = await ai.generate({
                model: 'googleai/gemini-1.5-flash-latest',
                prompt: promptForSecondCall,
                messages: messagesAfterTool,
                config: {
                    temperature: 0.6,
                    topP: 0.9,
                },
                 tools: [cariSizeMotorTool, getProductServiceDetailsByNameTool, cariInfoLayananTool, createBookingTool],
                 toolChoice: 'auto',
            });
            suggestedReply = modelResponseAfterTool.text || `Zoya dapet info dari alat ${toolRequest.name}, tapi bingung mau ngomong apa.`;
             if (modelResponseAfterTool.toolRequest) {
                console.warn("[MAIN-FLOW] AI requested another tool after a tool response. This is not deeply handled yet. Returning current text.");
             }
             const lowerFinalReply = suggestedReply.toLowerCase();
              if (lowerFinalReply.includes("tanggal") && lowerFinalReply.includes("jam") && (interactionTypeAfterTool === 'provided_specific_service_details' || interactionTypeAfterTool === 'ready_for_booking_details')) {
                sessionDataToSave.lastAiInteractionType = 'waiting_for_booking_datetime';
              } else if ((lowerFinalReply.includes("catatan tambahan") || lowerFinalReply.includes("ada lagi yang bisa dibantu?")) && (interactionTypeAfterTool === 'waiting_for_booking_datetime' || lastAiInteractionType === 'waiting_for_booking_datetime')) {
                sessionDataToSave.lastAiInteractionType = 'waiting_for_booking_notes';
              }
        }
      } else if (suggestedReply) {
        const finishReason = result.finishReason;
        console.log(`[MAIN-FLOW] MAIN AI Finish Reason (no tool): ${finishReason}`);
        if (!suggestedReply && finishReason !== "stop") {
            console.error(`[MAIN-FLOW] ❌ MAIN AI generation failed or no text output. Finish Reason: ${finishReason}.`);
            suggestedReply = "Maaf, Zoya lagi agak bingung nih boskuu. Coba tanya lagi dengan cara lain ya.";
        } else {
            const lowerReply = suggestedReply.toLowerCase();
            if (lowerReply.includes("tipe motornya apa") || lowerReply.includes("motornya apa") || lowerReply.includes("jenis motornya")) {
                sessionDataToSave.lastAiInteractionType = 'asked_for_motor_type_for_specific_service';
                const serviceMentionedInUser = await extractServiceNameFromUserMessage(customerMessageToProcess, await getAllServiceNamesAndIds());
                if (serviceMentionedInUser && activeSpecificServiceInquiry === "tidak ada") {
                    sessionDataToSave.activeSpecificServiceInquiry = serviceMentionedInUser.name;
                    sessionDataToSave.activeSpecificServiceId = serviceMentionedInUser.id;
                    activeSpecificServiceInquiry = serviceMentionedInUser.name; 
                    activeSpecificServiceId = serviceMentionedInUser.id; 
                }
            } else if (lowerReply.includes("catnya glossy atau doff") && (activeSpecificServiceInquiry.toLowerCase().includes("coating") || customerMessageToProcess.toLowerCase().includes("coating"))) {
                sessionDataToSave.lastAiInteractionType = 'asked_for_paint_type_for_coating';
                if (activeSpecificServiceInquiry === "tidak ada" && customerMessageToProcess.toLowerCase().includes("coating")) {
                     const coatingService = (await getAllServiceNamesAndIds()).find(s => s.name.toLowerCase().includes("coating"));
                     if (coatingService) {
                        sessionDataToSave.activeSpecificServiceInquiry = coatingService.name;
                        sessionDataToSave.activeSpecificServiceId = coatingService.id;
                        activeSpecificServiceInquiry = coatingService.name; 
                        activeSpecificServiceId = coatingService.id; 
                     }
                }
            } else if ((lowerReply.includes("mau dibookingin") || lowerReply.includes("mau dijadwalin")) && activeSpecificServiceInquiry !== "tidak ada") {
                sessionDataToSave.lastAiInteractionType = 'ready_for_booking_details';
            } else if ((lowerReply.includes("tanggal") && lowerReply.includes("jam")) && (lastAiInteractionType === 'ready_for_booking_details' || lastAiInteractionType === 'provided_specific_service_details' || lastAiInteractionType === 'asked_for_service_after_motor_size')) {
                sessionDataToSave.lastAiInteractionType = 'waiting_for_booking_datetime';
            } else if ((lowerReply.includes("catatan tambahan") || lowerReply.includes("ada lagi yang bisa dibantu?")) && lastAiInteractionType === 'waiting_for_booking_datetime') { 
                sessionDataToSave.lastAiInteractionType = 'waiting_for_booking_notes';
            } else if (lowerReply.includes("booking lo udah zoya catet") || lowerReply.includes("booking berhasil") || lowerReply.includes("udah zoya bikinin jadwalnya") || lowerReply.includes("udah zoya bookingin")) {
                 sessionDataToSave.lastAiInteractionType = 'booking_attempted'; 
                 if (lowerReply.includes("berhasil") || lowerReply.includes("udah zoya catet")) { 
                    sessionDataToSave.activeSpecificServiceInquiry = undefined;
                    sessionDataToSave.activeSpecificServiceId = undefined;
                    sessionDataToSave.pendingBookingDate = undefined;
                    sessionDataToSave.pendingBookingTime = undefined;
                    sessionDataToSave.lastAiInteractionType = 'general_response'; 
                 }
            } else if (lowerReply.includes("pilihan layanan") || lowerReply.includes("daftar layanan")) {
                sessionDataToSave.lastAiInteractionType = 'provided_category_service_list';
            } else if (lowerReply.includes("harga") && (knownMotorcycleName !== "belum diketahui" || activeSpecificServiceInquiry !== "tidak ada")) {
                sessionDataToSave.lastAiInteractionType = 'provided_specific_service_details';
            } else if (lowerReply.includes("halo") || lowerReply.includes("ada yang bisa dibantu")) {
                 sessionDataToSave.lastAiInteractionType = 'initial_greeting';
            }
        }
      } else {
        console.error(`[MAIN-FLOW] ❌ No tool request and no text output from MAIN AI. Result: ${JSON.stringify(result, null, 2)}`);
        suggestedReply = "Waduh, Zoya lagi nggak bisa jawab nih. Coba lagi ya.";
      }

      if (sessionDocRef) {
          const finalSessionDataToSave: Partial<UserAiSession> = {
              userId: userId,
              knownMotorcycleName: (knownMotorcycleName !== "belum diketahui") ? knownMotorcycleName : currentSession.knownMotorcycleName,
              knownMotorcycleSize: (knownMotorcycleSize !== "belum diketahui") ? knownMotorcycleSize : currentSession.knownMotorcycleSize,
              activeSpecificServiceInquiry: sessionDataToSave.activeSpecificServiceInquiry !== undefined ? sessionDataToSave.activeSpecificServiceInquiry : activeSpecificServiceInquiry,
              activeSpecificServiceId: sessionDataToSave.activeSpecificServiceId !== undefined ? sessionDataToSave.activeSpecificServiceId : activeSpecificServiceId,
              pendingBookingDate: sessionDataToSave.pendingBookingDate !== undefined ? sessionDataToSave.pendingBookingDate : pendingBookingDate,
              pendingBookingTime: sessionDataToSave.pendingBookingTime !== undefined ? sessionDataToSave.pendingBookingTime : pendingBookingTime,
              lastAiInteractionType: sessionDataToSave.lastAiInteractionType || lastAiInteractionType,
              lastUpdatedAt: serverTimestamp() as Timestamp,
          };
          Object.keys(finalSessionDataToSave).forEach(keyStr => {
            const key = keyStr as keyof Partial<UserAiSession>;
            if (finalSessionDataToSave[key] === undefined) {
              delete finalSessionDataToSave[key];
            }
          });

          console.log(`[MAIN-FLOW] Menyimpan sesi untuk ${userId}:`, JSON.stringify(finalSessionDataToSave, null, 2));
          await setFirestoreDoc(sessionDocRef, finalSessionDataToSave, { merge: true });
      }

      return {
        suggestedReply,
        sessionActiveSpecificServiceInquiry: sessionDataToSave.activeSpecificServiceInquiry !== undefined ? sessionDataToSave.activeSpecificServiceInquiry : (activeSpecificServiceInquiry !== "tidak ada" ? activeSpecificServiceInquiry : undefined),
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

async function getAllServiceNamesAndIds(): Promise<{id: string, name: string}[]> {
    try {
      const items = await findLayananByCategory({ keyword: "cuci" }); 
      const items2 = await findLayananByCategory({ keyword: "poles" });
      const items3 = await findLayananByCategory({ keyword: "coating" });
      const items4 = await findLayananByCategory({ keyword: "detailing" });
      const allItems = [...items, ...items2, ...items3, ...items4];
      const uniqueItems = Array.from(new Map(allItems.map(item => [item.id, item])).values());

      if (Array.isArray(uniqueItems)) {
        return uniqueItems.map(i => ({id: i.id, name: i.name })).filter(i => i.id && i.name);
      }
      return [];
    } catch (e) {
      console.error("Error in getAllServiceNamesAndIds:", e);
      return [];
    }
}

async function extractServiceNameFromUserMessage(userMessage: string, services: {id: string, name: string}[]): Promise<{id: string, name: string} | undefined> {
    const lowerUserMessage = userMessage.toLowerCase();
    const sortedServices = [...services].sort((a,b) => b.name.length - a.name.length); 
    for (const service of sortedServices) {
        if (service.name && lowerUserMessage.includes(service.name.toLowerCase())) {
            return service;
        }
    }
    return undefined;
}

export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<WhatsAppReplyOutput> {
  console.log("[MAIN-FLOW Wrapper] generateWhatsAppReply input:", JSON.stringify(input, null, 2));

  let mainPromptToUse = input.mainPromptString;

  if (!mainPromptToUse && db && input.senderNumber) {
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
