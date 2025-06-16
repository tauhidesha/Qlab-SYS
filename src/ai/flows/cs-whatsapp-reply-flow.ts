
'use server';
/**
 * @fileOverview Flow AI untuk membantu membuat balasan pesan WhatsApp customer service.
 * Dilengkapi dengan kemampuan untuk mencari informasi produk/layanan dan data klien,
 * serta menggunakan pengaturan agen AI dinamis dari Firestore dan riwayat percakapan.
 * Menggunakan pendekatan RAG sederhana untuk informasi dari knowledge base.
 *
 * - generateWhatsAppReply - Fungsi yang menghasilkan draf balasan.
 */

import { ai } from '@/ai/genkit';
import { getProductServiceDetailsByNameTool } from '@/ai/tools/productLookupTool';
import { getClientDetailsTool } from '@/ai/tools/clientLookupTool';
import { getKnowledgeBaseInfoTool } from '@/ai/tools/knowledgeLookupTool'; // Tool RAG baru
import type { WhatsAppReplyInput, WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema } from '@/types/ai/cs-whatsapp-reply';
import { z } from 'genkit';

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { AiSettingsFormSchema, DEFAULT_AI_SETTINGS, type AiSettingsFormValues } from '@/types/aiSettings';


export async function generateWhatsAppReply({ customerMessage, chatHistory }: { customerMessage: string; chatHistory?: ChatMessage[] }): Promise<WhatsAppReplyOutput> {
  let agentSettings = { ...DEFAULT_AI_SETTINGS };

  try {
    const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
    const docSnap = await getDoc(settingsDocRef);
    if (docSnap.exists()) {
      const rawSettingsData = docSnap.data();
      const parsedSettings = AiSettingsFormSchema.safeParse(rawSettingsData);
      if (parsedSettings.success) {
        agentSettings = { ...DEFAULT_AI_SETTINGS, ...parsedSettings.data };
        console.log("AI Settings loaded and validated from Firestore:", agentSettings);
      } else {
        console.warn("AI Settings in Firestore are invalid, using defaults. Validation errors:", parsedSettings.error.format());
      }
    } else {
      console.log("AI Settings not found in Firestore, using defaults.");
    }
  } catch (error) {
    console.error("Error fetching AI settings from Firestore, using defaults:", error);
  }

  const flowInput: WhatsAppReplyInput = {
    customerMessage: customerMessage,
    chatHistory: chatHistory || [], // Pastikan chatHistory selalu array
    agentBehavior: agentSettings.agentBehavior || '', // Fallback ke string kosong
    knowledgeBase: agentSettings.knowledgeBaseDescription || '', // Fallback ke string kosong
  };

  return whatsAppReplyFlow(flowInput);
}

