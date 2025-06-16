
import {genkit} from 'genkit';
import { openAI } from 'genkitx-openai'; // Impor plugin OpenAI (Fixed: openAI with capital AI)

export const ai = genkit({
  plugins: [
    openAI({ // Gunakan plugin OpenAI (Fixed: openAI with capital AI)
      // Kamu mungkin perlu menambahkan konfigurasi API key di sini jika tidak via environment variable
      // apiKey: process.env.OPENAI_API_KEY, 
    }),
  ],
  model: 'openai/gpt-3.5-turbo', // Set model default ke model OpenAI
  // Telemetry options removed for Genkit v1.x compatibility
});
