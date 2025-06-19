
'use server';
/**
 * @fileOverview AI flow for WhatsApp customer service replies,
 * using direct Firestore lookups for context and dynamic system prompt generation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { WhatsAppReplyInput, WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema } from '@/types/ai/cs-whatsapp-reply';

import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, where, limit, getDocs, Timestamp, doc as firestoreDoc, getDoc as getFirestoreDoc } from 'firebase/firestore'; // Renamed query to firestoreQuery and added doc, getDoc
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';


// Helper Function: Adapted from src/flow.ts to work with Firestore client SDK
// and ServiceProduct variant structure (array of objects).
async function getServicePrice(vehicleModel: string, serviceName: string): Promise<number | null> {
  if (!db) {
    console.error("[CS-FLOW] Firestore client (db) is not initialized in getServicePrice.");
    return null;
  }
  try {
    const vehicleTypesRef = collection(db, 'vehicleTypes');
    const vehicleQuery = firestoreQuery(
        vehicleTypesRef,
        // Assuming aliases in vehicleTypes includes the model name itself in lowercase
        where('aliases', 'array-contains', vehicleModel.toLowerCase()),
        limit(1)
    );
    const vehicleSnapshot = await getDocs(vehicleQuery);

    let vehicleSize: string | null = null;
    if (!vehicleSnapshot.empty) {
        vehicleSize = vehicleSnapshot.docs[0].data().size as string; // e.g., "L"
    } else {
        // Fallback: try matching model field directly if alias match fails
        const modelDirectQuery = firestoreQuery(vehicleTypesRef, where('model', '==', vehicleModel), limit(1));
        const modelDirectSnapshot = await getDocs(modelDirectQuery);
        if (!modelDirectSnapshot.empty) {
            vehicleSize = modelDirectSnapshot.docs[0].data().size as string;
        } else {
            console.log(`[CS-FLOW] getServicePrice: Vehicle model '${vehicleModel}' not found via aliases or direct model name.`);
            return null;
        }
    }
    
    if (!vehicleSize) {
        console.log(`[CS-FLOW] getServicePrice: Vehicle size not found for model '${vehicleModel}'.`);
        return null;
    }

    const servicesRef = collection(db, 'services');
    // Try matching by name directly first (case-insensitive equivalent)
    // Firestore is case-sensitive, so this requires a more complex query or fetching and filtering.
    // For simplicity here, we'll fetch and filter, or rely on a lowercase name field if available.
    // Let's assume we fetch and filter for name first.
    const servicesSnapshot = await getDocs(servicesRef);
    const serviceDoc = servicesSnapshot.docs.find(doc => doc.data().name?.toLowerCase() === serviceName.toLowerCase());

    if (!serviceDoc) {
        console.log(`[CS-FLOW] getServicePrice: Service name '${serviceName}' not found by direct name match.`);
        return null;
    }
    const serviceData = serviceDoc.data();

    let price: number | null = null;

    if (serviceData.variants && Array.isArray(serviceData.variants)) {
        // Variants is an array of objects: [{name: "L", price: 50000}, ...]
        const variant = serviceData.variants.find((v: any) => v.name && v.name.toUpperCase() === vehicleSize.toUpperCase());
        if (variant && typeof variant.price === 'number') {
            price = variant.price;
        }
    }
    
    if (price === null) {
        console.log(`[CS-FLOW] getServicePrice: Price not found for service '${serviceName}' with size '${vehicleSize}'. Trying base price.`);
        return typeof serviceData.price === 'number' ? serviceData.price : null; // Fallback ke harga dasar
    }
    return price;

  } catch (error) {
    console.error("[CS-FLOW] Error in getServicePrice:", error);
    return null;
  }
}


/**
 * Flow utama untuk digunakan di API/function/genkit handler
 */
