"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
let app;
let db;
if ((0, app_1.getApps)().length === 0) {
    exports.app = app = (0, app_1.initializeApp)(firebaseConfig);
}
else {
    exports.app = app = (0, app_1.getApp)();
}
exports.db = db = (0, firestore_1.getFirestore)(app);
console.log("Firebase.ts: Initialized and connecting to Cloud Firestore.");
//# sourceMappingURL=firebase.js.map