'use server';

// Impor library openai yang dibutuhkan oleh fungsi ini
import { openai } from '@/lib/openai';

// Fungsi ini sekarang diekspor agar bisa digunakan di file lain
export async function parseDateTime(text: string): Promise<{ date?: string, time?: string }> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a date and time parsing expert. Today is ${new Date().toISOString().split('T')[0]}. Extract the date in format YYYY-MM-DD and time in format HH:mm from the user's text. Understand relative terms like "besok", "lusa", "minggu depan", "hari rabu". If the user says "jam 2 siang", it's "14:00". If only date is found, return only date. If only time is found, return only time. If both are found, return both. If nothing is found, return an empty JSON object. Respond ONLY with a JSON object like {"date": "YYYY-MM-DD", "time": "HH:mm"}.`
        },
        {
          role: 'user',
          content: text
        }
      ]
    });
    const result = response.choices[0].message.content;
    if (result) {
      try {
        return JSON.parse(result);
      } catch {
        return {};
      }
    }
    return {};
  } catch (error) {
    console.error("Error parsing date/time:", error);
    return {};
  }
}