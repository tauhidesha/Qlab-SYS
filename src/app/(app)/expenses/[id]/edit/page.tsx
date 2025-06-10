
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Loader2, ArrowLeft, ReceiptText, CalendarDays, Tag, StickyNote, Link as LinkIcon, Landmark, WalletCards } from 'lucide-react'; // Added WalletCards
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { type Expense, type ExpenseFormData, EXPENSE_CATEGORIES, type ExpenseCategory, PAYMENT_SOURCES, type PaymentSource } from '@/types/expense';
import { DatePickerSingle } from '@/components/ui/date-picker-single';

const expenseFormSchema = z.object({
  date: z.date({ required_error: "Tanggal pengeluaran diperlukan" }),
  category: z.enum(EXPENSE_CATEGORIES, { required_error: "Kategori pengeluaran diperlukan" }),
  description: z.string().min(1, "Deskripsi pengeluaran diperlukan").max(200, "Deskripsi maksimal 200 karakter"),
  amount: z.preprocess(
    (val) => {
      const strVal = String(val).replace(/[^0-9.-]+/g, '');
      const num = parseFloat(strVal);
      return isNaN(num) ? undefined : num;
    },
    z.number({ required_error: "Jumlah pengeluaran diperlukan", invalid_type_error: "Jumlah harus berupa angka" })
     .positive("Jumlah pengeluaran harus angka positif")
  ),
  paymentSource: z.enum(PAYMENT_SOURCES).optional(),
  receiptUrl: z.string().url("URL struk tidak valid. Pastikan menyertakan http:// atau https://").optional().or(z.literal('')),
  notes: z.string().max(500, "Catatan maksimal 500 karakter").optional(),
  bankDestination: z.string().max(100, "Nama bank maksimal 100 karakter").optional(),
});


export default function EditExpensePage() {
  const router = useRouter();
  const params = useParams();
  const expenseId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [expenseNotFound, setExpenseNotFound] = useState(false);
  const [currentExpenseDescription, setCurrentExpenseDescription] = useState('');


  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      date: new Date(),
      category: undefined,
      description: '',
      amount: undefined,
      paymentSource: "Kas Tunai",
      receiptUrl: '',
      notes: '',
      bankDestination: '',
    },
  });

  const watchedCategory = form.watch('category');

  useEffect(() => {
    if (!expenseId) {
      setIsLoadingData(false);
      setExpenseNotFound(true);
      toast({ title: "Error", description: "ID Pengeluaran tidak ditemukan.", variant: "destructive" });
      router.push('/expenses');
      return;
    }

    const fetchExpenseData = async () => {
      setIsLoadingData(true);
      try {
        const expenseDocRef = doc(db, 'expenses', expenseId);
        const expenseDocSnap = await getDoc(expenseDocRef);

        if (expenseDocSnap.exists()) {
          const expenseData = expenseDocSnap.data() as Expense;
          form.reset({
            date: expenseData.date.toDate(),
            category: expenseData.category,
            description: expenseData.description,
            amount: expenseData.amount,
            paymentSource: expenseData.paymentSource || "Kas Tunai",
            receiptUrl: expenseData.receiptUrl || '',
            notes: expenseData.notes || '',
            bankDestination: expenseData.bankDestination || '',
          });
          setCurrentExpenseDescription(expenseData.description);
        } else {
          setExpenseNotFound(true);
          toast({ title: "Error", description: "Pengeluaran tidak ditemukan.", variant: "destructive" });
          router.push('/expenses');
        }
      } catch (error) {
        console.error("Error fetching expense data: ", error);
        toast({ title: "Error", description: "Gagal mengambil data pengeluaran.", variant: "destructive" });
        setExpenseNotFound(true);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchExpenseData();
  }, [expenseId, form, router]);

  const onSubmit = async (data: ExpenseFormData) => {
    if (!expenseId) return;
    setIsSubmitting(true);
    try {
      const expenseDocRef = doc(db, 'expenses', expenseId);
      const updateData: Partial<Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>> & {updatedAt?:any, date?: Timestamp} = {
        ...data,
        date: Timestamp.fromDate(data.date),
        amount: Number(data.amount),
        updatedAt: serverTimestamp(),
      };

      if (data.category !== "Setoran Tunai ke Bank") {
        delete updateData.bankDestination;
      } else if (data.bankDestination === '' || data.bankDestination === undefined){
         updateData.bankDestination = '';
      }


      await updateDoc(expenseDocRef, updateData);
      toast({
        title: "Sukses!",
        description: `Pengeluaran "${data.description}" berhasil diperbarui.`,
      });
      router.push('/expenses');
    } catch (error) {
      console.error("Error updating expense: ", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui pengeluaran. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Edit Pengeluaran" />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data pengeluaran...</p>
        </main>
      </div>
    );
  }

  if (expenseNotFound) {
     return (
      <div className="flex flex-col h-full">
        <AppHeader title="Error" />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <p className="text-lg text-destructive mb-4">Pengeluaran tidak ditemukan.</p>
          <Button asChild variant="outline">
            <Link href="/expenses">Kembali ke Daftar Pengeluaran</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title={`Edit Pengeluaran: ${currentExpenseDescription || '...'}`} />
      <main className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center"><ReceiptText className="mr-2 h-6 w-6"/>Edit Data Pengeluaran</CardTitle>
                <CardDescription>Perbarui detail pengeluaran di bawah ini.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center mb-1"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground"/>Tanggal Pengeluaran</FormLabel>
                       <DatePickerSingle
                        date={field.value}
                        onDateChange={field.onChange}
                        disabled={(d) => d > new Date()}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><Tag className="mr-2 h-4 w-4 text-muted-foreground"/>Kategori Pengeluaran</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori pengeluaran" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EXPENSE_CATEGORIES.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi Pengeluaran</FormLabel>
                      <FormControl>
                        <Input placeholder="mis. Beli sabun cuci motor, Bayar listrik bulan Juli" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah (Rp)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="mis. 50000"
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value) || undefined)}
                          value={field.value === undefined ? '' : String(field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="paymentSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><WalletCards className="mr-2 h-4 w-4 text-muted-foreground"/>Sumber Pembayaran</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih sumber pembayaran" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PAYMENT_SOURCES.map(source => (
                            <SelectItem key={source} value={source}>{source}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watchedCategory === "Setoran Tunai ke Bank" && (
                  <FormField
                    control={form.control}
                    name="bankDestination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Landmark className="mr-2 h-4 w-4 text-muted-foreground"/>Bank Tujuan Setoran</FormLabel>
                        <FormControl>
                          <Input placeholder="mis. Bank BCA, Bank Mandiri" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                 <FormField
                  control={form.control}
                  name="receiptUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><LinkIcon className="mr-2 h-4 w-4 text-muted-foreground"/>URL Struk/Bukti (Opsional)</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://contoh.com/struk.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><StickyNote className="mr-2 h-4 w-4 text-muted-foreground"/>Catatan Tambahan (Opsional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Catatan mengenai pengeluaran ini..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/expenses">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar
                  </Link>
                </Button>
                <Button type="submit" disabled={isSubmitting || isLoadingData}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Simpan Perubahan
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  );
}
