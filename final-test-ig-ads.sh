#!/bin/bash
# Final test for IG ads detection system

echo "🎯 Final Test: IG Ads Smart Detection System"
echo "=============================================="
echo ""

echo "📱 GENERAL INQUIRIES (Should trigger promo):"
echo "---------------------------------------------"

declare -a general_messages=(
    "Halo! Bisakah saya mendapatkan info selengkapnya tentang ini?"
    "Info promo dong"
    "Berapa harga layanan motor?"
    "Mau tanya paket apa aja yang ada"
    "Hi, gimana cara booking?"
)

counter=628100000000
for message in "${general_messages[@]}"; do
    echo "📱 Testing: $message"
    response=$(curl -s -X POST http://localhost:3000/api/whatsapp/receive \
      -H "Content-Type: application/json" \
      -d "{
        \"customerMessage\": \"$message\",
        \"senderNumber\": \"$counter\",
        \"senderName\": \"Test Customer IG\"
      }")
    
    # Check if promo tool was used
    if echo "$response" | grep -q "getPromoBundleDetails"; then
        echo "✅ PROMO TRIGGERED"
    else
        echo "❌ NO PROMO"
    fi
    echo ""
    ((counter++))
    sleep 1
done

echo ""
echo "🎯 SPECIFIC INQUIRIES (Should NOT trigger promo):"
echo "------------------------------------------------"

declare -a specific_messages=(
    "Motor saya sudah selesai belum ya?"
    "Booking untuk besok jam berapa buka?"
    "Status booking saya gimana?"
    "Alamat bengkel dimana?"
)

for message in "${specific_messages[@]}"; do
    echo "📱 Testing: $message"
    response=$(curl -s -X POST http://localhost:3000/api/whatsapp/receive \
      -H "Content-Type: application/json" \
      -d "{
        \"customerMessage\": \"$message\",
        \"senderNumber\": \"$counter\",
        \"senderName\": \"Customer Lama\"
      }")
    
    # Check if promo tool was used
    if echo "$response" | grep -q "getPromoBundleDetails"; then
        echo "❌ PROMO TRIGGERED (shouldn't happen)"
    else
        echo "✅ NO PROMO (correct)"
    fi
    echo ""
    ((counter++))
    sleep 1
done

echo "🎉 Testing completed!"
