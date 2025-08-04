// @file: cleanup-test-data.ts
// Script TypeScript untuk membersihkan data testing dari Firestore dengan aman

import { getFirebaseAdmin } from './src/lib/firebase-admin';
import admin from 'firebase-admin';

async function cleanupTestData() {
  console.log('🧹 Starting safe Firestore cleanup...');
  
  const firebaseAdmin = getFirebaseAdmin();
  const db = firebaseAdmin.firestore();
  
  // Pattern nomor testing yang akan dihapus
  const testPatterns = [
    '628123456', // Pattern nomor test dari script testing
    '628999888777', // Pattern nomor IG ads test
    '628811', // Pattern nomor test lainnya
    'test',
    'mock',
    'ghost_writing_session'
  ];
  
  let totalDeleted = 0;
  
  console.log('🔍 Cleaning directMessages collection...');
  try {
    const directMessagesRef = db.collection('directMessages');
    const snapshot = await directMessagesRef.get();
    console.log(`   Found ${snapshot.size} documents total`);
    
    const docsToDelete: admin.firestore.QueryDocumentSnapshot[] = [];
    
    snapshot.forEach(doc => {
      const docId = doc.id;
      const data = doc.data();
      
      // Check if document matches test patterns
      const isTestData = testPatterns.some(pattern => 
        docId.includes(pattern) ||
        data.senderNumber?.includes(pattern) ||
        data.name?.toLowerCase()?.includes('test') ||
        data.text?.toLowerCase()?.includes('test customer')
      );
      
      if (isTestData) {
        docsToDelete.push(doc);
      }
    });
    
    console.log(`   🗑️  Will delete ${docsToDelete.length} test documents`);
    
    if (docsToDelete.length > 0) {
      // Delete in smaller batches to be safe
      const batchSize = 100;
      for (let i = 0; i < docsToDelete.length; i += batchSize) {
        const batch = db.batch();
        const batchDocs = docsToDelete.slice(i, i + batchSize);
        
        for (const doc of batchDocs) {
          // First clean subcollections
          const messagesSnapshot = await doc.ref.collection('messages').get();
          if (!messagesSnapshot.empty) {
            const messagesBatch = db.batch();
            messagesSnapshot.forEach(msgDoc => {
              messagesBatch.delete(msgDoc.ref);
            });
            await messagesBatch.commit();
            console.log(`   🗑️  Deleted ${messagesSnapshot.size} messages for ${doc.id}`);
          }
          
          const metaSnapshot = await doc.ref.collection('meta').get();
          if (!metaSnapshot.empty) {
            const metaBatch = db.batch();
            metaSnapshot.forEach(metaDoc => {
              metaBatch.delete(metaDoc.ref);
            });
            await metaBatch.commit();
          }
          
          // Then delete the main document
          batch.delete(doc.ref);
        }
        
        await batch.commit();
        console.log(`   ✅ Deleted batch ${Math.floor(i/batchSize) + 1} (${batchDocs.length} documents)`);
        
        // Small delay to be gentle on Firestore
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      totalDeleted += docsToDelete.length;
    }
  } catch (error) {
    console.error('❌ Error cleaning directMessages:', error);
  }
  
  console.log('\n🔍 Cleaning zoya_sessions collection...');
  try {
    const sessionsRef = db.collection('zoya_sessions');
    const sessionsSnapshot = await sessionsRef.get();
    console.log(`   Found ${sessionsSnapshot.size} sessions total`);
    
    const sessionsToDelete: admin.firestore.QueryDocumentSnapshot[] = [];
    
    sessionsSnapshot.forEach(doc => {
      const docId = doc.id;
      const data = doc.data();
      
      const isTestSession = testPatterns.some(pattern => 
        docId.includes(pattern) ||
        data.senderNumber?.includes(pattern)
      );
      
      if (isTestSession) {
        sessionsToDelete.push(doc);
      }
    });
    
    console.log(`   🗑️  Will delete ${sessionsToDelete.length} test sessions`);
    
    if (sessionsToDelete.length > 0) {
      const batch = db.batch();
      sessionsToDelete.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      totalDeleted += sessionsToDelete.length;
      console.log(`   ✅ Deleted ${sessionsToDelete.length} test sessions`);
    }
  } catch (error) {
    console.error('❌ Error cleaning sessions:', error);
  }
  
  console.log('\n🔍 Cleaning ai_metrics collection...');
  try {
    const metricsRef = db.collection('ai_metrics');
    const metricsSnapshot = await metricsRef.get();
    console.log(`   Found ${metricsSnapshot.size} metrics total`);
    
    const metricsToDelete: admin.firestore.QueryDocumentSnapshot[] = [];
    
    metricsSnapshot.forEach(doc => {
      const data = doc.data();
      
      const isTestMetric = testPatterns.some(pattern => 
        data.customerPhone?.includes(pattern) ||
        data.conversationId?.includes(pattern) ||
        data.conversationId?.includes('mock')
      );
      
      if (isTestMetric) {
        metricsToDelete.push(doc);
      }
    });
    
    console.log(`   🗑️  Will delete ${metricsToDelete.length} test metrics`);
    
    if (metricsToDelete.length > 0) {
      const batch = db.batch();
      metricsToDelete.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      totalDeleted += metricsToDelete.length;
      console.log(`   ✅ Deleted ${metricsToDelete.length} test metrics`);
    }
  } catch (error) {
    console.error('❌ Error cleaning metrics:', error);
  }
  
  console.log(`\n🎉 Cleanup completed!`);
  console.log(`📊 Total documents deleted: ${totalDeleted}`);
  console.log('✨ Firestore is now clean from test data!');
  
  process.exit(0);
}

// Jalankan cleanup
cleanupTestData().catch((error) => {
  console.error('💥 Cleanup failed:', error);
  process.exit(1);
});
