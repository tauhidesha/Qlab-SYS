// @file: src/types/ai/cs-whatsapp-reply.ts

import { z } from 'zod';

/**
 * Mendefinisikan skema untuk satu pesan dalam riwayat chat.
 * Sesuai dengan format yang diharapkan oleh OpenAI.
 */
export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system', 'tool']), 
  content: z.string(),
  tool_calls: z.any().optional(),
  tool_call_id: z.string().optional(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;


/**
 * Mendefinisikan skema untuk input utama yang diterima oleh flow AI kita.
 * Ini adalah "formulir" yang diisi oleh bot WA (run.js) setiap kali ada pesan masuk.
 */
export const ZoyaChatInputSchema = z.object({
  customerMessage: z.string().describe('Pesan yang diterima dari pelanggan.'),
  senderNumber: z.string().optional().describe('Nomor WhatsApp pengirim (sudah diformat dengan @c.us).'),
  senderName: z.string().optional().describe('Nama dari pengirim WhatsApp.'),
  chatHistory: z.array(ChatMessageSchema).optional().describe('Riwayat percakapan sebelumnya.'),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>;


/**
 * Mendefinisikan skema untuk output yang dihasilkan oleh flow AI.
 * Ini adalah "jawaban" yang dikirim kembali ke bot WA (run.js).
 */
export const WhatsAppReplyOutputSchema = z.object({
  suggestedReply: z.string().nullable().describe('Saran balasan yang dihasilkan AI. Bisa null jika AI memutuskan untuk diam (mode snooze).'),
});
export type WhatsAppReplyOutput = z.infer<typeof WhatsAppReplyOutputSchema>;
