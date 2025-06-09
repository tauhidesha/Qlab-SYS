import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Banknote, Percent, FileText, Filter, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PayrollEntry {
  id: string;
  staffName: string;
  period: string;
  baseSalary: number;
  profitShare: number; // 25% of service price from services they performed
  totalHours: number;
  deductions: number;
  netPay: number;
  status: 'Pending' | 'Paid' | 'Generated';
}

export default function PayrollPage() {
  const payrollData: PayrollEntry[] = [
    { id: 'P001', staffName: 'Andi P.', period: 'July 2024', baseSalary: 3000000, profitShare: 750000, totalHours: 160, deductions: 150000, netPay: 3600000, status: 'Paid' },
    { id: 'P002', staffName: 'Budi S.', period: 'July 2024', baseSalary: 2800000, profitShare: 600000, totalHours: 155, deductions: 100000, netPay: 3300000, status: 'Paid' },
    { id: 'P003', staffName: 'Rian S.', period: 'July 2024', baseSalary: 2500000, profitShare: 450000, totalHours: 150, deductions: 50000, netPay: 2900000, status: 'Pending' },
  ];

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Staff Payroll" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Payroll Management</CardTitle>
              <CardDescription>Manage and process staff payroll.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="july-2024">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="july-2024">July 2024</SelectItem>
                  <SelectItem value="june-2024">June 2024</SelectItem>
                  <SelectItem value="may-2024">May 2024</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
              <Button><FileText className="mr-2 h-4 w-4" /> Generate Payroll</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Name</TableHead>
                  <TableHead className="text-right">Base Salary</TableHead>
                  <TableHead className="text-right">Profit Share (25%)</TableHead>
                  <TableHead className="text-right">Net Pay</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollData.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.staffName}</TableCell>
                    <TableCell className="text-right">Rp {entry.baseSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-right">Rp {entry.profitShare.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-semibold">Rp {entry.netPay.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${entry.status === 'Paid' ? 'bg-green-500/20 text-green-700 dark:text-green-400' : entry.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' : 'bg-blue-500/20 text-blue-700 dark:text-blue-400'}`}>
                        {entry.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2">View Details</Button>
                      {entry.status === 'Pending' && <Button size="sm">Mark as Paid</Button>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {payrollData.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                No payroll data for the selected period.
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export All</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
