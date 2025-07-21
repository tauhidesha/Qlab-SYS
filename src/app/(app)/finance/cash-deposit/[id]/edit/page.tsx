
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Loader2, ArrowLeft, ArrowRightLeft, CalendarDays, StickyNote, Landmark as LandmarkIcon } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { type Expense, type ExpenseFormData } from '@/types/expense';
import { DatePickerSingle } from '@/components/ui/date-picker-single';

// Schema is similar to new, but category is fixed.
const cashDepositFormSchema = z.object({
  date: z.date({ required_error: "Tanggal setoran diperlukan" }),
  bankDestination: z.string().min(1, "Bank tujuan diperlukan").max(100, "Nama bank maksimal 100 karakter"),
  amount: z.preprocess(
    (val) => {
      const strVal = String(val).replace(/[^0-9.-]+/g, '');
      const num = parseFloat(strVal);
      return isNaN(num) ? undefined : num;
    },
    z.number({ required_error: "Jumlah setoran diperlukan", invalid_type_error: "Jumlah harus berupa angka" })
     .positive("Jumlah setoran harus angka positif")
  ),
  notes: z.string().max(500, "Catatan maksimal 500 karakter").optional(),
});

type CashDepositFormValues = z.infer<typeof cashDepositFormSchema>;

export default function EditCashDepositPage() {
  const router = useRouter();
  const params = useParams();
  // Pastikan params.id selalu string, fallback ke '' jika tidak ada
  const depositId = params && typeof params === 'object' && 'id' in params && typeof params.id === 'string' && params.id ? params.id : '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [depositNotFound, setDepositNotFound] = useState(false);
  const [currentDepositBank, setCurrentDepositBank] = useState('');

  const form = useForm<CashDepositFormValues>({
    resolver: zodResolver(cashDepositFormSchema),
    defaultValues: {
      date: new Date(),
      bankDestination: '',
      amount: undefined,
      notes: '',
    },
  });

  useEffect(() => {
    if (!depositId || typeof depositId !== 'string') {
      setIsLoadingData(false);
      setDepositNotFound(true);
      toast({ title: "Error", description: "ID Setoran tidak ditemukan.", variant: "destructive" });
      router.push('/finance/cash-deposit');
      return;
    }

    const fetchDepositData = async () => {
      setIsLoadingData(true);
      try {
        const expenseDocRef = doc(db, 'expenses', depositId);
        const expenseDocSnap = await getDoc(expenseDocRef);

        if (expenseDocSnap.exists()) {
          const expenseData = expenseDocSnap.data() as Expense;
          if (expenseData.category !== "Setoran Tunai ke Bank") {
            setDepositNotFound(true);
            toast({ title: "Error", description: "Ini bukan catatan setoran kas.", variant: "destructive" });
            router.push('/finance/cash-deposit');
            return;
          }
          form.reset({
            date: expenseData.date.toDate(),
            bankDestination: expenseData.bankDestination || '', // Use dedicated field
            amount: expenseData.amount,
            notes: expenseData.notes || '',
          });
          setCurrentDepositBank(expenseData.bankDestination || 'Setoran');
        } else {
          setDepositNotFound(true);
          toast({ title: "Error", description: "Catatan setoran tidak ditemukan.", variant: "destructive" });
          router.push('/finance/cash-deposit');
        }
      } catch (error) {
        console.error("Error fetching deposit data: ", error);
        toast({ title: "Error", description: "Gagal mengambil data setoran.", variant: "destructive" });
        setDepositNotFound(true);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchDepositData();
  }, [depositId, form, router]);

  const onSubmit = async (data: CashDepositFormValues) => {
    if (!depositId || typeof depositId !== 'string') {
      toast({ title: "Error", description: "ID Setoran tidak valid.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const expenseDocRef = doc(db, 'expenses', depositId);
      const updateData: { [key: string]: any } = {
        // Properti yang diambil dari form 'Setoran Tunai'
        date: Timestamp.fromDate(data.date),
        amount: Number(data.amount),
        bankDestination: data.bankDestination,
        notes: data.notes,
        // Properti yang kita tambahkan secara manual sesuai konteks halaman
        category: "Setoran Tunai ke Bank", 
        paymentSource: "Kas Tunai",
        description: `Setoran tunai ke ${data.bankDestination}`,
        // Timestamp untuk pembaruan
        updatedAt: serverTimestamp(),
      };

      await updateDoc(expenseDocRef, updateData);
      toast({
        title: "Sukses!",
        description: `Setoran ke ${data.bankDestination} berhasil diperbarui.`,
      });
      router.push('/finance/cash-deposit');
    } catch (error) {
      console.error("Error updating cash deposit: ", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui setoran kas. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Edit Setoran Kas" />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data setoran...</p>
        </main>
      </div>
    );
  }

  if (depositNotFound) {
     return (
      <div className="flex flex-col h-full">
        <AppHeader title="Error" />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <p className="text-lg text-destructive mb-4">Catatan setoran tidak ditemukan atau tidak valid.</p>
          <Button asChild variant="outline">
            <Link href="/finance/cash-deposit">Kembali ke Daftar Setoran</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title={`Edit Setoran ke: ${currentDepositBank || '...'}`} />
      <main className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center"><ArrowRightLeft className="mr-2 h-6 w-6"/>Edit Catatan Setoran Kas</CardTitle>
                <CardDescription>Perbarui detail setoran uang tunai ke rekening bank Anda.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center mb-1"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground"/>Tanggal Setoran</FormLabel>
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
                  name="bankDestination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><LandmarkIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Bank Tujuan</FormLabel>
                      <FormControl>
                        <Input placeholder="mis. Bank BCA, Bank Mandiri" {...field} />
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
                      <FormLabel>Jumlah Disetor (Rp)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="mis. 1000000" 
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
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><StickyNote className="mr-2 h-4 w-4 text-muted-foreground"/>Catatan Tambahan (Opsional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="mis. Setoran dari penjualan tanggal X, Untuk modal operasional" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/finance/cash-deposit">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Setoran
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
