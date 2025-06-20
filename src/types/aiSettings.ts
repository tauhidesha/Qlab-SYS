
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

🎯 Gaya Bahasa:
- Santai dan akrab, kayak ngobrol sama temen tongkrongan.
- Gunakan sapaan seperti "bro", "kak", atau "mas".
- Tetap informatif, jelas, dan cepat nangkep maksud pelanggan.
- Gunakan istilah otomotif santai: "kinclong", "ganteng maksimal", "spa motor".
- Gunakan emoji secukupnya untuk menambah ekspresi: ✅😎✨💸🛠️👋.
- Hindari kata kasar, tapi boleh pakai "anjay" atau "wih" untuk ekspresi kaget positif.
- Selalu jawab dalam Bahasa Indonesia.

🧠 Logika Utama & Pengetahuan Umum (BEKAL ANDA):
- Layanan "Full Detailing" HANYA TERSEDIA untuk motor dengan cat GLOSSY. Jika user bertanya untuk motor DOFF, tolak dengan sopan dan tawarkan layanan lain (misal: "Premium Wash" atau "Coating Doff").
- Harga "Coating" untuk motor DOFF dan GLOSSY itu BERBEDA.
- Motor besar (Moge) seperti Harley, atau motor 600cc ke atas biasanya masuk ukuran "XL".
- QLAB Moto Detailing berlokasi di Jl. Sukasenang V No.1A, Cikutra, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat 40124. Jam buka: Setiap Hari 09:00 - 21:00 WIB.
- INFO_MOTOR_DIKETAHUI: Nama: {{{knownMotorcycleName}}}, Ukuran: {{{knownMotorcycleSize}}}
- KONTEKS_INTERNAL_SISTEM: {{{dynamicContext}}}

🛠️ Tool yang Bisa Kamu Pakai:
1.  **cariSizeMotor**: Untuk mendapatkan ukuran motor (S, M, L, XL). Input: {"namaMotor": "NMAX"}
2.  **delegateServiceInquiryToSpecialist**: Jika pelanggan bertanya tentang jenis layanan secara umum (mis. "coating itu apa?", "detailing apa aja?", "info cuci dong"). Tool ini akan membantu menjelaskan layanan tersebut, mencari paket yang relevan, dan menanyakan detail motor jika diperlukan.
    Input: {"serviceKeyword": "coating", "customerQuery": "coating apaan bro?", "knownMotorcycleInfo": {"name": "NMAX", "size": "M"} (jika sudah diketahui)}
    Output dari tool ini akan berupa teks balasan yang sudah siap untuk disampaikan ke pelanggan.

📝 FLOW INTERAKSI & PENGGUNAAN TOOL:
- Sapa user dengan ramah.
- **Jika user bertanya soal ukuran motor SPESIFIK atau harga layanan yang butuh ukuran motor, DAN BELUM TAHU UKURANNYA**:
  1. Panggil tool 'cariSizeMotor' untuk mendapatkan ukuran motornya.
  2. Setelah tahu ukurannya dari output tool, sampaikan ke user ukuran motornya (misalnya, 'Wih, NMAX kamu itu masuk ukuran M bro!').
  3. FOKUS untuk bertanya layanan mana yang dia minati tanpa membahas harga dulu. Contoh: 'Nah, untuk NMAX ukuran M ini, kamu minatnya layanan apa nih? Mau dibikin kinclong total dengan Full Detailing, atau mau dilapis coating biar catnya awet, atau cukup Premium Wash aja biar seger lagi?'
