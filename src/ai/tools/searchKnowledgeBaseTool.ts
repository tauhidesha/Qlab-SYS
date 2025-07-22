// @file: src/ai/tools/searchKnowledgeBaseTool.ts

import { z } from 'zod';
import { db } from '../../lib/firebase-admin';
import admin from 'firebase-admin';
import { embedText } from '../flows/embed-text-flow';
import { cosineSimilarity } from '../../lib/math';
// import { stemText } from '../../actions/embeddingAction'; // Removed: use dynamic import below

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
  // PATCH: Turunkan threshold agar entry mirip tetap lolos
  const MINIMUM_THRESHOLD = 0.4;

  try {
    const userEmbedding = await embedText(query);
    if (!userEmbedding) {
      return {
        success: false,
        message: 'Gagal membuat embedding untuk query.',
      };
    }

    const entriesRef = db.collection('knowledge_base_entries');
    const snapshot = await entriesRef.get();

    let bestMatch: { question: string; answer: string; score: number } | null = null;
    let highestScore = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!Array.isArray(data.embedding) || data.embedding.length === 0) return;

      const score = cosineSimilarity(userEmbedding, data.embedding);

      // --- PATCH: log stemmed versions untuk validasi ---
      // Import stemText dari embeddingAction
      let stemmedQuery = '';
      let stemmedData = '';
      try {
        // Dynamic import to avoid circular dependency
        const { stemText } = require('../lib/textUtils');
        stemmedQuery = stemText(query);
        stemmedData = stemText(data.question ?? '');
      } catch (err) {
        stemmedQuery = query;
        stemmedData = data.question;
      }

      console.log(`[searchKnowledgeBaseTool]`);
      console.log(`  Raw:     "${query}" vs "${data.question}"`);
      console.log(`  Stemmed: "${stemmedQuery}" vs "${stemmedData}"`);
      console.log(`  Score:   ${score}`);

      if (score > highestScore) {
        highestScore = score;
        bestMatch = {
          question: data.question,
          answer: data.answer,
          score,
        };
      }
    });

    console.log('[searchKnowledgeBaseTool] Best match:', bestMatch, 'Highest score:', highestScore);

    if (bestMatch && highestScore >= MINIMUM_THRESHOLD) {
      const match = bestMatch as { question: string; answer: string; score: number };
      return {
        success: true,
        question: match.question,
        answer: match.answer,
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
