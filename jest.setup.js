// jest.setup.js
require('dotenv').config({ path: '.env.local' });

// Mock environment variables for testing
process.env.NODE_ENV = 'test';

// Mock Firebase for testing
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
}));

// Mock OpenAI for testing
jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ message: { content: 'Mock response' } }],
          usage: { total_tokens: 100 },
        }),
      },
    },
    embeddings: {
      create: jest.fn().mockResolvedValue({
        data: [{ embedding: new Array(1536).fill(0.1) }],
      }),
    },
  })),
}));

// Mock Google AI for testing
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: { text: () => 'Mock Gemini response' },
        usageMetadata: { totalTokenCount: 100 },
      }),
      startChat: jest.fn().mockReturnValue({
        sendMessage: jest.fn().mockResolvedValue({
          response: { text: () => 'Mock Gemini chat response' },
          usageMetadata: { totalTokenCount: 100 },
        }),
      }),
      embedContent: jest.fn().mockResolvedValue({
        embedding: { values: new Array(768).fill(0.1) },
      }),
    }),
  })),
}));

// Mock WhatsApp service
jest.mock('@/services/whatsappService', () => ({
  sendWhatsAppMessage: jest.fn().mockResolvedValue({ success: true }),
}));

// Mock Firebase Admin
jest.mock('@/lib/firebase-admin', () => ({
  getFirebaseAdmin: jest.fn().mockReturnValue({
    firestore: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue({ exists: false, data: () => null }),
          set: jest.fn().mockResolvedValue({}),
          update: jest.fn().mockResolvedValue({}),
          delete: jest.fn().mockResolvedValue({}),
        }),
        add: jest.fn().mockResolvedValue({ id: 'mock-id' }),
        get: jest.fn().mockResolvedValue({ docs: [] }),
      }),
    }),
  }),
}));

// Global test timeout
jest.setTimeout(30000);

// Console error suppression for tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