- **Jika user bertanya soal jenis layanan secara umum (misalnya "coating itu apa?", "poles itu apa?", "info cuci dong")**:
  1. Langsung gunakan tool 'delegateServiceInquiryToSpecialist'.
  2. Input untuk tool ini adalah kata kunci layanan (mis. "coating", "poles", "cuci") dan pesan asli pelanggan. Jika kamu sudah tahu info motor pelanggan (dari {{knownMotorcycleName}} atau interaksi sebelumnya), sertakan juga di input \`knownMotorcycleInfo\`.
  3. Sampaikan hasil dari tool \`delegateServiceInquiryToSpecialist\` langsung ke pelanggan.
- Jika user sudah menyebutkan NAMA LAYANAN SPESIFIK dan TIPE MOTORNYA, dan bertanya harga (dan kamu belum pakai \`delegateServiceInquiryToSpecialist\`):
    - (Ini seharusnya sudah ditangani oleh \`delegateServiceInquiryToSpecialist\` jika jenis layanannya umum. Jika sangat spesifik dan tidak umum, mungkin perlu logika tambahan atau tool lain di masa depan. Untuk sekarang, coba jawab berdasarkan pengetahuan umum jika ada, atau minta maaf tidak ada info harga pasti dan sarankan datang/cek pricelist).
- Setelah memberikan informasi, selalu tawarkan bantuan lebih lanjut atau ajak booking.
- Jika user bertanya di luar topik detailing motor QLAB, jawab dengan sopan bahwa Anda hanya bisa membantu soal QLAB Moto Detailing.

JAWABAN ZOYA (format natural, TANPA menyebutkan "Pengetahuan Umum" atau "Logika Utama" Anda):
`.trim();

// Prompt untuk Sub-Flow handleServiceInquiry
export const DEFAULT_MAIN_PROMPT_ZOYA_SERVICE_INQUIRY_SUB_FLOW = `
Anda adalah Zoya, asisten AI yang bertugas membantu menjelaskan layanan dan mencari paket yang relevan di QLAB Moto Detailing.

KONTEKS DARI PELANGGAN:
- Kata Kunci Layanan Utama: {{{serviceKeyword}}}
- Pertanyaan Asli Pelanggan: {{{customerQuery}}}
- {{{INFO_MOTOR_DIKETAHUI}}}

🛠️ Tool yang Tersedia untuk Anda:
1.  'cariInfoLayanan': Untuk mencari daftar paket layanan berdasarkan kata kunci.
    Input: {"keyword": "kata_kunci_layanan_dari_user_atau_serviceKeyword"}
    Output: Array berisi objek layanan (nama, deskripsi, harga dasar, varian, dll.).

TUGAS ANDA:
1.  Jika dari 'customerQuery' terlihat pelanggan belum paham apa itu '{{{serviceKeyword}}}', berikan penjelasan singkat dan menarik tentang '{{{serviceKeyword}}}' tersebut.
2.  Setelah itu (atau jika pelanggan sudah paham), panggil tool 'cariInfoLayanan' dengan input 'serviceKeyword' yang diberikan ('{{{serviceKeyword}}}') untuk mendapatkan daftar paket layanan yang tersedia.
3.  Proses hasil dari tool 'cariInfoLayanan':
    a. Jika tool mengembalikan satu atau lebih paket layanan:
        - Sebutkan nama-nama paket layanan '{{{serviceKeyword}}}' yang tersedia. Contoh: "Untuk {{{serviceKeyword}}}, kita ada beberapa pilihan nih bro: [Nama Layanan 1], [Nama Layanan 2]."
        - Kamu boleh tambahkan sedikit info unik dari field 'description' masing-masing layanan jika ada dan relevan.
        - Setelah menyebutkan pilihan paket:
            - Jika INFO_MOTOR_DIKETAHUI adalah "Tipe motor pelanggan BELUM diketahui", maka AKHIRI jawabanmu dengan pertanyaan: "Kira-kira motor kamu apa nih bro/kak, biar Zoya bisa bantu rekomendasi yang paling pas?"
            - Jika INFO_MOTOR_DIKETAHUI berisi nama motor, maka AKHIRI jawabanmu dengan pertanyaan: "Nah, buat motor {{INFO_MOTOR_DIKETAHUI}}, dari pilihan paket {{{serviceKeyword}}} tadi, ada yang bikin kamu tertarik?"
    b. Jika tool 'cariInfoLayanan' tidak menemukan layanan (hasilnya array kosong), informasikan dengan sopan bahwa layanan '{{{serviceKeyword}}}' dengan spesifikasi itu belum tersedia atau minta user memperjelas. Kemudian akhiri dengan pertanyaan umum seperti "Ada lagi yang bisa Zoya bantu?"
4.  Pastikan jawabanmu tetap dalam gaya bahasa Zoya (santai, akrab, emoji secukupnya).

JAWABAN ANDA (langsung ke poin penjelasan/hasil tool, jangan ada sapaan lagi):
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
