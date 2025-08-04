// @file: src/services/metaConversionApi.ts
// Meta Conversion API Integration for Booking Conversions

interface ConversionData {
  eventName: 'Purchase' | 'Lead' | 'CompleteRegistration' | 'InitiateCheckout';
  customerPhone: string;
  customerName: string;
  value?: number;
  currency?: string;
  contents?: Array<{
    id: string;
    quantity: number;
    item_price: number;
  }>;
  eventSourceUrl?: string;
  customData?: Record<string, any>;
}

interface MetaConversionResponse {
  success: boolean;
  eventId?: string;
  fbtrace_id?: string;
  error?: string;
}

/**
 * Send conversion event to Meta Conversion API
 */
export async function sendMetaConversion(data: ConversionData): Promise<MetaConversionResponse> {
  try {
    console.log('[Meta Conversion API] Sending conversion event:', data.eventName);
    
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CONVERSION_API_TOKEN;
    
    if (!pixelId || !accessToken) {
      console.warn('[Meta Conversion API] Missing credentials - PIXEL_ID or ACCESS_TOKEN');
      return { success: false, error: 'Missing Meta credentials' };
    }
    
    // Generate event ID for deduplication
    const eventId = `booking_${data.customerPhone}_${Date.now()}`;
    const eventTime = Math.floor(Date.now() / 1000);
    
    // Prepare user data with hashing
    const hashedPhone = await hashSHA256(normalizePhone(data.customerPhone));
    const hashedName = await hashSHA256(data.customerName.toLowerCase().trim());
    
    const payload = {
      data: [{
        event_name: data.eventName,
        event_time: eventTime,
        event_id: eventId,
        action_source: 'website',
        event_source_url: data.eventSourceUrl || 'https://repaintdandetailingmotor-bosmat.vercel.app',
        user_data: {
          ph: [hashedPhone], // Hashed phone
          fn: [hashedName],   // Hashed first name
          external_id: [data.customerPhone] // External ID
        },
        custom_data: {
          value: data.value || 0,
          currency: data.currency || 'IDR',
          contents: data.contents || [],
          content_type: 'product',
          ...data.customData
        }
      }],
      test_event_code: process.env.NODE_ENV === 'development' ? 'TEST12345' : undefined
    };
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
      }
    );
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('[Meta Conversion API] Success:', result);
      return {
        success: true,
        eventId,
        fbtrace_id: result.fbtrace_id
      };
    } else {
      console.error('[Meta Conversion API] Error:', result);
      return {
        success: false,
        error: result.error?.message || 'Unknown error'
      };
    }
    
  } catch (error) {
    console.error('[Meta Conversion API] Exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send booking conversion specifically
 */
export async function sendBookingConversion(bookingData: {
  customerPhone: string;
  customerName: string;
  services: Array<{
    serviceName: string;
    price: number;
  }>;
  totalValue: number;
  bookingId: string;
}): Promise<MetaConversionResponse> {
  const { customerPhone, customerName, services, totalValue, bookingId } = bookingData;
  
  return sendMetaConversion({
    eventName: 'Lead', // Use 'Lead' for booking reservations
    customerPhone,
    customerName,
    value: totalValue,
    currency: 'IDR',
    contents: services.map((service, index) => ({
      id: service.serviceName,
      quantity: 1,
      item_price: service.price
    })),
    customData: {
      booking_id: bookingId,
      service_count: services.length,
      booking_source: 'whatsapp_ai'
    }
  });
}

/**
 * Hash string using SHA-256 (required by Meta)
 */
async function hashSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Normalize phone number for consistent hashing
 */
function normalizePhone(phone: string): string {
  // Remove all non-numeric characters
  return phone.replace(/\D/g, '');
}
