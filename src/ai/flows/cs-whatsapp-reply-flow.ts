
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
1. 'extractMotorInfoTool': Deteksi jenis motor dan ukurannya dari teks.
   Input: {"text": "deskripsi motor"}
   Output: {"brand": "...", "model": "...", "size": "S/M/L/XL"}

2. 'searchServiceByKeywordTool': Cari detail layanan berdasarkan kata kunci + ukuran motor (optional) + jenis cat (optional)
   Input: {"keyword": "...", "size": "...", "paintType": "doff/glossy"}
   Output: {"name": "...", "description": "...", "price": ..., "duration": "...", "variantMatched": "..."}

3. 'createBookingTool': Catat booking.
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
     - Panggil 'extractMotorInfoTool' (jika belum dan size belum diketahui dari histori)
     - Panggil 'searchServiceByKeywordTool' dengan keyword "coating" + size (dari extractMotorInfoTool atau histori) + paintType.
     - Kalau dapet harga (field 'price' ada dan bukan 0 atau null) → kasih info detail (nama layanan, harga, durasi) + tawarkan booking.
     - Kalau TIDAK dapet harga (field 'price' undefined/null/0 dan bukan gratis) dari tool → SANGAT PENTING: JANGAN bilang "sebentar aku cek" lagi. LANGSUNG informasikan bahwa harga spesifik belum ketemu, tapi bisa kasih gambaran umum layanannya (ambil dari deskripsi jika ada). Misal: "Untuk coating NMAX doff, deskripsinya sih [deskripsi layanan]. Tapi buat harga pastinya, Zoya belum nemu nih bro, mungkin tergantung kondisi motornya juga. Mau Zoya bantu tanyain ke tim CS langsung?" atau "Coating NMAX doff ya, bro. Detailnya sih [deskripsi]. Untuk harganya Zoya belum dapet info pasti nih, biasanya tergantung ukuran & kondisi motor. Mau dibantu booking dulu aja biar nanti dikonfirmasi tim kami?"

3. **Kalau pelanggan nanya layanan lain (cuci, detailing, poles, repaint, dll)**:
   - Cek apakah menyebut motor → panggil 'extractMotorInfoTool' jika ada dan size belum diketahui.
   - Panggil 'searchServiceByKeywordTool' dengan keyword sesuai + size (jika ada dari extractMotorInfoTool atau histori).
   - Kalau dapet harga → langsung kasih info detail (nama layanan, harga, durasi) + tawarkan booking.
   - Kalau cuma dapet deskripsi (TIDAK dapet harga dari tool) → kasih deskripsi + tanya motornya buat bisa kasih info harga (jika size belum diketahui). Jika size sudah diketahui tapi harga tetap tidak ada, sampaikan seperti poin 2 (harga tidak ketemu).

