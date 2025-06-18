
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
  try {
    let appOptions: admin.AppOptions = {};
    const explicitProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

    // Only use explicitProjectId if GOOGLE_APPLICATION_CREDENTIALS is not set
    // and explicitProjectId is available.
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && explicitProjectId) {
      appOptions.projectId = explicitProjectId;
      console.log(`[firebase-admin.ts] Initializing Admin SDK with explicit projectId: ${explicitProjectId}`);
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.log(`[firebase-admin.ts] GOOGLE_APPLICATION_CREDENTIALS is set, Admin SDK will use it.`);
    } else {
      console.log(`[firebase-admin.ts] Initializing Admin SDK without explicit credentials or projectId. SDK will attempt to infer.`);
    }

    admin.initializeApp(appOptions);
    
    const adminApp = admin.app();
    const currentProjectId = adminApp.options.projectId;

    if (adminApp.name && currentProjectId) {
      console.log(`[firebase-admin.ts] Firebase Admin SDK initialized successfully. App Name: ${adminApp.name}, Project ID: ${currentProjectId}`);
    } else if (adminApp.name && !currentProjectId) {
      const warningMessage = `[firebase-admin.ts] Firebase Admin SDK initialized (App Name: ${adminApp.name}), BUT Project ID is UNDEFINED. This will likely cause issues with Firestore/Auth access. Ensure GOOGLE_APPLICATION_CREDENTIALS is set and valid, or NEXT_PUBLIC_FIREBASE_PROJECT_ID is correctly picked up.`;
      console.warn(`\n\n⚠️ ${warningMessage}\n\n`);
      // Not throwing error here immediately to see if it can still obtain db, but it's a bad sign.
    } else {
      throw new Error("Firebase Admin SDK initializeApp() called, but app name or project ID is not available. Initialization may be incomplete.");
    }

  } catch (e:any) {
    const errorMessage = `[firebase-admin.ts] Firebase Admin SDK initialization FAILED. Details: ${e.message}. Pastikan environment Anda sudah benar (mis. GOOGLE_APPLICATION_CREDENTIALS untuk pengembangan lokal di luar emulator, atau Anda sedang menjalankan di dalam environment Firebase/GCP). Cek juga apakah Project ID Firebase terkonfigurasi dengan benar.`;
    console.error(`\n\n🛑 ${errorMessage}\n\n`);
    console.error('[firebase-admin.ts] Full error object during initialization:', e);
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
  const firestoreErrorMessage = `[firebase-admin.ts] FAILED to get Firestore Admin instance: ${e?.message}. Ini biasanya terjadi jika Firebase Admin SDK tidak terinisialisasi dengan benar atau Project ID tidak terresolve.`;
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
