
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
console.log(`  - GOOGLE_APPLICATION_CREDENTIALS: ${gacSet ? 'SET (path hidden)' : 'NOT SET'}`);
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

  try {
    console.log("[firebase-admin.ts] Attempt 1: Initializing with default options (environment inference)...");
    adminApp = admin.initializeApp();
    appInitialized = true;
    console.log(`[firebase-admin.ts] Default initialization SUCCEEDED. App Name: ${adminApp.name}, Project ID: ${adminApp.options.projectId}`);
  } catch (e1: any) {
    console.warn(`[firebase-admin.ts] Default initialization FAILED: ${e1.message}`);
    initializationError = e1;
  }

  if ((!appInitialized || !adminApp?.options.projectId) && explicitProjectIdFromEnv) {
    console.warn(`[firebase-admin.ts] Default init failed or projectId undefined. Attempt 2: Initializing with explicit projectId: ${explicitProjectIdFromEnv}`);
    try {
      // Only attempt re-initialization if the first one completely failed
      if (!appInitialized) {
        adminApp = admin.initializeApp({ projectId: explicitProjectIdFromEnv });
        appInitialized = true;
        console.log(`[firebase-admin.ts] Explicit projectId initialization SUCCEEDED. App Name: ${adminApp.name}, Project ID: ${adminApp.options.projectId}`);
        initializationError = null; 
      } else if (adminApp && !adminApp.options.projectId) {
        // This case is tricky; re-init of an existing app instance is not standard.
        // For now, we log that projectId is still missing.
        console.warn(`[firebase-admin.ts] Default init succeeded but Project ID is still undefined even after providing explicit one. This is unusual.`);
      }
    } catch (e2: any) {
      console.error(`[firebase-admin.ts] Explicit projectId initialization FAILED: ${e2.message}`);
      initializationError = e2; 
    }
  }
  
  if (appInitialized && adminApp) {
    if (!adminApp.options.projectId) {
       console.error(`[firebase-admin.ts] CRITICAL: Firebase Admin SDK initialized, BUT Project ID is UNDEFINED. GAC was ${gacSet ? 'SET' : 'NOT SET'}. Explicit ProjectID from env was ${explicitProjectIdFromEnv || 'NOT SET'}. Firestore/Auth will likely fail if adminDb is used.`);
    }
    try {
      adminDb = admin.firestore();
      console.log('[firebase-admin.ts] Firestore Admin instance obtained.');
    } catch (dbError: any) {
      console.error(`[firebase-admin.ts] FAILED to get Firestore Admin instance: ${dbError?.message}`);
      adminDb = undefined; // Ensure it's undefined on failure
    }
    try {
      adminAuth = admin.auth();
      console.log('[firebase-admin.ts] Auth Admin instance obtained.');
    } catch (authError: any) {
      console.warn(`[firebase-admin.ts] FAILED to get Auth Admin instance: ${authError?.message}.`);
      adminAuth = undefined; // Ensure it's undefined on failure
    }
  } else {
    const finalErrorMessage = initializationError?.message || "Unknown initialization failure";
    console.error(`\n\n🛑 [firebase-admin.ts] Firebase Admin SDK initialization FAILED COMPLETELY. Details: ${finalErrorMessage}. GAC was ${gacSet ? 'SET' : 'NOT SET'}. Explicit ProjectID from env was ${explicitProjectIdFromEnv || 'NOT SET'}.\n   Admin features relying on this will not work.\n\n`);
    // DO NOT THROW an error from this module itself to prevent app-wide crashes.
    // Let consuming modules handle the undefined adminDb/adminAuth.
  }
} else {
  adminApp = admin.app(); // Get the default app if already initialized
  console.log(`[firebase-admin.ts] Firebase Admin SDK already initialized. Using existing app: ${adminApp.name}, Project ID: ${adminApp.options.projectId}`);
  try {
    adminDb = adminApp.firestore();
    console.log('[firebase-admin.ts] Firestore Admin instance obtained from existing app.');
  } catch(e: any) {
    console.error(`[firebase-admin.ts] Failed to get Firestore from existing app: ${e.message}`);
  }
  try {
    adminAuth = adminApp.auth();
    console.log('[firebase-admin.ts] Auth Admin instance obtained from existing app.');
  } catch (e: any) {
    console.warn(`[firebase-admin.ts] Failed to get Auth from existing app: ${e.message}`);
  }
}

export { adminDb, adminAuth };
