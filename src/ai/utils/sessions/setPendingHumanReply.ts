// src/ai/utils/session/setPendingHumanReply.ts

import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function setPendingHumanReply({
  customerNumber,
  question,
}: {
  customerNumber: string;
  question: string;
}) {
  const sessionRef = doc(db, 'zoya_sessions', customerNumber);
  await setDoc(
    sessionRef,
    {
      pending_human_reply: {
        question,
        timestamp: Date.now(),
      },
    },
    { merge: true }
  );

  // ✅ Simpan siapa customer yang nunggu jawaban
  const humanHelpRef = doc(db, 'zoya_sessions', 'human_forwarding_state');
  await setDoc(humanHelpRef, {
    lastCustomerNumber: customerNumber,
    updatedAt: Date.now(),
  }, { merge: true });
}
