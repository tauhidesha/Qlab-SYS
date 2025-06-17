"use client"; // Menjadikan ini Client Component untuk menggunakan usePathname

import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarInset, SidebarRail } from "@/components/ui/sidebar";
import React from "react";
import { usePathname } from "next/navigation"; // Impor usePathname

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAiCsAssistantPage = pathname === '/ai-cs-assistant';

  if (isAiCsAssistantPage) {
    // Untuk halaman Asisten CS AI, render children langsung untuk tampilan fullscreen.
    // Layout spesifik /ai-cs-assistant/layout.tsx akan menangani struktur internal halaman ini.
    return (
      <div className="flex flex-col min-h-screen"> {/* Kontainer utama agar mengambil tinggi penuh */}
        {children}
      </div>
    );
  }

  // Untuk halaman lain di dalam (app), render dengan sidebar
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <SidebarRail />
      <SidebarInset className="flex flex-col">
        {children}
      </SidebarInset>
    </div>
  );
}
