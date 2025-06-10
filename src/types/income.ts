
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

export const INCOME_PAYMENT_METHODS = ["Tunai", "Transfer Bank"] as const;
export type IncomePaymentMethod = typeof INCOME_PAYMENT_METHODS[number];

export interface IncomeEntry {
  id: string; // Firestore document ID
  date: Timestamp; // Tanggal pemasukan
  category: IncomeCategory;
  description: string; // Deskripsi pemasukan
  amount: number; // Jumlah pemasukan
  paymentMethod?: IncomePaymentMethod; // Metode penerimaan
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
  paymentMethod?: IncomePaymentMethod;
  receiptUrl?: string;
  notes?: string;
}

