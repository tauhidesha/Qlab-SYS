
import '@/lib/firebase'; // Ensure Firebase is initialized early
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai'; // Impor plugin Google AI

if (!process.env.GOOGLE_API_KEY) {
  const errorMessage = "Kesalahan Konfigurasi: GOOGLE_API_KEY tidak ditemukan di environment variables. Ini dibutuhkan oleh plugin Google AI. Pastikan sudah di-set di file .env Anda.";
  console.error(`\n\n🛑 ${errorMessage}\n\n`);
  throw new Error(errorMessage);
}

export const ai = genkit({
  plugins: [
    googleAI(), // Gunakan plugin Google AI
  ],
  model: 'googleai/gemini-2.0-flash-exp', // Model diubah ke Gemini 2.0 Flash Experimental
  // Opsi telemetry tidak lagi dikonfigurasi di sini untuk Genkit v1.x
  // Jika butuh logging, konfigurasi dilakukan secara berbeda atau via environment.
});

