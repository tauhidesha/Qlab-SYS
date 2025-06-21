
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import { Loader2 } from 'lucide-react';

export default function RedirectToSettingsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/settings');
  }, [router]);

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Pengalihan..." />
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Halaman pengaturan telah dipindahkan.</p>
        <p className="text-lg text-muted-foreground">Mengalihkan Anda ke halaman yang baru...</p>
      </div>
    </div>
  );
}
