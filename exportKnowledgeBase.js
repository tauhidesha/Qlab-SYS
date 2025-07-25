
require('dotenv').config();
const fs = require('fs');
const admin = require('firebase-admin');



// Path ke service account JSON diambil dari .env dalam format base64
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
if (!serviceAccountBase64) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 tidak ditemukan di .env');
}
const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function exportKnowledgeBase() {
  const snapshot = await db.collection('knowledge_base_entries').get();
  const data = [];

  snapshot.forEach(doc => {
    const item = doc.data();
    data.push({
      id: doc.id,
      question: item.question || null,
      answer: item.answer || '',
      createdAt: item.createdAt?.toDate() || null
      // Jangan tulis "embedding", auto di-skip
    });
  });

  fs.writeFileSync('knowledge_base_export.json', JSON.stringify(data, null, 2));
  console.log('✅ Export complete: knowledge_base_export.json');
}

exportKnowledgeBase().catch(err => {
  console.error('❌ Export failed:', err);
});
