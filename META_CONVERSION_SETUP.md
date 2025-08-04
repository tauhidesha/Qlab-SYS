# Meta Conversion API Setup Guide

## Overview
Meta Conversion API memungkinkan tracking conversion dari IG ads secara server-side. Saat customer berhasil booking melalui AI, event akan otomatis dikirim ke Meta untuk optimization campaign IG ads.

## Setup Steps

### 1. Get Meta Pixel ID
1. Buka Meta Business Manager
2. Go to Events Manager
3. Pilih Pixel yang akan digunakan
4. Copy Pixel ID

### 2. Generate Conversion API Access Token
1. Di Events Manager, pilih pixel
2. Go to Settings > Conversions API
3. Generate Access Token
4. Copy token yang dibuat

### 3. Update Environment Variables
Tambahkan ke `.env.local`:
```bash
META_PIXEL_ID="your_pixel_id_here"
META_CONVERSION_API_TOKEN="your_access_token_here"
```

### 4. Test Setup
```bash
curl http://localhost:3000/api/meta/conversion
```

Should return:
```json
{
  "configured": true,
  "pixelId": "1234****",
  "hasToken": true
}
```

## How It Works

### 1. Automatic Conversion Tracking
Saat AI tool `createBooking` berhasil dijalankan, sistem otomatis:
- Detect booking conversion
- Extract booking data (customer, services, value)
- Send to Meta Conversion API
- Log result untuk monitoring

### 2. Manual Testing
Test conversion tracking dengan API endpoint:
```bash
curl -X POST http://localhost:3000/api/meta/conversion \
  -H "Content-Type: application/json" \
  -d '{
    "type": "booking",
    "customerPhone": "628123456789", 
    "customerName": "Test Customer",
    "totalValue": 150000,
    "services": [
      {"serviceName": "Repaint Bodi Halus", "price": 150000}
    ]
  }'
```

### 3. Event Types
- `Lead`: Untuk booking reservations
- `Purchase`: Untuk completed payments (future enhancement)
- `InitiateCheckout`: Untuk booking attempts

## Data Sent to Meta

### User Data (Hashed)
- Phone number (SHA-256 hashed)
- Customer name (SHA-256 hashed)
- External ID (phone number as identifier)

### Event Data
- Event name (Lead, Purchase, etc.)
- Event time (Unix timestamp)
- Event value (total booking value)
- Currency (IDR)
- Custom data (booking ID, services, source)

## Conversion Flow Integration

### AI Flow Detection
```typescript
// In cs-whatsapp-reply-flow.ts
const hasBookingConversion = agentResult.metadata.toolsUsed.includes('createBooking');

if (hasBookingConversion) {
  await sendBookingConversion({
    customerPhone,
    customerName,
    services,
    totalValue,
    bookingId
  });
}
```

### Monitoring & Logging
- All conversion attempts logged to console
- Success/failure tracking
- Meta event ID returned for verification
- Non-blocking (doesn't fail main flow if Meta API down)

## Production Deployment

### Environment Variables for Vercel
```bash
META_PIXEL_ID=your_production_pixel_id
META_CONVERSION_API_TOKEN=your_production_token
```

### Testing vs Production
- Development uses `test_event_code: "TEST12345"`
- Production sends real events to Meta
- Both show up in Meta Events Manager

## Troubleshooting

### Common Issues
1. **"Missing Meta credentials"** → Check .env.local file
2. **"Invalid access token"** → Regenerate token in Meta Business
3. **"Pixel not found"** → Verify Pixel ID correct
4. **Hash errors** → Check crypto.subtle support

### Debug Logs
Check server logs for:
```
[Meta Conversion API] Sending conversion event: Lead
[Meta Conversion API] Success: {...}
[META CONVERSION] Successfully sent to Meta: event_id
```

## ROI Measurement

### Meta Ads Manager
- Check Events Manager for received events
- View conversion attribution in Ads Manager
- Set up custom conversions based on booking events
- Optimize campaigns based on booking data

### Internal Tracking
- AI Metrics dashboard shows conversion rates
- Booking tool usage tracking
- Customer journey from IG ads to booking

## Future Enhancements
- Payment completion events
- Value optimization for Meta algorithms
- Enhanced customer data (location, preferences)
- Offline conversion uploads for completed services
