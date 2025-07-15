"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ExternalLink } from 'lucide-react';

export default function FirebaseConfigGuide() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-orange-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-orange-600">
            Konfigurasi Firebase Diperlukan
          </CardTitle>
          <CardDescription className="text-base">
            Sistem memerlukan konfigurasi Firebase untuk dapat berfungsi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2">Langkah-langkah:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-orange-700">
              <li>Buka <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">Firebase Console <ExternalLink className="h-3 w-3 ml-1" /></a></li>
              <li>Pilih atau buat project baru</li>
              <li>Buka Project Settings (ikon gear) → tab General</li>
              <li>Di bagian "Your apps", klik web app atau buat yang baru</li>
              <li>Copy konfigurasi Firebase</li>
              <li>Buat file <code className="bg-white px-1 rounded">.env.local</code> di root project</li>
              <li>Isi variabel environment sesuai template</li>
            </ol>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Template .env.local:</h3>
            <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
{`NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123`}
            </pre>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Jangan lupa:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
              <li>Enable Authentication → Google provider di Firebase Console</li>
              <li>Tambahkan domain localhost:3000 ke authorized domains</li>
              <li>Setup OAuth consent screen</li>
              <li>Restart development server setelah menambah .env.local</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
