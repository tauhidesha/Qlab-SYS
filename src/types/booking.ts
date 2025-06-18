
import type { Timestamp } from 'firebase/firestore';

export type BookingStatus = 'Pending' | 'Confirmed' | 'In Queue' | 'Completed' | 'Cancelled' | 'Rescheduled';

export interface BookingEntry {
  id?: string; // Firestore document ID
  customerName: string;
  customerPhone?: string; // Nomor HP pelanggan
  clientId?: string; // Opsional, jika pelanggan terdaftar
  
  serviceId: string;
  serviceName: string; // Nama layanan (bisa termasuk varian)
  vehicleInfo: string; // Info kendaraan pelanggan

  bookingDateTime: Timestamp; // Tanggal dan waktu booking
  estimatedDuration?: string; // Estimasi durasi layanan (diambil dari layanan)
  
  status: BookingStatus;
  notes?: string; // Catatan tambahan untuk booking

  queueItemId?: string; // ID item di antrian jika sudah masuk
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  source?: 'WhatsApp' | 'Manual' | 'Online'; // Sumber booking
}

export interface CreateBookingToolInput {
  customerName: string;
  customerPhone?: string;
  clientId?: string;
  serviceId: string;
  serviceName: string;
  vehicleInfo: string;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:MM
  estimatedDuration?: string;
  notes?: string;
}

export interface CreateBookingToolOutput {
  success: boolean;
  bookingId?: string;
  queueItemId?: string;
  message: string; // e.g., "Booking berhasil dibuat dan ditambahkan ke antrian." atau "Booking untuk [tanggal] berhasil."
  status?: BookingStatus;
}

// Untuk form booking manual
export interface ManualBookingFormData {
  customerName: string;
  clientId?: string;
  vehicleInfo: string;
  serviceId: string;
  variantId?: string;
  bookingDate: Date;
  bookingTime: string; // HH:MM
  notes?: string;
  source: 'Manual' | 'WhatsApp' | 'Online'; // Untuk membedakan sumber inputan
}
