(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/layout/AppHeader.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AppHeader)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sidebar.tsx [app-client] (ecmascript)");
;
;
function AppHeader({ title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SidebarTrigger"], {
                className: "md:hidden"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/AppHeader.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
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
_c = AppHeader;
var _c;
__turbopack_context__.k.register(_c, "AppHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, this));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, this));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, this));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, this));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Textarea": (()=>Textarea)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Textarea = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/textarea.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, this);
});
_c1 = Textarea;
Textarea.displayName = 'Textarea';
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Textarea$React.forwardRef");
__turbopack_context__.k.register(_c1, "Textarea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/ai/flows/data:02c839 [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"4053660f6447b38038e1d20965a3df3cd57a2a7b51":"generateWhatsAppReply"},"src/ai/flows/cs-whatsapp-reply-flow.ts",""] */ __turbopack_context__.s({
    "generateWhatsAppReply": (()=>generateWhatsAppReply)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var generateWhatsAppReply = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("4053660f6447b38038e1d20965a3df3cd57a2a7b51", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "generateWhatsAppReply"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY3Mtd2hhdHNhcHAtcmVwbHktZmxvdy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcbi8qKlxuICogQGZpbGVPdmVydmlldyBGbG93IEFJIHV0YW1hIHVudHVrIFdoYXRzQXBwIEN1c3RvbWVyIFNlcnZpY2UgUUxBQi5cbiAqIFNla2FyYW5nIG1lbmFuZ2FuaSBzZW11YSBsb2dpa2EgbGF5YW5hbiBkYW4gbWVueWltcGFuIGtvbnRla3MgcGVyY2FrYXBhbiBkaSBGaXJlc3RvcmUuXG4gKi9cbmltcG9ydCB7IGFpIH0gZnJvbSAnQC9haS9nZW5raXQnO1xuaW1wb3J0ICogYXMgeiBmcm9tICd6b2QnO1xuaW1wb3J0IHsgZGIgfSBmcm9tICdAL2xpYi9maXJlYmFzZSc7XG5pbXBvcnQgeyBkb2MsIGdldERvYyBhcyBnZXRGaXJlc3RvcmVEb2MsIHNldERvYyBhcyBzZXRGaXJlc3RvcmVEb2MsIHNlcnZlclRpbWVzdGFtcCwgdHlwZSBUaW1lc3RhbXAgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuaW1wb3J0IHsgREVGQVVMVF9BSV9TRVRUSU5HUywgREVGQVVMVF9NQUlOX1BST01QVF9aT1lBIH0gZnJvbSAnQC90eXBlcy9haVNldHRpbmdzJztcblxuaW1wb3J0IHsgY2FyaVNpemVNb3RvclRvb2wsIHR5cGUgQ2FyaVNpemVNb3RvcklucHV0LCB0eXBlIENhcmlTaXplTW90b3JPdXRwdXQsIGZpbmRNb3RvclNpemUgfSBmcm9tICdAL2FpL3Rvb2xzL2Nhcmktc2l6ZS1tb3Rvci10b29sJztcbmltcG9ydCB7IGdldFByb2R1Y3RTZXJ2aWNlRGV0YWlsc0J5TmFtZVRvb2wsIHR5cGUgUHJvZHVjdExvb2t1cElucHV0LCBmaW5kUHJvZHVjdFNlcnZpY2VCeU5hbWUgfSBmcm9tICdAL2FpL3Rvb2xzL3Byb2R1Y3RMb29rdXBUb29sJztcbmltcG9ydCB7IGNhcmlJbmZvTGF5YW5hblRvb2wsIHR5cGUgQ2FyaUluZm9MYXlhbmFuSW5wdXQsIHR5cGUgQ2FyaUluZm9MYXlhbmFuT3V0cHV0LCBmaW5kTGF5YW5hbkJ5Q2F0ZWdvcnkgfSBmcm9tICdAL2FpL3Rvb2xzL2NhcmlJbmZvTGF5YW5hblRvb2wnO1xuaW1wb3J0IHR5cGUgeyBQcm9kdWN0U2VydmljZUluZm8gfSBmcm9tICdAL3R5cGVzL2FpVG9vbFNjaGVtYXMnO1xuXG4vLyBTa2VtYSBpbnRlcm5hbCB1bnR1ayB2YWxpZGFzaSBpbnB1dCBjaGF0IGhpc3RvcnkgZGkgZmxvd1xuY29uc3QgQ2hhdE1lc3NhZ2VTY2hlbWFJbnRlcm5hbCA9IHoub2JqZWN0KHtcbiAgcm9sZTogei5lbnVtKFsndXNlcicsICdtb2RlbCddKSxcbiAgY29udGVudDogei5zdHJpbmcoKSxcbn0pO1xuZXhwb3J0IHR5cGUgQ2hhdE1lc3NhZ2UgPSB6LmluZmVyPHR5cGVvZiBDaGF0TWVzc2FnZVNjaGVtYUludGVybmFsPjtcblxuLy8gLS0tIFVzZXIgU2Vzc2lvbiBTdHJ1Y3R1cmUgKGluIEZpcmVzdG9yZTogdXNlckFpU2Vzc2lvbnMve3NlbmRlck51bWJlcn0pIC0tLVxuaW50ZXJmYWNlIFVzZXJBaVNlc3Npb24ge1xuICB1c2VySWQ6IHN0cmluZztcbiAgYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeT86IHN0cmluZztcbiAga25vd25Nb3RvcmN5Y2xlTmFtZT86IHN0cmluZztcbiAga25vd25Nb3RvcmN5Y2xlU2l6ZT86IHN0cmluZztcbiAgbGFzdEFpSW50ZXJhY3Rpb25UeXBlPzogJ2Fza2VkX2Zvcl9tb3Rvcl90eXBlX2Zvcl9zcGVjaWZpY19zZXJ2aWNlJyB8ICdwcm92aWRlZF9zcGVjaWZpY19zZXJ2aWNlX2RldGFpbHMnIHwgJ3Byb3ZpZGVkX2NhdGVnb3J5X3NlcnZpY2VfbGlzdCcgfCAnYXNrZWRfZm9yX3NlcnZpY2VfYWZ0ZXJfbW90b3Jfc2l6ZScgfCAnZ2VuZXJhbF9yZXNwb25zZScgfCAnaW5pdGlhbF9ncmVldGluZycgfCAnYXNrZWRfZm9yX3BhaW50X3R5cGVfZm9yX2NvYXRpbmcnIHwgJ3JlYWR5X2Zvcl9ib29raW5nX2RldGFpbHMnO1xuICBsYXN0VXBkYXRlZEF0OiBUaW1lc3RhbXA7XG4gIC8vIEJpc2EgZGl0YW1iYWhrYW4gZmllbGQgbGFpbiBqaWthIHBlcmx1LCBtaXMuIGxhc3REZXRlY3RlZEludGVudCwgZGxsLlxufVxuXG4vLyBTa2VtYSBpbnB1dCB1dGFtYSB1bnR1ayBab3lhQ2hhdEZsb3cgKGRpZ3VuYWthbiBvbGVoIFVJKVxuY29uc3QgWm95YUNoYXRJbnB1dFNjaGVtYSA9IHoub2JqZWN0KHtcbiAgbWVzc2FnZXM6IHouYXJyYXkoQ2hhdE1lc3NhZ2VTY2hlbWFJbnRlcm5hbCkub3B0aW9uYWwoKS5kZXNjcmliZShcIlJpd2F5YXQgcGVyY2FrYXBhbiBsZW5na2FwLCBqaWthIGFkYS5cIiksXG4gIGN1c3RvbWVyTWVzc2FnZTogei5zdHJpbmcoKS5taW4oMSwgXCJQZXNhbiBwZWxhbmdnYW4gdGlkYWsgYm9sZWgga29zb25nLlwiKS5kZXNjcmliZShcIlBlc2FuIHRlcmJhcnUgZGFyaSBjdXN0b21lci5cIiksXG4gIHNlbmRlck51bWJlcjogei5zdHJpbmcoKS5vcHRpb25hbCgpLmRlc2NyaWJlKFwiTm9tb3IgV2hhdHNBcHAgcGVuZ2lyaW0gKFdBSklCIHVudHVrIHNlc3Npb24gamlrYSBtYXUgcGVyc2lzdGVuKS5cIiksIC8vIFRldGFwIG9wc2lvbmFsIGRpIGlucHV0LCB0YXBpIGZsb3cgYWthbiBjZWtcbiAgbWFpblByb21wdFN0cmluZzogei5zdHJpbmcoKS5vcHRpb25hbCgpLmRlc2NyaWJlKFwiU3RyaW5nIHByb21wdCB1dGFtYSB5YW5nIG11bmdraW4gZGlraXJpbSBkYXJpIFVJIGF0YXUgZGlhbWJpbCBkYXJpIEZpcmVzdG9yZS5cIiksXG4gIGN1cnJlbnREYXRlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGN1cnJlbnRUaW1lOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHRvbW9ycm93RGF0ZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBkYXlBZnRlclRvbW9ycm93RGF0ZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAvLyBVSSBiaXNhIG1lbmdpcmltIGluaSBzZWJhZ2FpIG92ZXJyaWRlIGF0YXUgdW50dWsgc2VzaSBiYXJ1XG4gIGtub3duTW90b3JjeWNsZUluZm86IHoub2JqZWN0KHtcbiAgICBuYW1lOiB6LnN0cmluZygpLFxuICAgIHNpemU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgfSkub3B0aW9uYWwoKS5kZXNjcmliZShcIkluZm9ybWFzaSBtb3RvciBwZWxhbmdnYW4gamlrYSBzdWRhaCBkaWtldGFodWkgZGFyaSBpbnRlcmFrc2kgc2ViZWx1bW55YSBhdGF1IGRhdGFiYXNlLlwiKSxcbiAgYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeTogei5zdHJpbmcoKS5vcHRpb25hbCgpLmRlc2NyaWJlKFwiTGF5YW5hbiBzcGVzaWZpayB5YW5nIHNlZGFuZyBha3RpZiBkaXRhbnlha2FuIChtaXMuICdDdWNpIFByZW1pdW0nKSBqaWthIFpveWEgc2ViZWx1bW55YSBiZXJ0YW55YSB0aXBlIG1vdG9yIHVudHVrIGxheWFuYW4gaW5pLlwiKSxcbn0pO1xuZXhwb3J0IHR5cGUgWm95YUNoYXRJbnB1dCA9IHouaW5mZXI8dHlwZW9mIFpveWFDaGF0SW5wdXRTY2hlbWE+O1xuXG4vLyBTY2hlbWEgb3V0cHV0IHVudHVrIHdyYXBwZXIgZnVuY3Rpb24gKGRpZ3VuYWthbiBvbGVoIFVJKVxuY29uc3QgV2hhdHNBcHBSZXBseU91dHB1dFNjaGVtYSA9IHoub2JqZWN0KHtcbiAgc3VnZ2VzdGVkUmVwbHk6IHouc3RyaW5nKCkuZGVzY3JpYmUoJ1NhcmFuIGJhbGFzYW4geWFuZyBkaWhhc2lsa2FuIEFJIHVudHVrIGRpa2lyaW0ga2UgcGVsYW5nZ2FuLicpLFxuICAvLyBPdXRwdXQgaW5pIGxlYmloIHVudHVrIFVJIHRhaHUgYXBhIHlhbmcgYmFydSBzYWphIGRpLXNldC91cGRhdGUgZGkgc2Vzc2lvbiBGaXJlc3RvcmVcbiAgc2Vzc2lvbkFjdGl2ZVNwZWNpZmljU2VydmljZUlucXVpcnk6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgc2Vzc2lvbkRldGVjdGVkTW90b3JjeWNsZUluZm86IHoub2JqZWN0KHsgbmFtZTogei5zdHJpbmcoKSwgc2l6ZTogei5zdHJpbmcoKS5vcHRpb25hbCgpIH0pLm9wdGlvbmFsKCksXG4gIHNlc3Npb25MYXN0QWlJbnRlcmFjdGlvblR5cGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbn0pO1xuZXhwb3J0IHR5cGUgV2hhdHNBcHBSZXBseU91dHB1dCA9IHouaW5mZXI8dHlwZW9mIFdoYXRzQXBwUmVwbHlPdXRwdXRTY2hlbWE+O1xuXG5cbi8vIEZsb3cgdXRhbWFcbmNvbnN0IHpveWFDaGF0RmxvdyA9IGFpLmRlZmluZUZsb3coXG4gIHtcbiAgICBuYW1lOiAnem95YUNoYXRGbG93JyxcbiAgICBpbnB1dFNjaGVtYTogWm95YUNoYXRJbnB1dFNjaGVtYSxcbiAgICBvdXRwdXRTY2hlbWE6IFdoYXRzQXBwUmVwbHlPdXRwdXRTY2hlbWEsXG4gIH0sXG4gIGFzeW5jIChpbnB1dDogWm95YUNoYXRJbnB1dCk6IFByb21pc2U8V2hhdHNBcHBSZXBseU91dHB1dD4gPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiW01BSU4tRkxPV10gem95YUNoYXRGbG93IGlucHV0OlwiLCBKU09OLnN0cmluZ2lmeShpbnB1dCwgbnVsbCwgMikpO1xuXG4gICAgbGV0IGN1c3RvbWVyTWVzc2FnZVRvUHJvY2VzcyA9IGlucHV0LmN1c3RvbWVyTWVzc2FnZTtcbiAgICBsZXQgc3VnZ2VzdGVkUmVwbHkgPSBcIk1hYWYsIFpveWEgbGFnaSBiaW5ndW5nIG5paC5cIjtcbiAgICBsZXQgc2Vzc2lvbkRhdGFUb1NhdmU6IFBhcnRpYWw8VXNlckFpU2Vzc2lvbj4gPSB7fTtcblxuICAgIGlmICghY3VzdG9tZXJNZXNzYWdlVG9Qcm9jZXNzIHx8IGN1c3RvbWVyTWVzc2FnZVRvUHJvY2Vzcy50cmltKCkgPT09ICcnKSB7XG4gICAgICByZXR1cm4geyBzdWdnZXN0ZWRSZXBseTogXCJNYWFmLCBab3lhIHRpZGFrIG1lbmVyaW1hIHBlc2FuIHlhbmcgamVsYXMuXCIgfTtcbiAgICB9XG4gICAgaWYgKCFpbnB1dC5zZW5kZXJOdW1iZXIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW01BSU4tRkxPV10gV0FSTklORzogc2VuZGVyTnVtYmVyIHRpZGFrIGFkYSBkaSBpbnB1dC4gU2VzaSBGaXJlc3RvcmUgdGlkYWsgYWthbiBkaWd1bmFrYW4vZGlzaW1wYW4uIEtvbnRla3MgaGFueWEgZGFyaSBpbnB1dC5cIik7XG4gICAgICAgIC8vIExhbmp1dGthbiB0YW5wYSBGaXJlc3RvcmUgc2Vzc2lvbiBqaWthIHNlbmRlck51bWJlciB0aWRhayBhZGEsIGhhbnlhIG1lbmdhbmRhbGthbiBpbnB1dC5cbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSBpbnB1dC5zZW5kZXJOdW1iZXIgfHwgJ2Fub255bW91c191c2VyJzsgLy8gRGVmYXVsdCBrZSBhbm9ueW1vdXMgamlrYSB0aWRhayBhZGEgbm9tb3JcbiAgICBjb25zdCBzZXNzaW9uRG9jUmVmID0gaW5wdXQuc2VuZGVyTnVtYmVyID8gZG9jKGRiLCAndXNlckFpU2Vzc2lvbnMnLCB1c2VySWQpIDogbnVsbDtcbiAgICBsZXQgY3VycmVudFNlc3Npb246IFBhcnRpYWw8VXNlckFpU2Vzc2lvbj4gPSB7fTtcblxuICAgIC8vIDEuIExvYWQgU2VzaSBkYXJpIEZpcmVzdG9yZSAoamlrYSBzZW5kZXJOdW1iZXIgYWRhKVxuICAgIGlmIChzZXNzaW9uRG9jUmVmKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uU25hcCA9IGF3YWl0IGdldEZpcmVzdG9yZURvYyhzZXNzaW9uRG9jUmVmKTtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uU25hcC5leGlzdHMoKSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTZXNzaW9uID0gc2Vzc2lvblNuYXAuZGF0YSgpIGFzIFVzZXJBaVNlc3Npb247XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFtNQUlOLUZMT1ddIFNlc2kgZGl0ZW11a2FuIHVudHVrICR7dXNlcklkfTpgLCBKU09OLnN0cmluZ2lmeShjdXJyZW50U2Vzc2lvbiwgbnVsbCwgMikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgW01BSU4tRkxPV10gVGlkYWsgYWRhIHNlc2kgdW50dWsgJHt1c2VySWR9LCBzZXNpIGJhcnUgYWthbiBkaWJ1YXQgamlrYSBhZGEgZGF0YSB1bnR1ayBkaXNpbXBhbi5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW01BSU4tRkxPV10gR2FnYWwgbWVtdWF0IHNlc2kgdW50dWsgJHt1c2VySWR9OmAsIGUpO1xuICAgICAgICAgICAgLy8gTGFuanV0IGRlbmdhbiBzZXNpIGtvc29uZyBqaWthIGdhZ2FsIGxvYWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIDIuIEdhYnVuZ2thbiBLb250ZWtzIGRhcmkgSW5wdXQgVUkgKGppa2EgYWRhKSBkZW5nYW4gU2VzaVxuICAgIC8vIEluZm8gZGFyaSBVSSAoaW5wdXQgWm95YUNoYXRJbnB1dCkgbGViaWggZGl1dGFtYWthbiBqaWthIGFkYSwga2FyZW5hIGJpc2EgamFkaSBrb3Jla3NpLlxuICAgIGxldCBrbm93bk1vdG9yY3ljbGVOYW1lID0gaW5wdXQua25vd25Nb3RvcmN5Y2xlSW5mbz8ubmFtZSB8fCBjdXJyZW50U2Vzc2lvbi5rbm93bk1vdG9yY3ljbGVOYW1lIHx8IFwiYmVsdW0gZGlrZXRhaHVpXCI7XG4gICAgbGV0IGtub3duTW90b3JjeWNsZVNpemUgPSBpbnB1dC5rbm93bk1vdG9yY3ljbGVJbmZvPy5zaXplIHx8IGN1cnJlbnRTZXNzaW9uLmtub3duTW90b3JjeWNsZVNpemUgfHwgXCJiZWx1bSBkaWtldGFodWlcIjtcbiAgICBsZXQgYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSA9IGlucHV0LmFjdGl2ZVNwZWNpZmljU2VydmljZUlucXVpcnkgfHwgY3VycmVudFNlc3Npb24uYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSB8fCBcInRpZGFrIGFkYVwiO1xuICAgIGxldCBsYXN0QWlJbnRlcmFjdGlvblR5cGUgPSBjdXJyZW50U2Vzc2lvbi5sYXN0QWlJbnRlcmFjdGlvblR5cGUgfHwgXCJpbml0aWFsX2dyZWV0aW5nXCI7XG5cbiAgICAvLyBEZXRla3NpIGthdGEga3VuY2kgbGF5YW5hbiB1bXVtIChrYXRlZ29yaSlcbiAgICBjb25zdCBsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UgPSBjdXN0b21lck1lc3NhZ2VUb1Byb2Nlc3MudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBnZW5lcmFsU2VydmljZUtleXdvcmRzID0gW1wiY3VjaVwiLCBcImNvYXRpbmdcIiwgXCJwb2xlc1wiLCBcImRldGFpbGluZ1wiLCBcInJlcGFpbnRcIiwgXCJzZXJ2aXNcIiwgXCJsYXlhbmFuXCIsIFwicHJvZHVrXCIsIFwianVhbFwiLCBcImhhcmdhXCIsIFwiaW5mb1wiLCBcImthdGFsb2dcIiwgXCJib29raW5nXCIsIFwicGVzYW4gdGVtcGF0XCIsIFwiamFkd2FsXCJdO1xuICAgIGxldCBkZXRlY3RlZEdlbmVyYWxTZXJ2aWNlS2V5d29yZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgZm9yIChjb25zdCBrZXl3b3JkIG9mIGdlbmVyYWxTZXJ2aWNlS2V5d29yZHMpIHtcbiAgICAgICAgaWYgKGxvd2VyQ2FzZUN1c3RvbWVyTWVzc2FnZS5pbmNsdWRlcyhrZXl3b3JkKSkge1xuICAgICAgICAgICAgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBrZXl3b3JkO1xuICAgICAgICAgICAgaWYgKChrZXl3b3JkID09PSBcImN1Y2lcIiAmJiAobG93ZXJDYXNlQ3VzdG9tZXJNZXNzYWdlLmluY2x1ZGVzKFwiY3VjaSBtb3RvclwiKSB8fCBsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UuaW5jbHVkZXMoXCJueXVjaVwiKSkpICkgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBcImN1Y2lcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKGtleXdvcmQgPT09IFwiY29hdGluZ1wiICYmIChsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UuaW5jbHVkZXMoXCJjb2F0aW5nIG1vdG9yXCIpIHx8IGxvd2VyQ2FzZUN1c3RvbWVyTWVzc2FnZS5pbmNsdWRlcyhcImxhbWluYXRpbmdcIikpKSBkZXRlY3RlZEdlbmVyYWxTZXJ2aWNlS2V5d29yZCA9IFwiY29hdGluZ1wiO1xuICAgICAgICAgICAgZWxzZSBpZiAoa2V5d29yZCA9PT0gXCJwb2xlc1wiICYmIChsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UuaW5jbHVkZXMoXCJwb2xlcyBtb3RvclwiKSB8fCBsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UuaW5jbHVkZXMoXCJwb2xlcyBib2RpXCIpKSkgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBcInBvbGVzXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChrZXl3b3JkID09PSBcImRldGFpbGluZ1wiICYmIGxvd2VyQ2FzZUN1c3RvbWVyTWVzc2FnZS5pbmNsdWRlcyhcImRldGFpbGluZyBtb3RvclwiKSkgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBcImRldGFpbGluZ1wiO1xuICAgICAgICAgICAgZWxzZSBpZiAoa2V5d29yZCA9PT0gXCJyZXBhaW50XCIgJiYgKGxvd2VyQ2FzZUN1c3RvbWVyTWVzc2FnZS5pbmNsdWRlcyhcInJlcGFpbnQgbW90b3JcIikgfHwgbG93ZXJDYXNlQ3VzdG9tZXJNZXNzYWdlLmluY2x1ZGVzKFwiY2F0IG1vdG9yXCIpKSkgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBcInJlcGFpbnRcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKGtleXdvcmQgPT09IFwiYm9va2luZ1wiIHx8IGtleXdvcmQgPT09IFwicGVzYW4gdGVtcGF0XCIgfHwga2V5d29yZCA9PT0gXCJqYWR3YWxcIikgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBcImJvb2tpbmdcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiW01BSU4tRkxPV10gRGV0ZWN0ZWQgZ2VuZXJhbCBzZXJ2aWNlIGtleXdvcmQgZnJvbSB1c2VyIG1lc3NhZ2U6XCIsIGRldGVjdGVkR2VuZXJhbFNlcnZpY2VLZXl3b3JkKTtcblxuICAgIGNvbnN0IG1haW5Qcm9tcHRGcm9tU2V0dGluZ3MgPSBpbnB1dC5tYWluUHJvbXB0U3RyaW5nIHx8IERFRkFVTFRfTUFJTl9QUk9NUFRfWk9ZQTtcblxuICAgIGNvbnN0IGZpbmFsU3lzdGVtUHJvbXB0ID0gbWFpblByb21wdEZyb21TZXR0aW5nc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e1NFU1NJT05fTU9UT1JfTkFNRX19fVwiLCBrbm93bk1vdG9yY3ljbGVOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e1NFU1NJT05fTU9UT1JfU0laRX19fVwiLCBrbm93bk1vdG9yY3ljbGVTaXplKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e1NFU1NJT05fQUNUSVZFX1NFUlZJQ0V9fX1cIiwgYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e3tTRVNTSU9OX0xBU1RfQUlfSU5URVJBQ1RJT05fVFlQRX19fVwiLCBsYXN0QWlJbnRlcmFjdGlvblR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwie3t7ZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmR9fX1cIiwgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgfHwgXCJ0aWRhayBhZGFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e3tkeW5hbWljQ29udGV4dH19fVwiLCBgSU5GT19VTVVNX0JFTkdLRUw6IFFMQUIgTW90byBEZXRhaWxpbmcsIEpsLiBTdWthc2VuYW5nIFYgTm8uMUEsIENpa3V0cmEsIEJhbmR1bmcuIEJ1a2EgMDk6MDAgLSAyMTowMCBXSUIuIEZ1bGwgRGV0YWlsaW5nIGhhbnlhIHVudHVrIGNhdCBnbG9zc3kuIENvYXRpbmcgYmVkYSBoYXJnYSB1bnR1ayBkb2ZmICYgZ2xvc3N5LiBUYW5nZ2FsIGhhcmkgaW5pOiAke2lucHV0LmN1cnJlbnREYXRlIHx8IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdpZC1JRCcpfS5gKTtcblxuXG4gICAgY29uc3QgaGlzdG9yeUZvckFJID0gKGlucHV0Lm1lc3NhZ2VzIHx8IFtdKVxuICAgICAgLmZpbHRlcihtc2cgPT4gbXNnLmNvbnRlbnQgJiYgbXNnLmNvbnRlbnQudHJpbSgpICE9PSAnJylcbiAgICAgIC5tYXAoKG1zZykgPT4gKHtcbiAgICAgICAgcm9sZTogbXNnLnJvbGUsXG4gICAgICAgIGNvbnRlbnQ6IFt7IHRleHQ6IG1zZy5jb250ZW50IH1dLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IG1lc3NhZ2VzRm9yQUkgPSBbXG4gICAgICAuLi5oaXN0b3J5Rm9yQUksXG4gICAgICB7IHJvbGU6ICd1c2VyJyBhcyBjb25zdCwgY29udGVudDogW3sgdGV4dDogY3VzdG9tZXJNZXNzYWdlVG9Qcm9jZXNzIH1dIH1cbiAgICBdO1xuXG4gICAgY29uc29sZS5sb2coYFtNQUlOLUZMT1ddIENhbGxpbmcgTUFJTiBhaS5nZW5lcmF0ZS4gSGlzdG9yeSBMZW5ndGg6ICR7aGlzdG9yeUZvckFJLmxlbmd0aH0uIFByb21wdCBzbmlwcGV0OiAke2ZpbmFsU3lzdGVtUHJvbXB0LnN1YnN0cmluZygwLCAzMDApfS4uLmApO1xuICAgIHNlc3Npb25EYXRhVG9TYXZlLmxhc3RBaUludGVyYWN0aW9uVHlwZSA9ICdnZW5lcmFsX3Jlc3BvbnNlJzsgLy8gRGVmYXVsdFxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFpLmdlbmVyYXRlKHtcbiAgICAgICAgbW9kZWw6ICdnb29nbGVhaS9nZW1pbmktMS41LWZsYXNoLWxhdGVzdCcsXG4gICAgICAgIHByb21wdDogZmluYWxTeXN0ZW1Qcm9tcHQsXG4gICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlc0ZvckFJLFxuICAgICAgICB0b29sczogW2NhcmlTaXplTW90b3JUb29sLCBnZXRQcm9kdWN0U2VydmljZURldGFpbHNCeU5hbWVUb29sLCBjYXJpSW5mb0xheWFuYW5Ub29sXSwgLy8gQmVsdW0gYWRhIGNyZWF0ZUJvb2tpbmdUb29sXG4gICAgICAgIHRvb2xDaG9pY2U6ICdhdXRvJyxcbiAgICAgICAgY29uZmlnOiB7IHRlbXBlcmF0dXJlOiAwLjMsIHRvcFA6IDAuOSB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiW01BSU4tRkxPV10gUmF3IE1BSU4gQUkgZ2VuZXJhdGUgcmVzdWx0OlwiLCBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpKTtcbiAgICAgIHN1Z2dlc3RlZFJlcGx5ID0gcmVzdWx0LnRleHQgfHwgXCJcIjtcbiAgICAgIGNvbnN0IHRvb2xSZXF1ZXN0ID0gcmVzdWx0LnRvb2xSZXF1ZXN0O1xuXG4gICAgICBpZiAodG9vbFJlcXVlc3QpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbTUFJTi1GTE9XXSBNQUlOIEFJIHJlcXVlc3RlZCBhIHRvb2wgY2FsbDpcIiwgSlNPTi5zdHJpbmdpZnkodG9vbFJlcXVlc3QsIG51bGwsIDIpKTtcbiAgICAgICAgbGV0IHRvb2xPdXRwdXRUb1JlbGF5OiBhbnkgPSBcIkVycm9yOiBUb29sIG91dHB1dCB0aWRhayBkaXNldC5cIjtcbiAgICAgICAgbGV0IGludGVyYWN0aW9uVHlwZUFmdGVyVG9vbDogVXNlckFpU2Vzc2lvblsnbGFzdEFpSW50ZXJhY3Rpb25UeXBlJ10gPSAnZ2VuZXJhbF9yZXNwb25zZSc7XG4gICAgICAgIGxldCBhY3RpdmVTZXJ2aWNlQWZ0ZXJUb29sID0gYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeTtcblxuXG4gICAgICAgIGlmICh0b29sUmVxdWVzdC5uYW1lID09PSAnY2FyaVNpemVNb3RvcicgJiYgdG9vbFJlcXVlc3QuaW5wdXQpIHtcbiAgICAgICAgICB0b29sT3V0cHV0VG9SZWxheSA9IGF3YWl0IGZpbmRNb3RvclNpemUodG9vbFJlcXVlc3QuaW5wdXQgYXMgQ2FyaVNpemVNb3RvcklucHV0KTtcbiAgICAgICAgICBpZiAodG9vbE91dHB1dFRvUmVsYXkuc3VjY2VzcyAmJiB0b29sT3V0cHV0VG9SZWxheS5zaXplICYmIHRvb2xPdXRwdXRUb1JlbGF5LnZlaGljbGVNb2RlbEZvdW5kKSB7XG4gICAgICAgICAgICAgIGtub3duTW90b3JjeWNsZU5hbWUgPSB0b29sT3V0cHV0VG9SZWxheS52ZWhpY2xlTW9kZWxGb3VuZDtcbiAgICAgICAgICAgICAga25vd25Nb3RvcmN5Y2xlU2l6ZSA9IHRvb2xPdXRwdXRUb1JlbGF5LnNpemU7XG4gICAgICAgICAgICAgIHNlc3Npb25EYXRhVG9TYXZlLmtub3duTW90b3JjeWNsZU5hbWUgPSBrbm93bk1vdG9yY3ljbGVOYW1lO1xuICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5rbm93bk1vdG9yY3ljbGVTaXplID0ga25vd25Nb3RvcmN5Y2xlU2l6ZTtcbiAgICAgICAgICAgICAgaW50ZXJhY3Rpb25UeXBlQWZ0ZXJUb29sID0gJ2Fza2VkX2Zvcl9zZXJ2aWNlX2FmdGVyX21vdG9yX3NpemUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0b29sUmVxdWVzdC5uYW1lID09PSAnZ2V0UHJvZHVjdFNlcnZpY2VEZXRhaWxzQnlOYW1lVG9vbCcgJiYgdG9vbFJlcXVlc3QuaW5wdXQpIHtcbiAgICAgICAgICB0b29sT3V0cHV0VG9SZWxheSA9IGF3YWl0IGZpbmRQcm9kdWN0U2VydmljZUJ5TmFtZSh0b29sUmVxdWVzdC5pbnB1dCBhcyBQcm9kdWN0TG9va3VwSW5wdXQpO1xuICAgICAgICAgIGlmICh0b29sT3V0cHV0VG9SZWxheT8ubmFtZSkgeyBcbiAgICAgICAgICAgIGFjdGl2ZVNlcnZpY2VBZnRlclRvb2wgPSB0b29sT3V0cHV0VG9SZWxheS5uYW1lOyAvLyBTaW1wYW4gbmFtYSBsYXlhbmFuIHlhbmcgZGl0ZW11a2FuXG4gICAgICAgICAgICBpbnRlcmFjdGlvblR5cGVBZnRlclRvb2wgPSAncHJvdmlkZWRfc3BlY2lmaWNfc2VydmljZV9kZXRhaWxzJztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodG9vbFJlcXVlc3QubmFtZSA9PT0gJ2NhcmlJbmZvTGF5YW5hblRvb2wnICYmIHRvb2xSZXF1ZXN0LmlucHV0KSB7XG4gICAgICAgICAgdG9vbE91dHB1dFRvUmVsYXkgPSBhd2FpdCBmaW5kTGF5YW5hbkJ5Q2F0ZWdvcnkodG9vbFJlcXVlc3QuaW5wdXQgYXMgQ2FyaUluZm9MYXlhbmFuSW5wdXQpO1xuICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0b29sT3V0cHV0VG9SZWxheSkgJiYgdG9vbE91dHB1dFRvUmVsYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgIGludGVyYWN0aW9uVHlwZUFmdGVyVG9vbCA9ICdwcm92aWRlZF9jYXRlZ29yeV9zZXJ2aWNlX2xpc3QnO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGNyZWF0ZUJvb2tpbmdUb29sIHBsYWNlaG9sZGVyIGlmIG5lZWRlZFxuICAgICAgICAvLyBlbHNlIGlmICh0b29sUmVxdWVzdC5uYW1lID09PSAnY3JlYXRlQm9va2luZ1Rvb2wnICYmIHRvb2xSZXF1ZXN0LmlucHV0KSB7IC4uLiB9XG5cbiAgICAgICAgc2Vzc2lvbkRhdGFUb1NhdmUubGFzdEFpSW50ZXJhY3Rpb25UeXBlID0gaW50ZXJhY3Rpb25UeXBlQWZ0ZXJUb29sO1xuICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5hY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5ID0gYWN0aXZlU2VydmljZUFmdGVyVG9vbDtcblxuICAgICAgICBpZiAodG9vbE91dHB1dFRvUmVsYXkgIT09IFwiRXJyb3I6IFRvb2wgb3V0cHV0IHRpZGFrIGRpc2V0LlwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgW01BSU4tRkxPV10gT3V0cHV0IGZyb20gdG9vbCAnJHt0b29sUmVxdWVzdC5uYW1lfSc6YCwgSlNPTi5zdHJpbmdpZnkodG9vbE91dHB1dFRvUmVsYXksIG51bGwsIDIpKTtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VzQWZ0ZXJUb29sID0gW1xuICAgICAgICAgICAgICAgIC4uLm1lc3NhZ2VzRm9yQUksXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgeyByb2xlOiAndG9vbCcgYXMgY29uc3QsIGNvbnRlbnQ6IFt7IHRvb2xSZXNwb25zZTogeyBuYW1lOiB0b29sUmVxdWVzdC5uYW1lLCBvdXRwdXQ6IHRvb2xPdXRwdXRUb1JlbGF5IH19XX1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFJlLWdlbmVyYXRlIHByb21wdCB3aXRoIHBvdGVudGlhbGx5IHVwZGF0ZWQgc2Vzc2lvbiBpbmZvIGZvciB0aGUgc2Vjb25kIGNhbGxcbiAgICAgICAgICAgIGNvbnN0IHByb21wdEZvclNlY29uZENhbGwgPSBtYWluUHJvbXB0RnJvbVNldHRpbmdzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e3tTRVNTSU9OX01PVE9SX05BTUV9fX1cIiwga25vd25Nb3RvcmN5Y2xlTmFtZSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e1NFU1NJT05fTU9UT1JfU0laRX19fVwiLCBrbm93bk1vdG9yY3ljbGVTaXplKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwie3t7U0VTU0lPTl9BQ1RJVkVfU0VSVklDRX19fVwiLCBhY3RpdmVTZXJ2aWNlQWZ0ZXJUb29sKSBcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e1NFU1NJT05fTEFTVF9BSV9JTlRFUkFDVElPTl9UWVBFfX19XCIsIGludGVyYWN0aW9uVHlwZUFmdGVyVG9vbCk7XG5cblxuICAgICAgICAgICAgY29uc3QgbW9kZWxSZXNwb25zZUFmdGVyVG9vbCA9IGF3YWl0IGFpLmdlbmVyYXRlKHtcbiAgICAgICAgICAgICAgICBtb2RlbDogJ2dvb2dsZWFpL2dlbWluaS0xLjUtZmxhc2gtbGF0ZXN0JyxcbiAgICAgICAgICAgICAgICBwcm9tcHQ6IHByb21wdEZvclNlY29uZENhbGwsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzQWZ0ZXJUb29sLFxuICAgICAgICAgICAgICAgIGNvbmZpZzogeyB0ZW1wZXJhdHVyZTogMC4zLCB0b3BQOiAwLjkgfSxcbiAgICAgICAgICAgICAgICAgdG9vbHM6IFtjYXJpU2l6ZU1vdG9yVG9vbCwgZ2V0UHJvZHVjdFNlcnZpY2VEZXRhaWxzQnlOYW1lVG9vbCwgY2FyaUluZm9MYXlhbmFuVG9vbF0sIC8vIFNlZGlha2FuIHRvb2xzIGxhZ2lcbiAgICAgICAgICAgICAgICAgdG9vbENob2ljZTogJ2F1dG8nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdWdnZXN0ZWRSZXBseSA9IG1vZGVsUmVzcG9uc2VBZnRlclRvb2wudGV4dCB8fCBgWm95YSBkYXBldCBpbmZvIGRhcmkgYWxhdCAke3Rvb2xSZXF1ZXN0Lm5hbWV9LCB0YXBpIGJpbmd1bmcgbWF1IG5nb21vbmcgYXBhLmA7XG4gICAgICAgICAgICAvLyBIYW5kbGUgcG90ZW50aWFsIHNlY29uZCB0b29sIGNhbGwgKGUuZy4sIGFza2VkIGZvciBtb3RvciBzaXplLCB0aGVuIHNlcnZpY2UsIHRoZW4gcGFpbnQgdHlwZSlcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBzaW1wbGlmaWVkIHZlcnNpb24sIG1vcmUgY29tcGxleCBhZ2VudGljIGJlaGF2aW9yIG1pZ2h0IG5lZWQgbW9yZSByb2J1c3Qgc3RhdGUgbWFuYWdlbWVudCBvciBmbG93IGRlc2lnblxuICAgICAgICAgICAgIGlmIChtb2RlbFJlc3BvbnNlQWZ0ZXJUb29sLnRvb2xSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW01BSU4tRkxPV10gQUkgcmVxdWVzdGVkIGFub3RoZXIgdG9vbCBhZnRlciBhIHRvb2wgcmVzcG9uc2UuIFRoaXMgaXMgbm90IGRlZXBseSBoYW5kbGVkIHlldC4gUmV0dXJuaW5nIGN1cnJlbnQgdGV4dC5cIik7XG4gICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHN1Z2dlc3RlZFJlcGx5KSB7XG4gICAgICAgIC8vIFRpZGFrIGFkYSB0b29sIHJlcXVlc3QsIEFJIGxhbmdzdW5nIG1lbmphd2FiXG4gICAgICAgIGNvbnN0IGZpbmlzaFJlYXNvbiA9IHJlc3VsdC5maW5pc2hSZWFzb247XG4gICAgICAgIGNvbnNvbGUubG9nKGBbTUFJTi1GTE9XXSBNQUlOIEFJIEZpbmlzaCBSZWFzb24gKG5vIHRvb2wpOiAke2ZpbmlzaFJlYXNvbn1gKTtcbiAgICAgICAgaWYgKCFzdWdnZXN0ZWRSZXBseSAmJiBmaW5pc2hSZWFzb24gIT09IFwic3RvcFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbTUFJTi1GTE9XXSDinYwgTUFJTiBBSSBnZW5lcmF0aW9uIGZhaWxlZCBvciBubyB0ZXh0IG91dHB1dC4gRmluaXNoIFJlYXNvbjogJHtmaW5pc2hSZWFzb259LmApO1xuICAgICAgICAgICAgc3VnZ2VzdGVkUmVwbHkgPSBcIk1hYWYsIFpveWEgbGFnaSBhZ2FrIGJpbmd1bmcgbmloIGJvc2t1dS4gQ29iYSB0YW55YSBsYWdpIGRlbmdhbiBjYXJhIGxhaW4geWEuXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBBSSBtZW5qYXdhYiBsYW5nc3VuZywgY29iYSBkZXRla3NpIGludGVyYWtzaSBiZXJpa3V0bnlhIGJlcmRhc2Fya2FuIGphd2FiYW4gQUlcbiAgICAgICAgICAgIGNvbnN0IGxvd2VyUmVwbHkgPSBzdWdnZXN0ZWRSZXBseS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKGxvd2VyUmVwbHkuaW5jbHVkZXMoXCJ0aXBlIG1vdG9ybnlhIGFwYVwiKSB8fCBsb3dlclJlcGx5LmluY2x1ZGVzKFwibW90b3JueWEgYXBhXCIpIHx8IGxvd2VyUmVwbHkuaW5jbHVkZXMoXCJqZW5pcyBtb3Rvcm55YVwiKSkge1xuICAgICAgICAgICAgICAgIHNlc3Npb25EYXRhVG9TYXZlLmxhc3RBaUludGVyYWN0aW9uVHlwZSA9ICdhc2tlZF9mb3JfbW90b3JfdHlwZV9mb3Jfc3BlY2lmaWNfc2VydmljZSc7XG4gICAgICAgICAgICAgICAgLy8gQ29iYSBla3N0cmFrIG5hbWEgbGF5YW5hbiBkYXJpIHBlc2FuIHVzZXIgSklLQSBBSSBiZXJ0YW55YSB0aXBlIG1vdG9yXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VydmljZU1lbnRpb25lZEluVXNlciA9IGV4dHJhY3RTZXJ2aWNlTmFtZUZyb21Vc2VyTWVzc2FnZShjdXN0b21lck1lc3NhZ2VUb1Byb2Nlc3MsIGF3YWl0IGdldEFsbFNlcnZpY2VOYW1lcygpKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VydmljZU1lbnRpb25lZEluVXNlcikge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5hY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5ID0gc2VydmljZU1lbnRpb25lZEluVXNlcjtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSA9IHNlcnZpY2VNZW50aW9uZWRJblVzZXI7IC8vIFVwZGF0ZSBmb3IgY3VycmVudCB0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChsb3dlclJlcGx5LmluY2x1ZGVzKFwicGlsaWhhbiBsYXlhbmFuXCIpIHx8IGxvd2VyUmVwbHkuaW5jbHVkZXMoXCJkYWZ0YXIgbGF5YW5hblwiKSkge1xuICAgICAgICAgICAgICAgIHNlc3Npb25EYXRhVG9TYXZlLmxhc3RBaUludGVyYWN0aW9uVHlwZSA9ICdwcm92aWRlZF9jYXRlZ29yeV9zZXJ2aWNlX2xpc3QnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsb3dlclJlcGx5LmluY2x1ZGVzKFwiaGFyZ2FcIikgJiYgKGtub3duTW90b3JjeWNsZU5hbWUgIT09IFwiYmVsdW0gZGlrZXRhaHVpXCIpKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbkRhdGFUb1NhdmUubGFzdEFpSW50ZXJhY3Rpb25UeXBlID0gJ3Byb3ZpZGVkX3NwZWNpZmljX3NlcnZpY2VfZGV0YWlscyc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxvd2VyUmVwbHkuaW5jbHVkZXMoXCJib29raW5nXCIpIHx8IGxvd2VyUmVwbHkuaW5jbHVkZXMoXCJqYWR3YWxcIikpIHtcbiAgICAgICAgICAgICAgICAgc2Vzc2lvbkRhdGFUb1NhdmUubGFzdEFpSW50ZXJhY3Rpb25UeXBlID0gJ3JlYWR5X2Zvcl9ib29raW5nX2RldGFpbHMnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gKFRhbWJhaGthbiBkZXRla3NpIGxhaW4gamlrYSBwZXJsdSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgW01BSU4tRkxPV10g4p2MIE5vIHRvb2wgcmVxdWVzdCBhbmQgbm8gdGV4dCBvdXRwdXQgZnJvbSBNQUlOIEFJLiBSZXN1bHQ6ICR7SlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCAyKX1gKTtcbiAgICAgICAgc3VnZ2VzdGVkUmVwbHkgPSBcIldhZHVoLCBab3lhIGxhZ2kgbmdnYWsgYmlzYSBqYXdhYiBuaWguIENvYmEgbGFnaSB5YS5cIjtcbiAgICAgIH1cblxuICAgICAgLy8gMy4gU2ltcGFuIFNlc2kga2UgRmlyZXN0b3JlIChqaWthIHNlbmRlck51bWJlciBhZGEpXG4gICAgICBpZiAoc2Vzc2lvbkRvY1JlZikge1xuICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhzZXNzaW9uRGF0YVRvU2F2ZSkubGVuZ3RoID4gMCB8fCBcbiAgICAgICAgICAgICAgKGtub3duTW90b3JjeWNsZU5hbWUgIT09IGN1cnJlbnRTZXNzaW9uLmtub3duTW90b3JjeWNsZU5hbWUgJiYga25vd25Nb3RvcmN5Y2xlTmFtZSAhPT0gXCJiZWx1bSBkaWtldGFodWlcIikgfHxcbiAgICAgICAgICAgICAgKGtub3duTW90b3JjeWNsZVNpemUgIT09IGN1cnJlbnRTZXNzaW9uLmtub3duTW90b3JjeWNsZVNpemUgJiYga25vd25Nb3RvcmN5Y2xlU2l6ZSAhPT0gXCJiZWx1bSBkaWtldGFodWlcIikgfHxcbiAgICAgICAgICAgICAgKGFjdGl2ZVNwZWNpZmljU2VydmljZUlucXVpcnkgIT09IGN1cnJlbnRTZXNzaW9uLmFjdGl2ZVNwZWNpZmljU2VydmljZUlucXVpcnkgJiYgYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSAhPT0gXCJ0aWRhayBhZGFcIikgfHxcbiAgICAgICAgICAgICAgKHNlc3Npb25EYXRhVG9TYXZlLmxhc3RBaUludGVyYWN0aW9uVHlwZSAhPT0gY3VycmVudFNlc3Npb24ubGFzdEFpSW50ZXJhY3Rpb25UeXBlICYmIHNlc3Npb25EYXRhVG9TYXZlLmxhc3RBaUludGVyYWN0aW9uVHlwZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBmaW5hbFNlc3Npb25EYXRhVG9TYXZlOiBQYXJ0aWFsPFVzZXJBaVNlc3Npb24+ID0ge1xuICAgICAgICAgICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICAgICAgICAgIGtub3duTW90b3JjeWNsZU5hbWU6IChrbm93bk1vdG9yY3ljbGVOYW1lICE9PSBcImJlbHVtIGRpa2V0YWh1aVwiKSA/IGtub3duTW90b3JjeWNsZU5hbWUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAga25vd25Nb3RvcmN5Y2xlU2l6ZTogKGtub3duTW90b3JjeWNsZVNpemUgIT09IFwiYmVsdW0gZGlrZXRhaHVpXCIpID8ga25vd25Nb3RvcmN5Y2xlU2l6ZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBhY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5OiAoYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSAhPT0gXCJ0aWRhayBhZGFcIikgPyBhY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5IDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGxhc3RBaUludGVyYWN0aW9uVHlwZTogc2Vzc2lvbkRhdGFUb1NhdmUubGFzdEFpSW50ZXJhY3Rpb25UeXBlIHx8IGxhc3RBaUludGVyYWN0aW9uVHlwZSxcbiAgICAgICAgICAgICAgICBsYXN0VXBkYXRlZEF0OiBzZXJ2ZXJUaW1lc3RhbXAoKSBhcyBUaW1lc3RhbXAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgW01BSU4tRkxPV10gTWVueWltcGFuIHNlc2kgdW50dWsgJHt1c2VySWR9OmAsIEpTT04uc3RyaW5naWZ5KGZpbmFsU2Vzc2lvbkRhdGFUb1NhdmUsIG51bGwsIDIpKTtcbiAgICAgICAgICAgIGF3YWl0IHNldEZpcmVzdG9yZURvYyhzZXNzaW9uRG9jUmVmLCBmaW5hbFNlc3Npb25EYXRhVG9TYXZlLCB7IG1lcmdlOiB0cnVlIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgW01BSU4tRkxPV10gVGlkYWsgYWRhIHBlcnViYWhhbiBzaWduaWZpa2FuIHBhZGEgc2VzaSB1bnR1ayAke3VzZXJJZH0sIHRpZGFrIG1lbnlpbXBhbi5gKTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Z2dlc3RlZFJlcGx5LFxuICAgICAgICBzZXNzaW9uQWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeTogKGFjdGl2ZVNwZWNpZmljU2VydmljZUlucXVpcnkgIT09IFwidGlkYWsgYWRhXCIpID8gYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSA6IHVuZGVmaW5lZCxcbiAgICAgICAgc2Vzc2lvbkRldGVjdGVkTW90b3JjeWNsZUluZm86IChrbm93bk1vdG9yY3ljbGVOYW1lICE9PSBcImJlbHVtIGRpa2V0YWh1aVwiKSA/IHsgbmFtZToga25vd25Nb3RvcmN5Y2xlTmFtZSwgc2l6ZTogKGtub3duTW90b3JjeWNsZVNpemUgIT09IFwiYmVsdW0gZGlrZXRhaHVpXCIpID8ga25vd25Nb3RvcmN5Y2xlU2l6ZSA6IHVuZGVmaW5lZCB9IDogdW5kZWZpbmVkLFxuICAgICAgICBzZXNzaW9uTGFzdEFpSW50ZXJhY3Rpb25UeXBlOiBzZXNzaW9uRGF0YVRvU2F2ZS5sYXN0QWlJbnRlcmFjdGlvblR5cGUgfHwgbGFzdEFpSW50ZXJhY3Rpb25UeXBlLFxuICAgICAgfTtcblxuICAgIH0gY2F0Y2ggKGZsb3dFcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbTUFJTi1GTE9XXSDinYwgQ3JpdGljYWwgZXJyb3IgZGFsYW0gTUFJTiB6b3lhQ2hhdEZsb3c6XCIsIGZsb3dFcnJvcik7XG4gICAgICAgIGlmIChmbG93RXJyb3IuY2F1c2UpIGNvbnNvbGUuZXJyb3IoXCJbTUFJTi1GTE9XXSBFcnJvciBDYXVzZTpcIiwgSlNPTi5zdHJpbmdpZnkoZmxvd0Vycm9yLmNhdXNlLCBudWxsLCAyKSk7XG4gICAgICAgIHJldHVybiB7IHN1Z2dlc3RlZFJlcGx5OiBgV2FkdWgsIFpveWEgbGFnaSBlcnJvciBuaWgsIGJvc2t1dS4gQ29iYSB0YW55YSBsYWdpIG5hbnRpIHlhLiAoRXJyb3I6ICR7Zmxvd0Vycm9yLm1lc3NhZ2UgfHwgJ0tlc2FsYWhhbiBpbnRlcm5hbCd9KWAgfTtcbiAgICB9XG4gIH1cbik7XG5cbi8vIEhlbHBlciBGdW5jdGlvbnMgKGJpc2EgZGlwaW5kYWgga2UgdXRpbHMgamlrYSBiYW55YWspXG5hc3luYyBmdW5jdGlvbiBnZXRBbGxTZXJ2aWNlTmFtZXMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBpdGVtcyA9IGF3YWl0IGZpbmRMYXlhbmFuQnlDYXRlZ29yeSh7IGtleXdvcmQ6IFwiXCIgfSk7IC8vIE1lbmNvYmEgYW1iaWwgc2VtdWFcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgICByZXR1cm4gaXRlbXMubWFwKGkgPT4gaS5uYW1lKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gW107XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGdldEFsbFNlcnZpY2VOYW1lczpcIiwgZSk7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxufVxuXG5mdW5jdGlvbiBleHRyYWN0U2VydmljZU5hbWVGcm9tVXNlck1lc3NhZ2UodXNlck1lc3NhZ2U6IHN0cmluZywgc2VydmljZU5hbWVzOiBzdHJpbmdbXSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgbG93ZXJVc2VyTWVzc2FnZSA9IHVzZXJNZXNzYWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gUHJpb3JpdGFza2FuIG1hdGNoIHlhbmcgbGViaWggcGFuamFuZyBkdWx1IHVudHVrIG1lbmdoaW5kYXJpIHBhcnRpYWwgbWF0Y2ggeWFuZyBzYWxhaFxuICAgIGNvbnN0IHNvcnRlZFNlcnZpY2VOYW1lcyA9IFsuLi5zZXJ2aWNlTmFtZXNdLnNvcnQoKGEsYikgPT4gYi5sZW5ndGggLSBhLmxlbmd0aCk7XG4gICAgZm9yIChjb25zdCBzZXJ2aWNlTmFtZSBvZiBzb3J0ZWRTZXJ2aWNlTmFtZXMpIHtcbiAgICAgICAgaWYgKHNlcnZpY2VOYW1lICYmIGxvd2VyVXNlck1lc3NhZ2UuaW5jbHVkZXMoc2VydmljZU5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlTmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vLyBXcmFwcGVyIGZ1bmN0aW9uIHlhbmcgYWthbiBkaXBhbmdnaWwgb2xlaCBVSSBhdGF1IEFQSSByb3V0ZVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlV2hhdHNBcHBSZXBseShpbnB1dDogWm95YUNoYXRJbnB1dCk6IFByb21pc2U8V2hhdHNBcHBSZXBseU91dHB1dD4ge1xuICBjb25zb2xlLmxvZyhcIltNQUlOLUZMT1cgV3JhcHBlcl0gZ2VuZXJhdGVXaGF0c0FwcFJlcGx5IGlucHV0OlwiLCBKU09OLnN0cmluZ2lmeShpbnB1dCwgbnVsbCwgMikpO1xuXG4gIGxldCBtYWluUHJvbXB0VG9Vc2UgPSBpbnB1dC5tYWluUHJvbXB0U3RyaW5nO1xuXG4gIGlmICghbWFpblByb21wdFRvVXNlICYmIGRiICYmIGlucHV0LnNlbmRlck51bWJlcikgeyAvLyBIYW55YSBjb2JhIGZldGNoIGRhcmkgRmlyZXN0b3JlIGppa2EgZGIgYWRhIGRhbiBzZW5kZXJOdW1iZXIgYWRhXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NEb2NSZWYgPSBkb2MoZGIsICdhcHBTZXR0aW5ncycsICdhaUFnZW50Q29uZmlnJyk7XG4gICAgICAgIGNvbnN0IGRvY1NuYXAgPSBhd2FpdCBnZXRGaXJlc3RvcmVEb2Moc2V0dGluZ3NEb2NSZWYpO1xuICAgICAgICBpZiAoZG9jU25hcC5leGlzdHMoKSAmJiBkb2NTbmFwLmRhdGEoKT8ubWFpblByb21wdCkge1xuICAgICAgICAgIG1haW5Qcm9tcHRUb1VzZSA9IGRvY1NuYXAuZGF0YSgpLm1haW5Qcm9tcHQ7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJbTUFJTi1GTE9XIFdyYXBwZXJdOiBVc2luZyBtYWluUHJvbXB0U3RyaW5nIGZyb20gRmlyZXN0b3JlLlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYWluUHJvbXB0VG9Vc2UgPSBERUZBVUxUX01BSU5fUFJPTVBUX1pPWUE7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJbTUFJTi1GTE9XIFdyYXBwZXJdOiBVc2luZyBERUZBVUxUX01BSU5fUFJPTVBUX1pPWUEgKEZpcmVzdG9yZSBkb2Mgbm90IGZvdW5kIG9yIG5vIG1haW5Qcm9tcHQpLlwiKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiW01BSU4tRkxPVyBXcmFwcGVyXTogRXJyb3IgZmV0Y2hpbmcgbWFpblByb21wdCBmcm9tIEZpcmVzdG9yZS4gVXNpbmcgZGVmYXVsdC5cIiwgZXJyb3IpO1xuICAgICAgbWFpblByb21wdFRvVXNlID0gREVGQVVMVF9NQUlOX1BST01QVF9aT1lBO1xuICAgIH1cbiAgfSBlbHNlIGlmICghbWFpblByb21wdFRvVXNlKSB7XG4gICAgIG1haW5Qcm9tcHRUb1VzZSA9IERFRkFVTFRfTUFJTl9QUk9NUFRfWk9ZQTtcbiAgICAgY29uc29sZS5sb2coXCJbTUFJTi1GTE9XIFdyYXBwZXJdOiBVc2luZyBERUZBVUxUX01BSU5fUFJPTVBUX1pPWUEgKGRiIG9yIHNlbmRlck51bWJlciBub3QgYXZhaWxhYmxlIGZvciBGaXJlc3RvcmUgZmV0Y2gsIG9yIHByb21wdCBhbHJlYWR5IHByb3ZpZGVkKS5cIik7XG4gIH0gZWxzZSB7XG4gICAgIGNvbnNvbGUubG9nKFwiW01BSU4tRkxPVyBXcmFwcGVyXTogVXNpbmcgbWFpblByb21wdFN0cmluZyBkaXJlY3RseSBmcm9tIGlucHV0LlwiKTtcbiAgfVxuXG5cbiAgY29uc3QgZmxvd0lucHV0OiBab3lhQ2hhdElucHV0ID0ge1xuICAgIC4uLmlucHV0LFxuICAgIG1lc3NhZ2VzOiBpbnB1dC5tZXNzYWdlcyB8fCBbXSxcbiAgICBtYWluUHJvbXB0U3RyaW5nOiBtYWluUHJvbXB0VG9Vc2UsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB6b3lhQ2hhdEZsb3coZmxvd0lucHV0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcIltNQUlOLUZMT1cgV3JhcHBlcl0gRXJyb3IgcnVubmluZyB6b3lhQ2hhdEZsb3c6XCIsIGVycm9yKTtcbiAgICByZXR1cm4geyBzdWdnZXN0ZWRSZXBseTogYE1hYWYsIFpveWEgc2VkYW5nIGFkYSBrZW5kYWxhIHRla25pcy4gKCR7ZXJyb3IubWVzc2FnZSB8fCAnVGlkYWsgZGlrZXRhaHVpJ30pYCB9O1xuICB9XG59XG5cbiAgICAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InFUQWdWc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ScrollArea": (()=>ScrollArea),
    "ScrollBar": (()=>ScrollBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const ScrollArea = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative overflow-hidden", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                className: "h-full w-full rounded-[inherit]",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 17,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Corner"], {}, void 0, false, {
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
_c1 = ScrollArea;
ScrollArea.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
const ScrollBar = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, orientation = "vertical", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"], {
        ref: ref,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaThumb"], {
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
_c2 = ScrollBar;
ScrollBar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"].displayName;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ScrollArea$React.forwardRef");
__turbopack_context__.k.register(_c1, "ScrollArea");
__turbopack_context__.k.register(_c2, "ScrollBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/firebase.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "app": (()=>app),
    "db": (()=>db)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm2017.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
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
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length === 0) {
    try {
        app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(firebaseConfig);
        console.log("[firebase.ts] Firebase app initialized. Project ID:", app.options.projectId);
    } catch (e) {
        console.error("[firebase.ts] FAILED to initialize Firebase app:", e.message);
        // @ts-ignore
        app = null;
    }
} else {
    app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApp"])();
    console.log("[firebase.ts] Using existing Firebase app. Project ID:", app.options.projectId);
}
// @ts-ignore
if (app) {
    try {
        // @ts-ignore
        db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
        console.log("[firebase.ts] Firestore instance obtained.");
    } catch (e) {
        console.error("[firebase.ts] FAILED to get Firestore instance:", e?.message);
    }
} else {
    console.error("[firebase.ts] Firebase app not properly initialized, cannot get Firestore.");
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/(app)/ai-cs-assistant/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AiCsAssistantPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)"); // Import Link
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>"); // Removed BrainCircuit, PhoneForwarded, Info, PlusCircle, Trash2
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square-text.js [app-client] (ecmascript) <export default as MessageSquareText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-client] (ecmascript) <export default as ThumbsUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-down.js [app-client] (ecmascript) <export default as ThumbsDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$02c839__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:02c839 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const [customerMessageInput, setCustomerMessageInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentPlaygroundInput, setCurrentPlaygroundInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [playgroundChatHistory, setPlaygroundChatHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingPlaygroundSuggestion, setIsLoadingPlaygroundSuggestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingCustomers, setLoadingCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedCustomer, setSelectedCustomer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chatHistory, setChatHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isPlaygroundMode, setIsPlaygroundMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSendingWhatsApp, setIsSendingWhatsApp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playgroundMessagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const unsubscribeChatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // AI Agent Settings & Knowledge Base related state and functions are MOVED to the new settings page.
    const scrollToBottom = (ref)=>{
        ref.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AiCsAssistantPage.useEffect": ()=>{
            if (!isPlaygroundMode && selectedCustomer && chatHistory.length > 0) {
                scrollToBottom(messagesEndRef);
            }
        }
    }["AiCsAssistantPage.useEffect"], [
        chatHistory,
        selectedCustomer,
        isPlaygroundMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AiCsAssistantPage.useEffect": ()=>{
            if (isPlaygroundMode && playgroundChatHistory.length > 0) {
                scrollToBottom(playgroundMessagesEndRef);
            }
        }
    }["AiCsAssistantPage.useEffect"], [
        playgroundChatHistory,
        isPlaygroundMode
    ]);
    const fetchCustomers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AiCsAssistantPage.useCallback[fetchCustomers]": async ()=>{
            console.log("Fetching actual customers from Firestore...");
            try {
                const clientsCollectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'clients');
                const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(clientsCollectionRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("name"));
                const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
                const clientsData = querySnapshot.docs.map({
                    "AiCsAssistantPage.useCallback[fetchCustomers].clientsData": (doc)=>({
                            id: doc.id,
                            ...doc.data()
                        })
                }["AiCsAssistantPage.useCallback[fetchCustomers].clientsData"]);
                return clientsData.map({
                    "AiCsAssistantPage.useCallback[fetchCustomers]": (client)=>({
                            id: client.id,
                            name: client.name,
                            avatarUrl: client.photoUrl || `https://placehold.co/40x40.png?text=${client.name.charAt(0)}`,
                            lastMessageTimestamp: client.lastVisit || 'N/A',
                            lastMessage: 'Klik untuk melihat chat...',
                            unreadCount: 0,
                            phone: client.phone
                        })
                }["AiCsAssistantPage.useCallback[fetchCustomers]"]);
            } catch (error) {
                console.error("Error fetching customers from Firestore: ", error);
                toast({
                    title: "Error Database",
                    description: "Gagal mengambil daftar pelanggan dari database.",
                    variant: "destructive"
                });
                return [];
            }
        }
    }["AiCsAssistantPage.useCallback[fetchCustomers]"], [
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AiCsAssistantPage.useEffect": ()=>{
            const loadInitialData = {
                "AiCsAssistantPage.useEffect.loadInitialData": async ()=>{
                    setLoadingCustomers(true);
                    try {
                        const fetchedCustomers = await fetchCustomers();
                        setCustomers(fetchedCustomers);
                    } catch (error) {
                        console.error("Failed to fetch customers:", error);
                    } finally{
                        setLoadingCustomers(false);
                    }
                }
            }["AiCsAssistantPage.useEffect.loadInitialData"];
            loadInitialData();
        }
    }["AiCsAssistantPage.useEffect"], [
        fetchCustomers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AiCsAssistantPage.useEffect": ()=>{
            if (unsubscribeChatRef.current) {
                unsubscribeChatRef.current();
                unsubscribeChatRef.current = null;
            }
            if (selectedCustomer && !isPlaygroundMode) {
                const phoneToQuery = formatPhoneNumberForMatching(selectedCustomer.phone);
                if (phoneToQuery) {
                    const messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'directMessages');
                    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("senderNumber", "==", phoneToQuery), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("timestamp", "asc"));
                    unsubscribeChatRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, {
                        "AiCsAssistantPage.useEffect": (querySnapshot)=>{
                            const history = [];
                            querySnapshot.forEach({
                                "AiCsAssistantPage.useEffect": (doc)=>{
                                    const data = doc.data();
                                    history.push({
                                        ...data,
                                        id: doc.id,
                                        timestamp: data.timestamp?.toDate().toLocaleTimeString('id-ID', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) || 'N/A'
                                    });
                                }
                            }["AiCsAssistantPage.useEffect"]);
                            setChatHistory(history);
                        }
                    }["AiCsAssistantPage.useEffect"], {
                        "AiCsAssistantPage.useEffect": (error)=>{
                            console.error(`Error fetching real-time chat for ${selectedCustomer.name} (phone: ${phoneToQuery}):`, error);
                            toast({
                                title: "Error Real-time Chat",
                                description: "Gagal memuat pesan secara real-time.",
                                variant: "destructive"
                            });
                        }
                    }["AiCsAssistantPage.useEffect"]);
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
            return ({
                "AiCsAssistantPage.useEffect": ()=>{
                    if (unsubscribeChatRef.current) {
                        unsubscribeChatRef.current();
                    }
                }
            })["AiCsAssistantPage.useEffect"];
        }
    }["AiCsAssistantPage.useEffect"], [
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
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
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
        const genkitMessagesForFlow = updatedPlaygroundHistory.filter((msg)=>msg.sender === 'user' || msg.sender === 'ai').map((msg)=>({
                role: msg.sender === 'user' ? 'user' : 'model',
                content: msg.text
            }));
        // Prepare ZoyaChatInput
        const flowInput = {
            messages: genkitMessagesForFlow.slice(0, -1),
            customerMessage: userMessageText
        };
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$02c839__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["generateWhatsAppReply"])(flowInput);
            const aiMessage = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
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
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
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
                const directMessagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'directMessages');
                const csMessageData = {
                    customerId: selectedCustomer.id,
                    customerName: selectedCustomer.name,
                    senderNumber: formattedPhoneForSending,
                    text: textToSend,
                    sender: 'user',
                    timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    read: true
                };
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])(directMessagesRef, csMessageData);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col h-full bg-background",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    title: "Asisten CS AI untuk WhatsApp"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                    lineNumber: 468,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-1 md:col-span-1 lg:col-span-1 border-r border-border bg-card flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-lg flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                    className: "mr-2 h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 474,
                                                    columnNumber: 17
                                                }, this),
                                                " Daftar Pelanggan"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 473,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative mt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                    className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 477,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "search",
                                                    placeholder: "Cari pelanggan (nama/HP)...",
                                                    className: "pl-8 w-full h-9",
                                                    value: searchTerm,
                                                    onChange: (e)=>setSearchTerm(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 478,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 476,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 472,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-3 hover:bg-muted cursor-pointer border-b border-t border-border", isPlaygroundMode ? 'bg-accent text-accent-foreground' : ''),
                                    onClick: handleSelectPlayground,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-9 w-9 flex items-center justify-center", isPlaygroundMode ? "bg-accent-foreground text-accent" : "bg-primary/10 text-primary"),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 501,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 497,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium truncate",
                                                        children: "AI Playground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground truncate",
                                                        children: "Uji coba AI tanpa pelanggan."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 496,
                                        columnNumber: 15
                                    }, this)
                                }, "ai-playground", false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 488,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                    className: "flex-grow",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "p-0",
                                        children: loadingCustomers ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 text-center text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "h-6 w-6 animate-spin mx-auto my-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 21
                                                }, this),
                                                "Memuat pelanggan..."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 512,
                                            columnNumber: 19
                                        }, this) : filteredCustomers.length === 0 && searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "p-4 text-center text-muted-foreground",
                                            children: "Pelanggan tidak ditemukan."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 517,
                                            columnNumber: 20
                                        }, this) : filteredCustomers.length === 0 && !searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "p-4 text-center text-muted-foreground",
                                            children: "Belum ada pelanggan."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 521,
                                            columnNumber: 20
                                        }, this) : filteredCustomers.map((customer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0 ${selectedCustomer?.id === customer.id && !isPlaygroundMode ? 'bg-accent/20' : ''}`,
                                                onClick: ()=>handleCustomerSelect(customer),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                                            className: "h-9 w-9",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                    src: customer.avatarUrl,
                                                                    alt: customer.name,
                                                                    "data-ai-hint": "avatar pelanggan"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 533,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                    children: customer.name.charAt(0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 534,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 532,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium truncate",
                                                                    children: customer.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 537,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-muted-foreground truncate",
                                                                    children: customer.phone || 'No HP tidak ada'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 538,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 536,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 23
                                                }, this)
                                            }, customer.id, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 526,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 509,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                            lineNumber: 471,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-1 md:col-span-2 lg:col-span-3 flex flex-col bg-background p-4 space-y-4 overflow-y-auto",
                            children: [
                                isPlaygroundMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                className: "p-4 border-b",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                        className: "text-lg flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                                className: "mr-2 h-6 w-6 text-primary"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 553,
                                                                columnNumber: 70
                                                            }, this),
                                                            " AI Playground"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 553,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                        children: "Uji coba langsung kemampuan AI. Berikan feedback untuk membantu AI belajar."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 552,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                                className: "h-[400px] p-4 space-y-4",
                                                children: [
                                                    playgroundChatHistory.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `px-4 py-2 rounded-xl shadow ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm whitespace-pre-wrap",
                                                                                children: message.text
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                                lineNumber: 569,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: `text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/80' : 'text-secondary-foreground/80'} text-right`,
                                                                                children: message.timestamp
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                                lineNumber: 570,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                        lineNumber: 562,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 559,
                                                                    columnNumber: 25
                                                                }, this),
                                                                message.sender === 'ai' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-start mt-1.5 ml-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "ghost",
                                                                            size: "icon",
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-7 w-7 hover:bg-green-100 dark:hover:bg-green-800", message.feedback === 'good' && "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"),
                                                                            onClick: ()=>handlePlaygroundFeedback(message.id, 'good'),
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__["ThumbsUp"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                                lineNumber: 583,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 577,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            variant: "ghost",
                                                                            size: "icon",
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-7 w-7 ml-1 hover:bg-red-100 dark:hover:bg-red-800", message.feedback === 'bad' && "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"),
                                                                            onClick: ()=>handlePlaygroundFeedback(message.id, 'bad'),
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__["ThumbsDown"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                                lineNumber: 591,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 585,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 576,
                                                                    columnNumber: 27
                                                                }, this),
                                                                message.sender === 'ai' && message.feedback === 'bad' && message.isEditingCorrection && !message.correction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2 ml-1 space-y-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                            placeholder: "Tulis koreksi Anda di sini...",
                                                                            value: message.currentCorrectionText || '',
                                                                            onChange: (e)=>handlePlaygroundCorrectionChange(message.id, e.target.value),
                                                                            rows: 3,
                                                                            className: "text-sm bg-background"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 597,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            size: "sm",
                                                                            onClick: ()=>handleSavePlaygroundCorrection(message.id),
                                                                            className: "bg-accent text-accent-foreground hover:bg-accent/90",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                                                    className: "mr-2 h-4 w-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                                    lineNumber: 605,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                " Simpan Koreksi"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 604,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 596,
                                                                    columnNumber: 27
                                                                }, this),
                                                                message.sender === 'ai' && message.correction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                                    className: "mt-2 ml-1 p-3 border-green-500 bg-green-50 dark:bg-green-900/30",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs font-medium text-green-700 dark:text-green-300",
                                                                            children: "Koreksi Anda:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 611,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap",
                                                                            children: message.correction
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 612,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 610,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, message.id, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 558,
                                                            columnNumber: 23
                                                        }, this)),
                                                    playgroundChatHistory.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-center text-muted-foreground py-10",
                                                        children: "Mulai percakapan dengan AI di bawah."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 618,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        ref: playgroundMessagesEndRef
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 620,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 556,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 622,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardFooter"], {
                                                className: "p-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-end space-x-2 w-full",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
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
                                                            lineNumber: 625,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "icon",
                                                            onClick: handleSendPlaygroundMessage,
                                                            disabled: isLoadingPlaygroundSuggestion || !currentPlaygroundInput.trim(),
                                                            className: "h-10 w-10 shrink-0",
                                                            "aria-label": "Kirim Pesan ke AI",
                                                            children: isLoadingPlaygroundSuggestion ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                className: "h-5 w-5 animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 642,
                                                                columnNumber: 58
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                className: "h-5 w-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 642,
                                                                columnNumber: 105
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 635,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 623,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 551,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false) : !selectedCustomer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex flex-col items-center justify-center text-center p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareText$3e$__["MessageSquareText"], {
                                            className: "h-16 w-16 text-muted-foreground mb-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 650,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl text-muted-foreground",
                                            children: "Pilih pelanggan untuk memulai percakapan"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 651,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: "atau masuk ke mode Playground AI dari daftar di samping."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 652,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 649,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                className: "p-4 border-b",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                    className: "text-lg flex items-center",
                                                                    children: [
                                                                        "Percakapan dengan: ",
                                                                        selectedCustomer.name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 660,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                                    children: selectedCustomer.phone || "Nomor HP tidak tersedia"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 663,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 659,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            size: "sm",
                                                            onClick: handleSetManualLock,
                                                            disabled: isSendingWhatsApp || !selectedCustomer.phone,
                                                            title: "Aktifkan lock AI selama 1 jam (jika Anda baru balas dari HP)",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                                    className: "mr-2 h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 672,
                                                                    columnNumber: 29
                                                                }, this),
                                                                "Ambil Alih (Lock AI 1 Jam)"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 665,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 658,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 657,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                                className: "h-[400px] p-4 space-y-4",
                                                children: [
                                                    chatHistory.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `px-4 py-2 rounded-xl shadow ${message.sender === 'customer' ? 'bg-muted text-muted-foreground' : message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm whitespace-pre-wrap",
                                                                        children: message.text
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                        lineNumber: 692,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: `text-xs mt-1 ${message.sender === 'customer' ? 'text-muted-foreground/80' : message.sender === 'user' ? 'text-primary-foreground/80' : 'text-secondary-foreground/80'} text-right`,
                                                                        children: [
                                                                            message.timestamp,
                                                                            " ",
                                                                            message.sender === 'ai' && '(AI Otomatis)'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                        lineNumber: 693,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 683,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, message.id, false, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 679,
                                                            columnNumber: 23
                                                        }, this)),
                                                    chatHistory.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-center text-muted-foreground py-10",
                                                        children: "Belum ada riwayat chat untuk pelanggan ini."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 704,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        ref: messagesEndRef
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 706,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 677,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 708,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                className: "rounded-none border-0 border-t shadow-none",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                        className: "p-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                            className: "text-lg flex items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                                    className: "mr-2 h-5 w-5 text-primary"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 712,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Balas Pesan Pelanggan"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 711,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 710,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                        className: "p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-end space-x-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
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
                                                                        lineNumber: 718,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "icon",
                                                                        onClick: handleSendMessage,
                                                                        disabled: isSendingWhatsApp || !customerMessageInput.trim() || !selectedCustomer?.phone,
                                                                        className: "h-10 w-10 shrink-0",
                                                                        "aria-label": "Kirim Pesan Manual",
                                                                        children: isSendingWhatsApp ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                            className: "h-5 w-5 animate-spin"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 735,
                                                                            columnNumber: 48
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                            className: "h-5 w-5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 735,
                                                                            columnNumber: 95
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                        lineNumber: 728,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 717,
                                                                columnNumber: 23
                                                            }, this),
                                                            !selectedCustomer?.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-destructive mt-1",
                                                                children: "Nomor HP pelanggan tidak tersedia untuk pengiriman WhatsApp."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 739,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 716,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 709,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 656,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-auto p-4 flex justify-start",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/ai-cs-assistant/settings",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                    className: "mr-2 h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 750,
                                                    columnNumber: 19
                                                }, this),
                                                " Pengaturan Agen & Knowledge Base AI"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 749,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 748,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 747,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                            lineNumber: 548,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                    lineNumber: 469,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
            lineNumber: 467,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
        lineNumber: 466,
        columnNumber: 5
    }, this);
}
_s(AiCsAssistantPage, "cIq31TEeiJWXwVEe/Fv/9h5iazc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = AiCsAssistantPage;
var _c;
__turbopack_context__.k.register(_c, "AiCsAssistantPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_b05be427._.js.map