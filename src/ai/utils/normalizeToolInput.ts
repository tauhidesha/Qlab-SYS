// File: src/ai/utils/normalizeToolInput.ts

// Helper universal untuk normalisasi input tool agar AI agent/function calling selalu konsisten
export function normalizeToolInput(input: any, paramName: string): any {
  if (typeof input === 'string') return input;
  if (input && typeof input[paramName] === 'string') return input[paramName];
  if (input && input.arguments && typeof input.arguments[paramName] === 'string') return input.arguments[paramName];
  if (input && input.input && typeof input.input[paramName] === 'string') return input.input[paramName];
  return undefined;
}