
'use server';
/**
 * @fileOverview Genkit tool to retrieve relevant knowledge base entries and services using vector similarity and text fallback.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, or } from 'firebase/firestore';
import type { KnowledgeBaseEntry } from '@/types/knowledgeBase';
import type { ServiceProduct } from '@/app/(app)/services/page';
import { embedText } from '@/ai/flows/embed-text-flow';

const KnowledgeBaseRetrieverInputSchema = z.object({
  query: z.string().describe('The user question to find relevant knowledge for.'),
});

const KnowledgeBaseRetrieverOutputSchema = z.array(
  z.object({
    topic: z.string().describe("The topic of the knowledge base entry or service name."),
    content: z.string().describe("The content of the knowledge base entry or service description."),
    source: z.enum(['knowledge-base', 'service-product']).describe("The source of the information."),
  })
).describe("A list of relevant entries from the knowledge base and service catalog, or an empty list if none are found.");

interface ScoredEntry {
  id: string;
  topic: string;
  content: string;
  source: 'knowledge-base' | 'service-product';
  score: number;
}

/**
 * Calculates the cosine similarity between two vectors.
 * @param vecA The first vector.
 * @param vecB The second vector.
 * @returns The cosine similarity score (0 to 1).
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length || vecA.length === 0) {
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
    const allEntries: ScoredEntry[] = [];
    const SIMILARITY_THRESHOLD = 0.7; // Tweak this threshold as needed

    try {
      // 1. Generate embedding for the user's query
      const queryEmbedding = await embedText(input.query);

      // 2. Fetch all documents from both collections
      const kbCollectionRef = collection(db, 'knowledge_base_entries');
      const servicesCollectionRef = collection(db, 'services');
      const kbQuery = query(kbCollectionRef, where('isActive', '==', true));
      
      const [kbSnapshot, servicesSnapshot] = await Promise.all([
        getDocs(kbQuery),
        getDocs(servicesCollectionRef),
      ]);
      
      // 3. Perform hybrid search (Vector + Text)
      const searchTermLower = input.query.toLowerCase();

      // Process Knowledge Base Entries
      kbSnapshot.docs.forEach(doc => {
        const entry = { id: doc.id, ...doc.data() } as KnowledgeBaseEntry;
        let score = 0;
        
        // Vector search
        if (queryEmbedding.length > 0 && entry.embedding && entry.embedding.length > 0) {
          score = cosineSimilarity(queryEmbedding, entry.embedding);
        }
        
        // Text fallback/boost
        const questionMatch = entry.question?.toLowerCase().includes(searchTermLower);
        const answerMatch = entry.answer?.toLowerCase().includes(searchTermLower);
        if (questionMatch) score += 0.2; // Boost score for direct keyword match
        if (answerMatch) score += 0.1;

        if (score >= SIMILARITY_THRESHOLD) {
          allEntries.push({
            id: entry.id,
            topic: entry.question || 'Tanpa Topik',
            content: entry.answer || 'Tidak ada konten.',
            source: 'knowledge-base',
            score: Math.min(score, 1.0), // Cap score at 1.0
          });
        }
      });

      // Process Service/Product Entries
      servicesSnapshot.docs.forEach(doc => {
        const service = { id: doc.id, ...doc.data() } as ServiceProduct;
        let score = 0;

        // Vector search
        if (queryEmbedding.length > 0 && (service as any).embedding && (service as any).embedding.length > 0) {
            score = cosineSimilarity(queryEmbedding, (service as any).embedding);
        }
        
        // Text fallback/boost
        const nameMatch = service.name?.toLowerCase().includes(searchTermLower);
        const descriptionMatch = service.description?.toLowerCase().includes(searchTermLower);
        if (nameMatch) score += 0.2;
        if (descriptionMatch) score += 0.1;

        if (score >= SIMILARITY_THRESHOLD) {
          allEntries.push({
            id: service.id,
            topic: service.name || 'Tanpa Nama',
            content: service.description || 'Tidak ada deskripsi detail.',
            source: 'service-product',
            score: Math.min(score, 1.0),
          });
        }
      });

      // 4. Deduplicate, sort, and get top results
      const uniqueEntries = Array.from(new Map(allEntries.map(entry => [entry.id, entry])).values());
      const topN = 5;
      const relevantEntries = uniqueEntries
        .sort((a, b) => b.score - a.score)
        .slice(0, topN);

      console.log(`[knowledgeBaseRetrieverTool] Returning ${relevantEntries.length} unique, sorted entries from hybrid search.`);
      
      return relevantEntries.map(({ topic, content, source }) => ({
        topic,
        content,
        source,
      }));

    } catch (error) {
      console.error('[knowledgeBaseRetrieverTool] Critical error during hybrid retrieval:', error);
      return []; // Return empty on error
    }
  }
);
