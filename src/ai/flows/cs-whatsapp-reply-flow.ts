
'use server';

import { ai } from '@/ai/genkit'; // Menggunakan objek 'ai' global dari genkit.ts
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, where, limit, getDocs, Timestamp } from 'firebase/firestore';
import { DEFAULT_AI_SETTINGS } from '@/app/(app)/ai-cs-assistant/settings/page'; // Import default settings

// Skema internal untuk validasi input chat history di flow
const ChatMessageSchemaInternal = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchemaInternal>;

// Skema Zod untuk input flow
const ZoyaChatInputSchema = z.object({
  messages: z.array(ChatMessageSchemaInternal).optional().describe("Riwayat percakapan, pesan terakhir adalah dari user."),
  customerMessage: z.string().optional().describe("Pesan terbaru dari customer jika tidak termasuk dalam messages."),
  senderNumber: z.string().optional().describe("Nomor WhatsApp pengirim (opsional)."),
  // Tambahkan field lain yang mungkin dibutuhkan dari DEFAULT_AI_SETTINGS
  agentBehavior: z.string().optional(),
  knowledgeBase: z.string().optional(),
  currentDate: z.string().optional(),
  currentTime: z.string().optional(),
  tomorrowDate: z.string().optional(),
  dayAfterTomorrowDate: z.string().optional(),
  mainPromptString: z.string().optional(),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>;

// Skema Zod untuk output flow
const ZoyaChatOutputSchema = z.string().describe("Balasan teks dari Zoya.");


// =================================================================
//  TOOLS: Kemampuan yang bisa digunakan oleh AI
// =================================================================
const getServicePriceTool = ai.defineTool(
  {
    name: 'getServicePrice',
    description: 'Dapatkan harga untuk layanan spesifik pada model motor tertentu. Gunakan tool ini jika user menanyakan harga.',
    inputSchema: z.object({
      vehicleModel: z.string().describe('Model motor, contoh: NMAX, PCX, Vario'),
      serviceName: z.string().describe('Nama layanan, contoh: Coating, Cuci Premium, Full Detailing'),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
      price: z.number().optional(),
      size: z.string().optional(),
      estimatedDuration: z.string().optional(),
    }),
  },
  async ({ vehicleModel, serviceName }) => {
    if (!db) {
      console.error("[getServicePriceTool] Firestore Client DB (db) is not initialized!");
      return { success: false, message: "Database bengkel sedang tidak bisa diakses, Zoya jadi bingung nih." };
    }
    console.log(`[getServicePriceTool] Input: vehicleModel=${vehicleModel}, serviceName=${serviceName}`);
    try {
      const vehiclesCollectionRef = collection(db, 'vehicleTypes');
      // 1. Coba cari berdasarkan alias dulu
      let vehicleQuery = firestoreQuery(
        vehiclesCollectionRef,
        where('aliases', 'array-contains', vehicleModel.toLowerCase()),
        limit(1)
      );
      let vehicleQuerySnapshot = await getDocs(vehicleQuery);

      // 2. Jika tidak ketemu alias, coba cari berdasarkan model_lowercase (exact match)
      if (vehicleQuerySnapshot.empty) {
        console.log(`[getServicePriceTool] No exact match for '${vehicleModel.toLowerCase()}' in aliases. Trying 'model_lowercase'...`);
        const modelLowerQuery = firestoreQuery(vehiclesCollectionRef, where('model_lowercase', '==', vehicleModel.toLowerCase()), limit(1));
        vehicleQuerySnapshot = await getDocs(modelLowerQuery);
      }
      
      if (vehicleQuerySnapshot.empty) {
        console.log(`[getServicePriceTool] Vehicle model '${vehicleModel}' not found.`);
        return { success: false, message: `Maaf, Zoya belum kenal model motor "${vehicleModel}". Mungkin bisa sebutkan yang lebih umum atau pastikan ejaannya benar?` };
      }

      const vehicleData = vehicleQuerySnapshot.docs[0].data();
      const vehicleSize = vehicleData.size; // e.g., "L"
      if (!vehicleSize) {
         console.log(`[getServicePriceTool] Vehicle size not found for model '${vehicleModel}'.`);
         return { success: false, message: `Ukuran untuk model motor "${vehicleModel}" tidak ditemukan. Zoya bingung nih.` };
      }
      const firestoreSizeVariant = vehicleSize; // Varian ukuran di Firestore biasanya S, M, L, XL langsung

      const servicesCollectionRef = collection(db, 'services');
      const serviceNameLower = serviceName.toLowerCase();
      
      // Mencari layanan dengan nama yang case-insensitive (>= dan <= trick)
      const serviceQuery = firestoreQuery(
        servicesCollectionRef,
        where('name_lowercase', '>=', serviceNameLower),
        where('name_lowercase', '<=', serviceNameLower + '\uf8ff')
        // where('name_lowercase', '==', serviceNameLower) // Alternatif: exact match, but less flexible for typos
      );
      const serviceQuerySnapshot = await getDocs(serviceQuery);

      if (serviceQuerySnapshot.empty) {
        console.log(`[getServicePriceTool] Service name '${serviceName}' not found (initial query).`);
        // Mungkin coba cari dengan alias juga di sini jika ada field alias_layanan di collection services
        return { success: false, message: `Layanan "${serviceName}" sepertinya tidak tersedia.` };
      }
      
      // Filter manual untuk best match jika query mengembalikan >1 hasil (mis. "Cuci" vs "Cuci Premium")
      let foundServiceData: any = null;
      let bestMatchScore = -1;

      serviceQuerySnapshot.forEach(doc => {
        const service = doc.data();
        const currentServiceNameLower = service.name_lowercase || service.name.toLowerCase(); // Fallback if name_lowercase is missing
        
        // Scoring sederhana: exact match paling tinggi, startsWith, includes
        let score = 0;
        if (currentServiceNameLower === serviceNameLower) { score = 100; }
        else if (currentServiceNameLower.startsWith(serviceNameLower)) { score = 50; }
        else if (serviceNameLower.includes(currentServiceNameLower)) { score = 25; } // Jika query kita pakai >= <=, ini mungkin tidak terlalu relevan
        else { score = 10; } // Default score for less relevant matches from broad query

        if (score > bestMatchScore) {
            bestMatchScore = score;
            foundServiceData = service;
        }
      });

      if (!foundServiceData) {
         console.log(`[getServicePriceTool] No suitable service found for '${serviceName}' after filtering.`);
         return { success: false, message: `Layanan "${serviceName}" tidak ditemukan.` };
      }
      
      // Ambil harga dari varian yang cocok, atau harga dasar jika tidak ada varian/varian tidak cocok
      let price: number | undefined = undefined;
      let estimatedDuration: string | undefined = foundServiceData.estimatedDuration; // Ambil durasi dasar dulu

      if (foundServiceData.variants && Array.isArray(foundServiceData.variants)) {
        // Di Firestore, varian biasanya punya nama seperti "S", "M", "L", "XL" (sesuai vehicleSize)
        const variant = foundServiceData.variants.find((v: any) => v.name && v.name.toUpperCase() === firestoreSizeVariant.toUpperCase());
        if (variant && typeof variant.price === 'number') {
          price = variant.price;
          estimatedDuration = variant.estimatedDuration || estimatedDuration; // Ambil durasi varian jika ada
        }
      }
      
      // Jika harga dari varian tidak ditemukan, coba ambil harga dasar layanan
      if (price === undefined && typeof foundServiceData.price === 'number') {
        price = foundServiceData.price;
      }

      if (price === undefined) {
        console.log(`[getServicePriceTool] Price not found for service '${foundServiceData.name}' with size '${vehicleSize}'. Base price also not found or invalid.`);
        return { 
          success: false, 
          message: `Harga untuk layanan "${foundServiceData.name}" pada motor ukuran ${vehicleSize} (${vehicleModel}) belum tersedia saat ini. Mungkin Zoya bisa bantu carikan layanan lain?`,
          size: vehicleSize,
          estimatedDuration: estimatedDuration // Kirim durasi dasar jika harga tidak ketemu
        };
      }

      console.log(`[getServicePriceTool] Success: Found price Rp ${price} for ${serviceName} on ${vehicleModel} (size ${vehicleSize}). Duration: ${estimatedDuration || 'N/A'}`);
      return {
        success: true,
        price: price,
        size: vehicleSize,
        message: `Harga untuk layanan ${foundServiceData.name} pada motor ${vehicleModel} (Size ${vehicleSize}) adalah Rp ${price.toLocaleString('id-ID')}. Estimasi durasi: ${estimatedDuration || 'N/A'}.`,
        estimatedDuration: estimatedDuration || undefined // Kirim durasi yang relevan
      };
    } catch (error: any) {
        console.error("[getServicePriceTool] Error executing tool:", error.message, error.stack);
        return { success: false, message: `Waduh, Zoya lagi pusing nih, ada error pas ngecek harga: ${error.message}` };
    }
  }
);


// =================================================================
//  FLOW: Logika utama chatbot Zoya
// =================================================================
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
      return ""; // Kembalikan string kosong jika tidak ada pesan user
    }
    const lastMessageLowerCase = lastUserMessageContent.toLowerCase();
    
    // 1. Dynamic Context Building (Sederhana dulu)
    let dynamicContext = `INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.`;

    // Untuk sementara, kita tidak melakukan deteksi entitas kompleks di sini untuk menyederhanakan.
    // Jika tool dipanggil, output tool akan menjadi konteks baru untuk AI.
    if (!db) {
        console.warn("[CS-FLOW] Firestore DB (db) is not initialized. Entity detection and pricing will be skipped in context pre-building.");
        dynamicContext += " WARNING: Database tidak terhubung, info harga mungkin tidak akurat jika tool tidak dipanggil.";
    }
    
    console.log(`[CS-FLOW] Dynamic context built: ${dynamicContext}`);

    // 2. Siapkan histori dan prompt untuk AI
    // 'messages' di input sudah berisi riwayat, pesan terakhir adalah dari user.
    // Kita perlu memformatnya ke { role, content: [{ text: ... }] }
    const historyForAI = (input.messages || [])
      .filter(msg => msg.content && msg.content.trim() !== '') // Pastikan ada konten
      .slice(0, -1) // Ambil semua KECUALI pesan user terakhir (karena itu akan jadi prompt utama)
      .map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }], // Struktur content yang diharapkan Genkit v1.x
    }));
    
    // Gunakan prompt utama dari input jika ada, jika tidak, ambil dari DEFAULT_AI_SETTINGS
    const systemInstructionText = (input.mainPromptString || DEFAULT_AI_SETTINGS.mainPrompt).replace("{{dynamicContext}}", dynamicContext);
    
    // Gabungkan instruksi sistem dengan pesan user terakhir
    const userPromptWithSystemInstruction = `${systemInstructionText}

---

USER_INPUT: "${lastUserMessageContent}"

JAWABAN ZOYA:`; // Tambahkan label ini untuk memandu AI

    const messagesForAI = [
      ...historyForAI,
      { role: 'user' as const, content: [{ text: userPromptWithSystemInstruction }] } // Pesan user terakhir dengan instruksi sistem
    ];

    console.log("[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. History Length:", historyForAI.length);
    // console.log("[CS-FLOW] Full Prompt Preview (first 500 chars): \n", userPromptWithSystemInstruction.substring(0, 500) + "...");
    
    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        messages: messagesForAI,
        tools: [getServicePriceTool as any], // Aktifkan tool
        toolChoice: 'auto', // Biarkan AI memilih kapan menggunakan tool
        config: { temperature: 0.5 },
        // safetySettings: [ // Ini bisa ditambahkan jika ada masalah safety filter
        //   { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        //   { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        // ],
      });

      console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));

      // Cek apakah AI meminta pemanggilan tool
      const toolRequest = result.toolRequest();
      if (toolRequest) {
        console.log("[CS-FLOW] AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
        // Di sini kita perlu memanggil tool yang diminta dan mengirim hasilnya kembali ke AI
        // Untuk implementasi sederhana, kita bisa coba panggil toolnya langsung jika hanya satu
        if (toolRequest.tool === 'getServicePrice' && toolRequest.input) {
          const toolResult = await getServicePriceTool.fn(toolRequest.input as z.infer<typeof getServicePriceTool.inputSchema>);
          console.log("[CS-FLOW] Tool execution result:", JSON.stringify(toolResult, null, 2));

          // Kirim hasil tool kembali ke AI untuk generasi teks final
          const finalResult = await ai.generate({
            model: 'googleai/gemini-1.5-flash-latest',
            messages: [
              ...messagesForAI, // Kirim lagi histori dan prompt awal
              { role: 'model', content: [{ toolRequest }] }, // Pesan dari AI yang meminta tool
              { role: 'tool', content: [{ toolResponse: { tool: 'getServicePrice', output: toolResult } }] } // Hasil dari tool
            ],
            config: { temperature: 0.5 },
          });
          console.log("[CS-FLOW] Raw AI generate result AFTER TOOL CALL:", JSON.stringify(finalResult, null, 2));
          const suggestedReplyFromToolFollowUp = finalResult.text() || "";
           if (!suggestedReplyFromToolFollowUp) {
            console.warn(`[CS-FLOW] ⚠️ AI returned empty reply AFTER tool call. FinishReason: ${finalResult.finishReason}.`);
            return "Maaf, Zoya lagi bingung nih setelah coba cari info. Coba tanya lagi ya.";
          }
          return suggestedReplyFromToolFollowUp;
        } else {
          console.warn("[CS-FLOW] Unhandled tool request or missing input:", toolRequest);
          return "Maaf, Zoya mencoba melakukan sesuatu tapi ada yang salah. Bisa ulangi pertanyaannya?";
        }
      }

      // Jika tidak ada tool request, ambil teks biasa
      const suggestedReply = result.text() || "";

      // Diagnosis jika balasan kosong (lagi)
      const finishReason = result.finishReason;
      const safetyRatings = result.safetyRatings;
      console.log(`[CS-FLOW] AI Finish Reason: ${finishReason}`);
      if (safetyRatings && safetyRatings.length > 0) {
        console.log('[CS-FLOW] AI Safety Ratings:', JSON.stringify(safetyRatings, null, 2));
      }
      
      if (!suggestedReply) {
        if (finishReason !== "stop") { 
          console.error(`[CS-FLOW] ❌ AI generation failed. Finish Reason: ${finishReason}. Safety: ${JSON.stringify(safetyRatings)}`);
        } else {
          console.warn(`[CS-FLOW] ⚠️ AI returned an empty reply, but finishReason was 'stop'. This might indicate an issue or unexpected model behavior. Safety Ratings: ${JSON.stringify(safetyRatings)}`);
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
  
  if (!input.mainPromptString) {
    // Ambil prompt dari Firestore atau default
    // Untuk sekarang, kita pakai default langsung
    const mainPromptFromSettings = DEFAULT_AI_SETTINGS.mainPrompt; 
    console.log("[CS-FLOW] generateWhatsAppReply: mainPrompt not found in input. Using DEFAULT_AI_SETTINGS.mainPrompt.");
    input.mainPromptString = mainPromptFromSettings;
  } else {
    console.log("[CS-FLOW] generateWhatsAppReply: Using mainPromptString from input.");
  }

  // Pastikan input.messages ada, minimal array kosong jika tidak ada riwayat
  if (!input.messages) {
    input.messages = [];
  }

  // Jika input.customerMessage ada, tambahkan sebagai pesan user terakhir ke input.messages
  // Ini akan jadi pesan user yang diproses oleh zoyaChatFlow
  if (input.customerMessage && input.customerMessage.trim() !== "") {
    input.messages.push({ role: 'user', content: input.customerMessage });
  }

  try {
    // Jalankan flow Genkit. `runFlow` tidak ada di Genkit v1.x, flow dipanggil langsung.
    const replyText = await zoyaChatFlow(input);
    return { suggestedReply: replyText };
  } catch (error: any) {
    console.error("[CS-FLOW Wrapper] Error running zoyaChatFlow:", error);
    return { suggestedReply: `Maaf, Zoya sedang ada kendala teknis. (${error.message || 'Tidak diketahui'})` };
  }
}
