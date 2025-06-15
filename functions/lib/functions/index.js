"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csWhatsAppReplyHttp = void 0;
// functions/index.ts
const https_1 = require("firebase-functions/v2/https");
const v2_1 = require("firebase-functions/v2");
const cors_1 = __importDefault(require("cors"));
// Mengimpor dan menjalankan genkit.ts untuk memastikan objek 'ai' global terinisialisasi
// sebelum flow didefinisikan dan digunakan.
require("../src/ai/genkit");
// Mengimpor fungsi utama dan skema dari flow Genkit
const cs_whatsapp_reply_flow_1 = require("../src/ai/flows/cs-whatsapp-reply-flow");
// Set opsi global untuk Cloud Functions jika diperlukan (misalnya region, memori)
(0, v2_1.setGlobalOptions)({ region: "asia-southeast1", memory: "1GiB", timeoutSeconds: 60 });
// Membuat instance CORS handler
const corsHandler = (0, cors_1.default)({ origin: true });
// Mengekspor HTTP Cloud Function
exports.csWhatsAppReplyHttp = (0, https_1.onRequest)({ timeoutSeconds: 90, invoker: 'public' }, (req, res) => {
    // Menggunakan CORS handler untuk semua request
    corsHandler(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).json({ success: false, error: 'Method Not Allowed' });
            return;
        }
        try {
            const inputData = req.body;
            // Validasi input menggunakan skema Zod
            const validationResult = cs_whatsapp_reply_flow_1.WhatsAppReplyInputSchema.safeParse(inputData);
            if (!validationResult.success) {
                console.error("Input validation failed:", validationResult.error.format());
                res.status(400).json({ success: false, error: 'Invalid input.', details: validationResult.error.format() });
                return;
            }
            // Memanggil fungsi inti dari Genkit flow
            const result = await (0, cs_whatsapp_reply_flow_1.generateWhatsAppReply)(validationResult.data);
            // Validasi output (opsional tapi praktik yang baik)
            const outputValidation = cs_whatsapp_reply_flow_1.WhatsAppReplyOutputSchema.safeParse(result);
            if (!outputValidation.success) {
                console.error("Output validation failed for csWhatsAppReplyHttp:", outputValidation.error.format());
                // Jika output dari AI tidak sesuai skema, kirim error atau raw output
                res.status(500).json({ success: false, error: "AI output validation failed", details: outputValidation.error.format() });
                return;
            }
            res.status(200).json(outputValidation.data);
        }
        catch (error) {
            console.error("Error in csWhatsAppReplyHttp function:", error);
            let errorMessage = 'Internal Server Error';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(500).json({ success: false, error: errorMessage });
        }
    });
});
//# sourceMappingURL=index.js.map