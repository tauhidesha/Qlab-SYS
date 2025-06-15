import {genkit} from 'genkit';

export const ai = genkit({
  plugins: [
    // googleAI() plugin removed as genkitx-googleai could not be resolved
  ],
  // Default model removed as googleAI plugin is not available
  telemetry: {
    instrumentation: {
      llm: true,
    },
  },
});
