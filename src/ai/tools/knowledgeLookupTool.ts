
'use server';
/**
 * @fileOverview Genkit tool for retrieving specific knowledge base information
 * from Firestore. This acts as a dynamic RAG retriever.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { collection, getDocs, query as firestoreQuery, orderBy } from 'firebase/firestore'; // Renamed query to firestoreQuery to avoid conflict
import { db } from '@/lib/firebase';

const KnowledgeChunkSchema = z.object({
  topic: z.string().describe("The topic queried."),
  information: z.string().describe("The retrieved information relevant to the topic. Could be a paragraph or a few bullet points."),
  found: z.boolean().describe("Whether relevant information was found for the topic.")
});
export type KnowledgeChunk = z.infer<typeof KnowledgeChunkSchema>;

const KnowledgeLookupInputSchema = z.object({
  query: z.string().describe("The user's question or topic to search for in the knowledge base. e.g., 'harga coating motor beat', 'jam buka bengkel', 'kebijakan garansi'"),
});

interface KnowledgeBaseEntry {
  id: string;
  topic: string;
  content: string;
  keywords?: string[];
}

export const getKnowledgeBaseInfoTool = ai.defineTool(
  {
    name: 'getKnowledgeBaseInfoTool',
    description: 'Mengambil informasi spesifik dari knowledge base (basis data pengetahuan) berdasarkan topik atau pertanyaan pengguna. Gunakan ini untuk mendapatkan detail tentang layanan (deskripsi umum, proses), kebijakan, jam operasional, atau informasi umum lainnya SEBELUM mencoba menjawab pertanyaan pengguna jika relevan. Hasil dari tool ini akan menjadi sumber informasi utama. JANGAN gunakan tool ini untuk mencari harga atau durasi spesifik, gunakan getProductServiceDetailsByNameTool untuk itu.',
    inputSchema: KnowledgeLookupInputSchema,
    outputSchema: KnowledgeChunkSchema,
  },
  async (input) => {
    const queryLower = input.query.toLowerCase().trim();
    let foundEntry: KnowledgeBaseEntry | null = null;
    let highestMatchScore = 0;
    let matchedTopicDisplay = input.query;

    try {
      const kbCollectionRef = collection(db, 'knowledge_base_entries');
      // Fetch all entries. For very large KBs, consider more targeted queries or a search service.
      const q = firestoreQuery(kbCollectionRef, orderBy('topic'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        console.log("KnowledgeLookupTool: No entries found in 'knowledge_base_entries' collection.");
        return { topic: input.query, information: "Maaf, sumber pengetahuan kami saat ini belum terisi.", found: false };
      }

      const allEntries: KnowledgeBaseEntry[] = snapshot.docs.map(doc => ({
        id: doc.id,
        topic: doc.data().topic as string,
        content: doc.data().content as string,
        keywords: doc.data().keywords as string[] | undefined,
      }));

      // Attempt 1: Direct keyword / phrase matching for common topics (similar to previous logic)
      for (const entry of allEntries) {
        const entryTopicLower = entry.topic.toLowerCase();
        const entryKeywordsLower = entry.keywords?.map(kw => kw.toLowerCase()) || [];
        
        let currentScore = 0;
        const topicWords = entryTopicLower.split(" ");
        topicWords.forEach(kw => {
            if (queryLower.includes(kw)) {
            currentScore += kw.length;
            }
        });

        // Check for full phrase match or significant overlap in topic
        if (queryLower.includes(entryTopicLower) && entryTopicLower.length > highestMatchScore) {
          foundEntry = entry;
          matchedTopicDisplay = entry.topic;
          highestMatchScore = entryTopicLower.length;
        } else if (currentScore > 0 && currentScore * 2 > entryTopicLower.length && currentScore > highestMatchScore) {
          foundEntry = entry;
          matchedTopicDisplay = entry.topic;
          highestMatchScore = currentScore;
        }

        // Check keywords if no strong topic match yet or if keyword match is better
        entryKeywordsLower.forEach(keyword => {
          if (queryLower.includes(keyword)) {
            // Prioritize keyword match if it's a more direct hit than a partial topic match
            if (keyword.length > highestMatchScore || (queryLower === keyword && keyword.length > highestMatchScore * 0.8) ) {
                 foundEntry = entry;
                 matchedTopicDisplay = entry.topic; // still show the entry's main topic
                 highestMatchScore = keyword.length + 5; // Boost score for direct keyword hit
            }
          }
        });
      }
      
      // Attempt 2: Fallback if no good direct match, check if query words are in content values (less efficient)
      if (!foundEntry) {
          for (const entry of allEntries) {
              const contentLower = entry.content.toLowerCase();
              const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
              let matchCount = 0;
              queryWords.forEach(word => {
                  if (contentLower.includes(word) || entry.topic.toLowerCase().includes(word)) {
                      matchCount++;
                  }
              });
              
              if (queryWords.length > 0 && matchCount / queryWords.length > 0.5 && matchCount > highestMatchScore ) { 
                  foundEntry = entry;
                  matchedTopicDisplay = entry.topic;
                  highestMatchScore = matchCount;
              }
          }
      }

      if (foundEntry) {
        console.log(`KnowledgeLookupTool: Info found for query "${input.query}" (matched topic: "${matchedTopicDisplay}") from Firestore.`);
        return { topic: matchedTopicDisplay, information: foundEntry.content, found: true };
      } else {
        console.log(`KnowledgeLookupTool: No relevant info found for query "${input.query}" in Firestore.`);
        return { topic: input.query, information: "Maaf, informasi detail mengenai topik tersebut tidak ditemukan saat ini di knowledge base kami.", found: false };
      }

    } catch (error) {
      console.error("KnowledgeLookupTool: Error fetching from Firestore:", error);
      return { topic: input.query, information: "Maaf, terjadi kesalahan saat mengakses sumber pengetahuan kami.", found: false };
    }
  }
);
