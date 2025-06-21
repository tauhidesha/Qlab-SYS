
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
  id: string; // Add ID for deduplication
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
      const embedResult = await ai.embed({
        model: 'googleai/text-embedding-004',
        content: input.query,
        config: {
            safetySettings: [
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            ]
        }
      });

      // Safety check for null/undefined result before destructuring
      if (!embedResult || !embedResult.embedding) {
        console.error("[knowledgeBaseRetrieverTool] ai.embed() returned a nullish or incomplete value.");
        throw new Error("AI service returned an invalid embedding response.");
      }
      const { embedding: queryEmbedding } = embedResult;

      // 2. Fetch all active KB entries and all services in parallel
      const kbCollectionRef = collection(db, 'knowledge_base_entries');
      const servicesCollectionRef = collection(db, 'services');
      
      const kbQuery = query(kbCollectionRef, where('isActive', '==', true));
      const servicesQuery = query(servicesCollectionRef);

      const [kbSnapshot, servicesSnapshot] = await Promise.all([
        getDocs(kbQuery),
        getDocs(servicesQuery),
      ]);
      
      // 3. Score Knowledge Base entries based on vector similarity
      const scoredKbEntries: ScoredEntry[] = kbSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as KnowledgeBaseEntry))
        .filter(entry => entry.embedding && Array.isArray(entry.embedding) && entry.embedding.length > 0)
        .map(entry => ({
          id: entry.id,
          topic: entry.topic,
          content: entry.content,
          source: 'knowledge-base',
          score: cosineSimilarity(queryEmbedding, entry.embedding!),
        }));

      // 4. Score Service/Product entries based on vector similarity
      const scoredServiceEntries: ScoredEntry[] = servicesSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct & { embedding?: number[] }))
        .filter(service => service.embedding && Array.isArray(service.embedding) && service.embedding.length > 0)
        .map(service => ({
          id: service.id,
          topic: service.name,
          content: service.description || 'Tidak ada deskripsi detail.',
          source: 'service-product',
          score: cosineSimilarity(queryEmbedding, service.embedding!),
        }));

      // 5. [FALLBACK] Perform a simple text search on services for items that might not have embeddings
      const searchTermLower = input.query.toLowerCase();
      const fallbackServiceEntries: ScoredEntry[] = servicesSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct))
        .filter(service => 
            service.name.toLowerCase().includes(searchTermLower) || 
            (service.description && service.description.toLowerCase().includes(searchTermLower))
        )
        .map(service => ({
            id: service.id,
            topic: service.name,
            content: service.description || 'Tidak ada deskripsi detail.',
            source: 'service-product',
            score: 0.5, // Assign a medium-low score to fallback results to prioritize vector matches
        }));
      
      // 6. Combine all results, deduplicate, sort, filter, and take the top N
      const allEntries = [...scoredKbEntries, ...scoredServiceEntries, ...fallbackServiceEntries];
      
      const uniqueEntries = Array.from(new Map(allEntries.map(entry => [entry.id, entry])).values());
      
      const topN = 5;
      const similarityThreshold = 0.60; // Slightly lower threshold to be more inclusive
      
      const relevantEntries = uniqueEntries
        .filter(entry => entry.score >= similarityThreshold)
        .sort((a, b) => b.score - a.score)
        .slice(0, topN);

      console.log(`[knowledgeBaseRetrieverTool] Found ${relevantEntries.length} relevant entries after combining and filtering.`);
      
      // 7. Format the output (remove score and id)
      return relevantEntries.map(({ topic, content, source }) => ({
        topic,
        content,
        source,
      }));

    } catch (error) {
      console.error('[knowledgeBaseRetrieverTool] Error during retrieval:', error);
      return [];
    }
  }
);
