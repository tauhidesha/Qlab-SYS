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
if (!process.env.GOOGLE_API_KEY) {
    const errorMessage = "Kesalahan Konfigurasi: GOOGLE_API_KEY tidak ditemukan di environment variables. Ini dibutuhkan oleh plugin Google AI. Pastikan sudah di-set di file .env Anda.";
    console.error(`\n\n🛑 ${errorMessage}\n\n`);
    throw new Error(errorMessage);
}
const ai = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$genkit$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["genkit"])({
    plugins: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$genkit$2d$ai$2f$googleai$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["googleAI"])()
    ],
    model: 'googleai/gemini-1.5-flash-latest'
});
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-rsc] (ecmascript)"); // Use client-side SDK
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <module evaluation>"); // Use client-side SDK functions
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
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
    // Firebase client 'db' is imported. It's assumed to be initialized.
    // Error handling for db initialization is in '@/lib/firebase.ts'.
    // If db itself is null/undefined, getDocs will throw.
    const cleanText = input.text.toLowerCase().trim();
    console.log(`[extractMotorInfoTool] Input text: "${input.text}", Cleaned text: "${cleanText}"`);
    if (!cleanText) {
        console.log('[extractMotorInfoTool] Input text is empty. Throwing error.');
        throw new Error('Teks input kosong, tidak bisa mendeteksi motor.');
    }
    try {
        const vehicleTypesCollectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'vehicleTypes');
        const vehicleTypesSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(vehicleTypesCollectionRef);
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
 * @fileOverview Genkit tool for searching services by keyword and optional size/paint type.
 * - searchServiceByKeywordTool - The Genkit tool definition.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-rsc] (ecmascript)"); // Use client-side SDK
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <module evaluation>"); // Use client-side SDK functions
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
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
    ]).optional().describe("Ukuran motor (S, M, L, XL) jika spesifik."),
    paintType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].enum([
        'doff',
        'glossy'
    ]).optional().describe("Jenis cat motor (doff atau glossy) jika relevan, terutama untuk coating.")
});
const SearchServiceOutputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe("Nama layanan yang ditemukan."),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("Deskripsi layanan."),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].number().optional().describe("Harga layanan untuk ukuran/jenis cat yang cocok (jika ada)."),
    size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].enum([
        'S',
        'M',
        'L',
        'XL'
    ]).optional().describe("Ukuran motor yang dicari (jika relevan dengan varian)."),
    duration: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("Estimasi durasi pengerjaan layanan."),
    variantMatched: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("Nama varian yang cocok (jika ada dan relevan, mis. 'Doff', 'Glossy', 'Ukuran M - Doff').")
});
const searchServiceByKeywordTool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineTool({
    name: 'searchServiceByKeywordTool',
    description: 'Cari layanan berdasarkan keyword dari pelanggan dan (opsional) ukuran motor serta jenis cat. Berguna untuk menemukan layanan yang relevan beserta harganya.',
    inputSchema: SearchServiceInputSchema,
    outputSchema: SearchServiceOutputSchema
}, async (input)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"]) {
        throw new Error("[searchServiceByKeywordTool.ts] FATAL: Client Firestore 'db' is not available at module load time. Firebase Client init failed or import order issue.");
    }
    const { keyword, size, paintType } = input;
    console.log(`[searchServiceByKeywordTool] Searching for keyword: "${keyword}", size: "${size || 'any'}", paintType: "${paintType || 'any'}"`);
    const servicesCollectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'services');
    const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(servicesCollectionRef));
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
            if (nameLower === keywordLower) currentScore += 15;
        }
        if (svc.description?.toLowerCase().includes(keywordLower)) {
            currentScore += 3;
        }
        if (svc.category?.toLowerCase().includes(keywordLower)) {
            currentScore += 2;
        }
        if (svc.aliases && Array.isArray(svc.aliases)) {
            if (svc.aliases.some((alias)=>alias.toLowerCase().includes(keywordLower))) {
                currentScore += 8;
                if (svc.aliases.some((alias)=>alias.toLowerCase() === keywordLower)) currentScore += 7;
            }
        }
        if (svc.variants && svc.variants.length > 0) {
            svc.variants.forEach((variant)=>{
                if (variant.name.toLowerCase().includes(keywordLower)) {
                    currentScore += 5;
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
        throw new Error(`Layanan tidak ditemukan untuk kata kunci "${keyword}".`);
    }
    console.log(`[searchServiceByKeywordTool] Best match found for keyword "${keyword}": ${bestMatch.name} with score ${highestScore}`);
    let finalPrice = undefined;
    let matchedVariantName = undefined;
    let finalDuration = bestMatch.estimatedDuration || undefined;
    let finalDescription = bestMatch.description || undefined;
    if (bestMatch.variants && bestMatch.variants.length > 0) {
        let suitableVariants = bestMatch.variants;
        if (size) {
            const sizeLower = size.toLowerCase();
            const sizeRegex = new RegExp(`(?:\\bsize\\s+${sizeLower}\\b|\\b${sizeLower}\\b)`, 'i');
            suitableVariants = suitableVariants.filter((v)=>sizeRegex.test(v.name));
            console.log(`[searchServiceByKeywordTool] After size filter ("${size}"): ${suitableVariants.length} variants remaining for ${bestMatch.name}. Candidates: ${suitableVariants.map((v)=>v.name).join(', ')}`);
        }
        if (paintType) {
            const bestMatchNameLower = bestMatch.name.toLowerCase();
            const paintTypeLower = paintType.toLowerCase();
            // Only filter variants by paintType if bestMatch.name itself doesn't already clearly specify this paintType
            if (!bestMatchNameLower.includes(paintTypeLower)) {
                suitableVariants = suitableVariants.filter((v)=>v.name.toLowerCase().includes(paintTypeLower));
                console.log(`[searchServiceByKeywordTool] After paintType filter ("${paintType}") for variants of "${bestMatch.name}": ${suitableVariants.length} variants remaining. Candidates: ${suitableVariants.map((v)=>v.name).join(', ')}`);
            } else {
                console.log(`[searchServiceByKeywordTool] Skipping paintType filter on variants for "${bestMatch.name}" because base name already contains "${paintType}".`);
            }
        }
        if (suitableVariants.length > 0) {
            const variantToUse = suitableVariants[0];
            finalPrice = variantToUse.price;
            matchedVariantName = variantToUse.name;
            finalDuration = variantToUse.estimatedDuration || finalDuration;
        } else if (keyword.toLowerCase().includes("coating") && (size || paintType)) {
            console.log(`[searchServiceByKeywordTool] Coating query with size/paintType but no exact variant match for '${bestMatch.name}'. Price will be undefined.`);
        } else if (bestMatch.variants.length > 0 && !size && !paintType) {
            console.log(`[searchServiceByKeywordTool] Variants exist for '${bestMatch.name}', but no size/paintType provided. Price will be undefined.`);
        }
    } else {
        finalPrice = bestMatch.price;
    }
    console.log(`[searchServiceByKeywordTool] Final price for "${bestMatch.name}" (Keyword: ${keyword}, Size: ${size || 'any'}, Paint: ${paintType || 'any'}, MatchedVariant: ${matchedVariantName || 'N/A'}): ${finalPrice === undefined ? 'Not Found/Specific' : finalPrice}`);
    return {
        name: bestMatch.name,
        description: finalDescription,
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
"[project]/src/ai/tools/createBookingTool.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"7f08ac490f3a93e1dcd7fb9173c26cbeea107b790c":"createBookingTool"},"",""] */ __turbopack_context__.s({
    "createBookingTool": (()=>createBookingTool)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
/**
 * @fileOverview Genkit tool for creating a booking entry.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/genkit/lib/common.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isSameDay.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parse$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parse.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/setHours.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setMinutes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/setMinutes.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
const CreateBookingInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    customerName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe("Nama lengkap pelanggan."),
    customerPhone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("Nomor HP pelanggan (opsional)."),
    clientId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("ID Klien jika pelanggan terdaftar (opsional)."),
    serviceId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe("ID dari layanan/produk yang dibooking."),
    serviceName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe("Nama layanan/produk yang dibooking (bisa termasuk varian)."),
    vehicleInfo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe("Informasi kendaraan pelanggan (mis. 'NMAX Merah', 'Vario 125 Hitam AB 1234 CD')."),
    bookingDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Tanggal booking dalam format YYYY-MM-DD."),
    bookingTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().regex(/^\d{2}:\d{2}$/).describe("Waktu booking dalam format HH:MM (24 jam)."),
    estimatedDuration: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("Estimasi durasi layanan (mis. '30 mnt', '1 jam')."),
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("Catatan tambahan untuk booking (opsional).")
});
const CreateBookingOutputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].boolean().describe("Status keberhasilan pembuatan booking."),
    bookingId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("ID booking yang baru dibuat jika sukses."),
    queueItemId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("ID item antrian jika booking untuk hari ini dan berhasil ditambahkan ke antrian."),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe("Pesan hasil operasi (mis. 'Booking berhasil dibuat.')"),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe("Status booking yang dibuat.")
});
const createBookingTool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineTool({
    name: 'createBookingTool',
    description: 'Membuat entri booking baru di sistem. Jika booking untuk hari ini, otomatis tambahkan ke antrian.',
    inputSchema: CreateBookingInputSchema,
    outputSchema: CreateBookingOutputSchema
}, async (input)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"]) {
        throw new Error("[createBookingTool.ts] FATAL: Client Firestore 'db' is not available. Firebase Client init failed.");
    }
    console.log('[createBookingTool] Input received:', input);
    try {
        const { bookingDate, bookingTime, ...restOfInput } = input;
        let parsedBookingDate;
        try {
            parsedBookingDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parse$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parse"])(bookingDate, 'yyyy-MM-dd', new Date());
        } catch (e) {
            console.error('[createBookingTool] Invalid bookingDate format:', bookingDate);
            return {
                success: false,
                message: `Format tanggal booking (${bookingDate}) tidak valid. Gunakan YYYY-MM-DD.`
            };
        }
        const [hourStr, minuteStr] = bookingTime.split(':');
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            console.error('[createBookingTool] Invalid bookingTime format:', bookingTime);
            return {
                success: false,
                message: `Format waktu booking (${bookingTime}) tidak valid. Gunakan HH:MM.`
            };
        }
        const bookingDateTimeWithClientTimezone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setMinutes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setMinutes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setHours"])(parsedBookingDate, hour), minute);
        const bookingTimestamp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Timestamp"].fromDate(bookingDateTimeWithClientTimezone);
        const newBookingData = {
            ...restOfInput,
            bookingDateTime: bookingTimestamp,
            status: 'Confirmed',
            source: 'WhatsApp',
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        };
        const bookingDocRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'bookings'), newBookingData);
        console.log('[createBookingTool] Booking successfully created with ID:', bookingDocRef.id);
        let queueItemId = undefined;
        let message = `Booking untuk ${input.customerName} tanggal ${bookingDate} jam ${bookingTime} untuk layanan "${input.serviceName}" berhasil dicatat.`;
        // Jika booking untuk hari ini, tambahkan ke antrian
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isSameDay"])(bookingDateTimeWithClientTimezone, new Date())) {
            const queueItemData = {
                customerName: input.customerName,
                clientId: input.clientId,
                vehicleInfo: input.vehicleInfo,
                service: input.serviceName,
                serviceId: input.serviceId,
                // variantId: input.variantId, // Assuming variant info is part of serviceName for booking
                status: 'Menunggu',
                estimatedTime: input.estimatedDuration || 'N/A',
                bookingId: bookingDocRef.id,
                createdAt: bookingTimestamp
            };
            const queueDocRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'queueItems'), queueItemData);
            queueItemId = queueDocRef.id;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateDoc"])(bookingDocRef, {
                queueItemId: queueItemId,
                status: 'In Queue'
            });
            message += " Karena booking untuk hari ini, pelanggan juga sudah otomatis ditambahkan ke antrian.";
            console.log('[createBookingTool] Booking for today, added to queue with ID:', queueItemId);
        }
        return {
            success: true,
            bookingId: bookingDocRef.id,
            queueItemId: queueItemId,
            message: message,
            status: queueItemId ? 'In Queue' : 'Confirmed'
        };
    } catch (error) {
        console.error('[createBookingTool] Error creating booking:', error);
        return {
            success: false,
            message: `Gagal membuat booking: ${error.message || 'Terjadi kesalahan tidak diketahui.'}`
        };
    }
});
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createBookingTool
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createBookingTool, "7f08ac490f3a93e1dcd7fb9173c26cbeea107b790c", null);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$searchServiceByKeywordTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/tools/searchServiceByKeywordTool.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$createBookingTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/tools/createBookingTool.ts [app-rsc] (ecmascript)"); // Import tool booking
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$ai$2f$cs$2d$whatsapp$2d$reply$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/ai/cs-whatsapp-reply.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
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
1.  'extractMotorInfoTool': Untuk mendeteksi merek, model, dan ukuran motor dari teks. Input: {"text": "deskripsi motor"}. Output: {"brand": "...", "model": "...", "size": "S/M/L/XL"}
2.  'searchServiceByKeywordTool': Untuk mencari detail layanan/produk. Input: {"keyword": "nama layanan/produk", "size": "S/M/L/XL" (opsional), "paintType": "doff" atau "glossy" (opsional, penting untuk coating)}. Output: {"name": "...", "description": "...", "price": ..., "duration": "...", "variantMatched": "..."}
3.  'createBookingTool': Untuk mencatat booking pelanggan. Input: {"customerName": "...", "customerPhone": "...", "clientId": "...", "serviceId": "...", "serviceName": "...", "vehicleInfo": "...", "bookingDate": "YYYY-MM-DD", "bookingTime": "HH:MM", "estimatedDuration": "...", "notes": "..."}. Output: {"success": true/false, "bookingId": "...", "queueItemId": "...", "message": "...", "status": "..."}

Tugas kamu:
1.  Pahami permintaan pelanggan. Identifikasi apakah mereka bertanya tentang layanan/produk, ingin booking, atau hal lain.

2.  **Jika pelanggan bertanya tentang layanan/produk SPESIFIK (misalnya "coating", "cuci motor", "harga nmax coating", "info detailing"):**
    a.  **Deteksi Motor Dulu (Jika Ada):** Jika pelanggan menyebutkan jenis motor (misalnya "NMAX", "Vario", "Beat"), gunakan 'extractMotorInfoTool' untuk mendapatkan 'brand', 'model', dan 'size' motornya.
        Contoh: Jika pelanggan bilang "coating NMAX berapa?", panggil 'extractMotorInfoTool' dengan input \`{"text": "NMAX"}\`.
    b.  **Logika Khusus untuk "COATING":**
        *   Jika kata kunci pertanyaan mengandung "coating" (atau sinonimnya seperti "laminating", "ceramic coating"):
            *   Jika 'brand', 'model', atau 'size' motor SUDAH diketahui (dari langkah 2a atau pesan pelanggan), TAPI jenis cat ("doff" atau "glossy") BELUM disebutkan oleh pelanggan:
                *   **JANGAN LANGSUNG CARI HARGA.** Balas dengan pertanyaan: "Oke bro, untuk coating motor (sebutkan model motor jika tahu), jenis catnya doff atau glossy ya? Biar harganya pas."
                *   Tunggu jawaban pelanggan berikutnya untuk jenis cat.
            *   Jika 'brand', 'model', atau 'size' motor SUDAH diketahui DAN jenis cat ("doff" atau "glossy") JUGA SUDAH disebutkan:
                *   Panggil 'searchServiceByKeywordTool' dengan 'keyword: "coating"', 'size' yang relevan, DAN 'paintType' ("doff" atau "glossy").
                *   Lanjutkan ke langkah 2.d untuk memformulasikan jawaban berdasarkan output tool.
            *   Jika kata kunci "coating" disebut tapi motor BELUM disebutkan:
                *   Panggil 'searchServiceByKeywordTool' HANYA dengan 'keyword: "coating"' (tanpa size, tanpa paintType).
                *   Gunakan 'description' dari output tool untuk menjelaskan layanan coating secara umum.
                *   Kemudian, tanyakan motornya DAN jenis catnya sekaligus. Contoh: "Coating itu (ambil dari deskripsi tool). Nah, buat motor apa nih bro? Sama jenis catnya doff atau glossy sekalian ya, biar Zoya bisa kasih info harga yang pas."
    c.  **Untuk Layanan/Produk LAIN SELAIN COATING (atau jika info coating sudah lengkap dan tool 'searchServiceByKeywordTool' akan dipanggil):**
        *   Gunakan 'searchServiceByKeywordTool'. 'keyword'-nya adalah nama layanan/produk yang ditanyakan (mis. "cuci motor", "detailing").
        *   Jika kamu berhasil mendapatkan 'size' motor dari langkah 2a (atau dari info sebelumnya), sertakan 'size' tersebut saat memanggil 'searchServiceByKeywordTool'.
        *   Jika pelanggan TIDAK menyebutkan motor, panggil 'searchServiceByKeywordTool' HANYA dengan 'keyword' (tanpa 'size').
        *   Lanjutkan ke langkah 2.d untuk memformulasikan jawaban.
    d.  **Formulasikan Jawaban (setelah memanggil 'searchServiceByKeywordTool'):**
        *   **Kasus 1: Tool dipanggil TANPA size (karena motor belum diketahui).**
            *   Jika tool mengembalikan hasil (ada 'name', 'description'), jelaskan layanannya (gunakan 'description' dari output tool). Lalu, TANYAKAN jenis motor pelanggan. Contoh: "Detailing itu (deskripsi dari tool). Nah, buat motor apa nih bro? Biar Zoya bisa kasih info harga yang pas."
            *   Jika tool TIDAK menemukan info layanan sama sekali, jawab sopan bahwa kamu belum nemu info detailnya dan tetap tanyakan motornya apa.
        *   **Kasus 2: Tool dipanggil DENGAN size (motor sudah diketahui, DAN jika COATING, jenis cat juga SUDAH diketahui).**
            *   **Periksa output dari 'searchServiceByKeywordTool' dengan SANGAT SEKSAMA:**
                *   **JIKA ADA field 'price' di output tool DAN 'price' LEBIH DARI 0:** Sebutkan 'name' (dari tool, mungkin dengan 'variantMatched' jika ada), 'price' (dari tool), dan 'duration' (estimasi durasi dari tool, jika ada).
                    Contoh: "Oke bro, untuk NMAX Doff coatingnya Rp XXX (harga dari searchService), pengerjaannya sekitar YYY (durasi dari searchService). Minat sekalian booking?" (Gunakan nama motor dan varian yang sesuai).
                *   **JIKA TIDAK ADA field 'price' di output tool (artinya 'price' adalah undefined), ATAU 'price' adalah 0 (dan kamu TIDAK punya info eksplisit bahwa layanan/produk tersebut memang gratis):**
                    *   **SANGAT PENTING: JANGAN bilang "sebentar aku cek", "aku lagi cari", atau variasi serupa yang mengindikasikan kamu masih mencari harga.** Kamu sudah selesai mencari.
                    *   **LANGSUNG informasikan bahwa harga spesifik untuk kombinasi motor dan layanan itu belum ketemu.**
                    *   Jika ada 'description' dan 'name' dari tool, kamu bisa sampaikan deskripsinya dulu. Contoh: "Untuk (nama layanan dari tool, mis. Coating NMAX Doff), deskripsinya (deskripsi dari tool). Nah, untuk harga pastinya Zoya belum ada info nih bro."
                    *   Kemudian, kamu bisa tawarkan bantuan lain atau arahkan. Contoh: "Mungkin bisa coba pastiin lagi tipe NMAX-nya atau jenis coating doff yang lebih detail? Atau mau Zoya bantu tanyain ke CS langsung di [nomor CS WA CS Manusia jika ada]?"
                    *   **JANGAN mengarang harga atau memberi placeholder harga seperti '[harga]'.**

3.  **Jika pelanggan mau booking (setelah dapat info harga atau langsung minta booking):**
    a.  **Periksa Info yang Sudah Ada**: Cek apakah kamu sudah tahu dari percakapan atau tool sebelumnya:
        *   Nama Pelanggan? (Bisa dari 'senderName' jika terhubung ke WhatsApp atau dari chat)
        *   No HP Pelanggan? (Bisa dari 'senderNumber' jika terhubung ke WhatsApp atau dari chat)
        *   Layanan yang diinginkan? (Harus ada 'serviceId' dan 'serviceName' dari hasil 'searchServiceByKeywordTool' sebelumnya)
        *   Jenis Motor? (Dari 'extractMotorInfoTool' atau konfirmasi pelanggan)
        *   Tanggal Booking? (Format YYYY-MM-DD)
        *   Jam Booking? (Format HH:MM)
    b.  **Jika Banyak Info Kurang**: Balas dengan: 'Oke bro, untuk bookingnya, Zoya butuh info ini ya:\\nNama :\\nNo HP :\\nLayanan yang di inginkan :\\nTanggal :\\nJam kedatangan :\\nJenis Motor :'
    c.  **Jika Hanya Beberapa Info Kurang**: Tanyakan yang kurang saja secara spesifik. Contoh: 'Siap bro! Untuk layanan [Layanan yang sudah diketahui], mau booking tanggal dan jam berapa? Nama dan No HPnya juga ya kalau belum ada.'
    d.  **Jika Semua Info Sudah Lengkap**: Panggil tool 'createBookingTool' dengan semua data yang telah terkumpul.
        *   'serviceId' dan 'serviceName' ambil dari hasil pencarian layanan sebelumnya.
        *   'vehicleInfo' gabungkan informasi motor (mis. "NMAX Merah Doff").
        *   'customerPhone' dan 'clientId' itu opsional untuk tool, tapi bagus kalau ada dan bisa diisi dari 'senderNumber' atau info klien yang sudah ada.
        *   'estimatedDuration' bisa diambil dari hasil pencarian layanan jika ada.
    e.  **Sampaikan Hasil**: Berdasarkan output dari 'createBookingTool':
        *   Jika 'success: true', sampaikan pesan sukses dari tool. Contoh: 'Sip bro! Booking kamu udah dicatet. Ini detailnya: [message dari tool].'
        *   Jika 'success: false', sampaikan pesan error dari tool. Contoh: 'Waduh, maaf bro, ada kendala nih: [message dari tool]. Coba lagi atau hubungi CS ya.'

4.  **Umum:**
    *   Jika tidak yakin atau permintaan di luar kemampuanmu, arahkan pelanggan ke CS manusia.
    *   Selalu gunakan sapaan akrab.

Format output HARUS berupa JSON:
{ "suggestedReply": "Teks balasan disini" }

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
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$searchServiceByKeywordTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchServiceByKeywordTool"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$createBookingTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBookingTool"]
    ],
    prompt: promptZoya
});
const whatsAppReplyFlowSimplified = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineFlow({
    name: 'whatsAppReplyFlowSimplified',
    inputSchema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$ai$2f$cs$2d$whatsapp$2d$reply$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WhatsAppReplyInputSchema"],
    outputSchema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$ai$2f$cs$2d$whatsapp$2d$reply$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WhatsAppReplyOutputSchema"]
}, async (input)=>{
    try {
        console.log("[CS-FLOW] whatsAppReplyFlowSimplified input:", JSON.stringify(input, null, 2));
        try {
            const { output } = await replyPromptSimplified(input);
            if (!output || !output.suggestedReply) {
                console.error('[CS-FLOW] ❌ Gagal mendapatkan balasan dari AI atau output tidak sesuai skema (output atau suggestedReply null/undefined). Mengembalikan default.');
                return {
                    suggestedReply: "Maaf, Zoya lagi bingung nih. Bisa diulang pertanyaannya atau coba beberapa saat lagi?"
                };
            }
            console.log("[CS-FLOW] whatsAppReplyFlowSimplified output dari prompt:", output);
            return output;
        } catch (aiError) {
            console.error('[CS-FLOW] ❌ Error saat menjalankan prompt AI atau memproses outputnya:', aiError);
            let finalErrorMessage = "Maaf, ada sedikit gangguan teknis di sistem Zoya.";
            // Simplified error message to avoid complex string manipulation issues
            if (aiError instanceof Error && aiError.message) {
                finalErrorMessage = `Duh, Zoya lagi ada kendala nih: ${aiError.message.substring(0, 80)}... Coba lagi ya.`;
            } else if (typeof aiError === 'string') {
                finalErrorMessage = `Duh, Zoya lagi ada kendala: ${aiError.substring(0, 80)}... Coba lagi ya.`;
            }
            return {
                suggestedReply: finalErrorMessage
            };
        }
    } catch (flowError) {
        console.error('[CS-FLOW] ❌ Critical error dalam flow whatsAppReplyFlowSimplified:', flowError);
        // Return a generic, safe, valid JSON response
        return {
            suggestedReply: "Waduh, sistem Zoya lagi ada kendala besar nih. Mohon coba beberapa saat lagi ya."
        };
    }
});
async function generateWhatsAppReply(input) {
    // Memastikan semua properti opsional yang dibutuhkan oleh prompt ada, meskipun undefined
    const flowInput = {
        customerMessage: input.customerMessage,
        senderNumber: input.senderNumber,
        chatHistory: input.chatHistory || [],
        // Pastikan nilai default atau dari input ada untuk variabel tanggal/waktu
        currentDate: input.currentDate || new Date().toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }),
        currentTime: input.currentTime || new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }),
        tomorrowDate: input.tomorrowDate || new Date(Date.now() + 86400000).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }),
        dayAfterTomorrowDate: input.dayAfterTomorrowDate || new Date(Date.now() + 2 * 86400000).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }),
        agentBehavior: input.agentBehavior,
        knowledgeBase: input.knowledgeBase
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

//# sourceMappingURL=%5Broot-of-the-server%5D__4d8da894._.js.map