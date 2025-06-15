
import { db } from './firebase';
import { collection, doc, writeBatch, getDocs, query, limit } from 'firebase/firestore';
import type { Timestamp } from 'firebase/firestore'; 
import { v4 as uuidv4 } from 'uuid'; 

interface Client {
  id: string;
  name: string;
  phone: string;
  motorcycles: { name: string; licensePlate: string }[];
  loyaltyPoints: number;
  lastVisit: string;
}
const mockClients: Client[] = [
  { id: 'C001', name: 'Rina Amelia', phone: '0812-3456-7890', motorcycles: [{ name: 'Honda Vario 150', licensePlate: 'B 1234 RIN' }, { name: 'Yamaha XMAX', licensePlate: 'B 5678 AML' }], loyaltyPoints: 1250, lastVisit: '2024-07-15' },
  { id: 'C002', name: 'Bambang Pamungkas', phone: '0821-9876-5432', motorcycles: [{ name: 'Kawasaki W175', licensePlate: 'D 4321 BAM' }], loyaltyPoints: 800, lastVisit: '2024-07-10' },
  { id: 'C003', name: 'Siti Fatimah', phone: '0855-1122-3344', motorcycles: [{ name: 'Suzuki Address', licensePlate: 'F 9876 SIT' }], loyaltyPoints: 200, lastVisit: '2024-06-20' },
];

export interface ServiceProductVariant { 
  id: string; 
  name: string;
  price: number;
  pointsAwarded?: number;
  estimatedDuration?: string; // Tambahan baru
}

export interface ServiceProduct { 
  id: string;
  name: string;
  type: 'Layanan' | 'Produk';
  category: string;
  price: number; 
  description?: string;
  pointsAwarded?: number;
  estimatedDuration?: string; // Tambahan baru
  variants?: ServiceProductVariant[];
}
const mockServicesProducts: ServiceProduct[] = [
  { 
    id: 'S001', name: 'Cuci Motor Premium', type: 'Layanan', category: 'Pencucian', price: 0, // Harga dasar 0 karena ada varian
    description: 'Cuci lengkap termasuk bodi, mesin, dan roda.', pointsAwarded: 0, estimatedDuration: "45 mnt",
    variants: [
        {id: uuidv4(), name: "Reguler", price: 75000, pointsAwarded: 50, estimatedDuration: "45 mnt"},
        {id: uuidv4(), name: "Dengan Wax Super", price: 100000, pointsAwarded: 70, estimatedDuration: "1 jam"}
    ]
  },
  { 
    id: 'S002', name: 'Paket Detailing Lengkap', type: 'Layanan', category: 'Detailing', price: 350000, 
    description: 'Termasuk cuci, poles, wax, dan pembersihan interior.', pointsAwarded: 200, estimatedDuration: "3 jam" 
  },
  { 
    id: 'P001', name: 'Pelumas Rantai (Merek X)', type: 'Produk', category: 'Pelumas', price: 0, 
    description: 'Pelumas rantai performa tinggi.', pointsAwarded: 0, // Points should be per variant
    variants: [
        {id: uuidv4(), name: "250ml", price: 60000, pointsAwarded: 30},
        {id: uuidv4(), name: "500ml", price: 100000, pointsAwarded: 50}
    ]
  },
  { id: 'P002', name: 'Set Handuk Mikrofiber', type: 'Produk', category: 'Aksesoris', price: 50000, description: 'Set isi 3 handuk mikrofiber premium.', pointsAwarded: 25 },
  { id: 'S003', name: 'Sanitasi Helm', type: 'Layanan', category: 'Kebersihan', price: 20000, description: 'Membunuh kuman dan menyegarkan interior helm.', pointsAwarded: 10, estimatedDuration: "15 mnt" },
  { id: 'S004', name: 'Cuci Cepat & Wax', type: 'Layanan', category: 'Pencucian', price: 100000, description: 'Cuci bersih plus lapisan wax kilap instan.', pointsAwarded: 75, estimatedDuration: "1 jam 15 mnt" },
  { id: 'P003', name: 'Cairan Pembersih Interior Mobil', type: 'Produk', category: 'Pembersih', price: 85000, description: 'Pembersih interior serbaguna, aman untuk berbagai permukaan.', pointsAwarded: 50 },
  { id: 'S005', name: 'Tune Up Mesin Motor Matic', type: 'Layanan', category: 'Perawatan Mesin', price: 120000, description: 'Pembersihan CVT, busi, filter udara, dan setel klep (jika perlu).', pointsAwarded: 100, estimatedDuration: "1 jam 30 mnt"},
  { id: 'P004', name: 'Oli Mesin Super Matic 0.8L', type: 'Produk', category: 'Pelumas', price: 65000, description: 'Oli mesin khusus motor matic, SAE 10W-30 API SL JASO MB.', pointsAwarded: 40},
];

interface QueueItem {
  id: string;
  customerName: string;
  vehicleInfo: string;
  service: string;
  status: 'Menunggu' | 'Dalam Layanan' | 'Selesai';
  estimatedTime: string; // Ini akan diambil dari service.estimatedDuration
  staff?: string;
}
const mockQueueItems: QueueItem[] = [
  { id: 'Q001', customerName: 'Budi Santoso', vehicleInfo: 'Honda Beat - B 4321 ABC', service: 'Cuci Reguler', status: 'Menunggu', estimatedTime: '45 mnt' },
  { id: 'Q002', customerName: 'Citra Lestari', vehicleInfo: 'Yamaha NMAX - D 8765 XYZ', service: 'Detailing Lengkap', status: 'Dalam Layanan', estimatedTime: 'sisa 45 mnt', staff: 'Andi P.' },
  { id: 'Q003', customerName: 'Ahmad Yani', vehicleInfo: 'Suzuki GSX - A 1122 BBB', service: 'Ganti Ban', status: 'Menunggu', estimatedTime: '30 mnt' },
  { id: 'Q004', customerName: 'Dewi Anggraini', vehicleInfo: 'Kawasaki Ninja - L 5544 CCC', service: 'Ganti Oli', status: 'Selesai', estimatedTime: 'Selesai', staff: 'Rian S.' },
];

