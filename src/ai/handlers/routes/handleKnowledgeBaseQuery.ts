import type { RouteHandlerFn } from './types';
import type { SessionData } from '../../utils/session';
import { searchKnowledgeBase } from '../../tools/searchKnowledgeBaseTool';
import { updateSession } from '../../utils/session'; // Asumsi fungsi ini bisa diakses

export const handleKnowledgeBaseQuery: RouteHandlerFn = async ({
  session,
  message,
  senderNumber,
}) => {
  console.log(`[Handler] Mencari jawaban di Q&A untuk pesan: "${message}"`);
  const qnaAnswer = await searchKnowledgeBase(message!);

  if (!qnaAnswer) {
    // Seharusnya tidak terjadi karena router sudah mengecek, tapi ini untuk pengaman
    return {
      reply: { message: 'Maaf, Zoya tidak menemukan jawaban cepat.' },
      updatedSession: { ...session, lastRoute: 'knowledge_base_failed' } as SessionData,
    };
  }

  // Cek apakah ada aksi tambahan yang perlu dijalankan dari hasil Q&A
  if (qnaAnswer.action?.update_session && session) {
    console.log('[Handler] Menjalankan aksi update_session dari Q&A.');
    const updatedInquiry = { ...session.inquiry, ...qnaAnswer.action.update_session.inquiry };
    await updateSession(senderNumber!, { ...session, inquiry: updatedInquiry });
  }

  return {
    reply: { message: qnaAnswer.answer },
    updatedSession: { ...session, lastRoute: 'knowledge_base_query' } as SessionData,
  };
};