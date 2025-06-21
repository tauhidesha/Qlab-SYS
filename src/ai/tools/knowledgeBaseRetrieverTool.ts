
'use server';
/**
 * @fileOverview Genkit tool to retrieve relevant knowledge base entries using vector similarity.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { embed } from 'genkit/ai';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { KnowledgeBaseEntry } from '@/types/knowledgeBase';

const KnowledgeBaseRetrieverInputSchema = z.object({
  query: z.string().describe('The user question to find relevant knowledge for.'),
});

const KnowledgeBaseRetrieverOutputSchema = z.array(
  z.object({
    topic: z.string().describe("The topic of the knowledge base entry."),
    content: z.string().describe("The content of the knowledge base entry."),
    // score: z.number().optional().describe("Similarity score."), // Optional for debugging
  })
).describe("A list of relevant knowledge base entries, or an empty list if none are found.");

/**
 * Calculates the cosine similarity between two vectors.
 * @param vecA The first vector.
 * @param vecB The second vector.
 * @returns The cosine similarity score (0 to 1).
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) {
    return 0;
  }
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  return dotProduct / (magnitudeA * magnitudeB);
}

export const knowledgeBaseRetrieverTool = ai.defineTool(
  {
    name: 'knowledgeBaseRetrieverTool',
    description: 'Searches the internal knowledge base for information relevant to a user\'s query. Use this first to get context before answering questions about pricing, policies, or general information.',
    inputSchema: KnowledgeBaseRetrieverInputSchema,
    outputSchema: KnowledgeBaseRetrieverOutputSchema,
  },
  async (input) => {
    console.log(`[knowledgeBaseRetrieverTool] Received query: "${input.query}"`);
    try {
      // 1. Generate an embedding for the user's query
      const { embedding: queryEmbedding } = await embed({
        model: 'googleai/text-embedding-004',
        content: input.query,
      });

      // 2. Fetch all active knowledge base entries from Firestore
      const kbCollectionRef = collection(db, 'knowledge_base_entries');
      const q = query(kbCollectionRef, where('isActive', '==', true));
      const snapshot = await getDocs(q);
      
      const entriesWithEmbeddings = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as KnowledgeBaseEntry))
        .filter(entry => entry.embedding && Array.isArray(entry.embedding) && entry.embedding.length > 0);

      if (entriesWithEmbeddings.length === 0) {
        console.log('[knowledgeBaseRetrieverTool] No active KB entries with embeddings found.');
        return [];
      }
      
      // 3. Calculate cosine similarity for each entry
      const scoredEntries = entriesWithEmbeddings.map(entry => {
        const score = cosineSimilarity(queryEmbedding, entry.embedding!);
        return { ...entry, score };
      });

      // 4. Sort by similarity score and take the top N results
      const topN = 3;
      const similarityThreshold = 0.7; // Only return results with a decent score
      const relevantEntries = scoredEntries
        .sort((a, b) => b.score - a.score)
        .filter(entry => entry.score > similarityThreshold)
        .slice(0, topN);

      console.log(`[knowledgeBaseRetrieverTool] Found ${relevantEntries.length} relevant entries.`);
      
      // 5. Format the output
      return relevantEntries.map(entry => ({
        topic: entry.topic,
        content: entry.content,
        // score: entry.score, // Uncomment for debugging if needed
      }));

    } catch (error) {
      console.error('[knowledgeBaseRetrieverTool] Error during retrieval:', error);
      // Return an empty array in case of an error to prevent the flow from breaking
      return [];
    }
  }
);
