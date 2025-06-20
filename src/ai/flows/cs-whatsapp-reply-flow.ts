
'use server';

// import { adminDb } from '@/lib/firebase-admin'; // Menggunakan Firestore Admin SDK
import { db } from '@/lib/firebase'; // Menggunakan Firestore Client SDK
import { collection, query as firestoreQuery, where, limit, getDocs, Timestamp } from 'firebase/firestore'; // Import fungsi Client SDK

// import { configureGenkit } from '@genkit-ai/core'; // configureGenkit sebaiknya di file genkit.ts utama
import { ai } from '@/ai/genkit'; // Menggunakan objek 'ai' global dari genkit.ts
// import { defineFlow } from 'genkit'; // defineFlow sekarang dari 'ai.defineFlow'
// import { googleAI } from '@genkit-ai/googleai'; // Tidak perlu jika 'ai' sudah dikonfigurasi
// import { defineTool, type Tool } from 'genkit'; // defineTool sekarang dari 'ai.defineTool'
import * as z from 'zod';
import type { ChatMessage as ChatMessageTypeFromImport } from '@/types/ai/cs-whatsapp-reply'; // Import tipe ChatMessage

// Skema Zod untuk input, TIDAK DI-EXPORT
// Ini adalah skema untuk input YANG DITERIMA oleh fungsi wrapper generateWhatsAppReply
const ZoyaChatInputSchema = z.object({
  messages: z.array( // Ini adalah history chat yang mungkin dikirim dari UI
    z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })
  ).optional(),
  customerMessage: z.string().optional(), // Pesan terakhir pelanggan, bisa undefined jika sudah ada di akhir messages
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
    if (!db) { // Menggunakan db (Client SDK)
      console.error("[getServicePriceTool] Firestore Client DB (db) is not initialized!");
      return { success: false, message: "Database bengkel sedang tidak bisa diakses, Zoya jadi bingung nih." };
    }
    try {
      // 1. Cari ukuran kendaraan dari modelnya
      const vehiclesCollectionRef = collection(db, 'vehicleTypes');
      
      // Coba cari berdasarkan aliases dulu (lebih fleksibel)
      let vehicleQuery = firestoreQuery(
        vehiclesCollectionRef,
        where('aliases', 'array-contains', vehicleModel.toLowerCase()),
        limit(1)
      );
      let vehicleQuerySnapshot = await getDocs(vehicleQuery);

      if (vehicleQuerySnapshot.empty) {
        // Fallback: coba cari berdasarkan field 'model_lowercase' (jika model_lowercase belum ada/tidak cocok)
        // atau jika 'aliases' tidak mengandung nama model yang persis
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
      const firestoreSizeVariant = vehicleSize; // e.g., "L" (nama varian di Firestore adalah 'L', 'XL', dll bukan 'SIZE L')

      // 2. Cari layanan berdasarkan nama (menggunakan field lowercase untuk case-insensitivity)
      const servicesCollectionRef = collection(db, 'services');
      const serviceNameLower = serviceName.toLowerCase();
      
      // Query awal bisa lebih luas jika nama layanan bisa tidak persis
      const serviceQuery = firestoreQuery(
        servicesCollectionRef,
        where('name_lowercase', '>=', serviceNameLower),
        where('name_lowercase', '<=', serviceNameLower + '\uf8ff')
        // Kita akan filter lebih lanjut di client-side jika perlu, karena Firestore tidak bisa 'contains' secara native
      );
      const serviceQuerySnapshot = await getDocs(serviceQuery);

      if (serviceQuerySnapshot.empty) {
        console.log(`[getServicePriceTool] Service name '${serviceName}' not found (initial query).`);
        return { success: false, message: `Layanan "${serviceName}" sepertinya tidak tersedia.` };
      }
      
      // Filter manual untuk 'contains' karena Firestore tidak mendukungnya secara langsung
      // dan untuk memilih match terbaik jika ada beberapa.
      let foundServiceData: any = null;
      let bestMatchScore = -1;

      serviceQuerySnapshot.forEach(doc => {
        const service = doc.data();
        const currentServiceNameLower = service.name_lowercase || service.name.toLowerCase(); // Fallback jika name_lowercase belum ada
        
        // Skor sederhana untuk menentukan kemiripan
        let score = 0;
        if (currentServiceNameLower === serviceNameLower) { // Exact match
            score = 100;
        } else if (currentServiceNameLower.startsWith(serviceNameLower)) { // Starts with
            score = 50;
        } else if (serviceNameLower.includes(currentServiceNameLower)) { // User input contains db name (kurang umum)
            score = 25;
        } else { // Simple contains, bisa jadi kurang akurat tapi lebih baik dari tidak ada
            score = 10;
        }

        if (score > bestMatchScore) {
            bestMatchScore = score;
            foundServiceData = service;
        }
      });

      if (!foundServiceData) {
         console.log(`[getServicePriceTool] No suitable service found for '${serviceName}' after filtering.`);
         return { success: false, message: `Layanan "${serviceName}" tidak ditemukan.` };
      }
      
      // 3. Ambil harga dari map 'variants' berdasarkan ukuran kendaraan
      let price: number | undefined = undefined;
      let estimatedDuration: string | undefined = foundServiceData.estimatedDuration; // Default ke estimasi dasar layanan

      // Cek apakah service memiliki variants dan apakah variants itu array
      if (foundServiceData.variants && Array.isArray(foundServiceData.variants)) {
        // Cari varian yang cocok dengan sizeName (case-insensitive)
        const variant = foundServiceData.variants.find((v: any) => v.name && v.name.toUpperCase() === firestoreSizeVariant.toUpperCase());
        if (variant && typeof variant.price === 'number') {
          price = variant.price;
          estimatedDuration = variant.estimatedDuration || estimatedDuration; // Ambil durasi varian jika ada, jika tidak pakai durasi dasar
        }
      }
      
      // Jika tidak ada varian yang cocok atau tidak ada array variants, gunakan harga dasar layanan
      if (price === undefined && typeof foundServiceData.price === 'number') {
        price = foundServiceData.price;
      }

      if (price === undefined) {
        console.log(`[getServicePriceTool] Price not found for service '${foundServiceData.name}' with size '${vehicleSize}'. Base price also not found or invalid.`);
        return { 
          success: false, 
          message: `Harga untuk layanan "${foundServiceData.name}" pada motor ukuran ${vehicleSize} (${vehicleModel}) belum tersedia saat ini. Mungkin Zoya bisa bantu carikan layanan lain?`,
          size: vehicleSize, // Sertakan ukuran untuk informasi
          estimatedDuration: estimatedDuration // Sertakan durasi jika ada
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


// =================================================================
//  FLOW: Logika utama chatbot Zoya
// =================================================================

const zoyaChatFlow = ai.defineFlow(
  {
    name: 'zoyaChatFlow',
    inputSchema: ZoyaChatInputSchema, // Input untuk flow ini
    outputSchema: ZoyaChatOutputSchema, // Outputnya string (balasan AI)
  },
  async (input) => {
    console.log("[CS-FLOW] zoyaChatFlow input. Customer Message:", input.customerMessage, "History Length:", (input.messages || []).length);

    // Tentukan pesan terakhir dari user untuk dijadikan prompt utama
    const lastUserMessageContent = input.customerMessage || 
                                   (input.messages && input.messages.length > 0 ? input.messages[input.messages.length - 1].content : '');

    if (!lastUserMessageContent || lastUserMessageContent.trim() === '') {
      console.warn("[CS-FLOW] No valid last user message content. Returning empty reply.");
      return ""; // Kembalikan string kosong jika tidak ada pesan valid
    }
    const lastMessageLowerCase = lastUserMessageContent.toLowerCase();
    
    let dynamicContext = `INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.`;

    // Deteksi entitas (motor & layanan) jika db tersedia
    if (db) { // Pastikan db (Client SDK) sudah diinisialisasi
      try {
          // Logika deteksi model motor (contoh, bisa disempurnakan)
          const modelsCollectionRef = collection(db, 'vehicleTypes');
          const modelsSnapshot = await getDocs(modelsCollectionRef); // Menggunakan Client SDK
          for (const doc of modelsSnapshot.docs) {
              const modelData = doc.data();
              const modelAliases = (modelData.aliases as string[] || []).map(a => a.toLowerCase());
              const originalModelName = modelData.model as string; // Pastikan ada field 'model' di Firestore
              if (modelAliases.some(alias => lastMessageLowerCase.includes(alias)) || lastMessageLowerCase.includes(originalModelName.toLowerCase())) {
                  // vehicleModel = originalModelName; // Tidak digunakan langsung di sini, tapi bisa disimpan di context
                  break;
              }
          }

          // Logika deteksi nama layanan (contoh, bisa disempurnakan)
          const servicesCollectionRef = collection(db, 'services');
          const servicesSnapshot = await getDocs(servicesCollectionRef); // Menggunakan Client SDK
          for (const doc of servicesSnapshot.docs) {
              const serviceData = doc.data();
              const serviceAliases = (serviceData.aliases as string[] || []).map(a => a.toLowerCase());
              const originalServiceName = serviceData.name as string;
              if (serviceAliases.some(alias => lastMessageLowerCase.includes(alias)) || lastMessageLowerCase.includes(originalServiceName.toLowerCase())) {
                  // serviceName = originalServiceName; // Tidak digunakan langsung di sini
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

    // Map input.messages (history) ke format yang diharapkan AI
    const historyForAI = (input.messages || [])
      .filter(msg => msg.content && msg.content.trim() !== '') // Filter pesan kosong
      .map((msg) => ({
        role: msg.role, // 'user' atau 'model'
        parts: [{ text: msg.content }],
    }));
    
    const systemInstructionText = (input.mainPromptString || DEFAULT_AI_SETTINGS.mainPrompt).replace("{{dynamicContext}}", dynamicContext);

    // Gabungkan system instruction dengan prompt user terakhir
    const userPromptWithSystemInstruction = `${systemInstructionText}

---

USER_INPUT: "${lastUserMessageContent}"

JAWABAN ZOYA:`; // Tambahkan label untuk AI

    // Bentuk array messages yang akan dikirim ke AI
    const messagesForAI = [
      ...historyForAI, // Riwayat percakapan sebelumnya
      { role: 'user' as const, parts: [{ text: userPromptWithSystemInstruction }] } // Pesan user terakhir (sudah digabung dengan system prompt)
    ];

    console.log("[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. History Length:", historyForAI.length);
    // Untuk debugging, bisa uncomment ini untuk lihat preview prompt lengkap (hati-hati jika terlalu panjang)
    // console.log("[CS-FLOW] Full Prompt Preview (first 500 chars): \n", userPromptWithSystemInstruction.substring(0, 500) + "...");
    
    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        messages: messagesForAI,
        // tools: [getServicePriceTool as any], // Tools temporarily disabled
        // toolChoice: 'auto', // Tools temporarily disabled
        config: { temperature: 0.5 },
      });

      console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));

      // Akses finishReason dan safetyRatings dari level atas objek result
      const finishReason = result.finishReason; 
      const safetyRatings = result.safetyRatings; 

      console.log(`[CS-FLOW] AI Finish Reason: ${finishReason}`);
      if (safetyRatings && safetyRatings.length > 0) {
        console.log('[CS-FLOW] AI Safety Ratings:', JSON.stringify(safetyRatings, null, 2));
      }

      // Akses teks dari kandidat pertama secara aman (jika result.candidates ada)
      const suggestedReply = result.candidates?.[0]?.message.content?.[0]?.text || "";

      if (!suggestedReply) {
        if (finishReason !== "stop") { // Gunakan lowercase "stop"
          console.error(`[CS-FLOW] ❌ AI generation failed. Finish Reason: ${finishReason}. Safety: ${JSON.stringify(safetyRatings)}`);
        } else {
          console.warn(`[CS-FLOW] ⚠️ AI returned an empty reply, but finishReason was 'stop'. This might indicate an issue or unexpected model behavior. Safety Ratings: ${JSON.stringify(safetyRatings)}`);
        }
        return "Maaf, Zoya lagi agak bingung nih boskuu. Coba tanya lagi dengan cara lain ya, atau hubungi CS langsung.";
      }
      return suggestedReply;

    } catch (flowError: any) {
        console.error("[CS-FLOW] ❌ Critical error dalam flow zoyaChatFlow:", flowError);
        if (flowError.cause) { // Cek apakah ada 'cause' di error object
            console.error("[CS-FLOW] Error Cause:", JSON.stringify(flowError.cause, null, 2));
        }
        return `Waduh, Zoya lagi error nih, boskuu. Coba tanya lagi nanti ya. (Pesan Error: ${flowError.message || 'Kesalahan internal tidak diketahui'})`;
    }
  }
);

// Fungsi wrapper, TETAP DI-EXPORT
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<{ suggestedReply: string }> {
  console.log("[CS-FLOW] generateWhatsAppReply input:", JSON.stringify(input, null, 2));
  
  // Pastikan input.mainPromptString diisi jika kosong, sebelum dikirim ke flow
  if (!input.mainPromptString) {
    // Di sini, kita bisa mengambil dari Firestore atau tempat lain jika diperlukan
    // Untuk sekarang, kita pakai default jika tidak ada
    const mainPromptFromSettings = DEFAULT_AI_SETTINGS.mainPrompt; 
    console.log("[CS-FLOW] generateWhatsAppReply: mainPrompt not found in input. Using DEFAULT_AI_SETTINGS.mainPrompt.");
    input.mainPromptString = mainPromptFromSettings; // Ini akan memodifikasi objek input
  } else {
    console.log("[CS-FLOW] generateWhatsAppReply: Using mainPromptString from input.");
  }

  try {
    // Pastikan input.messages adalah array, minimal array kosong.
    // customerMessage (pesan user terakhir) akan ditangani di dalam zoyaChatFlow.
    if (!input.messages) {
        input.messages = []; // Modifikasi objek input
    }

    const replyText = await zoyaChatFlow(input); // Kirim objek input yang sudah dimodifikasi
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

// Skema ChatMessage untuk validasi chatHistory (sekarang messages) di ZoyaChatInputSchema
// Tidak perlu diexport karena sudah diimpor dan ZoyaChatInputSchema sudah benar
// const ChatMessageSchemaInternal = z.object({
//   role: z.enum(['user', 'model']),
//   content: z.string(),
// });

// const WhatsAppReplyInputSchemaInternal = z.object({
//   customerMessage: z.string().optional(),
//   senderNumber: z.string().optional(),
//   agentBehavior: z.string().optional(),
//   knowledgeBase: z.string().optional(),
//   currentDate: z.string().optional(),
//   currentTime: z.string().optional(),
//   tomorrowDate: z.string().optional(),
//   dayAfterTomorrowDate: z.string().optional(),
//   mainPromptString: z.string().optional(),
//   messages: z.array(ChatMessageSchemaInternal).optional(), 
// });
// Tidak perlu export schema atau flow/tool lagi
// export { ZoyaChatInputSchema, ZoyaChatOutputSchema };
    
  

    

