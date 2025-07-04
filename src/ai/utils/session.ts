'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// --- TIPE DATA RESMI (SUMBER KEBENARAN) ---
// FIX: Definisikan tipe kategori yang spesifik dan ekspor
export type ServiceCategory = 'coating' | 'detailing' | 'cuci' | 'repaint';

export interface BookingState {
    serviceName?: string;
    vehicleInfo?: string;
    bookingDate?: string;
    bookingTime?: string;
}
export interface ServiceInquiry {
    lastMentionedService?: string;
    pendingService?: string;
    pendingCategory?: ServiceCategory; // FIX: Gunakan tipe yang spesifik
    lastMentionedMotor?: string;
    lastOfferedServices?: string[];
    bookingState?: BookingState;
}
export interface SessionData {
    // --- FIELD ANDA YANG SUDAH ADA (TETAP AMAN) ---
    flow: 'general' | 'booking' | 'awaiting_booking_form';
    inquiry: ServiceInquiry;
    snoozeUntil?: number;
    lastInteraction: Timestamp;

    // --- TAMBAHAN UNTUK FITUR FOLLOW-UP ---
    followUpState?: {
        level: number;      // Tingkatan follow-up (1-7)
        flaggedAt: number;  // Timestamp kapan ditandai (pakai Date.now())
        context: string;    // Topik terakhir, misal: "Coating Motor Glossy"
    } | null; // Kita buat bisa null agar mudah dihapus
}
// ---------------------------------------------

const SESSIONS_COLLECTION = 'zoya_sessions';
const SESSION_TIMEOUT_MINUTES = 60;

/**
 * Mengambil sesi pengguna dari Firestore.
 */
export async function getSession(senderNumber: string): Promise<SessionData | null> {
  const sessionDocRef = doc(db, SESSIONS_COLLECTION, senderNumber);
  try {
    const docSnap = await getDoc(sessionDocRef);

    if (docSnap.exists()) {
      const session = docSnap.data() as SessionData;
      const now = Timestamp.now();
      const lastInteraction = session.lastInteraction || now;
      const diffMinutes = (now.seconds - lastInteraction.seconds) / 60;

      if (diffMinutes > SESSION_TIMEOUT_MINUTES) {
        console.log(`[SESSION] Sesi untuk ${senderNumber} sudah kadaluwarsa. Membuat sesi baru.`);
        return null;
      }
      return session;
    }
    return null;
  } catch (error) {
    console.error(`[SESSION] Gagal mengambil sesi untuk ${senderNumber}:`, error);
    return null;
  }
}

/**
 * Membuat atau memperbarui sesi pengguna di Firestore.
 */
export async function updateSession(senderNumber: string, updates: Partial<SessionData>): Promise<void> {
  const sessionDocRef = doc(db, SESSIONS_COLLECTION, senderNumber);
  try {
    const dataToUpdate = {
      ...updates,
      lastInteraction: serverTimestamp(),
    };
    await setDoc(sessionDocRef, dataToUpdate, { merge: true });
    console.log(`[SESSION] Sesi untuk ${senderNumber} di-update dengan:`, updates);
  } catch (error) {
    console.error(`[SESSION] Gagal memperbarui sesi untuk ${senderNumber}:`, error);
  }
}
