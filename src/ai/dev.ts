
import { config } from 'dotenv';
config(); // Load variables from .env and .env.local

console.log(`[src/ai/dev.ts] Genkit Dev Environment Initializing (Reset & Simplified)...`);
console.log(`  - Project ID (from env): ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT FOUND'}`);
console.log(`  - Google API Key (from env): ${process.env.GOOGLE_API_KEY ? 'Exists' : 'NOT FOUND'}`);

// Ensure Firebase (client) is imported AFTER dotenv config() and minimal logging
// This is used by the flow for Firestore access via Client SDK.
import '@/lib/firebase'; 
// Admin SDK might still be needed for other potential backend tasks, but not directly by the simplified flow.
import '@/lib/firebase-admin'; 

// Only import the core WhatsApp reply flow
import '@/ai/flows/cs-whatsapp-reply-flow';
// Tools lain (extractMotorInfoTool, searchServiceByKeywordTool, createBookingTool)
// untuk sementara tidak diimpor karena flow utama yang baru belum menggunakannya secara eksplisit
// dan file tool-nya sudah disederhanakan/dikosongkan.

console.log("[src/ai/dev.ts] Core WhatsApp reply flow (cs-whatsapp-reply-flow.ts) imported.");
console.log("[src/ai/dev.ts] Other tools (extractMotorInfo, searchService, createBooking) are currently placeholders and NOT imported here to reduce complexity.");
console.log("[src/ai/dev.ts] Genkit Developer UI should be available if no errors (default port: 4001).");
