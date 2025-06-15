
'use server';
/**
 * @fileOverview Flow AI untuk membantu membuat balasan pesan WhatsApp customer service.
 * Dilengkapi dengan kemampuan untuk mencari informasi produk/layanan dan data klien,
 * serta menggunakan pengaturan agen AI dinamis dari Firestore.
 *
 * - generateWhatsAppReply - Fungsi yang menghasilkan draf balasan.
 * - (Skema dan Tipe sekarang di src/types/ai/cs-whatsapp-reply.ts)
 */

import { ai } from '@/ai/genkit';
import { getProductServiceDetailsByNameTool } from '@/ai/tools/productLookupTool';
import { getClientDetailsTool } from '@/ai/tools/clientLookupTool';
import type { WhatsAppReplyInput, WhatsAppReplyOutput } from '@/types/ai/cs-whatsapp-reply';
import { WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema } from '@/types/ai/cs-whatsapp-reply';

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { AiSettingsFormValues } from '@/types/aiSettings';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';


export async function generateWhatsAppReply(input: WhatsAppReplyInput): Promise<WhatsAppReplyOutput> {
  // Fetch AI Agent Settings from Firestore
  let agentBehavior = DEFAULT_AI_SETTINGS.agentBehavior;
  let knowledgeBaseDescription = DEFAULT_AI_SETTINGS.knowledgeBaseDescription;

  try {
    const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
    const docSnap = await getDoc(settingsDocRef);
    if (docSnap.exists()) {
      const settings = docSnap.data() as AiSettingsFormValues;
      agentBehavior = settings.agentBehavior || agentBehavior;
      knowledgeBaseDescription = settings.knowledgeBaseDescription || knowledgeBaseDescription;
      console.log("AI Settings loaded from Firestore:", settings);
    } else {
      console.log("AI Settings not found in Firestore, using defaults.");
    }
  } catch (error) {
    console.error("Error fetching AI settings from Firestore, using defaults:", error);
  }

  const promptInput = {
    customerMessage: input.customerMessage,
    agentBehavior: agentBehavior,
    knowledgeBase: knowledgeBaseDescription,
  };

  return whatsAppReplyFlow(promptInput);
}

