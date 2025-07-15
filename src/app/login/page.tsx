"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Berhasil masuk",
        description: "Selamat datang di QLAB POS!",
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Gagal masuk",
        description: error.message || "Terjadi kesalahan saat masuk. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          <p className="text-lg text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20">
              <Image 
                src="/logo.png" 
                alt="QLAB Logo" 
                width={80} 
                height={80} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-orange-600">
            QLAB POS
          </CardTitle>
          <CardDescription className="text-base">
            Sistem Manajemen Bengkel dan POS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Masuk untuk mengakses dashboard dan fitur manajemen bengkel
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-green-700">
                📱 <strong>Mobile Friendly:</strong> Login Anda akan tersimpan otomatis. 
                Tidak perlu login ulang setiap kali membuka aplikasi.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleGoogleSignIn}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
            variant="outline"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Masuk dengan Google
          </Button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Dengan masuk, Anda menyetujui syarat dan ketentuan penggunaan QLAB POS
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
