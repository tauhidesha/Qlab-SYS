
import type { Timestamp } from 'firebase/firestore';

export interface DirectMessage {
  id?: string; // Firestore document ID, optional as it's auto-generated
  customerId?: string; // Optional, if linked to a client in 'clients' collection
  customerName?: string; // Denormalized for display convenience
  senderNumber: string; // Raw sender number from WhatsApp (after basic formatting like '62xxx')
  text: string;
  sender: 'customer' | 'user' | 'ai'; // 'customer' for incoming, 'user' for CS manual reply, 'ai' for AI auto-reply
  timestamp: Timestamp;
  read?: boolean; // Optional: for CS to mark as read
}
