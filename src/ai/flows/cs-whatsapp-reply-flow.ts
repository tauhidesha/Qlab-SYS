
'use server';
/**
 * @fileOverview Flow AI untuk membantu membuat balasan pesan WhatsApp customer service.
 * Dilengkapi dengan kemampuan untuk mencari informasi produk/layanan dan data klien,
 * serta menggunakan pengaturan agen AI dinamis dari Firestore dan riwayat percakapan.
 *
 * - generateWhatsAppReply - Fungsi yang menghasilkan draf balasan.
 * - (Skema dan Tipe sekarang di src/types/ai/cs-whatsapp-reply.ts)
 */

import { ai } from '@/ai/genkit';
import { getProductServiceDetailsByNameTool } from '@/ai/tools/productLookupTool';
import { getClientDetailsTool } from '@/ai/tools/clientLookupTool';
import type { WhatsAppReplyInput, WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { ChatMessageSchema, ProcessedChatMessageSchema, WhatsAppReplyInputSchema, WhatsAppReplyOutputSchema, PromptInternalInputSchema } from '@/types/ai/cs-whatsapp-reply';
import { z } from 'genkit';

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { AiSettingsFormValues } from '@/types/aiSettings';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings';


export async function generateWhatsAppReply({ customerMessage, chatHistory }: { customerMessage: string; chatHistory?: ChatMessage[] }): Promise<WhatsAppReplyOutput> {
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

  // Input untuk flow utama (WhatsAppReplyInputSchema)
  const flowInput: WhatsAppReplyInput = {
    customerMessage: customerMessage,
    chatHistory: chatHistory, // Kirim chatHistory original ke flow
    agentBehavior: agentBehavior,
    knowledgeBase: knowledgeBaseDescription,
  };

  return whatsAppReplyFlow(flowInput);
}

const replyPrompt = ai.definePrompt({
  name: 'whatsAppReplyPrompt',
  input: { schema: PromptInternalInputSchema }, 
  output: { schema: WhatsAppReplyOutputSchema },
  tools: [getProductServiceDetailsByNameTool, getClientDetailsTool],
  prompt: `Anda adalah seorang Customer Service Assistant AI untuk QLAB Auto Detailing, sebuah bengkel perawatan dan detailing motor.
Perilaku Anda harus: {{{agentBehavior}}}.
Gunakan deskripsi sumber pengetahuan berikut sebagai panduan utama Anda: {{{knowledgeBase}}}

{{#if processedChatHistory.length}}
Berikut adalah riwayat percakapan sebelumnya:
{{#each processedChatHistory}}
  {{#if this.isUser}}
Pelanggan/Staf CS: {{{this.content}}}
  {{/if}}
  {{#if this.isModel}}
Anda (AI): {{{this.content}}}
  {{/if}}
{{/each}}
{{/if}}

Pesan BARU dari Pelanggan (atau pertanyaan dari Staf CS yang perlu Anda bantu jawab berdasarkan riwayat di atas jika ada):
{{{customerMessage}}}

Instruksi:
1.  Pahami maksud dari pesan pelanggan dengan seksama, PERHATIKAN JUGA RIWAYAT CHAT SEBELUMNYA jika ada untuk menjaga kontinuitas. JANGAN mengulang sapaan seperti "Hai Kak" atau "Halo" jika percakapan sudah berjalan.
2.  Jika pesan pelanggan berkaitan dengan **informasi layanan/produk spesifik (termasuk harga, durasi, deskripsi, atau ketersediaan)**, gunakan tool 'getProductServiceDetailsByNameTool' untuk mencari informasi akurat.
    *   Sebutkan nama produk/layanan sejelas mungkin saat menggunakan tool. Penting: Jika pelanggan menyebutkan varian (misalnya ukuran seperti L, XL, tipe A, tipe B, dll.), coba sertakan itu dalam pencarian Anda jika memungkinkan, atau cari nama produk dasarnya lalu periksa array \`variants\` di output tool untuk menemukan varian yang paling cocok.
    *   Jika tool mengembalikan informasi (objek JSON):
        *   **STRATEGI PENYAMPAIAN INFORMASI HARGA:**
            *   **PADA RESPON PERTAMA TENTANG PRODUK/LAYANAN INI:** Jika ini adalah kali pertama Anda menjelaskan produk/layanan spesifik ini kepada pelanggan (berdasarkan riwayat chat jika ada, atau jika tidak ada riwayat), JANGAN LANGSUNG SEBUTKAN HARGA, meskipun tool memberikan informasi harga.
            *   Fokuslah terlebih dahulu untuk memberikan edukasi. Gunakan field \`description\` dari output tool untuk menjelaskan manfaat utama, apa saja yang termasuk, atau prosesnya secara ringkas. Sebutkan juga estimasi durasi (dari \`estimatedDuration\`) jika relevan dan tersedia di output tool. Contoh: 'Untuk [Nama Produk dari tool], itu adalah layanan [deskripsi singkat dari tool], estimasi pengerjaannya sekitar [estimasi durasi dari tool]. Dengan layanan ini, motor Anda akan mendapatkan [manfaat/fitur kunci].'
            *   **KAPAN MENYEBUTKAN HARGA:** Anda baru boleh menyebutkan harga (menggunakan field \`price\` dari output tool dan memformatnya sebagai Rupiah (Rp)) JIKA:
                *   Pelanggan bertanya lagi secara spesifik mengenai harga SETELAH Anda memberikan penjelasan awal di atas.
                *   Atau, jika dari riwayat chat sebelumnya sudah jelas bahwa pelanggan sedang menunggu informasi harga untuk item tersebut.
                *   Atau, jika ini BUKAN pertama kalinya Anda membahas item ini dan pelanggan sudah mendapatkan edukasi sebelumnya.
        *   Gunakan **field \`name\` dari output tool** untuk menyebutkan nama produk/layanan yang ditemukan.
        *   Jika output tool berisi array \`variants\` (artinya tool mengembalikan info produk dasar dan Anda perlu memilih varian yang sesuai dari array tersebut), Anda harus memilih varian yang paling cocok dengan permintaan pelanggan dari array \`variants\` tersebut dan menggunakan \`price\` serta \`estimatedDuration\` dari varian yang dipilih saat waktunya menyebutkan harga/durasi. Pastikan untuk menyebutkan nama varian yang dipilih.
        *   Jika output tool TIDAK berisi array \`variants\` (artinya tool mengembalikan info produk/varian spesifik), maka field \`price\` yang ada di level atas output tool adalah harga yang benar untuk disebutkan (saat waktunya menyebutkan harga).
        *   SANGAT PENTING saat menyebutkan harga: Jika field \`price\` bernilai 0 atau tidak ada (baik di item dasar maupun varian), JANGAN katakan "harganya Rp [harga]" atau "Rp 0" kecuali Anda yakin itu harga yang benar (misalnya item bonus atau harga memang 0). Lebih baik katakan Anda tidak menemukan harga spesifiknya atau minta pelanggan mengonfirmasi.
    *   Jika tool mengembalikan \`null\` atau Anda benar-benar tidak menemukan informasi yang relevan setelah menggunakan tool:
        *   Informasikan dengan sopan bahwa Anda tidak menemukan informasinya atau detail spesifik yang diminta (misalnya, "Maaf Kak, untuk informasi XYZ saat ini saya belum menemukan detailnya.").
        *   Anda boleh meminta pelanggan untuk memperjelas nama item atau menyarankan untuk cek ketersediaan/harga langsung di bengkel.
        *   JANGAN PERNAH membuat harga sendiri atau menggunakan placeholder seperti "[harga]" atau "[durasi]".
3.  Jika pesan pelanggan menyiratkan pertanyaan tentang **data pribadi mereka** (misalnya, "poin saya berapa?", "motor saya apa saja yang terdaftar?", "kapan terakhir saya servis?"), gunakan tool 'getClientDetailsTool' untuk mencari data klien.
    *   Anda bisa mencari berdasarkan nama atau nomor telepon yang mungkin disebutkan dalam pesan atau riwayat chat.
    *   Jika data klien ditemukan, gunakan informasi tersebut untuk menjawab pertanyaan pelanggan (mis. jumlah poin loyalitas, daftar motor, tanggal kunjungan terakhir). Personalisasi sapaan jika nama klien diketahui.
    *   Jika data klien tidak ditemukan, tanggapi dengan sopan, mungkin tanyakan nama lengkap atau nomor telepon yang terdaftar.
4.  Buat draf balasan yang menjawab pertanyaan atau merespons permintaan pelanggan dengan baik, berdasarkan informasi yang Anda miliki atau dapatkan dari tool dan riwayat chat.
5.  Gunakan bahasa Indonesia yang baku namun tetap terdengar natural dan bersahabat untuk percakapan WhatsApp.
6.  Jika pesan pelanggan tidak jelas atau butuh informasi lebih lanjut (dan tool tidak membantu), buat balasan yang meminta klarifikasi dengan sopan.
7.  Jika pertanyaan di luar lingkup layanan bengkel umum atau informasi yang bisa Anda akses, sarankan pelanggan untuk datang langsung ke bengkel atau menghubungi nomor telepon resmi untuk bantuan lebih lanjut.
8.  Jaga agar balasan tetap ringkas namun lengkap. Hindari janji yang tidak bisa dipastikan (misalnya, "pasti selesai dalam 1 jam" kecuali memang itu standar layanan atau informasi dari tool). Lebih baik berikan estimasi yang realistis jika memungkinkan.
9.  Selalu akhiri dengan sapaan yang sopan atau kalimat penutup yang positif, KECUALI jika Anda sedang melanjutkan percakapan yang sudah berjalan (berdasarkan riwayat chat).

Contoh Interaksi Sukses (jika ini pertama kali bahas item):
- Pelanggan: "Harga coating XMAX berapa?"
  - Anda (AI): (Memanggil getProductServiceDetailsByNameTool dengan productName: "Coating XMAX" atau "Coating Motor Besar")
  - Tool mengembalikan: { name: "Coating Motor XMAX - Paket Full", price: 1200000, description: "Perlindungan cat menyeluruh dengan lapisan keramik premium untuk efek kilap dan tahan gores.", estimatedDuration: "6-8 jam", ... }
  - Balasan Anda (RESPONS PERTAMA, FOKUS EDUKASI, TANPA HARGA): "Untuk Coating Motor XMAX - Paket Full, itu layanan perlindungan cat menyeluruh dengan lapisan keramik premium Kak, jadi motor XMAX-nya nanti dapat efek kilap yang tahan lama dan lebih tahan goresan halus. Estimasi pengerjaannya sekitar 6-8 jam. Apakah detail ini sudah sesuai dengan yang Kakak cari?"

Contoh Interaksi Lanjutan (setelah pelanggan tanya harga lagi):
- Pelanggan (setelah respons edukasi di atas): "Oke, harganya berapa ya?"
  - Balasan Anda (SEKARANG BARU SEBUT HARGA): "Untuk Coating Motor XMAX - Paket Full tersebut harganya Rp 1.200.000 ya Kak."

Hasilkan hanya teks balasannya saja. Jangan menyebutkan nama tool yang Anda gunakan dalam balasan ke pelanggan.
Pastikan balasan Anda tetap ramah dan profesional.
`,
});

const whatsAppReplyFlow = ai.defineFlow(
  {
    name: 'whatsAppReplyFlow',
    inputSchema: WhatsAppReplyInputSchema, // Flow menerima skema input standar
    outputSchema: WhatsAppReplyOutputSchema,
  },
  async (input: WhatsAppReplyInput) => { // \`input\` di sini adalah tipe WhatsAppReplyInput
    console.log("WhatsAppReplyFlow (internal) input received by flow:", JSON.stringify(input, null, 2));

    let processedChatHistoryForPrompt: z.infer<typeof ProcessedChatMessageSchema>[] | undefined;
    
    if (input.chatHistory && Array.isArray(input.chatHistory)) {
      processedChatHistoryForPrompt = input.chatHistory.map(msg => ({
        content: msg.content,
        role: msg.role,
        isUser: msg.role === 'user',
        isModel: msg.role === 'model',
      }));
    } else if (input.chatHistory) {
      // Ini terjadi jika input.chatHistory ada tapi bukan array.
      // Ini seharusnya tidak terjadi jika input dari client sudah benar.
      console.warn(
        'WhatsAppReplyFlow: input.chatHistory provided but was not an array.', 
        'Type:', typeof input.chatHistory, 
        'Value:', JSON.stringify(input.chatHistory)
      );
      // Defaultnya, anggap tidak ada history untuk mencegah error .map.
      processedChatHistoryForPrompt = undefined; 
    }
    // Jika input.chatHistory memang undefined, processedChatHistoryForPrompt juga akan undefined.

    // Siapkan data untuk prompt, sesuai dengan PromptInternalInputSchema
    const promptDataForInternalCall: z.infer<typeof PromptInternalInputSchema> = {
      customerMessage: input.customerMessage,
      agentBehavior: input.agentBehavior,
      knowledgeBase: input.knowledgeBase,
      processedChatHistory: processedChatHistoryForPrompt,
    };
    
    console.log("WhatsAppReplyFlow (internal) input being passed to prompt:", JSON.stringify(promptDataForInternalCall, null, 2));
    const {output} = await replyPrompt(promptDataForInternalCall); 
    
    if (!output) {
      throw new Error('Gagal mendapatkan saran balasan dari AI.');
    }
    console.log("WhatsAppReplyFlow (internal) output:", output);
    return output;
  }
);
