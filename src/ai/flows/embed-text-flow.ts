
'use server';
/**
 * @fileOverview A simple flow to generate text embeddings.
 * IMPORTANT: This flow has been temporarily modified to bypass a potential API issue.
 */

import { ai } from '@/ai/genkit';
import * as z from 'zod';

const embedTextInputSchema = z.string();
const embedTextOutputSchema = z.array(z.number());

/**
 * Generates an embedding vector for a given piece of text.
 * This is the core function, exported for internal use by other tools/flows.
 * @param text The text to embed.
 * @returns A promise that resolves to an array of numbers representing the embedding.
 */
export async function embedText(text: string): Promise<number[]> {
  console.warn("<<<<<<<<<< WARNING: embedText function is in DEBUG mode and returning a DUMMY vector. This is a temporary bypass for a suspected API/environment issue. >>>>>>>>>>");
  // Return a dummy vector of the correct dimension (768 for text-embedding-004)
  // This allows other parts of the app (like saving a new service) to proceed without crashing.
  // The actual vector search will not be accurate, but the app will run.
  return Array(768).fill(0.1);
}

/**
 * A Genkit flow that wraps the embedText function to make it runnable and visible in the Developer UI.
 * This is useful for testing the embedding functionality independently.
 */
export const embedTextFlow = ai.defineFlow(
  {
    name: 'embedTextFlow',
    inputSchema: embedTextInputSchema,
    outputSchema: embedTextOutputSchema,
  },
  async (text: string): Promise<number[]> => {
    // The try/catch is inside the core embedText function, 
    // so we can just call it directly here.
    return await embedText(text);
  }
);