const replyPrompt = ai.definePrompt({
  name: 'whatsAppReplyPrompt',
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [getKnowledgeBaseInfoTool, getProductServiceDetailsByNameTool, getClientDetailsTool], // Tambahkan tool RAG
  prompt: \`Anda adalah seorang Customer Service Assistant AI untuk QLAB Auto Detailing, sebuah bengkel perawatan dan detailing motor.
Perilaku Anda harus: {{{agentBehavior}}}.
Panduan umum untuk Anda: {{{knowledgeBase}}}

{{#each chatHistory}}
  {{#if @first}}
Berikut adalah riwayat percakapan sebelumnya:
  (JANGAN mengulang sapaan "Halo" jika sudah ada riwayat):
  {{/if}}
  {{this.role}}: {{{this.content}}}
{{/each}}

Pesan BARU dari Pelanggan (atau pertanyaan dari Staf CS yang perlu Anda bantu jawab):
{{{customerMessage}}}

Alur Kerja Utama Anda:
1.  **Analisa Pesan Pelanggan:** Pahami apa yang dibutuhkan pelanggan.
2.  **Ambil Informasi dari Knowledge Base (JIKA PERLU):**
    *   Jika pelanggan bertanya tentang informasi umum layanan (bukan harga/durasi spesifik), kebijakan, jam buka, alamat, atau topik umum lainnya, PERTAMA-TAMA gunakan tool \\\`getKnowledgeBaseInfoTool\\\` untuk mencari informasi relevan.
    *   Parameter 'query' untuk tool ini bisa berupa inti pertanyaan pelanggan atau topik spesifik yang Anda identifikasi (mis. "coating motor", "jam buka", "garansi").
3.  **Ambil Detail Produk/Layanan (JIKA PERLU untuk HARGA/DURASI):**
    *   Jika pelanggan bertanya tentang HARGA atau DURASI layanan spesifik, ATAU jika informasi dari \\\`getKnowledgeBaseInfoTool\\\` menyarankan perlunya detail lebih lanjut (misalnya, "untuk harga Coating, tanyakan jenis motor"), gunakan tool \\\`getProductServiceDetailsByNameTool\\\`.
    *   Sebelum memanggil tool ini, pastikan Anda memiliki informasi yang cukup (seperti jenis motor atau jenis cat jika diperlukan, sesuai instruksi dari \\\`getKnowledgeBaseInfoTool\\\` atau logika umum). Jika belum, TANYAKAN dulu ke pelanggan.
4.  **Ambil Data Klien (JIKA PERLU):**
    *   Jika pesan pelanggan berkaitan dengan data pribadi mereka (poin, motor terdaftar, dll.), gunakan tool \\\`getClientDetailsTool\\\`.
5.  **Sintesis Jawaban:**
    *   Gunakan informasi yang Anda dapatkan dari semua tool yang dipanggil (jika ada) dan riwayat percakapan untuk menyusun balasan yang informatif dan membantu.
    *   Jika tool tidak menemukan informasi yang dibutuhkan, sampaikan dengan sopan. JANGAN menebak-nebak.

Aturan Tambahan:
*   **Sapaan Awal dari Pelanggan**:
    *   Jika pesan pelanggan adalah sapaan umum (misalnya "Halo", "Siang", "Pagi", "Info dong", "Bro") dan TIDAK mengandung pertanyaan spesifik:
        *   Sapa balik dengan ramah sesuai {{{agentBehavior}}}.
        *   Tanyakan secara umum apa yang bisa dibantu atau layanan apa yang mereka cari.
        *   CONTOH BALASAN SAPAAN UMUM: "Halo Kak! Ada yang bisa saya bantu untuk motornya hari ini? Lagi cari info cuci, detailing, coating, atau yang lain?"
        *   PENTING: JANGAN menggunakan tool APAPUN (termasuk \\\`getKnowledgeBaseInfoTool\\\`) pada tahap ini jika hanya sapaan umum.
*   **Menanyakan Informasi Tambahan (Jenis Motor/Cat):**
    *   Jika hasil dari \\\`getKnowledgeBaseInfoTool\\\` (misalnya tentang "coating") atau logika umum Anda menunjukkan bahwa jenis motor atau jenis cat diperlukan untuk menjawab pertanyaan layanan (misalnya, untuk harga coating atau poles), TANYAKAN informasi tersebut DULU SEBELUM memanggil \\\`getProductServiceDetailsByNameTool\\\` atau memberikan harga.
    *   CONTOH TANYA JENIS MOTOR: "Oke Kak. Untuk motor apa ya kira-kira? Biar saya bisa kasih info yang pas."
    *   CONTOH TANYA JENIS CAT (untuk COATING): "Siap! Untuk coatingnya, motor Kakak catnya doff (matte) atau glossy (mengkilap) ya?"
*   **Menyebutkan Harga/Durasi (dari \\\`getProductServiceDetailsByNameTool\\\`):**
    *   HANYA setelah semua informasi yang diperlukan lengkap (misal jenis motor/cat sudah tahu) DAN \\\`getProductServiceDetailsByNameTool\\\` berhasil mengembalikan data:
        *   Sebutkan NAMA LAYANAN LENGKAP.
        *   Jelaskan secara ringkas APA SAJA YANG TERMASUK (berdasarkan field \\\`description\\\` dari tool produk/layanan, JANGAN dari \\\`getKnowledgeBaseInfoTool\\\` jika sudah memanggil tool produk).
        *   Sebutkan ESTIMASI DURASI (field \\\`estimatedDuration\\\` dari tool produk/layanan).
        *   LANGSUNG SEBUTKAN HARGA (field \\\`price\\\` dari tool produk/layanan), format sebagai Rupiah (Rp).
    *   Jika \\\`getProductServiceDetailsByNameTool\\\` gagal dan tidak ada harga/durasi spesifik: Informasikan dengan sopan. JANGAN menebak harga.
*   **Jika Tool Gagal**: Jika tool \\\`getKnowledgeBaseInfoTool\\\` atau \\\`getProductServiceDetailsByNameTool\\\` mengembalikan bahwa informasi tidak ditemukan, sampaikan itu ke pelanggan. Jangan mencoba memanggil tool yang sama lagi untuk query yang mirip dalam giliran yang sama.

Umum:
*   Gunakan bahasa Indonesia yang baku, ramah, dan sesuai {{{agentBehavior}}}.
*   Buat balasan ringkas, jika banyak info, gunakan poin-poin.
*   Selalu akhiri dengan sapaan yang sopan atau kalimat penutup yang positif, KECUALI jika Anda sedang melanjutkan percakapan yang sudah berjalan.

Hasilkan hanya teks balasannya saja. Jangan menyebutkan nama tool yang Anda gunakan dalam balasan ke pelanggan.
Pastikan balasan Anda tetap ramah dan profesional.
\`,
});

const whatsAppReplyFlow = ai.defineFlow(
  {
    name: 'whatsAppReplyFlow',
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => {
    console.log("WhatsAppReplyFlow input received by flow:", JSON.stringify(input, null, 2));

    const {output} = await replyPrompt(input);

    if (!output) {
      throw new Error('Gagal mendapatkan saran balasan dari AI.');
    }
    console.log("WhatsAppReplyFlow output:", output);
    return output;
  }
);
