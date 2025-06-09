
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Logo from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();
  const { state, open: sidebarOpen, isMobile } = useSidebar();
  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({});

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const showText = sidebarOpen || isMobile;

  const renderNavItem = (item: NavItem) => {
    const isActive =
      pathname === item.href ||
      (item.href && item.href !== "/" && pathname.startsWith(item.href));
    const Icon = item.icon;

    const content = (
      <>
        <Icon />
        {showText && <span>{item.title}</span>}
      </>
    );

    if (item.items?.length) {
      const groupButton = (
        <SidebarMenuButton
          onClick={() => toggleSubMenu(item.title)}
          className="justify-between w-full"
          isActive={isActive && !openSubMenus[item.title]}
          aria-expanded={openSubMenus[item.title]}
        >
          <div className="flex items-center gap-2">
            <Icon />
            {showText && <span>{item.title}</span>}
          </div>
          {showText &&
            (openSubMenus[item.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </SidebarMenuButton>
      );

      let navElement = groupButton;
      if (!sidebarOpen && !isMobile) {
        navElement = (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>{groupButton}</TooltipTrigger>
              <TooltipContent side="right" align="center">
                {item.title}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      return (
        <SidebarMenuItem key={item.title}>
          {navElement}
          {openSubMenus[item.title] && showText && (
            <SidebarMenuSub>
              {item.items.map(sub => {
                const subActive =
                  pathname === sub.href ||
                  (sub.href && pathname.startsWith(sub.href));
                return (
                  <SidebarMenuSubItem key={sub.title}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={subActive}
                      href={sub.href}
                    >
                      <Link href={sub.href}>{sub.title}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      );
    }

    const singleButtonElement = (
       <SidebarMenuButton
        isActive={isActive}
      >
        {content}
      </SidebarMenuButton>
    );
    
    let navElement = singleButtonElement;

    if (item.href) {
       if (!sidebarOpen && !isMobile) {
         navElement = (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={item.href} passHref>
                  {singleButtonElement}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">{item.title}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
         );
       } else {
         navElement = (
            <Link href={item.href} asChild>
                {singleButtonElement}
            </Link>
         );
       }
    } else {
       if (!sidebarOpen && !isMobile) {
          navElement = (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {singleButtonElement}
                </TooltipTrigger>
                <TooltipContent side="right" align="center">{item.title}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
       }
    }


    return <SidebarMenuItem key={item.title}>{navElement}</SidebarMenuItem>;
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
          {mainNavItems.map(i => renderNavItem(i))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t">
        <SidebarMenu>
          {renderNavItem(settingsNavItem)}
          <SidebarMenuItem>
            <div
              className={cn(
                "flex items-center gap-2 p-2 rounded-md",
                showText ? "hover:bg-sidebar-accent" : ""
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://placehold.co/40x40.png"
                  alt="Avatar Pengguna"
                  data-ai-hint="avatar pengguna"
                />
                <AvatarFallback>PD</AvatarFallback>
              </Avatar>
              {showText && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-sidebar-foreground">
                    Pengguna Demo
                  </span>
                  <span className="text-xs text-sidebar-foreground/70">
                    admin@qlab.pos
                  </span>
                </div>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
