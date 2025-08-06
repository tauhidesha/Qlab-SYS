// Manual cleanup guide for Firestore
// Since direct Firebase Admin access is complex, here's what to clean manually:

console.log(`
🧹 FIRESTORE CLEANUP GUIDE
=========================

Collections to check and clean:

1. 📱 directMessages collection:
   Documents to delete (50+ test numbers):
   - 6281210192220
   - 628123456789
   - 6281234567890
   - 6281234567891
   - 6281298652646
   - 6281348888997
   - 6281351735906
   - 6281388248249
   - 6281392974464
   - 6281510021762
   - 62816950460
   - 628170866809
   - 6281708668090
   - 6282110764614
   - 6282118199926
   - 6282177973945
   - 628222333444
   - 628333444555
   - 628444555666
   - 628555444333
   - 628555666777
   - 6285692512578
   - 6285773198506
   - 6285777186358
   - 6285817691377
   - 628666666666
   - 628777666555
   - 628777777777
   - 6288214296224
   - 628888888880
   - 628888888881
   - 628888888888
   - 6289503530371
   - 6289532375617
   - 62895323756317
   - 62895611932288
   - 6289652502585
   - 6289672799606
   - 628971562270
   - 628987654321
   - 628999888777
   - 628999999111
   - 628999999222
   - 628999999333
   - 628999999444
   - 628999999555
   - 628999999666
   - 628999999777
   - 628999999888
   - 628999999999
   - 628999999000
   - playground_user

   For each document, also delete subcollections:
   - messages/
   - meta/

2. 🎯 zoya_sessions collection:
   Same phone numbers as above (50+ documents)

3. 📊 aiMetrics collection:
   Query: customerPhone in [all numbers above]
   Delete matching documents

4. 🔍 Any other collections:
   Search for documents containing test phone numbers

⚠️ PRIORITY CLEANUP NEEDED! 
Session data is heavily polluted with test numbers.

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
  // Original A/B testing numbers
  '628999999999', '628999999888', '628999999777', '628999999666', 
  '628999999555', '628999999444', '628999999333', '628999999222', 
  '628999999111', '628888888880', '628888888881', '628999999000',
  
  // Additional test numbers found in sessions
  '6281210192220', '628123456789', '6281234567890', '6281234567891',
  '6281298652646', '6281348888997', '6281351735906', '6281388248249',
  '6281392974464', '6281510021762', '62816950460', '628170866809',
  '6281708668090', '6282110764614', '6282118199926', '6282177973945',
  '628222333444', '628333444555', '628444555666', '628555444333',
  '628555666777', '6285692512578', '6285773198506', '6285777186358',
  '6285817691377', '628666666666', '628777666555', '628777777777',
  '6288214296224', '628888888888', '6289503530371', '6289532375617',
  '62895323756317', '62895611932288', '6289652502585', '6289672799606',
  '628971562270', '628987654321', '628999888777',
  
  // Playground user
  'playground_user'
];

console.log(`Estimated cleanup scope:
- ${testNumbers.length} directMessages documents  
- ~${testNumbers.length * 2} subcollection documents (messages, meta)  
- ${testNumbers.length} session documents (HEAVILY POLLUTED!)
- ~${testNumbers.length * 1.5} aiMetrics documents (estimated)
- Total: ~${Math.ceil(testNumbers.length * 5.5)} documents

🚨 URGENT: ${testNumbers.length} test sessions polluting zoya_sessions collection!
`);

console.log('Most of these are from A/B testing and development iterations.');
console.log('Future testing with NODE_ENV=development will not create new test data! ✅');
