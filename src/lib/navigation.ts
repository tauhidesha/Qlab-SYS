
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, ShoppingCart, ListOrdered, Wrench, BarChartBig, Settings, Clipboard, Banknote, CalendarDays, ClipboardList, Percent, ReceiptText, Landmark, DollarSign, TrendingUp, History, ArrowRightLeft, FileText, Wallet, Palette, Bell, CreditCard as CreditCardIcon, Award, Gift, SlidersHorizontal, Settings2, Package, MessageSquareText, Zap, CalendarPlus, Bot, Activity } from 'lucide-react'; // Added Bot, Activity

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
    title: 'AI Assistant',
    href: '/ai-cs-assistant',
    icon: Bot,
    description: 'Asisten AI untuk customer service WhatsApp.',
  },
  {
    title: 'AI Monitoring',
    href: '/monitoring',
    icon: Activity,
    description: 'Monitor performa dan kesehatan sistem AI.',
  },
  {
    title: 'Manajemen Antrian',
    href: '#', // Menjadi grup
    icon: ListOrdered,
    description: 'Kelola antrian pelanggan dan jadwal booking.',
    collapsible: true,
    items: [
      {
        title: 'Daftar Antrian',
        href: '/queue',
        icon: ListOrdered, // Bisa sama atau beda
        description: 'Kelola antrian pelanggan saat ini.',
      },
      {
        title: 'Kalender Booking',
        href: '/bookings',
        icon: CalendarDays, // Icon baru untuk kalender
        description: 'Lihat dan kelola jadwal booking.',
      },
    ]
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
    title: 'Inventaris',
    href: '#', 
    icon: Package,
    description: 'Kelola stok produk.',
    collapsible: true,
    items: [
      {
        title: 'Daftar Produk',
        href: '/inventory/products',
        icon: Package, 
        description: 'Lihat dan kelola stok produk fisik.',
      },
    ],
  },
  {
    title: 'Keuangan',
    href: '#', 
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
        href: '#', 
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
    href: '#', 
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
    
