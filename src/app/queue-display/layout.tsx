
import type { Metadata } from 'next';

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
    <main className="min-h-0 flex-grow flex flex-col bg-background text-foreground">
      {/*
        The main tag now uses flex-grow to fill available space from its parent (body from root layout).
        bg-background and text-foreground are applied here to ensure styling for this specific view.
        h-screen was removed as h-full on html/body and flex-grow on main should achieve full height.
      */}
      {children}
    </main>
  );
}
