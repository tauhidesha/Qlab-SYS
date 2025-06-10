
import type { Timestamp } from 'firebase/firestore';

export interface PayrollEntry {
  id: string;
  staffId: string;
  staffName: string;
  period: string; // e.g., "Juli 2024"
  baseSalary: number;
  totalHours?: number; // Masih opsional untuk saat ini
  
  manualDeductions?: number; // Potongan manual dari input dialog
  latenessDeduction?: number; // Potongan keterlambatan (dihitung)
  absenceDeduction?: number;  // Potongan absensi (dihitung)
  telatBukaDeduction?: number; // Potongan jika semua staf telat buka (dihitung)
  totalDeductions: number;    // Jumlah dari manualDeductions + semua potongan terhitung

  profitShareReceivedThisPeriod?: number; // Total bagi hasil harian yang sudah dibayar dalam periode ini

  netPay: number; // baseSalary - totalDeductions
  status: 'Tertunda' | 'Dibayar' | 'Dibuat'; // 'Dibuat': auto-created, 'Tertunda': reviewed/ready, 'Dibayar': paid
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paidAt?: Timestamp;
  calculationDetails?: string; // Opsional: untuk menyimpan catatan tentang bagaimana potongan dihitung
}

