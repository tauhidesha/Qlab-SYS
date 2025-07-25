// File: src/lib/firestore-admin.ts
import { getFirebaseAdmin } from './firebase-admin';

const admin = getFirebaseAdmin();
const db = admin.firestore();

db.settings({
  ignoreUndefinedProperties: true,
});

export { db };
