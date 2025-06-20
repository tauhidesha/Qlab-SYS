
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
import { cariSizeMotorTool, type CariSizeMotorInput, type CariSizeMotorOutput } from '@/ai/tools/cari-size-motor-tool'; // Jika sub-flow juga perlu ini

// Schema input untuk sub-flow ini (TIDAK di-export, hanya tipenya)
const HandleServiceInquiryInputSchema = z.object({
  serviceKeyword: z.string().describe("Kata kunci atau kategori layanan yang ditanyakan pelanggan, mis. 'Coating', 'Cuci Motor'."),
  customerQuery: z.string().describe("Pesan asli dari pelanggan atau pertanyaan dari staf CS."),
  knownMotorcycleInfo: z.object({
    name: z.string(),
    size: z.string().optional(),
  }).optional().describe("Informasi motor pelanggan jika sudah diketahui."),
  // Tambahkan field lain yang mungkin dibutuhkan sub-flow, misal currentDate
});
export type HandleServiceInquiryInput = z.infer<typeof HandleServiceInquiryInputSchema>;

// Schema output untuk sub-flow ini (TIDAK di-export, hanya tipenya)
const HandleServiceInquiryOutputSchema = z.object({
  responseText: z.string().describe("Jawaban lengkap yang dihasilkan oleh sub-flow ini untuk disampaikan ke pelanggan."),
  // Mungkin ada field output lain di masa depan, mis. layanan yang direkomendasikan
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

    const systemPromptForSubFlow = DEFAULT_SERVICE_INQUIRY_SUB_FLOW_PROMPT
        .replace("{{{serviceKeyword}}}", input.serviceKeyword)
        .replace("{{{customerQuery}}}", input.customerQuery) // customerQuery masih ada di prompt untuk konteks
        .replace("{{{knownMotorcycleName}}}", input.knownMotorcycleInfo?.name || "belum diketahui")
        .replace("{{{knownMotorcycleSize}}}", input.knownMotorcycleInfo?.size || "belum diketahui");
    
    console.log("[SUB-FLOW handleServiceInquiry] Menggunakan system prompt:", systemPromptForSubFlow.substring(0,250) + "...");

    // Panggilan AI pertama untuk memicu tool call
    const result = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      prompt: systemPromptForSubFlow, 
      messages: [ // Tambahkan pesan user simulasi untuk memicu AI
        { role: 'user', content: [{ text: `Tolong jelaskan dan cari info layanan tentang "${input.serviceKeyword}". Pertanyaan asli pelanggan adalah: "${input.customerQuery}"` }] }
      ],
      tools: [cariInfoLayananTool, cariSizeMotorTool], 
      toolChoice: 'auto', // Biarkan AI memilih tool, tapi prompt sudah lebih mengarahkan
      config: { temperature: 0.3 }, 
    });

    console.log("[SUB-FLOW handleServiceInquiry] Raw AI generate result (first call):", JSON.stringify(result, null, 2));
    
    let responseText = result.text || "Maaf, Zoya lagi bingung soal layanan itu.";
    const toolRequest = result.toolRequest;

    if (toolRequest) {
      console.log("[SUB-FLOW handleServiceInquiry] AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
      let toolOutputContent: any = "Tool tidak dikenal atau input salah.";
      let toolNameInvoked = toolRequest.name;

      if (toolRequest.name === 'cariInfoLayananTool' && toolRequest.input) {
        const toolOutput = await (cariInfoLayananTool.fn as Function)(toolRequest.input as CariInfoLayananInput);
        toolOutputContent = toolOutput;
      } else if (toolRequest.name === 'cariSizeMotor' && toolRequest.input) {
        const toolOutput = await (cariSizeMotorTool.fn as Function)(toolRequest.input as CariSizeMotorInput);
        toolOutputContent = toolOutput;
      }
      // ... (logika untuk tool lain jika ada)

      console.log(`[SUB-FLOW handleServiceInquiry] Tool ${toolNameInvoked} output:`, JSON.stringify(toolOutputContent, null, 2));
      
      // Kirim kembali hasil tool ke AI di sub-flow ini untuk dirangkai jadi jawaban
      // Prompt sistem yang sama digunakan, AI diharapkan melanjutkan berdasarkan instruksi di prompt
      // dan history percakapan yang sekarang berisi hasil tool.
      const modelResponseAfterTool = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: systemPromptForSubFlow, 
        messages: [ 
          { role: 'user', content: [{ text: `Tolong jelaskan dan cari info layanan tentang "${input.serviceKeyword}". Pertanyaan asli pelanggan adalah: "${input.customerQuery}"` }] }, // Pesan user awal
          result.message, // Pesan dari AI yang meminta tool
          {               // Pesan hasil dari tool
            role: 'tool',
            content: [{
              toolResponse: {
                name: toolNameInvoked,
                output: toolOutputContent,
              }
            }]
          }
        ],
        // Tidak perlu tools lagi di sini, karena tugasnya merangkai jawaban
        config: { temperature: 0.3 },
      });
      responseText = modelResponseAfterTool.text || "Zoya dapet infonya, tapi bingung mau ngomong apa setelah pakai alat.";
    } else if (responseText && responseText.trim() !== "") {
        console.log("[SUB-FLOW handleServiceInquiry] AI generated text directly (no tool call):", responseText);
    } else {
        console.error("[SUB-FLOW handleServiceInquiry] No tool request and no text output from AI.");
        responseText = "Maaf, Zoya lagi ada kendala internal buat cari info layanan itu.";
    }


    console.log("[SUB-FLOW handleServiceInquiry] Final responseText:", responseText);
    return { responseText };
  }
);

// Wrapper function yang akan dipanggil oleh flow utama
export async function handleServiceInquiry(input: HandleServiceInquiryInput): Promise<HandleServiceInquiryOutput> {
  return serviceInquirySpecialistFlow(input);
}

