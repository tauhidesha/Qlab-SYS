
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

  // Construct the input for the Genkit flow, including all necessary fields from WhatsAppReplyInputSchema
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
  
  console.log("generateWhatsAppReply input to flow (using merged settings, system prompt test):", JSON.stringify(flowInput, null, 2));
  const aiResponse = await whatsAppReplyFlow(flowInput);
  return aiResponse;
}

// STATIC SYSTEM PROMPT FOR TESTING - NO HANDLEBARS
const STATIC_SYSTEM_PROMPT = `Anda adalah Customer Service Assistant AI untuk QLAB Auto Detailing.
Tugas Anda adalah membantu pengguna dengan menjawab pertanyaan atau memproses permintaan mereka.
Gunakan tool yang tersedia jika diperlukan untuk mendapatkan informasi akurat atau melakukan tindakan booking.
Balas SELALU dalam format JSON dengan satu field bernama "suggestedReply".
Jangan pernah menyebutkan nama tool yang Anda gunakan dalam balasan ke pelanggan.
Gunakan bahasa Indonesia yang baku, sopan, ramah, dan natural untuk percakapan WhatsApp.
Jika pertanyaan di luar lingkup, sarankan untuk datang ke bengkel atau hubungi nomor resmi.
Jaga balasan ringkas namun lengkap. Hindari janji yang tidak pasti.
Selalu akhiri dengan sapaan sopan atau kalimat positif.`;

const replyPrompt = ai.definePrompt({
  name: 'whatsAppReplyPromptSystemTest', // New name for this test
  input: { schema: WhatsAppReplyInputSchema }, // Schema still expects all fields
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [getKnowledgeBaseInfoTool, getProductServiceDetailsByNameTool, getClientDetailsTool, createBookingTool],
  system: STATIC_SYSTEM_PROMPT, // Using the static system prompt
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
    name: 'whatsAppReplyFlowSystemTest', // New name for this test
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => {
    console.log("WhatsAppReplyFlow (system test) input received by flow:", JSON.stringify(input, null, 2));
    
    // All fields from WhatsAppReplyInput (including agentBehavior, knowledgeBase, etc.)
    // are passed to the prompt. Even though the 'system' field of replyPrompt is static now,
    // these values are still available if the main 'prompt' template were to use them.
    // For this specific test, the main 'prompt' template only uses chatHistory and customerMessage.
    const {output} = await replyPrompt(input); 
    if (!output) {
      throw new Error('Gagal mendapatkan saran balasan dari AI (system test flow).');
    }
    console.log("WhatsAppReplyFlow (system test) output:", output);
    return output;
  }
);
