
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
  useSidebar, // Import useSidebar
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components
import Logo from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Button is not used here anymore for nav
import { ChevronDown, ChevronUp } from "lucide-react";

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar(); // Get sidebar state
  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({});

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
    const Icon = item.icon;

    const buttonContent = (
      <>
        <Icon />
        {(state === "expanded" || isMobile) && <span>{item.title}</span>}
      </>
    );
    
    let navElement;

    if (item.items && item.items.length > 0) { // Group with sub-items
      const groupButton = (
        <SidebarMenuButton
            onClick={() => toggleSubMenu(item.title)}
            className="justify-between w-full"
            isActive={isActive && !openSubMenus[item.title]}
            aria-expanded={openSubMenus[item.title]}
          >
            <div className="flex items-center gap-2">
              <Icon />
               {(state === "expanded" || isMobile) && <span>{item.title}</span>}
            </div>
            {(state === "expanded" || isMobile) && (openSubMenus[item.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </SidebarMenuButton>
      );
      
      navElement = (
        <>
          {state === "collapsed" && !isMobile ? (
            <Tooltip>
              <TooltipTrigger aschild>{groupButton}</TooltipTrigger>
              <TooltipContent side="right" align="center">{item.title}</TooltipContent>
            </Tooltip>
          ) : (
            groupButton
          )}
          {openSubMenus[item.title] && (state === "expanded" || isMobile) && (
            <SidebarMenuSub>
              {item.items.map((subItem) => {
                const subIsActive = pathname === subItem.href || pathname.startsWith(subItem.href);
                const subIcon = subItem.icon;
                const subButtonContent = (
                  <>
                    {subIcon && <subIcon />}
                    <span>{subItem.title}</span>
                  </>
                );

                const subNavButton = (
                  <SidebarMenuSubButton href={subItem.href} isActive={subIsActive}>
                    {subButtonContent}
                  </SidebarMenuSubButton>
                );
                
                // Tooltips for sub-items usually not needed if parent is expanded
                return (
                   <SidebarMenuSubItem key={subItem.title}>
                      {subNavButton}
                   </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          )}
        </>
      );
      return <SidebarMenuItem key={item.title}>{navElement}</SidebarMenuItem>;

    } else { // Single navigation item
       const singleButton = (
        <Link href={item.href} passHref asChild>
          <SidebarMenuButton isActive={isActive}>
            {buttonContent}
          </SidebarMenuButton>
        </Link>
      );
      
      navElement = state === "collapsed" && !isMobile ? (
        <Tooltip>
          <TooltipTrigger asChild>{singleButton}</TooltipTrigger>
          <TooltipContent side="right" align="center">{item.title}</TooltipContent>
        </Tooltip>
      ) : (
        singleButton
      );
      return <SidebarMenuItem key={item.title}>{navElement}</SidebarMenuItem>;
    }
  };


  return (
    // Ensure TooltipProvider wraps the sidebar if not already higher up
    <TooltipProvider delayDuration={0}>
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
                  {(state === "expanded" || isMobile) && (
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-sidebar-foreground">Demo User</span>
                        <span className="text-xs text-sidebar-foreground/70">admin@qlab.pos</span>
                    </div>
                  )}
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}

    