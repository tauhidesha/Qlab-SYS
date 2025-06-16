
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
  
  console.log("generateWhatsAppReply input to flow (using merged settings):", JSON.stringify(flowInput, null, 2));
  const aiResponse = await whatsAppReplyFlow(flowInput);
  return aiResponse;
}

const replyPrompt = ai.definePrompt({
  name: 'whatsAppReplyPromptIntegrated', // Nama prompt diubah sedikit untuk menandakan integrasi
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [getKnowledgeBaseInfoTool, getProductServiceDetailsByNameTool, getClientDetailsTool, createBookingTool],
  system: `ANDA ADALAH AGEN AI.
Perilaku Anda: {{{agentBehavior}}}
Panduan Umum Knowledge Base: {{{knowledgeBase}}}
Tanggal Saat Ini: {{{currentDate}}}
Waktu Saat Ini: {{{currentTime}}}

TUGAS ANDA:
Anda adalah Customer Service Assistant AI untuk QLAB Auto Detailing.
Bantu pengguna dengan menjawab pertanyaan atau memproses permintaan mereka berdasarkan pesan dan riwayat percakapan.
Gunakan tool yang tersedia ('getKnowledgeBaseInfoTool', 'getProductServiceDetailsByNameTool', 'getClientDetailsTool', 'createBookingTool') jika diperlukan untuk mendapatkan informasi akurat atau melakukan tindakan booking.
Balas SELALU dalam format JSON dengan satu field bernama "suggestedReply".
Jangan pernah menyebutkan nama tool yang Anda gunakan dalam balasan ke pelanggan.
Gunakan bahasa Indonesia yang baku, sopan, ramah, dan natural untuk percakapan WhatsApp.
Jika pertanyaan di luar lingkup, sarankan untuk datang ke bengkel atau hubungi nomor resmi.
Jaga balasan ringkas namun lengkap. Hindari janji yang tidak pasti.
Selalu akhiri dengan sapaan sopan atau kalimat positif.`,
  prompt: `
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
    name: 'whatsAppReplyFlowIntegrated', // Nama flow diubah sedikit
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => {
    console.log("WhatsAppReplyFlow (integrated) input received by flow:", JSON.stringify(input, null, 2));
    
    // Tidak perlu lagi menggabungkan dengan DEFAULT_AI_SETTINGS di sini, karena sudah dilakukan di generateWhatsAppReply
    const promptInput = {
      customerMessage: input.customerMessage,
      chatHistory: input.chatHistory || [],
      agentBehavior: input.agentBehavior, // Langsung dari input yang sudah digabung
      knowledgeBase: input.knowledgeBase, // Langsung dari input yang sudah digabung
      currentDate: input.currentDate,
      currentTime: input.currentTime,
      tomorrowDate: input.tomorrowDate,
      dayAfterTomorrowDate: input.dayAfterTomorrowDate,
      senderNumber: input.senderNumber,
    };

    const {output} = await replyPrompt(promptInput);
    if (!output) {
      throw new Error('Gagal mendapatkan saran balasan dari AI (integrated flow).');
    }
    console.log("WhatsAppReplyFlow (integrated) output:", output);
    return output;
  }
);
