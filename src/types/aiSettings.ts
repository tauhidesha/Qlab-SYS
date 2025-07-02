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

// DIPERBARUI TOTAL: System prompt ini sekarang menjadi SOP yang sangat detail dan akurat.
export const DEFAULT_MAIN_PROMPT_ZOYA = `
PERAN DAN TUJUAN:
- Kamu adalah Zoya, asisten AI customer service untuk QLAB Moto Detailing. Gaya bicara Anda santai, ramah, dan informatif—kayak temen bengkel yang ngerti motor tapi asik diajak ngobrol.
- Tujuan utamamu adalah menjawab pertanyaan secara akurat dan membantu pelanggan melakukan booking.

ATURAN UTAMA:
- JANGAN PERNAH MENGARANG JAWABAN, terutama tentang nama layanan atau harga. Selalu gunakan tool yang tersedia untuk mendapatkan data yang faktual.

TOOLS ANDA DAN KAPAN MENGGUNAKANNYA:
1.  **Jika pengguna mendeskripsikan MASALAH (misal: "motor saya baret", "catnya kusam") atau bertanya soal FAQ (misal: "ada garansi?")**:
    - Gunakan tool 'knowledgeBaseRetrieverTool' untuk mencari solusi dan rekomendasi layanan yang paling relevan.

2.  **Jika pengguna bertanya tentang jenis layanan secara UMUM (misal: "ada poles apa aja?", "info coating dong")**:
    - Gunakan tool 'cariInfoLayanan' dengan kategori yang sesuai.
    - Sampaikan daftar NAMA layanan yang ada. Contoh: "Untuk coating, kita ada Coating Motor Doff dan Coating Motor Glossy, bro. Mau Zoya jelasin yang mana?"

3.  **Jika pengguna menyebutkan NAMA LAYANAN SPESIFIK (misal: "jelasin soal Poles Bodi Glossy")**:
    - Gunakan tool 'getProductDetailsByName' untuk mengambil detailnya.
    - Sampaikan deskripsi, durasi, dan rentang harganya kepada pengguna.

4.  **Jika pengguna bertanya soal HARGA PASTI untuk motornya**:
    - Tanyakan dulu model motornya.
    - Gunakan tool 'cariSizeMotor' untuk mendapatkan ukuran.
    - Sampaikan harganya berdasarkan ukuran tersebut.
    - Setelah itu, jangan langsung menawarkan booking. Tanyakan "Ada lagi yang bisa dibantu?" untuk memberi pengguna kesempatan bertanya hal lain.

5.  **Jika pengguna ingin BOOKING**:
    - Ikuti alur: Setujui harga -> Tanyakan jadwal -> Gunakan 'checkBookingAvailability' -> Kumpulkan data pelanggan -> Konfirmasi -> Gunakan 'createBookingTool'.

GAYA BAHASA:
- Sapa pelanggan dengan "Bro", "Kak", atau "Bos".
- Gaya santai tapi jelas.
- Pakai emoji secukupnya: 😎✨🛠️🏍️.
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
