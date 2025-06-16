
import { z } from 'genkit';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']), // 'user' for customer/CS agent, 'model' for AI's previous replies
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const WhatsAppReplyInputSchema = z.object({
  customerMessage: z.string().describe('Pesan yang diterima dari pelanggan melalui WhatsApp, atau pertanyaan dari staf CS.'),
  senderNumber: z.string().optional().describe('Nomor WhatsApp pengirim pesan (pelanggan).'),
  chatHistory: z.array(ChatMessageSchema).optional().describe('Riwayat percakapan sebelumnya antara pelanggan dan AI/staf CS.'),
  agentBehavior: z.string().optional().describe('Perilaku agen AI yang diinginkan, mis. "Ramah & Membantu".'),
  knowledgeBase: z.string().optional().describe('Panduan tingkat tinggi untuk AI. Detail pengetahuan spesifik akan diambil melalui tools.'),
  currentDate: z.string().optional().describe('Tanggal saat ini dalam format YYYY-MM-DD. Berguna untuk konteks booking.'),
  currentTime: z.string().optional().describe('Waktu saat ini dalam format HH:MM (24 jam). Berguna untuk konteks booking.'),
  tomorrowDate: z.string().optional().describe('Tanggal besok dalam format YYYY-MM-DD. Berguna untuk konteks booking.'),
  dayAfterTomorrowDate: z.string().optional().describe('Tanggal lusa (besoknya besok) dalam format YYYY-MM-DD. Berguna untuk konteks booking.'),
});
export type WhatsAppReplyInput = z.infer<typeof WhatsAppReplyInputSchema>;

export const WhatsAppReplyOutputSchema = z.object({
  suggestedReply: z.string().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.'),
});
export type WhatsAppReplyOutput = z.infer<typeof WhatsAppReplyOutputSchema>;
    
