
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Loader2, ArrowLeft, ArrowRightLeft, CalendarDays, StickyNote, Landmark as LandmarkIcon } from 'lucide-react'; // Added LandmarkIcon for Bank
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { type ExpenseFormData } from '@/types/expense';
import { DatePickerSingle } from '@/components/ui/date-picker-single';

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

// Use a subset of ExpenseFormData for this specific form, ensuring category is fixed
type CashDepositFormValues = z.infer<typeof cashDepositFormSchema>;

export default function NewCashDepositPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CashDepositFormValues>({
    resolver: zodResolver(cashDepositFormSchema),
    defaultValues: {
      date: new Date(),
      bankDestination: '',
      amount: undefined,
      notes: '',
    },
  });

  const onSubmit = async (data: CashDepositFormValues) => {
    setIsSubmitting(true);
    try {
      // Hasil akhir yang benar
const newExpenseData: { [key: string]: any } = {
    date: Timestamp.fromDate(data.date),
    category: "Setoran Tunai ke Bank",
    description: `Setoran tunai ke ${data.bankDestination}`,
    amount: Number(data.amount),
    bankDestination: data.bankDestination,
    notes: data.notes,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
};

      await addDoc(collection(db, 'expenses'), newExpenseData);
      toast({
        title: "Sukses!",
        description: `Setoran ke ${data.bankDestination} sejumlah Rp ${data.amount.toLocaleString('id-ID')} berhasil dicatat.`,
      });
      router.push('/finance/cash-deposit');
    } catch (error) {
      console.error("Error adding cash deposit: ", error);
      toast({
        title: "Error",
        description: "Gagal mencatat setoran kas. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Catat Setoran Kas Baru" />
      <main className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center"><ArrowRightLeft className="mr-2 h-6 w-6"/>Catat Setoran Kas ke Bank</CardTitle>
                <CardDescription>Isi detail setoran uang tunai ke rekening bank Anda.</CardDescription>
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Simpan Setoran
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  );
}
