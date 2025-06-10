
export interface LoyaltyReward {
  id: string; // Unique ID for the reward
  name: string; // e.g., "Gantungan Kunci QLAB Keren"
  description?: string; // Optional description
  pointsRequired: number; // How many points to redeem
  type: 'merchandise' | 'discount_transaction'; // Type of reward
  rewardValue: string | number; // For 'merchandise', it's the item name. For 'discount_transaction', it's the discount amount (number).
  isActive: boolean; // To enable/disable the reward
  // Future fields: imageUrl, stock, serviceProductId (for specific service discounts/freebies)
}
