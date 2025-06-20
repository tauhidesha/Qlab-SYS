module.exports = {

"[project]/src/components/layout/AppHeader.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AppHeader)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sidebar.tsx [app-ssr] (ecmascript)");
;
;
function AppHeader({ title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SidebarTrigger"], {
                className: "md:hidden"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AppHeader.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "font-headline text-xl font-semibold",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AppHeader.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/AppHeader.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this));
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, this));
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, this));
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this));
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, this));
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, this));
CardFooter.displayName = "CardFooter";
;
}}),
"[project]/src/components/ui/textarea.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Textarea": (()=>Textarea)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Textarea = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/textarea.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, this);
});
Textarea.displayName = 'Textarea';
;
}}),
"[project]/src/ai/flows/data:de1ed0 [app-ssr] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"4053660f6447b38038e1d20965a3df3cd57a2a7b51":"generateWhatsAppReply"},"src/ai/flows/cs-whatsapp-reply-flow.ts",""] */ __turbopack_context__.s({
    "generateWhatsAppReply": (()=>generateWhatsAppReply)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
"use turbopack no side effects";
;
var generateWhatsAppReply = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("4053660f6447b38038e1d20965a3df3cd57a2a7b51", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "generateWhatsAppReply"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY3Mtd2hhdHNhcHAtcmVwbHktZmxvdy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWkgfSBmcm9tICdAL2FpL2dlbmtpdCc7IC8vIE1lbmdndW5ha2FuIG9iamVrICdhaScgZ2xvYmFsIGRhcmkgZ2Vua2l0LnRzXG5pbXBvcnQgKiBhcyB6IGZyb20gJ3pvZCc7XG5pbXBvcnQgeyBkYiB9IGZyb20gJ0AvbGliL2ZpcmViYXNlJztcbmltcG9ydCB7IGNvbGxlY3Rpb24sIHF1ZXJ5IGFzIGZpcmVzdG9yZVF1ZXJ5LCB3aGVyZSwgbGltaXQsIGdldERvY3MsIFRpbWVzdGFtcCB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBERUZBVUxUX0FJX1NFVFRJTkdTIH0gZnJvbSAnQC9hcHAvKGFwcCkvYWktY3MtYXNzaXN0YW50L3NldHRpbmdzL3BhZ2UnOyAvLyBJbXBvcnQgZGVmYXVsdCBzZXR0aW5nc1xuXG4vLyBTa2VtYSBpbnRlcm5hbCB1bnR1ayB2YWxpZGFzaSBpbnB1dCBjaGF0IGhpc3RvcnkgZGkgZmxvd1xuY29uc3QgQ2hhdE1lc3NhZ2VTY2hlbWFJbnRlcm5hbCA9IHoub2JqZWN0KHtcbiAgcm9sZTogei5lbnVtKFsndXNlcicsICdtb2RlbCddKSxcbiAgY29udGVudDogei5zdHJpbmcoKSxcbn0pO1xuZXhwb3J0IHR5cGUgQ2hhdE1lc3NhZ2UgPSB6LmluZmVyPHR5cGVvZiBDaGF0TWVzc2FnZVNjaGVtYUludGVybmFsPjtcblxuLy8gU2tlbWEgWm9kIHVudHVrIGlucHV0IGZsb3dcbmNvbnN0IFpveWFDaGF0SW5wdXRTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG1lc3NhZ2VzOiB6LmFycmF5KENoYXRNZXNzYWdlU2NoZW1hSW50ZXJuYWwpLm9wdGlvbmFsKCkuZGVzY3JpYmUoXCJSaXdheWF0IHBlcmNha2FwYW4sIHBlc2FuIHRlcmFraGlyIGFkYWxhaCBkYXJpIHVzZXIuXCIpLFxuICBjdXN0b21lck1lc3NhZ2U6IHouc3RyaW5nKCkub3B0aW9uYWwoKS5kZXNjcmliZShcIlBlc2FuIHRlcmJhcnUgZGFyaSBjdXN0b21lciBqaWthIHRpZGFrIHRlcm1hc3VrIGRhbGFtIG1lc3NhZ2VzLlwiKSxcbiAgc2VuZGVyTnVtYmVyOiB6LnN0cmluZygpLm9wdGlvbmFsKCkuZGVzY3JpYmUoXCJOb21vciBXaGF0c0FwcCBwZW5naXJpbSAob3BzaW9uYWwpLlwiKSxcbiAgLy8gVGFtYmFoa2FuIGZpZWxkIGxhaW4geWFuZyBtdW5na2luIGRpYnV0dWhrYW4gZGFyaSBERUZBVUxUX0FJX1NFVFRJTkdTXG4gIGFnZW50QmVoYXZpb3I6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAga25vd2xlZGdlQmFzZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBjdXJyZW50RGF0ZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBjdXJyZW50VGltZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICB0b21vcnJvd0RhdGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgZGF5QWZ0ZXJUb21vcnJvd0RhdGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgbWFpblByb21wdFN0cmluZzogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxufSk7XG5leHBvcnQgdHlwZSBab3lhQ2hhdElucHV0ID0gei5pbmZlcjx0eXBlb2YgWm95YUNoYXRJbnB1dFNjaGVtYT47XG5cbi8vIFNrZW1hIFpvZCB1bnR1ayBvdXRwdXQgZmxvd1xuY29uc3QgWm95YUNoYXRPdXRwdXRTY2hlbWEgPSB6LnN0cmluZygpLmRlc2NyaWJlKFwiQmFsYXNhbiB0ZWtzIGRhcmkgWm95YS5cIik7XG5cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vICBUT09MUzogS2VtYW1wdWFuIHlhbmcgYmlzYSBkaWd1bmFrYW4gb2xlaCBBSVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmNvbnN0IGdldFNlcnZpY2VQcmljZVRvb2wgPSBhaS5kZWZpbmVUb29sKFxuICB7XG4gICAgbmFtZTogJ2dldFNlcnZpY2VQcmljZScsXG4gICAgZGVzY3JpcHRpb246ICdEYXBhdGthbiBoYXJnYSB1bnR1ayBsYXlhbmFuIHNwZXNpZmlrIHBhZGEgbW9kZWwgbW90b3IgdGVydGVudHUuIEd1bmFrYW4gdG9vbCBpbmkgamlrYSB1c2VyIG1lbmFueWFrYW4gaGFyZ2EuJyxcbiAgICBpbnB1dFNjaGVtYTogei5vYmplY3Qoe1xuICAgICAgdmVoaWNsZU1vZGVsOiB6LnN0cmluZygpLmRlc2NyaWJlKCdNb2RlbCBtb3RvciwgY29udG9oOiBOTUFYLCBQQ1gsIFZhcmlvJyksXG4gICAgICBzZXJ2aWNlTmFtZTogei5zdHJpbmcoKS5kZXNjcmliZSgnTmFtYSBsYXlhbmFuLCBjb250b2g6IENvYXRpbmcsIEN1Y2kgUHJlbWl1bSwgRnVsbCBEZXRhaWxpbmcnKSxcbiAgICB9KSxcbiAgICBvdXRwdXRTY2hlbWE6IHoub2JqZWN0KHtcbiAgICAgIHN1Y2Nlc3M6IHouYm9vbGVhbigpLFxuICAgICAgbWVzc2FnZTogei5zdHJpbmcoKSxcbiAgICAgIHByaWNlOiB6Lm51bWJlcigpLm9wdGlvbmFsKCksXG4gICAgICBzaXplOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgICBlc3RpbWF0ZWREdXJhdGlvbjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIH0pLFxuICB9LFxuICBhc3luYyAoeyB2ZWhpY2xlTW9kZWwsIHNlcnZpY2VOYW1lIH0pID0+IHtcbiAgICBpZiAoIWRiKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiW2dldFNlcnZpY2VQcmljZVRvb2xdIEZpcmVzdG9yZSBDbGllbnQgREIgKGRiKSBpcyBub3QgaW5pdGlhbGl6ZWQhXCIpO1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRGF0YWJhc2UgYmVuZ2tlbCBzZWRhbmcgdGlkYWsgYmlzYSBkaWFrc2VzLCBab3lhIGphZGkgYmluZ3VuZyBuaWguXCIgfTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYFtnZXRTZXJ2aWNlUHJpY2VUb29sXSBJbnB1dDogdmVoaWNsZU1vZGVsPSR7dmVoaWNsZU1vZGVsfSwgc2VydmljZU5hbWU9JHtzZXJ2aWNlTmFtZX1gKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmVoaWNsZXNDb2xsZWN0aW9uUmVmID0gY29sbGVjdGlvbihkYiwgJ3ZlaGljbGVUeXBlcycpO1xuICAgICAgLy8gMS4gQ29iYSBjYXJpIGJlcmRhc2Fya2FuIGFsaWFzIGR1bHVcbiAgICAgIGxldCB2ZWhpY2xlUXVlcnkgPSBmaXJlc3RvcmVRdWVyeShcbiAgICAgICAgdmVoaWNsZXNDb2xsZWN0aW9uUmVmLFxuICAgICAgICB3aGVyZSgnYWxpYXNlcycsICdhcnJheS1jb250YWlucycsIHZlaGljbGVNb2RlbC50b0xvd2VyQ2FzZSgpKSxcbiAgICAgICAgbGltaXQoMSlcbiAgICAgICk7XG4gICAgICBsZXQgdmVoaWNsZVF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKHZlaGljbGVRdWVyeSk7XG5cbiAgICAgIC8vIDIuIEppa2EgdGlkYWsga2V0ZW11IGFsaWFzLCBjb2JhIGNhcmkgYmVyZGFzYXJrYW4gbW9kZWxfbG93ZXJjYXNlIChleGFjdCBtYXRjaClcbiAgICAgIGlmICh2ZWhpY2xlUXVlcnlTbmFwc2hvdC5lbXB0eSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgW2dldFNlcnZpY2VQcmljZVRvb2xdIE5vIGV4YWN0IG1hdGNoIGZvciAnJHt2ZWhpY2xlTW9kZWwudG9Mb3dlckNhc2UoKX0nIGluIGFsaWFzZXMuIFRyeWluZyAnbW9kZWxfbG93ZXJjYXNlJy4uLmApO1xuICAgICAgICBjb25zdCBtb2RlbExvd2VyUXVlcnkgPSBmaXJlc3RvcmVRdWVyeSh2ZWhpY2xlc0NvbGxlY3Rpb25SZWYsIHdoZXJlKCdtb2RlbF9sb3dlcmNhc2UnLCAnPT0nLCB2ZWhpY2xlTW9kZWwudG9Mb3dlckNhc2UoKSksIGxpbWl0KDEpKTtcbiAgICAgICAgdmVoaWNsZVF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKG1vZGVsTG93ZXJRdWVyeSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICh2ZWhpY2xlUXVlcnlTbmFwc2hvdC5lbXB0eSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgW2dldFNlcnZpY2VQcmljZVRvb2xdIFZlaGljbGUgbW9kZWwgJyR7dmVoaWNsZU1vZGVsfScgbm90IGZvdW5kLmApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogYE1hYWYsIFpveWEgYmVsdW0ga2VuYWwgbW9kZWwgbW90b3IgXCIke3ZlaGljbGVNb2RlbH1cIi4gTXVuZ2tpbiBiaXNhIHNlYnV0a2FuIHlhbmcgbGViaWggdW11bSBhdGF1IHBhc3Rpa2FuIGVqYWFubnlhIGJlbmFyP2AgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmVoaWNsZURhdGEgPSB2ZWhpY2xlUXVlcnlTbmFwc2hvdC5kb2NzWzBdLmRhdGEoKTtcbiAgICAgIGNvbnN0IHZlaGljbGVTaXplID0gdmVoaWNsZURhdGEuc2l6ZTsgLy8gZS5nLiwgXCJMXCJcbiAgICAgIGlmICghdmVoaWNsZVNpemUpIHtcbiAgICAgICAgIGNvbnNvbGUubG9nKGBbZ2V0U2VydmljZVByaWNlVG9vbF0gVmVoaWNsZSBzaXplIG5vdCBmb3VuZCBmb3IgbW9kZWwgJyR7dmVoaWNsZU1vZGVsfScuYCk7XG4gICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogYFVrdXJhbiB1bnR1ayBtb2RlbCBtb3RvciBcIiR7dmVoaWNsZU1vZGVsfVwiIHRpZGFrIGRpdGVtdWthbi4gWm95YSBiaW5ndW5nIG5paC5gIH07XG4gICAgICB9XG4gICAgICBjb25zdCBmaXJlc3RvcmVTaXplVmFyaWFudCA9IHZlaGljbGVTaXplOyAvLyBWYXJpYW4gdWt1cmFuIGRpIEZpcmVzdG9yZSBiaWFzYW55YSBTLCBNLCBMLCBYTCBsYW5nc3VuZ1xuXG4gICAgICBjb25zdCBzZXJ2aWNlc0NvbGxlY3Rpb25SZWYgPSBjb2xsZWN0aW9uKGRiLCAnc2VydmljZXMnKTtcbiAgICAgIGNvbnN0IHNlcnZpY2VOYW1lTG93ZXIgPSBzZXJ2aWNlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgXG4gICAgICAvLyBNZW5jYXJpIGxheWFuYW4gZGVuZ2FuIG5hbWEgeWFuZyBjYXNlLWluc2Vuc2l0aXZlICg+PSBkYW4gPD0gdHJpY2spXG4gICAgICBjb25zdCBzZXJ2aWNlUXVlcnkgPSBmaXJlc3RvcmVRdWVyeShcbiAgICAgICAgc2VydmljZXNDb2xsZWN0aW9uUmVmLFxuICAgICAgICB3aGVyZSgnbmFtZV9sb3dlcmNhc2UnLCAnPj0nLCBzZXJ2aWNlTmFtZUxvd2VyKSxcbiAgICAgICAgd2hlcmUoJ25hbWVfbG93ZXJjYXNlJywgJzw9Jywgc2VydmljZU5hbWVMb3dlciArICdcXHVmOGZmJylcbiAgICAgICAgLy8gd2hlcmUoJ25hbWVfbG93ZXJjYXNlJywgJz09Jywgc2VydmljZU5hbWVMb3dlcikgLy8gQWx0ZXJuYXRpZjogZXhhY3QgbWF0Y2gsIGJ1dCBsZXNzIGZsZXhpYmxlIGZvciB0eXBvc1xuICAgICAgKTtcbiAgICAgIGNvbnN0IHNlcnZpY2VRdWVyeVNuYXBzaG90ID0gYXdhaXQgZ2V0RG9jcyhzZXJ2aWNlUXVlcnkpO1xuXG4gICAgICBpZiAoc2VydmljZVF1ZXJ5U25hcHNob3QuZW1wdHkpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFtnZXRTZXJ2aWNlUHJpY2VUb29sXSBTZXJ2aWNlIG5hbWUgJyR7c2VydmljZU5hbWV9JyBub3QgZm91bmQgKGluaXRpYWwgcXVlcnkpLmApO1xuICAgICAgICAvLyBNdW5na2luIGNvYmEgY2FyaSBkZW5nYW4gYWxpYXMganVnYSBkaSBzaW5pIGppa2EgYWRhIGZpZWxkIGFsaWFzX2xheWFuYW4gZGkgY29sbGVjdGlvbiBzZXJ2aWNlc1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogYExheWFuYW4gXCIke3NlcnZpY2VOYW1lfVwiIHNlcGVydGlueWEgdGlkYWsgdGVyc2VkaWEuYCB9O1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBGaWx0ZXIgbWFudWFsIHVudHVrIGJlc3QgbWF0Y2ggamlrYSBxdWVyeSBtZW5nZW1iYWxpa2FuID4xIGhhc2lsIChtaXMuIFwiQ3VjaVwiIHZzIFwiQ3VjaSBQcmVtaXVtXCIpXG4gICAgICBsZXQgZm91bmRTZXJ2aWNlRGF0YTogYW55ID0gbnVsbDtcbiAgICAgIGxldCBiZXN0TWF0Y2hTY29yZSA9IC0xO1xuXG4gICAgICBzZXJ2aWNlUXVlcnlTbmFwc2hvdC5mb3JFYWNoKGRvYyA9PiB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSBkb2MuZGF0YSgpO1xuICAgICAgICBjb25zdCBjdXJyZW50U2VydmljZU5hbWVMb3dlciA9IHNlcnZpY2UubmFtZV9sb3dlcmNhc2UgfHwgc2VydmljZS5uYW1lLnRvTG93ZXJDYXNlKCk7IC8vIEZhbGxiYWNrIGlmIG5hbWVfbG93ZXJjYXNlIGlzIG1pc3NpbmdcbiAgICAgICAgXG4gICAgICAgIC8vIFNjb3Jpbmcgc2VkZXJoYW5hOiBleGFjdCBtYXRjaCBwYWxpbmcgdGluZ2dpLCBzdGFydHNXaXRoLCBpbmNsdWRlc1xuICAgICAgICBsZXQgc2NvcmUgPSAwO1xuICAgICAgICBpZiAoY3VycmVudFNlcnZpY2VOYW1lTG93ZXIgPT09IHNlcnZpY2VOYW1lTG93ZXIpIHsgc2NvcmUgPSAxMDA7IH1cbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFNlcnZpY2VOYW1lTG93ZXIuc3RhcnRzV2l0aChzZXJ2aWNlTmFtZUxvd2VyKSkgeyBzY29yZSA9IDUwOyB9XG4gICAgICAgIGVsc2UgaWYgKHNlcnZpY2VOYW1lTG93ZXIuaW5jbHVkZXMoY3VycmVudFNlcnZpY2VOYW1lTG93ZXIpKSB7IHNjb3JlID0gMjU7IH0gLy8gSmlrYSBxdWVyeSBraXRhIHBha2FpID49IDw9LCBpbmkgbXVuZ2tpbiB0aWRhayB0ZXJsYWx1IHJlbGV2YW5cbiAgICAgICAgZWxzZSB7IHNjb3JlID0gMTA7IH0gLy8gRGVmYXVsdCBzY29yZSBmb3IgbGVzcyByZWxldmFudCBtYXRjaGVzIGZyb20gYnJvYWQgcXVlcnlcblxuICAgICAgICBpZiAoc2NvcmUgPiBiZXN0TWF0Y2hTY29yZSkge1xuICAgICAgICAgICAgYmVzdE1hdGNoU2NvcmUgPSBzY29yZTtcbiAgICAgICAgICAgIGZvdW5kU2VydmljZURhdGEgPSBzZXJ2aWNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFmb3VuZFNlcnZpY2VEYXRhKSB7XG4gICAgICAgICBjb25zb2xlLmxvZyhgW2dldFNlcnZpY2VQcmljZVRvb2xdIE5vIHN1aXRhYmxlIHNlcnZpY2UgZm91bmQgZm9yICcke3NlcnZpY2VOYW1lfScgYWZ0ZXIgZmlsdGVyaW5nLmApO1xuICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGBMYXlhbmFuIFwiJHtzZXJ2aWNlTmFtZX1cIiB0aWRhayBkaXRlbXVrYW4uYCB9O1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBBbWJpbCBoYXJnYSBkYXJpIHZhcmlhbiB5YW5nIGNvY29rLCBhdGF1IGhhcmdhIGRhc2FyIGppa2EgdGlkYWsgYWRhIHZhcmlhbi92YXJpYW4gdGlkYWsgY29jb2tcbiAgICAgIGxldCBwcmljZTogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgbGV0IGVzdGltYXRlZER1cmF0aW9uOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBmb3VuZFNlcnZpY2VEYXRhLmVzdGltYXRlZER1cmF0aW9uOyAvLyBBbWJpbCBkdXJhc2kgZGFzYXIgZHVsdVxuXG4gICAgICBpZiAoZm91bmRTZXJ2aWNlRGF0YS52YXJpYW50cyAmJiBBcnJheS5pc0FycmF5KGZvdW5kU2VydmljZURhdGEudmFyaWFudHMpKSB7XG4gICAgICAgIC8vIERpIEZpcmVzdG9yZSwgdmFyaWFuIGJpYXNhbnlhIHB1bnlhIG5hbWEgc2VwZXJ0aSBcIlNcIiwgXCJNXCIsIFwiTFwiLCBcIlhMXCIgKHNlc3VhaSB2ZWhpY2xlU2l6ZSlcbiAgICAgICAgY29uc3QgdmFyaWFudCA9IGZvdW5kU2VydmljZURhdGEudmFyaWFudHMuZmluZCgodjogYW55KSA9PiB2Lm5hbWUgJiYgdi5uYW1lLnRvVXBwZXJDYXNlKCkgPT09IGZpcmVzdG9yZVNpemVWYXJpYW50LnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICBpZiAodmFyaWFudCAmJiB0eXBlb2YgdmFyaWFudC5wcmljZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBwcmljZSA9IHZhcmlhbnQucHJpY2U7XG4gICAgICAgICAgZXN0aW1hdGVkRHVyYXRpb24gPSB2YXJpYW50LmVzdGltYXRlZER1cmF0aW9uIHx8IGVzdGltYXRlZER1cmF0aW9uOyAvLyBBbWJpbCBkdXJhc2kgdmFyaWFuIGppa2EgYWRhXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gSmlrYSBoYXJnYSBkYXJpIHZhcmlhbiB0aWRhayBkaXRlbXVrYW4sIGNvYmEgYW1iaWwgaGFyZ2EgZGFzYXIgbGF5YW5hblxuICAgICAgaWYgKHByaWNlID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIGZvdW5kU2VydmljZURhdGEucHJpY2UgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHByaWNlID0gZm91bmRTZXJ2aWNlRGF0YS5wcmljZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByaWNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFtnZXRTZXJ2aWNlUHJpY2VUb29sXSBQcmljZSBub3QgZm91bmQgZm9yIHNlcnZpY2UgJyR7Zm91bmRTZXJ2aWNlRGF0YS5uYW1lfScgd2l0aCBzaXplICcke3ZlaGljbGVTaXplfScuIEJhc2UgcHJpY2UgYWxzbyBub3QgZm91bmQgb3IgaW52YWxpZC5gKTtcbiAgICAgICAgcmV0dXJuIHsgXG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgICAgIG1lc3NhZ2U6IGBIYXJnYSB1bnR1ayBsYXlhbmFuIFwiJHtmb3VuZFNlcnZpY2VEYXRhLm5hbWV9XCIgcGFkYSBtb3RvciB1a3VyYW4gJHt2ZWhpY2xlU2l6ZX0gKCR7dmVoaWNsZU1vZGVsfSkgYmVsdW0gdGVyc2VkaWEgc2FhdCBpbmkuIE11bmdraW4gWm95YSBiaXNhIGJhbnR1IGNhcmlrYW4gbGF5YW5hbiBsYWluP2AsXG4gICAgICAgICAgc2l6ZTogdmVoaWNsZVNpemUsXG4gICAgICAgICAgZXN0aW1hdGVkRHVyYXRpb246IGVzdGltYXRlZER1cmF0aW9uIC8vIEtpcmltIGR1cmFzaSBkYXNhciBqaWthIGhhcmdhIHRpZGFrIGtldGVtdVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZyhgW2dldFNlcnZpY2VQcmljZVRvb2xdIFN1Y2Nlc3M6IEZvdW5kIHByaWNlIFJwICR7cHJpY2V9IGZvciAke3NlcnZpY2VOYW1lfSBvbiAke3ZlaGljbGVNb2RlbH0gKHNpemUgJHt2ZWhpY2xlU2l6ZX0pLiBEdXJhdGlvbjogJHtlc3RpbWF0ZWREdXJhdGlvbiB8fCAnTi9BJ31gKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgc2l6ZTogdmVoaWNsZVNpemUsXG4gICAgICAgIG1lc3NhZ2U6IGBIYXJnYSB1bnR1ayBsYXlhbmFuICR7Zm91bmRTZXJ2aWNlRGF0YS5uYW1lfSBwYWRhIG1vdG9yICR7dmVoaWNsZU1vZGVsfSAoU2l6ZSAke3ZlaGljbGVTaXplfSkgYWRhbGFoIFJwICR7cHJpY2UudG9Mb2NhbGVTdHJpbmcoJ2lkLUlEJyl9LiBFc3RpbWFzaSBkdXJhc2k6ICR7ZXN0aW1hdGVkRHVyYXRpb24gfHwgJ04vQSd9LmAsXG4gICAgICAgIGVzdGltYXRlZER1cmF0aW9uOiBlc3RpbWF0ZWREdXJhdGlvbiB8fCB1bmRlZmluZWQgLy8gS2lyaW0gZHVyYXNpIHlhbmcgcmVsZXZhblxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbZ2V0U2VydmljZVByaWNlVG9vbF0gRXJyb3IgZXhlY3V0aW5nIHRvb2w6XCIsIGVycm9yLm1lc3NhZ2UsIGVycm9yLnN0YWNrKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGBXYWR1aCwgWm95YSBsYWdpIHB1c2luZyBuaWgsIGFkYSBlcnJvciBwYXMgbmdlY2VrIGhhcmdhOiAke2Vycm9yLm1lc3NhZ2V9YCB9O1xuICAgIH1cbiAgfVxuKTtcblxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gIEZMT1c6IExvZ2lrYSB1dGFtYSBjaGF0Ym90IFpveWFcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5jb25zdCB6b3lhQ2hhdEZsb3cgPSBhaS5kZWZpbmVGbG93KFxuICB7XG4gICAgbmFtZTogJ3pveWFDaGF0RmxvdycsXG4gICAgaW5wdXRTY2hlbWE6IFpveWFDaGF0SW5wdXRTY2hlbWEsXG4gICAgb3V0cHV0U2NoZW1hOiBab3lhQ2hhdE91dHB1dFNjaGVtYSxcbiAgfSxcbiAgYXN5bmMgKGlucHV0KSA9PiB7XG4gICAgY29uc3QgbGFzdFVzZXJNZXNzYWdlQ29udGVudCA9IGlucHV0LmN1c3RvbWVyTWVzc2FnZSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlucHV0Lm1lc3NhZ2VzICYmIGlucHV0Lm1lc3NhZ2VzLmxlbmd0aCA+IDAgPyBpbnB1dC5tZXNzYWdlc1tpbnB1dC5tZXNzYWdlcy5sZW5ndGggLSAxXS5jb250ZW50IDogJycpO1xuXG4gICAgaWYgKCFsYXN0VXNlck1lc3NhZ2VDb250ZW50IHx8IGxhc3RVc2VyTWVzc2FnZUNvbnRlbnQudHJpbSgpID09PSAnJykge1xuICAgICAgY29uc29sZS53YXJuKFwiW0NTLUZMT1ddIE5vIHZhbGlkIGxhc3QgdXNlciBtZXNzYWdlIGNvbnRlbnQuIFJldHVybmluZyBlbXB0eSByZXBseS5cIik7XG4gICAgICByZXR1cm4gXCJcIjsgLy8gS2VtYmFsaWthbiBzdHJpbmcga29zb25nIGppa2EgdGlkYWsgYWRhIHBlc2FuIHVzZXJcbiAgICB9XG4gICAgY29uc3QgbGFzdE1lc3NhZ2VMb3dlckNhc2UgPSBsYXN0VXNlck1lc3NhZ2VDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgXG4gICAgLy8gMS4gRHluYW1pYyBDb250ZXh0IEJ1aWxkaW5nIChTZWRlcmhhbmEgZHVsdSlcbiAgICBsZXQgZHluYW1pY0NvbnRleHQgPSBgSU5GT19VTVVNX0JFTkdLRUw6IFFMQUIgTW90byBEZXRhaWxpbmcgYWRhbGFoIGJlbmdrZWwgcGVyYXdhdGFuIGRhbiBkZXRhaWxpbmcgbW90b3IuYDtcblxuICAgIC8vIFVudHVrIHNlbWVudGFyYSwga2l0YSB0aWRhayBtZWxha3VrYW4gZGV0ZWtzaSBlbnRpdGFzIGtvbXBsZWtzIGRpIHNpbmkgdW50dWsgbWVueWVkZXJoYW5ha2FuLlxuICAgIC8vIEppa2EgdG9vbCBkaXBhbmdnaWwsIG91dHB1dCB0b29sIGFrYW4gbWVuamFkaSBrb250ZWtzIGJhcnUgdW50dWsgQUkuXG4gICAgaWYgKCFkYikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbQ1MtRkxPV10gRmlyZXN0b3JlIERCIChkYikgaXMgbm90IGluaXRpYWxpemVkLiBFbnRpdHkgZGV0ZWN0aW9uIGFuZCBwcmljaW5nIHdpbGwgYmUgc2tpcHBlZCBpbiBjb250ZXh0IHByZS1idWlsZGluZy5cIik7XG4gICAgICAgIGR5bmFtaWNDb250ZXh0ICs9IFwiIFdBUk5JTkc6IERhdGFiYXNlIHRpZGFrIHRlcmh1YnVuZywgaW5mbyBoYXJnYSBtdW5na2luIHRpZGFrIGFrdXJhdCBqaWthIHRvb2wgdGlkYWsgZGlwYW5nZ2lsLlwiO1xuICAgIH1cbiAgICBcbiAgICBjb25zb2xlLmxvZyhgW0NTLUZMT1ddIER5bmFtaWMgY29udGV4dCBidWlsdDogJHtkeW5hbWljQ29udGV4dH1gKTtcblxuICAgIC8vIDIuIFNpYXBrYW4gaGlzdG9yaSBkYW4gcHJvbXB0IHVudHVrIEFJXG4gICAgLy8gJ21lc3NhZ2VzJyBkaSBpbnB1dCBzdWRhaCBiZXJpc2kgcml3YXlhdCwgcGVzYW4gdGVyYWtoaXIgYWRhbGFoIGRhcmkgdXNlci5cbiAgICAvLyBLaXRhIHBlcmx1IG1lbWZvcm1hdG55YSBrZSB7IHJvbGUsIGNvbnRlbnQ6IFt7IHRleHQ6IC4uLiB9XSB9XG4gICAgY29uc3QgaGlzdG9yeUZvckFJID0gKGlucHV0Lm1lc3NhZ2VzIHx8IFtdKVxuICAgICAgLmZpbHRlcihtc2cgPT4gbXNnLmNvbnRlbnQgJiYgbXNnLmNvbnRlbnQudHJpbSgpICE9PSAnJykgLy8gUGFzdGlrYW4gYWRhIGtvbnRlblxuICAgICAgLnNsaWNlKDAsIC0xKSAvLyBBbWJpbCBzZW11YSBLRUNVQUxJIHBlc2FuIHVzZXIgdGVyYWtoaXIgKGthcmVuYSBpdHUgYWthbiBqYWRpIHByb21wdCB1dGFtYSlcbiAgICAgIC5tYXAoKG1zZykgPT4gKHtcbiAgICAgICAgcm9sZTogbXNnLnJvbGUsXG4gICAgICAgIGNvbnRlbnQ6IFt7IHRleHQ6IG1zZy5jb250ZW50IH1dLCAvLyBTdHJ1a3R1ciBjb250ZW50IHlhbmcgZGloYXJhcGthbiBHZW5raXQgdjEueFxuICAgIH0pKTtcbiAgICBcbiAgICAvLyBHdW5ha2FuIHByb21wdCB1dGFtYSBkYXJpIGlucHV0IGppa2EgYWRhLCBqaWthIHRpZGFrLCBhbWJpbCBkYXJpIERFRkFVTFRfQUlfU0VUVElOR1NcbiAgICBjb25zdCBzeXN0ZW1JbnN0cnVjdGlvblRleHQgPSAoaW5wdXQubWFpblByb21wdFN0cmluZyB8fCBERUZBVUxUX0FJX1NFVFRJTkdTLm1haW5Qcm9tcHQpLnJlcGxhY2UoXCJ7e2R5bmFtaWNDb250ZXh0fX1cIiwgZHluYW1pY0NvbnRleHQpO1xuICAgIFxuICAgIC8vIEdhYnVuZ2thbiBpbnN0cnVrc2kgc2lzdGVtIGRlbmdhbiBwZXNhbiB1c2VyIHRlcmFraGlyXG4gICAgY29uc3QgdXNlclByb21wdFdpdGhTeXN0ZW1JbnN0cnVjdGlvbiA9IGAke3N5c3RlbUluc3RydWN0aW9uVGV4dH1cblxuLS0tXG5cblVTRVJfSU5QVVQ6IFwiJHtsYXN0VXNlck1lc3NhZ2VDb250ZW50fVwiXG5cbkpBV0FCQU4gWk9ZQTpgOyAvLyBUYW1iYWhrYW4gbGFiZWwgaW5pIHVudHVrIG1lbWFuZHUgQUlcblxuICAgIGNvbnN0IG1lc3NhZ2VzRm9yQUkgPSBbXG4gICAgICAuLi5oaXN0b3J5Rm9yQUksXG4gICAgICB7IHJvbGU6ICd1c2VyJyBhcyBjb25zdCwgY29udGVudDogW3sgdGV4dDogdXNlclByb21wdFdpdGhTeXN0ZW1JbnN0cnVjdGlvbiB9XSB9IC8vIFBlc2FuIHVzZXIgdGVyYWtoaXIgZGVuZ2FuIGluc3RydWtzaSBzaXN0ZW1cbiAgICBdO1xuXG4gICAgY29uc29sZS5sb2coXCJbQ1MtRkxPV10gQ2FsbGluZyBhaS5nZW5lcmF0ZSB3aXRoIG1vZGVsIGdvb2dsZWFpL2dlbWluaS0xLjUtZmxhc2gtbGF0ZXN0LiBIaXN0b3J5IExlbmd0aDpcIiwgaGlzdG9yeUZvckFJLmxlbmd0aCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJbQ1MtRkxPV10gRnVsbCBQcm9tcHQgUHJldmlldyAoZmlyc3QgNTAwIGNoYXJzKTogXFxuXCIsIHVzZXJQcm9tcHRXaXRoU3lzdGVtSW5zdHJ1Y3Rpb24uc3Vic3RyaW5nKDAsIDUwMCkgKyBcIi4uLlwiKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWkuZ2VuZXJhdGUoe1xuICAgICAgICBtb2RlbDogJ2dvb2dsZWFpL2dlbWluaS0xLjUtZmxhc2gtbGF0ZXN0JyxcbiAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzRm9yQUksXG4gICAgICAgIHRvb2xzOiBbZ2V0U2VydmljZVByaWNlVG9vbCBhcyBhbnldLCAvLyBBa3RpZmthbiB0b29sXG4gICAgICAgIHRvb2xDaG9pY2U6ICdhdXRvJywgLy8gQmlhcmthbiBBSSBtZW1pbGloIGthcGFuIG1lbmdndW5ha2FuIHRvb2xcbiAgICAgICAgY29uZmlnOiB7IHRlbXBlcmF0dXJlOiAwLjUgfSxcbiAgICAgICAgLy8gc2FmZXR5U2V0dGluZ3M6IFsgLy8gSW5pIGJpc2EgZGl0YW1iYWhrYW4gamlrYSBhZGEgbWFzYWxhaCBzYWZldHkgZmlsdGVyXG4gICAgICAgIC8vICAgeyBjYXRlZ29yeTogJ0hBUk1fQ0FURUdPUllfSEFSQVNTTUVOVCcsIHRocmVzaG9sZDogJ0JMT0NLX09OTFlfSElHSCcgfSxcbiAgICAgICAgLy8gICB7IGNhdGVnb3J5OiAnSEFSTV9DQVRFR09SWV9IQVRFX1NQRUVDSCcsIHRocmVzaG9sZDogJ0JMT0NLX09OTFlfSElHSCcgfSxcbiAgICAgICAgLy8gXSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zb2xlLmxvZyhcIltDUy1GTE9XXSBSYXcgQUkgZ2VuZXJhdGUgcmVzdWx0OlwiLCBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpKTtcblxuICAgICAgLy8gQ2VrIGFwYWthaCBBSSBtZW1pbnRhIHBlbWFuZ2dpbGFuIHRvb2xcbiAgICAgIGNvbnN0IHRvb2xSZXF1ZXN0ID0gcmVzdWx0LnRvb2xSZXF1ZXN0KCk7XG4gICAgICBpZiAodG9vbFJlcXVlc3QpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbQ1MtRkxPV10gQUkgcmVxdWVzdGVkIGEgdG9vbCBjYWxsOlwiLCBKU09OLnN0cmluZ2lmeSh0b29sUmVxdWVzdCwgbnVsbCwgMikpO1xuICAgICAgICAvLyBEaSBzaW5pIGtpdGEgcGVybHUgbWVtYW5nZ2lsIHRvb2wgeWFuZyBkaW1pbnRhIGRhbiBtZW5naXJpbSBoYXNpbG55YSBrZW1iYWxpIGtlIEFJXG4gICAgICAgIC8vIFVudHVrIGltcGxlbWVudGFzaSBzZWRlcmhhbmEsIGtpdGEgYmlzYSBjb2JhIHBhbmdnaWwgdG9vbG55YSBsYW5nc3VuZyBqaWthIGhhbnlhIHNhdHVcbiAgICAgICAgaWYgKHRvb2xSZXF1ZXN0LnRvb2wgPT09ICdnZXRTZXJ2aWNlUHJpY2UnICYmIHRvb2xSZXF1ZXN0LmlucHV0KSB7XG4gICAgICAgICAgY29uc3QgdG9vbFJlc3VsdCA9IGF3YWl0IGdldFNlcnZpY2VQcmljZVRvb2wuZm4odG9vbFJlcXVlc3QuaW5wdXQgYXMgei5pbmZlcjx0eXBlb2YgZ2V0U2VydmljZVByaWNlVG9vbC5pbnB1dFNjaGVtYT4pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0NTLUZMT1ddIFRvb2wgZXhlY3V0aW9uIHJlc3VsdDpcIiwgSlNPTi5zdHJpbmdpZnkodG9vbFJlc3VsdCwgbnVsbCwgMikpO1xuXG4gICAgICAgICAgLy8gS2lyaW0gaGFzaWwgdG9vbCBrZW1iYWxpIGtlIEFJIHVudHVrIGdlbmVyYXNpIHRla3MgZmluYWxcbiAgICAgICAgICBjb25zdCBmaW5hbFJlc3VsdCA9IGF3YWl0IGFpLmdlbmVyYXRlKHtcbiAgICAgICAgICAgIG1vZGVsOiAnZ29vZ2xlYWkvZ2VtaW5pLTEuNS1mbGFzaC1sYXRlc3QnLFxuICAgICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgICAgLi4ubWVzc2FnZXNGb3JBSSwgLy8gS2lyaW0gbGFnaSBoaXN0b3JpIGRhbiBwcm9tcHQgYXdhbFxuICAgICAgICAgICAgICB7IHJvbGU6ICdtb2RlbCcsIGNvbnRlbnQ6IFt7IHRvb2xSZXF1ZXN0IH1dIH0sIC8vIFBlc2FuIGRhcmkgQUkgeWFuZyBtZW1pbnRhIHRvb2xcbiAgICAgICAgICAgICAgeyByb2xlOiAndG9vbCcsIGNvbnRlbnQ6IFt7IHRvb2xSZXNwb25zZTogeyB0b29sOiAnZ2V0U2VydmljZVByaWNlJywgb3V0cHV0OiB0b29sUmVzdWx0IH0gfV0gfSAvLyBIYXNpbCBkYXJpIHRvb2xcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBjb25maWc6IHsgdGVtcGVyYXR1cmU6IDAuNSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0NTLUZMT1ddIFJhdyBBSSBnZW5lcmF0ZSByZXN1bHQgQUZURVIgVE9PTCBDQUxMOlwiLCBKU09OLnN0cmluZ2lmeShmaW5hbFJlc3VsdCwgbnVsbCwgMikpO1xuICAgICAgICAgIGNvbnN0IHN1Z2dlc3RlZFJlcGx5RnJvbVRvb2xGb2xsb3dVcCA9IGZpbmFsUmVzdWx0LnRleHQoKSB8fCBcIlwiO1xuICAgICAgICAgICBpZiAoIXN1Z2dlc3RlZFJlcGx5RnJvbVRvb2xGb2xsb3dVcCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBbQ1MtRkxPV10g4pqg77iPIEFJIHJldHVybmVkIGVtcHR5IHJlcGx5IEFGVEVSIHRvb2wgY2FsbC4gRmluaXNoUmVhc29uOiAke2ZpbmFsUmVzdWx0LmZpbmlzaFJlYXNvbn0uYCk7XG4gICAgICAgICAgICByZXR1cm4gXCJNYWFmLCBab3lhIGxhZ2kgYmluZ3VuZyBuaWggc2V0ZWxhaCBjb2JhIGNhcmkgaW5mby4gQ29iYSB0YW55YSBsYWdpIHlhLlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3VnZ2VzdGVkUmVwbHlGcm9tVG9vbEZvbGxvd1VwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIltDUy1GTE9XXSBVbmhhbmRsZWQgdG9vbCByZXF1ZXN0IG9yIG1pc3NpbmcgaW5wdXQ6XCIsIHRvb2xSZXF1ZXN0KTtcbiAgICAgICAgICByZXR1cm4gXCJNYWFmLCBab3lhIG1lbmNvYmEgbWVsYWt1a2FuIHNlc3VhdHUgdGFwaSBhZGEgeWFuZyBzYWxhaC4gQmlzYSB1bGFuZ2kgcGVydGFueWFhbm55YT9cIjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBKaWthIHRpZGFrIGFkYSB0b29sIHJlcXVlc3QsIGFtYmlsIHRla3MgYmlhc2FcbiAgICAgIGNvbnN0IHN1Z2dlc3RlZFJlcGx5ID0gcmVzdWx0LnRleHQoKSB8fCBcIlwiO1xuXG4gICAgICAvLyBEaWFnbm9zaXMgamlrYSBiYWxhc2FuIGtvc29uZyAobGFnaSlcbiAgICAgIGNvbnN0IGZpbmlzaFJlYXNvbiA9IHJlc3VsdC5maW5pc2hSZWFzb247XG4gICAgICBjb25zdCBzYWZldHlSYXRpbmdzID0gcmVzdWx0LnNhZmV0eVJhdGluZ3M7XG4gICAgICBjb25zb2xlLmxvZyhgW0NTLUZMT1ddIEFJIEZpbmlzaCBSZWFzb246ICR7ZmluaXNoUmVhc29ufWApO1xuICAgICAgaWYgKHNhZmV0eVJhdGluZ3MgJiYgc2FmZXR5UmF0aW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbQ1MtRkxPV10gQUkgU2FmZXR5IFJhdGluZ3M6JywgSlNPTi5zdHJpbmdpZnkoc2FmZXR5UmF0aW5ncywgbnVsbCwgMikpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoIXN1Z2dlc3RlZFJlcGx5KSB7XG4gICAgICAgIGlmIChmaW5pc2hSZWFzb24gIT09IFwic3RvcFwiKSB7IFxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFtDUy1GTE9XXSDinYwgQUkgZ2VuZXJhdGlvbiBmYWlsZWQuIEZpbmlzaCBSZWFzb246ICR7ZmluaXNoUmVhc29ufS4gU2FmZXR5OiAke0pTT04uc3RyaW5naWZ5KHNhZmV0eVJhdGluZ3MpfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgW0NTLUZMT1ddIOKaoO+4jyBBSSByZXR1cm5lZCBhbiBlbXB0eSByZXBseSwgYnV0IGZpbmlzaFJlYXNvbiB3YXMgJ3N0b3AnLiBUaGlzIG1pZ2h0IGluZGljYXRlIGFuIGlzc3VlIG9yIHVuZXhwZWN0ZWQgbW9kZWwgYmVoYXZpb3IuIFNhZmV0eSBSYXRpbmdzOiAke0pTT04uc3RyaW5naWZ5KHNhZmV0eVJhdGluZ3MpfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIk1hYWYsIFpveWEgbGFnaSBhZ2FrIGJpbmd1bmcgbmloIGJvc2t1dS4gQ29iYSB0YW55YSBsYWdpIGRlbmdhbiBjYXJhIGxhaW4geWEsIGF0YXUgaHVidW5naSBDUyBsYW5nc3VuZy5cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdWdnZXN0ZWRSZXBseTtcblxuICAgIH0gY2F0Y2ggKGZsb3dFcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbQ1MtRkxPV10g4p2MIENyaXRpY2FsIGVycm9yIGRhbGFtIGZsb3cgem95YUNoYXRGbG93OlwiLCBmbG93RXJyb3IpO1xuICAgICAgICBpZiAoZmxvd0Vycm9yLmNhdXNlKSB7IFxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIltDUy1GTE9XXSBFcnJvciBDYXVzZTpcIiwgSlNPTi5zdHJpbmdpZnkoZmxvd0Vycm9yLmNhdXNlLCBudWxsLCAyKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBXYWR1aCwgWm95YSBsYWdpIGVycm9yIG5paCwgYm9za3V1LiBDb2JhIHRhbnlhIGxhZ2kgbmFudGkgeWEuIChQZXNhbiBFcnJvcjogJHtmbG93RXJyb3IubWVzc2FnZSB8fCAnS2VzYWxhaGFuIGludGVybmFsIHRpZGFrIGRpa2V0YWh1aSd9KWA7XG4gICAgfVxuICB9XG4pO1xuXG4vLyBGdW5nc2kgd3JhcHBlciB5YW5nIGFrYW4gZGlwYW5nZ2lsIG9sZWggVUkgYXRhdSBBUEkgcm91dGVcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVdoYXRzQXBwUmVwbHkoaW5wdXQ6IFpveWFDaGF0SW5wdXQpOiBQcm9taXNlPHsgc3VnZ2VzdGVkUmVwbHk6IHN0cmluZyB9PiB7XG4gIGNvbnNvbGUubG9nKFwiW0NTLUZMT1ddIGdlbmVyYXRlV2hhdHNBcHBSZXBseSBpbnB1dDpcIiwgSlNPTi5zdHJpbmdpZnkoaW5wdXQsIG51bGwsIDIpKTtcbiAgXG4gIGlmICghaW5wdXQubWFpblByb21wdFN0cmluZykge1xuICAgIC8vIEFtYmlsIHByb21wdCBkYXJpIEZpcmVzdG9yZSBhdGF1IGRlZmF1bHRcbiAgICAvLyBVbnR1ayBzZWthcmFuZywga2l0YSBwYWthaSBkZWZhdWx0IGxhbmdzdW5nXG4gICAgY29uc3QgbWFpblByb21wdEZyb21TZXR0aW5ncyA9IERFRkFVTFRfQUlfU0VUVElOR1MubWFpblByb21wdDsgXG4gICAgY29uc29sZS5sb2coXCJbQ1MtRkxPV10gZ2VuZXJhdGVXaGF0c0FwcFJlcGx5OiBtYWluUHJvbXB0IG5vdCBmb3VuZCBpbiBpbnB1dC4gVXNpbmcgREVGQVVMVF9BSV9TRVRUSU5HUy5tYWluUHJvbXB0LlwiKTtcbiAgICBpbnB1dC5tYWluUHJvbXB0U3RyaW5nID0gbWFpblByb21wdEZyb21TZXR0aW5ncztcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIltDUy1GTE9XXSBnZW5lcmF0ZVdoYXRzQXBwUmVwbHk6IFVzaW5nIG1haW5Qcm9tcHRTdHJpbmcgZnJvbSBpbnB1dC5cIik7XG4gIH1cblxuICAvLyBQYXN0aWthbiBpbnB1dC5tZXNzYWdlcyBhZGEsIG1pbmltYWwgYXJyYXkga29zb25nIGppa2EgdGlkYWsgYWRhIHJpd2F5YXRcbiAgaWYgKCFpbnB1dC5tZXNzYWdlcykge1xuICAgIGlucHV0Lm1lc3NhZ2VzID0gW107XG4gIH1cblxuICAvLyBKaWthIGlucHV0LmN1c3RvbWVyTWVzc2FnZSBhZGEsIHRhbWJhaGthbiBzZWJhZ2FpIHBlc2FuIHVzZXIgdGVyYWtoaXIga2UgaW5wdXQubWVzc2FnZXNcbiAgLy8gSW5pIGFrYW4gamFkaSBwZXNhbiB1c2VyIHlhbmcgZGlwcm9zZXMgb2xlaCB6b3lhQ2hhdEZsb3dcbiAgaWYgKGlucHV0LmN1c3RvbWVyTWVzc2FnZSAmJiBpbnB1dC5jdXN0b21lck1lc3NhZ2UudHJpbSgpICE9PSBcIlwiKSB7XG4gICAgaW5wdXQubWVzc2FnZXMucHVzaCh7IHJvbGU6ICd1c2VyJywgY29udGVudDogaW5wdXQuY3VzdG9tZXJNZXNzYWdlIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBKYWxhbmthbiBmbG93IEdlbmtpdC4gYHJ1bkZsb3dgIHRpZGFrIGFkYSBkaSBHZW5raXQgdjEueCwgZmxvdyBkaXBhbmdnaWwgbGFuZ3N1bmcuXG4gICAgY29uc3QgcmVwbHlUZXh0ID0gYXdhaXQgem95YUNoYXRGbG93KGlucHV0KTtcbiAgICByZXR1cm4geyBzdWdnZXN0ZWRSZXBseTogcmVwbHlUZXh0IH07XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiW0NTLUZMT1cgV3JhcHBlcl0gRXJyb3IgcnVubmluZyB6b3lhQ2hhdEZsb3c6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBzdWdnZXN0ZWRSZXBseTogYE1hYWYsIFpveWEgc2VkYW5nIGFkYSBrZW5kYWxhIHRla25pcy4gKCR7ZXJyb3IubWVzc2FnZSB8fCAnVGlkYWsgZGlrZXRhaHVpJ30pYCB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InFUQWlVc0IifQ==
}}),
"[project]/src/components/ui/scroll-area.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ScrollArea": (()=>ScrollArea),
    "ScrollBar": (()=>ScrollBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const ScrollArea = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative overflow-hidden", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
                className: "h-full w-full rounded-[inherit]",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 17,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Corner"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 21,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, this));
ScrollArea.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
const ScrollBar = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, orientation = "vertical", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"], {
        ref: ref,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollAreaThumb"], {
            className: "relative flex-1 rounded-full bg-border"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 43,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 30,
        columnNumber: 3
    }, this));
