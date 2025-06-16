
'use server';
/**
 * @fileOverview Flow AI untuk membantu membuat balasan pesan WhatsApp customer service.
 * Dilengkapi dengan kemampuan untuk mencari informasi produk/layanan, data klien,
 * menggunakan pengaturan agen AI dinamis, melakukan booking, dan notifikasi handoff.
 *
 * - generateWhatsAppReply - Fungsi yang menghasilkan draf balasan.
 */

import { ai } from '@/ai/genkit';
import { getProductServiceDetailsByNameTool } from '@/ai/tools/productLookupTool';
import { getClientDetailsTool } from '@/ai/tools/clientLookupTool';
import { getKnowledgeBaseInfoTool } from '@/ai/tools/knowledgeLookupTool';
import { createBookingTool } from '@/ai/tools/createBookingTool';
import type { WhatsAppReplyInput, WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema } from '@/types/ai/cs-whatsapp-reply';
import { z } from 'genkit';

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { AiSettingsFormSchema, DEFAULT_AI_SETTINGS, type AiSettingsFormValues } from '@/types/aiSettings';
import { sendWhatsAppMessage } from '@/services/whatsappService';
import { format as formatDateFns, addDays, parseISO } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';

const CUSTOMER_HANDOFF_KEYWORDS = [
    "manusia", "staf", "cs", "customer service", "operator", "agen", "admin", "orang", "komplain", "bicara langsung"
];
const AI_INABILITY_KEYWORDS = [
    "tidak bisa membantu", "kurang yakin", "tidak menemukan informasi", "tidak tahu", "sulit mengerti", "bukan kapasitas saya", "hubungi staf", "tidak ada data", "maaf, saya tidak dapat"
];


