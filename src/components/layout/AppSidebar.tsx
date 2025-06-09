
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { mainNavItems, settingsNavItem, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarTrigger,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();
  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({});

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
    const Icon = item.icon;

    if (item.items && item.items.length > 0) {
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            onClick={() => toggleSubMenu(item.title)}
            className="justify-between w-full"
            isActive={isActive && !openSubMenus[item.title]}
            aria-expanded={openSubMenus[item.title]}
            tooltip={item.title}
          >
            <div className="flex items-center gap-2">
              <Icon />
              <span>{item.title}</span>
            </div>
            {openSubMenus[item.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </SidebarMenuButton>
          {openSubMenus[item.title] && (
            <SidebarMenuSub>
              {item.items.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <Link href={subItem.href} asChild>
                    <SidebarMenuSubButton
                      isActive={pathname === subItem.href || pathname.startsWith(subItem.href)}
                      tooltip={subItem.title}
                    >
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      );
    }
    
    return (
      <SidebarMenuItem key={item.title}>
        <Link href={item.href} asChild>
          <SidebarMenuButton isActive={isActive} tooltip={item.title}>
            <Icon />
            <span>{item.title}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  };


  return (
    <Sidebar className={cn("border-r", className)} collapsible="icon">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="grow" />
          <SidebarTrigger className="md:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {mainNavItems.map((item) => renderNavItem(item))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t">
        <SidebarMenu>
          {renderNavItem(settingsNavItem)}
           <SidebarMenuItem>
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
                    <AvatarFallback>QP</AvatarFallback>
                </Avatar>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-medium text-sidebar-foreground">Demo User</span>
                    <span className="text-xs text-sidebar-foreground/70">admin@qlab.pos</span>
                </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
