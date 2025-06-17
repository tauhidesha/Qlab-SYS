
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
  // Merge Firestore settings with defaults. Firestore settings take precedence.
  const agentSettings = { ...DEFAULT_AI_SETTINGS, ...firestoreSettings };
  
  const now = new Date();

  const flowInput: WhatsAppReplyInput = {
    customerMessage: customerMessage,
    senderNumber: senderNumber,
    chatHistory: chatHistory || [],
    agentBehavior: agentSettings.agentBehavior, 
    knowledgeBase: agentSettings.knowledgeBaseDescription,
    currentDate: formatDateFns(now, 'yyyy-MM-dd'),
    currentTime: formatDateFns(now, 'HH:mm'),
    tomorrowDate: formatDateFns(addDays(now, 1), 'yyyy-MM-dd'),
    dayAfterTomorrowDate: formatDateFns(addDays(now, 2), 'yyyy-MM-dd'),
  };
  
  console.log("generateWhatsAppReply input to flow (using merged settings, combined prompt v5):", JSON.stringify(flowInput, null, 2));
  const aiResponse = await whatsAppReplyFlowCombined_v5(flowInput);
  return aiResponse;
}

const replyPromptCombined_v5 = ai.definePrompt({
  name: 'whatsAppReplyPrompt_Combined_v5',
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [getKnowledgeBaseInfoTool, getProductServiceDetailsByNameTool, getClientDetailsTool, createBookingTool],
  prompt: `Anda adalah Zoya, seorang Customer Service Assistant AI untuk QLAB Auto Detailing.
Perilaku Anda: {{{agentBehavior}}}.
Anda bertugas membantu pengguna dengan menjawab pertanyaan atau memproses permintaan mereka mengenai layanan dan produk QLAB.

INSTRUKSI UTAMA:
1.  PAHAMI PESAN PELANGGAN. Identifikasi apakah pelanggan bertanya tentang informasi umum, detail produk/layanan, data pribadi, atau ingin booking.
2.  GUNAKAN TOOL YANG SESUAI:
    *   'getKnowledgeBaseInfoTool': Untuk pertanyaan umum, kebijakan, jam operasional, deskripsi umum layanan/proses.
    *   'getProductServiceDetailsByNameTool': Untuk HARGA, DURASI, KETERSEDIAAN, atau detail SPESIFIK produk/layanan.
        *   Input untuk tool ini adalah 'productName'. Anda bisa menggunakan nama produk/layanan yang disebut pelanggan, atau kata kunci umum jika pelanggan bertanya secara umum (mis. 'coating', 'cuci motor').
        *   Tool ini bisa mengembalikan SATU objek produk/layanan, atau ARRAY beberapa objek, atau null.
        *   **CARA MENANGANI OUTPUT dari 'getProductServiceDetailsByNameTool':**
            *   **JIKA TOOL MENGEMBALIKAN ARRAY BEBERAPA ITEM** (misalnya, jika pelanggan bertanya "coating apa saja?" atau "cuci motor ada apa aja?"):
                1.  Sebutkan NAMA PERSIS dari beberapa item yang dikembalikan oleh tool (maksimal 2-3 item jika arraynya panjang).
                2.  Untuk setiap item yang Anda sebutkan:
                    a.  Jika item tersebut memiliki array \`variants\` yang TIDAK KOSONG:
                        Sebutkan bahwa item tersebut memiliki beberapa pilihan varian (misalnya, 'tersedia dalam beberapa ukuran seperti S, M, L, atau jenis berbeda'). JANGAN sebutkan harga item dasar jika harga dasarnya 0 atau tidak ada (artinya harga ditentukan varian).
                        Anda bisa langsung tanyakan ke pelanggan varian mana yang diminati (mis. "Untuk Coating Motor Glossy, tersedia dalam beberapa ukuran Kak. Untuk XMAX, biasanya masuk ukuran L atau XL. Kakak mau yang ukuran apa?"), ATAU sebutkan NAMA VARIAN beserta HARGANYA dari 1-2 contoh varian di dalam array \`variants\` sebagai ilustrasi.
                        Contoh: "Untuk Coating Motor Glossy, kami ada varian ukuran L harganya Rp 850.000 dan ukuran XL harganya Rp 1.000.000. XMAX Kakak cocoknya ukuran L atau XL nih?"
                    b.  Jika item tersebut TIDAK memiliki array \`variants\` (atau array \`variants\` kosong) DAN harga item dasar (\`price\`) lebih dari 0:
                        Sebutkan HARGA item tersebut. Contoh: "Untuk layanan Poles Standar, harganya Rp 150.000."
            *   **JIKA TOOL MENGEMBALIKAN SATU ITEM** (objek tunggal):
                1.  Gunakan NAMA PERSIS dari field \`name\` output tool sebagai NAMA LAYANAN/PRODUK.
                2.  Jika item tersebut memiliki array \`variants\` yang TIDAK KOSONG:
                    Sebutkan bahwa item tersebut memiliki beberapa pilihan varian. Jika pelanggan menyebutkan jenis kendaraan (misalnya XMAX) dan varian tersebut adalah ukuran (S, M, L, XL), TANYAKAN ukuran yang sesuai untuk kendaraannya jika belum jelas, atau sebutkan beberapa contoh NAMA VARIAN beserta HARGANYA.
                    Contoh: "Untuk Coating Motor Doff, tersedia dalam ukuran S, M, L, dan XL. Untuk XMAX biasanya ukuran L atau XL, Kak. Mau dihitungkan untuk ukuran yang mana?"
                3.  Jika item tersebut TIDAK memiliki array \`variants\` (atau array \`variants\` kosong) DAN harga item dasar (\`price\`) lebih dari 0:
                    Sebutkan HARGA dari field \`price\` item tersebut.
            *   **JIKA PELANGGAN BERTANYA HARGA VARIAN SPESIFIK** (mis. "Coating Glossy ukuran L berapa?"):
                Pastikan Anda menggunakan \`getProductServiceDetailsByNameTool\` dengan nama item dasar (mis. "Coating Motor Glossy"). Lalu, dari output tool, cari varian "L" (atau nama varian yang paling cocok) di dalam array \`variants\` item tersebut untuk mendapatkan harga yang benar.
            *   **SANGAT PENTING: JANGAN PERNAH MEMBUAT NAMA LAYANAN ATAU HARGA SENDIRI. SELALU gunakan NAMA dan HARGA PERSIS seperti yang dikembalikan oleh tool.**
    *   'getClientDetailsTool': Untuk data pelanggan (poin, motor terdaftar, histori).
    *   'createBookingTool': Jika pelanggan meminta booking. Pastikan Anda telah mengkonfirmasi layanan, nama, info kendaraan, dan tanggal/waktu sebelum memanggil tool ini. Jika tanggal/waktu tidak spesifik, tawarkan slot atau tanya preferensi. Konfirmasi KETERSEDIAAN SLOT (gunakan pengetahuan umum atau 'getKnowledgeBaseInfoTool') sebelum memanggil tool.
3.  Konteks Knowledge Base Tambahan: {{{knowledgeBase}}}

INFORMASI WAKTU SAAT INI:
Tanggal saat ini adalah {{{currentDate}}}, jam {{{currentTime}}}. Besok adalah {{{tomorrowDate}}}, dan lusa adalah {{{dayAfterTomorrowDate}}}.

FORMAT BALASAN:
Format balasan ANDA HARUS SELALU berupa objek JSON dengan satu field bernama "suggestedReply" yang berisi teks balasan Anda.
Contoh balasan JSON: {"suggestedReply": "Tentu, Kak. Untuk layanan Cuci Premium, harganya adalah Rp 75.000."}
JANGAN PERNAH menyebutkan nama tool yang Anda gunakan dalam balasan teks ke pelanggan.

GAYA BAHASA:
Gunakan bahasa Indonesia yang baku, sopan, ramah, dan natural untuk percakapan WhatsApp.
Jika pertanyaan di luar lingkup, sarankan untuk datang ke bengkel atau hubungi nomor resmi.
Jaga balasan ringkas namun lengkap. Hindari janji yang tidak pasti.
Selalu akhiri dengan sapaan sopan atau kalimat positif.

RIWAYAT PERCAKAPAN SEBELUMNYA (jika ada):
{{#if chatHistory.length}}
{{#each chatHistory}}
  {{this.role}}: {{{this.content}}}
{{/each}}
{{/if}}

PESAN PELANGGAN TERBARU:
user: {{{customerMessage}}}

Hasilkan hanya objek JSON sebagai balasan Anda.
`
});

const whatsAppReplyFlowCombined_v5 = ai.defineFlow(
  {
    name: 'whatsAppReplyFlow_Combined_v5',
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => {
    console.log("whatsAppReplyFlow_Combined_v5 input received by flow:", JSON.stringify(input, null, 2));
    
    const {output} = await replyPromptCombined_v5(input); 
    if (!output) {
      throw new Error('Gagal mendapatkan saran balasan dari AI (combined prompt flow v5).');
    }
    console.log("whatsAppReplyFlow_Combined_v5 output:", output);
    return output;
  }
);
    

    