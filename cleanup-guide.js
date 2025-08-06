// Manual cleanup guide for Firestore
// Since direct Firebase Admin access is complex, here's what to clean manually:

console.log(`
🧹 FIRESTORE CLEANUP GUIDE
=========================

Collections to check and clean:

1. 📱 directMessages collection:
   Documents to delete:
   - 628999999999
   - 628999999888  
   - 628999999777
   - 628999999666
   - 628999999555
   - 628999999444
   - 628999999333
   - 628999999222
   - 628999999111
   - 628888888880
   - 628888888881
   - 628999999000

   For each document, also delete subcollections:
   - messages/
   - meta/

2. 🎯 zoya_sessions collection:
   Same phone numbers as above

3. 📊 aiMetrics collection:
   Query: customerPhone in [list above]
   Delete matching documents

4. 🔍 Any other collections:
   Search for documents containing test phone numbers

---

FIREBASE CONSOLE STEPS:
1. Go to: https://console.firebase.google.com/project/detailflow-8mkmj/firestore
2. Navigate to each collection
3. Find documents by phone number
4. Delete documents and subcollections
5. Alternatively: Use Firebase CLI with proper auth setup

---

PREVENTION (already implemented):
✅ Development mode protection active
✅ Test phone numbers will skip Firestore saves when NODE_ENV=development
✅ Use: NODE_ENV=development npm run dev for testing

`);

// Count estimated documents to delete
const testNumbers = [
  '628999999999', '628999999888', '628999999777', '628999999666', 
  '628999999555', '628999999444', '628999999333', '628999999222', 
  '628999999111', '628888888880', '628888888881', '628999999000'
];

console.log(`Estimated cleanup scope:
- ${testNumbers.length} directMessages documents
- ~${testNumbers.length * 2} subcollection documents (messages, meta)  
- ${testNumbers.length} session documents
- ~${testNumbers.length * 1.5} aiMetrics documents (estimated)
- Total: ~${Math.ceil(testNumbers.length * 5.5)} documents
`);

console.log('Most of these are from A/B testing and development iterations.');
console.log('Future testing with NODE_ENV=development will not create new test data! ✅');
