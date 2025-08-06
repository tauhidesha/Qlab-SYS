// Cleanup script untuk hapus test data dari Firestore
// Usage: node cleanup-test-data.js

const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = require('./service-account-key.json'); // You need this file
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// Test phone numbers yang digunakan untuk testing
const testPhoneNumbers = [
  '628999999999', '628999999888', '628999999777', '628999999666', 
  '628999999555', '628999999444', '628999999333', '628999999222', 
  '628999999111', '628888888880', '628888888881'
];

async function cleanupTestData() {
  console.log('🧹 Starting cleanup of test data...');
  
  for (const phoneNumber of testPhoneNumbers) {
    try {
      console.log(`Cleaning ${phoneNumber}...`);
      
      // 1. Delete from directMessages collection
      const directMessageRef = db.collection('directMessages').doc(phoneNumber);
      
      // Delete messages subcollection
      const messagesSnapshot = await directMessageRef.collection('messages').get();
      const batch1 = db.batch();
      messagesSnapshot.docs.forEach(doc => batch1.delete(doc.ref));
      if (!messagesSnapshot.empty) {
        await batch1.commit();
        console.log(`  ✅ Deleted ${messagesSnapshot.size} messages`);
      }
      
      // Delete meta subcollection
      const metaSnapshot = await directMessageRef.collection('meta').get();
      const batch2 = db.batch();
      metaSnapshot.docs.forEach(doc => batch2.delete(doc.ref));
      if (!metaSnapshot.empty) {
        await batch2.commit();
        console.log(`  ✅ Deleted ${metaSnapshot.size} meta docs`);
      }
      
      // Delete main document
      await directMessageRef.delete();
      console.log(`  ✅ Deleted main directMessage doc`);
      
      // 2. Delete from sessions collection
      const sessionRef = db.collection('sessions').doc(phoneNumber);
      await sessionRef.delete();
      console.log(`  ✅ Deleted session`);
      
      // 3. Delete from aiMetrics collection (if exists)
      const metricsSnapshot = await db.collection('aiMetrics')
        .where('customerPhone', '==', phoneNumber)
        .get();
      
      if (!metricsSnapshot.empty) {
        const batch3 = db.batch();
        metricsSnapshot.docs.forEach(doc => batch3.delete(doc.ref));
        await batch3.commit();
        console.log(`  ✅ Deleted ${metricsSnapshot.size} metrics`);
      }
      
    } catch (error) {
      console.error(`❌ Error cleaning ${phoneNumber}:`, error.message);
    }
  }
  
  console.log('🎉 Cleanup completed!');
  process.exit(0);
}

cleanupTestData();
