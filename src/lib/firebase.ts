
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";


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

// Check for missing configuration
const missingConfig = Object.entries(firebaseConfig)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingConfig.length > 0) {
  const errorMessage = `[firebase.ts] FATAL ERROR: Missing Firebase configuration: ${missingConfig.join(', ')}. Please check your .env.local file.`;
  console.error(errorMessage);
  console.error('[firebase.ts] Copy .env.example to .env.local and fill in your Firebase project details.');
  
  // In development, you might want to throw an error to catch this early
  if (process.env.NODE_ENV === 'development') {
    throw new Error(`Missing Firebase configuration: ${missingConfig.join(', ')}`);
  }
}

// Simplified and more robust initialization
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

console.log(`[firebase.ts] Firebase client connected to project: ${app.options.projectId || 'UNKNOWN'}`);

export { app, db, auth };
