// @file: src/app/api/debug/customer/[phone]/route.ts

import { NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

export async function GET(
  request: Request,
  { params }: { params: { phone: string } }
) {
  try {
    const phone = params.phone;
    console.log(`[DEBUG] Checking customer data for phone: ${phone}`);

    const admin = getFirebaseAdmin();
    const db = admin.firestore();

    // Check if customer exists in directMessages
    const customerRef = db.collection('directMessages').doc(phone);
    const customerDoc = await customerRef.get();
    
    if (!customerDoc.exists) {
      return NextResponse.json({
        found: false,
        message: `No customer found for phone ${phone}`
      });
    }

    const customerData = customerDoc.data();
    console.log(`[DEBUG] Customer data:`, customerData);

    // Check messages subcollection
    const messagesRef = customerRef.collection('messages');
    const messagesQuery = await messagesRef.orderBy('timestamp', 'desc').limit(5).get();
    
    const messages = messagesQuery.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate().toISOString()
    }));

    console.log(`[DEBUG] Found ${messages.length} messages`);

    // Check meta info
    const metaRef = customerRef.collection('meta').doc('info');
    const metaDoc = await metaRef.get();
    const metaData = metaDoc.exists ? metaDoc.data() : null;

    return NextResponse.json({
      found: true,
      phone,
      customerData,
      messagesCount: messages.length,
      recentMessages: messages,
      metaData
    });

  } catch (error) {
    console.error('[DEBUG] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
