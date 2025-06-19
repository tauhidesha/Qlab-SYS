
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
  const appOptions: admin.AppOptions = {};
  let initializationDescription = "";

  if (explicitProjectIdFromEnv) {
    appOptions.projectId = explicitProjectIdFromEnv;
    initializationDescription = `using explicit projectId from NEXT_PUBLIC_FIREBASE_PROJECT_ID: '${explicitProjectIdFromEnv}'`;
  } else if (process.env.GCLOUD_PROJECT) {
    appOptions.projectId = process.env.GCLOUD_PROJECT;
    initializationDescription = `using projectId from GCLOUD_PROJECT: '${process.env.GCLOUD_PROJECT}'`;
  } else {
    initializationDescription = `with default options (relying on GAC or other inference)`;
  }
  
  console.log(`[firebase-admin.ts] Attempting Firebase Admin SDK initialization ${initializationDescription}...`);

  try {
    adminApp = admin.initializeApp(appOptions); // Pass options directly
    console.log(`[firebase-admin.ts] Firebase Admin SDK initialization SUCCEEDED. App Name: ${adminApp.name}, Project ID: ${adminApp.options.projectId}`);

    if (!adminApp.options.projectId) {
      console.error(`[firebase-admin.ts] CRITICAL: Firebase Admin SDK initialized, BUT Project ID is UNDEFINED.`);
      console.error(`  - This occurred DESPITE attempting to use options: ${JSON.stringify(appOptions)}`);
      console.error(`  - GAC was ${gacSet ? 'SET' : 'NOT SET'}.`);
      console.error(`  - Firestore/Auth Admin features will likely fail.`);
    }

    // Obtain Firestore and Auth instances
    try {
      adminDb = admin.firestore();
      console.log('[firebase-admin.ts] Firestore Admin instance obtained.');
    } catch (dbError: any) {
      console.error(`[firebase-admin.ts] FAILED to get Firestore Admin instance: ${dbError?.message}. Firestore calls will fail.`);
      adminDb = undefined;
    }
    try {
      adminAuth = admin.auth();
      console.log('[firebase-admin.ts] Auth Admin instance obtained.');
    } catch (authError: any) {
      console.warn(`[firebase-admin.ts] FAILED to get Auth Admin instance: ${authError?.message}. Some Auth features might fail.`);
      adminAuth = undefined;
    }

  } catch (initError: any) {
    console.error(`[firebase-admin.ts] Firebase Admin SDK initialization FAILED ${initializationDescription}. Error: ${initError.message}`);
    console.error(`  Context: GAC ${gacSet ? 'SET' : 'NOT SET'}, Explicit ProjectID: ${explicitProjectIdFromEnv || 'NOT SET'}, GCLOUD_PROJECT: ${process.env.GCLOUD_PROJECT || 'NOT SET'}.`);
    // adminApp, adminDb, adminAuth will remain undefined
  }

} else {
  adminApp = admin.app(); // Get the default app if already initialized
  console.log(`[firebase-admin.ts] Firebase Admin SDK already initialized. Using existing app: ${adminApp.name}, Project ID: ${adminApp.options.projectId}`);
  // Attempt to get db and auth from existing app, with error handling
  if (adminApp) {
    try {
      adminDb = adminApp.firestore();
      console.log('[firebase-admin.ts] Firestore Admin instance obtained from existing app.');
    } catch (dbError: any) {
      console.error(`[firebase-admin.ts] FAILED to get Firestore from existing app: ${dbError.message}.`);
      adminDb = undefined;
    }
    try {
      adminAuth = adminApp.auth();
      console.log('[firebase-admin.ts] Auth Admin instance obtained from existing app.');
    } catch (authError: any) {
      console.warn(`[firebase-admin.ts] FAILED to get Auth from existing app: ${authError.message}.`);
      adminAuth = undefined;
    }
  }
}

export { adminDb, adminAuth };
