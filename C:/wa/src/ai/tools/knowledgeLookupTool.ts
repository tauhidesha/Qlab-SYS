
'use server';
/**
 * @fileOverview Genkit tool for retrieving specific knowledge base information.
 * This is a simplified RAG retriever.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// This will be the output of the tool, containing the retrieved context.
const KnowledgeChunkSchema = z.object({
  topic: z.string().describe("The topic queried."),
  information: z.string().describe("The retrieved information relevant to the topic. Could be a paragraph or a few bullet points."),
  found: z.boolean().describe("Whether relevant information was found for the topic.")
});
export type KnowledgeChunk = z.infer<typeof KnowledgeChunkSchema>;

const KnowledgeLookupInputSchema = z.object({
  query: z.string().describe("The user's question or topic to search for in the knowledge base. e.g., 'harga coating motor beat', 'jam buka bengkel', 'kebijakan garansi'"),
});

// Simulated knowledge base - in a real RAG, this would come from a vector DB or structured Firestore.
// Keep this concise for now.
const SIMULATED_KNOWLEDGE_BASE: Record<string, string> = {
  "cuci reguler": "Layanan Cuci Reguler meliputi cuci pakai sabun premium dan dressing ban. Estimasi durasi sekitar 30 menit. Cocok untuk perawatan rutin motor Anda.",
  "cuci premium": "Layanan Cuci Premium meliputi cuci dengan sabun premium, aplikasi wax pada bodi, serta dressing untuk bodi kasar, kaki-kaki, dan ban. Estimasi durasi 45–60 menit. Memberikan kilap dan proteksi ekstra.",
  "coating motor doff": "Layanan Coating Motor Doff menggunakan matte ceramic coating. Prosesnya meliputi cuci, dekontaminasi bodi, aplikasi coating doff, dan dressing. Estimasi durasi 3–4 jam. Memberikan perlindungan cat dengan tampilan matte yang elegan dan hidrofobik.",
  "coating motor glossy": "Layanan Coating Motor Glossy menggunakan glossy ceramic coating. Prosesnya meliputi cuci, dekontaminasi, poles (amplas opsional jika diperlukan), aplikasi coating glossy, dan dressing. Estimasi durasi 5–8 jam. Memberikan kilap maksimal, efek hidrofobik, dan proteksi jangka panjang pada cat motor.",
  "poles bodi": "Paket Poles Bodi (Body Detailing) khusus untuk motor dengan cat glossy. Termasuk cuci, amplas halus jika perlu, proses poles bodi untuk menghilangkan baret halus dan mengembalikan kilap, aplikasi sealant wax protection, serta dressing bodi kasar dan kaki-kaki. Estimasi durasi 3–5 jam.",
  "jam buka": "QLAB Auto Detailing buka setiap hari Senin sampai Minggu, dari pukul 09:00 pagi hingga pukul 21:00 malam (WIB).",
  "kebijakan garansi": "Untuk layanan coating, kami memberikan garansi selama 1 tahun dengan syarat dan ketentuan berlaku. Garansi meliputi daya tahan lapisan coating terhadap oksidasi dan perubahan warna. Garansi tidak mencakup kerusakan akibat benturan atau goresan baru. Silakan hubungi kami atau datang langsung ke bengkel untuk detail S&K lebih lanjut.",
  "alamat bengkel": "Alamat QLAB Auto Detailing: Jl. Otomotif Raya No. 1, Kota Test, 12345. Anda bisa mencari 'QLAB Auto Detailing' di Google Maps untuk rute terbaik.",
  "detailing mesin": "Paket Detailing Mesin meliputi pelepasan ban belakang, pembersihan menyeluruh area mesin dan crankcase, cuci premium seluruh motor termasuk wax, dan dressing bodi kasar serta kaki-kaki. Durasi sekitar 1–1.5 jam.",
  "repaint": "Kami melayani repaint dan ganti warna motor. Harga bervariasi tergantung jenis motor, bagian yang dicat (bodi halus, bodi kasar, velg, arm, CVT), dan jenis cat yang dipilih. Silakan konsultasikan langsung dengan kami untuk mendapatkan estimasi harga yang akurat untuk motor Anda.",
};

export const getKnowledgeBaseInfoTool = ai.defineTool(
  {
    name: 'getKnowledgeBaseInfoTool',
    description: 'Mengambil informasi spesifik dari knowledge base berdasarkan topik atau pertanyaan pengguna. Gunakan ini untuk mendapatkan detail tentang layanan (deskripsi umum, proses), kebijakan, jam operasional, atau informasi umum lainnya SEBELUM mencoba menjawab pertanyaan pengguna jika relevan. Hasil dari tool ini akan menjadi sumber informasi utama. JANGAN gunakan tool ini untuk mencari harga atau durasi spesifik, gunakan getProductServiceDetailsByNameTool untuk itu.',
    inputSchema: KnowledgeLookupInputSchema,
    outputSchema: KnowledgeChunkSchema,
  },
  async (input) => {
    const queryLower = input.query.toLowerCase().trim();
    let foundInfo: string | null = null;
    let matchedTopic = input.query;
    let highestMatchScore = 0;

    // Attempt 1: Direct keyword / phrase matching for common topics
    for (const topic in SIMULATED_KNOWLEDGE_BASE) {
      const topicKeywords = topic.split(" ");
      let currentScore = 0;
      topicKeywords.forEach(kw => {
        if (queryLower.includes(kw)) {
          currentScore += kw.length; // Longer keyword matches get higher score
        }
      });

      // Check for full phrase match or significant overlap
      if (queryLower.includes(topic) && topic.length > highestMatchScore) { // Prioritize longer, more specific topic matches
        foundInfo = SIMULATED_KNOWLEDGE_BASE[topic];
        matchedTopic = topic;
        highestMatchScore = topic.length; // Use length as a simple score
      } else if (currentScore > 0 && currentScore * 2 > topic.length && currentScore > highestMatchScore) { 
        // If more than half of the topic keywords by length are present
        foundInfo = SIMULATED_KNOWLEDGE_BASE[topic];
        matchedTopic = topic;
        highestMatchScore = currentScore;
      }
    }
    
    // Attempt 2: Fallback if no good direct match, check if query words are in KB content values
    if (!foundInfo) {
        for (const topic in SIMULATED_KNOWLEDGE_BASE) {
            const contentLower = SIMULATED_KNOWLEDGE_BASE[topic].toLowerCase();
            const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2); // Ignore short words
            let matchCount = 0;
            queryWords.forEach(word => {
                if (contentLower.includes(word)) {
                    matchCount++;
                }
            });
            
            // Basic relevance: if a significant number of query words are in the content
            if (queryWords.length > 0 && matchCount / queryWords.length > 0.5 && matchCount > highestMatchScore ) { 
                foundInfo = SIMULATED_KNOWLEDGE_BASE[topic];
                matchedTopic = topic; // Could be more sophisticated
                highestMatchScore = matchCount; // Use count of matched words as score
            }
        }
    }

    if (foundInfo) {
      console.log(`KnowledgeLookupTool: Info found for query "${input.query}" (matched topic: "${matchedTopic}")`);
      return { topic: matchedTopic, information: foundInfo, found: true };
    } else {
      console.log(`KnowledgeLookupTool: No info found for query "${input.query}"`);
      return { topic: input.query, information: "Maaf, informasi detail mengenai topik tersebut tidak ditemukan saat ini di knowledge base kami.", found: false };
    }
  }
);

    