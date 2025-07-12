// src/ai/tools/getMotorSizeDetailsTool.ts

import { defineTool } from '../types';
import allMotorData from '../../../docs/motor_db_size.json';
import { distance } from 'fastest-levenshtein';

const SIMILARITY_THRESHOLD = 0.75; // semakin tinggi semakin ketat

function getSimilarity(a: string, b: string): number {
  const dist = distance(a.toLowerCase(), b.toLowerCase());
  const maxLen = Math.max(a.length, b.length);
  return 1 - dist / maxLen;
}

export const getMotorSizeDetailsTool = defineTool({
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
  execute: async ({ motor_query }) => {
    const query = motor_query.trim().toLowerCase();

    let bestMatch = null;
    let bestScore = 0;

    for (const entry of motorDb) {
      const model = entry.model?.toLowerCase() || '';
      const aliases = (entry.aliases || []).map((a) => a.toLowerCase());

      const candidates = [model, ...aliases];

      for (const candidate of candidates) {
        const score = getSimilarity(query, candidate);
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
  },
});