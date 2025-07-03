const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

/**
 * Trigger setiap kali ada dokumen BARU dibuat di sub-koleksi 'messages'.
 * Path: /directMessages/{phoneNumber}/messages/{messageId}
 */
exports.updateLastMessageTimestamp = functions.firestore
  .document("directMessages/{phoneNumber}/messages/{messageId}")
  .onCreate(async (snap, context) => {
    // 1. Ambil data dari pesan yang baru dibuat
    const newMessageData = snap.data();
    const timestamp = newMessageData.timestamp;

    // 2. Dapatkan path ke dokumen induk (dokumen pelanggan)
    const phoneNumber = context.params.phoneNumber;
    const parentDocRef = admin.firestore().collection("directMessages").doc(phoneNumber);

    // 3. Pastikan timestamp ada sebelum melakukan update
    if (timestamp) {
      console.log(
        `Updating lastMessageAt for ${phoneNumber} with timestamp:`,
        timestamp
      );
      // 4. Update field 'lastMessageAt' di dokumen induk
      return parentDocRef.update({
        lastMessageAt: timestamp,
      });
    } else {
      console.log("New message does not have a timestamp. No update performed.");
      return null;
    }
  });