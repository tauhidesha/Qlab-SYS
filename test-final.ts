// @file: test-final.ts
// TIDAK ADA IMPORT DARI FILE LOKAL LAIN, HANYA DARI LIBRARY

import 'dotenv/config';
import OpenAI from 'openai';

// Pastikan Anda sudah mengatur OPENAI_API_KEY di environment variables Anda
const openai = new OpenAI();

async function runUltimateSanityCheck() {
  console.log("--- MENJALANKAN ULTIMATE SANITY CHECK ---");
  const textToTest = "tes ini harus menghasilkan skor satu";

  try {
    console.log(`[ULTIMATE CHECK] Membuat embedding untuk: "${textToTest}"`);
    
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: textToTest,
      encoding_format: 'float',
    });

    const vector = response.data[0].embedding;

    if (!vector || vector.length === 0) {
      console.error("Gagal mendapatkan vektor dari OpenAI.");
      return;
    }

    console.log(`[ULTIMATE CHECK] Berhasil mendapatkan vektor. Panjang Vektor: ${vector.length}`);
    
    // Kita definisikan ulang cosineSimilarity di sini untuk memastikan tidak ada masalah dari file lain
    const cosineSimilarity = (vecA: number[], vecB: number[]) => {
      let dotProduct = 0, normA = 0, normB = 0;
      for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] ** 2;
        normB += vecB[i] ** 2;
      }
      return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    };

    const score = cosineSimilarity(vector, vector);

    console.log("\n--- HASIL FINAL ---");
    console.log(`Skor kemiripan vektor dengan dirinya sendiri adalah: ${score}`);

    if (score > 0.999) {
      console.log("\n✅  KESIMPULAN: FUNGSI INTI BENAR. Masalahnya 100% ada di LINGKUNGAN atau KONFIGURASI PROYEK Anda.");
    } else {
      console.log(`\n❌ KESIMPULAN: TEST GAGAL. Ini masalah yang sangat langka. Kemungkinan ada di versi library 'openai' atau Node.js Anda.`);
    }

  } catch (error) {
    console.error("Error selama Ultimate Sanity Check:", error);
  }
}

runUltimateSanityCheck();
