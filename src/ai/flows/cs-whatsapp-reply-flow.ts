
'use server';
/**
 * @fileOverview Flow AI untuk membantu membuat balasan pesan WhatsApp customer service.
 *
 * - generateWhatsAppReply - Fungsi yang menghasilkan draf balasan.
 * - WhatsAppReplyInput - Tipe input untuk fungsi generateWhatsAppReply.
 * - WhatsAppReplyOutput - Tipe output untuk fungsi generateWhatsAppReply.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WhatsAppReplyInputSchema = z.object({
  customerMessage: z.string().describe('Pesan yang diterima dari pelanggan melalui WhatsApp.'),
});
export type WhatsAppReplyInput = z.infer<typeof WhatsAppReplyInputSchema>;

const WhatsAppReplyOutputSchema = z.object({
  suggestedReply: z.string().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.'),
});
export type WhatsAppReplyOutput = z.infer<typeof WhatsAppReplyOutputSchema>;

export async function generateWhatsAppReply(input: WhatsAppReplyInput): Promise<WhatsAppReplyOutput> {
  return whatsAppReplyFlow(input);
}

const replyPrompt = ai.definePrompt({
  name: 'whatsAppReplyPrompt',
  input: {schema: WhatsAppReplyInputSchema},
  output: {schema: WhatsAppReplyOutputSchema},
  prompt: `Anda adalah seorang Customer Service Assistant AI untuk QLAB Auto Detailing, sebuah bengkel perawatan dan detailing motor.
Tugas Anda adalah membantu staf CS membuat balasan yang sopan, ramah, informatif, dan profesional untuk pesan WhatsApp dari pelanggan.

Pesan dari Pelanggan:
{{{customerMessage}}}

Instruksi:
1.  Pahami maksud dari pesan pelanggan.
2.  Buat draf balasan yang menjawab pertanyaan atau merespons permintaan pelanggan dengan baik.
3.  Gunakan bahasa Indonesia yang baku namun tetap terdengar natural dan bersahabat untuk percakapan WhatsApp.
4.  Jika pesan pelanggan tidak jelas atau butuh informasi lebih lanjut, buat balasan yang meminta klarifikasi dengan sopan.
5.  Jika pertanyaan di luar lingkup layanan bengkel umum (misalnya, pertanyaan teknis yang sangat mendalam yang seharusnya dijawab mekanik ahli, atau masalah pribadi), sarankan pelanggan untuk datang langsung ke bengkel atau menghubungi nomor telepon resmi untuk bantuan lebih lanjut.
6.  Jaga agar balasan tetap ringkas namun lengkap.
7.  Hindari janji yang tidak bisa dipastikan (misalnya, "pasti selesai dalam 1 jam" kecuali memang itu standar layanan). Lebih baik berikan estimasi yang realistis jika memungkinkan.
8.  Selalu akhiri dengan sapaan yang sopan atau kalimat penutup yang positif.

Contoh Balasan yang Baik:
- "Selamat pagi Kak, terima kasih sudah menghubungi QLAB. Untuk layanan detailing lengkap motor Vario biasanya memakan waktu sekitar 3-4 jam. Apakah Kakak ada preferensi hari dan jam tertentu untuk booking?"
- "Baik Kak, untuk keluhan tersebut kami sarankan untuk membawa motornya langsung ke bengkel agar bisa diperiksa lebih detail oleh teknisi kami. Bengkel kami buka setiap hari dari jam 9 pagi sampai 9 malam. Ditunggu kedatangannya ya Kak."

Hasilkan hanya teks balasannya saja.
`,
});

const whatsAppReplyFlow = ai.defineFlow(
  {
    name: 'whatsAppReplyFlow',
    inputSchema: WhatsAppReplyInputSchema,
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input) => {
    const {output} = await replyPrompt(input);
    if (!output) {
      throw new Error('Gagal mendapatkan saran balasan dari AI.');
    }
    return output;
  }
);
