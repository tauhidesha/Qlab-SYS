"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AccessDeniedProps {
  email?: string;
}

export default function AccessDenied({ email }: AccessDeniedProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            Akses Ditolak
          </CardTitle>
          <CardDescription className="text-base">
            Akun Anda tidak memiliki izin untuk mengakses sistem ini
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {email && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">
                <span className="font-medium">Email:</span> {email}
              </p>
              <p className="text-xs text-red-600 mt-1">
                Email ini tidak terdaftar dalam daftar pengguna yang diizinkan.
              </p>
            </div>
          )}
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Untuk mendapatkan akses:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Hubungi administrator sistem</li>
              <li>Pastikan menggunakan email yang terdaftar</li>
              <li>Minta administrator menambahkan email Anda</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
