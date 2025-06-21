
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
    const result = await ai.embed({
      model: 'googleai/text-embedding-004',
      content: text,
    });
    
    // Safety check for null/undefined result before destructuring
    if (!result || !result.embedding) {
      console.error("ai.embed() returned a nullish or incomplete value.");
      throw new Error("Failed to generate embedding: AI service returned an invalid response.");
    }
    
    const { embedding } = result;
    return embedding;
  } catch (error) {
    console.error("Error generating text embedding:", error);
    // Return an empty array or throw an error, depending on desired handling
    throw new Error("Failed to generate text embedding.");
  }
}
