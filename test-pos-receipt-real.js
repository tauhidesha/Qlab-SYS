// Test script untuk debugging struk WhatsApp dari POS
// Simulasi exact same process seperti di POS

// Fungsi formatWhatsAppNumber dari POS (exact copy)
function formatWhatsAppNumber(phone) {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13) {
    cleaned = '62' + cleaned;
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

// Mock transaction data untuk test
const mockTransaction = {
  id: 'TX_TEST_' + Date.now(),
  timestamp: new Date(),
  paymentMethod: 'Tunai',
  total: 150000,
  items: [
    {
      id: 'item1',
      name: 'Full Detailing Glossy',
      price: 150000,
      quantity: 1,
      originalPrice: 150000
    }
  ],
  clientName: 'Test Customer',
  staffName: 'Test Staff'
};

// Fungsi generateWhatsAppReceiptText dari POS (simplified version)
function generateWhatsAppReceiptText(transaction) {
  let text = `🧾 *STRUK DIGITAL*\n`;
  text += `*QLAB Auto Detailing*\n\n`;
  
  text += `📅 Tanggal: ${new Date(transaction.timestamp).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  })}\n`;
  text += `🕐 Waktu: ${new Date(transaction.timestamp).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })}\n`;
  text += `🆔 ID Transaksi: ${transaction.id}\n\n`;
  
  text += `👤 Nama: ${transaction.clientName || 'Walk-in Customer'}\n`;
  text += `👨‍🔧 Staff: ${transaction.staffName || 'N/A'}\n\n`;
  
  text += `📋 *DETAIL LAYANAN:*\n`;
  transaction.items.forEach((item, index) => {
    text += `${index + 1}. ${item.name}\n`;
    text += `   ${item.quantity} x Rp${item.price.toLocaleString('id-ID')}\n`;
  });
  
  text += `\n💰 *TOTAL: Rp${transaction.total.toLocaleString('id-ID')}*\n`;
  text += `💳 Pembayaran: ${transaction.paymentMethod}\n\n`;
  text += `Terima kasih atas kunjungan Anda!`;
  
  return text;
}

async function testRealPOSFlow() {
  console.log('=== TEST POS RECEIPT FLOW ===\n');
  
  // Test dengan nomor yang berbeda-beda
  const testNumbers = [
    '08179481010',     // Format Indonesia standar
    '628179481010',    // Format internasional
    '8179481010',      // Tanpa 0/62
    '6281510021762'    // Nomor dari log sebelumnya
  ];
  
  for (const inputNumber of testNumbers) {
    console.log(`\n--- Testing dengan nomor: "${inputNumber}" ---`);
    
    // Step 1: Format nomor (sama seperti POS)
    const formattedNumber = formatWhatsAppNumber(inputNumber);
    console.log(`Nomor setelah format: "${formattedNumber}"`);
    
    // Step 2: Validasi nomor (sama seperti POS)
    const isValid = /^\d+$/.test(formattedNumber) && formattedNumber.length >= 10;
    console.log(`Validasi nomor: ${isValid ? 'VALID' : 'INVALID'}`);
    
    if (!isValid) {
      console.log('❌ Nomor tidak valid, skip test');
      continue;
    }
    
    // Step 3: Generate receipt text
    const receiptText = generateWhatsAppReceiptText(mockTransaction);
    console.log(`Receipt text length: ${receiptText.length} characters`);
    
    // Step 4: Test API call ke Vercel
    const payload = {
      number: formattedNumber,
      message: receiptText
    };
    
    console.log(`\n📤 Mengirim ke Vercel API...`);
    console.log(`URL: https://repaintdandetailingmotor-bosmat.vercel.app/api/whatsapp/send`);
    console.log(`Payload:`, JSON.stringify(payload, null, 2));
    
    try {
      const response = await fetch('https://repaintdandetailingmotor-bosmat.vercel.app/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      console.log(`\n📥 Response dari Vercel:`);
      console.log(`Status: ${response.status}`);
      console.log(`Result:`, JSON.stringify(result, null, 2));
      
      if (response.ok && result.success) {
        console.log('✅ API call SUCCESS');
      } else {
        console.log('❌ API call FAILED');
      }
      
    } catch (error) {
      console.error('❌ Error calling Vercel API:', error.message);
    }
    
    console.log('\n' + '='.repeat(60));
  }
}

// Jalankan test
testRealPOSFlow().catch(console.error);
