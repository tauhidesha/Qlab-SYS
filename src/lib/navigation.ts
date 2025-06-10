
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, ShoppingCart, ListOrdered, Wrench, BarChartBig, Settings, Clipboard, Banknote, CalendarDays } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  description?: string;
  items?: NavItem[];
  collapsible?: boolean;
}

export const mainNavItems: NavItem[] = [
  {
    title: 'Dasbor',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Gambaran umum aktivitas bengkel.',
  },
  {
    title: 'Penjualan',
    href: '/pos',
    icon: ShoppingCart,
    description: 'Kelola penjualan dan transaksi.',
  },
  {
    title: 'Manajemen Antrian',
    href: '/queue',
    icon: ListOrdered,
    description: 'Kelola antrian pelanggan.',
  },
  {
    title: 'Klien',
    href: '/clients',
    icon: Users,
    description: 'Kelola informasi klien dan sepeda motor.',
  },
  {
    title: 'Layanan & Produk',
    href: '/services',
    icon: Wrench,
    description: 'Kelola katalog layanan dan produk.',
  },
  {
    title: 'Manajemen Staf',
    href: '/staff',
    icon: Clipboard,
    description: 'Kelola absensi dan penggajian staf.',
    collapsible: true,
    items: [
        { title: 'Absensi', href: '/staff/attendance', icon: CalendarDays, description: "Lacak absensi staf."},
        { title: 'Penggajian', href: '/staff/payroll', icon: Banknote, description: "Kelola penggajian staf."},
    ]
  },
  {
    title: 'Laporan',
    href: '/reports',
    icon: BarChartBig,
    description: 'Lihat laporan pendapatan dan pengeluaran.',
  },
];

export const settingsNavItem: NavItem = {
  title: 'Pengaturan',
  href: '/settings',
  icon: Settings,
  description: 'Konfigurasi pengaturan aplikasi.',
};

