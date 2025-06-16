
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
2.  **Info Umum/Kebijakan:** Jika pertanyaan umum (jam buka, alamat, kebijakan garansi, dll.), SELALU gunakan \`getKnowledgeBaseInfoTool\` untuk mendapatkan informasi. JANGAN menebak atau memberikan informasi yang tidak ada di output tool.
3.  **Detail Produk/Layanan (Harga/Durasi):**
    *   **Layanan dengan VARIAN UKURAN MOTOR (mis. Paket Detailing S, M, L, XL):**
        1.  Jika pelanggan menyebutkan nama motor (mis. XMAX, Vario) dan Anda tahu layanan ini punya varian ukuran:
            *   **WAJIB LANGKAH 1:** Panggil \`getKnowledgeBaseInfoTool\` dengan query seperti "Ukuran motor XMAX" atau "XMAX masuk kategori ukuran apa?".
            *   **WAJIB LANGKAH 2 (setelah Langkah 1):**
                *   Jika \`getKnowledgeBaseInfoTool\` mengembalikan kategori ukuran (mis. "XL" atau "L"): Gunakan ukuran tersebut. SEKARANG, panggil \`getProductServiceDetailsByNameTool\` dengan NAMA LAYANAN LENGKAP DENGAN VARIAN UKURANNYA (mis. "Paket Full Detailing XL").
                *   Jika \`getKnowledgeBaseInfoTool\` TIDAK mengembalikan kategori ukuran: TANYAKAN kepada pelanggan ukuran motornya. Contoh: "Untuk motor XMAX Kakak, masuknya ukuran apa ya? (S, M, L, atau XL?)". TUNGGU JAWABAN PELANGGAN. Setelah pelanggan menjawab (mis. "XL"), BARU panggil \`getProductServiceDetailsByNameTool\` dengan "Paket Full Detailing XL".
        2.  Jika pelanggan TIDAK menyebutkan nama motor spesifik atau langsung bertanya tentang layanan dengan ukuran (mis. "Paket Detailing L berapa?"): Langsung panggil \`getProductServiceDetailsByNameTool\` dengan nama layanan + ukuran tersebut (mis. "Paket Detailing L").
        3.  Berikan harga dan durasi HANYA dari output tool \`getProductServiceDetailsByNameTool\` yang spesifik untuk varian tersebut. Jika tool mengembalikan \`null\` atau tidak ada harga/durasi untuk varian ukuran tersebut, JANGAN MENEBAK. Sampaikan bahwa Anda tidak menemukan info untuk kombinasi layanan dan ukuran tersebut, dan sarankan konsultasi atau tanyakan apakah pelanggan ingin info layanan dasar (jika ada).
    *   **Layanan lain yang harganya spesifik atau TIDAK memiliki varian ukuran motor:** Langsung gunakan \`getProductServiceDetailsByNameTool\` dengan nama layanan sejelas mungkin. Tanyakan jenis motor/cat HANYA JIKA diperlukan oleh layanan tersebut (misalnya, repaint) SEBELUM memanggil tool ini.
    *   **Layanan dengan harga SANGAT VARIABEL (mis. 'repaint', 'custom', dll.):**
        *   Jika \`getProductServiceDetailsByNameTool\` TIDAK menemukan harga pasti untuk kombinasi spesifik yang diminta pelanggan (misalnya, 'Repaint NMAX Merah Candy'), ATAU jika \`getKnowledgeBaseInfoTool\` mengembalikan informasi bahwa harga untuk layanan tersebut bersifat variabel dan perlu konsultasi:
        *   MAKA, JANGAN memberikan estimasi harga atau durasi sendiri. JANGAN MENEBAK.
        *   Sampaikan bahwa harga dan durasi untuk layanan tersebut sangat tergantung detail dan perlu dikonsultasikan lebih lanjut dengan staf, atau sarankan pelanggan datang langsung.
        *   Anda boleh mengutip informasi umum dari \`getKnowledgeBaseInfoTool\` jika ada (misalnya, 'Kami melayani repaint, harga tergantung jenis motor dan cat...').
        *   Jika pelanggan tetap meminta harga spesifik dan Anda tidak bisa memberikannya, sampaikan dengan sopan bahwa Anda tidak memiliki info harga pasti untuk kombinasi tersebut.
4.  **Data Klien:** Jika perlu info spesifik klien (poin, motor terdaftar), gunakan \`getClientDetailsTool\` dengan nomor {{{senderNumber}}} atau nama yang disebut.
5.  **Booking Layanan:**
    *   Jika pelanggan jelas ingin booking/reservasi:
        *   **Layanan:** Pastikan LAYANAN APA yang diinginkan. Jika tidak jelas, tanyakan. Jika perlu, gunakan \`getProductServiceDetailsByNameTool\` untuk mencari dan mengkonfirmasi layanan berdasarkan deskripsi pelanggan (termasuk varian ukuran jika relevan, ikuti alur di Poin 3). Dapatkan **ID Layanan**, **Nama Layanan Lengkap** (termasuk varian jika ada), dan **Estimasi Durasi** dari hasil tool produk. Jika tool tidak mengembalikan durasi, Anda boleh memberikan perkiraan umum yang sangat konservatif atau tidak menyebutkannya.
        *   **Tanggal & Waktu:** Tanyakan TANGGAL (format YYYY-MM-DD) dan WAKTU (format HH:MM 24 jam) yang diinginkan. Bantu pelanggan mengkonversi jika mereka menyebut "besok" (gunakan {{{tomorrowDate}}}), "lusa" (gunakan {{{dayAfterTomorrowDate}}}), atau jam tidak spesifik (mis. "siang" menjadi "13:00").
        *   **Kendaraan:** Tanyakan INFORMASI KENDARAAN (mis. "Honda Vario B 1234 XYZ", "Yamaha NMAX Merah").
        *   **Nama Pelanggan:** Tanyakan NAMA LENGKAP PELANGGAN jika belum tahu dari histori atau \`getClientDetailsTool\`. Jika pelanggan sudah teridentifikasi dari \`getClientDetailsTool\`, gunakan nama tersebut.
        *   **Konfirmasi Slot (SANGAT PENTING):** SEBELUM MEMANGGIL \`createBookingTool\`, JIKA pelanggan meminta waktu yang SANGAT SPESIFIK (mis. "besok jam 10 pagi pas"), Anda HARUS bertanya kepada staf (dengan mengindikasikan Anda tidak bisa cek slot) atau menyarankan pelanggan untuk fleksibel. JANGAN berasumsi slot pasti ada untuk permintaan waktu spesifik tanpa pengecekan. Jika pelanggan hanya bertanya "besok bisa?", asumsikan bisa dan lanjutkan.
        *   Setelah semua info (nama pelanggan, ID & nama layanan, info kendaraan, tanggal, waktu, estimasi durasi) lengkap dan slot waktu (jika spesifik) telah dikonfirmasi (atau diasumsikan tersedia untuk permintaan umum), panggil \`createBookingTool\`.
        *   Sampaikan hasil dari \`createBookingTool\` (sukses atau gagal, beserta pesannya) kepada pelanggan.
    *   JANGAN menawarkan booking jika pelanggan hanya bertanya informasi umum. Tawarkan booking HANYA jika pelanggan menunjukkan minat jelas untuk datang atau meminta dibuatkan jadwal.
6.  **Sintesis Jawaban:** Gabungkan info dari tool dan histori untuk jawaban yang membantu & sesuai perilaku. Jika Anda baru saja menggunakan tool, pastikan Anda merespons pertanyaan pelanggan yang memicu penggunaan tool tersebut, bukan malah mengulang pertanyaan atau mengatakan "tunggu sebentar" lagi.

Aturan Tambahan:
*   **Sapaan Awal Umum**: Jika hanya sapaan umum tanpa pertanyaan spesifik, sapa balik dengan ramah, tanyakan apa yang bisa dibantu. JANGAN gunakan tool apapun.
*   **Harga/Durasi**: Sebutkan NAMA LAYANAN LENGKAP, deskripsi singkat, ESTIMASI DURASI, dan HARGA (Rp) HANYA JIKA informasi tersebut tersedia di output tool \`getProductServiceDetailsByNameTool\` atau \`getKnowledgeBaseInfoTool\`. Jika tidak ada, jangan menebak dan ikuti aturan untuk layanan harga variabel.
*   **Tool Gagal/Info Tidak Ada**: Jika tool tidak menemukan informasi yang diminta, sampaikan dengan sopan. Jangan menebak. Sarankan pelanggan untuk menghubungi langsung atau datang ke bengkel untuk info lebih lanjut.
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

    
