// @file: src/ai/tools/updateRepaintDetailsTool.ts

import type { ToolFunction } from '../../types/ai/ToolFunction';

export const updateRepaintDetailsTool: ToolFunction & { toolDefinition: any } = {
  name: 'updateRepaintDetailsTool',
  description: 'Digunakan untuk menyimpan hasil klarifikasi seperti warna, bagian motor, dan nama motor ke dalam repaintDetails di session.',
  parameters: {
    type: 'object',
    properties: {
      serviceName: {
        type: 'string',
        description: 'Nama layanan repaint (misalnya: Repaint Bodi Halus)',
      },
      color: {
        type: 'string',
        description: 'Warna yang diinginkan untuk repaint (misalnya: candy pink)',
      },
      specific_part: {
        type: 'string',
        description: 'Bagian spesifik yang ingin di-repaint (misalnya: bodi halus, velg)',
      },
      motor: {
        type: 'string',
        description: 'Nama motor jika diketahui (misalnya: XMAX)',
      },
    },
    required: ['serviceName'],
  },

  toolDefinition: {
    type: 'function',
    function: {
      name: 'updateRepaintDetailsTool',
      description: 'Digunakan untuk menyimpan hasil klarifikasi repaint (warna, bagian, motor) ke dalam session.',
      parameters: {
        type: 'object',
        properties: {
          serviceName: { type: 'string' },
          color: { type: 'string' },
          specific_part: { type: 'string' },
          motor: { type: 'string' },
        },
        required: ['serviceName'],
      },
    },
  },

  implementation: async (args, context) => {
    const { serviceName, color, specific_part, motor } = args;
    const session = context?.session;

    if (!session || !session.inquiry) {
      return {
        result: 'error',
        message: 'Session tidak ditemukan atau inquiry belum diinisialisasi.',
      };
    }


    // Fallback sanitasi
    const resolvedServiceName = (serviceName === 'Repaint') ? 'Repaint Bodi Halus' : serviceName;
    const resolvedPart = (specific_part === 'bodi') ? 'bodi halus' : specific_part;

    session.inquiry.repaintDetails = session.inquiry.repaintDetails || {};
    session.inquiry.repaintDetails[resolvedServiceName] = {
      ...(session.inquiry.repaintDetails[resolvedServiceName] || {}),
      ...(color && { color }),
      ...(resolvedPart && { specific_part: resolvedPart }),
      ...(motor && { motor }),
    };


    if (motor && !session.inquiry.lastMentionedMotor) {
      session.inquiry.lastMentionedMotor = motor;
    }

    if (resolvedServiceName) {
      session.inquiry.lastMentionedService = [resolvedServiceName];
    }

    return {
      result: 'success',
      message: 'Detail repaint berhasil diperbarui.',
      data: session.inquiry.repaintDetails[resolvedServiceName],
    };
  },
};
