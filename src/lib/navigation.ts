
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, ShoppingCart, ListOrdered, Wrench, BarChartBig, Settings, Clipboard, Banknote, CalendarDays, ClipboardList, Percent, ReceiptText, Landmark, DollarSign, TrendingUp, History, ArrowRightLeft, FileText, Wallet, Palette, Bell, CreditCard as CreditCardIcon, Award, Gift, SlidersHorizontal, Settings2 } from 'lucide-react'; // Added SlidersHorizontal, Settings2 and ensured others are present

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
    href: '#', // Parent, not a direct link
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
        href: '#', // Parent, not a direct link
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
            title: 'Arus Kas Bank',
            href: '/reports/cash-flow',
            icon: FileText,
            description: 'Analisis arus kas masuk dan keluar rekening bank.',
          },
          {
            title: 'Arus Kas Fisik',
            href: '/reports/physical-cash-flow',
            icon: Wallet, 
            description: 'Analisis arus kas fisik (tunai).',
          },
        ]
      },
    ],
  },
  {
    title: 'Manajemen Staf',
    href: '#', // Parent, not a direct link
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
  href: '/settings', // Main settings link
  icon: Settings, // Main settings icon
  description: 'Konfigurasi pengaturan aplikasi.',
  collapsible: true,
  items: [ 
    { title: 'Umum', href: '/settings?tab=general', icon: SlidersHorizontal, description: 'Pengaturan umum bengkel.'}, // Changed from Building/Building2/Settings2
    { title: 'Loyalitas', href: '/settings?tab=loyalty', icon: Gift, description: 'Pengaturan program loyalitas.'},
    { title: 'Reward Loyalitas', href: '/settings?tab=loyalty_rewards', icon: Award, description: 'Kelola reward untuk poin loyalitas.'},
    { title: 'Tampilan', href: '/settings?tab=appearance', icon: Palette, description: 'Sesuaikan tampilan aplikasi.'},
    { title: 'Notifikasi', href: '/settings?tab=notifications', icon: Bell, description: 'Kelola preferensi notifikasi.'},
    { title: 'Peran Pengguna', href: '/settings?tab=users', icon: Users, description: 'Kelola akun staf dan akses.'}, // Changed from UserCog to Users
    { title: 'Tagihan', href: '/settings?tab=billing', icon: CreditCardIcon, description: 'Kelola langganan dan pembayaran.'},
  ]
};
