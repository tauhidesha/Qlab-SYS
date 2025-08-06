// @file: src/ai/utils/conversationHistory.ts
'use server';

import { getFirebaseAdmin } from '@/lib/firebase-admin';
import admin from 'firebase-admin';
import type OpenAI from 'openai';

const DIRECT_MESSAGES_COLLECTION = 'directMessages';

/**
 * Get conversation history for a user from directMessages/{phoneNumber}/messages subcollection
 * Also includes any legacy messages from root collection for backward compatibility
 */
export async function getConversationHistory(senderNumber: string): Promise<OpenAI.Chat.Completions.ChatCompletionMessageParam[]> {
  console.log(`[getConversationHistory] Getting history for: ${senderNumber}`);
  const db = getFirebaseAdmin().firestore();
  
  try {
    const messages: Array<{
      role: 'user' | 'assistant';
      content: string;
      timestamp: number;
    }> = [];
    
    // 1. Get messages from subcollection (new structure)
    const messagesRef = db.collection(DIRECT_MESSAGES_COLLECTION).doc(senderNumber).collection('messages');
    const subSnapshot = await messagesRef.orderBy('timestamp', 'asc').limit(50).get();
    
    subSnapshot.forEach(doc => {
      const data = doc.data();
      const role = data.sender === 'user' ? 'user' : 'assistant';
      const timestamp = data.timestamp?.toMillis() || 0;
      
      messages.push({
        role,
        content: data.text || '',
        timestamp
      });
    });
    
    // 2. Get legacy messages from root collection (old structure)
    const rootRef = db.collection(DIRECT_MESSAGES_COLLECTION);
    const rootQuery = rootRef.where('senderNumber', '==', senderNumber).orderBy('timestamp', 'asc').limit(20);
    const rootSnapshot = await rootQuery.get();
    
    rootSnapshot.forEach(doc => {
      const data = doc.data();
      const role = data.sender === 'user' || data.sender === 'customer' ? 'user' : 'assistant';
      const timestamp = data.timestamp?.toMillis() || 0;
      
      messages.push({
        role,
        content: data.text || '',
        timestamp
      });
    });
    
    // 3. Deduplicate messages and sort by timestamp
    const uniqueMessages = new Map<string, { role: 'user' | 'assistant'; content: string; timestamp: number }>();
    
    messages.forEach(msg => {
      // Create a key based on content and role to identify duplicates
      const key = `${msg.role}:${msg.content.trim()}`;
      
      // Keep the message with the latest timestamp if duplicates exist
      if (!uniqueMessages.has(key) || uniqueMessages.get(key)!.timestamp < msg.timestamp) {
        uniqueMessages.set(key, msg);
      }
    });
    
    const sortedMessages = Array.from(uniqueMessages.values())
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      })) as OpenAI.Chat.Completions.ChatCompletionMessageParam[];
    
    console.log(`[getConversationHistory] Found ${messages.length} total messages, deduplicated to ${sortedMessages.length} unique messages`);
    console.log(`[getConversationHistory] Sources: ${subSnapshot.size} from subcollection, ${rootSnapshot.size} from root`);
    return sortedMessages;
  } catch (error) {
    console.error('[getConversationHistory] Error getting history:', error);
    return [];
  }
}

/**
 * Save AI response to directMessages/{phoneNumber}/messages subcollection
 * This uses the same structure as the WhatsApp server
 */
export async function saveAIResponse(
  senderNumber: string, 
  aiResponse: string,
  metadata?: { toolsUsed?: string[], iterations?: number }
): Promise<void> {
  console.log(`[saveAIResponse] Saving AI response for: ${senderNumber}`);
  
  // 🔒 DEVELOPMENT: Skip saving test phone numbers to prevent Firestore pollution
  const isTestPhoneNumber = senderNumber.startsWith('628999999') || 
                           senderNumber.startsWith('628888888') ||
                           senderNumber.startsWith('628123456') ||
                           senderNumber.startsWith('628222333') ||
                           senderNumber.startsWith('628333444') ||
                           senderNumber.startsWith('628444555') ||
                           senderNumber.startsWith('628555') ||
                           senderNumber.startsWith('628666') ||
                           senderNumber.startsWith('628777') ||
                           senderNumber === 'playground_user' ||
                           /^628\d{9,12}$/.test(senderNumber) && senderNumber.includes('999');
                           
  if (isTestPhoneNumber && process.env.NODE_ENV === 'development') {
    console.log(`[saveAIResponse] 🧪 DEVELOPMENT: Skipping save for test phone number ${senderNumber}`);
    return;
  }
  
  const db = getFirebaseAdmin().firestore();
  
  try {
    const messagesRef = db.collection(DIRECT_MESSAGES_COLLECTION).doc(senderNumber).collection('messages');
    
    // Use transaction to prevent race condition duplicates
    await db.runTransaction(async (transaction) => {
      // Check for recent duplicate AI responses (within last 5 minutes)
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const recentQuery = messagesRef
        .where('sender', '==', 'zoya')
        .where('timestamp', '>', admin.firestore.Timestamp.fromDate(fiveMinutesAgo))
        .orderBy('timestamp', 'desc')
        .limit(3);
      
      const recentSnapshot = await transaction.get(recentQuery);
      const isDuplicate = recentSnapshot.docs.some(doc => {
        const data = doc.data();
        return data.text === aiResponse;
      });
      
      if (isDuplicate) {
        console.log(`[saveAIResponse] Duplicate AI response detected, skipping save for ${senderNumber}`);
        return;
      }
      
      // Create new document reference for the message
      const newMessageRef = messagesRef.doc();
      
      transaction.set(newMessageRef, {
        text: aiResponse,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        sender: 'zoya',
        // Additional metadata for AI tracking
        sentBy: 'ai-flow',
        ...(metadata && Object.keys(metadata).length > 0 && { metadata })
      });
    });
    
    console.log(`[saveAIResponse] Successfully saved AI response for ${senderNumber}`);
  } catch (error) {
    console.error('[saveAIResponse] Error saving AI response:', error);
  }
}

/**
 * Clear conversation history for a user
 */
export async function clearConversationHistory(senderNumber: string): Promise<void> {
  console.log(`[clearConversationHistory] Clearing history for: ${senderNumber}`);
  const db = getFirebaseAdmin().firestore();
  
  try {
    const messagesRef = db.collection(DIRECT_MESSAGES_COLLECTION).doc(senderNumber).collection('messages');
    const snapshot = await messagesRef.get();
    
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log(`[clearConversationHistory] Successfully cleared history for ${senderNumber}`);
  } catch (error) {
    console.error('[clearConversationHistory] Error clearing history:', error);
  }
}
