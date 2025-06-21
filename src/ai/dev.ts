

// The dotenv config is removed because Next.js handles .env files automatically.
// Explicitly calling it can cause conflicts in some environments.

console.log(`[src/ai/dev.ts] Genkit Dev Environment Initializing...`);
console.log(`  - Project ID (from env): ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT FOUND'}`);
console.log(`  - Google API Key (from env): ${process.env.GOOGLE_API_KEY ? 'Exists' : 'NOT FOUND'}`);

import '@/lib/firebase';
// Firebase Admin SDK import is removed to prevent potential initialization conflicts with the client SDK during development.
// It is still used in the seed script, but not needed for running the AI flows.

// Import flows and tools
import '@/ai/flows/cs-whatsapp-reply-flow';
import '@/ai/flows/embed-text-flow';
import '@/ai/flows/analyze-profit-loss-flow';

// Import modular tools.
import '@/ai/tools/productLookupTool';
import '@/ai/tools/createBookingTool';
import '@/ai/tools/knowledgeBaseRetrieverTool';
import '@/ai/tools/cari-size-motor-tool';
import '@/ai/tools/cariInfoLayananTool';
import '@/ai/tools/extractMotorInfoTool';
import '@/ai/tools/searchServiceByKeywordTool';

console.log("[src/ai/dev.ts] All flows and tools imported.");
console.log("[src/ai/dev.ts] Genkit Developer UI should be available if no errors (default port: 4001).");
