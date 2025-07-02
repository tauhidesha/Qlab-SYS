// @file: src/lib/openai.ts

import OpenAI from 'openai';

// Inisialisasi client OpenAI
// SDK akan secara otomatis membaca OPENAI_API_KEY dari process.env
// berkat `dotenv/config` yang kita jalankan di skrip.
export const openai = new OpenAI();

console.log('[openai.ts] OpenAI client initialized.');