// @file: src/ai/tools/knowledgeSearchTool.ts

'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { embedText } from '@/ai/flows/embed-text-flow';
import { cosineSimilarity } from '@/lib/math';

export async function searchKnowledgeBase (query: string) {
  // PENYEMPURNAAN: Definisikan threshold di satu tempat agar mudah diubah.
  const MINIMUM_THRESHOLD = 0.82;

  try {
    const userEmbedding = await embedText(query);
    if (!userEmbedding) {
        console.error('[searchKnowledgeBase ] Gagal membuat embedding untuk query.');
        return null;
    }

    const entriesRef = collection(db, 'knowledge_base_entries');
    const snapshot = await getDocs(entriesRef);

    let bestMatch = null;
    // FIX: Inisialisasi highestScore ke 0 untuk mencari nilai maksimal sejati.
    let highestScore = 0; 

    snapshot.forEach((doc) => {
      const data = doc.data();
      // Validasi data, sudah bagus.
      if (!data.embedding || !Array.isArray(data.embedding) || data.embedding.length === 0) {
        return;
      }

      const score = cosineSimilarity(userEmbedding, data.embedding);
      
      // FIX: Selalu cari skor tertinggi tanpa terpengaruh threshold di dalam loop.
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

    // FIX: Cek threshold SETELAH semua dokumen diperiksa.
    if (bestMatch && highestScore >= MINIMUM_THRESHOLD) {
      console.log(`[searchKnowledgeBase ] Jawaban terbaik ditemukan dengan skor ${highestScore}`);
      return bestMatch;
    }

    console.log(`[searchKnowledgeBase ] Tidak ada jawaban yang memenuhi threshold. Skor tertinggi: ${highestScore}`);
    return null; // Tidak ada yang cocok atau skor tertinggi di bawah threshold.

  } catch (err) {
    // PENYEMPURNAAN: Sertakan query yang menyebabkan error untuk mempermudah debug.
    console.error(`[searchKnowledgeBase ] Error saat memproses query "${query}":`, err);
    return null;
  }
}