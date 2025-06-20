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
"[project]/src/ai/flows/data:ec7739 [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"4053660f6447b38038e1d20965a3df3cd57a2a7b51":"generateWhatsAppReply"},"src/ai/flows/cs-whatsapp-reply-flow.ts",""] */ __turbopack_context__.s({
    "generateWhatsAppReply": (()=>generateWhatsAppReply)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var generateWhatsAppReply = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("4053660f6447b38038e1d20965a3df3cd57a2a7b51", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "generateWhatsAppReply"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY3Mtd2hhdHNhcHAtcmVwbHktZmxvdy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcbi8qKlxuICogQGZpbGVPdmVydmlldyBGbG93IEFJIHV0YW1hIHVudHVrIFdoYXRzQXBwIEN1c3RvbWVyIFNlcnZpY2UgUUxBQi5cbiAqIFNla2FyYW5nIG1lbmFuZ2FuaSBzZW11YSBsb2dpa2EgbGF5YW5hbiBkYW4gbWVueWltcGFuIGtvbnRla3MgcGVyY2FrYXBhbiBkaSBGaXJlc3RvcmUuXG4gKi9cbmltcG9ydCB7IGFpIH0gZnJvbSAnQC9haS9nZW5raXQnO1xuaW1wb3J0ICogYXMgeiBmcm9tICd6b2QnO1xuaW1wb3J0IHsgZGIgfSBmcm9tICdAL2xpYi9maXJlYmFzZSc7XG5pbXBvcnQgeyBkb2MsIGdldERvYyBhcyBnZXRGaXJlc3RvcmVEb2MsIHNldERvYyBhcyBzZXRGaXJlc3RvcmVEb2MsIHNlcnZlclRpbWVzdGFtcCwgdHlwZSBUaW1lc3RhbXAgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xuaW1wb3J0IHsgREVGQVVMVF9NQUlOX1BST01QVF9aT1lBIH0gZnJvbSAnQC90eXBlcy9haVNldHRpbmdzJztcbmltcG9ydCB7IGZvcm1hdCwgYWRkRGF5cyB9IGZyb20gJ2RhdGUtZm5zJzsgLy8gSW1wb3J0IGRhdGUtZm5zXG5cbmltcG9ydCB7IGNhcmlTaXplTW90b3JUb29sLCB0eXBlIENhcmlTaXplTW90b3JJbnB1dCwgZmluZE1vdG9yU2l6ZSB9IGZyb20gJ0AvYWkvdG9vbHMvY2FyaS1zaXplLW1vdG9yLXRvb2wnO1xuaW1wb3J0IHsgZ2V0UHJvZHVjdFNlcnZpY2VEZXRhaWxzQnlOYW1lVG9vbCwgdHlwZSBQcm9kdWN0TG9va3VwSW5wdXQsIGZpbmRQcm9kdWN0U2VydmljZUJ5TmFtZSB9IGZyb20gJ0AvYWkvdG9vbHMvcHJvZHVjdExvb2t1cFRvb2wnO1xuaW1wb3J0IHsgZmluZExheWFuYW5CeUNhdGVnb3J5LCB0eXBlIENhcmlJbmZvTGF5YW5hbklucHV0LCB0eXBlIENhcmlJbmZvTGF5YW5hbk91dHB1dCB9IGZyb20gJ0AvYWkvdG9vbHMvY2FyaUluZm9MYXlhbmFuVG9vbCc7XG5pbXBvcnQgeyBjcmVhdGVCb29raW5nVG9vbCwgdHlwZSBDcmVhdGVCb29raW5nVG9vbElucHV0IH0gZnJvbSAnQC9haS90b29scy9jcmVhdGVCb29raW5nVG9vbCc7IC8vIEltcG9ydCB0b29sIGJvb2tpbmdcbmltcG9ydCB0eXBlIHsgUHJvZHVjdFNlcnZpY2VJbmZvIH0gZnJvbSAnQC90eXBlcy9haVRvb2xTY2hlbWFzJztcblxuLy8gU2tlbWEgaW50ZXJuYWwgdW50dWsgdmFsaWRhc2kgaW5wdXQgY2hhdCBoaXN0b3J5IGRpIGZsb3dcbmNvbnN0IENoYXRNZXNzYWdlU2NoZW1hSW50ZXJuYWwgPSB6Lm9iamVjdCh7XG4gIHJvbGU6IHouZW51bShbJ3VzZXInLCAnbW9kZWwnXSksXG4gIGNvbnRlbnQ6IHouc3RyaW5nKCksXG59KTtcbmV4cG9ydCB0eXBlIENoYXRNZXNzYWdlID0gei5pbmZlcjx0eXBlb2YgQ2hhdE1lc3NhZ2VTY2hlbWFJbnRlcm5hbD47XG5cbi8vIC0tLSBVc2VyIFNlc3Npb24gU3RydWN0dXJlIChpbiBGaXJlc3RvcmU6IHVzZXJBaVNlc3Npb25zL3tzZW5kZXJOdW1iZXJ9KSAtLS1cbmludGVyZmFjZSBVc2VyQWlTZXNzaW9uIHtcbiAgdXNlcklkOiBzdHJpbmc7XG4gIGFjdGl2ZVNwZWNpZmljU2VydmljZUlucXVpcnk/OiBzdHJpbmc7IC8vIE5hbWEgbGF5YW5hbiB5YW5nIHNlZGFuZyBha3RpZiBkaXRhbnlha2FuL2RpYmFoYXNcbiAgYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSWQ/OiBzdHJpbmc7ICAgIC8vIElEIGxheWFuYW4geWFuZyBzZWRhbmcgYWt0aWZcbiAga25vd25Nb3RvcmN5Y2xlTmFtZT86IHN0cmluZztcbiAga25vd25Nb3RvcmN5Y2xlU2l6ZT86IHN0cmluZztcbiAgLy8gVW50dWsgYm9va2luZ1xuICBwZW5kaW5nQm9va2luZ0RhdGU/OiBzdHJpbmc7IC8vIFlZWVktTU0tRERcbiAgcGVuZGluZ0Jvb2tpbmdUaW1lPzogc3RyaW5nOyAvLyBISDpNTVxuICBsYXN0QWlJbnRlcmFjdGlvblR5cGU/OlxuICAgIHwgJ2Fza2VkX2Zvcl9tb3Rvcl90eXBlX2Zvcl9zcGVjaWZpY19zZXJ2aWNlJ1xuICAgIHwgJ3Byb3ZpZGVkX3NwZWNpZmljX3NlcnZpY2VfZGV0YWlscydcbiAgICB8ICdwcm92aWRlZF9jYXRlZ29yeV9zZXJ2aWNlX2xpc3QnXG4gICAgfCAnYXNrZWRfZm9yX3NlcnZpY2VfYWZ0ZXJfbW90b3Jfc2l6ZSdcbiAgICB8ICdnZW5lcmFsX3Jlc3BvbnNlJ1xuICAgIHwgJ2luaXRpYWxfZ3JlZXRpbmcnXG4gICAgfCAnYXNrZWRfZm9yX3BhaW50X3R5cGVfZm9yX2NvYXRpbmcnXG4gICAgfCAncmVhZHlfZm9yX2Jvb2tpbmdfZGV0YWlscycgLy8gVXNlciBtZW5naW5kaWthc2lrYW4gbWF1IGJvb2tpbmdcbiAgICB8ICd3YWl0aW5nX2Zvcl9ib29raW5nX2RhdGV0aW1lJyAvLyBBSSBzdWRhaCB0YW55YSB0YW5nZ2FsICYgamFtXG4gICAgfCAnd2FpdGluZ19mb3JfYm9va2luZ19ub3RlcycgLy8gQUkgc3VkYWggdGFueWEgY2F0YXRhblxuICAgIHwgJ2Jvb2tpbmdfYXR0ZW1wdGVkJzsgLy8gQUkgc3VkYWggcGFuZ2dpbCB0b29sIGNyZWF0ZUJvb2tpbmdUb29sXG4gIGxhc3RVcGRhdGVkQXQ6IFRpbWVzdGFtcDtcbn1cblxuLy8gU2tlbWEgaW5wdXQgdXRhbWEgdW50dWsgWm95YUNoYXRGbG93IChkaWd1bmFrYW4gb2xlaCBVSSlcbmNvbnN0IFpveWFDaGF0SW5wdXRTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG1lc3NhZ2VzOiB6LmFycmF5KENoYXRNZXNzYWdlU2NoZW1hSW50ZXJuYWwpLm9wdGlvbmFsKCkuZGVzY3JpYmUoXCJSaXdheWF0IHBlcmNha2FwYW4gbGVuZ2thcCwgamlrYSBhZGEuXCIpLFxuICBjdXN0b21lck1lc3NhZ2U6IHouc3RyaW5nKCkubWluKDEsIFwiUGVzYW4gcGVsYW5nZ2FuIHRpZGFrIGJvbGVoIGtvc29uZy5cIikuZGVzY3JpYmUoXCJQZXNhbiB0ZXJiYXJ1IGRhcmkgY3VzdG9tZXIuXCIpLFxuICBzZW5kZXJOdW1iZXI6IHouc3RyaW5nKCkub3B0aW9uYWwoKS5kZXNjcmliZShcIk5vbW9yIFdoYXRzQXBwIHBlbmdpcmltIChXQUpJQiB1bnR1ayBzZXNzaW9uIGppa2EgbWF1IHBlcnNpc3RlbikuXCIpLFxuICBtYWluUHJvbXB0U3RyaW5nOiB6LnN0cmluZygpLm9wdGlvbmFsKCkuZGVzY3JpYmUoXCJTdHJpbmcgcHJvbXB0IHV0YW1hIHlhbmcgbXVuZ2tpbiBkaWtpcmltIGRhcmkgVUkgYXRhdSBkaWFtYmlsIGRhcmkgRmlyZXN0b3JlLlwiKSxcbiAgLy8gVGFuZ2dhbC10YW5nZ2FsIGluaSBha2FuIGRpaXNpIG9sZWggd3JhcHBlciBmdW5jdGlvblxuICBjdXJyZW50RGF0ZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBjdXJyZW50VGltZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICB0b21vcnJvd0RhdGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgZGF5QWZ0ZXJUb21vcnJvd0RhdGU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgLy8gSW5wdXQgZGFyaSBVSSB1bnR1ayBvdmVycmlkZS9zZWVkIHNlc2kuIFNlc2kgRmlyZXN0b3JlIGFrYW4gamFkaSBzdW1iZXIgdXRhbWEgamlrYSBhZGEuXG4gIGtub3duTW90b3JjeWNsZUluZm86IHoub2JqZWN0KHtcbiAgICBuYW1lOiB6LnN0cmluZygpLFxuICAgIHNpemU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSxcbiAgfSkub3B0aW9uYWwoKS5kZXNjcmliZShcIkluZm9ybWFzaSBtb3RvciBwZWxhbmdnYW4gamlrYSBzdWRhaCBkaWtldGFodWkgZGFyaSBpbnRlcmFrc2kgc2ViZWx1bW55YSBhdGF1IGRhdGFiYXNlLlwiKSxcbiAgYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeTogei5zdHJpbmcoKS5vcHRpb25hbCgpLmRlc2NyaWJlKFwiTGF5YW5hbiBzcGVzaWZpayB5YW5nIHNlZGFuZyBha3RpZiBkaXRhbnlha2FuIGppa2EgWm95YSBzZWJlbHVtbnlhIGJlcnRhbnlhIHRpcGUgbW90b3IgdW50dWsgbGF5YW5hbiBpbmkuXCIpLFxufSk7XG5leHBvcnQgdHlwZSBab3lhQ2hhdElucHV0ID0gei5pbmZlcjx0eXBlb2YgWm95YUNoYXRJbnB1dFNjaGVtYT47XG5cbi8vIFNjaGVtYSBvdXRwdXQgdW50dWsgd3JhcHBlciBmdW5jdGlvbiAoZGlndW5ha2FuIG9sZWggVUkpXG5jb25zdCBXaGF0c0FwcFJlcGx5T3V0cHV0U2NoZW1hID0gei5vYmplY3Qoe1xuICBzdWdnZXN0ZWRSZXBseTogei5zdHJpbmcoKS5kZXNjcmliZSgnU2FyYW4gYmFsYXNhbiB5YW5nIGRpaGFzaWxrYW4gQUkgdW50dWsgZGlraXJpbSBrZSBwZWxhbmdnYW4uJyksXG4gIHNlc3Npb25BY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5OiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHNlc3Npb25EZXRlY3RlZE1vdG9yY3ljbGVJbmZvOiB6Lm9iamVjdCh7IG5hbWU6IHouc3RyaW5nKCksIHNpemU6IHouc3RyaW5nKCkub3B0aW9uYWwoKSB9KS5vcHRpb25hbCgpLFxuICBzZXNzaW9uTGFzdEFpSW50ZXJhY3Rpb25UeXBlOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG59KTtcbmV4cG9ydCB0eXBlIFdoYXRzQXBwUmVwbHlPdXRwdXQgPSB6LmluZmVyPHR5cGVvZiBXaGF0c0FwcFJlcGx5T3V0cHV0U2NoZW1hPjtcblxuXG4vLyBGbG93IHV0YW1hXG5jb25zdCB6b3lhQ2hhdEZsb3cgPSBhaS5kZWZpbmVGbG93KFxuICB7XG4gICAgbmFtZTogJ3pveWFDaGF0RmxvdycsXG4gICAgaW5wdXRTY2hlbWE6IFpveWFDaGF0SW5wdXRTY2hlbWEsXG4gICAgb3V0cHV0U2NoZW1hOiBXaGF0c0FwcFJlcGx5T3V0cHV0U2NoZW1hLFxuICB9LFxuICBhc3luYyAoaW5wdXQ6IFpveWFDaGF0SW5wdXQpOiBQcm9taXNlPFdoYXRzQXBwUmVwbHlPdXRwdXQ+ID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIltNQUlOLUZMT1ddIHpveWFDaGF0RmxvdyBpbnB1dDpcIiwgSlNPTi5zdHJpbmdpZnkoaW5wdXQsIG51bGwsIDIpKTtcblxuICAgIGxldCBjdXN0b21lck1lc3NhZ2VUb1Byb2Nlc3MgPSBpbnB1dC5jdXN0b21lck1lc3NhZ2U7XG4gICAgbGV0IHN1Z2dlc3RlZFJlcGx5ID0gXCJNYWFmLCBab3lhIGxhZ2kgYmluZ3VuZyBuaWguXCI7XG4gICAgbGV0IHNlc3Npb25EYXRhVG9TYXZlOiBQYXJ0aWFsPFVzZXJBaVNlc3Npb24+ID0ge307XG4gICAgbGV0IGR5bmFtaWNDb250ZXh0RnJvbVByZVRvb2xDYWxsID0gXCJcIjtcblxuICAgIGlmICghY3VzdG9tZXJNZXNzYWdlVG9Qcm9jZXNzIHx8IGN1c3RvbWVyTWVzc2FnZVRvUHJvY2Vzcy50cmltKCkgPT09ICcnKSB7XG4gICAgICByZXR1cm4geyBzdWdnZXN0ZWRSZXBseTogXCJNYWFmLCBab3lhIHRpZGFrIG1lbmVyaW1hIHBlc2FuIHlhbmcgamVsYXMuXCIgfTtcbiAgICB9XG4gICAgaWYgKCFpbnB1dC5zZW5kZXJOdW1iZXIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW01BSU4tRkxPV10gV0FSTklORzogc2VuZGVyTnVtYmVyIHRpZGFrIGFkYSBkaSBpbnB1dC4gU2VzaSBGaXJlc3RvcmUgdGlkYWsgYWthbiBkaWd1bmFrYW4vZGlzaW1wYW4uIEtvbnRla3MgaGFueWEgZGFyaSBpbnB1dC5cIik7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcklkID0gaW5wdXQuc2VuZGVyTnVtYmVyIHx8ICdhbm9ueW1vdXNfdXNlcic7XG4gICAgY29uc3Qgc2Vzc2lvbkRvY1JlZiA9IGlucHV0LnNlbmRlck51bWJlciA/IGRvYyhkYiwgJ3VzZXJBaVNlc3Npb25zJywgdXNlcklkKSA6IG51bGw7XG4gICAgbGV0IGN1cnJlbnRTZXNzaW9uOiBQYXJ0aWFsPFVzZXJBaVNlc3Npb24+ID0ge307XG5cbiAgICBpZiAoc2Vzc2lvbkRvY1JlZikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblNuYXAgPSBhd2FpdCBnZXRGaXJlc3RvcmVEb2Moc2Vzc2lvbkRvY1JlZik7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvblNuYXAuZXhpc3RzKCkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2Vzc2lvbiA9IHNlc3Npb25TbmFwLmRhdGEoKSBhcyBVc2VyQWlTZXNzaW9uO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbTUFJTi1GTE9XXSBTZXNpIGRpdGVtdWthbiB1bnR1ayAke3VzZXJJZH06YCwgSlNPTi5zdHJpbmdpZnkoY3VycmVudFNlc3Npb24sIG51bGwsIDIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW01BSU4tRkxPV10gR2FnYWwgbWVtdWF0IHNlc2kgdW50dWsgJHt1c2VySWR9OmAsIGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGtub3duTW90b3JjeWNsZU5hbWUgPSBpbnB1dC5rbm93bk1vdG9yY3ljbGVJbmZvPy5uYW1lIHx8IGN1cnJlbnRTZXNzaW9uLmtub3duTW90b3JjeWNsZU5hbWUgfHwgXCJiZWx1bSBkaWtldGFodWlcIjtcbiAgICBsZXQga25vd25Nb3RvcmN5Y2xlU2l6ZSA9IGlucHV0Lmtub3duTW90b3JjeWNsZUluZm8/LnNpemUgfHwgY3VycmVudFNlc3Npb24ua25vd25Nb3RvcmN5Y2xlU2l6ZSB8fCBcImJlbHVtIGRpa2V0YWh1aVwiO1xuICAgIGxldCBhY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5ID0gaW5wdXQuYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSB8fCBjdXJyZW50U2Vzc2lvbi5hY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5IHx8IFwidGlkYWsgYWRhXCI7XG4gICAgbGV0IGFjdGl2ZVNwZWNpZmljU2VydmljZUlkID0gY3VycmVudFNlc3Npb24uYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSWQ7IC8vIEFtYmlsIGRhcmkgc2VzaVxuICAgIGxldCBsYXN0QWlJbnRlcmFjdGlvblR5cGUgPSBjdXJyZW50U2Vzc2lvbi5sYXN0QWlJbnRlcmFjdGlvblR5cGUgfHwgXCJpbml0aWFsX2dyZWV0aW5nXCI7XG4gICAgbGV0IHBlbmRpbmdCb29raW5nRGF0ZSA9IGN1cnJlbnRTZXNzaW9uLnBlbmRpbmdCb29raW5nRGF0ZTtcbiAgICBsZXQgcGVuZGluZ0Jvb2tpbmdUaW1lID0gY3VycmVudFNlc3Npb24ucGVuZGluZ0Jvb2tpbmdUaW1lO1xuXG5cbiAgICBjb25zdCBsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UgPSBjdXN0b21lck1lc3NhZ2VUb1Byb2Nlc3MudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBnZW5lcmFsU2VydmljZUtleXdvcmRzID0gW1wiY3VjaVwiLCBcImNvYXRpbmdcIiwgXCJwb2xlc1wiLCBcImRldGFpbGluZ1wiLCBcInJlcGFpbnRcIiwgXCJzZXJ2aXNcIiwgXCJsYXlhbmFuXCIsIFwicHJvZHVrXCIsIFwianVhbFwiLCBcImhhcmdhXCIsIFwiaW5mb1wiLCBcImthdGFsb2dcIiwgXCJib29raW5nXCIsIFwicGVzYW4gdGVtcGF0XCIsIFwiamFkd2FsXCJdO1xuICAgIGxldCBkZXRlY3RlZEdlbmVyYWxTZXJ2aWNlS2V5d29yZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgZm9yIChjb25zdCBrZXl3b3JkIG9mIGdlbmVyYWxTZXJ2aWNlS2V5d29yZHMpIHtcbiAgICAgICAgaWYgKGxvd2VyQ2FzZUN1c3RvbWVyTWVzc2FnZS5pbmNsdWRlcyhrZXl3b3JkKSkge1xuICAgICAgICAgICAgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBrZXl3b3JkO1xuICAgICAgICAgICAgaWYgKChrZXl3b3JkID09PSBcImN1Y2lcIiAmJiAobG93ZXJDYXNlQ3VzdG9tZXJNZXNzYWdlLmluY2x1ZGVzKFwiY3VjaSBtb3RvclwiKSB8fCBsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UuaW5jbHVkZXMoXCJueXVjaVwiKSkpICkgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBcImN1Y2lcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKGtleXdvcmQgPT09IFwiY29hdGluZ1wiICYmIChsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UuaW5jbHVkZXMoXCJjb2F0aW5nIG1vdG9yXCIpIHx8IGxvd2VyQ2FzZUN1c3RvbWVyTWVzc2FnZS5pbmNsdWRlcyhcImxhbWluYXRpbmdcIikpKSBkZXRlY3RlZEdlbmVyYWxTZXJ2aWNlS2V5d29yZCA9IFwiY29hdGluZ1wiO1xuICAgICAgICAgICAgZWxzZSBpZiAoa2V5d29yZCA9PT0gXCJwb2xlc1wiICYmIChsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UuaW5jbHVkZXMoXCJwb2xlcyBtb3RvclwiKSB8fCBsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UuaW5jbHVkZXMoXCJwb2xlcyBib2RpXCIpKSkgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBcInBvbGVzXCI7XG4gICAgICAgICAgICBlbHNlIGlmIChrZXl3b3JkID09PSBcImRldGFpbGluZ1wiICYmIGxvd2VyQ2FzZUN1c3RvbWVyTWVzc2FnZS5pbmNsdWRlcyhcImRldGFpbGluZyBtb3RvclwiKSkgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBcImRldGFpbGluZ1wiO1xuICAgICAgICAgICAgZWxzZSBpZiAoa2V5d29yZCA9PT0gXCJyZXBhaW50XCIgJiYgKGxvd2VyQ2FzZUN1c3RvbWVyTWVzc2FnZS5pbmNsdWRlcyhcInJlcGFpbnQgbW90b3JcIikgfHwgbG93ZXJDYXNlQ3VzdG9tZXJNZXNzYWdlLmluY2x1ZGVzKFwiY2F0IG1vdG9yXCIpKSkgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBcInJlcGFpbnRcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKGtleXdvcmQgPT09IFwiYm9va2luZ1wiIHx8IGtleXdvcmQgPT09IFwicGVzYW4gdGVtcGF0XCIgfHwga2V5d29yZCA9PT0gXCJqYWR3YWxcIikgZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmQgPSBcImJvb2tpbmdcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiW01BSU4tRkxPV10gRGV0ZWN0ZWQgZ2VuZXJhbCBzZXJ2aWNlIGtleXdvcmQgZnJvbSB1c2VyIG1lc3NhZ2U6XCIsIGRldGVjdGVkR2VuZXJhbFNlcnZpY2VLZXl3b3JkKTtcblxuICAgIGlmIChkZXRlY3RlZEdlbmVyYWxTZXJ2aWNlS2V5d29yZCAmJiBsYXN0QWlJbnRlcmFjdGlvblR5cGUgIT09ICdhc2tlZF9mb3JfbW90b3JfdHlwZV9mb3Jfc3BlY2lmaWNfc2VydmljZScgJiYgbGFzdEFpSW50ZXJhY3Rpb25UeXBlICE9PSAnYXNrZWRfZm9yX3BhaW50X3R5cGVfZm9yX2NvYXRpbmcnICYmICFsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UuaW5jbHVkZXMoXCJib29raW5nXCIpICYmICFsb3dlckNhc2VDdXN0b21lck1lc3NhZ2UuaW5jbHVkZXMoXCJwZXNhbiB0ZW1wYXRcIikgJiYgIWxvd2VyQ2FzZUN1c3RvbWVyTWVzc2FnZS5pbmNsdWRlcyhcImphZHdhbFwiKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgW01BSU4tRkxPV10gTWVsYWt1a2FuIHByZS1jYWxsIGZpbmRMYXlhbmFuQnlDYXRlZ29yeSB1bnR1ayBrZXl3b3JkOiBcIiR7ZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmR9XCJgKTtcbiAgICAgICAgY29uc3QgbGF5YW5hbkJ5Q2F0ZWdvcnlSZXN1bHQ6IENhcmlJbmZvTGF5YW5hbk91dHB1dCA9IGF3YWl0IGZpbmRMYXlhbmFuQnlDYXRlZ29yeSh7IGtleXdvcmQ6IGRldGVjdGVkR2VuZXJhbFNlcnZpY2VLZXl3b3JkIH0pO1xuICAgICAgICBpZiAobGF5YW5hbkJ5Q2F0ZWdvcnlSZXN1bHQgJiYgbGF5YW5hbkJ5Q2F0ZWdvcnlSZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZHluYW1pY0NvbnRleHRGcm9tUHJlVG9vbENhbGwgPSBgSW5mb3JtYXNpIGxheWFuYW4gdW50dWsga2F0ZWdvcmkgJyR7ZGV0ZWN0ZWRHZW5lcmFsU2VydmljZUtleXdvcmR9JyBkYXJpIHNpc3RlbTpcXG5gO1xuICAgICAgICAgICAgbGF5YW5hbkJ5Q2F0ZWdvcnlSZXN1bHQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBkeW5hbWljQ29udGV4dEZyb21QcmVUb29sQ2FsbCArPSBgLSAke2l0ZW0ubmFtZX06ICR7aXRlbS5kZXNjcmlwdGlvbiB8fCAnVGlkYWsgYWRhIGRlc2tyaXBzaS4nfSAoSGFyZ2EgZGFzYXI6IFJwICR7aXRlbS5wcmljZS50b0xvY2FsZVN0cmluZygnaWQtSUQnKX0sIEVzdGltYXNpOiAke2l0ZW0uZXN0aW1hdGVkRHVyYXRpb24gfHwgJ04vQSd9KVxcbmA7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udmFyaWFudHMgJiYgaXRlbS52YXJpYW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNDb250ZXh0RnJvbVByZVRvb2xDYWxsICs9IGAgIFZhcmlhbjogJHtpdGVtLnZhcmlhbnRzLm1hcCh2ID0+IGAke3YubmFtZX0gKFJwICR7di5wcmljZS50b0xvY2FsZVN0cmluZygnaWQtSUQnKX0pYCkuam9pbignLCAnKX1cXG5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbTUFJTi1GTE9XXSBQcmUtY2FsbCBmaW5kTGF5YW5hbkJ5Q2F0ZWdvcnkgYmVyaGFzaWwsIGRhdGEgZGltYXN1a2thbiBrZSBkeW5hbWljQ29udGV4dC5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkeW5hbWljQ29udGV4dEZyb21QcmVUb29sQ2FsbCA9IGBJbmZvcm1hc2kgbGF5YW5hbiB1bnR1ayBrYXRlZ29yaSAnJHtkZXRlY3RlZEdlbmVyYWxTZXJ2aWNlS2V5d29yZH0nIGRhcmkgc2lzdGVtOiBUaWRhayBkaXRlbXVrYW4uYDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW01BSU4tRkxPV10gUHJlLWNhbGwgZmluZExheWFuYW5CeUNhdGVnb3J5IHRpZGFrIG1lbmVtdWthbiBkYXRhLlwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgbWFpblByb21wdEZyb21TZXR0aW5ncyA9IGlucHV0Lm1haW5Qcm9tcHRTdHJpbmcgfHwgREVGQVVMVF9NQUlOX1BST01QVF9aT1lBO1xuXG4gICAgY29uc3QgZmluYWxTeXN0ZW1Qcm9tcHQgPSBtYWluUHJvbXB0RnJvbVNldHRpbmdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwie3t7U0VTU0lPTl9NT1RPUl9OQU1FfX19XCIsIGtub3duTW90b3JjeWNsZU5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwie3t7U0VTU0lPTl9NT1RPUl9TSVpFfX19XCIsIGtub3duTW90b3JjeWNsZVNpemUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwie3t7U0VTU0lPTl9BQ1RJVkVfU0VSVklDRX19fVwiLCBhY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e1NFU1NJT05fTEFTVF9BSV9JTlRFUkFDVElPTl9UWVBFfX19XCIsIGxhc3RBaUludGVyYWN0aW9uVHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e3tkZXRlY3RlZEdlbmVyYWxTZXJ2aWNlS2V5d29yZH19fVwiLCBkZXRlY3RlZEdlbmVyYWxTZXJ2aWNlS2V5d29yZCB8fCBcInRpZGFrIGFkYVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e2R5bmFtaWNDb250ZXh0fX19XCIsIGR5bmFtaWNDb250ZXh0RnJvbVByZVRvb2xDYWxsIHx8IGBJTkZPX1VNVU1fQkVOR0tFTDogUUxBQiBNb3RvIERldGFpbGluZywgSmwuIFN1a2FzZW5hbmcgViBOby4xQSwgQ2lrdXRyYSwgQmFuZHVuZy4gQnVrYSAwOTowMCAtIDIxOjAwIFdJQi4gRnVsbCBEZXRhaWxpbmcgaGFueWEgdW50dWsgY2F0IGdsb3NzeS4gQ29hdGluZyBiZWRhIGhhcmdhIHVudHVrIGRvZmYgJiBnbG9zc3kuYClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e3tjdXJyZW50RGF0ZX19fVwiLCBpbnB1dC5jdXJyZW50RGF0ZSB8fCBcInRpZGFrIGRpa2V0YWh1aVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e3RvbW9ycm93RGF0ZX19fVwiLCBpbnB1dC50b21vcnJvd0RhdGUgfHwgXCJ0aWRhayBkaWtldGFodWlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e3tkYXlBZnRlclRvbW9ycm93RGF0ZX19fVwiLCBpbnB1dC5kYXlBZnRlclRvbW9ycm93RGF0ZSB8fCBcInRpZGFrIGRpa2V0YWh1aVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e3NlbmRlck51bWJlcn19fVwiLCB1c2VySWQpIC8vIFVudHVrIHRvb2wgYm9va2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG5cblxuICAgIGNvbnN0IGhpc3RvcnlGb3JBSSA9IChpbnB1dC5tZXNzYWdlcyB8fCBbXSlcbiAgICAgIC5maWx0ZXIobXNnID0+IG1zZy5jb250ZW50ICYmIG1zZy5jb250ZW50LnRyaW0oKSAhPT0gJycpXG4gICAgICAubWFwKChtc2cpID0+ICh7XG4gICAgICAgIHJvbGU6IG1zZy5yb2xlLFxuICAgICAgICBjb250ZW50OiBbeyB0ZXh0OiBtc2cuY29udGVudCB9XSxcbiAgICB9KSk7XG5cbiAgICBjb25zdCBtZXNzYWdlc0ZvckFJID0gW1xuICAgICAgLi4uaGlzdG9yeUZvckFJLFxuICAgICAgeyByb2xlOiAndXNlcicgYXMgY29uc3QsIGNvbnRlbnQ6IFt7IHRleHQ6IGN1c3RvbWVyTWVzc2FnZVRvUHJvY2VzcyB9XSB9XG4gICAgXTtcblxuICAgIGNvbnNvbGUubG9nKGBbTUFJTi1GTE9XXSBDYWxsaW5nIE1BSU4gYWkuZ2VuZXJhdGUuIEhpc3RvcnkgTGVuZ3RoOiAke2hpc3RvcnlGb3JBSS5sZW5ndGh9LiBQcm9tcHQgc25pcHBldDogJHtmaW5hbFN5c3RlbVByb21wdC5zdWJzdHJpbmcoMCwgMzAwKX0uLi5gKTtcbiAgICAvLyBEZWZhdWx0IGludGVyYWN0aW9uIHR5cGVcbiAgICBzZXNzaW9uRGF0YVRvU2F2ZS5sYXN0QWlJbnRlcmFjdGlvblR5cGUgPSAnZ2VuZXJhbF9yZXNwb25zZSc7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWkuZ2VuZXJhdGUoe1xuICAgICAgICBtb2RlbDogJ2dvb2dsZWFpL2dlbWluaS0xLjUtZmxhc2gtbGF0ZXN0JywgLy8gTW9kZWwgZGlnYW50aSBrZSBHZW1pbmkgMS41IEZsYXNoXG4gICAgICAgIHByb21wdDogZmluYWxTeXN0ZW1Qcm9tcHQsXG4gICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlc0ZvckFJLFxuICAgICAgICB0b29sczogW2NhcmlTaXplTW90b3JUb29sLCBnZXRQcm9kdWN0U2VydmljZURldGFpbHNCeU5hbWVUb29sLCBmaW5kTGF5YW5hbkJ5Q2F0ZWdvcnksIGNyZWF0ZUJvb2tpbmdUb29sXSxcbiAgICAgICAgdG9vbENob2ljZTogJ2F1dG8nLFxuICAgICAgICBjb25maWc6IHsgXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZTogMC42LCBcbiAgICAgICAgICAgIHRvcFA6IDAuOSxcbiAgICAgICAgICAgIC8vIHJlc3BvbnNlTW9kYWxpdGllcyB0aWRhayBkaXBlcmx1a2FuIGxhZ2kgdW50dWsgbW9kZWwgdGVrcyBtdXJuaVxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiW01BSU4tRkxPV10gUmF3IE1BSU4gQUkgZ2VuZXJhdGUgcmVzdWx0OlwiLCBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpKTtcbiAgICAgIHN1Z2dlc3RlZFJlcGx5ID0gcmVzdWx0LnRleHQgfHwgXCJcIjtcbiAgICAgIGNvbnN0IHRvb2xSZXF1ZXN0ID0gcmVzdWx0LnRvb2xSZXF1ZXN0O1xuXG4gICAgICBsZXQgaW50ZXJhY3Rpb25UeXBlQWZ0ZXJUb29sOiBVc2VyQWlTZXNzaW9uWydsYXN0QWlJbnRlcmFjdGlvblR5cGUnXSA9IHNlc3Npb25EYXRhVG9TYXZlLmxhc3RBaUludGVyYWN0aW9uVHlwZSBhcyBVc2VyQWlTZXNzaW9uWydsYXN0QWlJbnRlcmFjdGlvblR5cGUnXTtcbiAgICAgIGxldCBhY3RpdmVTZXJ2aWNlQWZ0ZXJUb29sID0gYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeTtcbiAgICAgIGxldCBhY3RpdmVTZXJ2aWNlSWRBZnRlclRvb2wgPSBhY3RpdmVTcGVjaWZpY1NlcnZpY2VJZDtcblxuICAgICAgaWYgKHRvb2xSZXF1ZXN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW01BSU4tRkxPV10gTUFJTiBBSSByZXF1ZXN0ZWQgYSB0b29sIGNhbGw6XCIsIEpTT04uc3RyaW5naWZ5KHRvb2xSZXF1ZXN0LCBudWxsLCAyKSk7XG4gICAgICAgIGxldCB0b29sT3V0cHV0VG9SZWxheTogYW55ID0gXCJFcnJvcjogVG9vbCBvdXRwdXQgdGlkYWsgZGlzZXQuXCI7XG5cbiAgICAgICAgaWYgKHRvb2xSZXF1ZXN0Lm5hbWUgPT09ICdjYXJpU2l6ZU1vdG9yJyAmJiB0b29sUmVxdWVzdC5pbnB1dCkge1xuICAgICAgICAgIHRvb2xPdXRwdXRUb1JlbGF5ID0gYXdhaXQgZmluZE1vdG9yU2l6ZSh0b29sUmVxdWVzdC5pbnB1dCBhcyBDYXJpU2l6ZU1vdG9ySW5wdXQpO1xuICAgICAgICAgIGlmICh0b29sT3V0cHV0VG9SZWxheS5zdWNjZXNzICYmIHRvb2xPdXRwdXRUb1JlbGF5LnNpemUgJiYgdG9vbE91dHB1dFRvUmVsYXkudmVoaWNsZU1vZGVsRm91bmQpIHtcbiAgICAgICAgICAgICAga25vd25Nb3RvcmN5Y2xlTmFtZSA9IHRvb2xPdXRwdXRUb1JlbGF5LnZlaGljbGVNb2RlbEZvdW5kO1xuICAgICAgICAgICAgICBrbm93bk1vdG9yY3ljbGVTaXplID0gdG9vbE91dHB1dFRvUmVsYXkuc2l6ZTtcbiAgICAgICAgICAgICAgc2Vzc2lvbkRhdGFUb1NhdmUua25vd25Nb3RvcmN5Y2xlTmFtZSA9IGtub3duTW90b3JjeWNsZU5hbWU7XG4gICAgICAgICAgICAgIHNlc3Npb25EYXRhVG9TYXZlLmtub3duTW90b3JjeWNsZVNpemUgPSBrbm93bk1vdG9yY3ljbGVTaXplO1xuICAgICAgICAgICAgICBpZiAobGFzdEFpSW50ZXJhY3Rpb25UeXBlID09PSAnYXNrZWRfZm9yX21vdG9yX3R5cGVfZm9yX3NwZWNpZmljX3NlcnZpY2UnKSB7XG4gICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvblR5cGVBZnRlclRvb2wgPSAncHJvdmlkZWRfc3BlY2lmaWNfc2VydmljZV9kZXRhaWxzJztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uVHlwZUFmdGVyVG9vbCA9ICdhc2tlZF9mb3Jfc2VydmljZV9hZnRlcl9tb3Rvcl9zaXplJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGludGVyYWN0aW9uVHlwZUFmdGVyVG9vbCA9ICdhc2tlZF9mb3JfbW90b3JfdHlwZV9mb3Jfc3BlY2lmaWNfc2VydmljZSc7IC8vIEdhZ2FsLCB0ZXRhcCB0YW55YSBtb3RvclxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0b29sUmVxdWVzdC5uYW1lID09PSAnZ2V0UHJvZHVjdFNlcnZpY2VEZXRhaWxzQnlOYW1lVG9vbCcgJiYgdG9vbFJlcXVlc3QuaW5wdXQpIHtcbiAgICAgICAgICB0b29sT3V0cHV0VG9SZWxheSA9IGF3YWl0IGZpbmRQcm9kdWN0U2VydmljZUJ5TmFtZSh0b29sUmVxdWVzdC5pbnB1dCBhcyBQcm9kdWN0TG9va3VwSW5wdXQpO1xuICAgICAgICAgIGlmICh0b29sT3V0cHV0VG9SZWxheT8ubmFtZSkge1xuICAgICAgICAgICAgYWN0aXZlU2VydmljZUFmdGVyVG9vbCA9IHRvb2xPdXRwdXRUb1JlbGF5Lm5hbWU7XG4gICAgICAgICAgICBhY3RpdmVTZXJ2aWNlSWRBZnRlclRvb2wgPSB0b29sT3V0cHV0VG9SZWxheS5pZDsgLy8gU2ltcGFuIElEIGxheWFuYW5cbiAgICAgICAgICAgIGludGVyYWN0aW9uVHlwZUFmdGVyVG9vbCA9ICdwcm92aWRlZF9zcGVjaWZpY19zZXJ2aWNlX2RldGFpbHMnO1xuICAgICAgICAgICAgc2Vzc2lvbkRhdGFUb1NhdmUuYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSWQgPSBhY3RpdmVTZXJ2aWNlSWRBZnRlclRvb2w7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRvb2xSZXF1ZXN0Lm5hbWUgPT09ICdmaW5kTGF5YW5hbkJ5Q2F0ZWdvcnknICYmIHRvb2xSZXF1ZXN0LmlucHV0KSB7XG4gICAgICAgICAgdG9vbE91dHB1dFRvUmVsYXkgPSBhd2FpdCBmaW5kTGF5YW5hbkJ5Q2F0ZWdvcnkodG9vbFJlcXVlc3QuaW5wdXQgYXMgQ2FyaUluZm9MYXlhbmFuSW5wdXQpO1xuICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0b29sT3V0cHV0VG9SZWxheSkgJiYgdG9vbE91dHB1dFRvUmVsYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgIGludGVyYWN0aW9uVHlwZUFmdGVyVG9vbCA9ICdwcm92aWRlZF9jYXRlZ29yeV9zZXJ2aWNlX2xpc3QnO1xuICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodG9vbFJlcXVlc3QubmFtZSA9PT0gJ2NyZWF0ZUJvb2tpbmdUb29sJyAmJiB0b29sUmVxdWVzdC5pbnB1dCkge1xuICAgICAgICAgICAgY29uc3QgYm9va2luZ0lucHV0ID0gdG9vbFJlcXVlc3QuaW5wdXQgYXMgQ3JlYXRlQm9va2luZ1Rvb2xJbnB1dDtcbiAgICAgICAgICAgIC8vIFBhc3Rpa2FuIHNlcnZpY2VJZCBkaWFtYmlsIGRhcmkgc2VzaSBqaWthIHRpZGFrIGFkYSBkaSBpbnB1dCAobWVza2lwdW4gaGFydXNueWEgQUkgeWFuZyBzdXBwbHkpXG4gICAgICAgICAgICBpZiAoIWJvb2tpbmdJbnB1dC5zZXJ2aWNlSWQgJiYgYWN0aXZlU2VydmljZUlkQWZ0ZXJUb29sKSB7XG4gICAgICAgICAgICAgICAgYm9va2luZ0lucHV0LnNlcnZpY2VJZCA9IGFjdGl2ZVNlcnZpY2VJZEFmdGVyVG9vbDtcbiAgICAgICAgICAgICAgICBib29raW5nSW5wdXQuc2VydmljZU5hbWUgPSBhY3RpdmVTZXJ2aWNlQWZ0ZXJUb29sOyAvLyBTZXN1YWlrYW4ganVnYSBuYW1hbnlhXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b29sT3V0cHV0VG9SZWxheSA9IGF3YWl0IGNyZWF0ZUJvb2tpbmdUb29sLmZuIShib29raW5nSW5wdXQpOyAvLyBQYW5nZ2lsIHRvb2wgYm9va2luZ1xuICAgICAgICAgICAgaW50ZXJhY3Rpb25UeXBlQWZ0ZXJUb29sID0gJ2Jvb2tpbmdfYXR0ZW1wdGVkJztcbiAgICAgICAgICAgIGlmICgodG9vbE91dHB1dFRvUmVsYXkgYXMgYW55KS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVzZXQga29udGVrcyBib29raW5nIHNldGVsYWggYmVyaGFzaWxcbiAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5hY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHNlc3Npb25EYXRhVG9TYXZlLmFjdGl2ZVNwZWNpZmljU2VydmljZUlkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHNlc3Npb25EYXRhVG9TYXZlLnBlbmRpbmdCb29raW5nRGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5wZW5kaW5nQm9va2luZ1RpbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5sYXN0QWlJbnRlcmFjdGlvblR5cGUgPSBpbnRlcmFjdGlvblR5cGVBZnRlclRvb2w7XG4gICAgICAgIHNlc3Npb25EYXRhVG9TYXZlLmFjdGl2ZVNwZWNpZmljU2VydmljZUlucXVpcnkgPSBhY3RpdmVTZXJ2aWNlQWZ0ZXJUb29sO1xuXG4gICAgICAgIGlmICh0b29sT3V0cHV0VG9SZWxheSAhPT0gXCJFcnJvcjogVG9vbCBvdXRwdXQgdGlkYWsgZGlzZXQuXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbTUFJTi1GTE9XXSBPdXRwdXQgZnJvbSB0b29sICcke3Rvb2xSZXF1ZXN0Lm5hbWV9JzpgLCBKU09OLnN0cmluZ2lmeSh0b29sT3V0cHV0VG9SZWxheSwgbnVsbCwgMikpO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXNBZnRlclRvb2wgPSBbXG4gICAgICAgICAgICAgICAgLi4ubWVzc2FnZXNGb3JBSSxcbiAgICAgICAgICAgICAgICByZXN1bHQubWVzc2FnZSxcbiAgICAgICAgICAgICAgICB7IHJvbGU6ICd0b29sJyBhcyBjb25zdCwgY29udGVudDogW3sgdG9vbFJlc3BvbnNlOiB7IG5hbWU6IHRvb2xSZXF1ZXN0Lm5hbWUsIG91dHB1dDogdG9vbE91dHB1dFRvUmVsYXkgfX1dfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgY29uc3QgcHJvbXB0Rm9yU2Vjb25kQ2FsbCA9IG1haW5Qcm9tcHRGcm9tU2V0dGluZ3NcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e1NFU1NJT05fTU9UT1JfTkFNRX19fVwiLCBrbm93bk1vdG9yY3ljbGVOYW1lKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwie3t7U0VTU0lPTl9NT1RPUl9TSVpFfX19XCIsIGtub3duTW90b3JjeWNsZVNpemUpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e3tTRVNTSU9OX0FDVElWRV9TRVJWSUNFfX19XCIsIGFjdGl2ZVNlcnZpY2VBZnRlclRvb2wpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e3tTRVNTSU9OX0xBU1RfQUlfSU5URVJBQ1RJT05fVFlQRX19fVwiLCBpbnRlcmFjdGlvblR5cGVBZnRlclRvb2wpIC8vIEd1bmFrYW4gdGlwZSBpbnRlcmFrc2kgc2V0ZWxhaCB0b29sXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e3tkeW5hbWljQ29udGV4dH19fVwiLCBkeW5hbWljQ29udGV4dEZyb21QcmVUb29sQ2FsbCB8fCBcIlRpZGFrIGFkYSBpbmZvIHRhbWJhaGFuIGRhcmkgc2lzdGVtLlwiKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwie3t7Y3VycmVudERhdGV9fX1cIiwgaW5wdXQuY3VycmVudERhdGUgfHwgXCJ0aWRhayBkaWtldGFodWlcIilcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e3RvbW9ycm93RGF0ZX19fVwiLCBpbnB1dC50b21vcnJvd0RhdGUgfHwgXCJ0aWRhayBkaWtldGFodWlcIilcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcInt7e2RheUFmdGVyVG9tb3Jyb3dEYXRlfX19XCIsIGlucHV0LmRheUFmdGVyVG9tb3Jyb3dEYXRlIHx8IFwidGlkYWsgZGlrZXRhaHVpXCIpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7e3tzZW5kZXJOdW1iZXJ9fX1cIiwgdXNlcklkKTtcblxuICAgICAgICAgICAgY29uc3QgbW9kZWxSZXNwb25zZUFmdGVyVG9vbCA9IGF3YWl0IGFpLmdlbmVyYXRlKHtcbiAgICAgICAgICAgICAgICBtb2RlbDogJ2dvb2dsZWFpL2dlbWluaS0xLjUtZmxhc2gtbGF0ZXN0JywgLy8gTW9kZWwgZGlnYW50aSBrZSBHZW1pbmkgMS41IEZsYXNoXG4gICAgICAgICAgICAgICAgcHJvbXB0OiBwcm9tcHRGb3JTZWNvbmRDYWxsLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlc0FmdGVyVG9vbCxcbiAgICAgICAgICAgICAgICBjb25maWc6IHsgXG4gICAgICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiAwLjYsIFxuICAgICAgICAgICAgICAgICAgICB0b3BQOiAwLjksXG4gICAgICAgICAgICAgICAgICAgICAvLyByZXNwb25zZU1vZGFsaXRpZXMgdGlkYWsgZGlwZXJsdWthbiBsYWdpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgdG9vbHM6IFtjYXJpU2l6ZU1vdG9yVG9vbCwgZ2V0UHJvZHVjdFNlcnZpY2VEZXRhaWxzQnlOYW1lVG9vbCwgZmluZExheWFuYW5CeUNhdGVnb3J5LCBjcmVhdGVCb29raW5nVG9vbF0sXG4gICAgICAgICAgICAgICAgIHRvb2xDaG9pY2U6ICdhdXRvJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3VnZ2VzdGVkUmVwbHkgPSBtb2RlbFJlc3BvbnNlQWZ0ZXJUb29sLnRleHQgfHwgYFpveWEgZGFwZXQgaW5mbyBkYXJpIGFsYXQgJHt0b29sUmVxdWVzdC5uYW1lfSwgdGFwaSBiaW5ndW5nIG1hdSBuZ29tb25nIGFwYS5gO1xuICAgICAgICAgICAgIGlmIChtb2RlbFJlc3BvbnNlQWZ0ZXJUb29sLnRvb2xSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW01BSU4tRkxPV10gQUkgcmVxdWVzdGVkIGFub3RoZXIgdG9vbCBhZnRlciBhIHRvb2wgcmVzcG9uc2UuIFRoaXMgaXMgbm90IGRlZXBseSBoYW5kbGVkIHlldC4gUmV0dXJuaW5nIGN1cnJlbnQgdGV4dC5cIik7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIC8vIFVwZGF0ZSBsYXN0QWlJbnRlcmFjdGlvblR5cGUgYmFzZWQgb24gdGhlICpmaW5hbCogQUkgcmVzcG9uc2UncyBpbnRlbnQgKGlmIGRldGVjdGFibGUgd2l0aG91dCBhbm90aGVyIHRvb2wgY2FsbClcbiAgICAgICAgICAgICAvLyBUaGlzIHBhcnQgbmVlZHMgY2FyZWZ1bCBsb2dpYyBiYXNlZCBvbiBgc3VnZ2VzdGVkUmVwbHlgXG4gICAgICAgICAgICAgY29uc3QgbG93ZXJGaW5hbFJlcGx5ID0gc3VnZ2VzdGVkUmVwbHkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgaWYgKGxvd2VyRmluYWxSZXBseS5pbmNsdWRlcyhcInRhbmdnYWxcIikgJiYgbG93ZXJGaW5hbFJlcGx5LmluY2x1ZGVzKFwiamFtXCIpICYmIChpbnRlcmFjdGlvblR5cGVBZnRlclRvb2wgPT09ICdwcm92aWRlZF9zcGVjaWZpY19zZXJ2aWNlX2RldGFpbHMnIHx8IGludGVyYWN0aW9uVHlwZUFmdGVyVG9vbCA9PT0gJ3JlYWR5X2Zvcl9ib29raW5nX2RldGFpbHMnKSkge1xuICAgICAgICAgICAgICAgIHNlc3Npb25EYXRhVG9TYXZlLmxhc3RBaUludGVyYWN0aW9uVHlwZSA9ICd3YWl0aW5nX2Zvcl9ib29raW5nX2RhdGV0aW1lJztcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb3dlckZpbmFsUmVwbHkuaW5jbHVkZXMoXCJjYXRhdGFuIHRhbWJhaGFuXCIpICYmIGludGVyYWN0aW9uVHlwZUFmdGVyVG9vbCA9PT0gJ3dhaXRpbmdfZm9yX2Jvb2tpbmdfZGF0ZXRpbWUnKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbkRhdGFUb1NhdmUubGFzdEFpSW50ZXJhY3Rpb25UeXBlID0gJ3dhaXRpbmdfZm9yX2Jvb2tpbmdfbm90ZXMnO1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IEVrc3RyYWsgdGFuZ2dhbCBkYW4gamFtIGRhcmkgamF3YWJhbiBBSSBhdGF1IHBlc2FuIHVzZXIgc2ViZWx1bW55YSwgc2ltcGFuIGtlIHBlbmRpbmdCb29raW5nRGF0ZS9UaW1lXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzdWdnZXN0ZWRSZXBseSkgeyAvLyBObyB0b29sIHJlcXVlc3QsIEFJIGdhdmUgYSBkaXJlY3QgYW5zd2VyXG4gICAgICAgIGNvbnN0IGZpbmlzaFJlYXNvbiA9IHJlc3VsdC5maW5pc2hSZWFzb247XG4gICAgICAgIGNvbnNvbGUubG9nKGBbTUFJTi1GTE9XXSBNQUlOIEFJIEZpbmlzaCBSZWFzb24gKG5vIHRvb2wpOiAke2ZpbmlzaFJlYXNvbn1gKTtcbiAgICAgICAgaWYgKCFzdWdnZXN0ZWRSZXBseSAmJiBmaW5pc2hSZWFzb24gIT09IFwic3RvcFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbTUFJTi1GTE9XXSDinYwgTUFJTiBBSSBnZW5lcmF0aW9uIGZhaWxlZCBvciBubyB0ZXh0IG91dHB1dC4gRmluaXNoIFJlYXNvbjogJHtmaW5pc2hSZWFzb259LmApO1xuICAgICAgICAgICAgc3VnZ2VzdGVkUmVwbHkgPSBcIk1hYWYsIFpveWEgbGFnaSBhZ2FrIGJpbmd1bmcgbmloIGJvc2t1dS4gQ29iYSB0YW55YSBsYWdpIGRlbmdhbiBjYXJhIGxhaW4geWEuXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBsb3dlclJlcGx5ID0gc3VnZ2VzdGVkUmVwbHkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIC8vIEFuYWxpc2lzIGJhbGFzYW4gQUkgdW50dWsgbWVuZW50dWthbiBgbGFzdEFpSW50ZXJhY3Rpb25UeXBlYCB5YW5nIHBhbGluZyBwYXNcbiAgICAgICAgICAgIGlmIChsb3dlclJlcGx5LmluY2x1ZGVzKFwidGlwZSBtb3Rvcm55YSBhcGFcIikgfHwgbG93ZXJSZXBseS5pbmNsdWRlcyhcIm1vdG9ybnlhIGFwYVwiKSB8fCBsb3dlclJlcGx5LmluY2x1ZGVzKFwiamVuaXMgbW90b3JueWFcIikpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5sYXN0QWlJbnRlcmFjdGlvblR5cGUgPSAnYXNrZWRfZm9yX21vdG9yX3R5cGVfZm9yX3NwZWNpZmljX3NlcnZpY2UnO1xuICAgICAgICAgICAgICAgIC8vIEppa2EgQUkgbWVuYW55YWthbiBtb3RvciwgY29iYSBjYXJpIGxheWFuYW4gc3Blc2lmaWsgeWFuZyBtdW5na2luIGRpc2VidXQgdXNlclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VNZW50aW9uZWRJblVzZXIgPSBhd2FpdCBleHRyYWN0U2VydmljZU5hbWVGcm9tVXNlck1lc3NhZ2UoY3VzdG9tZXJNZXNzYWdlVG9Qcm9jZXNzLCBhd2FpdCBnZXRBbGxTZXJ2aWNlTmFtZXNBbmRJZHMoKSk7XG4gICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VNZW50aW9uZWRJblVzZXIgJiYgYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSA9PT0gXCJ0aWRhayBhZGFcIikge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5hY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5ID0gc2VydmljZU1lbnRpb25lZEluVXNlci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5hY3RpdmVTcGVjaWZpY1NlcnZpY2VJZCA9IHNlcnZpY2VNZW50aW9uZWRJblVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVNwZWNpZmljU2VydmljZUlucXVpcnkgPSBzZXJ2aWNlTWVudGlvbmVkSW5Vc2VyLm5hbWU7IC8vIFVwZGF0ZSBsb2NhbCB2YXJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSWQgPSBzZXJ2aWNlTWVudGlvbmVkSW5Vc2VyLmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobG93ZXJSZXBseS5pbmNsdWRlcyhcImNhdG55YSBnbG9zc3kgYXRhdSBkb2ZmXCIpICYmIGFjdGl2ZVNwZWNpZmljU2VydmljZUlucXVpcnkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhcImNvYXRpbmdcIikpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5sYXN0QWlJbnRlcmFjdGlvblR5cGUgPSAnYXNrZWRfZm9yX3BhaW50X3R5cGVfZm9yX2NvYXRpbmcnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgobG93ZXJSZXBseS5pbmNsdWRlcyhcIm1hdSBkaWJvb2tpbmdpblwiKSB8fCBsb3dlclJlcGx5LmluY2x1ZGVzKFwibWF1IGRpamFkd2FsaW5cIikpICYmIGFjdGl2ZVNwZWNpZmljU2VydmljZUlucXVpcnkgIT09IFwidGlkYWsgYWRhXCIpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5sYXN0QWlJbnRlcmFjdGlvblR5cGUgPSAncmVhZHlfZm9yX2Jvb2tpbmdfZGV0YWlscyc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxvd2VyUmVwbHkuaW5jbHVkZXMoXCJ0YW5nZ2FsXCIpICYmIGxvd2VyUmVwbHkuaW5jbHVkZXMoXCJqYW1cIikgJiYgKGxhc3RBaUludGVyYWN0aW9uVHlwZSA9PT0gJ3JlYWR5X2Zvcl9ib29raW5nX2RldGFpbHMnIHx8IGxhc3RBaUludGVyYWN0aW9uVHlwZSA9PT0gJ3Byb3ZpZGVkX3NwZWNpZmljX3NlcnZpY2VfZGV0YWlscycpKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbkRhdGFUb1NhdmUubGFzdEFpSW50ZXJhY3Rpb25UeXBlID0gJ3dhaXRpbmdfZm9yX2Jvb2tpbmdfZGF0ZXRpbWUnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsb3dlclJlcGx5LmluY2x1ZGVzKFwiY2F0YXRhbiB0YW1iYWhhblwiKSAmJiBsYXN0QWlJbnRlcmFjdGlvblR5cGUgPT09ICd3YWl0aW5nX2Zvcl9ib29raW5nX2RhdGV0aW1lJykge1xuICAgICAgICAgICAgICAgIHNlc3Npb25EYXRhVG9TYXZlLmxhc3RBaUludGVyYWN0aW9uVHlwZSA9ICd3YWl0aW5nX2Zvcl9ib29raW5nX25vdGVzJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobG93ZXJSZXBseS5pbmNsdWRlcyhcImJvb2tpbmcgbG8gdWRhaCB6b3lhIGNhdGV0XCIpIHx8IGxvd2VyUmVwbHkuaW5jbHVkZXMoXCJib29raW5nIGJlcmhhc2lsXCIpKSB7XG4gICAgICAgICAgICAgICAgIHNlc3Npb25EYXRhVG9TYXZlLmxhc3RBaUludGVyYWN0aW9uVHlwZSA9ICdib29raW5nX2F0dGVtcHRlZCc7IC8vIEF0YXUgJ2Jvb2tpbmdfY29uZmlybWVkJ1xuICAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5hY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5ID0gdW5kZWZpbmVkOyAvLyBSZXNldFxuICAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5hY3RpdmVTcGVjaWZpY1NlcnZpY2VJZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgc2Vzc2lvbkRhdGFUb1NhdmUucGVuZGluZ0Jvb2tpbmdEYXRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5wZW5kaW5nQm9va2luZ1RpbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxvd2VyUmVwbHkuaW5jbHVkZXMoXCJwaWxpaGFuIGxheWFuYW5cIikgfHwgbG93ZXJSZXBseS5pbmNsdWRlcyhcImRhZnRhciBsYXlhbmFuXCIpKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbkRhdGFUb1NhdmUubGFzdEFpSW50ZXJhY3Rpb25UeXBlID0gJ3Byb3ZpZGVkX2NhdGVnb3J5X3NlcnZpY2VfbGlzdCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxvd2VyUmVwbHkuaW5jbHVkZXMoXCJoYXJnYVwiKSAmJiAoa25vd25Nb3RvcmN5Y2xlTmFtZSAhPT0gXCJiZWx1bSBkaWtldGFodWlcIikpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5sYXN0QWlJbnRlcmFjdGlvblR5cGUgPSAncHJvdmlkZWRfc3BlY2lmaWNfc2VydmljZV9kZXRhaWxzJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobG93ZXJSZXBseS5pbmNsdWRlcyhcImhhbG9cIikgfHwgbG93ZXJSZXBseS5pbmNsdWRlcyhcImFkYSB5YW5nIGJpc2EgZGliYW50dVwiKSkge1xuICAgICAgICAgICAgICAgICBzZXNzaW9uRGF0YVRvU2F2ZS5sYXN0QWlJbnRlcmFjdGlvblR5cGUgPSAnaW5pdGlhbF9ncmVldGluZyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFtNQUlOLUZMT1ddIOKdjCBObyB0b29sIHJlcXVlc3QgYW5kIG5vIHRleHQgb3V0cHV0IGZyb20gTUFJTiBBSS4gUmVzdWx0OiAke0pTT04uc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgMil9YCk7XG4gICAgICAgIHN1Z2dlc3RlZFJlcGx5ID0gXCJXYWR1aCwgWm95YSBsYWdpIG5nZ2FrIGJpc2EgamF3YWIgbmloLiBDb2JhIGxhZ2kgeWEuXCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXNzaW9uRG9jUmVmKSB7XG4gICAgICAgICAgLy8gU2VsYWx1IHVwZGF0ZSBzZXNpIGRlbmdhbiBkYXRhIHRlcmJhcnUgamlrYSBhZGEgcGVydWJhaGFuXG4gICAgICAgICAgY29uc3QgZmluYWxTZXNzaW9uRGF0YVRvU2F2ZTogUGFydGlhbDxVc2VyQWlTZXNzaW9uPiA9IHtcbiAgICAgICAgICAgICAgdXNlcklkOiB1c2VySWQsXG4gICAgICAgICAgICAgIGtub3duTW90b3JjeWNsZU5hbWU6IChrbm93bk1vdG9yY3ljbGVOYW1lICE9PSBcImJlbHVtIGRpa2V0YWh1aVwiKSA/IGtub3duTW90b3JjeWNsZU5hbWUgOiBjdXJyZW50U2Vzc2lvbi5rbm93bk1vdG9yY3ljbGVOYW1lLCAvLyBQZXJ0YWhhbmthbiBqaWthIHRpZGFrIGRpdWJhaFxuICAgICAgICAgICAgICBrbm93bk1vdG9yY3ljbGVTaXplOiAoa25vd25Nb3RvcmN5Y2xlU2l6ZSAhPT0gXCJiZWx1bSBkaWtldGFodWlcIikgPyBrbm93bk1vdG9yY3ljbGVTaXplIDogY3VycmVudFNlc3Npb24ua25vd25Nb3RvcmN5Y2xlU2l6ZSxcbiAgICAgICAgICAgICAgYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeTogc2Vzc2lvbkRhdGFUb1NhdmUuYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSAhPT0gdW5kZWZpbmVkID8gc2Vzc2lvbkRhdGFUb1NhdmUuYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSA6IGFjdGl2ZVNwZWNpZmljU2VydmljZUlucXVpcnksXG4gICAgICAgICAgICAgIGFjdGl2ZVNwZWNpZmljU2VydmljZUlkOiBzZXNzaW9uRGF0YVRvU2F2ZS5hY3RpdmVTcGVjaWZpY1NlcnZpY2VJZCAhPT0gdW5kZWZpbmVkID8gc2Vzc2lvbkRhdGFUb1NhdmUuYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSWQgOiBhY3RpdmVTcGVjaWZpY1NlcnZpY2VJZCxcbiAgICAgICAgICAgICAgcGVuZGluZ0Jvb2tpbmdEYXRlOiBzZXNzaW9uRGF0YVRvU2F2ZS5wZW5kaW5nQm9va2luZ0RhdGUgIT09IHVuZGVmaW5lZCA/IHNlc3Npb25EYXRhVG9TYXZlLnBlbmRpbmdCb29raW5nRGF0ZSA6IHBlbmRpbmdCb29raW5nRGF0ZSxcbiAgICAgICAgICAgICAgcGVuZGluZ0Jvb2tpbmdUaW1lOiBzZXNzaW9uRGF0YVRvU2F2ZS5wZW5kaW5nQm9va2luZ1RpbWUgIT09IHVuZGVmaW5lZCA/IHNlc3Npb25EYXRhVG9TYXZlLnBlbmRpbmdCb29raW5nVGltZSA6IHBlbmRpbmdCb29raW5nVGltZSxcbiAgICAgICAgICAgICAgbGFzdEFpSW50ZXJhY3Rpb25UeXBlOiBzZXNzaW9uRGF0YVRvU2F2ZS5sYXN0QWlJbnRlcmFjdGlvblR5cGUgfHwgbGFzdEFpSW50ZXJhY3Rpb25UeXBlLFxuICAgICAgICAgICAgICBsYXN0VXBkYXRlZEF0OiBzZXJ2ZXJUaW1lc3RhbXAoKSBhcyBUaW1lc3RhbXAsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyBIYXB1cyBmaWVsZCB5YW5nIHVuZGVmaW5lZCBhZ2FyIHRpZGFrIG1lbmltcGEgZGVuZ2FuIHVuZGVmaW5lZCBkaSBGaXJlc3RvcmVcbiAgICAgICAgICBPYmplY3Qua2V5cyhmaW5hbFNlc3Npb25EYXRhVG9TYXZlKS5mb3JFYWNoKGtleVN0ciA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBrZXlTdHIgYXMga2V5b2YgUGFydGlhbDxVc2VyQWlTZXNzaW9uPjtcbiAgICAgICAgICAgIGlmIChmaW5hbFNlc3Npb25EYXRhVG9TYXZlW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBkZWxldGUgZmluYWxTZXNzaW9uRGF0YVRvU2F2ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhgW01BSU4tRkxPV10gTWVueWltcGFuIHNlc2kgdW50dWsgJHt1c2VySWR9OmAsIEpTT04uc3RyaW5naWZ5KGZpbmFsU2Vzc2lvbkRhdGFUb1NhdmUsIG51bGwsIDIpKTtcbiAgICAgICAgICBhd2FpdCBzZXRGaXJlc3RvcmVEb2Moc2Vzc2lvbkRvY1JlZiwgZmluYWxTZXNzaW9uRGF0YVRvU2F2ZSwgeyBtZXJnZTogdHJ1ZSB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VnZ2VzdGVkUmVwbHksXG4gICAgICAgIHNlc3Npb25BY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5OiBzZXNzaW9uRGF0YVRvU2F2ZS5hY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5ICE9PSB1bmRlZmluZWQgPyBzZXNzaW9uRGF0YVRvU2F2ZS5hY3RpdmVTcGVjaWZpY1NlcnZpY2VJbnF1aXJ5IDogYWN0aXZlU3BlY2lmaWNTZXJ2aWNlSW5xdWlyeSxcbiAgICAgICAgc2Vzc2lvbkRldGVjdGVkTW90b3JjeWNsZUluZm86IChrbm93bk1vdG9yY3ljbGVOYW1lICE9PSBcImJlbHVtIGRpa2V0YWh1aVwiKSA/IHsgbmFtZToga25vd25Nb3RvcmN5Y2xlTmFtZSwgc2l6ZTogKGtub3duTW90b3JjeWNsZVNpemUgIT09IFwiYmVsdW0gZGlrZXRhaHVpXCIpID8ga25vd25Nb3RvcmN5Y2xlU2l6ZSA6IHVuZGVmaW5lZCB9IDogdW5kZWZpbmVkLFxuICAgICAgICBzZXNzaW9uTGFzdEFpSW50ZXJhY3Rpb25UeXBlOiBzZXNzaW9uRGF0YVRvU2F2ZS5sYXN0QWlJbnRlcmFjdGlvblR5cGUgfHwgbGFzdEFpSW50ZXJhY3Rpb25UeXBlLFxuICAgICAgfTtcblxuICAgIH0gY2F0Y2ggKGZsb3dFcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbTUFJTi1GTE9XXSDinYwgQ3JpdGljYWwgZXJyb3IgZGFsYW0gTUFJTiB6b3lhQ2hhdEZsb3c6XCIsIGZsb3dFcnJvcik7XG4gICAgICAgIGlmIChmbG93RXJyb3IuY2F1c2UpIGNvbnNvbGUuZXJyb3IoXCJbTUFJTi1GTE9XXSBFcnJvciBDYXVzZTpcIiwgSlNPTi5zdHJpbmdpZnkoZmxvd0Vycm9yLmNhdXNlLCBudWxsLCAyKSk7XG4gICAgICAgIHJldHVybiB7IHN1Z2dlc3RlZFJlcGx5OiBgV2FkdWgsIFpveWEgbGFnaSBlcnJvciBuaWgsIGJvc2t1dS4gQ29iYSB0YW55YSBsYWdpIG5hbnRpIHlhLiAoRXJyb3I6ICR7Zmxvd0Vycm9yLm1lc3NhZ2UgfHwgJ0tlc2FsYWhhbiBpbnRlcm5hbCd9KWAgfTtcbiAgICB9XG4gIH1cbik7XG5cbi8vIEhlbHBlciBGdW5jdGlvbnNcbmFzeW5jIGZ1bmN0aW9uIGdldEFsbFNlcnZpY2VOYW1lc0FuZElkcygpOiBQcm9taXNlPHtpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmd9W10+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCBmaW5kTGF5YW5hbkJ5Q2F0ZWdvcnkoeyBrZXl3b3JkOiBcIlwiIH0pOyAvLyBLZXl3b3JkIFwiXCIgdW50dWsgc2VtdWEgbGF5YW5hblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICAgIHJldHVybiBpdGVtcy5tYXAoaSA9PiAoe2lkOiBpLmlkLCBuYW1lOiBpLm5hbWUgfSkpLmZpbHRlcihpID0+IGkuaWQgJiYgaS5uYW1lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbXTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gZ2V0QWxsU2VydmljZU5hbWVzQW5kSWRzOlwiLCBlKTtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RTZXJ2aWNlTmFtZUZyb21Vc2VyTWVzc2FnZSh1c2VyTWVzc2FnZTogc3RyaW5nLCBzZXJ2aWNlczoge2lkOiBzdHJpbmcsIG5hbWU6IHN0cmluZ31bXSk6IFByb21pc2U8e2lkOiBzdHJpbmcsIG5hbWU6IHN0cmluZ30gfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBsb3dlclVzZXJNZXNzYWdlID0gdXNlck1lc3NhZ2UudG9Mb3dlckNhc2UoKTtcbiAgICAvLyBVcnV0a2FuIGJlcmRhc2Fya2FuIHBhbmphbmcgbmFtYSwgZGFyaSB0ZXJwYW5qYW5nLCB1bnR1ayBtZW5naGluZGFyaSBwYXJ0aWFsIG1hdGNoIHlhbmcgc2FsYWggKG1pcy4gXCJDdWNpXCIgdnMgXCJDdWNpIFByZW1pdW1cIilcbiAgICBjb25zdCBzb3J0ZWRTZXJ2aWNlcyA9IFsuLi5zZXJ2aWNlc10uc29ydCgoYSxiKSA9PiBiLm5hbWUubGVuZ3RoIC0gYS5uYW1lLmxlbmd0aCk7XG4gICAgZm9yIChjb25zdCBzZXJ2aWNlIG9mIHNvcnRlZFNlcnZpY2VzKSB7XG4gICAgICAgIGlmIChzZXJ2aWNlLm5hbWUgJiYgbG93ZXJVc2VyTWVzc2FnZS5pbmNsdWRlcyhzZXJ2aWNlLm5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8vIFdyYXBwZXIgZnVuY3Rpb24geWFuZyBha2FuIGRpcGFuZ2dpbCBvbGVoIFVJIGF0YXUgQVBJIHJvdXRlXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVXaGF0c0FwcFJlcGx5KGlucHV0OiBab3lhQ2hhdElucHV0KTogUHJvbWlzZTxXaGF0c0FwcFJlcGx5T3V0cHV0PiB7XG4gIGNvbnNvbGUubG9nKFwiW01BSU4tRkxPVyBXcmFwcGVyXSBnZW5lcmF0ZVdoYXRzQXBwUmVwbHkgaW5wdXQ6XCIsIEpTT04uc3RyaW5naWZ5KGlucHV0LCBudWxsLCAyKSk7XG5cbiAgbGV0IG1haW5Qcm9tcHRUb1VzZSA9IGlucHV0Lm1haW5Qcm9tcHRTdHJpbmc7XG5cbiAgaWYgKCFtYWluUHJvbXB0VG9Vc2UgJiYgZGIgJiYgaW5wdXQuc2VuZGVyTnVtYmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NEb2NSZWYgPSBkb2MoZGIsICdhcHBTZXR0aW5ncycsICdhaUFnZW50Q29uZmlnJyk7XG4gICAgICAgIGNvbnN0IGRvY1NuYXAgPSBhd2FpdCBnZXRGaXJlc3RvcmVEb2Moc2V0dGluZ3NEb2NSZWYpO1xuICAgICAgICBpZiAoZG9jU25hcC5leGlzdHMoKSAmJiBkb2NTbmFwLmRhdGEoKT8ubWFpblByb21wdCkge1xuICAgICAgICAgIG1haW5Qcm9tcHRUb1VzZSA9IGRvY1NuYXAuZGF0YSgpLm1haW5Qcm9tcHQ7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJbTUFJTi1GTE9XIFdyYXBwZXJdOiBVc2luZyBtYWluUHJvbXB0U3RyaW5nIGZyb20gRmlyZXN0b3JlLlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYWluUHJvbXB0VG9Vc2UgPSBERUZBVUxUX01BSU5fUFJPTVBUX1pPWUE7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJbTUFJTi1GTE9XIFdyYXBwZXJdOiBVc2luZyBERUZBVUxUX01BSU5fUFJPTVBUX1pPWUEgKEZpcmVzdG9yZSBkb2Mgbm90IGZvdW5kIG9yIG5vIG1haW5Qcm9tcHQpLlwiKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiW01BSU4tRkxPVyBXcmFwcGVyXTogRXJyb3IgZmV0Y2hpbmcgbWFpblByb21wdCBmcm9tIEZpcmVzdG9yZS4gVXNpbmcgZGVmYXVsdC5cIiwgZXJyb3IpO1xuICAgICAgbWFpblByb21wdFRvVXNlID0gREVGQVVMVF9NQUlOX1BST01QVF9aT1lBO1xuICAgIH1cbiAgfSBlbHNlIGlmICghbWFpblByb21wdFRvVXNlKSB7XG4gICAgIG1haW5Qcm9tcHRUb1VzZSA9IERFRkFVTFRfTUFJTl9QUk9NUFRfWk9ZQTtcbiAgICAgY29uc29sZS5sb2coXCJbTUFJTi1GTE9XIFdyYXBwZXJdOiBVc2luZyBERUZBVUxUX01BSU5fUFJPTVBUX1pPWUEgKGRiIG9yIHNlbmRlck51bWJlciBub3QgYXZhaWxhYmxlIGZvciBGaXJlc3RvcmUgZmV0Y2gsIG9yIHByb21wdCBhbHJlYWR5IHByb3ZpZGVkKS5cIik7XG4gIH0gZWxzZSB7XG4gICAgIGNvbnNvbGUubG9nKFwiW01BSU4tRkxPVyBXcmFwcGVyXTogVXNpbmcgbWFpblByb21wdFN0cmluZyBkaXJlY3RseSBmcm9tIGlucHV0LlwiKTtcbiAgfVxuXG4gIC8vIFRhbWJhaGthbiB0YW5nZ2FsLXRhbmdnYWwga2UgaW5wdXQgZmxvd1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IGZsb3dJbnB1dDogWm95YUNoYXRJbnB1dCA9IHtcbiAgICAuLi5pbnB1dCxcbiAgICBtZXNzYWdlczogaW5wdXQubWVzc2FnZXMgfHwgW10sXG4gICAgbWFpblByb21wdFN0cmluZzogbWFpblByb21wdFRvVXNlLFxuICAgIGN1cnJlbnREYXRlOiBmb3JtYXQodG9kYXksICd5eXl5LU1NLWRkJyksXG4gICAgY3VycmVudFRpbWU6IGZvcm1hdCh0b2RheSwgJ0hIOm1tJyksXG4gICAgdG9tb3Jyb3dEYXRlOiBmb3JtYXQoYWRkRGF5cyh0b2RheSwgMSksICd5eXl5LU1NLWRkJyksXG4gICAgZGF5QWZ0ZXJUb21vcnJvd0RhdGU6IGZvcm1hdChhZGREYXlzKHRvZGF5LCAyKSwgJ3l5eXktTU0tZGQnKSxcbiAgfTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHpveWFDaGF0RmxvdyhmbG93SW5wdXQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiW01BSU4tRkxPVyBXcmFwcGVyXSBFcnJvciBydW5uaW5nIHpveWFDaGF0RmxvdzpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Z2dlc3RlZFJlcGx5OiBgTWFhZiwgWm95YSBzZWRhbmcgYWRhIGtlbmRhbGEgdGVrbmlzLiAoJHtlcnJvci5tZXNzYWdlIHx8ICdUaWRhayBkaWtldGFodWknfSlgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoicVRBOGFzQiJ9
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$ec7739__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:ec7739 [app-client] (ecmascript) <text/javascript>");
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
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$ec7739__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["generateWhatsAppReply"])(flowInput);
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

//# sourceMappingURL=src_0c76d77c._.js.map