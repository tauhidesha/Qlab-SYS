// Pastikan .env selalu ter-load sebelum inisialisasi Firebase
require('dotenv').config();
// @file: src/ai/tests/e2e-scenarios.test.ts

import { generateWhatsAppReply } from '../flows/cs-whatsapp-reply-flow';
import { getSession } from '../utils/session';
import admin from 'firebase-admin';
import type { ZoyaChatInput } from '../../types/ai/cs-whatsapp-reply';

// DIHAPUS: Baris untuk konek ke emulator tidak diperlukan lagi
// process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

// Inisialisasi Firebase Admin SDK
// Ia akan otomatis mencari kredensial dari environment variable
if (!admin.apps.length) {
  admin.initializeApp({
    // Jika GOOGLE_APPLICATION_CREDENTIALS sudah di-set, Anda tidak perlu mengisi credential di sini
  });
}
const db = admin.firestore();

// Helper function "Bersih-Bersih" Otomatis (SANGAT PENTING)
// Fungsi ini akan menghapus semua data di koleksi 'directMessages'
// untuk memastikan setiap tes dimulai dari keadaan bersih.
const clearFirestoreData = async () => {
  const collectionRef = db.collection('directMessages');
  const snapshot = await collectionRef.limit(500).get(); // Ambil dokumen untuk dihapus
  if (snapshot.empty) {
    return;
  }
  const batch = db.batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();
};

describe('E2E Flow Test - Real Firebase Database', () => {

  // Jalankan "bersih-bersih" sebelum setiap skenario tes
  beforeEach(async () => {
    await clearFirestoreData();
  });

  // Tes untuk Skenario Promo
  it('Harus memproses permintaan promo dan menyimpan sesi yang benar di database asli', async () => {
    // ARRANGE
    const senderNumber = '6289876543210'; // Gunakan nomor berbeda untuk setiap tes jika perlu
    const input: ZoyaChatInput = {
      senderNumber: senderNumber,
      customerMessage: 'mau repaint bodi halus sama full detailing buat xmax warna candi pink',
      chatHistory: [],
    };
    
    // ACT
    const result = await generateWhatsAppReply(input);

    // ASSERT
    // Periksa langsung ke database asli
    const finalSessionInDb = await getSession(senderNumber);

    expect(finalSessionInDb).not.toBeNull();
    expect(finalSessionInDb?.inquiry?.lastMentionedMotor).toBe('xmax');
    expect(finalSessionInDb?.inquiry?.repaintDetails?.['Repaint Bodi Halus']?.color).toBe('candi pink');
    expect(finalSessionInDb?.cartServices).toEqual(expect.arrayContaining(['Repaint Bodi Halus', 'Full Detailing Glossy']));
    
    expect(result).not.toBeNull();
    expect(result?.suggestedReply).toBeDefined();

    console.log("Final Session in Real DB:", JSON.stringify(finalSessionInDb, null, 2));

  }, 20000); // Timeout lebih panjang tetap disarankan
});
