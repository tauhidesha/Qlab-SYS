
import type { Timestamp } from 'firebase/firestore';

export const STAFF_ROLES = ["Teknisi", "Kasir", "Admin", "Manajer", "Lainnya"] as const;
export type StaffRole = typeof STAFF_ROLES[number];

export interface StaffMember {
  id: string; // Firestore document ID
  name: string;
  role: StaffRole;
  // status: 'Aktif' | 'Tidak Aktif'; // Bisa ditambahkan nanti
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Type untuk data form saat membuat staf baru
export interface NewStaffMemberData {
  name: string;
  role: StaffRole;
}
