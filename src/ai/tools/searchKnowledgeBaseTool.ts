// @file: src/ai/tools/searchKnowledgeBaseTool.ts

import { z } from 'zod';
import { searchKnowledgeBase as ragSearchKnowledgeBase } from '@/ai/utils/rag';

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
  try {
    const context = await ragSearchKnowledgeBase(query);
    if (context && !context.startsWith('Zoya tidak menemukan informasi')) {
      return {
        success: true,
        answer: context,
        question: query,
        similarityScore: 1, // Not available from RAG util, so set to 1 for now
      };
    } else {
      return {
        success: false,
        message: 'Tidak ditemukan jawaban yang cocok untuk pertanyaan ini.',
      };
    }
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
