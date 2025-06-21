
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// Minimal logging
console.log("[firebase.ts] Initializing Firebase client...");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  const errorMessage = "[firebase.ts] FATAL ERROR: Firebase projectId or apiKey is MISSING. Check .env file.";
  console.error(errorMessage);
  // Throwing an error is better than letting the app run in a broken state,
  // but in a server component context, this might just crash the render.
  // So, we log it aggressively.
}

// Simplified and more robust initialization
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

console.log(`[firebase.ts] Firebase client connected to project: ${app.options.projectId || 'UNKNOWN'}`);

export { app, db };
