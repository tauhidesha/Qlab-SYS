'use server';
import {genkit} from 'genkit';
// Menghapus import {openAI} from 'genkitx-openai'; karena package-nya dihapus

export const ai = genkit({
  plugins: [
    // Menghapus openAI() karena package-nya dihapus
  ],
  // Menghapus model: 'openai/gpt-4-turbo' karena plugin OpenAI dihapus
  telemetry: {
    instrumentation: {
      llm: true,
    },
  },
});
