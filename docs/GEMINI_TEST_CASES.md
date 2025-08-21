# Gemini AI Test Cases Documentation

## Overview

Test cases untuk Gemini AI berdasarkan skenario direct message yang realistis dari Firestore. Test cases ini dirancang untuk memvalidasi respons AI dalam berbagai situasi customer service yang umum terjadi.

## Test Scripts

### 1. Quick Test (`test-gemini-quick.ts`)
Test cepat untuk skenario umum tanpa validasi mendalam.

**Command:**
```bash
npm run test:gemini:quick
```

**Skenario yang di-test:**
- **Greeting**: "Halo"
- **Detailing Inquiry**: "Mau detailing motor"
- **Repaint Price**: "Berapa harga repaint Vario?"
- **Location**: "Dimana lokasinya?"
- **Promo**: "Ada promo apa?"
- **Booking**: "Mau booking"

### 2. Comprehensive Test (`test-gemini-direct-messages.ts`)
Test komprehensif dengan validasi mendalam dan performance testing.

**Command:**
```bash
npm run test:gemini:direct-messages
```

## Test Scenarios

### 1. New Customer - Detailing Inquiry
**Input:** "Halo, mau tanya soal detailing motor"
**Expected Tools:** `getServiceDescription`, `listServicesByCategory`
**Validation:**
- Should contain: ['detailing', 'motor']
- Should not contain: ['harga', 'booking']
- Max length: 200 chars
- No robotic language

### 2. Repaint Pricing - Vario 160
**Input:** "Motor Vario 160 mau repaint, berapa harganya?"
**Expected Tools:** `getMotorSizeDetails`, `getPromoBundleDetails`, `getSpecificServicePrice`
**Validation:**
- Should contain: ['Vario', 'repaint', 'harga']
- Should not contain: ['booking']
- Max length: 300 chars

### 3. Photo Analysis Request
**Input:** "Motor saya seperti ini, bisa di-detail?"
**Expected Tools:** `analyzeMotorImage`
**Validation:**
- Should contain: ['foto', 'analisa', 'detail']
- Should not contain: ['harga']
- Max length: 250 chars

### 4. Location & Hours Inquiry
**Input:** "Dimana lokasi bengkelnya? Jam buka sampai jam berapa?"
**Expected Tools:** `searchKnowledgeBase`
**Validation:**
- Should contain: ['lokasi', 'jam buka']
- Should not contain: ['harga', 'booking']
- Max length: 200 chars

### 5. Promo Inquiry
**Input:** "Ada promo apa aja nih?"
**Expected Tools:** `getPromoBundleDetails`
**Validation:**
- Should contain: ['promo', 'bundling']
- Should not contain: ['booking']
- Max length: 300 chars

### 6. Booking Request - NMax
**Input:** "Mau booking detailing motor NMax untuk besok"
**Expected Tools:** `getMotorSizeDetails`, `checkBookingAvailability`, `createBooking`
**Validation:**
- Should contain: ['NMax', 'booking', 'slot']
- Should not contain: ['harga']
- Max length: 250 chars

### 7. Warranty Question
**Input:** "Ada garansi ga untuk repaint?"
**Expected Tools:** `searchKnowledgeBase`
**Validation:**
- Should contain: ['garansi', 'repaint']
- Should not contain: ['harga', 'booking']
- Max length: 200 chars

### 8. Service Comparison
**Input:** "Bedanya detailing sama coating apa?"
**Expected Tools:** `getServiceDescription`, `searchKnowledgeBase`
**Validation:**
- Should contain: ['detailing', 'coating', 'beda']
- Should not contain: ['harga', 'booking']
- Max length: 300 chars

## Validation Criteria

### Response Length
- **Quick responses**: 1-3 kalimat (50-150 chars)
- **Detailed responses**: 2-4 kalimat (100-300 chars)
- **Complex responses**: 3-6 kalimat (150-500 chars)

