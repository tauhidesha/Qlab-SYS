
'use server';
/**
 * @fileOverview Minimal AI flow for WhatsApp customer service replies.
 *
 * - generateWhatsAppReply - Generates a draft reply.
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
import { format as formatDateFns, addDays } from 'date-fns';


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
        console.log("AI Settings loaded and validated from Firestore:", agentSettings.agentBehavior);
      } else {
        console.warn("AI Settings in Firestore are invalid, using defaults.");
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
    knowledgeBase: agentSettings.knowledgeBaseDescription || '', // Ini akan jadi panduan umum sekali
    currentDate: formatDateFns(now, 'yyyy-MM-dd'),
    currentTime: formatDateFns(now, 'HH:mm'),
    tomorrowDate: formatDateFns(addDays(now, 1), 'yyyy-MM-dd'),
    dayAfterTomorrowDate: formatDateFns(addDays(now, 2), 'yyyy-MM-dd'),
  };

  const aiResponse = await whatsAppReplyFlow(flowInput);
  return aiResponse;
}

const replyPrompt = ai.definePrompt({
  name: 'whatsAppReplyPromptMinimal',
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [
    getKnowledgeBaseInfoTool,
    getProductServiceDetailsByNameTool,
    getClientDetailsTool,
    createBookingTool
  ],
  prompt: `Anda adalah Zoya, Customer Service AI untuk QLAB Auto Detailing.
Perilaku Anda: {{{agentBehavior}}}.
Gunakan panduan umum ini: {{{knowledgeBase}}}.
Tanggal saat ini: {{{currentDate}}}, Waktu: {{{currentTime}}}. Nomor WhatsApp Pelanggan: {{{senderNumber}}}.

Tugas Anda adalah merespons pesan pelanggan.
-   Jika pertanyaan umum (mis. jam buka, alamat, kebijakan umum), gunakan \`getKnowledgeBaseInfoTool\` untuk mencari jawabannya.
-   Jika pertanyaan tentang detail produk/layanan (harga, durasi, deskripsi), gunakan \`getProductServiceDetailsByNameTool\`.
-   Jika pertanyaan tentang data pelanggan (poin, motor terdaftar), gunakan \`getClientDetailsTool\`.
-   Jika pelanggan ingin membuat booking, kumpulkan informasi yang diperlukan (Nama Pelanggan, ID & Nama Layanan, Info Kendaraan, Tanggal, Waktu) lalu gunakan \`createBookingTool\`.

SANGAT PENTING:
1.  PASTIKAN balasan Anda SELALU dalam format JSON yang valid: \`{"suggestedReply": "Teks balasan Anda di sini..."}\`.
2.  JANGAN PERNAH menyebutkan nama tool yang Anda gunakan kepada pelanggan.
3.  JANGAN PERNAH mengatakan "sedang mengecek", "tunggu sebentar", atau "*loading...*". Jika tool tidak menemukan informasi, katakan Anda tidak menemukan informasinya.

Riwayat Percakapan Sebelumnya:
{{#each chatHistory}}
  {{this.role}}: {{{this.content}}}
{{/each}}

Pesan BARU dari Pelanggan:
{{{customerMessage}}}
`
});

const whatsAppReplyFlow = ai.defineFlow(
  {
    name: 'whatsAppReplyFlowMinimal',
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => {
    console.log("Minimal WhatsAppReplyFlow input received by flow:", JSON.stringify(input, null, 2));

    const {output} = await replyPrompt(input);

    if (!output) {
      console.error('Minimal AI flow failed to produce output.');
      return { suggestedReply: "Maaf, saya tidak bisa memproses permintaan Anda saat ini." };
    }
    console.log("Minimal WhatsAppReplyFlow output:", output);
    return output;
  }
);
    
