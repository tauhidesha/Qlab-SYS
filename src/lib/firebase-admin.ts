
import * as admin from 'firebase-admin';

// Minimal logging
console.log("[firebase-admin.ts] Attempting to initialize Firebase Admin SDK...");

if (!admin.apps.length) {
  try {
    // When deployed to App Hosting or running with emulators (e.g., via `firebase emulators:start`),
    // the SDK should auto-configure based on the environment.
    // For local development outside emulators, GOOGLE_APPLICATION_CREDENTIALS environment variable
    // pointing to your service account key JSON file is typically required.
    admin.initializeApp();
    
    // Verify initialization by checking app name
    if (admin.app().name) {
      console.log(`[firebase-admin.ts] Firebase Admin SDK initialized successfully. App Name: ${admin.app().name}`);
    } else {
      // This case might be rare if initializeApp() itself doesn't throw for common issues
      throw new Error("Firebase Admin SDK initializeApp() called, but app name is not available. Initialization may be incomplete.");
    }

  } catch (e:any) {
    const errorMessage = `[firebase-admin.ts] Firebase Admin SDK initialization FAILED. Details: ${e.message}. Pastikan environment Anda sudah benar (mis. GOOGLE_APPLICATION_CREDENTIALS untuk pengembangan lokal di luar emulator, atau Anda sedang menjalankan di dalam environment Firebase/GCP). Cek juga apakah Project ID Firebase terkonfigurasi dengan benar.`;
    console.error(`\n\n🛑 ${errorMessage}\n\n`);
    // Re-throw the error to make it clear that initialization failed and stop the process
    // This is better than letting it proceed with potentially undefined db/auth.
    throw new Error(errorMessage, { cause: e });
  }
} else {
  console.log(`[firebase-admin.ts] Firebase Admin SDK already initialized. Using existing app: ${admin.app().name}`);
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
  // Non-critical for current tools if Auth is not used, but good to log.
  console.warn(`[firebase-admin.ts] FAILED to get Auth Admin instance: ${e?.message}. Jika tidak menggunakan Admin Auth, ini bisa diabaikan.`);
  // @ts-ignore
  adminAuth = undefined;
}


export { adminDb, adminAuth };
