// @file: src/ai/tools/searchKnowledgeBaseTool.ts

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import type { KnowledgeBaseEntry } from '@/types/knowledgeBase';
import { embedText } from '@/ai/flows/embed-text-flow';
import { cosineSimilarity } from '@/lib/math';

// --- Input Schema (untuk AI + validasi) ---
const InputSchema = z.object({
  query: z.string().describe('Pertanyaan atau kalimat yang ingin dicari di knowledge base.'),
});
export type Input = z.infer<typeof InputSchema>;

// --- Output Type ---
type MatchedEntry = {
  answer: string;
  question: string;
  similarityScore: number;
  id: string;
};

type Output = {
  success: boolean;
  matches?: MatchedEntry[];
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

  const { query: searchQuery } = parsed.data;
  try {
    console.log('[searchKnowledgeBaseTool] Searching for:', searchQuery);
    
    // Step 1: Generate embedding for the search query
    const queryEmbedding = await embedText(searchQuery);
    console.log('[searchKnowledgeBaseTool] Generated query embedding with', queryEmbedding.length, 'dimensions');
    
    // Step 2: Query Firestore collection knowledge_base_entries
    const knowledgeBaseRef = collection(db, 'knowledge_base_entries');
    const firestoreQuery = query(
      knowledgeBaseRef,
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(100) // Increased limit for better vector search results
    );
    
    const querySnapshot = await getDocs(firestoreQuery);
    const entries: KnowledgeBaseEntry[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        id: doc.id,
        question: data.question || '',
        answer: data.answer || '',
        isActive: data.isActive,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        embedding: data.embedding
      } as KnowledgeBaseEntry);
    });

    console.log('[searchKnowledgeBaseTool] Found', entries.length, 'entries');

    if (entries.length === 0) {
      return {
        success: false,
        message: 'Tidak ditemukan data di knowledge base.',
      };
    }

    // Step 3: Calculate cosine similarity with each entry's embedding
    const entriesWithSimilarity = entries
      .filter(entry => entry.embedding && Array.isArray(entry.embedding) && entry.embedding.length > 0)
      .map(entry => {
        try {
          const similarity = cosineSimilarity(queryEmbedding, entry.embedding!);
          return {
            ...entry,
            similarityScore: similarity
          };
        } catch (error) {
          console.warn('[searchKnowledgeBaseTool] Similarity calculation failed for entry:', entry.id, error);
          return {
            ...entry,
            similarityScore: 0
          };
        }
      })
      .sort((a, b) => b.similarityScore - a.similarityScore); // Sort by similarity descending

    console.log('[searchKnowledgeBaseTool] Calculated similarities for', entriesWithSimilarity.length, 'entries');

    if (entriesWithSimilarity.length === 0) {
      return {
        success: false,
        message: 'Tidak ditemukan entri dengan embedding yang valid.',
      };
    }

    // Step 4: Return the top 3 best matches (highest similarity)
    const topMatches = entriesWithSimilarity.slice(0, 3);
    
    // Set minimum similarity threshold
    const MIN_SIMILARITY_THRESHOLD = 0.4; // Lowered threshold for better results
    
    const validMatches = topMatches.filter(match => match.similarityScore >= MIN_SIMILARITY_THRESHOLD);
    
    if (validMatches.length === 0) {
      const highestScore = topMatches[0]?.similarityScore || 0;
      return {
        success: false,
        message: `Tidak ditemukan jawaban yang cukup relevan untuk pertanyaan ini. (highest similarity: ${highestScore.toFixed(3)})`,
      };
    }

    console.log('[searchKnowledgeBaseTool] Found', validMatches.length, 'valid matches');
    validMatches.forEach((match, index) => {
      console.log(`[searchKnowledgeBaseTool] Match ${index + 1} similarity:`, match.similarityScore.toFixed(3));
    });
    
    const formattedMatches: MatchedEntry[] = validMatches.map(match => ({
      id: match.id,
      answer: match.answer,
      question: match.question,
      similarityScore: match.similarityScore,
    }));
    
    return {
      success: true,
      matches: formattedMatches,
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
      description: 'Mencari jawaban dari pertanyaan umum pelanggan berdasarkan knowledge base. Mengembalikan hingga 3 jawaban terbaik berdasarkan vector similarity.',
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
