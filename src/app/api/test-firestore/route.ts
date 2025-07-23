// File: src/app/api/test-firestore/route.ts

import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// --- LOGIKA INISIALISASI FIREBASE ADMIN ---
// Pastikan ini berjalan dan path/env var Anda benar
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
// --- END ---

export async function GET(request: Request) {
  console.log('[Test API] Endpoint /api/test-firestore accessed via GET.');

  try {
    const docRef = admin.firestore().doc('test_collection/test_doc');
    console.log(`[Test API] Attempting to read from: ${docRef.path}`);
    const docSnap = await docRef.get();
    console.log('[Test API] Firestore get() operation finished.');

    return NextResponse.json({
      success: true,
      message: 'Koneksi dari Vercel ke Firestore BERHASIL.',
      docExists: docSnap.exists,
      docData: docSnap.data() || null,
    });

  } catch (error: any) {
    console.error('[Test API] KESALAHAN KRITIS:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Koneksi dari Vercel ke Firestore GAGAL.',
        errorName: error.name,
        errorMessage: error.message,
      },
      { status: 500 }
    );
  }
}