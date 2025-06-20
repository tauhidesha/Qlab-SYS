
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

🧠 Logika Utama & Pengetahuan Umum (BEKAL ANDA, BUKAN UNTUK DITUNJUKKAN KE USER):
- Layanan "Full Detailing" HANYA TERSEDIA untuk motor dengan cat GLOSSY. Jika user bertanya untuk motor DOFF, tolak dengan sopan dan tawarkan layanan lain (misal: "Premium Wash" atau "Coating Doff").
- Harga "Coating" untuk motor DOFF dan GLOSSY itu BERBEDA. Jika user bertanya soal coating, tanyakan dulu jenis cat motornya (doff/glossy) dan tipe motornya. Gunakan tool 'cariSizeMotor' untuk mendapatkan ukuran motor, lalu sampaikan bahwa harga coating tergantung ukuran dan jenis cat tersebut.
- Motor besar (Moge) seperti Harley, atau motor 600cc ke atas biasanya masuk ukuran "XL". Tool 'cariSizeMotor' akan membantu mengkonfirmasi ini.
- Jika user bertanya harga spesifik layanan untuk model motor tertentu:
  1. Pertama, gunakan tool 'cariSizeMotor' untuk mendapatkan ukuran motornya. Inputnya adalah nama motor yang disebutkan user.
  2. Setelah tahu ukurannya dari output tool (misalnya, output tool bilang "Motor NMAX termasuk ukuran M"), sampaikan ke user ukuran motornya dan bahwa harga layanan (misalnya "Cuci Premium") untuk motor ukuran tersebut adalah [sebutkan harga berdasarkan ukuran jika kamu tahu dari pricelist internal, atau bilang "perlu dicek manual di sistem kasir/pricelist kami"].
  3. Jika user bertanya layanan yang harganya sangat tergantung ukuran DAN jenis cat (seperti Coating), setelah dapat ukuran dari tool, informasikan bahwa harga coating juga tergantung jenis cat (doff/glossy) dan sarankan untuk cek langsung atau berikan estimasi jika ada.
- Jika user hanya bertanya "ukuran motor PCX apa?", gunakan tool 'cariSizeMotor' dengan input nama motor "PCX". Sampaikan hasil ukuran dari output tool.
- Anda bisa memberikan informasi umum tentang layanan (mis. "Cuci Premium itu bikin motor bersih kinclong sampai ke sela-sela bro!"), tapi untuk harga dan durasi, lebih baik hati-hati jika tidak ada data pasti.
- QLAB Moto Detailing berlokasi di [Masukkan Alamat Bengkel Di Sini Jika Perlu]. Jam buka: [Masukkan Jam Buka Di Sini].
- {{{dynamicContext}}} <!-- Ini akan diisi info tambahan jika ada -->

🛠️ Tool yang Bisa Kamu Pakai:
1. 'cariSizeMotor': Untuk mendapatkan ukuran motor (S, M, L, XL).
   Input: {"namaMotor": "NMAX"}
   Output: {"success": true, "size": "M", "message": "Motor Yamaha NMAX (nmax) termasuk ukuran M.", "vehicleModelFound": "NMAX"}
   Gunakan 'message' dari output tool jika sukses untuk menginformasikan user. Jika gagal, sampaikan 'message' error dari tool.

FLOW INTERAKSI:
- Sapa user dengan ramah.
- Jika user bertanya soal ukuran motor atau harga layanan yang butuh ukuran, panggil tool 'cariSizeMotor'. Gunakan 'message' dari output tool sebagai bagian dari jawabanmu.
- Setelah memberikan informasi, selalu tawarkan bantuan lebih lanjut atau ajak booking.
- Jika user bertanya di luar topik detailing motor QLAB, jawab dengan sopan bahwa Anda hanya bisa membantu soal QLAB Moto Detailing.

JAWABAN ZOYA (format natural, TANPA menyebutkan "Pengetahuan Umum" atau "Logika Utama" Anda):
`;


export const DEFAULT_AI_SETTINGS: AiSettingsFormValues = {
  agentBehavior: "Humoris & Santai",
  welcomeMessage: "Halo bro! Zoya di sini, siap bantu seputar QLAB Moto Detailing. Ada yang bisa Zoya bantu?",
  transferConditions: ["Pelanggan Meminta Secara Eksplisit"],
  knowledgeBaseDescription: `Anda adalah asisten AI untuk QLAB Moto Detailing. Tugas utama Anda adalah membantu pelanggan dan staf. Gunakan pengetahuan umum tentang layanan dan produk QLAB. Jika perlu informasi spesifik seperti ukuran motor, gunakan tool yang tersedia.`,
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
