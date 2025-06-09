
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlusCircle, Trash2, Save, Loader2, ArrowLeft } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import type { NewClientFormData, Motorcycle } from '@/types/client';
import Link from 'next/link';

const motorcycleSchema = z.object({
  name: z.string().min(1, "Nama motor diperlukan"),
  licensePlate: z.string().min(1, "Plat nomor diperlukan").regex(/^[A-Z]{1,2}\s\d{1,4}\s[A-Z]{1,3}$/, "Format plat nomor tidak valid (contoh: B 1234 XYZ)"),
});

const clientFormSchema = z.object({
  name: z.string().min(2, "Nama klien minimal 2 karakter").max(50, "Nama klien maksimal 50 karakter"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit").max(15, "Nomor telepon maksimal 15 digit").regex(/^\+?[0-9\s-]{10,15}$/, "Format nomor telepon tidak valid"),
  motorcycles: z.array(motorcycleSchema).min(0, "Minimal satu motor harus ditambahkan jika bagian motor diisi").max(5, "Maksimal 5 motor per klien"),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

export default function NewClientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      motorcycles: [{ name: '', licensePlate: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'motorcycles',
  });

  const onSubmit = async (data: ClientFormValues) => {
    setIsSubmitting(true);
    try {
      const newClientData: NewClientFormData & { loyaltyPoints: number; lastVisit: string; createdAt: any } = {
        name: data.name,
        phone: data.phone,
        motorcycles: data.motorcycles.filter(mc => mc.name && mc.licensePlate), // Only add motorcycles with both fields filled
        loyaltyPoints: 0,
        lastVisit: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'clients'), newClientData);
      toast({
        title: "Sukses!",
        description: `Klien baru "${data.name}" berhasil ditambahkan dengan ID: ${docRef.id}`,
      });
      router.push('/clients');
    } catch (error) {
      console.error("Error adding client: ", error);
      toast({
        title: "Error",
        description: "Gagal menambahkan klien baru. Silakan coba lagi.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Tambah Klien Baru" />
      <main className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Informasi Klien</CardTitle>
                <CardDescription>Isi detail klien baru di bawah ini.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Klien</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap klien" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="mis. 081234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Separator />
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">Sepeda Motor</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ name: '', licensePlate: '' })}
                      disabled={fields.length >= 5}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Tambah Motor
                    </Button>
                  </div>
                   {fields.length === 0 && <p className="text-sm text-muted-foreground">Klik "Tambah Motor" untuk menambahkan detail sepeda motor klien.</p>}

                  {fields.map((field, index) => (
                    <Card key={field.id} className="mb-4 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <FormField
                          control={form.control}
                          name={`motorcycles.${index}.name`}
                          render={({ field: motorcycleField }) => (
                            <FormItem>
                              <FormLabel>Nama/Model Motor</FormLabel>
                              <FormControl>
                                <Input placeholder="mis. Honda Vario 150" {...motorcycleField} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`motorcycles.${index}.licensePlate`}
                          render={({ field: motorcycleField }) => (
                            <FormItem>
                              <FormLabel>Plat Nomor</FormLabel>
                              <FormControl>
                                <Input placeholder="mis. B 1234 XYZ" {...motorcycleField} 
                                 onChange={(e) => motorcycleField.onChange(e.target.value.toUpperCase())} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Hapus Motor Ini
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {form.formState.errors.motorcycles && typeof form.formState.errors.motorcycles === 'object' && !Array.isArray(form.formState.errors.motorcycles) && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.motorcycles.message}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/clients">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Klien
                  </Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Simpan Klien
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  );
}
