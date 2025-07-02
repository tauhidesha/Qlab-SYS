import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function logIntent({
  sender,
  intent,
  message,
}: {
  sender?: string;
  intent: string;
  message: string;
}) {
  try {
    const intentsCollection = collection(db, 'intents'); // ✅ pakai helper modular
    await addDoc(intentsCollection, {
      sender: sender || 'unknown',
      intent,
      message,
      timestamp: Timestamp.now(),
    });
    console.log('[logIntent] Intent berhasil disimpan:', intent);
  } catch (err) {
    console.error('[logIntent] Gagal menyimpan intent:', err);
  }
}
