import { orchestratorAgentPrompt } from './orchestratorAgentPrompt';
import { openai } from '../../lib/openai';

// Daftar agent sesuai prompt
const agentIntentMap = {
  PromoAgent: 'promo_flow',
  ClarificationAgent: 'service_inquiry',
  ConfirmationAgent: 'booking_flow',
  CartAgent: 'service_inquiry',
  BookingAgent: 'booking_flow',
  GeneralQuestionAgent: 'general_question',
  ChitchatAgent: 'chitchat',
} as const;

export type OrchestratorIntent = typeof agentIntentMap[keyof typeof agentIntentMap];

export interface OrchestratorResult {
  intent: OrchestratorIntent;
}

// Fungsi ini menerima laporan status dan mengembalikan keputusan
export async function runOrchestratorAgent(statusReport: string): Promise<OrchestratorResult> {
  console.log('[OrchestratorAgent] Menganalisis status untuk menentukan alur...');
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: orchestratorAgentPrompt },
        { role: 'user', content: statusReport }
      ],
      temperature: 0,
      response_format: { type: 'json_object' },
    });
    const replyContent = response.choices[0].message.content;
    const parsed = JSON.parse(replyContent || '{}');
    // Output dari prompt: { next_agent: "BookingAgent" }
    if (parsed.next_agent && agentIntentMap[parsed.next_agent as keyof typeof agentIntentMap]) {
      const intent = agentIntentMap[parsed.next_agent as keyof typeof agentIntentMap];
      console.log(`[OrchestratorAgent] Keputusan: ${intent}`);
      return { intent };
    }
  } catch (error) {
    console.error('[OrchestratorAgent] Error:', error);
  }
  // Fallback jika Orchestrator gagal
  return { intent: 'chitchat' };
}
