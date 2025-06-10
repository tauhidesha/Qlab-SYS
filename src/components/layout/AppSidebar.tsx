
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

// Helper function to determine if a NavItem or any of its children/grandchildren are active
const isNavItemActive = (navItem: NavItem, currentPathname: string): boolean => {
  if (navItem.href) {
    // Exact match always makes it active
    if (currentPathname === navItem.href) {
      return true;
    }
    // For items that are parents (have children), allow prefix matching if current path is deeper
    if (navItem.items && navItem.items.length > 0) {
      if (navItem.href !== "/" && currentPathname.startsWith(navItem.href) && currentPathname.length > navItem.href.length) {
        return true;
      }
    }
    // For leaf items, only exact match (handled above). So if not an exact match, it's not active by its own href.
  }

  // If an item has children, it can also be considered active if one of its children is active.
  // This part is crucial for highlighting the parent group when a child is active.
  if (navItem.items?.length) {
    return navItem.items.some(child => isNavItemActive(child, currentPathname));
  }

  return false;
};


export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();
  const { state, open: sidebarOpen, isMobile } = useSidebar();
  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>(() => {
    // Initialize openSubMenus based on active routes
    const initialOpenState: Record<string, boolean> = {};
    const processItemsForInitialOpen = (items: NavItem[]) => {
      items.forEach(item => {
        if (item.items?.length) {
          if (isNavItemActive(item, pathname)) {
            initialOpenState[item.title] = true;
          }
          processItemsForInitialOpen(item.items); // Recursively check deeper items
        }
      });
    };
    processItemsForInitialOpen(mainNavItems);
    if (settingsNavItem.items?.length && isNavItemActive(settingsNavItem, pathname)) {
        initialOpenState[settingsNavItem.title] = true;
        if(settingsNavItem.items) processItemsForInitialOpen(settingsNavItem.items);
    }
    return initialOpenState;
  });


  const toggleSubMenu = (title: string) => {
    setOpenSubMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const showText = sidebarOpen || isMobile;

  // Function to render a single navigation item or a group
  const renderNavItem = (item: NavItem, isSubMenuLevel: number = 0): React.ReactNode => {
    const itemIsActive = isNavItemActive(item, pathname);
    const Icon = item.icon;

    // Content for the button (icon and text)
    const buttonContent = (
      <>
        <Icon />
        {showText && <span>{item.title}</span>}
      </>
    );

    // If the item has sub-items, it's a group
    if (item.items?.length) {
      const ButtonComponent = isSubMenuLevel > 0 ? SidebarMenuSubButton : SidebarMenuButton;
      
      const groupButton = (
        <ButtonComponent
          onClick={() => toggleSubMenu(item.title)}
          className={cn("justify-between w-full", isSubMenuLevel > 0 && "font-normal text-sm")} 
          isActive={itemIsActive && !openSubMenus[item.title]}
          aria-expanded={openSubMenus[item.title]}
        >
          <div className="flex items-center gap-2">
            {buttonContent}
          </div>
          {showText &&
            (openSubMenus[item.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </ButtonComponent>
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

      const subMenuContent = openSubMenus[item.title] && showText && (
        <SidebarMenuSub className={cn(isSubMenuLevel > 0 && "pl-3 ml-1 border-l-slate-700")}>
          {item.items.map(subItem => renderNavItem(subItem, isSubMenuLevel + 1))}
        </SidebarMenuSub>
      );

      if (isSubMenuLevel > 0) {
        return (
          <SidebarMenuSubItem key={item.title} className="flex flex-col items-stretch">
            {navElement}
            {subMenuContent}
          </SidebarMenuSubItem>
        );
      }
      return (
        <SidebarMenuItem key={item.title}>
          {navElement}
          {subMenuContent}
        </SidebarMenuItem>
      );
    }

    // If the item is a simple link
    const LinkButtonComponent = isSubMenuLevel > 0 ? SidebarMenuSubButton : SidebarMenuButton;
    let navElement: React.ReactNode;

    if (item.href) {
      const linkButton = (
        <LinkButtonComponent asChild isActive={itemIsActive} className={cn(isSubMenuLevel > 0 && "font-normal text-sm")}>
          <Link href={item.href}>{buttonContent}</Link>
        </LinkButtonComponent>
      );
      if (!sidebarOpen && !isMobile) {
        navElement = (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>{linkButton}</TooltipTrigger>
              <TooltipContent side="right" align="center">{item.title}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else {
        navElement = linkButton;
      }
    } else { 
      const simpleButton = (
          <LinkButtonComponent isActive={itemIsActive} className={cn(isSubMenuLevel > 0 && "font-normal text-sm")}>
            {buttonContent}
          </LinkButtonComponent>
      );
       if (!sidebarOpen && !isMobile) {
        navElement = (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>{simpleButton}</TooltipTrigger>
              <TooltipContent side="right" align="center">{item.title}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else {
        navElement = simpleButton;
      }
    }
    
    if (isSubMenuLevel > 0) {
      return <SidebarMenuSubItem key={item.title}>{navElement}</SidebarMenuSubItem>;
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
          {mainNavItems.map(i => renderNavItem(i, 0))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t">
        <SidebarMenu>
          {renderNavItem(settingsNavItem, 0)}
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
                  data-ai-hint="user avatar"
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
    
