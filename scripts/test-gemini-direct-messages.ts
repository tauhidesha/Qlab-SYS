#!/usr/bin/env tsx

/**
 * Test Gemini AI with realistic direct message scenarios
 * Based on actual Firestore directMessages structure
 */

import { runZoyaAIGeminiAgent } from '../src/ai/agent/runZoyaAIGeminiAgent';
import type { Session } from '../src/types/ai/session';

// Mock Firestore data structure based on actual schema
const MOCK_DIRECT_MESSAGES = [
  {
    // Scenario 1: New customer asking about detailing
    phone: '628123456789',
    name: 'Mas Budi',
    messages: [
      {
        text: 'Halo, mau tanya soal detailing motor',
        sender: 'customer',
        timestamp: new Date('2024-01-15T10:00:00Z')
      }
    ]
  },
  {
    // Scenario 2: Customer asking about repaint pricing
    phone: '628987654321',
    name: 'Mas Rudi',
    messages: [
      {
        text: 'Motor Vario 160 mau repaint, berapa harganya?',
        sender: 'customer',
        timestamp: new Date('2024-01-15T11:30:00Z')
      }
    ]
  },
  {
    // Scenario 3: Customer with photo asking for analysis
    phone: '628555666777',
    name: 'Mas Andi',
    messages: [
      {
        text: 'Motor saya seperti ini, bisa di-detail?',
        sender: 'customer',
        timestamp: new Date('2024-01-15T12:00:00Z')
      }
    ]
  },
  {
    // Scenario 4: Customer asking about location and hours
    phone: '628111222333',
    name: 'Mas Deni',
    messages: [
      {
        text: 'Dimana lokasi bengkelnya? Jam buka sampai jam berapa?',
        sender: 'customer',
        timestamp: new Date('2024-01-15T13:00:00Z')
      }
    ]
  },
  {
    // Scenario 5: Customer asking about promo
    phone: '628444555666',
    name: 'Mas Eko',
    messages: [
      {
        text: 'Ada promo apa aja nih?',
        sender: 'customer',
        timestamp: new Date('2024-01-15T14:00:00Z')
      }
    ]
  },
  {
    // Scenario 6: Customer wanting to book
    phone: '628777888999',
    name: 'Mas Fajar',
    messages: [
      {
        text: 'Mau booking detailing motor NMax untuk besok',
        sender: 'customer',
        timestamp: new Date('2024-01-15T15:00:00Z')
      }
    ]
  },
  {
    // Scenario 7: Customer asking about warranty
    phone: '628123789456',
    name: 'Mas Gani',
    messages: [
      {
        text: 'Ada garansi ga untuk repaint?',
        sender: 'customer',
        timestamp: new Date('2024-01-15T16:00:00Z')
      }
    ]
  },
  {
    // Scenario 8: Customer asking about different services
    phone: '628456789123',
    name: 'Mas Hadi',
    messages: [
      {
        text: 'Bedanya detailing sama coating apa?',
        sender: 'customer',
        timestamp: new Date('2024-01-15T17:00:00Z')
      }
    ]
  }
];

// Create realistic session objects
function createSession(phone: string, name: string, messages: any[]): Session {
  return {
    senderNumber: phone,
    senderName: name,
    lastInteraction: {
      type: 'message',
      at: Date.now()
    },
    cartServices: [],
    history: messages.map(msg => ({
      role: msg.sender === 'customer' ? 'user' : 'assistant',
      content: msg.text
    }))
  };
}

