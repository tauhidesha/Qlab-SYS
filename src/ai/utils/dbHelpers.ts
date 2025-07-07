// File: src/ai/utils/dbHelpers.ts

import { db } from '@/lib/firebase'; // Pastikan path ke firebase config benar
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

/**
 * Mengambil ID dokumen layanan dari Firestore berdasarkan nama resminya.
 * @param serviceName Nama resmi layanan, contoh: "Repaint Velg".
 * @returns ID dokumen atau null jika tidak ditemukan.
 */
export async function getServiceIdByName(
  serviceName: string,
): Promise<string | null> {
  try {
    const servicesRef = collection(db, 'services');
    const q = query(servicesRef, where('name', '==', serviceName), limit(1));
    const serviceSnapshot = await getDocs(q);

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