# Token Optimization Implementation Guide

## Problem Analysis

**Current Issues:**
- Token consumption: 6000-8000 tokens per response
- Original master prompt: 220 lines (extremely verbose)
- Long conversation histories consuming excessive tokens
- Complex multi-agent system simplified to single agent but still inefficient

**Root Causes:**
1. **Verbose Master Prompt**: 220-line prompt with extensive examples and formatting rules
2. **No Context Management**: Conversation history keeps growing without optimization
3. **No Token Monitoring**: No tracking of token consumption patterns
4. **Inefficient Model Usage**: Using gpt-4o instead of gpt-4o-mini for simple tasks

## Optimization Strategy

### 1. Prompt Optimization (70% Token Reduction)

**Original Prompt Issues:**
- 220 lines with redundant instructions
- Multiple conversation examples
- Complex formatting rules
- Verbose step-by-step explanations

**Optimized Versions:**

#### A. Optimized Master Prompt (~100 lines)
```typescript
// src/ai/config/aiPrompts-optimized.ts
export const optimizedMasterPrompt = `
Anda adalah **Zoya**, asisten AI Bosmat Repainting and Detailing Studio. Responsif, ramah, profesional.

⚠️ **ATURAN MUTLAK**: Untuk pertanyaan lokasi, jam buka, garansi, kontak → HARUS gunakan searchKnowledgeBase tool.

## Workflow Internal (Tidak Tampil ke Pelanggan)
1. **Analisa**: Identifikasi kebutuhan (detailing/coating/repaint/promo/booking)
2. **Data Motor**: Gunakan getMotorSizeDetails untuk motor_size/repaint_size
3. **Info Layanan**: getServiceDescription, listServicesByCategory, getSpecificServicePrice
4. **Info Umum**: WAJIB searchKnowledgeBase untuk lokasi/jam/garansi/kontak
5. **Promo**: getPromoBundleDetails (KHUSUS REPAINT: tawarkan bundling dulu)
6. **Repaint**: updateRepaintDetailsTool untuk warna/bagian
7. **Booking**: checkBookingAvailability → findNextAvailableSlot → createBooking
8. **Ragu**: triggerBosMatTool

Output: Pesan WhatsApp natural hasil reasoning (reasoning tidak ditampilkan).
`;
```

#### B. Lightweight Prompt (~50 lines)
```typescript
export const lightweightPrompt = `
Anda Zoya, asisten AI Bosmat Detailing Studio. Ramah, profesional, gaya WhatsApp.

**WAJIB**: Lokasi/jam/garansi/kontak → gunakan searchKnowledgeBase
**REPAINT**: Tawarkan promo bundling dulu (getPromoBundleDetails)

Tools tersedia: getMotorSizeDetails, getServiceDescription, listServicesByCategory, getSpecificServicePrice, searchKnowledgeBase, getPromoBundleDetails, updateRepaintDetailsTool, checkBookingAvailability, findNextAvailableSlot, createBooking, triggerBosMatTool

Layanan: Repaint (Bodi/Velg/Cover), Detailing & Coating (Mesin/Poles/Full/Complete Service)
Booking: Nama, HP, Motor, Tanggal, Jam, Layanan. DP: Rp100rb BCA 1662515412

Format: *tebal* _miring_ • bullet, max 2-6 kalimat, panggil "mas"
Ragu → triggerBosMatTool
`;
```

#### C. Minimal Prompt (~25 lines)
```typescript
export const minimalPrompt = `
Zoya - Asisten AI Bosmat Studio. Ramah, profesional, WhatsApp style.

WAJIB searchKnowledgeBase: lokasi/jam/kontak/garansi
REPAINT: getPromoBundleDetails dulu

Tools: getMotorSizeDetails, getServiceDescription, listServicesByCategory, getSpecificServicePrice, searchKnowledgeBase, getPromoBundleDetails, updateRepaintDetailsTool, checkBookingAvailability, findNextAvailableSlot, createBooking, triggerBosMatTool

Layanan: Repaint, Detailing, Coating
Booking: Nama, HP, Motor, Tanggal, Jam, Layanan. DP Rp100rb BCA 1662515412

