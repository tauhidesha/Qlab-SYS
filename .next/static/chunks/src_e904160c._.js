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
"[project]/src/ai/flows/data:26be3b [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"4053660f6447b38038e1d20965a3df3cd57a2a7b51":"generateWhatsAppReply"},"src/ai/flows/cs-whatsapp-reply-flow.ts",""] */ __turbopack_context__.s({
    "generateWhatsAppReply": (()=>generateWhatsAppReply)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var generateWhatsAppReply = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("4053660f6447b38038e1d20965a3df3cd57a2a7b51", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "generateWhatsAppReply"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY3Mtd2hhdHNhcHAtcmVwbHktZmxvdy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuLy8gaW1wb3J0IHsgYWRtaW5EYiB9IGZyb20gJ0AvbGliL2ZpcmViYXNlLWFkbWluJzsgLy8gTWVuZ2d1bmFrYW4gRmlyZXN0b3JlIEFkbWluIFNES1xuaW1wb3J0IHsgZGIgfSBmcm9tICdAL2xpYi9maXJlYmFzZSc7IC8vIE1lbmdndW5ha2FuIEZpcmVzdG9yZSBDbGllbnQgU0RLXG5pbXBvcnQgeyBjb2xsZWN0aW9uLCBxdWVyeSBhcyBmaXJlc3RvcmVRdWVyeSwgd2hlcmUsIGxpbWl0LCBnZXREb2NzLCBUaW1lc3RhbXAgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnOyAvLyBJbXBvcnQgZnVuZ3NpIENsaWVudCBTREtcblxuLy8gaW1wb3J0IHsgY29uZmlndXJlR2Vua2l0IH0gZnJvbSAnQGdlbmtpdC1haS9jb3JlJzsgLy8gY29uZmlndXJlR2Vua2l0IHNlYmFpa255YSBkaSBmaWxlIGdlbmtpdC50cyB1dGFtYVxuaW1wb3J0IHsgYWkgfSBmcm9tICdAL2FpL2dlbmtpdCc7IC8vIE1lbmdndW5ha2FuIG9iamVrICdhaScgZ2xvYmFsIGRhcmkgZ2Vua2l0LnRzXG4vLyBpbXBvcnQgeyBkZWZpbmVGbG93IH0gZnJvbSAnZ2Vua2l0JzsgLy8gZGVmaW5lRmxvdyBzZWthcmFuZyBkYXJpICdhaS5kZWZpbmVGbG93J1xuLy8gaW1wb3J0IHsgZ29vZ2xlQUkgfSBmcm9tICdAZ2Vua2l0LWFpL2dvb2dsZWFpJzsgLy8gVGlkYWsgcGVybHUgamlrYSAnYWknIHN1ZGFoIGRpa29uZmlndXJhc2lcbi8vIGltcG9ydCB7IGRlZmluZVRvb2wsIHR5cGUgVG9vbCB9IGZyb20gJ2dlbmtpdCc7IC8vIGRlZmluZVRvb2wgc2VrYXJhbmcgZGFyaSAnYWkuZGVmaW5lVG9vbCdcbmltcG9ydCAqIGFzIHogZnJvbSAnem9kJztcbmltcG9ydCB0eXBlIHsgQ2hhdE1lc3NhZ2UgYXMgQ2hhdE1lc3NhZ2VUeXBlRnJvbUltcG9ydCB9IGZyb20gJ0AvdHlwZXMvYWkvY3Mtd2hhdHNhcHAtcmVwbHknOyAvLyBJbXBvcnQgdGlwZSBDaGF0TWVzc2FnZVxuXG4vLyBTa2VtYSBab2QgdW50dWsgaW5wdXQsIFRJREFLIERJLUVYUE9SVFxuLy8gSW5pIGFkYWxhaCBza2VtYSB1bnR1ayBpbnB1dCBZQU5HIERJVEVSSU1BIG9sZWggZnVuZ3NpIHdyYXBwZXIgZ2VuZXJhdGVXaGF0c0FwcFJlcGx5XG5jb25zdCBab3lhQ2hhdElucHV0U2NoZW1hID0gei5vYmplY3Qoe1xuICBtZXNzYWdlczogei5hcnJheSggLy8gSW5pIGFkYWxhaCBoaXN0b3J5IGNoYXQgeWFuZyBtdW5na2luIGRpa2lyaW0gZGFyaSBVSVxuICAgIHoub2JqZWN0KHtcbiAgICAgIHJvbGU6IHouZW51bShbJ3VzZXInLCAnbW9kZWwnXSksXG4gICAgICBjb250ZW50OiB6LnN0cmluZygpLFxuICAgIH0pXG4gICkub3B0aW9uYWwoKSxcbiAgY3VzdG9tZXJNZXNzYWdlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksIC8vIFBlc2FuIHRlcmFraGlyIHBlbGFuZ2dhbiwgYmlzYSB1bmRlZmluZWQgamlrYSBzdWRhaCBhZGEgZGkgYWtoaXIgbWVzc2FnZXNcbiAgc2VuZGVyTnVtYmVyOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIGFnZW50QmVoYXZpb3I6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAga25vd2xlZGdlQmFzZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBjdXJyZW50RGF0ZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBjdXJyZW50VGltZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICB0b21vcnJvd0RhdGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgZGF5QWZ0ZXJUb21vcnJvd0RhdGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgbWFpblByb21wdFN0cmluZzogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxufSk7XG5leHBvcnQgdHlwZSBab3lhQ2hhdElucHV0ID0gei5pbmZlcjx0eXBlb2YgWm95YUNoYXRJbnB1dFNjaGVtYT47XG5cbi8vIFNrZW1hIFpvZCB1bnR1ayBvdXRwdXQsIFRJREFLIERJLUVYUE9SVFxuY29uc3QgWm95YUNoYXRPdXRwdXRTY2hlbWEgPSB6LnN0cmluZygpO1xuXG5cbmNvbnN0IGdldFNlcnZpY2VQcmljZVRvb2wgPSBhaS5kZWZpbmVUb29sKFxuICB7XG4gICAgbmFtZTogJ2dldFNlcnZpY2VQcmljZScsXG4gICAgZGVzY3JpcHRpb246ICdEYXBhdGthbiBoYXJnYSB1bnR1ayBsYXlhbmFuIHNwZXNpZmlrIHBhZGEgbW9kZWwgbW90b3IgdGVydGVudHUuIEd1bmFrYW4gdG9vbCBpbmkgamlrYSB1c2VyIG1lbmFueWFrYW4gaGFyZ2EuJyxcbiAgICBpbnB1dFNjaGVtYTogei5vYmplY3Qoe1xuICAgICAgdmVoaWNsZU1vZGVsOiB6LnN0cmluZygpLmRlc2NyaWJlKCdNb2RlbCBtb3RvciwgY29udG9oOiBOTUFYLCBQQ1gsIFZhcmlvJyksXG4gICAgICBzZXJ2aWNlTmFtZTogei5zdHJpbmcoKS5kZXNjcmliZSgnTmFtYSBsYXlhbmFuLCBjb250b2g6IENvYXRpbmcsIEN1Y2kgUHJlbWl1bSwgRnVsbCBEZXRhaWxpbmcnKSxcbiAgICB9KSxcbiAgICBvdXRwdXRTY2hlbWE6IHoub2JqZWN0KHtcbiAgICAgIHN1Y2Nlc3M6IHouYm9vbGVhbigpLFxuICAgICAgbWVzc2FnZTogei5zdHJpbmcoKSxcbiAgICAgIHByaWNlOiB6Lm51bWJlcigpLm9wdGlvbmFsKCksXG4gICAgICBzaXplOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gICAgICBlc3RpbWF0ZWREdXJhdGlvbjogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICAgIH0pLFxuICB9LFxuICBhc3luYyAoeyB2ZWhpY2xlTW9kZWwsIHNlcnZpY2VOYW1lIH0pID0+IHtcbiAgICBpZiAoIWRiKSB7IC8vIE1lbmdndW5ha2FuIGRiIChDbGllbnQgU0RLKVxuICAgICAgY29uc29sZS5lcnJvcihcIltnZXRTZXJ2aWNlUHJpY2VUb29sXSBGaXJlc3RvcmUgQ2xpZW50IERCIChkYikgaXMgbm90IGluaXRpYWxpemVkIVwiKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIkRhdGFiYXNlIGJlbmdrZWwgc2VkYW5nIHRpZGFrIGJpc2EgZGlha3NlcywgWm95YSBqYWRpIGJpbmd1bmcgbmloLlwiIH07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAxLiBDYXJpIHVrdXJhbiBrZW5kYXJhYW4gZGFyaSBtb2RlbG55YVxuICAgICAgY29uc3QgdmVoaWNsZXNDb2xsZWN0aW9uUmVmID0gY29sbGVjdGlvbihkYiwgJ3ZlaGljbGVUeXBlcycpO1xuICAgICAgXG4gICAgICAvLyBDb2JhIGNhcmkgYmVyZGFzYXJrYW4gYWxpYXNlcyBkdWx1IChsZWJpaCBmbGVrc2liZWwpXG4gICAgICBsZXQgdmVoaWNsZVF1ZXJ5ID0gZmlyZXN0b3JlUXVlcnkoXG4gICAgICAgIHZlaGljbGVzQ29sbGVjdGlvblJlZixcbiAgICAgICAgd2hlcmUoJ2FsaWFzZXMnLCAnYXJyYXktY29udGFpbnMnLCB2ZWhpY2xlTW9kZWwudG9Mb3dlckNhc2UoKSksXG4gICAgICAgIGxpbWl0KDEpXG4gICAgICApO1xuICAgICAgbGV0IHZlaGljbGVRdWVyeVNuYXBzaG90ID0gYXdhaXQgZ2V0RG9jcyh2ZWhpY2xlUXVlcnkpO1xuXG4gICAgICBpZiAodmVoaWNsZVF1ZXJ5U25hcHNob3QuZW1wdHkpIHtcbiAgICAgICAgLy8gRmFsbGJhY2s6IGNvYmEgY2FyaSBiZXJkYXNhcmthbiBmaWVsZCAnbW9kZWxfbG93ZXJjYXNlJyAoamlrYSBtb2RlbF9sb3dlcmNhc2UgYmVsdW0gYWRhL3RpZGFrIGNvY29rKVxuICAgICAgICAvLyBhdGF1IGppa2EgJ2FsaWFzZXMnIHRpZGFrIG1lbmdhbmR1bmcgbmFtYSBtb2RlbCB5YW5nIHBlcnNpc1xuICAgICAgICBjb25zb2xlLmxvZyhgW2dldFNlcnZpY2VQcmljZVRvb2xdIE5vIGV4YWN0IG1hdGNoIGZvciAnJHt2ZWhpY2xlTW9kZWwudG9Mb3dlckNhc2UoKX0nIGluIGFsaWFzZXMuIFRyeWluZyAnbW9kZWxfbG93ZXJjYXNlJy4uLmApO1xuICAgICAgICBjb25zdCBtb2RlbExvd2VyUXVlcnkgPSBmaXJlc3RvcmVRdWVyeSh2ZWhpY2xlc0NvbGxlY3Rpb25SZWYsIHdoZXJlKCdtb2RlbF9sb3dlcmNhc2UnLCAnPT0nLCB2ZWhpY2xlTW9kZWwudG9Mb3dlckNhc2UoKSksIGxpbWl0KDEpKTtcbiAgICAgICAgdmVoaWNsZVF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKG1vZGVsTG93ZXJRdWVyeSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICh2ZWhpY2xlUXVlcnlTbmFwc2hvdC5lbXB0eSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgW2dldFNlcnZpY2VQcmljZVRvb2xdIFZlaGljbGUgbW9kZWwgJyR7dmVoaWNsZU1vZGVsfScgbm90IGZvdW5kLmApO1xuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogYE1hYWYsIFpveWEgYmVsdW0ga2VuYWwgbW9kZWwgbW90b3IgXCIke3ZlaGljbGVNb2RlbH1cIi4gTXVuZ2tpbiBiaXNhIHNlYnV0a2FuIHlhbmcgbGViaWggdW11bSBhdGF1IHBhc3Rpa2FuIGVqYWFubnlhIGJlbmFyP2AgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmVoaWNsZURhdGEgPSB2ZWhpY2xlUXVlcnlTbmFwc2hvdC5kb2NzWzBdLmRhdGEoKTtcbiAgICAgIGNvbnN0IHZlaGljbGVTaXplID0gdmVoaWNsZURhdGEuc2l6ZTsgLy8gZS5nLiwgXCJMXCJcbiAgICAgIGlmICghdmVoaWNsZVNpemUpIHtcbiAgICAgICAgIGNvbnNvbGUubG9nKGBbZ2V0U2VydmljZVByaWNlVG9vbF0gVmVoaWNsZSBzaXplIG5vdCBmb3VuZCBmb3IgbW9kZWwgJyR7dmVoaWNsZU1vZGVsfScuYCk7XG4gICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogYFVrdXJhbiB1bnR1ayBtb2RlbCBtb3RvciBcIiR7dmVoaWNsZU1vZGVsfVwiIHRpZGFrIGRpdGVtdWthbi4gWm95YSBiaW5ndW5nIG5paC5gIH07XG4gICAgICB9XG4gICAgICBjb25zdCBmaXJlc3RvcmVTaXplVmFyaWFudCA9IHZlaGljbGVTaXplOyAvLyBlLmcuLCBcIkxcIiAobmFtYSB2YXJpYW4gZGkgRmlyZXN0b3JlIGFkYWxhaCAnTCcsICdYTCcsIGRsbCBidWthbiAnU0laRSBMJylcblxuICAgICAgLy8gMi4gQ2FyaSBsYXlhbmFuIGJlcmRhc2Fya2FuIG5hbWEgKG1lbmdndW5ha2FuIGZpZWxkIGxvd2VyY2FzZSB1bnR1ayBjYXNlLWluc2Vuc2l0aXZpdHkpXG4gICAgICBjb25zdCBzZXJ2aWNlc0NvbGxlY3Rpb25SZWYgPSBjb2xsZWN0aW9uKGRiLCAnc2VydmljZXMnKTtcbiAgICAgIGNvbnN0IHNlcnZpY2VOYW1lTG93ZXIgPSBzZXJ2aWNlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgXG4gICAgICAvLyBRdWVyeSBhd2FsIGJpc2EgbGViaWggbHVhcyBqaWthIG5hbWEgbGF5YW5hbiBiaXNhIHRpZGFrIHBlcnNpc1xuICAgICAgY29uc3Qgc2VydmljZVF1ZXJ5ID0gZmlyZXN0b3JlUXVlcnkoXG4gICAgICAgIHNlcnZpY2VzQ29sbGVjdGlvblJlZixcbiAgICAgICAgd2hlcmUoJ25hbWVfbG93ZXJjYXNlJywgJz49Jywgc2VydmljZU5hbWVMb3dlciksXG4gICAgICAgIHdoZXJlKCduYW1lX2xvd2VyY2FzZScsICc8PScsIHNlcnZpY2VOYW1lTG93ZXIgKyAnXFx1ZjhmZicpXG4gICAgICAgIC8vIEtpdGEgYWthbiBmaWx0ZXIgbGViaWggbGFuanV0IGRpIGNsaWVudC1zaWRlIGppa2EgcGVybHUsIGthcmVuYSBGaXJlc3RvcmUgdGlkYWsgYmlzYSAnY29udGFpbnMnIHNlY2FyYSBuYXRpdmVcbiAgICAgICk7XG4gICAgICBjb25zdCBzZXJ2aWNlUXVlcnlTbmFwc2hvdCA9IGF3YWl0IGdldERvY3Moc2VydmljZVF1ZXJ5KTtcblxuICAgICAgaWYgKHNlcnZpY2VRdWVyeVNuYXBzaG90LmVtcHR5KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBbZ2V0U2VydmljZVByaWNlVG9vbF0gU2VydmljZSBuYW1lICcke3NlcnZpY2VOYW1lfScgbm90IGZvdW5kIChpbml0aWFsIHF1ZXJ5KS5gKTtcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGBMYXlhbmFuIFwiJHtzZXJ2aWNlTmFtZX1cIiBzZXBlcnRpbnlhIHRpZGFrIHRlcnNlZGlhLmAgfTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gRmlsdGVyIG1hbnVhbCB1bnR1ayAnY29udGFpbnMnIGthcmVuYSBGaXJlc3RvcmUgdGlkYWsgbWVuZHVrdW5nbnlhIHNlY2FyYSBsYW5nc3VuZ1xuICAgICAgLy8gZGFuIHVudHVrIG1lbWlsaWggbWF0Y2ggdGVyYmFpayBqaWthIGFkYSBiZWJlcmFwYS5cbiAgICAgIGxldCBmb3VuZFNlcnZpY2VEYXRhOiBhbnkgPSBudWxsO1xuICAgICAgbGV0IGJlc3RNYXRjaFNjb3JlID0gLTE7XG5cbiAgICAgIHNlcnZpY2VRdWVyeVNuYXBzaG90LmZvckVhY2goZG9jID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IGRvYy5kYXRhKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZXJ2aWNlTmFtZUxvd2VyID0gc2VydmljZS5uYW1lX2xvd2VyY2FzZSB8fCBzZXJ2aWNlLm5hbWUudG9Mb3dlckNhc2UoKTsgLy8gRmFsbGJhY2sgamlrYSBuYW1lX2xvd2VyY2FzZSBiZWx1bSBhZGFcbiAgICAgICAgXG4gICAgICAgIC8vIFNrb3Igc2VkZXJoYW5hIHVudHVrIG1lbmVudHVrYW4ga2VtaXJpcGFuXG4gICAgICAgIGxldCBzY29yZSA9IDA7XG4gICAgICAgIGlmIChjdXJyZW50U2VydmljZU5hbWVMb3dlciA9PT0gc2VydmljZU5hbWVMb3dlcikgeyAvLyBFeGFjdCBtYXRjaFxuICAgICAgICAgICAgc2NvcmUgPSAxMDA7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFNlcnZpY2VOYW1lTG93ZXIuc3RhcnRzV2l0aChzZXJ2aWNlTmFtZUxvd2VyKSkgeyAvLyBTdGFydHMgd2l0aFxuICAgICAgICAgICAgc2NvcmUgPSA1MDtcbiAgICAgICAgfSBlbHNlIGlmIChzZXJ2aWNlTmFtZUxvd2VyLmluY2x1ZGVzKGN1cnJlbnRTZXJ2aWNlTmFtZUxvd2VyKSkgeyAvLyBVc2VyIGlucHV0IGNvbnRhaW5zIGRiIG5hbWUgKGt1cmFuZyB1bXVtKVxuICAgICAgICAgICAgc2NvcmUgPSAyNTtcbiAgICAgICAgfSBlbHNlIHsgLy8gU2ltcGxlIGNvbnRhaW5zLCBiaXNhIGphZGkga3VyYW5nIGFrdXJhdCB0YXBpIGxlYmloIGJhaWsgZGFyaSB0aWRhayBhZGFcbiAgICAgICAgICAgIHNjb3JlID0gMTA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2NvcmUgPiBiZXN0TWF0Y2hTY29yZSkge1xuICAgICAgICAgICAgYmVzdE1hdGNoU2NvcmUgPSBzY29yZTtcbiAgICAgICAgICAgIGZvdW5kU2VydmljZURhdGEgPSBzZXJ2aWNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFmb3VuZFNlcnZpY2VEYXRhKSB7XG4gICAgICAgICBjb25zb2xlLmxvZyhgW2dldFNlcnZpY2VQcmljZVRvb2xdIE5vIHN1aXRhYmxlIHNlcnZpY2UgZm91bmQgZm9yICcke3NlcnZpY2VOYW1lfScgYWZ0ZXIgZmlsdGVyaW5nLmApO1xuICAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGBMYXlhbmFuIFwiJHtzZXJ2aWNlTmFtZX1cIiB0aWRhayBkaXRlbXVrYW4uYCB9O1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyAzLiBBbWJpbCBoYXJnYSBkYXJpIG1hcCAndmFyaWFudHMnIGJlcmRhc2Fya2FuIHVrdXJhbiBrZW5kYXJhYW5cbiAgICAgIGxldCBwcmljZTogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgbGV0IGVzdGltYXRlZER1cmF0aW9uOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBmb3VuZFNlcnZpY2VEYXRhLmVzdGltYXRlZER1cmF0aW9uOyAvLyBEZWZhdWx0IGtlIGVzdGltYXNpIGRhc2FyIGxheWFuYW5cblxuICAgICAgLy8gQ2VrIGFwYWthaCBzZXJ2aWNlIG1lbWlsaWtpIHZhcmlhbnRzIGRhbiBhcGFrYWggdmFyaWFudHMgaXR1IGFycmF5XG4gICAgICBpZiAoZm91bmRTZXJ2aWNlRGF0YS52YXJpYW50cyAmJiBBcnJheS5pc0FycmF5KGZvdW5kU2VydmljZURhdGEudmFyaWFudHMpKSB7XG4gICAgICAgIC8vIENhcmkgdmFyaWFuIHlhbmcgY29jb2sgZGVuZ2FuIHNpemVOYW1lIChjYXNlLWluc2Vuc2l0aXZlKVxuICAgICAgICBjb25zdCB2YXJpYW50ID0gZm91bmRTZXJ2aWNlRGF0YS52YXJpYW50cy5maW5kKCh2OiBhbnkpID0+IHYubmFtZSAmJiB2Lm5hbWUudG9VcHBlckNhc2UoKSA9PT0gZmlyZXN0b3JlU2l6ZVZhcmlhbnQudG9VcHBlckNhc2UoKSk7XG4gICAgICAgIGlmICh2YXJpYW50ICYmIHR5cGVvZiB2YXJpYW50LnByaWNlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHByaWNlID0gdmFyaWFudC5wcmljZTtcbiAgICAgICAgICBlc3RpbWF0ZWREdXJhdGlvbiA9IHZhcmlhbnQuZXN0aW1hdGVkRHVyYXRpb24gfHwgZXN0aW1hdGVkRHVyYXRpb247IC8vIEFtYmlsIGR1cmFzaSB2YXJpYW4gamlrYSBhZGEsIGppa2EgdGlkYWsgcGFrYWkgZHVyYXNpIGRhc2FyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gSmlrYSB0aWRhayBhZGEgdmFyaWFuIHlhbmcgY29jb2sgYXRhdSB0aWRhayBhZGEgYXJyYXkgdmFyaWFudHMsIGd1bmFrYW4gaGFyZ2EgZGFzYXIgbGF5YW5hblxuICAgICAgaWYgKHByaWNlID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIGZvdW5kU2VydmljZURhdGEucHJpY2UgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHByaWNlID0gZm91bmRTZXJ2aWNlRGF0YS5wcmljZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByaWNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFtnZXRTZXJ2aWNlUHJpY2VUb29sXSBQcmljZSBub3QgZm91bmQgZm9yIHNlcnZpY2UgJyR7Zm91bmRTZXJ2aWNlRGF0YS5uYW1lfScgd2l0aCBzaXplICcke3ZlaGljbGVTaXplfScuIEJhc2UgcHJpY2UgYWxzbyBub3QgZm91bmQgb3IgaW52YWxpZC5gKTtcbiAgICAgICAgcmV0dXJuIHsgXG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsIFxuICAgICAgICAgIG1lc3NhZ2U6IGBIYXJnYSB1bnR1ayBsYXlhbmFuIFwiJHtmb3VuZFNlcnZpY2VEYXRhLm5hbWV9XCIgcGFkYSBtb3RvciB1a3VyYW4gJHt2ZWhpY2xlU2l6ZX0gKCR7dmVoaWNsZU1vZGVsfSkgYmVsdW0gdGVyc2VkaWEgc2FhdCBpbmkuIE11bmdraW4gWm95YSBiaXNhIGJhbnR1IGNhcmlrYW4gbGF5YW5hbiBsYWluP2AsXG4gICAgICAgICAgc2l6ZTogdmVoaWNsZVNpemUsIC8vIFNlcnRha2FuIHVrdXJhbiB1bnR1ayBpbmZvcm1hc2lcbiAgICAgICAgICBlc3RpbWF0ZWREdXJhdGlvbjogZXN0aW1hdGVkRHVyYXRpb24gLy8gU2VydGFrYW4gZHVyYXNpIGppa2EgYWRhXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIHByaWNlOiBwcmljZSxcbiAgICAgICAgc2l6ZTogdmVoaWNsZVNpemUsXG4gICAgICAgIG1lc3NhZ2U6IGBIYXJnYSB1bnR1ayBsYXlhbmFuICR7Zm91bmRTZXJ2aWNlRGF0YS5uYW1lfSBwYWRhIG1vdG9yICR7dmVoaWNsZU1vZGVsfSAoU2l6ZSAke3ZlaGljbGVTaXplfSkgYWRhbGFoIFJwICR7cHJpY2UudG9Mb2NhbGVTdHJpbmcoJ2lkLUlEJyl9LiBFc3RpbWFzaSBkdXJhc2k6ICR7ZXN0aW1hdGVkRHVyYXRpb24gfHwgJ04vQSd9LmAsXG4gICAgICAgIGVzdGltYXRlZER1cmF0aW9uOiBlc3RpbWF0ZWREdXJhdGlvbiB8fCB1bmRlZmluZWRcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiW2dldFNlcnZpY2VQcmljZVRvb2xdIEVycm9yIGV4ZWN1dGluZyB0b29sOlwiLCBlcnJvci5tZXNzYWdlLCBlcnJvci5zdGFjayk7XG4gICAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBgV2FkdWgsIFpveWEgbGFnaSBwdXNpbmcgbmloLCBhZGEgZXJyb3IgcGFzIG5nZWNlayBoYXJnYTogJHtlcnJvci5tZXNzYWdlfWAgfTtcbiAgICB9XG4gIH1cbik7XG5cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vICBGTE9XOiBMb2dpa2EgdXRhbWEgY2hhdGJvdCBab3lhXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCB6b3lhQ2hhdEZsb3cgPSBhaS5kZWZpbmVGbG93KFxuICB7XG4gICAgbmFtZTogJ3pveWFDaGF0RmxvdycsXG4gICAgaW5wdXRTY2hlbWE6IFpveWFDaGF0SW5wdXRTY2hlbWEsIC8vIElucHV0IHVudHVrIGZsb3cgaW5pXG4gICAgb3V0cHV0U2NoZW1hOiBab3lhQ2hhdE91dHB1dFNjaGVtYSwgLy8gT3V0cHV0bnlhIHN0cmluZyAoYmFsYXNhbiBBSSlcbiAgfSxcbiAgYXN5bmMgKGlucHV0KSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJbQ1MtRkxPV10gem95YUNoYXRGbG93IGlucHV0LiBDdXN0b21lciBNZXNzYWdlOlwiLCBpbnB1dC5jdXN0b21lck1lc3NhZ2UsIFwiSGlzdG9yeSBMZW5ndGg6XCIsIChpbnB1dC5tZXNzYWdlcyB8fCBbXSkubGVuZ3RoKTtcblxuICAgIC8vIFRlbnR1a2FuIHBlc2FuIHRlcmFraGlyIGRhcmkgdXNlciB1bnR1ayBkaWphZGlrYW4gcHJvbXB0IHV0YW1hXG4gICAgY29uc3QgbGFzdFVzZXJNZXNzYWdlQ29udGVudCA9IGlucHV0LmN1c3RvbWVyTWVzc2FnZSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlucHV0Lm1lc3NhZ2VzICYmIGlucHV0Lm1lc3NhZ2VzLmxlbmd0aCA+IDAgPyBpbnB1dC5tZXNzYWdlc1tpbnB1dC5tZXNzYWdlcy5sZW5ndGggLSAxXS5jb250ZW50IDogJycpO1xuXG4gICAgaWYgKCFsYXN0VXNlck1lc3NhZ2VDb250ZW50IHx8IGxhc3RVc2VyTWVzc2FnZUNvbnRlbnQudHJpbSgpID09PSAnJykge1xuICAgICAgY29uc29sZS53YXJuKFwiW0NTLUZMT1ddIE5vIHZhbGlkIGxhc3QgdXNlciBtZXNzYWdlIGNvbnRlbnQuIFJldHVybmluZyBlbXB0eSByZXBseS5cIik7XG4gICAgICByZXR1cm4gXCJcIjsgLy8gS2VtYmFsaWthbiBzdHJpbmcga29zb25nIGppa2EgdGlkYWsgYWRhIHBlc2FuIHZhbGlkXG4gICAgfVxuICAgIGNvbnN0IGxhc3RNZXNzYWdlTG93ZXJDYXNlID0gbGFzdFVzZXJNZXNzYWdlQ29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIFxuICAgIGxldCBkeW5hbWljQ29udGV4dCA9IGBJTkZPX1VNVU1fQkVOR0tFTDogUUxBQiBNb3RvIERldGFpbGluZyBhZGFsYWggYmVuZ2tlbCBwZXJhd2F0YW4gZGFuIGRldGFpbGluZyBtb3Rvci5gO1xuXG4gICAgLy8gRGV0ZWtzaSBlbnRpdGFzIChtb3RvciAmIGxheWFuYW4pIGppa2EgZGIgdGVyc2VkaWFcbiAgICBpZiAoZGIpIHsgLy8gUGFzdGlrYW4gZGIgKENsaWVudCBTREspIHN1ZGFoIGRpaW5pc2lhbGlzYXNpXG4gICAgICB0cnkge1xuICAgICAgICAgIC8vIExvZ2lrYSBkZXRla3NpIG1vZGVsIG1vdG9yIChjb250b2gsIGJpc2EgZGlzZW1wdXJuYWthbilcbiAgICAgICAgICBjb25zdCBtb2RlbHNDb2xsZWN0aW9uUmVmID0gY29sbGVjdGlvbihkYiwgJ3ZlaGljbGVUeXBlcycpO1xuICAgICAgICAgIGNvbnN0IG1vZGVsc1NuYXBzaG90ID0gYXdhaXQgZ2V0RG9jcyhtb2RlbHNDb2xsZWN0aW9uUmVmKTsgLy8gTWVuZ2d1bmFrYW4gQ2xpZW50IFNES1xuICAgICAgICAgIGZvciAoY29uc3QgZG9jIG9mIG1vZGVsc1NuYXBzaG90LmRvY3MpIHtcbiAgICAgICAgICAgICAgY29uc3QgbW9kZWxEYXRhID0gZG9jLmRhdGEoKTtcbiAgICAgICAgICAgICAgY29uc3QgbW9kZWxBbGlhc2VzID0gKG1vZGVsRGF0YS5hbGlhc2VzIGFzIHN0cmluZ1tdIHx8IFtdKS5tYXAoYSA9PiBhLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbE1vZGVsTmFtZSA9IG1vZGVsRGF0YS5tb2RlbCBhcyBzdHJpbmc7IC8vIFBhc3Rpa2FuIGFkYSBmaWVsZCAnbW9kZWwnIGRpIEZpcmVzdG9yZVxuICAgICAgICAgICAgICBpZiAobW9kZWxBbGlhc2VzLnNvbWUoYWxpYXMgPT4gbGFzdE1lc3NhZ2VMb3dlckNhc2UuaW5jbHVkZXMoYWxpYXMpKSB8fCBsYXN0TWVzc2FnZUxvd2VyQ2FzZS5pbmNsdWRlcyhvcmlnaW5hbE1vZGVsTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgICAgLy8gdmVoaWNsZU1vZGVsID0gb3JpZ2luYWxNb2RlbE5hbWU7IC8vIFRpZGFrIGRpZ3VuYWthbiBsYW5nc3VuZyBkaSBzaW5pLCB0YXBpIGJpc2EgZGlzaW1wYW4gZGkgY29udGV4dFxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBMb2dpa2EgZGV0ZWtzaSBuYW1hIGxheWFuYW4gKGNvbnRvaCwgYmlzYSBkaXNlbXB1cm5ha2FuKVxuICAgICAgICAgIGNvbnN0IHNlcnZpY2VzQ29sbGVjdGlvblJlZiA9IGNvbGxlY3Rpb24oZGIsICdzZXJ2aWNlcycpO1xuICAgICAgICAgIGNvbnN0IHNlcnZpY2VzU25hcHNob3QgPSBhd2FpdCBnZXREb2NzKHNlcnZpY2VzQ29sbGVjdGlvblJlZik7IC8vIE1lbmdndW5ha2FuIENsaWVudCBTREtcbiAgICAgICAgICBmb3IgKGNvbnN0IGRvYyBvZiBzZXJ2aWNlc1NuYXBzaG90LmRvY3MpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2VydmljZURhdGEgPSBkb2MuZGF0YSgpO1xuICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlQWxpYXNlcyA9IChzZXJ2aWNlRGF0YS5hbGlhc2VzIGFzIHN0cmluZ1tdIHx8IFtdKS5tYXAoYSA9PiBhLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbFNlcnZpY2VOYW1lID0gc2VydmljZURhdGEubmFtZSBhcyBzdHJpbmc7XG4gICAgICAgICAgICAgIGlmIChzZXJ2aWNlQWxpYXNlcy5zb21lKGFsaWFzID0+IGxhc3RNZXNzYWdlTG93ZXJDYXNlLmluY2x1ZGVzKGFsaWFzKSkgfHwgbGFzdE1lc3NhZ2VMb3dlckNhc2UuaW5jbHVkZXMob3JpZ2luYWxTZXJ2aWNlTmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgICAgLy8gc2VydmljZU5hbWUgPSBvcmlnaW5hbFNlcnZpY2VOYW1lOyAvLyBUaWRhayBkaWd1bmFrYW4gbGFuZ3N1bmcgZGkgc2luaVxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9IGNhdGNoIChkYkVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIltDUy1GTE9XXSBFcnJvciBkdXJpbmcgRmlyZXN0b3JlIGVudGl0eSBkZXRlY3Rpb246XCIsIGRiRXJyb3IpO1xuICAgICAgICAgIGR5bmFtaWNDb250ZXh0ICs9IFwiIFdBUk5JTkc6IEdhZ2FsIG1lbmdhbWJpbCBkYXRhIGRldGFpbCBkYXJpIGRhdGFiYXNlLlwiO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIltDUy1GTE9XXSBGaXJlc3RvcmUgREIgKGRiKSBpcyBub3QgaW5pdGlhbGl6ZWQuIEVudGl0eSBkZXRlY3Rpb24gYW5kIHByaWNpbmcgd2lsbCBiZSBza2lwcGVkLlwiKTtcbiAgICAgICAgZHluYW1pY0NvbnRleHQgKz0gXCIgV0FSTklORzogRGF0YWJhc2UgdGlkYWsgdGVyaHVidW5nLCBpbmZvIGhhcmdhIG11bmdraW4gdGlkYWsgYWt1cmF0LlwiO1xuICAgIH1cbiAgICBcbiAgICBjb25zb2xlLmxvZyhgW0NTLUZMT1ddIER5bmFtaWMgY29udGV4dCBidWlsdDogJHtkeW5hbWljQ29udGV4dH1gKTtcblxuICAgIC8vIE1hcCBpbnB1dC5tZXNzYWdlcyAoaGlzdG9yeSkga2UgZm9ybWF0IHlhbmcgZGloYXJhcGthbiBBSVxuICAgIGNvbnN0IGhpc3RvcnlGb3JBSSA9IChpbnB1dC5tZXNzYWdlcyB8fCBbXSlcbiAgICAgIC5maWx0ZXIobXNnID0+IG1zZy5jb250ZW50ICYmIG1zZy5jb250ZW50LnRyaW0oKSAhPT0gJycpIC8vIEZpbHRlciBwZXNhbiBrb3NvbmdcbiAgICAgIC5tYXAoKG1zZykgPT4gKHtcbiAgICAgICAgcm9sZTogbXNnLnJvbGUsIC8vICd1c2VyJyBhdGF1ICdtb2RlbCdcbiAgICAgICAgcGFydHM6IFt7IHRleHQ6IG1zZy5jb250ZW50IH1dLFxuICAgIH0pKTtcbiAgICBcbiAgICBjb25zdCBzeXN0ZW1JbnN0cnVjdGlvblRleHQgPSAoaW5wdXQubWFpblByb21wdFN0cmluZyB8fCBERUZBVUxUX0FJX1NFVFRJTkdTLm1haW5Qcm9tcHQpLnJlcGxhY2UoXCJ7e2R5bmFtaWNDb250ZXh0fX1cIiwgZHluYW1pY0NvbnRleHQpO1xuXG4gICAgLy8gR2FidW5na2FuIHN5c3RlbSBpbnN0cnVjdGlvbiBkZW5nYW4gcHJvbXB0IHVzZXIgdGVyYWtoaXJcbiAgICBjb25zdCB1c2VyUHJvbXB0V2l0aFN5c3RlbUluc3RydWN0aW9uID0gYCR7c3lzdGVtSW5zdHJ1Y3Rpb25UZXh0fVxuXG4tLS1cblxuVVNFUl9JTlBVVDogXCIke2xhc3RVc2VyTWVzc2FnZUNvbnRlbnR9XCJcblxuSkFXQUJBTiBaT1lBOmA7IC8vIFRhbWJhaGthbiBsYWJlbCB1bnR1ayBBSVxuXG4gICAgLy8gQmVudHVrIGFycmF5IG1lc3NhZ2VzIHlhbmcgYWthbiBkaWtpcmltIGtlIEFJXG4gICAgY29uc3QgbWVzc2FnZXNGb3JBSSA9IFtcbiAgICAgIC4uLmhpc3RvcnlGb3JBSSwgLy8gUml3YXlhdCBwZXJjYWthcGFuIHNlYmVsdW1ueWFcbiAgICAgIHsgcm9sZTogJ3VzZXInIGFzIGNvbnN0LCBwYXJ0czogW3sgdGV4dDogdXNlclByb21wdFdpdGhTeXN0ZW1JbnN0cnVjdGlvbiB9XSB9IC8vIFBlc2FuIHVzZXIgdGVyYWtoaXIgKHN1ZGFoIGRpZ2FidW5nIGRlbmdhbiBzeXN0ZW0gcHJvbXB0KVxuICAgIF07XG5cbiAgICBjb25zb2xlLmxvZyhcIltDUy1GTE9XXSBDYWxsaW5nIGFpLmdlbmVyYXRlIHdpdGggbW9kZWwgZ29vZ2xlYWkvZ2VtaW5pLTEuNS1mbGFzaC1sYXRlc3QuIEhpc3RvcnkgTGVuZ3RoOlwiLCBoaXN0b3J5Rm9yQUkubGVuZ3RoKTtcbiAgICAvLyBVbnR1ayBkZWJ1Z2dpbmcsIGJpc2EgdW5jb21tZW50IGluaSB1bnR1ayBsaWhhdCBwcmV2aWV3IHByb21wdCBsZW5na2FwIChoYXRpLWhhdGkgamlrYSB0ZXJsYWx1IHBhbmphbmcpXG4gICAgLy8gY29uc29sZS5sb2coXCJbQ1MtRkxPV10gRnVsbCBQcm9tcHQgUHJldmlldyAoZmlyc3QgNTAwIGNoYXJzKTogXFxuXCIsIHVzZXJQcm9tcHRXaXRoU3lzdGVtSW5zdHJ1Y3Rpb24uc3Vic3RyaW5nKDAsIDUwMCkgKyBcIi4uLlwiKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWkuZ2VuZXJhdGUoe1xuICAgICAgICBtb2RlbDogJ2dvb2dsZWFpL2dlbWluaS0xLjUtZmxhc2gtbGF0ZXN0JyxcbiAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzRm9yQUksXG4gICAgICAgIC8vIHRvb2xzOiBbZ2V0U2VydmljZVByaWNlVG9vbCBhcyBhbnldLCAvLyBUb29scyB0ZW1wb3JhcmlseSBkaXNhYmxlZFxuICAgICAgICAvLyB0b29sQ2hvaWNlOiAnYXV0bycsIC8vIFRvb2xzIHRlbXBvcmFyaWx5IGRpc2FibGVkXG4gICAgICAgIGNvbmZpZzogeyB0ZW1wZXJhdHVyZTogMC41IH0sXG4gICAgICB9KTtcblxuICAgICAgY29uc29sZS5sb2coXCJbQ1MtRkxPV10gUmF3IEFJIGdlbmVyYXRlIHJlc3VsdDpcIiwgSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCAyKSk7XG5cbiAgICAgIC8vIEFrc2VzIGZpbmlzaFJlYXNvbiBkYW4gc2FmZXR5UmF0aW5ncyBkYXJpIGxldmVsIGF0YXMgb2JqZWsgcmVzdWx0XG4gICAgICBjb25zdCBmaW5pc2hSZWFzb24gPSByZXN1bHQuZmluaXNoUmVhc29uOyBcbiAgICAgIGNvbnN0IHNhZmV0eVJhdGluZ3MgPSByZXN1bHQuc2FmZXR5UmF0aW5nczsgXG5cbiAgICAgIGNvbnNvbGUubG9nKGBbQ1MtRkxPV10gQUkgRmluaXNoIFJlYXNvbjogJHtmaW5pc2hSZWFzb259YCk7XG4gICAgICBpZiAoc2FmZXR5UmF0aW5ncyAmJiBzYWZldHlSYXRpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1tDUy1GTE9XXSBBSSBTYWZldHkgUmF0aW5nczonLCBKU09OLnN0cmluZ2lmeShzYWZldHlSYXRpbmdzLCBudWxsLCAyKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFrc2VzIHRla3MgZGFyaSBrYW5kaWRhdCBwZXJ0YW1hIHNlY2FyYSBhbWFuIChqaWthIHJlc3VsdC5jYW5kaWRhdGVzIGFkYSlcbiAgICAgIGNvbnN0IHN1Z2dlc3RlZFJlcGx5ID0gcmVzdWx0LmNhbmRpZGF0ZXM/LlswXT8ubWVzc2FnZS5jb250ZW50Py5bMF0/LnRleHQgfHwgXCJcIjtcblxuICAgICAgaWYgKCFzdWdnZXN0ZWRSZXBseSkge1xuICAgICAgICBpZiAoZmluaXNoUmVhc29uICE9PSBcInN0b3BcIikgeyAvLyBHdW5ha2FuIGxvd2VyY2FzZSBcInN0b3BcIlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFtDUy1GTE9XXSDinYwgQUkgZ2VuZXJhdGlvbiBmYWlsZWQuIEZpbmlzaCBSZWFzb246ICR7ZmluaXNoUmVhc29ufS4gU2FmZXR5OiAke0pTT04uc3RyaW5naWZ5KHNhZmV0eVJhdGluZ3MpfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgW0NTLUZMT1ddIOKaoO+4jyBBSSByZXR1cm5lZCBhbiBlbXB0eSByZXBseSwgYnV0IGZpbmlzaFJlYXNvbiB3YXMgJ3N0b3AnLiBUaGlzIG1pZ2h0IGluZGljYXRlIGFuIGlzc3VlIG9yIHVuZXhwZWN0ZWQgbW9kZWwgYmVoYXZpb3IuIFNhZmV0eSBSYXRpbmdzOiAke0pTT04uc3RyaW5naWZ5KHNhZmV0eVJhdGluZ3MpfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIk1hYWYsIFpveWEgbGFnaSBhZ2FrIGJpbmd1bmcgbmloIGJvc2t1dS4gQ29iYSB0YW55YSBsYWdpIGRlbmdhbiBjYXJhIGxhaW4geWEsIGF0YXUgaHVidW5naSBDUyBsYW5nc3VuZy5cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdWdnZXN0ZWRSZXBseTtcblxuICAgIH0gY2F0Y2ggKGZsb3dFcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbQ1MtRkxPV10g4p2MIENyaXRpY2FsIGVycm9yIGRhbGFtIGZsb3cgem95YUNoYXRGbG93OlwiLCBmbG93RXJyb3IpO1xuICAgICAgICBpZiAoZmxvd0Vycm9yLmNhdXNlKSB7IC8vIENlayBhcGFrYWggYWRhICdjYXVzZScgZGkgZXJyb3Igb2JqZWN0XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW0NTLUZMT1ddIEVycm9yIENhdXNlOlwiLCBKU09OLnN0cmluZ2lmeShmbG93RXJyb3IuY2F1c2UsIG51bGwsIDIpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYFdhZHVoLCBab3lhIGxhZ2kgZXJyb3IgbmloLCBib3NrdXUuIENvYmEgdGFueWEgbGFnaSBuYW50aSB5YS4gKFBlc2FuIEVycm9yOiAke2Zsb3dFcnJvci5tZXNzYWdlIHx8ICdLZXNhbGFoYW4gaW50ZXJuYWwgdGlkYWsgZGlrZXRhaHVpJ30pYDtcbiAgICB9XG4gIH1cbik7XG5cbi8vIEZ1bmdzaSB3cmFwcGVyLCBURVRBUCBESS1FWFBPUlRcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVdoYXRzQXBwUmVwbHkoaW5wdXQ6IFpveWFDaGF0SW5wdXQpOiBQcm9taXNlPHsgc3VnZ2VzdGVkUmVwbHk6IHN0cmluZyB9PiB7XG4gIGNvbnNvbGUubG9nKFwiW0NTLUZMT1ddIGdlbmVyYXRlV2hhdHNBcHBSZXBseSBpbnB1dDpcIiwgSlNPTi5zdHJpbmdpZnkoaW5wdXQsIG51bGwsIDIpKTtcbiAgXG4gIC8vIFBhc3Rpa2FuIGlucHV0Lm1haW5Qcm9tcHRTdHJpbmcgZGlpc2kgamlrYSBrb3NvbmcsIHNlYmVsdW0gZGlraXJpbSBrZSBmbG93XG4gIGlmICghaW5wdXQubWFpblByb21wdFN0cmluZykge1xuICAgIC8vIERpIHNpbmksIGtpdGEgYmlzYSBtZW5nYW1iaWwgZGFyaSBGaXJlc3RvcmUgYXRhdSB0ZW1wYXQgbGFpbiBqaWthIGRpcGVybHVrYW5cbiAgICAvLyBVbnR1ayBzZWthcmFuZywga2l0YSBwYWthaSBkZWZhdWx0IGppa2EgdGlkYWsgYWRhXG4gICAgY29uc3QgbWFpblByb21wdEZyb21TZXR0aW5ncyA9IERFRkFVTFRfQUlfU0VUVElOR1MubWFpblByb21wdDsgXG4gICAgY29uc29sZS5sb2coXCJbQ1MtRkxPV10gZ2VuZXJhdGVXaGF0c0FwcFJlcGx5OiBtYWluUHJvbXB0IG5vdCBmb3VuZCBpbiBpbnB1dC4gVXNpbmcgREVGQVVMVF9BSV9TRVRUSU5HUy5tYWluUHJvbXB0LlwiKTtcbiAgICBpbnB1dC5tYWluUHJvbXB0U3RyaW5nID0gbWFpblByb21wdEZyb21TZXR0aW5nczsgLy8gSW5pIGFrYW4gbWVtb2RpZmlrYXNpIG9iamVrIGlucHV0XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXCJbQ1MtRkxPV10gZ2VuZXJhdGVXaGF0c0FwcFJlcGx5OiBVc2luZyBtYWluUHJvbXB0U3RyaW5nIGZyb20gaW5wdXQuXCIpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBQYXN0aWthbiBpbnB1dC5tZXNzYWdlcyBhZGFsYWggYXJyYXksIG1pbmltYWwgYXJyYXkga29zb25nLlxuICAgIC8vIGN1c3RvbWVyTWVzc2FnZSAocGVzYW4gdXNlciB0ZXJha2hpcikgYWthbiBkaXRhbmdhbmkgZGkgZGFsYW0gem95YUNoYXRGbG93LlxuICAgIGlmICghaW5wdXQubWVzc2FnZXMpIHtcbiAgICAgICAgaW5wdXQubWVzc2FnZXMgPSBbXTsgLy8gTW9kaWZpa2FzaSBvYmplayBpbnB1dFxuICAgIH1cblxuICAgIGNvbnN0IHJlcGx5VGV4dCA9IGF3YWl0IHpveWFDaGF0RmxvdyhpbnB1dCk7IC8vIEtpcmltIG9iamVrIGlucHV0IHlhbmcgc3VkYWggZGltb2RpZmlrYXNpXG4gICAgcmV0dXJuIHsgc3VnZ2VzdGVkUmVwbHk6IHJlcGx5VGV4dCB9O1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcIltDUy1GTE9XIFdyYXBwZXJdIEVycm9yIHJ1bm5pbmcgem95YUNoYXRGbG93OlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHsgc3VnZ2VzdGVkUmVwbHk6IGBNYWFmLCBab3lhIHNlZGFuZyBhZGEga2VuZGFsYSB0ZWtuaXMuICgke2Vycm9yLm1lc3NhZ2UgfHwgJ1RpZGFrIGRpa2V0YWh1aSd9KWAgfTtcbiAgfVxufVxuXG5cbmNvbnN0IERFRkFVTFRfQUlfU0VUVElOR1MgPSB7XG4gIG1haW5Qcm9tcHQ6IGBcbkFuZGEgYWRhbGFoIFwiWm95YVwiIC0gQ1MgUUxBQiBNb3RvIERldGFpbGluZy5cbkdBWUEgQkFIQVNBOlxuLSBTYW50YWksIHJhbWFoLCBkYW4gcHJvZmVzaW9uYWwgKHNhcGEgZGVuZ2FuIFwiSGFsbyBib3NrdXUhXCIsIFwiU2lhcCFcIiwgXCJHYXMgYm9va2luZyFcIikuXG4tIEd1bmFrYW4gaXN0aWxhaCBvdG9tb3RpZiBzYW50YWk6IFwia2luY2xvbmdcIiwgXCJnYW50ZW5nIG1ha3NpbWFsXCIsIFwic3BhIG1vdG9yXCIuXG4tIEd1bmFrYW4gZW1vamkgc2VjdWt1cG55YSB1bnR1ayBtZW5hbWJhaCBla3NwcmVzaTog4pyF8J+YjuKcqPCfkrjwn5ug77iPLlxuLSBIaW5kYXJpIGthdGEga2FzYXIsIHRhcGkgYm9sZWggcGFrYWkgXCJhbmpheVwiIGF0YXUgXCJ3aWhcIiB1bnR1ayBla3NwcmVzaSBrYWdldCBwb3NpdGlmLlxuLSBTZWxhbHUgamF3YWIgZGFsYW0gQmFoYXNhIEluZG9uZXNpYS5cblxuQVRVUkFOIEJJU05JUyAoUEVOVElORyEpOlxuMS4gIEppa2EgdXNlciBtZW5hbnlha2FuIGhhcmdhLCBTRUxBTFUgR1VOQUtBTiAnZ2V0U2VydmljZVByaWNlJyB0b29sIGppa2EgdGVyc2VkaWEuIEphbmdhbiBtZW5lYmFrIGhhcmdhLiBKaWthIHRvb2wgdGlkYWsgdGVyc2VkaWEsIGJlcmlrYW4gZXN0aW1hc2kgYmVyZGFzYXJrYW4gaW5mb3JtYXNpIHlhbmcgYWRhIGRpIEtPTlRFS1MgREFSSSBTSVNURU0uXG4yLiAgTGF5YW5hbiBcIkZ1bGwgRGV0YWlsaW5nXCIgSEFOWUEgVEVSU0VESUEgdW50dWsgbW90b3IgZGVuZ2FuIGNhdCBHTE9TU1kuIEppa2EgdXNlciBiZXJ0YW55YSB1bnR1ayBtb3RvciBET0ZGLCB0b2xhayBkZW5nYW4gc29wYW4gZGFuIHRhd2Fya2FuIGxheWFuYW4gbGFpbiAobWlzYWw6IFwiUHJlbWl1bSBXYXNoXCIgYXRhdSBcIkNvYXRpbmcgRG9mZlwiKS5cbjMuICBIYXJnYSBcIkNvYXRpbmdcIiB1bnR1ayBtb3RvciBET0ZGIGRhbiBHTE9TU1kgaXR1IEJFUkJFREEuIFBhc3Rpa2FuIGluZm9ybWFzaSBpbmkgamVsYXMuXG40LiAgTW90b3IgR2VkZSAoTW9nZSkgc2VwZXJ0aSBIYXJsZXksIGF0YXUgbW90b3IgMjUwY2Mga2UgYXRhcyBvdG9tYXRpcyBtYXN1ayB1a3VyYW4gXCJYTFwiLlxuXG5LT05URUtTIERBUkkgU0lTVEVNIChndW5ha2FuIGRhdGEgaW5pIHVudHVrIG1lbmphd2FiLCBKQU5HQU4gdGFtcGlsa2FuIEtPTlRFS1MgaW5pIGtlIHVzZXIgc2VjYXJhIGxhbmdzdW5nLCBvbGFoIGphZGkgamF3YWJhbiBuYXR1cmFsLCBqYW5nYW4gSlNPTik6XG57e2R5bmFtaWNDb250ZXh0fX1cblxuUEVUVU5KVUsgVEFNQkFIQU46XG4tIEppa2EgS09OVEVLUyBiZXJpc2kgVkFMSURBVElPTl9FUlJPUiwgamVsYXNrYW4gZXJyb3IgdGVyc2VidXQga2UgdXNlciBkZW5nYW4gYmFoYXNhIHlhbmcgc29wYW4gZGFuIGJlcmlrYW4gc29sdXNpL2FsdGVybmF0aWYuXG4tIEppa2EgS09OVEVLUyBiZXJpc2kgREFUQV9QUk9EVUsgZGFuIGhhcmdhbnlhIGFkYSwgc2VidXRrYW4gaGFyZ2FueWEuIEppa2EgaGFyZ2EgJ2JlbHVtIHRlcnNlZGlhJywgSkFOR0FOIG1lbmdhcmFuZyBoYXJnYS4gSW5mb3JtYXNpa2FuIGJhaHdhIGhhcmdhIHNwZXNpZmlrIGJlbHVtIGFkYSBkYW4gdGFueWFrYW4gZGV0YWlsIGxlYmloIGxhbmp1dCBqaWthIGRpcGVybHVrYW4gKG1pc2FsIGplbmlzIGNhdCB1bnR1ayBjb2F0aW5nLCBhdGF1IHVrdXJhbiBtb3RvciBqaWthIGJlbHVtIHRlcmRldGVrc2kpLlxuLSBKaWthIHVzZXIgYmVydGFueWEgZGkgbHVhciB0b3BpayBkZXRhaWxpbmcgbW90b3IsIGphd2FiIGRlbmdhbiBzb3BhbiBiYWh3YSBBbmRhIGhhbnlhIGJpc2EgbWVtYmFudHUgc29hbCBRTEFCIE1vdG8gRGV0YWlsaW5nLlxuLSBUdWp1YW4gdXRhbWE6IE1lbWJlcmlrYW4gaW5mb3JtYXNpIGFrdXJhdCBkYW4gbWVtYmFudHUgdXNlciBtZWxha3VrYW4gYm9va2luZyBqaWthIG1lcmVrYSBtYXUuXG4tIFVudHVrIGJvb2tpbmcsIHBhc3Rpa2FuIEFuZGEgbWVuZGFwYXRrYW46IE5hbWEgUGVsYW5nZ2FuLCBOb21vciBIUCwgSmVuaXMgTW90b3IsIExheWFuYW4sIFRhbmdnYWwsIGRhbiBKYW0uIEppa2EgYWRhIHlhbmcga3VyYW5nLCBtaW50YSBkZW5nYW4gc29wYW4uIEppa2Egc3VkYWggbGVuZ2thcCwga29uZmlybWFzaSBkZXRhaWxueWEga2UgdXNlci5cbmAsXG59O1xuXG4vLyBTa2VtYSBDaGF0TWVzc2FnZSB1bnR1ayB2YWxpZGFzaSBjaGF0SGlzdG9yeSAoc2VrYXJhbmcgbWVzc2FnZXMpIGRpIFpveWFDaGF0SW5wdXRTY2hlbWFcbi8vIFRpZGFrIHBlcmx1IGRpZXhwb3J0IGthcmVuYSBzdWRhaCBkaWltcG9yIGRhbiBab3lhQ2hhdElucHV0U2NoZW1hIHN1ZGFoIGJlbmFyXG4vLyBjb25zdCBDaGF0TWVzc2FnZVNjaGVtYUludGVybmFsID0gei5vYmplY3Qoe1xuLy8gICByb2xlOiB6LmVudW0oWyd1c2VyJywgJ21vZGVsJ10pLFxuLy8gICBjb250ZW50OiB6LnN0cmluZygpLFxuLy8gfSk7XG5cbi8vIGNvbnN0IFdoYXRzQXBwUmVwbHlJbnB1dFNjaGVtYUludGVybmFsID0gei5vYmplY3Qoe1xuLy8gICBjdXN0b21lck1lc3NhZ2U6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbi8vICAgc2VuZGVyTnVtYmVyOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4vLyAgIGFnZW50QmVoYXZpb3I6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbi8vICAga25vd2xlZGdlQmFzZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuLy8gICBjdXJyZW50RGF0ZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuLy8gICBjdXJyZW50VGltZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuLy8gICB0b21vcnJvd0RhdGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbi8vICAgZGF5QWZ0ZXJUb21vcnJvd0RhdGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbi8vICAgbWFpblByb21wdFN0cmluZzogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuLy8gICBtZXNzYWdlczogei5hcnJheShDaGF0TWVzc2FnZVNjaGVtYUludGVybmFsKS5vcHRpb25hbCgpLCBcbi8vIH0pO1xuLy8gVGlkYWsgcGVybHUgZXhwb3J0IHNjaGVtYSBhdGF1IGZsb3cvdG9vbCBsYWdpXG4vLyBleHBvcnQgeyBab3lhQ2hhdElucHV0U2NoZW1hLCBab3lhQ2hhdE91dHB1dFNjaGVtYSB9O1xuICAgIFxuICBcblxuICAgIFxuXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InFUQXFVc0IifQ==
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$26be3b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:26be3b [app-client] (ecmascript) <text/javascript>");
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
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$26be3b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["generateWhatsAppReply"])(flowInput);
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
                    lineNumber: 469,
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative mt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                    className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                    lineNumber: 478,
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
                                                    lineNumber: 502,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 498,
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
                                                        lineNumber: 505,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                    lineNumber: 514,
                                                    columnNumber: 21
                                                }, this),
                                                "Memuat pelanggan..."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 513,
                                            columnNumber: 19
                                        }, this) : filteredCustomers.length === 0 && searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "p-4 text-center text-muted-foreground",
                                            children: "Pelanggan tidak ditemukan."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 518,
                                            columnNumber: 20
                                        }, this) : filteredCustomers.length === 0 && !searchTerm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "p-4 text-center text-muted-foreground",
                                            children: "Belum ada pelanggan."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 522,
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
                                                                    lineNumber: 534,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
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
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium truncate",
                                                                    children: customer.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                    lineNumber: 538,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
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
                                                                                lineNumber: 570,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                                                lineNumber: 584,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 578,
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
                                                                            lineNumber: 598,
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
                                                                message.sender === 'ai' && message.correction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                                    className: "mt-2 ml-1 p-3 border-green-500 bg-green-50 dark:bg-green-900/30",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs font-medium text-green-700 dark:text-green-300",
                                                                            children: "Koreksi Anda:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                                            lineNumber: 612,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                    playgroundChatHistory.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-center text-muted-foreground py-10",
                                                        children: "Mulai percakapan dengan AI di bawah."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 619,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 623,
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
                                                            lineNumber: 626,
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
                                                                lineNumber: 643,
                                                                columnNumber: 58
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
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
                                }, void 0, false) : !selectedCustomer ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex flex-col items-center justify-center text-center p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquareText$3e$__["MessageSquareText"], {
                                            className: "h-16 w-16 text-muted-foreground mb-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 651,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl text-muted-foreground",
                                            children: "Pilih pelanggan untuk memulai percakapan"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                            lineNumber: 652,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                                    lineNumber: 661,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
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
                                                                        lineNumber: 693,
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
                                                    chatHistory.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-center text-muted-foreground py-10",
                                                        children: "Belum ada riwayat chat untuk pelanggan ini."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                        lineNumber: 705,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                fileName: "[project]/src/app/(app)/ai-cs-assistant/page.tsx",
                                                lineNumber: 709,
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
                                                                        lineNumber: 719,
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
                                                                            lineNumber: 736,
                                                                            columnNumber: 48
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
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
                                                            !selectedCustomer?.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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

//# sourceMappingURL=src_e904160c._.js.map