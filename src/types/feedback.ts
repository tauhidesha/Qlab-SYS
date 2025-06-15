
import type { Timestamp } from 'firebase/firestore';

export interface FeedbackEntry {
  id?: string; // Firestore document ID
  transactionId: string;
  rating?: number; // e.g., 1-5
  suggestion: string;
  customerName?: string; // Optional
  customerContact?: string; // Optional (e.g., phone or email)
  createdAt: Timestamp;
  isReviewed?: boolean; // To mark if feedback has been reviewed by admin
}

export interface FeedbackFormData {
  rating?: number;
  suggestion: string;
  customerName?: string;
  customerContact?: string;
}