export async function generateWhatsAppReply({ customerMessage, senderNumber, chatHistory }: { customerMessage: string; senderNumber?: string; chatHistory?: ChatMessage[] }): Promise<WhatsAppReplyOutput> {
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

  const now = new Date();
  const flowInput: WhatsAppReplyInput = {
    customerMessage: customerMessage,
    senderNumber: senderNumber,
    chatHistory: chatHistory || [],
    agentBehavior: agentSettings.agentBehavior || '',
    knowledgeBase: agentSettings.knowledgeBaseDescription || '',
    currentDate: formatDateFns(now, 'yyyy-MM-dd'),
    currentTime: formatDateFns(now, 'HH:mm'),
    tomorrowDate: formatDateFns(addDays(now, 1), 'yyyy-MM-dd'),
    dayAfterTomorrowDate: formatDateFns(addDays(now, 2), 'yyyy-MM-dd'),
  };

  const aiResponse = await whatsAppReplyFlow(flowInput);

  if (agentSettings.enableHumanHandoff && agentSettings.humanAgentWhatsAppNumber && agentSettings.humanAgentWhatsAppNumber.trim() !== '' && senderNumber) {
    let needsHandoff = false;
    let handoffReason = "";

    if (agentSettings.transferConditions.includes("Pelanggan Meminta Secara Eksplisit") || agentSettings.transferConditions.includes("Disebut Kata Kunci Eskalasi (mis. 'manajer', 'komplain')")) {
      if (CUSTOMER_HANDOFF_KEYWORDS.some(keyword => customerMessage.toLowerCase().includes(keyword))) {
        needsHandoff = true;
        handoffReason = "Pelanggan meminta untuk berbicara dengan agen manusia.";
      }
    }

    if (!needsHandoff && agentSettings.transferConditions.some(tc => tc.startsWith("AI Tidak Menemukan Jawaban"))) {
      if (AI_INABILITY_KEYWORDS.some(keyword => aiResponse.suggestedReply.toLowerCase().includes(keyword))) {
        needsHandoff = true;
        handoffReason = "AI mengindikasikan tidak dapat menemukan jawaban atau membantu.";
      }
    }
    
    if (needsHandoff) {
      console.log(`Handoff condition met for ${senderNumber}. Reason: ${handoffReason}`);
      const handoffNotificationMessage = `🔔 *Notifikasi Handoff Agen AI* 🔔

Pelanggan: ${senderNumber}
Alasan Handoff: ${handoffReason}

Pesan Terakhir Pelanggan:
_"${customerMessage}"_

Saran Balasan AI (jika ada):
_"${aiResponse.suggestedReply}"_

Mohon segera tindak lanjuti.`;

      try {
        await sendWhatsAppMessage(agentSettings.humanAgentWhatsAppNumber, handoffNotificationMessage);
        console.log(`Handoff notification sent to human agent: ${agentSettings.humanAgentWhatsAppNumber}`);
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
  tools: [
    getKnowledgeBaseInfoTool, 
    getProductServiceDetailsByNameTool, 
    getClientDetailsTool, 
    createBookingTool
  ],
  prompt: `Anda adalah Customer Service Assistant AI untuk QLAB Auto Detailing.
Perilaku Anda harus: {{{agentBehavior}}}.
Panduan umum: {{{knowledgeBase}}}.
Tanggal hari ini: {{{currentDate}}}. Waktu saat ini: {{{currentTime}}} (WIB).
Tanggal besok: {{{tomorrowDate}}}. Tanggal lusa: {{{dayAfterTomorrowDate}}}.
Nomor WhatsApp Pelanggan: {{{senderNumber}}}.

Alur Kerja Utama yang WAJIB diikuti:
1.  **Analisa Pesan Pelanggan:** Pahami maksud pelanggan dengan seksama.
2.  **Informasi Umum/Kebijakan/Pemetaan Ukuran Motor:**
    *   Jika pelanggan bertanya tentang informasi umum (jam buka, alamat, kebijakan garansi), ATAU jika Anda perlu mengetahui kategori ukuran motor (misalnya "XMAX itu ukuran apa?"), **SEGERA PANGGIL \`getKnowledgeBaseInfoTool\`**.
    *   **LANGSUNG GUNAKAN outputnya** untuk menjawab pertanyaan atau melanjutkan ke langkah berikutnya.
3.  **Informasi Detail Produk/Layanan (Harga/Durasi):**
    *   Jika pertanyaan terkait harga atau durasi layanan yang memiliki **VARIAN BERDASARKAN UKURAN MOTOR** (misalnya Paket Detailing S, M, L, XL):
        1.  **LANGKAH A (JIKA NAMA MOTOR DISEBUT, MIS. XMAX, VARIO):**
            *   **WAJIB PERTAMA**: Panggil \`getKnowledgeBaseInfoTool\` dengan query seperti "Ukuran motor XMAX" atau "XMAX masuk kategori ukuran apa?".
            *   **Jika tool mengembalikan kategori ukuran (mis. "XL" atau "L"):**
                *   **WAJIB KEDUA**: SEKARANG panggil \`getProductServiceDetailsByNameTool\` dengan NAMA LAYANAN LENGKAP DENGAN VARIAN UKURANNYA (mis. "Paket Full Detailing XL" atau "Coating Motor Doff XL").
                *   Sampaikan harga dan durasi HANYA dari output tool ini.
            *   **Jika tool TIDAK mengembalikan kategori ukuran ATAU mengembalikan "found: false":**
                *   **WAJIB**: TANYAKAN kepada pelanggan ukuran motornya (mis. "Untuk motor XMAX Kakak, masuknya ukuran apa ya? S, M, L, atau XL?"). JANGAN menebak. TUNGGU JAWABAN PELANGGAN.
                *   Setelah pelanggan menjawab (mis. "XL"), BARU panggil \`getProductServiceDetailsByNameTool\` dengan nama layanan + ukuran (mis. "Paket Full Detailing XL").
        2.  **LANGKAH B (JIKA UKURAN LANGSUNG DISEBUT PELANGGAN ATAU TIDAK ADA NAMA MOTOR SPESIFIK):**
            *   Langsung panggil \`getProductServiceDetailsByNameTool\` dengan nama layanan + ukuran (mis. "Paket Detailing L").
            *   Sampaikan harga dan durasi HANYA dari output tool ini.
        3.  **PENTING:** Jika \`getProductServiceDetailsByNameTool\` mengembalikan \`null\` atau tidak ada harga/durasi untuk varian ukuran tersebut, **JANGAN MENEBAK**. Sampaikan bahwa Anda tidak menemukan info untuk kombinasi layanan dan ukuran tersebut, dan sarankan konsultasi.
    *   Untuk layanan lain yang harganya spesifik atau **TIDAK memiliki varian ukuran motor**:
        *   **SEGERA PANGGIL \`getProductServiceDetailsByNameTool\`** dengan nama layanan sejelas mungkin.
        *   Jika tool mengembalikan harga, sampaikan. Jika tidak, bilang tidak ketemu.
    *   Untuk layanan dengan harga **SANGAT VARIABEL** (mis. 'repaint', 'custom', dll.):
        *   SEGERA PANGGIL \`getKnowledgeBaseInfoTool\` untuk mencari informasi umum tentang layanan tersebut (mis. "Info repaint").
        *   Jika tool (KB atau Produk) TIDAK memberikan harga pasti, **JANGAN menebak atau memberikan estimasi**. Sampaikan bahwa harga dan durasi sangat tergantung detail dan perlu konsultasi langsung.
4.  **Informasi Klien:** Jika perlu info spesifik klien (poin, motor terdaftar), **SEGERA PANGGIL \`getClientDetailsTool\`**.
5.  **Proses Booking Layanan:**
    *   HANYA tawarkan booking jika pelanggan menunjukkan minat jelas atau meminta dibuatkan jadwal.
    *   **Kumpulkan SEMUA informasi berikut SEBELUM memanggil \`createBookingTool\`**:
        1.  **Nama Layanan Lengkap (termasuk varian ukuran jika ada)** dan **ID Layanan**: Dapatkan dari hasil \`getProductServiceDetailsByNameTool\`. Pastikan layanan yang akan dibooking sudah benar dan harganya diketahui.
        2.  **Estimasi Durasi**: Dapatkan dari hasil \`getProductServiceDetailsByNameTool\`.
        3.  **Tanggal Booking** (format YYYY-MM-DD).
        4.  **Waktu Booking** (format HH:MM 24 jam).
        5.  **Informasi Kendaraan** (mis. "Honda Vario B 1234 XYZ").
        6.  **Nama Lengkap Pelanggan**.
    *   **Konfirmasi Slot (SANGAT PENTING):** JIKA pelanggan meminta waktu yang SANGAT SPESIFIK (mis. "besok jam 10 pagi pas"), Anda HARUS bertanya kepada staf (dengan mengindikasikan Anda tidak bisa cek slot) atau menyarankan pelanggan untuk fleksibel. JANGAN berasumsi slot pasti ada.
    *   Setelah semua info lengkap dan slot waktu (jika spesifik) telah dikonfirmasi (atau diasumsikan tersedia untuk permintaan umum), **BARU panggil \`createBookingTool\`**.
    *   Sampaikan hasil dari \`createBookingTool\` kepada pelanggan.
6.  **Sintesis Jawaban:** Gabungkan info dari tool dan histori untuk jawaban yang membantu & sesuai perilaku. **Jika Anda baru saja menggunakan tool, PASTIKAN Anda merespons pertanyaan pelanggan yang memicu penggunaan tool tersebut dengan HASIL tool tersebut, bukan malah mengulang pertanyaan atau mengatakan "tunggu sebentar" lagi.**

Aturan Tambahan yang WAJIB DIPATUHI:
*   **ATURAN UTAMA PEMANGGILAN TOOL**: Jika Anda menilai perlu informasi dari salah satu tool yang tersedia:
    1.  **LANGSUNG PANGGIL** tool yang paling relevan dengan informasi yang Anda butuhkan. **JANGAN PERNAH** mengatakan "tunggu sebentar", "sedang dicek", "loading", atau semacamnya KEPADA PELANGGAN SEBELUM atau SELAMA pemanggilan tool.
    2.  Setelah Anda mendapatkan hasil dari tool:
        *   Jika tool berhasil menemukan informasi: **LANGSUNG GUNAKAN** informasi tersebut untuk menyusun jawaban Anda di giliran yang sama.
        *   Jika tool TIDAK menemukan informasi (misalnya, tool mengembalikan \`null\`, atau \`found: false\`): Sampaikan dengan sopan bahwa Anda tidak menemukan informasi yang dicari tersebut. JANGAN membuat-nebak atau mengarang informasi.
    3.  **RESPONS ANDA KEPADA PELANGGAN TIDAK BOLEH MENGANDUNG INDIKASI BAHWA ANDA SEDANG MELAKUKAN PROSES INTERNAL PENCARIAN DATA.**
*   **Sapaan Awal Umum**: Jika hanya sapaan umum dari pelanggan tanpa pertanyaan spesifik, sapa balik dengan ramah, tanyakan apa yang bisa dibantu. JANGAN gunakan tool apapun.
*   **Harga/Durasi**: Sebutkan NAMA LAYANAN LENGKAP, deskripsi singkat, ESTIMASI DURASI, dan HARGA (Rp) HANYA JIKA informasi tersebut tersedia di output tool \`getProductServiceDetailsByNameTool\` atau \`getKnowledgeBaseInfoTool\`. Jika tidak ada, jangan menebak dan ikuti aturan untuk layanan harga variabel.
*   **Bahasa**: Gunakan bahasa Indonesia yang baku namun tetap ramah dan sesuai dengan persona agen. Ringkas jika perlu, gunakan poin-poin.
*   **Penutup**: Akhiri percakapan dengan sopan kecuali jika percakapan jelas akan berlanjut.

SANGAT PENTING: Hasilkan balasan Anda dalam format JSON yang valid. Objek JSON harus memiliki satu kunci bernama "suggestedReply" dengan nilai berupa string teks balasan Anda.
Contoh: {"suggestedReply": "Tentu, Kak! Untuk layanan coating motor Beat harganya Rp 500.000."}
Jangan menyertakan teks atau penjelasan lain di luar objek JSON ini.
Pastikan balasan dalam field "suggestedReply" tetap ramah dan profesional, dan JANGAN PERNAH menyebutkan nama tool yang Anda gunakan.

{{#each chatHistory}}
  {{#if @first}}
Riwayat percakapan sebelumnya (JANGAN mengulang sapaan "Halo" jika sudah ada riwayat):
  {{/if}}
  {{this.role}}: {{{this.content}}}
{{/each}}

Pesan BARU dari Pelanggan:
{{{customerMessage}}}
\`
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

    
