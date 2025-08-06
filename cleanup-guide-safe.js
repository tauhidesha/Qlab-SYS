// SAFE Firestore cleanup guide - prioritizing production data safety
// Only delete numbers that are OBVIOUSLY fake test data

// 🟢 PHASE 1: ABSOLUTELY SAFE TO DELETE (obvious test patterns)
const definitelyFakeNumbers = [
  // 628999999* pattern - clearly test
  '628999999999', '628999999888', '628999999777', '628999999666',
  '628999999555', '628999999444', '628999999333', '628999999222', 
  '628999999111', '628999999000', '628999888777',
  
  // 628888888* pattern - clearly test  
  '628888888880', '628888888881', '628888888888',
  
  // Obviously fake patterns
  '628777777777', '628666666666', '628123456789', '628987654321',
  '628222333444', '628333444555', '628444555666', '628555444333',
  
  // Playground identifier
  'playground_user'
];

// 🟡 PHASE 2: SUSPICIOUS BUT CHECK CONTENT FIRST
const needsVerification = [
  '6281210192220', // This appeared in real conversation examples - VERIFY!
  '6281234567890', '6281234567891', // Could be real Indonesian numbers
  '6281298652646', '6281348888997', '6281351735906', '6281388248249',
  '6281392974464', '6281510021762', '62816950460', '628170866809',
  '6281708668090', '6282110764614', '6282118199926', '6282177973945',
  '628555666777', '6285692512578', '6285773198506', '6285777186358',
  '6285817691377', '628777666555', '6288214296224', '6289503530371',
  '6289532375617', '62895323756317', '62895611932288', '6289652502585',
  '6289672799606', '628971562270'
];

console.log(`
🧹 SAFE FIRESTORE CLEANUP GUIDE
===============================

🟢 START HERE: DELETE THESE ${definitelyFakeNumbers.length} NUMBERS IMMEDIATELY
(These are obviously fake test numbers):`);

definitelyFakeNumbers.forEach(num => {
  console.log(`   ✅ ${num}`);
});

console.log(`
🟡 VERIFY BEFORE DELETING: ${needsVerification.length} SUSPICIOUS NUMBERS
(Check conversation content - might be real customers!):`);

needsVerification.forEach(num => {
  console.log(`   ⚠️  ${num} - CHECK MESSAGES FIRST!`);
});

console.log(`
📋 CLEANUP PROCEDURE:
====================

1. 🟢 IMMEDIATE CLEANUP (safe numbers):
   Go to Firebase Console → directMessages
   Delete documents: ${definitelyFakeNumbers.join(', ')}
   Also clean: zoya_sessions, aiMetrics collections
   
2. 🟡 VERIFY PHASE (suspicious numbers):
   For each number in verify list:
   - Check directMessages/{number}/messages content
   - If messages look like real customer chat → KEEP IT
   - If messages are test gibberish → DELETE IT
   
3. 📊 ESTIMATED IMMEDIATE CLEANUP:
   - ${definitelyFakeNumbers.length} directMessages documents
   - ~${definitelyFakeNumbers.length * 2} subcollection docs
   - ${definitelyFakeNumbers.length} session documents  
   - Total: ~${definitelyFakeNumbers.length * 4} docs (safe to delete)

⚠️  CRITICAL: When in doubt, DON'T DELETE!
🔒 Better to keep fake data than lose real customer data.
🕵️  Always check message content before deleting suspicious numbers.

🎯 Firebase Console URL:
https://console.firebase.google.com/project/detailflow-8mkmj/firestore

✅ PREVENTION: Development mode protection is active.
   Future testing with NODE_ENV=development won't pollute Firestore.
`);
