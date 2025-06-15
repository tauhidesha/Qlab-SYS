
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

// Connect to Firestore Emulator if the flag is set to true
// This is useful for local development.
// Ensure your .env.local file has NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
// and that your Firebase Emulators (especially Firestore) are running.
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
  console.log("Firebase.ts: Attempting to connect to Firestore Emulator (localhost:8080).");
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log("🔥 Firebase.ts: Connected to Firestore Emulator.");
  } catch (error) {
    console.error("🔥 Firebase.ts: FAILED to connect to Firestore Emulator:", error);
  }
} else {
  console.log("Firebase.ts: Connecting to Cloud Firestore (Emulator not in use or flag not set).");
}

export { app, db };
