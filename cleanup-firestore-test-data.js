// @file: cleanup-firestore-test-data.js
// Script untuk membersihkan data testing dari Firestore

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require('./firebase-admin-key.json'); // Pastikan file ini ada
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });
}

const db = admin.firestore();

async function cleanupTestData() {
  console.log('🧹 Starting Firestore cleanup...');
  
  const collectionsToClean = [
    {
      name: 'directMessages',
      condition: (doc) => {
        const data = doc.data();
        // Hapus data testing berdasarkan nomor telepon test atau nama test
        return data.senderNumber?.includes('test') || 
               data.senderNumber?.includes('628123456') ||
               data.name?.toLowerCase()?.includes('test') ||
               data.senderNumber?.includes('628999888777') ||
               data.senderNumber?.includes('628811') ||
               data.text?.toLowerCase()?.includes('test');
      }
    },
    {
      name: 'zoya_sessions',
      condition: (doc) => {
        const data = doc.data();
        // Hapus session testing
        return doc.id.includes('test') || 
               doc.id.includes('628123456') ||
               doc.id.includes('628999888777') ||
               doc.id.includes('628811') ||
               data.senderNumber?.includes('test');
      }
    },
    {
      name: 'ai_metrics',
      condition: (doc) => {
        const data = doc.data();
        // Hapus metrics dari testing
        return data.customerPhone?.includes('test') ||
               data.customerPhone?.includes('628123456') ||
               data.customerPhone?.includes('628999888777') ||
               data.customerPhone?.includes('628811') ||
               data.conversationId?.includes('test') ||
               data.conversationId?.includes('mock');
      }
    },
    {
      name: 'tool_metrics',
      condition: (doc) => {
        const data = doc.data();
        // Hapus tool metrics dari testing
        return data.conversationId?.includes('test') ||
               data.conversationId?.includes('mock') ||
               data.metadata?.customerPhone?.includes('628123456');
      }
    }
  ];

  let totalDeleted = 0;

  for (const collection of collectionsToClean) {
    console.log(`\n📂 Cleaning collection: ${collection.name}`);
    
    try {
      const snapshot = await db.collection(collection.name).get();
      console.log(`   Found ${snapshot.size} documents total`);
      
      const docsToDelete = [];
      
      snapshot.forEach(doc => {
        if (collection.condition(doc)) {
          docsToDelete.push(doc);
        }
      });
      
      console.log(`   🗑️  Will delete ${docsToDelete.length} test documents`);
      
      if (docsToDelete.length > 0) {
        // Delete in batches of 500 (Firestore limit)
        const batchSize = 500;
        for (let i = 0; i < docsToDelete.length; i += batchSize) {
          const batch = db.batch();
          const batchDocs = docsToDelete.slice(i, i + batchSize);
          
          batchDocs.forEach(doc => {
            batch.delete(doc.ref);
          });
          
          await batch.commit();
          console.log(`   ✅ Deleted batch ${Math.floor(i/batchSize) + 1} (${batchDocs.length} documents)`);
        }
        
        totalDeleted += docsToDelete.length;
      }
      
      // Clean subcollections for directMessages
      if (collection.name === 'directMessages') {
        console.log(`   🔍 Checking subcollections...`);
        for (const doc of docsToDelete) {
          // Clean messages subcollection
          const messagesSnapshot = await doc.ref.collection('messages').get();
          if (!messagesSnapshot.empty) {
            const messagesBatch = db.batch();
            messagesSnapshot.forEach(msgDoc => {
              messagesBatch.delete(msgDoc.ref);
            });
            await messagesBatch.commit();
            console.log(`   🗑️  Deleted ${messagesSnapshot.size} messages for ${doc.id}`);
          }
          
          // Clean meta subcollection
          const metaSnapshot = await doc.ref.collection('meta').get();
          if (!metaSnapshot.empty) {
            const metaBatch = db.batch();
            metaSnapshot.forEach(metaDoc => {
              metaBatch.delete(metaDoc.ref);
            });
            await metaBatch.commit();
            console.log(`   🗑️  Deleted ${metaSnapshot.size} meta docs for ${doc.id}`);
          }
        }
      }
      
    } catch (error) {
      console.error(`❌ Error cleaning ${collection.name}:`, error);
    }
  }
  
  console.log(`\n🎉 Cleanup completed! Total documents deleted: ${totalDeleted}`);
  console.log('✨ Firestore is now clean from test data!');
}

// Jalankan cleanup
cleanupTestData().catch(console.error);
