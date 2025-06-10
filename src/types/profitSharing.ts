
import type { Timestamp } from 'firebase/firestore';

export interface DailyProfitShareEntry {
  id: string; // Firestore document ID
  staffId: string;
  staffName: string;
  date: string; // YYYY-MM-DD format
  staffDailyRevenue: number;
  profitSharePercentage: number; // The percentage used for this specific entry (could be overridden from staff profile)
  profitShareAmount: number; // Calculated: staffDailyRevenue * (profitSharePercentage / 100)
  status: 'Belum Dibayar' | 'Dibayar';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paidAt?: Timestamp;
}

// This can be used for form data before saving to Firestore or for new entries
export interface DailyProfitShareFormData {
  staffId: string;
  staffName: string;
  date: string;
  staffDailyRevenue: number | string; // string from input, number for storage
  profitSharePercentage: number | string; // string from input, number for storage
}
