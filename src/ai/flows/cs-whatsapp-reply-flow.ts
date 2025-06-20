'use server';
/**
 * @fileOverview Flow AI untuk WhatsApp Customer Service QLAB.
 * Versi ini fokus pada pemanggilan model dengan tool 'cariSizeMotor' dan 'cariInfoLayanan'.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, where, getDocs as getFirestoreDocs, Timestamp, doc, getDoc as getFirestoreDoc, limit } from 'firebase/firestore';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';
import type { ProductServiceInfo } from '@/types/aiToolSchemas';
import { ProductServiceInfoSchema } from '@/types/aiToolSchemas';

// == Definisi Tool cariSizeMotorTool ==
const CariSizeMotorInputSchema = z.object({
  namaMotor: z.string().min(1, "Nama motor tidak boleh kosong.").describe('Nama atau model motor yang ingin dicari ukurannya, contoh: NMAX, PCX, Vario.'),
});
type CariSizeMotorInput = z.infer<typeof CariSizeMotorInputSchema>;

const CariSizeMotorOutputSchema = z.object({
  success: z.boolean().describe('Apakah pencarian berhasil atau tidak.'),
  size: z.string().optional().describe('Ukuran motor (S, M, L, XL) jika ditemukan.'),
  message: z.string().describe('Pesan hasil pencarian, termasuk ukuran jika berhasil atau pesan error jika gagal.'),
  vehicleModelFound: z.string().optional().describe('Nama model motor yang sebenarnya ditemukan di database.'),
});
type CariSizeMotorOutput = z.infer<typeof CariSizeMotorOutputSchema>;

async function findMotorSize(input: CariSizeMotorInput): Promise<CariSizeMotorOutput> {
    const { namaMotor } = input;
    const namaMotorLower = namaMotor.toLowerCase().trim();
    console.log(`[cariSizeMotorTool.fn] Mencari ukuran untuk: "${namaMotorLower}"`);

    if (!db) {
      console.error("[cariSizeMotorTool.fn] Firestore DB (db) is not initialized.");
      return { success: false, message: "Database tidak terhubung, tidak bisa mencari ukuran motor." };
    }

    try {
      const vehicleTypesRef = collection(db, 'vehicleTypes');
      let q;
      let querySnapshot;
      let foundVehicleData: any = null;

      // 1. Try searching by alias (case-insensitive as aliases should be stored in lowercase)
      q = firestoreQuery(vehicleTypesRef, where('aliases', 'array-contains', namaMotorLower), limit(1));
      querySnapshot = await getFirestoreDocs(q);

      if (!querySnapshot.empty) {
        foundVehicleData = querySnapshot.docs[0].data();
      } else {
        // 2. If not found by alias, try searching by model_lowercase (exact match)
        console.log(`[cariSizeMotorTool.fn] Tidak ditemukan via alias, mencoba model_lowercase: "${namaMotorLower}"`);
        q = firestoreQuery(vehicleTypesRef, where('model_lowercase', '==', namaMotorLower), limit(1));
        querySnapshot = await getFirestoreDocs(q);
        if (!querySnapshot.empty) {
          foundVehicleData = querySnapshot.docs[0].data();
        } else {
          // 3. Fallback: search by model name (case-insensitive by client-side filtering)
          // This is less efficient and should be a last resort.
          // For a more robust solution, consider full-text search capabilities if available (e.g., Algolia, Typesense)
          // or ensure all relevant variations are in `aliases` or `model_lowercase`.
          console.log(`[cariSizeMotorTool.fn] Tidak ditemukan via model_lowercase, mencoba model (client-side filter): "${namaMotorLower}"`);
          const allVehiclesSnapshot = await getFirestoreDocs(vehicleTypesRef); // Get all
          for (const doc of allVehiclesSnapshot.docs) {
            const vehicle = doc.data();
            if (vehicle.model && vehicle.model.toLowerCase() === namaMotorLower) {
              foundVehicleData = vehicle;
              break;
            }
          }
        }
      }

      if (foundVehicleData && foundVehicleData.size) {
        console.log(`[cariSizeMotorTool.fn] Ditemukan: Model "${foundVehicleData.model}", Size "${foundVehicleData.size}"`);
        return {
          success: true,
          size: foundVehicleData.size,
          message: `Motor ${foundVehicleData.model} (${namaMotor}) termasuk ukuran ${foundVehicleData.size}.`,
          vehicleModelFound: foundVehicleData.model,
        };
      } else {
        console.log(`[cariSizeMotorTool.fn] Ukuran motor untuk "${namaMotor}" tidak ditemukan.`);
        return {
          success: false,
          message: `Maaf, Zoya tidak menemukan ukuran untuk motor "${namaMotor}". Mungkin bisa coba nama model yang lebih spesifik atau umum?`,
        };
      }
    } catch (error) {
      console.error("[cariSizeMotorTool.fn] Error saat mencari ukuran motor:", error);
      return {
        success: false,
        message: "Terjadi kesalahan internal saat mencari ukuran motor. Coba lagi nanti.",
      };
    }
}

const cariSizeMotorTool = ai.defineTool(
  {
    name: 'cariSizeMotor',
    description: 'Mencari ukuran (S, M, L, XL) untuk model motor tertentu. Gunakan tool ini jika perlu mengetahui ukuran motor untuk menentukan harga layanan atau informasi lain, atau jika user menanyakan ukuran motornya.',
    inputSchema: CariSizeMotorInputSchema,
    outputSchema: CariSizeMotorOutputSchema,
  },
  findMotorSize
);
// == Akhir definisi Tool cariSizeMotorTool ==


// == Definisi Tool cariInfoLayananTool ==
const CariInfoLayananInputSchema = z.object({
  keyword: z.string().min(1, "Kata kunci pencarian tidak boleh kosong.").describe('Kata kunci untuk mencari layanan, mis. "cuci", "coating", "detailing".'),
});
type CariInfoLayananInput = z.infer<typeof CariInfoLayananInputSchema>;

const CariInfoLayananOutputSchema = z.array(ProductServiceInfoSchema).describe("Daftar layanan yang cocok dengan kata kunci, bisa kosong.");
type CariInfoLayananOutput = z.infer<typeof CariInfoLayananOutputSchema>;

async function findLayananByKeyword(input: CariInfoLayananInput): Promise<CariInfoLayananOutput> {
  const { keyword } = input;
  const keywordLower = keyword.toLowerCase().trim();
  console.log(`[cariInfoLayananTool.fn] Mencari layanan dengan keyword: "${keywordLower}"`);

  if (!db) {
    console.error("[cariInfoLayananTool.fn] Firestore DB (db) is not initialized.");
    return []; 
  }

  const matchingServices: ProductServiceInfo[] = [];

  try {
    const servicesCollectionRef = collection(db, 'services');
    const q = firestoreQuery(servicesCollectionRef); // Ambil semua layanan
    const querySnapshot = await getFirestoreDocs(q);

    querySnapshot.forEach((docSnap) => {
      const serviceData = docSnap.data();
      const serviceNameLower = serviceData.name?.toLowerCase();
      const serviceCategoryLower = serviceData.category?.toLowerCase();
      const serviceDescriptionLower = serviceData.description?.toLowerCase();


      if ( (serviceNameLower && serviceNameLower.includes(keywordLower)) ||
           (serviceCategoryLower && serviceCategoryLower.includes(keywordLower)) ||
           (serviceDescriptionLower && serviceDescriptionLower.includes(keywordLower))
         ) {
        const serviceItem: ProductServiceInfo = {
          id: docSnap.id,
          name: serviceData.name,
          type: serviceData.type as 'Layanan' | 'Produk',
          category: serviceData.category,
          price: serviceData.price,
          description: serviceData.description || undefined,
          pointsAwarded: serviceData.pointsAwarded || undefined,
          estimatedDuration: serviceData.estimatedDuration || undefined,
          variants: serviceData.variants?.map((v: any) => ({
            id: v.id || undefined, // Varian mungkin belum punya ID jika baru
            name: v.name,
            price: v.price,
            pointsAwarded: v.pointsAwarded,
            estimatedDuration: v.estimatedDuration,
            stockQuantity: v.stockQuantity,
            costPrice: v.costPrice,
          })) || undefined,
          stockQuantity: serviceData.stockQuantity,
          costPrice: serviceData.costPrice,
        };
        
        const validationResult = ProductServiceInfoSchema.safeParse(serviceItem);
        if (validationResult.success) {
          matchingServices.push(validationResult.data);
        } else {
          console.warn(`[cariInfoLayananTool.fn] Data layanan ${docSnap.id} tidak valid:`, validationResult.error.format());
        }
      }
    });

    console.log(`[cariInfoLayananTool.fn] Ditemukan ${matchingServices.length} layanan yang cocok dengan keyword "${keywordLower}".`);
    return matchingServices;

  } catch (error) {
    console.error("[cariInfoLayananTool.fn] Error saat mencari layanan:", error);
    return [];
  }
}

const cariInfoLayananTool = ai.defineTool(
  {
    name: 'cariInfoLayanan',
    description: 'Mencari daftar layanan atau produk yang tersedia berdasarkan kata kunci. Berguna jika pelanggan bertanya layanan apa saja yang ada atau menyebutkan jenis layanan secara umum.',
    inputSchema: CariInfoLayananInputSchema,
    outputSchema: CariInfoLayananOutputSchema,
  },
  findLayananByKeyword
);
// == Akhir definisi Tool cariInfoLayananTool ==


// Skema internal untuk validasi input chat history di flow
const ChatMessageSchemaInternal = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchemaInternal>;

// Skema input untuk ZoyaChatFlow
export const ZoyaChatInputSchema = z.object({
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

const zoyaChatFlow = ai.defineFlow(
  {
    name: 'zoyaChatFlow',
    inputSchema: ZoyaChatInputSchema,
    outputSchema: z.string(), // Outputnya adalah string balasan AI
  },
  async (input: ZoyaChatInput): Promise<string> => {
    console.log("[CS-FLOW] zoyaChatFlow input. Customer Message:", input.customerMessage, "History Length:", (input.messages || []).length);

    const lastUserMessageContent = input.customerMessage ||
                                   (input.messages && input.messages.length > 0 ? input.messages[input.messages.length - 1].content : '');

    if (!lastUserMessageContent || lastUserMessageContent.trim() === '') {
      console.warn("[CS-FLOW] No valid last user message content. Returning empty reply.");
      return "Maaf, Zoya tidak menerima pesan yang jelas.";
    }

    let dynamicContext = `INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.`;
    if (!db) {
        console.warn("[CS-FLOW] Firestore DB (db) is not initialized. Some context might be missing.");
        dynamicContext += " WARNING: Database tidak terhubung, info detail mungkin tidak akurat.";
    }
    console.log(`[CS-FLOW] Dynamic context built: ${dynamicContext}`);

    const historyForAI = (input.messages || [])
      .filter(msg => msg.content && msg.content.trim() !== '')
      .map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }], // Format content jadi array of Part
    }));

    const mainPromptFromSettings = input.mainPromptString || DEFAULT_AI_SETTINGS.mainPrompt;

    // Gabungkan prompt sistem dengan konteks dinamis dan pesan pengguna terakhir
    const finalSystemPrompt = mainPromptFromSettings
                                .replace("{{{dynamicContext}}}", dynamicContext)
                                .replace("{{{customerMessage}}}", input.customerMessage) 
                                .replace(/{{#if messages.length}}[\s\S]*?{{\/if}}/g, "") 
                                .replace(/{{#if senderNumber}}[\s\S]*?{{\/if}}/g, "")
                                .replace(/{{#if currentDate}}[\s\S]*?{{\/if}}/g, "")
                                .replace(/{{#if tomorrowDate}}[\s\S]*?{{\/if}}/g, "");


    // Struktur messages untuk ai.generate
    const messagesForAI = [
      ...historyForAI,
      { role: 'user' as const, content: [{ text: input.customerMessage }] }
    ];

    console.log(`[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. History Length: ${historyForAI.length}`);
    console.log(`[CS-FLOW] System Prompt being used (simplified): ${finalSystemPrompt.substring(0, 300)}...`);

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: finalSystemPrompt, // System-level instructions
        messages: messagesForAI,    // Conversation history + latest user message
        tools: [cariSizeMotorTool, cariInfoLayananTool], // Aktifkan tools
        toolChoice: 'auto',
        config: { temperature: 0.5 },
      });

      console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));
      
      let suggestedReply = "";
      const toolRequestData = result.toolRequest; // Akses toolRequest sebagai properti

      if (toolRequestData) {
        console.log("[CS-FLOW] AI requested a tool call:", JSON.stringify(toolRequestData, null, 2));
        let toolOutput: any = null; // Harus any karena output bisa berbeda

        if (toolRequestData.name === 'cariSizeMotor' && toolRequestData.input) {
          toolOutput = await findMotorSize(toolRequestData.input as CariSizeMotorInput);
        } else if (toolRequestData.name === 'cariInfoLayanan' && toolRequestData.input) {
          toolOutput = await findLayananByKeyword(toolRequestData.input as CariInfoLayananInput);
        } else {
           suggestedReply = "Tool tidak dikenal atau input salah.";
           // TODO: Harusnya tidak sampai sini jika tool terdefinisi dengan baik.
        }

        if (toolOutput) {
          console.log(`[CS-FLOW] Tool ${toolRequestData.name} output:`, JSON.stringify(toolOutput, null, 2));
          // Kirim ulang ke AI dengan hasil tool
          const modelResponseAfterTool = await ai.generate({
            model: 'googleai/gemini-1.5-flash-latest',
            prompt: finalSystemPrompt, // Kirim lagi prompt sistem awal
            messages: [ // Kirim riwayat, permintaan AI awal, dan respons tool
              ...messagesForAI, // Riwayat awal + pesan user
              result.message,   // Permintaan tool dari AI
              { 
                role: 'tool',
                content: [{
                  toolResponse: {
                    name: toolRequestData.name,
                    output: toolOutput, 
                  }
                }]
              }
            ],
            config: { temperature: 0.5 },
          });
          suggestedReply = modelResponseAfterTool.text || "Zoya bingung setelah pakai alat, coba lagi ya.";
        } else if (!suggestedReply) { // Jika toolOutput null tapi tidak ada error tool di atas
            suggestedReply = "Maaf, Zoya tidak berhasil memproses permintaan alatnya.";
        }
        console.log("[CS-FLOW] Tool output message / AI reply after tool:", suggestedReply);

      } else {
        suggestedReply = result.text || ""; // Jika tidak ada tool request, langsung ambil teks
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
        if (flowError.cause) {
            console.error("[CS-FLOW] Error Cause:", JSON.stringify(flowError.cause, null, 2));
        }
        return `Waduh, Zoya lagi error nih, boskuu. Coba tanya lagi nanti ya. (Pesan Error: ${flowError.message || 'Kesalahan internal tidak diketahui'})`;
    }
  }
);

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
          // Pastikan DEFAULT_AI_SETTINGS dan mainPrompt-nya tidak undefined
          if (DEFAULT_AI_SETTINGS && DEFAULT_AI_SETTINGS.mainPrompt) {
            mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt;
            console.log("[CS-FLOW] generateWhatsAppReply: Using DEFAULT_AI_SETTINGS.mainPrompt.");
          } else {
            console.error("[CS-FLOW] generateWhatsAppReply: FATAL - DEFAULT_AI_SETTINGS or its mainPrompt is undefined!");
            // Fallback ke string kosong atau prompt darurat jika DEFAULT_AI_SETTINGS tidak terdefinisi
            mainPromptToUse = "Anda adalah asisten AI yang membantu. Jawab pertanyaan pelanggan.";
          }
        }
      } else { // Jika db tidak ada
        console.log("[CS-FLOW] generateWhatsAppReply: Firestore (db) not available. Checking default for mainPrompt.");
        if (DEFAULT_AI_SETTINGS && DEFAULT_AI_SETTINGS.mainPrompt) {
          mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt;
          console.log("[CS-FLOW] generateWhatsAppReply: Using DEFAULT_AI_SETTINGS.mainPrompt (db not available).");
        } else {
          console.error("[CS-FLOW] generateWhatsAppReply: FATAL - DEFAULT_AI_SETTINGS or its mainPrompt is undefined (db not available)!");
          mainPromptToUse = "Anda adalah asisten AI. Jawab pertanyaan.";
        }
      }
    } catch (error) {
      console.error("[CS-FLOW] generateWhatsAppReply: Error fetching mainPrompt from Firestore. Using default.", error);
      mainPromptToUse = (DEFAULT_AI_SETTINGS && DEFAULT_AI_SETTINGS.mainPrompt) ? DEFAULT_AI_SETTINGS.mainPrompt : "Asisten AI. Jawab pertanyaan.";
    }
  } else {
     console.log("[CS-FLOW] generateWhatsAppReply: Using mainPromptString directly from input.");
  }

  const flowInput: ZoyaChatInput = {
    messages: input.messages || [],
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
