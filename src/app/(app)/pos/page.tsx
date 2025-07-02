// src/app/(app)/pos/page.tsx

import { Suspense } from 'react';
import PosContent from './PosContent';
import Loading from './loading'; // Pastikan file loading.tsx ada

export default function PosPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PosContent />
    </Suspense>
  );
}