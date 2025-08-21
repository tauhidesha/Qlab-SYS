// @file: src/lib/gemini.ts

import { GoogleGenerativeAI } from '@google/generative-ai';

// Inisialisasi client Google AI
const baseGemini = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

// Export Gemini client (LangSmith wrapping disabled for now)
export const gemini = baseGemini;

// Model configuration
export const GEMINI_MODELS = {
  // Flash models - Faster & cheaper, good for real-time CS
  FLASH: 'gemini-2.0-flash-exp',
  FLASH_VISION: 'gemini-2.0-flash-exp',
  
  // Pro models - Better reasoning, more expensive
  PRO: 'gemini-2.5-pro',  
  PRO_VISION: 'gemini-2.5-pro',
  
  // Embedding model
  EMBEDDING: 'embedding-001',
  
  // Default model for different use cases
  DEFAULT: 'gemini-2.0-flash-exp',  // For WhatsApp CS
  ANALYSIS: 'gemini-2.5-pro',       // For complex analysis
} as const;

// Safety settings untuk Gemini
export const GEMINI_SAFETY_SETTINGS = [
  {
    category: 'HARM_CATEGORY_HARASSMENT' as const,
    threshold: 'BLOCK_MEDIUM_AND_ABOVE' as const,
  },
  {
    category: 'HARM_CATEGORY_HATE_SPEECH' as const,
    threshold: 'BLOCK_MEDIUM_AND_ABOVE' as const,
  },
  {
    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT' as const,
    threshold: 'BLOCK_MEDIUM_AND_ABOVE' as const,
  },
  {
    category: 'HARM_CATEGORY_DANGEROUS_CONTENT' as const,
    threshold: 'BLOCK_MEDIUM_AND_ABOVE' as const,
  },
];

// Model selection based on environment variable
export const getActiveModel = () => {
  const modelPreference = process.env.GEMINI_MODEL_PREFERENCE || 'flash';
  
  switch (modelPreference.toLowerCase()) {
    case 'pro':
      return {
        chat: GEMINI_MODELS.PRO,
        vision: GEMINI_MODELS.PRO_VISION,
        label: 'Gemini 2.5 Pro (Better reasoning, slower, more expensive)'
      };
    case 'flash':
    default:
      return {
        chat: GEMINI_MODELS.FLASH,
        vision: GEMINI_MODELS.FLASH_VISION,
        label: 'Gemini 2.0 Flash (Faster, cheaper, good for CS)'
      };
  }
};

console.log('[gemini.ts] Gemini client initialized.',
  {
    langsmithEnabled: process.env.LANGSMITH_TRACING === 'true',
    project: process.env.LANGSMITH_PROJECT || 'qlab-sys-development',
    activeModel: getActiveModel().label
  }
);

// Helper function untuk generate content
export async function generateContent(
  prompt: string,
  options: {
    model?: keyof typeof GEMINI_MODELS;
    temperature?: number;
    maxOutputTokens?: number;
    tools?: any[];
  } = {}
) {
  const model = gemini.getGenerativeModel({
    model: GEMINI_MODELS[options.model || 'DEFAULT'],
    generationConfig: {
      temperature: options.temperature || 0.7,
      maxOutputTokens: options.maxOutputTokens || 2048,
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Helper function untuk chat completion
export async function generateChatCompletion(
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    parts?: any[];
  }>,
  options: {
    temperature?: number;
    maxOutputTokens?: number;
    tools?: any[];
  } = {}
) {
  const activeModel = getActiveModel();
  const model = gemini.getGenerativeModel({
    model: activeModel.chat,
    generationConfig: {
      temperature: options.temperature || 0.7,
      maxOutputTokens: options.maxOutputTokens || 2048,
    },
  });

  const chat = model.startChat({
    history: messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role,
        parts: msg.parts || [{ text: msg.content }],
      })),
    generationConfig: {
      temperature: options.temperature || 0.7,
      maxOutputTokens: options.maxOutputTokens || 2048,
    },
  });

  const result = await chat.sendMessage(
    messages.find(msg => msg.role === 'system')?.content || ''
  );
  
  return {
    content: result.response.text(),
    usage: {
      promptTokens: result.response.usageMetadata?.promptTokenCount || 0,
      completionTokens: result.response.usageMetadata?.candidatesTokenCount || 0,
      totalTokens: result.response.usageMetadata?.totalTokenCount || 0,
    },
  };
}

// Helper function untuk embeddings
export async function generateEmbeddings(text: string) {
  const model = gemini.getGenerativeModel({
    model: GEMINI_MODELS.EMBEDDING,
  });

  const result = await model.embedContent(text);
  return result.embedding.values;
}

// Helper function untuk vision analysis
export async function analyzeImage(
  imageUrl: string,
  prompt: string,
  options: {
    temperature?: number;
    maxOutputTokens?: number;
  } = {}
) {
  const activeModel = getActiveModel();
  const model = gemini.getGenerativeModel({
    model: activeModel.vision,
    generationConfig: {
      temperature: options.temperature || 0.7,
      maxOutputTokens: options.maxOutputTokens || 2048,
    },
  });

  // Convert image URL to base64 or use file path
  const imagePart = {
    inlineData: {
      data: imageUrl, // Assuming base64 encoded
      mimeType: 'image/jpeg',
    },
  };

  const result = await model.generateContent([prompt, imagePart]);
  return result.response.text();
}
