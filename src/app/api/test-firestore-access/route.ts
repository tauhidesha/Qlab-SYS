import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Firestore access...');
    
    // Test access to directMessages collection
    const directMessagesRef = collection(db, 'directMessages');
    const querySnapshot = await getDocs(directMessagesRef);
    
    console.log(`Found ${querySnapshot.docs.length} directMessages documents`);
    
    const documentIds = querySnapshot.docs.map(doc => doc.id);
    
    return NextResponse.json({
      success: true,
      message: 'Firestore access test successful',
      documentCount: querySnapshot.docs.length,
      documentIds: documentIds.slice(0, 5), // First 5 IDs only
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('Firestore access test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
