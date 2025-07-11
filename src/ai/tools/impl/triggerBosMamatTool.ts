// src/ai/tools/impl/triggerBosMamatTool.ts

import type { ToolFunction } from '@/types/ai/ToolFunction';
import { notifyBosMamat, setSnoozeMode } from '@/ai/utils/humanHandoverTool';
import type { OpenAI } from 'openai';

export const triggerBosMamatTool: ToolFunction & {
  toolDefinition: OpenAI.Chat.Completions.ChatCompletionTool;
} = {
  name: 'triggerBosMamatTool',
  description:
    'Digunakan saat Zoya butuh bantuan Bos Mamat karena tidak yakin jawabannya atau pertanyaannya terlalu spesifik.',
  parameters: {
    type: 'object',
    properties: {
      reason: {
        type: 'string',
        description:
          'Alasan Zoya perlu tanya ke Bos Mamat (misalnya: warna efek custom, motor langka, dsb)',
      },
      customerQuestion: {
        type: 'string',
        description: 'Pertanyaan asli dari customer yang perlu ditanyain ke Bos Mamat',
      },
    },
    required: ['reason', 'customerQuestion'],
  },

  // ✅ Implementasi tool: parsing args manual dari toolCall OpenAI
  implementation: async ({ toolCall, input }) => {
    let reason = '';
    let customerQuestion = '';

    try {
      const args = JSON.parse(toolCall.function.arguments || '{}');
      reason = args.reason;
      customerQuestion = args.customerQuestion;
    } catch (err) {
      console.error('[triggerBosMamatTool] Gagal parsing arguments:', err);
    }

    if (!reason || !customerQuestion) {
      throw new Error(
        '[triggerBosMamatTool] Tool dipanggil tanpa reason atau customerQuestion.'
      );
    }

    const senderNumber = input?.senderNumber || 'unknown';

    console.log('[triggerBosMamatTool] Mengirim ke Bos Mamat:', {
      senderNumber,
      reason,
      customerQuestion,
    });

    await setSnoozeMode(senderNumber);
    await notifyBosMamat(senderNumber, customerQuestion, reason);

    return {
      result: 'success',
      message: 'Zoya sudah hubungi Bos Mamat, tinggal tunggu jawabannya.',
    };
  },

  // ✅ Definisi untuk tool calling OpenAI
  toolDefinition: {
    type: 'function',
    function: {
      name: 'triggerBosMamatTool',
      description:
        'Digunakan saat Zoya butuh bantuan Bos Mamat karena tidak yakin jawabannya atau pertanyaannya terlalu spesifik.',
      parameters: {
        type: 'object',
        properties: {
          reason: {
            type: 'string',
            description:
              'Alasan Zoya perlu tanya ke Bos Mamat (misalnya: warna efek custom, motor langka, dsb)',
          },
          customerQuestion: {
            type: 'string',
            description: 'Pertanyaan asli dari customer yang perlu ditanyain ke Bos Mamat',
          },
        },
        required: ['reason', 'customerQuestion'],
      },
    },
  },
};
