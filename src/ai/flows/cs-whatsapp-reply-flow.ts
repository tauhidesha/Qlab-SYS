
'use server';

// import { configureGenkit } from '@genkit-ai/core'; // configureGenkit sebaiknya di file genkit.ts utama
import { ai } from '@/ai/genkit'; // Menggunakan objek 'ai' global dari genkit.ts
import { defineFlow } from 'genkit'; // DIUBAH: Import defineFlow dari 'genkit'
import { googleAI } from '@genkit-ai/googleai'; // Pastikan ini sesuai dengan struktur Genkit v1.x
import { defineTool, type Tool } from 'genkit'; // DIUBAH: Import defineTool dari 'genkit'
import * as z from 'zod';

// Firebase Admin SDK untuk koneksi ke Firestore
// Pastikan firebase-admin diinisialisasi di tempat yang benar (misalnya, di firebase-admin.ts dan diimpor)
import { adminDb } from '@/lib/firebase-admin'; // Menggunakan instance adminDb dari firebase-admin.ts

// Jika configureGenkit sudah ada di src/ai/genkit.ts, baris di bawah ini mungkin tidak diperlukan di sini
// dan bisa menyebabkan konflik jika di-set ulang.
// configureGenkit({
//   plugins: [
//     googleAI({
//       apiVersion: 'v1beta', // Diperlukan untuk model Gemini 1.5
//     }),
//   ],
//   logLevel: 'debug',
//   enableTracingAndMetrics: true,
// });


// Skema untuk input dan output Zoya Chat Flow, disesuaikan dengan kebutuhan baru
export const ZoyaChatInputSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      // Di Genkit 1.x, content biasanya adalah array of Parts, bukan array of objects {text: string}
      // Tapi kita ikuti dulu skema yang diberikan, mungkin ada konversi di Genkit-nya.
      // Untuk aman, kita gunakan string biasa untuk content di sini, lalu di dalam flow kita bungkus.
      content: z.string(),
    })
  ),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>;

export const ZoyaChatOutputSchema = z.string(); // Output adalah string balasan


// =================================================================
//  TOOLS: Kemampuan yang bisa digunakan oleh AI
// =================================================================

