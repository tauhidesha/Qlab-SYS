// File: src/app/api/whatsapp/do-work/route.ts (VERSI TES DIAGNOSTIK)

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Hal pertama yang kita lakukan adalah LOGGING.
  console.log('✅✅✅ [DO-WORK ALIVE!] Endpoint /api/do-work berhasil dipanggil dan berjalan!');

  // Kita tidak memanggil AI atau Firebase. Kita hanya balas OK.
  return NextResponse.json({ status: 'ok', message: 'Worker is alive.' });
}