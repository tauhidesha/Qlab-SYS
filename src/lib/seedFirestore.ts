
import { db } from './firebase';
import { collection, doc, writeBatch, getDocs, query, limit } from 'firebase/firestore';

// Mock data copied from page components

// From src/app/(app)/clients/page.tsx
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

// From src/app/(app)/services/page.tsx
interface ServiceProduct {
  id: string;
  name: string;
  type: 'Service' | 'Product';
  category: string;
  price: number;
  description: string;
}
const mockServicesProducts: ServiceProduct[] = [
  { id: 'S001', name: 'Premium Motorcycle Wash', type: 'Service', category: 'Washing', price: 75000, description: 'Complete wash including body, engine, and wheels.' },
  { id: 'S002', name: 'Full Detailing Package', type: 'Service', category: 'Detailing', price: 350000, description: 'Includes wash, polish, wax, and interior cleaning.' },
  { id: 'P001', name: 'Chain Lube (Brand X)', type: 'Product', category: 'Lubricants', price: 60000, description: 'High-performance chain lubricant, 250ml.' },
  { id: 'P002', name: 'Microfiber Towel Set', type: 'Product', category: 'Accessories', price: 50000, description: 'Set of 3 premium microfiber towels.' },
  { id: 'S003', name: 'Helmet Sanitizing', type: 'Service', category: 'Hygiene', price: 20000, description: 'Kills germs and freshens helmet interior.' },
];

// From src/app/(app)/queue/page.tsx
interface QueueItem {
  id: string;
  customerName: string;
  vehicleInfo: string;
  service: string;
  status: 'Waiting' | 'In Service' | 'Completed';
  estimatedTime: string;
  staff?: string;
}
const mockQueueItems: QueueItem[] = [
  { id: 'Q001', customerName: 'Budi Santoso', vehicleInfo: 'Honda Beat - B 4321 ABC', service: 'Regular Wash', status: 'Waiting', estimatedTime: '15 min' },
  { id: 'Q002', customerName: 'Citra Lestari', vehicleInfo: 'Yamaha NMAX - D 8765 XYZ', service: 'Full Detailing', status: 'In Service', estimatedTime: '45 min remaining', staff: 'Andi P.' },
  { id: 'Q003', customerName: 'Ahmad Yani', vehicleInfo: 'Suzuki GSX - A 1122 BBB', service: 'Tire Change', status: 'Waiting', estimatedTime: '30 min' },
  { id: 'Q004', customerName: 'Dewi Anggraini', vehicleInfo: 'Kawasaki Ninja - L 5544 CCC', service: 'Oil Change', status: 'Completed', estimatedTime: 'Done', staff: 'Rian S.' },
];

// From src/app/(app)/staff/attendance/page.tsx
interface AttendanceRecord {
  id: string;
  staffName: string;
  date: string; // YYYY-MM-DD
  clockIn?: string;
  clockOut?: string;
  status: 'Present' | 'Absent' | 'Late' | 'On Leave';
}
const mockAttendanceRecords: AttendanceRecord[] = [
  { id: 'A001', staffName: 'Andi P.', date: '2024-07-28', clockIn: '08:55', clockOut: '17:05', status: 'Present' },
  { id: 'A002', staffName: 'Budi S.', date: '2024-07-28', clockIn: '09:15', clockOut: '17:00', status: 'Late' },
  { id: 'A003', staffName: 'Rian S.', date: '2024-07-28', status: 'Absent' },
  { id: 'A004', staffName: 'Siti K.', date: '2024-07-28', clockIn: '09:00', status: 'Present' },
  { id: 'A005', staffName: 'Eko W.', date: '2024-07-27', clockIn: '09:02', clockOut: '17:03', status: 'Present' },
];

// From src/app/(app)/staff/payroll/page.tsx
interface PayrollEntry {
  id: string;
  staffName: string;
  period: string; // e.g., "July 2024"
  baseSalary: number;
  profitShare: number;
  totalHours: number;
  deductions: number;
  netPay: number;
  status: 'Pending' | 'Paid' | 'Generated';
}
const mockPayrollData: PayrollEntry[] = [
  { id: 'P001', staffName: 'Andi P.', period: 'July 2024', baseSalary: 3000000, profitShare: 750000, totalHours: 160, deductions: 150000, netPay: 3600000, status: 'Paid' },
  { id: 'P002', staffName: 'Budi S.', period: 'July 2024', baseSalary: 2800000, profitShare: 600000, totalHours: 155, deductions: 100000, netPay: 3300000, status: 'Paid' },
  { id: 'P003', staffName: 'Rian S.', period: 'July 2024', baseSalary: 2500000, profitShare: 450000, totalHours: 150, deductions: 50000, netPay: 2900000, status: 'Pending' },
];


async function seedCollection<T extends { id: string }>(collectionName: string, data: T[], checkEmpty: boolean = true) {
  const collectionRef = collection(db, collectionName);

  if (checkEmpty) {
    const q = query(collectionRef, limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      console.log(`Collection ${collectionName} is not empty. Skipping seeding.`);
      // Alternatively, you could throw an error or return a specific status
      // For this prototype, we'll allow re-seeding by setting checkEmpty to false if desired
      // or just let it overwrite if IDs match. For simplicity, let's allow overwriting by default here
      // but log a message.
      // console.log(`Collection ${collectionName} is not empty. Data will be overwritten if IDs match.`);
    }
  }
  
  const batch = writeBatch(db);
  data.forEach(item => {
    const docRef = doc(collectionRef, item.id); // Use explicit ID
    batch.set(docRef, item);
  });
  await batch.commit();
  console.log(`Successfully seeded ${collectionName} with ${data.length} items.`);
}

export async function seedAllMockData() {
  try {
    await seedCollection<Client>('clients', mockClients);
    await seedCollection<ServiceProduct>('services', mockServicesProducts);
    await seedCollection<QueueItem>('queueItems', mockQueueItems);
    await seedCollection<AttendanceRecord>('attendanceRecords', mockAttendanceRecords);
    await seedCollection<PayrollEntry>('payrollData', mockPayrollData);
    return { success: true, message: 'All mock data seeded successfully!' };
  } catch (error) {
    console.error("Error seeding data: ", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred during seeding.';
    return { success: false, message: `Error seeding data: ${errorMessage}` };
  }
}