Max 2-6 kalimat, *tebal* _miring_, panggil "mas". Ragu → triggerBosMatTool
`;
```

### 2. Context Management System

**Conversation History Optimization:**

```typescript
// src/ai/utils/contextManagement.ts

/**
 * Optimize conversation history for token efficiency
 */
export function optimizeConversationHistory(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  maxTokens: number = 3000
): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
  
  // 1. Calculate current token usage
  const stats = calculateConversationTokens(messages);
  
  if (stats.totalTokens <= maxTokens) {
    return messages; // Already within limits
  }
  
  // 2. Create summary of old conversation
  const summary = summarizeOldConversation(messages);
  
  // 3. Trim to recent messages
  const trimmedMessages = trimConversationHistory(messages, maxTokens - estimateTokens(summary));
  
  // 4. Add summary as context if available
  if (summary && trimmedMessages.length > 1) {
    const systemPrompt = trimmedMessages[0];
    const recentMessages = trimmedMessages.slice(1);
    
    return [
      systemPrompt,
      { role: 'system', content: `Konteks percakapan sebelumnya: ${summary}` },
      ...recentMessages
    ];
  }
  
  return trimmedMessages;
}
```

**Conversation Summarization:**

```typescript
export function summarizeOldConversation(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
): string {
  
  const topics = new Set<string>();
  const services = new Set<string>();
  
  messages.forEach(msg => {
    const content = typeof msg.content === 'string' ? msg.content : '';
    const lowerContent = content.toLowerCase();
    
    // Extract topics
    if (lowerContent.includes('booking')) topics.add('booking');
    if (lowerContent.includes('repaint')) topics.add('repaint');
    if (lowerContent.includes('detailing')) topics.add('detailing');
    if (lowerContent.includes('coating')) topics.add('coating');
    // ... more topic extraction
  });
  
  const summary = [];
  if (topics.size > 0) summary.push(`Topik: ${Array.from(topics).join(', ')}`);
  if (services.size > 0) summary.push(`Motor: ${Array.from(services).join(', ')}`);
  
  return summary.join('. ');
}
```

### 3. Token Monitoring System

```typescript
// Monitor token usage in real-time
export function monitorTokenUsage(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  response?: { usage?: { total_tokens?: number; prompt_tokens?: number; completion_tokens?: number } }
): void {
  
  const stats = calculateConversationTokens(messages);
  
  console.log(`[Token Monitor] Conversation: ${stats.totalTokens} tokens, ${stats.historyLength} messages`);
  
  if (response?.usage) {
    console.log(`[Token Monitor] API Usage: ${response.usage.total_tokens} total, ${response.usage.prompt_tokens} prompt, ${response.usage.completion_tokens} completion`);
    
    if ((response.usage.total_tokens ?? 0) > 5000) {
      console.warn(`[Token Monitor] HIGH USAGE: ${response.usage.total_tokens} tokens`);
    }
  }
  
  if (stats.totalTokens > 4000) {
    console.warn(`[Token Monitor] LARGE CONVERSATION: ${stats.totalTokens} tokens, consider optimization`);
  }
}
```

### 4. Optimized Agent Implementation

**Key Changes:**

1. **Reduced Iterations**: 3 instead of 5
2. **Model Optimization**: gpt-4o-mini instead of gpt-4o
3. **Response Token Limit**: 1000 tokens max
4. **Dynamic Prompt Selection**: Based on conversation length
5. **Aggressive Context Management**: Optimize history before processing

```typescript
// src/ai/agent/runZoyaAIAgent-optimized.ts

export async function runZoyaAIAgentOptimized({ 
  chatHistory, 
  session, 
  senderNumber, 
  senderName 
}: ZoyaAgentInput): Promise<ZoyaAgentResult> {
  
  // Select prompt based on conversation length
  const conversationStats = calculateConversationTokens(chatHistory);
  let selectedPrompt = optimizedMasterPrompt;
  
  if (conversationStats.totalTokens > 4000) {
    selectedPrompt = lightweightPrompt;
  } else if (conversationStats.totalTokens > 2500) {
    selectedPrompt = optimizedMasterPrompt;
  }
  
  // Optimize conversation history
  const optimizedHistory = optimizeConversationHistory(chatHistory, 3000);
  
  // Reduced iterations for efficiency
  const maxIterations = 3; // Reduced from 5
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // More efficient model
    messages: optimizedHistory,
    temperature: 0.5, // Reduced for consistency
    tools: zoyaTools,
    tool_choice: 'auto',
    max_tokens: 1000, // Limit response tokens
  });
  
  // ... rest of implementation
}
```

