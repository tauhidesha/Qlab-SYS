
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// Log environment variables right at the start of this module's execution
console.log("[firebase.ts] Reading NEXT_PUBLIC_FIREBASE_PROJECT_ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log("[firebase.ts] Reading NEXT_PUBLIC_FIREBASE_API_KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Exists" : "MISSING");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Log the constructed firebaseConfig
console.log("[firebase.ts] Firebase config to be used:", JSON.stringify(firebaseConfig, null, 2));

let app: FirebaseApp;
let db: Firestore;

console.log("[firebase.ts] Memulai inisialisasi Firebase (selalu ke Cloud)...");

if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  console.error("--------------------------------------------------------------------");
  console.error("[firebase.ts] KESALAHAN FATAL: Firebase projectId atau apiKey KOSONG!");
  console.error("[firebase.ts] Pastikan file .env sudah ada di root proyek dan berisi variabel Firebase yang benar (NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_API_KEY, dll).");
  console.error("[firebase.ts] Jalankan 'npm run genkit:dev' dari terminal di root folder proyek Anda.");
  console.error("--------------------------------------------------------------------");
  // Throw an error or handle appropriately if critical config is missing
  // For now, we let it proceed so initializeApp might show its own error, but this log is critical.
}


if (getApps().length === 0) {
  console.log("[firebase.ts] Tidak ada aplikasi Firebase yang terinisialisasi, membuat aplikasi baru...");
  try {
    app = initializeApp(firebaseConfig);
    console.log("[firebase.ts] Aplikasi Firebase baru berhasil dibuat. Project ID:", app.options.projectId);
  } catch (e) {
    console.error("[firebase.ts] Gagal menginisialisasi aplikasi Firebase:", e);
    // throw e; // Re-throw if you want to halt execution, or handle gracefully
  }
} else {
  console.log("[firebase.ts] Menggunakan aplikasi Firebase yang sudah ada.");
  app = getApp();
  console.log("[firebase.ts] Aplikasi Firebase yang ada. Project ID:", app.options.projectId);
}

try {
  // @ts-ignore
  db = getFirestore(app);
  console.log("[firebase.ts] Instance Firestore didapatkan. Selalu menghubungkan ke Cloud Firestore.");
} catch (e) {
   // @ts-ignore
  console.error("[firebase.ts] Gagal mendapatkan instance Firestore:", e?.message);
  // @ts-ignore
  console.error("[firebase.ts] Detail error Firestore:", e);
}


export { app, db };
