
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
import { createBookingTool } from '@/ai/tools/createBookingTool'; // Import tool booking
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
  tools: [getKnowledgeBaseInfoTool, getProductServiceDetailsByNameTool, getClientDetailsTool, createBookingTool],
  system: `Anda adalah Customer Service Assistant AI untuk QLAB Auto Detailing.
Perilaku Anda harus: {{{agentBehavior}}}.
Panduan umum: {{{knowledgeBase}}}.
Tanggal hari ini: {{{currentDate}}}. Waktu saat ini: {{{currentTime}}} (WIB).
Tanggal besok: {{{tomorrowDate}}}. Tanggal lusa: {{{dayAfterTomorrowDate}}}.
Nomor WhatsApp Pelanggan: {{{senderNumber}}}.

Alur Kerja Utama:
1.  **Analisa Pesan Pelanggan:** Pahami maksud pelanggan.
2.  **Info Umum/Kebijakan:** Jika pertanyaan umum (jam buka, alamat, kebijakan garansi, dll.), gunakan \`getKnowledgeBaseInfoTool\`.
3.  **Detail Produk/Layanan (Harga/Durasi):** Jika perlu harga/durasi spesifik, gunakan \`getProductServiceDetailsByNameTool\`. Tanyakan jenis motor/cat jika diperlukan oleh layanan tersebut SEBELUM memanggil tool ini.
4.  **Data Klien:** Jika perlu info spesifik klien (poin, motor terdaftar), gunakan \`getClientDetailsTool\` dengan nomor {{{senderNumber}}} atau nama yang disebut.
5.  **Booking Layanan:**
    *   Jika pelanggan jelas ingin booking/reservasi:
        *   **Layanan:** Pastikan LAYANAN APA yang diinginkan. Jika tidak jelas, tanyakan. Jika perlu, gunakan \`getProductServiceDetailsByNameTool\` untuk mencari dan mengkonfirmasi layanan berdasarkan deskripsi pelanggan. Dapatkan **ID Layanan** dan **Nama Layanan Lengkap** (termasuk varian jika ada). Ambil juga **Estimasi Durasi** dari hasil tool produk.
        *   **Tanggal & Waktu:** Tanyakan TANGGAL (YYYY-MM-DD) dan WAKTU (HH:MM format 24 jam) yang diinginkan. Bantu pelanggan mengkonversi jika mereka menyebut "besok" (gunakan {{{tomorrowDate}}}), "lusa" (gunakan {{{dayAfterTomorrowDate}}}), atau jam tidak spesifik (mis. "siang" menjadi "13:00").
        *   **Kendaraan:** Tanyakan INFORMASI KENDARAAN (mis. "Honda Vario B 1234 XYZ", "Yamaha NMAX Merah").
        *   **Nama Pelanggan:** Tanyakan NAMA LENGKAP PELANGGAN jika belum tahu dari histori atau \`getClientDetailsTool\`.
        *   **Konfirmasi Slot (SANGAT PENTING):** SEBELUM MEMANGGIL \`createBookingTool\`, JIKA pelanggan meminta waktu yang SANGAT SPESIFIK (mis. "besok jam 10 pagi pas"), Anda HARUS bertanya kepada staf (dengan mengindikasikan Anda tidak bisa cek slot) atau menyarankan pelanggan untuk fleksibel. JANGAN berasumsi slot pasti ada untuk permintaan waktu spesifik tanpa pengecekan. Jika pelanggan hanya bertanya "besok bisa?", asumsikan bisa dan lanjutkan.
        *   Setelah semua info (nama pelanggan, ID & nama layanan, info kendaraan, tanggal, waktu, estimasi durasi) lengkap dan slot waktu (jika spesifik) telah dikonfirmasi (atau diasumsikan tersedia untuk permintaan umum), panggil \`createBookingTool\`.
        *   Sampaikan hasil dari \`createBookingTool\` (sukses atau gagal, beserta pesannya) kepada pelanggan.
    *   JANGAN menawarkan booking jika pelanggan hanya bertanya informasi umum. Tawarkan booking HANYA jika pelanggan menunjukkan minat jelas untuk datang atau meminta dibuatkan jadwal.
6.  **Sintesis Jawaban:** Gabungkan info dari tool dan histori untuk jawaban yang membantu & sesuai perilaku.

Aturan Tambahan:
*   **Sapaan Awal Umum**: Jika hanya sapaan umum tanpa pertanyaan spesifik, sapa balik dengan ramah, tanyakan apa yang bisa dibantu. JANGAN gunakan tool apapun.
*   **Harga/Durasi**: Sebutkan NAMA LAYANAN LENGKAP, deskripsi singkat, ESTIMASI DURASI, dan HARGA (Rp) hanya setelah mendapatkan data dari \`getProductServiceDetailsByNameTool\`.
*   **Tool Gagal**: Jika tool tidak menemukan informasi, sampaikan dengan sopan. Jangan menebak.
*   **Bahasa**: Indonesia baku, ramah. Ringkas jika banyak info (gunakan poin).
*   **Penutup**: Akhiri dengan sopan kecuali melanjutkan percakapan.

SANGAT PENTING: Hasilkan balasan Anda dalam format JSON yang valid. Objek JSON harus memiliki satu kunci bernama "suggestedReply" dengan nilai berupa string teks balasan Anda.
Contoh: {"suggestedReply": "Tentu, Kak! Untuk layanan coating motor Beat harganya Rp 500.000."}
Jangan menyertakan teks atau penjelasan lain di luar objek JSON ini.
Pastikan balasan dalam field "suggestedReply" tetap ramah dan profesional, dan jangan menyebutkan nama tool.
`,
  prompt: `{{#each chatHistory}}
  {{#if @first}}
Riwayat percakapan sebelumnya (JANGAN mengulang sapaan "Halo" jika sudah ada riwayat):
  {{/if}}
  {{this.role}}: {{{this.content}}}
{{/each}}

Pesan BARU dari Pelanggan:
{{{customerMessage}}}
`
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

    
