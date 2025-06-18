
import { config } from 'dotenv';
config(); // Load variables from .env and .env.local

console.log(`[src/ai/dev.ts] Genkit Dev Environment Initializing (Simplified)...`);
console.log(`  - Project ID (from env): ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT FOUND'}`);
console.log(`  - Google API Key (from env): ${process.env.GOOGLE_API_KEY ? 'Exists' : 'NOT FOUND'}`);

// Ensure Firebase is imported AFTER dotenv config() and minimal logging
import '@/lib/firebase'; 

// Only import the core WhatsApp reply flow
import '@/ai/flows/cs-whatsapp-reply-flow.ts';

// Imports for other flows and tools have been removed for simplification.

console.log("[src/ai/dev.ts] Core WhatsApp reply flow imported. All custom tools and other flows are disabled.");
console.log("[src/ai/dev.ts] Genkit Developer UI should be available if no errors (default port: 4003).");
