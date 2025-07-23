// @file: regenerate-embeddings.ts

import 'dotenv/config';
import { getFirebaseAdmin } from './src/lib/firebase-admin';
import { createEmbedding } from './src/ai/actions/embeddingAction'; 

/**
 * Skrip untuk meregenerasi semua embedding di koleksi knowledge_base_entries.
 * Embedding hanya berdasarkan field "question" agar pencocokan lebih presisi.
 */
async function regenerateAllEmbeddings() {
  console.log("Memulai proses regenerasi embedding (berdasarkan question saja)...");

  const db = getFirebaseAdmin().firestore();
  const collectionRef = db.collection('knowledge_base_entries');
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    console.log("Tidak ada dokumen yang ditemukan. Proses selesai.");
    return;
  }

  const totalDocs = snapshot.size;
  let processedCount = 0;

  console.log(`Ditemukan ${totalDocs} dokumen untuk diproses.`);

  for (const doc of snapshot.docs) {
    processedCount++;
    const data = doc.data();
    const question = data.question as string;

    if (!question) {
      console.warn(`[${processedCount}/${totalDocs}] Dokumen ${doc.id} dilewati karena tidak ada question.`);
      continue;
    }

    console.log(`[${processedCount}/${totalDocs}] Memproses doc: "${question}"`);

    try {
      // Hanya embed field 'question' saja
      const newEmbedding = await createEmbedding(question);

      if (newEmbedding.length > 0) {
        await collectionRef.doc(doc.id).update({
          embedding: newEmbedding
        });
        console.log(`   ✅ Berhasil diupdate!`);
      } else {
        console.warn(`   ⚠️ Embedding kosong untuk doc: ${doc.id}`);
      }

      await new Promise(resolve => setTimeout(resolve, 200)); // Jeda antar request
    } catch (error) {
      console.error(`   ❌ Gagal memproses doc: ${doc.id}`, error);
    }
  }

  console.log("\n✅ Proses regenerasi embedding selesai!");
}

regenerateAllEmbeddings().catch(console.error);
