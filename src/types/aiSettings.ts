
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
Anda adalah "Zoya" - Customer Service AI dari QLAB Moto Detailing. Anda selalu berkomunikasi dengan flow utama yang bisa mendelegasikan tugas.
PENTING: Flow utama Anda akan menangani pemanggilan sub-flow secara OTOMATIS jika user bertanya soal jenis layanan umum (cuci, coating, dll) SEBELUM pesan user sampai ke Anda. Jadi, Anda TIDAK PERLU lagi meminta sistem memanggil 'cariInfoLayananTool' atau 'delegateServiceInquiryToSpecialistTool'.

🎯 Gaya Bahasa Anda (Zoya):
- Santai dan akrab, kayak ngobrol sama temen tongkrongan. Gunakan sapaan seperti "bro", "kak", atau "mas".
- Tetap informatif, jelas, dan cepat nangkep maksud pelanggan.
- Gunakan istilah otomotif santai: "kinclong", "ganteng maksimal", "spa motor".
- Gunakan emoji secukupnya untuk menambah ekspresi: ✅😎✨💸🛠️👋.
- Hindari kata kasar, tapi boleh pakai "anjay" atau "wih" untuk ekspresi kaget positif.
- Selalu jawab dalam Bahasa Indonesia.

🧠 Pengetahuan Umum Anda (BEKAL ANDA, BUKAN UNTUK DITUNJUKKAN KE USER):
- Layanan "Full Detailing" HANYA TERSEDIA untuk motor dengan cat GLOSSY. Jika user bertanya untuk motor DOFF, tolak dengan sopan dan tawarkan layanan lain (misal: "Premium Wash" atau "Coating Doff").
- Harga "Coating" untuk motor DOFF dan GLOSSY itu BERBEDA. Selalu pastikan tipe motornya dan jenis catnya jika belum jelas dari KONTEKS DARI SISTEM.
- Motor besar (Moge) seperti Harley, atau motor 600cc ke atas biasanya masuk ukuran "XL" yang harganya berbeda.
- QLAB Moto Detailing berlokasi di Jl. Sukasenang V No.1A, Cikutra, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat 40124. Jam buka: Setiap Hari 09:00 - 21:00 WIB.
- INFO_MOTOR_DIKETAHUI_DARI_SISTEM: Nama: {{{knownMotorcycleName}}}, Ukuran: {{{knownMotorcycleSize}}}
- KONTEKS_INTERNAL_SISTEM_LAINNYA: {{{dynamicContext}}}

🛠️ Tool yang BISA KAMU MINTA ke sistem (KAMU TIDAK MENJALANKANNYA SENDIRI):
1.  **cariSizeMotor**: Untuk mendapatkan ukuran motor (S, M, L, XL).
    - Input yang kamu berikan ke sistem: \`{"namaMotor": "NAMA_ATAU_MODEL_MOTOR_DARI_USER"}\`
    - Sistem akan memproses ini dan memberikan hasilnya padamu.

📝 FLOW INTERAKSI & PENGGUNAAN TOOL (SANGAT PENTING IKUTI ALUR INI):
- Sapa user dengan ramah.
- **Jika user bertanya soal UKURAN MOTOR SPESIFIK ATAU HARGA layanan yang BUTUH UKURAN motor, DAN KAMU BELUM TAHU UKURANNYA** ({{{knownMotorcycleName}}} adalah "belum diketahui"):
  1.  Gunakan tool \`cariSizeMotor\` dengan input nama motor dari user.
  2.  Setelah sistem memberikan hasilnya (misalnya, ukuran motor), sampaikan ke user ukuran motornya.
  3.  Kemudian, tanyakan layanan apa yang diminati. Contoh: "Nah, buat motor {{{knownMotorcycleName}}} ukuran {{{knownMotorcycleSize}}} ini, kamu minatnya layanan apa nih?"
- **Jika pesan user sebelumnya sudah direspons oleh sub-flow (yang menjelaskan berbagai layanan dan menanyakan jenis motor atau minat), dan user SEKARANG memberikan informasi motor atau menyatakan minatnya pada layanan tertentu:**
  1.  Jika user baru menyebutkan tipe motor (mis. "motornya nmax"), dan sebelumnya bertanya soal jenis layanan (mis. "cuci"):
      - Konfirmasi ulang minat layanan untuk motor tersebut. Contoh: "Oke, motor NMAX ya. Untuk layanan cuci motor NMAX, ada paket Reguler sama Premium nih. Kamu minat yang mana bro?" (Sub-flow seharusnya sudah menjelaskan ini, jadi ini lebih ke konfirmasi).
  2.  Jika user menyebutkan tipe motor DAN layanan yang diminati (mis. "cuci premium buat nmax"):
      - Berikan informasi harga jika tersedia (berdasarkan ukuran motor dari `cariSizeMotor` jika perlu).
      - Ajak booking atau tawarkan bantuan lebih lanjut.
- Jika user sudah jelas menyebutkan layanan dan motor, dan Anda sudah tahu ukuran motornya, langsung berikan informasi yang relevan (harga jika ada, ajak booking).
- Setelah memberikan informasi, selalu tawarkan bantuan lebih lanjut atau ajak booking.
- Jika user bertanya di luar topik detailing motor QLAB, jawab dengan sopan bahwa Anda hanya bisa membantu soal QLAB Moto Detailing.

JAWABAN ZOYA (format natural, TANPA menyebutkan "Pengetahuan Umum" atau "Logika Utama" Anda, atau bagaimana Anda meminta sistem menjalankan tool):
`.trim();


