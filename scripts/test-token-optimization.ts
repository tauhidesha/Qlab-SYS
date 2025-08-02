// @file: scripts/test-token-optimization.ts
// Script untuk testing dan comparison token usage

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import type { ZoyaChatInput } from '@/types/ai/cs-whatsapp-reply';

// Check environment and determine testing mode
const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
const forceMock = process.argv.includes('--mock');
const forceReal = process.argv.includes('--real');

console.log(`🔑 OPENAI_API_KEY: ${hasOpenAIKey ? 'Found' : 'Not found'}`);
console.log(`🧪 Testing Mode: ${forceMock || !hasOpenAIKey ? 'Mock' : 'Real API'}`);

if (!hasOpenAIKey && !forceMock) {
  console.log('\n❌ OPENAI_API_KEY tidak ditemukan di environment variables');
  console.log('💡 Opsi untuk menjalankan test:');
  console.log('   1. Tambahkan OPENAI_API_KEY ke .env.local');
  console.log('   2. Export OPENAI_API_KEY=your_key');
  console.log('   3. Gunakan mock mode: npm run test:token-optimization -- --mock');
  console.log('   4. One-liner: OPENAI_API_KEY=your_key npm run test:token-optimization');
  
  if (!forceMock) {
    console.log('\n🔄 Switching to mock mode automatically...');
  }
}

// Mock functions untuk testing tanpa API key
const mockGenerateWhatsAppReply = async (input: ZoyaChatInput) => {
  return {
    suggestedReply: "Mock response from original flow",
    toolCalls: [
      { id: "call_1", toolName: "getMotorSizeDetails", arguments: { motor_query: "beat" } },
      { id: "call_2", toolName: "getSpecificServicePrice", arguments: { service_name: "coating", size: "M" } }
    ],
    route: 'original_flow',
    metadata: {
      toolsUsed: ["getMotorSizeDetails", "getSpecificServicePrice"],
      iterations: 2,
      tokenUsage: {
        estimated: Math.floor(Math.random() * 3000) + 5000, // Simulate 5000-8000 tokens
        actual: Math.floor(Math.random() * 3000) + 5000
      }
    }
  };
};

const mockGenerateWhatsAppReplyOptimized = async (input: ZoyaChatInput) => {
  return {
    suggestedReply: "Mock response from optimized flow",
    toolCalls: [
      { id: "call_1", toolName: "getMotorSizeDetails", arguments: { motor_query: "beat" } },
      { id: "call_2", toolName: "getSpecificServicePrice", arguments: { service_name: "coating", size: "M" } }
    ],
    route: 'optimized_flow',
    metadata: {
      toolsUsed: ["getMotorSizeDetails", "getSpecificServicePrice"],
      iterations: 1,
      tokenUsage: {
        estimated: Math.floor(Math.random() * 1000) + 1500, // Simulate 1500-2500 tokens
        actual: Math.floor(Math.random() * 1000) + 1500
      },
      optimized: true,
      promptVersion: 'lightweight'
    }
  };
};

// Dynamic import untuk menghindari error API key saat testing
let generateWhatsAppReply: any;
let generateWhatsAppReplyOptimized: any;

const initializeRealFunctions = async () => {
  try {
    if (process.env.OPENAI_API_KEY) {
      const originalFlow = await import('@/ai/flows/cs-whatsapp-reply-flow');
      const optimizedFlow = await import('@/ai/flows/cs-whatsapp-reply-flow-optimized');
      
      generateWhatsAppReply = originalFlow.generateWhatsAppReply;
      generateWhatsAppReplyOptimized = optimizedFlow.generateWhatsAppReplyOptimized;
      
      console.log('✅ Using real API flows with OPENAI_API_KEY');
      return true;
    } else {
      console.log('⚠️  OPENAI_API_KEY not found, using mock functions');
      console.log('💡 To test with real API, set OPENAI_API_KEY environment variable');
      return false;
    }
  } catch (error) {
    console.log('⚠️  Could not load real flows, using mock functions');
    console.log('💡 Error:', error instanceof Error ? error.message : String(error));
    return false;
  }
};

// Test cases yang representatif
const testCases: Array<{ name: string; input: ZoyaChatInput }> = [
  {
    name: "Simple Service Inquiry",
    input: {
      customerMessage: "Halo kak, mau tanya harga coating motor beat",
      senderNumber: "6281234567890",
      senderName: "Test Customer 1"
    }
  },
  {
    name: "Complex Repaint Request",
    input: {
      customerMessage: "Saya mau repaint nmax warna candy merah, sama velgnya. Kira-kira berapa ya harganya? Ada promo nggak?",
      senderNumber: "6281234567891", 
      senderName: "Test Customer 2"
    }
  },
  {
    name: "Booking Request",
    input: {
      customerMessage: "Mau booking full detailing untuk vario, besok siang bisa nggak kak?",
      senderNumber: "6281234567892",
      senderName: "Test Customer 3"
    }
  },
  {
    name: "Info Location",
    input: {
      customerMessage: "Alamat bengkelnya dimana ya kak? Jam bukanya berapa?",
      senderNumber: "6281234567893",
      senderName: "Test Customer 4"
    }
  },
  {
    name: "Long Conversation Context", 
    input: {
      customerMessage: "Jadi untuk coating yang tadi gimana kak? Udah cek promo bundlingnya belum?",
      senderNumber: "6281234567894",
      senderName: "Test Customer 5"
    }
  }
];

