import {onDocumentCreated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import {logger} from "firebase-functions";

// Inisialisasi Firebase Admin SDK
admin.initializeApp();

// Ini adalah sintaks V2 yang baru
export const updatelastmessagetimestamp = onDocumentCreated(
  "directMessages/{phoneNumber}/messages/{messageId}",
  (event) => {
    // 1. Dapatkan data dari event yang terjadi
    const snap = event.data;
    if (!snap) {
      logger.log("No data associated with the event, exiting.");
      return;
    }
    const newMessageData = snap.data();
    const timestamp = newMessageData.timestamp;

    // 2. Dapatkan nomor HP dari parameter
    const phoneNumber = event.params.phoneNumber;

    // 3. Referensi ke dokumen induk
    const parentDocRef = admin.firestore()
      .collection("directMessages")
      .doc(phoneNumber);

    // 4. Update dokumen induk
    if (timestamp) {
      logger.log(
        `Updating lastMessageAt for ${phoneNumber} with new timestamp.`
      );
      return parentDocRef.set({
  lastMessageAt: timestamp,
}, { merge: true });
    } else {
      logger.log("New message has no timestamp. No update performed.");
      return null;
    }
  }
);