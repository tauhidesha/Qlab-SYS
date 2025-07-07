// File: app/ai/lib/resolvers/resolveMotorModel.ts

import allMotorsData from '../../../../../../docs/daftarUkuranMotor.json'


export type MotorSize = 'S' | 'M' | 'L' | 'XL';

export type Motor = {
  model: string;
  motor_db_size: MotorSize;
  repaint_size: MotorSize;
};

export function resolveMotorModel(query: string): Motor | null {
  const msg = query.toLowerCase();
  const allMotors: Motor[] = allMotorsData as Motor[];

  const matches = allMotors.filter((motor) =>
    motor.model.toLowerCase().includes(msg)
  );

  if (matches.length === 0) return null;

  // Kalau banyak, pilih yang paling mirip
  if (matches.length > 1) {
    const exact = matches.find((m) => m.model.toLowerCase() === msg);
    if (exact) return exact;

    // Sort berdasarkan panjang string kecocokan
    matches.sort((a, b) => b.model.length - a.model.length);
  }

  return matches[0];
}
