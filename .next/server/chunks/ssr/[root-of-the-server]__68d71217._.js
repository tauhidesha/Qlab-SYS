module.exports = {

"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/process [external] (process, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}}),
"[externals]/tls [external] (tls, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/net [external] (net, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/http2 [external] (http2, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/dns [external] (dns, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[project]/src/lib/firebase.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "app": (()=>app),
    "db": (()=>db)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm2017.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
;
;
// Minimal logging
console.log("[firebase.ts] Initializing Firebase...");
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyB4O6ZRoRnRKWsA3v4q19jXHsSbELo2lT0"),
    authDomain: ("TURBOPACK compile-time value", "detailflow-8mkmj.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "detailflow-8mkmj"),
    storageBucket: ("TURBOPACK compile-time value", "detailflow-8mkmj.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "940251442415"),
    appId: ("TURBOPACK compile-time value", "1:940251442415:web:0227a18d7c0028ff20bf1a")
};
if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
    console.error("[firebase.ts] FATAL ERROR: Firebase projectId or apiKey is MISSING in environment variables.");
}
let app;
let db;
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length === 0) {
    try {
        app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(firebaseConfig);
        console.log("[firebase.ts] Firebase app initialized. Project ID:", app.options.projectId);
    } catch (e) {
        console.error("[firebase.ts] FAILED to initialize Firebase app:", e.message);
        // @ts-ignore
        app = null;
    }
} else {
    app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApp"])();
    console.log("[firebase.ts] Using existing Firebase app. Project ID:", app.options.projectId);
}
// @ts-ignore
if (app) {
    try {
        // @ts-ignore
        db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFirestore"])(app);
        console.log("[firebase.ts] Firestore instance obtained.");
    } catch (e) {
        console.error("[firebase.ts] FAILED to get Firestore instance:", e?.message);
    }
} else {
    console.error("[firebase.ts] Firebase app not properly initialized, cannot get Firestore.");
}
;
}}),
"[externals]/perf_hooks [external] (perf_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("perf_hooks", () => require("perf_hooks"));

module.exports = mod;
}}),
"[externals]/node:perf_hooks [external] (node:perf_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:perf_hooks", () => require("node:perf_hooks"));

module.exports = mod;
}}),
"[externals]/async_hooks [external] (async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("async_hooks", () => require("async_hooks"));

module.exports = mod;
}}),
"[externals]/child_process [external] (child_process, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}}),
"[externals]/require-in-the-middle [external] (require-in-the-middle, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("require-in-the-middle", () => require("require-in-the-middle"));

module.exports = mod;
}}),
"[externals]/import-in-the-middle [external] (import-in-the-middle, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("import-in-the-middle", () => require("import-in-the-middle"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[externals]/express [external] (express, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("express", () => require("express"));

module.exports = mod;
}}),
"[externals]/fs/promises [external] (fs/promises, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}}),
"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}}),
"[project]/src/ai/genkit.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ai": (()=>ai)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-rsc] (ecmascript)"); // Ensure Firebase is initialized early
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$genkit$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/genkit.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$genkit$2d$ai$2f$googleai$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@genkit-ai/googleai/lib/index.mjs [app-rsc] (ecmascript) <module evaluation>"); // Impor plugin Google AI
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$genkit$2d$ai$2f$googleai$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@genkit-ai/googleai/lib/index.mjs [app-rsc] (ecmascript) <locals>");
;
;
;
const ai = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$genkit$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["genkit"])({
    plugins: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$genkit$2d$ai$2f$googleai$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["googleAI"])()
    ],
    model: 'googleai/gemini-1.5-flash-latest'
});
}}),
"[externals]/firebase-admin [external] (firebase-admin, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("firebase-admin", () => require("firebase-admin"));

module.exports = mod;
}}),
"[project]/src/lib/firebase-admin.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "adminAuth": (()=>adminAuth),
    "adminDb": (()=>adminDb)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs)");
