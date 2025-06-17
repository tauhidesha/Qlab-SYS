
import { config } from 'dotenv';
config(); // Memuat variabel dari .env dan .env.local (jika ada, untuk API keys dll)

// Logging untuk diagnosis
console.log(`[src/ai/dev.ts] Inisialisasi Genkit Dev Environment:`);
console.log(`  - NODE_ENV (sistem): ${process.env.NODE_ENV}`);
console.log(`  - NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
console.log(`  - Firebase connection will be to Cloud Firestore as per firebase.ts`);


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

