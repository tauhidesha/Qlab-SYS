
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
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Loader2, ArrowLeft, Gift, PlusCircle, Trash2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import type { ServiceProduct, ServiceProductVariant } from '../page';
import { v4 as uuidv4 } from 'uuid';
import { Separator } from '@/components/ui/separator';

const variantSchema = z.object({
  id: z.string(), 
  name: z.string().min(1, "Nama varian diperlukan"),
  price: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseFloat(String(val)),
    z.number({ required_error: "Harga varian diperlukan", invalid_type_error: "Harga varian harus berupa angka" }).positive("Harga varian harus angka positif")
  ),
  pointsAwarded: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseInt(String(val), 10),
    z.number({ invalid_type_error: "Poin varian harus berupa angka" }).nonnegative("Poin varian tidak boleh negatif").optional()
  ),
});

const serviceProductFormSchema = z.object({
  name: z.string().min(2, "Nama item minimal 2 karakter").max(100, "Nama item maksimal 100 karakter"),
  type: z.enum(['Layanan', 'Produk'], { required_error: "Jenis item diperlukan" }),
  category: z.string().min(2, "Kategori minimal 2 karakter").max(50, "Kategori maksimal 50 karakter"),
  price: z.preprocess(
    (val) => {
        if (val === "" || val === null || val === undefined) return undefined;
        const num = parseFloat(String(val));
        return isNaN(num) ? undefined : num;
    },
    z.number({invalid_type_error: "Harga dasar harus berupa angka."})
     .nonnegative("Harga dasar tidak boleh negatif.")
     .optional()
  ),
  pointsAwarded: z.preprocess(
    (val) => {
        if (val === "" || val === null || val === undefined) return undefined;
        const num = parseInt(String(val), 10);
        return isNaN(num) ? undefined : num;
    },
    z.number({ invalid_type_error: "Poin dasar harus berupa angka." })
     .int("Poin dasar harus bilangan bulat.")
     .nonnegative("Poin dasar tidak boleh negatif.").optional()
  ),
  description: z.string().max(500, "Deskripsi maksimal 500 karakter").optional(),
  variants: z.array(variantSchema).optional(),
}).refine(data => {
  if ((!data.variants || data.variants.length === 0)) { 
    if (data.price === undefined || data.price <= 0) { 
      return false;
    }
  }
  return true;
}, {
  message: "Harga dasar wajib diisi (lebih dari 0) jika tidak ada varian.",
  path: ["price"],
});

type ServiceProductFormValues = z.infer<typeof serviceProductFormSchema>;

export default function NewServiceProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ServiceProductFormValues>({
    resolver: zodResolver(serviceProductFormSchema),
    defaultValues: {
      name: '',
      type: undefined, 
      category: '',
      price: undefined, 
      pointsAwarded: undefined,
      description: '',
      variants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const onSubmit = async (data: ServiceProductFormValues) => {
    setIsSubmitting(true);
    try {
      const newServiceProductData: Omit<ServiceProduct, 'id'> & { createdAt: any } = {
        name: data.name,
        type: data.type,
        category: data.category,
        price: (data.variants && data.variants.length > 0) ? (data.price || 0) : (data.price as number), // Store 0 if variants exist and base price empty
        pointsAwarded: data.pointsAwarded || 0,
        description: data.description || '',
        variants: data.variants?.map(v => ({
          id: v.id || uuidv4(), 
          name: v.name,
          price: v.price,
          pointsAwarded: v.pointsAwarded || 0,
        })) || [],
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'services'), newServiceProductData);
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
    } finally {
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
                        <FormLabel>Harga Dasar (Rp)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="mis. 75000 (0 jika harga dari varian)" 
                            {...field} 
                            value={field.value === undefined ? '' : field.value}
                            onChange={e => {
                              const val = e.target.value;
                              field.onChange(val === '' ? undefined : parseFloat(val));
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
                          <Gift className="mr-2 h-4 w-4 text-yellow-500" /> Poin Dasar Diberikan (Opsional)
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

                <Separator />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Varian Produk/Layanan (Opsional)</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ id: uuidv4(), name: '', price: '' as any, pointsAwarded: undefined })}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Tambah Varian
                    </Button>
                  </div>
                  {fields.length === 0 && <p className="text-sm text-muted-foreground mb-4">Tidak ada varian. Item akan menggunakan harga dan poin dasar.</p>}
                  
                  {fields.map((fieldItem, index) => (
                    <Card key={fieldItem.id} className="mb-4 p-4 border-dashed">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                        <FormField
                          control={form.control}
                          name={`variants.${index}.name`}
                          render={({ field: variantField }) => (
                            <FormItem>
                              <FormLabel>Nama Varian</FormLabel>
                              <FormControl>
                                <Input placeholder="mis. Merah, Ukuran XL" {...variantField} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`variants.${index}.price`}
                          render={({ field: variantField }) => (
                            <FormItem>
                              <FormLabel>Harga Varian (Rp)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="mis. 80000" {...variantField} 
                                  value={variantField.value === undefined ? '' : variantField.value}
                                  onChange={e => {
                                    const val = e.target.value;
                                    variantField.onChange(val === '' ? '' : parseFloat(val));
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`variants.${index}.pointsAwarded`}
                          render={({ field: variantField }) => (
                            <FormItem>
                              <FormLabel>Poin Varian</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="mis. 110" {...variantField} 
                                  value={variantField.value === undefined ? '' : variantField.value}
                                  onChange={e => {
                                    const val = e.target.value;
                                    variantField.onChange(val === '' ? undefined : parseInt(val, 10));
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Hapus Varian Ini
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
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
    
