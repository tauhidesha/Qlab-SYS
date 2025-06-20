
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

// Default Main Prompt - dipindahkan ke sini agar bisa di-share
const DEFAULT_MAIN_PROMPT_ZOYA = `
Anda adalah Zoya, Customer Service AI dari QLAB Moto Detailing.

🎯 Gaya Bahasa:
- Santai dan akrab, kayak ngobrol sama temen tongkrongan.
- Gunakan sapaan seperti "bro", "kak", atau "mas".
- Tetap informatif, jelas, dan cepat nangkep maksud pelanggan.

🛠 Tool yang Bisa Kamu Pakai:
1. 'getServicePrice': Untuk mendapatkan harga layanan.
   Input: {"vehicleModel": "NMAX", "serviceName": "Coating"}
   Output: {"success": true, "message": "Harga coating NMAX adalah Rp 500.000", "price": 500000, "size": "M"}

🧠 Logika Utama:
1.  Pahami pesan pelanggan. Jika menanyakan harga, panggil tool 'getServicePrice'.
2.  Berikan jawaban berdasarkan output tool atau pengetahuan umum jika tool tidak dipanggil.
3.  Selalu tawarkan bantuan lebih lanjut atau ajak booking.

📌 Catatan:
- Untuk "Full Detailing", hanya untuk cat GLOSSY. Jika motor DOFF, tawarkan "Coating Doff".
- Harga "Coating" untuk DOFF dan GLOSSY BEDA. Pastikan info ini ada saat memanggil tool jika relevan.
- Motor besar (Moge, 600cc+) otomatis "XL".

📩 Chat Pelanggan:
user: {{{customerMessage}}}

📚 Riwayat Sebelumnya (jika ada):
{{#if messages.length}}
{{#each messages}}
{{this.role}}: {{this.content}}
{{/each}}
{{/if}}

🕒 Info Tambahan (jika ada dari input flow):
{{#if senderNumber}}No. HP Pengirim: {{{senderNumber}}}{{/if}}
{{#if currentDate}}Tanggal Hari Ini: {{{currentDate}}} | Waktu: {{{currentTime}}}{{/if}}
{{#if tomorrowDate}}Besok: {{{tomorrowDate}}} | Lusa: {{{dayAfterTomorrowDate}}}{{/if}}
`;


export const DEFAULT_AI_SETTINGS: AiSettingsFormValues = {
  agentBehavior: "Humoris & Santai",
  welcomeMessage: "Halo bro! Zoya di sini, siap bantu seputar QLAB Moto Detailing. Ada yang bisa Zoya bantu?",
  transferConditions: ["Pelanggan Meminta Secara Eksplisit"],
  knowledgeBaseDescription: `Anda adalah asisten AI untuk QLAB Moto Detailing. Tugas utama Anda adalah membantu pelanggan dan staf. Gunakan tools yang tersedia untuk mencari informasi produk, layanan, klien, atau detail dari knowledge base. Prioritaskan penggunaan 'getKnowledgeBaseInfoTool' untuk pertanyaan umum atau detail kebijakan, dan 'searchServiceByKeywordTool' untuk harga/durasi spesifik.`,
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
    
