'use server';
/**
 * @fileOverview AI flow for WhatsApp customer service replies.
 * - whatsAppReplyFlowSimplified - Main flow for generating WhatsApp replies.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit'; // Menggunakan z dari genkit
import { extractMotorInfoTool } from '@/ai/tools/extractMotorInfoTool';
import type { WhatsAppReplyInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply'; // Pastikan path ini benar
import { WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema } from '@/types/ai/cs-whatsapp-reply'; // Pastikan path ini benar

// Prompt Zoya yang baru (tidak diekspor)
const promptZoya = `
Kamu adalah Zoya, Customer Service AI dari QLAB Moto Detailing.

Gaya bahasa:
- Santai dan akrab, pakai sapaan seperti "bro", "kak", "mas".
- Tetap informatif dan jelas.

Tugas kamu:
1. Jawab pertanyaan seputar layanan (cuci, coating, detailing, repaint).
2. Kalau pelanggan menyebutkan motor seperti "nmax connected", panggil tool 'extractMotorInfoTool' dengan input: {"text": "nmax connected"}
3. Gunakan hasil dari tool untuk menentukan ukuran motor (S/M/L/XL) lalu sesuaikan dengan layanan dan harga.
4. Kalau berhasil deteksi motor, jelaskan layanan yang cocok dan tawarkan booking.
5. Kalau pelanggan mau booking, minta data berikut:
   - Nama
   - No HP
   - Tanggal
   - Jam
   - Jenis Motor (gunakan dari hasil extract)
6. Booking belum diproses AI sepenuhnya, jadi cukup kumpulkan datanya lalu katakan bahwa staf kami akan hubungi untuk konfirmasi final.

Jika tidak yakin, arahkan pelanggan ke CS manusia.

Format output HARUS berupa:
{ "suggestedReply": "Teks balasan disini" }

Contoh:
{ "suggestedReply": "Oke, untuk coating motor doff ukuran M itu 400rb bro. Mau sekalian booking?" }

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
 * Define prompt untuk Zoya dengan tool extractMotorInfoTool
 */
const replyPromptSimplified = ai.definePrompt({
  name: 'whatsAppReplyPromptSimplified',
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [extractMotorInfoTool], // Tool penting: deteksi motor dari teks user
  prompt: promptZoya, // Menggunakan prompt yang sudah didefinisikan di atas
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
  async (input: WhatsAppReplyInput) => { // Menambahkan tipe eksplisit untuk input
    console.log("whatsAppReplyFlowSimplified input:", JSON.stringify(input, null, 2));
    const { output } = await replyPromptSimplified(input);
    if (!output) {
      console.error('❌ Gagal mendapatkan balasan dari AI.');
      throw new Error('❌ Gagal mendapatkan balasan dari AI.');
    }
    console.log("whatsAppReplyFlowSimplified output:", output);
    return output;
  }
);

// Wrapper function to match the expected export by API if still needed.
// Jika API kamu (misalnya di /api/whatsapp/receive) masih memanggil generateWhatsAppReply,
// kita buatkan wrapper yang kompatibel.
export async function generateWhatsAppReply(input: WhatsAppReplyInput): Promise<WhatsAppReplyOutput> {
  // Untuk saat ini, kita asumsikan input ke flow sama dengan input ke fungsi ini.
  // Parameter seperti agentBehavior, knowledgeBase, dll. dari firestore settings
  // tidak di-passing ke flow baru ini untuk sementara.
  // Kita bisa tambahkan kembali jika diperlukan.
  
  // Ambil data yang relevan dari input untuk flow
  const flowInput: WhatsAppReplyInput = {
    customerMessage: input.customerMessage,
    senderNumber: input.senderNumber,
    chatHistory: input.chatHistory || [],
    currentDate: input.currentDate,
    currentTime: input.currentTime,
    tomorrowDate: input.tomorrowDate,
    dayAfterTomorrowDate: input.dayAfterTomorrowDate,
    // `agentBehavior` dan `knowledgeBase` dari input tidak langsung digunakan di prompt Zoya baru
    // Tapi kita bisa pass jika promptnya diupdate untuk menggunakan itu
  };

  return whatsAppReplyFlowSimplified(flowInput);
}
