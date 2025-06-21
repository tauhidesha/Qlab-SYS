
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
import { embedText } from '@/ai/flows/embed-text-flow'; // Import the (now bypassed) embedText function

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
    console.warn("[knowledgeBaseRetrieverTool] RUNNING IN TEXT-ONLY FALLBACK MODE (Vector search disabled for debugging).");

    try {
      // --- VECTOR SEARCH IS TEMPORARILY DISABLED TO BYPASS API ISSUES ---
      // The original code would generate an embedding for the query here.
      // We are skipping directly to fetching and text-searching all documents.

      const kbCollectionRef = collection(db, 'knowledge_base_entries');
      const servicesCollectionRef = collection(db, 'services');
      
      const kbQuery = query(kbCollectionRef, where('isActive', '==', true));
      const servicesQuery = query(servicesCollectionRef);

      const [kbSnapshot, servicesSnapshot] = await Promise.all([
        getDocs(kbQuery),
        getDocs(servicesQuery),
      ]);
      
      const searchTermLower = input.query.toLowerCase();

      // Perform a simple text search on Knowledge Base with added safety checks
      const fallbackKbEntries: ScoredEntry[] = kbSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as KnowledgeBaseEntry))
        .filter(entry => 
            (entry.topic && entry.topic.toLowerCase().includes(searchTermLower)) ||
            (entry.content && entry.content.toLowerCase().includes(searchTermLower)) ||
            (entry.keywords && Array.isArray(entry.keywords) && entry.keywords.some(kw => kw && kw.toLowerCase().includes(searchTermLower)))
        )
        .map(entry => ({
            id: entry.id,
            topic: entry.topic,
            content: entry.content,
            source: 'knowledge-base',
            score: 0.7, // Assign a decent score
        }));

      // Perform a simple text search on services with added safety checks
      const fallbackServiceEntries: ScoredEntry[] = servicesSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct))
        .filter(service => 
            (service.name && service.name.toLowerCase().includes(searchTermLower)) || 
            (service.description && service.description.toLowerCase().includes(searchTermLower))
        )
        .map(service => ({
            id: service.id,
            topic: service.name,
            content: service.description || 'Tidak ada deskripsi detail.',
            source: 'service-product',
            score: 0.7, // Assign a decent score
        }));
      
      // Combine all results, deduplicate, sort, and take the top N
      const allEntries = [...fallbackKbEntries, ...fallbackServiceEntries];
      
      const uniqueEntries = Array.from(new Map(allEntries.map(entry => [entry.id, entry])).values());
      
      const topN = 5;
      
      const relevantEntries = uniqueEntries
        .sort((a, b) => b.score - a.score) // Sort to be safe, though scores are same
        .slice(0, topN);

      console.log(`[knowledgeBaseRetrieverTool] Found ${relevantEntries.length} relevant entries via TEXT SEARCH.`);
      
      return relevantEntries.map(({ topic, content, source }) => ({
        topic,
        content,
        source,
      }));

    } catch (error) {
      console.error('[knowledgeBaseRetrieverTool] Error during TEXT-ONLY retrieval:', error);
      return [];
    }
  }
);
