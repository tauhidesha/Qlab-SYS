
'use server';

import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, where, limit, getDocs, Timestamp } from 'firebase/firestore';
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import type { ChatMessage as ChatMessageTypeImport } from '@/types/ai/cs-whatsapp-reply';

// Skema internal untuk validasi input chat history
const ChatMessageSchemaInternal = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

// Skema Zod untuk input, TIDAK DI-EXPORT
const ZoyaChatInputSchema = z.object({
  messages: z.array(ChatMessageSchemaInternal).optional(), // Riwayat lengkap
  customerMessage: z.string().optional(), // Pesan terakhir jika dikirim terpisah
  senderNumber: z.string().optional(),
  agentBehavior: z.string().optional(),
  knowledgeBase: z.string().optional(),
  currentDate: z.string().optional(),
  currentTime: z.string().optional(),
  tomorrowDate: z.string().optional(),
  dayAfterTomorrowDate: z.string().optional(),
  mainPromptString: z.string().optional(),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>;

// Skema Zod untuk output, TIDAK DI-EXPORT
const ZoyaChatOutputSchema = z.string();


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
    try {
      const vehiclesCollectionRef = collection(db, 'vehicleTypes');
      let vehicleQuery = firestoreQuery(
        vehiclesCollectionRef,
        where('aliases', 'array-contains', vehicleModel.toLowerCase()),
        limit(1)
      );
      let vehicleQuerySnapshot = await getDocs(vehicleQuery);

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
      const vehicleSize = vehicleData.size; 
      if (!vehicleSize) {
         console.log(`[getServicePriceTool] Vehicle size not found for model '${vehicleModel}'.`);
         return { success: false, message: `Ukuran untuk model motor "${vehicleModel}" tidak ditemukan. Zoya bingung nih.` };
      }
      const firestoreSizeVariant = vehicleSize; 

      const servicesCollectionRef = collection(db, 'services');
      const serviceNameLower = serviceName.toLowerCase();
      
      const serviceQuery = firestoreQuery(
        servicesCollectionRef,
        where('name_lowercase', '>=', serviceNameLower),
        where('name_lowercase', '<=', serviceNameLower + '\uf8ff')
      );
      const serviceQuerySnapshot = await getDocs(serviceQuery);

      if (serviceQuerySnapshot.empty) {
        console.log(`[getServicePriceTool] Service name '${serviceName}' not found (initial query).`);
        return { success: false, message: `Layanan "${serviceName}" sepertinya tidak tersedia.` };
      }
      
      let foundServiceData: any = null;
      let bestMatchScore = -1;

      serviceQuerySnapshot.forEach(doc => {
        const service = doc.data();
        const currentServiceNameLower = service.name_lowercase || service.name.toLowerCase();
        
        let score = 0;
        if (currentServiceNameLower === serviceNameLower) { score = 100; }
        else if (currentServiceNameLower.startsWith(serviceNameLower)) { score = 50; }
        else if (serviceNameLower.includes(currentServiceNameLower)) { score = 25; }
        else { score = 10; }

        if (score > bestMatchScore) {
            bestMatchScore = score;
            foundServiceData = service;
        }
      });

      if (!foundServiceData) {
         console.log(`[getServicePriceTool] No suitable service found for '${serviceName}' after filtering.`);
         return { success: false, message: `Layanan "${serviceName}" tidak ditemukan.` };
      }
      
      let price: number | undefined = undefined;
      let estimatedDuration: string | undefined = foundServiceData.estimatedDuration;

      if (foundServiceData.variants && Array.isArray(foundServiceData.variants)) {
        const variant = foundServiceData.variants.find((v: any) => v.name && v.name.toUpperCase() === firestoreSizeVariant.toUpperCase());
        if (variant && typeof variant.price === 'number') {
          price = variant.price;
          estimatedDuration = variant.estimatedDuration || estimatedDuration; 
        }
      }
      
      if (price === undefined && typeof foundServiceData.price === 'number') {
        price = foundServiceData.price;
      }

      if (price === undefined) {
        console.log(`[getServicePriceTool] Price not found for service '${foundServiceData.name}' with size '${vehicleSize}'. Base price also not found or invalid.`);
        return { 
          success: false, 
          message: `Harga untuk layanan "${foundServiceData.name}" pada motor ukuran ${vehicleSize} (${vehicleModel}) belum tersedia saat ini. Mungkin Zoya bisa bantu carikan layanan lain?`,
          size: vehicleSize,
          estimatedDuration: estimatedDuration
        };
      }

      return {
        success: true,
        price: price,
        size: vehicleSize,
        message: `Harga untuk layanan ${foundServiceData.name} pada motor ${vehicleModel} (Size ${vehicleSize}) adalah Rp ${price.toLocaleString('id-ID')}. Estimasi durasi: ${estimatedDuration || 'N/A'}.`,
        estimatedDuration: estimatedDuration || undefined
      };
    } catch (error: any) {
        console.error("[getServicePriceTool] Error executing tool:", error.message, error.stack);
        return { success: false, message: `Waduh, Zoya lagi pusing nih, ada error pas ngecek harga: ${error.message}` };
    }
  }
);

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
      return "";
    }
    const lastMessageLowerCase = lastUserMessageContent.toLowerCase();
    
    let dynamicContext = `INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.`;

    if (db) {
      try {
          const modelsCollectionRef = collection(db, 'vehicleTypes');
          const modelsSnapshot = await getDocs(modelsCollectionRef);
          for (const doc of modelsSnapshot.docs) {
              const modelData = doc.data();
              const modelAliases = (modelData.aliases as string[] || []).map(a => a.toLowerCase());
              const originalModelName = modelData.model as string; 
              if (modelAliases.some(alias => lastMessageLowerCase.includes(alias)) || lastMessageLowerCase.includes(originalModelName.toLowerCase())) {
                  break;
              }
          }
          const servicesCollectionRef = collection(db, 'services');
          const servicesSnapshot = await getDocs(servicesCollectionRef);
          for (const doc of servicesSnapshot.docs) {
              const serviceData = doc.data();
              const serviceAliases = (serviceData.aliases as string[] || []).map(a => a.toLowerCase());
              const originalServiceName = serviceData.name as string;
              if (serviceAliases.some(alias => lastMessageLowerCase.includes(alias)) || lastMessageLowerCase.includes(originalServiceName.toLowerCase())) {
                  break;
              }
          }
      } catch (dbError) {
          console.error("[CS-FLOW] Error during Firestore entity detection:", dbError);
          dynamicContext += " WARNING: Gagal mengambil data detail dari database.";
      }
    } else {
        console.warn("[CS-FLOW] Firestore DB (db) is not initialized. Entity detection and pricing will be skipped.");
        dynamicContext += " WARNING: Database tidak terhubung, info harga mungkin tidak akurat.";
    }
    
    console.log(`[CS-FLOW] Dynamic context built: ${dynamicContext}`);

    const historyForAI = (input.messages || [])
      .filter(msg => msg.content && msg.content.trim() !== '')
      .map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }], // Menggunakan 'content' bukan 'parts'
    }));
    
    const systemInstructionText = (input.mainPromptString || DEFAULT_AI_SETTINGS.mainPrompt).replace("{{dynamicContext}}", dynamicContext);
    
    const userPromptWithSystemInstruction = `${systemInstructionText}

---

USER_INPUT: "${lastUserMessageContent}"

JAWABAN ZOYA:`;

    const messagesForAI = [
      ...historyForAI,
      { role: 'user' as const, content: [{ text: userPromptWithSystemInstruction }] } // Menggunakan 'content' bukan 'parts'
    ];

    console.log("[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. History Length:", historyForAI.length);
    // console.log("[CS-FLOW] Full Prompt Preview (first 500 chars): \n", userPromptWithSystemInstruction.substring(0, 500) + "...");
    
    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        messages: messagesForAI,
        // tools: [getServicePriceTool as any], // Tools temporarily disabled
        // toolChoice: 'auto', // Juga dinonaktifkan karena tools tidak aktif
        config: { temperature: 0.5 },
      });

      console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));

      const finishReason = result.finishReason; 
      const safetyRatings = result.safetyRatings; 

      console.log(`[CS-FLOW] AI Finish Reason: ${finishReason}`);
      if (safetyRatings && safetyRatings.length > 0) {
        console.log('[CS-FLOW] AI Safety Ratings:', JSON.stringify(safetyRatings, null, 2));
      }
      
      const suggestedReply = result.candidates?.[0]?.message.content?.[0]?.text || "";

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

