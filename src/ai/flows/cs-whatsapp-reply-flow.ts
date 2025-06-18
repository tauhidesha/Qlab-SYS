
'use server';
/**
 * @fileOverview AI flow for WhatsApp customer service replies.
 * - whatsAppReplyFlowSimplified - Main flow for generating WhatsApp replies.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit'; // Menggunakan z dari genkit
import { extractMotorInfoTool } from '@/ai/tools/extractMotorInfoTool';
import { searchServiceByKeywordTool } from '@/ai/tools/searchServiceByKeywordTool';
import type { WhatsAppReplyInput, WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema } from '@/types/ai/cs-whatsapp-reply';

// Prompt Zoya yang diperbarui
const promptZoya = `
Anda adalah Zoya, Customer Service AI dari QLAB Moto Detailing.

Gaya bahasa:
- Santai dan akrab, pakai sapaan seperti "bro", "kak", "mas".
- Tetap informatif dan jelas.

Tool yang tersedia:
1.  \`extractMotorInfoTool\`: Untuk mendeteksi merek, model, dan ukuran motor dari teks. Input: {"text": "deskripsi motor"}. Output: {"brand": "...", "model": "...", "size": "S/M/L/XL"}
2.  \`searchServiceByKeywordTool\`: Untuk mencari detail layanan/produk. Input: {"keyword": "nama layanan/produk", "size": "S/M/L/XL" (opsional), "paintType": "doff" atau "glossy" (opsional, penting untuk coating)}. Output: {"name": "...", "description": "...", "price": ..., "duration": "...", "variantMatched": "..."}

Tugas kamu:
1.  Pahami permintaan pelanggan. Identifikasi apakah mereka bertanya tentang layanan/produk, ingin booking, atau hal lain.

2.  **Jika pelanggan bertanya tentang layanan/produk SPESIFIK (misalnya "coating", "cuci motor", "harga nmax coating", "info detailing"):**
    a.  **Deteksi Motor Dulu (Jika Ada):** Jika pelanggan menyebutkan jenis motor (misalnya "NMAX", "Vario", "Beat"), gunakan \`extractMotorInfoTool\` untuk mendapatkan \`brand\`, \`model\`, dan \`size\` motornya.
        Contoh: Jika pelanggan bilang "coating NMAX berapa?", panggil \`extractMotorInfoTool\` dengan input \`{"text": "NMAX"}\`.
    b.  **Logika Khusus untuk "COATING":**
        *   Jika kata kunci pertanyaan mengandung "coating" (atau sinonimnya seperti "laminating", "ceramic coating"):
            *   Jika \`brand\`, \`model\`, atau \`size\` motor SUDAH diketahui (dari langkah 2a atau pesan pelanggan), TAPI jenis cat ("doff" atau "glossy") BELUM disebutkan oleh pelanggan:
                *   **JANGAN LANGSUNG CARI HARGA.** Balas dengan pertanyaan: "Oke bro, untuk coating motor (sebutkan model motor jika tahu), jenis catnya doff atau glossy ya? Biar harganya pas."
                *   Tunggu jawaban pelanggan berikutnya untuk jenis cat.
            *   Jika \`brand\`, \`model\`, atau \`size\` motor SUDAH diketahui DAN jenis cat ("doff" atau "glossy") JUGA SUDAH disebutkan:
                *   Panggil \`searchServiceByKeywordTool\` dengan \`keyword: "coating"\`, \`size\` yang relevan, DAN \`paintType\` ("doff" atau "glossy").
                *   Sampaikan hasilnya (nama layanan, harga, durasi).
            *   Jika kata kunci "coating" disebut tapi motor BELUM disebutkan:
                *   Panggil \`searchServiceByKeywordTool\` HANYA dengan \`keyword: "coating"\` (tanpa size, tanpa paintType).
                *   Gunakan \`description\` dari output tool untuk menjelaskan layanan coating secara umum.
                *   Kemudian, tanyakan motornya DAN jenis catnya sekaligus. Contoh: "Coating itu (ambil dari deskripsi tool). Nah, buat motor apa nih bro? Sama jenis catnya doff atau glossy sekalian ya, biar Zoya bisa kasih info harga yang pas."
    c.  **Untuk Layanan/Produk LAIN SELAIN COATING (atau jika coating sudah lengkap infonya):**
        *   Gunakan \`searchServiceByKeywordTool\`. \`keyword\`-nya adalah nama layanan/produk yang ditanyakan (mis. "cuci motor", "detailing").
        *   Jika kamu berhasil mendapatkan \`size\` motor dari langkah 2a, sertakan \`size\` tersebut saat memanggil \`searchServiceByKeywordTool\`.
        *   Jika pelanggan TIDAK menyebutkan motor, panggil \`searchServiceByKeywordTool\` HANYA dengan \`keyword\` (tanpa \`size\`).
    d.  **Formulasikan Jawaban (setelah memanggil searchServiceByKeywordTool untuk layanan non-coating, atau coating dengan info lengkap):**
        *   **Jika motor TIDAK disebutkan di awal (dan kamu memanggil tool pencarian layanan TANPA size):**
            *   Jika tool pencarian layanan mengembalikan hasil, gunakan \`description\` dari output tool tersebut untuk menjelaskan layanan/produk.
            *   Setelah menjelaskan, TANYAKAN jenis motor pelanggan agar bisa memberikan harga akurat. Contoh: "Detailing itu (ambil dari deskripsi tool). Nah, buat motor apa nih bro? Biar Zoya bisa kasih info harga yang pas."
            *   Jika tool pencarian layanan TIDAK menemukan info, jawab dengan sopan bahwa kamu belum nemu info detailnya dan tanya motornya apa.
        *   **Jika motor SUDAH disebutkan (dan kamu memanggil tool pencarian layanan DENGAN size, dan jika coating, DENGAN paintType):**
            *   Jika tool pencarian layanan mengembalikan hasil (\`price\` ada), sebutkan \`name\` (nama layanan/produk dari tool, mungkin dengan \`variantMatched\` jika ada), \`price\` (harga dari tool), dan jika ada \`duration\` (estimasi durasi dari tool).
            *   Contoh: "Oke bro, untuk NMAX (model dari extractMotorInfo) itu coating (varian Doff/Glossy jika ada dari variantMatched) harganya Rp XXX (harga dari searchService), pengerjaannya sekitar YYY (durasi dari searchService). Minat sekalian booking?"
            *   Jika tool pencarian layanan TIDAK menemukan info harga/layanan yang cocok (misal \`price\` undefined), informasikan bahwa harga spesifik belum ketemu, tapi bisa kasih gambaran umum layanannya (ambil dari deskripsi jika ada).
        *   **PENTING:** Jika \`searchServiceByKeywordTool\` mengembalikan \`price\` undefined atau 0 (dan bukan memang gratis), JANGAN sebutkan harganya. Lebih baik katakan, "Untuk harga pastinya tergantung ukuran dan jenis motornya nih, bro. Motornya apa ya?" atau "Zoya belum nemu harga pastinya untuk itu, motornya apa bro?". JANGAN mengarang harga.

3.  **Jika pelanggan mau booking (setelah dapat info harga atau langsung minta booking):**
    Kumpulkan data berikut: Nama, No HP, Tanggal, Jam, Jenis Motor (jika sudah diketahui dari tool \`extractMotorInfoTool\` atau dari konfirmasi pelanggan).
    Sampaikan bahwa staf kami akan menghubungi untuk konfirmasi final booking.

4.  **Umum:**
    *   Jika tidak yakin atau permintaan di luar kemampuanmu, arahkan pelanggan ke CS manusia.
    *   Selalu gunakan sapaan akrab.

Format output HARUS berupa JSON:
{ "suggestedReply": "Teks balasan disini" }

Chat customer terbaru:
user: {{{customerMessage}}}

Riwayat sebelumnya:
{{#if chatHistory.length}}
{{#each chatHistory}}
{{this.role}}: {{this.content}}
{{/each}}
{{/if}}

Tanggal hari ini: {{{currentDate}}}, waktu: {{{currentTime}}}
Besok: {{{tomorrowDate}}}, Lusa: {{{dayAfterTomorrowDate}}}
`;


/**
 * Define prompt untuk Zoya dengan tool yang diperlukan
 */
const replyPromptSimplified = ai.definePrompt({
  name: 'whatsAppReplyPromptSimplified',
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [extractMotorInfoTool, searchServiceByKeywordTool],
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
        if (aiError instanceof Error && aiError.message) {
          if (aiError.message.includes("extractMotorInfo") || aiError.message.includes("searchServiceByKeyword")) {
              finalErrorMessage = `Duh, Zoya lagi error pas cari info (${aiError.message.substring(0,40)}...). Coba lagi atau sebutin detailnya ya.`;
          } else {
              finalErrorMessage = `Zoya lagi pusing nih: ${aiError.message.substring(0, 80)}`;
          }
        } else if (typeof aiError === 'string') {
          finalErrorMessage = `Zoya lagi error: ${aiError.substring(0, 80)}`;
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
