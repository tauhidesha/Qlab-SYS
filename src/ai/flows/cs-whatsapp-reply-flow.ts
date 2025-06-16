
'use server';
/**
 * @fileOverview Flow AI untuk membantu membuat balasan pesan WhatsApp customer service.
 * Dilengkapi dengan kemampuan untuk mencari informasi produk/layanan dan data klien,
 * serta menggunakan pengaturan agen AI dinamis dari Firestore dan riwayat percakapan.
 * Menggunakan pendekatan RAG sederhana untuk informasi dari knowledge base.
 * Juga memiliki kemampuan notifikasi ke agen manusia jika kondisi tertentu terpenuhi.
 *
 * - generateWhatsAppReply - Fungsi yang menghasilkan draf balasan.
 */

import { ai } from '@/ai/genkit';
import { getProductServiceDetailsByNameTool } from '@/ai/tools/productLookupTool';
import { getClientDetailsTool } from '@/ai/tools/clientLookupTool';
import { getKnowledgeBaseInfoTool } from '@/ai/tools/knowledgeLookupTool';
import type { WhatsAppReplyInput, WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema } from '@/types/ai/cs-whatsapp-reply';
import { z } from 'genkit';

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { AiSettingsFormSchema, DEFAULT_AI_SETTINGS, type AiSettingsFormValues } from '@/types/aiSettings';
import { sendWhatsAppMessage } from '@/services/whatsappService'; // Untuk mengirim notifikasi ke agen manusia

// Kata kunci untuk deteksi permintaan handoff dari pelanggan
const CUSTOMER_HANDOFF_KEYWORDS = [
    "manusia", "staf", "cs", "customer service", "operator", "agen", "admin", "orang", "komplain", "bicara langsung"
];
// Kata kunci dari AI yang mengindikasikan ketidakmampuan
const AI_INABILITY_KEYWORDS = [
    "tidak bisa membantu", "kurang yakin", "tidak menemukan informasi", "tidak tahu", "sulit mengerti", "bukan kapasitas saya", "hubungi staf", "tidak ada data"
];


