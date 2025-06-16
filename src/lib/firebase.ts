
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

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
console.log("[firebase.ts] Instance Firestore didapatkan. Selalu menghubungkan ke Cloud Firestore.");

export { app, db };
