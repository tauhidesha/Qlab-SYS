#!/bin/bash
# Comprehensive test for refined IG ads detection

echo "🎯 REFINED TEST: IG Ads Smart Detection (Fixed Booking Issue)"
echo "============================================================="
echo ""

echo "📱 GENERAL INQUIRIES (Should trigger promo):"
echo "---------------------------------------------"

declare -a general_messages=(
    "Halo! Bisakah saya mendapatkan info selengkapnya tentang ini?"
    "Info promo dong"
    "Berapa harga layanan motor?"
    "Mau tanya paket apa aja yang ada"
    "Hai, info lengkap dong"
)

counter=628700000000
for message in "${general_messages[@]}"; do
    echo "📱 Testing: $message"
    response=$(curl -s -X POST http://localhost:3000/api/whatsapp/receive \
      -H "Content-Type: application/json" \
      -d "{
        \"customerMessage\": \"$message\",
        \"senderNumber\": \"$counter\",
        \"senderName\": \"Test Customer IG\"
      }")
    
    if echo "$response" | grep -q "getPromoBundleDetails"; then
        echo "✅ PROMO TRIGGERED (correct)"
    else
        echo "❌ NO PROMO (should trigger)"
    fi
    echo ""
    ((counter++))
    sleep 1
done

echo ""
echo "🚫 BOOKING INQUIRIES (Should NOT trigger promo):"
echo "------------------------------------------------"

declare -a booking_messages=(
    "Hi, gimana cara booking?"
    "Mau booking slot besok bisa?"
    "Cara reservasi gimana?"
    "Bisa pesan untuk minggu depan?"
    "Jadwal booking hari apa aja?"
)

for message in "${booking_messages[@]}"; do
    echo "📱 Testing: $message"
    response=$(curl -s -X POST http://localhost:3000/api/whatsapp/receive \
      -H "Content-Type: application/json" \
      -d "{
        \"customerMessage\": \"$message\",
        \"senderNumber\": \"$counter\",
        \"senderName\": \"Customer Booking\"
      }")
    
    if echo "$response" | grep -q "getPromoBundleDetails"; then
        echo "❌ PROMO TRIGGERED (shouldn't happen)"
    else
        echo "✅ NO PROMO (correct - focus on booking)"
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
    "Status booking saya gimana?"
    "Alamat bengkel dimana?"
    "Jam buka sampai jam berapa?"
)

for message in "${specific_messages[@]}"; do
    echo "📱 Testing: $message"
    response=$(curl -s -X POST http://localhost:3000/api/whatsapp/receive \
      -H "Content-Type: application/json" \
      -d "{
        \"customerMessage\": \"$message\",
        \"senderNumber\": \"$counter\",
        \"senderName\": \"Customer Existing\"
      }")
    
    if echo "$response" | grep -q "getPromoBundleDetails"; then
        echo "❌ PROMO TRIGGERED (shouldn't happen)"
    else
        echo "✅ NO PROMO (correct)"
    fi
    echo ""
    ((counter++))
    sleep 1
done

echo "🎉 Refined testing completed! Booking inquiries should now focus on booking process."
