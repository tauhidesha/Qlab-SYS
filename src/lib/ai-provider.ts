// @file: src/lib/ai-provider.ts

export type AIProvider = 'openai' | 'gemini' | 'hybrid';

export interface AIProviderConfig {
  provider: AIProvider;
  fallbackProvider?: AIProvider;
  enableHybrid?: boolean;
}

export const AI_PROVIDER_CONFIG: AIProviderConfig = {
  provider: (process.env.AI_PROVIDER as AIProvider) || 'gemini',
  fallbackProvider: 'openai',
  enableHybrid: process.env.AI_PROVIDER === 'hybrid',
};

export function getCurrentAIProvider(): AIProvider {
  return AI_PROVIDER_CONFIG.provider;
}

export function shouldUseFallback(error: any): boolean {
  // Use fallback for specific errors
  const fallbackErrors = [
    'quota_exceeded',
    'rate_limit_exceeded',
    'service_unavailable',
    'timeout',
  ];
  
  return fallbackErrors.some(errorType => 
    error.message?.toLowerCase().includes(errorType)
  );
}

export function logAIProviderUsage(provider: AIProvider, success: boolean) {
  console.log(`[AI Provider] ${provider} - ${success ? 'SUCCESS' : 'FAILED'}`);
}