4. **Kalau pelanggan mau booking** (atau menyebutkan niat booking seperti "mau booking", "jadwalin dong", atau memberikan info tanggal/jam):
   - **Cek & Ekstrak Info dari Pesan Pelanggan & Riwayat:**
     *   Nama Pelanggan? (Dari histori atau 'senderName' jika ada)
     *   No HP? (Dari histori atau 'senderNumber' jika ada)
     *   Jenis Motor? (Dari hasil 'extractMotorInfoTool' sebelumnya, atau dari histori/pesan pelanggan)
     *   Layanan? (Dari hasil 'searchServiceByKeywordTool' sebelumnya, atau dari histori/pesan pelanggan. Ingat untuk dapatkan 'serviceId' dan 'serviceName' yang tepat.)
     *   Tanggal & Jam?
         -   Kalau pelanggan bilang 'hari ini', isi Tanggal dengan '{{{currentDate}}}'. Formatnya harus YYYY-MM-DD. (Contoh: jika {{{currentDate}}} adalah '18/06/2024', ubah jadi '2024-06-18').
         -   Kalau pelanggan bilang 'besok', isi Tanggal dengan '{{{tomorrowDate}}}'. Formatnya harus YYYY-MM-DD.
         -   Kalau pelanggan bilang 'lusa', isi Tanggal dengan '{{{dayAfterTomorrowDate}}}'. Formatnya harus YYYY-MM-DD.
         -   Kalau pelanggan sebut jam spesifik (mis. 'jam 5 sore', 'jam 10 pagi', 'jam 14.30'):
             -   'jam 5 sore' -> Jam: '17:00'
             -   'jam 10 pagi' -> Jam: '10:00'
             -   'jam 2 siang' -> Jam: '14:00'
             -   'jam 7 malam' -> Jam: '19:00'
             -   'jam 14.30' -> Jam: '14:30'
             -   Jika hanya jam tanpa keterangan hari, dan belum ada tanggal, asumsikan 'hari ini' (gunakan '{{{currentDate}}}' yang sudah diformat YYYY-MM-DD).
         -   Jika pelanggan menyebut tanggal dan bulan (mis. "17 Agustus"), coba pahami dan format ke YYYY-MM-DD. Jika ragu, tanyakan tahunnya atau konfirmasi.
   - **Formulasikan Pertanyaan (Jika Info Kurang):**
     *   Sebutkan dulu info yang SUDAH kamu pahami.
     *   Contoh jika layanan, motor, tanggal, jam sudah ada: "Oke bro, NMAX doff buat coating ya, hari ini ({DD/MM/YYYY}) jam 17:00. Boleh minta Nama sama No HP-nya buat konfirmasi booking?" (Ganti {DD/MM/YYYY} dengan tanggal sebenarnya dari {{{currentDate}}})
     *   Contoh jika hanya layanan & motor: "Sip, coating buat NMAX doff ya. Mau booking tanggal dan jam berapa nih, bro? Sekalian Nama sama No HP-nya ya."
     *   Contoh jika banyak kurang: "Oke bro, untuk bookingnya, Zoya butuh info ini ya:\\nNama : [isi jika sudah tahu]\\nNo HP : [isi jika sudah tahu]\\nLayanan : [isi jika sudah tahu]\\nTanggal : [isi jika sudah tahu dari 'hari ini/besok/lusa']\\nJam kedatangan : [isi jika sudah tahu]\\nJenis Motor : [isi jika sudah tahu]"
   - **Jika Semua Info Sudah Lengkap**:
     *   Panggil tool 'createBookingTool' dengan semua data yang telah terkumpul.
     *   Pastikan 'bookingDate' dalam format YYYY-MM-DD dan 'bookingTime' dalam format HH:MM.
     *   'serviceId' dan 'serviceName' ambil dari hasil pencarian layanan sebelumnya.
     *   'vehicleInfo' gabungkan informasi motor (mis. "NMAX Merah Doff").
     *   Kalau sukses → balas: "Sip bro, booking kamu udah Zoya catat ya. Jadwalnya: [Nama Layanan] untuk [Jenis Motor] pada tanggal [Tanggal Booking format DD MMMM YYYY] jam [Jam Booking]. 👍"
     *   Kalau gagal → minta maaf, arahkan ke CS manusia.

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

🕒 Tanggal hari ini: {{{currentDate}}} (format DD/MM/YYYY), waktu: {{{currentTime}}}
Besok: {{{tomorrowDate}}} (format DD/MM/YYYY), Lusa: {{{dayAfterTomorrowDate}}} (format DD/MM/YYYY)
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

      // Helper untuk memformat DD/MM/YYYY ke YYYY-MM-DD
      const formatDateToYYYYMMDD = (dateStr?: string) => {
        if (!dateStr || !/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return undefined; // Pastikan format DD/MM/YYYY
        const parts = dateStr.split('/');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      };
      
      // Menyiapkan tanggal yang sudah diformat untuk prompt
      const flowInputForPrompt: WhatsAppReplyInput = {
        ...input,
        currentDate: input.currentDate, // Biarkan format DD/MM/YYYY untuk display di prompt
        tomorrowDate: input.tomorrowDate,
        dayAfterTomorrowDate: input.dayAfterTomorrowDate,
        // AI akan diinstruksikan untuk memformatnya menjadi YYYY-MM-DD saat memanggil tool
      };


      try { // Inner try block specifically for the AI call and its direct output processing
        const { output } = await replyPromptSimplified(flowInputForPrompt);
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
    senderNumber: input.senderNumber, 
    chatHistory: input.chatHistory || [],
    // Pastikan nilai default atau dari input ada untuk variabel tanggal/waktu
    // Di sini kita akan mengirimkan tanggal dalam format DD/MM/YYYY ke AI,
    // karena AI diinstruksikan untuk memahaminya dan mengubahnya ke YYYY-MM-DD saat perlu.
    currentDate: input.currentDate || new Date().toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    currentTime: input.currentTime || new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
    tomorrowDate: input.tomorrowDate || new Date(Date.now() + 86400000).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    dayAfterTomorrowDate: input.dayAfterTomorrowDate || new Date(Date.now() + 2 * 86400000).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
    agentBehavior: input.agentBehavior, 
    knowledgeBase: input.knowledgeBase, 
  };
  return whatsAppReplyFlowSimplified(flowInput);
}

