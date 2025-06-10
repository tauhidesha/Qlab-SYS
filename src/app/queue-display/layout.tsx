
import type { Metadata } from 'next';
import '../globals.css'; // Assuming you want to keep global styles
import { Toaster } from "@/components/ui/toaster"; // Keep toaster for potential system messages

export const metadata: Metadata = {
  title: 'Status Antrian - QLAB POS',
  description: 'Tampilan status antrian layanan secara real-time.',
};

export default function QueueDisplayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark h-full"> {/* Added h-full */}
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground h-full flex flex-col"> {/* Added h-full flex flex-col */}
        <main className="min-h-0 flex-grow flex flex-col"> {/* Removed p-4 md:p-8 and items-center, added min-h-0 flex-grow */}
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