export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<{ suggestedReply: string }> {
  console.log("[CS-FLOW] generateWhatsAppReply input:", JSON.stringify(input, null, 2));
  
  if (!input.mainPromptString) {
    const mainPromptFromSettings = DEFAULT_AI_SETTINGS.mainPrompt; 
    console.log("[CS-FLOW] generateWhatsAppReply: mainPrompt not found in input. Using DEFAULT_AI_SETTINGS.mainPrompt.");
    input.mainPromptString = mainPromptFromSettings;
  } else {
    console.log("[CS-FLOW] generateWhatsAppReply: Using mainPromptString from input.");
  }

  try {
    if (!input.messages) {
        input.messages = [];
    }

    const replyText = await zoyaChatFlow(input);
    return { suggestedReply: replyText };
  } catch (error: any) {
    console.error("[CS-FLOW Wrapper] Error running zoyaChatFlow:", error);
    return { suggestedReply: `Maaf, Zoya sedang ada kendala teknis. (${error.message || 'Tidak diketahui'})` };
  }
}

const DEFAULT_AI_SETTINGS = {
  mainPrompt: `
Anda adalah "Zoya" - CS QLAB Moto Detailing.
GAYA BAHASA:
- Santai, ramah, dan profesional (sapa dengan "Halo boskuu!", "Siap!", "Gas booking!").
- Gunakan istilah otomotif santai: "kinclong", "ganteng maksimal", "spa motor".
- Gunakan emoji secukupnya untuk menambah ekspresi: ✅😎✨💸🛠️.
- Hindari kata kasar, tapi boleh pakai "anjay" atau "wih" untuk ekspresi kaget positif.
- Selalu jawab dalam Bahasa Indonesia.

ATURAN BISNIS (PENTING!):
1.  Jika user menanyakan harga, SELALU GUNAKAN 'getServicePrice' tool jika tersedia. Jangan menebak harga. Jika tool tidak tersedia, berikan estimasi berdasarkan informasi yang ada di KONTEKS DARI SISTEM.
2.  Layanan "Full Detailing" HANYA TERSEDIA untuk motor dengan cat GLOSSY. Jika user bertanya untuk motor DOFF, tolak dengan sopan dan tawarkan layanan lain (misal: "Premium Wash" atau "Coating Doff").
3.  Harga "Coating" untuk motor DOFF dan GLOSSY itu BERBEDA. Pastikan informasi ini jelas.
4.  Motor Gede (Moge) seperti Harley, atau motor 250cc ke atas otomatis masuk ukuran "XL".

KONTEKS DARI SISTEM (gunakan data ini untuk menjawab, JANGAN tampilkan KONTEKS ini ke user secara langsung, olah jadi jawaban natural, jangan JSON):
{{dynamicContext}}

PETUNJUK TAMBAHAN:
- Jika KONTEKS berisi VALIDATION_ERROR, jelaskan error tersebut ke user dengan bahasa yang sopan dan berikan solusi/alternatif.
- Jika KONTEKS berisi DATA_PRODUK dan harganya ada, sebutkan harganya. Jika harga 'belum tersedia', JANGAN mengarang harga. Informasikan bahwa harga spesifik belum ada dan tanyakan detail lebih lanjut jika diperlukan (misal jenis cat untuk coating, atau ukuran motor jika belum terdeteksi).
- Jika user bertanya di luar topik detailing motor, jawab dengan sopan bahwa Anda hanya bisa membantu soal QLAB Moto Detailing.
- Tujuan utama: Memberikan informasi akurat dan membantu user melakukan booking jika mereka mau.
- Untuk booking, pastikan Anda mendapatkan: Nama Pelanggan, Nomor HP, Jenis Motor, Layanan, Tanggal, dan Jam. Jika ada yang kurang, minta dengan sopan. Jika sudah lengkap, konfirmasi detailnya ke user.
`,
};

// Tidak ada export lain selain fungsi wrapper dan tipe input utama
// export { ZoyaChatInputSchema, ZoyaChatOutputSchema }; // Dihapus
// export { getServicePriceTool, zoyaChatFlow }; // Dihapus
