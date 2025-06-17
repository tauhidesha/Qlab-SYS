import React from "react";

export default function AiCsAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout ini sekarang bertanggung jawab untuk seluruh tampilan halaman Asisten CS AI
  // karena layout induknya tidak akan merender sidebar.
  // Kelas "flex-1" memastikan ia mengisi ruang yang diberikan oleh induknya di AppLayout.
  return (
    <div className="flex-1 flex flex-col w-full h-full bg-background text-foreground">
      {children}
    </div>
  );
}
