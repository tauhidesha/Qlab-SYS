
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
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Loader2, ArrowLeft, Gift, PlusCircle, Trash2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
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

export default function EditServiceProductPage() {
  const router = useRouter();
  const params = useParams();
  const itemId = params.id as string;
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [itemNotFound, setItemNotFound] = useState(false);

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

  useEffect(() => {
    if (!itemId) {
      setIsLoadingData(false);
      setItemNotFound(true);
      toast({ title: "Error", description: "ID Item tidak ditemukan.", variant: "destructive" });
      router.push('/services');
      return;
    }

    const fetchItemData = async () => {
      setIsLoadingData(true);
      try {
        const itemDocRef = doc(db, 'services', itemId);
        const itemDocSnap = await getDoc(itemDocRef);

        if (itemDocSnap.exists()) {
          const itemData = itemDocSnap.data() as ServiceProduct;
          form.reset({
            name: itemData.name,
            type: itemData.type,
            category: itemData.category,
            price: itemData.price,
            pointsAwarded: itemData.pointsAwarded || undefined,
            description: itemData.description || '',
            variants: itemData.variants?.map(v => ({ 
                id: v.id || uuidv4(), 
                name: v.name,
                price: v.price,
                pointsAwarded: v.pointsAwarded
            })) || [],
          });
        } else {
          setItemNotFound(true);
          toast({ title: "Error", description: "Item tidak ditemukan.", variant: "destructive" });
          router.push('/services');
        }
      } catch (error) {
        console.error("Error fetching item data: ", error);
        toast({ title: "Error", description: "Gagal mengambil data item.", variant: "destructive" });
        setItemNotFound(true);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchItemData();
  }, [itemId, form, router, toast]);

  const onSubmit = async (data: ServiceProductFormValues) => {
    if (!itemId) return;
    setIsSubmitting(true);
    try {
      const itemDocRef = doc(db, 'services', itemId);
      const updateData: Partial<Omit<ServiceProduct, 'id' | 'createdAt'>> & { updatedAt: any } = {
        name: data.name,
        type: data.type,
        category: data.category,
        price: (data.variants && data.variants.length > 0) ? (data.price || 0) : (data.price as number),
        pointsAwarded: data.pointsAwarded || 0,
        description: data.description || '',
        variants: data.variants?.map(v => ({
            id: v.id || uuidv4(), 
            name: v.name,
            price: v.price,
            pointsAwarded: v.pointsAwarded || 0,
        })) || [],
        updatedAt: serverTimestamp(),
      };

      await updateDoc(itemDocRef, updateData);
      toast({
        title: "Sukses!",
        description: `Item "${data.name}" berhasil diperbarui.`,
      });
      router.push('/services');
    } catch (error) {
      console.error("Error updating service/product: ", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui item. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Edit Layanan/Produk" />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data item...</p>
        </main>
      </div>
    );
  }

  if (itemNotFound) {
     return (
      <div className="flex flex-col h-full">
        <AppHeader title="Error" />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <p className="text-lg text-destructive mb-4">Item tidak ditemukan.</p>
          <Button asChild variant="outline">
            <Link href="/services">Kembali ke Daftar Layanan/Produk</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title={`Edit: ${form.getValues('name') || 'Item'}`} />
      <main className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Edit Informasi Layanan/Produk</CardTitle>
                <CardDescription>Perbarui detail item di bawah ini.</CardDescription>
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
                        <Select onValueChange={field.onChange} value={field.value}>
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
    
