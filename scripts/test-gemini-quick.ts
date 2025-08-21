#!/usr/bin/env tsx

/**
 * Quick test for Gemini AI with common direct message scenarios
 * Fast testing without full validation
 */

import { runZoyaAIGeminiAgent } from '../src/ai/agent/runZoyaAIGeminiAgent';
import type { Session } from '../src/types/ai/session';

// Quick test scenarios based on common customer messages
const QUICK_TESTS = [
  {
    name: 'Greeting',
    input: 'Halo',
    expectedKeywords: ['halo', 'bosmat', 'zoya']
  },
  {
    name: 'Detailing Inquiry',
    input: 'Mau detailing motor',
    expectedKeywords: ['detailing', 'motor']
  },
  {
    name: 'Repaint Price',
    input: 'Berapa harga repaint Vario?',
    expectedKeywords: ['repaint', 'vario', 'harga']
  },
  {
    name: 'Location',
    input: 'Dimana lokasinya?',
    expectedKeywords: ['lokasi', 'alamat']
  },
  {
    name: 'Promo',
    input: 'Ada promo apa?',
    expectedKeywords: ['promo', 'bundling']
  },
  {
    name: 'Booking',
    input: 'Mau booking',
    expectedKeywords: ['booking', 'slot']
  }
];

// Create minimal session
function createQuickSession(phone: string = '628123456789'): Session {
  return {
    senderNumber: phone,
    lastInteraction: {
      type: 'message',
      at: Date.now()
    },
    cartServices: [],
    history: []
  };
}

async function runQuickTests() {
  console.log('⚡ Quick Gemini AI Test\n');

  for (const test of QUICK_TESTS) {
    console.log(`\n📝 Test: ${test.name}`);
    console.log(`💬 Input: "${test.input}"`);

    try {
      const session = createQuickSession();
      const startTime = Date.now();
      
      const result = await runZoyaAIGeminiAgent({
        chatHistory: [{
          role: 'user' as const,
          content: test.input
        }],
        senderNumber: session.senderNumber,
        session
      });
      
      const responseTime = Date.now() - startTime;
      
      console.log(`⏱️  Time: ${responseTime}ms`);
      console.log(`📊 Length: ${result.suggestedReply.length} chars`);
      console.log(`🤖 Response: "${result.suggestedReply}"`);

      // Quick validation
      const hasKeywords = test.expectedKeywords.some(keyword => 
        result.suggestedReply.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (hasKeywords) {
        console.log(`✅ PASS - Contains expected keywords`);
      } else {
        console.log(`⚠️  WARN - Missing some keywords: ${test.expectedKeywords.join(', ')}`);
      }

    } catch (error) {
      console.log(`❌ ERROR: ${error instanceof Error ? error.message : String(error)}`);
    }

    console.log('─'.repeat(60));
  }

  console.log('\n✅ Quick test completed!');
}

// Main execution
if (require.main === module) {
  runQuickTests().catch(console.error);
}
