// @file: src/ai/utils/contextManagement.ts

import type OpenAI from 'openai';

interface TokenStats {
  totalTokens: number;
  promptTokens: number;
  historyLength: number;
}

/**
 * Estimate token count for messages (rough approximation: 1 token ≈ 0.75 words)
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4); // Rough estimate: 4 chars ≈ 1 token
}

/**
 * Calculate total tokens in conversation history
 */
export function calculateConversationTokens(messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]): TokenStats {
  let totalTokens = 0;
  let promptTokens = 0;
  
  messages.forEach(msg => {
    const content = typeof msg.content === 'string' ? msg.content : '';
    const tokens = estimateTokens(content);
    totalTokens += tokens;
    
    if (msg.role === 'system' || msg.role === 'user') {
      promptTokens += tokens;
    }
  });
  
  return {
    totalTokens,
    promptTokens,
    historyLength: messages.length
  };
}

/**
 * Trim conversation history to keep within token limits
 * Keeps system prompt + recent conversation
 */
export function trimConversationHistory(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  maxTokens: number = 3000
): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
  
  if (messages.length === 0) return messages;
  
  // Always keep system prompt (first message)
  const systemPrompt = messages.find(msg => msg.role === 'system');
  const nonSystemMessages = messages.filter(msg => msg.role !== 'system');
  
  if (!systemPrompt) {
    console.warn('[trimConversationHistory] No system prompt found');
    return messages.slice(-10); // Keep last 10 messages as fallback
  }
  
  const systemTokens = estimateTokens(typeof systemPrompt.content === 'string' ? systemPrompt.content : '');
  let remainingTokens = maxTokens - systemTokens;
  
  // Keep recent messages within token limit
  const recentMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
  
  // Start from the end and work backwards
  for (let i = nonSystemMessages.length - 1; i >= 0; i--) {
    const msg = nonSystemMessages[i];
    const content = typeof msg.content === 'string' ? msg.content : '';
    const msgTokens = estimateTokens(content);
    
    if (msgTokens <= remainingTokens) {
      recentMessages.unshift(msg);
      remainingTokens -= msgTokens;
    } else {
      break;
    }
  }
  
  const trimmedHistory = [systemPrompt, ...recentMessages];
  
  console.log(`[trimConversationHistory] Trimmed from ${messages.length} to ${trimmedHistory.length} messages`);
  console.log(`[trimConversationHistory] Estimated tokens: ${calculateConversationTokens(trimmedHistory).totalTokens}`);
  
  return trimmedHistory;
}

/**
 * Summarize old conversation to preserve context while reducing tokens
 */
export function summarizeOldConversation(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
): string {
  
  if (messages.length < 5) return '';
  
  const userMessages = messages.filter(msg => msg.role === 'user').slice(0, -2); // Exclude last 2 user messages
  const assistantMessages = messages.filter(msg => msg.role === 'assistant').slice(0, -2);
  
  if (userMessages.length === 0) return '';
  
  const topics = new Set<string>();
  const services = new Set<string>();
  
  [...userMessages, ...assistantMessages].forEach(msg => {
    const content = typeof msg.content === 'string' ? msg.content : '';
    const lowerContent = content.toLowerCase();
    
    // Extract topics
    if (lowerContent.includes('booking') || lowerContent.includes('jadwal')) topics.add('booking');
    if (lowerContent.includes('repaint') || lowerContent.includes('cat')) topics.add('repaint');
    if (lowerContent.includes('detailing') || lowerContent.includes('cuci')) topics.add('detailing');
    if (lowerContent.includes('coating') || lowerContent.includes('coating')) topics.add('coating');
    if (lowerContent.includes('promo') || lowerContent.includes('bundling')) topics.add('promo');
    if (lowerContent.includes('harga') || lowerContent.includes('price')) topics.add('harga');
    if (lowerContent.includes('lokasi') || lowerContent.includes('alamat')) topics.add('lokasi');
    
    // Extract motor types
    const motorKeywords = ['beat', 'vario', 'scoopy', 'nmax', 'aerox', 'pcx', 'xmax', 'mio', 'fino'];
    motorKeywords.forEach(motor => {
      if (lowerContent.includes(motor)) services.add(`motor ${motor}`);
    });
  });
  
  const summary: string[] = [];
  if (topics.size > 0) summary.push(`Topik yang pernah dibahas: ${Array.from(topics).join(', ')}`);
  if (services.size > 0) summary.push(`Motor: ${Array.from(services).join(', ')}`);
  
  return summary.join('. ');
}

/**
 * Create context-aware conversation history
 * Combines summarization and trimming for optimal token usage
 */
export function optimizeConversationHistory(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  maxTokens: number = 3000
): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
  
  if (messages.length <= 5) return messages;
  
  const stats = calculateConversationTokens(messages);
  
  if (stats.totalTokens <= maxTokens) {
    console.log(`[optimizeConversationHistory] Within limits: ${stats.totalTokens} tokens`);
    return messages;
  }
  
  console.log(`[optimizeConversationHistory] Over limit: ${stats.totalTokens} tokens, optimizing...`);
  
  // Create summary of old conversation
  const summary = summarizeOldConversation(messages);
  
  // Trim to recent messages
  const trimmedMessages = trimConversationHistory(messages, maxTokens - (summary ? estimateTokens(summary) : 0));
  
  // Add summary as context if available
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

/**
 * Monitor token usage and log warnings
 */
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
