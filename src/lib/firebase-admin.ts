
import * as admin from 'firebase-admin';

// Enhanced logging
console.log("[firebase-admin.ts] Attempting to initialize Firebase Admin SDK...");
console.log(`[firebase-admin.ts] Current working directory: ${process.cwd()}`);

const gacSet = !!process.env.GOOGLE_APPLICATION_CREDENTIALS;
const firestoreEmulatorHost = process.env.FIRESTORE_EMULATOR_HOST;
const authEmulatorHost = process.env.FIREBASE_AUTH_EMULATOR_HOST;
const explicitProjectIdFromEnv = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
let firebaseConfigProjectId = 'NOT PARSED YET';

try {
    if (process.env.FIREBASE_CONFIG) {
        const fbConfig = JSON.parse(process.env.FIREBASE_CONFIG);
        firebaseConfigProjectId = fbConfig.projectId || 'projectId NOT FOUND in FIREBASE_CONFIG';
    } else {
        firebaseConfigProjectId = 'FIREBASE_CONFIG NOT SET';
    }
} catch (e) {
    firebaseConfigProjectId = 'Error parsing FIREBASE_CONFIG';
}

console.log(`[firebase-admin.ts] Checking environment variables for Admin SDK:`);
console.log(`  - GOOGLE_APPLICATION_CREDENTIALS: ${gacSet ? 'SET' : 'NOT SET'}`);
console.log(`  - FIRESTORE_EMULATOR_HOST: ${firestoreEmulatorHost || 'NOT SET'}`);
console.log(`  - FIREBASE_AUTH_EMULATOR_HOST: ${authEmulatorHost || 'NOT SET'}`);
console.log(`  - FIREBASE_CONFIG (Project ID from it): ${firebaseConfigProjectId}`);
console.log(`  - GCLOUD_PROJECT (often used as fallback for Project ID): ${process.env.GCLOUD_PROJECT || 'NOT SET'}`);
console.log(`  - NEXT_PUBLIC_FIREBASE_PROJECT_ID (for explicit fallback): ${explicitProjectIdFromEnv || 'NOT SET'}`);

let adminApp: admin.app.App | undefined = undefined;
let adminDb: admin.firestore.Firestore | undefined = undefined;
let adminAuth: admin.auth.Auth | undefined = undefined;

if (!admin.apps.length) {
  let appInitialized = false;
  let initializationError: any = null;

  // Attempt 1: Default initialization (relies on ADC or emulators)
  try {
    console.log("[firebase-admin.ts] Attempt 1: Initializing with default options (environment inference)...");
    adminApp = admin.initializeApp();
    appInitialized = true;
    console.log(`[firebase-admin.ts] Default initialization attempt SUCCEEDED. App Name: ${adminApp.name}, Project ID: ${adminApp.options.projectId}`);
  } catch (e1: any) {
    console.warn(`[firebase-admin.ts] Default initialization FAILED: ${e1.message}`);
    initializationError = e1; // Save error from first attempt
  }

  // Attempt 2: If default failed OR resulted in undefined projectId, and we have an explicit projectId
  if ((!appInitialized || !adminApp?.options.projectId) && explicitProjectIdFromEnv) {
    console.warn(`[firebase-admin.ts] Default init failed or projectId undefined. Attempt 2: Initializing with explicit projectId: ${explicitProjectIdFromEnv}`);
    try {
      if (adminApp && appInitialized) { // If app was initialized but projectId was missing
        // It's generally not recommended to delete and re-initialize,
        // but if the first init didn't provide projectId, we might have to.
        // For now, we'll just try to initialize again if the first attempt truly failed.
        // If the first attempt 'succeeded' but without a projectId, re-initializing might cause issues.
        // Let's assume if appInitialized is true, we don't try to re-initialize here.
        // This block will only run if appInitialized is false from the first catch.
      }
      if (!appInitialized) { // Only if the very first initializeApp() threw an error
        adminApp = admin.initializeApp({ projectId: explicitProjectIdFromEnv });
        appInitialized = true; // Mark as initialized now
        console.log(`[firebase-admin.ts] Explicit projectId initialization SUCCEEDED. App Name: ${adminApp.name}, Project ID: ${adminApp.options.projectId}`);
        initializationError = null; // Clear previous error if this one succeeded
      }
    } catch (e2: any) {
      console.error(`[firebase-admin.ts] Explicit projectId initialization FAILED: ${e2.message}`);
      initializationError = e2; // Save error from second attempt
    }
  }

  if (appInitialized && adminApp) {
    if (!adminApp.options.projectId) {
      console.error(`[firebase-admin.ts] CRITICAL: Firebase Admin SDK initialized, BUT Project ID is UNDEFINED. Firestore/Auth will likely fail. GAC was ${gacSet ? 'SET' : 'NOT SET'}. Explicit ProjectID from env was ${explicitProjectIdFromEnv || 'NOT SET'}.`);
    }
    try {
      adminDb = admin.firestore();
      console.log('[firebase-admin.ts] Firestore Admin instance obtained.');
    } catch (dbError: any) {
      console.error(`[firebase-admin.ts] FAILED to get Firestore Admin instance: ${dbError?.message}`);
      adminDb = undefined;
    }
    try {
      adminAuth = admin.auth();
      console.log('[firebase-admin.ts] Auth Admin instance obtained.');
    } catch (authError: any) {
      console.warn(`[firebase-admin.ts] FAILED to get Auth Admin instance: ${authError?.message}. This might be okay if Admin Auth is not used.`);
      adminAuth = undefined;
    }
  } else {
    // Log the final, most relevant error
    const finalErrorMessage = initializationError?.message || "Unknown initialization failure";
    console.error(`\n\n🛑 [firebase-admin.ts] Firebase Admin SDK initialization FAILED COMPLETELY. Details: ${finalErrorMessage}. GAC was ${gacSet ? 'SET' : 'NOT SET'}. Explicit ProjectID from env was ${explicitProjectIdFromEnv || 'NOT SET'}.\n\n`);
    if (initializationError?.cause) console.error('[firebase-admin.ts] Original cause:', initializationError.cause);
  }
} else {
  adminApp = admin.app();
  console.log(`[firebase-admin.ts] Firebase Admin SDK already initialized. Using existing app: ${adminApp.name}, Project ID: ${adminApp.options.projectId}`);
  try {
    adminDb = adminApp.firestore();
    console.log('[firebase-admin.ts] Firestore Admin instance obtained from existing app.');
  } catch (dbError: any) {
    console.error(`[firebase-admin.ts] Failed to get Firestore from existing app: ${dbError.message}`);
  }
  try {
    adminAuth = adminApp.auth();
    console.log('[firebase-admin.ts] Auth Admin instance obtained from existing app.');
  } catch (authError: any) {
    console.warn(`[firebase-admin.ts] Failed to get Auth from existing app: ${authError.message}`);
  }
}

export { adminDb, adminAuth };
