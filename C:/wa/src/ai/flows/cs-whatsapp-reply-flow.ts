
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
import { sendWhatsAppMessage } from '@/services/whatsappService';
import { format as formatDateFns, addDays, parseISO } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';


export async function generateWhatsAppReply({ customerMessage, senderNumber, chatHistory }: { customerMessage: string; senderNumber?: string; chatHistory?: ChatMessage[] }): Promise<WhatsAppReplyOutput> {
  let agentSettings = { ...DEFAULT_AI_SETTINGS }; // Keep settings for context

  try {
    const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
    const docSnap = await getDoc(settingsDocRef);
    if (docSnap.exists()) {
      const rawSettingsData = docSnap.data();
      const parsedSettings = AiSettingsFormSchema.safeParse(rawSettingsData);
      if (parsedSettings.success) {
        agentSettings = { ...DEFAULT_AI_SETTINGS, ...parsedSettings.data };
        console.log("Minimal AI Settings loaded and validated from Firestore:", agentSettings.agentBehavior);
      } else {
        console.warn("Minimal AI Settings in Firestore are invalid, using defaults.");
      }
    } else {
      console.log("Minimal AI Settings not found in Firestore, using defaults.");
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
Panduan umum: {{{knowledgeBase}}}.
Tanggal saat ini: {{{currentDate}}}, Waktu: {{{currentTime}}}. Nomor WhatsApp Pelanggan: {{{senderNumber}}}.

Tugas Anda adalah merespons pesan pelanggan.
- Jika pertanyaan umum, gunakan \`getKnowledgeBaseInfoTool\`.
- Jika pertanyaan detail produk/layanan (harga, durasi), gunakan \`getProductServiceDetailsByNameTool\`.
- Jika pertanyaan data pelanggan, gunakan \`getClientDetailsTool\`.
- Jika pelanggan ingin booking, gunakan \`createBookingTool\` setelah info lengkap.

ATURAN PENTING:
1.  Hasilkan balasan dalam format JSON: \`{"suggestedReply": "Teks balasan Anda..."}\`.
2.  JANGAN PERNAH menyebutkan nama tool.
3.  JANGAN PERNAH mengatakan "sedang mengecek/loading" atau semacamnya. Langsung berikan hasil atau katakan tidak menemukan info.

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
    

    