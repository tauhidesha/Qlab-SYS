import dotenv from 'dotenv';
dotenv.config();

import { parseDateTime } from '../utils/dateTimeParser';

describe('parseDateTime', () => {
  it('should parse relative date like "besok lusa"', async () => {
    const input = 'besok lusa';
    const result = await parseDateTime(input);
    console.log('parseDateTime("besok lusa"):', result);
    expect(result.date).toBeDefined();
  });

  it('should parse relative date like "minggu depan"', async () => {
    const input = 'minggu depan';
    const result = await parseDateTime(input);
    console.log('parseDateTime("minggu depan"):', result);
    expect(result.date).toBeDefined();
  });
  it('should parse relative date like "besok"', async () => {
    const input = 'besok';
    const result = await parseDateTime(input);
    console.log('parseDateTime("besok"):', result);
    expect(result.date).toBeDefined();
  });

  it('should parse specific date string', async () => {
    const input = '2025-08-01';
    const result = await parseDateTime(input);
    console.log('parseDateTime("2025-08-01"):', result);
    expect(result.date).toBe('2025-08-01');
  });

  it('should handle invalid date gracefully', async () => {
    const input = 'tanggal ga jelas';
    const result = await parseDateTime(input);
    console.log('parseDateTime("tanggal ga jelas"):', result);
    expect(result.date).toBeUndefined();
  });
});
