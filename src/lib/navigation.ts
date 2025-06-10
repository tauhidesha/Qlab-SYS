
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, ShoppingCart, ListOrdered, Wrench, BarChartBig, Settings, Clipboard, Banknote, CalendarDays, ClipboardList, Percent, ReceiptText, Landmark, DollarSign, TrendingUp, History, ArrowRightLeft, FileText } from 'lucide-react'; // Added FileText for Laporan Arus Kas

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
    title: 'Penjualan (POS)',
    href: '/pos',
    icon: ShoppingCart,
    description: 'Kelola penjualan dan transaksi.',
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
    title: 'Keuangan',
    href: '/finance', 
    icon: Landmark,
    description: 'Kelola pemasukan, pengeluaran, dan laporan keuangan.',
    collapsible: true,
    items: [
      {
        title: 'Pemasukan Lain',
        href: '/income',
        icon: DollarSign,
        description: 'Catat pemasukan di luar penjualan POS.',
      },
      {
        title: 'Pengeluaran',
        href: '/expenses',
        icon: ReceiptText,
        description: 'Catat dan kelola pengeluaran bengkel.',
      },
      {
        title: 'Setoran Kas', 
        href: '/finance/cash-deposit',
        icon: ArrowRightLeft, 
        description: 'Catat setoran uang tunai ke bank.',
      },
      {
        title: 'Laporan',
        href: '/reports', 
        icon: BarChartBig,
        description: 'Lihat berbagai laporan keuangan.',
        collapsible: true,
        items: [
          {
            title: 'Riwayat Transaksi',
            href: '/reports', 
            icon: History, 
            description: 'Lihat semua transaksi terbayar.'
          },
          {
            title: 'Laba Rugi Bulanan',
            href: '/reports/profit-loss', 
            icon: TrendingUp, 
            description: 'Analisis laba rugi per bulan.'
          },
          {
            title: 'Arus Kas',
            href: '/reports/cash-flow',
            icon: FileText, // Menggunakan FileText untuk laporan arus kas
            description: 'Analisis arus kas masuk dan keluar.',
          },
        ]
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