interface TestResult {
  testName: string;
  originalResult: {
    tokensUsed?: number;
    latency: number;
    toolsUsed: number;
    responseLength: number;
    success: boolean;
    error?: string;
  };
  optimizedResult: {
    tokensUsed?: number;
    latency: number;
    toolsUsed: number;
    responseLength: number;
    success: boolean;
    error?: string;
  };
  improvement: {
    tokenReduction?: number;
    tokenReductionPercent?: number;
    latencyImprovement: number;
    latencyImprovementPercent: number;
  };
}

async function runSingleTest(testCase: { name: string; input: ZoyaChatInput }): Promise<TestResult> {
  console.log(`\n🧪 Testing: ${testCase.name}`);
  
  // Test original implementation
  console.log('  📊 Running original flow...');
  const originalStart = Date.now();
  let originalResult: any;
  let originalError: string | undefined;
  
  try {
    const flowFunction = generateWhatsAppReply || mockGenerateWhatsAppReply;
    originalResult = await flowFunction(testCase.input);
  } catch (error) {
    originalError = error instanceof Error ? error.message : String(error);
    console.error('  ❌ Original flow failed:', originalError);
  }
  const originalLatency = Date.now() - originalStart;
  
  // Test optimized implementation  
  console.log('  ⚡ Running optimized flow...');
  const optimizedStart = Date.now();
  let optimizedResult: any;
  let optimizedError: string | undefined;
  
  try {
    const flowFunction = generateWhatsAppReplyOptimized || mockGenerateWhatsAppReplyOptimized;
    optimizedResult = await flowFunction(testCase.input);
  } catch (error) {
    optimizedError = error instanceof Error ? error.message : String(error);
    console.error('  ❌ Optimized flow failed:', optimizedError);
  }
  const optimizedLatency = Date.now() - optimizedStart;
  
  // Calculate improvements
  const originalTokens = originalResult?.metadata?.tokenUsage?.actual || originalResult?.metadata?.tokenUsage?.estimated;
  const optimizedTokens = optimizedResult?.metadata?.tokenUsage?.actual || optimizedResult?.metadata?.tokenUsage?.estimated;
  
  const tokenReduction = originalTokens && optimizedTokens ? originalTokens - optimizedTokens : undefined;
  const tokenReductionPercent = originalTokens && optimizedTokens ? 
    ((originalTokens - optimizedTokens) / originalTokens) * 100 : undefined;
  
  const latencyImprovement = originalLatency - optimizedLatency;
  const latencyImprovementPercent = ((originalLatency - optimizedLatency) / originalLatency) * 100;
  
  return {
    testName: testCase.name,
    originalResult: {
      tokensUsed: originalTokens,
      latency: originalLatency,
      toolsUsed: originalResult?.toolCalls?.length || 0,
      responseLength: originalResult?.suggestedReply?.length || 0,
      success: !originalError,
      error: originalError
    },
    optimizedResult: {
      tokensUsed: optimizedTokens,
      latency: optimizedLatency,
      toolsUsed: optimizedResult?.toolCalls?.length || 0,
      responseLength: optimizedResult?.suggestedReply?.length || 0,
      success: !optimizedError,
      error: optimizedError
    },
    improvement: {
      tokenReduction,
      tokenReductionPercent,
      latencyImprovement,
      latencyImprovementPercent
    }
  };
}