// Perhatikan bahwa input schema untuk replyPrompt sekarang adalah WhatsAppReplyInputSchema
// yang sudah menyertakan agentBehavior dan knowledgeBase.
const replyPrompt = ai.definePrompt({
  name: 'whatsAppReplyPrompt',
  input: { schema: WhatsAppReplyInputSchema }, // Menggunakan skema yang sudah diperbarui
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [getProductServiceDetailsByNameTool, getClientDetailsTool],
  prompt: `Anda adalah seorang Customer Service Assistant AI untuk QLAB Auto Detailing, sebuah bengkel perawatan dan detailing motor.
Perilaku Anda harus: {{{agentBehavior}}}.
Gunakan deskripsi sumber pengetahuan berikut sebagai panduan utama Anda: {{{knowledgeBase}}}

Tugas Anda adalah membantu staf CS membuat balasan yang sopan, ramah, informatif, dan profesional untuk pesan WhatsApp dari pelanggan.

Pesan dari Pelanggan:
{{{customerMessage}}}

Instruksi:
1.  Pahami maksud dari pesan pelanggan dengan seksama.
2.  Jika pesan pelanggan berkaitan dengan **harga, durasi, deskripsi, atau ketersediaan layanan/produk spesifik**, gunakan tool 'getProductServiceDetailsByNameTool' untuk mencari informasi akurat.
    *   Sebutkan nama produk/layanan sejelas mungkin saat menggunakan tool. Penting: Jika pelanggan menyebutkan varian (misalnya ukuran seperti L, XL, tipe A, tipe B, dll.), coba sertakan itu dalam pencarian Anda jika memungkinkan, atau cari nama produk dasarnya lalu periksa array \`variants\` di output tool untuk menemukan varian yang paling cocok. Misalnya, jika pelanggan bertanya "Advance Formula L", Anda bisa mencoba mencari "Advance Formula L" atau "Advance Formula" lalu memeriksa varian.
    *   Jika tool mengembalikan informasi (objek JSON):
        *   Gunakan **field \`price\` dari output tool** untuk menyebutkan harga. Format harga sebagai Rupiah (Rp). Contoh: "Harganya adalah Rp {tool_output.price}."
        *   Gunakan **field \`name\` dari output tool** untuk menyebutkan nama produk/layanan yang ditemukan.
        *   Gunakan detail lain seperti \`estimatedDuration\` dan \`description\` jika relevan dan tersedia di output tool.
        *   Jika output tool berisi array \`variants\` (artinya tool mengembalikan info produk dasar dan Anda perlu memilih varian yang sesuai dari array tersebut), Anda harus memilih varian yang paling cocok dengan permintaan pelanggan dari array \`variants\` tersebut dan menggunakan \`price\` serta \`estimatedDuration\` dari varian yang dipilih. Perhatikan nama varian di output tool dengan seksama (mis. "L", "XL", "Reguler").
        *   Jika output tool TIDAK berisi array \`variants\` (artinya tool mengembalikan info produk/varian spesifik), maka field \`price\` yang ada di level atas output tool adalah harga yang benar untuk disebutkan.
        *   SANGAT PENTING: Jika field \`price\` bernilai 0 atau tidak ada, JANGAN katakan "harganya Rp [harga]" atau "Rp 0" kecuali Anda yakin itu harga yang benar (misalnya item bonus). Lebih baik katakan Anda tidak menemukan harga spesifiknya atau minta pelanggan mengonfirmasi.
    *   Jika tool mengembalikan \`null\` atau Anda benar-benar tidak menemukan informasi yang relevan setelah menggunakan tool:
        *   Informasikan dengan sopan bahwa Anda tidak menemukan informasinya atau detail spesifik yang diminta (misalnya, "Maaf Kak, untuk harga XYZ saat ini saya belum menemukan informasinya.").
        *   Anda boleh meminta pelanggan untuk memperjelas nama item atau menyarankan untuk cek ketersediaan/harga langsung di bengkel.
        *   JANGAN PERNAH membuat harga sendiri atau menggunakan placeholder seperti "[harga]" atau "[durasi]".
3.  Jika pesan pelanggan menyiratkan pertanyaan tentang **data pribadi mereka** (misalnya, "poin saya berapa?", "motor saya apa saja yang terdaftar?", "kapan terakhir saya servis?"), gunakan tool 'getClientDetailsTool' untuk mencari data klien.
    *   Anda bisa mencari berdasarkan nama atau nomor telepon yang mungkin disebutkan dalam pesan.
    *   Jika data klien ditemukan, gunakan informasi tersebut untuk menjawab pertanyaan pelanggan (mis. jumlah poin loyalitas, daftar motor, tanggal kunjungan terakhir). Personalisasi sapaan jika nama klien diketahui.
    *   Jika data klien tidak ditemukan, tanggapi dengan sopan, mungkin tanyakan nama lengkap atau nomor telepon yang terdaftar.
4.  Buat draf balasan yang menjawab pertanyaan atau merespons permintaan pelanggan dengan baik, berdasarkan informasi yang Anda miliki atau dapatkan dari tool.
5.  Gunakan bahasa Indonesia yang baku namun tetap terdengar natural dan bersahabat untuk percakapan WhatsApp.
6.  Jika pesan pelanggan tidak jelas atau butuh informasi lebih lanjut (dan tool tidak membantu), buat balasan yang meminta klarifikasi dengan sopan.
7.  Jika pertanyaan di luar lingkup layanan bengkel umum atau informasi yang bisa Anda akses, sarankan pelanggan untuk datang langsung ke bengkel atau menghubungi nomor telepon resmi untuk bantuan lebih lanjut.
8.  Jaga agar balasan tetap ringkas namun lengkap. Hindari janji yang tidak bisa dipastikan (misalnya, "pasti selesai dalam 1 jam" kecuali memang itu standar layanan atau informasi dari tool). Lebih baik berikan estimasi yang realistis jika memungkinkan.
9.  Selalu akhiri dengan sapaan yang sopan atau kalimat penutup yang positif.

Contoh Interaksi Sukses dengan Tool Produk (Ilustrasi):
- Pelanggan: "Harga cuci motor premium vario berapa?"
  - Anda (AI): (Memanggil getProductServiceDetailsByNameTool dengan productName: "Cuci Motor Premium Vario" atau "Cuci Motor Premium")
  - Tool mengembalikan: { name: "Cuci Motor Premium - Reguler", price: 75000, estimatedDuration: "45 mnt", ... } atau { name: "Cuci Motor Premium", variants: [{name: "Reguler", price: 75000,...}, {name: "Dengan Wax Super", price: 100000,...}] }
  - Balasan Anda (jika varian dipilih oleh AI dari array): "Untuk Cuci Motor Premium Reguler harganya Rp 75.000 ya Kak, estimasi pengerjaannya sekitar 45 menit."
  - Balasan Anda (jika tool langsung mengembalikan varian spesifik): "Untuk Cuci Motor Premium - Reguler harganya Rp 75.000 ya Kak, estimasi pengerjaannya sekitar 45 menit."

Hasilkan hanya teks balasannya saja. Jangan menyebutkan nama tool yang Anda gunakan dalam balasan ke pelanggan.
Pastikan balasan Anda tetap ramah dan profesional.
`,
});

// Wrapper function ini sekarang menerima input yang sudah diperkaya dengan data dari Firestore
const whatsAppReplyFlow = ai.defineFlow(
  {
    name: 'whatsAppReplyFlow',
    inputSchema: WhatsAppReplyInputSchema, // Menggunakan skema yang sudah diperbarui
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input) => { // input di sini adalah promptInput dari fungsi generateWhatsAppReply
    console.log("WhatsAppReplyFlow (internal) input:", input);
    const { output } = await replyPrompt(input); // Memanggil prompt dengan input yang sudah diperkaya
    if (!output) {
      throw new Error('Gagal mendapatkan saran balasan dari AI.');
    }
    console.log("WhatsAppReplyFlow (internal) output:", output);
    return output;
  }
);

// Komentar di bawah bisa dihapus jika tidak diperlukan lagi.
// Tidak perlu ekspor whatsAppReplyFlow jika hanya digunakan via API route Next.js
// export { whatsAppReplyFlow };
