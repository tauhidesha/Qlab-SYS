
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

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

db = getFirestore(app);

// Kondisi untuk menggunakan emulator hanya saat development dan jika variabel env diset
// Ini relevan jika kamu menjalankan Next.js secara LOKAL (yarn dev)
// Untuk Firebase Studio, Studio akan menangani koneksi ke layanan cloud atau emulatornya sendiri.
const useEmulator = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

if (useEmulator) {
  console.log("Firebase.ts: NODE_ENV is development and NEXT_PUBLIC_USE_FIREBASE_EMULATOR is true. Attempting to connect to Firestore Emulator.");
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log("🔥 Firebase.ts: SUCCESSFULLY connected to Firestore Emulator at localhost:8080");
  } catch (error) {
    console.error(" Firebase.ts: FAILED to connect to Firestore Emulator. Make sure emulator is running.", error);
  }
} else {
  console.log("Firebase.ts: Connecting to CLOUD Firestore. (NODE_ENV:", process.env.NODE_ENV, ", NEXT_PUBLIC_USE_FIREBASE_EMULATOR:", process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR,")");
}

export { app, db };