interface AttendanceRecord {
  id: string;
  staffName: string;
  date: string; 
  clockIn?: string;
  clockOut?: string;
  status: 'Hadir' | 'Absen' | 'Terlambat' | 'Cuti';
}
const mockAttendanceRecords: AttendanceRecord[] = [
  { id: 'A001', staffName: 'Andi P.', date: '2024-07-28', clockIn: '08:55', clockOut: '17:05', status: 'Hadir' },
  { id: 'A002', staffName: 'Budi S.', date: '2024-07-28', clockIn: '09:15', clockOut: '17:00', status: 'Terlambat' },
  { id: 'A003', staffName: 'Rian S.', date: '2024-07-28', status: 'Absen' },
  { id: 'A004', staffName: 'Siti K.', date: '2024-07-28', clockIn: '09:00', status: 'Hadir' },
  { id: 'A005', staffName: 'Eko W.', date: '2024-07-27', clockIn: '09:02', clockOut: '17:03', status: 'Hadir' },
];

interface PayrollEntry {
  id: string;
  staffName: string;
  period: string; 
  baseSalary: number;
  profitShare: number;
  totalHours: number;
  deductions: number;
  netPay: number;
  status: 'Tertunda' | 'Dibayar' | 'Dibuat';
}
const mockPayrollData: PayrollEntry[] = [
  { id: 'P001', staffName: 'Andi P.', period: 'Juli 2024', baseSalary: 3000000, profitShare: 750000, totalHours: 160, deductions: 150000, netPay: 3600000, status: 'Dibayar' },
  { id: 'P002', staffName: 'Budi S.', period: 'Juli 2024', baseSalary: 2800000, profitShare: 600000, totalHours: 155, deductions: 100000, netPay: 3300000, status: 'Dibayar' },
  { id: 'P003', staffName: 'Rian S.', period: 'Juli 2024', baseSalary: 2500000, profitShare: 450000, totalHours: 150, deductions: 50000, netPay: 2900000, status: 'Tertunda' },
];


async function seedCollection<T extends { id: string }>(collectionName: string, data: T[], checkEmpty: boolean = true) {
  const collectionRef = collection(db, collectionName);

  if (checkEmpty) {
    const q = query(collectionRef, limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      console.log(\`Koleksi \${collectionName} tidak kosong. Melewati penyemaian.\`);
      return;
    }
  }
  
  const batch = writeBatch(db);
  data.forEach(item => {
    const { id, ...itemData } = item; 
    const docRef = doc(collectionRef, id); 
    
    if ('variants' in itemData && Array.isArray((itemData as any).variants)) {
        (itemData as any).variants = (itemData as any).variants.map((v: any) => ({
            ...v,
            id: v.id || uuidv4(),
            estimatedDuration: v.estimatedDuration || undefined,
        }));
    }
    if ('estimatedDuration' in itemData && !(itemData as any).estimatedDuration) {
        delete (itemData as any).estimatedDuration;
    }
    
    batch.set(docRef, itemData);
  });
  await batch.commit();
  console.log(\`Berhasil menyemai koleksi \${collectionName} dengan \${data.length} item.\`);
}

export async function seedAllMockData() {
  try {
    await seedCollection<Client>('clients', mockClients, false); 
    await seedCollection<ServiceProduct>('services', mockServicesProducts, false);
    await seedCollection<QueueItem>('queueItems', mockQueueItems, false);
    await seedCollection<AttendanceRecord>('attendanceRecords', mockAttendanceRecords, false);
    await seedCollection<PayrollEntry>('payrollData', mockPayrollData, false);
    return { success: true, message: 'Semua data mockup berhasil disemai!' };
  } catch (error) {
    console.error("Error seeding data: ", error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan tidak diketahui saat penyemaian.';
    return { success: false, message: \`Error saat menyemai data: \${errorMessage}\` };
  }
}

    
// Untuk menjalankan seeder ini (misalnya, dari script terpisah atau tombol khusus di UI development):
// 1. Pastikan Firebase Emulator (khususnya Firestore) berjalan.
// 2. Pastikan file .env.local sudah di-set dengan NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true.
// 3. Import dan panggil seedAllMockData().
//
// Contoh penggunaan di sebuah halaman/komponen (HANYA UNTUK DEVELOPMENT):
//
// import { Button } from '@/components/ui/button';
// import { seedAllMockData } from '@/lib/seedFirestore'; // Sesuaikan path jika perlu
//
// export default function DevSeederPage() {
//   const handleSeed = async () => {
//     const result = await seedAllMockData();
//     if (result.success) {
//       alert(result.message);
//     } else {
//       alert(\`Gagal seeding: \${result.message}\`);
//     }
//   };
//   if (process.env.NODE_ENV !== 'development') {
//     return <p>Seeder hanya tersedia di mode development.</p>;
//   }
//   return (
//     <div>
//       <h1>Firestore Seeder (Development Only)</h1>
//       <Button onClick={handleSeed}>Seed Mock Data to Emulator</Button>
//     </div>
//   );
// }

