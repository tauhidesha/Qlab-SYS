
'use server';
/**
 * @fileOverview A flow to generate text embeddings using Google's embedding model.
 */

import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { embed, type EmbedderArgument } from 'genkit/ai';

const embedTextInputSchema = z.string();
const embedTextOutputSchema = z.array(z.number());

/**
 * Generates an embedding vector for a given piece of text.
 * This is the core function, exported for internal use by other tools/flows.
 * @param text The text to embed.
 * @returns A promise that resolves to an array of numbers representing the embedding.
 */
export async function embedText(text: string): Promise<number[]> {
  // WORKAROUND: Bypassing the actual embedding API call to prevent crashes
  // if the Google Generative Language API is not enabled on the user's project.
  // This returns a "fake" vector, allowing other parts of the app to function.
  // To enable real embeddings, the user must activate the API in their Google Cloud Console.
  console.warn("WORKAROUND ACTIVE: Returning fake vector from embedText(). Enable 'Generative Language API' in Google Cloud for real embeddings.");
  if (!text || text.trim() === '') {
    return [];
  }
  // Return a dummy vector of the correct dimension (768 for text-embedding-004)
  return Array(768).fill(0.1);

  /*
  // ORIGINAL CODE - UNCOMMENT WHEN API IS CONFIRMED TO BE WORKING
  if (!text || text.trim() === '') {
    console.warn("embedText: Input text is empty. Returning empty vector.");
    return [];
  }
  try {
    const result = await ai.embed({
      model: 'googleai/text-embedding-004',
      content: text,
      config: {
        safetySettings: [
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        ],
      },
    });

    if (!result?.embedding) {
      throw new Error('API returned no embedding.');
    }
    return result.embedding;
  } catch (error) {
    console.error(`Error in embedText for text: "${text.substring(0, 50)}..."`, error);
    throw new Error(`Failed to generate text embedding. Error: ${error instanceof Error ? error.message : String(error)}`);
  }
  */
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
    return await embedText(text);
  }
);