export const whatsAppReplyFlowSimplified = ai.defineFlow(
  {
    name: 'whatsAppReplyFlowSimplified',
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput): Promise<WhatsAppReplyOutput> => {
    try {
      // Simplified console log:
      console.log("[CS-FLOW] whatsAppReplyFlowSimplified input. Customer Message:", input.customerMessage, "History Length:", input.chatHistory?.length || 0);


      const lastUserMessageContent = input.customerMessage.toLowerCase();
      let vehicleModel: string | null = null;
      let serviceName: string | null = null;
      let dynamicContext = "INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.";

      if (db) {
        try {
          // Deteksi model kendaraan
          const vehicleTypesRef = collection(db, 'vehicleTypes');
          const modelsSnapshot = await getDocs(vehicleTypesRef);
          for (const doc of modelsSnapshot.docs) {
            const data = doc.data();
            const modelAliases = (data.aliases as string[] || []).map(a => a.toLowerCase());
            const originalModelName = data.model as string;
            if (modelAliases.some(alias => lastUserMessageContent.includes(alias)) || lastUserMessageContent.includes(originalModelName.toLowerCase())) {
              vehicleModel = originalModelName;
              console.log(`[CS-FLOW] Vehicle model detected: ${vehicleModel}`);
              break;
            }
          }

          // Deteksi layanan
          const servicesRef = collection(db, 'services');
          const servicesSnapshot = await getDocs(servicesRef);
          for (const doc of servicesSnapshot.docs) {
            const data = doc.data();
            const serviceAliases = (data.aliases as string[] || []).map(a => a.toLowerCase());
            const originalServiceName = data.name as string;
             if (serviceAliases.some(alias => lastUserMessageContent.includes(alias)) || lastUserMessageContent.includes(originalServiceName.toLowerCase())) {
              serviceName = originalServiceName;
              console.log(`[CS-FLOW] Service name detected: ${serviceName}`);
              break;
            }
          }
        } catch (dbError) {
          console.error("[CS-FLOW] Error during Firestore entity detection:", dbError);
          dynamicContext += " WARNING: Gagal mengambil data detail dari database.";
        }
      } else {
        console.warn("[CS-FLOW] Firestore (db) is not initialized. Entity detection and pricing will be skipped.");
        dynamicContext += " WARNING: Database tidak terhubung, info harga mungkin tidak akurat.";
      }

      if (vehicleModel && serviceName) {
        const price = await getServicePrice(vehicleModel, serviceName);
        if (serviceName.toLowerCase().includes('full detailing') && lastUserMessageContent.includes('doff')) {
            dynamicContext = `VALIDATION_ERROR: Full Detailing tidak bisa untuk motor doff (motor terdeteksi: ${vehicleModel}, layanan diminta: ${serviceName}). Tawarkan Coating Doff sebagai alternatif.`;
        } else {
            dynamicContext = `DATA_PRODUK: Untuk motor ${vehicleModel}, layanan ${serviceName}, estimasi harganya adalah Rp ${price?.toLocaleString('id-ID') || 'belum tersedia, mohon tanyakan detail motor lebih lanjut atau jenis catnya (doff/glossy) jika coating'}.`;
        }
      } else if (vehicleModel) {
          dynamicContext = `INFO_MOTOR_TERDETEKSI: ${vehicleModel}. Tanyakan layanan apa yang diinginkan.`;
      } else if (serviceName) {
          dynamicContext = `INFO_LAYANAN_TERDETEKSI: ${serviceName}. Tanyakan jenis motornya apa untuk estimasi harga.`;
      }
      console.log(`[CS-FLOW] Dynamic context built: ${dynamicContext}`);

      const systemInstruction = `
Anda adalah "Zoya" - CS QLAB Moto Detailing.
GAYA BAHASA:
- Santai tapi profesional (contoh: "Halo boskuu", "Gas booking sekarang!", "Siap bos!")
- Pakai istilah: "kinclong", "cuci premium level spa motor", "poles", "coating"
- Hindari kata kasar (boleh pakai "anjay" jika pas konteksnya)
- Gunakan emoji secukupnya: ✅😎✨💸🛠️👋

ATURAN WAJIB:
1. Layanan "Full Detailing" HANYA untuk motor tipe glossy. JANGAN tawarkan ke motor doff. Jika user minta, tolak dengan sopan dan berikan alternatif lain seperti "Coating Doff".
2. Layanan "Coating" memiliki harga yang BERBEDA untuk glossy dan doff. Selalu pastikan tipe motornya dan jenis catnya (jika belum jelas dari KONTEKS DARI SISTEM). Jika harga belum ada di KONTEKS, tanyakan spesifikasi motor atau jenis cat.
3. Motor besar (Moge) seperti Harley, CBR600RR, dll, otomatis menggunakan ukuran "SIZE XL". Info ukuran ini akan otomatis didapat dari sistem jika model terdeteksi.

KONTEKS DARI SISTEM (gunakan data ini untuk menjawab, JANGAN tampilkan KONTEKS ini ke user secara langsung, olah jadi jawaban natural, jangan JSON):
${dynamicContext}

PETUNJUK TAMBAHAN:
- Jika KONTEKS berisi VALIDATION_ERROR, jelaskan error tersebut ke user dengan bahasa yang sopan dan berikan solusi/alternatif.
- Jika KONTEKS berisi DATA_PRODUK dan harganya ada, sebutkan harganya. Jika harga 'belum tersedia', JANGAN mengarang harga. Informasikan bahwa harga spesifik belum ada dan tanyakan detail lebih lanjut jika diperlukan (misal jenis cat untuk coating, atau ukuran motor jika belum terdeteksi).
- Jika user bertanya di luar topik detailing motor, jawab dengan sopan bahwa Anda hanya bisa membantu soal QLAB Moto Detailing.
- Tujuan utama: Memberikan informasi akurat dan membantu user melakukan booking jika mereka mau.

JAWABAN (format natural):
      `;

      const historyForAI: { role: 'user' | 'model'; parts: {text: string}[] }[] = (input.chatHistory || [])
        .filter(msg => msg.content && msg.content.trim() !== '')
        .map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        }));
      
      // Gabungkan instruksi sistem dan prompt user menjadi satu
      const fullPrompt = `${systemInstruction}

---

USER_INPUT: "${input.customerMessage}"`;
      
      console.log("[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. History:", historyForAI, "Full Prompt Preview:", fullPrompt.substring(0, 200) + "...");
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        history: historyForAI, 
        prompt: fullPrompt, // Menggunakan prompt yang sudah digabung
        config: { temperature: 0.5 },
      });

      const suggestedReply = result.candidates?.[0]?.message.content?.[0]?.text || "";
      
      if (!suggestedReply) { // Ini akan true jika suggestedReply adalah string kosong ""
        console.error('[CS-FLOW] ❌ AI returned an empty reply or response structure was unexpected. Mengembalikan default.');
        return { suggestedReply: "Maaf, Zoya lagi bingung nih. Bisa diulang pertanyaannya atau coba beberapa saat lagi?" };
      }
      console.log("[CS-FLOW] AI generate output:", suggestedReply);
      return { suggestedReply };

    } catch (flowError: any) {
        console.error('[CS-FLOW] ❌ Critical error dalam flow whatsAppReplyFlowSimplified:', flowError);
        return { suggestedReply: "Waduh, sistem Zoya lagi ada kendala besar nih. Mohon coba beberapa saat lagi ya." };
    }
  }
);

