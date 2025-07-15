
import { db } from '@/lib/firebase-admin';
import admin from 'firebase-admin';

/**
 * Checks if a manual intervention lock is active for a given sender number.
 * @param senderNumber The normalized phone number of the user.
 * @returns {Promise<boolean>} True if the lock is active, false otherwise.
 */
export async function isInterventionLockActive(senderNumber: string): Promise<boolean> {
  if (!senderNumber) return false;

  try {
    const lockDocRef = db.collection('ai_intervention_locks').doc(senderNumber);
    const lockDocSnap = await lockDocRef.get();

    if (lockDocSnap.exists) {
      const data = lockDocSnap.data();
      const lockExpiresAt = data.lockExpiresAt as admin.firestore.Timestamp;

      if (lockExpiresAt && Date.now() < lockExpiresAt.toMillis()) {
        console.log(`[LOCK CHECK] Lock is ACTIVE for ${senderNumber} until ${lockExpiresAt.toDate().toLocaleTimeString()}`);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error(`[LOCK CHECK] Error checking intervention lock for ${senderNumber}:`, error);
    // In case of error, assume the lock is not active to avoid blocking users.
    return false;
  }
}
