// @file: src/app/api/debug/cs-customers/route.ts

import { NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const admin = getFirebaseAdmin();
    const db = admin.firestore();

    const directMessagesRef = db.collection('directMessages');
    const querySnapshot = await directMessagesRef.get();

    const customersData = await Promise.all(querySnapshot.docs.map(async (docSnap) => {
      const phone = docSnap.id;
      const parentData = docSnap.data();
      const lastMessageAt = parentData.lastMessageAt || 'N/A';

      try {
        // Get meta data
        const metaDocRef = db.collection('directMessages').doc(phone).collection('meta').doc('info');
        const metaDocSnap = await metaDocRef.get();
        const metaData = metaDocSnap.exists ? metaDocSnap.data() : {};

        // Get last message from subcollection  
        const messagesRef = db.collection('directMessages').doc(phone).collection('messages');
        const lastMsgQuery = messagesRef.orderBy('timestamp', 'desc').limit(1);
        const lastMsgSnap = await lastMsgQuery.get();
        let lastMsgData = lastMsgSnap.docs[0]?.data();

        // Fallback if needed
        if (!lastMsgData && parentData.text) {
          lastMsgData = parentData;
        }

        const displayName = metaData?.name || lastMsgData?.waName || parentData.name || phone;
        const lastMessage = lastMsgData?.text || 'Klik untuk melihat chat...';

        return {
          id: phone,
          name: displayName,
          avatarUrl: `https://placehold.co/40x40.png?text=${displayName.charAt(0)}`,
          lastMessageTimestamp: lastMessageAt?.toDate ? lastMessageAt.toDate().toISOString() : lastMessageAt,
          lastMessage,
          unreadCount: 0,
          phone,
        };
      } catch (innerError) {
        return {
          id: phone,
          name: parentData.name || phone,
          avatarUrl: `https://placehold.co/40x40.png?text=${phone.charAt(0)}`,
          lastMessageTimestamp: lastMessageAt,
          lastMessage: 'Error loading messages...',
          unreadCount: 0,
          phone,
        };
      }
    }));

    return NextResponse.json({
      success: true,
      customers: customersData
    });

  } catch (error) {
    console.error('[CS CUSTOMERS API] Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch customers', 
        details: error instanceof Error ? error.message : String(error),
        customers: []
      },
      { status: 500 }
    );
  }
}
