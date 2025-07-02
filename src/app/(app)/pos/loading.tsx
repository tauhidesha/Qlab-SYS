// src/app/(app)/pos/loading.tsx

import AppHeader from '@/components/layout/AppHeader';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Penjualan" />
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Memuat Point of Sale...</p>
      </div>
    </div>
  );
}