
import { config } from 'dotenv';
config(); // Load variables from .env and .env.local

console.log(`[src/ai/dev.ts] Genkit Dev Environment Initializing (Simplified)...`);
console.log(`  - Project ID (from env): ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT FOUND'}`);
console.log(`  - Google API Key (from env): ${process.env.GOOGLE_API_KEY ? 'Exists' : 'NOT FOUND'}`);

// Ensure Firebase is imported AFTER dotenv config() and minimal logging
import '@/lib/firebase'; 

// Only import the core WhatsApp reply flow and the new tool
import '@/ai/flows/cs-whatsapp-reply-flow.ts';
import '@/ai/tools/extractMotorInfoTool.ts';
import '@/ai/tools/searchServiceByKeywordTool.ts'; // Mengganti productLookupTool dengan tool baru


console.log("[src/ai/dev.ts] Core WhatsApp reply flow, extractMotorInfoTool, & searchServiceByKeywordTool imported.");
console.log("[src/ai/dev.ts] Genkit Developer UI should be available if no errors (default port: 4001).");
