// Simple cleanup via development API
// Usage: node cleanup-via-api.js

const testPhoneNumbers = [
  '628999999999', '628999999888', '628999999777', '628999999666', 
  '628999999555', '628999999444', '628999999333', '628999999222', 
  '628999999111', '628888888880', '628888888881', '628999999000'
];

async function cleanupViaAPI() {
  console.log('🧹 Cleaning test data via API calls...');
  
  // Simple strategy: trigger conversation stop for each test number
  // This will create minimal impact and natural cleanup
  
  for (const phoneNumber of testPhoneNumbers) {
    try {
      console.log(`📞 Triggering stop for ${phoneNumber}...`);
      
      const response = await fetch('http://localhost:3000/api/whatsapp/receive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerMessage: 'stop balas',
          senderNumber: phoneNumber,
          senderName: 'Cleanup'
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`  ✅ ${phoneNumber}: ${result.route || 'processed'}`);
      } else {
        console.log(`  ⚠️ ${phoneNumber}: ${response.status}`);
      }
      
      // Small delay to avoid overwhelming
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`  ❌ ${phoneNumber}: ${error.message}`);
    }
  }
  
  console.log('\n🎉 Cleanup requests sent! Check development logs for details.');
  console.log('Note: Some test data may still exist - this just triggers stop conditions.');
}

cleanupViaAPI().catch(console.error);
