
import { config } from 'dotenv';
config(); // Memuat variabel dari .env dan .env.local

// Memastikan NODE_ENV diatur ke 'development' untuk konteks genkit dev
// Ini penting agar logika penggunaan emulator di firebase.ts bisa berjalan
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// Logging untuk diagnosis
console.log(`[src/ai/dev.ts] Inisialisasi Genkit Dev Environment:`);
console.log(`  - NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`  - NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
console.log(`  - NEXT_PUBLIC_USE_FIREBASE_EMULATOR: ${process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR}`);
if (process.env.FIRESTORE_EMULATOR_HOST) {
    console.log(`  - FIRESTORE_EMULATOR_HOST (dari env sistem): ${process.env.FIRESTORE_EMULATOR_HOST}`);
}


// Pastikan semua flow dan tool diimpor agar ter-register oleh Genkit
import '@/ai/flows/analyze-profit-loss-flow.ts';
import '@/ai/flows/cs-whatsapp-reply-flow.ts';
// import '@/ai/flows/visualize-repaint.ts'; // Fitur AI Visualizer telah dihapus

import '@/ai/tools/productLookupTool.ts';
import '@/ai/tools/clientLookupTool.ts';
import '@/ai/tools/knowledgeLookupTool.ts';
import '@/ai/tools/createBookingTool.ts'; 

console.log("[src/ai/dev.ts] Semua flow dan tool yang relevan telah diimpor.");
console.log("[src/ai/dev.ts] Genkit Developer UI (jika tidak ada error) akan tersedia di port yang dikonfigurasi (default: 4001).");

