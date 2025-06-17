
import { config } from 'dotenv';
config(); // Load variables from .env and .env.local

// Minimal logging for startup
console.log(`[src/ai/dev.ts] Genkit Dev Environment Initializing...`);
console.log(`  - Project ID (from env): ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT FOUND'}`);
console.log(`  - Google API Key (from env): ${process.env.GOOGLE_API_KEY ? 'Exists' : 'NOT FOUND'}`);

// Ensure Firebase is imported AFTER dotenv config() and minimal logging
import '@/lib/firebase'; 

// Ensure all flows and tools are imported to be registered by Genkit
import '@/ai/flows/analyze-profit-loss-flow.ts';
import '@/ai/flows/cs-whatsapp-reply-flow.ts';
// test-tool-flow.ts is intentionally kept empty/commented out
// visualize-repaint.ts has been removed

import '@/ai/tools/productLookupTool.ts';
import '@/ai/tools/clientLookupTool.ts';
import '@/ai/tools/knowledgeLookupTool.ts';
import '@/ai/tools/createBookingTool.ts'; 

console.log("[src/ai/dev.ts] Relevant flows and tools imported.");
console.log("[src/ai/dev.ts] Genkit Developer UI should be available if no errors (default port: 4003).");
