// @file: src/ai/tools/conversation/detectConversationRelevance.ts
import { z } from 'zod';
import { createTraceable } from '@/lib/langsmith';

const detectConversationRelevanceSchema = z.object({
  customerMessage: z.string().describe('Pesan terakhir dari customer'),
  conversationContext: z.string().optional().describe('Konteks percakapan sebelumnya'),
});

export const detectConversationRelevanceTool = {
  name: 'detectConversationRelevance',
  description: 'Deteksi apakah percakapan masih relevan dengan layanan Bosmat atau perlu dihentikan',
  schema: detectConversationRelevanceSchema,
  implementation: createTraceable(async (input: z.infer<typeof detectConversationRelevanceSchema>) => {
    console.log('[detectConversationRelevance] Analyzing conversation relevance');
    
    const { customerMessage, conversationContext } = input;
    const message = customerMessage.toLowerCase();
    
    // Keywords for stop conditions
    const stopKeywords = [
      // Location-based
      'bandung', 'jakarta', 'bogor', 'bekasi', 'tangerang', 'sukabumi', 'cianjur', 'garut', 'tasikmalaya', 'cirebon',
      'surabaya', 'malang', 'yogya', 'yogyakarta', 'solo', 'semarang', 'purwokerto', 'tegal',
      'medan', 'palembang', 'padang', 'pekanbaru', 'jambi', 'bengkulu', 'lampung',
      'makassar', 'manado', 'kendari', 'palu', 'balikpapan', 'samarinda', 'pontianak', 'banjarmasin',
      'denpasar', 'mataram', 'kupang', 'ambon', 'jayapura',
      
      // Distance indicators
      'jauh', 'terlalu jauh', 'di luar kota', 'beda kota', 'ga deket', 'tidak dekat',
      
      // Stop requests
      'stop', 'berhenti', 'jangan balas', 'sudah tidak perlu', 'tidak perlu lagi', 'cukup',
      'sudah cukup', 'terima kasih sudah', 'makasih sudah', 'ga jadi', 'tidak jadi', 'batal',
      
      // Disinterest indicators
      'mahal', 'terlalu mahal', 'ga cocok', 'tidak cocok', 'ga sesuai', 'tidak sesuai',
      'mikir dulu', 'pikir-pikir dulu', 'nanti dulu', 'lain kali', 'next time',
      
      // Off-topic indicators
      'cara berhenti', 'gimana caranya berhenti', 'stop balas', 'matiin notif',
    ];
    
    // Check for irrelevant content
    const offTopicKeywords = [
      'politik', 'pemilu', 'pilkada', 'agama', 'sara', 'covid', 'vaksin',
      'jual beli', 'bisnis', 'kerja', 'lowongan', 'investasi', 'trading',
      'kuliah', 'sekolah', 'pelajaran', 'ujian', 'tugas',
    ];
    
    // Analyze message for stop conditions
    const hasStopKeyword = stopKeywords.some(keyword => message.includes(keyword));
    const hasOffTopicKeyword = offTopicKeywords.some(keyword => message.includes(keyword));
    
    // Check for location mentions outside Depok-Jakarta area
    const outsideServiceArea = [
      'bandung', 'yogya', 'yogyakarta', 'surabaya', 'medan', 'makassar', 'denpasar',
      'solo', 'semarang', 'malang', 'palembang', 'padang', 'pekanbaru'
    ].some(city => message.includes(city));
    
    // Determine relevance
    let shouldStop = false;
    let reason = '';
    let suggestedResponse = '';
    
    if (outsideServiceArea) {
      shouldStop = true;
      reason = 'customer_outside_service_area';
      suggestedResponse = 'Wah mas di luar area ya? Sayang sekali Bosmat hanya melayani area Depok-Jakarta. Terima kasih sudah menanyakan layanan kami!';
    } else if (message.includes('cara berhenti') || message.includes('stop balas') || message.includes('jangan balas')) {
      shouldStop = true;
      reason = 'customer_requests_stop';
      suggestedResponse = 'Baik mas, chat otomatis sudah distop. Kalau butuh info layanan Bosmat lagi nanti bisa chat ulang ya! 😊';
    } else if (hasOffTopicKeyword) {
      shouldStop = true;
      reason = 'off_topic_conversation';
      suggestedResponse = 'Maaf mas, saya khusus bantuin info layanan Bosmat aja ya. Makasih! 😊';
    } else if (hasStopKeyword) {
      shouldStop = true;
      reason = 'customer_shows_disinterest';
      suggestedResponse = 'Oke mas, terima kasih sudah bertanya tentang Bosmat. Kalau nanti butuh info lagi, silakan chat ya! 😊';
    }
    
    // Additional context analysis
    if (conversationContext) {
      // If conversation has been going in circles
      const contextLower = conversationContext.toLowerCase();
      if (contextLower.includes('sudah dijelaskan') && message.includes('masih')) {
        shouldStop = true;
        reason = 'repetitive_conversation';
        suggestedResponse = 'Sepertinya info sudah lengkap ya mas. Kalau ada pertanyaan lain tentang Bosmat, chat lagi aja! 😊';
      }
    }
    
    const result = {
      shouldContinue: !shouldStop,
      shouldStop,
      reason,
      suggestedResponse,
      analysisDetails: {
        hasStopKeyword,
        hasOffTopicKeyword,
        outsideServiceArea,
        customerMessage: customerMessage,
        detectedIntent: shouldStop ? 'stop_conversation' : 'continue_conversation'
      }
    };
    
    console.log('[detectConversationRelevance] Analysis result:', result);
    
    return {
      success: true,
      message: shouldStop ? 'Percakapan sebaiknya dihentikan' : 'Percakapan masih relevan',
      data: result,
      response: shouldStop ? suggestedResponse : null
    };
    
  }, 'detectConversationRelevance', ['conversation-management', 'relevance-detection'])
};

export default detectConversationRelevanceTool;
