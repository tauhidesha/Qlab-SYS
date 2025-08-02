#!/bin/bash

echo "=== TEST VERCEL API ENDPOINT ==="
echo "Testing Vercel /api/whatsapp/send dengan payload dummy"
echo

# Test dengan nomor dummy yang tidak akan terkirim
DUMMY_NUMBER="621234567890"
DUMMY_MESSAGE="Test message - ini hanya test, tidak akan terkirim ke nomor real"

echo "📤 Mengirim test request ke Vercel..."
echo "URL: https://repaintdandetailingmotor-bosmat.vercel.app/api/whatsapp/send"
echo "Nomor: $DUMMY_NUMBER (dummy)"
echo "Message: $DUMMY_MESSAGE"
echo

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{
    \"number\": \"$DUMMY_NUMBER\",
    \"message\": \"$DUMMY_MESSAGE\"
  }" \
  https://repaintdandetailingmotor-bosmat.vercel.app/api/whatsapp/send

echo
echo
echo "=== ANALISIS ==="
echo "✅ Jika response: {\"success\":true} - berarti Vercel API working"
echo "❌ Jika error 500/400 - ada masalah di Vercel API"
echo "📝 Check Vercel logs untuk detail lebih lanjut"
