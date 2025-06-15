import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai'; // Impor googleAI dari paket yang benar

export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  model: 'googleai/gemini-1.5-flash-latest', // Mengatur model default
  // Telemetry options have changed or been removed in Genkit v1.x
  // Refer to Genkit documentation for current observability/telemetry setup if needed.
});
