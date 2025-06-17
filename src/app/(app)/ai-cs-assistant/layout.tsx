import React from "react";

export default function AiCsAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout ini sangat sederhana, hanya merender children tanpa sidebar.
  // Kelas "flex-1" di div utama ini penting agar layout ini
  // mengambil sisa ruang di dalam parent flex container-nya (yang berasal dari SidebarProvider di root layout).
  return (
    <div className="flex-1 flex min-h-screen flex-col bg-background text-foreground">
      {children}
    </div>
  );
}
