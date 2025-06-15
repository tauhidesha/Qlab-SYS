
import { z } from 'genkit';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']), // 'user' for customer/CS agent, 'model' for AI's previous replies
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const WhatsAppReplyInputSchema = z.object({
  customerMessage: z.string().describe('Pesan yang diterima dari pelanggan melalui WhatsApp, atau pertanyaan dari staf CS.'),
  chatHistory: z.array(ChatMessageSchema).optional().describe('Riwayat percakapan sebelumnya antara pelanggan dan AI/staf CS.'),
  agentBehavior: z.string().optional().describe('Perilaku agen AI yang diinginkan, mis. "Ramah & Membantu".'),
  knowledgeBase: z.string().optional().describe('Deskripsi sumber pengetahuan yang harus digunakan AI.'),
});
export type WhatsAppReplyInput = z.infer<typeof WhatsAppReplyInputSchema>;

export const WhatsAppReplyOutputSchema = z.object({
  suggestedReply: z.string().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.'),
});
export type WhatsAppReplyOutput = z.infer<typeof WhatsAppReplyOutputSchema>;

// Skema internal untuk data yang diproses sebelum ke prompt
export const ProcessedChatMessageSchema = ChatMessageSchema.extend({
  isUser: z.boolean(),
  isModel: z.boolean(),
});

export const PromptInternalInputSchema = WhatsAppReplyInputSchema.omit({ chatHistory: true }).extend({
  processedChatHistory: z.array(ProcessedChatMessageSchema).optional(),
});

