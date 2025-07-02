import * as z from "zod";
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


// =============================================================
// HILIGHT: GANTI BAGIAN FORM DATA DENGAN INI
// =============================================================

// 1. Definisikan skema Zod untuk validasi form
export const incomeFormSchema = z.object({
  date: z.date({
    required_error: "Tanggal pemasukan wajib diisi.",
  }),
  category: z.enum(INCOME_CATEGORIES, {
    required_error: "Kategori pemasukan wajib diisi.",
  }),
  description: z.string().min(1, "Deskripsi wajib diisi."),
  amount: z.preprocess(
    (val) => Number(String(val).replace(/[^0-9]/g, '')),
    z.number().positive("Jumlah harus angka positif.")
  ),
  paymentMethod: z.enum(INCOME_PAYMENT_METHODS).optional(),
  receiptUrl: z.string().url("URL tidak valid.").optional().or(z.literal('')),
  notes: z.string().optional(),
});

// 2. Buat tipe FormData secara otomatis dari skema Zod
export type IncomeFormData = z.infer<typeof incomeFormSchema>;
