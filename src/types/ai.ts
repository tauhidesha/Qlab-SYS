// @file: src/types/ai.ts (Versi Refactored & Terstruktur)

// Tipe Bantuan untuk kejelasan
export interface RepaintDetail {
  color?: string;
  specific_part?: string;
}

export interface BookingState {
  serviceName?: string;
  vehicleInfo?: string;
  bookingDate?: string;
  bookingTime?: string;
  estimatedDurationMinutes?: number;
}

// ServiceInquiry interface
export interface ServiceInquiry {
  bookingConfirmed?: boolean;
  lastMentionedService?: string[];
  pendingService?: string;
  pendingCategory?: 'coating' | 'detailing' | 'cuci' | 'repaint';
  lastMentionedMotor?: string;
  lastMotorSize?: string;
  lastOfferedServices?: string[];
  bookingState?: BookingState;
  pendingBookingDate?: string;
  pendingBookingTime?: string;
  repaintSize?: 'S' | 'M' | 'L' | 'XL';
  serviceSize?: 'S' | 'M' | 'L' | 'XL';
  repaintSurcharge?: { effect: string; surcharge: number };
  lastBooking?: {
    customerPhone: string;
    serviceName: string;
    bookingDate: string;
    bookingTime: string;
    vehicleInfo: string;
    createdAt: number;
  };
  repaintDetails?: { [serviceName: string]: RepaintDetail };
  cartContext?: string;
}

// Existing interfaces
export interface MappedServiceItem {
  serviceName: string;
  status: string;
  missingInfo: string[];
  notes: string;
  promo?: boolean;
}
// PATCH: Allow lastInteraction to be an object with type property
export interface LastInteractionObject {
  type: string;
  at: number;
  context?: any;
}

// ==================================================================
// Interface Session Utama yang Sudah Disempurnakan
// ==================================================================
export interface Session {
  inquiry?: any;
  // --- Follow-up State untuk cron follow-up WhatsApp ---
  followUpState?: {
    level: number;
    flaggedAt: number;
    context: any;
  };
  // --- Info Pengguna ---
  senderNumber: string; // WAJIB ADA: Menyelesaikan masalah no HP hilang
  senderName?: string;

  // --- State Alur Utama ---
  flow?: 'general' | 'booking' | 'promo';
  lastInteraction: LastInteractionObject;
  snoozeUntil?: number;
  priceQuotePresented?: boolean;
  awaitingClarification?: boolean;
  // --- Info Keranjang & Layanan ---
  cartServices: string[];
  // Gabungkan semua detail dari ServiceInquiry ke sini
  lastMentionedMotor?: string;
  motorSize?: 'S' | 'M' | 'L' | 'XL';
  repaintDetails?: { [serviceName: string]: RepaintDetail };

  // --- Info Promo ---
  promoFlow?: {
    pendingClarifications: any;
    promoDetails: PromoBundleResult;
    isActive: boolean;
  };
  
  // --- Riwayat Percakapan (untuk AI) ---
  chatHistory?: { role: string; content: string; tool_calls?: any[] }[];

  // --- State lain-lain ---
  // Anda bisa tambahkan properti lain di sini jika perlu
  // contoh: followUpState, lastBooking, dll.
  lastAssistantMessage?: string; // <-- TAMBAHAN BARU

  threadId?: string; // <-- TAMBAHAN PENTING
}


// --- Tipe Data Lainnya (tidak berubah) ---

export interface MappedServiceResult {
  reasoning: string;
  requestedServices: MappedServiceItem[];
  promoMentioned?: boolean;
  promoExplained?: boolean;
}

// Tambahkan definisi PromoBundleResult agar bisa dipakai di Session
export interface PromoBundleResult {
  isPromoAvailable: boolean;
  promoDetails?: {
    name?: string;
    services?: string[];
    promoPrice?: number;
  };
  motor_model?: string;
  note?: string;
  summary?: string;
  terms?: string[];
}
