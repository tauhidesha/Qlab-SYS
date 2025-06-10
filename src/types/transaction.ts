
import type { Timestamp } from 'firebase/firestore';
import type { LoyaltyReward } from './loyalty'; // Import LoyaltyReward

export interface TransactionItem {
  id: string; // Unique ID for this line item in the transaction (e.g., uuid)
  catalogItemId: string; // ID of the service/product from the catalog
  name: string;
  price: number;
  quantity: number;
  type: 'service' | 'product' | 'food_drink' | 'other' | 'reward_merchandise'; // Added 'reward_merchandise'
  staffName?: string; // Staf yang terkait dengan item layanan spesifik jika perlu
  pointsAwardedPerUnit: number; // Poin yang diberikan untuk satu unit item ini
}

export interface Transaction {
  id: string; // ID dokumen Firestore
  clientId?: string; // Opsional, jika pelanggan terdaftar
  customerName: string; // Nama pelanggan (bisa dari klien terdaftar atau manual)
  queueItemId?: string; // Opsional, jika transaksi berasal dari antrian
  status: 'open' | 'draft' | 'paid' | 'cancelled';
  items: TransactionItem[];
  serviceStaffName?: string; // Staf utama yang menangani layanan dari antrian
  transactionStaffName?: string; // Staf yang memproses transaksi di POS (bisa beda)
  subtotal: number;
  discountAmount: number; // Nominal diskon (bisa dari manual atau reward)
  discountPercentage: number; // Persentase diskon (0-100)
  total: number;
  paymentMethod?: string;
  notes?: string;
  pointsRedeemed?: number; // Jumlah poin yang ditukarkan klien untuk transaksi ini
  pointsRedeemedValue?: number; // Nilai diskon (Rp) dari poin yang ditukarkan (bisa dari reward)
  redeemedReward?: { // Information about the redeemed reward
    id: string;
    name: string;
    type: LoyaltyReward['type'];
    value: string | number; // Original rewardValue
  };
  pointsEarnedInThisTx?: number; // Jumlah poin yang diperoleh dari transaksi ini (untuk struk)
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paidAt?: Timestamp;
}

    
