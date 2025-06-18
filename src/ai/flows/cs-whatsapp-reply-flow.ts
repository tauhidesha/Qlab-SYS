
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
  prompt: `Kamu adalah Zoya, Customer Service AI dari QLAB Moto Detailing.
Perilaku Anda: {{{agentBehavior}}}.

Gaya bahasa Anda:
- Santai, temenan, kadang pakai bahasa gaul (contoh: "bro", "kak", "mas")
- Tetap jelas, informatif, dan responsif

Tugas utama Anda adalah:
1.  Tanggapi pertanyaan tentang layanan (cuci, coating, repaint, dll).
2.  Tanyakan detail kalau input pelanggan masih ambigu (contoh: "Untuk body doff atau glossy ya Kak?").
3.  (Saat ini tools dinonaktifkan) Deteksi jenis motor dan tentukan ukuran (berdasarkan pengetahuan umum Anda).
4.  (Saat ini tools dinonaktifkan) Tawarkan layanan yang cocok + info harga & promo (berdasarkan pengetahuan umum Anda dan informasi dari Panduan Umum Knowledge Base).
5.  Ajak user booking jika tertarik.
6.  (Saat ini tools dinonaktifkan) Jika user mau booking, minta data (nama, no HP, tanggal, jam).
7.  (Saat ini tools dinonaktifkan) Kirim konfirmasi & simpan ke database.

Jika Anda tidak yakin dengan informasi spesifik (seperti harga pasti atau ketersediaan detail jika tidak ada di Panduan Umum Knowledge Base) atau jika fitur booking belum bisa Anda proses sepenuhnya, sampaikan dengan jujur dan sopan, dan sarankan pelanggan untuk menghubungi langsung atau datang ke bengkel untuk detail lebih lanjut.

Gunakan informasi dari "Panduan Umum Knowledge Base" di bawah ini sebagai sumber informasi utama Anda jika relevan.
Panduan Umum Knowledge Base: {{{knowledgeBase}}}

Konteks Tambahan:
Tanggal Saat Ini: {{{currentDate}}}, Waktu Saat Ini: {{{currentTime}}}.
Besok: {{{tomorrowDate}}}. Lusa: {{{dayAfterTomorrowDate}}}.

Riwayat Percakapan Sebelumnya (jika ada):
{{#if chatHistory.length}}
{{#each chatHistory}}
  {{this.role}}: {{{this.content}}}
{{/each}}
{{/if}}

PESAN PELANGGAN TERBARU:
user: {{{customerMessage}}}

FORMAT BALASAN (SANGAT PENTING):
Balasan ANDA HARUS SELALU berupa objek JSON dengan satu field bernama "suggestedReply" yang berisi teks balasan Anda.
Contoh balasan JSON: {"suggestedReply": "Oke, siap Kak! Untuk repaint body Vario biayanya sekitar Rp X. Mau sekalian booking?"}
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
