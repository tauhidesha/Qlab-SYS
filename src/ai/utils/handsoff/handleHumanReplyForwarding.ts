import { getFirebaseAdmin } from '@/lib/firebase-admin';
import admin from 'firebase-admin';

// Tipe data baru untuk output
interface ForwardingInstruction {
  targetCustomerNumber: string;
  ghostwriterMessage: string;
}

/**
 * Mendeteksi pesan dari BosMat dan mengubahnya menjadi instruksi untuk Zoya.
 * @returns {Promise<ForwardingInstruction | null>} - Objek instruksi atau null.
 */
export async function handleHumanReplyForwarding(senderNumber: string, messageBody: string): Promise<ForwardingInstruction | null> {
  const BOS_MAMAT_NUMBER = process.env.BOS_MAMAT_NUMBER;
  if (!BOS_MAMAT_NUMBER || !senderNumber.includes(BOS_MAMAT_NUMBER)) {
    return null; // Bukan pesan dari BosMat, abaikan.
  }

  console.log(`[HumanForwarding] Deteksi balasan dari BosMat: "${messageBody}"`);
  
  let targetCustomerNumber: string | null = null;
  let replyText: string = messageBody;

  // Cek apakah pakai format manual #balas
  const match = messageBody.match(/^#balas\s+([0-9]+)\s*\n([\s\S]+)/i);
  if (match) {
    targetCustomerNumber = match[1].trim();
    replyText = match[2].trim();
  } else {
    // Jika tidak, gunakan pointer dari state
    const db = getFirebaseAdmin().firestore();
    const forwardingRef = db.collection('zoya_sessions').doc('human_forwarding_state');
    const forwardingSnap = await forwardingRef.get();
    targetCustomerNumber = forwardingSnap.data()?.lastCustomerNumber || null;
  }

  if (!targetCustomerNumber) {
    console.warn('[HumanForwarding] Tidak bisa menentukan target pelanggan. Pesan diabaikan.');
    return null;
  }

  // Hapus state agar tidak membalas ke orang yang sama lagi
  const db = getFirebaseAdmin().firestore();
  const sessionRef = db.collection('zoya_sessions').doc(targetCustomerNumber);
  await sessionRef.update({
    pending_human_reply: admin.firestore.FieldValue.delete(),
    snoozeUntil: 0,
  });
  await db.collection('zoya_sessions').doc('human_forwarding_state').update({
    lastCustomerNumber: admin.firestore.FieldValue.delete(),
  });

  // BUAT PERINTAH UNTUK ZOYA, BUKAN MENGIRIM PESAN
  const ghostwriterMessage = `[INSTRUKSI DARI BOSMAT]: Tolong sampaikan pesan berikut ke pelanggan dengan gaya bahasamu yang santai dan ramah: "${replyText}"`;
  
  return {
    targetCustomerNumber,
    ghostwriterMessage,
  };
}
