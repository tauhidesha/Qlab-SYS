// File: src/lib/firebase-admin.ts

import admin from 'firebase-admin';

// Fungsi ini akan mencari kredensial dari beberapa nama env var yang umum
function getCredentials() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    console.log('[Firebase Admin] Found FIREBASE_SERVICE_ACCOUNT_BASE64. Decoding...');
    return Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8');
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    console.log('[Firebase Admin] Found GOOGLE_APPLICATION_CREDENTIALS_JSON. Using raw JSON...');
    return process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  }
  console.error('[Firebase Admin] FATAL: No valid Firebase credentials environment variable found.');
  return null;
}

export function getFirebaseAdmin() {
  if (admin.apps.length > 0) return admin.app();

  const credentialsJson = getCredentials();
  if (!credentialsJson) {
    if (process.env.VERCEL_ENV) throw new Error('Firebase credentials missing from environment variables.');
    throw new Error('Firebase credentials missing from environment variables.');
  }
  try {
    const serviceAccount = JSON.parse(credentialsJson);
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });
  } catch (error: any) {
    console.error('[Firebase Admin] ❌ FATAL ERROR: Failed to parse credentials or initialize app.', error.message);
    if (process.env.VERCEL_ENV) throw new Error('Could not initialize Firebase Admin SDK.');
    throw error;
  }
}