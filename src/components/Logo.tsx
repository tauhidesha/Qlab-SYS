
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  // !!! KRUSIAL: Pastikan file 'logo.png' ada di dalam direktori 'public' di root proyek Anda !!!
  // Pengguna harus menempatkan logo mereka sebagai public/logo.png
  // Sesuaikan width dan height di bawah ini jika perlu agar sesuai dengan aspek rasio logo Anda.
  // Placeholder saat ini menggunakan aspek rasio yang umum untuk logo memanjang.
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/logo.png" // Path ini akan mengarah ke public/logo.png
        alt="QLAB POS Logo"
        width={128} // Lebar gambar logo (misalnya 128px) - SESUAIKAN
        height={42} // Tinggi gambar logo (misalnya 42px) - SESUAIKAN
        unoptimized={true} // Bypass Next.js image optimization untuk gambar ini
        data-ai-hint="company logo"
      />
    </div>
  );
}
