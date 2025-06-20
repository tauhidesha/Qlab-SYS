
import { config } from 'dotenv';
config(); // Load variables from .env and .env.local

console.log(`[src/ai/dev.ts] Genkit Dev Environment Initializing...`);
console.log(`  - Project ID (from env): ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT FOUND'}`);
console.log(`  - Google API Key (from env): ${process.env.GOOGLE_API_KEY ? 'Exists' : 'NOT FOUND'}`);

import '@/lib/firebase';
import '@/lib/firebase-admin';

// Import flows and tools
import '@/ai/flows/cs-whatsapp-reply-flow';
// Import modular tools. Files for tools do not contain 'use server' and only export the tool object and types.
import '@/ai/tools/cari-size-motor-tool';
import '@/ai/tools/cariInfoLayananTool';

// Placeholder tools (jika masih ada dan belum dihapus)
import '@/ai/tools/extractMotorInfoTool';
import '@/ai/tools/searchServiceByKeywordTool';
import '@/ai/tools/createBookingTool';

console.log("[src/ai/dev.ts] Main flow (cs-whatsapp-reply-flow) imported.");
console.log("[src/ai/dev.ts] Modular tools (cariSizeMotorTool, cariInfoLayananTool) imported.");
console.log("[src/ai/dev.ts] Other tools are placeholders.");
console.log("[src/ai/dev.ts] Genkit Developer UI should be available if no errors (default port: 4001).");
