
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

// Logging untuk debugging
console.log("Firebase.ts: NODE_ENV:", process.env.NODE_ENV);
console.log("Firebase.ts: NEXT_PUBLIC_USE_FIREBASE_EMULATOR:", process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR);

// Connect to Firestore emulator if in development and the flag is set
const useEmulator = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

if (useEmulator) {
  console.log("Firebase.ts: Attempting to connect to Firestore Emulator...");
  try {
    // Default Firestore emulator port is 8080
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log("🔥 Terhubung ke Firestore Emulator di localhost:8080");
  } catch (error) {
    console.error("🔥 Gagal terhubung ke Firestore Emulator:", error);
  }
} else {
  console.log("Firebase.ts: Connecting to Cloud Firestore (Emulator not in use or not in development).");
}

export { app, db };