export async function generateWhatsAppReply({ customerMessage, senderNumber, chatHistory }: { customerMessage: string; senderNumber?: string; chatHistory?: ChatMessage[] }): Promise<WhatsAppReplyOutput> {
  let agentSettings = { ...DEFAULT_AI_SETTINGS };
  let settingsLoadedFromFirestore = false;

  try {
    const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
    const docSnap = await getDoc(settingsDocRef);
    if (docSnap.exists()) {
      const rawSettingsData = docSnap.data();
      const parsedSettings = AiSettingsFormSchema.safeParse(rawSettingsData);
      if (parsedSettings.success) {
        agentSettings = { ...DEFAULT_AI_SETTINGS, ...parsedSettings.data };
        settingsLoadedFromFirestore = true;
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
    senderNumber: senderNumber,
    chatHistory: chatHistory || [],
    agentBehavior: agentSettings.agentBehavior || '',
    knowledgeBase: agentSettings.knowledgeBaseDescription || '',
  };

  const aiResponse = await whatsAppReplyFlow(flowInput);

  // Logika Handoff ke Agen Manusia
  if (agentSettings.enableHumanHandoff && agentSettings.humanAgentWhatsAppNumber && agentSettings.humanAgentWhatsAppNumber.trim() !== '') {
    let needsHandoff = false;
    let handoffReason = "";

    // Cek apakah pelanggan meminta handoff
    if (agentSettings.transferConditions.includes("Pelanggan Meminta Secara Eksplisit") || agentSettings.transferConditions.includes("Disebut Kata Kunci Eskalasi (mis. 'manajer', 'komplain')")) {
      if (CUSTOMER_HANDOFF_KEYWORDS.some(keyword => customerMessage.toLowerCase().includes(keyword))) {
        needsHandoff = true;
        handoffReason = "Pelanggan meminta untuk berbicara dengan agen manusia.";
      }
    }

    // Cek apakah AI mengindikasikan tidak bisa membantu (berdasarkan output AI atau kondisi lain)
    // Untuk "AI Tidak Menemukan Jawaban (Setelah 2x Coba)", kita sederhanakan dulu menjadi "AI Tidak Menemukan Jawaban" dari teks balasan AI
    if (!needsHandoff && agentSettings.transferConditions.some(tc => tc.startsWith("AI Tidak Menemukan Jawaban"))) {
      if (AI_INABILITY_KEYWORDS.some(keyword => aiResponse.suggestedReply.toLowerCase().includes(keyword))) {
        needsHandoff = true;
        handoffReason = "AI mengindikasikan tidak dapat menemukan jawaban atau membantu.";
      }
    }
    
    // TODO: Tambahkan pengecekan untuk kondisi transfer lainnya jika memungkinkan di masa depan (mis. sentimen, jumlah pertanyaan)

    if (needsHandoff) {
      console.log(`Handoff condition met for ${senderNumber || 'Unknown sender'}. Reason: ${handoffReason}`);
      const handoffNotificationMessage = `🔔 *Notifikasi Handoff Agen AI* 🔔

Pelanggan: ${senderNumber || 'Nomor tidak diketahui'}
Alasan Handoff: ${handoffReason}

Pesan Terakhir Pelanggan:
_"${customerMessage}"_

Saran Balasan AI Sebelumnya (jika ada):
_"${aiResponse.suggestedReply}"_

Mohon segera tindak lanjuti.`;

      try {
        await sendWhatsAppMessage(agentSettings.humanAgentWhatsAppNumber, handoffNotificationMessage);
        console.log(`Handoff notification sent to human agent: ${agentSettings.humanAgentWhatsAppNumber}`);
        // Mungkin kita ingin AI membalas ke pelanggan bahwa sedang dihubungkan ke staf
        // aiResponse.suggestedReply = `Mohon tunggu sebentar, Kak. Saya akan segera menghubungkan Anda dengan staf kami untuk bantuan lebih lanjut. ${agentSettings.agentBehavior.includes("Humoris") ? "Jangan kemana-mana ya, nanti kangen!" : "" }`;

      } catch (waError) {
        console.error(`Failed to send handoff notification to ${agentSettings.humanAgentWhatsAppNumber}:`, waError);
      }
    }
  }

  return aiResponse;
}

const replyPrompt = ai.definePrompt({
  name: 'whatsAppReplyPrompt',
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [getKnowledgeBaseInfoTool, getProductServiceDetailsByNameTool, getClientDetailsTool],
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

Pesan BARU dari Pelanggan ({{{senderNumber}}}) (atau pertanyaan dari Staf CS yang perlu Anda bantu jawab):
{{{customerMessage}}}

Alur Kerja Utama Anda:
1.  **Analisa Pesan Pelanggan:** Pahami apa yang dibutuhkan pelanggan. Perhatikan nomor pengirim: {{{senderNumber}}} jika perlu.
2.  **Ambil Informasi dari Knowledge Base (JIKA PERLU):**
    *   Jika pelanggan bertanya tentang informasi umum layanan (bukan harga/durasi spesifik), kebijakan, jam buka, alamat, atau topik umum lainnya, PERTAMA-TAMA gunakan tool \`getKnowledgeBaseInfoTool\` untuk mencari informasi relevan.
    *   Parameter 'query' untuk tool ini bisa berupa inti pertanyaan pelanggan atau topik spesifik yang Anda identifikasi (mis. "coating motor", "jam buka", "garansi").
3.  **Ambil Detail Produk/Layanan (JIKA PERLU untuk HARGA/DURASI):**
    *   Jika pelanggan bertanya tentang HARGA atau DURASI layanan spesifik, ATAU jika informasi dari \`getKnowledgeBaseInfoTool\` menyarankan perlunya detail lebih lanjut (misalnya, "untuk harga Coating, tanyakan jenis motor"), gunakan tool \`getProductServiceDetailsByNameTool\`.
    *   Sebelum memanggil tool ini, pastikan Anda memiliki informasi yang cukup (seperti jenis motor atau jenis cat jika diperlukan, sesuai instruksi dari \`getKnowledgeBaseInfoTool\` atau logika umum). Jika belum, TANYAKAN dulu ke pelanggan.
4.  **Ambil Data Klien (JIKA PERLU):**
    *   Jika pesan pelanggan berkaitan dengan data pribadi mereka (poin, motor terdaftar, dll.), atau jika Anda memerlukan informasi spesifik tentang pelanggan untuk menjawab pertanyaan, gunakan tool \`getClientDetailsTool\`. Anda bisa menggunakan nomor pengirim ({{{senderNumber}}}) atau nama yang mungkin disebut dalam percakapan sebagai input untuk tool ini.
5.  **Sintesis Jawaban:**
    *   Gunakan informasi yang Anda dapatkan dari semua tool yang dipanggil (jika ada) dan riwayat percakapan untuk menyusun balasan yang informatif dan membantu.
    *   Jika tool tidak menemukan informasi yang dibutuhkan, sampaikan dengan sopan. JANGAN menebak-nebak.
    *   Jika Anda benar-benar tidak bisa membantu atau pertanyaan terlalu kompleks/sensitif, Anda BOLEH menyarankan pelanggan untuk menunggu bantuan dari staf manusia, atau jika ada indikasi kuat pelanggan ingin berbicara dengan manusia, sampaikan bahwa Anda akan mencoba meneruskannya.

Aturan Tambahan:
*   **Sapaan Awal dari Pelanggan**:
    *   Jika pesan pelanggan adalah sapaan umum (misalnya "Halo", "Siang", "Pagi", "Info dong", "Bro") dan TIDAK mengandung pertanyaan spesifik:
        *   Sapa balik dengan ramah sesuai {{{agentBehavior}}}.
        *   Tanyakan secara umum apa yang bisa dibantu atau layanan apa yang mereka cari.
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
`,
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

    
