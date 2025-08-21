// types/global.d.ts

// Global type definitions for the project

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Google AI Configuration
      GOOGLE_AI_API_KEY: string;
      GOOGLE_AI_PROJECT_ID?: string;
      GOOGLE_AI_LOCATION?: string;
      
      // AI Provider Configuration
      AI_PROVIDER: 'openai' | 'gemini' | 'hybrid';
      
      // OpenAI Configuration
      OPENAI_API_KEY: string;
      
      // Firebase Configuration
      NEXT_PUBLIC_FIREBASE_API_KEY: string;
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      NEXT_PUBLIC_FIREBASE_APP_ID: string;
      
      // WhatsApp Configuration
      WHATSAPP_TOKEN?: string;
      WHATSAPP_PHONE_NUMBER_ID?: string;
      WHATSAPP_WEBHOOK_VERIFY_TOKEN?: string;
      
      // LangSmith Configuration
      LANGSMITH_TRACING?: string;
      LANGSMITH_PROJECT?: string;
      LANGSMITH_API_KEY?: string;
      LANGSMITH_ENDPOINT?: string;
      
      // Environment Configuration
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_APP_URL?: string;
      
      // Vercel Configuration
      VERCEL_ENV?: string;
      VERCEL_URL?: string;
      
      // Cron Configuration
      CRON_SECRET?: string;
    }
  }
}

// Jest types
declare module 'jest' {
  interface Matchers<R> {
    toBeValidUUID(): R;
    toHaveBeenCalledWithGemini(): R;
    toHaveBeenCalledWithOpenAI(): R;
  }
}

// Google AI types
declare module '@google/generative-ai' {
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(config: {
      model: string;
      generationConfig?: {
        temperature?: number;
        maxOutputTokens?: number;
        topP?: number;
        topK?: number;
      };
      safetySettings?: Array<{
        category: string;
        threshold: string;
      }>;
    }): GenerativeModel;
  }

  export interface GenerativeModel {
    generateContent(prompt: string | any[]): Promise<GenerateContentResult>;
    startChat(config?: {
      history?: Array<{
        role: string;
        parts: Array<{ text: string }>;
      }>;
      generationConfig?: {
        temperature?: number;
        maxOutputTokens?: number;
      };
    }): ChatSession;
    embedContent(content: string): Promise<EmbedContentResult>;
  }

  export interface GenerateContentResult {
    response: {
      text(): string;
    };
    usageMetadata?: {
      promptTokenCount?: number;
      candidatesTokenCount?: number;
      totalTokenCount?: number;
    };
  }

  export interface ChatSession {
    sendMessage(message: string): Promise<GenerateContentResult>;
  }

  export interface EmbedContentResult {
    embedding: {
      values: number[];
    };
  }
}

// LangSmith types
declare module 'langsmith/traceable' {
  export function traceable<T extends (...args: any[]) => any>(
    fn: T,
    options?: {
      name?: string;
      tags?: string[];
      metadata?: Record<string, any>;
    }
  ): T;
}

declare module 'langsmith/wrappers' {
  export function wrapOpenAI(
    client: any,
    options?: {
      name?: string;
      project_name?: string;
    }
  ): any;

  export function wrapGoogleAI(
    client: any,
    options?: {
      name?: string;
      project_name?: string;
    }
  ): any;
}

export {};
