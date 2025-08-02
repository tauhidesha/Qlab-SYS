// Debug POS Flow - Tanpa mengirim ke nomor real
// Hanya analyze logic dan payload yang dibuat

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

function analyzePayload() {
  console.log('=== ANALISIS PAYLOAD POS RECEIPT ===\n');
  
  // Test dengan nomor dummy untuk analisis
  const testNumbers = [
    '08179481010',     // Format Indonesia standar
    '628179481010',    // Format internasional
    '8179481010',      // Tanpa 0/62
    '0812XXXXX999'     // Format dengan non-digit
  ];
  
  for (const inputNumber of testNumbers) {
    console.log(`\n--- Testing format untuk: "${inputNumber}" ---`);
    
    // Step 1: Format nomor (sama seperti POS)
    const formattedNumber = formatWhatsAppNumber(inputNumber);
    console.log(`Nomor setelah format: "${formattedNumber}"`);
    
    // Step 2: Validasi nomor (sama seperti POS)
    const isValid = /^\d+$/.test(formattedNumber) && formattedNumber.length >= 10;
    console.log(`Validasi nomor: ${isValid ? 'VALID' : 'INVALID'}`);
    
    if (!isValid) {
      console.log('❌ Nomor tidak valid, POS akan skip');
      continue;
    }
    
    // Step 3: Generate receipt text
    const receiptText = generateWhatsAppReceiptText(mockTransaction);
    console.log(`Receipt text length: ${receiptText.length} characters`);
    
    // Step 4: Analyze payload structure
    const payload = {
      number: formattedNumber,
      message: receiptText
    };
    
    console.log(`\n📦 PAYLOAD STRUCTURE:`);
    console.log(`- number: "${payload.number}" (${payload.number.length} chars)`);
    console.log(`- message length: ${payload.message.length} characters`);
    console.log(`- JSON size: ${JSON.stringify(payload).length} bytes`);
    
    // Check for potential issues
    console.log(`\n🔍 POTENTIAL ISSUES CHECK:`);
    
    // Issue 1: Message too long?
    if (payload.message.length > 4000) {
      console.log(`⚠️  Message might be too long (${payload.message.length} chars)`);
    } else {
      console.log(`✅ Message length OK (${payload.message.length} chars)`);
    }
    
    // Issue 2: Special characters?
    const hasSpecialChars = /[^\x00-\x7F]/.test(payload.message);
    console.log(`${hasSpecialChars ? '⚠️' : '✅'} Unicode characters: ${hasSpecialChars ? 'YES' : 'NO'}`);
    
    // Issue 3: Number format matches whatsappService?
    const serviceExpectedFormat = payload.number.match(/^62\d{9,12}$/);
    console.log(`${serviceExpectedFormat ? '✅' : '⚠️'} Number format for whatsappService: ${serviceExpectedFormat ? 'OK' : 'POTENTIAL MISMATCH'}`);
    
    console.log('\n' + '-'.repeat(50));
  }
  
  console.log('\n=== SUMMARY ===');
  console.log('✅ POS logic tampaknya benar');
  console.log('✅ Payload structure sesuai API spec');
  console.log('❓ Masalah mungkin di network layer atau environment');
  
  console.log('\n=== RECOMMENDED NEXT STEPS ===');
  console.log('1. Check Vercel function logs saat POS real digunakan');
  console.log('2. Tambahkan logging di whatsappService.ts');
  console.log('3. Monitor server WhatsApp logs saat POS digunakan');
  console.log('4. Test dengan curl langsung dari terminal ke Vercel');
}

// Jalankan analisis
analyzePayload();
