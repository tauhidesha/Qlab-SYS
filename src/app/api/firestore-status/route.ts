import { NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

export async function GET() {
  try {
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
    
    const collections = [
      'directMessages',
      'zoya_sessions', 
      'ai_metrics',
      'tool_metrics'
    ];
    
    const status = {};
    
    for (const collectionName of collections) {
      try {
        const snapshot = await db.collection(collectionName).get();
        const docs = snapshot.docs;
        
        // Count test documents
        const testDocs = docs.filter(doc => {
          const docId = doc.id;
          const data = doc.data();
          
          return isTestPhoneNumber(docId) ||
            isTestPhoneNumber(data.senderNumber) ||
            isTestPhoneNumber(data.customerPhone) ||
            isTestPhoneNumber(data.conversationId) ||
            data.name?.toLowerCase()?.includes('test') ||
            data.conversationId?.includes('mock');
        });
        
        status[collectionName] = {
          total: docs.length,
          testDocuments: testDocs.length,
          testDocIds: testDocs.slice(0, 10).map(doc => doc.id), // First 10 test doc IDs
          clean: testDocs.length === 0
        };
        
      } catch (error) {
        status[collectionName] = {
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }
    
    const overallClean = Object.values(status).every(
      (stat: any) => stat.clean === true || stat.error
    );
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      overallClean,
      collections: status,
      message: overallClean ? 
        '✨ Firestore is clean from test data!' : 
        '⚠️  Some test data still remains'
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
