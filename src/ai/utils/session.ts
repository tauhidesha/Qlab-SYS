// @file: src/ai/utils/session.ts
'use server';

import { db } from '@/lib/firebase-admin';
import admin from 'firebase-admin';
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
  lastMotorSize?: string; // ← hasil ekstraksi dari getMotorSizeDetails
  lastOfferedServices?: string[];
  bookingState?: BookingState;
  pendingBookingDate?: string;
  pendingBookingTime?: string;

  repaintSize?: 'S' | 'M' | 'L' | 'XL';      // ← khusus untuk kebutuhan harga repaint
  serviceSize?: 'S' | 'M' | 'L' | 'XL';      // ← untuk coating, cuci, detailing
  repaintSurcharge?: {effect: string;surcharge: number;};
  lastBooking?: {
    customerPhone: string;
    serviceName: string;
    bookingDate: string;
    bookingTime: string;
    vehicleInfo: string;
    createdAt: number;
  };

}

export interface SessionData {
  flow: 'general' | 'booking' | 'awaiting_booking_form';
  inquiry: ServiceInquiry;
  snoozeUntil?: number;
  lastInteraction: admin.firestore.Timestamp;

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
// Session timeout dihapus agar follow-up tetap bisa berjalan

// --- UTILS ---
function removeUndefined(obj: any): any {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}

// --- AMBIL SESI PELANGGAN ---
export async function getSession(senderNumber: string): Promise<SessionData | null> {
  const sessionDocRef = db.collection(SESSIONS_COLLECTION).doc(senderNumber);
  try {
    const docSnap = await sessionDocRef.get();

    if (docSnap.exists) {
      const session = docSnap.data() as SessionData;

      // ⛑️ PATCH: jika session lama masih simpan string di lastMentionedService, ubah ke objek
      const rawService = session?.inquiry?.lastMentionedService;
      if (typeof rawService === 'string') {
        session.inquiry.lastMentionedService = { serviceName: rawService, isAmbiguous: false };
      }

      const now = admin.firestore.Timestamp.now();
      const lastInteraction = session.lastInteraction || now;
      
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
export async function updateSession(senderNumber: string, updates: Partial<SessionData>): Promise<void> {
  const sessionDocRef = db.collection(SESSIONS_COLLECTION).doc(senderNumber);
  try {
    const sanitizedUpdates = removeUndefined({
      ...updates,
      lastInteraction: admin.firestore.Timestamp.now(),
    });

    await sessionDocRef.set(sanitizedUpdates, { merge: true });

    console.log(`[SESSION] Sesi untuk ${senderNumber} di-update dengan:`, sanitizedUpdates);
  } catch (error) {
    console.error(`[SESSION] Gagal memperbarui sesi untuk ${senderNumber}:`, error);
  }
}
