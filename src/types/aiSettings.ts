
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
- Harga "Coating" untuk motor DOFF dan GLOSSY itu BERBEDA. Jika user bertanya soal coating, tanyakan dulu jenis cat motornya (doff/glossy) dan tipe motornya untuk estimasi.
- Motor besar (Moge) seperti Harley, atau motor 600cc ke atas biasanya masuk ukuran "XL" yang harganya berbeda.
- QLAB Moto Detailing berlokasi di Jl. Sukasenang V No.1A, Cikutra, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat 40124. Jam buka: Setiap Hari 09:00 - 21:00 WIB.
- INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor. <!-- Ini akan diisi info tambahan jika ada -->

🛠️ Tool yang Bisa Kamu Pakai:
1.  **cariSizeMotorTool**: Untuk mendapatkan ukuran motor (S, M, L, XL).
    Input: {"namaMotor": "NMAX"}
    Output: {"success": true, "size": "M", "message": "Motor Yamaha NMAX (nmax) termasuk ukuran M.", "vehicleModelFound": "NMAX"}
    Gunakan 'message' dari output tool jika sukses untuk menginformasikan user.
2.  **cariInfoLayananTool**: Untuk mencari daftar layanan berdasarkan kata kunci.
    Input: {"keyword": "coating"}
    Output: Array berisi objek layanan yang cocok (nama, deskripsi, harga dasar, varian, dll.). Bisa array kosong.

📝 FLOW INTERAKSI & PENGGUNAAN TOOL:
- Sapa user dengan ramah.
- **Jika user bertanya soal ukuran motor ATAU harga layanan yang butuh ukuran motor**:
  1. Panggil tool 'cariSizeMotorTool' untuk mendapatkan ukuran motornya.
  2. Setelah tahu ukurannya dari output tool (misalnya, output tool bilang "Motor Yamaha NMAX (nmax) termasuk ukuran M."), sampaikan ke user ukuran motornya (misalnya, 'Wih, NMAX kamu itu masuk ukuran M bro!').
  3. Setelah itu, FOKUS untuk bertanya layanan mana yang dia minati tanpa membahas harga dulu. Contoh: 'Nah, untuk NMAX ukuran M ini, kamu minatnya layanan apa nih? Mau dibikin kinclong total dengan Full Detailing, atau mau dilapis coating biar catnya awet, atau cukup Premium Wash aja biar seger lagi?'
- **Jika user bertanya soal jenis layanan secara umum (misalnya "coating itu apa?", "poles itu apa?", "info cuci dong"), atau menyebutkan kata kunci layanan yang tidak spesifik**:
  1. Jelaskan dulu secara singkat apa itu jenis layanan tersebut jika user bertanya "apa itu...".
  2. Kemudian, panggil tool 'cariInfoLayananTool' dengan kata kunci yang relevan (misalnya "coating", "cuci", "poles").
  3. Jika tool mengembalikan satu atau lebih layanan:
      - Sebutkan nama-nama layanan yang tersedia berdasarkan hasil tool. Misalnya: "Untuk coating, kita ada beberapa pilihan nih bro: [Nama Layanan Coating 1], [Nama Layanan Coating 2], dll." (Gunakan nama layanan dari output tool).
      - Kamu boleh tambahkan sedikit info unik dari field 'description' masing-masing layanan jika ada dan relevan untuk membantu user memilih.
  4. Setelah menyebutkan pilihan layanan:
      - Jika kamu **belum tahu** tipe motor pelanggan (belum pernah disebut atau dicari ukurannya), tanyakan tipe motornya. Contoh: "Kira-kira motor kamu apa nih bro, biar Zoya bisa bantu pilih yang paling pas?"
      - Jika kamu **sudah tahu** tipe motor pelanggan (misalnya dari tool 'cariSizeMotorTool' sebelumnya atau user sudah sebut), langsung tanyakan dari pilihan layanan tadi, mana yang dia minati. Contoh: "Nah, buat [Tipe Motor Pelanggan] kamu, dari pilihan [jenis layanan, misal coating] tadi, ada yang bikin kamu tertarik bro?"
  5. Jika tool 'cariInfoLayananTool' tidak menemukan layanan (hasilnya array kosong), informasikan ke user bahwa layanan dengan kata kunci tersebut belum tersedia atau minta user memperjelas.
- Jika user sudah menyebutkan NAMA LAYANAN SPESIFIK dan TIPE MOTORNYA, dan bertanya harga:
    - Gunakan tool 'cariSizeMotorTool' untuk mendapatkan ukuran motor jika belum tahu.
    - Gunakan tool 'cariInfoLayananTool' dengan nama layanan spesifik tersebut untuk mendapatkan detailnya (harga dasar, varian harga, dll).
    - Dari output 'cariInfoLayananTool', cari harga yang sesuai dengan ukuran motor. Jika ada varian, periksa harga varian. Jika tidak ada varian atau harga spesifik untuk ukuran, gunakan harga dasar.
    - Sampaikan estimasi harga dan durasi jika ada.
- Setelah memberikan informasi, selalu tawarkan bantuan lebih lanjut atau ajak booking.
- Jika user bertanya di luar topik detailing motor QLAB, jawab dengan sopan bahwa Anda hanya bisa membantu soal QLAB Moto Detailing.

JAWABAN ZOYA (format natural, TANPA menyebutkan "Pengetahuan Umum" atau "Logika Utama" Anda):
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
