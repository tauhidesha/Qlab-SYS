
'use server';
/**
 * @fileOverview A simple flow to generate text embeddings.
 */

import { ai } from '@/ai/genkit';

/**
 * Generates an embedding vector for a given piece of text.
 * @param text The text to embed.
 * @returns A promise that resolves to an array of numbers representing the embedding.
 */
export async function embedText(text: string): Promise<number[]> {
  try {
    const { embedding } = await ai.embed({
      model: 'googleai/text-embedding-004',
      content: text,
    });
    return embedding;
  } catch (error) {
    console.error("Error generating text embedding:", error);
    // Return an empty array or throw an error, depending on desired handling
    throw new Error("Failed to generate text embedding.");
  }
}
