#!/bin/bash
# Test IG ads traffic detection

echo "🔥 Testing IG Ads Traffic Detection via API..."

# Test messages that typically come from IG ads
declare -a test_messages=(
    "Halo! Bisakah saya mendapatkan info selengkapnya tentang ini?"
    "Info promo dong"
    "Berapa harga motor detailing?"
    "Mau tanya layanan apa aja yang ada"
    "Hi, gimana caranya booking?"
    "Pengen tahu paket lengkapnya"
)

for message in "${test_messages[@]}"; do
    echo ""
    echo "📱 Testing: $message"
    echo "=========================="
    
    # Send via WhatsApp receive endpoint to trigger AI
    curl -s -X POST http://localhost:3000/api/whatsapp/receive \
      -H "Content-Type: application/json" \
      -d "{
        \"entry\": [{
          \"changes\": [{
            \"value\": {
              \"messages\": [{
                \"from\": \"628999888777\",
                \"text\": {\"body\": \"$message\"},
                \"timestamp\": \"$(date +%s)\"
              }],
              \"contacts\": [{
                \"profile\": {\"name\": \"Test Customer IG\"},
                \"wa_id\": \"628999888777\"
              }]
            }
          }]
        }]
      }" | jq '.'
    
    echo ""
    sleep 2
done

echo "✅ Test completed!"
