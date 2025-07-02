import * as z from "zod";
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
  "Setoran Tunai ke Bank",
  "Lain-lain"
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];

export const PAYMENT_SOURCES = ["Kas Tunai", "Transfer Bank"] as const;
export type PaymentSource = typeof PAYMENT_SOURCES[number];
export interface Expense {
  id: string; // Firestore document ID
  date: Timestamp; // Tanggal pengeluaran
  category: ExpenseCategory;
  description: string; // Deskripsi pengeluaran
  amount: number; // Jumlah pengeluaran
  receiptUrl?: string; // Opsional, URL ke struk/bukti pembayaran
  notes?: string; // Catatan tambahan
  bankDestination?: string; // Opsional, khusus untuk setoran tunai
  paymentSource?: PaymentSource; // Sumber pembayaran
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
export const expenseFormSchema = z.object({
  date: z.date({ required_error: "Tanggal pengeluaran diperlukan" }),
  category: z.enum(EXPENSE_CATEGORIES, { required_error: "Kategori pengeluaran diperlukan" }),
  description: z.string().min(1, "Deskripsi pengeluaran diperlukan").max(200, "Deskripsi maksimal 200 karakter"),
  amount: z.preprocess(
    (val) => {
      const strVal = String(val).replace(/[^0-9.-]+/g, '');
      const num = parseFloat(strVal);
      return isNaN(num) ? undefined : num;
    },
    z.number({ required_error: "Jumlah pengeluaran diperlukan", invalid_type_error: "Jumlah harus berupa angka" })
     .positive("Jumlah pengeluaran harus angka positif")
  ),
  paymentSource: z.enum(PAYMENT_SOURCES).optional(),
  receiptUrl: z.string().url("URL struk tidak valid. Pastikan menyertakan http:// atau https://").optional().or(z.literal('')),
  notes: z.string().max(500, "Catatan maksimal 500 karakter").optional(),
  bankDestination: z.string().max(100, "Nama bank maksimal 100 karakter").optional(),
});

export type ExpenseFormData = z.infer<typeof expenseFormSchema>;