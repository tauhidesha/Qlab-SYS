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
"[project]/src/ai/flows/data:d6fe3d [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"4042c47ea0c74421e840a6780974a2d92d185bfc6a":"generateWhatsAppReply"},"src/ai/flows/cs-whatsapp-reply-flow.ts",""] */ __turbopack_context__.s({
    "generateWhatsAppReply": (()=>generateWhatsAppReply)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var generateWhatsAppReply = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("4042c47ea0c74421e840a6780974a2d92d185bfc6a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "generateWhatsAppReply"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY3Mtd2hhdHNhcHAtcmVwbHktZmxvdy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcbi8qKlxuICogQGZpbGVPdmVydmlldyBBSSBmbG93IGZvciBXaGF0c0FwcCBjdXN0b21lciBzZXJ2aWNlIHJlcGxpZXMuXG4gKiBJbnRlZ3JhdGVzIHdpdGggRmlyZXN0b3JlIHNldHRpbmdzIGZvciBkeW5hbWljIEFJIGJlaGF2aW9yLlxuICogLSBnZW5lcmF0ZVdoYXRzQXBwUmVwbHkgLSBGdW5jdGlvbiB0byBnZW5lcmF0ZSBhIGRyYWZ0IHJlcGx5LlxuICovXG5cbmltcG9ydCB7IGFpIH0gZnJvbSAnQC9haS9nZW5raXQnO1xuaW1wb3J0IHsgZ2V0UHJvZHVjdFNlcnZpY2VEZXRhaWxzQnlOYW1lVG9vbCB9IGZyb20gJ0AvYWkvdG9vbHMvcHJvZHVjdExvb2t1cFRvb2wnO1xuaW1wb3J0IHsgZ2V0Q2xpZW50RGV0YWlsc1Rvb2wgfSBmcm9tICdAL2FpL3Rvb2xzL2NsaWVudExvb2t1cFRvb2wnO1xuaW1wb3J0IHsgZ2V0S25vd2xlZGdlQmFzZUluZm9Ub29sIH0gZnJvbSAnQC9haS90b29scy9rbm93bGVkZ2VMb29rdXBUb29sJztcbmltcG9ydCB7IGNyZWF0ZUJvb2tpbmdUb29sIH0gZnJvbSAnQC9haS90b29scy9jcmVhdGVCb29raW5nVG9vbCc7XG5pbXBvcnQgdHlwZSB7IFdoYXRzQXBwUmVwbHlJbnB1dCwgV2hhdHNBcHBSZXBseU91dHB1dCwgQ2hhdE1lc3NhZ2UgfSBmcm9tICdAL3R5cGVzL2FpL2NzLXdoYXRzYXBwLXJlcGx5JztcbmltcG9ydCB7IFdoYXRzQXBwUmVwbHlJbnB1dFNjaGVtYSwgV2hhdHNBcHBSZXBseU91dHB1dFNjaGVtYSB9IGZyb20gJ0AvdHlwZXMvYWkvY3Mtd2hhdHNhcHAtcmVwbHknO1xuaW1wb3J0IHsgeiB9IGZyb20gJ2dlbmtpdCc7XG5pbXBvcnQgeyBERUZBVUxUX0FJX1NFVFRJTkdTLCB0eXBlIEFpU2V0dGluZ3NGb3JtVmFsdWVzIH0gZnJvbSAnQC90eXBlcy9haVNldHRpbmdzJztcbmltcG9ydCB7IGZvcm1hdCBhcyBmb3JtYXREYXRlRm5zLCBhZGREYXlzIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgZG9jLCBnZXREb2MgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuaW1wb3J0IHsgZGIgfSBmcm9tICdAL2xpYi9maXJlYmFzZSc7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFpU2V0dGluZ3NGcm9tRmlyZXN0b3JlKCk6IFByb21pc2U8UGFydGlhbDxBaVNldHRpbmdzRm9ybVZhbHVlcz4+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXR0aW5nc0RvY1JlZiA9IGRvYyhkYiwgJ2FwcFNldHRpbmdzJywgJ2FpQWdlbnRDb25maWcnKTtcbiAgICBjb25zdCBkb2NTbmFwID0gYXdhaXQgZ2V0RG9jKHNldHRpbmdzRG9jUmVmKTtcbiAgICBpZiAoZG9jU25hcC5leGlzdHMoKSkge1xuICAgICAgY29uc29sZS5sb2coXCJBSSBzZXR0aW5ncyBmZXRjaGVkIGZyb20gRmlyZXN0b3JlOlwiLCBkb2NTbmFwLmRhdGEoKSk7XG4gICAgICByZXR1cm4gZG9jU25hcC5kYXRhKCkgYXMgUGFydGlhbDxBaVNldHRpbmdzRm9ybVZhbHVlcz47XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiTm8gQUkgc2V0dGluZ3MgZm91bmQgaW4gRmlyZXN0b3JlLCB1c2luZyBkZWZhdWx0cy5cIik7XG4gICAgcmV0dXJuIHt9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBBSSBzZXR0aW5ncyBmcm9tIEZpcmVzdG9yZTpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7fTsgLy8gRmFsbGJhY2sgdG8gZW1wdHkgb2JqZWN0LCBkZWZhdWx0cyB3aWxsIGFwcGx5XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlV2hhdHNBcHBSZXBseSh7IGN1c3RvbWVyTWVzc2FnZSwgc2VuZGVyTnVtYmVyLCBjaGF0SGlzdG9yeSB9OiB7IGN1c3RvbWVyTWVzc2FnZTogc3RyaW5nOyBzZW5kZXJOdW1iZXI/OiBzdHJpbmc7IGNoYXRIaXN0b3J5PzogQ2hhdE1lc3NhZ2VbXSB9KTogUHJvbWlzZTxXaGF0c0FwcFJlcGx5T3V0cHV0PiB7XG4gIGNvbnN0IGZpcmVzdG9yZVNldHRpbmdzID0gYXdhaXQgZ2V0QWlTZXR0aW5nc0Zyb21GaXJlc3RvcmUoKTtcbiAgLy8gTWVyZ2UgRmlyZXN0b3JlIHNldHRpbmdzIHdpdGggZGVmYXVsdHMuIEZpcmVzdG9yZSBzZXR0aW5ncyB0YWtlIHByZWNlZGVuY2UuXG4gIGNvbnN0IGFnZW50U2V0dGluZ3MgPSB7IC4uLkRFRkFVTFRfQUlfU0VUVElOR1MsIC4uLmZpcmVzdG9yZVNldHRpbmdzIH07XG4gIFxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gIGNvbnN0IGZsb3dJbnB1dDogV2hhdHNBcHBSZXBseUlucHV0ID0ge1xuICAgIGN1c3RvbWVyTWVzc2FnZTogY3VzdG9tZXJNZXNzYWdlLFxuICAgIHNlbmRlck51bWJlcjogc2VuZGVyTnVtYmVyLFxuICAgIGNoYXRIaXN0b3J5OiBjaGF0SGlzdG9yeSB8fCBbXSxcbiAgICBhZ2VudEJlaGF2aW9yOiBhZ2VudFNldHRpbmdzLmFnZW50QmVoYXZpb3IsIFxuICAgIGtub3dsZWRnZUJhc2U6IGFnZW50U2V0dGluZ3Mua25vd2xlZGdlQmFzZURlc2NyaXB0aW9uLFxuICAgIGN1cnJlbnREYXRlOiBmb3JtYXREYXRlRm5zKG5vdywgJ3l5eXktTU0tZGQnKSxcbiAgICBjdXJyZW50VGltZTogZm9ybWF0RGF0ZUZucyhub3csICdISDptbScpLFxuICAgIHRvbW9ycm93RGF0ZTogZm9ybWF0RGF0ZUZucyhhZGREYXlzKG5vdywgMSksICd5eXl5LU1NLWRkJyksXG4gICAgZGF5QWZ0ZXJUb21vcnJvd0RhdGU6IGZvcm1hdERhdGVGbnMoYWRkRGF5cyhub3csIDIpLCAneXl5eS1NTS1kZCcpLFxuICB9O1xuICBcbiAgY29uc29sZS5sb2coXCJnZW5lcmF0ZVdoYXRzQXBwUmVwbHkgaW5wdXQgdG8gZmxvdyAodXNpbmcgbWVyZ2VkIHNldHRpbmdzLCBjb21iaW5lZCBwcm9tcHQpOlwiLCBKU09OLnN0cmluZ2lmeShmbG93SW5wdXQsIG51bGwsIDIpKTtcbiAgY29uc3QgYWlSZXNwb25zZSA9IGF3YWl0IHdoYXRzQXBwUmVwbHlGbG93Q29tYmluZWQoZmxvd0lucHV0KTtcbiAgcmV0dXJuIGFpUmVzcG9uc2U7XG59XG5cbmNvbnN0IHJlcGx5UHJvbXB0Q29tYmluZWQgPSBhaS5kZWZpbmVQcm9tcHQoe1xuICBuYW1lOiAnd2hhdHNBcHBSZXBseVByb21wdF9Db21iaW5lZF92NCcsIC8vIFVwZGF0ZWQgdmVyc2lvbiBmb3IgY2xhcml0eVxuICBpbnB1dDogeyBzY2hlbWE6IFdoYXRzQXBwUmVwbHlJbnB1dFNjaGVtYSB9LFxuICBvdXRwdXQ6IHsgc2NoZW1hOiBXaGF0c0FwcFJlcGx5T3V0cHV0U2NoZW1hIH0sXG4gIHRvb2xzOiBbZ2V0S25vd2xlZGdlQmFzZUluZm9Ub29sLCBnZXRQcm9kdWN0U2VydmljZURldGFpbHNCeU5hbWVUb29sLCBnZXRDbGllbnREZXRhaWxzVG9vbCwgY3JlYXRlQm9va2luZ1Rvb2xdLFxuICBwcm9tcHQ6IGBBbmRhIGFkYWxhaCBab3lhLCBzZW9yYW5nIEN1c3RvbWVyIFNlcnZpY2UgQXNzaXN0YW50IEFJIHVudHVrIFFMQUIgQXV0byBEZXRhaWxpbmcuXG5QZXJpbGFrdSBBbmRhOiB7e3thZ2VudEJlaGF2aW9yfX19LlxuQW5kYSBiZXJ0dWdhcyBtZW1iYW50dSBwZW5nZ3VuYSBkZW5nYW4gbWVuamF3YWIgcGVydGFueWFhbiBhdGF1IG1lbXByb3NlcyBwZXJtaW50YWFuIG1lcmVrYSBtZW5nZW5haSBsYXlhbmFuIGRhbiBwcm9kdWsgUUxBQi5cblxuSU5TVFJVS1NJIFVUQU1BOlxuMS4gIEd1bmFrYW4gdG9vbCB5YW5nIHRlcnNlZGlhIGppa2EgZGlwZXJsdWthbiB1bnR1ayBtZW5kYXBhdGthbiBpbmZvcm1hc2kgYWt1cmF0IGF0YXUgbWVsYWt1a2FuIHRpbmRha2FuIGJvb2tpbmcuXG4yLiAgSW5mb3JtYXNpIHVtdW0gYXRhdSBrZWJpamFrYW4gZGFwYXQgZGljYXJpIG1lbmdndW5ha2FuICdnZXRLbm93bGVkZ2VCYXNlSW5mb1Rvb2wnLlxuMy4gIERldGFpbCBzcGVzaWZpayBwcm9kdWsvbGF5YW5hbiBzZXBlcnRpIGhhcmdhLCBkdXJhc2ksIGF0YXUga2V0ZXJzZWRpYWFuIGd1bmFrYW4gJ2dldFByb2R1Y3RTZXJ2aWNlRGV0YWlsc0J5TmFtZVRvb2wnLlxuICAgICogICBUb29sICdnZXRQcm9kdWN0U2VydmljZURldGFpbHNCeU5hbWVUb29sJyBiaXNhIG1lbmdlbWJhbGlrYW4gc2F0dSBpdGVtIGF0YXUgYXJyYXkgYmViZXJhcGEgaXRlbSBqaWthIHF1ZXJ5LW55YSB1bXVtLlxuICAgICogICAqKlNhYXQgbWVuZ2d1bmFrYW4gb3V0cHV0IGRhcmkgJ2dldFByb2R1Y3RTZXJ2aWNlRGV0YWlsc0J5TmFtZVRvb2wnOiBTRUxBTFUgZ3VuYWthbiBOQU1BIGRhbiBIQVJHQSBQRVJTSVMgc2VwZXJ0aSB5YW5nIGRpa2VtYmFsaWthbiBvbGVoIHRvb2wuIEpBTkdBTiBtZW1idWF0IG5hbWEgbGF5YW5hbiBhdGF1IGhhcmdhIHNlbmRpcmkuKipcbiAgICAqICAgSmlrYSBwZWxhbmdnYW4gbWVueWVidXRrYW4gbGF5YW5hbiBzZWNhcmEgdW11bSAobWlzYWxueWEgXCJjb2F0aW5nIG1vdG9yXCIsIFwiY3VjaSB4bWF4XCIpIGF0YXUgYmVydGFueWEgXCJhZGEgYXBhIGFqYT9cIiwgZ3VuYWthbiB0b29sICdnZXRQcm9kdWN0U2VydmljZURldGFpbHNCeU5hbWVUb29sJyBkZW5nYW4gcXVlcnkgeWFuZyBsZWJpaCB1bXVtIChtaXNhbG55YSwgXCJjb2F0aW5nXCIsIFwicGFrZXQgZGV0YWlsaW5nXCIsIFwiY3VjaSBtb3RvclwiKS5cbiAgICAqICAgSmlrYSB0b29sIG1lbmdlbWJhbGlrYW4gKipBUlJBWSBCRUJFUkFQQSBJVEVNKiogKG1pc2FsbnlhLCBoYXNpbCBkYXJpIHF1ZXJ5IHVtdW0gc2VwZXJ0aSBcImNvYXRpbmdcIiBhdGF1IFwicGFrZXQgZGV0YWlsaW5nXCIpOlxuICAgICAgICAqICAgU2VidXRrYW4gMi0zIGl0ZW0geWFuZyBwYWxpbmcgcmVsZXZhbiBkYXJpIGFycmF5IHRlcnNlYnV0LlxuICAgICAgICAqICAgVW50dWsgc2V0aWFwIGl0ZW0geWFuZyBkaXBpbGloLCBzZWJ1dGthbiAqKk5BTUEgaXRlbW55YSAoZGFyaSBmaWVsZCAnbmFtZScgb3V0cHV0IHRvb2wpKiogZGFuICoqSEFSR0EtbnlhIChkYXJpIGZpZWxkICdwcmljZScgb3V0cHV0IHRvb2wpKiouXG4gICAgICAgICogICBKaWthIGl0ZW0gdGVyc2VidXQgcHVueWEgYXJyYXkgJ3ZhcmlhbnRzJyB5YW5nIFRJREFLIEtPU09ORywgc2VidXRrYW4gTkFNQSBpdGVtIGRhc2FyLCBsYWx1IHNlYnV0a2FuIGJlYmVyYXBhIGNvbnRvaCB2YXJpYW4gZGFyaSBkYWxhbSBhcnJheSAndmFyaWFudHMnIGJlc2VydGEgaGFyZ2FueWEuXG4gICAgICAgICogICBDb250b2ggamlrYSB0b29sIG1lbmdlbWJhbGlrYW4gYXJyYXk6IFwiVW50dWsgY29hdGluZywga2FtaSBhZGEgYmViZXJhcGEgcGlsaWhhbiBLYWs6ICgxKSBbTkFNQV9JVEVNXzFfREFSSV9UT09MXSBoYXJnYW55YSBScCBbSEFSR0FfSVRFTV8xX0RBUklfVE9PTF0uICgyKSBVbnR1ayBbTkFNQV9JVEVNXzJfREFSSV9UT09MXSwgYWRhIHZhcmlhbiBbTkFNQV9WQVJJQU5fQV9EQVJJX1RPT0xfMl0gUnAgW0hBUkdBX1ZBUklBTl9BX0RBUklfVE9PTF8yXSBkYW4gdmFyaWFuIFtOQU1BX1ZBUklBTl9CX0RBUklfVE9PTF8yXSBScCBbSEFSR0FfVkFSSUFOX0JfREFSSV9UT09MXzJdLiBLYWthayB0ZXJ0YXJpayB5YW5nIG1hbmE/XCJcbiAgICAqICAgSmlrYSB0b29sIG1lbmdlbWJhbGlrYW4gKipTQVRVIElURU0qKiAob2JqZWsgdHVuZ2dhbCwgYnVrYW4gYXJyYXkpOlxuICAgICAgICAqICAgR3VuYWthbiBmaWVsZCAnbmFtZScgZGFyaSBvdXRwdXQgdG9vbCBzZWJhZ2FpIE5BTUEgTEFZQU5BTi5cbiAgICAgICAgKiAgIEppa2EgaXRlbSB0ZXJzZWJ1dCBUSURBSyBtZW1pbGlraSBhcnJheSAndmFyaWFudHMnIGF0YXUgYXJyYXkgJ3ZhcmlhbnRzJyBLT1NPTkc6XG4gICAgICAgICAgICAqICAgU2VidXRrYW4gaGFyZ2EgZGFyaSBmaWVsZCAncHJpY2UnIGl0ZW0gdGVyc2VidXQuIENvbnRvaDogXCJVbnR1ayBbTkFNQV9JVEVNX0RBUklfVE9PTF0sIGhhcmdhbnlhIFJwIFtIQVJHQV9EQVJJX1RPT0xdLlwiXG4gICAgICAgICogICBKaWthIGl0ZW0gdGVyc2VidXQgTUVNSUxJS0kgYXJyYXkgJ3ZhcmlhbnRzJyB5YW5nIGJlcmlzaSBiZWJlcmFwYSBwaWxpaGFuOlxuICAgICAgICAgICAgKiAgIFNlYnV0a2FuIE5BTUEgaXRlbSBkYXNhciAoZGFyaSBmaWVsZCAnbmFtZScgb3V0cHV0IHRvb2wpLlxuICAgICAgICAgICAgKiAgIEtlbXVkaWFuLCBzZWJ1dGthbiBiZWJlcmFwYSBwaWxpaGFuIHZhcmlhbiBEQVJJIERBTEFNIEFSUkFZICd2YXJpYW50cycgdGVyc2VidXQgYmVzZXJ0YSBoYXJnYW55YS4gQ29udG9oOiBcIlVudHVrIGxheWFuYW4gW05BTUFfSVRFTV9EQVNBUl9EQVJJX1RPT0xdLCBrYW1pIGFkYSBiZWJlcmFwYSBwaWxpaGFuIHVrdXJhbiBLYWs6IFZhcmlhbiBbTkFNQV9WQVJJQU5fMV9EQVJJX1RPT0xdIGhhcmdhbnlhIFJwIFtIQVJHQV9WQVJJQU5fMV9EQVJJX1RPT0xdLCBkYW4gVmFyaWFuIFtOQU1BX1ZBUklBTl8yX0RBUklfVE9PTF0gaGFyZ2FueWEgUnAgW0hBUkdBX1ZBUklBTl8yX0RBUklfVE9PTF0uIEtha2FrIHRlcnRhcmlrIHlhbmcgbWFuYT9cIlxuICAgICAgICAgICAgKiAgIEppa2EgcGVsYW5nZ2FuIGJlcnRhbnlhIGhhcmdhIHNwZXNpZmlrIHZhcmlhbiAobWlzLiBcImdsb3NzeSBzaXplIEwgYmVyYXBhP1wiKSwgcGFzdGlrYW4gQW5kYSBtZW5jYXJpIGl0ZW0gZGFzYXIgKG1pc2FsbnlhIFwiQ29hdGluZyBNb3RvciBHbG9zc3lcIiBqaWthIGl0dSBuYW1hIGl0ZW1ueWEpLCBsYWx1IGNhcmkgdmFyaWFuIFwiTFwiIChhdGF1IG5hbWEgdmFyaWFuIHlhbmcgcGFsaW5nIGNvY29rKSBkaSBkYWxhbSBhcnJheSBcXGB2YXJpYW50c1xcYCBpdGVtIHRlcnNlYnV0IHVudHVrIG1lbmRhcGF0a2FuIGhhcmdhIHlhbmcgYmVuYXIuXG4gICAgKiAgIEppa2EgcGVsYW5nZ2FuIGJlcnRhbnlhIHRlbnRhbmcga2F0ZWdvcmkgbGF5YW5hbiAobWlzYWxueWEgXCJsYXlhbmFuIGRldGFpbGluZyBhcGEgc2FqYT9cIiksIEFuZGEgYmlzYSBndW5ha2FuICdnZXRLbm93bGVkZ2VCYXNlSW5mb1Rvb2wnIGRlbmdhbiBxdWVyeSB0ZW50YW5nIGthdGVnb3JpIHRlcnNlYnV0IGF0YXUgJ2dldFByb2R1Y3RTZXJ2aWNlRGV0YWlsc0J5TmFtZVRvb2wnIGRlbmdhbiBuYW1hIGthdGVnb3JpIHNlYmFnYWkgcHJvZHVjdE5hbWUuXG40LiAgVW50dWsgZGF0YSBwZWxhbmdnYW4gKHBvaW4sIG1vdG9yIHRlcmRhZnRhciksIGd1bmFrYW4gJ2dldENsaWVudERldGFpbHNUb29sJy5cbjUuICBKaWthIHBlbGFuZ2dhbiBtZW1pbnRhIGJvb2tpbmcsIGd1bmFrYW4gJ2NyZWF0ZUJvb2tpbmdUb29sJy4gUGFzdGlrYW4gQW5kYSB0ZWxhaCBtZW5na29uZmlybWFzaSBsYXlhbmFuIHlhbmcgZGlpbmdpbmthbiwgbmFtYSBwZWxhbmdnYW4sIGluZm8ga2VuZGFyYWFuLCBkYW4gdGFuZ2dhbC93YWt0dSBzZWJlbHVtIG1lbWFuZ2dpbCB0b29sIGJvb2tpbmcuIFVudHVrIHRhbmdnYWwgZGFuIHdha3R1LCBqaWthIHBlbGFuZ2dhbiB0aWRhayBzcGVzaWZpaywgQW5kYSBiaXNhIG1lbmF3YXJrYW4gc2xvdCB0ZXJzZWRpYSBhdGF1IG1lbmFueWFrYW4gcHJlZmVyZW5zaSBtZXJla2EuIEtvbmZpcm1hc2kgS0VURVJTRURJQUFOIFNMT1QgamlrYSBwZWxhbmdnYW4gbWVtaW50YSB3YWt0dSBzcGVzaWZpayBTRUJFTFVNIG1lbWFuZ2dpbCB0b29sIGluaSAoZ3VuYWthbiBwZW5nZXRhaHVhbiB1bXVtIEFuZGEgYXRhdSBnZXRLbm93bGVkZ2VCYXNlSW5mb1Rvb2wgamlrYSBhZGEgaW5mbyBrZXRlcnNlZGlhYW4gdW11bSkuXG42LiAgS29udGVrcyBLbm93bGVkZ2UgQmFzZSBUYW1iYWhhbjoge3t7a25vd2xlZGdlQmFzZX19fVxuXG5JTkZPUk1BU0kgV0FLVFUgU0FBVCBJTkk6XG5UYW5nZ2FsIHNhYXQgaW5pIGFkYWxhaCB7e3tjdXJyZW50RGF0ZX19fSwgamFtIHt7e2N1cnJlbnRUaW1lfX19LiBCZXNvayBhZGFsYWgge3t7dG9tb3Jyb3dEYXRlfX19LCBkYW4gbHVzYSBhZGFsYWgge3t7ZGF5QWZ0ZXJUb21vcnJvd0RhdGV9fX0uXG5cbkZPUk1BVCBCQUxBU0FOOlxuRm9ybWF0IGJhbGFzYW4gQU5EQSBIQVJVUyBTRUxBTFUgYmVydXBhIG9iamVrIEpTT04gZGVuZ2FuIHNhdHUgZmllbGQgYmVybmFtYSBcInN1Z2dlc3RlZFJlcGx5XCIgeWFuZyBiZXJpc2kgdGVrcyBiYWxhc2FuIEFuZGEuXG5Db250b2ggYmFsYXNhbiBKU09OOiB7XCJzdWdnZXN0ZWRSZXBseVwiOiBcIlRlbnR1LCBLYWsuIFVudHVrIGxheWFuYW4gQ3VjaSBQcmVtaXVtLCBoYXJnYW55YSBhZGFsYWggUnAgNzUuMDAwLlwifVxuSkFOR0FOIFBFUk5BSCBtZW55ZWJ1dGthbiBuYW1hIHRvb2wgeWFuZyBBbmRhIGd1bmFrYW4gZGFsYW0gYmFsYXNhbiB0ZWtzIGtlIHBlbGFuZ2dhbi5cblxuR0FZQSBCQUhBU0E6XG5HdW5ha2FuIGJhaGFzYSBJbmRvbmVzaWEgeWFuZyBiYWt1LCBzb3BhbiwgcmFtYWgsIGRhbiBuYXR1cmFsIHVudHVrIHBlcmNha2FwYW4gV2hhdHNBcHAuXG5KaWthIHBlcnRhbnlhYW4gZGkgbHVhciBsaW5na3VwLCBzYXJhbmthbiB1bnR1ayBkYXRhbmcga2UgYmVuZ2tlbCBhdGF1IGh1YnVuZ2kgbm9tb3IgcmVzbWkuXG5KYWdhIGJhbGFzYW4gcmluZ2thcyBuYW11biBsZW5na2FwLiBIaW5kYXJpIGphbmppIHlhbmcgdGlkYWsgcGFzdGkuXG5TZWxhbHUgYWtoaXJpIGRlbmdhbiBzYXBhYW4gc29wYW4gYXRhdSBrYWxpbWF0IHBvc2l0aWYuXG5cblJJV0FZQVQgUEVSQ0FLQVBBTiBTRUJFTFVNTllBIChqaWthIGFkYSk6XG57eyNpZiBjaGF0SGlzdG9yeS5sZW5ndGh9fVxue3sjZWFjaCBjaGF0SGlzdG9yeX19XG4gIHt7dGhpcy5yb2xlfX06IHt7e3RoaXMuY29udGVudH19fVxue3svZWFjaH19XG57ey9pZn19XG5cblBFU0FOIFBFTEFOR0dBTiBURVJCQVJVOlxudXNlcjoge3t7Y3VzdG9tZXJNZXNzYWdlfX19XG5cbkhhc2lsa2FuIGhhbnlhIG9iamVrIEpTT04gc2ViYWdhaSBiYWxhc2FuIEFuZGEuXG5gXG59KTtcblxuY29uc3Qgd2hhdHNBcHBSZXBseUZsb3dDb21iaW5lZCA9IGFpLmRlZmluZUZsb3coXG4gIHtcbiAgICBuYW1lOiAnd2hhdHNBcHBSZXBseUZsb3dfQ29tYmluZWRfdjQnLCAvLyBVcGRhdGVkIHZlcnNpb25cbiAgICBpbnB1dFNjaGVtYTogV2hhdHNBcHBSZXBseUlucHV0U2NoZW1hLFxuICAgIG91dHB1dFNjaGVtYTogV2hhdHNBcHBSZXBseU91dHB1dFNjaGVtYSxcbiAgfSxcbiAgYXN5bmMgKGlucHV0OiBXaGF0c0FwcFJlcGx5SW5wdXQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIndoYXRzQXBwUmVwbHlGbG93X0NvbWJpbmVkX3Y0IGlucHV0IHJlY2VpdmVkIGJ5IGZsb3c6XCIsIEpTT04uc3RyaW5naWZ5KGlucHV0LCBudWxsLCAyKSk7XG4gICAgXG4gICAgY29uc3Qge291dHB1dH0gPSBhd2FpdCByZXBseVByb21wdENvbWJpbmVkKGlucHV0KTsgXG4gICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignR2FnYWwgbWVuZGFwYXRrYW4gc2FyYW4gYmFsYXNhbiBkYXJpIEFJIChjb21iaW5lZCBwcm9tcHQgZmxvdyB2NCkuJyk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwid2hhdHNBcHBSZXBseUZsb3dfQ29tYmluZWRfdjQgb3V0cHV0OlwiLCBvdXRwdXQpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbik7XG4gICAgXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InFUQXFDc0IifQ==
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
// Log environment variables right at the start of this module's execution
console.log("[firebase.ts] Reading NEXT_PUBLIC_FIREBASE_PROJECT_ID:", ("TURBOPACK compile-time value", "detailflow-8mkmj"));
console.log("[firebase.ts] Reading NEXT_PUBLIC_FIREBASE_API_KEY:", ("TURBOPACK compile-time truthy", 1) ? "Exists" : ("TURBOPACK unreachable", undefined));
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyB4O6ZRoRnRKWsA3v4q19jXHsSbELo2lT0"),
    authDomain: ("TURBOPACK compile-time value", "detailflow-8mkmj.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "detailflow-8mkmj"),
    storageBucket: ("TURBOPACK compile-time value", "detailflow-8mkmj.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "940251442415"),
    appId: ("TURBOPACK compile-time value", "1:940251442415:web:0227a18d7c0028ff20bf1a")
};
// Log the constructed firebaseConfig
console.log("[firebase.ts] Firebase config to be used:", JSON.stringify(firebaseConfig, null, 2));
let app;
let db;
console.log("[firebase.ts] Memulai inisialisasi Firebase (selalu ke Cloud)...");
if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
    console.error("--------------------------------------------------------------------");
    console.error("[firebase.ts] KESALAHAN FATAL: Firebase projectId atau apiKey KOSONG!");
    console.error("[firebase.ts] Pastikan file .env sudah ada di root proyek dan berisi variabel Firebase yang benar (NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_API_KEY, dll).");
    console.error("[firebase.ts] Jalankan 'npm run genkit:dev' dari terminal di root folder proyek Anda.");
    console.error("--------------------------------------------------------------------");
// Throw an error or handle appropriately if critical config is missing
// For now, we let it proceed so initializeApp might show its own error, but this log is critical.
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length === 0) {
    console.log("[firebase.ts] Tidak ada aplikasi Firebase yang terinisialisasi, membuat aplikasi baru...");
    try {
        app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(firebaseConfig);
        console.log("[firebase.ts] Aplikasi Firebase baru berhasil dibuat. Project ID:", app.options.projectId);
    } catch (e) {
        console.error("[firebase.ts] Gagal menginisialisasi aplikasi Firebase:", e);
    // throw e; // Re-throw if you want to halt execution, or handle gracefully
    }
} else {
    console.log("[firebase.ts] Menggunakan aplikasi Firebase yang sudah ada.");
    app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApp"])();
    console.log("[firebase.ts] Aplikasi Firebase yang ada. Project ID:", app.options.projectId);
}
try {
    // @ts-ignore
    db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
    console.log("[firebase.ts] Instance Firestore didapatkan. Selalu menghubungkan ke Cloud Firestore.");
} catch (e) {
    // @ts-ignore
    console.error("[firebase.ts] Gagal mendapatkan instance Firestore:", e?.message);
    // @ts-ignore
    console.error("[firebase.ts] Detail error Firestore:", e);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/AppHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$d6fe3d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:d6fe3d [app-client] (ecmascript) <text/javascript>");
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
function formatPhoneNumberForMatching(number) {
    let cleaned = number.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.substring(1);
    } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13) {
        cleaned = '62' + cleaned;
    } else if (!cleaned.startsWith('62') && !(cleaned.length < 9)) {
        if (cleaned.length >= 9 && cleaned.length <= 13 && !cleaned.startsWith('+')) {
            cleaned = '62' + cleaned;
        }
    }
    return cleaned;
}
const AI_LOCK_DURATION_MS = 1 * 60 * 60 * 1000; // 1 jam
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
                            avatarUrl: `https://placehold.co/40x40.png?text=${client.name.charAt(0)}`,
                            lastMessageTimestamp: client.lastVisit || 'N/A',
                            lastMessage: 'Klik untuk melihat chat...',
                            unreadCount: 0,
                            phone: client.phone ? formatPhoneNumberForMatching(client.phone) : undefined
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
            if (selectedCustomer && selectedCustomer.phone && !isPlaygroundMode) {
                const formattedPhoneForQuery = selectedCustomer.phone; // Already formatted
                const messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'directMessages');
                const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])("senderNumber", "==", formattedPhoneForQuery), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("timestamp", "asc"));
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
                        console.error(`Error fetching real-time chat for ${selectedCustomer.name}:`, error);
                        toast({
                            title: "Error Real-time Chat",
                            description: "Gagal memuat pesan secara real-time.",
                            variant: "destructive"
                        });
                    }
                }["AiCsAssistantPage.useEffect"]);
            } else {
                setChatHistory([]); // Clear chat if no customer selected or in playground mode
            }
            // Cleanup listener on component unmount or when selectedCustomer/isPlaygroundMode changes
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
        setSelectedCustomer(null); // Clear selected customer
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
    // Chat history will be loaded by the useEffect hook for selectedCustomer
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
        const genkitChatHistory = updatedPlaygroundHistory.slice(0, -1) // Exclude the last user message as it's the current one
        .map((msg)=>({
                role: msg.sender === 'user' ? 'user' : 'model',
                content: msg.text
            }));
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$d6fe3d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["generateWhatsAppReply"])({
                customerMessage: userMessageText,
                chatHistory: genkitChatHistory
            });
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
            const errorMessage = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                sender: 'ai',
                text: "Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi.",
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
                description: "Gagal mendapatkan respon dari AI.",
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
        if (!customerMessageInput.trim() || !selectedCustomer || isPlaygroundMode || !selectedCustomer.phone) {
            toast({
                title: "Tidak Dapat Mengirim",
                description: "Pesan kosong, pelanggan tidak dipilih, atau nomor HP pelanggan tidak tersedia.",
                variant: "destructive"
            });
            return;
        }
        const textToSend = customerMessageInput.trim();
        const originalInput = customerMessageInput; // Save for potential restore on error
        setCustomerMessageInput(''); // Clear input immediately
        setIsSendingWhatsApp(true);
        const customerPhoneNumber = selectedCustomer.phone; // Ensure phone is available
        try {
            // 1. Send message via local WhatsApp server
            const response = await fetch('/api/whatsapp/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: customerPhoneNumber,
                    message: textToSend
                })
            });
            const result = await response.json();
            if (response.ok && result.success) {
                toast({
                    title: "Pesan Terkirim ke WhatsApp",
                    description: `Pesan Anda sedang dikirim ke ${selectedCustomer.name}.`
                });
                // 2. Save CS manual reply to directMessages
                const directMessagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'directMessages');
                const csMessageData = {
                    customerId: selectedCustomer.id,
                    customerName: selectedCustomer.name,
                    senderNumber: customerPhoneNumber,
                    text: textToSend,
                    sender: 'user',
                    timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    read: true
                };
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])(directMessagesRef, csMessageData);
                console.log("CS manual reply saved to directMessages.");
                // 3. Set AI intervention lock
                try {
                    const lockResponse = await fetch('/api/whatsapp/set-intervention-lock', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            senderNumber: customerPhoneNumber
                        })
                    });
                    const lockResult = await lockResponse.json();
                    if (lockResponse.ok && lockResult.success) {
                        console.log(`AI lock set for ${customerPhoneNumber} via API call from UI.`);
                    } else {
                        console.warn(`Failed to set AI lock for ${customerPhoneNumber} via API: ${lockResult.error}`);
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
            setCustomerMessageInput(originalInput); // Restore input on error
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
        setIsSendingWhatsApp(true); // Reuse loading state for visual feedback
        try {
            const response = await fetch('/api/whatsapp/set-intervention-lock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    senderNumber: selectedCustomer.phone
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
    const filteredCustomers = customers.filter((customer)=>customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || customer.phone && customer.phone.includes(searchTerm) // Pastikan phone ada sebelum includes
    );
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$AppHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Asisten CS AI untuk WhatsApp"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                lineNumber: 436,
                columnNumber: 7
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
                                                lineNumber: 443,
                                                columnNumber: 15
                                            }, this),
                                            " Daftar Pelanggan"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 442,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "search",
                                                placeholder: "Cari pelanggan (nama/HP)...",
                                                className: "pl-8 w-full h-9",
                                                value: searchTerm,
                                                onChange: (e)=>setSearchTerm(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 447,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 445,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                lineNumber: 441,
                                columnNumber: 11
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
                                                lineNumber: 471,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium truncate",
                                                    children: "AI Playground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 474,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground truncate",
                                                    children: "Uji coba AI tanpa pelanggan."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 473,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 466,
                                    columnNumber: 13
                                }, this)
                            }, "ai-playground", false, {
                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                lineNumber: 458,
                                columnNumber: 11
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
                                                lineNumber: 483,
                                                columnNumber: 19
                                            }, this),
                                            "Memuat pelanggan..."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 482,
                                        columnNumber: 17
                                    }, this) : filteredCustomers.length === 0 && searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "p-4 text-center text-muted-foreground",
                                        children: "Pelanggan tidak ditemukan."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 487,
                                        columnNumber: 18
                                    }, this) : filteredCustomers.length === 0 && !searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "p-4 text-center text-muted-foreground",
                                        children: "Belum ada pelanggan."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 491,
                                        columnNumber: 18
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
                                                                lineNumber: 503,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                children: customer.name.charAt(0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 504,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium truncate",
                                                                children: customer.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 507,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground truncate",
                                                                children: customer.phone || 'No HP tidak ada'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 508,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 501,
                                                columnNumber: 21
                                            }, this)
                                        }, customer.id, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 496,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 480,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                lineNumber: 479,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-1 md:col-span-2 lg:col-span-3 flex flex-col bg-background",
                        children: isPlaygroundMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "p-4 border-b bg-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-lg flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                    className: "mr-2 h-6 w-6 text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 523,
                                                    columnNumber: 66
                                                }, this),
                                                " AI Playground"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 523,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            children: "Uji coba langsung kemampuan AI. Berikan feedback untuk membantu AI belajar."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 524,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 522,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                    className: "flex-1 p-4 space-y-4 bg-card/50",
                                    children: [
                                        playgroundChatHistory.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm whitespace-pre-wrap",
                                                                    children: message.text
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 539,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: `text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/80' : 'text-secondary-foreground/80'} text-right`,
                                                                    children: message.timestamp
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 540,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 532,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 529,
                                                        columnNumber: 21
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
                                                                    lineNumber: 553,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 547,
                                                                columnNumber: 25
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
                                                                    lineNumber: 561,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 555,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 546,
                                                        columnNumber: 23
                                                    }, this),
                                                    message.sender === 'ai' && message.feedback === 'bad' && message.isEditingCorrection && !message.correction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 ml-1 space-y-2 max-w-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                                placeholder: "Tulis koreksi Anda di sini...",
                                                                value: message.currentCorrectionText || '',
                                                                onChange: (e)=>handlePlaygroundCorrectionChange(message.id, e.target.value),
                                                                rows: 3,
                                                                className: "text-sm bg-background"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 567,
                                                                columnNumber: 25
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
                                                                        lineNumber: 575,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    " Simpan Koreksi"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 574,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 566,
                                                        columnNumber: 23
                                                    }, this),
                                                    message.sender === 'ai' && message.correction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                        className: "mt-2 ml-1 p-3 border-green-500 bg-green-50 dark:bg-green-900/30 max-w-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-medium text-green-700 dark:text-green-300",
                                                                children: "Koreksi Anda:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 581,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap",
                                                                children: message.correction
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 582,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, message.id, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 528,
                                                columnNumber: 19
                                            }, this)),
                                        playgroundChatHistory.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-center text-muted-foreground py-10",
                                            children: "Mulai percakapan dengan AI di bawah."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 588,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: playgroundMessagesEndRef
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 590,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 526,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 592,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "rounded-none border-0 border-t shadow-none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "p-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-end space-x-2",
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
                                                    lineNumber: 596,
                                                    columnNumber: 21
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
                                                        lineNumber: 613,
                                                        columnNumber: 56
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                        className: "h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 613,
                                                        columnNumber: 103
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 606,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 595,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 594,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 593,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : !selectedCustomer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex flex-col items-center justify-center text-center p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareText$3e$__["MessageSquareText"], {
                                    className: "h-16 w-16 text-muted-foreground mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 621,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-muted-foreground",
                                    children: "Pilih pelanggan untuk memulai percakapan"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 622,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: "atau masuk ke mode Playground AI dari daftar di samping."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 623,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                            lineNumber: 620,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "p-4 border-b bg-card",
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
                                                        lineNumber: 630,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                        children: selectedCustomer.phone || "Nomor HP tidak tersedia"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 633,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 629,
                                                columnNumber: 21
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
                                                        lineNumber: 642,
                                                        columnNumber: 25
                                                    }, this),
                                                    "Ambil Alih (Lock AI 1 Jam)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 635,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 628,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 627,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                    className: "flex-1 p-4 space-y-4 bg-card/50",
                                    children: [
                                        chatHistory.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow ${message.sender === 'customer' ? 'bg-muted text-muted-foreground' : message.sender === 'user' // Staf CS manual reply
                                                     ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground' // AI auto-reply
                                                    }`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm whitespace-pre-wrap",
                                                            children: message.text
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 662,
                                                            columnNumber: 23
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
                                                            lineNumber: 663,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 653,
                                                    columnNumber: 21
                                                }, this)
                                            }, message.id, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 649,
                                                columnNumber: 19
                                            }, this)),
                                        chatHistory.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-center text-muted-foreground py-10",
                                            children: "Belum ada riwayat chat untuk pelanggan ini."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 674,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: messagesEndRef
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 676,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 647,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 679,
                                    columnNumber: 15
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
                                                        lineNumber: 683,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Balas Pesan Pelanggan"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 682,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 681,
                                            columnNumber: 17
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
                                                            lineNumber: 689,
                                                            columnNumber: 21
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
                                                                lineNumber: 706,
                                                                columnNumber: 44
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                className: "h-5 w-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 706,
                                                                columnNumber: 91
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 699,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 688,
                                                    columnNumber: 19
                                                }, this),
                                                !selectedCustomer?.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-destructive mt-1",
                                                    children: "Nomor HP pelanggan tidak tersedia untuk pengiriman WhatsApp."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 710,
                                                    columnNumber: 26
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 687,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 680,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                        lineNumber: 519,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                lineNumber: 437,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
        lineNumber: 435,
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

//# sourceMappingURL=src_2f143d33._.js.map