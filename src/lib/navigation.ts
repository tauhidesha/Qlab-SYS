import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, ShoppingCart, ListOrdered, Wrench, Palette, BarChartBig, Settings, Clipboard, Banknote, CalendarDays, Bike } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  description?: string;
  items?: NavItem[];
  collapsible?: boolean; // Added for sidebar group
}

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview of workshop activities.',
  },
  {
    title: 'AI Visualizer',
    href: '/ai-visualizer',
    icon: Palette,
    description: 'Visualize vehicle repaints.',
  },
  {
    title: 'Point of Sale',
    href: '/pos',
    icon: ShoppingCart,
    description: 'Manage sales and transactions.',
  },
  {
    title: 'Queue Management',
    href: '/queue',
    icon: ListOrdered,
    description: 'Manage customer queues.',
  },
  {
    title: 'Clients',
    href: '/clients',
    icon: Users,
    description: 'Manage client information and motorcycles.',
  },
  {
    title: 'Services & Products',
    href: '/services',
    icon: Wrench,
    description: 'Manage service and product catalog.',
  },
  {
    title: 'Staff Management',
    href: '/staff', // Parent route for staff section
    icon: Clipboard, // Changed from ClipboardUser
    description: 'Manage staff attendance and payroll.',
    collapsible: true,
    items: [
        { title: 'Attendance', href: '/staff/attendance', icon: CalendarDays, description: "Track staff attendance."},
        { title: 'Payroll', href: '/staff/payroll', icon: Banknote, description: "Manage staff payroll."},
    ]
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChartBig,
    description: 'View income and expense reports.',
  },
];

export const settingsNavItem: NavItem = {
  title: 'Settings',
  href: '/settings',
  icon: Settings,
  description: 'Configure application settings.',
};
