import levenshtein from 'js-levenshtein';
import { normalizeToolInput } from '../utils/normalizeToolInput';
import { prisma } from '@/lib/prisma';

const SIMILARITY_THRESHOLD = 0.75;

function getSimilarity(a: string, b: string): number {
  const dist = levenshtein(a.toLowerCase(), b.toLowerCase());
  const maxLen = Math.max(a.length, b.length);
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
  const daftarUkuranMotor = await prisma.vehicleModel.findMany();

  if (!daftarUkuranMotor || daftarUkuranMotor.length === 0) {
    return {
      success: false,
      message: 'Kesalahan internal: Database ukuran motor tidak dapat diakses.',
    };
  }

  let motor_query = normalizeToolInput(input, 'motor_query')?.trim().toLowerCase();
  if (!motor_query) {
    return {
      success: false,
      message: 'motor_query tidak valid atau kosong.',
    };
  }
  
  motor_query = motor_query
    .replace(/\s*\d{4,5}\b.*$/, '')
    .replace(/\s+abs\b.*$/, '')
    .replace(/\s+(prestige|sporty|stylish|deluxe|premium|grande|fi|esp|cw|pgm-fi|injection)\b.*$/i, '')
    .replace(/\s+(125|150|160|250|300)\b.*$/i, '')
    .trim();
    
  if (motor_query.split(' ').length > 2) {
    motor_query = motor_query.split(' ').slice(0, 2).join(' ');
  }

  let bestMatch: typeof daftarUkuranMotor[number] | null = null;
  let bestScore = 0;

  for (const entry of daftarUkuranMotor) {
    const model = entry.modelName?.toLowerCase() || '';
    const aliases = (entry.aliases || []).map((a) => a.toLowerCase());
    const candidates = [model, ...aliases];

    for (const candidate of candidates) {
      let score = getSimilarity(motor_query, candidate);
      
      if (motor_query.includes(candidate) || candidate.includes(motor_query)) {
        score = Math.max(score, 0.85);
      }
      
      if (motor_query === 'scoopy' && candidate.includes('scoopy')) {
        score = Math.max(score, 0.95);
      }
      
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
    motor_size: bestMatch.serviceSize,
    repaint_size: bestMatch.repaintSize,
    matched_model: bestMatch.modelName,
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