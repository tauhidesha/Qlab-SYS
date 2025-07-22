import type { Session } from '../../types/ai';
import type { OpenAI } from 'openai';
import { bookingAgentPrompt } from './bookingAgentPrompt';
import { zoyaTools } from '../config/aiConfig'; // Kita bisa filter tools khusus booking di sini
import { openai } from '../../lib/openai';

export async function runBookingAgent({ chatHistory, session }: { chatHistory: any[]; session: Session }) {
  console.log('[BookingAgent] LLM-Driven agent is running...');

  // Opsi: Filter hanya tools yang relevan untuk booking agar lebih efisien
  const bookingToolNames = ['extractBookingDetails', 'getAvailableSlots', 'checkBookingAvailability', 'createBooking'];
  const bookingTools = zoyaTools.filter(t => bookingToolNames.includes(t.function.name));

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: bookingAgentPrompt },
    ...chatHistory
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini', // Model yang cerdas sangat disarankan untuk agent
    messages,
    tools: bookingTools,
    tool_choice: 'auto',
  });

  const responseMessage = response.choices[0].message;

  // Proses balasan dari LLM (bisa berupa teks atau tool_calls)
  const toolCalls = responseMessage.tool_calls || [];
  let suggestedReply = responseMessage.content || '';

  if (toolCalls.length > 0) {
    // Jika LLM memutuskan untuk memanggil tool, kita tidak perlu reply apa-apa dulu
    // Flow utama akan mengeksekusi tool ini
    suggestedReply = ''; 
  } else if (!suggestedReply) {
    suggestedReply = 'Hmm, Zoya lagi bingung. Bisa diulangi lagi, om?';
  }

  return {
    suggestedReply,
    toolCalls: toolCalls.map(tc => ({
      id: tc.id,
      toolName: tc.function.name,
      arguments: JSON.parse(tc.function.arguments),
    })),
  };
}