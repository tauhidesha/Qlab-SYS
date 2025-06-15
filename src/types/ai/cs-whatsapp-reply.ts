
import { z } from 'genkit';
import type { AiAgentBehavior } from '@/types/aiSettings'; // Impor tipe jika diperlukan

export const WhatsAppReplyInputSchema = z.object({
  customerMessage: z.string().describe('Pesan yang diterima dari pelanggan melalui WhatsApp.'),
  agentBehavior: z.string().optional().describe('Perilaku agen AI yang diinginkan, mis. "Ramah & Membantu".'),
  knowledgeBase: z.string().optional().describe('Deskripsi sumber pengetahuan yang harus digunakan AI.'),
  // Anda bisa tambahkan field lain di sini jika dibutuhkan oleh flow, mis. senderNumber, customerName
  // senderNumber: z.string().optional().describe('Nomor WhatsApp pengirim pesan.'),
});
export type WhatsAppReplyInput = z.infer<typeof WhatsAppReplyInputSchema>;

export const WhatsAppReplyOutputSchema = z.object({
  suggestedReply: z.string().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.'),
});
export type WhatsAppReplyOutput = z.infer<typeof WhatsAppReplyOutputSchema>;

