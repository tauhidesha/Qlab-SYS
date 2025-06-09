
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
  SidebarTrigger, // Added SidebarTrigger
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
  const { state, open: sidebarOpen, isMobile } = useSidebar(); // Removed openMobile, setOpenMobile as they are not directly used here
  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({});

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  // Determine if text should be shown based on sidebar state and mobile status
  const showText = sidebarOpen || isMobile;

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href || (item.href && item.href !== '/' && pathname.startsWith(item.href));
    const Icon = item.icon;

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
      
      let navElement = groupButton;
      if (!sidebarOpen && !isMobile && item.title) { 
        navElement = (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>{groupButton}</TooltipTrigger>
              <TooltipContent side="right" align="center">{item.title}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
      
      return (
        <SidebarMenuItem key={item.title}>
          {navElement}
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

                // SidebarMenuSubButton renders an 'a' tag by default
                const subActualButton = (
                   <SidebarMenuSubButton href={subItem.href} isActive={subIsActive}>
                      {subButtonContent}
                    </SidebarMenuSubButton>
                );
                
                let subNavElement = subActualButton;
                // No tooltip for sub-items in this simplified version, assuming showText is true
                
                return (
                   <SidebarMenuSubItem key={subItem.title}>
                    {subNavElement}
                   </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      );

    } else { // Single navigation item
      const singleButtonElement = (
        <SidebarMenuButton isActive={isActive}>
          {buttonContent}
        </SidebarMenuButton>
      );

      let navElement = singleButtonElement;
      if (item.href) {
        const linkedButton = (
          <Link href={item.href} asChild>
            {singleButtonElement}
          </Link>
        );
        navElement = linkedButton;
      }
      
      if (!sidebarOpen && !isMobile && item.title) {
        navElement = (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* If it's a link, Link component should be inside TooltipTrigger if asChild is used by Link */}
                {/* If singleButtonElement is already wrapped by Link, it's fine. */}
                {/* If Link asChild wraps TooltipTrigger asChild, then SidebarMenuButton must handle both sets of props. */}
                {item.href ? (
                    <Link href={item.href} passHref legacyBehavior>
                        <TooltipTrigger asChild>
                            {singleButtonElement}
                        </TooltipTrigger>
                    </Link>
                 ) : (
                    <TooltipTrigger asChild>
                       {singleButtonElement}
                    </TooltipTrigger>
                 )
                }
              </TooltipTrigger>
              <TooltipContent side="right" align="center">{item.title}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else if (item.href) {
         // If text is shown or mobile, Link wraps SidebarMenuButton
         navElement = (
            <Link href={item.href} asChild>
                {singleButtonElement}
            </Link>
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
          {/* SidebarTrigger for mobile, correctly uses useSidebar context */}
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
             {/* User profile section */}
            <div className={cn(
                "flex items-center gap-2 p-2 rounded-md",
                 showText ? "hover:bg-sidebar-accent" : "" // Only apply hover if text is shown
              )}>
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
