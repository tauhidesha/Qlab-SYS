// @file: src/lib/openai.ts

import OpenAI from 'openai';
import { wrapOpenAI } from 'langsmith/wrappers';

// Inisialisasi client OpenAI
// SDK akan secara otomatis membaca OPENAI_API_KEY dari process.env
// berkat `dotenv/config` yang kita jalankan di skrip.
let baseOpenAI: OpenAI;

try {
  baseOpenAI = new OpenAI();
} catch (error) {
  console.warn('[openai.ts] OpenAI API key not found, using mock client');
  // Create a mock client for development/testing
  baseOpenAI = {
    chat: {
      completions: {
        create: async () => ({ 
          choices: [{ message: { content: 'Mock OpenAI response' } }],
          usage: { total_tokens: 0, prompt_tokens: 0, completion_tokens: 0 }
        })
      }
    },
    embeddings: {
      create: async () => ({ 
        data: [{ embedding: new Array(1536).fill(0) }],
        usage: { total_tokens: 0, prompt_tokens: 0 }
      })
    }
  } as any;
}

// Wrap OpenAI dengan LangSmith tracing jika diaktifkan
export const openai = process.env.LANGSMITH_TRACING === 'true' 
  ? wrapOpenAI(baseOpenAI, {
      name: 'qlab-openai-client',
      project_name: process.env.LANGSMITH_PROJECT || 'qlab-sys-development',
    })
  : baseOpenAI;

console.log('[openai.ts] OpenAI client initialized.', {
  langsmithEnabled: process.env.LANGSMITH_TRACING === 'true',
  project: process.env.LANGSMITH_PROJECT || 'qlab-sys-development'
});