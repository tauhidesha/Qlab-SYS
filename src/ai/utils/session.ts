// @file: src/ai/utils/session.ts
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import type { MappedServiceResult } from '../handlers/routes/lib/classifiers/mapTermToOfficialService';

// --- TIPE DATA RESMI (SUMBER KEBENARAN) ---
export type ServiceCategory = 'coating' | 'detailing' | 'cuci' | 'repaint';

export interface BookingState {
  serviceName?: string;
  vehicleInfo?: string;
  bookingDate?: string;
  bookingTime?: string;
  estimatedDurationMinutes?: number;
}

export interface ServiceInquiry {
  lastMentionedService?: MappedServiceResult; // ✅ ubah dari string ke MappedServiceResult
  pendingService?: string;
  pendingCategory?: ServiceCategory;
  lastMentionedMotor?: string;
  lastOfferedServices?: string[];
  bookingState?: BookingState;
  pendingBookingDate?: string;
  pendingBookingTime?: string;

  repaintSize?: 'S' | 'M' | 'L' | 'XL';      // ← khusus untuk kebutuhan harga repaint
  serviceSize?: 'S' | 'M' | 'L' | 'XL';      // ← untuk coating, cuci, detailing

}

export interface SessionData {
  flow: 'general' | 'booking' | 'awaiting_booking_form';
  inquiry: ServiceInquiry;
  snoozeUntil?: number;
  lastInteraction: Timestamp;

  // Follow-up & tracking
  followUpState?: {
    level: number;
    flaggedAt: number;
    context: string;
  } | null;

  senderName?: string;
  lastRoute?: string;
}

// --- KONSTANTA ---
const SESSIONS_COLLECTION = 'zoya_sessions';
const SESSION_TIMEOUT_MINUTES = 60;

// --- UTILS ---
function removeUndefined(obj: any): any {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}

// --- AMBIL SESI PELANGGAN ---
export async function getSession(senderNumber: string): Promise<SessionData | null> {
  const sessionDocRef = doc(db, SESSIONS_COLLECTION, senderNumber);
  try {
    const docSnap = await getDoc(sessionDocRef);

    if (docSnap.exists()) {
      const session = docSnap.data() as SessionData;

      // ⛑️ PATCH: jika session lama masih simpan string di lastMentionedService, ubah ke objek
      const rawService = session?.inquiry?.lastMentionedService;
      if (typeof rawService === 'string') {
        session.inquiry.lastMentionedService = { serviceName: rawService, isAmbiguous: false };
      }

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

// --- SIMPAN / UPDATE SESI ---
export async function updateSession(senderNumber: string, updates: Partial<SessionData>): Promise<void> {
  const sessionDocRef = doc(db, SESSIONS_COLLECTION, senderNumber);
  try {
    const sanitizedUpdates = removeUndefined({
      ...updates,
      lastInteraction: serverTimestamp(),
    });

    await setDoc(sessionDocRef, sanitizedUpdates, { merge: true });

    console.log(`[SESSION] Sesi untuk ${senderNumber} di-update dengan:`, sanitizedUpdates);
  } catch (error) {
    console.error(`[SESSION] Gagal memperbarui sesi untuk ${senderNumber}:`, error);
  }
}