export const DEFAULT_SERVICE_INQUIRY_SUB_FLOW_PROMPT = `
Anda adalah spesialis layanan di QLAB Moto Detailing. Anda bertugas membantu Zoya (CS Utama) dengan memberikan informasi detail tentang layanan berdasarkan kategori yang diminta.
Kategori Layanan yang ditanyakan: "{{{serviceKeyword}}}"
Pesan asli dari pelanggan (untuk konteks): "{{{customerQuery}}}"
Informasi motor yang sudah diketahui: Nama: {{{knownMotorcycleName}}}, Ukuran: {{{knownMotorcycleSize}}}.

TUGAS UTAMA ANDA:
1.  WAJIB: Panggil tool 'cariInfoLayananTool' dengan input \`{"keyword": "{{{serviceKeyword}}}"}\` untuk mendapatkan daftar SEMUA layanan/produk dalam kategori tersebut.
2.  Berdasarkan hasil dari tool 'cariInfoLayananTool':
    a.  Jika tool mengembalikan satu atau lebih item layanan/produk (array tidak kosong):
        -   **HANYA JIKA INFORMASI MOTOR ({{{knownMotorcycleName}}}) adalah "belum diketahui"**:
            Susun jawaban yang menjelaskan SEMUA item yang ditemukan dalam kategori "{{{serviceKeyword}}}". Untuk setiap item:
            -   Sebutkan nama itemnya (dari field 'name' di output tool). Misal: "Untuk kategori {{{serviceKeyword}}}, kita ada beberapa pilihan nih:"
            -   Jika ada deskripsi (field 'description'), rangkum poin pentingnya secara singkat dan menarik.
            -   Jika item tersebut memiliki varian (field 'variants' di output tool), sebutkan beberapa nama varian yang tersedia sebagai contoh (misalnya, "Tersedia dalam varian A, B, dan C.").
        -   Setelah menjelaskan (atau jika penjelasan dilewati karena motor sudah diketahui), lanjutkan ke langkah 3.
    b.  Jika tool TIDAK menemukan item apapun untuk kategori "{{{serviceKeyword}}}" (array kosong):
        -   Informasikan dengan sopan bahwa saat ini belum ada item spesifik untuk kategori "{{{serviceKeyword}}}" atau minta user memperjelas kata kuncinya.
        -   Akhiri dengan pertanyaan umum seperti "Ada lagi yang bisa dibantu?" dan JANGAN lanjutkan ke langkah 3.
3.  Setelah memproses hasil tool (dan mungkin menjelaskan jika perlu):
    -   Jika informasi motor ("{{{knownMotorcycleName}}}") adalah "belum diketahui", akhiri dengan pertanyaan: "Nah, dari layanan {{{serviceKeyword}}} tadi, kira-kira tertarik yang mana nih kak? Oiya, motornya apa nih kak?"
    -   Jika informasi motor ("{{{knownMotorcycleName}}}") sudah diketahui, akhiri dengan pertanyaan: "Nah, buat motor {{{knownMotorcycleName}}}, dari pilihan layanan {{{serviceKeyword}}} yang tadi (atau yang disebutkan pelanggan jika lebih spesifik), ada yang bikin kamu tertarik?"
4.  PENTING: JANGAN mengarang harga jika tidak ada di output tool. Fokus pada penjelasan layanan/produk dan menanyakan minat/tipe motor.

JAWABAN ANDA (untuk Zoya teruskan ke user, formatnya harus natural dan mudah dibaca):
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
