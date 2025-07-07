// File: src/ai/handlers/routeRouter.ts

import {
  detectGreeting,
  detectBookingIntent,
  detectHumanHandoverRequest,
  detectScheduleIntent,
  detectPromoIntent,
  detectGenericPriceIntent,
  mapTermToOfficialService,
  detectObjection,
} from '@/ai/utils/messageParsers';
import { parseDateTime } from '../utils/dateTimeParser';
import { searchKnowledgeBase } from '@/ai/tools/searchKnowledgeBaseTool';
import type { SessionData as Session } from '@/ai/utils/session';

export async function determineRoute(
  message: string,
  session: Session | null,
): Promise<string> {
  const msg = message.toLowerCase().trim();

  // === PRIORITAS 1: Kondisi Sesi Spesifik (Paling Penting) ===
  if (session?.flow === 'awaiting_booking_form') {
    return 'booking_form_submission';
  }
  if (
    (session?.lastRoute === 'booking_intent' || session?.lastRoute === 'schedule') &&
    detectBookingIntent(msg)
  ) {
    if (session?.inquiry?.bookingState || (session?.inquiry?.pendingBookingDate && session?.inquiry?.pendingBookingTime)) {
        return 'booking_confirmation';
    }
  }

  // === PRIORITAS 2: Detektor Eksplisit & Niat Utama ===
  if (detectHumanHandoverRequest(msg)) return 'human_handover';
  if (detectGreeting(msg)) return 'greeting';
  
  // --- INI PERBAIKAN UTAMANYA ---
  // Dahulukan pengecekan niat yang PALING SPESIFIK
  
  // Cek harga spesifik motor (lebih penting dari promo umum)
  try {
    const allModels = (await import('@/../docs/daftarUkuranMotor.json')).default.map(
      (m: any) => m.model.toLowerCase()
    );
    const containsPriceQuery = ['berapa', 'harga', 'price', 'ongkos', 'biaya'].some(p => msg.includes(p));
    if (allModels.some(model => msg.includes(model)) && containsPriceQuery) {
      return 'price_specific_motor';
    }
  } catch (err) {
    console.warn('[determineRoute] Gagal load daftar motor:', err);
  }

  // Baru cek niat lain yang lebih umum
  if (detectPromoIntent(msg)) return 'promo';
  if (detectScheduleIntent(msg)) return 'schedule';
  if (detectObjection(msg)) return 'objection';
  
  if (detectGenericPriceIntent(msg)) return 'price_generic';
  if (mapTermToOfficialService(msg)) return 'service_specific';

  // Cek niat booking (yang lebih umum) setelah yang lain
  const parsedDateTime = await parseDateTime(message);
  if (parsedDateTime.date && parsedDateTime.time) {
    return 'booking_intent';
  }
  if (detectBookingIntent(msg)) return 'booking_intent';
  // --- AKHIR PERBAIKAN ---
  
  // === PRIORITAS 3: Konteks dari Percakapan Sebelumnya ===
  if (session?.lastRoute === 'promo_bundle') return 'promo';
  if (session?.lastRoute === 'service_specific' && msg.includes('berapa')) return 'price_specific_motor';

  // === PRIORITAS 4: Cek Knowledge Base ===
  const qnaAnswer = await searchKnowledgeBase(message);
  if (qnaAnswer) {
    return 'knowledge_base_query';
  }

  // === PRIORITAS 5 (FALLBACK) ===
  return 'ai_agent';
}
