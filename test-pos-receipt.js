// test-pos-receipt.js
// Simulate POS receipt generation to test for JSON issues

const testTransaction = {
  id: "test123",
  customerName: "Test Customer",
  paidAt: { 
    toDate: () => new Date() 
  },
  items: [
    {
      name: "Coating Motor Glossy",
      quantity: 1,
      price: 750000,
      staffName: "Tauhid",
      type: "service"
    }
  ],
  subtotal: 750000,
  discountAmount: 0,
  total: 750000,
  paymentMethod: "Cash",
  pointsEarnedInThisTx: 75
};

const SHOP_NAME = "Bosmat Detailing";

function generateWhatsAppReceiptText(transaction) {
  let text = `*Struk Digital - ${SHOP_NAME}*\n\n`;
  text += `ID Transaksi: ${transaction.id.substring(0, 8)}...\n`;
  text += `Pelanggan: ${transaction.customerName}\n`;
  
  if (transaction.paidAt && transaction.paidAt.toDate) {
    text += `Tanggal: ${transaction.paidAt.toDate().toLocaleString('id-ID', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })}\n\n`;
  } else {
    text += `Tanggal: ${new Date().toLocaleString('id-ID', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })}\n\n`;
  }

  text += `Item:\n`;
  transaction.items.forEach(item => {
    text += `- ${item.name} (${item.quantity} x Rp ${item.price.toLocaleString('id-ID')})`;
    if (item.staffName) text += ` (Oleh: ${item.staffName})`;
    if (item.type === 'reward_merchandise') text += ` (REWARD)`;
    text += ` = Rp ${(item.quantity * item.price).toLocaleString('id-ID')}\n`;
  });
  
  text += `\nSubtotal: Rp ${transaction.subtotal.toLocaleString('id-ID')}\n`;

  if (transaction.discountAmount > 0) {
    text += `Diskon Manual: - Rp ${transaction.discountAmount.toLocaleString('id-ID')}\n`;
  }

  text += `*Total: Rp ${transaction.total.toLocaleString('id-ID')}*\n`;
  text += `Metode Bayar: ${transaction.paymentMethod || 'N/A'}\n`;

  if (transaction.pointsEarnedInThisTx && transaction.pointsEarnedInThisTx > 0) {
    text += `Poin Baru Diperoleh: ${transaction.pointsEarnedInThisTx.toLocaleString('id-ID')} poin\n`;
  }

  // Simplified feedback URL
  const feedbackUrl = `https://repaintdandetailingmotor-bosmat.vercel.app/public/feedback/${transaction.id}`;
  text += `\nKami sangat menghargai masukan Anda! Isi survei singkat di: ${feedbackUrl}`;
  text += `\n\nTerima kasih atas kunjungan Anda!`;
  
  return text;
}

// Test the receipt generation
console.log("=== TESTING RECEIPT GENERATION ===");
const receiptText = generateWhatsAppReceiptText(testTransaction);
console.log("Generated Receipt:");
console.log(receiptText);
console.log("\n=== TESTING JSON STRINGIFY ===");

const testPayload = {
  number: "62817941010",
  message: receiptText
};

try {
  const jsonString = JSON.stringify(testPayload);
  console.log("✅ JSON stringify successful");
  console.log("Payload size:", jsonString.length, "characters");
  
  // Test parsing back
  const parsed = JSON.parse(jsonString);
  console.log("✅ JSON parse successful");
  
} catch (error) {
  console.error("❌ JSON error:", error.message);
  console.log("Problematic characters in receipt:");
  
  // Find problematic characters
  for (let i = 0; i < receiptText.length; i++) {
    const char = receiptText[i];
    const charCode = char.charCodeAt(0);
    if (charCode < 32 && charCode !== 10 && charCode !== 13) {
      console.log(`Found control character at position ${i}: charCode ${charCode}`);
    }
  }
}
