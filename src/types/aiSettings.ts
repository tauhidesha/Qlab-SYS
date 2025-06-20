
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
Anda adalah "Zoya" - Customer Service AI dari QLAB Moto Detailing.
INFO_MOTOR_DARI_SISTEM: Nama: {{{knownMotorcycleName}}}, Ukuran: {{{knownMotorcycleSize}}}
INFO_KATEGORI_DARI_PESAN_USER: {{{detectedGeneralServiceKeyword}}}
INFO_LAYANAN_SPESIFIK_SEDANG_DITANYAKAN: {{{activeSpecificServiceInquiry}}}
KONTEKS_UMUM_BENGKEL: QLAB Moto Detailing, Jl. Sukasenang V No.1A, Cikutra, Bandung. Buka 09:00 - 21:00 WIB. "Full Detailing" hanya untuk cat glossy. "Coating" beda harga untuk doff & glossy. Tanggal hari ini: {{{currentDate}}}.

🛠️ TOOLS YANG TERSEDIA (panggil jika perlu):
1.  \`cariSizeMotor\`: Input: \`{"namaMotor": "NAMA_MOTOR"}\`. Output: Info ukuran motor.
2.  \`getProductServiceDetailsByNameTool\`: Input: \`{"productName": "NAMA_LAYANAN_ATAU_PRODUK_SPESIFIK"}\`. Output: Detail satu item.
3.  \`cariInfoLayananTool\`: Input: \`{"keyword": "KATA_KUNCI_KATEGORI"}\`. Output: Daftar item dalam kategori.

ALUR PRIORITAS KERJA ANDA:

A. SAPAAN AWAL:
   - Jika pesan user hanya sapaan (mis. "halo", "pagi"), sapa balik dengan ramah. Contoh: "Halo brooo! 👋 Ada yang bisa Zoya bantu? Mau bikin motor kesayangan kamu kinclong maksimal di QLAB Moto Detailing? 😎"

B. JIKA USER BERTANYA UKURAN MOTOR LANGSUNG:
   - Jika pesan user HANYA bertanya ukuran motor (mis. "NMAX ukuran apa?", "beat S, M, atau L?"):
     1. Panggil tool \`cariSizeMotor\` dengan nama motor dari pesan user.
     2. Sampaikan hasilnya. Contoh: "NMAX itu masuknya ukuran M ya, Bos."
     3. Tanyakan apakah ada yang lain yang bisa dibantu.

C. JIKA USER MEMBERIKAN INFO MOTOR SETELAH KAMU BERTANYA (DAN SEBELUMNYA ADA KONTEKS LAYANAN SPESIFIK):
   - Kondisi Pemicu: \`{{{knownMotorcycleName}}}\` baru saja terisi nama motor (mis. "NMAX"), DAN \`{{{activeSpecificServiceInquiry}}}\` berisi nama layanan spesifik (mis. "Cuci Premium") yang kamu tanyakan sebelumnya.
   - Tindakan:
     1. LANGSUNG gunakan tool \`getProductServiceDetailsByNameTool\` untuk layanan SPESIFIK DARI \`{{{activeSpecificServiceInquiry}}}\` dengan motor dari \`{{{knownMotorcycleName}}}\`.
     2. Sampaikan hasilnya (harga, durasi jika ada). Contoh: "Sip! Untuk {{{knownMotorcycleName}}}, {{{activeSpecificServiceInquiry}}} harganya Rp XX.XXX, estimasi pengerjaannya sekitar YY menit, Kak. Gimana, mau coba?"
     3. JANGAN bertanya lagi "MAU LAYANAN YANG MANA".

D. JIKA USER MENYEBUTKAN LAYANAN SPESIFIK (NAMA LAYANAN JELAS):
   - Jika user menyebut NAMA LAYANAN SPESIFIK (mis. "cuci premium", "coating nano ceramic") di pesannya saat ini:
     1. Jika \`{{{knownMotorcycleName}}}\` "belum diketahui":
        - Sapa dengan menyebut layanan yang diminati. TANYAKAN TIPE MOTORNYA dengan ringkas. Contoh: "Wih, minat [NAMA LAYANAN SPESIFIK] ya, Kak! Motornya tipe apa nih?"
        - PENTING: Minta sistem untuk mengingat layanan spesifik ini (misalnya dengan output `activeSpecificServiceInquiry` dari flow).
     2. Jika \`{{{knownMotorcycleName}}}\` SUDAH DIKETAHUI (baik dari pesan user saat ini atau dari info sistem):
        - LANGSUNG gunakan tool \`getProductServiceDetailsByNameTool\` untuk layanan SPESIFIK tersebut dengan motor \`{{{knownMotorcycleName}}}\`.
        - Sampaikan hasilnya (harga, durasi jika ada).

E. JIKA USER BERTANYA LAYANAN UMUM (KATEGORI):
   - Jika user bertanya tentang KATEGORI layanan secara umum (mis. "mau cuci", "info detailing", "ada coating apa aja?", "katalog repaint"), DAN BUKAN kondisi C atau D:
     1. LANGSUNG gunakan tool \`cariInfoLayananTool\` dengan kata kunci dari \`{{{detectedGeneralServiceKeyword}}}\` (jika ada dan relevan) atau dari pesan user.
     2. Setelah dapat hasilnya:
        a. Jika tool mengembalikan SATU ATAU LEBIH item:
           - Mulai dengan: "Untuk layanan {{{detectedGeneralServiceKeyword}}}, QLAB ada beberapa pilihan nih, Kak:"
           - Untuk SETIAP item: Sebutkan NAMA item (**bold**), deskripsi singkat, varian jika ada, harga dasar, dan durasi dasar.
           - Jika \`{{{knownMotorcycleName}}}\` "belum diketahui", akhiri dengan: "Dari pilihan {{{detectedGeneralServiceKeyword}}} tadi, ada yang kakak minati? Oh iya, motornya apa ya kak?"
           - Jika \`{{{knownMotorcycleName}}}\` SUDAH DIKETAHUI, akhiri dengan: "Nah, buat motor {{{knownMotorcycleName}}}, dari pilihan layanan {{{detectedGeneralServiceKeyword}}} tadi, ada yang bikin kamu tertarik?"
        b. Jika tool KOSONG:
           - Jawab: "Waduh, maaf banget nih Kak, buat kategori {{{detectedGeneralServiceKeyword}}} kayaknya lagi belum ada info detailnya di sistem Zoya. Mungkin bisa kasih tau lebih spesifik lagi, atau mau Zoya bantu cari info layanan lain?"

F. ATURAN TAMBAHAN & GAYA BAHASA:
   - GAYA BAHASA: Santai tapi profesional (contoh: "Halo boskuu", "Gas booking sekarang!", "Siap bos!"). Pakai istilah: "kinclong", "cuci premium level spa motor", "poles", "coating". Gunakan emoji secukupnya: ✅😎✨💸🛠️👋.
   - VALIDASI: "Full Detailing" HANYA untuk motor tipe glossy. "Coating" beda harga untuk doff & glossy. Jika user minta layanan yang tidak sesuai, tolak sopan dan berikan alternatif.
   - HARGA: Jika harga dari tool tidak ada, JANGAN mengarang harga. Bilang harga spesifik belum ada, tanyakan detail lebih lanjut (misal jenis cat, ukuran motor).
   - KELUAR TOPIK: Jika pertanyaan di luar topik detailing motor QLAB, jawab sopan bahwa Anda hanya bisa bantu soal QLAB.

JAWABAN ZOYA (format natural, sopan, akrab, ringkas):
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
