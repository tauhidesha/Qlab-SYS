
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { embedText } from '@/ai/flows/embed-text-flow';
import { cosineSimilarity } from '@/lib/math';

export async function searchKnowledgeBase(query: string) {
  const MINIMUM_THRESHOLD = 0.82;

  try {
    const userEmbedding = await embedText(query);
    if (!userEmbedding) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('[searchKnowledgeBase] Gagal membuat embedding untuk query.');
      }
      return null;
    }

    const entriesRef = collection(db, 'knowledge_base_entries');
    const snapshot = await getDocs(entriesRef);

    let bestMatch = null;
    let highestScore = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!data.embedding || !Array.isArray(data.embedding) || data.embedding.length === 0) {
        return;
      }

      const score = cosineSimilarity(userEmbedding, data.embedding);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = {
          id: doc.id,
          question: data.question,
          answer: data.answer,
          score,
        };
      }
    });

    if (bestMatch && highestScore >= MINIMUM_THRESHOLD) {
      if (process.env.NODE_ENV !== 'test') {
        console.log(`[searchKnowledgeBase] Jawaban terbaik ditemukan dengan skor ${highestScore}`);
      }
      return bestMatch;
    }

    if (process.env.NODE_ENV !== 'test') {
      console.log(`[searchKnowledgeBase] Tidak ada jawaban yang memenuhi threshold. Skor tertinggi: ${highestScore}`);
    }
    return null;

  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(`[searchKnowledgeBase] Error saat memproses query "${query}":`, err);
    }
    return null;
  }
}
