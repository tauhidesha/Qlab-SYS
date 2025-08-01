// @file: src/app/api/debug/cs-dashboard/route.ts

import { NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

export async function GET() {
  try {
    console.log('[CS DASHBOARD DEBUG] Simulating fetchCustomers function...');

    const admin = getFirebaseAdmin();
    const db = admin.firestore();

    // Simulate the exact same query that CS dashboard uses
    const directMessagesRef = db.collection('directMessages');
    const querySnapshot = await directMessagesRef.get();
    
    console.log(`[CS DASHBOARD DEBUG] Found ${querySnapshot.docs.length} directMessages documents`);

    if (querySnapshot.docs.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No directMessages found in database",
        customers: []
      });
    }

    const customers = await Promise.all(querySnapshot.docs.map(async (docSnap) => {
      const phone = docSnap.id;
      const parentData = docSnap.data();
      
      console.log(`[CS DASHBOARD DEBUG] Processing phone: ${phone}`, parentData);

      try {
        // Check meta/info
        const metaDocRef = db.collection('directMessages').doc(phone).collection('meta').doc('info');
        const metaDocSnap = await metaDocRef.get();
        const metaData = metaDocSnap.exists ? metaDocSnap.data() : {};

        // Check last message from subcollection
        const messagesRef = db.collection('directMessages').doc(phone).collection('messages');
        const lastMsgQuery = messagesRef.orderBy('timestamp', 'desc').limit(1);
        const lastMsgSnap = await lastMsgQuery.get();
        let lastMsgData = lastMsgSnap.docs[0]?.data();

        // Fallback to parent data if subcollection empty
        if (!lastMsgData && parentData.text) {
          lastMsgData = parentData;
        }

        const displayName = metaData?.name || lastMsgData?.waName || parentData.name || phone;
        const lastMessage = lastMsgData?.text || 'Klik untuk melihat chat...';
        const lastMessageAt = parentData.lastMessageAt || 'N/A';

        return {
          id: phone,
          name: displayName,
          phone,
          lastMessageTimestamp: lastMessageAt?.toDate ? lastMessageAt.toDate().toISOString() : lastMessageAt,
          lastMessage: lastMessage.substring(0, 100) + (lastMessage.length > 100 ? '...' : ''),
          hasMetaData: metaDocSnap.exists,
          hasSubcollectionMessages: lastMsgSnap.docs.length > 0,
          fallbackToParent: !lastMsgData && parentData.text ? true : false
        };
      } catch (innerError) {
        console.error(`[CS DASHBOARD DEBUG] Error processing phone ${phone}:`, innerError);
        return {
          id: phone,
          name: parentData.name || phone,
          phone,
          error: innerError instanceof Error ? innerError.message : String(innerError),
          lastMessageTimestamp: 'Error',
          lastMessage: 'Error loading messages...'
        };
      }
    }));

    // Check specifically for Aries
    const ariesCustomer = customers.find(c => c.phone === '6281510021762');
    
    return NextResponse.json({
      success: true,
      totalCustomers: customers.length,
      customers,
      ariesFound: !!ariesCustomer,
      ariesData: ariesCustomer || null
    });

  } catch (error) {
    console.error('[CS DASHBOARD DEBUG] Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to simulate CS dashboard query', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
