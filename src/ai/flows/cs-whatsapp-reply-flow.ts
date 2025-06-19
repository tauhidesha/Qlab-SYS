
'use server';

// import { configureGenkit } from '@genkit-ai/core'; // configureGenkit sebaiknya di file genkit.ts utama
import { ai } from '@/ai/genkit'; // Menggunakan objek 'ai' global dari genkit.ts
// import { defineFlow } from 'genkit'; // DIUBAH: Tidak lagi di-import langsung
import { googleAI } from '@genkit-ai/googleai'; // Pastikan ini sesuai dengan struktur Genkit v1.x
// import { defineTool, type Tool } from 'genkit'; // DIUBAH: Tidak lagi di-import langsung
import * as z from 'zod';

// Firebase Admin SDK untuk koneksi ke Firestore
// Pastikan firebase-admin diinisialisasi di tempat yang benar (misalnya, di firebase-admin.ts dan diimpor)
import { adminDb } from '@/lib/firebase-admin'; // Menggunakan instance adminDb dari firebase-admin.ts

// Skema untuk input dan output Zoya Chat Flow, disesuaikan dengan kebutuhan baru
export const ZoyaChatInputSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })
  ),
  // Tambahkan properti yang mungkin dikirim dari UI, seperti dari WhatsAppReplyInput sebelumnya
  customerMessage: z.string().optional(), // Ini akan jadi input utama ke 'prompt' AI
  senderNumber: z.string().optional(),
  chatHistory: z.array(z.object({ role: z.enum(['user', 'model']), content: z.string() })).optional(), // Sesuaikan schema jika perlu
  agentBehavior: z.string().optional(),
  knowledgeBase: z.string().optional(),
  currentDate: z.string().optional(),
  currentTime: z.string().optional(),
  tomorrowDate: z.string().optional(),
  dayAfterTomorrowDate: z.string().optional(),
  mainPromptString: z.string().optional(),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>;

export const ZoyaChatOutputSchema = z.string(); // Output adalah string balasan


// =================================================================
//  TOOLS: Kemampuan yang bisa digunakan oleh AI
// =================================================================

// Tool untuk mencari harga layanan di Firestore
export const getServicePriceTool = ai.defineTool( // DIUBAH: Menggunakan ai.defineTool
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
    if (!adminDb) {
      console.error("[getServicePriceTool] Firestore Admin DB is not initialized!");
      return { success: false, message: "Database bengkel sedang tidak bisa diakses, Zoya jadi bingung nih." };
    }
    try {
      const vehiclesRef = adminDb.collection('vehicleTypes');
      let vehicleQuerySnapshot = await vehiclesRef
        .where('aliases', 'array-contains', vehicleModel.toLowerCase())
        .limit(1)
        .get();

      if (vehicleQuerySnapshot.empty) {
        vehicleQuerySnapshot = await vehiclesRef.where('model_lowercase', '==', vehicleModel.toLowerCase()).limit(1).get();
      }
      
      if (vehicleQuerySnapshot.empty) {
        return { success: false, message: `Maaf, Zoya belum kenal model motor "${vehicleModel}". Mungkin bisa sebutkan yang lebih umum atau pastikan ejaannya benar?` };
      }

      const vehicleData = vehicleQuerySnapshot.docs[0].data();
      const vehicleSize = vehicleData.size; 
      if (!vehicleSize) {
         return { success: false, message: `Ukuran untuk model motor "${vehicleModel}" tidak ditemukan. Zoya bingung nih.` };
      }
      const firestoreSizeVariant = vehicleSize;

      const servicesRef = adminDb.collection('services');
      const serviceQuerySnapshot = await servicesRef
        .where('name_lowercase', '>=', serviceName.toLowerCase())
        .where('name_lowercase', '<=', serviceName.toLowerCase() + '\uf8ff')
        .get();

      if (serviceQuerySnapshot.empty) {
        return { success: false, message: `Layanan "${serviceName}" sepertinya tidak tersedia.` };
      }
      
      let foundServiceData: any = null;
      let bestMatchScore = -1;

      serviceQuerySnapshot.forEach(doc => {
        const service = doc.data();
        const serviceNameLower = service.name_lowercase || service.name.toLowerCase();
        let score = 0;
        if (serviceNameLower === serviceName.toLowerCase()) {
            score = 100;
        } else if (serviceNameLower.startsWith(serviceName.toLowerCase())) {
            score = 50;
        } else {
            score = 10;
        }

        if (score > bestMatchScore) {
            bestMatchScore = score;
            foundServiceData = service;
        }
      });

      if (!foundServiceData) {
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
        console.error("[getServicePriceTool] Error executing tool:", error);
        return { success: false, message: `Waduh, Zoya lagi pusing nih, ada error pas ngecek harga: ${error.message}` };
    }
  }
);


