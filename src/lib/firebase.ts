
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let db: Firestore;

console.log("[firebase.ts] Memulai inisialisasi Firebase...");

if (getApps().length === 0) {
  console.log("[firebase.ts] Tidak ada aplikasi Firebase yang terinisialisasi, membuat aplikasi baru...");
  app = initializeApp(firebaseConfig);
  console.log("[firebase.ts] Aplikasi Firebase baru berhasil dibuat.");
} else {
  console.log("[firebase.ts] Menggunakan aplikasi Firebase yang sudah ada.");
  app = getApp();
}

db = getFirestore(app);
console.log("[firebase.ts] Instance Firestore didapatkan.");

// Kondisi untuk menggunakan emulator hanya saat development dan jika variabel env diset
const nodeEnv = process.env.NODE_ENV;
const useEmulatorEnvVar = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR;
const useEmulator = nodeEnv === 'development' && useEmulatorEnvVar === 'true';

console.log(`[firebase.ts] Evaluasi penggunaan emulator:`);
console.log(`  - process.env.NODE_ENV: ${nodeEnv} (Harusnya 'development')`);
console.log(`  - process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR: ${useEmulatorEnvVar} (Harusnya 'true')`);
console.log(`  - Keputusan useEmulator: ${useEmulator}`);


if (useEmulator) {
  console.log("[firebase.ts] Mencoba menghubungkan ke Firestore Emulator di localhost:8080...");
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log("🔥 [firebase.ts] BERHASIL terhubung ke Firestore Emulator di localhost:8080.");
  } catch (error) {
    console.error("☠️ [firebase.ts] GAGAL terhubung ke Firestore Emulator. Pastikan emulator berjalan.", error);
  }
} else {
  console.log("[firebase.ts] Menghubungkan ke Cloud Firestore.");
}

export { app, db };
