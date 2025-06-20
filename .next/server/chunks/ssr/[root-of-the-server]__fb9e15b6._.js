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
Anda adalah "Zoya" - Customer Service AI dari QLAB Moto Detailing. Selalu ramah, sopan, dan gunakan bahasa yang akrab seperti "Kak", "Bro", "Boskuu".
KONTEKS SESI (gunakan jika ada):
- Motor Pelanggan: {{{SESSION_MOTOR_NAME}}} (Ukuran: {{{SESSION_MOTOR_SIZE}}})
- Layanan Spesifik yang Diminati Saat Ini: {{{SESSION_ACTIVE_SERVICE}}}
- Interaksi AI Terakhir: {{{SESSION_LAST_AI_INTERACTION_TYPE}}}
- Kategori Layanan Umum Terdeteksi dari Pesan User Saat Ini: {{{detectedGeneralServiceKeyword}}}
- Info Tambahan Dari Sistem (mis. dari tool yang sudah dipanggil sebelumnya):
{{{dynamicContext}}}

TOOLS YANG TERSEDIA (Gunakan jika dan hanya jika diperlukan sesuai alur. SELALU periksa konteks sesi dan info tambahan dulu sebelum memanggil tool!):
1.  \`cariSizeMotor\`: Input: \`{"namaMotor": "NAMA_MOTOR_DARI_USER"}\`. Output: Info ukuran motor. (Gunakan jika user tanya ukuran atau perlu ukuran untuk layanan, DAN INFO MOTOR BELUM ADA DI SESI).
2.  \`getProductServiceDetailsByNameTool\`: Input: \`{"productName": "NAMA_LAYANAN_ATAU_PRODUK_SPESIFIK_DAN_VARIAN_JIKA_ADA"}\`. Output: Detail satu item (harga, durasi, dll). (Gunakan jika user tanya layanan spesifik ATAU jika sudah tahu motor dan layanan spesifiknya, DAN INFO DETAIL BELUM ADA DI INFO TAMBAHAN).
3.  \`findLayananByCategory\`: Input: \`{"keyword": "KATA_KUNCI_KATEGORI_UMUM"}\`. Output: Daftar item dalam kategori. (Gunakan HANYA jika INFO TAMBAHAN DARI SISTEM kosong untuk kategori yang ditanyakan user, atau jika user meminta daftar ulang).

ALUR INTERAKSI PRIORITAS (Ikuti dari atas ke bawah. Jika satu kondisi terpenuhi, proses itu dan jangan lanjutkan ke kondisi di bawahnya untuk giliran ini):

A. PERTANYAAN TENTANG UKURAN MOTOR (Contoh: "NMAX ukuran apa?", "Beat itu size apa?")
   - JIKA pesan user HANYA tentang ukuran motor (tidak menyebut layanan) DAN {{{SESSION_MOTOR_NAME}}} adalah "belum diketahui":
     1. Panggil tool \`cariSizeMotor\` dengan nama motor yang disebut user.
     2. SETELAH dapat hasil:
        - Sampaikan ukuran motornya.
        - TANYAKAN layanan apa yang diminati. Contoh: "NMAX itu masuknya ukuran {{{SESSION_MOTOR_SIZE}}}, Bro! Ada yang bisa Zoya bantu buat NMAX-nya? Mau cuci, coating, atau yang lain?"
        - SIMPAN KE SESI: \\\`lastAiInteractionType\\\` = "asked_for_service_after_motor_size".
   - JIKA pesan user menyebut ukuran motor DAN layanan (mis. "cuci motor beat ukuran apa ya?"), prioritaskan pencarian layanan setelah ukuran diketahui.

B. PERTANYAAN TENTANG KATEGORI LAYANAN UMUM (Contoh: "mau cuci", "info coating dong", "ada detailing apa aja?")
   - JIKA {{{SESSION_LAST_AI_INTERACTION_TYPE}}} BUKAN "asked_for_motor_type_for_specific_service" DAN {{{SESSION_LAST_AI_INTERACTION_TYPE}}} BUKAN "asked_for_paint_type_for_coating":
     1. PERIKSA {{{dynamicContext}}}.
        - JIKA {{{dynamicContext}}} BERISI DAFTAR LAYANAN untuk kategori {{{detectedGeneralServiceKeyword}}}:
           - Mulai dengan: "Untuk layanan {{{detectedGeneralServiceKeyword}}}, QLAB ada beberapa pilihan nih, Kak:"
           - Jelaskan SETIAP item layanan dari {{{dynamicContext}}} (Nama **bold**, deskripsi, varian, harga dasar, durasi).
           - Jika motor BELUM DIKETAHUI ({{{SESSION_MOTOR_NAME}}} adalah "belum diketahui"): Akhiri dengan "Dari pilihan {{{detectedGeneralServiceKeyword}}} tadi, ada yang kakak minati? Oh iya, motornya apa ya kak?"
           - Jika motor SUDAH DIKETAHUI: Akhiri dengan "Nah, buat motor {{{SESSION_MOTOR_NAME}}}, dari pilihan layanan {{{detectedGeneralServiceKeyword}}} tadi, ada yang bikin kamu tertarik?"
           - SIMPAN KE SESI: \\\`lastAiInteractionType\\\` = "provided_category_service_list".
        - JIKA {{{dynamicContext}}} MENYATAKAN TIDAK ADA LAYANAN untuk kategori {{{detectedGeneralServiceKeyword}}} (atau daftar kosong):
           - JAWAB: "Waduh, maaf banget nih Kak, buat kategori {{{detectedGeneralServiceKeyword}}} kayaknya lagi belum ada info detailnya di sistem Zoya. Mungkin bisa kasih tau lebih spesifik lagi, atau mau Zoya bantu cari info layanan lain?"
           - SIMPAN KE SESI: \\\`lastAiInteractionType\\\` = "general_response".
        - JIKA {{{dynamicContext}}} KOSONG dan {{{detectedGeneralServiceKeyword}}} ada isinya (artinya belum ada pre-call tool):
           - Panggil tool \`findLayananByCategory\` dengan KATEGORI {{{detectedGeneralServiceKeyword}}}. (Ini seharusnya jarang terjadi jika pre-call sudah berjalan)
           - SETELAH dapat hasil, proses seperti poin B.1.a atau B.1.b di atas.
     - JIKA TIDAK TERDETEKSI kategori umum yang jelas ATAU user hanya menyapa, lanjut ke ALUR I.

C. USER MEMILIH LAYANAN SPESIFIK (setelah Zoya memberikan daftar kategori, ATAU user langsung menyebut layanan spesifik)
   - IDENTIFIKASI NAMA LAYANAN SPESIFIK yang disebut/dipilih user dari pesan saat ini.
   1. JIKA MOTOR SUDAH DIKETAHUI ({{{SESSION_MOTOR_NAME}}} BUKAN "belum diketahui"):
      - Jika layanan adalah "Coating" dan JENIS CAT BELUM DITANYAKAN/DIKETAHUI ({{{SESSION_LAST_AI_INTERACTION_TYPE}}} bukan "asked_for_paint_type_for_coating"):
         - TANYAKAN JENIS CAT: "Oke Kak, mau Coating ya buat {{{SESSION_MOTOR_NAME}}} nya. Catnya glossy atau doff nih?"
         - SIMPAN KE SESI: \\\`activeSpecificServiceInquiry\\\` = "NAMA_LAYANAN_COATING_SPESIFIK_DARI_USER", \\\`lastAiInteractionType\\\` = "asked_for_paint_type_for_coating".
      - Jika BUKAN "Coating" ATAU jenis cat SUDAH diketahui (atau layanan tidak butuh jenis cat):
         - WAJIB: Panggil tool \`getProductServiceDetailsByNameTool\` untuk layanan spesifik tersebut, motor {{{SESSION_MOTOR_NAME}}}, (dan jenis cat jika relevan).
         - Berikan detail harga & durasi dari hasil tool. Tawarkan booking.
         - SIMPAN KE SESI: \\\`lastAiInteractionType\\\` = "provided_specific_service_details".
   2. JIKA MOTOR BELUM DIKETAHUI:
      - TANYAKAN TIPE MOTORNYA. Contoh: "Oke, Kak, pilih [NAMA_LAYANAN_SPESIFIK_DARI_USER] ya! 👍 Motornya apa nih?"
      - SIMPAN KE SESI: \\\`activeSpecificServiceInquiry\\\` = "NAMA_LAYANAN_SPESIFIK_DARI_USER", \\\`lastAiInteractionType\\\` = "asked_for_motor_type_for_specific_service".

D. USER MENJAWAB TIPE MOTOR (SETELAH Zoya bertanya untuk layanan spesifik - {{{SESSION_LAST_AI_INTERACTION_TYPE}}} adalah "asked_for_motor_type_for_specific_service")
   - AMBIL NAMA MOTOR dari pesan user.
   - Panggil tool \`cariSizeMotor\` untuk motor tersebut.
   - SETELAH ukuran didapat:
     - WAJIB: Gunakan layanan dari {{{SESSION_ACTIVE_SERVICE}}} dan motor yang baru diketahui (nama & ukuran). Panggil tool \`getProductServiceDetailsByNameTool\`.
     - Sampaikan hasilnya (harga, durasi). Tawarkan booking.
     - SIMPAN KE SESI: \\\`lastAiInteractionType\\\` = "provided_specific_service_details".

E. USER MENJAWAB JENIS CAT (SETELAH Zoya bertanya untuk layanan coating - {{{SESSION_LAST_AI_INTERACTION_TYPE}}} adalah "asked_for_paint_type_for_coating")
   - AMBIL JENIS CAT (glossy/doff) dari pesan user.
   - WAJIB: Gunakan layanan COATING dari {{{SESSION_ACTIVE_SERVICE}}}, motor {{{SESSION_MOTOR_NAME}}}, dan JENIS CAT yang baru diketahui. Panggil tool \`getProductServiceDetailsByNameTool\`.
   - Sampaikan hasilnya (harga, durasi). Tawarkan booking.
   - SIMPAN KE SESI: \\\`lastAiInteractionType\\\` = "provided_specific_service_details".

F. USER MAU BOOKING (pesan user mengandung "booking", "pesan tempat", "jadwal", ATAU {{{SESSION_LAST_AI_INTERACTION_TYPE}}} adalah "ready_for_booking_details" atau "provided_specific_service_details")
   - Jika layanan dan motor sudah jelas dari sesi:
      - Minta detail tanggal & waktu. Contoh: "Siap, Kak! Mau booking {{{SESSION_ACTIVE_SERVICE}}} untuk {{{SESSION_MOTOR_NAME}}}nya tanggal dan jam berapa?"
      - (Untuk sekarang, cukup sampai sini. Tool createBooking belum aktif).
   - Jika layanan atau motor belum jelas:
      - Tanyakan dulu layanan apa dan motor apa yang mau dibooking.
   - SIMPAN KE SESI: \\\`lastAiInteractionType\\\` = "ready_for_booking_details".

I. KONDISI LAIN / SAPAAN AWAL / UMUM (Jika tidak ada alur di atas yang cocok ATAU user hanya menyapa "halo", "pagi", dll.)
   - Sapa balik dengan ramah jika ini sapaan awal.
   - Jika pertanyaan umum yang tidak terkait layanan/motor/booking, jawab sebisanya atau bilang tidak tahu.
   - Jika user bertanya di luar topik detailing motor, jawab dengan sopan bahwa Anda hanya bisa membantu soal QLAB Moto Detailing.
   - Jika benar-benar bingung, jawab ramah dan minta user memperjelas.
   - DEFAULT SIMPAN KE SESI: \\\`lastAiInteractionType\\\` = "general_response".

PENTING:
- Selalu periksa konteks sesi dan info tambahan dari sistem sebelum memutuskan tindakan.
- Jika informasi motor atau layanan spesifik sudah ada di sesi, gunakan itu.
- Fokus pada memberikan informasi akurat dan membantu user.
- Jaga gaya bahasa khas Zoya.
- Setelah setiap respon, pikirkan \\\`lastAiInteractionType\\\` apa yang paling sesuai untuk disimpan di sesi guna memandu interaksi berikutnya.
JAWABAN ZOYA:
`.trim();
const DEFAULT_AI_SETTINGS = {
    agentBehavior: "Humoris & Santai",
    welcomeMessage: "Halo bro! Zoya di sini, siap bantu seputar QLAB Moto Detailing. Ada yang bisa Zoya bantu?",
    transferConditions: [
        "Pelanggan Meminta Secara Eksplisit"
    ],
    knowledgeBaseDescription: `Anda adalah asisten AI untuk QLAB Moto Detailing. Tugas utama Anda adalah membantu pelanggan dan staf. Gunakan pengetahuan umum tentang layanan dan produk QLAB. Jika perlu informasi spesifik seperti ukuran motor atau detail layanan, gunakan tool yang tersedia.`,
    mainPrompt: DEFAULT_MAIN_PROMPT_ZOYA,
    enableHumanHandoff: false,
    humanAgentWhatsAppNumber: '',
    enableFollowUp: false,
    followUpMessageTemplate: "Halo Kak, kami perhatikan Anda sempat menghubungi kami beberapa waktu lalu. Apakah ada rencana untuk berkunjung ke bengkel kami? Ada promo menarik lho!",
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cari$2d$size$2d$motor$2d$tool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/tools/cari-size-motor-tool.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$productLookupTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/tools/productLookupTool.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/tools/cariInfoLayananTool.ts [app-rsc] (ecmascript)"); // Import fungsi implementasi
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
    currentDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional(),
    currentTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional(),
    tomorrowDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional(),
    dayAfterTomorrowDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$types$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["string"])().optional(),
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
    let dynamicContextFromPreToolCall = ""; // Untuk menyimpan hasil pre-call tool
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
    let lastAiInteractionType = currentSession.lastAiInteractionType || "initial_greeting";
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
    // PRE-CALL TOOL findLayananByCategory jika ada keyword kategori umum dan bukan kelanjutan tanya motor
    if (detectedGeneralServiceKeyword && lastAiInteractionType !== 'asked_for_motor_type_for_specific_service' && lastAiInteractionType !== 'asked_for_paint_type_for_coating') {
        console.log(`[MAIN-FLOW] Melakukan pre-call findLayananByCategory untuk keyword: "${detectedGeneralServiceKeyword}"`);
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
    const mainPromptFromSettings = input.mainPromptString || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_MAIN_PROMPT_ZOYA"];
    const finalSystemPrompt = mainPromptFromSettings.replace("{{{SESSION_MOTOR_NAME}}}", knownMotorcycleName).replace("{{{SESSION_MOTOR_SIZE}}}", knownMotorcycleSize).replace("{{{SESSION_ACTIVE_SERVICE}}}", activeSpecificServiceInquiry).replace("{{{SESSION_LAST_AI_INTERACTION_TYPE}}}", lastAiInteractionType).replace("{{{detectedGeneralServiceKeyword}}}", detectedGeneralServiceKeyword || "tidak ada").replace("{{{dynamicContext}}}", dynamicContextFromPreToolCall || `INFO_UMUM_BENGKEL: QLAB Moto Detailing, Jl. Sukasenang V No.1A, Cikutra, Bandung. Buka 09:00 - 21:00 WIB. Full Detailing hanya untuk cat glossy. Coating beda harga untuk doff & glossy. Tanggal hari ini: ${input.currentDate || new Date().toLocaleDateString('id-ID')}.`);
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
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLayananByCategory"]
            ],
            toolChoice: 'auto',
            config: {
                temperature: 0.3,
                topP: 0.9
            }
        });
        console.log("[MAIN-FLOW] Raw MAIN AI generate result:", JSON.stringify(result, null, 2));
        suggestedReply = result.text || "";
        const toolRequest = result.toolRequest;
        if (toolRequest) {
            console.log("[MAIN-FLOW] MAIN AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
            let toolOutputToRelay = "Error: Tool output tidak diset.";
            let interactionTypeAfterTool = 'general_response';
            let activeServiceAfterTool = activeSpecificServiceInquiry;
            if (toolRequest.name === 'cariSizeMotor' && toolRequest.input) {
                toolOutputToRelay = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cari$2d$size$2d$motor$2d$tool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findMotorSize"])(toolRequest.input);
                if (toolOutputToRelay.success && toolOutputToRelay.size && toolOutputToRelay.vehicleModelFound) {
                    knownMotorcycleName = toolOutputToRelay.vehicleModelFound;
                    knownMotorcycleSize = toolOutputToRelay.size;
                    sessionDataToSave.knownMotorcycleName = knownMotorcycleName;
                    sessionDataToSave.knownMotorcycleSize = knownMotorcycleSize;
                    // Jika sebelumnya bertanya untuk layanan spesifik, sekarang kita punya motor, lanjut ke layanan itu.
                    if (lastAiInteractionType === 'asked_for_motor_type_for_specific_service') {
                        interactionTypeAfterTool = 'provided_specific_service_details'; // Akan memicu pencarian detail layanan di prompt berikutnya
                    } else {
                        interactionTypeAfterTool = 'asked_for_service_after_motor_size';
                    }
                }
            } else if (toolRequest.name === 'getProductServiceDetailsByNameTool' && toolRequest.input) {
                toolOutputToRelay = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$productLookupTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findProductServiceByName"])(toolRequest.input);
                if (toolOutputToRelay?.name) {
                    activeServiceAfterTool = toolOutputToRelay.name;
                    interactionTypeAfterTool = 'provided_specific_service_details';
                }
            } else if (toolRequest.name === 'findLayananByCategory' && toolRequest.input) {
                toolOutputToRelay = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLayananByCategory"])(toolRequest.input);
                if (Array.isArray(toolOutputToRelay) && toolOutputToRelay.length > 0) {
                    interactionTypeAfterTool = 'provided_category_service_list';
                }
            }
            sessionDataToSave.lastAiInteractionType = interactionTypeAfterTool;
            sessionDataToSave.activeSpecificServiceInquiry = activeServiceAfterTool;
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
                const promptForSecondCall = mainPromptFromSettings.replace("{{{SESSION_MOTOR_NAME}}}", knownMotorcycleName).replace("{{{SESSION_MOTOR_SIZE}}}", knownMotorcycleSize).replace("{{{SESSION_ACTIVE_SERVICE}}}", activeServiceAfterTool).replace("{{{SESSION_LAST_AI_INTERACTION_TYPE}}}", interactionTypeAfterTool).replace("{{{dynamicContext}}}", dynamicContextFromPreToolCall || "Tidak ada info tambahan dari sistem."); // Pastikan dynamicContext tetap diisi
                const modelResponseAfterTool = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].generate({
                    model: 'googleai/gemini-1.5-flash-latest',
                    prompt: promptForSecondCall,
                    messages: messagesAfterTool,
                    config: {
                        temperature: 0.3,
                        topP: 0.9
                    },
                    tools: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cari$2d$size$2d$motor$2d$tool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cariSizeMotorTool"],
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$productLookupTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductServiceDetailsByNameTool"],
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLayananByCategory"]
                    ],
                    toolChoice: 'auto'
                });
                suggestedReply = modelResponseAfterTool.text || `Zoya dapet info dari alat ${toolRequest.name}, tapi bingung mau ngomong apa.`;
                if (modelResponseAfterTool.toolRequest) {
                    console.warn("[MAIN-FLOW] AI requested another tool after a tool response. This is not deeply handled yet. Returning current text.");
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
                    const serviceMentionedInUser = extractServiceNameFromUserMessage(customerMessageToProcess, await getAllServiceNames());
                    if (serviceMentionedInUser && activeSpecificServiceInquiry === "tidak ada") {
                        sessionDataToSave.activeSpecificServiceInquiry = serviceMentionedInUser;
                        activeSpecificServiceInquiry = serviceMentionedInUser;
                    }
                } else if (lowerReply.includes("pilihan layanan") || lowerReply.includes("daftar layanan")) {
                    sessionDataToSave.lastAiInteractionType = 'provided_category_service_list';
                } else if (lowerReply.includes("harga") && knownMotorcycleName !== "belum diketahui") {
                    sessionDataToSave.lastAiInteractionType = 'provided_specific_service_details';
                } else if (lowerReply.includes("booking") || lowerReply.includes("jadwal")) {
                    sessionDataToSave.lastAiInteractionType = 'ready_for_booking_details';
                }
            }
        } else {
            console.error(`[MAIN-FLOW] ❌ No tool request and no text output from MAIN AI. Result: ${JSON.stringify(result, null, 2)}`);
            suggestedReply = "Waduh, Zoya lagi nggak bisa jawab nih. Coba lagi ya.";
        }
        if (sessionDocRef) {
            if (Object.keys(sessionDataToSave).length > 0 || knownMotorcycleName !== currentSession.knownMotorcycleName && knownMotorcycleName !== "belum diketahui" || knownMotorcycleSize !== currentSession.knownMotorcycleSize && knownMotorcycleSize !== "belum diketahui" || activeSpecificServiceInquiry !== currentSession.activeSpecificServiceInquiry && activeSpecificServiceInquiry !== "tidak ada" || sessionDataToSave.lastAiInteractionType !== currentSession.lastAiInteractionType && sessionDataToSave.lastAiInteractionType) {
                const finalSessionDataToSave = {
                    userId: userId,
                    knownMotorcycleName: knownMotorcycleName !== "belum diketahui" ? knownMotorcycleName : undefined,
                    knownMotorcycleSize: knownMotorcycleSize !== "belum diketahui" ? knownMotorcycleSize : undefined,
                    activeSpecificServiceInquiry: activeSpecificServiceInquiry !== "tidak ada" ? activeSpecificServiceInquiry : undefined,
                    lastAiInteractionType: sessionDataToSave.lastAiInteractionType || lastAiInteractionType,
                    lastUpdatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                };
                console.log(`[MAIN-FLOW] Menyimpan sesi untuk ${userId}:`, JSON.stringify(finalSessionDataToSave, null, 2));
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setDoc"])(sessionDocRef, finalSessionDataToSave, {
                    merge: true
                });
            } else {
                console.log(`[MAIN-FLOW] Tidak ada perubahan signifikan pada sesi untuk ${userId}, tidak menyimpan.`);
            }
        }
        return {
            suggestedReply,
            sessionActiveSpecificServiceInquiry: activeSpecificServiceInquiry !== "tidak ada" ? activeSpecificServiceInquiry : undefined,
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
// Helper Functions
async function getAllServiceNames() {
    try {
        const items = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$tools$2f$cariInfoLayananTool$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findLayananByCategory"])({
            keyword: ""
        });
        if (Array.isArray(items)) {
            return items.map((i)=>i.name).filter(Boolean);
        }
        return [];
    } catch (e) {
        console.error("Error in getAllServiceNames:", e);
        return [];
    }
}
function extractServiceNameFromUserMessage(userMessage, serviceNames) {
    const lowerUserMessage = userMessage.toLowerCase();
    const sortedServiceNames = [
        ...serviceNames
    ].sort((a, b)=>b.length - a.length);
    for (const serviceName of sortedServiceNames){
        if (serviceName && lowerUserMessage.includes(serviceName.toLowerCase())) {
            return serviceName;
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
    const flowInput = {
        ...input,
        messages: input.messages || [],
        mainPromptString: mainPromptToUse
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

//# sourceMappingURL=%5Broot-of-the-server%5D__fb9e15b6._.js.map