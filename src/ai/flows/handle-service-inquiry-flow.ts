
'use server';
/**
 * @fileOverview Sub-flow AI untuk menangani pertanyaan umum tentang jenis layanan.
 * Flow ini akan menjelaskan layanan, menggunakan cariInfoLayananTool untuk mendapatkan
 * daftar paket, dan merespons sesuai dengan informasi motor yang diketahui.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { DEFAULT_SERVICE_INQUIRY_SUB_FLOW_PROMPT } from '@/types/aiSettings';

// Import tool yang akan digunakan oleh sub-flow ini
import { cariInfoLayananTool, type CariInfoLayananInput, type CariInfoLayananOutput } from '@/ai/tools/cariInfoLayananTool';
import { cariSizeMotorTool, type CariSizeMotorInput, type CariSizeMotorOutput } from '@/ai/tools/cari-size-motor-tool';

// Schema input untuk sub-flow ini (TIDAK di-export, hanya tipenya)
const HandleServiceInquiryInputSchema = z.object({
  serviceKeyword: z.string().describe("Kata kunci atau kategori layanan yang ditanyakan pelanggan, mis. 'Coating', 'Cuci Motor'."),
  customerQuery: z.string().describe("Pesan asli dari pelanggan atau pertanyaan dari staf CS."),
  knownMotorcycleInfo: z.object({
    name: z.string(),
    size: z.string().optional(),
  }).optional().describe("Informasi motor pelanggan jika sudah diketahui."),
});
export type HandleServiceInquiryInput = z.infer<typeof HandleServiceInquiryInputSchema>;

// Schema output untuk sub-flow ini (TIDAK di-export, hanya tipenya)
const HandleServiceInquiryOutputSchema = z.object({
  responseText: z.string().describe("Jawaban lengkap yang dihasilkan oleh sub-flow ini untuk disampaikan ke pelanggan."),
});
export type HandleServiceInquiryOutput = z.infer<typeof HandleServiceInquiryOutputSchema>;


const serviceInquirySpecialistFlow = ai.defineFlow(
  {
    name: 'serviceInquirySpecialistFlow',
    inputSchema: HandleServiceInquiryInputSchema,
    outputSchema: HandleServiceInquiryOutputSchema,
  },
  async (input: HandleServiceInquiryInput): Promise<HandleServiceInquiryOutput> => {
    console.log("[SUB-FLOW handleServiceInquiry] Input:", JSON.stringify(input, null, 2));
    let responseText = "Maaf, ada sedikit kendala saat memproses permintaan layanan Anda.";

    // LANGSUNG PANGGIL FUNGSI TOOL
    const toolInputForLayanan: CariInfoLayananInput = { keyword: input.serviceKeyword };
    const toolOutputLayanan: CariInfoLayananOutput = await (cariInfoLayananTool.fn as Function)(toolInputForLayanan);
    console.log(`[SUB-FLOW handleServiceInquiry] Output LANGSUNG dari tool 'cariInfoLayananTool':`, JSON.stringify(toolOutputLayanan, null, 2));

    // --- Sekarang, proses hasil tool dengan prompt utama sub-flow ---
    const systemPromptForProcessing = DEFAULT_SERVICE_INQUIRY_SUB_FLOW_PROMPT
      .replace("{{{serviceKeyword}}}", input.serviceKeyword)
      .replace("{{{customerQuery}}}", input.customerQuery) // customerQuery masih ada di prompt untuk konteks
      .replace("{{{knownMotorcycleName}}}", input.knownMotorcycleInfo?.name || "belum diketahui")
      .replace("{{{knownMotorcycleSize}}}", input.knownMotorcycleInfo?.size || "belum diketahui");
    
    console.log("[SUB-FLOW handleServiceInquiry] Menggunakan system prompt untuk pemrosesan:", systemPromptForProcessing.substring(0,250) + "...");

    // Membuat histori "seolah-olah" AI meminta tool dan tool memberikan jawaban
    const messagesForProcessing = [
      { role: 'user' as const, content: [{ text: `Tolong info dong soal layanan ${input.serviceKeyword}. ${input.customerQuery}` }] },
      // Simulasi AI meminta tool (meskipun kita panggil langsung)
      {
        role: 'model' as const,
        content: [{
          toolRequest: {
            name: 'cariInfoLayananTool',
            input: toolInputForLayanan,
          }
        }]
      },
      // Hasil dari tool yang kita panggil langsung
      {
        role: 'tool' as const,
        content: [{
          toolResponse: {
            name: 'cariInfoLayananTool',
            output: toolOutputLayanan,
          }
        }]
      }
    ];
    
    const modelResponseAfterTool = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      prompt: systemPromptForProcessing,
      messages: messagesForProcessing,
      tools: [cariSizeMotorTool], // Sediakan tool cariSizeMotor jika AI perlu menanyakan ukuran
      toolChoice: 'auto',
      config: { temperature: 0.3 },
    });
    
    console.log("[SUB-FLOW handleServiceInquiry] Hasil panggilan AI (setelah tool dipanggil langsung):", JSON.stringify(modelResponseAfterTool, null, 2));
    responseText = modelResponseAfterTool.text || "Zoya dapet infonya, tapi bingung mau ngomong apa setelah pakai alat.";

    // Logika jika AI di tahap ini meminta tool cariSizeMotor
    if (modelResponseAfterTool.toolRequest && modelResponseAfterTool.toolRequest.name === 'cariSizeMotor') {
      const sizeToolRequest = modelResponseAfterTool.toolRequest;
      const sizeToolOutput = await (cariSizeMotorTool.fn as Function)(sizeToolRequest.input as CariSizeMotorInput);
      console.log(`[SUB-FLOW handleServiceInquiry] Output tool 'cariSizeMotor':`, JSON.stringify(sizeToolOutput, null, 2));

      const messagesAfterSizeTool = [
        ...messagesForProcessing,
        modelResponseAfterTool.message, // Pesan AI yang minta sizeTool
         { // Pesan hasil dari sizeTool
          role: 'tool' as const,
          content: [{
            toolResponse: {
              name: sizeToolRequest.name,
              output: sizeToolOutput,
            }
          }]
        }
      ];
      const finalResponseFromAI = await ai.generate({
          model: 'googleai/gemini-1.5-flash-latest',
          prompt: systemPromptForProcessing, // Gunakan prompt yang sama untuk merangkai jawaban akhir
          messages: messagesAfterSizeTool,
          config: {temperature: 0.3},
      });
      responseText = finalResponseFromAI.text || "Zoya udah cek ukuran motornya, tapi bingung mau lanjutin gimana."
    }

    console.log("[SUB-FLOW handleServiceInquiry] Final responseText:", responseText);
    return { responseText };
  }
);

// Wrapper function yang akan dipanggil oleh flow utama
export async function handleServiceInquiry(input: HandleServiceInquiryInput): Promise<HandleServiceInquiryOutput> {
  return serviceInquirySpecialistFlow(input);
}
