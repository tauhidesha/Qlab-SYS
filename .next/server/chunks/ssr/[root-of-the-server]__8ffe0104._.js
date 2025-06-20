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
"[project]/src/types/aiSettings.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AI_AGENT_BEHAVIORS": (()=>AI_AGENT_BEHAVIORS),
    "AI_TRANSFER_CONDITIONS": (()=>AI_TRANSFER_CONDITIONS),
    "AiSettingsFormSchema": (()=>AiSettingsFormSchema),
    "DEFAULT_AI_SETTINGS": (()=>DEFAULT_AI_SETTINGS),
    "DEFAULT_MAIN_PROMPT_ZOYA": (()=>DEFAULT_MAIN_PROMPT_ZOYA)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/v3/external.js [app-rsc] (ecmascript) <export * as z>");
;
const AI_AGENT_BEHAVIORS = [
    "Ramah & Membantu",
    "Profesional & To-the-point",
    "Humoris & Santai",
    "Empatik & Sabar"
];
const AI_TRANSFER_CONDITIONS = [
    "Pelanggan Meminta Secara Eksplisit",
    "AI Tidak Menemukan Jawaban (Setelah 2x Coba)",
    "Terdeteksi Emosi Negatif dari Pelanggan",
    "Disebut Kata Kunci Eskalasi (mis. 'manajer', 'komplain')",
    "Setelah 5 Pertanyaan Tanpa Solusi"
];
const FollowUpDelaysSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    firstAttemptHours: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].preprocess((val)=>val === "" || val === undefined || val === null ? undefined : parseInt(String(val), 10), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number({
        invalid_type_error: "Jam harus angka."
    }).min(1, "Minimal 1 jam.").max(168, "Maksimal 168 jam (7 hari).").optional()),
    secondAttemptDays: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].preprocess((val)=>val === "" || val === undefined || val === null ? undefined : parseInt(String(val), 10), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number({
        invalid_type_error: "Hari harus angka."
    }).min(1, "Minimal 1 hari.").max(30, "Maksimal 30 hari.").optional()),
    thirdAttemptDays: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].preprocess((val)=>val === "" || val === undefined || val === null ? undefined : parseInt(String(val), 10), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number({
        invalid_type_error: "Hari harus angka."
    }).min(1, "Minimal 1 hari.").max(30, "Maksimal 30 hari.").optional()),
    fourthAttemptDays: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].preprocess((val)=>val === "" || val === undefined || val === null ? undefined : parseInt(String(val), 10), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number({
        invalid_type_error: "Hari harus angka."
    }).min(1, "Minimal 1 hari.").max(90, "Maksimal 90 hari.").optional())
});
const AiSettingsFormSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    agentBehavior: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(AI_AGENT_BEHAVIORS, {
        required_error: "Perilaku agen AI harus dipilih."
    }),
    welcomeMessage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(10, "Pesan selamat datang minimal 10 karakter.").max(300, "Pesan selamat datang maksimal 300 karakter."),
    transferConditions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(AI_TRANSFER_CONDITIONS)).min(1, "Minimal satu kondisi transfer harus dipilih."),
    knowledgeBaseDescription: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(10000, "Deskripsi sumber pengetahuan maksimal 10000 karakter.").optional().describe("Panduan tingkat tinggi untuk AI. Detail pengetahuan akan diambil melalui tools."),
    enableHumanHandoff: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false).describe("Aktifkan notifikasi ke agen manusia jika AI perlu bantuan."),
    humanAgentWhatsAppNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\+?[0-9\s-]{10,18}$|^$/, "Format nomor WhatsApp agen tidak valid (mis. +628123456789 atau kosong).").optional().describe("Nomor WhatsApp agen manusia untuk notifikasi handoff."),
    enableFollowUp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false).describe("Aktifkan fitur follow-up otomatis untuk pelanggan yang pernah menghubungi via WhatsApp namun belum melakukan kunjungan atau transaksi. Follow-up berhenti jika pelanggan tercatat datang/bertransaksi."),
    followUpMessageTemplate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(300, "Template pesan follow-up maksimal 300 karakter.").optional(),
    followUpDelays: FollowUpDelaysSchema.optional(),
    mainPrompt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(100, "Prompt utama minimal 100 karakter.").max(20000, "Prompt utama maksimal 20000 karakter.").optional().describe("Prompt utama yang mengarahkan perilaku dan logika Zoya.")
}).superRefine((data, ctx)=>{
    if (data.enableFollowUp) {
        if (!data.followUpMessageTemplate || data.followUpMessageTemplate.trim() === "") {
            ctx.addIssue({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodIssueCode.custom,
                message: "Template pesan follow-up diperlukan jika fitur follow-up aktif.",
                path: [
                    "followUpMessageTemplate"
                ]
            });
        }
        if (!data.followUpDelays?.firstAttemptHours) {
            ctx.addIssue({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodIssueCode.custom,
                message: "Penundaan follow-up pertama (jam) diperlukan.",
                path: [
                    "followUpDelays",
                    "firstAttemptHours"
                ]
            });
        }
    }
    if (data.enableHumanHandoff && (!data.humanAgentWhatsAppNumber || data.humanAgentWhatsAppNumber.trim() === "")) {
        ctx.addIssue({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodIssueCode.custom,
            message: "Nomor WhatsApp Agen Manusia diperlukan jika notifikasi handoff aktif.",
            path: [
                "humanAgentWhatsAppNumber"
            ]
        });
    }
});
const DEFAULT_MAIN_PROMPT_ZOYA = `
Lo adalah "Zoya", CS QLAB Moto Detailing yang asik, gaul, dan ngerti banget sama anak motor. Ngomongnya santai kayak lagi nongkrong, tapi tetep informatif.

GAYA BAHASA (WAJIB BANGET DIikutin!):
- Sapaan: "Wih, boskuu!", "Ashiaaap!", "Gaspol!", "Yok!", "Santuy, bro!"
- Sebutan buat user: "Bro", "Kak", "Bos", "Ndan" (pilih salah satu yang pas aja, jangan ganti-ganti terus di satu jawaban).
- Pake istilah anak motor: "kinclong parah", "poles biar ganteng maksimal", "coating biar anti badai", "servis biar ngacir lagi".
- Boleh pake "anjay", "mantap jiwa", "keren abis" kalau konteksnya pas dan nggak berlebihan.
- Emoji: Pake aja yang relevan dan bikin suasana cair 😎✨💸🛠️🏍️💨. Jangan kebanyakan juga tapi.
- Hindari bahasa formal kayak "Dengan hormat", "Mohon maaf atas ketidaknyamanannya", "Dapat kami informasikan". Ganti jadi: "Sori nih bro", "Gini nih ceritanya", "Nih ya infonya".

KONTEKS SESI DARI SISTEM (Ini contekan lo, jangan diulang ke user, tapi PAKE buat jawab):
- Motor Pelanggan (dari sesi): {{{SESSION_MOTOR_NAME}}} (Ukurannya: {{{SESSION_MOTOR_SIZE}}})
- Layanan Spesifik yang Lagi Diincer (dari sesi): {{{SESSION_ACTIVE_SERVICE}}} (ID Layanannya: {{{SESSION_ACTIVE_SERVICE_ID}}})
- Terakhir Ngobrolin Apa ({{{SESSION_LAST_AI_INTERACTION_TYPE}}}):
  - initial_greeting: Baru aja sapaan.
  - asked_for_motor_type_for_specific_service: Zoya baru aja nanya tipe motor buat layanan X.
  - provided_specific_service_details: Zoya baru aja ngasih info harga/durasi layanan X buat motor Y.
  - provided_category_service_list: Zoya baru aja ngasih daftar layanan di kategori Z.
  - asked_for_service_after_motor_size: Zoya baru aja ngasih tau ukuran motor, terus nanya mau layanan apa.
  - asked_for_paint_type_for_coating: Zoya baru aja nanya jenis cat buat layanan Coating.
  - ready_for_booking_details: User indikasikan mau booking, Zoya siap nanya tanggal/jam.
  - waiting_for_booking_datetime: Zoya udah nanya tanggal/jam booking, lagi nunggu jawaban user.
  - waiting_for_booking_notes: Zoya udah dapet tanggal/jam, lagi nunggu catatan tambahan dari user.
  - booking_attempted: Zoya udah coba panggil tool createBookingTool.
  - general_response: Jawaban umum, nggak masuk kategori di atas.
- User Lagi Nanya Soal Kategori Umum Ini (dari pesan user sekarang): {{{detectedGeneralServiceKeyword}}}
- Info Tambahan Langsung dari Sistem (misalnya hasil pre-call tool):
{{{dynamicContext}}}
- Tanggal Hari Ini: {{{currentDate}}}
- Tanggal Besok: {{{tomorrowDate}}}
- Tanggal Lusa: {{{dayAfterTomorrowDate}}}
- ID Pengirim (jika ada, untuk booking): {{{senderNumber}}}
- Info Booking yang Pending (jika ada): Tanggal: {{{pendingBookingDate}}}, Jam: {{{pendingBookingTime}}}

TOOLS YANG BISA LO PAKE (Pake kalau BUTUH BANGET & info belum ada di konteks/info tambahan. Selalu cek konteks dulu!):
1.  \\\`cariSizeMotor\\\`: Buat nyari ukuran motor. Input: \\\`{"namaMotor": "NAMA_MOTOR_DARI_USER"}\\\`. Outputnya ada \\\`size\\\` (S/M/L/XL) dan \\\`vehicleModelFound\\\`.
2.  \\\`getProductServiceDetailsByNameTool\\\`: Buat dapetin info detail satu layanan/produk (harga, durasi, dll). Input: \\\`{"productName": "NAMA_LAYANAN_SPESIFIK_PLUS_VARIAN_KALAU_ADA"}\\\`. (Bisa juga untuk produk)
3.  \\\`findLayananByCategory\\\`: Buat nyari daftar layanan per kategori umum. (Ini jarang dipake karena info kategori biasanya udah ada di \\\`{{{dynamicContext}}}\\\` dari pre-call).
4.  \\\`createBookingTool\\\`: Buat bikin jadwal booking. Inputnya: customerName, customerPhone (opsional, ambil dari senderNumber kalau ada), serviceId (ID katalognya), serviceName (nama lengkap layanan+varian), vehicleInfo, bookingDate (YYYY-MM-DD), bookingTime (HH:MM), notes (opsional).

ALUR KERJA LO, ZOYA (PERHATIKAN URUTAN PRIORITAS DARI X, A, B, C, dst. JIKA KONDISI DI ALUR X TERPENUHI, LANGSUNG PROSES ALUR X, JANGAN LANJUT KE ALUR LAINNYA UNTUK RESPON SAAT INI):

X. KASUS SPESIAL: USER LANGSUNG NGASIH TAU LAYANAN SPESIFIK DAN MODEL MOTOR SEKALIGUS
   (Contoh: "Cuci premium NMAX berapa?", "Harga coating XMAX doff", "biaya detailing vespa primavera")
   INI PRIORITAS PALING ATAS. JANGAN SAMPAI USER NGULANG INFO YANG UDAH DIKASIH!
   1. DARI PESAN USER SAAT INI:
      - IDENTIFIKASI NAMA_MOTOR_LENGKAP (mis. 'NMAX', 'XMAX', 'Vario 125').
      - IDENTIFIKASI NAMA_LAYANAN_SPESIFIK (mis. 'Cuci Premium', 'Coating Doff', 'Full Detailing').
   2. TINDAKAN_PERTAMA_LO (INI WAJIB BANGET, JANGAN DITUNDA, DAN YANG PALING PENTING: JANGAN PERNAH BERTANYA KEPADA USER UKURAN S/M/L/XL MOTORNYA JIKA NAMA MODEL MOTOR LENGKAP SUDAH DISEBUTKAN!):
      - LO HARUS LANGSUNG MINTA SISTEM JALANIN TOOL \\\`cariSizeMotor\\\` buat dapetin ukuran motornya dari database QLAB.
      - SIAPIN INPUT BUAT TOOL ITU: \\\`{"namaMotor": "NAMA_MOTOR_LENGKAP_DARI_PESAN_USER_YANG_BARUSAN_LO_IDENTIFIKASI"}\\\`.
   3. SETELAH tool \\\`cariSizeMotor\\\` ngasih hasil (misalnya, output tool adalah {'success': true, 'size': "L", 'vehicleModelFound': "NMAX"}):
      a.  SAMPAIKAN KE USER ukuran motor yang Zoya temukan. Contoh: "Oke Bro, buat XMAX itu ukurannya L ya menurut catatan QLAB."
      b.  SIMPAN INFO KE SESI Firestore (via flow): \\\`knownMotorcycleName\\\` = hasil tool \\\`vehicleModelFound\\\`, \\\`knownMotorcycleSize\\\` = hasil tool \\\`size\\\`.
      c.  Jika NAMA_LAYANAN_SPESIFIK yang diidentifikasi di langkah 1 adalah "Coating" atau mengandung kata "coating", DAN user BELUM menyebutkan jenis cat (glossy/doff) di pesan awalnya:
          -   TANYA JENIS CAT KE USER: "Oke, Bro! Buat motor \\\`[vehicleModelFound dari tool]\` (ukurannya Zoya cek dapet \\\`[size dari tool]\`) mau di-coating ya. Cat motornya glossy atau doff nih biar harganya pas?"
          -   SIMPAN KE SESI Firestore (via flow): \\\`activeSpecificServiceInquiry\\\` = NAMA_LAYANAN_SPESIFIK, \\\`lastAiInteractionType\\\` = "asked_for_paint_type_for_coating".
      d.  Jika NAMA_LAYANAN_SPESIFIK itu BUKAN "Coating", ATAU user SUDAH menyebutkan jenis cat untuk "Coating" di pesan awalnya:
          -   LANGSUNG MINTA SISTEM JALANIN tool \\\`getProductServiceDetailsByNameTool\\\`. Inputnya: \\\`{"productName": "NAMA_LAYANAN_SPESIFIK_DARI_LANGKAH_1"}\\\`. (Tool ini akan otomatis mempertimbangkan ukuran motor dari database jika varian layanan berdasarkan ukuran).
          -   Sampaikan hasilnya (harga, durasi) ke user. Contoh: "Siap! Buat motor \\\`[vehicleModelFound dari tool]\` (ukurannya Zoya dapet \\\`[size dari tool]\`), layanan \\\`[NAMA_LAYANAN_SPESIFIK_DARI_LANGKAH_1]\` harganya Rp XXX, kelarnya sekitar YYY. Mau dibookingin sekalian, Bro?"
          -   SIMPAN KE SESI Firestore (via flow): \\\`activeSpecificServiceInquiry\\\` = NAMA_LAYANAN_SPESIFIK, \\\`activeSpecificServiceId\\\` = [ID LAYANAN DARI TOOL], \\\`lastAiInteractionType\\\` = "provided_specific_service_details".
   4. JIKA tool \\\`cariSizeMotor\\\` GAGAL menemukan ukuran (misalnya, output tool {'success': false} atau mengembalikan size null):
      -   TANYA KE USER (KONFIRMASI MODEL MOTORNYA, BUKAN UKURAN S/M/L/XL-NYA!): "Bro, Zoya udah catet mau \\\`NAMA_LAYANAN_SPESIFIK_DARI_LANGKAH_1\\\`. Tapi buat motor \\\`NAMA_MOTOR_LENGKAP_DARI_PESAN_USER\\\`, Zoya belum nemu nih ukurannya di daftar QLAB. Modelnya udah bener itu, atau ada info lain yang lebih spesifik (misal tahunnya, atau tipe lengkapnya)?"
      -   SIMPAN KE SESI Firestore (via flow): \\\`activeSpecificServiceInquiry\\\` = NAMA_LAYANAN_SPESIFIK, \\\`lastAiInteractionType\\\` = "asked_for_motor_type_for_specific_service".

A. SAPAAN AWAL / BELUM ADA KONTEKS JELAS (Periksa dulu apakah ALUR X cocok. Jika tidak, baru ke sini)
   - Kalau user cuma "halo", "pagi", "bro", sapa balik yang asik. Contoh: "Wih, boskuu! Ada yang bisa Zoya bantu biar motornya makin ganteng?"
   - SIMPAN KE SESI Firestore (via flow): \\\`lastAiInteractionType\\\` = "initial_greeting".

B. USER NANYA KATEGORI LAYANAN UMUM (Contoh: "mau cuci", "info coating dong", "detailing apa aja nih?") (Periksa dulu apakah ALUR X cocok. Jika tidak, baru ke sini)
   - Ini biasanya udah di-handle sama \\\`{{{dynamicContext}}}\\\` dari sistem (hasil pre-call tool findLayananByCategory).
   1. LIAT \\\`{{{dynamicContext}}}\\\`.
      - Jika ADA ISINYA daftar layanan buat kategori \\\`{{{detectedGeneralServiceKeyword}}}\\\`:
         - JANGAN bilang "Saya coba cari info...". LANGSUNG GAS!
         - Mulai dengan: "Ashiaaap! Buat \\\`{{{detectedGeneralServiceKeyword}}}\\\`, di QLAB ada beberapa pilihan nih, Bro:"
         - Sebutin TIAP layanan dari \\\`{{{dynamicContext}}}\\\` (Nama **bold**, deskripsi singkat, varian kalau ada, harga dasar, durasi). Bikin kayak lagi nawarin barang bagus.
         - Jika motor BELUM DIKETAHUI ({{{SESSION_MOTOR_NAME}}} adalah "belum diketahui"): Akhiri dengan "Dari pilihan {{{detectedGeneralServiceKeyword}}} tadi, ada yang kakak minati? Oh iya, motornya apa ya kak?"
         - Jika motor SUDAH DIKETAHUI: Akhiri dengan "Nah, buat motor {{{SESSION_MOTOR_NAME}}}, dari pilihan layanan {{{detectedGeneralServiceKeyword}}} tadi, ada yang bikin kamu tertarik?"
         - SIMPAN KE SESI Firestore (via flow): \\\`lastAiInteractionType\\\` = "provided_category_service_list".
      - Jika \\\`{{{dynamicContext}}}\\\` BILANG GAK ADA layanan buat kategori itu:
         - JAWAB: "Waduh, sori nih Bro, buat \\\`{{{detectedGeneralServiceKeyword}}}\\\` kayaknya lagi kosong nih di list Zoya. Mungkin lo salah ketik, atau mau Zoya cariin info layanan lain aja?"
         - SIMPAN KE SESI Firestore (via flow): \\\`lastAiInteractionType\\\` = "general_response".
   - Kalau \\\`{{{dynamicContext}}}\\\` KOSONG tapi \\\`{{{detectedGeneralServiceKeyword}}}\\\` ADA ISINYA (artinya sistem gagal ngasih info awal atau memang tidak ada pre-call):
      - JAWAB: "Sori Bro, buat \\\`{{{detectedGeneralServiceKeyword}}}\\\` Zoya cek lagi nih, tapi infonya belum ada. Coba kategori lain atau tanya layanan spesifik aja?"
      - SIMPAN KE SESI Firestore (via flow): \\\`lastAiInteractionType\\\` = "general_response".

C. USER MEMILIH LAYANAN SPESIFIK SETELAH ANDA MEMBERIKAN DAFTAR KATEGORI ({{{SESSION_LAST_AI_INTERACTION_TYPE}}} adalah "provided_category_service_list") (Periksa dulu apakah ALUR X cocok. Jika tidak, baru ke sini)
   1. Identifikasi NAMA LAYANAN SPESIFIK yang dipilih user dari pesan saat ini.
   2. Jika MOTOR SUDAH DIKETAHUI (dari sesi, {{{SESSION_MOTOR_NAME}}} BUKAN "belum diketahui"):
      - Jika layanan yang dipilih adalah "Coating" ATAU mengandung kata "coating" DAN jenis cat BELUM DITANYAKAN/DIKETAHUI ({{{SESSION_LAST_AI_INTERACTION_TYPE}}} bukan "asked_for_paint_type_for_coating") DAN user belum menyebutkan jenis cat di pesan ini:
         - TANYA JENIS CAT: "Oke, Bro, mau Coating ya buat \\\`{{{SESSION_MOTOR_NAME}}}\\\` nya. Biar hasilnya maksimal, catnya glossy atau doff nih?"
         - SIMPAN KE SESI Firestore (via flow): \\\`activeSpecificServiceInquiry\\\` = "NAMA_LAYANAN_COATING_SPESIFIK_DARI_USER", \\\`lastAiInteractionType\\\` = "asked_for_paint_type_for_coating".
      - Jika BUKAN "Coating" ATAU jenis cat SUDAH diketahui/disebutkan:
         - LANGSUNG Panggil tool \\\`getProductServiceDetailsByNameTool\\\` buat layanan spesifik itu, dengan info motor \\\`{{{SESSION_MOTOR_NAME}}}\\\` (dan ukuran \\\`{{{SESSION_MOTOR_SIZE}}}\\\` jika ada, plus jenis cat kalau relevan).
         - Kasih info detail harga & durasi dari hasil tool. Ajakin booking sekalian. Contoh: "Sip! Buat \\\`{{{SESSION_MOTOR_NAME}}}\\\` lo, \\\`[NAMA_LAYANAN_DARI_TOOL HASILNYA]\` harganya Rp X, kelarnya sekitar Y. Mau langsung dibookingin aja, Bro?"
         - SIMPAN KE SESI Firestore (via flow): \\\`activeSpecificServiceInquiry\\\` = "NAMA_LAYANAN_SPESIFIK_DARI_USER", \\\`activeSpecificServiceId\\\` = [ID LAYANAN DARI TOOL], \\\`lastAiInteractionType\\\` = "provided_specific_service_details".
   3. Jika MOTOR BELUM DIKETAHUI (dari sesi):
      - TANYA TIPE MOTORNYA. Contoh: "Oke, Bro, sip pilih \\\`[NAMA_LAYANAN_SPESIFIK_DARI_USER]\`! 👍 Biar Zoya bisa kasih info pas, motor lo apa nih?"
      - SIMPAN KE SESI Firestore (via flow): \\\`activeSpecificServiceInquiry\\\` = "NAMA_LAYANAN_SPESIFIK_DARI_USER", \\\`lastAiInteractionType\\\` = "asked_for_motor_type_for_specific_service".

D. USER MENJAWAB TIPE MOTOR (setelah Anda bertanya untuk layanan spesifik - {{{SESSION_LAST_AI_INTERACTION_TYPE}}} adalah "asked_for_motor_type_for_specific_service")
   - Ambil NAMA MOTOR dari chat user.
   - Panggil tool \\\`cariSizeMotor\\\` buat motor itu.
   - Setelah ukuran dapet (misal dari tool output ada {'size': "L", 'vehicleModelFound': "NMAX"}):
     - SAMPAIKAN ukuran motornya ke user. Contoh: "Oke, Bro, buat NMAX itu ukurannya L ya di catatan QLAB."
     - INGAT LAYANAN YANG LAGI DIINCER dari \\\`{{{SESSION_ACTIVE_SERVICE}}}\\\` dan motor yang baru ketahuan (NAMA_MOTOR_DARI_TOOL dan UKURAN_DARI_TOOL).
     - Kalau layanan yang diincer itu "Coating" atau mengandung kata "coating" DAN jenis cat BELUM diketahui/ditanyakan:
        - TANYA JENIS CAT: "Oke, \\\`[NAMA_MOTOR_DARI_TOOL HASILNYA]\` (ukurannya \\\`[UKURAN_DARI_TOOL HASILNYA]\`) udah Zoya catet. Buat layanan \\\`{{{SESSION_ACTIVE_SERVICE}}}\\\`, jenis cat motornya glossy atau doff nih, Bro?"
        - SIMPAN KE SESI Firestore (via flow): \\\`knownMotorcycleName\\\` = [NAMA_MOTOR_DARI_TOOL HASILNYA], \\\`knownMotorcycleSize\\\` = [UKURAN_DARI_TOOL HASILNYA], (activeSpecificServiceInquiry sudah ada), \\\`lastAiInteractionType\\\` = "asked_for_paint_type_for_coating".
     - Kalau BUKAN "Coating" ATAU jenis cat tidak relevan:
        - LANGSUNG panggil tool \\\`getProductServiceDetailsByNameTool\\\` dengan \\\`productName: "{{{SESSION_ACTIVE_SERVICE}}}"\\\` (plus info ukuran dari tool \\\`cariSizeMotor\\\` sebelumnya).
        - Kasih hasilnya (harga, durasi). Ajakin booking. Contoh: "Oke, \\\`[NAMA_MOTOR_DARI_TOOL HASILNYA]\` (ukurannya \\\`[UKURAN_DARI_TOOL HASILNYA]\`) udah Zoya catet. Jadi buat \\\`{{{SESSION_ACTIVE_SERVICE}}}\\\` harganya Rp X, kelarnya sekitar Y. Gas booking sekarang, Bro?"
        - SIMPAN KE SESI Firestore (via flow): \\\`knownMotorcycleName\\\` = [NAMA_MOTOR_DARI_TOOL HASILNYA], \\\`knownMotorcycleSize\\\` = [UKURAN_DARI_TOOL HASILNYA], (activeSpecificServiceInquiry sudah ada), \\\`activeSpecificServiceId\\\` = [ID LAYANAN DARI TOOL], \\\`lastAiInteractionType\\\` = "provided_specific_service_details".
   - Kalau tool \\\`cariSizeMotor\\\` GAGAL nemuin ukuran:
       - TANYA ULANG/KONFIRMASI (MODEL MOTOR, BUKAN UKURAN S/M/L/XL): "Waduh Bro, buat motor \\\`[NAMA_MOTOR_DARI_USER]\` Zoya belum nemu ukurannya nih. Modelnya udah bener itu? Atau coba sebutin yang lebih umum/lengkap (misal tahunnya atau tipe persisnya)?"
       - SIMPAN KE SESI Firestore (via flow): (activeSpecificServiceInquiry sudah ada), \\\`lastAiInteractionType\\\` = "asked_for_motor_type_for_specific_service" (tetap di state ini).

E. USER MENJAWAB JENIS CAT (setelah Anda bertanya untuk layanan coating - {{{SESSION_LAST_AI_INTERACTION_TYPE}}} adalah "asked_for_paint_type_for_coating")
   - Ambil JENIS CAT (glossy/doff) dari chat user.
   - INGAT LAYANAN COATING dari \\\`{{{SESSION_ACTIVE_SERVICE}}}\\\`, motor \\\`{{{SESSION_MOTOR_NAME}}}\\\` (dan \\\`{{{SESSION_MOTOR_SIZE}}}\\\`), dan JENIS CAT yang baru ketahuan. LANGSUNG panggil tool \\\`getProductServiceDetailsByNameTool\\\` (sertakan info jenis cat jika perlu, atau biarkan tool yang handle).
   - Kasih hasilnya (harga, durasi). Ajakin booking. Contoh: "Catet! \\\`{{{SESSION_MOTOR_NAME}}}\\\` cat \\\`[JENIS_CAT_DARI_USER]\`. Jadi buat \\\`{{{SESSION_ACTIVE_SERVICE}}}\\\` harganya Rp X, kelarnya sekitar Y. Mau dijadwalin kapan nih, Bro?"
   - SIMPAN KE SESI Firestore (via flow): (activeSpecificServiceInquiry sudah ada, knownMotorcycleName, knownMotorcycleSize sudah ada), \\\`activeSpecificServiceId\\\` = [ID LAYANAN DARI TOOL], \\\`lastAiInteractionType\\\` = "provided_specific_service_details".

F. USER BERTANYA UKURAN MOTOR LANGSUNG (Contoh: "NMAX ukuran apa?", "Beat size apa?") (Periksa dulu apakah ALUR X cocok. Jika tidak, baru ke sini)
   - JIKA pesan user HANYA soal ukuran motor (nggak nyebut layanan) DAN (\\\`{{{SESSION_MOTOR_NAME}}}\\\` adalah "belum diketahui" ATAU \\\`{{{SESSION_LAST_AI_INTERACTION_TYPE}}}\\\` adalah "initial_greeting" ATAU \\\`{{{SESSION_LAST_AI_INTERACTION_TYPE}}}\\\` adalah "general_response"):
     1. Panggil tool \\\`cariSizeMotor\\\` dengan nama motor dari user.
     2. Setelah dapet hasil (misal {'success': true, 'size': "M", 'vehicleModelFound': "NMAX"}):
        - Kasih tau ukuran motornya.
        - TANYA layanan apa yang diincer. Contoh: "Nah, \\\`[vehicleModelFound dari tool]\` itu masuknya ukuran \\\`[size dari tool]\`, Bro! Ada yang bisa Zoya bantu buat \\\`[vehicleModelFound dari tool]\`-nya? Mau dicuci kinclong, dicoating biar anti lecet, atau servis biar ngacir?"
        - SIMPAN KE SESI Firestore (via flow): \\\`knownMotorcycleName\\\` = [NAMA_MOTOR_DARI_TOOL HASILNYA], \\\`knownMotorcycleSize\\\` = [UKURAN_DARI_TOOL HASILNYA], \\\`lastAiInteractionType\\\` = "asked_for_service_after_motor_size".
     3. Kalau tool GAGAL nemuin ukuran:
        - JAWAB: "Sori Bro, buat motor \\\`[NAMA_MOTOR_DARI_USER]\` Zoya belum nemu ukurannya nih. Mungkin bisa coba sebutin model yang lebih lengkap atau umum?"
        - SIMPAN KE SESI Firestore (via flow): \\\`lastAiInteractionType\\\` = "general_response".

G. USER MAU BOOKING (pesan user ada kata "booking", "pesen tempat", "jadwal", ATAU {{{SESSION_LAST_AI_INTERACTION_TYPE}}} adalah "ready_for_booking_details" atau "provided_specific_service_details")
   1. KONFIRMASI LAYANAN & MOTOR:
      - JIKA layanan spesifik ({{{SESSION_ACTIVE_SERVICE}}}) DAN motor ({{{SESSION_MOTOR_NAME}}}) sudah jelas dari sesi DAN {{{SESSION_MOTOR_NAME}}} bukan "belum diketahui" DAN {{{SESSION_ACTIVE_SERVICE}}} bukan "tidak ada":
         - TANYA TANGGAL & JAM: "Gaspol! Mau booking {{{SESSION_ACTIVE_SERVICE}}} buat {{{SESSION_MOTOR_NAME}}} lo tanggal sama jam berapa nih, Bro? (Contoh: Besok jam 2 siang, atau 25 Desember {{{currentDate.split('-')[0]}}} jam 14:00)"
         - SIMPAN KE SESI Firestore (via flow): \\\`lastAiInteractionType\\\` = "waiting_for_booking_datetime".
      - JIKA layanan atau motor BELUM JELAS:
         - TANYA ULANG: "Oke, mau booking ya? Boleh tau mau layanan apa dan buat motor apa nih, Bro?"
         - (Kembali ke alur A atau B untuk identifikasi layanan/motor).
   2. USER MEMBERIKAN TANGGAL & JAM ({{{SESSION_LAST_AI_INTERACTION_TYPE}}} adalah "waiting_for_booking_datetime"):
      - Ambil informasi TANGGAL dan JAM dari pesan user. Flow akan otomatis mem-parse dan menyimpan ini ke \\\`pendingBookingDate\\\` & \\\`pendingBookingTime\\\` di sesi jika berhasil.
      - JIKA flow BERHASIL mem-parse tanggal dan jam (artinya {{{pendingBookingDate}}} dan {{{pendingBookingTime}}} di sesi ADA ISINYA dan valid):
         - TANYA CATATAN (opsional): "Oke, udah Zoya catet booking buat {{{SESSION_ACTIVE_SERVICE}}} motor {{{SESSION_MOTOR_NAME}}} di {{{pendingBookingDate}}} jam {{{pendingBookingTime}}}. Ada catatan tambahan buat booking ini, Bro? (misalnya, 'datang agak telat dikit', atau 'fokus di bagian tertentu'). Kalau nggak ada, ketik aja 'gak ada' atau '-' atau 'aman cukup'."
         - SIMPAN KE SESI Firestore (via flow): \\\`lastAiInteractionType\\\` = "waiting_for_booking_notes".
      - JIKA flow GAGAL mem-parse tanggal/jam ({{{pendingBookingDate}}} atau {{{pendingBookingTime}}} di sesi KOSONG atau TIDAK VALID):
         - TANYA ULANG/KLARIFIKASI TANGGAL/JAM: "Waduh, Bro, Zoya agak bingung nih sama tanggal/jamnya. Bisa tolong kasih tau lagi yang lebih jelas? (Contoh: Besok jam 2 siang, atau Tanggal 25 Juli jam 14:00)."
         - (Tetap di state "waiting_for_booking_datetime").
   3. USER MEMBERIKAN CATATAN ATAU BILANG "GAK ADA" / "CUKUP" ({{{SESSION_LAST_AI_INTERACTION_TYPE}}} adalah "waiting_for_booking_notes" DAN {{{pendingBookingDate}}} serta {{{pendingBookingTime}}} di sesi SUDAH VALID):
      - Ambil catatan dari user (jika ada, atau kosong jika "gak ada").
      - **PERSIAPKAN DATA UNTUK TOOL \\\`createBookingTool\\\` (INI WAJIB DILAKUKAN FLOW DI BELAKANG LAYAR, ZOYA HANYA PERLU TAHU BAHWA DIA AKAN MEMANGGIL TOOL INI):**
         - customerName: Ambil dari \\\`{{{SESSION_MOTOR_NAME}}}\\\` (jika sudah diketahui dan bukan "belum diketahui"), atau default ke \\\`Pelanggan WhatsApp {{{senderNumber}}}\\\`.
         - customerPhone: \\\`{{{senderNumber}}}\\\` (jika ada).
         - serviceId: \\\`{{{SESSION_ACTIVE_SERVICE_ID}}}\\\` (HARUS ADA dari sesi).
         - serviceName: \\\`{{{SESSION_ACTIVE_SERVICE}}}\\\` (HARUS ADA dari sesi).
         - vehicleInfo: "\\\`{{{SESSION_MOTOR_NAME}}}\\\` (Ukr: \\\`{{{SESSION_MOTOR_SIZE}}}\\\`)" (HARUS ADA dari sesi).
         - bookingDate: Ambil dari \\\`{{{pendingBookingDate}}}\\\` (HARUS ADA dari sesi, format YYYY-MM-DD).
         - bookingTime: Ambil dari \\\`{{{pendingBookingTime}}}\\\` (HARUS ADA dari sesi, format HH:MM).
         - notes: Catatan dari user.
      - **LANGSUNG PANGGIL TOOL \\\`createBookingTool\\\` dengan data di atas.**
      - SETELAH TOOL KEMBALI:
         - Jika tool bilang sukses (output.success === true): "[PESAN_SUKSES_DARI_TOOL_OUTPUT.message]". Contoh: "Mantap jiwa, Bro! Booking lo buat {{{SESSION_ACTIVE_SERVICE}}} motor {{{SESSION_MOTOR_NAME}}} di {{{pendingBookingDate}}} jam {{{pendingBookingTime}}} udah Zoya CATET dengan ID [BOOKING_ID_DARI_TOOL]. Ditunggu kedatangannya ya! Kalau mau batalin atau ganti jadwal, kabarin Zoya lagi aja."
         - Jika tool bilang gagal (output.success === false): "Waduh, sori banget nih Bro, kayaknya ada kendala pas Zoya mau catet booking lo. Kata sistem sih: [PESAN_ERROR_DARI_TOOL_OUTPUT.message]. Coba lagi bentar, atau mungkin ada info yang salah?"
      - SIMPAN KE SESI Firestore (via flow): Bersihkan info booking dari sesi (activeSpecificServiceInquiry, activeSpecificServiceId, knownMotorcycleName, knownMotorcycleSize, pendingBookingDate, pendingBookingTime), set \\\`lastAiInteractionType\\\` = "booking_attempted".

I. KONDISI LAIN / NGOBROL SANTAI / BINGUNG (Periksa dulu apakah ALUR X, A, B, dst. cocok. Jika tidak, baru ke sini)
   - Kalau user nanya di luar detailing motor, jawab aja "Waduh, Bro, Zoya cuma ngerti soal motor biar kinclong nih. Soal itu Zoya nyerah deh. Ada lagi soal QLAB yang bisa Zoya bantu?"
   - Kalau lo bingung sama pertanyaan user, jangan diem aja. Tanya balik yang sopan tapi gaul. Contoh: "Wah, maksudnya gimana nih, Bro? Coba jelasin lagi biar Zoya nggak salah paham."
   - DEFAULT SIMPAN KE SESI Firestore (via flow): \\\`lastAiInteractionType\\\` = "general_response".

PENTING BANGET:
- Lo itu CS yang asik, jadi jawabnya jangan kaku!
- Selalu cek konteks sesi dan info tambahan dari sistem SEBELUM ngapa-ngapain.
- Kalau info motor atau layanan spesifik udah ada di sesi, PAKE ITU! Jangan tanya lagi.
- Fokus utama: kasih info bener, bantu user, dan ajakin booking kalau udah pas.
- Tiap abis jawab, pikirin \\\`lastAiInteractionType\\\` apa yang paling pas buat disimpen di sesi Firestore (via flow) biar obrolan selanjutnya nyambung.
- Untuk booking, pastikan tanggal dan jam dikonversi ke format yang benar (YYYY-MM-DD dan HH:MM) sebelum memanggil tool \\\`createBookingTool\\\`. Manfaatkan placeholder tanggal (currentDate, tomorrowDate, dayAfterTomorrowDate).
- **PALING PENTING**: Ikuti ALUR KERJA di atas secara berurutan. Jika kondisi ALUR X terpenuhi, jangan proses alur lain.
JAWABAN SANTAI ZOYA:
`.trim();
const DEFAULT_AI_SETTINGS = {
    agentBehavior: "Humoris & Santai",
    welcomeMessage: "Wih, boskuu! Zoya di sini, siap bikin motor lo makin kinclong. Ada yang bisa dibantu nih?",
    transferConditions: [
        "Pelanggan Meminta Secara Eksplisit"
    ],
    knowledgeBaseDescription: `Lo itu asisten AI buat QLAB Moto Detailing. Pake info umum soal layanan dan produk QLAB. Kalau butuh info detail kayak ukuran motor atau harga pasti, jangan ngarang, pake tool yang ada. Santuy aja jawabnya.`,
    mainPrompt: DEFAULT_MAIN_PROMPT_ZOYA,
    enableHumanHandoff: false,
    humanAgentWhatsAppNumber: '',
    enableFollowUp: false,
    followUpMessageTemplate: "Woy, Bro! Kemaren sempet nanya-nanya nih. Jadi kapan mau mampir ke QLAB? Ada promo asik nih, jangan sampe kelewat!",
    followUpDelays: {
        firstAttemptHours: 24,
        secondAttemptDays: 7,
        thirdAttemptDays: 7,
        fourthAttemptDays: 30
    }
};
}}),
"[project]/src/ai/tools/cari-size-motor-tool.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @fileOverview Genkit tool for finding the size of a motorcycle model.
 * This tool is intended to be used by flows.
 *
 * - cariSizeMotorTool - The Genkit tool definition.
 * - findMotorSize - The actual function performing the lookup (exported for direct use).
 * - CariSizeMotorInput - Zod type for the tool's input.
 * - CariSizeMotorOutput - Zod type for the tool's output.
 */ __turbopack_context__.s({
    "cariSizeMotorTool": (()=>cariSizeMotorTool),
    "findMotorSize": (()=>findMotorSize)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)"); // Harus dari @/ai/genkit
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
;
;
;
;
// Schemas for the actual tool
const CariSizeMotorInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    namaMotor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Nama motor tidak boleh kosong.").describe('Nama atau model motor yang ingin dicari ukurannya, contoh: NMAX, PCX, Vario.')
});
const CariSizeMotorOutputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().describe('Apakah pencarian berhasil atau tidak.'),
    size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe('Ukuran motor (S, M, L, XL) jika ditemukan.'),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe('Pesan hasil pencarian, termasuk ukuran jika berhasil atau pesan error jika gagal.'),
    vehicleModelFound: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe('Nama model motor yang sebenarnya ditemukan di database.')
});
async function findMotorSize(input) {
    const { namaMotor } = input;
    const namaMotorLower = namaMotor.toLowerCase().trim();
    console.log(`[findMotorSize Tool Function] Mencari ukuran untuk: "${namaMotorLower}"`);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"]) {
        console.error("[findMotorSize Tool Function] Firestore DB (db) is not initialized.");
        return {
            success: false,
            message: "Database tidak terhubung, tidak bisa mencari ukuran motor."
        };
    }
    try {
        const vehicleTypesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'vehicleTypes');
        let q;
        let querySnapshot;
        let foundVehicleData = null;
        // Coba cari berdasarkan alias dulu
        q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(vehicleTypesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["where"])('aliases', 'array-contains', namaMotorLower), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["limit"])(1));
        querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(q);
        if (!querySnapshot.empty) {
            foundVehicleData = querySnapshot.docs[0].data();
        } else {
            // Jika tidak ketemu di alias, coba cari berdasarkan model_lowercase (jika ada field itu)
            // Atau bisa juga ambil semua lalu filter, tapi kurang efisien.
            // Untuk contoh ini, kita asumsikan ada model_lowercase atau kita ambil semua
            const allVehiclesSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(vehicleTypesRef);
            for (const doc of allVehiclesSnapshot.docs){
                const vehicle = doc.data();
                if (vehicle.model && vehicle.model.toLowerCase() === namaMotorLower) {
                    foundVehicleData = vehicle;
                    break;
                }
                // Check model_lowercase as fallback
                if (vehicle.model_lowercase && vehicle.model_lowercase === namaMotorLower) {
                    foundVehicleData = vehicle;
                    break;
                }
            }
        }
        if (foundVehicleData && foundVehicleData.size) {
            console.log(`[findMotorSize Tool Function] Ditemukan: ${foundVehicleData.model} ukuran ${foundVehicleData.size}`);
            return {
                success: true,
                size: foundVehicleData.size,
                message: `Motor ${foundVehicleData.model} (${namaMotor}) termasuk ukuran ${foundVehicleData.size}.`,
                vehicleModelFound: foundVehicleData.model
            };
        } else {
            console.log(`[findMotorSize Tool Function] Ukuran untuk "${namaMotor}" tidak ditemukan.`);
            return {
                success: false,
                message: `Maaf, Zoya tidak menemukan ukuran untuk motor "${namaMotor}". Mungkin bisa coba nama model yang lebih spesifik atau umum?`
            };
        }
    } catch (error) {
        console.error("[findMotorSize Tool Function] Error saat mencari ukuran motor:", error);
        return {
            success: false,
            message: "Terjadi kesalahan internal saat mencari ukuran motor. Coba lagi nanti."
        };
    }
}
const cariSizeMotorTool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineTool({
    name: 'cariSizeMotor',
    description: 'Mencari ukuran (S, M, L, XL) untuk model motor tertentu. Gunakan jika user bertanya ukuran motornya, atau jika perlu tahu ukuran motor untuk menentukan harga layanan atau informasi lain.',
    inputSchema: CariSizeMotorInputSchema,
    outputSchema: CariSizeMotorOutputSchema
}, findMotorSize // Pass the actual function here
);
}}),
"[project]/src/types/aiToolSchemas.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ClientInfoSchema": (()=>ClientInfoSchema),
    "ProductServiceInfoSchema": (()=>ProductServiceInfoSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/v3/external.js [app-rsc] (ecmascript) <export * as z>");
;
// Skema untuk varian produk/layanan yang akan dikembalikan oleh tool
const ProductVariantInfoSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Nama varian."),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().describe("Harga varian."),
    pointsAwarded: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().describe("Poin yang diberikan untuk varian ini."),
    estimatedDuration: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe("Estimasi durasi pengerjaan varian ini (jika layanan).")
});
const ProductServiceInfoSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("ID unik produk/layanan."),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Nama produk atau layanan."),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'Layanan',
        'Produk'
    ]).describe("Jenis item, apakah 'Layanan' atau 'Produk'."),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Kategori produk/layanan."),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().describe("Harga dasar produk/layanan. Bisa 0 jika harga ditentukan oleh varian."),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe("Deskripsi singkat produk/layanan."),
    pointsAwarded: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().describe("Poin loyalitas yang diberikan untuk produk/layanan dasar ini."),
    estimatedDuration: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe("Estimasi durasi pengerjaan (jika ini adalah layanan)."),
    variants: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(ProductVariantInfoSchema).optional().describe("Daftar varian yang tersedia untuk produk/layanan ini.")
});
// Skema untuk informasi motor klien
const ClientMotorcycleInfoSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Nama atau model motor."),
    licensePlate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Plat nomor motor.")
});
const ClientInfoSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("ID unik klien."),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Nama lengkap klien."),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Nomor telepon klien."),
    loyaltyPoints: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().describe("Jumlah poin loyalitas yang dimiliki klien."),
    motorcycles: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(ClientMotorcycleInfoSchema).optional().describe("Daftar sepeda motor yang terdaftar atas nama klien ini."),
    lastVisit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe("Tanggal kunjungan terakhir klien (format YYYY-MM-DD).")
});
}}),
"[project]/src/ai/tools/productLookupTool.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @fileOverview Genkit tool for looking up product or service details from Firestore.
 */ __turbopack_context__.s({
    "findProductServiceByName": (()=>findProductServiceByName),
    "getProductServiceDetailsByNameTool": (()=>getProductServiceDetailsByNameTool)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiToolSchemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/aiToolSchemas.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-node/v4.js [app-rsc] (ecmascript) <export default as v4>");
;
;
;
;
;
;
const ProductLookupInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    productName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Nama produk atau layanan yang ingin dicari detailnya. Harus spesifik.")
});
async function findProductServiceByName(input) {
    if (!input.productName || input.productName.trim() === '') {
        console.log("ProductLookupTool Function: Nama produk kosong.");
        return null;
    }
    console.log(`ProductLookupTool Function: Mencari produk/layanan dengan nama: "${input.productName}"`);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"]) {
        console.error("[ProductLookupTool Function] FATAL: Firestore DB (db) is not initialized. Cannot query.");
        return null;
    }
    try {
        const servicesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'services');
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(servicesRef); // Get all services/products
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(q);
        let foundItem = null;
        const searchTermLower = input.productName.toLowerCase().trim();
        let bestMatchCandidate = null;
        for (const doc of querySnapshot.docs){
            const item = {
                id: doc.id,
                ...doc.data()
            };
            // Check base item name
            if (item.name.toLowerCase().includes(searchTermLower)) {
                let score = 0;
                if (item.name.toLowerCase() === searchTermLower) score = 100; // Exact match
                else if (item.name.toLowerCase().startsWith(searchTermLower)) score = 50; // Starts with
                else score = 20; // Includes
                if (!bestMatchCandidate || score > (bestMatchCandidate.matchScore || 0) || score === bestMatchCandidate.matchScore && item.name.length < bestMatchCandidate.name.length) {
                    bestMatchCandidate = {
                        ...item,
                        // Ensure all required fields for ProductServiceInfo are present
                        id: item.id,
                        name: item.name,
                        type: item.type,
                        category: item.category,
                        price: item.price,
                        // Optional fields:
                        description: item.description || undefined,
                        pointsAwarded: item.pointsAwarded || undefined,
                        estimatedDuration: item.estimatedDuration || undefined,
                        variants: item.variants?.map((v)=>({
                                ...v,
                                id: v.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])()
                            })) || undefined,
                        originalItem: item,
                        isVariantMatch: false,
                        matchScore: score
                    };
                }
            }
            // Check variants
            if (item.variants) {
                for (const variant of item.variants){
                    const fullVariantName = `${item.name} - ${variant.name}`;
                    if (fullVariantName.toLowerCase().includes(searchTermLower)) {
                        let score = 0;
                        if (fullVariantName.toLowerCase() === searchTermLower) score = 110; // Higher score for exact variant match
                        else if (fullVariantName.toLowerCase().startsWith(searchTermLower)) score = 60;
                        else score = 30;
                        if (!bestMatchCandidate || score > (bestMatchCandidate.matchScore || 0) || score === bestMatchCandidate.matchScore && fullVariantName.length < bestMatchCandidate.name.length) {
                            bestMatchCandidate = {
                                id: item.id,
                                name: fullVariantName,
                                type: item.type,
                                category: item.category,
                                price: variant.price,
                                description: item.description || undefined,
                                pointsAwarded: variant.pointsAwarded ?? item.pointsAwarded,
                                estimatedDuration: variant.estimatedDuration ?? item.estimatedDuration,
                                variants: undefined,
                                originalItem: item,
                                isVariantMatch: true,
                                matchScore: score
                            };
                        }
                    }
                }
            }
        }
        if (bestMatchCandidate) {
            console.log(`ProductLookupTool Function: Ditemukan kandidat terbaik: ${bestMatchCandidate.name} (Score: ${bestMatchCandidate.matchScore})`);
            // Construct the final item to return, ensuring it matches ProductServiceInfoSchema
            foundItem = {
                id: bestMatchCandidate.id,
                name: bestMatchCandidate.name,
                type: bestMatchCandidate.type,
                category: bestMatchCandidate.category,
                price: bestMatchCandidate.price,
                description: bestMatchCandidate.description || undefined,
                pointsAwarded: bestMatchCandidate.pointsAwarded || undefined,
                estimatedDuration: bestMatchCandidate.estimatedDuration || undefined,
                variants: !bestMatchCandidate.isVariantMatch && bestMatchCandidate.originalItem?.variants ? bestMatchCandidate.originalItem.variants.map((v)=>({
                        id: v.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        name: v.name,
                        price: v.price,
                        pointsAwarded: v.pointsAwarded,
                        estimatedDuration: v.estimatedDuration
                    })) : undefined
            };
            try {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiToolSchemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductServiceInfoSchema"].parse(foundItem);
                return foundItem;
            } catch (zodError) {
                console.error("ProductLookupTool Function: Zod validation error for found item:", JSON.stringify(zodError.format(), null, 2));
                console.error("ProductLookupTool Function: Data that failed validation:", JSON.stringify(foundItem, null, 2));
                return null;
            }
        } else {
            console.log(`ProductLookupTool Function: Tidak ada produk/layanan yang cocok dengan nama "${input.productName}".`);
            return null;
        }
    } catch (error) {
        console.error('ProductLookupTool Function: Error saat mengambil data dari Firestore:', error);
        return null;
    }
}
const getProductServiceDetailsByNameTool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineTool({
    name: 'getProductServiceDetailsByNameTool',
    description: 'Mencari dan mengembalikan detail spesifik dari sebuah produk atau layanan berdasarkan namanya. Berguna untuk menjawab pertanyaan pelanggan tentang harga, durasi, ketersediaan, atau deskripsi item tertentu.',
    inputSchema: ProductLookupInputSchema,
    outputSchema: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiToolSchemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductServiceInfoSchema"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].null()
    ]).describe("Objek berisi detail produk/layanan, atau null jika tidak ditemukan.")
}, findProductServiceByName // Pass the actual function here
);
}}),
"[project]/src/ai/tools/cariInfoLayananTool.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @fileOverview Genkit tool for searching services by category.
 * This tool is intended to be used by sub-flows or specialized flows.
 *
 * - cariInfoLayananTool - The Genkit tool definition.
 * - findLayananByCategory - The actual function performing the lookup (exported for direct use).
 * - CariInfoLayananInput - Zod type for the tool's input.
 * - CariInfoLayananOutput - Zod type for the tool's output.
 */ __turbopack_context__.s({
    "cariInfoLayananTool": (()=>cariInfoLayananTool),
    "findLayananByCategory": (()=>findLayananByCategory)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiToolSchemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/aiToolSchemas.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-node/v4.js [app-rsc] (ecmascript) <export default as v4>");
;
;
;
;
;
;
const CariInfoLayananInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    keyword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Kata kunci kategori pencarian tidak boleh kosong.").describe('Nama KATEGORI layanan yang ingin dicari, mis. "cuci", "coating", "detailing". Akan dicocokkan (case-insensitive) dengan field "category" pada data layanan.')
});
const CariInfoLayananOutputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiToolSchemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductServiceInfoSchema"]).describe("Daftar layanan yang cocok dengan KATEGORI yang dicari, bisa kosong.");
async function findLayananByCategory(input) {
    const { keyword } = input;
    const categoryKeywordLower = keyword.toLowerCase().trim();
    console.log(`[findLayananByCategory Tool Function] Attempting to find services for CATEGORY: "${categoryKeywordLower}"`);
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"]) {
        console.error("[findLayananByCategory Tool Function] FATAL: Firestore DB (db) is not initialized. Cannot query.");
        return [];
    }
    const matchingServices = [];
    try {
        const servicesCollectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'services');
        console.log(`[findLayananByCategory Tool Function] Querying collection 'services' WHERE "category" == "${categoryKeywordLower}"`);
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(servicesCollectionRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["where"])("category", "==", categoryKeywordLower));
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(q);
        console.log(`[findLayananByCategory Tool Function] Query successful. Found ${querySnapshot.size} documents matching category "${categoryKeywordLower}".`);
        querySnapshot.forEach((docSnap)=>{
            const serviceData = docSnap.data();
            let itemTypeFormatted = undefined;
            if (typeof serviceData.type === 'string') {
                if (serviceData.type.toLowerCase() === 'layanan') {
                    itemTypeFormatted = 'Layanan';
                } else if (serviceData.type.toLowerCase() === 'produk') {
                    itemTypeFormatted = 'Produk';
                }
            }
            const serviceItem = {
                id: docSnap.id,
                name: serviceData.name,
                type: itemTypeFormatted,
                category: serviceData.category,
                price: typeof serviceData.price === 'number' ? serviceData.price : 0,
                description: serviceData.description || undefined,
                pointsAwarded: serviceData.pointsAwarded || undefined,
                estimatedDuration: serviceData.estimatedDuration || undefined,
                variants: serviceData.variants?.map((v)=>({
                        id: v.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        name: v.name,
                        price: v.price,
                        pointsAwarded: v.pointsAwarded || undefined,
                        estimatedDuration: v.estimatedDuration || undefined
                    })) || undefined
            };
            const validationResult = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiToolSchemas$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductServiceInfoSchema"].safeParse(serviceItem);
            if (validationResult.success) {
                matchingServices.push(validationResult.data);
            } else {
                console.warn(`[findLayananByCategory Tool Function] Data layanan ${docSnap.id} (Nama: ${serviceData.name || 'N/A'}) tidak valid:`, JSON.stringify(validationResult.error.format(), null, 2));
                console.warn(`[findLayananByCategory Tool Function] Data yang gagal validasi:`, JSON.stringify(serviceItem, null, 2));
            }
        });
        console.log(`[findLayananByCategory Tool Function] Successfully validated and pushed ${matchingServices.length} services for CATEGORY "${categoryKeywordLower}".`);
        if (matchingServices.length === 0 && querySnapshot.size > 0) {
            console.warn(`[findLayananByCategory Tool Function] WARNING: Found ${querySnapshot.size} documents for category "${categoryKeywordLower}", but ALL FAILED Zod validation.`);
        } else if (matchingServices.length === 0 && querySnapshot.size === 0) {
            console.log(`[findLayananByCategory Tool Function] INFO: No documents found for category "${categoryKeywordLower}" in Firestore, or the field 'category' does not exactly match "${categoryKeywordLower}".`);
        }
        return matchingServices;
    } catch (error) {
        console.error("[findLayananByCategory Tool Function] Error saat mencari layanan berdasarkan KATEGORI:", error);
        return [];
    }
}
const cariInfoLayananTool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineTool({
    name: 'findLayananByCategory',
    description: 'Mencari daftar layanan atau produk yang tersedia berdasarkan NAMA KATEGORI layanan yang spesifik. Input adalah nama kategori (mis. "Cuci Motor", "Coating"), output adalah daftar layanan dalam kategori tersebut.',
    inputSchema: CariInfoLayananInputSchema,
    outputSchema: CariInfoLayananOutputSchema
}, findLayananByCategory);
}}),
"[project]/src/types/booking.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CreateBookingToolInputSchema": (()=>CreateBookingToolInputSchema),
    "CreateBookingToolOutputSchema": (()=>CreateBookingToolOutputSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/index.js [app-rsc] (ecmascript) <module evaluation>"); // Impor z dari genkit atau zod langsung
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/v3/external.js [app-rsc] (ecmascript) <export * as z>");
;
const CreateBookingToolInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    customerName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Nama lengkap pelanggan."),
    customerPhone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe("Nomor telepon pelanggan (jika ada, format internasional mis. 628xxxx)."),
    clientId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe("ID klien terdaftar (jika ada)."),
    serviceId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("ID layanan/produk yang dibooking dari katalog."),
    serviceName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Nama layanan/produk yang dibooking (termasuk varian jika ada)."),
    vehicleInfo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Informasi kendaraan (mis. 'Honda Vario (B 1234 XYZ)')."),
    bookingDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal booking dalam format YYYY-MM-DD.").describe("Tanggal booking (YYYY-MM-DD)."),
    bookingTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Waktu booking dalam format HH:MM (24 jam).").describe("Waktu booking (HH:MM, 24 jam)."),
    estimatedDuration: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe("Estimasi durasi layanan."),
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe("Catatan tambahan untuk booking.")
});
const CreateBookingToolOutputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().describe("Apakah pembuatan booking berhasil atau tidak."),
    bookingId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe("ID booking yang baru dibuat jika berhasil."),
    queueItemId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe("ID item antrian jika booking untuk hari ini dan berhasil ditambahkan ke antrian."),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().describe("Pesan hasil proses booking (mis. konfirmasi atau error)."),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().describe("Status booking setelah dibuat.")
});
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
 * @fileOverview Genkit tool for creating new bookings.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$booking$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/booking.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isSameDay.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/setHours.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setMinutes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/setMinutes.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parse$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parse.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function createBookingImplementation(input) {
    console.log("[createBookingTool] Input received:", JSON.stringify(input, null, 2));
    try {
        // 1. Validasi input (sudah dilakukan oleh Zod, tapi bisa tambah validasi kustom di sini)
        const parsedDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parse$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parse"])(input.bookingDate, 'yyyy-MM-dd', new Date());
        if (isNaN(parsedDate.getTime())) {
            return {
                success: false,
                message: "Format tanggal booking tidak valid."
            };
        }
        const [hour, minute] = input.bookingTime.split(':').map(Number);
        const bookingDateTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setMinutes$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setMinutes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setHours$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setHours"])(parsedDate, hour), minute);
        const bookingTimestamp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Timestamp"].fromDate(bookingDateTime);
        // 2. Ambil detail layanan untuk estimasi durasi (jika belum ada)
        let estimatedDuration = input.estimatedDuration;
        if (!estimatedDuration && input.serviceId) {
            try {
                const serviceDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'services', input.serviceId);
                const serviceSnap = await serviceDocRef.get();
                if (serviceSnap.exists()) {
                    const serviceData = serviceSnap.data();
                    estimatedDuration = serviceData.estimatedDuration || 'N/A';
                // Jika ada varian, idealnya sudah ditangani di input.serviceName dan input.estimatedDuration
                }
            } catch (e) {
                console.warn("[createBookingTool] Gagal mengambil durasi dari serviceId, akan menggunakan N/A jika tidak ada di input.", e);
            }
        }
        // 3. Siapkan data untuk Firestore
        const bookingDataPayload = {
            customerName: input.customerName,
            clientId: input.clientId,
            customerPhone: input.customerPhone,
            vehicleInfo: input.vehicleInfo,
            serviceId: input.serviceId,
            serviceName: input.serviceName,
            bookingDateTime: bookingTimestamp,
            status: 'Confirmed',
            notes: input.notes,
            source: 'WhatsApp',
            estimatedDuration: estimatedDuration || 'N/A'
        };
        // 4. Simpan ke koleksi 'bookings'
        const bookingDocRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], "bookings"), {
            ...bookingDataPayload,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        console.log(`[createBookingTool] Booking berhasil dibuat dengan ID: ${bookingDocRef.id}`);
        let queueItemId = undefined;
        let queueMessage = "";
        // 5. Jika booking untuk hari ini, tambahkan ke 'queueItems'
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isSameDay$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isSameDay"])(bookingDateTime, new Date())) {
            const queueItemData = {
                customerName: input.customerName,
                clientId: input.clientId,
                vehicleInfo: input.vehicleInfo,
                service: input.serviceName,
                serviceId: input.serviceId,
                // variantId: (jika ada dan disimpan di input, perlu ditambahkan ke schema input tool)
                status: 'Menunggu',
                estimatedTime: estimatedDuration || 'N/A',
                bookingId: bookingDocRef.id,
                createdAt: bookingTimestamp
            };
            const queueDocRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'queueItems'), queueItemData);
            queueItemId = queueDocRef.id;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateDoc"])(bookingDocRef, {
                queueItemId: queueDocRef.id,
                status: 'In Queue'
            });
            console.log(`[createBookingTool] Booking untuk hari ini, ditambahkan ke antrian dengan ID: ${queueItemId}`);
            queueMessage = " dan sudah masuk antrian hari ini.";
        }
        return {
            success: true,
            bookingId: bookingDocRef.id,
            queueItemId: queueItemId,
            message: `Booking untuk ${input.customerName} pada ${input.bookingDate} jam ${input.bookingTime} untuk layanan "${input.serviceName}" berhasil dibuat${queueMessage}`,
            status: queueItemId ? 'In Queue' : 'Confirmed'
        };
    } catch (error) {
        console.error('[createBookingTool] Error:', error);
        return {
            success: false,
            message: `Gagal membuat booking: ${error.message || 'Kesalahan internal server.'}`
        };
    }
}
const createBookingTool = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineTool({
    name: 'createBookingTool',
    description: 'Membuat jadwal booking baru untuk pelanggan di sistem. Gunakan setelah semua detail (nama, layanan, motor, tanggal, jam) dikonfirmasi.',
    inputSchema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$booking$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CreateBookingToolInputSchema"],
    outputSchema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$booking$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CreateBookingToolOutputSchema"]
}, createBookingImplementation);
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createBookingTool
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createBookingTool, "7f08ac490f3a93e1dcd7fb9173c26cbeea107b790c", null);
}}),
"[project]/src/ai/flows/cs-whatsapp-reply-flow.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"4053660f6447b38038e1d20965a3df3cd57a2a7b51":"generateWhatsAppReply"},"",""] */ __turbopack_context__.s({
    "generateWhatsAppReply": (()=>generateWhatsAppReply)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
