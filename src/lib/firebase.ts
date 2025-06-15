
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
  console.log("Firebase.ts: Firebase App initialized.");
} else {
  app = getApp();
  console.log("Firebase.ts: Existing Firebase App retrieved.");
}

db = getFirestore(app);
console.log("Firebase.ts: Firestore instance obtained.");

// Enhanced logging for debugging emulator connection
const nodeEnv = process.env.NODE_ENV;
const emulatorFlag = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR;

console.log(`Firebase.ts: Current NODE_ENV: ${nodeEnv}`);
console.log(`Firebase.ts: Current NEXT_PUBLIC_USE_FIREBASE_EMULATOR: ${emulatorFlag}`);

const useEmulator = nodeEnv === 'development' && emulatorFlag === 'true';

if (useEmulator) {
  console.log("Firebase.ts: Condition 'useEmulator' is TRUE. Attempting to connect to Firestore Emulator...");
  try {
    // Default Firestore emulator port is 8080
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log("🔥 Firebase.ts: SUCCESSFULLY connected to Firestore Emulator at localhost:8080");
  } catch (error) {
    console.error("🔥 Firebase.ts: FAILED to connect to Firestore Emulator:", error);
    // This error might indicate the emulator isn't running or is on a different port.
  }
} else {
  console.log("Firebase.ts: Condition 'useEmulator' is FALSE.");
  if (nodeEnv !== 'development') {
    console.log("Firebase.ts: Reason: NODE_ENV is not 'development'. (Actual: " + nodeEnv + ")");
  }
  if (emulatorFlag !== 'true') {
    console.log("Firebase.ts: Reason: NEXT_PUBLIC_USE_FIREBASE_EMULATOR is not 'true'. (Actual: " + emulatorFlag + ")");
  }
  console.log("Firebase.ts: Connecting to Cloud Firestore (Emulator not in use).");
}

export { app, db };
