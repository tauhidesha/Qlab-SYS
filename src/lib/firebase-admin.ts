// File: src/lib/firebase-admin.ts (atau di mana pun file Anda berada)

import admin from 'firebase-admin';

export function getFirebaseAdmin() {
  if (admin.apps.length > 0) return admin.app();

  const serviceAccountJson = Buffer.from(
    process.env.FIREBASE_SERVICE_ACCOUNT_BASE_64!,
    'base64'
  ).toString('utf-8');
  const serviceAccount = JSON.parse(serviceAccountJson);

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
}