// =================================================================
//  FLOW: Logika utama chatbot Zoya
// =================================================================

export const zoyaChatFlow = ai.defineFlow( // DIUBAH: Menggunakan ai.defineFlow
  {
    name: 'zoyaChatFlow',
    inputSchema: ZoyaChatInputSchema,
    outputSchema: ZoyaChatOutputSchema,
  },
  async (input) => { // input sekarang bertipe ZoyaChatInput
    
    // Ambil pesan terakhir dari input.messages ATAU dari input.customerMessage jika input.messages kosong
    const lastUserMessageContent = input.messages && input.messages.length > 0 
                                  ? input.messages[input.messages.length - 1].content 
                                  : input.customerMessage;

    if (!lastUserMessageContent || lastUserMessageContent.trim() === '') {
      console.warn("[CS-FLOW] No valid last user message content. Returning empty reply.");
      return ""; // Atau throw error jika diperlukan
    }
    const lastMessageLowerCase = lastUserMessageContent.toLowerCase();
    
    let vehicleModel: string | null = null;
    let serviceName: string | null = null;
    let dynamicContext = `INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.`;

    if (adminDb) { 
      try {
          const modelsSnapshot = await adminDb.collection('vehicleTypes').get();
          for (const doc of modelsSnapshot.docs) {
              const modelData = doc.data();
              const modelAliases = (modelData.aliases as string[] || []).map(a => a.toLowerCase());
              const originalModelName = modelData.model as string;
              if (modelAliases.some(alias => lastMessageLowerCase.includes(alias)) || lastMessageLowerCase.includes(originalModelName.toLowerCase())) {
                  vehicleModel = originalModelName;
                  break;
              }
          }

          const servicesSnapshot = await adminDb.collection('services').get();
          for (const doc of servicesSnapshot.docs) {
              const serviceData = doc.data();
              const serviceAliases = (serviceData.aliases as string[] || []).map(a => a.toLowerCase());
              const originalServiceName = serviceData.name as string;
              if (serviceAliases.some(alias => lastMessageLowerCase.includes(alias)) || lastMessageLowerCase.includes(originalServiceName.toLowerCase())) {
                  serviceName = originalServiceName;
                  break;
              }
          }
      } catch (dbError) {
          console.error("[CS-FLOW] Error during Firestore entity detection:", dbError);
          dynamicContext += " WARNING: Gagal mengambil data detail dari database.";
      }
    } else {
        console.warn("[CS-FLOW] Firestore Admin DB (adminDb) is not initialized. Entity detection and pricing will be skipped.");
        dynamicContext += " WARNING: Database tidak terhubung, info harga mungkin tidak akurat.";
    }

    if (vehicleModel && serviceName) {
      const priceResult = await getServicePriceTool({ vehicleModel, serviceName });
      if (serviceName.toLowerCase().includes('full detailing') && lastMessageLowerCase.includes('doff')) {
          dynamicContext = `VALIDATION_ERROR: Full Detailing tidak bisa untuk motor doff (motor terdeteksi: ${vehicleModel}, layanan diminta: ${serviceName}). Tawarkan Coating Doff sebagai alternatif.`;
      } else {
          dynamicContext = `DATA_PRODUK: ${priceResult.message || 'Info harga belum tersedia, mohon tanyakan detail lebih lanjut.'}`;
      }
    } else if (vehicleModel) {
        dynamicContext = `INFO_MOTOR_TERDETEKSI: ${vehicleModel}. Tanyakan layanan apa yang diinginkan.`;
    } else if (serviceName) {
        dynamicContext = `INFO_LAYANAN_TERDETEKSI: ${serviceName}. Tanyakan jenis motornya apa untuk estimasi harga.`;
    }
    console.log("[CS-FLOW] Dynamic context built:", dynamicContext);
    
    const systemInstruction = input.mainPromptString ? 
      input.mainPromptString.replace("{{dynamicContext}}", dynamicContext) : 
      DEFAULT_AI_SETTINGS.mainPrompt.replace("{{dynamicContext}}", dynamicContext);

    const historyForAI = (input.messages || []) // Gunakan input.messages untuk histori jika ada
      .slice(0, -1) // Semua kecuali pesan terakhir
      .filter(msg => msg.content && msg.content.trim() !== '') 
      .map((msg) => ({
        role: msg.role, 
        parts: [{ text: msg.content }],
    }));
    
    const userPromptWithSystemInstruction = `${systemInstruction}

---

USER_INPUT: "${lastUserMessageContent}"

JAWABAN ZOYA:`;

    console.log("[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. History:", historyForAI);
    // console.log("[CS-FLOW] Full Prompt being sent:", userPromptWithSystemInstruction); // Log full prompt bisa sangat panjang

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        history: historyForAI,
        prompt: userPromptWithSystemInstruction, // Prompt lengkap dengan instruksi sistem
        tools: [getServicePriceTool as any], // Pastikan tool dikenali
        toolChoice: 'auto',
        config: { temperature: 0.5 },
        // Hapus safetySettings untuk sementara guna troubleshooting, bisa ditambahkan lagi nanti jika perlu
      });

      console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));

      const firstCandidate = result?.candidates?.[0];
      const finishReason = result.finishReason; // Ambil dari level atas
      const safetyRatings = result.safetyRatings; // Ambil dari level atas

      console.log(`[CS-FLOW] AI Finish Reason: ${finishReason}`);
      if (safetyRatings && safetyRatings.length > 0) {
        console.log('[CS-FLOW] AI Safety Ratings:', JSON.stringify(safetyRatings, null, 2));
      }

      const suggestedReply = firstCandidate?.message?.content?.[0]?.text || "";

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
        console.error("[CS-FLOW] ❌ Critical error dalam flow whatsAppReplyFlowSimplified:", flowError);
        if (flowError.cause) {
            console.error("[CS-FLOW] Error Cause:", JSON.stringify(flowError.cause, null, 2));
        }
        return `Waduh, Zoya lagi error nih, boskuu. Coba tanya lagi nanti ya. (Pesan Error: ${flowError.message || 'Kesalahan internal tidak diketahui'})`;
    }
  }
);

