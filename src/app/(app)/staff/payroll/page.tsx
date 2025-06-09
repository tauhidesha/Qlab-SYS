
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Banknote, Percent, FileText, Filter, Download, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { toast } from "@/hooks/use-toast";

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

export default function PayrollPage() {
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('July 2024'); // Default or from available periods

  // Placeholder for available periods, ideally fetched or generated
  const availablePeriods = ['July 2024', 'June 2024', 'May 2024'];

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
          description: "Could not fetch payroll data from Firestore.",
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
      <AppHeader title="Staff Payroll" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Payroll Management</CardTitle>
              <CardDescription>Manage and process staff payroll.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  {availablePeriods.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button> */}
              <Button><FileText className="mr-2 h-4 w-4" /> Generate Payroll</Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Loading payroll data...</p>
              </div>
            ) : (
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
                  {payrollData.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                        No payroll data for the selected period.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
