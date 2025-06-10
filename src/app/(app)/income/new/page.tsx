
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Loader2, ArrowLeft, DollarSign, CalendarDays, Tag, StickyNote, Link as LinkIcon } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { type IncomeFormData, INCOME_CATEGORIES } from '@/types/income';
import { DatePickerSingle } from '@/components/ui/date-picker-single';

const incomeFormSchema = z.object({
  date: z.date({ required_error: "Tanggal pemasukan diperlukan" }),
  category: z.enum(INCOME_CATEGORIES, { required_error: "Kategori pemasukan diperlukan" }),
  description: z.string().min(1, "Deskripsi pemasukan diperlukan").max(200, "Deskripsi maksimal 200 karakter"),
  amount: z.preprocess(
    (val) => {
      const strVal = String(val).replace(/[^0-9.-]+/g, '');
      const num = parseFloat(strVal);
      return isNaN(num) ? undefined : num;
    },
    z.number({ required_error: "Jumlah pemasukan diperlukan", invalid_type_error: "Jumlah harus berupa angka" })
     .positive("Jumlah pemasukan harus angka positif")
  ),
  receiptUrl: z.string().url("URL bukti tidak valid. Pastikan menyertakan http:// atau https://").optional().or(z.literal('')),
  notes: z.string().max(500, "Catatan maksimal 500 karakter").optional(),
});

export default function NewIncomePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IncomeFormData>({
    resolver: zodResolver(incomeFormSchema),
    defaultValues: {
      date: new Date(),
      category: undefined,
      description: '',
      amount: undefined,
      receiptUrl: '',
      notes: '',
    },
  });

  const onSubmit = async (data: IncomeFormData) => {
    setIsSubmitting(true);
    try {
      const newIncomeData = {
        ...data,
        date: Timestamp.fromDate(data.date),
        amount: Number(data.amount),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'incomeEntries'), newIncomeData);
      toast({
        title: "Sukses!",
        description: `Pemasukan "${data.description}" berhasil ditambahkan.`,
      });
      router.push('/income');
    } catch (error) {
      console.error("Error adding income entry: ", error);
      toast({
        title: "Error",
        description: "Gagal menambahkan pemasukan baru. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Tambah Pemasukan Lain" />
      <main className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center"><DollarSign className="mr-2 h-6 w-6 text-green-500"/>Catat Pemasukan Baru</CardTitle>
                <CardDescription>Isi detail pemasukan di luar POS di bawah ini.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center mb-1"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground"/>Tanggal Pemasukan</FormLabel>
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
                      <FormLabel className="flex items-center"><Tag className="mr-2 h-4 w-4 text-muted-foreground"/>Kategori Pemasukan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori pemasukan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {INCOME_CATEGORIES.map(cat => (
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
                      <FormLabel>Deskripsi Pemasukan</FormLabel>
                      <FormControl>
                        <Input placeholder="mis. Sewa parkir bulanan, Penjualan motor bekas" {...field} />
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
                          placeholder="mis. 500000" 
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
                  name="receiptUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><LinkIcon className="mr-2 h-4 w-4 text-muted-foreground"/>URL Bukti (Opsional)</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://contoh.com/bukti.jpg" {...field} />
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
                        <Textarea placeholder="Catatan mengenai pemasukan ini..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/income">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar
                  </Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Simpan Pemasukan
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  );
}
