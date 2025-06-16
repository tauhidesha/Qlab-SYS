
'use server';
/**
 * @fileOverview Minimal AI flow for WhatsApp customer service replies.
 * - generateWhatsAppReply - Generates a draft reply.
 */

import { ai } from '@/ai/genkit';
import { getProductServiceDetailsByNameTool } from '@/ai/tools/productLookupTool';
import { getClientDetailsTool } from '@/ai/tools/clientLookupTool';
import { getKnowledgeBaseInfoTool } from '@/ai/tools/knowledgeLookupTool';
import { createBookingTool } from '@/ai/tools/createBookingTool';
import type { WhatsAppReplyInput, WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema } from '@/types/ai/cs-whatsapp-reply';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings'; // Only for default behavior
import { format as formatDateFns, addDays } from 'date-fns';

// Minimal version for generateWhatsAppReply
export async function generateWhatsAppReply({ customerMessage, senderNumber, chatHistory }: { customerMessage: string; senderNumber?: string; chatHistory?: ChatMessage[] }): Promise<WhatsAppReplyOutput> {
  // Using only default settings for this minimal version
  const agentSettings = { ...DEFAULT_AI_SETTINGS }; 
  const now = new Date();

  const flowInput: WhatsAppReplyInput = {
    customerMessage: customerMessage,
    senderNumber: senderNumber,
    chatHistory: chatHistory || [],
    agentBehavior: agentSettings.agentBehavior || 'Ramah & Membantu', // Default behavior
    knowledgeBase: agentSettings.knowledgeBaseDescription || 'Anda adalah asisten AI.', // Default KB description
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
  system: `Anda adalah Zoya, Customer Service AI untuk QLAB Auto Detailing.
Perilaku Anda: {{{agentBehavior}}}.
Panduan umum: {{{knowledgeBase}}}.
Tanggal saat ini: {{{currentDate}}}, Waktu: {{{currentTime}}}. Nomor WhatsApp Pelanggan: {{{senderNumber}}}.

Tugas Anda: Berikan balasan yang relevan terhadap "Pesan BARU dari Pelanggan". Gunakan "Riwayat Percakapan Sebelumnya" sebagai konteks jika ada.
Gunakan tools yang tersedia jika diperlukan untuk mencari informasi produk, layanan, klien, atau pengetahuan umum.
Sangat penting: Hasilkan balasan Anda HANYA dalam format JSON yang valid. Objek JSON harus memiliki satu kunci bernama "suggestedReply" dengan nilai berupa string teks balasan Anda.
Contoh: {"suggestedReply": "Tentu, Kak! Ada yang bisa dibantu?"}
JANGAN PERNAH menyebutkan nama tool yang Anda gunakan dalam balasan ke pelanggan.
JANGAN PERNAH mengatakan "sedang mengecek/loading" atau semacamnya. Langsung berikan hasil atau katakan tidak menemukan info.`,
  prompt: `{{#if chatHistory.length}}
Riwayat Percakapan Sebelumnya:
{{#each chatHistory}}
  {{this.role}}: {{{this.content}}}
{{/each}}
{{/if}}

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
