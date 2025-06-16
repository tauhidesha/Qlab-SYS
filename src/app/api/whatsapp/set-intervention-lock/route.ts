
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { z } from 'zod';

const AI_LOCK_DURATION_MS = 1 * 60 * 60 * 1000; // 1 jam

const SetLockInputSchema = z.object({
  senderNumber: z.string().min(10, "Nomor pengirim tidak valid.").max(20, "Nomor pengirim tidak valid."),
});

export async function POST(request: Request) {
  console.log("=== API /api/whatsapp/set-intervention-lock ENTERED ===");
  try {
    const body = await request.json();
    const validation = SetLockInputSchema.safeParse(body);

    if (!validation.success) {
      console.error("Set Lock API: Input validation failed:", validation.error.format());
      return NextResponse.json({ success: false, error: 'Invalid input.', details: validation.error.format() }, { status: 400 });
    }

    const { senderNumber } = validation.data;
    console.log(`Set Lock API: Received request for senderNumber: ${senderNumber}`);

    const interventionLockRef = doc(db, 'ai_intervention_locks', senderNumber);
    const lockExpiresDate = new Date(Date.now() + AI_LOCK_DURATION_MS);

    await setDoc(interventionLockRef, {
      lastInterventionAt: serverTimestamp(),
      lockExpiresAt: Timestamp.fromDate(lockExpiresDate)
    }, { merge: true });

    console.log(`Set Lock API: AI lock successfully set/updated for ${senderNumber} until ${lockExpiresDate.toLocaleString()}`);
    return NextResponse.json({ success: true, message: `AI lock set for ${senderNumber}.` });

  } catch (error: any) {
    console.error("Set Lock API: Internal server error:", error);
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
