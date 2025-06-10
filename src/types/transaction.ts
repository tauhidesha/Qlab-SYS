
import type { Timestamp } from 'firebase/firestore';
import type { LoyaltyReward } from './loyalty'; 

export interface TransactionItem {
  id: string; 
  catalogItemId: string; 
  variantId?: string; // ID of the chosen variant, if any
  name: string; // Name of the product, potentially with variant name appended e.g., "Kaos Polos - Merah, L"
  price: number; // Actual price paid (variant price or base price)
  quantity: number;
  type: 'service' | 'product' | 'food_drink' | 'other' | 'reward_merchandise';
  staffName?: string; 
  pointsAwardedPerUnit: number; 
}

export interface Transaction {
  id: string; 
  clientId?: string; 
  customerName: string; 
  queueItemId?: string; 
  status: 'open' | 'draft' | 'paid' | 'cancelled';
  items: TransactionItem[];
  serviceStaffName?: string; 
  transactionStaffName?: string; 
  subtotal: number;
  discountAmount: number; 
  discountPercentage: number; 
  total: number;
  paymentMethod?: string;
  notes?: string;
  pointsRedeemed?: number; 
  pointsRedeemedValue?: number; 
  redeemedReward?: { 
    id: string;
    name: string;
    type: LoyaltyReward['type'];
    value: string | number; 
  };
  pointsEarnedInThisTx?: number; 
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paidAt?: Timestamp;
}

    