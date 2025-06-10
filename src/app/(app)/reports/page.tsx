
"use client";

import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-picker-range';
import { Download, Loader2, History } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import type { Transaction } from '@/types/transaction';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import type { DateRange } from "react-day-picker";

export default function TransactionHistoryPage() {
  const [paidTransactions, setPaidTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
  const { toast } = useToast();


  useEffect(() => {
    const fetchPaidTransactions = async () => {
      setLoadingTransactions(true);
      try {
        const transactionsRef = collection(db, 'transactions');
        let q = query(transactionsRef, where('status', '==', 'paid'), orderBy('paidAt', 'desc'));
        
        if (dateRange?.from) {
          const fromTimestamp = Timestamp.fromDate(dateRange.from);
          let toTimestamp = dateRange.to ? Timestamp.fromDate(new Date(dateRange.to.getTime() + 86399999)) : Timestamp.fromDate(new Date(dateRange.from.getTime() + 86399999)); // End of day for 'from' if 'to' is not set
          if (!dateRange.to) dateRange.to = dateRange.from;

          q = query(transactionsRef, 
            where('status', '==', 'paid'), 
            where('paidAt', '>=', fromTimestamp),
            where('paidAt', '<=', toTimestamp),
            orderBy('paidAt', 'desc')
          );
        }


        const querySnapshot = await getDocs(q);
        const transactionsData = querySnapshot.docs.map(doc => {
          const data = doc.data() as Transaction;
          return {
            ...data,
            id: doc.id,
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
      <AppHeader title="Riwayat Transaksi" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Filter Riwayat</CardTitle>
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
            <CardTitle className="flex items-center"><History className="mr-2 h-5 w-5"/>Riwayat Transaksi Terbayar</CardTitle>
            <CardDescription>Daftar semua transaksi yang telah berhasil dibayar berdasarkan filter tanggal di atas.</CardDescription>
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
      </main>
    </div>
  );
}