// Test scenarios
const TEST_SCENARIOS = [
  {
    name: 'New Customer - Detailing Inquiry',
    description: 'Customer baru tanya soal detailing',
    input: 'Halo, mau tanya soal detailing motor',
    expectedTools: ['getServiceDescription', 'listServicesByCategory'],
    expectedResponse: {
      shouldContain: ['detailing', 'motor'],
      shouldNotContain: ['harga', 'booking'],
      maxLength: 200
    }
  },
  {
    name: 'Repaint Pricing - Vario 160',
    description: 'Customer tanya harga repaint motor spesifik',
    input: 'Motor Vario 160 mau repaint, berapa harganya?',
    expectedTools: ['getMotorSizeDetails', 'getPromoBundleDetails', 'getSpecificServicePrice'],
    expectedResponse: {
      shouldContain: ['Vario', 'repaint', 'harga'],
      shouldNotContain: ['booking'],
      maxLength: 300
    }
  },
  {
    name: 'Photo Analysis Request',
    description: 'Customer kirim foto motor untuk analisa',
    input: 'Motor saya seperti ini, bisa di-detail?',
    expectedTools: ['analyzeMotorImage'],
    expectedResponse: {
      shouldContain: ['foto', 'analisa', 'detail'],
      shouldNotContain: ['harga'],
      maxLength: 250
    }
  },
  {
    name: 'Location & Hours Inquiry',
    description: 'Customer tanya lokasi dan jam buka',
    input: 'Dimana lokasi bengkelnya? Jam buka sampai jam berapa?',
    expectedTools: ['searchKnowledgeBase'],
    expectedResponse: {
      shouldContain: ['lokasi', 'jam buka'],
      shouldNotContain: ['harga', 'booking'],
      maxLength: 200
    }
  },
  {
    name: 'Promo Inquiry',
    description: 'Customer tanya promo yang tersedia',
    input: 'Ada promo apa aja nih?',
    expectedTools: ['getPromoBundleDetails'],
    expectedResponse: {
      shouldContain: ['promo', 'bundling'],
      shouldNotContain: ['booking'],
      maxLength: 300
    }
  },
  {
    name: 'Booking Request - NMax',
    description: 'Customer mau booking langsung',
    input: 'Mau booking detailing motor NMax untuk besok',
    expectedTools: ['getMotorSizeDetails', 'checkBookingAvailability', 'createBooking'],
    expectedResponse: {
      shouldContain: ['NMax', 'booking', 'slot'],
      shouldNotContain: ['harga'],
      maxLength: 250
    }
  },
  {
    name: 'Warranty Question',
    description: 'Customer tanya soal garansi',
    input: 'Ada garansi ga untuk repaint?',
    expectedTools: ['searchKnowledgeBase'],
    expectedResponse: {
      shouldContain: ['garansi', 'repaint'],
      shouldNotContain: ['harga', 'booking'],
      maxLength: 200
    }
  },
  {
    name: 'Service Comparison',
    description: 'Customer tanya beda detailing vs coating',
    input: 'Bedanya detailing sama coating apa?',
    expectedTools: ['getServiceDescription', 'searchKnowledgeBase'],
    expectedResponse: {
      shouldContain: ['detailing', 'coating', 'beda'],
      shouldNotContain: ['harga', 'booking'],
      maxLength: 300
    }
  }
];