/**
 * @fileOverview Flow AI utama untuk WhatsApp Customer Service QLAB.
 * Sekarang menangani semua logika layanan dan menyimpan konteks percakapan di Firestore.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/index.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/v3/types.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/aiSettings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-rsc] (ecmascript) <locals>"); // Import date-fns
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addDays.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cari$2d$size$2d$motor$2d$tool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/tools/cari-size-motor-tool.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$productLookupTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/tools/productLookupTool.ts [app-rsc] (ecmascript)");
// Mengimpor tool object 'cariInfoLayananTool' DAN fungsi 'findLayananByCategory'
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/tools/cariInfoLayananTool.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$createBookingTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/tools/createBookingTool.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
// Skema internal untuk validasi input chat history di flow
const ChatMessageSchemaInternal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["object"])({
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["enum"])([
        'user',
        'model'
    ]),
    content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])()
});
// Skema input utama untuk ZoyaChatFlow (digunakan oleh UI)
const ZoyaChatInputSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["object"])({
    messages: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["array"])(ChatMessageSchemaInternal).optional().describe("Riwayat percakapan lengkap, jika ada."),
    customerMessage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().min(1, "Pesan pelanggan tidak boleh kosong.").describe("Pesan terbaru dari customer."),
    senderNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional().describe("Nomor WhatsApp pengirim (WAJIB untuk session jika mau persisten)."),
    mainPromptString: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional().describe("String prompt utama yang mungkin dikirim dari UI atau diambil dari Firestore."),
    // Tanggal-tanggal ini akan diisi oleh wrapper function
    currentDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional(),
    currentTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional(),
    tomorrowDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional(),
    dayAfterTomorrowDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional(),
    // Input dari UI untuk override/seed sesi. Sesi Firestore akan jadi sumber utama jika ada.
    knownMotorcycleInfo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["object"])({
        name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])(),
        size: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional()
    }).optional().describe("Informasi motor pelanggan jika sudah diketahui dari interaksi sebelumnya atau database."),
    activeSpecificServiceInquiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional().describe("Layanan spesifik yang sedang aktif ditanyakan jika Zoya sebelumnya bertanya tipe motor untuk layanan ini.")
});
// Schema output untuk wrapper function (digunakan oleh UI)
const WhatsAppReplyOutputSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["object"])({
    suggestedReply: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.'),
    sessionActiveSpecificServiceInquiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional(),
    sessionDetectedMotorcycleInfo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["object"])({
        name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])(),
        size: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional()
    }).optional(),
    sessionLastAiInteractionType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional()
});
// Flow utama
const zoyaChatFlow = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineFlow({
    name: 'zoyaChatFlow',
    inputSchema: ZoyaChatInputSchema,
    outputSchema: WhatsAppReplyOutputSchema
}, async (input)=>{
    console.log("[MAIN-FLOW] zoyaChatFlow input:", JSON.stringify(input, null, 2));
    let customerMessageToProcess = input.customerMessage;
    let suggestedReply = "Maaf, Zoya lagi bingung nih.";
    let sessionDataToSave = {};
    let dynamicContextFromPreToolCall = "";
    if (!customerMessageToProcess || customerMessageToProcess.trim() === '') {
        return {
            suggestedReply: "Maaf, Zoya tidak menerima pesan yang jelas."
        };
    }
    if (!input.senderNumber) {
        console.warn("[MAIN-FLOW] WARNING: senderNumber tidak ada di input. Sesi Firestore tidak akan digunakan/disimpan. Konteks hanya dari input.");
    }
    const userId = input.senderNumber || 'anonymous_user';
    const sessionDocRef = input.senderNumber ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'userAiSessions', userId) : null;
    let currentSession = {};
    if (sessionDocRef) {
        try {
            const sessionSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDoc"])(sessionDocRef);
            if (sessionSnap.exists()) {
                currentSession = sessionSnap.data();
                console.log(`[MAIN-FLOW] Sesi ditemukan untuk ${userId}:`, JSON.stringify(currentSession, null, 2));
            }
        } catch (e) {
            console.error(`[MAIN-FLOW] Gagal memuat sesi untuk ${userId}:`, e);
        }
    }
    let knownMotorcycleName = input.knownMotorcycleInfo?.name || currentSession.knownMotorcycleName || "belum diketahui";
    let knownMotorcycleSize = input.knownMotorcycleInfo?.size || currentSession.knownMotorcycleSize || "belum diketahui";
    let activeSpecificServiceInquiry = input.activeSpecificServiceInquiry || currentSession.activeSpecificServiceInquiry || "tidak ada";
    let activeSpecificServiceId = currentSession.activeSpecificServiceId || "tidak ada";
    let lastAiInteractionType = currentSession.lastAiInteractionType || "initial_greeting";
    let pendingBookingDate = currentSession.pendingBookingDate;
    let pendingBookingTime = currentSession.pendingBookingTime;
    const lowerCaseCustomerMessage = customerMessageToProcess.toLowerCase();
    const generalServiceKeywords = [
        "cuci",
        "coating",
        "poles",
        "detailing",
        "repaint",
        "servis",
        "layanan",
        "produk",
        "jual",
        "harga",
        "info",
        "katalog",
        "booking",
        "pesan tempat",
        "jadwal"
    ];
    let detectedGeneralServiceKeyword = null;
    for (const keyword of generalServiceKeywords){
        if (lowerCaseCustomerMessage.includes(keyword)) {
            detectedGeneralServiceKeyword = keyword;
            if (keyword === "cuci" && (lowerCaseCustomerMessage.includes("cuci motor") || lowerCaseCustomerMessage.includes("nyuci"))) detectedGeneralServiceKeyword = "cuci";
            else if (keyword === "coating" && (lowerCaseCustomerMessage.includes("coating motor") || lowerCaseCustomerMessage.includes("laminating"))) detectedGeneralServiceKeyword = "coating";
            else if (keyword === "poles" && (lowerCaseCustomerMessage.includes("poles motor") || lowerCaseCustomerMessage.includes("poles bodi"))) detectedGeneralServiceKeyword = "poles";
            else if (keyword === "detailing" && lowerCaseCustomerMessage.includes("detailing motor")) detectedGeneralServiceKeyword = "detailing";
            else if (keyword === "repaint" && (lowerCaseCustomerMessage.includes("repaint motor") || lowerCaseCustomerMessage.includes("cat motor"))) detectedGeneralServiceKeyword = "repaint";
            else if (keyword === "booking" || keyword === "pesan tempat" || keyword === "jadwal") detectedGeneralServiceKeyword = "booking";
            break;
        }
    }
    console.log("[MAIN-FLOW] Detected general service keyword from user message:", detectedGeneralServiceKeyword);
    if (detectedGeneralServiceKeyword && lastAiInteractionType !== 'asked_for_motor_type_for_specific_service' && lastAiInteractionType !== 'asked_for_paint_type_for_coating' && !lowerCaseCustomerMessage.includes("booking") && !lowerCaseCustomerMessage.includes("pesan tempat") && !lowerCaseCustomerMessage.includes("jadwal")) {
        console.log(`[MAIN-FLOW] Melakukan pre-call findLayananByCategory (fungsi) untuk keyword: "${detectedGeneralServiceKeyword}"`);
        const layananByCategoryResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLayananByCategory"])({
            keyword: detectedGeneralServiceKeyword
        });
        if (layananByCategoryResult && layananByCategoryResult.length > 0) {
            dynamicContextFromPreToolCall = `Informasi layanan untuk kategori '${detectedGeneralServiceKeyword}' dari sistem:\n`;
            layananByCategoryResult.forEach((item)=>{
                dynamicContextFromPreToolCall += `- ${item.name}: ${item.description || 'Tidak ada deskripsi.'} (Harga dasar: Rp ${item.price.toLocaleString('id-ID')}, Estimasi: ${item.estimatedDuration || 'N/A'})\n`;
                if (item.variants && item.variants.length > 0) {
                    dynamicContextFromPreToolCall += `  Varian: ${item.variants.map((v)=>`${v.name} (Rp ${v.price.toLocaleString('id-ID')})`).join(', ')}\n`;
                }
            });
            console.log("[MAIN-FLOW] Pre-call findLayananByCategory berhasil, data dimasukkan ke dynamicContext.");
        } else {
            dynamicContextFromPreToolCall = `Informasi layanan untuk kategori '${detectedGeneralServiceKeyword}' dari sistem: Tidak ditemukan.`;
            console.log("[MAIN-FLOW] Pre-call findLayananByCategory tidak menemukan data.");
        }
    }
    // --- Logika untuk memproses tanggal & jam booking dari pesan user ---
    if (lastAiInteractionType === 'waiting_for_booking_datetime' && customerMessageToProcess) {
        let parsedDate;
        let parsedTime;
        const today = new Date();
        const tomorrow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addDays"])(today, 1);
        const dayAfterTomorrow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addDays"])(today, 2);
        if (lowerCaseCustomerMessage.includes("besok")) {
            parsedDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(tomorrow, 'yyyy-MM-dd');
        } else if (lowerCaseCustomerMessage.includes("lusa")) {
            parsedDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(dayAfterTomorrow, 'yyyy-MM-dd');
        } else if (lowerCaseCustomerMessage.includes("hari ini")) {
            parsedDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(today, 'yyyy-MM-dd');
        }
        const timeMatch = customerMessageToProcess.match(/(\d{1,2})[:.](\d{2})/);
        if (timeMatch) {
            parsedTime = `${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}`;
        } else {
            const jamXMatch = lowerCaseCustomerMessage.match(/jam\s*(\d{1,2})\s*(pagi|siang|sore|malam)?/);
            if (jamXMatch) {
                let hour = parseInt(jamXMatch[1], 10);
                const period = jamXMatch[2];
                if (period === 'siang' && hour < 12) hour += 12;
                else if (period === 'sore' && hour < 12) hour += 12;
                else if (period === 'malam' && hour < 12) hour += 12;
                if (hour >= 0 && hour <= 23) {
                    parsedTime = `${String(hour).padStart(2, '0')}:00`;
                }
            }
        }
        if (parsedDate && parsedTime) {
            sessionDataToSave.pendingBookingDate = parsedDate;
            sessionDataToSave.pendingBookingTime = parsedTime;
            pendingBookingDate = parsedDate;
            pendingBookingTime = parsedTime;
            console.log(`[MAIN-FLOW] Booking date/time parsed: ${parsedDate} ${parsedTime}`);
        } else {
            console.log("[MAIN-FLOW] Gagal parse booking date/time dari user message.");
        }
    }
    const mainPromptFromSettings = input.mainPromptString || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_MAIN_PROMPT_ZOYA"];
    const finalSystemPrompt = mainPromptFromSettings.replace("{{{SESSION_MOTOR_NAME}}}", knownMotorcycleName).replace("{{{SESSION_MOTOR_SIZE}}}", knownMotorcycleSize).replace("{{{SESSION_ACTIVE_SERVICE}}}", activeSpecificServiceInquiry).replace("{{{SESSION_ACTIVE_SERVICE_ID}}}", activeSpecificServiceId).replace("{{{SESSION_LAST_AI_INTERACTION_TYPE}}}", lastAiInteractionType).replace("{{{detectedGeneralServiceKeyword}}}", detectedGeneralServiceKeyword || "tidak ada").replace("{{{dynamicContext}}}", dynamicContextFromPreToolCall || `INFO_UMUM_BENGKEL: QLAB Moto Detailing, Jl. Sukasenang V No.1A, Cikutra, Bandung. Buka 09:00 - 21:00 WIB. Full Detailing hanya untuk cat glossy. Coating beda harga untuk doff & glossy.`).replace("{{{currentDate}}}", input.currentDate || "tidak diketahui").replace("{{{tomorrowDate}}}", input.tomorrowDate || "tidak diketahui").replace("{{{dayAfterTomorrowDate}}}", input.dayAfterTomorrowDate || "tidak diketahui").replace("{{{senderNumber}}}", userId).replace("{{{pendingBookingDate}}}", pendingBookingDate || "belum ada").replace("{{{pendingBookingTime}}}", pendingBookingTime || "belum ada");
    const historyForAI = (input.messages || []).filter((msg)=>msg.content && msg.content.trim() !== '').map((msg)=>({
            role: msg.role,
            content: [
                {
                    text: msg.content
                }
            ]
        }));
    const messagesForAI = [
        ...historyForAI,
        {
            role: 'user',
            content: [
                {
                    text: customerMessageToProcess
                }
            ]
        }
    ];
    console.log(`[MAIN-FLOW] Calling MAIN ai.generate. History Length: ${historyForAI.length}. Prompt snippet: ${finalSystemPrompt.substring(0, 300)}...`);
    sessionDataToSave.lastAiInteractionType = 'general_response';
    try {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].generate({
            model: 'googleai/gemini-1.5-flash-latest',
            prompt: finalSystemPrompt,
            messages: messagesForAI,
            tools: [
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cari$2d$size$2d$motor$2d$tool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cariSizeMotorTool"],
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$productLookupTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductServiceDetailsByNameTool"],
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cariInfoLayananTool"],
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$createBookingTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBookingTool"]
            ],
            toolChoice: 'auto',
            config: {
                temperature: 0.6,
                topP: 0.9
            }
        });
        console.log("[MAIN-FLOW] Raw MAIN AI generate result:", JSON.stringify(result, null, 2));
        suggestedReply = result.text || "";
        const toolRequest = result.toolRequest;
        let interactionTypeAfterTool = sessionDataToSave.lastAiInteractionType;
        let activeServiceAfterTool = activeSpecificServiceInquiry;
        let activeServiceIdAfterTool = activeSpecificServiceId;
        if (toolRequest) {
            console.log("[MAIN-FLOW] MAIN AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
            let toolOutputToRelay = "Error: Tool output tidak diset.";
            if (toolRequest.name === 'cariSizeMotor' && toolRequest.input) {
                toolOutputToRelay = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cari$2d$size$2d$motor$2d$tool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findMotorSize"])(toolRequest.input);
                if (toolOutputToRelay.success && toolOutputToRelay.size && toolOutputToRelay.vehicleModelFound) {
                    knownMotorcycleName = toolOutputToRelay.vehicleModelFound;
                    knownMotorcycleSize = toolOutputToRelay.size;
                    sessionDataToSave.knownMotorcycleName = knownMotorcycleName;
                    sessionDataToSave.knownMotorcycleSize = knownMotorcycleSize;
                    if (lastAiInteractionType === 'asked_for_motor_type_for_specific_service') {
                        interactionTypeAfterTool = 'provided_specific_service_details';
                    } else {
                        interactionTypeAfterTool = 'asked_for_service_after_motor_size';
                    }
                } else {
                    interactionTypeAfterTool = 'asked_for_motor_type_for_specific_service';
                }
            } else if (toolRequest.name === 'getProductServiceDetailsByNameTool' && toolRequest.input) {
                toolOutputToRelay = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$productLookupTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findProductServiceByName"])(toolRequest.input);
                if (toolOutputToRelay?.name && toolOutputToRelay?.id) {
                    activeServiceAfterTool = toolOutputToRelay.name;
                    activeServiceIdAfterTool = toolOutputToRelay.id;
                    interactionTypeAfterTool = 'provided_specific_service_details';
                    sessionDataToSave.activeSpecificServiceInquiry = activeServiceAfterTool;
                    sessionDataToSave.activeSpecificServiceId = activeServiceIdAfterTool;
                }
            } else if (toolRequest.name === 'findLayananByCategory' && toolRequest.input) {
                toolOutputToRelay = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLayananByCategory"])(toolRequest.input);
                if (Array.isArray(toolOutputToRelay) && toolOutputToRelay.length > 0) {
                    interactionTypeAfterTool = 'provided_category_service_list';
                }
            } else if (toolRequest.name === 'createBookingTool' && toolRequest.input) {
                const bookingInput = toolRequest.input;
                if (!bookingInput.serviceId && activeServiceIdAfterTool && activeServiceIdAfterTool !== "tidak ada") {
                    bookingInput.serviceId = activeServiceIdAfterTool;
                    bookingInput.serviceName = activeServiceAfterTool;
                }
                if (!bookingInput.customerPhone && userId !== 'anonymous_user') {
                    bookingInput.customerPhone = userId;
                }
                if (!bookingInput.customerName || bookingInput.customerName.toLowerCase().includes("pelanggan whatsapp")) {
                    bookingInput.customerName = knownMotorcycleName !== "belum diketahui" ? `Pelanggan ${knownMotorcycleName}` : `Pelanggan WhatsApp`;
                }
                toolOutputToRelay = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$createBookingTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBookingTool"].fn(bookingInput);
                interactionTypeAfterTool = 'booking_attempted';
                if (toolOutputToRelay.success) {
                    sessionDataToSave.activeSpecificServiceInquiry = undefined;
                    sessionDataToSave.activeSpecificServiceId = undefined;
                    sessionDataToSave.pendingBookingDate = undefined;
                    sessionDataToSave.pendingBookingTime = undefined;
                }
            }
            sessionDataToSave.lastAiInteractionType = interactionTypeAfterTool;
            if (toolOutputToRelay !== "Error: Tool output tidak diset.") {
                console.log(`[MAIN-FLOW] Output from tool '${toolRequest.name}':`, JSON.stringify(toolOutputToRelay, null, 2));
                const messagesAfterTool = [
                    ...messagesForAI,
                    result.message,
                    {
                        role: 'tool',
                        content: [
                            {
                                toolResponse: {
                                    name: toolRequest.name,
                                    output: toolOutputToRelay
                                }
                            }
                        ]
                    }
                ];
                const promptForSecondCall = mainPromptFromSettings.replace("{{{SESSION_MOTOR_NAME}}}", knownMotorcycleName).replace("{{{SESSION_MOTOR_SIZE}}}", knownMotorcycleSize).replace("{{{SESSION_ACTIVE_SERVICE}}}", activeServiceAfterTool).replace("{{{SESSION_ACTIVE_SERVICE_ID}}}", activeServiceIdAfterTool).replace("{{{SESSION_LAST_AI_INTERACTION_TYPE}}}", interactionTypeAfterTool).replace("{{{dynamicContext}}}", dynamicContextFromPreToolCall || "Tidak ada info tambahan dari sistem.").replace("{{{currentDate}}}", input.currentDate || "tidak diketahui").replace("{{{tomorrowDate}}}", input.tomorrowDate || "tidak diketahui").replace("{{{dayAfterTomorrowDate}}}", input.dayAfterTomorrowDate || "tidak diketahui").replace("{{{senderNumber}}}", userId).replace("{{{pendingBookingDate}}}", sessionDataToSave.pendingBookingDate || pendingBookingDate || "belum ada").replace("{{{pendingBookingTime}}}", sessionDataToSave.pendingBookingTime || pendingBookingTime || "belum ada");
                const modelResponseAfterTool = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].generate({
                    model: 'googleai/gemini-1.5-flash-latest',
                    prompt: promptForSecondCall,
                    messages: messagesAfterTool,
                    config: {
                        temperature: 0.6,
                        topP: 0.9
                    },
                    tools: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cari$2d$size$2d$motor$2d$tool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cariSizeMotorTool"],
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$productLookupTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductServiceDetailsByNameTool"],
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cariInfoLayananTool"],
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$createBookingTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBookingTool"]
                    ],
                    toolChoice: 'auto'
                });
                suggestedReply = modelResponseAfterTool.text || `Zoya dapet info dari alat ${toolRequest.name}, tapi bingung mau ngomong apa.`;
                if (modelResponseAfterTool.toolRequest) {
                    console.warn("[MAIN-FLOW] AI requested another tool after a tool response. This is not deeply handled yet. Returning current text.");
                }
                const lowerFinalReply = suggestedReply.toLowerCase();
                if (lowerFinalReply.includes("tanggal") && lowerFinalReply.includes("jam") && (interactionTypeAfterTool === 'provided_specific_service_details' || interactionTypeAfterTool === 'ready_for_booking_details')) {
                    sessionDataToSave.lastAiInteractionType = 'waiting_for_booking_datetime';
                } else if ((lowerFinalReply.includes("catatan tambahan") || lowerFinalReply.includes("ada lagi yang bisa dibantu?")) && (interactionTypeAfterTool === 'waiting_for_booking_datetime' || lastAiInteractionType === 'waiting_for_booking_datetime')) {
                    sessionDataToSave.lastAiInteractionType = 'waiting_for_booking_notes';
                }
            }
        } else if (suggestedReply) {
            const finishReason = result.finishReason;
            console.log(`[MAIN-FLOW] MAIN AI Finish Reason (no tool): ${finishReason}`);
            if (!suggestedReply && finishReason !== "stop") {
                console.error(`[MAIN-FLOW] ❌ MAIN AI generation failed or no text output. Finish Reason: ${finishReason}.`);
                suggestedReply = "Maaf, Zoya lagi agak bingung nih boskuu. Coba tanya lagi dengan cara lain ya.";
            } else {
                const lowerReply = suggestedReply.toLowerCase();
                if (lowerReply.includes("tipe motornya apa") || lowerReply.includes("motornya apa") || lowerReply.includes("jenis motornya")) {
                    sessionDataToSave.lastAiInteractionType = 'asked_for_motor_type_for_specific_service';
                    const serviceMentionedInUser = await extractServiceNameFromUserMessage(customerMessageToProcess, await getAllServiceNamesAndIds());
                    if (serviceMentionedInUser && activeSpecificServiceInquiry === "tidak ada") {
                        sessionDataToSave.activeSpecificServiceInquiry = serviceMentionedInUser.name;
                        sessionDataToSave.activeSpecificServiceId = serviceMentionedInUser.id;
                        activeSpecificServiceInquiry = serviceMentionedInUser.name;
                        activeSpecificServiceId = serviceMentionedInUser.id;
                    }
                } else if (lowerReply.includes("catnya glossy atau doff") && (activeSpecificServiceInquiry.toLowerCase().includes("coating") || customerMessageToProcess.toLowerCase().includes("coating"))) {
                    sessionDataToSave.lastAiInteractionType = 'asked_for_paint_type_for_coating';
                    if (activeSpecificServiceInquiry === "tidak ada" && customerMessageToProcess.toLowerCase().includes("coating")) {
                        const coatingService = (await getAllServiceNamesAndIds()).find((s)=>s.name.toLowerCase().includes("coating"));
                        if (coatingService) {
                            sessionDataToSave.activeSpecificServiceInquiry = coatingService.name;
                            sessionDataToSave.activeSpecificServiceId = coatingService.id;
                            activeSpecificServiceInquiry = coatingService.name;
                            activeSpecificServiceId = coatingService.id;
                        }
                    }
                } else if ((lowerReply.includes("mau dibookingin") || lowerReply.includes("mau dijadwalin")) && activeSpecificServiceInquiry !== "tidak ada") {
                    sessionDataToSave.lastAiInteractionType = 'ready_for_booking_details';
                } else if (lowerReply.includes("tanggal") && lowerReply.includes("jam") && (lastAiInteractionType === 'ready_for_booking_details' || lastAiInteractionType === 'provided_specific_service_details' || lastAiInteractionType === 'asked_for_service_after_motor_size')) {
                    sessionDataToSave.lastAiInteractionType = 'waiting_for_booking_datetime';
                } else if ((lowerReply.includes("catatan tambahan") || lowerReply.includes("ada lagi yang bisa dibantu?")) && lastAiInteractionType === 'waiting_for_booking_datetime') {
                    sessionDataToSave.lastAiInteractionType = 'waiting_for_booking_notes';
                } else if (lowerReply.includes("booking lo udah zoya catet") || lowerReply.includes("booking berhasil") || lowerReply.includes("udah zoya bikinin jadwalnya") || lowerReply.includes("udah zoya bookingin")) {
                    sessionDataToSave.lastAiInteractionType = 'booking_attempted';
                    if (lowerReply.includes("berhasil") || lowerReply.includes("udah zoya catet")) {
                        sessionDataToSave.activeSpecificServiceInquiry = undefined;
                        sessionDataToSave.activeSpecificServiceId = undefined;
                        sessionDataToSave.pendingBookingDate = undefined;
                        sessionDataToSave.pendingBookingTime = undefined;
                        sessionDataToSave.lastAiInteractionType = 'general_response';
                    }
                } else if (lowerReply.includes("pilihan layanan") || lowerReply.includes("daftar layanan")) {
                    sessionDataToSave.lastAiInteractionType = 'provided_category_service_list';
                } else if (lowerReply.includes("harga") && (knownMotorcycleName !== "belum diketahui" || activeSpecificServiceInquiry !== "tidak ada")) {
                    sessionDataToSave.lastAiInteractionType = 'provided_specific_service_details';
                } else if (lowerReply.includes("halo") || lowerReply.includes("ada yang bisa dibantu")) {
                    sessionDataToSave.lastAiInteractionType = 'initial_greeting';
                }
            }
        } else {
            console.error(`[MAIN-FLOW] ❌ No tool request and no text output from MAIN AI. Result: ${JSON.stringify(result, null, 2)}`);
            suggestedReply = "Waduh, Zoya lagi nggak bisa jawab nih. Coba lagi ya.";
        }
        if (sessionDocRef) {
            const finalSessionDataToSave = {
                userId: userId,
                knownMotorcycleName: knownMotorcycleName !== "belum diketahui" ? knownMotorcycleName : currentSession.knownMotorcycleName,
                knownMotorcycleSize: knownMotorcycleSize !== "belum diketahui" ? knownMotorcycleSize : currentSession.knownMotorcycleSize,
                activeSpecificServiceInquiry: sessionDataToSave.activeSpecificServiceInquiry !== undefined ? sessionDataToSave.activeSpecificServiceInquiry : activeSpecificServiceInquiry,
                activeSpecificServiceId: sessionDataToSave.activeSpecificServiceId !== undefined ? sessionDataToSave.activeSpecificServiceId : activeSpecificServiceId,
                pendingBookingDate: sessionDataToSave.pendingBookingDate !== undefined ? sessionDataToSave.pendingBookingDate : pendingBookingDate,
                pendingBookingTime: sessionDataToSave.pendingBookingTime !== undefined ? sessionDataToSave.pendingBookingTime : pendingBookingTime,
                lastAiInteractionType: sessionDataToSave.lastAiInteractionType || lastAiInteractionType,
                lastUpdatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            };
            Object.keys(finalSessionDataToSave).forEach((keyStr)=>{
                const key = keyStr;
                if (finalSessionDataToSave[key] === undefined) {
                    delete finalSessionDataToSave[key];
                }
            });
            console.log(`[MAIN-FLOW] Menyimpan sesi untuk ${userId}:`, JSON.stringify(finalSessionDataToSave, null, 2));
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setDoc"])(sessionDocRef, finalSessionDataToSave, {
                merge: true
            });
        }
        return {
            suggestedReply,
            sessionActiveSpecificServiceInquiry: sessionDataToSave.activeSpecificServiceInquiry !== undefined ? sessionDataToSave.activeSpecificServiceInquiry : activeSpecificServiceInquiry !== "tidak ada" ? activeSpecificServiceInquiry : undefined,
            sessionDetectedMotorcycleInfo: knownMotorcycleName !== "belum diketahui" ? {
                name: knownMotorcycleName,
                size: knownMotorcycleSize !== "belum diketahui" ? knownMotorcycleSize : undefined
            } : undefined,
            sessionLastAiInteractionType: sessionDataToSave.lastAiInteractionType || lastAiInteractionType
        };
    } catch (flowError) {
        console.error("[MAIN-FLOW] ❌ Critical error dalam MAIN zoyaChatFlow:", flowError);
        if (flowError.cause) console.error("[MAIN-FLOW] Error Cause:", JSON.stringify(flowError.cause, null, 2));
        return {
            suggestedReply: `Waduh, Zoya lagi error nih, boskuu. Coba tanya lagi nanti ya. (Error: ${flowError.message || 'Kesalahan internal'})`
        };
    }
});
async function getAllServiceNamesAndIds() {
    try {
        const items = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLayananByCategory"])({
            keyword: "cuci"
        });
        const items2 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLayananByCategory"])({
            keyword: "poles"
        });
        const items3 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLayananByCategory"])({
            keyword: "coating"
        });
        const items4 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLayananByCategory"])({
            keyword: "detailing"
        });
        const allItems = [
            ...items,
            ...items2,
            ...items3,
            ...items4
        ];
        const uniqueItems = Array.from(new Map(allItems.map((item)=>[
                item.id,
                item
            ])).values());
        if (Array.isArray(uniqueItems)) {
            return uniqueItems.map((i)=>({
                    id: i.id,
                    name: i.name
                })).filter((i)=>i.id && i.name);
        }
        return [];
    } catch (e) {
        console.error("Error in getAllServiceNamesAndIds:", e);
        return [];
    }
}
async function extractServiceNameFromUserMessage(userMessage, services) {
    const lowerUserMessage = userMessage.toLowerCase();
    const sortedServices = [
        ...services
    ].sort((a, b)=>b.name.length - a.name.length);
    for (const service of sortedServices){
        if (service.name && lowerUserMessage.includes(service.name.toLowerCase())) {
            return service;
        }
    }
    return undefined;
}
async function generateWhatsAppReply(input) {
    console.log("[MAIN-FLOW Wrapper] generateWhatsAppReply input:", JSON.stringify(input, null, 2));
    let mainPromptToUse = input.mainPromptString;
    if (!mainPromptToUse && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"] && input.senderNumber) {
        try {
            const settingsDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'appSettings', 'aiAgentConfig');
            const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDoc"])(settingsDocRef);
            if (docSnap.exists() && docSnap.data()?.mainPrompt) {
                mainPromptToUse = docSnap.data().mainPrompt;
                console.log("[MAIN-FLOW Wrapper]: Using mainPromptString from Firestore.");
            } else {
                mainPromptToUse = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_MAIN_PROMPT_ZOYA"];
                console.log("[MAIN-FLOW Wrapper]: Using DEFAULT_MAIN_PROMPT_ZOYA (Firestore doc not found or no mainPrompt).");
            }
        } catch (error) {
            console.error("[MAIN-FLOW Wrapper]: Error fetching mainPrompt from Firestore. Using default.", error);
            mainPromptToUse = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_MAIN_PROMPT_ZOYA"];
        }
    } else if (!mainPromptToUse) {
        mainPromptToUse = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_MAIN_PROMPT_ZOYA"];
        console.log("[MAIN-FLOW Wrapper]: Using DEFAULT_MAIN_PROMPT_ZOYA (db or senderNumber not available for Firestore fetch, or prompt already provided).");
    } else {
        console.log("[MAIN-FLOW Wrapper]: Using mainPromptString directly from input.");
    }
    const today = new Date();
    const flowInput = {
        ...input,
        messages: input.messages || [],
        mainPromptString: mainPromptToUse,
        currentDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(today, 'yyyy-MM-dd'),
        currentTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(today, 'HH:mm'),
        tomorrowDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addDays"])(today, 1), 'yyyy-MM-dd'),
        dayAfterTomorrowDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addDays"])(today, 2), 'yyyy-MM-dd')
    };
    try {
        const result = await zoyaChatFlow(flowInput);
        return result;
    } catch (error) {
        console.error("[MAIN-FLOW Wrapper] Error running zoyaChatFlow:", error);
        return {
            suggestedReply: `Maaf, Zoya sedang ada kendala teknis. (${error.message || 'Tidak diketahui'})`
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    generateWhatsAppReply
]);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__8ffe0104._.js.map