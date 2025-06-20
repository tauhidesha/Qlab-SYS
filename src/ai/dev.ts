
import { config } from 'dotenv';
config(); // Load variables from .env and .env.local

console.log(`[src/ai/dev.ts] Genkit Dev Environment Initializing...`);
console.log(`  - Project ID (from env): ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT FOUND'}`);
console.log(`  - Google API Key (from env): ${process.env.GOOGLE_API_KEY ? 'Exists' : 'NOT FOUND'}`);

import '@/lib/firebase';
import '@/lib/firebase-admin';

// Import flows and tools
import '@/ai/flows/cs-whatsapp-reply-flow';
// import '@/ai/tools/cari-size-motor-tool'; // Dihapus karena tool dipindah ke flow
// import '@/ai/tools/extractMotorInfoTool'; // Placeholder
// import '@/ai/tools/searchServiceByKeywordTool'; // Placeholder
// import '@/ai/tools/createBookingTool'; // Placeholder

console.log("[src/ai/dev.ts] Core WhatsApp reply flow (termasuk cariSizeMotorTool) diimpor.");
console.log("[src/ai/dev.ts] Other tools (extractMotorInfo, searchServiceByKeyword, createBooking) adalah placeholders dan saat ini TIDAK aktif.");
console.log("[src/ai/dev.ts] Genkit Developer UI should be available if no errors (default port: 4001).");
    