// @file: src/ai/tools/getMotorSizeDetailsTool.ts

// 💡 PERHATIAN: Pastikan path ini benar-benar valid saat aplikasi di-build/dijalankan di server.
// Masalah 'kesalahan teknis' seringkali berasal dari path file yang salah setelah kompilasi.
import daftarUkuranMotor from '@/data/daftarUkuranMotor';
import levenshtein from 'js-levenshtein';

const SIMILARITY_THRESHOLD = 0.75;

function getSimilarity(a: string, b: string): number {
  const dist = levenshtein(a.toLowerCase(), b.toLowerCase());
  const maxLen = Math.max(a.length, b.length);
  // Hindari pembagian dengan nol jika string kosong
  if (maxLen === 0) return 1;
  return 1 - dist / maxLen;
}

type Input = {
  motor_query: string;
};

type Output =
  | {
      success: true;
      motor_query: string;
      motor_size: string;
      repaint_size: string;
      matched_model: string;
      similarity: number;
    }
  | {
      success: false;
      message: string;
      similarity?: number;
    };

async function implementation(input: Input): Promise<Output> {
  // Tidak perlu baca file, motorDb sudah di-import langsung
  if (!daftarUkuranMotor || !Array.isArray(daftarUkuranMotor)) {
    console.error('[getMotorSizeDetailsTool] KRITIS: Gagal memuat database motor dari file TypeScript.');
    return {
      success: false,
      message: 'Kesalahan internal: Database ukuran motor tidak dapat diakses.',
    };
  }

  const motor_query = input.motor_query?.trim().toLowerCase();
  if (!motor_query) {
    return {
      success: false,
      message: 'motor_query tidak valid atau kosong.',
    };
  }

  let bestMatch = null;
  let bestScore = 0;

  // Debug log: tampilkan similarity setiap kandidat
  for (const entry of daftarUkuranMotor) {
    const model = entry.model?.toLowerCase() || '';
    const aliases = (entry.aliases || []).map((a) => a.toLowerCase());
    const candidates = [model, ...aliases];

    for (const candidate of candidates) {
      const score = getSimilarity(motor_query, candidate);
      console.log(`[getMotorSizeDetailsTool][DEBUG] Cek kandidat: "${candidate}" vs "${motor_query}" => similarity: ${score}`);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }
  }

  if (!bestMatch || bestScore < SIMILARITY_THRESHOLD) {
    return {
      success: false,
      message: `Motor "${motor_query}" tidak dikenali dalam database ukuran.`,
      similarity: bestScore,
    };
  }

  return {
    success: true,
    motor_query,
    motor_size: bestMatch.motor_db_size,
    repaint_size: bestMatch.repaint_size,
    matched_model: bestMatch.model,
    similarity: bestScore,
  };
}

export const getMotorSizeDetailsTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'getMotorSizeDetails',
      description: 'Mendeteksi ukuran motor berdasarkan nama/jenis motor yang disebut user.',
      parameters: {
        type: 'object',
        properties: {
          motor_query: {
            type: 'string',
            description: 'Nama motor dari user, misalnya "vario", "nmax", "vespa", dll.',
          },
        },
        required: ['motor_query'],
      },
    },
  },
  implementation,
};