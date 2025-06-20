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
"[project]/src/ai/flows/data:33c499 [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"4053660f6447b38038e1d20965a3df3cd57a2a7b51":"generateWhatsAppReply"},"src/ai/flows/cs-whatsapp-reply-flow.ts",""] */ __turbopack_context__.s({
    "generateWhatsAppReply": (()=>generateWhatsAppReply)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var generateWhatsAppReply = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("4053660f6447b38038e1d20965a3df3cd57a2a7b51", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "generateWhatsAppReply"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY3Mtd2hhdHNhcHAtcmVwbHktZmxvdy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgYWkgfSBmcm9tICdAL2FpL2dlbmtpdCc7XG5pbXBvcnQgKiBhcyB6IGZyb20gJ3pvZCc7XG5pbXBvcnQgeyBkYiB9IGZyb20gJ0AvbGliL2ZpcmViYXNlJzsgLy8gTWVuZ2d1bmFrYW4gQ2xpZW50IFNES1xuaW1wb3J0IHsgY29sbGVjdGlvbiwgcXVlcnkgYXMgZmlyZXN0b3JlUXVlcnksIHdoZXJlLCBsaW1pdCwgZ2V0RG9jcyB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7IC8vIEltcG9ydCBmdW5nc2kgQ2xpZW50IFNES1xuXG4vLyBTa2VtYSBab2QgdW50dWsgaW5wdXQsIFRJREFLIERJLUVYUE9SVFxuY29uc3QgWm95YUNoYXRJbnB1dFNjaGVtYSA9IHoub2JqZWN0KHtcbiAgbWVzc2FnZXM6IHouYXJyYXkoXG4gICAgei5vYmplY3Qoe1xuICAgICAgcm9sZTogei5lbnVtKFsndXNlcicsICdtb2RlbCddKSxcbiAgICAgIGNvbnRlbnQ6IHouc3RyaW5nKCksXG4gICAgfSlcbiAgKS5vcHRpb25hbCgpLFxuICBjdXN0b21lck1lc3NhZ2U6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgc2VuZGVyTnVtYmVyOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGFnZW50QmVoYXZpb3I6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAga25vd2xlZGdlQmFzZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBjdXJyZW50RGF0ZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBjdXJyZW50VGltZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICB0b21vcnJvd0RhdGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgZGF5QWZ0ZXJUb21vcnJvd0RhdGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgbWFpblByb21wdFN0cmluZzogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxufSk7XG5leHBvcnQgdHlwZSBab3lhQ2hhdElucHV0ID0gei5pbmZlcjx0eXBlb2YgWm95YUNoYXRJbnB1dFNjaGVtYT47XG5cbmNvbnN0IFpveWFDaGF0T3V0cHV0U2NoZW1hID0gei5zdHJpbmcoKTtcblxuY29uc3QgZ2V0U2VydmljZVByaWNlVG9vbCA9IGFpLmRlZmluZVRvb2woXG4gIHtcbiAgICBuYW1lOiAnZ2V0U2VydmljZVByaWNlJyxcbiAgICBkZXNjcmlwdGlvbjogJ0RhcGF0a2FuIGhhcmdhIHVudHVrIGxheWFuYW4gc3Blc2lmaWsgcGFkYSBtb2RlbCBtb3RvciB0ZXJ0ZW50dS4gR3VuYWthbiB0b29sIGluaSBqaWthIHVzZXIgbWVuYW55YWthbiBoYXJnYS4nLFxuICAgIGlucHV0U2NoZW1hOiB6Lm9iamVjdCh7XG4gICAgICB2ZWhpY2xlTW9kZWw6IHouc3RyaW5nKCkuZGVzY3JpYmUoJ01vZGVsIG1vdG9yLCBjb250b2g6IE5NQVgsIFBDWCwgVmFyaW8nKSxcbiAgICAgIHNlcnZpY2VOYW1lOiB6LnN0cmluZygpLmRlc2NyaWJlKCdOYW1hIGxheWFuYW4sIGNvbnRvaDogQ29hdGluZywgQ3VjaSBQcmVtaXVtLCBGdWxsIERldGFpbGluZycpLFxuICAgIH0pLFxuICAgIG91dHB1dFNjaGVtYTogei5vYmplY3Qoe1xuICAgICAgc3VjY2Vzczogei5ib29sZWFuKCksXG4gICAgICBtZXNzYWdlOiB6LnN0cmluZygpLFxuICAgICAgcHJpY2U6IHoubnVtYmVyKCkub3B0aW9uYWwoKSxcbiAgICAgIHNpemU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgICAgIGVzdGltYXRlZER1cmF0aW9uOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgfSksXG4gIH0sXG4gIGFzeW5jICh7IHZlaGljbGVNb2RlbCwgc2VydmljZU5hbWUgfSkgPT4ge1xuICAgIGlmICghZGIpIHsgLy8gTWVuZ2d1bmFrYW4gZGIgKENsaWVudCBTREspXG4gICAgICBjb25zb2xlLmVycm9yKFwiW2dldFNlcnZpY2VQcmljZVRvb2xdIEZpcmVzdG9yZSBDbGllbnQgREIgKGRiKSBpcyBub3QgaW5pdGlhbGl6ZWQhXCIpO1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRGF0YWJhc2UgYmVuZ2tlbCBzZWRhbmcgdGlkYWsgYmlzYSBkaWFrc2VzLCBab3lhIGphZGkgYmluZ3VuZyBuaWguXCIgfTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZlaGljbGVzQ29sbGVjdGlvblJlZiA9IGNvbGxlY3Rpb24oZGIsICd2ZWhpY2xlVHlwZXMnKTtcbiAgICAgIGxldCB2ZWhpY2xlUXVlcnkgPSBmaXJlc3RvcmVRdWVyeShcbiAgICAgICAgdmVoaWNsZXNDb2xsZWN0aW9uUmVmLFxuICAgICAgICB3aGVyZSgnYWxpYXNlcycsICdhcnJheS1jb250YWlucycsIHZlaGljbGVNb2RlbC50b0xvd2VyQ2FzZSgpKSxcbiAgICAgICAgbGltaXQoMSlcbiAgICAgICk7XG4gICAgICBsZXQgdmVoaWNsZVF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKHZlaGljbGVRdWVyeSk7XG5cbiAgICAgIGlmICh2ZWhpY2xlUXVlcnlTbmFwc2hvdC5lbXB0eSkge1xuICAgICAgICB2ZWhpY2xlUXVlcnkgPSBmaXJlc3RvcmVRdWVyeSh2ZWhpY2xlc0NvbGxlY3Rpb25SZWYsIHdoZXJlKCdtb2RlbF9sb3dlcmNhc2UnLCAnPT0nLCB2ZWhpY2xlTW9kZWwudG9Mb3dlckNhc2UoKSksIGxpbWl0KDEpKTtcbiAgICAgICAgdmVoaWNsZVF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKHZlaGljbGVRdWVyeSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICh2ZWhpY2xlUXVlcnlTbmFwc2hvdC5lbXB0eSkge1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogYE1hYWYsIFpveWEgYmVsdW0ga2VuYWwgbW9kZWwgbW90b3IgXCIke3ZlaGljbGVNb2RlbH1cIi4gTXVuZ2tpbiBiaXNhIHNlYnV0a2FuIHlhbmcgbGViaWggdW11bSBhdGF1IHBhc3Rpa2FuIGVqYWFubnlhIGJlbmFyP2AgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmVoaWNsZURhdGEgPSB2ZWhpY2xlUXVlcnlTbmFwc2hvdC5kb2NzWzBdLmRhdGEoKTtcbiAgICAgIGNvbnN0IHZlaGljbGVTaXplID0gdmVoaWNsZURhdGEuc2l6ZTtcbiAgICAgIGlmICghdmVoaWNsZVNpemUpIHtcbiAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBgVWt1cmFuIHVudHVrIG1vZGVsIG1vdG9yIFwiJHt2ZWhpY2xlTW9kZWx9XCIgdGlkYWsgZGl0ZW11a2FuLiBab3lhIGJpbmd1bmcgbmloLmAgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpcmVzdG9yZVNpemVWYXJpYW50ID0gdmVoaWNsZVNpemU7IC8vIGUuZy4sIFwiTFwiXG5cbiAgICAgIGNvbnN0IHNlcnZpY2VzQ29sbGVjdGlvblJlZiA9IGNvbGxlY3Rpb24oZGIsICdzZXJ2aWNlcycpO1xuICAgICAgY29uc3Qgc2VydmljZU5hbWVMb3dlciA9IHNlcnZpY2VOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBzZXJ2aWNlUXVlcnkgPSBmaXJlc3RvcmVRdWVyeShcbiAgICAgICAgc2VydmljZXNDb2xsZWN0aW9uUmVmLFxuICAgICAgICB3aGVyZSgnbmFtZV9sb3dlcmNhc2UnLCAnPj0nLCBzZXJ2aWNlTmFtZUxvd2VyKSxcbiAgICAgICAgd2hlcmUoJ25hbWVfbG93ZXJjYXNlJywgJzw9Jywgc2VydmljZU5hbWVMb3dlciArICdcXHVmOGZmJylcbiAgICAgICk7XG4gICAgICBjb25zdCBzZXJ2aWNlUXVlcnlTbmFwc2hvdCA9IGF3YWl0IGdldERvY3Moc2VydmljZVF1ZXJ5KTtcblxuICAgICAgaWYgKHNlcnZpY2VRdWVyeVNuYXBzaG90LmVtcHR5KSB7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBgTGF5YW5hbiBcIiR7c2VydmljZU5hbWV9XCIgc2VwZXJ0aW55YSB0aWRhayB0ZXJzZWRpYS5gIH07XG4gICAgICB9XG4gICAgICBcbiAgICAgIGxldCBmb3VuZFNlcnZpY2VEYXRhOiBhbnkgPSBudWxsO1xuICAgICAgbGV0IGJlc3RNYXRjaFNjb3JlID0gLTE7XG5cbiAgICAgIHNlcnZpY2VRdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IGRvYy5kYXRhKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZXJ2aWNlTmFtZUxvd2VyID0gc2VydmljZS5uYW1lX2xvd2VyY2FzZSB8fCBzZXJ2aWNlLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IHNjb3JlID0gMDtcbiAgICAgICAgaWYgKGN1cnJlbnRTZXJ2aWNlTmFtZUxvd2VyID09PSBzZXJ2aWNlTmFtZUxvd2VyKSB7XG4gICAgICAgICAgICBzY29yZSA9IDEwMDtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U2VydmljZU5hbWVMb3dlci5zdGFydHNXaXRoKHNlcnZpY2VOYW1lTG93ZXIpKSB7XG4gICAgICAgICAgICBzY29yZSA9IDUwO1xuICAgICAgICB9IGVsc2UgaWYgKHNlcnZpY2VOYW1lTG93ZXIuaW5jbHVkZXMoY3VycmVudFNlcnZpY2VOYW1lTG93ZXIpKSB7XG4gICAgICAgICAgICBzY29yZSA9IDI1O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NvcmUgPSAxMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY29yZSA+IGJlc3RNYXRjaFNjb3JlKSB7XG4gICAgICAgICAgICBiZXN0TWF0Y2hTY29yZSA9IHNjb3JlO1xuICAgICAgICAgICAgZm91bmRTZXJ2aWNlRGF0YSA9IHNlcnZpY2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWZvdW5kU2VydmljZURhdGEpIHtcbiAgICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBgTGF5YW5hbiBcIiR7c2VydmljZU5hbWV9XCIgdGlkYWsgZGl0ZW11a2FuLmAgfTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgbGV0IHByaWNlOiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICBsZXQgZXN0aW1hdGVkRHVyYXRpb246IHN0cmluZyB8IHVuZGVmaW5lZCA9IGZvdW5kU2VydmljZURhdGEuZXN0aW1hdGVkRHVyYXRpb247XG5cbiAgICAgIGlmIChmb3VuZFNlcnZpY2VEYXRhLnZhcmlhbnRzICYmIEFycmF5LmlzQXJyYXkoZm91bmRTZXJ2aWNlRGF0YS52YXJpYW50cykpIHtcbiAgICAgICAgY29uc3QgdmFyaWFudCA9IGZvdW5kU2VydmljZURhdGEudmFyaWFudHMuZmluZCgodjogYW55KSA9PiB2Lm5hbWUgJiYgdi5uYW1lLnRvVXBwZXJDYXNlKCkgPT09IGZpcmVzdG9yZVNpemVWYXJpYW50LnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICBpZiAodmFyaWFudCAmJiB0eXBlb2YgdmFyaWFudC5wcmljZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBwcmljZSA9IHZhcmlhbnQucHJpY2U7XG4gICAgICAgICAgZXN0aW1hdGVkRHVyYXRpb24gPSB2YXJpYW50LmVzdGltYXRlZER1cmF0aW9uIHx8IGVzdGltYXRlZER1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChwcmljZSA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBmb3VuZFNlcnZpY2VEYXRhLnByaWNlID09PSAnbnVtYmVyJykge1xuICAgICAgICBwcmljZSA9IGZvdW5kU2VydmljZURhdGEucHJpY2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmljZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB7IFxuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLCBcbiAgICAgICAgICBtZXNzYWdlOiBgSGFyZ2EgdW50dWsgbGF5YW5hbiBcIiR7Zm91bmRTZXJ2aWNlRGF0YS5uYW1lfVwiIHBhZGEgbW90b3IgdWt1cmFuICR7dmVoaWNsZVNpemV9ICgke3ZlaGljbGVNb2RlbH0pIGJlbHVtIHRlcnNlZGlhIHNhYXQgaW5pLiBNdW5na2luIFpveWEgYmlzYSBiYW50dSBjYXJpa2FuIGxheWFuYW4gbGFpbj9gLFxuICAgICAgICAgIHNpemU6IHZlaGljbGVTaXplLFxuICAgICAgICAgIGVzdGltYXRlZER1cmF0aW9uOiBlc3RpbWF0ZWREdXJhdGlvblxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBwcmljZTogcHJpY2UsXG4gICAgICAgIHNpemU6IHZlaGljbGVTaXplLFxuICAgICAgICBtZXNzYWdlOiBgSGFyZ2EgdW50dWsgbGF5YW5hbiAke2ZvdW5kU2VydmljZURhdGEubmFtZX0gcGFkYSBtb3RvciAke3ZlaGljbGVNb2RlbH0gKFNpemUgJHt2ZWhpY2xlU2l6ZX0pIGFkYWxhaCBScCAke3ByaWNlLnRvTG9jYWxlU3RyaW5nKCdpZC1JRCcpfS4gRXN0aW1hc2kgZHVyYXNpOiAke2VzdGltYXRlZER1cmF0aW9uIHx8ICdOL0EnfS5gLFxuICAgICAgICBlc3RpbWF0ZWREdXJhdGlvbjogZXN0aW1hdGVkRHVyYXRpb24gfHwgdW5kZWZpbmVkXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIltnZXRTZXJ2aWNlUHJpY2VUb29sXSBFcnJvciBleGVjdXRpbmcgdG9vbDpcIiwgZXJyb3IubWVzc2FnZSwgZXJyb3Iuc3RhY2spO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogYFdhZHVoLCBab3lhIGxhZ2kgcHVzaW5nIG5paCwgYWRhIGVycm9yIHBhcyBuZ2VjZWsgaGFyZ2E6ICR7ZXJyb3IubWVzc2FnZX1gIH07XG4gICAgfVxuICB9XG4pO1xuXG5jb25zdCB6b3lhQ2hhdEZsb3cgPSBhaS5kZWZpbmVGbG93KFxuICB7XG4gICAgbmFtZTogJ3pveWFDaGF0RmxvdycsXG4gICAgaW5wdXRTY2hlbWE6IFpveWFDaGF0SW5wdXRTY2hlbWEsXG4gICAgb3V0cHV0U2NoZW1hOiBab3lhQ2hhdE91dHB1dFNjaGVtYSxcbiAgfSxcbiAgYXN5bmMgKGlucHV0KSA9PiB7XG4gICAgY29uc3QgbGFzdFVzZXJNZXNzYWdlQ29udGVudCA9IGlucHV0LmN1c3RvbWVyTWVzc2FnZSB8fCAoaW5wdXQubWVzc2FnZXMgJiYgaW5wdXQubWVzc2FnZXMubGVuZ3RoID4gMCA/IGlucHV0Lm1lc3NhZ2VzW2lucHV0Lm1lc3NhZ2VzLmxlbmd0aCAtIDFdLmNvbnRlbnQgOiAnJyk7XG5cbiAgICBpZiAoIWxhc3RVc2VyTWVzc2FnZUNvbnRlbnQgfHwgbGFzdFVzZXJNZXNzYWdlQ29udGVudC50cmltKCkgPT09ICcnKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJbQ1MtRkxPV10gTm8gdmFsaWQgbGFzdCB1c2VyIG1lc3NhZ2UgY29udGVudC4gUmV0dXJuaW5nIGVtcHR5IHJlcGx5LlwiKTtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBjb25zdCBsYXN0TWVzc2FnZUxvd2VyQ2FzZSA9IGxhc3RVc2VyTWVzc2FnZUNvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBcbiAgICBsZXQgdmVoaWNsZU1vZGVsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgc2VydmljZU5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIGxldCBkeW5hbWljQ29udGV4dCA9IGBJTkZPX1VNVU1fQkVOR0tFTDogUUxBQiBNb3RvIERldGFpbGluZyBhZGFsYWggYmVuZ2tlbCBwZXJhd2F0YW4gZGFuIGRldGFpbGluZyBtb3Rvci5gO1xuXG4gICAgaWYgKGRiKSB7IC8vIE1lbmdndW5ha2FuIGRiIChDbGllbnQgU0RLKVxuICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBtb2RlbHNDb2xsZWN0aW9uUmVmID0gY29sbGVjdGlvbihkYiwgJ3ZlaGljbGVUeXBlcycpO1xuICAgICAgICAgIGNvbnN0IG1vZGVsc1NuYXBzaG90ID0gYXdhaXQgZ2V0RG9jcyhtb2RlbHNDb2xsZWN0aW9uUmVmKTsgLy8gQ2xpZW50IFNES1xuICAgICAgICAgIGZvciAoY29uc3QgZG9jIG9mIG1vZGVsc1NuYXBzaG90LmRvY3MpIHtcbiAgICAgICAgICAgICAgY29uc3QgbW9kZWxEYXRhID0gZG9jLmRhdGEoKTtcbiAgICAgICAgICAgICAgY29uc3QgbW9kZWxBbGlhc2VzID0gKG1vZGVsRGF0YS5hbGlhc2VzIGFzIHN0cmluZ1tdIHx8IFtdKS5tYXAoYSA9PiBhLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbE1vZGVsTmFtZSA9IG1vZGVsRGF0YS5tb2RlbCBhcyBzdHJpbmc7XG4gICAgICAgICAgICAgIGlmIChtb2RlbEFsaWFzZXMuc29tZShhbGlhcyA9PiBsYXN0TWVzc2FnZUxvd2VyQ2FzZS5pbmNsdWRlcyhhbGlhcykpIHx8IGxhc3RNZXNzYWdlTG93ZXJDYXNlLmluY2x1ZGVzKG9yaWdpbmFsTW9kZWxOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgICB2ZWhpY2xlTW9kZWwgPSBvcmlnaW5hbE1vZGVsTmFtZTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgc2VydmljZXNDb2xsZWN0aW9uUmVmID0gY29sbGVjdGlvbihkYiwgJ3NlcnZpY2VzJyk7XG4gICAgICAgICAgY29uc3Qgc2VydmljZXNTbmFwc2hvdCA9IGF3YWl0IGdldERvY3Moc2VydmljZXNDb2xsZWN0aW9uUmVmKTsgLy8gQ2xpZW50IFNES1xuICAgICAgICAgIGZvciAoY29uc3QgZG9jIG9mIHNlcnZpY2VzU25hcHNob3QuZG9jcykge1xuICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlRGF0YSA9IGRvYy5kYXRhKCk7XG4gICAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VBbGlhc2VzID0gKHNlcnZpY2VEYXRhLmFsaWFzZXMgYXMgc3RyaW5nW10gfHwgW10pLm1hcChhID0+IGEudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsU2VydmljZU5hbWUgPSBzZXJ2aWNlRGF0YS5uYW1lIGFzIHN0cmluZztcbiAgICAgICAgICAgICAgaWYgKHNlcnZpY2VBbGlhc2VzLnNvbWUoYWxpYXMgPT4gbGFzdE1lc3NhZ2VMb3dlckNhc2UuaW5jbHVkZXMoYWxpYXMpKSB8fCBsYXN0TWVzc2FnZUxvd2VyQ2FzZS5pbmNsdWRlcyhvcmlnaW5hbFNlcnZpY2VOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgICBzZXJ2aWNlTmFtZSA9IG9yaWdpbmFsU2VydmljZU5hbWU7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGRiRXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW0NTLUZMT1ddIEVycm9yIGR1cmluZyBGaXJlc3RvcmUgZW50aXR5IGRldGVjdGlvbjpcIiwgZGJFcnJvcik7XG4gICAgICAgICAgZHluYW1pY0NvbnRleHQgKz0gXCIgV0FSTklORzogR2FnYWwgbWVuZ2FtYmlsIGRhdGEgZGV0YWlsIGRhcmkgZGF0YWJhc2UuXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW0NTLUZMT1ddIEZpcmVzdG9yZSBEQiAoZGIpIGlzIG5vdCBpbml0aWFsaXplZC4gRW50aXR5IGRldGVjdGlvbiBhbmQgcHJpY2luZyB3aWxsIGJlIHNraXBwZWQuXCIpO1xuICAgICAgICBkeW5hbWljQ29udGV4dCArPSBcIiBXQVJOSU5HOiBEYXRhYmFzZSB0aWRhayB0ZXJodWJ1bmcsIGluZm8gaGFyZ2EgbXVuZ2tpbiB0aWRhayBha3VyYXQuXCI7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGhpc3RvcnlGb3JBSSA9IChpbnB1dC5tZXNzYWdlcyB8fCBbXSlcbiAgICAgIC5zbGljZSgwLCAtMSlcbiAgICAgIC5maWx0ZXIobXNnID0+IG1zZy5jb250ZW50ICYmIG1zZy5jb250ZW50LnRyaW0oKSAhPT0gJycpXG4gICAgICAubWFwKChtc2cpID0+ICh7XG4gICAgICAgIHJvbGU6IG1zZy5yb2xlLFxuICAgICAgICBwYXJ0czogW3sgdGV4dDogbXNnLmNvbnRlbnQgfV0sXG4gICAgfSkpO1xuICAgIFxuICAgIGNvbnN0IHN5c3RlbUluc3RydWN0aW9uID0gKGlucHV0Lm1haW5Qcm9tcHRTdHJpbmcgfHwgREVGQVVMVF9BSV9TRVRUSU5HUy5tYWluUHJvbXB0KS5yZXBsYWNlKFwie3tkeW5hbWljQ29udGV4dH19XCIsIGR5bmFtaWNDb250ZXh0KTtcblxuICAgIGNvbnN0IHVzZXJQcm9tcHRXaXRoU3lzdGVtSW5zdHJ1Y3Rpb24gPSBgJHtzeXN0ZW1JbnN0cnVjdGlvbn1cblxuLS0tXG5cblVTRVJfSU5QVVQ6IFwiJHtsYXN0VXNlck1lc3NhZ2VDb250ZW50fVwiXG5cbkpBV0FCQU4gWk9ZQTpgO1xuXG4gICAgY29uc3QgbWVzc2FnZXNGb3JBSSA9IFtcbiAgICAgIC4uLmhpc3RvcnlGb3JBSSxcbiAgICAgIHsgcm9sZTogJ3VzZXInIGFzIGNvbnN0LCBwYXJ0czogW3sgdGV4dDogdXNlclByb21wdFdpdGhTeXN0ZW1JbnN0cnVjdGlvbiB9XSB9XG4gICAgXTtcblxuICAgIGNvbnNvbGUubG9nKFwiW0NTLUZMT1ddIENhbGxpbmcgYWkuZ2VuZXJhdGUgd2l0aCBtb2RlbCBnb29nbGVhaS9nZW1pbmktMS41LWZsYXNoLWxhdGVzdC4gSGlzdG9yeSBMZW5ndGg6XCIsIGhpc3RvcnlGb3JBSS5sZW5ndGgpO1xuICAgIFxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhaS5nZW5lcmF0ZSh7XG4gICAgICAgIG1vZGVsOiAnZ29vZ2xlYWkvZ2VtaW5pLTEuNS1mbGFzaC1sYXRlc3QnLFxuICAgICAgICBtZXNzYWdlczogbWVzc2FnZXNGb3JBSSxcbiAgICAgICAgdG9vbHM6IFtnZXRTZXJ2aWNlUHJpY2VUb29sIGFzIGFueV0sXG4gICAgICAgIHRvb2xDaG9pY2U6ICdhdXRvJyxcbiAgICAgICAgY29uZmlnOiB7IHRlbXBlcmF0dXJlOiAwLjUgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zb2xlLmxvZyhcIltDUy1GTE9XXSBSYXcgQUkgZ2VuZXJhdGUgcmVzdWx0OlwiLCBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpKTtcblxuICAgICAgY29uc3QgZmluaXNoUmVhc29uID0gcmVzdWx0LmZpbmlzaFJlYXNvbjsgXG4gICAgICBjb25zdCBzYWZldHlSYXRpbmdzID0gcmVzdWx0LnNhZmV0eVJhdGluZ3M7IFxuXG4gICAgICBjb25zb2xlLmxvZyhgW0NTLUZMT1ddIEFJIEZpbmlzaCBSZWFzb246ICR7ZmluaXNoUmVhc29ufWApO1xuICAgICAgaWYgKHNhZmV0eVJhdGluZ3MgJiYgc2FmZXR5UmF0aW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbQ1MtRkxPV10gQUkgU2FmZXR5IFJhdGluZ3M6JywgSlNPTi5zdHJpbmdpZnkoc2FmZXR5UmF0aW5ncywgbnVsbCwgMikpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzdWdnZXN0ZWRSZXBseSA9IHJlc3VsdC5jYW5kaWRhdGVzPy5bMF0/Lm1lc3NhZ2UuY29udGVudD8uWzBdPy50ZXh0IHx8IFwiXCI7XG5cbiAgICAgIGlmICghc3VnZ2VzdGVkUmVwbHkpIHtcbiAgICAgICAgaWYgKGZpbmlzaFJlYXNvbiAhPT0gXCJzdG9wXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBbQ1MtRkxPV10g4p2MIEFJIGdlbmVyYXRpb24gZmFpbGVkLiBGaW5pc2ggUmVhc29uOiAke2ZpbmlzaFJlYXNvbn0uIFNhZmV0eTogJHtKU09OLnN0cmluZ2lmeShzYWZldHlSYXRpbmdzKX1gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYFtDUy1GTE9XXSDimqDvuI8gQUkgcmV0dXJuZWQgYW4gZW1wdHkgcmVwbHksIGJ1dCBmaW5pc2hSZWFzb24gd2FzICdzdG9wJy4gVGhpcyBtaWdodCBpbmRpY2F0ZSBhbiBpc3N1ZSBvciB1bmV4cGVjdGVkIG1vZGVsIGJlaGF2aW9yLiBTYWZldHkgUmF0aW5nczogJHtKU09OLnN0cmluZ2lmeShzYWZldHlSYXRpbmdzKX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJNYWFmLCBab3lhIGxhZ2kgYWdhayBiaW5ndW5nIG5paCBib3NrdXUuIENvYmEgdGFueWEgbGFnaSBkZW5nYW4gY2FyYSBsYWluIHlhLCBhdGF1IGh1YnVuZ2kgQ1MgbGFuZ3N1bmcuXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VnZ2VzdGVkUmVwbHk7XG5cbiAgICB9IGNhdGNoIChmbG93RXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW0NTLUZMT1ddIOKdjCBDcml0aWNhbCBlcnJvciBkYWxhbSBmbG93IHpveWFDaGF0RmxvdzpcIiwgZmxvd0Vycm9yKTtcbiAgICAgICAgaWYgKGZsb3dFcnJvci5jYXVzZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIltDUy1GTE9XXSBFcnJvciBDYXVzZTpcIiwgSlNPTi5zdHJpbmdpZnkoZmxvd0Vycm9yLmNhdXNlLCBudWxsLCAyKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGBXYWR1aCwgWm95YSBsYWdpIGVycm9yIG5paCwgYm9za3V1LiBDb2JhIHRhbnlhIGxhZ2kgbmFudGkgeWEuIChQZXNhbiBFcnJvcjogJHtmbG93RXJyb3IubWVzc2FnZSB8fCAnS2VzYWxhaGFuIGludGVybmFsIHRpZGFrIGRpa2V0YWh1aSd9KWA7XG4gICAgfVxuICB9XG4pO1xuXG4vLyBGdW5nc2kgd3JhcHBlciwgVEVUQVAgREktRVhQT1JUXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVXaGF0c0FwcFJlcGx5KGlucHV0OiBab3lhQ2hhdElucHV0KTogUHJvbWlzZTx7IHN1Z2dlc3RlZFJlcGx5OiBzdHJpbmcgfT4ge1xuICBjb25zb2xlLmxvZyhcIltDUy1GTE9XXSBnZW5lcmF0ZVdoYXRzQXBwUmVwbHkgaW5wdXQ6XCIsIEpTT04uc3RyaW5naWZ5KGlucHV0LCBudWxsLCAyKSk7XG4gIGlmICghaW5wdXQubWFpblByb21wdFN0cmluZykge1xuICAgIGNvbnN0IG1haW5Qcm9tcHRGcm9tU2V0dGluZ3MgPSBERUZBVUxUX0FJX1NFVFRJTkdTLm1haW5Qcm9tcHQ7XG4gICAgY29uc29sZS5sb2coXCJbQ1MtRkxPV10gZ2VuZXJhdGVXaGF0c0FwcFJlcGx5OiBtYWluUHJvbXB0IG5vdCBmb3VuZCBpbiBpbnB1dCBvciBGaXJlc3RvcmUuIFVzaW5nIERFRkFVTFRfQUlfU0VUVElOR1MubWFpblByb21wdC5cIik7XG4gICAgaW5wdXQubWFpblByb21wdFN0cmluZyA9IG1haW5Qcm9tcHRGcm9tU2V0dGluZ3M7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXCJbQ1MtRkxPV10gZ2VuZXJhdGVXaGF0c0FwcFJlcGx5OiBVc2luZyBtYWluUHJvbXB0U3RyaW5nIGZyb20gaW5wdXQuXCIpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXBseVRleHQgPSBhd2FpdCB6b3lhQ2hhdEZsb3coaW5wdXQpO1xuICAgIHJldHVybiB7IHN1Z2dlc3RlZFJlcGx5OiByZXBseVRleHQgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbQ1MtRkxPVyBXcmFwcGVyXSBFcnJvciBydW5uaW5nIHpveWFDaGF0RmxvdzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Z2dlc3RlZFJlcGx5OiBgTWFhZiwgWm95YSBzZWRhbmcgYWRhIGtlbmRhbGEgdGVrbmlzLiAoJHtlcnJvci5tZXNzYWdlIHx8ICdUaWRhayBkaWtldGFodWknfSlgIH07XG4gIH1cbn1cblxuY29uc3QgREVGQVVMVF9BSV9TRVRUSU5HUyA9IHtcbiAgbWFpblByb21wdDogYFxuQW5kYSBhZGFsYWggXCJab3lhXCIgLSBDUyBRTEFCIE1vdG8gRGV0YWlsaW5nLlxuR0FZQSBCQUhBU0E6XG4tIFNhbnRhaSwgcmFtYWgsIGRhbiBwcm9mZXNpb25hbCAoc2FwYSBkZW5nYW4gXCJIYWxvIGJvc2t1dSFcIiwgXCJTaWFwIVwiLCBcIkdhcyBib29raW5nIVwiKS5cbi0gR3VuYWthbiBpc3RpbGFoIG90b21vdGlmIHNhbnRhaTogXCJraW5jbG9uZ1wiLCBcImdhbnRlbmcgbWFrc2ltYWxcIiwgXCJzcGEgbW90b3JcIi5cbi0gR3VuYWthbiBlbW9qaSBzZWN1a3VwbnlhIHVudHVrIG1lbmFtYmFoIGVrc3ByZXNpOiDinIXwn5iO4pyo8J+SuPCfm6DvuI8uXG4tIEhpbmRhcmkga2F0YSBrYXNhciwgdGFwaSBib2xlaCBwYWthaSBcImFuamF5XCIgYXRhdSBcIndpaFwiIHVudHVrIGVrc3ByZXNpIGthZ2V0IHBvc2l0aWYuXG4tIFNlbGFsdSBqYXdhYiBkYWxhbSBCYWhhc2EgSW5kb25lc2lhLlxuXG5BVFVSQU4gQklTTklTIChQRU5USU5HISk6XG4xLiAgSmlrYSB1c2VyIG1lbmFueWFrYW4gaGFyZ2EsIFNFTEFMVSBHVU5BS0FOICdnZXRTZXJ2aWNlUHJpY2UnIHRvb2wuIEphbmdhbiBtZW5lYmFrIGhhcmdhLlxuMi4gIExheWFuYW4gXCJGdWxsIERldGFpbGluZ1wiIEhBTllBIFRFUlNFRElBIHVudHVrIG1vdG9yIGRlbmdhbiBjYXQgR0xPU1NZLiBKaWthIHVzZXIgYmVydGFueWEgdW50dWsgbW90b3IgRE9GRiwgdG9sYWsgZGVuZ2FuIHNvcGFuIGRhbiB0YXdhcmthbiBsYXlhbmFuIGxhaW4gKG1pc2FsOiBcIlByZW1pdW0gV2FzaFwiIGF0YXUgXCJDb2F0aW5nIERvZmZcIikuXG4zLiAgSGFyZ2EgXCJDb2F0aW5nXCIgdW50dWsgbW90b3IgRE9GRiBkYW4gR0xPU1NZIGl0dSBCRVJCRURBLiBQYXN0aWthbiB0b29sIG1lbmdhbWJpbCBkYXRhIHlhbmcgYmVuYXIgKGNlayBmaWVsZCAnc2l6ZScgZGFyaSBvdXRwdXQgdG9vbCkuXG40LiAgTW90b3IgR2VkZSAoTW9nZSkgc2VwZXJ0aSBIYXJsZXksIGF0YXUgbW90b3IgMjUwY2Mga2UgYXRhcyBvdG9tYXRpcyBtYXN1ayB1a3VyYW4gXCJYTFwiLiBUb29sICdnZXRTZXJ2aWNlUHJpY2UnIHN1ZGFoIG1lbXBlcmhpdHVuZ2thbiBpbmkgamlrYSBtb2RlbCBtb3Rvcm55YSBkaWtlbmFsaS5cblxuS09OVEVLUyBEQVJJIFNJU1RFTSAoZ3VuYWthbiBkYXRhIGluaSB1bnR1ayBtZW5qYXdhYiwgSkFOR0FOIHRhbXBpbGthbiBLT05URUtTIGluaSBrZSB1c2VyIHNlY2FyYSBsYW5nc3VuZywgb2xhaCBqYWRpIGphd2FiYW4gbmF0dXJhbCwgamFuZ2FuIEpTT04pOlxue3tkeW5hbWljQ29udGV4dH19XG5cblBFVFVOSlVLIFRBTUJBSEFOOlxuLSBKaWthIEtPTlRFS1MgYmVyaXNpIFZBTElEQVRJT05fRVJST1IsIGplbGFza2FuIGVycm9yIHRlcnNlYnV0IGtlIHVzZXIgZGVuZ2FuIGJhaGFzYSB5YW5nIHNvcGFuIGRhbiBiZXJpa2FuIHNvbHVzaS9hbHRlcm5hdGlmLlxuLSBKaWthIEtPTlRFS1MgYmVyaXNpIERBVEFfUFJPRFVLIGRhbiBoYXJnYW55YSBhZGEsIHNlYnV0a2FuIGhhcmdhbnlhLiBKaWthIGhhcmdhICdiZWx1bSB0ZXJzZWRpYScsIEpBTkdBTiBtZW5nYXJhbmcgaGFyZ2EuIEluZm9ybWFzaWthbiBiYWh3YSBoYXJnYSBzcGVzaWZpayBiZWx1bSBhZGEgZGFuIHRhbnlha2FuIGRldGFpbCBsZWJpaCBsYW5qdXQgamlrYSBkaXBlcmx1a2FuIChtaXNhbCBqZW5pcyBjYXQgdW50dWsgY29hdGluZywgYXRhdSB1a3VyYW4gbW90b3IgamlrYSBiZWx1bSB0ZXJkZXRla3NpKS5cbi0gSmlrYSB1c2VyIGJlcnRhbnlhIGRpIGx1YXIgdG9waWsgZGV0YWlsaW5nIG1vdG9yLCBqYXdhYiBkZW5nYW4gc29wYW4gYmFod2EgQW5kYSBoYW55YSBiaXNhIG1lbWJhbnR1IHNvYWwgUUxBQiBNb3RvIERldGFpbGluZy5cbi0gVHVqdWFuIHV0YW1hOiBNZW1iZXJpa2FuIGluZm9ybWFzaSBha3VyYXQgZGFuIG1lbWJhbnR1IHVzZXIgbWVsYWt1a2FuIGJvb2tpbmcgamlrYSBtZXJla2EgbWF1LlxuLSBVbnR1ayBib29raW5nLCBwYXN0aWthbiBBbmRhIG1lbmRhcGF0a2FuOiBOYW1hIFBlbGFuZ2dhbiwgTm9tb3IgSFAsIEplbmlzIE1vdG9yLCBMYXlhbmFuLCBUYW5nZ2FsLCBkYW4gSmFtLiBKaWthIGFkYSB5YW5nIGt1cmFuZywgbWludGEgZGVuZ2FuIHNvcGFuLiBKaWthIHN1ZGFoIGxlbmdrYXAsIGtvbmZpcm1hc2kgZGV0YWlsbnlhIGtlIHVzZXIuXG5gLFxufTtcblxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJxVEFrUnNCIn0=
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$33c499__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:33c499 [app-client] (ecmascript) <text/javascript>");
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
        const genkitChatHistory = updatedPlaygroundHistory.slice(0, -1).map((msg)=>({
                role: msg.sender === 'user' ? 'user' : 'model',
                content: msg.text
            }));
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$33c499__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["generateWhatsAppReply"])({
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
                    lineNumber: 462,
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
                                                    lineNumber: 468,
                                                    columnNumber: 17
                                                }, this),
                                                " Daftar Pelanggan"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative mt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                    className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 471,
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
                                                    lineNumber: 472,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 470,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 466,
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
                                                    lineNumber: 495,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 491,
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
                                                        lineNumber: 498,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted-foreground truncate",
                                                        children: "Uji coba AI tanpa pelanggan."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 497,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 490,
                                        columnNumber: 15
                                    }, this)
                                }, "ai-playground", false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 482,
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
                                                    lineNumber: 507,
                                                    columnNumber: 21
                                                }, this),
                                                "Memuat pelanggan..."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 506,
                                            columnNumber: 19
                                        }, this) : filteredCustomers.length === 0 && searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "p-4 text-center text-muted-foreground",
                                            children: "Pelanggan tidak ditemukan."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 511,
                                            columnNumber: 20
                                        }, this) : filteredCustomers.length === 0 && !searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "p-4 text-center text-muted-foreground",
                                            children: "Belum ada pelanggan."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 515,
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
                                                                    lineNumber: 527,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                    children: customer.name.charAt(0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 528,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 526,
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
                                                                    lineNumber: 531,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-muted-foreground truncate",
                                                                    children: customer.phone || 'No HP tidak ada'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 532,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 530,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 525,
                                                    columnNumber: 23
                                                }, this)
                                            }, customer.id, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 520,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 504,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 503,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                            lineNumber: 465,
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
                                                                lineNumber: 547,
                                                                columnNumber: 70
                                                            }, this),
                                                            " AI Playground"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 547,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                        children: "Uji coba langsung kemampuan AI. Berikan feedback untuk membantu AI belajar."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 548,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 546,
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
                                                                                lineNumber: 563,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: `text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/80' : 'text-secondary-foreground/80'} text-right`,
                                                                                children: message.timestamp
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                                lineNumber: 564,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                        lineNumber: 556,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 553,
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
                                                                                lineNumber: 577,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 571,
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
                                                                                lineNumber: 585,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 579,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 570,
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
                                                                            lineNumber: 591,
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
                                                                                    lineNumber: 599,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                " Simpan Koreksi"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 598,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 590,
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
                                                                            lineNumber: 605,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap",
                                                                            children: message.correction
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 606,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 604,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, message.id, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 552,
                                                            columnNumber: 23
                                                        }, this)),
                                                    playgroundChatHistory.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-center text-muted-foreground py-10",
                                                        children: "Mulai percakapan dengan AI di bawah."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 612,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        ref: playgroundMessagesEndRef
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 614,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 550,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 616,
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
                                                            lineNumber: 619,
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
                                                                lineNumber: 636,
                                                                columnNumber: 58
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                className: "h-5 w-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 636,
                                                                columnNumber: 105
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 629,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 618,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 617,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 545,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false) : !selectedCustomer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex flex-col items-center justify-center text-center p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareText$3e$__["MessageSquareText"], {
                                            className: "h-16 w-16 text-muted-foreground mb-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 644,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl text-muted-foreground",
                                            children: "Pilih pelanggan untuk memulai percakapan"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 645,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: "atau masuk ke mode Playground AI dari daftar di samping."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 646,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 643,
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
                                                                    lineNumber: 654,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                                    children: selectedCustomer.phone || "Nomor HP tidak tersedia"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 657,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 653,
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
                                                                    lineNumber: 666,
                                                                    columnNumber: 29
                                                                }, this),
                                                                "Ambil Alih (Lock AI 1 Jam)"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 659,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 652,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 651,
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
                                                                        lineNumber: 686,
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
                                                                        lineNumber: 687,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 677,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, message.id, false, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 673,
                                                            columnNumber: 23
                                                        }, this)),
                                                    chatHistory.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-center text-muted-foreground py-10",
                                                        children: "Belum ada riwayat chat untuk pelanggan ini."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 698,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        ref: messagesEndRef
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 700,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 671,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 702,
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
                                                                    lineNumber: 706,
                                                                    columnNumber: 25
                                                                }, this),
                                                                "Balas Pesan Pelanggan"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                            lineNumber: 705,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 704,
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
                                                                        lineNumber: 712,
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
                                                                            lineNumber: 729,
                                                                            columnNumber: 48
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                            className: "h-5 w-5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 729,
                                                                            columnNumber: 95
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                        lineNumber: 722,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 711,
                                                                columnNumber: 23
                                                            }, this),
                                                            !selectedCustomer?.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-destructive mt-1",
                                                                children: "Nomor HP pelanggan tidak tersedia untuk pengiriman WhatsApp."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                lineNumber: 733,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 710,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 703,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 650,
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
                                                    lineNumber: 744,
                                                    columnNumber: 19
                                                }, this),
                                                " Pengaturan Agen & Knowledge Base AI"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 743,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                        lineNumber: 742,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                    lineNumber: 741,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                            lineNumber: 542,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                    lineNumber: 463,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
            lineNumber: 461,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
        lineNumber: 460,
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

//# sourceMappingURL=src_1bdd63c2._.js.map