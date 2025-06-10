
import type { Timestamp } from 'firebase/firestore';

export interface DirectReward {
  id: string; // Firestore document ID
  triggerServiceId: string; // ID of the service that triggers the reward
  triggerServiceName: string; // Name of the trigger service (for display)
  rewardProductId: string; // ID of the product given as a reward
  rewardProductName: string; // Name of the reward product (for display)
  description?: string; // Optional description of the reward rule
  isActive: boolean; // Whether this reward rule is active
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// For form handling
export interface DirectRewardFormData {
  triggerServiceId: string;
  rewardProductId: string;
  description?: string;
  isActive: boolean;
}
