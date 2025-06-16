
'use server';
/**
 * @fileOverview Minimal AI flow for WhatsApp customer service replies.
 *
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
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';
import { format as formatDateFns, addDays } from 'date-fns';

export async function generateWhatsAppReply({ customerMessage, senderNumber, chatHistory }: { customerMessage: string; senderNumber?: string; chatHistory?: ChatMessage[] }): Promise<WhatsAppReplyOutput> {
  const agentSettings = { ...DEFAULT_AI_SETTINGS };
  const now = new Date();

  const flowInput: WhatsAppReplyInput = {
    customerMessage: customerMessage,
    senderNumber: senderNumber,
    chatHistory: chatHistory || [],
    agentBehavior: agentSettings.agentBehavior || 'Ramah & Membantu',
    knowledgeBase: agentSettings.knowledgeBaseDescription || 'Anda adalah AI bengkel QLAB Auto Detailing. Gunakan knowledge base jika pertanyaan bersifat umum atau kebijakan.',
    currentDate: formatDateFns(now, 'yyyy-MM-dd'),
    currentTime: formatDateFns(now, 'HH:mm'),
    tomorrowDate: formatDateFns(addDays(now, 1), 'yyyy-MM-dd'),
    dayAfterTomorrowDate: formatDateFns(addDays(now, 2), 'yyyy-MM-dd'),
  };
  
  console.log("generateWhatsAppReply input to flow:", JSON.stringify(flowInput, null, 2));
  const aiResponse = await whatsAppReplyFlow(flowInput);
  return aiResponse;
}

const replyPrompt = ai.definePrompt({
  name: 'whatsAppReplyPromptSuperMinimal',
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [getKnowledgeBaseInfoTool, getProductServiceDetailsByNameTool, getClientDetailsTool, createBookingTool],
  prompt: `ANDA ADALAH AGEN AI.
Perilaku Anda: {{{agentBehavior}}}
Deskripsi Knowledge Base: {{{knowledgeBase}}}
Tanggal Saat Ini: {{{currentDate}}}
Waktu Saat Ini: {{{currentTime}}}

TUGAS ANDA:
Bantu pengguna dengan menjawab pertanyaan atau memproses permintaan mereka.
Gunakan tool yang tersedia ('getKnowledgeBaseInfoTool', 'getProductServiceDetailsByNameTool', 'getClientDetailsTool', 'createBookingTool') jika diperlukan untuk mendapatkan informasi atau melakukan tindakan.
Balas SELALU dalam format JSON dengan satu field bernama "suggestedReply".

{{#if chatHistory.length}}
RIWAYAT PERCAKAPAN SEBELUMNYA (dari yang paling lama ke terbaru):
{{#each chatHistory}}
  {{this.role}}: {{{this.content}}}
{{/each}}
{{/if}}

PESAN PELANGGAN TERBARU:
user: {{{customerMessage}}}
`
});

const whatsAppReplyFlow = ai.defineFlow(
  {
    name: 'whatsAppReplyFlowSuperMinimal',
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => {
    console.log("WhatsAppReplyFlow (super minimal) input received by flow:", JSON.stringify(input, null, 2));
    
    // Persiapkan input untuk prompt, pastikan semua field Handlebars ada
    const promptInput = {
      customerMessage: input.customerMessage,
      chatHistory: input.chatHistory || [],
      agentBehavior: input.agentBehavior || DEFAULT_AI_SETTINGS.agentBehavior,
      knowledgeBase: input.knowledgeBase || DEFAULT_AI_SETTINGS.knowledgeBaseDescription,
      currentDate: input.currentDate || formatDateFns(new Date(), 'yyyy-MM-dd'),
      currentTime: input.currentTime || formatDateFns(new Date(), 'HH:mm'),
      tomorrowDate: input.tomorrowDate || formatDateFns(addDays(new Date(), 1), 'yyyy-MM-dd'),
      dayAfterTomorrowDate: input.dayAfterTomorrowDate || formatDateFns(addDays(new Date(), 2), 'yyyy-MM-dd'),
      senderNumber: input.senderNumber, // Tetap sertakan, mungkin berguna untuk tools
    };

    const {output} = await replyPrompt(promptInput);
    if (!output) {
      throw new Error('Gagal mendapatkan saran balasan dari AI (super minimal flow).');
    }
    console.log("WhatsAppReplyFlow (super minimal) output:", output);
    return output;
  }
);
