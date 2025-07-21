// BookingState interface
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
  repaintDetails?: { [serviceName: string]: { color?: string; specific_part?: string } };
  cartContext?: string;
}
// src/types/ai.ts

// src/types/ai.ts

// Existing interfaces
export interface MappedServiceItem {
  serviceName: string;
  status: string;
  missingInfo: string[];
  notes: string;
}
// PATCH: Allow lastInteraction to be an object with type property
export interface LastInteractionObject {
  type: string;
  at: number;
  context?: any;
}

// Update Session interface to allow lastInteraction as LastInteractionObject
export interface Session {
  cartServices: string[];
  inquiry: any;
  senderName?: string;
  flow?: string;
  snoozeUntil?: number;
  followUpState?: {
    level: number;
    flaggedAt: number;
    context: string;
  } | null;
  lastInteraction: LastInteractionObject;
  chatHistory?: { role: string; content: string }[];
}

export interface MappedServiceResult {
  reasoning: string;
  requestedServices: MappedServiceItem[];
}