// Fungsi wrapper, pastikan input-nya sesuai dengan ZoyaChatInputSchema
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<{ suggestedReply: string }> {
  // Mapping dari ZoyaChatInput ke format yang diharapkan oleh zoyaChatFlow (jika ada perbedaan)
  // Untuk saat ini, kita asumsikan ZoyaChatInput sudah cukup mirip atau bisa langsung dipakai.
  // Jika zoyaChatFlow hanya butuh 'messages', kita bisa mapping:
  // const flowInput = { messages: input.chatHistory ? [...input.chatHistory, {role: 'user', content: input.customerMessage}] : [{role: 'user', content: input.customerMessage}]};
  // Tapi karena zoyaChatFlow sudah dimodifikasi untuk ZoyaChatInput, kita bisa pass langsung.

  try {
    const replyText = await zoyaChatFlow(input);
    return { suggestedReply: replyText };
  } catch (error: any) {
    console.error("[CS-FLOW Wrapper] Error running zoyaChatFlow:", error);
    return { suggestedReply: `Maaf, Zoya sedang ada kendala teknis. (${error.message || 'Tidak diketahui'})` };
  }
}

// DEFAULT_AI_SETTINGS (mainPrompt perlu di-define di sini jika tidak di-pass dari UI/input)
// Ini akan dipakai jika input.mainPromptString tidak ada.
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
1.  Jika user menanyakan harga, SELALU GUNAKAN 'getServicePrice' tool. Jangan menebak harga.
2.  Layanan "Full Detailing" HANYA TERSEDIA untuk motor dengan cat GLOSSY. Jika user bertanya untuk motor DOFF, tolak dengan sopan dan tawarkan layanan lain (misal: "Premium Wash" atau "Coating Doff").
3.  Harga "Coating" untuk motor DOFF dan GLOSSY itu BERBEDA. Pastikan tool mengambil data yang benar (cek field 'size' dari output tool).
4.  Motor Gede (Moge) seperti Harley, atau motor 250cc ke atas otomatis masuk ukuran "XL". Tool 'getServicePrice' sudah memperhitungkan ini jika model motornya dikenali.

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

    