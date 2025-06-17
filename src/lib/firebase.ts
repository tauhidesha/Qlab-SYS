
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// Log environment variables right at the start of this module's execution
console.log("--------------------------------------------------------------------");
console.log("[firebase.ts] Membaca variabel environment untuk Firebase config:");
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

console.log(`[firebase.ts]   NEXT_PUBLIC_FIREBASE_API_KEY: ${apiKey ? 'Ada' : 'KOSONG!'}`);
console.log(`[firebase.ts]   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${authDomain ? 'Ada' : 'KOSONG!'}`);
console.log(`[firebase.ts]   NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${projectId ? projectId : 'KOSONG!'}`);
console.log(`[firebase.ts]   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${storageBucket ? 'Ada' : 'KOSONG!'}`);
console.log(`[firebase.ts]   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${messagingSenderId ? 'Ada' : 'KOSONG!'}`);
console.log(`[firebase.ts]   NEXT_PUBLIC_FIREBASE_APP_ID: ${appId ? 'Ada' : 'KOSONG!'}`);
console.log("--------------------------------------------------------------------");


const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Log the constructed firebaseConfig
console.log("[firebase.ts] Firebase config yang AKAN DIGUNAKAN:", JSON.stringify({
    apiKey: firebaseConfig.apiKey ? "*** (ada)" : "KOSONG!",
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId
}, null, 2));

let app: FirebaseApp;
let db: Firestore;

console.log("[firebase.ts] Memulai inisialisasi Firebase (selalu ke Cloud)...");

if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.error("[firebase.ts] KESALAHAN FATAL: Firebase projectId atau apiKey KOSONG!");
  console.error("[firebase.ts] Pastikan file .env sudah ada di root proyek dan berisi variabel Firebase yang benar (NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_API_KEY, dll).");
  console.error("[firebase.ts] Jalankan 'npm run genkit:dev' dari terminal di root folder proyek Anda.");
  console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}


if (getApps().length === 0) {
  console.log("[firebase.ts] Tidak ada aplikasi Firebase yang terinisialisasi, membuat aplikasi baru...");
  try {
    app = initializeApp(firebaseConfig);
    console.log("[firebase.ts] Aplikasi Firebase baru berhasil dibuat. Project ID dari app.options:", app.options.projectId);
  } catch (e: any) {
    console.error("[firebase.ts] GAGAL menginisialisasi aplikasi Firebase:", e.message);
    console.error("[firebase.ts] Detail Error Inisialisasi Firebase:", e);
  }
} else {
  console.log("[firebase.ts] Menggunakan aplikasi Firebase yang sudah ada.");
  app = getApp();
  console.log("[firebase.ts] Aplikasi Firebase yang ada. Project ID dari app.options:", app.options.projectId);
}

// @ts-ignore
if (app) {
  try {
    // @ts-ignore
    db = getFirestore(app);
    console.log("[firebase.ts] Instance Firestore didapatkan. Selalu menghubungkan ke Cloud Firestore.");
  } catch (e: any) {
    console.error("[firebase.ts] GAGAL mendapatkan instance Firestore:", e?.message);
    console.error("[firebase.ts] Detail error Firestore:", e);
  }
} else {
    console.error("[firebase.ts] Aplikasi Firebase tidak terinisialisasi dengan benar, tidak bisa mendapatkan Firestore.");
}


export { app, db };
