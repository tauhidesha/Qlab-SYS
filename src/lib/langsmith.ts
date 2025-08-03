// @file: src/lib/langsmith.ts

import { traceable } from 'langsmith/traceable';

// LangSmith configuration
export const LANGSMITH_CONFIG = {
  enabled: process.env.LANGSMITH_TRACING === 'true',
  project: process.env.LANGSMITH_PROJECT || 'qlab-sys-development',
  endpoint: process.env.LANGSMITH_ENDPOINT,
  apiKey: process.env.LANGSMITH_API_KEY,
} as const;

// Log configuration on import
console.log('[LangSmith Config]', {
  enabled: LANGSMITH_CONFIG.enabled,
  project: LANGSMITH_CONFIG.project,
  endpoint: LANGSMITH_CONFIG.endpoint ? 'configured' : 'not set',
  apiKey: LANGSMITH_CONFIG.apiKey ? 'configured' : 'not set'
});

// Helper function to create traceable functions with default config
export function createTraceable<T extends (...args: any[]) => any>(
  fn: T,
  name: string,
  tags: string[] = [],
  metadata: Record<string, any> = {}
): T {
  if (!LANGSMITH_CONFIG.enabled) {
    return fn;
  }

  return traceable(fn, {
    name,
    project_name: LANGSMITH_CONFIG.project,
    tags: ['qlab-sys', ...tags],
    metadata: {
      service: 'qlab-sys',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      ...metadata
    }
  }) as T;
}

// Common tags for different components
export const TRACE_TAGS = {
  AI_AGENT: ['ai-agent', 'zoya'],
  WHATSAPP: ['whatsapp', 'messaging'],
  TOOLS: ['tools', 'execution'],
  BOOKING: ['booking', 'scheduling'],
  REPAINT: ['repaint', 'services'],
  CUSTOMER: ['customer', 'interaction']
} as const;

// Helper to create trace metadata
export function createTraceMetadata(
  component: string,
  operation: string,
  additionalData: Record<string, any> = {}
) {
  return {
    component,
    operation,
    version: '2.0',
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    ...additionalData
  };
}

export default LANGSMITH_CONFIG;
