// debug-whatsapp-vercel.js
// Script untuk debug masalah kirim struk manual di Vercel

const testManualSend = async () => {
  const number = "62817941010";
  const message = `*Test Struk Manual dari Vercel* 📱

🧪 Debug Test:
• Endpoint: /api/whatsapp/send
• Target: ${number}
• Time: ${new Date().toLocaleString('id-ID')}

Jika pesan ini sampai, berarti API Vercel sudah bekerja! ✅`;

  console.log('Testing Vercel WhatsApp API...');
  
  try {
    const response = await fetch('https://repaintdandetailingmotor-bosmat.vercel.app/api/whatsapp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number,
        message
      })
    });

    const result = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Response Result:', result);
    
    if (response.ok && result.success) {
      console.log('✅ SUCCESS: Message sent successfully!');
      console.log('Message ID:', result.messageId || 'N/A');
    } else {
      console.log('❌ ERROR:', result.error || 'Unknown error');
    }
    
  } catch (error) {
    console.error('🚨 FETCH ERROR:', error.message);
  }
};

// Test langsung
testManualSend();
