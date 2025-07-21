// @file: src/types/cart-agent.ts
import type { Session } from '@/types/ai';

export interface CartAgentInput {
  session: Session;
}

export interface CartAgentResult {
  priceDetails: { name: string; price: number }[];
  promoApplied?: { name: string; discount: number };
  surcharge: number;
  total: number;
  replyMessage: string;
}