## Implementation Plan

### Phase 1: Immediate Optimizations (Week 1)

1. **Replace Master Prompt**
   ```bash
   # Create optimized prompts
   cp src/ai/config/aiPrompts.ts src/ai/config/aiPrompts-original.ts
   # Implement optimized prompts
   ```

2. **Implement Context Management**
   ```bash
   # Create context management utilities
   touch src/ai/utils/contextManagement.ts
   ```

3. **Add Token Monitoring**
   ```bash
   # Add monitoring to existing flows
   # Modify cs-whatsapp-reply-flow.ts
   ```

### Phase 2: Advanced Optimizations (Week 2)

1. **Optimized Agent**
   ```bash
   # Create optimized agent version
   touch src/ai/agent/runZoyaAIAgent-optimized.ts
   ```

2. **Optimized Flow**
   ```bash
   # Create optimized flow
   touch src/ai/flows/cs-whatsapp-reply-flow-optimized.ts
   ```

3. **Performance Testing**
   ```bash
   # A/B test original vs optimized
   npm run test:token-optimization
   ```

### Phase 3: Production Deployment (Week 3)

1. **Gradual Rollout**
   - 10% traffic to optimized flow
   - Monitor token consumption
   - Compare response quality

2. **Full Migration**
   - Replace original flow with optimized version
   - Update all references
   - Monitor production metrics

## Expected Results

### Token Consumption Reduction

| Component | Before | After | Reduction |
|-----------|--------|--------|-----------|
| Master Prompt | 1500 tokens | 400 tokens | 73% |
| Context Management | No limit | 3000 tokens max | 50-70% |
| Model Efficiency | gpt-4o | gpt-4o-mini | 60% cost |
| **Total Expected** | **6000-8000** | **1500-2500** | **70-75%** |

### Performance Improvements

1. **Latency**: 30-50% faster responses
2. **Cost**: 70-80% reduction in API costs
3. **Scalability**: Support 3-4x more concurrent conversations
4. **Reliability**: Reduced timeout issues

### Quality Maintenance

- **Tool Usage**: Preserved all 15+ specialized tools
- **Business Logic**: Maintained automotive detailing expertise
- **Conversation Flow**: Same natural WhatsApp interaction
- **Functionality**: All features (booking, pricing, promo) intact

## Monitoring & Alerts

### Token Usage Alerts

```typescript
// Alert if token usage exceeds thresholds
if (tokenUsage > 4000) {
  console.warn(`HIGH TOKEN USAGE: ${tokenUsage} tokens`);
  // Send alert to monitoring system
}

if (tokenUsage > 6000) {
  console.error(`CRITICAL TOKEN USAGE: ${tokenUsage} tokens`);
  // Immediate alert to engineering team
}
```

### Performance Metrics

```typescript
// Track optimization effectiveness
const metrics = {
  averageTokensPerResponse: tokenUsage,
  conversationLength: messages.length,
  optimizationApplied: true,
  promptVersion: 'lightweight',
  modelUsed: 'gpt-4o-mini',
  toolsUsed: toolsUsed.length,
  responseLatency: latencyMs
};
```

## Migration Strategy

### Step 1: Create Optimized Version
- Keep original implementation as fallback
- Implement optimized version in parallel
- Add feature flags for gradual rollout

### Step 2: A/B Testing
- Route 10% of traffic to optimized version
- Monitor token consumption and response quality
- Adjust optimization parameters based on results

### Step 3: Full Migration
- Gradually increase traffic to optimized version
- Monitor production metrics closely
- Switch fully once stability is confirmed

### Step 4: Cleanup
- Remove original implementation
- Update documentation
- Train team on new optimizations

This optimization should reduce token consumption from 6000-8000 to 1500-2500 tokens per response (70-75% reduction) while maintaining the same functionality and conversation quality.
