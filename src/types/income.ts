
import type { Timestamp } from 'firebase/firestore';

export const INCOME_CATEGORIES = [
  "Sewa Tempat/Alat",
  "Penjualan Aset Bekas",
  "Jasa Konsultasi (Non-Bengkel)",
  "Pendapatan Bunga Bank",
  "Kemitraan/Sponsorship",
  "Lain-lain"
] as const;

export type IncomeCategory = typeof INCOME_CATEGORIES[number];

export interface IncomeEntry {
  id: string; // Firestore document ID
  date: Timestamp; // Tanggal pemasukan
  category: IncomeCategory;
  description: string; // Deskripsi pemasukan
  amount: number; // Jumlah pemasukan
  receiptUrl?: string; // Opsional, URL ke bukti pemasukan
  notes?: string; // Catatan tambahan
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Type untuk data form saat membuat/mengedit pemasukan
export interface IncomeFormData {
  date: Date; // Menggunakan JS Date di form, akan dikonversi ke Timestamp saat simpan
  category: IncomeCategory;
  description: string;
  amount: number;
  receiptUrl?: string;
  notes?: string;
}
