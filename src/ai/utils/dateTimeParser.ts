// File: src/ai/utils/dateTimeParser.ts
'use server';

import { openai } from '../../lib/openai';

/**
 * Mem-parsing teks input untuk menemukan tanggal dan waktu menggunakan GPT.
 * Lebih fleksibel dalam memahami bahasa alami.
 * @param text Pesan dari pengguna, contoh: "besok jam 2 siang"
 * @returns Objek berisi tanggal (YYYY-MM-DD) dan waktu (HH:MM) yang ditemukan.
 */
export async function parseDateTime(
  text: string,
): Promise<{ date: string | null; time: string | null }> {
  try {
    // Prompt dirancang untuk hanya mengembalikan JSON
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106', // Model yang cepat dan efisien untuk tugas ini
      response_format: { type: 'json_object' }, // Memaksa output menjadi JSON
      messages: [
        {
          role: 'system',
          content: `You are a date and time parsing expert for an Indonesian user. 

CURRENT DATE/TIME CONTEXT (MANDATORY TO USE):
- Today is: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- Current year: 2025 (NOT 2024!)
- Current month: Agustus (August) 2025
- Current time: ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })} WIB

Your task is to extract a date in "YYYY-MM-DD" format and a time in "HH:mm" format from the user's text.
- Understand relative terms: "besok" (tomorrow), "lusa" (day after tomorrow), "hari ini" (today), "minggu depan" (next week), day names like "hari rabu".
- Convert time correctly: "jam 2 siang" is "14:00", "jam 9 pagi" is "09:00".
- IMPORTANT: Always use 2025 as the base year, NOT 2024!
- If only a date is found, return only the date key.
- If only a time is found, return only the time key.
- If nothing is found, return an empty JSON object {}.
- Respond ONLY with the JSON object.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0, // Suhu 0 untuk jawaban yang deterministik
    });

    const result = response.choices[0].message.content;

    if (result) {
      try {
        const parsedResult = JSON.parse(result);
        // Pastikan properti yang dikembalikan adalah null jika tidak ada, bukan undefined
        return {
          date: parsedResult.date || null,
          time: parsedResult.time || null,
        };
      } catch (e) {
        console.error('Error parsing JSON from OpenAI:', e);
        return { date: null, time: null };
      }
    }
    return { date: null, time: null };
  } catch (error) {
    console.error('Error calling OpenAI for date/time parsing:', error);
    return { date: null, time: null };
  }
}
