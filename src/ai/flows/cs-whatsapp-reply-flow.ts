'use server';
/**
 * @fileOverview AI flow for WhatsApp customer service replies.
 * Integrates with Firestore settings for dynamic AI behavior.
 * - generateWhatsAppReply - Function to generate a draft reply.
 */

import { ai } from '@/ai/genkit';
import { getProductServiceDetailsByNameTool } from '@/ai/tools/productLookupTool';
import { getClientDetailsTool } from '@/ai/tools/clientLookupTool';
import { getKnowledgeBaseInfoTool } from '@/ai/tools/knowledgeLookupTool';
import { createBookingTool } from '@/ai/tools/createBookingTool';
import type { WhatsAppReplyInput, WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema } from '@/types/ai/cs-whatsapp-reply';
import { z } from 'genkit';
import { DEFAULT_AI_SETTINGS, type AiSettingsFormValues } from '@/types/aiSettings';
import { format as formatDateFns, addDays } from 'date-fns';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

async function getAiSettingsFromFirestore(): Promise<Partial<AiSettingsFormValues>> {
  try {
    const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
    const docSnap = await getDoc(settingsDocRef);
    if (docSnap.exists()) {
      console.log("AI settings fetched from Firestore:", docSnap.data());
      return docSnap.data() as Partial<AiSettingsFormValues>;
    }
    console.log("No AI settings found in Firestore, using defaults.");
    return {};
  } catch (error) {
    console.error("Error fetching AI settings from Firestore:", error);
    return {}; // Fallback to empty object, defaults will apply
  }
}

export async function generateWhatsAppReply({ customerMessage, senderNumber, chatHistory }: { customerMessage: string; senderNumber?: string; chatHistory?: ChatMessage[] }): Promise<WhatsAppReplyOutput> {
  const firestoreSettings = await getAiSettingsFromFirestore();
  const agentSettings = { ...DEFAULT_AI_SETTINGS, ...firestoreSettings };
  const now = new Date();

  const flowInput: WhatsAppReplyInput = {
    customerMessage,
    senderNumber,
    chatHistory: chatHistory || [],
    agentBehavior: agentSettings.agentBehavior,
    knowledgeBase: agentSettings.knowledgeBaseDescription,
    currentDate: formatDateFns(now, 'yyyy-MM-dd'),
    currentTime: formatDateFns(now, 'HH:mm'),
    tomorrowDate: formatDateFns(addDays(now, 1), 'yyyy-MM-dd'),
    dayAfterTomorrowDate: formatDateFns(addDays(now, 2), 'yyyy-MM-dd'),
  };

  console.log("generateWhatsAppReply input to flow:", JSON.stringify(flowInput, null, 2));
  const { output } = await replyPromptCombined_v5_refined.invoke(flowInput, {
    returnToolRequests: true
  });
  return output;
}

