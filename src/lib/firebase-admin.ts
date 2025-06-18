
import * as admin from 'firebase-admin';

// Enhanced logging
console.log("[firebase-admin.ts] Attempting to initialize Firebase Admin SDK...");
console.log(`[firebase-admin.ts] Current working directory: ${process.cwd()}`);
console.log(`[firebase-admin.ts] Checking environment variables for Admin SDK:`);
console.log(`  - GOOGLE_APPLICATION_CREDENTIALS: ${process.env.GOOGLE_APPLICATION_CREDENTIALS || 'NOT SET'}`);
console.log(`  - FIRESTORE_EMULATOR_HOST: ${process.env.FIRESTORE_EMULATOR_HOST || 'NOT SET'}`);
console.log(`  - FIREBASE_AUTH_EMULATOR_HOST: ${process.env.FIREBASE_AUTH_EMULATOR_HOST || 'NOT SET'}`);

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
console.log(`  - FIREBASE_CONFIG (Project ID from it): ${firebaseConfigProjectId}`);
console.log(`  - GCLOUD_PROJECT (often used as fallback for Project ID): ${process.env.GCLOUD_PROJECT || 'NOT SET'}`);
const explicitProjectIdFromEnv = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
console.log(`  - NEXT_PUBLIC_FIREBASE_PROJECT_ID (for explicit fallback): ${explicitProjectIdFromEnv || 'NOT SET'}`);


let adminDb: admin.firestore.Firestore | undefined = undefined;
let adminAuth: admin.auth.Auth | undefined = undefined;
let adminApp: admin.app.App | undefined = undefined;

if (!admin.apps.length) {
  let options: admin.AppOptions = {};
  const gacSet = !!process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!gacSet && explicitProjectIdFromEnv) {
    console.log(`[firebase-admin.ts] GOOGLE_APPLICATION_CREDENTIALS not set, but NEXT_PUBLIC_FIREBASE_PROJECT_ID ('${explicitProjectIdFromEnv}') is available. Attempting initialization with explicit projectId.`);
    options = { projectId: explicitProjectIdFromEnv };
  } else if (gacSet) {
    console.log("[firebase-admin.ts] GOOGLE_APPLICATION_CREDENTIALS is set. Attempting initialization with default options (environment inference).");
  } else {
    console.warn("[firebase-admin.ts] Neither GOOGLE_APPLICATION_CREDENTIALS nor NEXT_PUBLIC_FIREBASE_PROJECT_ID are set. Admin SDK might fail or use unexpected defaults if in a managed environment that provides them.");
  }

  try {
    adminApp = admin.initializeApp(options);
    console.log(`[firebase-admin.ts] Firebase Admin SDK initialization attempt completed. App Name: ${adminApp.name}, Project ID from SDK: ${adminApp.options.projectId}`);

    if (!adminApp.options.projectId && explicitProjectIdFromEnv && !options.projectId) {
        // This case means default init didn't get projectId, and we haven't tried explicit one yet.
        // This should ideally not happen if the logic above for 'options' is correct.
        console.warn(`[firebase-admin.ts] SDK's Project ID is undefined after default init. Retrying with explicit projectId: ${explicitProjectIdFromEnv}`);
        // It's generally not good to delete and re-init, but if the first attempt was "default" and failed to get ID,
        // this is a last resort.
        // await adminApp.delete(); // This can cause issues if not handled carefully.
        // adminApp = admin.initializeApp({ projectId: explicitProjectIdFromEnv }); // Re-assign adminApp
        // console.log(`[firebase-admin.ts] Firebase Admin SDK re-initialization with explicit projectId attempt completed. App Name: ${adminApp.name}, Project ID from SDK: ${adminApp.options.projectId}`);
         // For now, we will rely on the first attempt with options. If it fails, it fails.
    }


    if (!adminApp.options.projectId) {
      console.error(`[firebase-admin.ts] CRITICAL: Firebase Admin SDK initialized, BUT Project ID is UNDEFINED. Firestore/Auth will likely fail. GAC was ${gacSet ? 'SET' : 'NOT SET'}. Explicit ProjectID from env was ${explicitProjectIdFromEnv || 'NOT SET'}.`);
    }

    adminDb = admin.firestore();
    console.log('[firebase-admin.ts] Firestore Admin instance obtained.');

    try {
      adminAuth = admin.auth();
      console.log('[firebase-admin.ts] Auth Admin instance obtained.');
    } catch (authError: any) {
      console.warn(`[firebase-admin.ts] FAILED to get Auth Admin instance: ${authError?.message}. This might be okay if Admin Auth is not used.`);
    }

  } catch (e: any) {
    const initErrorMessage = `[firebase-admin.ts] Firebase Admin SDK initialization FAILED. Details: ${e.message}. GAC was ${gacSet ? 'SET' : 'NOT SET'}. Explicit ProjectID from env was ${explicitProjectIdFromEnv || 'NOT SET'}.`;
    console.error(`\n\n🛑 ${initErrorMessage}\n\n`);
    if (e.cause) console.error('[firebase-admin.ts] Original cause:', e.cause);
    // DO NOT THROW here, let adminDb/adminAuth remain undefined.
    // Tools will check if adminDb is available.
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
