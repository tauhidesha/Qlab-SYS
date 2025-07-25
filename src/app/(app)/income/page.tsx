
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Search, Loader2, DollarSign, CreditCard } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc, Timestamp, where } from 'firebase/firestore';
import { toast } from "@/hooks/use-toast";
import type { IncomeEntry } from '@/types/income';
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

export default function IncomePage() {
  const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [entryToDelete, setEntryToDelete] = useState<IncomeEntry | null>(null);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

  const formatTimestampToDateString = (timestamp?: Timestamp, formatStr: string = "PPP") => {
    if (!timestamp) return 'N/A';
    return formatDateFns(timestamp.toDate(), formatStr, { locale: indonesiaLocale });
  };

  const fetchIncomeEntries = useCallback(async () => {
    setLoading(true);
    try {
      const incomeCollectionRef = collection(db, 'incomeEntries');
      let q = query(incomeCollectionRef, orderBy("date", "desc"));

      if (dateRange?.from) {
        const fromTimestamp = Timestamp.fromDate(dateRange.from);
        let toTimestamp = dateRange.to ? Timestamp.fromDate(new Date(dateRange.to.getTime() + 86399999)) : Timestamp.fromDate(new Date(dateRange.from.getTime() + 86399999));
         if (!dateRange.to) dateRange.to = dateRange.from; 

        q = query(
          incomeCollectionRef,
          where("date", ">=", fromTimestamp),
          where("date", "<=", toTimestamp),
          orderBy("date", "desc")
        );
      }


      const querySnapshot = await getDocs(q);
      const entriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IncomeEntry));
      setIncomeEntries(entriesData);
    } catch (error) {
      console.error("Error fetching income entries: ", error);
      toast({
        title: "Error",
        description: "Tidak dapat mengambil data pemasukan dari Firestore.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchIncomeEntries();
  }, [fetchIncomeEntries]);

  const handleDeleteEntry = async () => {
    if (!entryToDelete) return;
    try {
      await deleteDoc(doc(db, 'incomeEntries', entryToDelete.id));
      toast({
        title: "Sukses",
        description: `Pemasukan "${entryToDelete.description}" berhasil dihapus.`,
      });
      setIncomeEntries(incomeEntries.filter(entry => entry.id !== entryToDelete.id));
      setEntryToDelete(null);
    } catch (error) {
      console.error("Error deleting income entry: ", error);
      toast({
        title: "Error",
        description: "Gagal menghapus pemasukan.",
        variant: "destructive",
      });
      setEntryToDelete(null);
    }
  };

  const filteredEntries = incomeEntries.filter(entry =>
    entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.paymentMethod && entry.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (entry.notes && entry.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalFilteredAmount = filteredEntries.reduce((sum, exp) => sum + exp.amount, 0);

  if (loading && incomeEntries.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Pemasukan Lain" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data pemasukan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Pemasukan Lain" />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <AlertDialog open={!!entryToDelete} onOpenChange={(open) => !open && setEntryToDelete(null)}>
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="flex items-center"><DollarSign className="mr-2 h-6 w-6 text-green-500"/>Daftar Pemasukan Lain</CardTitle>
              <CardDescription>Kelola semua catatan pemasukan di luar penjualan POS.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
               <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
               <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari pemasukan..."
                  className="pl-8 w-full sm:w-[200px] lg:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/income/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> 
                  <span className="sm:inline">Tambah Baru</span>
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
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Tanggal</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead className="text-right">Jumlah (Rp)</TableHead>
                        <TableHead className="text-center">Metode Terima</TableHead>
                        <TableHead>Catatan</TableHead>
                        <TableHead className="text-right w-[100px]">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{formatTimestampToDateString(entry.date)}</TableCell>
                          <TableCell>{entry.category}</TableCell>
                          <TableCell className="font-medium max-w-[250px] truncate">{entry.description}</TableCell>
                          <TableCell className="text-right">{entry.amount.toLocaleString('id-ID')}</TableCell>
                           <TableCell className="text-center">
                            {entry.paymentMethod ? (
                              <Badge variant={entry.paymentMethod === "Tunai" ? "secondary" : "outline"} className="text-xs">
                                <CreditCard className="mr-1 h-3 w-3"/>{entry.paymentMethod}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell className="text-xs max-w-[150px] truncate">{entry.notes || '-'}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" asChild className="hover:text-primary">
                              <Link href={`/income/${entry.id}/edit`}>
                                <Edit3 className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setEntryToDelete(entry)}>
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
                  {filteredEntries.map((entry) => (
                    <Card key={entry.id} className="p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-sm text-muted-foreground">
                              {formatTimestampToDateString(entry.date, "dd/MM/yyyy")}
                            </div>
                            {entry.paymentMethod && (
                              <Badge variant={entry.paymentMethod === "Tunai" ? "secondary" : "outline"} className="text-xs">
                                <CreditCard className="mr-1 h-3 w-3"/>{entry.paymentMethod}
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-medium text-base truncate mb-1">{entry.description}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{entry.category}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold text-green-600">
                              Rp {entry.amount.toLocaleString('id-ID')}
                            </div>
                          </div>
                          
                          {entry.notes && (
                            <div className="mt-2 text-xs text-muted-foreground truncate">
                              <span className="font-medium">Catatan:</span> {entry.notes}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-1 ml-3 flex-shrink-0">
                          <Button variant="ghost" size="icon" asChild className="hover:text-primary h-8 w-8">
                            <Link href={`/income/${entry.id}/edit`}>
                              <Edit3 className="h-3 w-3" />
                            </Link>
                          </Button>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8" onClick={() => setEntryToDelete(entry)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
            {filteredEntries.length === 0 && !loading && (
              <div className="text-center py-10 text-muted-foreground">
                {incomeEntries.length > 0 ? 'Tidak ada pemasukan yang cocok.' : 'Belum ada data pemasukan lain.'}
                {incomeEntries.length === 0 && <Link href="/income/new" className="text-primary hover:underline ml-1">Tambah pemasukan baru</Link>}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              Menampilkan {filteredEntries.length} dari {incomeEntries.length} pemasukan.
            </p>
            <p className="text-sm font-semibold">
              Total Pemasukan (Filter): Rp {totalFilteredAmount.toLocaleString('id-ID')}
            </p>
          </CardFooter>
        </Card>
        
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus pemasukan: "{entryToDelete?.description}"? Tindakan ini tidak dapat diurungkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setEntryToDelete(null)}>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteEntry} className={buttonVariants({variant: "destructive"})}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}

