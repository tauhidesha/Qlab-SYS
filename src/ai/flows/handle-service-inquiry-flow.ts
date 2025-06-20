'use server';
/**
 * @fileOverview Sub-flow to handle detailed service inquiries.
 * Explains a service, lists packages using cariInfoLayananTool, and asks clarifying questions.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { cariInfoLayananTool, type CariInfoLayananInput, type CariInfoLayananOutput } from '@/ai/tools/cariInfoLayananTool'; // Assuming tools are now modular
import { DEFAULT_MAIN_PROMPT_ZOYA_SERVICE_INQUIRY_SUB_FLOW } from '@/types/aiSettings'; // We'll create this new prompt constant

// Input schema for this sub-flow
export const HandleServiceInquiryInputSchema = z.object({
  serviceKeyword: z.string().describe("Kata kunci layanan yang ditanyakan user, mis. 'coating', 'detailing'."),
  customerQuery: z.string().describe("Pesan asli dari pelanggan, untuk konteks."),
  knownMotorcycleInfo: z.object({
    name: z.string(),
    size: z.string().optional(),
  }).optional().describe("Informasi motor pelanggan jika sudah diketahui (nama, ukuran)."),
});
export type HandleServiceInquiryInput = z.infer<typeof HandleServiceInquiryInputSchema>;

// Output schema for this sub-flow
export const HandleServiceInquiryOutputSchema = z.object({
  responseText: z.string().describe("Teks balasan yang dihasilkan oleh sub-flow ini."),
});
export type HandleServiceInquiryOutput = z.infer<typeof HandleServiceInquiryOutputSchema>;

// The sub-flow definition
const handleServiceInquiryFlowInternal = ai.defineFlow(
  {
    name: 'handleServiceInquiryFlowInternal',
    inputSchema: HandleServiceInquiryInputSchema,
    outputSchema: HandleServiceInquiryOutputSchema,
  },
  async (input) => {
    console.log("[Sub-Flow:handleServiceInquiry] Input:", input);

    // Construct the prompt specifically for this sub-flow's task
    // This prompt will guide the AI on how to use the serviceKeyword, customerQuery,
    // knownMotorcycleInfo, and the cariInfoLayananTool.
    let systemPrompt = DEFAULT_MAIN_PROMPT_ZOYA_SERVICE_INQUIRY_SUB_FLOW
        .replace("{{{serviceKeyword}}}", input.serviceKeyword)
        .replace("{{{customerQuery}}}", input.customerQuery);

    if (input.knownMotorcycleInfo?.name) {
        systemPrompt += `\nINFO_MOTOR_DIKETAHUI: Nama motor pelanggan adalah ${input.knownMotorcycleInfo.name}.`;
        if (input.knownMotorcycleInfo.size) {
             systemPrompt += ` Ukurannya adalah ${input.knownMotorcycleInfo.size}.`;
        }
    } else {
        systemPrompt += `\nINFO_MOTOR_DIKETAHUI: Tipe motor pelanggan BELUM diketahui.`;
    }
    
    systemPrompt += "\n\nJAWABAN LANGSUNG (tanpa basa-basi perkenalan lagi, langsung ke poin):";


    const messagesForAI = [
        { role: 'user' as const, content: [{text: systemPrompt}] } 
    ];

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        messages: messagesForAI,
        tools: [cariInfoLayananTool], // This sub-flow uses cariInfoLayananTool
        toolChoice: 'auto', // Let AI decide if it needs the tool based on the sub-flow prompt
        config: { temperature: 0.5 },
      });

      let responseText = result.text || "Maaf, Zoya bingung mau jawab apa untuk info layanan itu.";

      const toolRequest = result.toolRequest;
      if (toolRequest) {
        console.log("[Sub-Flow:handleServiceInquiry] AI requested tool:", toolRequest.name);
        let toolOutputContent: any = "Tool tidak dikenal atau input salah.";

        if (toolRequest.name === 'cariInfoLayanan' && toolRequest.input) {
          // Directly call the implementation function of the tool
          const layananOutput = await (cariInfoLayananTool.fn as Function)(toolRequest.input as CariInfoLayananInput);
          toolOutputContent = layananOutput;
        }
        
        const modelResponseAfterTool = await ai.generate({
            model: 'googleai/gemini-1.5-flash-latest',
            messages: [
                ...messagesForAI,
                result.message, // Previous AI message that included the tool request
                {
                    role: 'tool',
                    content: [{
                        toolResponse: {
                            name: toolRequest.name,
                            output: toolOutputContent,
                        }
                    }]
                }
            ],
            config: {temperature: 0.5}
        });
        responseText = modelResponseAfterTool.text || "Zoya nggak nemu jawaban bagus setelah pakai alat, coba tanya lagi ya.";
      }
      
      console.log("[Sub-Flow:handleServiceInquiry] Output responseText:", responseText);
      return { responseText };

    } catch (error) {
      console.error("[Sub-Flow:handleServiceInquiry] Error:", error);
      return { responseText: "Maaf, ada sedikit kendala teknis saat Zoya cari info layanan." };
    }
  }
);

// Exported async wrapper function
export async function handleServiceInquiry(input: HandleServiceInquiryInput): Promise<HandleServiceInquiryOutput> {
  return handleServiceInquiryFlowInternal(input);
}
