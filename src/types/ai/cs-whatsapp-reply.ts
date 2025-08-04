// @file: src/types/ai/cs-whatsapp-reply.ts

import { z } from 'zod';

// ... (skema ChatMessageSchema dan ZoyaChatInputSchema Anda sudah benar)
export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system', 'tool']), 
  content: z.string(),
  tool_calls: z.any().optional(),
  tool_call_id: z.string().optional(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ZoyaChatInputSchema = z.object({
  customerMessage: z.string().describe('Pesan yang diterima dari pelanggan.'),
  senderNumber: z.string().optional().describe('Nomor WhatsApp pengirim (sudah diformat dengan @c.us).'),
  senderName: z.string().optional().describe('Nama dari pengirim WhatsApp.'),
  chatHistory: z.array(ChatMessageSchema).optional().describe('Riwayat percakapan sebelumnya.'),
  imageContext: z.object({
    imageUrl: z.string(),
    analysisType: z.enum(['condition', 'damage', 'color', 'license_plate', 'detailing', 'coating', 'general']),
    analysisResult: z.any()
  }).optional().describe('Konteks analisis gambar dari AI vision.'),
});
export type ZoyaChatInput = z.infer<typeof ZoyaChatInputSchema>;


/**
 * Mendefinisikan skema untuk output yang dihasilkan oleh flow AI.
 */
export const WhatsAppReplyOutputSchema = z.object({
  suggestedReply: z.string().describe('Saran balasan yang dihasilkan AI.'),
  toolCalls: z
    .array(z.object({
      toolName: z.string(),
      arguments: z.any(),
    }))
    .default([])
    .describe('Daftar tool yang dipanggil oleh AI, jika ada.'),
  // ✅ INI BAGIAN KUNCI: Pastikan properti `route` ada di sini.
  route: z.string().describe('Rute yang dieksekusi oleh AI untuk menghasilkan balasan.'),
  metadata: z.record(z.any()).optional().describe('Metadata tambahan opsional untuk debug atau logging.'),
});
export type WhatsAppReplyOutput = z.infer<typeof WhatsAppReplyOutputSchema>;
