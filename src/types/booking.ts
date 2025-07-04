
import type { Timestamp } from 'firebase/firestore';
import { z } from 'zod'; // Impor z dari genkit atau zod langsung

export type BookingStatus = 'Pending' | 'Confirmed' | 'In Queue' | 'Completed' | 'Cancelled' | 'Rescheduled';

export interface BookingEntry {
  id?: string; // Firestore document ID
  customerName: string;
  customerPhone?: string;
  clientId?: string;
  serviceId: string; // ID dari katalog 'services'
  serviceName: string; // Nama layanan (bisa termasuk varian)
  category: 'detailing' | 'coating' | 'repaint' | 'other'; 
  vehicleInfo: string;
  bookingDateTime: Timestamp; // Tanggal dan waktu booking
  estimatedDuration?: string;
  status: BookingStatus;
  notes?: string;
  queueItemId?: string; // ID item di antrian jika sudah masuk
  createdAt: Timestamp;
  updatedAt: Timestamp;
  source?: 'WhatsApp' | 'Manual' | 'Online';
}

// Schema untuk input CreateBookingTool
export const CreateBookingToolInputSchema = z.object({
  customerName: z.string().describe("Nama lengkap pelanggan."),
  customerPhone: z.string().optional().describe("Nomor telepon pelanggan (jika ada, format internasional mis. 628xxxx)."),
  clientId: z.string().optional().describe("ID klien terdaftar (jika ada)."),
  serviceId: z.string().describe("ID layanan/produk yang dibooking dari katalog."),
  serviceName: z.string().describe("Nama layanan/produk yang dibooking (termasuk varian jika ada)."),
  vehicleInfo: z.string().describe("Informasi kendaraan (mis. 'Honda Vario (B 1234 XYZ)')."),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal booking dalam format YYYY-MM-DD.").describe("Tanggal booking (YYYY-MM-DD)."),
  bookingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Waktu booking dalam format HH:MM (24 jam).").describe("Waktu booking (HH:MM, 24 jam)."),
  estimatedDuration: z.string().optional().describe("Estimasi durasi layanan."),
  notes: z.string().optional().describe("Catatan tambahan untuk booking."),
});
export type CreateBookingToolInput = z.infer<typeof CreateBookingToolInputSchema>;

// Schema untuk output CreateBookingTool
export const CreateBookingToolOutputSchema = z.object({
  success: z.boolean().describe("Apakah pembuatan booking berhasil atau tidak."),
  bookingId: z.string().optional().describe("ID booking yang baru dibuat jika berhasil."),
  queueItemId: z.string().optional().describe("ID item antrian jika booking untuk hari ini dan berhasil ditambahkan ke antrian."),
  message: z.string().describe("Pesan hasil proses booking (mis. konfirmasi atau error)."),
  status: z.string().optional().describe("Status booking setelah dibuat."),
});
export type CreateBookingToolOutput = z.infer<typeof CreateBookingToolOutputSchema>;

// GANTI BLOK LAMA DENGAN INI SEMUA

// 1. Definisikan SKEMA ZOD untuk form manual di UI
export const manualBookingFormSchema = z.object({
  customerName: z.string().min(1, 'Nama pelanggan wajib diisi.'),
  clientId: z.string().optional(),
  vehicleInfo: z.string().min(1, 'Info kendaraan wajib diisi.'),
  serviceId: z.string().min(1, 'Layanan wajib dipilih.'),
  variantId: z.string().optional(),
  bookingDate: z.date({
    required_error: "Tanggal booking wajib diisi.",
  }),
  bookingTime: z.string().min(1, 'Jam booking wajib diisi.'),
  notes: z.string().optional(),
  source: z.enum(['Manual', 'WhatsApp', 'Online']),
});

// 2. Tipe sekarang dibuat OTOMATIS dari skema di atas
export type ManualBookingFormData = z.infer<typeof manualBookingFormSchema>;
