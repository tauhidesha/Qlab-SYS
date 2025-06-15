"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ai = void 0;
const genkit_1 = require("genkit");
const googleai_1 = require("@genkit-ai/googleai"); // Impor googleAI dari paket yang benar
exports.ai = (0, genkit_1.genkit)({
    plugins: [
        (0, googleai_1.googleAI)(),
    ],
    model: 'googleai/gemini-1.5-flash-latest', // Mengatur model default
    telemetry: {
        instrumentation: {
            llm: true,
        },
    },
});
//# sourceMappingURL=genkit.js.map