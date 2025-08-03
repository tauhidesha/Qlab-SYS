import type { Session } from '../../types/ai';
import type { OpenAI } from 'openai';
import { bookingAgentPrompt } from './bookingAgentPrompt';
import { zoyaTools } from '../config/aiConfig';
import { openai } from '../../lib/openai';

export async function runBookingAgent({ chatHistory, session }: { chatHistory: any[]; session: Session }) {
  console.log('[BookingAgent] LLM-Driven agent is running...');

  const bookingToolNames = ['extractBookingDetails', 'getAvailableSlots', 'checkBookingAvailability', 'createBooking'];
  const bookingTools = zoyaTools.filter(t => bookingToolNames.includes(t.function.name));

  // --- PERUBAHAN DIMULAI DI SINI ---
  // 1. Ekstrak semua konteks penting dari sesi
  const servicesInCart = session.cartServices.filter(s => s && s !== 'General Inquiry').join(', ') || 'Belum ada layanan yang dipilih';
  const customerName = session.senderName || 'Belum diketahui';
  // Ambil nomor dari properti senderNumber di root session
  const customerPhone = (session as any).senderNumber || session.inquiry?.customerPhone || 'Belum diketahui';
  const vehicleInfo = session.inquiry?.lastMentionedMotor || 'Belum diketahui';
  
  // 2. Dapatkan tanggal hari ini
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  // 3. Buat system prompt yang dinamis dengan KONTEKS YANG LENGKAP
  const dynamicBookingPrompt = `${bookingAgentPrompt}

[KONTEKS DARI SESI SAAT INI]:
- Nama Pelanggan: ${customerName}
- Nomor Telepon: ${customerPhone}
- Info Kendaraan: ${vehicleInfo}
- Layanan di Keranjang: ${servicesInCart}
- Tanggal Hari Ini: ${formattedDate}

Gunakan informasi sesi ini sebagai sumber kebenaran utama. JANGAN tanyakan lagi informasi yang sudah tersedia di atas. Fokus hanya pada informasi yang benar-benar masih kurang (misalnya tanggal dan waktu).`;

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    // 4. Gunakan prompt yang dinamis dan lengkap
    { role: 'system', content: dynamicBookingPrompt },
    ...chatHistory
  ];
  // --- AKHIR PERUBAHAN ---

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages,
    tools: bookingTools,
    tool_choice: 'auto',
  });

  const responseMessage = response.choices[0].message;
  const toolCalls = responseMessage.tool_calls || [];
  let suggestedReply = responseMessage.content || '';

  if (toolCalls.length > 0) {
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