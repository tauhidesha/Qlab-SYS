'use server';
/**
 * @fileOverview Sub-flow to handle detailed service inquiries.
 * Explains a service, lists packages using cariInfoLayananTool, and asks clarifying questions.
 */
import { ai } from '@/ai/genkit';
import * as z from 'zod';
import { cariInfoLayananTool, type CariInfoLayananInput, type CariInfoLayananOutput } from '@/ai/tools/cariInfoLayananTool';
import { DEFAULT_MAIN_PROMPT_ZOYA_SERVICE_INQUIRY_SUB_FLOW } from '@/types/aiSettings';

// --- Local Zod Schemas (NOT EXPORTED) ---
const HandleServiceInquiryInputSchema = z.object({
  serviceKeyword: z.string().describe("Kata kunci layanan yang ditanyakan user, mis. 'coating', 'detailing'."),
  customerQuery: z.string().describe("Pesan asli dari pelanggan, untuk konteks."),
  knownMotorcycleInfo: z.object({
    name: z.string(),
    size: z.string().optional(),
  }).optional().describe("Informasi motor pelanggan jika sudah diketahui (nama, ukuran)."),
});
// --- End Local Zod Schemas ---

// Exported Type for Input
export type HandleServiceInquiryInput = z.infer<typeof HandleServiceInquiryInputSchema>;

// --- Local Zod Schemas (NOT EXPORTED) ---
const HandleServiceInquiryOutputSchema = z.object({
  responseText: z.string().describe("Teks balasan yang dihasilkan oleh sub-flow ini."),
});
// --- End Local Zod Schemas ---

// Exported Type for Output
export type HandleServiceInquiryOutput = z.infer<typeof HandleServiceInquiryOutputSchema>;

// The sub-flow definition (internal, not directly exported for Genkit CLI deployment unless needed later)
const handleServiceInquiryFlowInternal = ai.defineFlow(
  {
    name: 'handleServiceInquiryFlowInternal',
    inputSchema: HandleServiceInquiryInputSchema, // Uses local schema
    outputSchema: HandleServiceInquiryOutputSchema, // Uses local schema
  },
  async (input: HandleServiceInquiryInput): Promise<HandleServiceInquiryOutput> => {
    console.log("[Sub-Flow:handleServiceInquiry] Input:", input);

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
        // For sub-flows that are very specific, sometimes it's better to pass the dynamic parts
        // directly into the main user message part of the prompt if the system prompt is static.
        // Or, structure as a system message and one user message that triggers the flow.
        // Let's try with system prompt and the customerQuery as user message.
        { role: 'system' as const, content: [{text: systemPrompt}]},
        { role: 'user' as const, content: [{text: `Tolong bantu jelaskan tentang "${input.serviceKeyword}" berdasarkan pertanyaan: "${input.customerQuery}"`}] } 
    ];

    try {
      const result = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest', // or your preferred model
        prompt: systemPrompt, // Pass the constructed system prompt here
        messages: [ // Pass customerQuery as the immediate user message
            { role: 'user' as const, content: [{text: `Tolong bantu jelaskan tentang "${input.serviceKeyword}" berdasarkan pertanyaan: "${input.customerQuery}"`}] }
        ],
        tools: [cariInfoLayananTool],
        toolChoice: 'auto',
        config: { temperature: 0.5 },
      });

      let responseText = result.text || "Maaf, Zoya bingung mau jawab apa untuk info layanan itu.";

      const toolRequest = result.toolRequest;
      if (toolRequest) {
        console.log("[Sub-Flow:handleServiceInquiry] AI requested tool:", toolRequest.name);
        let toolOutputContent: any = "Tool tidak dikenal atau input salah.";

        if (toolRequest.name === 'cariInfoLayanan' && toolRequest.input) {
          const layananOutput = await (cariInfoLayananTool.fn as Function)(toolRequest.input as CariInfoLayananInput);
          toolOutputContent = layananOutput;
        }
        
        // Call AI again with tool result
        const modelResponseAfterTool = await ai.generate({
            model: 'googleai/gemini-1.5-flash-latest',
            prompt: systemPrompt, // Re-use system prompt
            messages: [
                { role: 'user' as const, content: [{text: `Tolong bantu jelaskan tentang "${input.serviceKeyword}" berdasarkan pertanyaan: "${input.customerQuery}"`}] }, // Original trigger
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

// Exported async wrapper function (this is fine for 'use server')
export async function handleServiceInquiry(input: HandleServiceInquiryInput): Promise<HandleServiceInquiryOutput> {
  return handleServiceInquiryFlowInternal(input);
}
