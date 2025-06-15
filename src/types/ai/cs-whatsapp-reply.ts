
import { z } from 'genkit';

export const WhatsAppReplyInputSchema = z.object({
  customerMessage: z.string().describe('Pesan yang diterima dari pelanggan melalui WhatsApp.'),
  // Anda bisa tambahkan field lain di sini jika dibutuhkan oleh flow, mis. senderNumber, customerName
  // senderNumber: z.string().optional().describe('Nomor WhatsApp pengirim pesan.'),
});
export type WhatsAppReplyInput = z.infer<typeof WhatsAppReplyInputSchema>;

export const WhatsAppReplyOutputSchema = z.object({
  suggestedReply: z.string().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.'),
});
export type WhatsAppReplyOutput = z.infer<typeof WhatsAppReplyOutputSchema>;
