
import type { Timestamp } from 'firebase/firestore';

export const STAFF_ROLES = ["Teknisi", "Kasir", "Admin", "Manajer", "Lainnya"] as const;
export type StaffRole = typeof STAFF_ROLES[number];

export interface StaffMember {
  id: string; // Firestore document ID
  name: string;
  role: StaffRole;
  phone?: string;
  baseSalary?: number;
  profitSharePercentage?: number; // 0-100
  photoUrl?: string;
  daysOff?: number[]; // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Type untuk data form saat membuat staf baru
export interface NewStaffMemberData {
  name: string;
  role: StaffRole;
  phone?: string;
  baseSalary?: number;
  profitSharePercentage?: number;
  photoUrl?: string;
  daysOff?: number[];
}
