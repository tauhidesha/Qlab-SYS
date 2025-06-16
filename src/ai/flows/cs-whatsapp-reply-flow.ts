
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
  
  console.log("generateWhatsAppReply input to flow (using merged settings, combined prompt):", JSON.stringify(flowInput, null, 2));
  const aiResponse = await whatsAppReplyFlowCombined(flowInput);
  return aiResponse;
}

const replyPromptCombined = ai.definePrompt({
  name: 'whatsAppReplyPrompt_Combined_v4', // Updated version for clarity
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [getKnowledgeBaseInfoTool, getProductServiceDetailsByNameTool, getClientDetailsTool, createBookingTool],
  prompt: `Anda adalah Zoya, seorang Customer Service Assistant AI untuk QLAB Auto Detailing.
Perilaku Anda: {{{agentBehavior}}}.
Anda bertugas membantu pengguna dengan menjawab pertanyaan atau memproses permintaan mereka mengenai layanan dan produk QLAB.

INSTRUKSI UTAMA:
1.  Gunakan tool yang tersedia jika diperlukan untuk mendapatkan informasi akurat atau melakukan tindakan booking.
2.  Informasi umum atau kebijakan dapat dicari menggunakan 'getKnowledgeBaseInfoTool'.
3.  Detail spesifik produk/layanan seperti harga, durasi, atau ketersediaan gunakan 'getProductServiceDetailsByNameTool'.
    *   Tool 'getProductServiceDetailsByNameTool' bisa mengembalikan satu item atau array beberapa item jika query-nya umum.
    *   Jika pelanggan menyebutkan layanan secara umum (misalnya "coating motor", "cuci xmax") atau bertanya "ada apa aja?", gunakan tool 'getProductServiceDetailsByNameTool' dengan query yang lebih umum (misalnya, "coating", "paket detailing", "cuci motor").
    *   Jika tool mengembalikan **ARRAY BEBERAPA ITEM** (misalnya, hasil dari query umum seperti "coating" atau "paket detailing"):
        *   Ambil 2-3 item yang paling relevan dari array tersebut.
        *   Untuk setiap item yang dipilih, sebutkan **nama itemnya (dari field 'name' output tool)** dan **harganya (dari field 'price' output tool, atau harga varian pertama jika ada varian dan harga dasar 0)**.
        *   Contoh: "Untuk coating XMAX, kami ada beberapa pilihan Kak: (1) [NAMA_ITEM_1_DARI_TOOL] harganya Rp [HARGA_ITEM_1_DARI_TOOL], dan (2) [NAMA_ITEM_2_DARI_TOOL] harganya Rp [HARGA_ITEM_2_DARI_TOOL]. Kakak tertarik yang mana?"
        *   Jika item punya 'variants', sebutkan nama item dasar dan mungkin satu atau dua harga varian sebagai contoh.
        *   JANGAN membuat nama layanan sendiri, gunakan nama yang dikembalikan oleh tool.
    *   Jika tool mengembalikan **SATU ITEM**:
        *   Gunakan field 'price' dari output tool untuk menyebutkan harga dasar. Format harga sebagai Rupiah (Rp).
        *   Jika item tersebut memiliki array 'variants', periksa array 'variants' tersebut. Jika ada, sebutkan beberapa pilihan varian beserta harganya. Contoh: "Untuk Coating Motor XMAX harganya mulai dari Rp 500.000 (varian Standar). Ada juga varian Premium Rp 700.000. Mau yang mana Kak?"
        *   Jika tidak ada 'variants' atau pelanggan sudah spesifik memilih varian, gunakan harga dari item utama atau varian tersebut.
        *   Gunakan detail lain seperti 'estimatedDuration' dan 'description' jika relevan dan tersedia.
    *   Jika pelanggan bertanya tentang kategori layanan (misalnya "layanan detailing apa saja?"), Anda bisa gunakan 'getKnowledgeBaseInfoTool' dengan query tentang kategori tersebut atau 'getProductServiceDetailsByNameTool' dengan nama kategori sebagai productName.
4.  Untuk data pelanggan (poin, motor terdaftar), gunakan 'getClientDetailsTool'.
5.  Jika pelanggan meminta booking, gunakan 'createBookingTool'. Pastikan Anda telah mengkonfirmasi layanan yang diinginkan, nama pelanggan, info kendaraan, dan tanggal/waktu sebelum memanggil tool booking. Untuk tanggal dan waktu, jika pelanggan tidak spesifik, Anda bisa menawarkan slot tersedia atau menanyakan preferensi mereka. Konfirmasi KETERSEDIAAN SLOT jika pelanggan meminta waktu spesifik SEBELUM memanggil tool ini (gunakan pengetahuan umum Anda atau getKnowledgeBaseInfoTool jika ada info ketersediaan umum).
6.  Konteks Knowledge Base Tambahan: {{{knowledgeBase}}}

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

const whatsAppReplyFlowCombined = ai.defineFlow(
  {
    name: 'whatsAppReplyFlow_Combined_v4', // Updated version
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => {
    console.log("whatsAppReplyFlow_Combined_v4 input received by flow:", JSON.stringify(input, null, 2));
    
    const {output} = await replyPromptCombined(input); 
    if (!output) {
      throw new Error('Gagal mendapatkan saran balasan dari AI (combined prompt flow v4).');
    }
    console.log("whatsAppReplyFlow_Combined_v4 output:", output);
    return output;
  }
);
    

