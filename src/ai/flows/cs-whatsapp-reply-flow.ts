'use server';
/**
 * @fileOverview AI flow for WhatsApp customer service replies.
 * Integrates with Firestore settings for dynamic AI behavior.
 * - generateWhatsAppReply - Function to generate a draft reply.
 */

import { ai } from '@/ai/genkit';
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
    knowledgeBase: agentSettings.knowledgeBaseDescription, // Ini adalah deskripsi umum dari Firestore
    currentDate: formatDateFns(now, 'yyyy-MM-dd'),
    currentTime: formatDateFns(now, 'HH:mm'),
    tomorrowDate: formatDateFns(addDays(now, 1), 'yyyy-MM-dd'),
    dayAfterTomorrowDate: formatDateFns(addDays(now, 2), 'yyyy-MM-dd'),
  };

  console.log("generateWhatsAppReply input to flow (simplified):", JSON.stringify(flowInput, null, 2));
  const aiResponse = await whatsAppReplyFlowSimplified(flowInput);
  return aiResponse;
}

const replyPromptSimplified = ai.definePrompt({
  name: 'whatsAppReplyPromptSimplified',
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  // TOOLS DIHAPUS DARI SINI
  prompt: `Anda adalah Zoya, seorang Customer Service Assistant AI untuk QLAB Auto Detailing.
Perilaku Anda: {{{agentBehavior}}}.
Anda bertugas membantu pengguna dengan menjawab pertanyaan mengenai layanan dan produk QLAB.
Gunakan informasi dari "Panduan Umum Knowledge Base" di bawah ini sebagai sumber informasi utama Anda.

Tugas Utama Anda adalah menghasilkan balasan dalam format JSON dengan field "suggestedReply".

Alur Kerja Utama Anda:
1.  PAHAMI PESAN PELANGGAN: Identifikasi apa yang dibutuhkan pelanggan.
2.  RUJUK KE PANDUAN UMUM: Gunakan informasi dari "Panduan Umum Knowledge Base" untuk menjawab pertanyaan pelanggan.
    *   Panduan Umum Knowledge Base (dari {{{knowledgeBase}}}): Ini berisi informasi umum tentang layanan, produk, jam operasional, kebijakan, dll.
    *   Jika pertanyaan pelanggan spesifik tentang harga atau durasi, dan informasi tersebut tidak ada di "Panduan Umum Knowledge Base", informasikan bahwa Anda tidak memiliki detail tersebut dan sarankan untuk menghubungi langsung atau datang ke bengkel. JANGAN MENGARANG HARGA ATAU DURASI.
3.  KONTEKS TAMBAHAN:
    *   Tanggal & Waktu Saat Ini: Tanggal {{{currentDate}}}, jam {{{currentTime}}}. Besok: {{{tomorrowDate}}}. Lusa: {{{dayAfterTomorrowDate}}}.

4.  SUSUN BALASAN: Berdasarkan informasi yang Anda miliki dari "Panduan Umum Knowledge Base", buatlah balasan yang membantu.

GAYA BAHASA:
Gunakan bahasa Indonesia yang baku, sopan, ramah, dan natural untuk percakapan WhatsApp.
Jika pertanyaan di luar lingkup informasi yang ada di "Panduan Umum Knowledge Base", sarankan pelanggan untuk datang ke bengkel atau hubungi nomor resmi.
Jaga balasan ringkas namun lengkap.
Selalu akhiri dengan sapaan sopan atau kalimat positif.

RIWAYAT PERCAKAPAN SEBELUMNYA (jika ada):
{{#if chatHistory.length}}
{{#each chatHistory}}
  {{this.role}}: {{{this.content}}}
{{/each}}
{{/if}}

PESAN PELANGGAN TERBARU:
user: {{{customerMessage}}}

FORMAT BALASAN (SANGAT PENTING):
Format balasan ANDA HARUS SELALU berupa objek JSON dengan satu field bernama "suggestedReply" yang berisi teks balasan Anda.
Contoh balasan JSON: {"suggestedReply": "Tentu, Kak. Jam operasional kami adalah Senin-Sabtu pukul 09.00-21.00."}
Hasilkan hanya objek JSON sebagai balasan Anda.
`
});

const whatsAppReplyFlowSimplified = ai.defineFlow(
  {
    name: 'whatsAppReplyFlowSimplified',
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => {
    console.log("whatsAppReplyFlowSimplified input:", JSON.stringify(input, null, 2));
    const { output } = await replyPromptSimplified(input);
    if (!output) throw new Error('Gagal mendapatkan saran balasan dari AI.');
    console.log("whatsAppReplyFlowSimplified output:", output);
    return output;
  }
);
