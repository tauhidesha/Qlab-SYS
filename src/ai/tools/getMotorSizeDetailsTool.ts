// @file: src/ai/tools/getMotorSizeDetailsTool.ts

import motorDb from '../../../docs/daftarUkuranMotor.json';
import levenshtein from 'js-levenshtein';

const SIMILARITY_THRESHOLD = 0.75;

function getSimilarity(a: string, b: string): number {
  const dist = levenshtein(a.toLowerCase(), b.toLowerCase());
  const maxLen = Math.max(a.length, b.length);
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
  const motor_query = input.motor_query?.trim().toLowerCase();
  if (!motor_query) {
    return {
      success: false,
      message: 'motor_query tidak valid atau kosong.',
    };
  }

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of motorDb) {
    const model = entry.model?.toLowerCase() || '';
    const aliases = (entry.aliases || []).map((a) => a.toLowerCase());
    const candidates = [model, ...aliases];

    for (const candidate of candidates) {
      const score = getSimilarity(motor_query, candidate);
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
