
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Search, Loader2, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc, Timestamp, where } from 'firebase/firestore';
import { toast } from "@/hooks/use-toast";
import type { Expense } from '@/types/expense';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DatePickerWithRange } from '@/components/ui/date-picker-range';
import type { DateRange } from "react-day-picker";
import { format as formatDateFns } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';

export default function CashDepositPage() {
  const [deposits, setDeposits] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [depositToDelete, setDepositToDelete] = useState<Expense | null>(null);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

  const formatTimestampToDateString = (timestamp?: Timestamp, formatStr: string = "PPP") => {
    if (!timestamp) return 'N/A';
    return formatDateFns(timestamp.toDate(), formatStr, { locale: indonesiaLocale });
  };

  const fetchDeposits = useCallback(async () => {
    setLoading(true);
    try {
      const expensesCollectionRef = collection(db, 'expenses');
      let q = query(expensesCollectionRef, 
                    where("category", "==", "Setoran Tunai ke Bank"), 
                    orderBy("date", "desc"));

      if (dateRange?.from) {
        const fromTimestamp = Timestamp.fromDate(dateRange.from);
        let toTimestamp = dateRange.to ? Timestamp.fromDate(new Date(dateRange.to.getTime() + 86399999)) : Timestamp.fromDate(new Date(dateRange.from.getTime() + 86399999));
        if (!dateRange.to) dateRange.to = dateRange.from; 

        q = query(
          expensesCollectionRef,
          where("category", "==", "Setoran Tunai ke Bank"),
          where("date", ">=", fromTimestamp),
          where("date", "<=", toTimestamp),
          orderBy("date", "desc")
        );
      }

      const querySnapshot = await getDocs(q);
      const depositsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Expense));
      setDeposits(depositsData);
    } catch (error) {
      console.error("Error fetching cash deposits: ", error);
      toast({
        title: "Error",
        description: "Tidak dapat mengambil data setoran kas dari Firestore.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchDeposits();
  }, [fetchDeposits]);

  const handleDeleteDeposit = async () => {
    if (!depositToDelete) return;
    try {
      await deleteDoc(doc(db, 'expenses', depositToDelete.id));
      toast({
        title: "Sukses",
        description: `Catatan setoran "${depositToDelete.description}" berhasil dihapus.`,
      });
      setDeposits(deposits.filter(deposit => deposit.id !== depositToDelete.id));
      setDepositToDelete(null);
    } catch (error) {
      console.error("Error deleting deposit: ", error);
      toast({
        title: "Error",
        description: "Gagal menghapus catatan setoran.",
        variant: "destructive",
      });
      setDepositToDelete(null);
    }
  };

  const filteredDeposits = deposits.filter(deposit =>
    deposit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (deposit.bankDestination && deposit.bankDestination.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (deposit.notes && deposit.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalFilteredAmount = filteredDeposits.reduce((sum, exp) => sum + exp.amount, 0);

  if (loading && deposits.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Setoran Kas ke Bank" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data setoran kas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Setoran Kas ke Bank" />
      <main className="flex-1 overflow-y-auto p-6">
        <AlertDialog open={!!depositToDelete} onOpenChange={(open) => !open && setDepositToDelete(null)}>
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center"><ArrowRightLeft className="mr-2 h-6 w-6"/>Daftar Setoran Kas</CardTitle>
              <CardDescription>Kelola semua catatan setoran uang tunai ke rekening bank.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
               <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
               <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari (deskripsi, bank, catatan)..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/finance/cash-deposit/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> Catat Setoran Baru
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
                 <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Tgl. Setor</TableHead>
                    <TableHead>Deskripsi (Bank Tujuan)</TableHead>
                    <TableHead className="text-right">Jumlah (Rp)</TableHead>
                    <TableHead>Catatan</TableHead>
                    <TableHead className="text-right w-[100px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeposits.map((deposit) => (
                    <TableRow key={deposit.id}>
                      <TableCell>{formatTimestampToDateString(deposit.date)}</TableCell>
                      <TableCell className="font-medium max-w-[300px] truncate">{deposit.description}</TableCell>
                      <TableCell className="text-right">{deposit.amount.toLocaleString('id-ID')}</TableCell>
                      <TableCell className="text-xs max-w-[200px] truncate">{deposit.notes || '-'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild className="hover:text-primary">
                          <Link href={`/finance/cash-deposit/${deposit.id}/edit`}>
                            <Edit3 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDepositToDelete(deposit)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {filteredDeposits.length === 0 && !loading && (
              <div className="text-center py-10 text-muted-foreground">
                {deposits.length > 0 ? 'Tidak ada setoran yang cocok.' : 'Belum ada catatan setoran kas.'}
                {deposits.length === 0 && <Link href="/finance/cash-deposit/new" className="text-primary hover:underline ml-1">Catat setoran baru</Link>}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Menampilkan {filteredDeposits.length} dari {deposits.length} setoran.
            </p>
            <p className="text-sm font-semibold">
              Total Disetor (Filter): Rp {totalFilteredAmount.toLocaleString('id-ID')}
            </p>
          </CardFooter>
        </Card>
        
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus catatan setoran: "{depositToDelete?.description}" senilai Rp {depositToDelete?.amount.toLocaleString('id-ID')}? Tindakan ini tidak dapat diurungkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDepositToDelete(null)}>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteDeposit} className={buttonVariants({variant: "destructive"})}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
