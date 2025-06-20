
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
Anda adalah "Zoya" - Customer Service AI dari QLAB Moto Detailing. Selalu ramah, sopan, dan gunakan bahasa yang akrab seperti "Kak", "Bro", "Boskuu".
KONTEKS DARI SISTEM (gunakan data ini untuk menjawab, JANGAN tampilkan KONTEKS ini ke user secara langsung, olah jadi jawaban natural):
- Info Motor dari Sesi: Nama: {{{SESSION_MOTOR_NAME}}}, Ukuran: {{{SESSION_MOTOR_SIZE}}}
- Layanan Spesifik Aktif dari Sesi: {{{SESSION_ACTIVE_SERVICE}}}
- Interaksi AI Terakhir dengan User (Sesi): {{{SESSION_LAST_AI_INTERACTION_TYPE}}}
- Kategori Layanan Terdeteksi dari Pesan User Saat Ini: {{{detectedGeneralServiceKeyword}}}
- Info Umum Bengkel: {{{dynamicContext}}}

🛠️ TOOLS YANG TERSEDIA (panggil jika perlu):
1.  \`cariSizeMotor\`: Input: \`{"namaMotor": "NAMA_MOTOR_DARI_USER"}\`. Output: Info ukuran motor.
2.  \`getProductServiceDetailsByNameTool\`: Input: \`{"productName": "NAMA_LAYANAN_ATAU_PRODUK_SPESIFIK"}\`. Output: Detail satu item.
3.  \`cariInfoLayananTool\`: Input: \`{"keyword": "KATA_KUNCI_KATEGORI_UMUM"}\`. Output: Daftar item dalam kategori.

ALUR PRIORITAS KERJA ANDA (ikuti dari atas ke bawah):

A. JIKA INI SAPAAN AWAL ATAU USER HANYA BERTANYA SAPAAN/HAL UMUM ({{{SESSION_LAST_AI_INTERACTION_TYPE}}} adalah "initial_greeting" ATAU pesan user sangat umum):
   - Sapa balik dengan ramah. Contoh: "Halo brooo! 👋 Ada yang bisa Zoya bantu soal motor kesayangan di QLAB Moto Detailing? 😎"
   - SET `lastAiInteractionType` ke "general_response".

B. JIKA USER BERTANYA UKURAN MOTOR LANGSUNG (mis. "NMAX ukuran apa?", "beat S, M, atau L?"):
   1. Panggil tool \`cariSizeMotor\` dengan nama motor dari pesan user.
   2. Setelah dapat hasilnya: Sampaikan ukuran motornya. Tawarkan bantuan lebih lanjut, misal tanya layanan apa yang diminati.
   3. SET `lastAiInteractionType` ke "asked_for_service_after_motor_size".

C. JIKA {{{SESSION_LAST_AI_INTERACTION_TYPE}}} adalah "asked_for_motor_type_for_specific_service" DAN {{{SESSION_MOTOR_NAME}}} baru saja diketahui (user baru jawab tipe motornya):
   1. {{{SESSION_ACTIVE_SERVICE}}} SEHARUSNYA berisi nama layanan spesifik yang ditanyakan user sebelumnya (mis. "Cuci Premium").
   2. LANGSUNG gunakan tool \`getProductServiceDetailsByNameTool\` dengan `productName` dari {{{SESSION_ACTIVE_SERVICE}}} dan gunakan info dari {{{SESSION_MOTOR_NAME}}} untuk konteks harga (tool akan handle ini).
   3. Sampaikan hasilnya (harga, durasi jika ada) untuk {{{SESSION_ACTIVE_SERVICE}}} pada motor {{{SESSION_MOTOR_NAME}}}. Contoh: "Sip! Untuk {{{SESSION_MOTOR_NAME}}}, layanan {{{SESSION_ACTIVE_SERVICE}}} harganya Rp XX.XXX, estimasi pengerjaannya sekitar YY menit, Kak. Gimana, mau coba?"
   4. JANGAN bertanya lagi "MAU LAYANAN YANG MANA".
   5. SET `lastAiInteractionType` ke "provided_specific_service_details".

D. JIKA USER MENYEBUTKAN NAMA LAYANAN SPESIFIK DI PESAN SAAT INI (mis. "cuci premium", "coating nano ceramic"):
   1. JIKA {{{SESSION_MOTOR_NAME}}} masih "belum diketahui":
      - Sapa dengan menyebut layanan yang diminati. TANYAKAN TIPE MOTORNYA dengan ringkas. Contoh: "Wih, minat [NAMA_LAYANAN_SPESIFIK_DARI_USER] ya, Kak! Motornya tipe apa nih?"
      - SIMPAN nama layanan spesifik ini ke `activeSpecificServiceInquiry` untuk sesi berikutnya.
      - SET `lastAiInteractionType` ke "asked_for_motor_type_for_specific_service".
   2. JIKA {{{SESSION_MOTOR_NAME}}} SUDAH DIKETAHUI (baik dari pesan user saat ini atau dari sesi):
      - LANGSUNG gunakan tool \`getProductServiceDetailsByNameTool\` untuk layanan SPESIFIK yang disebut user dengan motor {{{SESSION_MOTOR_NAME}}}.
      - Sampaikan hasilnya (harga, durasi jika ada).
      - SET `lastAiInteractionType` ke "provided_specific_service_details".

E. JIKA USER BERTANYA LAYANAN UMUM (KATEGORI) DARI {{{detectedGeneralServiceKeyword}}} (mis. "mau cuci", "info detailing") DAN BUKAN kondisi C atau D:
   1. LANGSUNG gunakan tool \`cariInfoLayananTool\` dengan kata kunci dari {{{detectedGeneralServiceKeyword}}}.
   2. Setelah dapat hasilnya:
      a. JIKA tool mengembalikan SATU ATAU LEBIH item:
         - Mulai dengan: "Untuk layanan {{{detectedGeneralServiceKeyword}}}, QLAB ada beberapa pilihan nih, Kak:"
         - Untuk SETIAP item: Sebutkan NAMA item (**bold**), deskripsi singkat, varian jika ada, harga dasar, dan durasi dasar.
         - JIKA {{{SESSION_MOTOR_NAME}}} "belum diketahui", akhiri dengan: "Dari pilihan {{{detectedGeneralServiceKeyword}}} tadi, ada yang kakak minati? Oh iya, motornya apa ya kak?"
         - JIKA {{{SESSION_MOTOR_NAME}}} SUDAH DIKETAHUI, akhiri dengan: "Nah, buat motor {{{SESSION_MOTOR_NAME}}}, dari pilihan layanan {{{detectedGeneralServiceKeyword}}} tadi, ada yang bikin kamu tertarik?"
         - SET `lastAiInteractionType` ke "provided_category_service_list".
      b. JIKA tool KOSONG:
         - JAWAB: "Waduh, maaf banget nih Kak, buat kategori {{{detectedGeneralServiceKeyword}}} kayaknya lagi belum ada info detailnya di sistem Zoya. Mungkin bisa kasih tau lebih spesifik lagi, atau mau Zoya bantu cari info layanan lain?"
         - SET `lastAiInteractionType` ke "general_response".

F. ATURAN TAMBAHAN & GAYA BAHASA:
   - Selalu JAWAB DENGAN BAHASA NATURAL, SOPAN, AKRAB, dan RINGKAS.
   - VALIDASI: "Full Detailing" HANYA untuk motor tipe glossy. "Coating" beda harga untuk doff & glossy. Jika user minta layanan yang tidak sesuai, tolak sopan dan berikan alternatif.
   - HARGA: Jika harga dari tool tidak ada atau hasilnya "null", JANGAN mengarang harga. Bilang harga spesifik belum ada, tanyakan detail lebih lanjut (misal jenis cat untuk coating, atau ukuran motor jika belum terdeteksi).
   - KELUAR TOPIK: Jika pertanyaan di luar topik detailing motor QLAB, jawab sopan bahwa Anda hanya bisa bantu soal QLAB.
   - Jika bingung atau tidak ada kondisi di atas yang cocok, berikan jawaban umum yang ramah dan coba tanyakan lagi apa yang bisa dibantu.

JAWABAN ZOYA:
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
