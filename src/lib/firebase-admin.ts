// File: src/lib/firebase-admin.ts (atau di mana pun file Anda berada)

import admin from 'firebase-admin';

// Cek jika aplikasi sudah diinisialisasi untuk mencegah error duplikasi
if (!admin.apps.length) {
  console.log('[Firebase Admin] No active apps, attempting to initialize...');
  
  try {
    // Ambil kredensial dari environment variable
    // Pola base64 Anda sudah bagus, kita pertahankan
    const serviceAccountJson = Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!, 
      'base64'
    ).toString('utf-8');

    const serviceAccount = JSON.parse(serviceAccountJson);

    // Inisialisasi aplikasi
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // Menentukan databaseURL secara eksplisit adalah praktik terbaik
      databaseURL: `https://{serviceAccount.project_id}.firebaseio.com`
    });

    console.log(`[Firebase Admin] ✅ SDK initialized successfully for project: ${serviceAccount.project_id}`);

  } catch (error: any) {
    console.error('[Firebase Admin] ❌ FATAL ERROR: Failed to initialize Firebase Admin SDK.', error.message);
    // Melempar error akan menghentikan eksekusi dan menunjukkan masalah dengan jelas di log Vercel
    throw new Error('Could not initialize Firebase Admin SDK.');
  }
}

// Ekspor instance yang sudah pasti siap pakai
export const db = admin.firestore();
export const adminAuth = admin.auth();

// Ekspor default jika Anda butuh akses ke seluruh namespace 'admin'
export default admin;