
// The manual 'dotenv' call is removed to rely on Next.js's native .env handling, preventing potential conflicts.

import '@/lib/firebase'; // Ensure Firebase is initialized early
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

if (!process.env.GOOGLE_API_KEY) {
  const errorMessage = "Kesalahan Konfigurasi: GOOGLE_API_KEY tidak ditemukan di environment variables. Ini dibutuhkan oleh plugin Google AI. Pastikan sudah di-set di file .env Anda.";
  console.error(`\n\n🛑 ${errorMessage}\n\n`);
  throw new Error(errorMessage);
}

export const ai = genkit({
  plugins: [
    googleAI(), // Rely on environment variable, don't pass apiKey explicitly
  ],
  model: 'googleai/gemini-1.5-flash-latest',
  // Telemetry options are no longer configured here in Genkit v1.x
});
