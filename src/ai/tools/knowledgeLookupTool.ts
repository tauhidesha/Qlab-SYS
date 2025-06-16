
'use server';
/**
 * @fileOverview Genkit tool for retrieving specific knowledge base information
 * from Firestore. This acts as a dynamic RAG retriever.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { collection, getDocs, query as firestoreQuery, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { KnowledgeBaseEntry as KnowledgeBaseEntryType } from '@/types/knowledgeBase'; // Menggunakan tipe dari file baru

const KnowledgeChunkSchema = z.object({
  topic: z.string().describe("The topic queried."),
  information: z.string().describe("The retrieved information relevant to the topic. Could be a paragraph or a few bullet points."),
  found: z.boolean().describe("Whether relevant information was found for the topic.")
});
export type KnowledgeChunk = z.infer<typeof KnowledgeChunkSchema>;

const KnowledgeLookupInputSchema = z.object({
  query: z.string().describe("The user's question or topic to search for in the knowledge base. e.g., 'harga coating motor beat', 'jam buka bengkel', 'kebijakan garansi'"),
});

export const getKnowledgeBaseInfoTool = ai.defineTool(
  {
    name: 'getKnowledgeBaseInfoTool',
    description: 'Mengambil informasi spesifik dari knowledge base (basis data pengetahuan) berdasarkan topik atau pertanyaan pengguna. Gunakan ini untuk mendapatkan detail tentang layanan (deskripsi umum, proses), kebijakan, jam operasional, atau informasi umum lainnya SEBELUM mencoba menjawab pertanyaan pengguna jika relevan. Hasil dari tool ini akan menjadi sumber informasi utama. JANGAN gunakan tool ini untuk mencari harga atau durasi spesifik, gunakan getProductServiceDetailsByNameTool untuk itu.',
    inputSchema: KnowledgeLookupInputSchema,
    outputSchema: KnowledgeChunkSchema,
  },
  async (input) => {
    const queryLower = input.query.toLowerCase().trim();
    let foundEntryData: KnowledgeBaseEntryType | null = null;
    let highestMatchScore = 0;
    let matchedTopicDisplay = input.query;

    try {
      const kbCollectionRef = collection(db, 'knowledge_base_entries');
      const q = firestoreQuery(kbCollectionRef, where("isActive", "==", true), orderBy('topic'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        console.log("KnowledgeLookupTool: No active entries found in 'knowledge_base_entries' collection.");
        return { topic: input.query, information: "Maaf, sumber pengetahuan kami saat ini belum terisi atau tidak ada entri yang aktif.", found: false };
      }

      const allEntries: KnowledgeBaseEntryType[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as KnowledgeBaseEntryType));

      for (const entry of allEntries) {
        if (!entry.isActive) continue; // Lewati entri yang tidak aktif

        const entryTopicLower = entry.topic.toLowerCase();
        const entryKeywordsLower = entry.keywords?.map(kw => kw.toLowerCase()) || [];
        
        let currentScore = 0;
        
        // Skor berdasarkan kecocokan topik
        if (entryTopicLower === queryLower) { // Cocok persis dengan topik
          currentScore = entryTopicLower.length * 3; // Skor tinggi untuk cocok persis topik
        } else if (queryLower.includes(entryTopicLower)) { // Query mengandung nama topik
          currentScore = entryTopicLower.length * 1.5;
        } else if (entryTopicLower.includes(queryLower)) { // Nama topik mengandung query
          currentScore = queryLower.length * 1.2;
        }
        
        // Skor berdasarkan kecocokan kata kunci
        entryKeywordsLower.forEach(keyword => {
          if (queryLower.includes(keyword)) {
            currentScore += keyword.length * 2; // Skor lebih tinggi untuk kata kunci
          }
        });
        
        // Skor berdasarkan kata-kata dalam query yang ada di topik atau keywords
        const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
        queryWords.forEach(word => {
          if (entryTopicLower.includes(word)) {
            currentScore += word.length * 0.5;
          }
          if (entryKeywordsLower.some(kw => kw.includes(word))) {
            currentScore += word.length * 0.8;
          }
        });

        if (currentScore > highestMatchScore) {
          foundEntryData = entry;
          matchedTopicDisplay = entry.topic;
          highestMatchScore = currentScore;
        }
      }
      
      if (foundEntryData) {
        console.log(`KnowledgeLookupTool: Info found for query "${input.query}" (matched topic: "${matchedTopicDisplay}") from Firestore. Score: ${highestMatchScore}`);
        return { topic: matchedTopicDisplay, information: foundEntryData.content, found: true };
      } else {
        console.log(`KnowledgeLookupTool: No relevant active info found for query "${input.query}" in Firestore.`);
        return { topic: input.query, information: "Maaf, informasi detail mengenai topik tersebut tidak ditemukan saat ini di knowledge base kami.", found: false };
      }

    } catch (error) {
      console.error("KnowledgeLookupTool: Error fetching from Firestore:", error);
      return { topic: input.query, information: "Maaf, terjadi kesalahan saat mengakses sumber pengetahuan kami.", found: false };
    }
  }
);
