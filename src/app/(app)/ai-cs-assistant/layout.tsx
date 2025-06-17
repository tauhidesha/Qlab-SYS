
import React from "react";

export default function AiCsAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout ini sangat sederhana, hanya merender children tanpa sidebar
  // Ini akan meng-override layout default dari src/app/(app)/layout.tsx
  // khusus untuk halaman /ai-cs-assistant
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {children}
    </div>
  );
}
