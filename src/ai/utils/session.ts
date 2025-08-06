// @file: src/ai/utils/session.ts
'use server';

import { getFirebaseAdmin } from '@/lib/firebase-admin';
import type { LastInteractionObject, MappedServiceResult, Session } from '../../types/ai';
export type { Session };

// --- TIPE DATA RESMI (SUMBER KEBENARAN) ---


// --- KONSTANTA ---
const SESSIONS_COLLECTION = 'zoya_sessions';
// Session timeout dihapus agar follow-up tetap bisa berjalan

// --- AMBIL SESI PELANGGAN ---
export async function getSession(senderNumber: string): Promise<Session | null> {
  console.log(`[getSession] Ambil sesi untuk: ${senderNumber}`);
  const db = getFirebaseAdmin().firestore();
  try {
    const doc = await db.collection(SESSIONS_COLLECTION).doc(senderNumber).get();
    return doc.exists ? (doc.data() as Session) : null;
  } catch (err) {
    console.error('[getSession] Gagal ambil sesi:', err);
    return null;
  }
}

// --- SIMPAN / UPDATE SESI ---
export async function updateSession(senderNumber: string, updates: Partial<Session>): Promise<void> {
  // 🔒 DEVELOPMENT: Skip saving test phone numbers to prevent Firestore pollution
  const isTestPhoneNumber = senderNumber.startsWith('628999999') || 
                           senderNumber.startsWith('628888888') ||
                           senderNumber.startsWith('628123456') ||
                           senderNumber.startsWith('628222333') ||
                           senderNumber.startsWith('628333444') ||
                           senderNumber.startsWith('628444555') ||
                           senderNumber.startsWith('628555') ||
                           senderNumber.startsWith('628666') ||
                           senderNumber.startsWith('628777') ||
                           senderNumber === 'playground_user' ||
                           /^628\d{9,12}$/.test(senderNumber) && senderNumber.includes('999');
                           
  if (isTestPhoneNumber && process.env.NODE_ENV === 'development') {
    console.log(`[updateSession] 🧪 DEVELOPMENT: Skipping save for test phone number ${senderNumber}`);
    return;
  }
  
  const db = getFirebaseAdmin().firestore();
  try {
    await db.collection(SESSIONS_COLLECTION).doc(senderNumber).set(updates, { merge: true });
  } catch (err) {
    console.error('[updateSession] Gagal update sesi:', err);
  }
}