;
// Minimal logging
console.log("[firebase-admin.ts] Initializing Firebase Admin SDK...");
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["apps"].length) {
    try {
        // When deployed to App Hosting or running with emulators (e.g., via `firebase emulators:start`),
        // the SDK should auto-configure based on the environment.
        // For local development outside emulators, you might need to set
        // GOOGLE_APPLICATION_CREDENTIALS environment variable pointing to your service account key JSON file.
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["initializeApp"])();
        console.log('[firebase-admin.ts] Firebase Admin SDK initialized successfully.');
        if ((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["instanceId"])()) {
            console.log('[firebase-admin.ts] Firebase Admin App Name:', (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["app"])().name);
        }
    } catch (e) {
        console.error('[firebase-admin.ts] Firebase Admin SDK initialization failed. Details:', e.message);
        console.error('[firebase-admin.ts] Ensure your environment is configured correctly for Firebase Admin (e.g., GOOGLE_APPLICATION_CREDENTIALS for local dev, or running within a Firebase/GCP environment).');
    // Depending on your error handling strategy, you might want to re-throw or handle this.
    // For now, we'll let it proceed, but db/auth might be undefined.
    }
} else {
    console.log('[firebase-admin.ts] Firebase Admin SDK already initialized. Using existing app.');
}
let adminDb;
let adminAuth;
try {
    adminDb = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["firestore"])();
    console.log('[firebase-admin.ts] Firestore Admin instance obtained.');
} catch (e) {
    console.error('[firebase-admin.ts] FAILED to get Firestore Admin instance:', e?.message);
    // @ts-ignore
    adminDb = undefined;
}
try {
    adminAuth = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["auth"])();
    console.log('[firebase-admin.ts] Auth Admin instance obtained.');
} catch (e) {
    console.error('[firebase-admin.ts] FAILED to get Auth Admin instance:', e?.message);
    // @ts-ignore
    adminAuth = undefined;
}
;
}}),
"[project]/src/ai/tools/extractMotorInfoTool.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7fe3be2ed12444a5af48a4ad123e0e944e66ae77c2":"extractMotorInfoTool"},"",""] */ __turbopack_context__.s({
    "extractMotorInfoTool": (()=>extractMotorInfoTool)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
/**
 * @fileOverview Genkit tool for extracting motorcycle information from text.
 * - extractMotorInfoTool - The Genkit tool definition.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase-admin.ts [app-rsc] (ecmascript)"); // Pastikan file ini ada dan terkonfigurasi
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
// Skema input untuk tool
const ExtractMotorInfoInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    text: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe('Teks dari pengguna yang mungkin berisi nama atau deskripsi motor.')
});
// Skema output untuk tool
const ExtractMotorInfoOutputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    brand: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe('Merek motor yang terdeteksi.'),
    model: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe('Model motor yang terdeteksi.'),
    size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].enum([
        'S',
        'M',
        'L',
        'XL'
    ]).describe('Ukuran motor yang terdeteksi (S, M, L, XL).')
});
const extractMotorInfoTool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineTool({
    name: 'extractMotorInfoTool',
    description: 'Mendeteksi merek, model, dan ukuran motor dari teks deskriptif pengguna dengan mencocokkan ke database tipe kendaraan.',
    inputSchema: ExtractMotorInfoInputSchema,
    outputSchema: ExtractMotorInfoOutputSchema
}, async (input)=>{
    const cleanText = input.text.toLowerCase().trim();
    console.log(`[extractMotorInfoTool] Input text: "${input.text}", Cleaned text: "${cleanText}"`);
    if (!cleanText) {
        console.log('[extractMotorInfoTool] Input text is empty. Throwing error.');
        throw new Error('Teks input kosong, tidak bisa mendeteksi motor.');
    }
    try {
        const vehicleTypesSnapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminDb"].collection('vehicleTypes').get();
        console.log(`[extractMotorInfoTool] Raw snapshot size from 'vehicleTypes': ${vehicleTypesSnapshot.size}`);
        if (vehicleTypesSnapshot.empty) {
            console.log('[extractMotorInfoTool] Collection "vehicleTypes" is empty or does not exist in Firestore.');
            throw new Error('Database tipe kendaraan kosong atau tidak ditemukan.');
        }
        const mappedVehicleTypes = vehicleTypesSnapshot.docs.map((doc)=>{
            const data = doc.data();
            const validationErrorMessages = [];
            if (!data.brand || typeof data.brand !== 'string') {
                validationErrorMessages.push('field "brand" is missing or not a string');
            }
            if (!data.model || typeof data.model !== 'string') {
                validationErrorMessages.push('field "model" is missing or not a string');
            }
            if (!data.size || typeof data.size !== 'string' || ![
                'S',
                'M',
                'L',
                'XL'
            ].includes(data.size)) {
                validationErrorMessages.push('field "size" is missing, not a string, or not S/M/L/XL');
            }
            if (!data.aliases || !Array.isArray(data.aliases)) {
                validationErrorMessages.push('field "aliases" is missing or not an array');
            } else if (!data.aliases.every((a)=>typeof a === 'string')) {
                validationErrorMessages.push('field "aliases" contains non-string elements');
            }
            if (validationErrorMessages.length > 0) {
                console.warn(`[extractMotorInfoTool] Dokumen ${doc.id} di 'vehicleTypes' GAGAL VALIDASI. Alasan: ${validationErrorMessages.join('; ')}. Data mentah: ${JSON.stringify(data)}. Dokumen ini akan dilewati.`);
                return null;
            }
            return {
                id: doc.id,
                brand: data.brand,
                model: data.model,
                size: data.size,
                aliases: data.aliases.map((alias)=>alias.toLowerCase())
            };
        });
        console.log(`[extractMotorInfoTool] Mapped vehicle types (before filtering nulls): ${mappedVehicleTypes.length}`);
        const allVehicleTypes = mappedVehicleTypes.filter((item)=>item !== null);
        console.log(`[extractMotorInfoTool] Total valid vehicle types after filtering: ${allVehicleTypes.length}.`);
        if (allVehicleTypes.length === 0) {
            console.log('[extractMotorInfoTool] No valid vehicle types found after filtering. Check Firestore data format and console warnings above for details on invalid documents.');
            throw new Error('Tidak ada data tipe kendaraan yang valid di database. Periksa format data di Firestore dan log peringatan di konsol.');
        }
        for (const vehicleType of allVehicleTypes){
            // console.log(`[extractMotorInfoTool] Checking vehicle: ${vehicleType.brand} ${vehicleType.model}, Aliases: ${vehicleType.aliases.join(', ')}`);
            for (const alias of vehicleType.aliases){
                if (cleanText.includes(alias)) {
                    console.log(`[extractMotorInfoTool] !!! MATCH FOUND !!! Alias "${alias}" (from vehicle: ${vehicleType.brand} ${vehicleType.model}) found in cleaned text: "${cleanText}"`);
                    return {
                        brand: vehicleType.brand,
                        model: vehicleType.model,
                        size: vehicleType.size
                    };
                }
            }
        }
        console.log('[extractMotorInfoTool] No match found for the input text after checking all vehicle types and aliases.');
        throw new Error('Motor tidak dikenali dari teks yang diberikan. Pastikan alias di database mencakup variasi nama motor tersebut.');
    } catch (error) {
        console.error('[extractMotorInfoTool] Error during execution:', error);
        if (error instanceof Error) {
            throw new Error(`Kesalahan pada tool extractMotorInfo: ${error.message}`);
        }
        throw new Error(`Terjadi kesalahan internal pada tool extractMotorInfo: ${String(error)}`);
    }
});
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    extractMotorInfoTool
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(extractMotorInfoTool, "7fe3be2ed12444a5af48a4ad123e0e944e66ae77c2", null);
}}),
"[project]/src/ai/tools/searchServiceByKeywordTool.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7f46db7d58c00fa22ee36740e6dc38ca4ee79067c2":"searchServiceByKeywordTool"},"",""] */ __turbopack_context__.s({
    "searchServiceByKeywordTool": (()=>searchServiceByKeywordTool)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
/**
 * @fileOverview Genkit tool for searching services by keyword and optional size.
 * - searchServiceByKeywordTool - The Genkit tool definition.
 * - SearchServiceInput - Input schema for the tool.
 * - SearchServiceOutput - Output schema for the tool.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/index.mjs [app-rsc] (ecmascript) <module evaluation>"); // Genkit's Zod
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase-admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const SearchServiceInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    keyword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe("Kata kunci untuk mencari layanan, mis. 'cuci', 'coating', 'nmax'."),
    size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].enum([
        'S',
        'M',
        'L',
        'XL'
    ]).optional().describe("Ukuran motor (S, M, L, XL) jika spesifik.")
});
const SearchServiceOutputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe("Nama layanan yang ditemukan."),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("Deskripsi layanan."),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].number().optional().describe("Harga layanan untuk ukuran yang cocok (jika ada)."),
    size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].enum([
        'S',
        'M',
        'L',
        'XL'
    ]).optional().describe("Ukuran motor yang dicari (jika relevan dengan varian)."),
    duration: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("Estimasi durasi pengerjaan layanan."),
    variantMatched: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("Nama varian yang cocok (jika ada dan relevan).")
});
const searchServiceByKeywordTool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineTool({
    name: 'searchServiceByKeywordTool',
    description: 'Cari layanan berdasarkan keyword dari pelanggan dan ukuran motor (opsional). Berguna untuk menemukan layanan yang relevan beserta harganya.',
    inputSchema: SearchServiceInputSchema,
    outputSchema: SearchServiceOutputSchema
}, async (input)=>{
    const { keyword, size } = input;
    console.log(`[searchServiceByKeywordTool] Searching for keyword: "${keyword}", size: "${size || 'any'}"`);
    const snapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminDb"].collection('services').get();
    const servicesFromDb = snapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
        }));
    if (servicesFromDb.length === 0) {
        console.warn('[searchServiceByKeywordTool] No services found in the database.');
        throw new Error('Tidak ada layanan yang terdaftar di database.');
    }
    const keywordLower = keyword.toLowerCase();
    let bestMatch = undefined;
    let highestScore = -1;
    for (const svc of servicesFromDb){
        let currentScore = 0;
        const nameLower = svc.name.toLowerCase();
        if (nameLower.includes(keywordLower)) {
            currentScore += 10;
            if (nameLower === keywordLower) currentScore += 15; // Stronger match for exact name
        }
        if (svc.description?.toLowerCase().includes(keywordLower)) {
            currentScore += 3;
        }
        if (svc.category?.toLowerCase().includes(keywordLower)) {
            currentScore += 2;
        }
        // Consider aliases from ServiceProduct if it exists and is an array of strings
        if (svc.aliases && Array.isArray(svc.aliases)) {
            if (svc.aliases.some((alias)=>alias.toLowerCase().includes(keywordLower))) {
                currentScore += 8;
                if (svc.aliases.some((alias)=>alias.toLowerCase() === keywordLower)) currentScore += 7; // Exact alias match
            }
        }
        // Consider variant names in scoring too
        if (svc.variants && svc.variants.length > 0) {
            svc.variants.forEach((variant)=>{
                if (variant.name.toLowerCase().includes(keywordLower)) {
                    currentScore += 5; // Add score if keyword matches a variant name
                }
            });
        }
        if (currentScore > highestScore) {
            highestScore = currentScore;
            bestMatch = svc;
        }
    }
    if (!bestMatch || highestScore === 0) {
        console.log(`[searchServiceByKeywordTool] No service found matching keyword: "${keyword}"`);
        // Returning a structured error or a specific "not found" object might be better for the AI
        // For now, throwing error as in original user code.
        throw new Error(`Layanan tidak ditemukan untuk kata kunci "${keyword}".`);
    }
    console.log(`[searchServiceByKeywordTool] Best match found: ${bestMatch.name} with score ${highestScore}`);
    let finalPrice = undefined;
    let matchedVariantName = undefined;
    let finalDuration = bestMatch.estimatedDuration || undefined;
    if (bestMatch.variants && bestMatch.variants.length > 0) {
        let variantToUse;
        if (size) {
            // Attempt to find a variant that explicitly mentions the size
            variantToUse = bestMatch.variants.find((variant)=>variant.name.toLowerCase().includes(size.toLowerCase()));
            if (variantToUse) {
                console.log(`[searchServiceByKeywordTool] Matched variant by size "${size}": ${variantToUse.name}`);
            } else {
                console.log(`[searchServiceByKeywordTool] No variant specifically matched size "${size}", considering first variant or base price.`);
            }
        }
        // If size-specific variant not found, or no size provided, use the first variant.
        // Or, if base price is relevant and variants are add-ons, this logic might need adjustment.
        // For now, if a size-specific variant is found, use it. Otherwise, if variants exist, pick first.
        if (variantToUse) {
            finalPrice = variantToUse.price;
            matchedVariantName = variantToUse.name;
            finalDuration = variantToUse.estimatedDuration || finalDuration;
        } else if (bestMatch.variants.length > 0) {
            // Fallback to first variant if no size match or no size provided, but variants exist.
            // This mirrors user's original logic of `bestMatch.variants?.[0]` somewhat.
            // finalPrice = bestMatch.variants[0].price;
            // matchedVariantName = bestMatch.variants[0].name;
            // finalDuration = bestMatch.variants[0].estimatedDuration || finalDuration;
            // console.log(`[searchServiceByKeywordTool] No size specific match, or no size provided. Using first variant: ${matchedVariantName}`);
            // Let's default to base price if no specific variant matched, and only use first variant if base price is 0/undefined
            if (bestMatch.price && bestMatch.price > 0) {
                finalPrice = bestMatch.price;
            } else {
                finalPrice = bestMatch.variants[0].price;
                matchedVariantName = bestMatch.variants[0].name;
                finalDuration = bestMatch.variants[0].estimatedDuration || finalDuration;
                console.log(`[searchServiceByKeywordTool] Base price is 0 or undefined. Using first variant: ${matchedVariantName}`);
            }
        } else {
            finalPrice = bestMatch.price;
        }
    } else {
        // No variants for the service
        finalPrice = bestMatch.price;
    }
    console.log(`[searchServiceByKeywordTool] Final price for "${bestMatch.name}" (Size: ${size || 'any'}, Variant: ${matchedVariantName || 'N/A'}): ${finalPrice}`);
    if (finalPrice === undefined) {
        console.warn(`[searchServiceByKeywordTool] Could not determine a price for "${bestMatch.name}" with keyword "${keyword}" and size "${size}".`);
    }
    return {
        name: bestMatch.name,
        description: bestMatch.description || undefined,
        price: finalPrice,
        size: size,
        duration: finalDuration,
        variantMatched: matchedVariantName
    };
});
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    searchServiceByKeywordTool
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchServiceByKeywordTool, "7f46db7d58c00fa22ee36740e6dc38ca4ee79067c2", null);
}}),
"[project]/src/types/ai/cs-whatsapp-reply.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ChatMessageSchema": (()=>ChatMessageSchema),
    "WhatsAppReplyInputSchema": (()=>WhatsAppReplyInputSchema),
    "WhatsAppReplyOutputSchema": (()=>WhatsAppReplyOutputSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/common.js [app-rsc] (ecmascript)");
;
const ChatMessageSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].enum([
        'user',
        'model'
    ]),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string()
});
const WhatsAppReplyInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    customerMessage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe('Pesan yang diterima dari pelanggan melalui WhatsApp, atau pertanyaan dari staf CS.'),
    senderNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe('Nomor WhatsApp pengirim pesan (pelanggan).'),
    chatHistory: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].array(ChatMessageSchema).optional().describe('Riwayat percakapan sebelumnya antara pelanggan dan AI/staf CS.'),
    agentBehavior: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe('Perilaku agen AI yang diinginkan, mis. "Ramah & Membantu".'),
    knowledgeBase: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe('Panduan tingkat tinggi untuk AI. Detail pengetahuan spesifik akan diambil melalui tools.'),
    currentDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe('Tanggal saat ini dalam format YYYY-MM-DD. Berguna untuk konteks booking.'),
    currentTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe('Waktu saat ini dalam format HH:MM (24 jam). Berguna untuk konteks booking.'),
    tomorrowDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe('Tanggal besok dalam format YYYY-MM-DD. Berguna untuk konteks booking.'),
    dayAfterTomorrowDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe('Tanggal lusa (besoknya besok) dalam format YYYY-MM-DD. Berguna untuk konteks booking.')
});
const WhatsAppReplyOutputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    suggestedReply: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.')
});
}}),
"[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"4053660f6447b38038e1d20965a3df3cd57a2a7b51":"generateWhatsAppReply","7fd8afbeff99eab53697d6b0516bcfa4f9d9184f1f":"whatsAppReplyFlowSimplified"},"",""] */ __turbopack_context__.s({
    "generateWhatsAppReply": (()=>generateWhatsAppReply),
    "whatsAppReplyFlowSimplified": (()=>whatsAppReplyFlowSimplified)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
/**
 * @fileOverview AI flow for WhatsApp customer service replies.
 * - whatsAppReplyFlowSimplified - Main flow for generating WhatsApp replies.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$extractMotorInfoTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/tools/extractMotorInfoTool.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$searchServiceByKeywordTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/tools/searchServiceByKeywordTool.ts [app-rsc] (ecmascript)"); // Tool baru untuk cari layanan
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$ai$2f$cs$2d$whatsapp$2d$reply$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/ai/cs-whatsapp-reply.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
// Prompt Zoya yang diperbarui
const promptZoya = `
Anda adalah Zoya, Customer Service AI dari QLAB Moto Detailing.

Gaya bahasa:
- Santai dan akrab, pakai sapaan seperti "bro", "kak", "mas".
- Tetap informatif dan jelas.

Tool yang tersedia:
1.  \`extractMotorInfoTool\`: Untuk mendeteksi merek, model, dan ukuran motor dari teks. Input: {"text": "deskripsi motor"}. Output: {"brand": "...", "model": "...", "size": "S/M/L/XL"}
2.  \`searchServiceByKeywordTool\`: Untuk mencari detail layanan/produk berdasarkan kata kunci dan (opsional) ukuran motor. Input: {"keyword": "nama layanan/produk", "size": "S/M/L/XL"}. Output: {"name": "...", "description": "...", "price": ..., "duration": "...", "variantMatched": "..."}

Tugas kamu:
1.  Pahami permintaan pelanggan. Identifikasi apakah mereka bertanya tentang layanan/produk, ingin booking, atau hal lain.

2.  **Jika pelanggan bertanya tentang layanan/produk SPESIFIK (misalnya "coating", "cuci motor", "harga nmax coating", "info detailing"):**
    a.  **Deteksi Motor Dulu (Jika Ada):** Jika pelanggan menyebutkan jenis motor (misalnya "NMAX", "Vario", "Beat"), gunakan \`extractMotorInfoTool\` untuk mendapatkan \`brand\`, \`model\`, dan \`size\` motornya.
        Contoh: Jika pelanggan bilang "coating NMAX berapa?", panggil \`extractMotorInfoTool\` dengan input \`{"text": "NMAX"}\`.
    b.  **Cari Layanan/Produk:**
        *   Gunakan \`searchServiceByKeywordTool\`. \`keyword\`-nya adalah nama layanan/produk yang ditanyakan (mis. "coating", "cuci motor", "detailing").
        *   Jika kamu berhasil mendapatkan \`size\` motor dari langkah 2a, sertakan \`size\` tersebut saat memanggil \`searchServiceByKeywordTool\`.
        *   Jika pelanggan TIDAK menyebutkan motor, panggil \`searchServiceByKeywordTool\` HANYA dengan \`keyword\` (tanpa \`size\`).
    c.  **Formulasikan Jawaban:**
        *   **Jika motor TIDAK disebutkan di awal (dan kamu memanggil tool pencarian layanan TANPA size):**
            *   Jika tool pencarian layanan (\`searchServiceByKeywordTool\`) mengembalikan hasil, gunakan \`description\` dari output tool tersebut untuk menjelaskan layanan/produk.
            *   Setelah menjelaskan, TANYAKAN jenis motor pelanggan agar bisa memberikan harga akurat. Contoh: "Coating itu (ambil dari deskripsi tool). Nah, buat motor apa nih bro? Biar Zoya bisa kasih info harga yang pas. Motornya doff atau glossy juga boleh diinfoin sekalian."
            *   Jika tool pencarian layanan TIDAK menemukan info, jawab dengan sopan bahwa kamu belum nemu info detailnya dan tanya motornya apa.
        *   **Jika motor SUDAH disebutkan (dan kamu memanggil tool pencarian layanan DENGAN size):**
            *   Jika tool pencarian layanan (\`searchServiceByKeywordTool\`) mengembalikan hasil, sebutkan \`name\` (nama layanan/produk dari tool, mungkin dengan varian jika ada), \`price\` (harga dari tool), dan jika ada \`duration\` (estimasi durasi dari tool).
            *   Contoh: "Oke bro, untuk NMAX (model dari extractMotorInfo) itu coatingnya pakai (nama layanan dari searchService) harganya Rp XXX (harga dari searchService), pengerjaannya sekitar YYY (durasi dari searchService). Minat sekalian booking?"
            *   Jika tool pencarian layanan TIDAK menemukan info harga/layanan yang cocok dengan ukuran motor tersebut, informasikan bahwa harga spesifik untuk ukuran itu belum ketemu, tapi bisa kasih gambaran umum layanannya (ambil dari deskripsi jika ada).
        *   **PENTING:** Jika \`searchServiceByKeywordTool\` mengembalikan \`price\` undefined atau 0 (dan bukan memang gratis), JANGAN sebutkan harganya. Lebih baik katakan, "Untuk harga pastinya tergantung ukuran dan jenis motornya nih, bro. Motornya apa ya?" atau "Zoya belum nemu harga pastinya untuk itu, motornya apa bro?". JANGAN mengarang harga.

3.  **Jika pelanggan bertanya tentang layanan secara umum tanpa detail motor (misal "coating apa aja?", "kalau detailing gimana?"):**
    Prioritaskan untuk menjelaskan layanan tersebut dulu menggunakan deskripsi dari \`searchServiceByKeywordTool\` (panggil dengan keyword layanan saja, tanpa size). Setelah itu, baru tanyakan motornya untuk info harga.

4.  **Jika pelanggan mau booking (setelah dapat info harga atau langsung minta booking):**
    Kumpulkan data berikut: Nama, No HP, Tanggal, Jam, Jenis Motor (jika sudah diketahui dari tool \`extractMotorInfoTool\` atau dari konfirmasi pelanggan).
    Sampaikan bahwa staf kami akan menghubungi untuk konfirmasi final booking.

5.  **Umum:**
    *   Jika tidak yakin atau permintaan di luar kemampuanmu, arahkan pelanggan ke CS manusia.
    *   Selalu gunakan sapaan akrab.

Format output HARUS berupa JSON:
{ "suggestedReply": "Teks balasan disini" }

Contoh interaksi (pelanggan tanya layanan tanpa motor):
Pelanggan: "Coating berapaan ya?"
AI (setelah panggil searchServiceByKeywordTool dengan keyword "coating"):
{ "suggestedReply": "Coating itu bikin motor kinclong plus terlindungi bro, dari debu, air, sama goresan halus. Prosesnya meliputi pembersihan detail, koreksi cat kalau perlu, terus aplikasi lapisan coatingnya. Nah, buat motor apa nih? Beda ukuran motor, beda juga harganya soalnya." }

Chat customer terbaru:
user: {{{customerMessage}}}

Riwayat sebelumnya:
{{#if chatHistory.length}}
{{#each chatHistory}}
{{this.role}}: {{this.content}}
{{/each}}
{{/if}}

Tanggal hari ini: {{{currentDate}}}, waktu: {{{currentTime}}}
Besok: {{{tomorrowDate}}}, Lusa: {{{dayAfterTomorrowDate}}}
`;
/**
 * Define prompt untuk Zoya dengan tool yang diperlukan
 */ const replyPromptSimplified = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].definePrompt({
    name: 'whatsAppReplyPromptSimplified',
    input: {
        schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$ai$2f$cs$2d$whatsapp$2d$reply$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WhatsAppReplyInputSchema"]
    },
    output: {
        schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$ai$2f$cs$2d$whatsapp$2d$reply$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WhatsAppReplyOutputSchema"]
    },
    tools: [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$extractMotorInfoTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractMotorInfoTool"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$searchServiceByKeywordTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchServiceByKeywordTool"]
    ],
    prompt: promptZoya
});
const whatsAppReplyFlowSimplified = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineFlow({
    name: 'whatsAppReplyFlowSimplified',
    inputSchema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$ai$2f$cs$2d$whatsapp$2d$reply$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WhatsAppReplyInputSchema"],
    outputSchema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$ai$2f$cs$2d$whatsapp$2d$reply$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WhatsAppReplyOutputSchema"]
}, async (input)=>{
    console.log("[CS-FLOW] whatsAppReplyFlowSimplified input:", JSON.stringify(input, null, 2));
    try {
        const { output } = await replyPromptSimplified(input);
        if (!output || !output.suggestedReply) {
            console.error('[CS-FLOW] ❌ Gagal mendapatkan balasan dari AI atau output tidak sesuai skema (output atau suggestedReply null/undefined). Mengembalikan default.');
            return {
                suggestedReply: "Maaf, Zoya lagi bingung nih. Bisa diulang pertanyaannya atau coba beberapa saat lagi?"
            };
        }
        // Output should already be validated by definePrompt's outputSchema based on Zod.
        console.log("[CS-FLOW] whatsAppReplyFlowSimplified output dari prompt:", output);
        return output;
    } catch (e) {
        console.error('[CS-FLOW] ❌ Error saat menjalankan prompt AI atau memproses outputnya:', e);
        const errorMessage = e instanceof Error ? e.message : String(e);
        return {
            suggestedReply: `Duh, Zoya lagi pusing tujuh keliling (${errorMessage.substring(0, 50)}...). Tanya lagi nanti ya, bro!`
        };
    }
});
async function generateWhatsAppReply(input) {
    const flowInput = {
        customerMessage: input.customerMessage,
        senderNumber: input.senderNumber,
        chatHistory: input.chatHistory || [],
        currentDate: input.currentDate,
        currentTime: input.currentTime,
        tomorrowDate: input.tomorrowDate,
        dayAfterTomorrowDate: input.dayAfterTomorrowDate
    };
    return whatsAppReplyFlowSimplified(flowInput);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    whatsAppReplyFlowSimplified,
    generateWhatsAppReply
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(whatsAppReplyFlowSimplified, "7fd8afbeff99eab53697d6b0516bcfa4f9d9184f1f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateWhatsAppReply, "4053660f6447b38038e1d20965a3df3cd57a2a7b51", null);
}}),
"[project]/.next-internal/server/app/(app)/ai-cs-assistant/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$cs$2d$whatsapp$2d$reply$2d$flow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)");
;
}}),
"[project]/.next-internal/server/app/(app)/ai-cs-assistant/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$cs$2d$whatsapp$2d$reply$2d$flow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$ai$2d$cs$2d$assistant$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$ai$2f$flows$2f$cs$2d$whatsapp$2d$reply$2d$flow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(app)/ai-cs-assistant/page/actions.js { ACTIONS_MODULE0 => "[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/(app)/ai-cs-assistant/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "4053660f6447b38038e1d20965a3df3cd57a2a7b51": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$cs$2d$whatsapp$2d$reply$2d$flow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateWhatsAppReply"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$cs$2d$whatsapp$2d$reply$2d$flow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$ai$2d$cs$2d$assistant$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$ai$2f$flows$2f$cs$2d$whatsapp$2d$reply$2d$flow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(app)/ai-cs-assistant/page/actions.js { ACTIONS_MODULE0 => "[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/(app)/ai-cs-assistant/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "4053660f6447b38038e1d20965a3df3cd57a2a7b51": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$ai$2d$cs$2d$assistant$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$ai$2f$flows$2f$cs$2d$whatsapp$2d$reply$2d$flow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["4053660f6447b38038e1d20965a3df3cd57a2a7b51"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$ai$2d$cs$2d$assistant$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$ai$2f$flows$2f$cs$2d$whatsapp$2d$reply$2d$flow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(app)/ai-cs-assistant/page/actions.js { ACTIONS_MODULE0 => "[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$ai$2d$cs$2d$assistant$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$ai$2f$flows$2f$cs$2d$whatsapp$2d$reply$2d$flow$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(app)/ai-cs-assistant/page/actions.js { ACTIONS_MODULE0 => "[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/(app)/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(app)/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/(app)/ai-cs-assistant/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(app)/ai-cs-assistant/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/(app)/ai-cs-assistant/page.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(app)/ai-cs-assistant/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(app)/ai-cs-assistant/page.tsx <module evaluation>", "default");
}}),
"[project]/src/app/(app)/ai-cs-assistant/page.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(app)/ai-cs-assistant/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(app)/ai-cs-assistant/page.tsx", "default");
}}),
"[project]/src/app/(app)/ai-cs-assistant/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$ai$2d$cs$2d$assistant$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/ai-cs-assistant/page.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$ai$2d$cs$2d$assistant$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/app/(app)/ai-cs-assistant/page.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$ai$2d$cs$2d$assistant$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/(app)/ai-cs-assistant/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(app)/ai-cs-assistant/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__68d71217._.js.map