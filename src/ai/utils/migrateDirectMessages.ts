// @file: src/ai/utils/migrateDirectMessages.ts
'use server';

import { getFirebaseAdmin } from '@/lib/firebase-admin';
import admin from 'firebase-admin';

/**
 * Migrate legacy directMessages from root collection to subcollection structure
 * This is a one-time migration script
 */
export async function migrateDirectMessagesToSubcollection(): Promise<{ migrated: number; errors: number }> {
  console.log('[MIGRATION] Starting directMessages migration...');
  const db = getFirebaseAdmin().firestore();
  
  let migrated = 0;
  let errors = 0;
  
  try {
    // Get all documents from root directMessages collection
    const rootRef = db.collection('directMessages');
    const snapshot = await rootRef.get();
    
    console.log(`[MIGRATION] Found ${snapshot.size} documents in root collection`);
    
    for (const doc of snapshot.docs) {
      try {
        const data = doc.data();
        
        // Skip if this is already a parent document (has no text field)
        if (!data.text) {
          console.log(`[MIGRATION] Skipping ${doc.id} - appears to be parent document`);
          continue;
        }
        
        const senderNumber = data.senderNumber;
        if (!senderNumber) {
          console.log(`[MIGRATION] Skipping ${doc.id} - no senderNumber`);
          continue;
        }
        
        // Create message in subcollection
        const messagesRef = db.collection('directMessages').doc(senderNumber).collection('messages');
        
        await messagesRef.add({
          text: data.text,
          sender: data.sender || 'user',
          timestamp: data.timestamp || admin.firestore.FieldValue.serverTimestamp(),
          // Preserve additional metadata
          ...(data.customerId && { customerId: data.customerId }),
          ...(data.customerName && { customerName: data.customerName }),
          ...(data.read !== undefined && { read: data.read }),
          // Mark as migrated
          migratedFrom: 'root-collection',
          migratedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        // Update/create parent document with metadata
        const parentDocRef = db.collection('directMessages').doc(senderNumber);
        await parentDocRef.set({
          ...(data.customerName && { name: data.customerName }),
          ...(data.customerId && { customerId: data.customerId }),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          lastMigratedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        // Delete original document after successful migration
        await doc.ref.delete();
        
        migrated++;
        console.log(`[MIGRATION] Migrated message for ${senderNumber}`);
        
        // Add small delay to avoid overwhelming Firestore
        if (migrated % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
      } catch (error) {
        console.error(`[MIGRATION] Error migrating document ${doc.id}:`, error);
        errors++;
      }
    }
    
    console.log(`[MIGRATION] Completed. Migrated: ${migrated}, Errors: ${errors}`);
    return { migrated, errors };
    
  } catch (error) {
    console.error('[MIGRATION] Fatal error during migration:', error);
    throw error;
  }
}

/**
 * Check migration status
 */
export async function checkMigrationStatus(): Promise<{
  rootMessages: number;
  subcollectionUsers: number;
  needsMigration: boolean;
}> {
  const db = getFirebaseAdmin().firestore();
  
  // Count messages in root collection (that have text field)
  const rootSnapshot = await db.collection('directMessages').where('text', '!=', '').get();
  const rootMessages = rootSnapshot.size;
  
  // Count users with subcollections
  const allDocsSnapshot = await db.collection('directMessages').get();
  let subcollectionUsers = 0;
  
  for (const doc of allDocsSnapshot.docs) {
    const messagesSnapshot = await doc.ref.collection('messages').limit(1).get();
    if (!messagesSnapshot.empty) {
      subcollectionUsers++;
    }
  }
  
  return {
    rootMessages,
    subcollectionUsers,
    needsMigration: rootMessages > 0
  };
}
