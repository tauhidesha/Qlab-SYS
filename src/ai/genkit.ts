
'use server';
import {genkit} from 'genkit';
import {openAI} from '@genkit-ai/openai'; // Menggunakan @genkit-ai/openai

export const ai = genkit({
  plugins: [
    openAI(), // Menggunakan plugin OpenAI resmi
  ],
  model: 'openai/gpt-4-turbo', // Model default tetap GPT-4 Turbo
  telemetry: {
    instrumentation: {
      llm: true,
    },
  },
});
