// File: src/ai/utils/clientHelpers.ts

import { db } from '@/lib/firebase-admin';
import admin from 'firebase-admin';

/**
 * Mencari klien berdasarkan nomor telepon. Jika tidak ada,
 * membuat klien baru dan mengembalikan ID-nya.
 * @param phone Nomor telepon pelanggan (format tanpa + atau spasi).
 * @param name Nama pelanggan untuk pembuatan klien baru.
 * @returns ID dokumen dari koleksi 'clients'.
 */
export async function findOrCreateClientByPhone(
  phone: string,
  name: string,
): Promise<string> {
  const clientsRef = db.collection('clients');
  // 1. Cari klien yang sudah ada berdasarkan nomor telepon
  try {
    const querySnapshot = await clientsRef.where('phone', '==', phone).limit(1).get();

    // 2. Jika klien ditemukan, kembalikan ID-nya
    if (!querySnapshot.empty) {
      const clientId = querySnapshot.docs[0].id;
      console.log(`[ClientHelper] Klien ditemukan dengan nomor ${phone}, ID: ${clientId}`);
      return clientId;
    }

    // 3. Jika tidak ditemukan, buat klien baru
    console.log(`[ClientHelper] Klien tidak ditemukan. Membuat klien baru untuk ${name} (${phone}).`);
    const newClientData = {
      name: name,
      phone: phone,
      createdAt: admin.firestore.Timestamp.now(),
      lastVisit: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
      loyaltyPoints: 0,
      // Sub-koleksi 'motorcycles' bisa ditambahkan nanti secara terpisah
    };

    const docRef = await clientsRef.add(newClientData);
    console.log(`[ClientHelper] Klien baru berhasil dibuat dengan ID: ${docRef.id}`);
    return docRef.id;

  } catch (error) {
    console.error('[ClientHelper] Error saat mencari atau membuat klien:', error);
    // Fallback darurat jika terjadi error, bisa diganti dengan penanganan lain
    return 'client_error';
  }
} // <-- PERBAIKAN: Kurung kurawal penutup seharusnya di sini.

/**
 * Mengambil nama pelanggan dari koleksi directMessages.
 * @param senderNumber Nomor telepon lengkap dengan @c.us
 * @returns Nama pelanggan atau null jika tidak ditemukan.
 */
export async function getClientName(
  senderNumber: string,
): Promise<string | null> {
  // Pastikan senderNumber bersih dari @c.us sebelum jadi ID dokumen
  const docId = senderNumber.replace('@c.us', '');
  const metaRef = db.collection('directMessages').doc(docId).collection('meta').doc('info');

  try {
    const docSnap = await metaRef.get();
    const data = docSnap.data();
    if (docSnap.exists && data && typeof data.name === 'string' && data.name.length > 0) {
      console.log(`[ClientHelper] Nama ditemukan untuk ${docId}: ${data.name}`);
      return data.name;
    }
    console.log(`[ClientHelper] Tidak ada data nama di meta untuk ${docId}.`);
    return null;
  } catch (error) {
    console.error(`[ClientHelper] Gagal mengambil nama untuk ${docId}:`, error);
    return null;
  }
}