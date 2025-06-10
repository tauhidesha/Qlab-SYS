
import type { Timestamp } from 'firebase/firestore';

export const EXPENSE_CATEGORIES = [
  "Operasional", 
  "Pembelian Stok/Barang", 
  "Gaji & Komisi Staf", 
  "Peralatan & Perlengkapan", 
  "Pemasaran & Promosi", 
  "Listrik, Air, Internet",
  "Transportasi & Pengiriman",
  "Perbaikan & Pemeliharaan",
  "Pajak & Lisensi",
  "Setoran Tunai ke Bank", // Kategori baru ditambahkan
  "Lain-lain"
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];

export interface Expense {
  id: string; // Firestore document ID
  date: Timestamp; // Tanggal pengeluaran
  category: ExpenseCategory;
  description: string; // Deskripsi pengeluaran
  amount: number; // Jumlah pengeluaran
  receiptUrl?: string; // Opsional, URL ke struk/bukti pembayaran
  notes?: string; // Catatan tambahan
  bankDestination?: string; // Opsional, khusus untuk setoran tunai
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Type untuk data form saat membuat/mengedit pengeluaran
export interface ExpenseFormData {
  date: Date; // Menggunakan JS Date di form, akan dikonversi ke Timestamp saat simpan
  category: ExpenseCategory;
  description: string;
  amount: number;
  receiptUrl?: string;
  notes?: string;
  bankDestination?: string; // Opsional, khusus untuk setoran tunai
}

