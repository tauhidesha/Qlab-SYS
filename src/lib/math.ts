import { prisma } from '@/lib/prisma';

export type MotorSizeLiteral = 'L' | 'S' | 'M' | 'XL';

function toMotorSizeLiteral(val: string | undefined | null): MotorSizeLiteral {
  if (val === 'L' || val === 'S' || val === 'M' || val === 'XL') return val;
  return 'L';
}

export async function resolveMotorSizes(motorName: string): Promise<{ motor_db_size: MotorSizeLiteral, repaint_size: MotorSizeLiteral }> {
  if (!motorName) {
    return {
      motor_db_size: 'L',
      repaint_size: 'L'
    };
  }

  const models = await prisma.vehicleModel.findMany();
  const found = models.find(m => 
    m.modelName?.toLowerCase() === motorName.toLowerCase() || 
    (m.aliases && (m.aliases as string[]).some((a: string) => a.toLowerCase() === motorName.toLowerCase()))
  );
  
  return {
    motor_db_size: toMotorSizeLiteral(found?.serviceSize),
    repaint_size: toMotorSizeLiteral(found?.repaintSize),
  };
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) throw new Error('Vector length mismatch');

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] ** 2;
    normB += vecB[i] ** 2;
  }

  if (normA === 0 || normB === 0) return 0;

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