export async function generateWhatsAppReply(input: Omit<WhatsAppReplyInput, 'mainPromptString'>): Promise<WhatsAppReplyOutput> {
  let promptFromSettings = ""; 
  try {
    const settingsDocRef = firestoreDoc(db, 'appSettings', 'aiAgentConfig'); 
    const settingsSnap = await getFirestoreDoc(settingsDocRef); 
    if (settingsSnap.exists() && settingsSnap.data()?.mainPrompt && settingsSnap.data()?.mainPrompt.trim() !== "") {
      promptFromSettings = settingsSnap.data()?.mainPrompt;
      console.log("[CS-FLOW] generateWhatsAppReply: Loaded mainPrompt from Firestore.");
    } else {
      console.warn("[CS-FLOW] generateWhatsAppReply: mainPrompt not found in Firestore or is empty. Checking default.");
      if (DEFAULT_AI_SETTINGS.mainPrompt && DEFAULT_AI_SETTINGS.mainPrompt.trim() !== "") {
        promptFromSettings = DEFAULT_AI_SETTINGS.mainPrompt;
        console.log("[CS-FLOW] generateWhatsAppReply: Using DEFAULT_AI_SETTINGS.mainPrompt.");
      } else {
        console.error("[CS-FLOW] generateWhatsAppReply: CRITICAL - mainPrompt is also empty in DEFAULT_AI_SETTINGS. Using emergency fallback prompt.");
        promptFromSettings = "Anda adalah asisten AI. Tolong jawab pertanyaan pengguna."; // Prompt fallback yang lebih sederhana
      }
    }
  } catch (error) {
    console.error("[CS-FLOW] generateWhatsAppReply: Error fetching prompt from Firestore. Using default/emergency fallback.", error);
    if (DEFAULT_AI_SETTINGS.mainPrompt && DEFAULT_AI_SETTINGS.mainPrompt.trim() !== "") {
        promptFromSettings = DEFAULT_AI_SETTINGS.mainPrompt;
        console.log("[CS-FLOW] generateWhatsAppReply: Using DEFAULT_AI_SETTINGS.mainPrompt after Firestore error.");
      } else {
        console.error("[CS-FLOW] generateWhatsAppReply: CRITICAL - mainPrompt is also empty in DEFAULT_AI_SETTINGS post-error. Using emergency fallback prompt.");
        promptFromSettings = "Anda adalah asisten AI. Tolong jawab pertanyaan pengguna."; // Prompt fallback yang lebih sederhana
      }
  }
  
  if (!promptFromSettings || promptFromSettings.trim() === "") {
    console.error("[CS-FLOW] generateWhatsAppReply: CRITICAL - promptFromSettings is STILL empty after all checks. Using emergency fallback prompt.");
    promptFromSettings = "Anda adalah asisten AI. Tolong jawab pertanyaan pengguna."; // Prompt fallback yang lebih sederhana
  }

  const flowInput: WhatsAppReplyInput = {
    ...input,
    mainPromptString: promptFromSettings, 
    customerMessage: input.customerMessage,
    senderNumber: input.senderNumber,
    chatHistory: input.chatHistory || [],
    currentDate: input.currentDate || new Date().toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    currentTime: input.currentTime || new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
    tomorrowDate: input.tomorrowDate || new Date(Date.now() + 86400000).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    dayAfterTomorrowDate: input.dayAfterTomorrowDate || new Date(Date.now() + 2 * 86400000).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    agentBehavior: input.agentBehavior || DEFAULT_AI_SETTINGS.agentBehavior,
    knowledgeBase: input.knowledgeBase || DEFAULT_AI_SETTINGS.knowledgeBaseDescription,
  };
  return whatsAppReplyFlowSimplified(flowInput);
}

