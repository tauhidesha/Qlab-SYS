
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Banknote, FileText, Download, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { toast } from "@/hooks/use-toast";

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

export default function PayrollPage() {
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Juli 2024'); 

  const availablePeriods = ['Juli 2024', 'Juni 2024', 'Mei 2024'];

  useEffect(() => {
    const fetchPayrollData = async (period: string) => {
      setLoading(true);
      try {
        const payrollCollectionRef = collection(db, 'payrollData');
        const q = query(payrollCollectionRef, where("period", "==", period), orderBy("staffName"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PayrollEntry));
        setPayrollData(data);
      } catch (error) {
        console.error("Error fetching payroll data: ", error);
        toast({
          title: "Error",
          description: "Tidak dapat mengambil data penggajian dari Firestore.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    if (selectedPeriod) {
      fetchPayrollData(selectedPeriod);
    }
  }, [selectedPeriod]);

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Penggajian Staf" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manajemen Penggajian</CardTitle>
              <CardDescription>Kelola dan proses penggajian staf.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pilih Periode" />
                </SelectTrigger>
                <SelectContent>
                  {availablePeriods.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button><FileText className="mr-2 h-4 w-4" /> Buat Penggajian</Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Memuat data penggajian...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Staf</TableHead>
                    <TableHead className="text-right">Gaji Pokok</TableHead>
                    <TableHead className="text-right">Bagi Hasil (25%)</TableHead>
                    <TableHead className="text-right">Gaji Bersih</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.staffName}</TableCell>
                      <TableCell className="text-right">Rp {entry.baseSalary.toLocaleString('id-ID')}</TableCell>
                      <TableCell className="text-right">Rp {entry.profitShare.toLocaleString('id-ID')}</TableCell>
                      <TableCell className="text-right font-semibold">Rp {entry.netPay.toLocaleString('id-ID')}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${entry.status === 'Dibayar' ? 'bg-green-500/20 text-green-700 dark:text-green-400' : entry.status === 'Tertunda' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' : 'bg-blue-500/20 text-blue-700 dark:text-blue-400'}`}>
                          {entry.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">Lihat Detail</Button>
                        {entry.status === 'Tertunda' && <Button size="sm">Tandai Dibayar</Button>}
                      </TableCell>
                    </TableRow>
                  ))}
                  {payrollData.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                        Tidak ada data penggajian untuk periode yang dipilih.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Ekspor Semua</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
