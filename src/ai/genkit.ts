
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai'; // Impor plugin Google AI

export const ai = genkit({
  plugins: [
    googleAI(), // Gunakan plugin Google AI
  ],
  model: 'googleai/gemini-2.0-flash-exp', // Set model default ke Gemini 2.0 Flash Experimental
  // Opsi telemetry tidak lagi dikonfigurasi di sini untuk Genkit v1.x
  // Jika butuh logging, konfigurasi dilakukan secara berbeda atau via environment.
});
