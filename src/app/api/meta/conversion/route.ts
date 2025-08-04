// @file: src/app/api/meta/conversion/route.ts
// Manual Meta Conversion API endpoint for testing

import { NextResponse } from 'next/server';
import { sendBookingConversion, sendMetaConversion } from '@/services/metaConversionApi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      type = 'booking', 
      customerPhone, 
      customerName, 
      services = [], 
      totalValue = 100000 
    } = body;

    console.log('[Meta Conversion API] Manual trigger request:', { type, customerPhone, customerName });

    if (!customerPhone || !customerName) {
      return NextResponse.json(
        { success: false, error: 'customerPhone and customerName required' },
        { status: 400 }
      );
    }

    let result;

    if (type === 'booking') {
      // Booking conversion
      result = await sendBookingConversion({
        customerPhone,
        customerName,
        services: services.length > 0 ? services : [{ serviceName: 'Test Service', price: totalValue }],
        totalValue,
        bookingId: `manual_${Date.now()}`
      });
    } else {
      // Generic conversion
      result = await sendMetaConversion({
        eventName: type as any,
        customerPhone,
        customerName,
        value: totalValue,
        currency: 'IDR',
        customData: {
          source: 'manual_api',
          timestamp: Date.now()
        }
      });
    }

    console.log('[Meta Conversion API] Result:', result);

    return NextResponse.json({
      success: true,
      conversionResult: result,
      message: result.success 
        ? `Conversion event '${type}' sent successfully to Meta`
        : `Failed to send conversion: ${result.error}`
    });

  } catch (error) {
    console.error('[Meta Conversion API] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// GET endpoint untuk test credentials
export async function GET() {
  const pixelId = process.env.META_PIXEL_ID;
  const hasToken = !!process.env.META_CONVERSION_API_TOKEN;
  
  return NextResponse.json({
    configured: !!(pixelId && hasToken),
    pixelId: pixelId ? `${pixelId.substring(0, 4)}****` : 'Not set',
    hasToken,
    environment: process.env.NODE_ENV,
    instructions: {
      setup: [
        'Set META_PIXEL_ID in environment variables',
        'Set META_CONVERSION_API_TOKEN in environment variables',
        'Test with POST request to this endpoint'
      ],
      testRequest: {
        method: 'POST',
        body: {
          type: 'booking',
          customerPhone: '628123456789',
          customerName: 'Test Customer',
          totalValue: 150000,
          services: [
            { serviceName: 'Repaint Bodi Halus', price: 150000 }
          ]
        }
      }
    }
  });
}
