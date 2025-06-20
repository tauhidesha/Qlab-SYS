
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
import { cariSizeMotorTool } from '@/ai/tools/cari-size-motor-tool'; // Jika sub-flow juga perlu ini

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
        .replace("{{{customerQuery}}}", input.customerQuery)
        .replace("{{{knownMotorcycleName}}}", input.knownMotorcycleInfo?.name || "belum diketahui")
        .replace("{{{knownMotorcycleSize}}}", input.knownMotorcycleInfo?.size || "belum diketahui");
    
    console.log("[SUB-FLOW handleServiceInquiry] Menggunakan system prompt:", systemPromptForSubFlow.substring(0,200) + "...");

    const result = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      prompt: systemPromptForSubFlow, // System prompt untuk sub-flow
      // Tidak ada messages history di sini, karena sub-flow fokus pada tugas spesifik
      tools: [cariInfoLayananTool, cariSizeMotorTool], // Sub-flow ini punya akses ke toolnya sendiri
      toolChoice: 'auto',
      config: { temperature: 0.3 }, // Mungkin temperatur beda untuk sub-flow?
    });

    console.log("[SUB-FLOW handleServiceInquiry] Raw AI generate result:", JSON.stringify(result, null, 2));
    
    let responseText = result.text || "Maaf, Zoya lagi bingung soal layanan itu.";
    const toolRequest = result.toolRequest; // Akses sebagai properti

    if (toolRequest) {
      console.log("[SUB-FLOW handleServiceInquiry] AI requested a tool call:", JSON.stringify(toolRequest, null, 2));
      let toolOutputContent: any = "Tool tidak dikenal atau input salah.";

      if (toolRequest.name === 'cariInfoLayananTool' && toolRequest.input) {
        const toolOutput = await (cariInfoLayananTool.fn as Function)(toolRequest.input as CariInfoLayananInput);
        toolOutputContent = toolOutput;
      } else if (toolRequest.name === 'cariSizeMotor' && toolRequest.input) {
        // Jika sub-flow juga butuh cari ukuran motor, bisa ditangani di sini
        const toolOutput = await (cariSizeMotorTool.fn as Function)(toolRequest.input as any);
        toolOutputContent = toolOutput;
      }
      // ... (logika untuk tool lain jika ada)

      console.log(`[SUB-FLOW handleServiceInquiry] Tool ${toolRequest.name} output:`, JSON.stringify(toolOutputContent, null, 2));
      
      // Kirim kembali hasil tool ke AI di sub-flow ini untuk dirangkai jadi jawaban
      const modelResponseAfterTool = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: systemPromptForSubFlow, // Gunakan system prompt yang sama
        messages: [ // Bangun history sederhana untuk panggilan kedua ini
          { role: 'user', content: [{ text: `Original query: ${input.customerQuery} about ${input.serviceKeyword}` }] }, // Pesan dummy user
          result.message, // Pesan dari AI yang meminta tool
          {               // Pesan hasil dari tool
            role: 'tool',
            content: [{
              toolResponse: {
                name: toolRequest.name,
                output: toolOutputContent,
              }
            }]
          }
        ],
        config: { temperature: 0.3 },
      });
      responseText = modelResponseAfterTool.text || "Zoya dapet infonya, tapi bingung mau ngomong apa setelah pakai alat.";
    }

    console.log("[SUB-FLOW handleServiceInquiry] Final responseText:", responseText);
    return { responseText };
  }
);

// Wrapper function yang akan dipanggil oleh flow utama
export async function handleServiceInquiry(input: HandleServiceInquiryInput): Promise<HandleServiceInquiryOutput> {
  return serviceInquirySpecialistFlow(input);
}
