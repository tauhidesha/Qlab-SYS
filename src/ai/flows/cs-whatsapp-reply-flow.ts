
'use server';
/**
 * @fileOverview Flow AI untuk WhatsApp Customer Service QLAB.
 * Versi ini disederhanakan, fokus pada pemanggilan model dasar dan satu tool.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { db } from '@/lib/firebase'; // Client SDK
import { collection, query as firestoreQuery, where, getDocs, Timestamp, doc, getDoc } from 'firebase/firestore'; // Client SDK functions
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings'; // IMPORT DIPERBARUI

// Skema internal untuk validasi input chat history di flow
const ChatMessageSchemaInternal = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchemaInternal>;


const ZoyaChatInputSchema = z.object({
  messages: z.array(ChatMessageSchemaInternal).optional().describe("Riwayat percakapan lengkap, pesan user terakhir ada di input.customerMessage atau di akhir array ini."),
  customerMessage: z.string().optional().describe("Pesan terbaru dari customer jika tidak termasuk dalam messages. Jika messages ada, ini akan diabaikan dan pesan terakhir dari messages yang dipakai."),
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


const ZoyaChatOutputSchema = z.string().describe("Balasan teks dari Zoya.");


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
      let vehicleQuery = firestoreQuery(
        vehiclesCollectionRef,
        where('aliases', 'array-contains', vehicleModel.toLowerCase()),
        limit(1)
      );
      let vehicleQuerySnapshot = await getDocs(vehicleQuery);

      if (vehicleQuerySnapshot.empty) {
        console.log(`[getServicePriceTool] No alias match for '${vehicleModel.toLowerCase()}'. Trying 'model_lowercase'...`);
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
        console.log(`[getServicePriceTool] Price not found for service '${foundServiceData.name}' with size '${vehicleSize}'.`);
        return { 
          success: false, 
          message: `Harga untuk layanan "${foundServiceData.name}" pada motor ukuran ${vehicleSize} (${vehicleModel}) belum tersedia.`,
          size: vehicleSize,
          estimatedDuration: estimatedDuration
        };
      }

      console.log(`[getServicePriceTool] Success: Found price Rp ${price} for ${serviceName} on ${vehicleModel} (size ${vehicleSize}). Duration: ${estimatedDuration || 'N/A'}`);
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
    
    let dynamicContext = `INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.`;
    if (!db) {
        console.warn("[CS-FLOW] Firestore DB (db) is not initialized. Entity detection and pricing will be skipped in context pre-building.");
        dynamicContext += " WARNING: Database tidak terhubung, info harga mungkin tidak akurat jika tool tidak dipanggil.";
    }
    console.log(`[CS-FLOW] Dynamic context built: ${dynamicContext}`);

    const historyForAI = (input.messages || [])
      .filter(msg => msg.content && msg.content.trim() !== '')
      .slice(0, -1) 
      .map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }], 
    }));
    
    const systemInstructionText = (input.mainPromptString || DEFAULT_AI_SETTINGS.mainPrompt).replace("{{dynamicContext}}", dynamicContext);
    
    const userPromptWithSystemInstruction = `${systemInstructionText}

---

USER_INPUT: "${lastUserMessageContent}"

JAWABAN ZOYA:`; 

    const messagesForAI = [
      ...historyForAI,
      { role: 'user' as const, content: [{ text: userPromptWithSystemInstruction }] }
    ];

    console.log(`[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. History Length: ${historyForAI.length}`);
    
    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        messages: messagesForAI,
        // tools: [getServicePriceTool as any], // Tools temporarily disabled
        // toolChoice: 'auto', // Juga dinonaktifkan
        config: { temperature: 0.5 },
      });

      console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));

      const toolRequest = result.toolRequest();
      if (toolRequest) {
        console.log("[CS-FLOW] AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
        if (toolRequest.tool === 'getServicePrice' && toolRequest.input) {
          const toolResult = await getServicePriceTool.fn(toolRequest.input as z.infer<typeof getServicePriceTool.inputSchema>);
          console.log("[CS-FLOW] Tool execution result:", JSON.stringify(toolResult, null, 2));

          const finalResult = await ai.generate({
            model: 'googleai/gemini-1.5-flash-latest',
            messages: [
              ...messagesForAI, 
              { role: 'model', content: [{ toolRequest }] }, 
              { role: 'tool', content: [{ toolResponse: { tool: 'getServicePrice', output: toolResult } }] } 
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

      const suggestedReply = result.text() || "";

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
  
  let mainPromptToUse = input.mainPromptString; 

  if (!mainPromptToUse) {
    try {
      const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig'); 
      const docSnap = await getDoc(settingsDocRef);
      if (docSnap.exists() && docSnap.data()?.mainPrompt) {
        mainPromptToUse = docSnap.data().mainPrompt;
        console.log("[CS-FLOW] generateWhatsAppReply: Using mainPromptString from Firestore.");
      } else {
        console.log("[CS-FLOW] generateWhatsAppReply: mainPrompt not found in Firestore or is empty. Checking default.");
        mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt; 
        console.log("[CS-FLOW] generateWhatsAppReply: Using DEFAULT_AI_SETTINGS.mainPrompt.");
      }
    } catch (error) {
      console.error("[CS-FLOW] generateWhatsAppReply: Error fetching mainPrompt from Firestore. Using default.", error);
      mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt; 
    }
  } else {
     console.log("[CS-FLOW] generateWhatsAppReply: Using mainPromptString directly from input.");
  }

  const messagesForFlow = input.messages || [];
  const customerMessageForFlow = input.customerMessage || (messagesForFlow.length > 0 ? messagesForFlow[messagesForFlow.length - 1].content : "");
  
  const flowInput: ZoyaChatInput = {
    ...input, 
    messages: messagesForFlow,
    customerMessage: customerMessageForFlow,
    mainPromptString: mainPromptToUse, 
  };


  try {
    const replyText = await zoyaChatFlow(flowInput); 
    return { suggestedReply: replyText };
  } catch (error: any) {
    console.error("[CS-FLOW Wrapper] Error running zoyaChatFlow:", error);
    return { suggestedReply: `Maaf, Zoya sedang ada kendala teknis. (${error.message || 'Tidak diketahui'})` };
  }
}
