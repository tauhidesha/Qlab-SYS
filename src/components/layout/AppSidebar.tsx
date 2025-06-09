
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
  const { state, open: sidebarOpen, isMobile, openMobile, setOpenMobile } = useSidebar();
  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({});

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const showText = sidebarOpen || isMobile;

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href || (item.href && item.href !== '/' && pathname.startsWith(item.href));
    const Icon = item.icon;
    let navElement;

    const buttonContent = (
      <>
        <Icon />
        {showText && <span>{item.title}</span>}
      </>
    );

    if (item.items && item.items.length > 0) { // Group with sub-items
      const groupButtonTriggerContent = (
        <div className="flex items-center gap-2">
          <Icon />
          {showText && <span>{item.title}</span>}
        </div>
      );
      
      const groupButton = (
        <SidebarMenuButton
            onClick={() => toggleSubMenu(item.title)}
            className="justify-between w-full"
            isActive={isActive && !openSubMenus[item.title]}
            aria-expanded={openSubMenus[item.title]}
          >
            {groupButtonTriggerContent}
            {showText && (openSubMenus[item.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </SidebarMenuButton>
      );
      
      navElement = (
        <>
          {(!sidebarOpen && !isMobile && item.title) ? ( 
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>{groupButton}</TooltipTrigger>
                <TooltipContent side="right" align="center">{item.title}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            groupButton
          )}
          {openSubMenus[item.title] && showText && ( 
            <SidebarMenuSub>
              {item.items.map((subItem) => {
                const subIsActive = pathname === subItem.href || (subItem.href && pathname.startsWith(subItem.href));
                const SubIcon = subItem.icon;
                const subButtonContent = (
                  <>
                    {SubIcon && <SubIcon />}
                    <span>{subItem.title}</span>
                  </>
                );

                const subActualButton = (
                   <SidebarMenuSubButton href={subItem.href} isActive={subIsActive}>
                      {subButtonContent}
                    </SidebarMenuSubButton>
                );
                
                let subNavElement;
                if (!sidebarOpen && !isMobile && subItem.title) {
                  subNavElement = (
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {subActualButton}
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">{subItem.title}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                } else {
                  subNavElement = subActualButton;
                }
                
                return (
                   <SidebarMenuSubItem key={subItem.title}>
                    {subNavElement}
                   </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          )}
        </>
      );
      return <SidebarMenuItem key={item.title}>{navElement}</SidebarMenuItem>;

    } else { // Single navigation item
      const sidebarMenuButtonElement = (
        <SidebarMenuButton isActive={isActive}>
          {buttonContent}
        </SidebarMenuButton>
      );

      if (!sidebarOpen && !isMobile && item.title) { // Tooltip shown
        navElement = (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              {item.href ? (
                <Link href={item.href} asChild>
                  <TooltipTrigger asChild>
                    {sidebarMenuButtonElement}
                  </TooltipTrigger>
                </Link>
              ) : (
                <TooltipTrigger asChild>
                  {sidebarMenuButtonElement}
                </TooltipTrigger>
              )}
              <TooltipContent side="right" align="center">{item.title}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else { // No tooltip shown
        navElement = item.href ? (
          <Link href={item.href} asChild>
            {sidebarMenuButtonElement}
          </Link>
        ) : (
          sidebarMenuButtonElement
        );
      }
      return <SidebarMenuItem key={item.title}>{navElement}</SidebarMenuItem>;
    }
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
                {showText && (
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
  );
}
