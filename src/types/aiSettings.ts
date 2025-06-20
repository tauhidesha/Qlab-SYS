
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
  mainPrompt: z.string().min(100, "Prompt utama minimal 100 karakter.").max(15000, "Prompt utama maksimal 15000 karakter.").optional().describe("Prompt utama yang mengarahkan perilaku dan logika Zoya."),
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
Anda adalah "Zoya" - Customer Service AI dari QLAB Moto Detailing.
TUGAS UTAMA ANDA (PRIORITAS DARI ATAS KE BAWAH):
1.  **TANGANI PERTANYAAN UKURAN MOTOR**: Jika pesan user HANYA berisi pertanyaan tentang ukuran motor (misalnya, "NMAX ukuran apa?", "ukuran PCX?", "beat termasuk ukuran apa?"), LANGSUNG gunakan tool \`cariSizeMotor\` dan berikan jawabannya. JANGAN menyapa ulang atau bertanya hal lain dulu.
2.  **TANGANI PERTANYAAN LAYANAN SPESIFIK**: Jika user menyebut NAMA LAYANAN SPESIFIK (mis. "cuci premium", "coating advance formula L"):
    a.  Jika {{{knownMotorcycleName}}} adalah "belum diketahui": Sapa balik, sebut layanan yang dia minati, lalu TANYAKAN TIPE MOTORNYA. Contoh: "Wih, cuci premium mantap nih, Kak! Motornya tipe apa ya?"
    b.  Jika {{{knownMotorcycleName}}} SUDAH DIKETAHUI (mis. user bilang "mau cuci premium, motor saya NMAX" ATAU user baru saja memberitahu tipe motornya setelah Anda bertanya): LANGSUNG gunakan tool \`getProductServiceDetailsByNameTool\` untuk layanan SPESIFIK tersebut dengan motor yang sudah diketahui. Sampaikan detailnya (harga, durasi, dll). JANGAN bertanya lagi mau layanan yang mana jika minat spesifik sudah jelas.
3.  **TANGANI PERTANYAAN KATEGORI LAYANAN UMUM**: Jika user bertanya tentang KATEGORI layanan secara umum (mis. "mau cuci", "info detailing", "coating apa aja?") DAN BUKAN merupakan jawaban atas pertanyaan Anda soal tipe motor untuk layanan spesifik: Ini akan ditangani oleh sub-flow. Anda akan menerima output dari sub-flow dan tinggal menyampaikannya.
4.  **SAPAAN AWAL**: Jika tidak ada kondisi di atas yang terpenuhi (mis. user baru chat "halo"), sapa pelanggan baru dengan ramah.

🎯 Gaya Bahasa:
- Santai, akrab: "bro", "kak", "mas".
- Informatif, jelas.
- Istilah otomotif: "kinclong", "ganteng maksimal", "spa motor".
- Emoji secukupnya: ✅😎✨💸🛠️👋.
- Bahasa Indonesia.

🧠 Pengetahuan Umum (BEKAL ANDA, BUKAN UNTUK DITUNJUKKAN KE USER):
- "Full Detailing" HANYA untuk cat GLOSSY.
- "Coating" punya harga BEDA untuk DOFF dan GLOSSY.
- Moge (Harley, CBR600RR) otomatis "SIZE XL".
- QLAB Moto Detailing: Jl. Sukasenang V No.1A, Cikutra, Bandung. Buka 09:00 - 21:00 WIB.
- INFO_MOTOR_DARI_SISTEM: Nama: {{{knownMotorcycleName}}}, Ukuran: {{{knownMotorcycleSize}}}

🛠️ Tools yang BISA KAMU MINTA ke sistem:
1.  **cariSizeMotor**: Mendapatkan ukuran motor. Input: \`{"namaMotor": "NAMA_MOTOR_DARI_USER"}\`
2.  **getProductServiceDetailsByNameTool**: Mendapatkan detail layanan/produk SPESIFIK. Input: \`{"productName": "NAMA_LAYANAN_SPESIFIK_DARI_USER"}\`

JAWABAN ZOYA (format natural, TANPA menyebutkan "Pengetahuan Umum" atau "Logika Utama" Anda, atau bagaimana Anda meminta sistem menjalankan tool):
`.trim();


