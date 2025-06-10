
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, ShoppingCart, ListOrdered, Wrench, BarChartBig, Settings, Clipboard, Banknote, CalendarDays, ClipboardList, Percent, ReceiptText, Landmark } from 'lucide-react';

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
    title: 'Keuangan', // Menu Utama Baru
    href: '/finance', // Base href, bisa juga tidak ada jika hanya grup
    icon: Landmark, // Ikon untuk menu Keuangan
    description: 'Kelola pemasukan, pengeluaran, dan laporan keuangan.',
    collapsible: true,
    items: [
      {
        title: 'Pemasukan (POS)',
        href: '/pos',
        icon: ShoppingCart, // Ikon yang sama dengan Penjualan sebelumnya
        description: 'Kelola penjualan dan transaksi.',
      },
      {
        title: 'Pengeluaran',
        href: '/expenses',
        icon: ReceiptText, // Ikon yang sama dengan Pengeluaran sebelumnya
        description: 'Catat dan kelola pengeluaran bengkel.',
      },
      {
        title: 'Laporan Keuangan',
        href: '/reports',
        icon: BarChartBig, // Ikon yang sama dengan Laporan sebelumnya
        description: 'Lihat laporan pendapatan dan pengeluaran.',
      },
    ],
  },
  {
    title: 'Manajemen Staf',
    href: '/staff', 
    icon: Clipboard,
    description: 'Kelola data, absensi, penggajian, dan bagi hasil staf.',
    collapsible: true,
    items: [
        { title: 'Daftar Staf', href: '/staff/list', icon: ClipboardList, description: "Kelola daftar dan detail staf."},
        { title: 'Absensi', href: '/staff/attendance', icon: CalendarDays, description: "Lacak absensi staf."},
        { title: 'Penggajian Bulanan', href: '/staff/payroll', icon: Banknote, description: "Kelola penggajian bulanan staf."},
        { title: 'Bagi Hasil Harian', href: '/staff/profit-sharing', icon: Percent, description: "Kelola bagi hasil harian staf."}
    ]
  },
];

export const settingsNavItem: NavItem = {
  title: 'Pengaturan',
  href: '/settings',
  icon: Settings,
  description: 'Konfigurasi pengaturan aplikasi.',
};

