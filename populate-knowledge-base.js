// Quick script to populate knowledge base with location information

const admin = require('firebase-admin');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

// Initialize Firebase Admin
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function populateKnowledgeBase() {
  console.log('🔥 Starting knowledge base population...');
  
  // Read the knowledge base export file
  const knowledgeBasePath = './src/data/knowledge_base_export.md';
  const content = fs.readFileSync(knowledgeBasePath, 'utf8');
  
  // Split by FAQ entries (using **P: as separator)
  const entries = content.split(/\*\*P:/).filter(entry => entry.trim().length > 0);
  
  console.log(`📚 Found ${entries.length} potential entries`);
  
  let processedCount = 0;
  
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i].trim();
    if (!entry) continue;
    
    // Extract question and answer
    const lines = entry.split('\n');
    let question = lines[0]?.replace(/\*\*/g, '').trim();
    
    // Find the answer (line starting with **A:)
    let answerStartIndex = -1;
    for (let j = 0; j < lines.length; j++) {
      if (lines[j].startsWith('**A:')) {
        answerStartIndex = j;
        break;
      }
    }
    
    if (answerStartIndex === -1) continue;
    
    // Extract answer content
    const answerLines = lines.slice(answerStartIndex);
    const answer = answerLines.join('\n')
      .replace(/\*\*A:\*\*/g, '')
      .replace(/^[\s\*]+/, '')
      .trim();
    
    if (!question || !answer) continue;
    
    // Create knowledge base entry
    const entryData = {
      id: `kb_${Date.now()}_${i}`,
      question,
      answer,
      content: `Q: ${question}\nA: ${answer}`,
      category: 'faq',
      tags: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    try {
      await db.collection('knowledge_base_entries').add(entryData);
      processedCount++;
      console.log(`✅ Added entry ${processedCount}: ${question.substring(0, 50)}...`);
    } catch (error) {
      console.error(`❌ Error adding entry: ${question.substring(0, 50)}...`, error.message);
    }
  }
  
  console.log(`🎉 Successfully populated ${processedCount} entries to knowledge base!`);
  process.exit(0);
}

populateKnowledgeBase().catch(error => {
  console.error('❌ Error populating knowledge base:', error);
  process.exit(1);
});
