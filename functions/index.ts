// functions/index.ts
import {onRequest} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2";
import cors from "cors";

// Mengimpor dan menjalankan genkit.ts untuk memastikan objek 'ai' global terinisialisasi
// sebelum flow didefinisikan dan digunakan.
import '../src/ai/genkit'; 

// Mengimpor fungsi utama dan skema dari flow Genkit
import {
  generateWhatsAppReply,
  WhatsAppReplyInputSchema, // Pastikan ini diekspor dari flow file
  WhatsAppReplyOutputSchema // Digunakan untuk validasi output
} from '../src/ai/flows/cs-whatsapp-reply-flow';
import type {WhatsAppReplyInput} from '../src/ai/flows/cs-whatsapp-reply-flow'; // Tipe input

import {ZodError} from 'zod';

// Set opsi global untuk Cloud Functions jika diperlukan (misalnya region, memori)
setGlobalOptions({region: "asia-southeast1", memory: "1GiB", timeoutSeconds: 60});

// Membuat instance CORS handler
const corsHandler = cors({origin: true});

// Mengekspor HTTP Cloud Function
export const csWhatsAppReplyHttp = onRequest({timeoutSeconds: 90, invoker: 'public'}, (req, res) => {
  // Menggunakan CORS handler untuk semua request
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).json({success: false, error: 'Method Not Allowed'});
      return;
    }
    try {
      const inputData = req.body;

      // Validasi input menggunakan skema Zod
      const validationResult = WhatsAppReplyInputSchema.safeParse(inputData);
      if (!validationResult.success) {
        console.error("Input validation failed:", validationResult.error.format());
        res.status(400).json({success: false, error: 'Invalid input.', details: validationResult.error.format()});
        return;
      }
      
      // Memanggil fungsi inti dari Genkit flow
      const result = await generateWhatsAppReply(validationResult.data as WhatsAppReplyInput);
      
      // Validasi output (opsional tapi praktik yang baik)
      const outputValidation = WhatsAppReplyOutputSchema.safeParse(result);
      if (!outputValidation.success) {
          console.error("Output validation failed for csWhatsAppReplyHttp:", outputValidation.error.format());
          // Jika output dari AI tidak sesuai skema, kirim error atau raw output
          res.status(500).json({success:false, error: "AI output validation failed", details: outputValidation.error.format()});
          return;
      }
      
      res.status(200).json(outputValidation.data);

    } catch (error: any) {
      console.error("Error in csWhatsAppReplyHttp function:", error);
      let errorMessage = 'Internal Server Error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json({success: false, error: errorMessage});
    }
  });
});
