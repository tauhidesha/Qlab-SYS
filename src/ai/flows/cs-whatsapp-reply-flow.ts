
'use server';
/**
 * @fileOverview Flow AI untuk WhatsApp Customer Service QLAB.
 * Versi ini SANGAT disederhanakan, fokus pada pemanggilan model dasar TANPA tools.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { collection, query as firestoreQuery, where, getDocs, Timestamp, doc, getDoc, limit } from 'firebase/firestore';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';

// Skema internal untuk validasi input chat history di flow
const ChatMessageSchemaInternal = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

// Skema input untuk ZoyaChatFlow - Disederhanakan
const ZoyaChatInputSchema = z.object({
  messages: z.array(ChatMessageSchemaInternal).optional().describe("Riwayat percakapan lengkap, jika ada."),
  customerMessage: z.string().min(1, "Pesan pelanggan tidak boleh kosong.").describe("Pesan terbaru dari customer."),
  senderNumber: z.string().optional().describe("Nomor WhatsApp pengirim (opsional)."),
  mainPromptString: z.string().optional().describe("String prompt utama yang mungkin dikirim dari UI atau diambil dari Firestore."),
  // Field lain yang mungkin masih relevan dari DEFAULT_AI_SETTINGS bisa ditambahkan jika diperlukan
  // misalnya currentDate, currentTime, dll. untuk konteks.
  currentDate: z.string().optional(),
  currentTime: z.string().optional(),
  tomorrowDate: z.string().optional(),
  dayAfterTomorrowDate: z.string().optional(),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>;

// Skema output tetap sama, hanya teks balasan
const ZoyaChatOutputSchema = z.string().describe("Balasan teks dari Zoya.");

// Flow utama Zoya - Sekarang tanpa tools
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
      return "Maaf, Zoya tidak menerima pesan yang jelas.";
    }
    
    // Konteks dinamis bisa tetap dibangun jika diperlukan untuk informasi umum
    let dynamicContext = `INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.`;
    if (!db) {
        console.warn("[CS-FLOW] Firestore DB (db) is not initialized. Some context might be missing.");
        dynamicContext += " WARNING: Database tidak terhubung, info harga detail mungkin tidak akurat.";
    }
    // Anda bisa menambahkan lebih banyak info ke dynamicContext di sini jika perlu, misal jam buka, dll.
    // yang tidak memerlukan tool.
    console.log(`[CS-FLOW] Dynamic context built: ${dynamicContext}`);

    // Siapkan history untuk AI
    const historyForAI = (input.messages || [])
      .filter(msg => msg.content && msg.content.trim() !== '')
      // Jika pesan terakhir ada di input.messages dan sama dengan input.customerMessage,
      // kita mungkin ingin menghapusnya dari history agar tidak duplikat.
      // Tapi untuk sekarang, kita biarkan dulu, atau bisa juga slice input.messages jika input.customerMessage selalu yang terbaru.
      .map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }], 
    }));
    
    // Gabungkan system instruction dengan prompt dari user
    // Pastikan mainPromptString diisi dari input atau default
    const systemInstructionText = (input.mainPromptString || DEFAULT_AI_SETTINGS.mainPrompt)
                                    .replace("{{{customerMessage}}}", lastUserMessageContent) // Pastikan placeholder ini ada di prompt
                                    .replace("{{{dynamicContext}}}", dynamicContext)
                                    .replace("{{#if messages.length}}", input.messages && input.messages.length > 0 ? "" : "{{#if messages.length}}") // Handlebars simple removal if no history
                                    .replace("{{#each messages}}", "")
                                    .replace("{{this.role}}: {{this.content}}", "")
                                    .replace("{{/each}}", "")
                                    .replace("{{/if}}", input.messages && input.messages.length > 0 ? "" : "{{/if}}")
                                    .replace("{{#if senderNumber}}No. HP Pengirim: {{{senderNumber}}}{{/if}}", input.senderNumber ? `No. HP Pengirim: ${input.senderNumber}`: "")
                                    .replace("{{#if currentDate}}Tanggal Hari Ini: {{{currentDate}}} | Waktu: {{{currentTime}}}{{/if}}", input.currentDate ? `Tanggal Hari Ini: ${input.currentDate} | Waktu: ${input.currentTime || ''}` : "")
                                    .replace("{{#if tomorrowDate}}Besok: {{{tomorrowDate}}} | Lusa: {{{dayAfterTomorrowDate}}}{{/if}}", input.tomorrowDate ? `Besok: ${input.tomorrowDate} | Lusa: ${input.dayAfterTomorrowDate || ''}` : "");


    // Pesan yang akan dikirim ke model AI
    // Jika ada history, kirim history + pesan user terakhir yang sudah digabung system instruction
    // Jika tidak ada history, kirim hanya pesan user yang sudah digabung system instruction
    // Model Gemini biasanya mengharapkan pesan user terakhir sebagai penutup untuk dijawab
    
    const messagesForAI = [
      ...historyForAI,
      { role: 'user' as const, content: [{ text: systemInstructionText }] } // System instruction + user message terakhir jadi satu
    ];
    
    // Jika historyForAI KOSONG, dan systemInstructionText SUDAH MENGANDUNG lastUserMessageContent,
    // maka messagesForAI cukup berisi satu elemen user saja.
    // Jika historyForAI ADA, maka systemInstructionText sebaiknya tidak lagi mengandung lastUserMessageContent,
    // dan lastUserMessageContent ditambahkan sebagai pesan user terpisah.

    // Mari kita sederhanakan: prompt utama akan jadi System Prompt, dan pesan user tetap pesan user.
    // Ini cara yang lebih standar.

    const finalSystemPrompt = (input.mainPromptString || DEFAULT_AI_SETTINGS.mainPrompt)
                                .replace("{{{dynamicContext}}}", dynamicContext)
                                // Hapus placeholder lain karena akan masuk ke messages user
                                .replace("{{{customerMessage}}}", "")
                                .replace(/{{#if messages.length}}[\s\S]*?{{\/if}}/g, "") // Hapus blok history handlebars
                                .replace(/{{#if senderNumber}}[\s\S]*?{{\/if}}/g, "")
                                .replace(/{{#if currentDate}}[\s\S]*?{{\/if}}/g, "")
                                .replace(/{{#if tomorrowDate}}[\s\S]*?{{\/if}}/g, "");


    const messagesForModel = [
        ...(input.messages || []).map(m => ({role: m.role, content: [{text: m.content}]})), // history
        {role: 'user' as const, content: [{text: lastUserMessageContent}]} // pesan user terakhir
    ];

    console.log(`[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. History Length: ${(input.messages || []).length}`);
    console.log(`[CS-FLOW] System Prompt being used (simplified): ${finalSystemPrompt.substring(0, 200)}...`);

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: finalSystemPrompt, // Menggunakan parameter prompt untuk instruksi sistem utama
        messages: messagesForModel, // Menggunakan parameter messages untuk history dan pesan user terakhir
        config: { temperature: 0.5 },
        // Tidak ada tools atau toolChoice
      });

      console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));
      
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

  // Logic untuk mengambil mainPrompt dari Firestore jika tidak ada di input
  // Untuk sekarang, kita sederhanakan dan selalu pakai default jika tidak ada di input.
  if (!mainPromptToUse) {
    try {
      // Coba ambil dari Firestore (jika db ada dan mau diimplementasikan)
      if (db) {
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
      } else {
        console.log("[CS-FLOW] generateWhatsAppReply: Firestore (db) not available. Using DEFAULT_AI_SETTINGS.mainPrompt.");
        mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt;
      }
    } catch (error) {
      console.error("[CS-FLOW] generateWhatsAppReply: Error fetching mainPrompt from Firestore. Using default.", error);
      mainPromptToUse = DEFAULT_AI_SETTINGS.mainPrompt;
    }
  } else {
     console.log("[CS-FLOW] generateWhatsAppReply: Using mainPromptString directly from input.");
  }
  
  const flowInput: ZoyaChatInput = {
    ...input,
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
