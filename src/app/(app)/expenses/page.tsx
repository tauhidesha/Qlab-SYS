
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Search, Loader2, ReceiptText, WalletCards } from 'lucide-react'; // Added WalletCards
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc, Timestamp, where } from 'firebase/firestore'; // Added where
import { toast } from "@/hooks/use-toast";
import type { Expense, ExpenseCategory, PaymentSource } from '@/types/expense';
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
import { Badge } from '@/components/ui/badge';

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
      let firestoreQuery = query(expensesCollectionRef, orderBy("date", "desc"));

      if (dateRange?.from) {
        const fromTimestamp = Timestamp.fromDate(dateRange.from);
        let toTimestamp = dateRange.to ? Timestamp.fromDate(new Date(dateRange.to.getTime() + 86399999)) : Timestamp.fromDate(new Date(dateRange.from.getTime() + 86399999));
        if (!dateRange.to) dateRange.to = dateRange.from;

        firestoreQuery = query(
          expensesCollectionRef,
          where("date", ">=", fromTimestamp),
          where("date", "<=", toTimestamp),
          orderBy("date", "desc")
        );
      }

      const querySnapshot = await getDocs(firestoreQuery);
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
  }, [dateRange]);

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
    (expense.paymentSource && expense.paymentSource.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
    <div className="flex flex-col h-full min-h-0">
      <AppHeader title="Manajemen Pengeluaran" />
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
        <AlertDialog open={!!expenseToDelete} onOpenChange={(open) => !open && setExpenseToDelete(null)}>
        <Card className="h-fit">
          <CardHeader className="pb-4 space-y-4">
            <div>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <ReceiptText className="mr-2 h-5 w-5 sm:h-6 sm:w-6"/>
                Daftar Pengeluaran
              </CardTitle>
              <CardDescription className="text-sm">
                Kelola semua catatan pengeluaran bengkel Anda.
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
                    placeholder="Cari pengeluaran..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button asChild className="w-full sm:w-auto sm:flex-shrink-0">
                <Link href="/expenses/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> 
                  <span>Tambah Baru</span>
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
                        <TableHead className="w-[120px]">Tanggal</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead className="text-right">Jumlah (Rp)</TableHead>
                        <TableHead className="text-center">Sumber Bayar</TableHead>
                        <TableHead>Catatan</TableHead>
                        <TableHead className="text-right w-[100px]">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExpenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>{formatTimestampToDateString(expense.date)}</TableCell>
                          <TableCell>{expense.category}</TableCell>
                          <TableCell className="font-medium max-w-[250px] truncate">{expense.description}</TableCell>
                          <TableCell className="text-right">{expense.amount.toLocaleString('id-ID')}</TableCell>
                          <TableCell className="text-center">
                            {expense.paymentSource ? (
                              <Badge variant={expense.paymentSource === "Kas Tunai" ? "secondary" : "outline"} className="text-xs">
                                <WalletCards className="mr-1 h-3 w-3"/>{expense.paymentSource}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell className="text-xs max-w-[150px] truncate">{expense.notes || '-'}</TableCell>
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
                </div>

                {/* Mobile & Tablet Card View */}
                <div className="lg:hidden space-y-3">
                  {filteredExpenses.map((expense) => (
                    <Card key={expense.id} className="shadow-sm border border-gray-200">
                      <div className="p-3 space-y-3">
                        {/* Header Row: Date and Payment Source */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground font-medium">
                            {formatTimestampToDateString(expense.date, "dd/MM/yyyy")}
                          </div>
                          {expense.paymentSource && (
                            <Badge variant={expense.paymentSource === "Kas Tunai" ? "secondary" : "outline"} className="text-xs">
                              <WalletCards className="mr-1 h-3 w-3"/>
                              {expense.paymentSource}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Description and Category */}
                        <div className="space-y-1">
                          <h3 className="font-semibold text-base leading-tight">{expense.description}</h3>
                          <p className="text-sm text-muted-foreground">{expense.category}</p>
                        </div>
                        
                        {/* Amount and Actions Row */}
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-red-600">
                            Rp {expense.amount.toLocaleString('id-ID')}
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" asChild className="hover:text-primary h-8 w-8">
                              <Link href={`/expenses/${expense.id}/edit`}>
                                <Edit3 className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8" onClick={() => setExpenseToDelete(expense)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                          </div>
                        </div>
                        
                        {/* Notes - if available */}
                        {expense.notes && (
                          <div className="pt-2 border-t border-gray-100">
                            <div className="text-xs text-muted-foreground">
                              <span className="font-medium">Catatan:</span> {expense.notes}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
            {filteredExpenses.length === 0 && !loading && (
              <div className="text-center py-12 text-muted-foreground">
                <div className="space-y-2">
                  <p className="text-base">
                    {expenses.length > 0 ? 'Tidak ada pengeluaran yang cocok.' : 'Belum ada data pengeluaran.'}
                  </p>
                  {expenses.length === 0 && (
                    <Link href="/expenses/new" className="inline-flex items-center text-primary hover:underline">
                      <PlusCircle className="mr-1 h-4 w-4" />
                      Tambah pengeluaran baru
                    </Link>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 px-3 sm:px-6 py-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              Menampilkan <span className="font-medium">{filteredExpenses.length}</span> dari <span className="font-medium">{expenses.length}</span> pengeluaran
            </p>
            <div className="text-sm font-semibold text-center sm:text-right">
              <span className="text-muted-foreground">Total (Filter): </span>
              <span className="text-red-600">Rp {totalFilteredAmount.toLocaleString('id-ID')}</span>
            </div>
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
