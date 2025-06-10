
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Search, Loader2, ReceiptText } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { toast } from "@/hooks/use-toast";
import type { Expense, ExpenseCategory } from '@/types/expense';
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

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

  const formatTimestampToDateString = (timestamp?: Timestamp, formatStr: string = "PPP") => {
    if (!timestamp) return 'N/A';
    return formatDateFns(timestamp.toDate(), formatStr, { locale: indonesiaLocale });
  };

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const expensesCollectionRef = collection(db, 'expenses');
      let q = query(expensesCollectionRef, orderBy("date", "desc"));

      if (dateRange?.from) {
        const fromTimestamp = Timestamp.fromDate(dateRange.from);
        let toTimestamp = dateRange.to ? Timestamp.fromDate(new Date(dateRange.to.getTime() + 86399999)) : Timestamp.fromDate(new Date(dateRange.from.getTime() + 86399999));
        if (!dateRange.to) dateRange.to = dateRange.from; // Ensure 'to' is set if only 'from'

        q = query(
          expensesCollectionRef,
          where("date", ">=", fromTimestamp),
          where("date", "<=", toTimestamp),
          orderBy("date", "desc")
        );
      }

      const querySnapshot = await getDocs(q);
      const expensesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Expense));
      setExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching expenses: ", error);
      toast({
        title: "Error",
        description: "Tidak dapat mengambil data pengeluaran dari Firestore.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [dateRange, toast]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDeleteExpense = async () => {
    if (!expenseToDelete) return;
    try {
      await deleteDoc(doc(db, 'expenses', expenseToDelete.id));
      toast({
        title: "Sukses",
        description: `Pengeluaran "${expenseToDelete.description}" berhasil dihapus.`,
      });
      setExpenses(expenses.filter(expense => expense.id !== expenseToDelete.id));
      setExpenseToDelete(null);
    } catch (error) {
      console.error("Error deleting expense: ", error);
      toast({
        title: "Error",
        description: "Gagal menghapus pengeluaran.",
        variant: "destructive",
      });
      setExpenseToDelete(null);
    }
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (expense.notes && expense.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalFilteredAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  if (loading && expenses.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Manajemen Pengeluaran" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data pengeluaran...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Manajemen Pengeluaran" />
      <main className="flex-1 overflow-y-auto p-6">
        <AlertDialog open={!!expenseToDelete} onOpenChange={(open) => !open && setExpenseToDelete(null)}>
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center"><ReceiptText className="mr-2 h-6 w-6"/>Daftar Pengeluaran</CardTitle>
              <CardDescription>Kelola semua catatan pengeluaran bengkel Anda.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
               <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
               <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari pengeluaran..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/expenses/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> Tambah Baru
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
                    <TableHead className="w-[120px]">Tanggal</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead className="text-right">Jumlah (Rp)</TableHead>
                    <TableHead>Catatan</TableHead>
                    <TableHead className="text-right w-[100px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{formatTimestampToDateString(expense.date)}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell className="font-medium max-w-[300px] truncate">{expense.description}</TableCell>
                      <TableCell className="text-right">{expense.amount.toLocaleString('id-ID')}</TableCell>
                      <TableCell className="text-xs max-w-[200px] truncate">{expense.notes || '-'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild className="hover:text-primary">
                          <Link href={`/expenses/${expense.id}/edit`}>
                            <Edit3 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setExpenseToDelete(expense)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {filteredExpenses.length === 0 && !loading && (
              <div className="text-center py-10 text-muted-foreground">
                {expenses.length > 0 ? 'Tidak ada pengeluaran yang cocok.' : 'Belum ada data pengeluaran.'}
                {expenses.length === 0 && <Link href="/expenses/new" className="text-primary hover:underline ml-1">Tambah pengeluaran baru</Link>}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Menampilkan {filteredExpenses.length} dari {expenses.length} pengeluaran.
            </p>
            <p className="text-sm font-semibold">
              Total Pengeluaran (Filter): Rp {totalFilteredAmount.toLocaleString('id-ID')}
            </p>
          </CardFooter>
        </Card>
        
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus pengeluaran: "{expenseToDelete?.description}"? Tindakan ini tidak dapat diurungkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setExpenseToDelete(null)}>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteExpense} className={buttonVariants({variant: "destructive"})}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