### Natural Language Check
**Robotic phrases yang dihindari:**
- "dengan senang hati"
- "tentu saja"
- "saya akan"
- "dapat saya bantu"

### Content Validation
- **Required keywords**: Kata-kata yang harus ada dalam response
- **Forbidden keywords**: Kata-kata yang tidak boleh ada dalam response
- **Context relevance**: Response harus relevan dengan pertanyaan

## Performance Testing

### Concurrent Requests
Test dengan 5 request bersamaan untuk memvalidasi:
- Response time rata-rata
- Success rate
- Error handling

### Expected Performance
- **Response time**: < 10 detik per request
- **Success rate**: > 90%
- **Error handling**: Graceful fallback untuk rate limits

## Mock Data Structure

Test menggunakan mock data yang meniru struktur Firestore:

```typescript
const MOCK_DIRECT_MESSAGES = [
  {
    phone: '628123456789',
    name: 'Mas Budi',
    messages: [
      {
        text: 'Halo, mau tanya soal detailing motor',
        sender: 'customer',
        timestamp: new Date('2024-01-15T10:00:00Z')
      }
    ]
  }
  // ... more scenarios
];
```

## Session Object Structure

```typescript
interface Session {
  senderNumber: string;
  senderName?: string;
  lastInteraction: {
    type: string;
    at: number;
  };
  cartServices: any[];
  history: any[];
}
```

## Error Handling

### Rate Limit Handling
- Gemini API free tier: 2 requests/minute
- Automatic fallback response untuk rate limit errors
- Graceful degradation dengan pesan error yang user-friendly

### Tool Call Errors
- Validation untuk tool calls yang gagal
- Fallback ke response manual jika tools tidak tersedia

## Running Tests

### Prerequisites
```bash
# Load environment variables
export $(cat .env.local | grep -v '^#' | xargs)

# Ensure Gemini API key is set
echo $GOOGLE_AI_API_KEY
```

### Test Commands
```bash
# Quick test (6 scenarios)
npm run test:gemini:quick

# Comprehensive test (8 scenarios + performance)
npm run test:gemini:direct-messages

# Basic Gemini test
npm run test:gemini:basic

# Simple test without Firebase
npm run test:gemini:simple
```

## Expected Results

### Success Criteria
- ✅ All scenarios pass validation
- ✅ Response time < 10 seconds
- ✅ Natural language (no robotic phrases)
- ✅ Appropriate tool usage
- ✅ Content relevance

### Common Issues
- ⚠️ Rate limit errors (normal untuk free tier)
- ⚠️ Missing keywords (bisa karena prompt belum optimal)
- ⚠️ Response too long (perlu adjustment prompt)

## Integration with CI/CD

Test cases ini bisa diintegrasikan dengan CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Test Gemini AI
  run: |
    npm run test:gemini:quick
    npm run test:gemini:basic
```

## Maintenance

### Updating Test Cases
1. Tambah skenario baru di `TEST_SCENARIOS` array
2. Update validation criteria sesuai kebutuhan
3. Test dengan `npm run test:gemini:quick`
4. Commit perubahan

### Monitoring
- Track response time trends
- Monitor success rate
- Alert jika ada degradation performance

## Troubleshooting

### Common Issues

1. **Rate Limit Errors**
   - Normal untuk Gemini free tier
   - Tunggu 1-2 menit sebelum test ulang
   - Consider upgrading ke paid tier untuk testing intensif

2. **TypeScript Errors**
   - Run `npm run typecheck` untuk validasi
   - Update interface jika ada perubahan struktur

3. **Missing Keywords**
   - Review prompt di `src/ai/config/aiPrompts.ts`
   - Adjust expected keywords sesuai response AI

4. **Response Too Long**
   - Update `maxLength` di test scenarios
   - Review prompt untuk lebih concise

### Debug Mode
Untuk debugging, tambahkan logging di test scripts:

```typescript
console.log('Debug info:', {
  input: scenario.input,
  session: session,
  result: result
});
```
