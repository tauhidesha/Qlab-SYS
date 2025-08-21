// @file: src/ai/actions/embeddingActionGemini.ts

import { generateEmbeddings } from '@/lib/gemini';

export interface EmbeddingResult {
  embedding: number[];
  model: string;
  usage: {
    promptTokens: number;
    totalTokens: number;
  };
}

export async function createEmbeddingGemini(text: string): Promise<EmbeddingResult> {
  console.log('[createEmbeddingGemini] Creating embedding for text');
  
  try {
    // Clean and prepare text
    const cleanedText = text.replace(/\n/g, ' ').trim();
    
    if (!cleanedText) {
      throw new Error('Text is empty or invalid');
    }

    // Generate embedding using Gemini
    const embedding = await generateEmbeddings(cleanedText);
    
    console.log(`[createEmbeddingGemini] Embedding created successfully, dimensions: ${embedding.length}`);
    
    return {
      embedding,
      model: 'embedding-001',
      usage: {
        promptTokens: cleanedText.length,
        totalTokens: cleanedText.length,
      },
    };

  } catch (error) {
    console.error('[createEmbeddingGemini] Error creating embedding:', error);
    throw error;
  }
}

// Batch embedding function
export async function createBatchEmbeddingsGemini(texts: string[]): Promise<EmbeddingResult[]> {
  console.log(`[createBatchEmbeddingsGemini] Creating embeddings for ${texts.length} texts`);
  
  try {
    const results: EmbeddingResult[] = [];
    
    // Process texts in batches to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const batchPromises = batch.map(text => createEmbeddingGemini(text));
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Add small delay between batches
      if (i + batchSize < texts.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log(`[createBatchEmbeddingsGemini] Successfully created ${results.length} embeddings`);
    return results;

  } catch (error) {
    console.error('[createBatchEmbeddingsGemini] Error creating batch embeddings:', error);
    throw error;
  }
}

// Export for backward compatibility
export const createEmbedding = createEmbeddingGemini;
export const createBatchEmbeddings = createBatchEmbeddingsGemini;
