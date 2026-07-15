import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Fallback directly to the actual ID and Token if env is not set in Vercel yet
    const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '3280635758922955';
    const accessToken = process.env.META_CAPI_TOKEN || process.env.META_CONVERSION_API_TOKEN || 'EAAK7579DwBcBR3tsIJKQtW8jNSqxtqZAhz2uVzYHlZBtncvOHI2c5WozqNmFtL7D64oYPWbrjwBUZC0a8uj85jLzNVZB7GISt521yzuZB9uRi1wOfmNpNWO7brWVkHTBYgX1V2j78lUBDGVrp9XghtaZBKLTQ3T6Qowa9AbTHTRyqdd7KzZBolNDscueWQbJgZDZD';
    
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || '';

    // Meta recommends passing fbc (click ID) and fbp (browser ID) from cookies
    const cookieStore = cookies();
    const fbc = cookieStore.get('_fbc')?.value;
    const fbp = cookieStore.get('_fbp')?.value;

    const payload = {
      data: [{
        event_name: 'Contact',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://repaintdandetailingmotor-bosmat.vercel.app',
        user_data: {
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          ...(fbc && { fbc }),
          ...(fbp && { fbp })
        },
        custom_data: {
          content_name: 'Enhanced Landing Page CTA',
          content_category: 'WhatsApp',
          value: 30000,
          currency: 'IDR'
        }
      }],
      test_event_code: body.testCode || undefined
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
    console.log('[CAPI Track WA] Result:', result);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('[CAPI Track WA] Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
