
import { config } from 'dotenv';
config(); // Memuat variabel dari .env dan .env.local (jika ada, untuk API keys dll)

// Logging untuk diagnosis
console.log(`--------------------------------------------------------------------`);
console.log(`[src/ai/dev.ts] Inisialisasi Genkit Dev Environment:`);
console.log(`  - NODE_ENV (sistem): ${process.env.NODE_ENV}`);
console.log(`  - NEXT_PUBLIC_FIREBASE_PROJECT_ID (dari dotenv): ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
console.log(`  - NEXT_PUBLIC_FIREBASE_API_KEY (dari dotenv): ${process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Ada" : "KOSONG!"}`);
console.log(`  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN (dari dotenv): ${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "Ada" : "KOSONG!"}`);
console.log(`  - Google API Key (GOOGLE_API_KEY dari dotenv): ${process.env.GOOGLE_API_KEY ? "Ada" : "KOSONG!"}`);
console.log(`  - Firebase connection will be to Cloud Firestore as per firebase.ts`);
console.log(`--------------------------------------------------------------------`);


// Pastikan Firebase diimpor SETELAH dotenv config() dan logging env var
import '@/lib/firebase'; 

// Pastikan semua flow dan tool diimpor agar ter-register oleh Genkit
import '@/ai/flows/analyze-profit-loss-flow.ts';
import '@/ai/flows/cs-whatsapp-reply-flow.ts';
// import '@/ai/flows/visualize-repaint.ts'; // Fitur AI Visualizer telah dihapus
// import '@/ai/flows/test-tool-flow.ts'; // Test flow dinonaktifkan untuk mencegah error ENOENT tools-XXXX.json

import '@/ai/tools/productLookupTool.ts';
import '@/ai/tools/clientLookupTool.ts';
import '@/ai/tools/knowledgeLookupTool.ts';
import '@/ai/tools/createBookingTool.ts'; 

console.log("[src/ai/dev.ts] Semua flow dan tool yang relevan telah diimpor (test-tool-flow dan visualize-repaint dinonaktifkan/dihapus).");
console.log("[src/ai/dev.ts] Genkit Developer UI (jika tidak ada error) akan tersedia di port yang dikonfigurasi (default: 4001).");

