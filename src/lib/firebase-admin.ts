
import * as admin from 'firebase-admin';

// Minimal logging
console.log("[firebase-admin.ts] Initializing Firebase Admin SDK...");

if (!admin.apps.length) {
  try {
    // When deployed to App Hosting or running with emulators (e.g., via `firebase emulators:start`),
    // the SDK should auto-configure based on the environment.
    // For local development outside emulators, you might need to set
    // GOOGLE_APPLICATION_CREDENTIALS environment variable pointing to your service account key JSON file.
    admin.initializeApp();
    console.log('[firebase-admin.ts] Firebase Admin SDK initialized successfully.');
    if (admin.instanceId()) { // Check if instanceId is available
      console.log('[firebase-admin.ts] Firebase Admin App Name:', admin.app().name);
    }
  } catch (e:any) {
    console.error('[firebase-admin.ts] Firebase Admin SDK initialization failed. Details:', e.message);
    console.error('[firebase-admin.ts] Ensure your environment is configured correctly for Firebase Admin (e.g., GOOGLE_APPLICATION_CREDENTIALS for local dev, or running within a Firebase/GCP environment).');
    // Depending on your error handling strategy, you might want to re-throw or handle this.
    // For now, we'll let it proceed, but db/auth might be undefined.
  }
} else {
  console.log('[firebase-admin.ts] Firebase Admin SDK already initialized. Using existing app.');
}

let adminDb: admin.firestore.Firestore;
let adminAuth: admin.auth.Auth;

try {
  adminDb = admin.firestore();
  console.log('[firebase-admin.ts] Firestore Admin instance obtained.');
} catch (e:any) {
  console.error('[firebase-admin.ts] FAILED to get Firestore Admin instance:', e?.message);
  // @ts-ignore
  adminDb = undefined; 
}

try {
  adminAuth = admin.auth();
  console.log('[firebase-admin.ts] Auth Admin instance obtained.');
} catch (e:any) {
  console.error('[firebase-admin.ts] FAILED to get Auth Admin instance:', e?.message);
  // @ts-ignore
  adminAuth = undefined;
}


export { adminDb, adminAuth };