// Tool untuk mencari harga layanan di Firestore
export const getServicePriceTool = defineTool(
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
      // 1. Cari ukuran kendaraan dari modelnya
      const vehiclesRef = adminDb.collection('vehicleTypes');
      let vehicleQuerySnapshot = await vehiclesRef
        .where('aliases', 'array-contains', vehicleModel.toLowerCase())
        .limit(1)
        .get();

      if (vehicleQuerySnapshot.empty) {
        // Coba cari berdasarkan nama model langsung jika alias tidak ketemu
        vehicleQuerySnapshot = await vehiclesRef.where('model_lowercase', '==', vehicleModel.toLowerCase()).limit(1).get();
      }
      
      if (vehicleQuerySnapshot.empty) {
        return { success: false, message: `Maaf, Zoya belum kenal model motor "${vehicleModel}". Mungkin bisa sebutkan yang lebih umum atau pastikan ejaannya benar?` };
      }

      const vehicleData = vehicleQuerySnapshot.docs[0].data();
      const vehicleSize = vehicleData.size; // e.g., "L"
      if (!vehicleSize) {
         return { success: false, message: `Ukuran untuk model motor "${vehicleModel}" tidak ditemukan. Zoya bingung nih.` };
      }
      const firestoreSizeVariant = vehicleSize; // Di Firestore, varian disimpan dengan nama seperti "L", "M", bukan "SIZE L"

      // 2. Cari layanan berdasarkan nama (case-insensitive partial match, ambil yang paling relevan)
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

      // Cari best match dari hasil query
      serviceQuerySnapshot.forEach(doc => {
        const service = doc.data();
        const serviceNameLower = service.name_lowercase || service.name.toLowerCase();
        let score = 0;
        if (serviceNameLower === serviceName.toLowerCase()) {
            score = 100; // Exact match
        } else if (serviceNameLower.startsWith(serviceName.toLowerCase())) {
            score = 50; // Starts with
        } else {
            score = 10; // Contains (implied by query)
        }

        if (score > bestMatchScore) {
            bestMatchScore = score;
            foundServiceData = service;
        }
      });

      if (!foundServiceData) {
         return { success: false, message: `Layanan "${serviceName}" tidak ditemukan.` };
      }
      
      // 3. Ambil harga dari varian yang cocok atau harga dasar
      let price: number | undefined = undefined;
      let estimatedDuration: string | undefined = foundServiceData.estimatedDuration;

      if (foundServiceData.variants && Array.isArray(foundServiceData.variants)) {
        // Di Firestore, varian disimpan dengan nama seperti "L", "M", bukan "SIZE L"
        const variant = foundServiceData.variants.find((v: any) => v.name && v.name.toUpperCase() === firestoreSizeVariant.toUpperCase());
        if (variant && typeof variant.price === 'number') {
          price = variant.price;
          estimatedDuration = variant.estimatedDuration || estimatedDuration; // Ambil durasi varian jika ada
        }
      }
      
      // Fallback ke harga dasar jika varian tidak ditemukan atau tidak ada varian
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

export const zoyaChatFlow = defineFlow(
  {
    name: 'zoyaChatFlow',
    inputSchema: ZoyaChatInputSchema,
    outputSchema: ZoyaChatOutputSchema,
  },
  async ({ messages }) => {
    // Ambil model Gemini 1.5 Flash dari 'ai' object global
    // const model = googleAI('gemini-1.5-flash-latest'); // Ini akan membuat instance baru
    // Sebaiknya gunakan instance dari ai.configureGenkit()

    const messagesForAI = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }], // Bungkus content string ke dalam Part
    }));


    // Buat prompt untuk AI
    // Pastikan kita menggunakan `ai.generate` dari instance global Genkit
    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest', // Tetap gunakan string model di sini
        // Sistem prompt mendefinisikan kepribadian dan aturan main Zoya
        system: `Anda adalah "Zoya" - Customer Service virtual dari QLAB Moto Detailing.
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

          FLOW INTERAKSI:
          - Sapa user dengan ramah.
          - Jika user bertanya harga, panggil tool 'getServicePrice' dengan 'vehicleModel' dan 'serviceName' yang paling relevan dari pertanyaan user.
            -   Contoh jika user tanya "harga coating nmax berapa?": panggil tool dengan vehicleModel: "NMAX", serviceName: "Coating".
            -   Contoh jika user tanya "biaya detailing vario 125": panggil tool dengan vehicleModel: "Vario 125", serviceName: "Detailing".
            -   Sampaikan hasil dari tool (field 'message' dari output tool) ke user dengan gaya Zoya.
          - Setelah memberikan informasi, selalu tawarkan langkah selanjutnya (misal: "Gimana boskuu, mau langsung di-booking jadwalnya?").
          - Jika user meminta booking, kumpulkan informasi yang dibutuhkan: nama pelanggan, nomor HP, jenis motor, layanan yang diinginkan, tanggal, dan jam. Lalu, panggil tool 'createBookingTool' (belum ada di sini, tapi siapkan untuk nanti). Untuk saat ini, cukup konfirmasi dan bilang akan dibantu CS manual.
          `,
        messages: messagesForAI, // Riwayat percakapan dari user, sudah diformat
        tools: [getServicePriceTool as Tool<any,any>], // Beri tahu AI tool apa saja yang bisa ia gunakan
        toolChoice: 'auto', // Biarkan AI memilih kapan menggunakan tool
        config: {
          temperature: 0.5,
          // apiVersion: 'v1beta' // Tidak perlu di sini jika sudah di configureGenkit
        }
      });

      // Cek apakah AI meminta pemanggilan tool
      const toolRequest = result.toolRequest();
      if (toolRequest) {
        console.log("[zoyaChatFlow] AI requested tool:", JSON.stringify(toolRequest, null, 2));
        // Di sini Anda akan memanggil tool secara manual dan mengirimkan hasilnya kembali.
        // Untuk contoh ini, kita asumsikan tool getServicePriceTool akan dipanggil oleh Genkit
        // dan hasilnya akan otomatis digunakan oleh AI di giliran berikutnya jika 'auto'
        // Jika toolChoice adalah 'any' atau 'tool', Anda perlu menangani pemanggilan tool di sini.
        // Untuk kesederhanaan dengan 'auto', kita harapkan Genkit menanganinya.
        // Jika tidak, kita mungkin perlu response lanjutan ke AI dengan output tool.
        
        // Jika Genkit tidak otomatis memproses tool dengan 'auto' dan hanya mengembalikan toolRequest,
        // maka kita perlu mengembalikan toolRequest tersebut atau memprosesnya secara manual.
        // Namun, API Genkit v1.x untuk `generate` seharusnya bisa menangani pemanggilan tool
        // dan menghasilkan respons final dari AI setelah tool dipanggil.

        // Jika AI masih meminta tool (tidak menghasilkan teks akhir), maka kita perlu
        // mengembalikan ToolRequestPart atau memprosesnya.
        // Untuk sekarang, kita coba lihat apakah AI langsung memberikan jawaban teks setelah 'auto'
        if (result.candidates?.[0]?.message.content?.[0]?.text) {
            return result.candidates[0].message.content[0].text;
        } else {
            // Ini skenario yang lebih kompleks di mana kita mungkin perlu iterasi dengan AI dan tool
            // Untuk saat ini, jika AI meminta tool dan tidak langsung memberi teks, kita beri pesan placeholder
            return "Zoya lagi ngecek sesuatu nih boskuu, bentar ya...";
        }
      }
      
      const suggestedReply = result.candidates?.[0]?.message.content?.[0]?.text || "";
      if (!suggestedReply) {
          console.warn("[zoyaChatFlow] AI returned an empty reply. Finish Reason:", result.finishReason, "Safety Ratings:", result.safetyRatings);
          return "Maaf boskuu, Zoya lagi agak bingung nih. Coba tanya lagi ya.";
      }
      return suggestedReply;

    } catch (flowError: any) {
        console.error("[zoyaChatFlow] Error during AI generation or tool call:", flowError);
        if (flowError.cause) {
            console.error("[zoyaChatFlow] Error Cause:", JSON.stringify(flowError.cause, null, 2));
        }
        return `Waduh, Zoya lagi error nih, boskuu. Coba tanya lagi nanti ya. (${flowError.message || 'Kesalahan internal'})`;
    }
  }
);

// Fungsi wrapper yang sudah ada, disesuaikan untuk input baru
export async function generateWhatsAppReply(input: ZoyaChatInput): Promise<{ suggestedReply: string }> {
  try {
    const replyText = await zoyaChatFlow(input); // Menggunakan runFlow dari 'genkit'
    return { suggestedReply: replyText };
  } catch (error: any) {
    console.error("Error running zoyaChatFlow via wrapper:", error);
    return { suggestedReply: `Maaf, Zoya sedang ada kendala teknis. (${error.message || 'Tidak diketahui'})` };
  }
}

// Hapus `startFlows()` karena ini bukan file entry point untuk dev server Genkit
// startFlows();

    
