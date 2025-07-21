import dotenv from 'dotenv';
dotenv.config();
// @file: src/ai/tests/embedding-diagnostic.test.ts

import { createEmbedding } from '../actions/embeddingAction';
import { cosineSimilarity } from '../../lib/math';

async function runFinalDiagnosticTest() {
  console.log("--- Menjalankan Tes Diagnostik Final ---");

  const text1 = "lokasinya dimana?";
  const text2 = "Lokasi dimana?"; // Teks hampir identik

  try {
    // 1. Buat embedding untuk kedua teks secara langsung
    console.log(`Membuat embedding untuk: "${text1}"`);
    const embedding1 = await createEmbedding(text1);

    console.log(`Membuat embedding untuk: "${text2}"`);
    const embedding2 = await createEmbedding(text2);

    // Pastikan embedding tidak kosong
    if (!embedding1 || embedding1.length === 0 || !embedding2 || embedding2.length === 0) {
      console.error("Salah satu embedding gagal dibuat atau kosong.");
      return;
    }

    // 2. Langsung hitung kemiripannya tanpa melibatkan Firestore
    const similarityScore = cosineSimilarity(embedding1, embedding2);

    console.log("\n--- HASIL TES ---");
    console.log(`Skor kemiripan antara "${text1}" dan "${text2}" adalah:`);
    console.log(similarityScore);

    if (similarityScore > 0.9) {
      console.log("✅ KESIMPULAN: Tes Lolos! Fungsi embedding dan similarity Anda bekerja dengan benar. Masalahnya 100% ada pada saat data disimpan/dibaca dari Firestore.");
    } else {
      console.log("❌ KESIMPULAN: Tes Gagal! Ada masalah fundamental yang tersembunyi di dalam fungsi `createEmbedding` atau `cosineSimilarity` Anda.");
    }

  } catch (error) {
    console.error("Terjadi error selama tes diagnostik:", error);
  }
}

// Jalankan tesnya
runFinalDiagnosticTest();
