// File: src/ai/utils/bookingSlotUtils.ts

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Booking {
  bookingDateTime: Date;
  estimatedDuration: number; // in minutes
  category: string;
  status: string;
}

export interface SlotCheckResult {
  available: boolean;
  conflictReason?: string;
  overnightWarning?: string;
}

export function calculateFinishTime(startDate: Date, durationMinutes: number): Date {
  return new Date(startDate.getTime() + durationMinutes * 60000);
}

export function getOvernightWarning(startDate: Date, durationMinutes: number, isRepaint: boolean): string | undefined {
  if (isRepaint) return undefined;
  const finishDate = calculateFinishTime(startDate, durationMinutes);
  const finishHour = finishDate.getHours();
  const finishMinute = finishDate.getMinutes();
  if (finishHour > 17 || (finishHour === 17 && finishMinute > 0)) {
    const finishTimeString = `${finishHour.toString().padStart(2, '0')}:${finishMinute.toString().padStart(2, '0')}`;
    return `Pengerjaan diperkirakan selesai jam ${finishTimeString}, melebihi jam operasional (17:00). Ada kemungkinan motor harus menginap.`;
  }
  return undefined;
}

export async function getRepaintBookingsOverlap(dates: string[]): Promise<Booking[]> {
  const bookingsRef = collection(db, 'bookings');
  const q = query(
    bookingsRef,
    where('status', 'in', ['pending', 'Confirmed', 'In Queue', 'In Progress']),
    where('bookingDate', 'in', dates)
  );
  const snapshot = await getDocs(q);
  // Filter ulang di client agar serviceName benar-benar mengandung 'repaint' (case-insensitive)
  return snapshot.docs
    .map(doc => {
      const data = doc.data();
      return {
        bookingDateTime: data.bookingDateTime?.toDate?.() ?? new Date(),
        estimatedDuration: parseInt(data.estimatedDuration || '7200', 10),
        category: data.category || '',
        status: data.status,
        serviceName: data.serviceName || '',
      };
    })
    .filter(b => b.status && b.serviceName && b.serviceName.toLowerCase().includes('repaint'));
}

export async function getDailyBookings(date: string, service: string): Promise<Booking[]> {
  const bookingsRef = collection(db, 'bookings');
  const q = query(
    bookingsRef,
    where('bookingDate', '==', date),
    where('status', 'in', ['pending', 'Confirmed', 'In Queue', 'In Progress'])
  );
  const snapshot = await getDocs(q);
  // Filter di client agar serviceName mengandung kata kunci service (case-insensitive)
  const keyword = service.toLowerCase();
  return snapshot.docs
    .map(doc => {
      const data = doc.data();
      return {
        bookingDateTime: data.bookingDateTime?.toDate?.() ?? new Date(),
        estimatedDuration: parseInt(data.estimatedDuration || '180', 10),
        category: data.category || '',
        status: data.status,
        serviceName: data.serviceName || '',
      };
    })
    .filter(b => b.status && b.serviceName && b.serviceName.toLowerCase().includes(keyword));
}

export function getServiceCategory(serviceName: string): 'repaint' | 'detailing' | 'coating' | 'other' {
  const name = serviceName.toLowerCase();
  if (name.includes('repaint')) return 'repaint';
  if (name.includes('detailing')) return 'detailing';
  if (name.includes('coating')) return 'coating';
  return 'other';
}