ScrollBar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"].displayName;
;
}}),
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
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

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
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

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
"[project]/src/lib/firebase.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "app": (()=>app),
    "db": (()=>db)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm2017.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
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
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length === 0) {
    try {
        app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(firebaseConfig);
        console.log("[firebase.ts] Firebase app initialized. Project ID:", app.options.projectId);
    } catch (e) {
        console.error("[firebase.ts] FAILED to initialize Firebase app:", e.message);
        // @ts-ignore
        app = null;
    }
} else {
    app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApp"])();
    console.log("[firebase.ts] Using existing Firebase app. Project ID:", app.options.projectId);
}
// @ts-ignore
if (app) {
    try {
        // @ts-ignore
        db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFirestore"])(app);
        console.log("[firebase.ts] Firestore instance obtained.");
    } catch (e) {
        console.error("[firebase.ts] FAILED to get Firestore instance:", e?.message);
    }
} else {
    console.error("[firebase.ts] Firebase app not properly initialized, cannot get Firestore.");
}
;
}}),
"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}}),
"[project]/src/app/(app)/ai-cs-assistant/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AiCsAssistantPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)"); // Import Link
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>"); // Removed BrainCircuit, PhoneForwarded, Info, PlusCircle, Trash2
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square-text.js [app-ssr] (ecmascript) <export default as MessageSquareText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-ssr] (ecmascript) <export default as ThumbsUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-down.js [app-ssr] (ecmascript) <export default as ThumbsDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-ssr] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-ssr] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$de1ed0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:de1ed0 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/separator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-node/v4.js [app-ssr] (ecmascript) <export default as v4>");
"use client";
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
;
;
;
;
;
;
function formatPhoneNumberForMatching(number) {
    if (!number || typeof number !== 'string' || number.trim() === '') {
        return '';
    }
    let cleaned = number.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.substring(1);
    } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13 && /^\d+$/.test(cleaned)) {
        cleaned = '62' + cleaned;
    } else if (!cleaned.startsWith('62') && /^\d{9,13}$/.test(cleaned) && !cleaned.startsWith('+')) {
        cleaned = '62' + cleaned;
    }
    if (cleaned.startsWith('62') && cleaned.length >= 10) {
        return cleaned;
    }
    return '';
}
function AiCsAssistantPage() {
    const [customerMessageInput, setCustomerMessageInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentPlaygroundInput, setCurrentPlaygroundInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [playgroundChatHistory, setPlaygroundChatHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingPlaygroundSuggestion, setIsLoadingPlaygroundSuggestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingCustomers, setLoadingCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedCustomer, setSelectedCustomer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chatHistory, setChatHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isPlaygroundMode, setIsPlaygroundMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSendingWhatsApp, setIsSendingWhatsApp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playgroundMessagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const unsubscribeChatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // AI Agent Settings & Knowledge Base related state and functions are MOVED to the new settings page.
    const scrollToBottom = (ref)=>{
        ref.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isPlaygroundMode && selectedCustomer && chatHistory.length > 0) {
            scrollToBottom(messagesEndRef);
        }
    }, [
        chatHistory,
        selectedCustomer,
        isPlaygroundMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isPlaygroundMode && playgroundChatHistory.length > 0) {
            scrollToBottom(playgroundMessagesEndRef);
        }
    }, [
        playgroundChatHistory,
        isPlaygroundMode
    ]);
    const fetchCustomers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        console.log("Fetching actual customers from Firestore...");
        try {
            const clientsCollectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'clients');
            const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(clientsCollectionRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])("name"));
            const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocs"])(q);
            const clientsData = querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                }));
            return clientsData.map((client)=>({
                    id: client.id,
                    name: client.name,
                    avatarUrl: client.photoUrl || `https://placehold.co/40x40.png?text=${client.name.charAt(0)}`,
                    lastMessageTimestamp: client.lastVisit || 'N/A',
                    lastMessage: 'Klik untuk melihat chat...',
                    unreadCount: 0,
                    phone: client.phone
                }));
        } catch (error) {
            console.error("Error fetching customers from Firestore: ", error);
            toast({
                title: "Error Database",
                description: "Gagal mengambil daftar pelanggan dari database.",
                variant: "destructive"
            });
            return [];
        }
    }, [
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadInitialData = async ()=>{
            setLoadingCustomers(true);
            try {
                const fetchedCustomers = await fetchCustomers();
                setCustomers(fetchedCustomers);
            } catch (error) {
                console.error("Failed to fetch customers:", error);
            } finally{
                setLoadingCustomers(false);
            }
        };
        loadInitialData();
    }, [
        fetchCustomers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (unsubscribeChatRef.current) {
            unsubscribeChatRef.current();
            unsubscribeChatRef.current = null;
        }
        if (selectedCustomer && !isPlaygroundMode) {
            const phoneToQuery = formatPhoneNumberForMatching(selectedCustomer.phone);
            if (phoneToQuery) {
                const messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'directMessages');
                const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["where"])("senderNumber", "==", phoneToQuery), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderBy"])("timestamp", "asc"));
                unsubscribeChatRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onSnapshot"])(q, (querySnapshot)=>{
                    const history = [];
                    querySnapshot.forEach((doc)=>{
                        const data = doc.data();
                        history.push({
                            ...data,
                            id: doc.id,
                            timestamp: data.timestamp?.toDate().toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit'
                            }) || 'N/A'
                        });
                    });
                    setChatHistory(history);
                }, (error)=>{
                    console.error(`Error fetching real-time chat for ${selectedCustomer.name} (phone: ${phoneToQuery}):`, error);
                    toast({
                        title: "Error Real-time Chat",
                        description: "Gagal memuat pesan secara real-time.",
                        variant: "destructive"
                    });
                });
            } else {
                setChatHistory([]);
                if (selectedCustomer.phone) {
                    console.warn(`Nomor telepon pelanggan "${selectedCustomer.name}" (${selectedCustomer.phone}) tidak valid atau tidak dapat diformat untuk query.`);
                    toast({
                        title: "Info Pelanggan",
                        description: `Nomor HP ${selectedCustomer.name} (${selectedCustomer.phone}) tidak dapat diformat, riwayat chat mungkin tidak tampil.`,
                        variant: "default"
                    });
                }
            }
        } else {
            setChatHistory([]);
        }
        return ()=>{
            if (unsubscribeChatRef.current) {
                unsubscribeChatRef.current();
            }
        };
    }, [
        selectedCustomer,
        toast,
        isPlaygroundMode
    ]);
    const handleSelectPlayground = ()=>{
        setIsPlaygroundMode(true);
        setSelectedCustomer(null);
        setCustomerMessageInput('');
        setCurrentPlaygroundInput('');
        setPlaygroundChatHistory([]);
        if (unsubscribeChatRef.current) {
            unsubscribeChatRef.current();
            unsubscribeChatRef.current = null;
        }
    };
    const handleCustomerSelect = async (customer)=>{
        setIsPlaygroundMode(false);
        setSelectedCustomer(customer);
        setCustomerMessageInput('');
    };
    const handleSendPlaygroundMessage = async ()=>{
        if (!currentPlaygroundInput.trim()) {
            toast({
                title: "Input Kosong",
                description: "Mohon masukkan pertanyaan untuk AI.",
                variant: "destructive"
            });
            return;
        }
        const userMessageText = currentPlaygroundInput.trim();
        const userMessage = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            sender: 'user',
            text: userMessageText,
            timestamp: new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        const updatedPlaygroundHistory = [
            ...playgroundChatHistory,
            userMessage
        ];
        setPlaygroundChatHistory(updatedPlaygroundHistory);
        setCurrentPlaygroundInput('');
        setIsLoadingPlaygroundSuggestion(true);
        // Map playground history to Genkit ChatMessage format
        const genkitMessagesForFlow = updatedPlaygroundHistory.filter((msg)=>msg.sender === 'user' || msg.sender === 'ai') // Only include user and AI messages
        .map((msg)=>({
                role: msg.sender === 'user' ? 'user' : 'model',
                content: msg.text
            }));
        // Prepare ZoyaChatInput
        const flowInput = {
            messages: genkitMessagesForFlow.slice(0, -1),
            customerMessage: userMessageText
        };
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$de1ed0__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["generateWhatsAppReply"])(flowInput);
            const aiMessage = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                sender: 'ai',
                text: result.suggestedReply,
                timestamp: new Date().toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                feedback: null,
                currentCorrectionText: result.suggestedReply
            };
            setPlaygroundChatHistory((prev)=>[
                    ...prev,
                    aiMessage
                ]);
        } catch (error) {
            console.error("Error generating AI reply for playground:", error);
            const errorMessageText = error instanceof Error ? error.message : "Terjadi kesalahan.";
            const errorMessage = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                sender: 'ai',
                text: `Maaf, terjadi kesalahan saat menghubungi AI: ${errorMessageText}`,
                timestamp: new Date().toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };
            setPlaygroundChatHistory((prev)=>[
                    ...prev,
                    errorMessage
                ]);
            toast({
                title: "Error AI",
                description: `Gagal mendapatkan respon dari AI. ${errorMessageText}`,
                variant: "destructive"
            });
        } finally{
            setIsLoadingPlaygroundSuggestion(false);
        }
    };
    const handlePlaygroundKeyDown = (event)=>{
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendPlaygroundMessage();
        }
    };
    const handleSendMessage = async ()=>{
        const customerPhone = selectedCustomer?.phone;
        if (!customerMessageInput.trim() || !selectedCustomer || isPlaygroundMode || !customerPhone) {
            toast({
                title: "Tidak Dapat Mengirim",
                description: "Pesan kosong, pelanggan tidak dipilih, atau nomor HP pelanggan tidak tersedia.",
                variant: "destructive"
            });
            return;
        }
        const formattedPhoneForSending = formatPhoneNumberForMatching(customerPhone);
        if (!formattedPhoneForSending) {
            toast({
                title: "Nomor Tidak Valid",
                description: `Nomor HP pelanggan "${customerPhone}" tidak dapat diformat dengan benar untuk pengiriman.`,
                variant: "destructive"
            });
            return;
        }
        const textToSend = customerMessageInput.trim();
        const originalInput = customerMessageInput;
        setCustomerMessageInput('');
        setIsSendingWhatsApp(true);
        try {
            const response = await fetch('/api/whatsapp/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: formattedPhoneForSending,
                    message: textToSend
                })
            });
            const result = await response.json();
            if (response.ok && result.success) {
                toast({
                    title: "Pesan Terkirim ke WhatsApp",
                    description: `Pesan Anda sedang dikirim ke ${selectedCustomer.name}.`
                });
                const directMessagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'directMessages');
                const csMessageData = {
                    customerId: selectedCustomer.id,
                    customerName: selectedCustomer.name,
                    senderNumber: formattedPhoneForSending,
                    text: textToSend,
                    sender: 'user',
                    timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    read: true
                };
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addDoc"])(directMessagesRef, csMessageData);
                console.log("CS manual reply saved to directMessages.");
                try {
                    const lockResponse = await fetch('/api/whatsapp/set-intervention-lock', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            senderNumber: formattedPhoneForSending
                        })
                    });
                    const lockResult = await lockResponse.json();
                    if (lockResponse.ok && lockResult.success) {
                        console.log(`AI lock set for ${formattedPhoneForSending} via API call from UI.`);
                    } else {
                        console.warn(`Failed to set AI lock for ${formattedPhoneForSending} via API: ${lockResult.error}`);
                    }
                } catch (lockError) {
                    console.error(`Error calling set-intervention-lock API from UI:`, lockError);
                }
            } else {
                throw new Error(result.error || 'Gagal mengirim pesan via server lokal.');
            }
        } catch (error) {
            console.error("Error sending WhatsApp message or saving to DB:", error);
            toast({
                title: "Gagal Mengirim Pesan",
                description: error instanceof Error ? error.message : "Terjadi kesalahan.",
                variant: "destructive"
            });
            setCustomerMessageInput(originalInput);
        } finally{
            setIsSendingWhatsApp(false);
        }
    };
    const handleKeyDown = (event)=>{
        if (event.key === 'Enter' && !event.shiftKey && !isPlaygroundMode && selectedCustomer) {
            event.preventDefault();
            handleSendMessage();
        }
    };
    const handleSetManualLock = async ()=>{
        if (!selectedCustomer || !selectedCustomer.phone) {
            toast({
                title: "Info",
                description: "Pilih pelanggan dengan nomor HP untuk mengaktifkan lock AI.",
                variant: "default"
            });
            return;
        }
        const formattedPhoneForLock = formatPhoneNumberForMatching(selectedCustomer.phone);
        if (!formattedPhoneForLock) {
            toast({
                title: "Nomor Tidak Valid",
                description: `Nomor HP pelanggan "${selectedCustomer.phone}" tidak dapat diformat.`,
                variant: "destructive"
            });
            return;
        }
        setIsSendingWhatsApp(true);
        try {
            const response = await fetch('/api/whatsapp/set-intervention-lock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    senderNumber: formattedPhoneForLock
                })
            });
            const result = await response.json();
            if (response.ok && result.success) {
                toast({
                    title: "Lock AI Aktif",
                    description: `AI tidak akan merespons ${selectedCustomer.name} selama 1 jam.`,
                    variant: "default"
                });
            } else {
                throw new Error(result.error || "Gagal mengaktifkan lock AI.");
            }
        } catch (error) {
            console.error("Error manually setting AI lock:", error);
            toast({
                title: "Error Lock AI",
                description: error instanceof Error ? error.message : "Terjadi kesalahan.",
                variant: "destructive"
            });
        } finally{
            setIsSendingWhatsApp(false);
        }
    };
    const handlePlaygroundFeedback = (messageId, feedback)=>{
        setPlaygroundChatHistory((prevHistory)=>prevHistory.map((msg)=>msg.id === messageId ? {
                    ...msg,
                    feedback,
                    isEditingCorrection: feedback === 'bad' && !msg.correction,
                    currentCorrectionText: msg.currentCorrectionText ?? msg.text
                } : msg));
    };
    const handlePlaygroundCorrectionChange = (messageId, text)=>{
        setPlaygroundChatHistory((prevHistory)=>prevHistory.map((msg)=>msg.id === messageId ? {
                    ...msg,
                    currentCorrectionText: text
                } : msg));
    };
    const handleSavePlaygroundCorrection = (messageId)=>{
        setPlaygroundChatHistory((prevHistory)=>prevHistory.map((msg)=>msg.id === messageId ? {
                    ...msg,
                    correction: msg.currentCorrectionText,
                    isEditingCorrection: false
                } : msg));
        toast({
            title: "Koreksi Disimpan",
            description: "Feedback Anda telah dicatat.",
            variant: "default"
        });
    };
    const filteredCustomers = customers.filter((customer)=>customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone && customer.phone.includes(searchTerm));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full bg-background",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    title: "Asisten CS AI untuk WhatsApp"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                    lineNumber: 469,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-1 md:col-span-1 lg:col-span-1 border-r border-border bg-card flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-lg flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                    className: "mr-2 h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 17
                                                }, this),
                                                " Daftar Pelanggan"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 474,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative mt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                    className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 478,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "search",
                                                    placeholder: "Cari pelanggan (nama/HP)...",
                                                    className: "pl-8 w-full h-9",
                                                    value: searchTerm,
                                                    onChange: (e)=>setSearchTerm(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 477,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 473,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-3 hover:bg-muted cursor-pointer border-b border-t border-border", isPlaygroundMode ? 'bg-accent text-accent-foreground' : ''),
                                    onClick: handleSelectPlayground,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-9 w-9 flex items-center justify-center", isPlaygroundMode ? "bg-accent-foreground text-accent" : "bg-primary/10 text-primary"),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 498,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium truncate",
                                                        children: "AI Playground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground truncate",
                                                        children: "Uji coba AI tanpa pelanggan."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 504,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 497,
                                        columnNumber: 15
                                    }, this)
                                }, "ai-playground", false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 489,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                    className: "flex-grow",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "p-0",
                                        children: loadingCustomers ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 text-center text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "h-6 w-6 animate-spin mx-auto my-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 514,
                                                    columnNumber: 21
                                                }, this),
                                                "Memuat pelanggan..."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 513,
                                            columnNumber: 19
                                        }, this) : filteredCustomers.length === 0 && searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "p-4 text-center text-muted-foreground",
                                            children: "Pelanggan tidak ditemukan."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 518,
                                            columnNumber: 20
                                        }, this) : filteredCustomers.length === 0 && !searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "p-4 text-center text-muted-foreground",
                                            children: "Belum ada pelanggan."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 522,
                                            columnNumber: 20
                                        }, this) : filteredCustomers.map((customer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0 ${selectedCustomer?.id === customer.id && !isPlaygroundMode ? 'bg-accent/20' : ''}`,
                                                onClick: ()=>handleCustomerSelect(customer),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Avatar"], {
                                                            className: "h-9 w-9",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                    src: customer.avatarUrl,
                                                                    alt: customer.name,
                                                                    "data-ai-hint": "avatar pelanggan"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 534,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                    children: customer.name.charAt(0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 535,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 533,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium truncate",
                                                                    children: customer.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 538,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-muted-foreground truncate",
                                                                    children: customer.phone || 'No HP tidak ada'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 539,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 537,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 532,
                                                    columnNumber: 23
                                                }, this)
                                            }, customer.id, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 527,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 511,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 510,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                            lineNumber: 472,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-1 md:col-span-2 lg:col-span-3 flex flex-col bg-background p-4 space-y-4 overflow-y-auto",
                            children: [
                                isPlaygroundMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                className: "p-4 border-b",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                        className: "text-lg flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                                className: "mr-2 h-6 w-6 text-primary"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 554,
                                                                columnNumber: 70
                                                            }, this),
                                                            " AI Playground"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                        children: "Uji coba langsung kemampuan AI. Berikan feedback untuk membantu AI belajar."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 555,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 553,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                                className: "h-[400px] p-4 space-y-4",
                                                children: [
                                                    playgroundChatHistory.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `px-4 py-2 rounded-xl shadow ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm whitespace-pre-wrap",
                                                                                children: message.text
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                                lineNumber: 570,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: `text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/80' : 'text-secondary-foreground/80'} text-right`,
                                                                                children: message.timestamp
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                                lineNumber: 571,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                        lineNumber: 563,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 560,
                                                                    columnNumber: 25
                                                                }, this),
                                                                message.sender === 'ai' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-start mt-1.5 ml-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "ghost",
                                                                            size: "icon",
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-7 w-7 hover:bg-green-100 dark:hover:bg-green-800", message.feedback === 'good' && "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"),
                                                                            onClick: ()=>handlePlaygroundFeedback(message.id, 'good'),
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__["ThumbsUp"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                                lineNumber: 584,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 578,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "ghost",
                                                                            size: "icon",
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-7 w-7 ml-1 hover:bg-red-100 dark:hover:bg-red-800", message.feedback === 'bad' && "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"),
                                                                            onClick: ()=>handlePlaygroundFeedback(message.id, 'bad'),
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__["ThumbsDown"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                                lineNumber: 592,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 586,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 577,
                                                                    columnNumber: 27
                                                                }, this),
                                                                message.sender === 'ai' && message.feedback === 'bad' && message.isEditingCorrection && !message.correction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2 ml-1 space-y-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                            placeholder: "Tulis koreksi Anda di sini...",
                                                                            value: message.currentCorrectionText || '',
                                                                            onChange: (e)=>handlePlaygroundCorrectionChange(message.id, e.target.value),
                                                                            rows: 3,
                                                                            className: "text-sm bg-background"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 598,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                            size: "sm",
                                                                            onClick: ()=>handleSavePlaygroundCorrection(message.id),
                                                                            className: "bg-accent text-accent-foreground hover:bg-accent/90",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                                    className: "mr-2 h-4 w-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                                    lineNumber: 606,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                " Simpan Koreksi"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 605,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 597,
                                                                    columnNumber: 27
                                                                }, this),
                                                                message.sender === 'ai' && message.correction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                                                    className: "mt-2 ml-1 p-3 border-green-500 bg-green-50 dark:bg-green-900/30",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs font-medium text-green-700 dark:text-green-300",
                                                                            children: "Koreksi Anda:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 612,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap",
                                                                            children: message.correction
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 613,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 611,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, message.id, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 559,
                                                            columnNumber: 23
                                                        }, this)),
                                                    playgroundChatHistory.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-center text-muted-foreground py-10",
                                                        children: "Mulai percakapan dengan AI di bawah."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 619,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        ref: playgroundMessagesEndRef
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 621,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 557,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 623,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardFooter"], {
                                                className: "p-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-end space-x-2 w-full",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                            id: "playground-chat-input",
                                                            placeholder: "Ketik pertanyaan atau skenario Anda...",
                                                            value: currentPlaygroundInput,
                                                            onChange: (e)=>setCurrentPlaygroundInput(e.target.value),
                                                            onKeyDown: handlePlaygroundKeyDown,
                                                            rows: 2,
                                                            disabled: isLoadingPlaygroundSuggestion,
                                                            className: "bg-background flex-1 resize-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 626,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "icon",
                                                            onClick: handleSendPlaygroundMessage,
                                                            disabled: isLoadingPlaygroundSuggestion || !currentPlaygroundInput.trim(),
                                                            className: "h-10 w-10 shrink-0",
                                                            "aria-label": "Kirim Pesan ke AI",
                                                            children: isLoadingPlaygroundSuggestion ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "h-5 w-5 animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 643,
                                                                columnNumber: 58
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                className: "h-5 w-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 643,
                                                                columnNumber: 105
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 636,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 625,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 624,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 552,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false) : !selectedCustomer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex flex-col items-center justify-center text-center p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareText$3e$__["MessageSquareText"], {
                                            className: "h-16 w-16 text-muted-foreground mb-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 651,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl text-muted-foreground",
                                            children: "Pilih pelanggan untuk memulai percakapan"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 652,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: "atau masuk ke mode Playground AI dari daftar di samping."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 653,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 650,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                className: "p-4 border-b",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                    className: "text-lg flex items-center",
                                                                    children: [
                                                                        "Percakapan dengan: ",
                                                                        selectedCustomer.name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 661,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                                    children: selectedCustomer.phone || "Nomor HP tidak tersedia"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 664,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 660,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            onClick: handleSetManualLock,
                                                            disabled: isSendingWhatsApp || !selectedCustomer.phone,
                                                            title: "Aktifkan lock AI selama 1 jam (jika Anda baru balas dari HP)",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                                    className: "mr-2 h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 673,
                                                                    columnNumber: 29
                                                                }, this),
                                                                "Ambil Alih (Lock AI 1 Jam)"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 666,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 659,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 658,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                                className: "h-[400px] p-4 space-y-4",
                                                children: [
                                                    chatHistory.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `px-4 py-2 rounded-xl shadow ${message.sender === 'customer' ? 'bg-muted text-muted-foreground' : message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm whitespace-pre-wrap",
                                                                        children: message.text
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                        lineNumber: 693,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: `text-xs mt-1 ${message.sender === 'customer' ? 'text-muted-foreground/80' : message.sender === 'user' ? 'text-primary-foreground/80' : 'text-secondary-foreground/80'} text-right`,
                                                                        children: [
                                                                            message.timestamp,
                                                                            " ",
                                                                            message.sender === 'ai' && '(AI Otomatis)'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                        lineNumber: 694,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 684,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, message.id, false, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 680,
                                                            columnNumber: 23
                                                        }, this)),
                                                    chatHistory.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-center text-muted-foreground py-10",
                                                        children: "Belum ada riwayat chat untuk pelanggan ini."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 705,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        ref: messagesEndRef
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 707,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 678,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 709,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                                className: "rounded-none border-0 border-t shadow-none",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                        className: "p-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                            className: "text-lg flex items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                                    className: "mr-2 h-5 w-5 text-primary"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 713,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Balas Pesan Pelanggan"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 712,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 711,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                                        className: "p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-end space-x-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                        id: "customer-message-input",
                                                                        placeholder: "Ketik balasan Anda di sini...",
                                                                        value: customerMessageInput,
                                                                        onChange: (e)=>setCustomerMessageInput(e.target.value),
                                                                        onKeyDown: handleKeyDown,
                                                                        rows: 3,
                                                                        disabled: isSendingWhatsApp || !selectedCustomer?.phone,
                                                                        className: "bg-background flex-1 resize-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                        lineNumber: 719,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "icon",
                                                                        onClick: handleSendMessage,
                                                                        disabled: isSendingWhatsApp || !customerMessageInput.trim() || !selectedCustomer?.phone,
                                                                        className: "h-10 w-10 shrink-0",
                                                                        "aria-label": "Kirim Pesan Manual",
                                                                        children: isSendingWhatsApp ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                            className: "h-5 w-5 animate-spin"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 736,
                                                                            columnNumber: 48
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                            className: "h-5 w-5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 736,
                                                                            columnNumber: 95
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                        lineNumber: 729,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 718,
                                                                columnNumber: 23
                                                            }, this),
                                                            !selectedCustomer?.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-destructive mt-1",
                                                                children: "Nomor HP pelanggan tidak tersedia untuk pengiriman WhatsApp."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 740,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 717,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 710,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 657,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-auto p-4 flex justify-start",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/ai-cs-assistant/settings",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                    className: "mr-2 h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 751,
                                                    columnNumber: 19
                                                }, this),
                                                " Pengaturan Agen & Knowledge Base AI"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 750,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 749,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 748,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                            lineNumber: 549,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                    lineNumber: 470,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
            lineNumber: 468,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
        lineNumber: 467,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__a4e7fe02._.js.map