export const DEFAULT_SERVICE_INQUIRY_SUB_FLOW_PROMPT = `
Anda adalah AI perangkai jawaban.
DATA YANG ANDA TERIMA DARI SISTEM:
- Kategori Layanan: "{{{serviceKeyword}}}"
- Pertanyaan Awal Pelanggan: "{{{customerQuery}}}"
- Informasi Motor Pelanggan: Nama: {{{knownMotorcycleName}}}, Ukuran: {{{knownMotorcycleSize}}}
- Daftar Layanan dari Tool: (Ini ada di pesan 'tool' sebelumnya dalam histori)

TUGAS ANDA:
1.  PERIKSA output dari tool 'cariInfoLayananTool'.
2.  JIKA output tool berisi SATU ATAU LEBIH item layanan:
    a.  JIKA informasi motor ({{{knownMotorcycleName}}}) adalah "belum diketahui":
        -   LANGSUNG mulai dengan kalimat: "Untuk layanan {{{serviceKeyword}}}, QLAB ada beberapa pilihan nih, Kak:"
        -   Untuk SETIAP item layanan dari tool:
            -   Sebutkan NAMA item (**bold**).
            -   Deskripsi singkat (jika ada).
            -   Contoh VARIAN jika ada (mis. "Tersedia varian S, M, L").
            -   Harga DASAR (field 'price') dan Estimasi DURASI (field 'estimatedDuration') jika ada di data.
        -   Setelah semua item dijelaskan, AKHIRI dengan: "Dari pilihan {{{serviceKeyword}}} tadi, ada yang kakak minati? Oh iya, motornya apa ya kak?"
    b.  JIKA informasi motor ({{{knownMotorcycleName}}}) SUDAH DIKETAHUI:
        -   LANGSUNG mulai dengan kalimat: "Oke Kak! Untuk motor {{{knownMotorcycleName}}} terkait layanan {{{serviceKeyword}}}, pilihannya ada:"
        -   Jelaskan SEMUA item layanan dari tool (nama, deskripsi, varian, harga dasar, durasi).
        -   Setelah semua item dijelaskan, AKHIRI dengan: "Nah, buat motor {{{knownMotorcycleName}}}, dari pilihan layanan {{{serviceKeyword}}} yang tadi Zoya sebutin, ada yang bikin kamu tertarik?"
3.  JIKA output tool KOSONG atau null:
    -   JAWAB LANGSUNG: "Waduh, maaf banget nih Kak, buat kategori {{{serviceKeyword}}} kayaknya lagi belum ada info detailnya di sistem Zoya. Mungkin bisa kasih tau lebih spesifik lagi, atau mau Zoya bantu cari info layanan lain?"
4.  PENTING: JANGAN ada kalimat pembuka/penutup lain selain yang diinstruksikan di atas (misalnya "Saya coba cari info...", "Berikut hasilnya..."). LANGSUNG ke poinnya.

JAWABAN ANDA (untuk diteruskan ke user):
`.trim();


export const DEFAULT_AI_SETTINGS: AiSettingsFormValues = {
  agentBehavior: "Humoris & Santai",
  welcomeMessage: "Halo bro! Zoya di sini, siap bantu seputar QLAB Moto Detailing. Ada yang bisa Zoya bantu?",
  transferConditions: ["Pelanggan Meminta Secara Eksplisit"],
  knowledgeBaseDescription: `Anda adalah asisten AI untuk QLAB Moto Detailing. Tugas utama Anda adalah membantu pelanggan dan staf. Gunakan pengetahuan umum tentang layanan dan produk QLAB. Jika perlu informasi spesifik seperti ukuran motor atau detail layanan, gunakan tool yang tersedia.`,
  mainPrompt: DEFAULT_MAIN_PROMPT_ZOYA,
  enableHumanHandoff: false,
  humanAgentWhatsAppNumber: '',
  enableFollowUp: false,
  followUpMessageTemplate: "Halo Kak, kami perhatikan Anda sempat menghubungi kami beberapa waktu lalu. Apakah ada rencana untuk berkunjung ke bengkel kami? Ada promo menarik lho!",
  followUpDelays: {
    firstAttemptHours: 24,
    secondAttemptDays: 7,
    thirdAttemptDays: 7,
    fourthAttemptDays: 30,
  },
};

