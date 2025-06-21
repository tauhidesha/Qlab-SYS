
'use server';
/**
 * @fileOverview Genkit tool to retrieve relevant knowledge base entries and services using vector similarity.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { embed } from 'genkit';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { KnowledgeBaseEntry } from '@/types/knowledgeBase';
import type { ServiceProduct } from '@/app/(app)/services/page';

const KnowledgeBaseRetrieverInputSchema = z.object({
  query: z.string().describe('The user question to find relevant knowledge for.'),
});

const KnowledgeBaseRetrieverOutputSchema = z.array(
  z.object({
    topic: z.string().describe("The topic of the knowledge base entry or service name."),
    content: z.string().describe("The content of the knowledge base entry or service description."),
  })
).describe("A list of relevant entries from the knowledge base and service catalog, or an empty list if none are found.");

interface ScoredEntry {
  topic: string;
  content: string;
  score: number;
}

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
    description: "Searches the internal knowledge base AND the service/product catalog for information relevant to a user's query. Use this first to get context before answering questions about policies, general information, or to find suitable services based on a user's problem description.",
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

      // 2. Fetch all active KB entries and all services in parallel
      const kbCollectionRef = collection(db, 'knowledge_base_entries');
      const servicesCollectionRef = collection(db, 'services');
      
      const kbQuery = query(kbCollectionRef, where('isActive', '==', true));
      const servicesQuery = query(servicesCollectionRef);

      const [kbSnapshot, servicesSnapshot] = await Promise.all([
        getDocs(kbQuery),
        getDocs(servicesQuery),
      ]);
      
      // 3. Score Knowledge Base entries
      const scoredKbEntries: ScoredEntry[] = kbSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as KnowledgeBaseEntry))
        .filter(entry => entry.embedding && Array.isArray(entry.embedding) && entry.embedding.length > 0)
        .map(entry => ({
          topic: entry.topic,
          content: entry.content,
          score: cosineSimilarity(queryEmbedding, entry.embedding!),
        }));

      // 4. Score Service/Product entries
      const scoredServiceEntries: ScoredEntry[] = servicesSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct & { embedding?: number[] }))
        .filter(service => service.embedding && Array.isArray(service.embedding) && service.embedding.length > 0)
        .map(service => ({
          topic: service.name,
          content: service.description || 'Tidak ada deskripsi detail.',
          score: cosineSimilarity(queryEmbedding, service.embedding!),
        }));

      // 5. Combine, sort, filter, and take the top N results
      const allScoredEntries = [...scoredKbEntries, ...scoredServiceEntries];
      const topN = 5;
      const similarityThreshold = 0.65; // Adjusted threshold
      
      const relevantEntries = allScoredEntries
        .sort((a, b) => b.score - a.score)
        .filter(entry => entry.score > similarityThreshold)
        .slice(0, topN);

      console.log(`[knowledgeBaseRetrieverTool] Found ${relevantEntries.length} relevant entries from KB and Services.`);
      
      // 6. Format the output (remove score)
      return relevantEntries.map(({ topic, content }) => ({
        topic,
        content,
      }));

    } catch (error) {
      console.error('[knowledgeBaseRetrieverTool] Error during retrieval:', error);
      return [];
    }
  }
);
