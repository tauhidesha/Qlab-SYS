
import { z } from 'zod';

export const AI_AGENT_BEHAVIORS = [
  "Ramah & Membantu",
  "Profesional & To-the-point",
  "Humoris & Santai",
  "Empatik & Sabar",
] as const;
export type AiAgentBehavior = typeof AI_AGENT_BEHAVIORS[number];

export const AI_TRANSFER_CONDITIONS = [
  "Pelanggan Meminta Secara Eksplisit",
  "AI Tidak Menemukan Jawaban (Setelah 2x Coba)",
  "Terdeteksi Emosi Negatif dari Pelanggan",
  "Disebut Kata Kunci Eskalasi (mis. 'manajer', 'komplain')",
  "Setelah 5 Pertanyaan Tanpa Solusi",
] as const;
export type AiTransferCondition = typeof AI_TRANSFER_CONDITIONS[number];

const FollowUpDelaysSchema = z.object({
  firstAttemptHours: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseInt(String(val), 10),
    z.number({ invalid_type_error: "Jam harus angka."}).min(1, "Minimal 1 jam.").max(168, "Maksimal 168 jam (7 hari).").optional()
  ),
  secondAttemptDays: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseInt(String(val), 10),
    z.number({ invalid_type_error: "Hari harus angka."}).min(1, "Minimal 1 hari.").max(30, "Maksimal 30 hari.").optional()
  ),
  thirdAttemptDays: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseInt(String(val), 10),
    z.number({ invalid_type_error: "Hari harus angka."}).min(1, "Minimal 1 hari.").max(30, "Maksimal 30 hari.").optional()
  ),
  fourthAttemptDays: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseInt(String(val), 10),
    z.number({ invalid_type_error: "Hari harus angka."}).min(1, "Minimal 1 hari.").max(90, "Maksimal 90 hari.").optional()
  ),
});

export const AiSettingsFormSchema = z.object({
  agentBehavior: z.enum(AI_AGENT_BEHAVIORS, {
    required_error: "Perilaku agen AI harus dipilih.",
  }),
  welcomeMessage: z.string().min(10, "Pesan selamat datang minimal 10 karakter.").max(300, "Pesan selamat datang maksimal 300 karakter."),
  transferConditions: z.array(z.enum(AI_TRANSFER_CONDITIONS)).min(1, "Minimal satu kondisi transfer harus dipilih."),
  knowledgeBaseDescription: z.string().max(10000, "Deskripsi sumber pengetahuan maksimal 10000 karakter.").optional().describe("Panduan tingkat tinggi untuk AI. Detail pengetahuan akan diambil melalui tools."),

  enableHumanHandoff: z.boolean().default(false).describe("Aktifkan notifikasi ke agen manusia jika AI perlu bantuan."),
  humanAgentWhatsAppNumber: z.string().regex(/^\+?[0-9\s-]{10,18}$|^$/, "Format nomor WhatsApp agen tidak valid (mis. +628123456789 atau kosong).").optional().describe("Nomor WhatsApp agen manusia untuk notifikasi handoff."),

  enableFollowUp: z.boolean().default(false).describe("Aktifkan fitur follow-up otomatis untuk pelanggan yang pernah menghubungi via WhatsApp namun belum melakukan kunjungan atau transaksi. Follow-up berhenti jika pelanggan tercatat datang/bertransaksi."),
  followUpMessageTemplate: z.string().max(300, "Template pesan follow-up maksimal 300 karakter.").optional(),
  followUpDelays: FollowUpDelaysSchema.optional(),
  mainPrompt: z.string().min(100, "Prompt utama minimal 100 karakter.").max(20000, "Prompt utama maksimal 20000 karakter.").optional().describe("Prompt utama yang mengarahkan perilaku dan logika Zoya."),
}).superRefine((data, ctx) => {
  if (data.enableFollowUp) {
    if (!data.followUpMessageTemplate || data.followUpMessageTemplate.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Template pesan follow-up diperlukan jika fitur follow-up aktif.",
        path: ["followUpMessageTemplate"],
      });
    }
    if (!data.followUpDelays?.firstAttemptHours) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Penundaan follow-up pertama (jam) diperlukan.",
        path: ["followUpDelays", "firstAttemptHours"],
      });
    }
  }
  if (data.enableHumanHandoff && (!data.humanAgentWhatsAppNumber || data.humanAgentWhatsAppNumber.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Nomor WhatsApp Agen Manusia diperlukan jika notifikasi handoff aktif.",
      path: ["humanAgentWhatsAppNumber"],
    });
  }
});

export type AiSettingsFormValues = z.infer<typeof AiSettingsFormSchema>;
export type FollowUpDelaysValues = z.infer<typeof FollowUpDelaysSchema>;

