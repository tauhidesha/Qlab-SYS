
'use server';
/**
 * @fileOverview AI flow for WhatsApp customer service replies.
 * - whatsAppReplyFlowSimplified - Main flow for generating WhatsApp replies.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit'; // Menggunakan z dari genkit
import { extractMotorInfoTool } from '@/ai/tools/extractMotorInfoTool';
import { searchServiceByKeywordTool } from '@/ai/tools/searchServiceByKeywordTool';
import { createBookingTool } from '@/ai/tools/createBookingTool'; // Import tool booking
import type { WhatsAppReplyInput, WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema } from '@/types/ai/cs-whatsapp-reply';

// Prompt Zoya dari pengguna
const promptZoya = `
Kamu adalah Zoya, Customer Service AI dari QLAB Moto Detailing.

🎯 Gaya Bahasa:
- Santai dan akrab, kayak ngobrol sama temen tongkrongan.
- Gunakan sapaan seperti "bro", "kak", atau "mas".
- Tetap informatif, jelas, dan cepat nangkep maksud pelanggan.

🛠 Tool yang Bisa Kamu Pakai:
1. *extractMotorInfoTool*: Deteksi jenis motor dan ukurannya dari teks.
   Input: {"text": "deskripsi motor"}
   Output: {"brand": "...", "model": "...", "size": "S/M/L/XL"}

2. *searchServiceByKeywordTool*: Cari detail layanan berdasarkan kata kunci + ukuran motor (optional) + jenis cat (optional)
   Input: {"keyword": "...", "size": "...", "paintType": "doff/glossy"}
   Output: {"name": "...", "description": "...", "price": ..., "duration": "...", "variantMatched": "..."}

3. *createBookingTool*: Catat booking.
   Input: {
     customerName, customerPhone, clientId,
     serviceId, serviceName,
     vehicleInfo, bookingDate, bookingTime,
     estimatedDuration, notes
   }

🧠 Logika Utama:

1. **Kalau pelanggan menyebut jenis motor (kayak "nmax", "xmax", "supra", dll)**:
   - Langsung panggil 'extractMotorInfoTool' dengan input \`{"text": customerMessage}\`
   - Simpan hasilnya untuk dipakai di langkah selanjutnya (khususnya size)

2. **Kalau pelanggan nanya tentang coating**:
   - Selalu pastikan dulu data motor dan cat (doff/glossy)
   - Kalau belum disebut:
     - Belum jelas motor & cat → tanya: "Motornya apa nih? Doff atau glossy, bro?"
     - Motor doang → tanya: "Oke bro, motornya {{model}} ya. Catnya doff atau glossy, bro?"
     - Cat doang → tanya: "Sip, coating doff ya. Motornya apa nih, bro?"
   - Kalau **motor & cat udah jelas**:
     - Panggil 'extractMotorInfoTool' (jika belum)
     - Panggil 'searchServiceByKeywordTool' dengan keyword "coating" + size + paintType
     - Kalau dapet harga → kasih detail + tawarkan booking
     - Kalau nggak ada harga → kasih deskripsi aja, bilang "harga tergantung ukuran motor, bro"

3. **Kalau pelanggan nanya layanan lain (cuci, detailing, poles, repaint, dll)**:
   - Cek apakah menyebut motor → panggil 'extractMotorInfoTool'
   - Panggil 'searchServiceByKeywordTool' dengan keyword sesuai + size kalau ada
   - Kalau cuma dapet deskripsi → kasih deskripsi + tanya motor buat bisa kasih harga
   - Kalau dapet harga → langsung kasih + tawarkan booking

4. **Kalau pelanggan mau booking**:
   - Kumpulkan semua data: Nama, No HP, Jenis Motor, Layanan, Tanggal, Jam
   - Kalau lengkap → panggil 'createBookingTool'
     - Kalau sukses → balas: "Sip bro, booking kamu udah Zoya catat ya. Jadwalnya: ... 👍"
     - Kalau gagal → minta maaf, arahkan ke CS manusia
   - Kalau belum lengkap → tanyakan bagian yang kurang. Misalnya:
     - "Oke bro, tinggal jam kedatangannya aja nih. Mau jam berapa ya?"

📌 **Catatan Tambahan:**
- Usahakan jawab dengan data real dari tools, jangan ngarang kalau tool belum kasih data.
- Kalau info belum lengkap dari pelanggan, pancing dengan gaya ngobrol santai.
- Kalau ada pertanyaan yang di luar kapasitas kamu, jawab kayak gini:
  > "Waduh, ini agak di luar kepala gue bro... Zoya bantu terusin ke tim CS ya. #unanswered"

📤 Output HARUS dalam format JSON:
Contoh:
{ "suggestedReply": "Oke bro, untuk coating doff ukuran M harganya 400rb. Mau sekalian booking?" }

📩 Chat Pelanggan:
user: {{{customerMessage}}}

📚 Riwayat Sebelumnya:
{{#if chatHistory.length}}
{{#each chatHistory}}
{{this.role}}: {{this.content}}
{{/each}}
{{/if}}

🕒 Tanggal hari ini: {{{currentDate}}}, waktu: {{{currentTime}}}
Besok: {{{tomorrowDate}}}, Lusa: {{{dayAfterTomorrowDate}}}
`;


/**
 * Define prompt untuk Zoya dengan tool yang diperlukan
 */
