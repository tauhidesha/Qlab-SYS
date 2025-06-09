import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarInset, SidebarRail } from "@/components/ui/sidebar";
import React from "react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
