import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  // Pengguna harus menempatkan logo mereka sebagai public/logo.png
  // Sesuaikan width dan height di bawah ini jika perlu agar sesuai dengan aspek rasio logo Anda.
  // Placeholder saat ini menggunakan aspek rasio yang umum untuk logo memanjang.
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/logo.png" // Pastikan file ini ada di public/logo.png
        alt="QLAB POS Logo" // Updated alt text
        width={128} // Lebar gambar logo (misalnya 128px) - SESUAIKAN
        height={42} // Tinggi gambar logo (misalnya 42px) - SESUAIKAN
        priority // Penting untuk LCP jika logo terlihat di bagian atas halaman
        unoptimized={true} // Bypass Next.js image optimization for this image
        data-ai-hint="company logo"
      />
    </div>
  );
}