const replyPromptCombined_v5_refined = ai.definePrompt({
  name: 'whatsAppReplyPrompt_Combined_v5_refined',
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [
    getKnowledgeBaseInfoTool,
    getProductServiceDetailsByNameTool,
    getClientDetailsTool,
    createBookingTool
  ],
  prompt: `Anda adalah seorang Customer Service Assistant AI untuk QLAB Auto Detailing, sebuah bengkel perawatan dan detailing motor.
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
    *   Jika pelanggan bertanya tentang informasi umum layanan (bukan harga/durasi spesifik), kebijakan, jam buka, alamat, atau topik umum lainnya, PERTAMA-TAMA gunakan tool \`getKnowledgeBaseInfoTool\` untuk mencari informasi relevan.
    *   Parameter 'query' untuk tool ini bisa berupa inti pertanyaan pelanggan atau topik spesifik yang Anda identifikasi (mis. "coating motor", "jam buka", "garansi").
3.  **Ambil Detail Produk/Layanan (JIKA PERLU untuk HARGA/DURASI):**
    *   Jika pelanggan bertanya tentang HARGA atau DURASI layanan spesifik, ATAU jika informasi dari \`getKnowledgeBaseInfoTool\` menyarankan perlunya detail lebih lanjut (misalnya, "untuk harga Coating, tanyakan jenis motor"), gunakan tool \`getProductServiceDetailsByNameTool\`.
    *   Sebelum memanggil tool ini, pastikan Anda memiliki informasi yang cukup (seperti jenis motor atau jenis cat jika diperlukan, sesuai instruksi dari \`getKnowledgeBaseInfoTool\` atau logika umum). Jika belum, TANYAKAN dulu ke pelanggan.
4.  **Ambil Data Klien (JIKA PERLU):**
    *   Jika pesan pelanggan berkaitan dengan data pribadi mereka (poin, motor terdaftar, dll.), gunakan tool \`getClientDetailsTool\`.
5.  **Sintesis Jawaban:**
    *   Gunakan informasi yang Anda dapatkan dari semua tool yang dipanggil (jika ada) dan riwayat percakapan untuk menyusun balasan yang informatif dan membantu.
    *   Jika tool tidak menemukan informasi yang dibutuhkan, sampaikan dengan sopan. JANGAN menebak-nebak.

Aturan Tambahan:
*   **Sapaan Awal dari Pelanggan**:
    *   Jika pesan pelanggan adalah sapaan umum (misalnya "Halo", "Siang", "Pagi", "Info dong", "Bro") dan TIDAK mengandung pertanyaan spesifik:
        *   Sapa balik dengan ramah sesuai {{{agentBehavior}}}.
        *   Tanyakan secara umum apa yang bisa saya bantu atau layanan apa yang mereka cari.
        *   CONTOH BALASAN SAPAAN UMUM: "Halo Kak! Ada yang bisa saya bantu untuk motornya hari ini? Lagi cari info cuci, detailing, coating, atau yang lain?"
        *   PENTING: JANGAN menggunakan tool APAPUN (termasuk \`getKnowledgeBaseInfoTool\`) pada tahap ini jika hanya sapaan umum.
*   **Menanyakan Informasi Tambahan (Jenis Motor/Cat):**
    *   Jika hasil dari \`getKnowledgeBaseInfoTool\` (misalnya tentang "coating") atau logika umum Anda menunjukkan bahwa jenis motor atau jenis cat diperlukan untuk menjawab pertanyaan layanan (misalnya, untuk harga coating atau poles), TANYAKAN informasi tersebut DULU SEBELUM memanggil \`getProductServiceDetailsByNameTool\` atau memberikan harga.
    *   CONTOH TANYA JENIS MOTOR: "Oke Kak. Untuk motor apa ya kira-kira? Biar saya bisa kasih info yang pas."
    *   CONTOH TANYA JENIS CAT (untuk COATING): "Siap! Untuk coatingnya, motor Kakak catnya doff (matte) atau glossy (mengkilap) ya?"
*   **Menyebutkan Harga/Durasi (dari \`getProductServiceDetailsByNameTool\`):**
    *   HANYA setelah semua informasi yang diperlukan lengkap (misal jenis motor/cat sudah tahu) DAN \`getProductServiceDetailsByNameTool\` berhasil mengembalikan data:
        *   Sebutkan NAMA LAYANAN LENGKAP.
        *   Jelaskan secara ringkas APA SAJA YANG TERMASUK (berdasarkan field \`description\` dari tool produk/layanan, JANGAN dari \`getKnowledgeBaseInfoTool\` jika sudah memanggil tool produk).
        *   Sebutkan ESTIMASI DURASI (field \`estimatedDuration\` dari tool produk/layanan).
        *   LANGSUNG SEBUTKAN HARGA (field \`price\` dari tool produk/layanan), format sebagai Rupiah (Rp).
    *   Jika \`getProductServiceDetailsByNameTool\` gagal dan tidak ada harga/durasi spesifik: Informasikan dengan sopan. JANGAN menebak harga.
*   **Jika Tool Gagal**: Jika tool \`getKnowledgeBaseInfoTool\` atau \`getProductServiceDetailsByNameTool\` mengembalikan bahwa informasi tidak ditemukan, sampaikan itu ke pelanggan. Jangan mencoba memanggil tool yang sama lagi untuk query yang mirip dalam giliran yang sama.

Umum:
*   Gunakan bahasa Indonesia yang baku, ramah, dan sesuai {{{agentBehavior}}}.
*   Buat balasan ringkas, jika banyak info, gunakan poin-poin.
*   Selalu akhiri dengan sapaan yang sopan atau kalimat penutup yang positif, KECUALI jika Anda sedang melanjutkan percakapan yang sudah berjalan.

Hasilkan hanya teks balasannya saja. Jangan menyebutkan nama tool yang Anda gunakan dalam balasan ke pelanggan.
Pastikan balasan Anda tetap ramah dan profesional.
`
});

const whatsAppReplyFlowCombined_v5_refined = ai.defineFlow(
  {
    name: 'whatsAppReplyFlow_Combined_v5_refined',
    role: 'system',
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => {
    console.log("whatsAppReplyFlowCombined_v5_refined input:", JSON.stringify(input, null, 2));
    const { output } = await replyPromptCombined_v5_refined.invoke(input, {
      returnToolRequests: true
    });
    if (!output) throw new Error('Gagal mendapatkan saran balasan dari AI.');
    console.log("whatsAppReplyFlowCombined_v5_refined output:", output);
    return output;
  }
);
