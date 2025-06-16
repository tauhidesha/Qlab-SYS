
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
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings'; // Minimal settings for now
import { format as formatDateFns, addDays } from 'date-fns';

// Simplified function, no Firestore settings fetch for now
export async function generateWhatsAppReply({ customerMessage, senderNumber, chatHistory }: { customerMessage: string; senderNumber?: string; chatHistory?: ChatMessage[] }): Promise<WhatsAppReplyOutput> {
  const agentSettings = { ...DEFAULT_AI_SETTINGS }; // Use default settings
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
  tools: [getKnowledgeBaseInfoTool, getProductServiceDetailsByNameTool, getClientDetailsTool, createBookingTool],
  system: `Anda adalah asisten AI yang membantu. Selalu balas dalam format JSON dengan satu field bernama "suggestedReply". Gunakan tool yang tersedia jika diperlukan untuk menjawab pertanyaan pelanggan. Perilaku Anda: {{{agentBehavior}}}.`,
  prompt: `Pesan Pelanggan:
{{{customerMessage}}}

{{#if chatHistory.length}}
Riwayat Percakapan Sebelumnya:
{{#each chatHistory}}
  {{this.role}}: {{{this.content}}}
{{/each}}
{{/if}}
`
});

const whatsAppReplyFlow = ai.defineFlow(
  {
    name: 'whatsAppReplyFlowMinimal',
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => {
    console.log("WhatsAppReplyFlow (minimal) input received by flow:", JSON.stringify(input, null, 2));
    const {output} = await replyPrompt(input);
    if (!output) {
      throw new Error('Gagal mendapatkan saran balasan dari AI (minimal flow).');
    }
    console.log("WhatsAppReplyFlow (minimal) output:", output);
    return output;
  }
);
    