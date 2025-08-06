// Simple cleanup script menggunakan environment variables Firebase
// Usage: node cleanup-test-simple.js

require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');

// Initialize Firebase Admin dengan environment variables
if (!admin.apps.length) {
  // Gunakan environment variables yang sudah ada di .env.local
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  };
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID
  });
}

const testPhoneNumbers = [
  '628999999999', '628999999888', '628999999777', '628999999666', 
  '628999999555', '628999999444', '628999999333', '628999999222', 
  '628999999111', '628888888880', '628888888881', '628999999000'
];

async function cleanupTestData() {
  console.log('🧹 Cleaning up test data from Firestore...');
  
  try {
    const db = admin.firestore();
    
    let totalDeleted = 0;
    
    for (const phoneNumber of testPhoneNumbers) {
      console.log(`\n📞 Processing ${phoneNumber}...`);
      
      try {
        // 1. Delete directMessages/{phone}/messages/* subcollection
        const messagesRef = db.collection('directMessages').doc(phoneNumber).collection('messages');
        const messagesSnapshot = await messagesRef.get();
        
        if (!messagesSnapshot.empty) {
          const batch1 = db.batch();
          messagesSnapshot.docs.forEach(doc => batch1.delete(doc.ref));
          await batch1.commit();
          console.log(`  ✅ Deleted ${messagesSnapshot.size} messages`);
          totalDeleted += messagesSnapshot.size;
        }
        
        // 2. Delete directMessages/{phone}/meta/* subcollection  
        const metaRef = db.collection('directMessages').doc(phoneNumber).collection('meta');
        const metaSnapshot = await metaRef.get();
        
        if (!metaSnapshot.empty) {
          const batch2 = db.batch();
          metaSnapshot.docs.forEach(doc => batch2.delete(doc.ref));
          await batch2.commit();
          console.log(`  ✅ Deleted ${metaSnapshot.size} meta docs`);
          totalDeleted += metaSnapshot.size;
        }
        
        // 3. Delete main directMessages document
        const mainDocRef = db.collection('directMessages').doc(phoneNumber);
        const mainDoc = await mainDocRef.get();
        if (mainDoc.exists) {
          await mainDocRef.delete();
          console.log(`  ✅ Deleted main directMessage doc`);
          totalDeleted += 1;
        }
        
        // 4. Delete session
        const sessionRef = db.collection('zoya_sessions').doc(phoneNumber);
        const sessionDoc = await sessionRef.get();
        if (sessionDoc.exists) {
          await sessionRef.delete();
          console.log(`  ✅ Deleted session`);
          totalDeleted += 1;
        }
        
        // 5. Delete from aiMetrics collection (if exists)
        const metricsSnapshot = await db.collection('aiMetrics')
          .where('customerPhone', '==', phoneNumber)
          .get();
        
        if (!metricsSnapshot.empty) {
          const batch3 = db.batch();
          metricsSnapshot.docs.forEach(doc => batch3.delete(doc.ref));
          await batch3.commit();
          console.log(`  ✅ Deleted ${metricsSnapshot.size} metrics`);
          totalDeleted += metricsSnapshot.size;
        }
        
        console.log(`  ✅ ${phoneNumber} cleaned successfully`);
        
      } catch (error) {
        console.error(`  ❌ Error cleaning ${phoneNumber}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Cleanup completed! Total ${totalDeleted} documents deleted.`);
    
  } catch (error) {
    console.error('❌ Failed to initialize cleanup:', error);
  }
  
  process.exit(0);
}

cleanupTestData().catch(console.error);
