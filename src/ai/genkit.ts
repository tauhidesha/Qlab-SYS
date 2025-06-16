import {genkit} from 'genkit';
import {openai} from 'genkitx-openai'; // Impor plugin OpenAI

export const ai = genkit({
  plugins: [
    openai({ // Gunakan plugin OpenAI
      // Kamu mungkin perlu menambahkan konfigurasi API key di sini jika tidak via environment variable
      // apiKey: process.env.OPENAI_API_KEY, 
    }),
  ],
  model: 'openai/gpt-3.5-turbo', // Set model default ke model OpenAI
  // Telemetry options removed for Genkit v1.x compatibility
});
