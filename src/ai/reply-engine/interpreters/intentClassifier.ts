// File: src/ai/reply-engine/interpreters/intentClassifier.ts

// --- PERBAIKAN DI SINI ---
// Path diubah agar menunjuk ke file messageParsers.ts yang terpusat
import {
  detectGreeting,
  detectBookingIntent,
  detectGenericPriceIntent,
  detectHumanHandoverRequest,
} from '@/ai/utils/messageParsers';
// -------------------------

export type IntentType =
  | 'greeting'
  | 'booking'
  | 'price_generic'
  | 'handover'
  | 'unknown';

export function classifyIntent(message: string): IntentType {
  const msg = message.toLowerCase().trim();

  if (detectGreeting(msg)) return 'greeting';
  if (detectBookingIntent(msg)) return 'booking';
  if (detectGenericPriceIntent(msg)) return 'price_generic';
  if (detectHumanHandoverRequest(msg)) return 'handover';

  return 'unknown';
}
