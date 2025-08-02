// src/app/api/debug/whatsapp-config/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const whatsappServerUrl = process.env.WHATSAPP_SERVER_URL;
  
  return NextResponse.json({
    hasWhatsAppServerUrl: !!whatsappServerUrl,
    whatsappServerUrl: whatsappServerUrl ? 'configured' : 'missing',
    fullUrl: whatsappServerUrl || 'NOT_SET',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}

export async function POST() {
  const whatsappServerUrl = process.env.WHATSAPP_SERVER_URL;
  
  if (!whatsappServerUrl) {
    return NextResponse.json({
      success: false,
      error: 'WHATSAPP_SERVER_URL not configured'
    }, { status: 500 });
  }

  const testEndpoint = `${whatsappServerUrl}/send-manual-message`;
  
  try {
    console.log(`Testing connection to: ${testEndpoint}`);
    
    const response = await fetch(testEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: '62817941010',
        message: 'Test connectivity from Vercel to WhatsApp server'
      })
    });

    const result = await response.text();
    
    return NextResponse.json({
      success: true,
      status: response.status,
      statusText: response.statusText,
      responseBody: result,
      endpoint: testEndpoint
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: testEndpoint
    }, { status: 500 });
  }
}
