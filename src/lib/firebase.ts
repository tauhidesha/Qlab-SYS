
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// Minimal logging
console.log("[firebase.ts] Initializing Firebase...");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  console.error("[firebase.ts] FATAL ERROR: Firebase projectId or apiKey is MISSING in environment variables.");
}

let app: FirebaseApp;
let db: Firestore;

if (getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
    console.log("[firebase.ts] Firebase app initialized. Project ID:", app.options.projectId);
  } catch (e: any) {
    console.error("[firebase.ts] FAILED to initialize Firebase app:", e.message);
    // @ts-ignore
    app = null;
  }
} else {
  app = getApp();
  console.log("[firebase.ts] Using existing Firebase app. Project ID:", app.options.projectId);
}

// @ts-ignore
if (app) {
  try {
    // @ts-ignore
    db = getFirestore(app);
    console.log("[firebase.ts] Firestore instance obtained.");
  } catch (e: any) {
    console.error("[firebase.ts] FAILED to get Firestore instance:", e?.message);
  }
} else {
    console.error("[firebase.ts] Firebase app not properly initialized, cannot get Firestore.");
}

export { app, db };
