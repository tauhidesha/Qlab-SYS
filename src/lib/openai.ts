// @file: src/lib/openai.ts

import OpenAI from 'openai';
import { wrapOpenAI } from 'langsmith/wrappers';

// Inisialisasi client OpenAI
// SDK akan secara otomatis membaca OPENAI_API_KEY dari process.env
// berkat `dotenv/config` yang kita jalankan di skrip.
const baseOpenAI = new OpenAI();

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