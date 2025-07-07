// File: src/ai/handlers/routeHandlers.ts

import type { RouteHandlerFn } from './routes/types';

// Impor semua handler dari lokasi yang benar
import { handleGreeting } from './routes/handleGreeting';
import { handleHumanHandover } from './routes/handleHumanHandover';
import { handleBookingIntent } from './routes/handleBookingIntent';
import { handleGenericPriceInquiry } from './routes/handleGenericPriceInquiry';
import { handleServiceInquiry } from './routes/handleServiceInquiry';
import { handleFallbackResponse } from './routes/handleFallbackResponse';
import { handleBookingConfirmation } from './routes/handleBookingConfirmation';
import { handleBookingFormSubmission } from './routes/handleBookingFormSubmission';
import { handleScheduleInquiry } from './routes/handleScheduleInquiry';
import { handleKnowledgeBaseQuery } from './routes/handleKnowledgeBaseQuery';

// --- INI PERBAIKANNYA ---
// Path impor yang aneh diganti dengan path yang standar dan benar.
import { handlePromoBundleRequest } from './handlePromoBundleRequest';
// -------------------------


/**
 * PETA UTAMA (VERSI FINAL SINKRONISASI)
 */
export const routeHandlers: Record<string, RouteHandlerFn> = {
  // Rute yang sudah memiliki handler spesifik
  greeting: handleGreeting,
  human_handover: handleHumanHandover,
  booking_intent: handleBookingIntent,
  booking_confirmation: handleBookingConfirmation,
  booking_form_submission: handleBookingFormSubmission,
  promo: handlePromoBundleRequest,
  service_specific: handleServiceInquiry,
  price_generic: handleGenericPriceInquiry,
  schedule: handleScheduleInquiry,
  knowledge_base_query: handleKnowledgeBaseQuery,
  
  // Rute yang belum dibuatkan handler khusus (pakai fallback)
  objection: handleFallbackResponse,
  price_specific_motor: handleFallbackResponse,

  // Rute fallback utama ketika tidak ada yang cocok
  ai_agent: handleFallbackResponse, 
};