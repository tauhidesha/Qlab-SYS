
"use client";

import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-picker-range';
import { Download, Loader2, History } from 'lucide-react';
import { LineChart, Bar, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Legend as RechartsLegend, CartesianGrid, Line, Cell } from 'recharts';
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import type { Transaction } from '@/types/transaction'; // Import Transaction type
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import type { DateRange } from "react-day-picker";

export default function ReportsPage() {
  const [paidTransactions, setPaidTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
  const { toast } = useToast();

  const incomeData = [
    { month: 'Jan', income: 4000000 }, { month: 'Feb', income: 3000000 },
    { month: 'Mar', income: 5000000 }, { month: 'Apr', income: 4500000 },
    { month: 'Mei', income: 6000000 }, { month: 'Jun', income: 5500000 },
    { month: 'Jul', income: 7000000 },
  ];

  const expenseData = [
    { month: 'Jan', expense: 1500000 }, { month: 'Feb', expense: 1200000 },
    { month: 'Mar', expense: 1800000 }, { month: 'Apr', expense: 1600000 },
    { month: 'Mei', expense: 2000000 }, { month: 'Jun', expense: 1900000 },
    { month: 'Jul', expense: 2200000 },
  ];
  
  const serviceBreakdownData = [
    { name: 'Pencucian', value: 400 },
    { name: 'Detailing', value: 300 },
    { name: 'Perbaikan', value: 200 },
    { name: 'Produk', value: 100 },
  ];
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  useEffect(() => {
    const fetchPaidTransactions = async () => {
      setLoadingTransactions(true);
      try {
        const transactionsRef = collection(db, 'transactions');
        let q = query(transactionsRef, where('status', '==', 'paid'), orderBy('paidAt', 'desc'));
        
        if (dateRange?.from && dateRange.to) {
          q = query(transactionsRef, 
            where('status', '==', 'paid'), 
            where('paidAt', '>=', Timestamp.fromDate(dateRange.from)),
            where('paidAt', '<=', Timestamp.fromDate(new Date(dateRange.to.getTime() + 86399999))), // Include end of day
            orderBy('paidAt', 'desc')
          );
        } else if (dateRange?.from) {
           q = query(transactionsRef, 
            where('status', '==', 'paid'), 
            where('paidAt', '>=', Timestamp.fromDate(dateRange.from)),
            orderBy('paidAt', 'desc')
          );
        }


        const querySnapshot = await getDocs(q);
        const transactionsData = querySnapshot.docs.map(doc => {
          const data = doc.data() as Transaction;
          return {
            ...data,
            id: doc.id,
            // Ensure date fields are Timestamps or converted correctly if needed for display
            paidAt: data.paidAt, 
            createdAt: data.createdAt,
          };
        });
        setPaidTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching paid transactions: ", error);
        toast({
          title: "Error",
          description: "Tidak dapat mengambil riwayat transaksi.",
          variant: "destructive",
        });
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchPaidTransactions();
  }, [toast, dateRange]);

  const formatTimestamp = (timestamp?: Timestamp) => {
    if (!timestamp) return 'N/A';
    return timestamp.toDate().toLocaleString('id-ID', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Laporan & Riwayat Transaksi" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Filter Laporan</CardTitle>
              <CardDescription>Pilih rentang tanggal untuk melihat riwayat transaksi.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
              <Button variant="outline" disabled><Download className="mr-2 h-4 w-4" /> Ekspor Laporan</Button>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Transaksi Terbayar</CardTitle>
            <CardDescription>Daftar semua transaksi yang telah berhasil dibayar.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingTransactions ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Memuat riwayat transaksi...</p>
              </div>
            ) : paidTransactions.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                Tidak ada transaksi terbayar yang ditemukan untuk periode yang dipilih.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tgl. Bayar</TableHead>
                    <TableHead>Nama Pelanggan</TableHead>
                    <TableHead className="text-right">Total (Rp)</TableHead>
                    <TableHead>Metode Pembayaran</TableHead>
                    <TableHead>Staf Layanan</TableHead>
                    <TableHead>Catatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatTimestamp(transaction.paidAt)}</TableCell>
                      <TableCell className="font-medium">{transaction.customerName}</TableCell>
                      <TableCell className="text-right">{transaction.total.toLocaleString('id-ID')}</TableCell>
                      <TableCell>{transaction.paymentMethod || 'N/A'}</TableCell>
                      <TableCell>{transaction.serviceStaffName || 'N/A'}</TableCell>
                      <TableCell className="text-xs max-w-[200px] truncate">{transaction.notes || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">Menampilkan {paidTransactions.length} transaksi terbayar.</p>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pendapatan Bulanan (Contoh)</CardTitle>
              <CardDescription>Tren pendapatan selama periode yang dipilih.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incomeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickFormatter={(value) => `Rp${(value/1000000).toLocaleString('id-ID')}Jt`} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                  <RechartsLegend />
                  <Line type="monotone" dataKey="income" name="Pendapatan" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pengeluaran Bulanan (Contoh)</CardTitle>
              <CardDescription>Tren pengeluaran selama periode yang dipilih.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expenseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickFormatter={(value) => `Rp${(value/1000000).toLocaleString('id-ID')}Jt`} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                  <RechartsLegend />
                  <Line type="monotone" dataKey="expense" name="Pengeluaran" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ fill: 'hsl(var(--destructive))' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card>
            <CardHeader>
              <CardTitle>Rincian Layanan (Contoh)</CardTitle>
              <CardDescription>Distribusi layanan/produk yang terjual.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                  <RechartsLegend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

      </main>
    </div>
  );
}


    