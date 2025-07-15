
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
    <div className="flex flex-col h-full min-h-0">
      <AppHeader title="Setoran Kas ke Bank" />
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
        <AlertDialog open={!!depositToDelete} onOpenChange={(open) => !open && setDepositToDelete(null)}>
        <Card className="h-fit">
          <CardHeader className="pb-4 space-y-4">
            <div>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <ArrowRightLeft className="mr-2 h-5 w-5 sm:h-6 sm:w-6"/>
                Daftar Setoran Kas
              </CardTitle>
              <CardDescription className="text-sm">
                Kelola semua catatan setoran uang tunai ke rekening bank.
              </CardDescription>
            </div>
            
            {/* Mobile-first controls layout */}
            <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-2">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:items-center">
                <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari setoran..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button asChild className="w-full sm:w-auto sm:flex-shrink-0">
                <Link href="/finance/cash-deposit/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> 
                  <span>Catat Setoran Baru</span>
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            {loading ? (
                 <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
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
                </div>

                {/* Mobile & Tablet Card View */}
                <div className="lg:hidden space-y-3">
                  {filteredDeposits.map((deposit) => (
                    <Card key={deposit.id} className="shadow-sm border border-gray-200">
                      <div className="p-3 space-y-3">
                        {/* Header Row: Date */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground font-medium">
                            {formatTimestampToDateString(deposit.date, "dd/MM/yyyy")}
                          </div>
                          <div className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                            Setoran Kas
                          </div>
                        </div>
                        
                        {/* Description */}
                        <div className="space-y-1">
                          <h3 className="font-semibold text-base leading-tight">{deposit.description}</h3>
                          {deposit.bankDestination && (
                            <p className="text-sm text-muted-foreground">Bank: {deposit.bankDestination}</p>
                          )}
                        </div>
                        
                        {/* Amount and Actions Row */}
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-green-600">
                            Rp {deposit.amount.toLocaleString('id-ID')}
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" asChild className="hover:text-primary h-8 w-8">
                              <Link href={`/finance/cash-deposit/${deposit.id}/edit`}>
                                <Edit3 className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8" onClick={() => setDepositToDelete(deposit)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                          </div>
                        </div>
                        
                        {/* Notes - if available */}
                        {deposit.notes && (
                          <div className="pt-2 border-t border-gray-100">
                            <div className="text-xs text-muted-foreground">
                              <span className="font-medium">Catatan:</span> {deposit.notes}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
            {filteredDeposits.length === 0 && !loading && (
              <div className="text-center py-12 text-muted-foreground">
                <div className="space-y-2">
                  <p className="text-base">
                    {deposits.length > 0 ? 'Tidak ada setoran yang cocok.' : 'Belum ada catatan setoran kas.'}
                  </p>
                  {deposits.length === 0 && (
                    <Link href="/finance/cash-deposit/new" className="inline-flex items-center text-primary hover:underline">
                      <PlusCircle className="mr-1 h-4 w-4" />
                      Catat setoran baru
                    </Link>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 px-3 sm:px-6 py-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              Menampilkan <span className="font-medium">{filteredDeposits.length}</span> dari <span className="font-medium">{deposits.length}</span> setoran
            </p>
            <div className="text-sm font-semibold text-center sm:text-right">
              <span className="text-muted-foreground">Total Disetor (Filter): </span>
              <span className="text-green-600">Rp {totalFilteredAmount.toLocaleString('id-ID')}</span>
            </div>
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
