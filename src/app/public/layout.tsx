
import type { Metadata } from 'next';
import '../globals.css'; // Ensure global styles are applied
import { Toaster } from "@/components/ui/toaster"; // For any toasts on public pages

export const metadata: Metadata = {
  title: 'QLAB POS - Area Publik',
  description: 'Halaman publik untuk QLAB POS.',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
