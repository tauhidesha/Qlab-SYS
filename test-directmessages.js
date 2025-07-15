// Test script untuk mengecek akses ke koleksi directMessages
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyB4O6ZRoRnRKWsA3v4q19jXHsSbELo2lT0",
  authDomain: "detailflow-8mkmj.firebaseapp.com",
  projectId: "detailflow-8mkmj",
  storageBucket: "detailflow-8mkmj.firebasestorage.app",
  messagingSenderId: "940251442415",
  appId: "1:940251442415:web:0227a18d7c0028ff20bf1a"
};

async function testDirectMessages() {
  try {
    console.log("Initializing Firebase...");
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log("Testing access to directMessages collection...");
    const directMessagesRef = collection(db, 'directMessages');
    const snapshot = await getDocs(directMessagesRef);
    
    console.log(`✅ Success! Found ${snapshot.docs.length} documents in directMessages`);
    
    if (snapshot.docs.length > 0) {
      console.log("Sample document IDs:");
      snapshot.docs.slice(0, 3).forEach((doc, index) => {
        console.log(`  ${index + 1}. ${doc.id}`);
      });
    }
    
  } catch (error) {
    console.error("❌ Error accessing directMessages:", error);
    console.error("Error details:", {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
  }
}

testDirectMessages();
