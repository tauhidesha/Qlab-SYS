// @file: src/ai/handlers/routes/lib/classifiers/mapTermToOfficialService.ts
// Ini adalah pengganti versi lama yang menggunakan rule-based logic.

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Inisialisasi OpenAI Client. Pastikan OPENAI_API_KEY ada di environment variables Anda.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Daftar Master Layanan Resmi.
 * Ini adalah "sumber kebenaran" satu-satunya. AI akan dipaksa untuk memilih dari daftar ini.
 * Saya menambahkan beberapa kategori khusus untuk menangani percakapan umum.
 */
const VALID_SERVICES = [
  // COATING
  'Coating Motor Glossy',
  'Coating Motor Doff',
  // COMPLETE (COATING + DETAILING)
  'Complete Service Glossy',
  'Complete Service Doff',
  // DETAILING & POLES
  'Full Detailing Glossy', // Detailing + Bongkar
  'Poles Bodi Glossy',     // Detailing bodi tanpa bongkar
  'Detailing Mesin',
  // CUCI
  'Cuci Komplit',         // Cuci + Bongkar
  'Cuci Premium',
  'Cuci Reguler',
  // REPAINT
  'Repaint Bodi Halus',
  'Repaint Bodi Kasar',
  'Repaint Velg',
  'Repaint Cover CVT / Arm',
  // KATEGORI KHUSUS
  'General Inquiry',      // Untuk sapaan, pertanyaan umum non-layanan, atau terima kasih.
  'Handover to Human',    // Jika user secara eksplisit minta bicara dengan orang/admin.
  'Clarification Needed', // Jika AI sendiri merasa sangat tidak yakin.
] as const; // `as const` membuatnya menjadi tuple readonly untuk type safety.

// Membuat tipe data dari daftar di atas
type OfficialService = typeof VALID_SERVICES[number];

// Tipe data untuk konteks percakapan sebelumnya
interface MappingContext {
  lastService?: string;
  lastIntent?: string; // bisa digabung dengan lastService
}

// Tipe data untuk hasil output fungsi ini
export interface MappedServiceResult {
  serviceNames: OfficialService[];
  isAmbiguous: boolean;
}

/**
 * Memetakan istilah/pesan dari pengguna ke layanan resmi menggunakan model AI.
 * @param message Pesan dari pelanggan.
 * @param context Konteks dari giliran percakapan sebelumnya.
 * @returns MappedServiceResult jika berhasil, atau null jika terjadi error.
 */
