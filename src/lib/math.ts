// Fungsi resolveMotorSizes untuk cartAgent
import daftarUkuranMotor from '../../src/data/daftarUkuranMotor';

export type MotorSizeLiteral = 'L' | 'S' | 'M' | 'XL';

function toMotorSizeLiteral(val: string | undefined): MotorSizeLiteral {
  if (val === 'L' || val === 'S' || val === 'M' || val === 'XL') return val;
  return 'L';
}

export function resolveMotorSizes(motorName: string): { motor_db_size: MotorSizeLiteral, repaint_size: MotorSizeLiteral } {
  const found = daftarUkuranMotor.find(m => m.model?.toLowerCase() === motorName?.toLowerCase() || (m.aliases && m.aliases.some((a: string) => a.toLowerCase() === motorName?.toLowerCase())));
  return {
    motor_db_size: toMotorSizeLiteral(found?.motor_db_size),
    repaint_size: toMotorSizeLiteral(found?.repaint_size),
  };
}
// @file: src/lib/math.ts

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
