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
  const db = getFirebaseAdmin().firestore();
  try {
    await db.collection(SESSIONS_COLLECTION).doc(senderNumber).set(updates, { merge: true });
  } catch (err) {
    console.error('[updateSession] Gagal update sesi:', err);
  }
}
