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
    dayAfterTomorrowDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe('Tanggal lusa (besoknya besok) dalam format YYYY-MM-DD. Berguna untuk konteks booking.'),
    mainPromptString: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().optional().describe('String prompt utama yang diambil dari pengaturan.')
});
const WhatsAppReplyOutputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].object({
    suggestedReply: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$genkit$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["z"].string().describe('Saran balasan yang dihasilkan AI untuk dikirim ke pelanggan.')
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
    "DEFAULT_AI_SETTINGS": (()=>DEFAULT_AI_SETTINGS)
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
    mainPrompt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(100, "Prompt utama minimal 100 karakter.").max(15000, "Prompt utama maksimal 15000 karakter.").optional().describe("Prompt utama yang mengarahkan perilaku dan logika Zoya.")
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
// Default Main Prompt - diambil dari prompt terakhir yang kamu berikan
const DEFAULT_MAIN_PROMPT_ZOYA = `
Kamu adalah Zoya, Customer Service AI dari QLAB Moto Detailing.

🎯 Gaya Bahasa:
- Santai dan akrab, kayak ngobrol sama temen tongkrongan.
- Gunakan sapaan seperti "bro", "kak", atau "mas".
- Tetap informatif, jelas, dan cepat nangkep maksud pelanggan.

🛠 Tool yang Bisa Kamu Pakai:
1. 'extractMotorInfoTool': Deteksi jenis motor dan ukurannya dari teks.
   Input: {"text": "deskripsi motor"}
   Output: {"brand": "...", "model": "...", "size": "S/M/L/XL"}

2. 'searchServiceByKeywordTool': Cari detail layanan berdasarkan kata kunci + ukuran motor (optional) + jenis cat (optional)
   Input: {"keyword": "...", "size": "...", "paintType": "doff/glossy"}
   Output: {"name": "...", "description": "...", "price": ..., "duration": "...", "variantMatched": "..."}

3. 'createBookingTool': Catat booking.
   Input: {
     customerName, customerPhone, clientId,
     serviceId, serviceName,
     vehicleInfo, bookingDate, bookingTime,
     estimatedDuration, notes
   }

🧠 Logika Utama:

1. **Kalau pelanggan menyebut jenis motor (kayak "nmax", "xmax", "supra", dll)**:
   - Langsung panggil 'extractMotorInfoTool' dengan input \`{"text": customerMessage}\`
   - Simpan hasilnya untuk dipakai di langkah selanjutnya (khususnya size)

2. **Kalau pelanggan nanya tentang coating**:
   - Selalu pastikan dulu data motor dan cat (doff/glossy)
   - Kalau belum disebut:
     - Belum jelas motor & cat → tanya: "Motornya apa nih? Doff atau glossy, bro?"
     - Motor doang → tanya: "Oke bro, motornya {{model}} ya. Catnya doff atau glossy, bro?"
     - Cat doang → tanya: "Sip, coating doff ya. Motornya apa nih, bro?"
   - Kalau **motor & cat udah jelas**:
     - Panggil 'extractMotorInfoTool' (jika belum dan size belum diketahui dari histori)
     - Panggil 'searchServiceByKeywordTool' dengan keyword "coating" + size (dari extractMotorInfoTool atau histori) + paintType.
     - Kalau dapet harga (field 'price' ada dan bukan 0 atau null) → kasih info detail (nama layanan, harga, durasi) + tawarkan booking.
     - Kalau TIDAK dapet harga (field 'price' undefined/null/0 dan bukan gratis) dari tool → SANGAT PENTING: JANGAN bilang "sebentar aku cek" lagi. LANGSUNG informasikan bahwa harga spesifik belum ketemu, tapi bisa kasih gambaran umum layanannya (ambil dari deskripsi jika ada). Misal: "Untuk coating NMAX doff, deskripsinya sih [deskripsi layanan]. Tapi buat harga pastinya, Zoya belum nemu nih bro, mungkin tergantung kondisi motornya juga. Mau Zoya bantu tanyain ke tim CS langsung?" atau "Coating NMAX doff ya, bro. Detailnya sih [deskripsi]. Untuk harganya Zoya belum dapet info pasti nih, biasanya tergantung ukuran & kondisi motor. Mau dibantu booking dulu aja biar nanti dikonfirmasi tim kami?"

3. **Kalau pelanggan nanya layanan lain (cuci, detailing, poles, repaint, dll)**:
   - Cek apakah menyebut motor → panggil 'extractMotorInfoTool' jika ada dan size belum diketahui.
   - Panggil 'searchServiceByKeywordTool' dengan keyword sesuai + size (jika ada dari extractMotorInfoTool atau histori).
   - Kalau dapet harga → langsung kasih info detail (nama layanan, harga, durasi) + tawarkan booking.
   - Kalau cuma dapet deskripsi (TIDAK dapet harga dari tool) → kasih deskripsi + tanya motornya buat bisa kasih info harga (jika size belum diketahui). Jika size sudah diketahui tapi harga tetap tidak ada, sampaikan seperti poin 2 (harga tidak ketemu).

4. **Kalau pelanggan mau booking** (atau menyebutkan niat booking seperti "mau booking", "jadwalin dong", atau memberikan info tanggal/jam):
   - **Cek & Ekstrak Info dari Pesan Pelanggan & Riwayat:**
     *   Nama Pelanggan? (Dari histori atau 'senderName' jika ada)
     *   No HP? (Dari histori atau 'senderNumber' jika ada)
     *   Jenis Motor? (Dari hasil 'extractMotorInfoTool' sebelumnya, atau dari histori/pesan pelanggan)
     *   Layanan? (Dari hasil 'searchServiceByKeywordTool' sebelumnya, atau dari histori/pesan pelanggan. Ingat untuk dapatkan 'serviceId' dan 'serviceName' yang tepat.)
     *   Tanggal & Jam?
         -   Kalau pelanggan bilang 'hari ini', isi Tanggal dengan '{{{currentDate}}}'. Formatnya harus YYYY-MM-DD. (Contoh: jika {{{currentDate}}} adalah '18/06/2024', ubah jadi '2024-06-18').
         -   Kalau pelanggan bilang 'besok', isi Tanggal dengan '{{{tomorrowDate}}}'. Formatnya harus YYYY-MM-DD.
         -   Kalau pelanggan bilang 'lusa', isi Tanggal dengan '{{{dayAfterTomorrowDate}}}'. Formatnya harus YYYY-MM-DD.
         -   Kalau pelanggan sebut jam spesifik (mis. 'jam 5 sore', 'jam 10 pagi', 'jam 14.30'):
             -   'jam 5 sore' -> Jam: '17:00'
             -   'jam 10 pagi' -> Jam: '10:00'
             -   'jam 2 siang' -> Jam: '14:00'
             -   'jam 7 malam' -> Jam: '19:00'
             -   'jam 14.30' -> Jam: '14:30'
             -   Jika hanya jam tanpa keterangan hari, dan belum ada tanggal, asumsikan 'hari ini' (gunakan '{{{currentDate}}}' yang sudah diformat YYYY-MM-DD).
         -   Jika pelanggan menyebut tanggal dan bulan (mis. "17 Agustus"), coba pahami dan format ke YYYY-MM-DD. Jika ragu, tanyakan tahunnya atau konfirmasi.
   - **Formulasikan Pertanyaan (Jika Info Kurang):**
     *   Sebutkan dulu info yang SUDAH kamu pahami.
     *   Contoh jika layanan, motor, tanggal, jam sudah ada: "Oke bro, NMAX doff buat coating ya, hari ini ({DD/MM/YYYY}) jam 17:00. Boleh minta Nama sama No HP-nya buat konfirmasi booking?" (Ganti {DD/MM/YYYY} dengan tanggal sebenarnya dari {{{currentDate}}})
     *   Contoh jika hanya layanan & motor: "Sip, coating buat NMAX doff ya. Mau booking tanggal dan jam berapa nih, bro? Sekalian Nama sama No HP-nya ya."
     *   Contoh jika banyak kurang: "Oke bro, untuk bookingnya, Zoya butuh info ini ya:\\nNama : [isi jika sudah tahu]\\nNo HP : [isi jika sudah tahu]\\nLayanan : [isi jika sudah tahu]\\nTanggal : [isi jika sudah tahu dari 'hari ini/besok/lusa']\\nJam kedatangan : [isi jika sudah tahu]\\nJenis Motor : [isi jika sudah tahu]"
   - **Jika Semua Info Sudah Lengkap**:
     *   Panggil tool 'createBookingTool' dengan semua data yang telah terkumpul.
     *   Pastikan 'bookingDate' dalam format YYYY-MM-DD dan 'bookingTime' dalam format HH:MM.
     *   'serviceId' dan 'serviceName' ambil dari hasil pencarian layanan sebelumnya.
     *   'vehicleInfo' gabungkan informasi motor (mis. "NMAX Merah Doff").
     *   Kalau sukses → balas: "Sip bro, booking kamu udah Zoya catat ya. Jadwalnya: [Nama Layanan] untuk [Jenis Motor] pada tanggal [Tanggal Booking format DD MMMM YYYY] jam [Jam Booking]. 👍"
     *   Kalau gagal → minta maaf, arahkan ke CS manusia.

📌 **Catatan Tambahan:**
- Usahakan jawab dengan data real dari tools, jangan ngarang kalau tool belum kasih data.
- Kalau info belum lengkap dari pelanggan, pancing dengan gaya ngobrol santai.
- Kalau ada pertanyaan yang di luar kapasitas kamu, jawab kayak gini:
  > "Waduh, ini agak di luar kepala gue bro... Zoya bantu terusin ke tim CS ya. #unanswered"

📤 Output HARUS dalam format JSON:
Contoh:
{ "suggestedReply": "Oke bro, untuk coating doff ukuran M harganya 400rb. Mau sekalian booking?" }

📩 Chat Pelanggan:
user: {{{customerMessage}}}

📚 Riwayat Sebelumnya:
{{#if chatHistory.length}}
{{#each chatHistory}}
{{this.role}}: {{this.content}}
{{/each}}
{{/if}}

🕒 Tanggal hari ini: {{{currentDate}}}, waktu: {{{currentTime}}}
Besok: {{{tomorrowDate}}}, Lusa: {{{dayAfterTomorrowDate}}}
`;
const DEFAULT_AI_SETTINGS = {
    agentBehavior: "Humoris & Santai",
    welcomeMessage: "Halo bro! Zoya di sini, siap bantu seputar QLAB Moto Detailing. Ada yang bisa Zoya bantu?",
    transferConditions: [
        "Pelanggan Meminta Secara Eksplisit"
    ],
    knowledgeBaseDescription: `Anda adalah asisten AI untuk QLAB Moto Detailing. Tugas utama Anda adalah membantu pelanggan dan staf. Gunakan tools yang tersedia untuk mencari informasi produk, layanan, klien, atau detail dari knowledge base. Prioritaskan penggunaan 'getKnowledgeBaseInfoTool' untuk pertanyaan umum atau detail kebijakan, dan 'searchServiceByKeywordTool' untuk harga/durasi spesifik.`,
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
 * @fileOverview AI flow for WhatsApp customer service replies,
 * using direct Firestore lookups for context and dynamic system prompt generation.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$ai$2f$cs$2d$whatsapp$2d$reply$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/ai/cs-whatsapp-reply.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/aiSettings.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
// Helper Function: Adapted from src/flow.ts to work with Firestore client SDK
// and ServiceProduct variant structure (array of objects).
async function getServicePrice(vehicleModel, serviceName) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"]) {
        console.error("[CS-FLOW] Firestore client (db) is not initialized in getServicePrice.");
        return null;
    }
    try {
        const vehicleTypesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'vehicleTypes');
        const vehicleQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(vehicleTypesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["where"])('aliases', 'array-contains', vehicleModel.toLowerCase()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["limit"])(1));
        const vehicleSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(vehicleQuery);
        let vehicleSize = null;
        if (!vehicleSnapshot.empty) {
            vehicleSize = vehicleSnapshot.docs[0].data().size; // e.g., "L"
        } else {
            const modelDirectQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(vehicleTypesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["where"])('model', '==', vehicleModel), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["limit"])(1));
            const modelDirectSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(modelDirectQuery);
            if (!modelDirectSnapshot.empty) {
                vehicleSize = modelDirectSnapshot.docs[0].data().size;
            } else {
                console.log(`[CS-FLOW] getServicePrice: Vehicle model '${vehicleModel}' not found via aliases or direct model name.`);
                return null;
            }
        }
        if (!vehicleSize) {
            console.log(`[CS-FLOW] getServicePrice: Vehicle size not found for model '${vehicleModel}'.`);
            return null;
        }
        const servicesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'services');
        // Attempt to find by exact name match first (case-insensitive)
        let serviceDoc;
        const servicesSnapshotByName = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["query"])(servicesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["where"])("name_lowercase", "==", serviceName.toLowerCase())));
        if (!servicesSnapshotByName.empty) {
            serviceDoc = servicesSnapshotByName.docs[0]; // Assumes name_lowercase is unique or first match is fine
        }
        if (!serviceDoc) {
            const servicesSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(servicesRef);
            serviceDoc = servicesSnapshot.docs.find((doc)=>doc.data().name?.toLowerCase() === serviceName.toLowerCase());
        }
        if (!serviceDoc) {
            console.log(`[CS-FLOW] getServicePrice: Service name '${serviceName}' not found by name match.`);
            return null;
        }
        const serviceData = serviceDoc.data();
        let price = null;
        if (serviceData.variants && Array.isArray(serviceData.variants)) {
            const variant = serviceData.variants.find((v)=>v.name && v.name.toUpperCase() === vehicleSize.toUpperCase());
            if (variant && typeof variant.price === 'number') {
                price = variant.price;
            }
        }
        // Fallback to base price if variant price not found or no variants
        if (price === null && typeof serviceData.price === 'number') {
            price = serviceData.price;
        } else if (price === null) {
            console.log(`[CS-FLOW] getServicePrice: Price not found for service '${serviceName}' with size '${vehicleSize}' (no variant match and no base price).`);
            return null;
        }
        return price;
    } catch (error) {
        console.error("[CS-FLOW] Error in getServicePrice:", error);
        return null;
    }
}
const whatsAppReplyFlowSimplified = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineFlow({
    name: 'whatsAppReplyFlowSimplified',
    inputSchema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$ai$2f$cs$2d$whatsapp$2d$reply$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WhatsAppReplyInputSchema"],
    outputSchema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$ai$2f$cs$2d$whatsapp$2d$reply$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WhatsAppReplyOutputSchema"]
}, async (input)=>{
    try {
        console.log("[CS-FLOW] whatsAppReplyFlowSimplified input. Customer Message:", input.customerMessage, "History Length:", input.chatHistory?.length || 0);
        const lastUserMessageContent = input.customerMessage.toLowerCase();
        let vehicleModel = null;
        let serviceName = null;
        let dynamicContext = "INFO_UMUM_BENGKEL: QLAB Moto Detailing adalah bengkel perawatan dan detailing motor.";
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"]) {
            try {
                const vehicleTypesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'vehicleTypes');
                const modelsSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(vehicleTypesRef);
                for (const doc of modelsSnapshot.docs){
                    const data = doc.data();
                    const modelAliases = (data.aliases || []).map((a)=>a.toLowerCase());
                    const originalModelName = data.model;
                    if (modelAliases.some((alias)=>lastUserMessageContent.includes(alias)) || lastUserMessageContent.includes(originalModelName.toLowerCase())) {
                        vehicleModel = originalModelName;
                        console.log(`[CS-FLOW] Vehicle model detected: ${vehicleModel}`);
                        break;
                    }
                }
                const servicesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'services');
                const servicesSnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDocs"])(servicesRef);
                for (const doc of servicesSnapshot.docs){
                    const data = doc.data();
                    const serviceAliases = (data.aliases || []).map((a)=>a.toLowerCase());
                    const originalServiceName = data.name;
                    if (serviceAliases.some((alias)=>lastUserMessageContent.includes(alias)) || lastUserMessageContent.includes(originalServiceName.toLowerCase())) {
                        serviceName = originalServiceName;
                        console.log(`[CS-FLOW] Service name detected: ${serviceName}`);
                        break;
                    }
                }
            } catch (dbError) {
                console.error("[CS-FLOW] Error during Firestore entity detection:", dbError);
                dynamicContext += " WARNING: Gagal mengambil data detail dari database.";
            }
        } else {
            console.warn("[CS-FLOW] Firestore (db) is not initialized. Entity detection and pricing will be skipped.");
            dynamicContext += " WARNING: Database tidak terhubung, info harga mungkin tidak akurat.";
        }
        if (vehicleModel && serviceName) {
            const price = await getServicePrice(vehicleModel, serviceName);
            if (serviceName.toLowerCase().includes('full detailing') && lastUserMessageContent.includes('doff')) {
                dynamicContext = `VALIDATION_ERROR: Full Detailing tidak bisa untuk motor doff (motor terdeteksi: ${vehicleModel}, layanan diminta: ${serviceName}). Tawarkan Coating Doff sebagai alternatif.`;
            } else {
                dynamicContext = `DATA_PRODUK: Untuk motor ${vehicleModel}, layanan ${serviceName}, estimasi harganya adalah Rp ${price !== null ? price.toLocaleString('id-ID') : 'belum tersedia, mohon tanyakan detail motor lebih lanjut atau jenis catnya (doff/glossy) jika coating'}.`;
            }
        } else if (vehicleModel) {
            dynamicContext = `INFO_MOTOR_TERDETEKSI: ${vehicleModel}. Tanyakan layanan apa yang diinginkan.`;
        } else if (serviceName) {
            dynamicContext = `INFO_LAYANAN_TERDETEKSI: ${serviceName}. Tanyakan jenis motornya apa untuk estimasi harga.`;
        }
        console.log(`[CS-FLOW] Dynamic context built: ${dynamicContext}`);
        const systemInstruction = `
Anda adalah "Zoya" - CS QLAB Moto Detailing.
GAYA BAHASA:
- Santai tapi profesional (contoh: "Halo boskuu", "Gas booking sekarang!", "Siap bos!")
- Pakai istilah: "kinclong", "cuci premium level spa motor", "poles", "coating"
- Hindari kata kasar (boleh pakai "anjay" jika pas konteksnya)
- Gunakan emoji secukupnya: ✅😎✨💸🛠️👋

ATURAN WAJIB:
1. Layanan "Full Detailing" HANYA untuk motor tipe glossy. JANGAN tawarkan ke motor doff. Jika user minta, tolak dengan sopan dan berikan alternatif lain seperti "Coating Doff".
2. Layanan "Coating" memiliki harga yang BERBEDA untuk glossy dan doff. Selalu pastikan tipe motornya dan jenis catnya (jika belum jelas dari KONTEKS DARI SISTEM). Jika harga belum ada di KONTEKS, tanyakan spesifikasi motor atau jenis cat.
3. Motor besar (Moge) seperti Harley, CBR600RR, dll, otomatis menggunakan ukuran "SIZE XL". Info ukuran ini akan otomatis didapat dari sistem jika model terdeteksi.

KONTEKS DARI SISTEM (gunakan data ini untuk menjawab, JANGAN tampilkan KONTEKS ini ke user secara langsung, olah jadi jawaban natural, jangan JSON):
${dynamicContext}

PETUNJUK TAMBAHAN:
- Jika KONTEKS berisi VALIDATION_ERROR, jelaskan error tersebut ke user dengan bahasa yang sopan dan berikan solusi/alternatif.
- Jika KONTEKS berisi DATA_PRODUK dan harganya ada, sebutkan harganya. Jika harga 'belum tersedia', JANGAN mengarang harga. Informasikan bahwa harga spesifik belum ada dan tanyakan detail lebih lanjut jika diperlukan (misal jenis cat untuk coating, atau ukuran motor jika belum terdeteksi).
- Jika user bertanya di luar topik detailing motor, jawab dengan sopan bahwa Anda hanya bisa membantu soal QLAB Moto Detailing.
- Tujuan utama: Memberikan informasi akurat dan membantu user melakukan booking jika mereka mau.
      `;
        const historyForAI = (input.chatHistory || []).filter((msg)=>msg.content && msg.content.trim() !== '').map((msg)=>({
                role: msg.role,
                parts: [
                    {
                        text: msg.content
                    }
                ]
            }));
        // Gabungkan systemInstruction dengan pesan user terakhir
        const userPromptWithSystemInstruction = `${systemInstruction}

---

USER_INPUT: "${input.customerMessage}"`;
        const messagesForAI = [
            ...historyForAI,
            {
                role: 'user',
                parts: [
                    {
                        text: userPromptWithSystemInstruction
                    }
                ]
            }
        ];
        console.log("[CS-FLOW] Calling ai.generate with model googleai/gemini-1.5-flash-latest. Combined messagesForAI:", JSON.stringify(messagesForAI.map((m)=>({
                role: m.role,
                textPreview: m.parts[0].text.substring(0, 100) + "..."
            })), null, 2));
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].generate({
            model: 'googleai/gemini-1.5-flash-latest',
            messages: messagesForAI,
            config: {
                temperature: 0.5
            }
        });
        console.log("[CS-FLOW] Raw AI generate result:", JSON.stringify(result, null, 2));
        // Akses finishReason dan safetyRatings dari level atas objek result
        const finishReason = result.finishReason;
        const safetyRatings = result.safetyRatings;
        console.log(`[CS-FLOW] AI Finish Reason: ${finishReason}`);
        if (safetyRatings && safetyRatings.length > 0) {
            console.log('[CS-FLOW] AI Safety Ratings:', JSON.stringify(safetyRatings, null, 2));
        }
        const suggestedReply = result.candidates?.[0]?.message.content?.[0]?.text || "";
        if (!suggestedReply && finishReason !== "stop") {
            console.warn(`[CS-FLOW] ⚠️ AI returned an empty reply, but finishReason was '${finishReason}'. This might indicate an issue or unexpected model behavior. Safety Ratings: ${JSON.stringify(safetyRatings, null, 2)}. Mengembalikan default.`);
            return {
                suggestedReply: "Maaf, Zoya lagi bingung nih. Bisa diulang pertanyaannya atau coba beberapa saat lagi?"
            };
        } else if (!suggestedReply && finishReason === "stop") {
            console.warn(`[CS-FLOW] ⚠️ AI returned an empty reply with finishReason 'stop'. This might be due to prompt design or a very short valid response. Safety Ratings: ${JSON.stringify(safetyRatings, null, 2)}. Mengembalikan default.`);
            return {
                suggestedReply: "Hmm, Zoya lagi mikir keras nih. Coba tanya lagi dengan lebih spesifik ya?"
            };
        }
        console.log("[CS-FLOW] AI generate output:", suggestedReply);
        return {
            suggestedReply
        };
    } catch (flowError) {
        console.error('[CS-FLOW] ❌ Critical error dalam flow whatsAppReplyFlowSimplified:', flowError);
        if (flowError.cause) {
            console.error('[CS-FLOW] Error Cause:', JSON.stringify(flowError.cause, null, 2));
        }
        return {
            suggestedReply: "Waduh, sistem Zoya lagi ada kendala besar nih. Mohon coba beberapa saat lagi ya."
        };
    }
});
async function generateWhatsAppReply(input) {
    let promptFromSettings = "";
    try {
        const settingsDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"], 'appSettings', 'aiAgentConfig');
        const settingsSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDoc"])(settingsDocRef);
        if (settingsSnap.exists() && settingsSnap.data()?.mainPrompt && settingsSnap.data()?.mainPrompt.trim() !== "") {
            promptFromSettings = settingsSnap.data()?.mainPrompt;
            console.log("[CS-FLOW] generateWhatsAppReply: Loaded mainPrompt from Firestore.");
        } else {
            console.warn("[CS-FLOW] generateWhatsAppReply: mainPrompt not found in Firestore or is empty. Checking default.");
            if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_AI_SETTINGS"].mainPrompt && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_AI_SETTINGS"].mainPrompt.trim() !== "") {
                promptFromSettings = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_AI_SETTINGS"].mainPrompt;
                console.log("[CS-FLOW] generateWhatsAppReply: Using DEFAULT_AI_SETTINGS.mainPrompt.");
            } else {
                console.error("[CS-FLOW] generateWhatsAppReply: CRITICAL - mainPrompt is also empty in DEFAULT_AI_SETTINGS. Using emergency fallback prompt.");
                promptFromSettings = "Anda adalah asisten AI. Tolong jawab pertanyaan pengguna.";
            }
        }
    } catch (error) {
        console.error("[CS-FLOW] generateWhatsAppReply: Error fetching prompt from Firestore. Using default/emergency fallback.", error);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_AI_SETTINGS"].mainPrompt && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_AI_SETTINGS"].mainPrompt.trim() !== "") {
            promptFromSettings = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_AI_SETTINGS"].mainPrompt;
            console.log("[CS-FLOW] generateWhatsAppReply: Using DEFAULT_AI_SETTINGS.mainPrompt after Firestore error.");
        } else {
            console.error("[CS-FLOW] generateWhatsAppReply: CRITICAL - mainPrompt is also empty in DEFAULT_AI_SETTINGS post-error. Using emergency fallback prompt.");
            promptFromSettings = "Anda adalah asisten AI. Tolong jawab pertanyaan pengguna.";
        }
    }
    if (!promptFromSettings || promptFromSettings.trim() === "") {
        console.error("[CS-FLOW] generateWhatsAppReply: CRITICAL - promptFromSettings is STILL empty after all checks. Using emergency fallback prompt.");
        promptFromSettings = "Anda adalah asisten AI. Tolong jawab pertanyaan pengguna.";
    }
    // Untuk flow cs-whatsapp-reply-flow.ts yang baru, mainPromptString tidak lagi digunakan secara langsung
    // untuk system instruction di dalam flow, karena system instruction dibangun secara dinamis di sana.
    // Namun, kita tetap meneruskannya untuk menjaga struktur input dan jika ingin dipakai di masa depan.
    const flowInput = {
        ...input,
        mainPromptString: promptFromSettings,
        customerMessage: input.customerMessage,
        senderNumber: input.senderNumber,
        chatHistory: input.chatHistory || [],
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
        agentBehavior: input.agentBehavior || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_AI_SETTINGS"].agentBehavior,
        knowledgeBase: input.knowledgeBase || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$aiSettings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_AI_SETTINGS"].knowledgeBaseDescription
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

//# sourceMappingURL=%5Broot-of-the-server%5D__7e5ab3ae._.js.map