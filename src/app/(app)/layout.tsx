"use client"; // Diperlukan karena layout ini punya logika dan komponen client

import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarRail } from '@/components/ui/sidebar'; // Impor providernya
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Bungkus semua halaman di dalam (app) dengan SidebarProvider di sini
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <SidebarRail />
          <SidebarInset className="flex flex-col">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}