async function testGeminiWithDirectMessages() {
  console.log('🧪 Testing Gemini AI with Realistic Direct Message Scenarios\n');

  let passedTests = 0;
  let totalTests = 0;

  for (const scenario of TEST_SCENARIOS) {
    totalTests++;
    console.log(`\n📋 Test ${totalTests}: ${scenario.name}`);
    console.log(`📝 Input: "${scenario.input}"`);
    console.log(`🎯 Expected Tools: ${scenario.expectedTools.join(', ')}`);

    try {
      // Create session for this scenario
      const mockData = MOCK_DIRECT_MESSAGES.find(dm => 
        dm.messages.some(msg => msg.text.includes(scenario.input.split(' ')[0]))
      ) || MOCK_DIRECT_MESSAGES[0];
      
      const session = createSession(mockData.phone, mockData.name, mockData.messages);

      // Test AI response
      const startTime = Date.now();
      const result = await runZoyaAIGeminiAgent({
        chatHistory: session.history.map(msg => ({
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content
        })),
        senderNumber: session.senderNumber,
        session
      });
      const responseTime = Date.now() - startTime;

      console.log(`⏱️  Response Time: ${responseTime}ms`);
      console.log(`🤖 AI Response: "${result.suggestedReply}"`);
      console.log(`📊 Response Length: ${result.suggestedReply.length} chars`);

      // Validate response
      let testPassed = true;
      const issues: string[] = [];

      // Check response length
      if (result.suggestedReply.length > scenario.expectedResponse.maxLength) {
        issues.push(`Response too long (${result.suggestedReply.length} > ${scenario.expectedResponse.maxLength})`);
        testPassed = false;
      }

      // Check required content
      for (const required of scenario.expectedResponse.shouldContain) {
        if (!result.suggestedReply.toLowerCase().includes(required.toLowerCase())) {
          issues.push(`Missing required word: "${required}"`);
          testPassed = false;
        }
      }

      // Check forbidden content
      for (const forbidden of scenario.expectedResponse.shouldNotContain) {
        if (result.suggestedReply.toLowerCase().includes(forbidden.toLowerCase())) {
          issues.push(`Contains forbidden word: "${forbidden}"`);
          testPassed = false;
        }
      }

      // Check if response is natural (not robotic)
      const roboticPhrases = ['dengan senang hati', 'tentu saja', 'saya akan', 'dapat saya bantu'];
      const hasRoboticLanguage = roboticPhrases.some(phrase => 
        result.suggestedReply.toLowerCase().includes(phrase.toLowerCase())
      );
      
      if (hasRoboticLanguage) {
        issues.push('Contains robotic language');
        testPassed = false;
      }

      // Display results
      if (testPassed) {
        console.log(`✅ PASSED`);
        passedTests++;
      } else {
        console.log(`❌ FAILED`);
        console.log(`🔍 Issues: ${issues.join(', ')}`);
      }

    } catch (error) {
      console.log(`❌ ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }

    console.log('─'.repeat(80));
  }

  // Summary
  console.log(`\n📊 TEST SUMMARY`);
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  console.log(`📈 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (passedTests === totalTests) {
    console.log(`\n🎉 All tests passed! Gemini AI is working correctly with direct message scenarios.`);
  } else {
    console.log(`\n⚠️  Some tests failed. Check the issues above for improvement areas.`);
  }
}

// Performance test with multiple concurrent requests
async function testPerformance() {
  console.log('\n🚀 Performance Test: Multiple Concurrent Requests\n');

  const concurrentTests = 5;
  const testInput = 'Halo, mau tanya soal detailing motor';
  
  console.log(`Running ${concurrentTests} concurrent tests with input: "${testInput}"`);

  const startTime = Date.now();
  const promises: Promise<any>[] = [];

  for (let i = 0; i < concurrentTests; i++) {
    const session = createSession(`62812345678${i}`, `Test User ${i}`, [{
      text: testInput,
      sender: 'customer',
      timestamp: new Date()
    }]);

    promises.push(
      runZoyaAIGeminiAgent({
        chatHistory: session.history.map(msg => ({
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content
        })),
        senderNumber: session.senderNumber,
        session
      }).catch(error => ({ error: error.message }))
    );
  }

  const results = await Promise.all(promises);
  const totalTime = Date.now() - startTime;
  const avgTime = totalTime / concurrentTests;

  console.log(`⏱️  Total Time: ${totalTime}ms`);
  console.log(`📊 Average Time: ${avgTime.toFixed(0)}ms per request`);
  console.log(`✅ Successful: ${results.filter((r: any) => !r.error).length}/${concurrentTests}`);
  
  if (results.some((r: any) => r.error)) {
    console.log(`❌ Errors: ${results.filter((r: any) => r.error).length} requests failed`);
  }
}

// Main execution
async function main() {
  try {
    await testGeminiWithDirectMessages();
    await testPerformance();
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
