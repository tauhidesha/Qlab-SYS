
'use server';
/**
 * @fileOverview A simple flow to generate text embeddings.
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
  try {
    const result = await ai.embed({
      model: 'googleai/text-embedding-004',
      content: text,
    });
    
    // Safety check for null/undefined result before destructuring
    if (!result || !result.embedding) {
      console.error("ai.embed() returned a nullish or incomplete value.");
      throw new Error("Failed to generate embedding: AI service returned an invalid response.");
    }
    
    return result.embedding;
  } catch (error) {
    console.error("Error generating text embedding:", error);
    // Re-throwing the error to be handled by the caller.
    throw new Error("Failed to generate text embedding.");
  }
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
