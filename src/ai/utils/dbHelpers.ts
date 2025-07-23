// File: src/ai/utils/dbHelpers.ts

import { getFirebaseAdmin } from '@/lib/firebase-admin'; // Pastikan path ke firebase config benar
import admin from 'firebase-admin';

/**
 * Mengambil ID dokumen layanan dari Firestore berdasarkan nama resminya.
 * @param serviceName Nama resmi layanan, contoh: "Repaint Velg".
 * @returns ID dokumen atau null jika tidak ditemukan.
 */
export async function getServiceIdByName(
  serviceName: string,
): Promise<string | null> {
  try {
    const db = getFirebaseAdmin().firestore();
    const servicesRef = db.collection('services');
    const serviceSnapshot = await servicesRef.where('name', '==', serviceName).limit(1).get();

    if (serviceSnapshot.empty) {
      console.warn(`Service dengan nama "${serviceName}" tidak ditemukan di Firestore.`);
      return null;
    }
    return serviceSnapshot.docs[0].id;
  } catch (error) {
    console.error('Error saat mengambil service ID by name:', error);
    return null;
  }
}