function generateReport(results: TestResult[]): void {
  console.log('\n' + '='.repeat(80));
  console.log('📈 TOKEN OPTIMIZATION TEST REPORT');
  console.log('='.repeat(80));
  
  // Individual test results
  results.forEach(result => {
    console.log(`\n🧪 ${result.testName}`);
    console.log('  Original Flow:');
    console.log(`    ⏱️  Latency: ${result.originalResult.latency}ms`);
    console.log(`    🎯 Tokens: ${result.originalResult.tokensUsed || 'N/A'}`);
    console.log(`    🔧 Tools: ${result.originalResult.toolsUsed}`);
    console.log(`    📝 Response Length: ${result.originalResult.responseLength} chars`);
    console.log(`    ✅ Success: ${result.originalResult.success}`);
    
    console.log('  Optimized Flow:');
    console.log(`    ⏱️  Latency: ${result.optimizedResult.latency}ms`);
    console.log(`    🎯 Tokens: ${result.optimizedResult.tokensUsed || 'N/A'}`);
    console.log(`    🔧 Tools: ${result.optimizedResult.toolsUsed}`);
    console.log(`    📝 Response Length: ${result.optimizedResult.responseLength} chars`);
    console.log(`    ✅ Success: ${result.optimizedResult.success}`);
    
    console.log('  Improvements:');
    if (result.improvement.tokenReduction) {
      console.log(`    📉 Token Reduction: ${result.improvement.tokenReduction} (${result.improvement.tokenReductionPercent?.toFixed(1)}%)`);
    }
    console.log(`    ⚡ Latency Improvement: ${result.improvement.latencyImprovement}ms (${result.improvement.latencyImprovementPercent.toFixed(1)}%)`);
  });
  
  // Summary statistics
  const successfulTests = results.filter(r => r.originalResult.success && r.optimizedResult.success);
  
  if (successfulTests.length > 0) {
    const avgTokenReduction = successfulTests
      .filter(r => r.improvement.tokenReduction)
      .reduce((sum, r) => sum + (r.improvement.tokenReductionPercent || 0), 0) / 
      successfulTests.filter(r => r.improvement.tokenReduction).length;
    
    const avgLatencyImprovement = successfulTests
      .reduce((sum, r) => sum + r.improvement.latencyImprovementPercent, 0) / successfulTests.length;
    
    const avgOriginalTokens = successfulTests
      .filter(r => r.originalResult.tokensUsed)
      .reduce((sum, r) => sum + (r.originalResult.tokensUsed || 0), 0) /
      successfulTests.filter(r => r.originalResult.tokensUsed).length;
    
    const avgOptimizedTokens = successfulTests
      .filter(r => r.optimizedResult.tokensUsed)
      .reduce((sum, r) => sum + (r.optimizedResult.tokensUsed || 0), 0) /
      successfulTests.filter(r => r.optimizedResult.tokensUsed).length;
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 SUMMARY STATISTICS');
    console.log('='.repeat(50));
    console.log(`✅ Successful Tests: ${successfulTests.length}/${results.length}`);
    console.log(`📊 Average Token Usage:`);
    console.log(`   Original: ${avgOriginalTokens.toFixed(0)} tokens`);
    console.log(`   Optimized: ${avgOptimizedTokens.toFixed(0)} tokens`);
    console.log(`📉 Average Token Reduction: ${avgTokenReduction.toFixed(1)}%`);
    console.log(`⚡ Average Latency Improvement: ${avgLatencyImprovement.toFixed(1)}%`);
    
    // Success rate
    const originalSuccessRate = (results.filter(r => r.originalResult.success).length / results.length) * 100;
    const optimizedSuccessRate = (results.filter(r => r.optimizedResult.success).length / results.length) * 100;
    console.log(`🎯 Success Rates:`);
    console.log(`   Original: ${originalSuccessRate.toFixed(1)}%`);
    console.log(`   Optimized: ${optimizedSuccessRate.toFixed(1)}%`);
  }
  
  console.log('\n' + '='.repeat(80));
}

async function main() {
  console.log('🚀 Starting Token Optimization Test Suite');
  console.log(`📋 Running ${testCases.length} test cases...`);
  
  // Initialize functions (real or mock)
  const usingRealAPI = await initializeRealFunctions();
  
  if (!usingRealAPI) {
    console.log('\n🎭 MOCK MODE ENABLED');
    console.log('📊 This will simulate token usage patterns for demonstration');
    if (!hasOpenAIKey) {
      console.log('\n� To test with real API, add OPENAI_API_KEY to .env.local:');
      console.log('   echo "OPENAI_API_KEY=your_openai_api_key_here" >> .env.local');
      console.log('\n�🔑 Alternative ways to test with real API:');
      console.log('   OPENAI_API_KEY=your_key npm run test:token-optimization');
      console.log('   npm run test:token-optimization:real');
    }
  } else {
    console.log('\n🔑 REAL API MODE ENABLED');
    console.log('💰 This will consume OpenAI tokens - make sure you have credits');
  }
  
  console.log('\n' + '='.repeat(60));
  
  const results: TestResult[] = [];
  
  for (const testCase of testCases) {
    try {
      const result = await runSingleTest(testCase);
      results.push(result);
      
      // Short delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Test failed for ${testCase.name}:`, error);
    }
  }
  
  generateReport(results);
  
  console.log('\n✅ Test suite completed!');
  if (usingRealAPI) {
    console.log('💡 Results based on real API usage');
  } else {
    console.log('💡 Results based on simulated token usage patterns');
    console.log('\n🎯 Quick Setup for Real Testing:');
    console.log('   1. Get OpenAI API key from: https://platform.openai.com/api-keys');
    console.log('   2. echo "OPENAI_API_KEY=your_key_here" >> .env.local');
    console.log('   3. npm run test:token-optimization');
  }
}

// Export for use in other scripts
export { runSingleTest, generateReport, testCases };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
