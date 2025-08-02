
import { getFirebaseAdmin } from '../../lib/firebase-admin';
import admin from 'firebase-admin';

/**
 * Checks if a manual intervention lock is active for a given sender number.
 * @param senderNumber The normalized phone number of the user.
 * @returns {Promise<boolean>} True if the lock is active, false otherwise.
 */
export async function isInterventionLockActive(senderNumber: string): Promise<boolean> {
  if (!senderNumber) return false;

  try {
    const db = getFirebaseAdmin().firestore();
    const lockDocRef = db.collection('ai_intervention_locks').doc(senderNumber);
    const lockDocSnap = await lockDocRef.get();

    if (lockDocSnap.exists) {
      const data = lockDocSnap.data();
      if (data && data.lockExpiresAt) {
        const lockExpiresAt = data.lockExpiresAt as admin.firestore.Timestamp;
        if (lockExpiresAt && Date.now() < lockExpiresAt.toMillis()) {
          console.log(`[LOCK CHECK] Lock is ACTIVE for ${senderNumber} until ${lockExpiresAt.toDate().toLocaleTimeString()}`);
          return true;
        }
      }
    }
    
    console.log(`[LOCK CHECK] No active lock found for ${senderNumber}`);
    return false;
  } catch (error: any) {
    console.error(`[LOCK CHECK] Error checking intervention lock for ${senderNumber}:`, error);
    
    // Log more specific error details for debugging
    if (error?.code === 'permission-denied') {
      console.error(`[LOCK CHECK] Permission denied accessing ai_intervention_locks collection`);
    } else if (error?.code === 'unavailable') {
      console.error(`[LOCK CHECK] Firestore service unavailable`);
    }
    
    // In case of error, assume the lock is not active to avoid blocking users.
    // This ensures the AI flow continues even if there are permission issues
    console.log(`[LOCK CHECK] Defaulting to NO LOCK due to error - AI flow will continue`);
    return false;
  }
}