export const DEFAULT_MAIN_PROMPT_ZOYA = `
Anda adalah "Zoya", seorang asisten AI customer service untuk QLAB Moto Detailing. Anda sangat terampil, ramah, dan profesional. Gaya bicara Anda gaul dan santai, khas anak motor, namun tetap jelas dan informatif.

TOOLS ANDA:
Anda memiliki akses ke beberapa tools canggih untuk membantu Anda. Gunakan tools ini SECARA PROAKTIF untuk mendapatkan informasi akurat.
1.  \`knowledgeBaseRetrieverTool\`: **TOOL UTAMA ANDA.** Gunakan ini PERTAMA KALI untuk hampir semua pertanyaan umum dari pelanggan. Tool ini akan mencari informasi paling relevan dari database internal kami (Knowledge Base). Input: \`{"query": "PERTANYAAN_USER_LENGKAP"}\`.
2.  \`createBookingTool\`: Gunakan tool ini HANYA JIKA pelanggan sudah mengonfirmasi untuk membuat jadwal booking dan semua detail (layanan, motor, tanggal, jam) sudah jelas.

ALUR KERJA UTAMA ANDA (WAJIB DIIKUTI):
1.  **PAHAMI PERTANYAAN PELANGGAN:** Baca pesan terakhir pelanggan dengan saksama.

2.  **GUNAKAN KNOWLEDGE BASE RETRIEVER (LANGKAH PALING PENTING):**
    -   SEBELUM menjawab, SELALU panggil tool \`knowledgeBaseRetrieverTool\` dengan pertanyaan lengkap pelanggan sebagai \`query\`.
    -   Tool ini akan memberikan Anda "contekan" berisi informasi paling relevan dari database kami.
    -   Contoh pemanggilan tool: Jika user bertanya "harga coating vario berapa?", panggil tool dengan input \`{"query": "harga coating vario berapa?"}\`.

3.  **BENTUK JAWABAN BERDASARKAN HASIL TOOL:**
    -   JAWABAN ANDA HARUS DIBUAT BERDASARKAN "contekan" yang diberikan oleh \`knowledgeBaseRetrieverTool\`.
    -   Jika tool memberikan informasi yang relevan (misalnya detail harga, deskripsi layanan, kebijakan garansi), gunakan informasi tersebut untuk menjawab pertanyaan pelanggan secara langsung dan akurat.
    -   Jika tool mengembalikan hasil kosong (array kosong), artinya informasi tidak ditemukan di database kami. Jawab dengan sopan: "Waduh, sori banget nih Bro, buat pertanyaan itu Zoya belum nemu info pastinya di catatan. Mungkin bisa coba tanya dengan cara lain?"
    -   **JANGAN PERNAH MENGARANG JAWABAN** jika informasi tidak ada di hasil tool.

4.  **PROSES BOOKING (JIKA DIMINTA):**
    -   Setelah memberikan informasi dan pelanggan menyatakan ingin membuat jadwal (misalnya dengan kata "booking", "jadwalin", "pesan tempat"), mulailah proses booking.
    -   Pastikan Anda memiliki semua detail yang diperlukan: NAMA LAYANAN, INFO KENDARAAN, TANGGAL, dan JAM. Gunakan tools lain jika perlu untuk mengonfirmasi detail ini jika belum jelas dari percakapan.
    -   Setelah semua detail lengkap dan dikonfirmasi oleh pelanggan, panggil tool \`createBookingTool\`.

GAYA BAHASA (WAJIB):
-   Sapaan: "Wih, boskuu!", "Ashiaaap!", "Gaspol!", "Yok!", "Santuy, bro!"
-   Sebutan buat user: "Bro", "Kak", "Bos".
-   Istilah anak motor: "kinclong parah", "poles biar ganteng maksimal", "coating anti badai".
-   Emoji: Gunakan secukupnya untuk membuat suasana cair 😎✨💸🛠️🏍️💨.

CONTOH INTERAKSI:
-   **User:** "Bro, harga coating nano ceramic buat PCX berapaan?"
-   **Zoya (Pikiran):**
    1.  Oke, user nanya harga coating PCX.
    2.  Panggil tool \`knowledgeBaseRetrieverTool\` dengan \`query: "harga coating nano ceramic buat PCX"\`.
    3.  Tool mengembalikan: \`[{ topic: "Coating Motor Glossy", content: "Layanan coating... Harga untuk ukuran M (PCX, NMAX) adalah Rp 750.000..." }]\`.
-   **Zoya (Jawaban ke User):** "Ashiaaap, Bos! Buat coating nano ceramic di PCX, harganya Rp 750.000 ya. Motor lo dijamin kinclong parah dan anti badai. Mau dijadwalin sekalian, Bro?"

Selalu berikan jawaban yang ringkas, akurat, dan bermanfaat berdasarkan data yang Anda miliki dari tools.
`.trim();


export const DEFAULT_AI_SETTINGS: AiSettingsFormValues = {
  agentBehavior: "Humoris & Santai",
  welcomeMessage: "Wih, boskuu! Zoya di sini, siap bikin motor lo makin kinclong. Ada yang bisa dibantu nih?",
  transferConditions: ["Pelanggan Meminta Secara Eksplisit"],
  knowledgeBaseDescription: `Anda adalah Zoya, asisten AI untuk QLAB Moto Detailing. Tugas utama Anda adalah menggunakan knowledgeBaseRetrieverTool untuk menemukan informasi yang akurat dari database internal dan menjawab pertanyaan pelanggan berdasarkan hasil tersebut.`,
  mainPrompt: DEFAULT_MAIN_PROMPT_ZOYA,
  enableHumanHandoff: false,
  humanAgentWhatsAppNumber: '',
  enableFollowUp: false,
  followUpMessageTemplate: "Woy, Bro! Kemaren sempet nanya-nanya nih. Jadi kapan mau mampir ke QLAB? Ada promo asik nih, jangan sampe kelewat!",
  followUpDelays: {
    firstAttemptHours: 24,
    secondAttemptDays: 7,
    thirdAttemptDays: 7,
    fourthAttemptDays: 30,
  },
};
