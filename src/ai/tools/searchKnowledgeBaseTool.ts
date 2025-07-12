// @file: src/ai/tools/searchKnowledgeBaseTool.ts

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { embedText } from '@/ai/flows/embed-text-flow';
import { cosineSimilarity } from '@/lib/math';

// --- Input Schema (untuk AI + validasi) ---
const InputSchema = z.object({
  query: z.string().describe('Pertanyaan atau kalimat yang ingin dicari di knowledge base.'),
});
export type Input = z.infer<typeof InputSchema>;

// --- Output Type ---
type Output = {
  success: boolean;
  answer?: string;
  question?: string;
  similarityScore?: number;
  message?: string;
};

// --- Implementation ---
async function implementation(rawInput: any): Promise<Output> {
  const parsed = InputSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues.map((i) => i.message).join(', '),
    };
  }

  const { query } = parsed.data;
  const MINIMUM_THRESHOLD = 0.82;

  try {
    const userEmbedding = await embedText(query);
    if (!userEmbedding) {
      return {
        success: false,
        message: 'Gagal membuat embedding untuk query.',
      };
    }

    const entriesRef = collection(db, 'knowledge_base_entries');
    const snapshot = await getDocs(entriesRef);

    let bestMatch = null;
    let highestScore = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!Array.isArray(data.embedding) || data.embedding.length === 0) return;

      const score = cosineSimilarity(userEmbedding, data.embedding);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = {
          question: data.question,
          answer: data.answer,
          score,
        };
      }
    });

    if (bestMatch && highestScore >= MINIMUM_THRESHOLD) {
      return {
        success: true,
        question: bestMatch.question,
        answer: bestMatch.answer,
        similarityScore: highestScore,
      };
    }

    return {
      success: false,
      message: `Tidak ditemukan jawaban yang cocok untuk pertanyaan ini.`,
    };

  } catch (err: any) {
    console.error('[searchKnowledgeBaseTool] Error:', err);
    return {
      success: false,
      message: `Terjadi error saat mencari jawaban: ${err.message}`,
    };
  }
}

// --- Export untuk AI Agent ---
export const searchKnowledgeBaseTool = {
  toolDefinition: {
    type: 'function' as const,
    function: {
      name: 'searchKnowledgeBase',
      description: 'Mencari jawaban dari pertanyaan umum pelanggan berdasarkan knowledge base.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Pertanyaan dari pelanggan, seperti "garansi coating berapa lama?"',
          },
        },
        required: ['query'],
      },
    },
  },
  implementation,
};
