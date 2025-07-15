/**
 * @fileoverview Inisialisasi Firebase Admin SDK yang aman dari race condition.
 * Mengekspor promise yang resolve setelah inisialisasi selesai.
 */

import admin from 'firebase-admin';

let db: admin.firestore.Firestore;
let adminAuth: admin.auth.Auth;
let initializationPromise: Promise<void> | null = null;

function initializeAdminApp(): Promise<void> {
  // Jika promise sudah ada, kembalikan promise yang sama untuk mencegah re-inisialisasi
  if (initializationPromise) {
    return initializationPromise;
  }

  // Buat promise baru yang akan kita kembalikan
  initializationPromise = new Promise((resolve, reject) => {
    if (admin.apps.length > 0) {
      console.log('[firebase-admin.ts] Admin app already initialized.');
      db = admin.firestore();
      adminAuth = admin.auth();
      resolve();
      return;
    }

    console.log('[firebase-admin.ts] Attempting to initialize Firebase Admin SDK...');
    try {
      let serviceAccountJson: string | undefined;
      if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
        // Prefer base64 (Vercel/production)
        serviceAccountJson = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8');
        console.log('[firebase-admin.ts] Using FIREBASE_SERVICE_ACCOUNT_BASE64');
      } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        // Fallback to raw JSON (local dev)
        serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
        console.log('[firebase-admin.ts] Using FIREBASE_SERVICE_ACCOUNT');
      } else {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 or FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
      }

      const serviceAccount = JSON.parse(serviceAccountJson);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      db = admin.firestore();
      adminAuth = admin.auth();
      
      console.log('[firebase-admin.ts] ✅ Firebase Admin SDK initialized successfully.');
      resolve();

    } catch (error: any) {
      console.error('[firebase-admin.ts] ❌ Firebase Admin SDK initialization FAILED.', error.message);
      reject(error); // Gagal, tolak promise-nya
    }
  });

  return initializationPromise;
}

// Inisialisasi awal
const adminAppPromise = initializeAdminApp();

// Ekspor promise dan fungsi getter
export { adminAppPromise, db, adminAuth };