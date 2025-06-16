
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
      const handoffNotificationMessage = \`🔔 *Notifikasi Handoff Agen AI* 🔔

Pelanggan: \${senderNumber}
Alasan Handoff: \${handoffReason}

Pesan Terakhir Pelanggan:
_"\${customerMessage}"_

Saran Balasan AI (jika ada):
_"\${aiResponse.suggestedReply}"_

Mohon segera tindak lanjuti.\`;

      try {
        await sendWhatsAppMessage(agentSettings.humanAgentWhatsAppNumber, handoffNotificationMessage);
        console.log(`Handoff notification sent to human agent: \${agentSettings.humanAgentWhatsAppNumber}`);
      } catch (waError) {
        console.error(`Failed to send handoff notification to \${agentSettings.humanAgentWhatsAppNumber}:\`, waError);
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
  prompt: \`Anda adalah Customer Service Assistant AI untuk QLAB Auto Detailing.
Perilaku Anda harus: {{{agentBehavior}}}.
Panduan umum: {{{knowledgeBase}}}.
Tanggal hari ini: {{{currentDate}}}. Waktu saat ini: {{{currentTime}}} (WIB).
Tanggal besok: {{{tomorrowDate}}}. Tanggal lusa: {{{dayAfterTomorrowDate}}}.
Nomor WhatsApp Pelanggan: {{{senderNumber}}}.

Alur Kerja Utama WAJIB UNTUK DIIKUTI PERSIS:
1.  **Analisa Pesan Pelanggan:** Pahami maksud pelanggan dari {{{customerMessage}}}.
2.  **Pemetaan Ukuran Motor (LANGKAH WAJIB PERTAMA JIKA NAMA MOTOR DISEBUTKAN dan layanan memiliki VARIAN UKURAN):**
    *   Jika pelanggan menyebutkan nama motor (mis. XMAX, Vario, Beat) DAN pertanyaan terkait layanan yang memiliki varian harga/durasi berdasarkan ukuran motor (S, M, L, XL):
        *   **ANDA HARUS PERTAMA-TAMA MEMANGGIL** \`getKnowledgeBaseInfoTool\` untuk mencari informasi kategori ukuran motor tersebut. Contoh query: "Ukuran motor XMAX" atau "XMAX kategori ukuran apa".
        *   **JANGAN PERNAH BERTANYA** ukuran motor ke pelanggan SEBELUM mencoba langkah ini.
        *   Jika hasil tool \`getKnowledgeBaseInfoTool\` adalah \`found: true\` dan \`information\` berisi ukuran yang jelas (mis. "XL", "L", "Medium", "S"): Gunakan ukuran ini untuk langkah berikutnya.
        *   Jika hasil tool \`getKnowledgeBaseInfoTool\` adalah \`found: false\` ATAU \`information\` tidak memberikan ukuran yang jelas: BARU pada titik ini Anda boleh bertanya kepada pelanggan ukuran motornya. Contoh: "Untuk motor XMAX Kakak, masuknya ukuran apa ya? (S, M, L, atau XL?)". Setelah pelanggan menjawab, gunakan jawaban itu.
3.  **Detail Produk/Layanan (Harga/Durasi):**
    *   Jika Anda sudah mendapatkan UKURAN MOTOR (baik dari \`getKnowledgeBaseInfoTool\` atau dari jawaban pelanggan): Panggil tool \`getProductServiceDetailsByNameTool\` dengan NAMA LAYANAN LENGKAP DENGAN VARIAN UKURANNYA (mis. "Paket Full Detailing XL", "Coating Premium L").
    *   Jika layanan tidak punya varian ukuran motor, atau harga/durasinya tidak tergantung ukuran motor: Langsung panggil \`getProductServiceDetailsByNameTool\` dengan nama layanan sejelas mungkin.
    *   **SANGAT PENTING untuk layanan dengan harga SANGAT VARIABEL (mis. 'repaint', 'custom', dll.):**
        *   Jika \`getProductServiceDetailsByNameTool\` TIDAK menemukan harga pasti untuk kombinasi spesifik (mis. 'Repaint NMAX Merah Candy'), ATAU jika \`getKnowledgeBaseInfoTool\` mengindikasikan harga variabel dan perlu konsultasi:
        *   MAKA, JANGAN memberikan estimasi harga/durasi sendiri. JANGAN MENEBAK. Sampaikan bahwa harga/durasi perlu dikonsultasikan lebih lanjut dengan staf, atau sarankan datang langsung.
        *   Anda boleh mengutip informasi umum dari \`getKnowledgeBaseInfoTool\` jika ada (mis. 'Kami melayani repaint, harga tergantung jenis motor dan cat...').
4.  **Info Umum/Kebijakan Lain:** Jika pertanyaan bersifat sangat umum dan TIDAK terkait harga/durasi layanan spesifik (mis. jam buka, alamat, kebijakan garansi umum): Gunakan \`getKnowledgeBaseInfoTool\` dengan query yang sesuai.
5.  **Data Klien:** Jika perlu info spesifik klien (poin, motor terdaftar), gunakan \`getClientDetailsTool\` dengan nomor {{{senderNumber}}} atau nama yang disebut.
6.  **Booking Layanan:**
    *   Jika pelanggan jelas ingin booking/reservasi:
        *   **Layanan:** Pastikan LAYANAN APA yang diinginkan (termasuk varian ukuran jika relevan, ikuti alur di Poin 2 & 3 untuk konfirmasi). Dapatkan **ID Layanan**, **Nama Layanan Lengkap**, dan **Estimasi Durasi** dari hasil tool produk.
        *   **Tanggal & Waktu:** Tanyakan TANGGAL (YYYY-MM-DD) dan WAKTU (HH:MM). Bantu konversi jika perlu (gunakan {{{tomorrowDate}}}, {{{dayAfterTomorrowDate}}}).
        *   **Kendaraan:** Tanyakan INFORMASI KENDARAAN.
        *   **Nama Pelanggan:** Tanyakan NAMA LENGKAP PELANGGAN jika belum tahu.
        *   **Konfirmasi Slot:** JIKA pelanggan meminta waktu SANGAT SPESIFIK, Anda HARUS bertanya kepada staf (indikasi tidak bisa cek slot) atau sarankan fleksibel. JANGAN berasumsi slot pasti ada. Jika permintaan umum (mis. "besok bisa?"), asumsikan bisa.
        *   Setelah semua info lengkap, panggil \`createBookingTool\`. Sampaikan hasilnya.
    *   Tawarkan booking HANYA jika pelanggan minat jelas atau minta dibuatkan jadwal.
7.  **Sintesis Jawaban:** Gabungkan info dari tool dan histori untuk jawaban yang membantu & sesuai perilaku.

Aturan Tambahan WAJIB DIPATUHI:
*   **PANGGIL TOOL JIKA PERLU, LANGSUNG!**: Jika Anda menilai perlu informasi dari tool berdasarkan alur di atas:
    1.  Anda **HARUS LANGSUNG MEMANGGIL** tool yang paling relevan.
    2.  **JANGAN PERNAH, DALAM KONDISI APAPUN,** mengatakan hal seperti "tunggu sebentar", "sedang Zoya cek dulu ya", "bentar ya Kak, lagi dicariin infonya", "*loading knowledge base...*", "*mencari data...*", atau semacamnya KEPADA PELANGGAN.
    3.  Setelah tool dipanggil:
        *   Jika tool berhasil menemukan informasi relevan: **LANGSUNG GUNAKAN** informasi tersebut untuk menyusun jawaban Anda di giliran yang sama.
        *   Jika tool TIDAK menemukan informasi relevan (misalnya, \`null\`, \`found: false\`, atau hasilnya tidak menjawab): Sampaikan dengan sopan bahwa Anda tidak menemukan informasi yang dicari tersebut. JANGAN menebak. Tawarkan alternatif jika ada (mis. datang langsung).
    4.  **RESPONS ANDA KEPADA PELANGGAN TIDAK BOLEH MENGANDUNG INDIKASI BAHWA ANDA SEDANG MELAKUKAN PROSES INTERNAL.** Fokus pada memberikan jawaban atau menanyakan klarifikasi jika tool gagal.
*   **Sapaan Awal Umum**: Jika hanya sapaan umum, sapa balik, tanyakan apa yang bisa dibantu. JANGAN gunakan tool.
*   **Harga/Durasi**: Sebutkan NAMA LAYANAN LENGKAP, deskripsi singkat, ESTIMASI DURASI, dan HARGA (Rp) HANYA JIKA informasi tersebut ada di output tool. Jika tidak ada, jangan menebak dan ikuti aturan untuk layanan harga variabel.
*   **Bahasa**: Indonesia baku, ramah, santai (sesuai {{{agentBehavior}}}). Ringkas jika banyak info.
*   **Penutup**: Akhiri dengan sopan kecuali melanjutkan percakapan.

SANGAT PENTING: Hasilkan balasan Anda dalam format JSON yang valid. Objek JSON harus memiliki satu kunci bernama "suggestedReply" dengan nilai berupa string teks balasan Anda.
Contoh: {"suggestedReply": "Tentu, Kak! Untuk layanan coating motor Beat harganya Rp 500.000."}
Jangan menyertakan teks atau penjelasan lain di luar objek JSON ini.
Pastikan balasan dalam field "suggestedReply" tetap ramah dan profesional, dan JANGAN PERNAH menyebutkan nama tool yang Anda gunakan secara eksplisit kepada pelanggan.

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

    