// File: pages/api/test-firestore.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

// --- SESUAIKAN BAGIAN INI JIKA PERLU ---
// Pastikan path ini benar menunjuk ke file inisialisasi Firebase Admin Anda.
// Jika file inisialisasi Anda ada di root, path-nya mungkin '../../firebase-admin'
// Jika Anda tidak punya file terpusat, Anda bisa copy-paste logika inisialisasi ke sini.
try {
  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('[Test API] Firebase Admin SDK initialized successfully.');
  }
} catch (error: any) {
  console.error('[Test API] Firebase Admin SDK initialization failed:', error.message);
}
// --- AKHIR BAGIAN PENYESUAIAN ---


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[Test API] Endpoint /api/test-firestore accessed.');

  try {
    // 1. Mencoba melakukan operasi baca yang sangat sederhana
    const docRef = admin.firestore().doc('test_collection/test_doc');
    console.log(`[Test API] Attempting to read from: ${docRef.path}`);
    const docSnap = await docRef.get();
    console.log('[Test API] Firestore get() operation finished.');

    // 2. Jika berhasil, kirim respons sukses
    res.status(200).json({
      success: true,
      message: 'Koneksi dari Vercel ke Firestore BERHASIL.',
      docExists: docSnap.exists,
    });

  } catch (error: any) {
    console.error('[Test API] KESALAHAN KRITIS:', error);
    
    // 3. Jika gagal, kirim respons error dengan detail
    res.status(500).json({
      success: false,
      message: 'Koneksi dari Vercel ke Firestore GAGAL.',
      errorName: error.name,
      errorMessage: error.message,
      errorCode: error.code,
    });
  }
}