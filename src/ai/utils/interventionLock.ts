
import { db } from '@/lib/firebase';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

/**
 * Checks if a manual intervention lock is active for a given sender number.
 * @param senderNumber The normalized phone number of the user.
 * @returns {Promise<boolean>} True if the lock is active, false otherwise.
 */
export async function isInterventionLockActive(senderNumber: string): Promise<boolean> {
  if (!senderNumber) return false;

  try {
    const lockDocRef = doc(db, 'ai_intervention_locks', senderNumber);
    const lockDocSnap = await getDoc(lockDocRef);

    if (lockDocSnap.exists()) {
      const data = lockDocSnap.data();
      const lockExpiresAt = data.lockExpiresAt as Timestamp;

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
