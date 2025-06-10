
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Loader2, ArrowLeft, Gift } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import type { ServiceProduct } from '../page'; // Import type from parent page

const serviceProductFormSchema = z.object({
  name: z.string().min(2, "Nama item minimal 2 karakter").max(100, "Nama item maksimal 100 karakter"),
  type: z.enum(['Layanan', 'Produk'], { required_error: "Jenis item diperlukan" }),
  category: z.string().min(2, "Kategori minimal 2 karakter").max(50, "Kategori maksimal 50 karakter"),
  price: z.preprocess(
    (val) => {
      if (val === '' || val === undefined || val === null) return undefined;
      const num = parseFloat(String(val));
      return isNaN(num) ? undefined : num;
    },
    z.number({ required_error: "Harga diperlukan", invalid_type_error: "Harga harus berupa angka" }).positive("Harga harus angka positif")
  ),
  pointsAwarded: z.preprocess(
    (val) => {
      if (val === '' || val === undefined || val === null) return undefined;
      const num = parseInt(String(val), 10);
      return isNaN(num) ? undefined : num;
    },
    z.number({ invalid_type_error: "Poin harus berupa angka" }).nonnegative("Poin tidak boleh negatif").optional()
  ),
  description: z.string().max(500, "Deskripsi maksimal 500 karakter").optional(),
});

type ServiceProductFormValues = z.infer<typeof serviceProductFormSchema>;

export default function NewServiceProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ServiceProductFormValues>({
    resolver: zodResolver(serviceProductFormSchema),
    defaultValues: {
      name: '',
      type: undefined, 
      category: '',
      price: '' as any, 
      pointsAwarded: undefined,
      description: '',
    },
  });

  const onSubmit = async (data: ServiceProductFormValues) => {
    setIsSubmitting(true);
    try {
      const newServiceProductData: Omit<ServiceProduct, 'id'> & { createdAt: any } = {
        name: data.name,
        type: data.type,
        category: data.category,
        price: data.price,
        pointsAwarded: data.pointsAwarded || 0,
        description: data.description || '',
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'services'), newServiceProductData);
      toast({
        title: "Sukses!",
        description: `Item baru "${data.name}" berhasil ditambahkan.`,
      });
      router.push('/services');
    } catch (error) {
      console.error("Error adding service/product: ", error);
      toast({
        title: "Error",
        description: "Gagal menambahkan item baru. Silakan coba lagi.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Tambah Layanan/Produk Baru" />
      <main className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Informasi Layanan/Produk</CardTitle>
                <CardDescription>Isi detail item baru di bawah ini.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Item</FormLabel>
                      <FormControl>
                        <Input placeholder="mis. Cuci Premium, Oli Mesin X" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Item</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jenis item" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Layanan">Layanan</SelectItem>
                            <SelectItem value="Produk">Produk</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <FormControl>
                          <Input placeholder="mis. Pencucian, Pelumas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Harga (Rp)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="mis. 75000" 
                            {...field} 
                            value={field.value === undefined ? '' : field.value}
                            onChange={e => {
                              const val = e.target.value;
                              field.onChange(val === '' ? '' : parseFloat(val));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pointsAwarded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Gift className="mr-2 h-4 w-4 text-yellow-500" /> Poin Diberikan (Opsional)
                        </FormLabel>
                        <FormControl>
                           <Input 
                            type="number" 
                            placeholder="mis. 100" 
                            {...field} 
                            value={field.value === undefined ? '' : field.value}
                            onChange={e => {
                              const val = e.target.value;
                              field.onChange(val === '' ? undefined : parseInt(val, 10));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi (Opsional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Deskripsi singkat mengenai item..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/services">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar
                  </Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Simpan Item
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  );
}