export async function mapTermToOfficialService(
  message: string,
  context?: MappingContext
): Promise<MappedServiceResult | null> {
    // ...

    const systemPrompt = `
    Anda adalah AI asisten penyortir untuk sebuah bengkel detailing motor. Tugas utama Anda adalah menganalisis pesan pelanggan dan memetakannya ke SATU ATAU LEBIH nama layanan resmi dari daftar yang disediakan, jika user meminta lebih dari satu layanan.

    DAFTAR LAYANAN RESMI:
    ${VALID_SERVICES.join(', ')}

    ATURAN ANDA:
    1.  JAWAB HANYA DENGAN FORMAT JSON YANG VALID. Tidak ada teks atau penjelasan lain.
    2.  Pilih SATU ATAU LEBIH 'serviceNames' (array) dari daftar resmi di atas. Jangan pernah menciptakan nama layanan sendiri.
    3.  'isAmbiguous' harus 'true' jika Anda butuh informasi lebih lanjut (misal: "mau coating" -> butuh info glossy/doff, "mau detailing" -> butuh info bongkar/tidak).
    4.  'isAmbiguous' harus 'false' jika pesannya sudah spesifik (misal: "coating glossy tanpa bongkar").
    5.  PERHATIKAN KONTEKS NEGASI! Kata seperti "nggak usah", "tanpa", "jangan" sangat penting. Contoh: "coating glossy tapi nggak usah bongkar" berarti BUKAN 'Complete Service Glossy', melainkan 'Coating Motor Glossy'.
    6.  Jika user secara eksplisit meminta bicara dengan "admin", "cs", atau "orang", gunakan 'Handover to Human'.
    7.  Jika user hanya menyapa ("halo", "pagi"), bertanya di luar layanan ("bengkelnya di mana?"), atau berterima kasih, gunakan 'General Inquiry'.

    -- ATURAN PENTING UNTUK AMBIGUITAS --
    8.  Jika pesan user ambigu karena hanya menyebut kategori (misal: "info coating", "mau tanya repaint kak") atau gabungan layanan (misal: "detailing coating"), TUGAS ANDA adalah memetakan ke layanan default yang PALING MEWAKILI, lalu set 'isAmbiguous' ke 'true'.
        - Contoh 1: Pesan "coating" -> petakan ke "Coating Motor Glossy" (default glossy), set isAmbiguous: true.
        - Contoh 2: Pesan "detailing coating" -> petakan ke ["Complete Service Glossy"], set isAmbiguous: true.
        - Contoh 3: Pesan "mau tanya repaint kak" atau "info repaint" -> petakan ke ["Repaint Bodi Halus"], set isAmbiguous: true.
        - JANGAN gunakan "Clarification Needed" kecuali pesan benar-benar tidak bisa dihubungkan ke layanan manapun (misal: "motor saya mogok").
    -- ATURAN PENTING BARU --
    9.  FOKUS PADA IDENTIFIKASI LAYANAN: Tugas utama Anda adalah memetakan NAMA LAYANAN. Jika pesan user mengandung pertanyaan tentang jadwal (contoh: "besok bisa?", "hari sabtu ready?", "bisa booking kapan?"), ABAIKAN bagian jadwal tersebut dan FOKUS HANYA pada identifikasi layanan yang diminta (misal: "detailing coating"). Penjadwalan akan diurus oleh agen selanjutnya. JANGAN memetakan ke 'Handover to Human' hanya karena ada pertanyaan jadwal.
        -- ATURAN KHUSUS CUCI --
        
    Format JSON Output yang WAJIB Anda gunakan:
    {"serviceNames": ["NAMA_LAYANAN_DARI_DAFTAR", ...], "isAmbiguous": boolean}
  `;

  // Gabungkan konteks dan pesan baru untuk AI
  let contentForAI = `Pesan terbaru dari user: "${message}"`;
  if (context?.lastService) {
    contentForAI = `Konteks layanan sebelumnya adalah "${context.lastService}".\n${contentForAI}`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: contentForAI },
      ],
      temperature: 0,
      response_format: { type: 'json_object' },
    });

    const aiReply = completion.choices[0]?.message?.content;
    if (!aiReply) {
      console.error('[AI MAPPER] Error: AI memberikan respons kosong.');
      return null;
    }

    // Parse dan Validasi output dari AI
    const parsed = JSON.parse(aiReply) as { serviceNames: string[]; isAmbiguous: boolean };

    // --- LOGGING TO FILE DISABLED FOR SERVERLESS ---
    // (No-op: logging removed for production/serverless compatibility)

    // Validasi: Pastikan semua serviceNames yang dikembalikan AI ada di daftar resmi kita.
    if (
      Array.isArray(parsed.serviceNames) &&
      parsed.serviceNames.length > 0 &&
      parsed.serviceNames.every((sn) => VALID_SERVICES.includes(sn as OfficialService))
    ) {
      console.log('[AI MAPPER] Sukses memetakan.', parsed);
      return {
        serviceNames: parsed.serviceNames as OfficialService[],
        isAmbiguous: parsed.isAmbiguous ?? false,
      };
    } else {
      console.warn('[AI MAPPER] Peringatan: AI mengembalikan serviceNames yang tidak valid:', parsed.serviceNames);
      // Jika tidak valid, anggap sebagai pertanyaan umum.
      return { serviceNames: ['General Inquiry'], isAmbiguous: false };
    }
  } catch (error) {
    console.error('[AI MAPPER] Terjadi error saat memanggil OpenAI atau parsing JSON:', error);
    return null;
  }
}