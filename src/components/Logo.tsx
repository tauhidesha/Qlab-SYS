import React from 'react';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`font-headline text-2xl font-bold text-primary ${className}`}>
      QLAB POS
    </div>
  );
}
