
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


if (!admin.apps.length) {
  try {
    admin.initializeApp();
    
    if (admin.app().name) {
      console.log(`[firebase-admin.ts] Firebase Admin SDK initialized successfully. App Name: ${admin.app().name}, Project ID: ${admin.app().options.projectId}`);
    } else {
      throw new Error("Firebase Admin SDK initializeApp() called, but app name is not available. Initialization may be incomplete.");
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
  const firestoreErrorMessage = `[firebase-admin.ts] FAILED to get Firestore Admin instance: ${e?.message}. Ini biasanya terjadi jika Firebase Admin SDK tidak terinisialisasi dengan benar.`;
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
