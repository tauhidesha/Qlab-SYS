import { NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

export async function POST() {
  try {
    console.log('🧹 Starting safe Firestore cleanup...');
    
    const admin = getFirebaseAdmin();
    const db = admin.firestore();
    
    // Function to check if a phone number is a test number
    const isTestPhoneNumber = (phone: string): boolean => {
      if (!phone) return false;
      
      // Exact test patterns
      const exactPatterns = [
        '628123456',
        '628999888777', 
        '628000111222',
        '628111000999',
        '628111222333',
        '628777888999',
        '628999888000',
        'test',
        'mock',
        'ghost_writing_session'
      ];
      
      // Check exact matches
      if (exactPatterns.some(pattern => phone.includes(pattern))) {
        return true;
      }
      
      // Check range patterns
      // 628100000000-628100000008
      if (phone.startsWith('62810000000') && phone.length === 12) {
        const lastDigit = parseInt(phone.slice(-1));
        if (lastDigit >= 0 && lastDigit <= 8) return true;
      }
      
      // 628700000000-628700000013  
      if (phone.startsWith('62870000001') && phone.length === 12) {
        const lastDigit = parseInt(phone.slice(-1));
        if (lastDigit >= 0 && lastDigit <= 3) return true;
      }
      
      if (phone.startsWith('62870000000') && phone.length === 12) {
        const lastDigit = parseInt(phone.slice(-1));
        if (lastDigit >= 0 && lastDigit <= 9) return true;
      }
      
      // Additional pattern matching
      if (phone.includes('628700000001') && phone.length >= 12) {
        return true;
      }
      
      return false;
    };
    
    let totalDeleted = 0;
    const results: string[] = [];
    
    // Clean directMessages collection
    console.log('🔍 Cleaning directMessages collection...');
    try {
      const directMessagesRef = db.collection('directMessages');
      const snapshot = await directMessagesRef.get();
      console.log(`   Found ${snapshot.size} documents total`);
      
      const docsToDelete: FirebaseFirestore.QueryDocumentSnapshot[] = [];
      
      snapshot.forEach(doc => {
        const docId = doc.id;
        const data = doc.data();
        
        // Check if document matches test patterns
        const isTestData = isTestPhoneNumber(docId) ||
          isTestPhoneNumber(data.senderNumber) ||
          data.name?.toLowerCase()?.includes('test') ||
          data.text?.toLowerCase()?.includes('test customer');
        
        if (isTestData) {
          docsToDelete.push(doc);
        }
      });
      
      console.log(`   🗑️  Will delete ${docsToDelete.length} test documents`);
      
      if (docsToDelete.length > 0) {
        // Delete in smaller batches to be safe
        const batchSize = 50; // Smaller batch for API
        for (let i = 0; i < docsToDelete.length; i += batchSize) {
          const batch = db.batch();
          const batchDocs = docsToDelete.slice(i, i + batchSize);
          
          for (const doc of batchDocs) {
            // Clean subcollections first
            const messagesSnapshot = await doc.ref.collection('messages').get();
            if (!messagesSnapshot.empty) {
              const messagesBatch = db.batch();
              messagesSnapshot.forEach(msgDoc => {
                messagesBatch.delete(msgDoc.ref);
              });
              await messagesBatch.commit();
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
        }
        
        totalDeleted += docsToDelete.length;
        results.push(`directMessages: ${docsToDelete.length} documents deleted`);
      }
    } catch (error) {
      console.error('❌ Error cleaning directMessages:', error);
      results.push(`directMessages: Error - ${error}`);
    }
    
    // Clean zoya_sessions collection
    console.log('\n🔍 Cleaning zoya_sessions collection...');
    try {
      const sessionsRef = db.collection('zoya_sessions');
      const sessionsSnapshot = await sessionsRef.get();
      console.log(`   Found ${sessionsSnapshot.size} sessions total`);
      
      const sessionsToDelete: FirebaseFirestore.QueryDocumentSnapshot[] = [];
      
      sessionsSnapshot.forEach(doc => {
        const docId = doc.id;
        const data = doc.data();
        
      const isTestSession = isTestPhoneNumber(docId) ||
        isTestPhoneNumber(data.senderNumber);        if (isTestSession) {
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
        results.push(`zoya_sessions: ${sessionsToDelete.length} sessions deleted`);
        console.log(`   ✅ Deleted ${sessionsToDelete.length} test sessions`);
      }
    } catch (error) {
      console.error('❌ Error cleaning sessions:', error);
      results.push(`zoya_sessions: Error - ${error}`);
    }
    
    // Clean ai_metrics collection
    console.log('\n🔍 Cleaning ai_metrics collection...');
    try {
      const metricsRef = db.collection('ai_metrics');
      const metricsSnapshot = await metricsRef.get();
      console.log(`   Found ${metricsSnapshot.size} metrics total`);
      
      const metricsToDelete: FirebaseFirestore.QueryDocumentSnapshot[] = [];
      
      metricsSnapshot.forEach(doc => {
        const data = doc.data();
        
      const isTestMetric = isTestPhoneNumber(data.customerPhone) ||
        isTestPhoneNumber(data.conversationId) ||
        data.conversationId?.includes('mock');        if (isTestMetric) {
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
        results.push(`ai_metrics: ${metricsToDelete.length} metrics deleted`);
        console.log(`   ✅ Deleted ${metricsToDelete.length} test metrics`);
      }
    } catch (error) {
      console.error('❌ Error cleaning metrics:', error);
      results.push(`ai_metrics: Error - ${error}`);
    }
    
    console.log(`\n🎉 Cleanup completed!`);
    console.log(`📊 Total documents deleted: ${totalDeleted}`);
    console.log('✨ Firestore is now clean from test data!');
    
    return NextResponse.json({
      success: true,
      message: 'Firestore cleanup completed successfully!',
      totalDeleted,
      results,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('💥 Cleanup failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
