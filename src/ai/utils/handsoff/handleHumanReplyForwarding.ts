import { db } from '@/lib/firebase-admin';
import admin from 'firebase-admin';
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

    const sessionRef = db.collection('zoya_sessions').doc(targetNumber);
    const sessionSnap = await sessionRef.get();

    if (!sessionSnap.exists) {
      console.warn(`[ManualReply] Customer ${targetNumber} tidak ditemukan.`);
      return false;
    }

    await sendWhatsAppMessage(targetNumber, replyText);
    await sessionRef.update({
      pending_human_reply: admin.firestore.FieldValue.delete(),
      snoozeUntil: 0,
    });

    console.log(`[ManualReply] Balasan manual diteruskan ke ${targetNumber}`);
    return true;
  }

  // === 2. Kalau gak pakai format, fallback ke pointer ===
  const forwardingRef = db.collection('zoya_sessions').doc('human_forwarding_state');
  const forwardingSnap = await forwardingRef.get();
  const forwardingData = forwardingSnap.data();

  const customerNumber = forwardingData?.lastCustomerNumber;
  if (!customerNumber) {
    console.warn(`[HumanForwarding] Tidak ada customer yang sedang nunggu.`);
    return false;
  }

  const sessionRef = db.collection('zoya_sessions').doc(customerNumber);
  const sessionSnap = await sessionRef.get();
  const sessionData = sessionSnap.data();

  if (!sessionData?.pending_human_reply) {
    console.warn(`[HumanForwarding] Customer ${customerNumber} tidak punya pending_human_reply.`);
    return false;
  }

  await sendWhatsAppMessage(customerNumber, messageBody);
  await sessionRef.update({
    pending_human_reply: admin.firestore.FieldValue.delete(),
    snoozeUntil: 0,
  });

  console.log(`[HumanForwarding] Balasan diteruskan ke ${customerNumber} via pointer.`);

  await forwardingRef.update({
    lastCustomerNumber: admin.firestore.FieldValue.delete(),
  });

  return true;
}
