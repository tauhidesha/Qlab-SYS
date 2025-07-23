// @file: src/ai/utils/session.ts
'use server';

import { db } from '../../lib/firebase-admin';
import type { LastInteractionObject, MappedServiceResult, Session } from '../../types/ai';
export type { Session };

// --- TIPE DATA RESMI (SUMBER KEBENARAN) ---


// --- KONSTANTA ---
const SESSIONS_COLLECTION = 'zoya_sessions';
// Session timeout dihapus agar follow-up tetap bisa berjalan

// --- UTILS ---
function removeUndefined(obj: any): any {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}

// --- AMBIL SESI PELANGGAN ---
export async function getSession(senderNumber: string): Promise<Session | null> {
  const sessionDocRef = db.collection(SESSIONS_COLLECTION).doc(senderNumber);
  try {
    const docSnap = await sessionDocRef.get();

    if (docSnap.exists) {
      const session = docSnap.data() as Session;

      // ⛑️ PATCH: jika session lama masih simpan string di lastMentionedService, ubah ke array of string
      const rawService = session?.inquiry?.lastMentionedService;
      if (typeof rawService === 'string') {
        session.inquiry.lastMentionedService = [rawService];
      }

      // PATCH: Migrate lastInteraction to object if still Timestamp
      if (
        session.lastInteraction &&
        (typeof session.lastInteraction !== 'object' || !('type' in session.lastInteraction))
      ) {
        session.lastInteraction = { type: 'system', at: Date.now() };
      }
      // Session timeout dihapus - session akan tetap ada untuk follow-up
      return session;
    }

    return null;
  } catch (error) {
    console.error(`[SESSION] Gagal mengambil sesi untuk ${senderNumber}:`, error);
    return null;
  }
}

// --- SIMPAN / UPDATE SESI ---
export async function updateSession(senderNumber: string, updates: Partial<Session>): Promise<void> {
  const sessionDocRef = db.collection(SESSIONS_COLLECTION).doc(senderNumber);
  try {
    const sanitizedUpdates = removeUndefined({
      ...updates,
      lastInteraction: { type: 'system', at: Date.now() },
    });

    await sessionDocRef.set(sanitizedUpdates, { merge: true });

    console.log(`[SESSION] Sesi untuk ${senderNumber} di-update dengan:`, sanitizedUpdates);
  } catch (error) {
    console.error(`[SESSION] Gagal memperbarui sesi untuk ${senderNumber}:`, error);
  }
}
