// File: src/app/api/debug-now/route.ts

import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Fungsi ini akan kita panggil di dalam GET handler
async function runDiagnostics() {
  const report: { [key: string]: any } = {};

  try {
    // LANGKAH 1: Cek Keberadaan Environment Variable
    report.step1_envVarCheck = {
      name: process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 ? 'FIREBASE_SERVICE_ACCOUNT_BASE64' : 'VARIABLE_NOT_FOUND',
      exists: !!process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
      charLength: process.env.FIREBASE_SERVICE_ACCOUNT_BASE64?.length || 0,
    };
    if (!report.step1_envVarCheck.exists) throw new Error("ENV VAR NOT FOUND");

    // LANGKAH 2: Parsing JSON dari Base64
    let serviceAccount;
    try {
      const decodedJson = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!, 'base64').toString('utf-8');
      serviceAccount = JSON.parse(decodedJson);
      report.step2_jsonParsing = {
        success: true,
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
      };
    } catch (e: any) {
      report.step2_jsonParsing = { success: false, error: e.message };
      throw new Error("JSON Parsing Failed");
    }

    // LANGKAH 3: Inisialisasi Firebase Admin
    try {
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
        });
        report.step3_sdkInitialization = { success: true, status: 'Initialized a new app' };
      } else {
        report.step3_sdkInitialization = { success: true, status: 'Used an existing app' };
      }
    } catch (e: any) {
      report.step3_sdkInitialization = { success: false, error: e.message };
      throw new Error("SDK Initialization Failed");
    }

    // LANGKAH 4: Operasi TULIS (WRITE) ke Firestore
    const db = admin.firestore();
    const randomId = `debug_write_${Date.now()}`;
    const docRef = db.collection('zoya_sessions').doc(randomId);
    try {
      await docRef.set({ test: 'write_success', timestamp: Date.now() });
      report.step4_writeOperation = { success: true, docId: randomId };
    } catch (e: any) {
      report.step4_writeOperation = { success: false, error: e.message };
      throw new Error("Write Operation Failed");
    }

    // LANGKAH 5: Operasi BACA (READ BACK) dokumen yang baru saja ditulis
    try {
      const docSnap = await docRef.get();
      report.step5_readBackOperation = {
        success: true,
        docExists: docSnap.exists,
        data: docSnap.data() || null,
      };
      if (!docSnap.exists) throw new Error("Read back failed: document does not exist");
    } catch (e: any) {
      report.step5_readBackOperation = { success: false, error: e.message };
      throw new Error("Read Back Operation Failed");
    }

    // Jika semua berhasil
    report.finalVerdict = "ALL STEPS SUCCEEDED. The connection and permissions are working correctly.";

  } catch (error: any) {
    report.finalVerdict = `FAILED at step: ${error.message}`;
  }

  return report;
}

export async function GET(request: Request) {
  const diagnosticReport = await runDiagnostics();
  
  // Kirim laporan sebagai respons JSON
  // Jika ada langkah yang gagal, statusnya 500 (Internal Server Error)
  const status = diagnosticReport.finalVerdict.startsWith("FAILED") ? 500 : 200;
  return NextResponse.json(diagnosticReport, { status });
}