const replyPromptSimplified = ai.definePrompt({
  name: 'whatsAppReplyPromptSimplified',
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [extractMotorInfoTool, searchServiceByKeywordTool, createBookingTool], // Tambahkan createBookingTool
  prompt: promptZoya,
});

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
    try { // Outer try block for the entire flow logic
      console.log("[CS-FLOW] whatsAppReplyFlowSimplified input:", JSON.stringify(input, null, 2));
      try { // Inner try block specifically for the AI call and its direct output processing
        const { output } = await replyPromptSimplified(input);
        if (!output || !output.suggestedReply) { 
          console.error('[CS-FLOW] ❌ Gagal mendapatkan balasan dari AI atau output tidak sesuai skema (output atau suggestedReply null/undefined). Mengembalikan default.');
          return { suggestedReply: "Maaf, Zoya lagi bingung nih. Bisa diulang pertanyaannya atau coba beberapa saat lagi?" };
        }
        console.log("[CS-FLOW] whatsAppReplyFlowSimplified output dari prompt:", output);
        return output;
      } catch (aiError: any) { // Catch errors specifically from the AI prompt/tool execution
        console.error('[CS-FLOW] ❌ Error saat menjalankan prompt AI atau memproses outputnya:', aiError);
        let finalErrorMessage = "Maaf, ada sedikit gangguan teknis di sistem Zoya.";
        // Simplified error message to avoid complex string manipulation issues
        if (aiError instanceof Error && aiError.message) {
            finalErrorMessage = `Duh, Zoya lagi ada kendala nih: ${aiError.message.substring(0, 80)}... Coba lagi ya.`;
        } else if (typeof aiError === 'string') {
            finalErrorMessage = `Duh, Zoya lagi ada kendala: ${aiError.substring(0, 80)}... Coba lagi ya.`;
        }
        return { suggestedReply: finalErrorMessage };
      }
    } catch (flowError: any) { // Catch any other errors within the flow (e.g., JSON.stringify, unexpected issues)
        console.error('[CS-FLOW] ❌ Critical error dalam flow whatsAppReplyFlowSimplified:', flowError);
        // Return a generic, safe, valid JSON response
        return { suggestedReply: "Waduh, sistem Zoya lagi ada kendala besar nih. Mohon coba beberapa saat lagi ya." };
    }
  }
);

export async function generateWhatsAppReply(input: WhatsAppReplyInput): Promise<WhatsAppReplyOutput> {
  // Memastikan semua properti opsional yang dibutuhkan oleh prompt ada, meskipun undefined
  const flowInput: WhatsAppReplyInput = {
    customerMessage: input.customerMessage,
    senderNumber: input.senderNumber, // Boleh undefined jika tidak ada
    chatHistory: input.chatHistory || [],
    // Pastikan nilai default atau dari input ada untuk variabel tanggal/waktu
    currentDate: input.currentDate || new Date().toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    currentTime: input.currentTime || new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
    tomorrowDate: input.tomorrowDate || new Date(Date.now() + 86400000).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    dayAfterTomorrowDate: input.dayAfterTomorrowDate || new Date(Date.now() + 2 * 86400000).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    agentBehavior: input.agentBehavior, // Boleh undefined
    knowledgeBase: input.knowledgeBase, // Boleh undefined
  };
  return whatsAppReplyFlowSimplified(flowInput);
}

    
