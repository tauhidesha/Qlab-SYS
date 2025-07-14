import { db } from '@/lib/firebase';
import { getDoc, updateDoc, deleteField, doc } from 'firebase/firestore';
import { sendWhatsAppMessage } from '@/services/whatsappService';

const BOS_MAMAT_NUMBER = process.env.BOS_MAMAT_NUMBER;

if (!BOS_MAMAT_NUMBER) {
  console.error('[handleHumanReplyForwarding] BOS_MAMAT_NUMBER belum diset di .env');
}

export async function handleHumanReplyForwarding(senderNumber: string, messageBody: string): Promise<boolean> {
  if (!BOS_MAMAT_NUMBER || !senderNumber.includes(BOS_MAMAT_NUMBER)) return false;

  console.log(`[HumanForwarding] Deteksi balasan dari Bos Mamat: "${messageBody}"`);

  // === 1. Cek apakah pakai format manual ===
  const match = messageBody.match(/^#balas\s+(\d+)\s*\n([\s\S]+)/i);

  if (match) {
    const targetNumber = match[1].trim(); // 🔧 fix penting
    const replyText = match[2].trim();

    console.log(`[ManualReply] Mencoba cari sesi dengan ID: '${targetNumber}'`);

    const sessionRef = doc(db, 'zoya_sessions', targetNumber); // 🔁 koleksi diperbaiki
    const sessionSnap = await getDoc(sessionRef);

    if (!sessionSnap.exists()) {
      console.warn(`[ManualReply] Customer ${targetNumber} tidak ditemukan.`);
      return false;
    }

    await sendWhatsAppMessage(targetNumber, replyText);
    await updateDoc(sessionRef, {
      pending_human_reply: deleteField(),
      snoozeUntil: 0,
    });

    console.log(`[ManualReply] Balasan manual diteruskan ke ${targetNumber}`);
    return true;
  }

  // === 2. Kalau gak pakai format, fallback ke pointer ===
  const forwardingRef = doc(db, 'zoya_sessions', 'human_forwarding_state'); // 🔁 juga ganti
  const forwardingSnap = await getDoc(forwardingRef);
  const forwardingData = forwardingSnap.data();

  const customerNumber = forwardingData?.lastCustomerNumber;
  if (!customerNumber) {
    console.warn(`[HumanForwarding] Tidak ada customer yang sedang nunggu.`);
    return false;
  }

  const sessionRef = doc(db, 'zoya_sessions', customerNumber);
  const sessionSnap = await getDoc(sessionRef);
  const sessionData = sessionSnap.data();

  if (!sessionData?.pending_human_reply) {
    console.warn(`[HumanForwarding] Customer ${customerNumber} tidak punya pending_human_reply.`);
    return false;
  }

  await sendWhatsAppMessage(customerNumber, messageBody);
  await updateDoc(sessionRef, {
    pending_human_reply: deleteField(),
    snoozeUntil: 0,
  });

  console.log(`[HumanForwarding] Balasan diteruskan ke ${customerNumber} via pointer.`);

  await updateDoc(forwardingRef, {
    lastCustomerNumber: deleteField(),
  });

  return true;
}
