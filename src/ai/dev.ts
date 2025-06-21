
import { config } from 'dotenv';
config(); // Load variables from .env and .env.local

console.log(`[src/ai/dev.ts] Genkit Dev Environment Initializing...`);
console.log(`  - Project ID (from env): ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT FOUND'}`);
console.log(`  - Google API Key (from env): ${process.env.GOOGLE_API_KEY ? 'Exists' : 'NOT FOUND'}`);

import '@/lib/firebase';
import '@/lib/firebase-admin';

// Import flows and tools
import '@/ai/flows/cs-whatsapp-reply-flow';
import '@/ai/flows/embed-text-flow'; // Import the new embedding flow
// File handle-service-inquiry-flow.ts dikosongkan, jadi impor ini bisa dihapus atau diabaikan
// import '@/ai/flows/handle-service-inquiry-flow';

// Import modular tools. Files for tools do not contain 'use server' and only export the tool object and types.
import '@/ai/tools/productLookupTool';
import '@/ai/tools/createBookingTool'; // Import tool booking baru
import '@/ai/tools/knowledgeBaseRetrieverTool'; // Import the new retriever tool

console.log("[src/ai/dev.ts] Main flows (cs-whatsapp-reply-flow, embed-text-flow) imported.");
console.log("[src/ai/dev.ts] All tools imported, including the new knowledgeBaseRetrieverTool.");
console.log("[src/ai/dev.ts] Genkit Developer UI should be available if no errors (default port: 4001).");
