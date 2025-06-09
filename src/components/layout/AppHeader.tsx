import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface AppHeaderProps {
  title: string;
}

export default function AppHeader({ title }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6 shadow-sm">
      <SidebarTrigger className="md:hidden" />
      <h1 className="font-headline text-xl font-semibold">{title}</h1>
      {/* Add other header elements like user menu, notifications here if needed */}
    </header>
  );
}
