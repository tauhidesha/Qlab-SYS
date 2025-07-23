// src/ai/utils/session/setPendingHumanReply.ts

import admin from 'firebase-admin';
import { getFirebaseAdmin } from '@/lib/firebase-admin';

export async function setPendingHumanReply({
  customerNumber,
  question,
}: {
  customerNumber: string;
  question: string;
}) {
  const db = getFirebaseAdmin().firestore();
  const sessionRef = db.collection('zoya_sessions').doc(customerNumber);
  await sessionRef.set({
    pending_human_reply: {
      question,
      timestamp: Date.now(),
    },
  }, { merge: true });

  // ✅ Simpan siapa customer yang nunggu jawaban
  const humanHelpRef = db.collection('zoya_sessions').doc('human_forwarding_state');
  await humanHelpRef.set({
    lastCustomerNumber: customerNumber,
    updatedAt: Date.now(),
  }, { merge: true });
}
