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
    console.log(`[KnowledgeLookupTool] Mencari info untuk query: "${input.query}"`);
    const queryLower = input.query.toLowerCase().trim();
    let foundEntryData: KnowledgeBaseEntryType | null = null;
    let highestMatchScore = 0;
    let matchedTopicDisplay = input.query;

    try {
      const kbCollectionRef = collection(db, 'knowledge_base_entries');
      const q = firestoreQuery(kbCollectionRef, where("isActive", "==", true), orderBy('topic'));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log("[KnowledgeLookupTool] Tidak ada entri aktif yang ditemukan di koleksi 'knowledge_base_entries'.");
        return { topic: input.query, information: "Maaf, sumber pengetahuan kami saat ini belum terisi atau tidak ada entri yang aktif.", found: false };
      }

      const allEntries: KnowledgeBaseEntryType[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as KnowledgeBaseEntryType));

      console.log(`[KnowledgeLookupTool] Ditemukan ${allEntries.length} entri aktif dari Firestore.`);

      for (const entry of allEntries) {
        console.log(`\n[KnowledgeLookupTool] Memproses entri: "${entry.topic}" (ID: ${entry.id}, Aktif: ${entry.isActive})`);
        console.log(`  - Keywords entri: [${(entry.keywords || []).join(', ')}]`);

        const entryTopicLower = entry.topic.toLowerCase();
        const entryKeywordsLower = entry.keywords?.map(kw => kw.toLowerCase()) || [];

        let currentScore = 0;
        let scoreBreakdown = ""; // Untuk logging detail skor

        // Skor berdasarkan kecocokan topik
        if (entryTopicLower === queryLower) {
          const score = entryTopicLower.length * 3;
          currentScore += score;
          scoreBreakdown += `Cocok Topik Persis (+${score}); `;
        } else if (queryLower.includes(entryTopicLower)) {
          const score = entryTopicLower.length * 1.5;
          currentScore += score;
          scoreBreakdown += `Query Mengandung Topik (+${score}); `;
        } else if (entryTopicLower.includes(queryLower)) {
          const score = queryLower.length * 1.2;
          currentScore += score;
          scoreBreakdown += `Topik Mengandung Query (+${score}); `;
        }

        // Skor berdasarkan kecocokan kata kunci
        entryKeywordsLower.forEach(keyword => {
          if (queryLower.includes(keyword)) {
            const keywordScore = keyword.length * 2;
            currentScore += keywordScore;
            scoreBreakdown += `Keyword "${keyword}" (+${keywordScore}); `;
          }
        });

        // Skor berdasarkan kata-kata dalam query yang ada di topik atau keywords
        const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
        queryWords.forEach(word => {
          if (entryTopicLower.includes(word)) {
            const wordInTopicScore = word.length * 0.5;
            currentScore += wordInTopicScore;
            scoreBreakdown += `Kata Query "${word}" di Topik (+${wordInTopicScore}); `;
          }
          if (entryKeywordsLower.some(kw => kw.includes(word))) {
            const wordInKeywordScore = word.length * 0.8;
            currentScore += wordInKeywordScore;
            scoreBreakdown += `Kata Query "${word}" di Keyword (+${wordInKeywordScore}); `;
          }
        });
        console.log(`  - Query yang dicari (lowercase): "${queryLower}"`);
        console.log(`  - Skor untuk "${entry.topic}": ${currentScore}. Rincian: ${scoreBreakdown || "Tidak ada skor."}`);


        if (currentScore > highestMatchScore) {
          console.log(`    -> Skor baru (${currentScore}) lebih tinggi dari skor tertinggi sebelumnya (${highestMatchScore}). Mengganti kandidat terbaik menjadi "${entry.topic}".`);
          foundEntryData = entry;
          matchedTopicDisplay = entry.topic;
          highestMatchScore = currentScore;
        } else if (currentScore > 0) {
          console.log(`    -> Skor (${currentScore}) untuk "${entry.topic}" tidak lebih tinggi dari skor tertinggi saat ini (${highestMatchScore} dari "${matchedTopicDisplay}").`);
        }
      }

      console.log(`[KnowledgeLookupTool] Skor tertinggi akhir: ${highestMatchScore}. Kandidat terpilih: "${matchedTopicDisplay}" (ID: ${foundEntryData?.id || 'Tidak ada'}).`);

      if (foundEntryData && highestMatchScore > 0) { // Ditambahkan cek highestMatchScore > 0
        console.log(`[KnowledgeLookupTool] Info ditemukan untuk query "${input.query}" (cocok dengan topik: "${matchedTopicDisplay}") dari Firestore. Skor: ${highestMatchScore}`);
        return { topic: matchedTopicDisplay, information: foundEntryData.content, found: true };
      } else {
        console.log(`[KnowledgeLookupTool] Tidak ada info aktif yang relevan untuk query "${input.query}" di Firestore setelah evaluasi skor (Skor tertinggi: ${highestMatchScore}).`);
        return { topic: input.query, information: "Maaf, informasi detail mengenai topik tersebut tidak ditemukan saat ini di knowledge base kami.", found: false };
      }

    } catch (error) {
      console.error("[KnowledgeLookupTool] Error saat mengambil data dari Firestore:", error);
      return { topic: input.query, information: "Maaf, terjadi kesalahan saat mengakses sumber pengetahuan kami.", found: false };
    }
  }
);
