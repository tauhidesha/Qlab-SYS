
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
console.log(`  - NEXT_PUBLIC_FIREBASE_PROJECT_ID (for explicit fallback): ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NOT SET'}`);


if (!admin.apps.length) {
  let app: admin.app.App;
  try {
    // Attempt to initialize with default options, relying on the environment
    // (e.g., GOOGLE_APPLICATION_CREDENTIALS or inherent service account in GCP/Firebase env)
    console.log("[firebase-admin.ts] Attempting admin.initializeApp() with default options (environment inference).");
    app = admin.initializeApp();

    // Critical Check: Ensure Project ID is resolved after initialization
    if (!app.options.projectId) {
      const explicitProjectIdFromEnv = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      if (explicitProjectIdFromEnv) {
        console.warn(`[firebase-admin.ts] Default init resulted in undefined projectId. Retrying with explicit projectId: ${explicitProjectIdFromEnv}`);
        // Clear the possibly failed default app before re-initializing
        // This is generally not recommended, but we're in a tough spot.
        // It's better to ensure the environment is set up for default init to work.
        // However, to be defensive:
        if (admin.apps.length > 0) {
            await admin.app().delete(); // Ensure we can re-initialize
        }
        app = admin.initializeApp({ projectId: explicitProjectIdFromEnv });
        if (!app.options.projectId) {
            throw new Error(`Initialization with explicit projectId (${explicitProjectIdFromEnv}) also resulted in an undefined projectId.`);
        }
      } else {
        throw new Error("Firebase Admin SDK initialized, BUT Project ID is UNDEFINED and no explicit fallback (NEXT_PUBLIC_FIREBASE_PROJECT_ID) was found.");
      }
    }
    console.log(`[firebase-admin.ts] Firebase Admin SDK initialized successfully. App Name: ${app.name}, Project ID: ${app.options.projectId}`);

  } catch (e: any) {
    const projectIdFromEnv = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const gacSet = !!process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const errorMessage = `[firebase-admin.ts] Firebase Admin SDK initialization FAILED. Details: ${e.message}. GAC was ${gacSet ? 'SET' : 'NOT SET'}. ProjectID from env was ${projectIdFromEnv || 'NOT SET'}.`;
    console.error(`\n\n🛑 ${errorMessage}\n\n`);
    if (e.cause) console.error('[firebase-admin.ts] Original cause:', e.cause);
    else console.error('[firebase-admin.ts] Full error object during initialization:', e);
    // Re-throw to stop execution if Admin SDK init fails fundamentally
    throw new Error(errorMessage, { cause: e });
  }
} else {
  console.log(`[firebase-admin.ts] Firebase Admin SDK already initialized. Using existing app: ${admin.app().name}, Project ID: ${admin.app().options.projectId}`);
}

let adminDb: admin.firestore.Firestore;
let adminAuth: admin.auth.Auth;

try {
  adminDb = admin.firestore();
  console.log('[firebase-admin.ts] Firestore Admin instance obtained.');
} catch (e:any) {
  const firestoreErrorMessage = `[firebase-admin.ts] FAILED to get Firestore Admin instance: ${e?.message}. This usually occurs if Firebase Admin SDK did not initialize correctly or Project ID was not resolved. Current Admin App Project ID: ${admin.apps.length ? admin.app().options.projectId : 'N/A (no admin app)'}.`;
  console.error(`\n\n🛑 ${firestoreErrorMessage}\n\n`);
  throw new Error(firestoreErrorMessage, { cause: e });
}

try {
  adminAuth = admin.auth();
  console.log('[firebase-admin.ts] Auth Admin instance obtained.');
} catch (e:any) {
  console.warn(`[firebase-admin.ts] FAILED to get Auth Admin instance: ${e?.message}. Jika tidak menggunakan Admin Auth, ini bisa diabaikan.`);
  // @ts-ignore
  adminAuth = undefined;
}

export { adminDb, adminAuth };
