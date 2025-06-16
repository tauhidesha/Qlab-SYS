
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
  
  console.log("generateWhatsAppReply input to flow (using merged settings, combined prompt test):", JSON.stringify(flowInput, null, 2));
  const aiResponse = await whatsAppReplyFlowCombined(flowInput);
  return aiResponse;
}

const replyPromptCombined = ai.definePrompt({
  name: 'whatsAppReplyPrompt_Combined', // New name for the prompt
  input: { schema: WhatsAppReplyInputSchema },
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [getKnowledgeBaseInfoTool, getProductServiceDetailsByNameTool, getClientDetailsTool, createBookingTool],
  // NO 'system' field. All instructions are in 'prompt'.
  prompt: `Anda adalah Zoya, seorang Customer Service Assistant AI untuk QLAB Auto Detailing.
Perilaku Anda: {{{agentBehavior}}}.
Anda bertugas membantu pengguna dengan menjawab pertanyaan atau memproses permintaan mereka mengenai layanan dan produk QLAB.
Gunakan tool yang tersedia jika diperlukan untuk mendapatkan informasi akurat atau melakukan tindakan booking.
Informasi umum atau kebijakan dapat dicari menggunakan 'getKnowledgeBaseInfoTool'. Detail spesifik produk/layanan seperti harga atau durasi gunakan 'getProductServiceDetailsByNameTool'. Untuk data pelanggan, gunakan 'getClientDetailsTool'. Jika pelanggan meminta booking, gunakan 'createBookingTool' (konfirmasi slot dulu jika waktu spesifik diminta).
Konteks Knowledge Base: {{{knowledgeBase}}}

Tanggal saat ini adalah {{{currentDate}}}, jam {{{currentTime}}}. Besok adalah {{{tomorrowDate}}}, dan lusa adalah {{{dayAfterTomorrowDate}}}.

Format balasan ANDA HARUS SELALU berupa objek JSON dengan satu field bernama "suggestedReply" yang berisi teks balasan Anda.
Contoh balasan JSON: {"suggestedReply": "Tentu, Kak. Untuk layanan Cuci Premium, harganya adalah Rp 75.000."}
JANGAN PERNAH menyebutkan nama tool yang Anda gunakan dalam balasan teks ke pelanggan.
Gunakan bahasa Indonesia yang baku, sopan, ramah, dan natural untuk percakapan WhatsApp.
Jika pertanyaan di luar lingkup, sarankan untuk datang ke bengkel atau hubungi nomor resmi.
Jaga balasan ringkas namun lengkap. Hindari janji yang tidak pasti.
Selalu akhiri dengan sapaan sopan atau kalimat positif.

Berikut adalah riwayat percakapan sebelumnya (jika ada):
{{#if chatHistory.length}}
{{#each chatHistory}}
  {{this.role}}: {{{this.content}}}
{{/each}}
{{/if}}

Pesan pelanggan terbaru adalah:
user: {{{customerMessage}}}

Hasilkan hanya objek JSON sebagai balasan Anda.
`
});

const whatsAppReplyFlowCombined = ai.defineFlow(
  {
    name: 'whatsAppReplyFlow_Combined', // New name for the flow
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => {
    console.log("whatsAppReplyFlow_Combined input received by flow:", JSON.stringify(input, null, 2));
    
    const {output} = await replyPromptCombined(input); 
    if (!output) {
      throw new Error('Gagal mendapatkan saran balasan dari AI (combined prompt flow).');
    }
    console.log("whatsAppReplyFlow_Combined output:", output);
    return output;
  }
);
