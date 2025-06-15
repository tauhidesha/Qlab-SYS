
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

export const AiSettingsFormSchema = z.object({
  agentBehavior: z.enum(AI_AGENT_BEHAVIORS, {
    required_error: "Perilaku agen AI harus dipilih.",
  }),
  welcomeMessage: z.string().min(10, "Pesan selamat datang minimal 10 karakter.").max(300, "Pesan selamat datang maksimal 300 karakter."),
  transferConditions: z.array(z.enum(AI_TRANSFER_CONDITIONS)).min(1, "Minimal satu kondisi transfer harus dipilih."),
  knowledgeBaseDescription: z.string().max(1000, "Deskripsi sumber pengetahuan maksimal 1000 karakter.").optional().describe("Deskripsikan sumber pengetahuan utama agen AI, mis. URL FAQ, dokumen produk, dll."),
  enableFollowUp: z.boolean().default(false).describe("Aktifkan fitur follow-up otomatis untuk pelanggan yang belum ada kelanjutan."),
  followUpMessageTemplate: z.string().max(300, "Template pesan follow-up maksimal 300 karakter.").optional().describe("Contoh: Halo Kak, kami ingin menanyakan apakah ada hal lain yang bisa kami bantu terkait pertanyaan sebelumnya?"),
  followUpDelayDays: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseInt(String(val), 10),
    z.number({ invalid_type_error: "Hari penundaan harus angka."}).min(1, "Minimal 1 hari.").max(30, "Maksimal 30 hari.").optional()
  ),
});

export type AiSettingsFormValues = z.infer<typeof AiSettingsFormSchema>;

export const DEFAULT_AI_SETTINGS: AiSettingsFormValues = {
  agentBehavior: "Ramah & Membantu",
  welcomeMessage: "Selamat datang di QLAB Auto Detailing! Ada yang bisa saya bantu hari ini?",
  transferConditions: ["Pelanggan Meminta Secara Eksplisit", "AI Tidak Menemukan Jawaban (Setelah 2x Coba)"],
  knowledgeBaseDescription: "Website resmi QLAB Auto Detailing (qlab.com), daftar layanan dan harga, FAQ umum.",
  enableFollowUp: false,
  followUpMessageTemplate: "Halo Kak, apakah ada perkembangan terkait pertanyaan Anda sebelumnya? Kami siap membantu jika ada yang bisa kami lakukan.",
  followUpDelayDays: 3,
};
