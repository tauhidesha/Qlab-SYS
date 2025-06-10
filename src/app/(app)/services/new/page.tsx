
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
import { Save, Loader2, ArrowLeft, Gift, PlusCircle, Trash2, Clock, Package, DollarSign as DollarSignIcon } from 'lucide-react';
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
  estimatedDuration: z.string().max(50, "Estimasi durasi varian maksimal 50 karakter").optional(),
  stockQuantity: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseInt(String(val), 10),
    z.number({ invalid_type_error: "Stok varian harus angka" }).nonnegative("Stok varian tidak boleh negatif").optional()
  ),
  costPrice: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseFloat(String(val)),
    z.number({ invalid_type_error: "Harga modal varian harus angka" }).nonnegative("Harga modal varian tidak boleh negatif").optional()
  ),
});

const serviceProductFormSchema = z.object({
  name: z.string().min(2, "Nama item minimal 2 karakter").max(100, "Nama item maksimal 100 karakter"),
  type: z.enum(['Layanan', 'Produk'], { required_error: "Jenis item diperlukan" }),
  category: z.string().min(2, "Kategori minimal 2 karakter").max(50, "Kategori maksimal 50 karakter"),
  price: z.preprocess(
    (val) => (val === "" || val === null || val === undefined) ? undefined : parseFloat(String(val)),
    z.number({invalid_type_error: "Harga dasar harus berupa angka."})
     .nonnegative("Harga dasar tidak boleh negatif.")
     .optional()
  ),
  pointsAwarded: z.preprocess(
    (val) => (val === "" || val === null || val === undefined) ? undefined : parseInt(String(val), 10),
    z.number({ invalid_type_error: "Poin dasar harus berupa angka." })
     .int("Poin dasar harus bilangan bulat.")
     .nonnegative("Poin dasar tidak boleh negatif.").optional()
  ),
  estimatedDuration: z.string().max(50, "Estimasi durasi maksimal 50 karakter").optional(),
  description: z.string().max(500, "Deskripsi maksimal 500 karakter").optional(),
  stockQuantity: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseInt(String(val), 10),
    z.number({ invalid_type_error: "Stok harus angka" }).nonnegative("Stok tidak boleh negatif").optional()
  ),
  costPrice: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseFloat(String(val)),
    z.number({ invalid_type_error: "Harga modal harus angka" }).nonnegative("Harga modal tidak boleh negatif").optional()
  ),
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
}).refine(data => {
  // If type is 'Produk' and variants exist, stockQuantity and costPrice for base product are optional (can be 0 or not set)
  // But if type is 'Produk' and NO variants, stockQuantity/costPrice can be set (or not)
  // This refine is mostly for the 'price' field logic above. Specific stock/cost logic is handled by making fields optional.
  return true; 
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
      estimatedDuration: '',
      description: '',
      stockQuantity: undefined,
      costPrice: undefined,
      variants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const itemType = form.watch('type');

  const onSubmit = async (data: ServiceProductFormValues) => {
    setIsSubmitting(true);
    try {
      const newServiceProductData: Omit<ServiceProduct, 'id'> & { createdAt: any } = {
        name: data.name,
        type: data.type,
        category: data.category,
        price: (data.variants && data.variants.length > 0) ? (data.price || 0) : (data.price as number),
        pointsAwarded: data.pointsAwarded || 0,
        estimatedDuration: data.estimatedDuration || '',
        description: data.description || '',
        stockQuantity: data.type === 'Produk' ? (data.stockQuantity || 0) : undefined,
        costPrice: data.type === 'Produk' ? (data.costPrice || 0) : undefined,
        variants: data.variants?.map(v => ({
          id: v.id || uuidv4(), 
          name: v.name,
          price: v.price,
          pointsAwarded: v.pointsAwarded || 0,
          estimatedDuration: v.estimatedDuration || '',
          stockQuantity: data.type === 'Produk' ? (v.stockQuantity || 0) : undefined,
          costPrice: data.type === 'Produk' ? (v.costPrice || 0) : undefined,
        })) || [],
        createdAt: serverTimestamp(),
      };

      if (data.type !== 'Produk') {
        delete newServiceProductData.stockQuantity;
        delete newServiceProductData.costPrice;
        newServiceProductData.variants?.forEach(v => {
          delete v.stockQuantity;
          delete v.costPrice;
        });
      }


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
                            placeholder="mis. 75000 (0 jika ada varian)" 
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
                          <Gift className="mr-2 h-4 w-4 text-yellow-500" /> Poin Dasar (Opsional)
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
                  name="estimatedDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" /> Estimasi Durasi Dasar (Opsional)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="mis. 30 mnt, 1 jam, 2 hari" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

                {itemType === 'Produk' && (
                  <>
                    <Separator />
                    <h3 className="text-md font-medium pt-2">Detail Inventaris (Produk)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="stockQuantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center"><Package className="mr-2 h-4 w-4 text-muted-foreground"/>Jumlah Stok Dasar</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="mis. 50" {...field} 
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
                      <FormField
                        control={form.control}
                        name="costPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center"><DollarSignIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Harga Modal Dasar (Rp)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="mis. 50000" {...field}
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
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Varian Produk/Layanan (Opsional)</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ 
                        id: uuidv4(), 
                        name: '', 
                        price: '' as any, 
                        pointsAwarded: undefined, 
                        estimatedDuration: '',
                        stockQuantity: undefined,
                        costPrice: undefined,
                      })}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Tambah Varian
                    </Button>
                  </div>
                  {fields.length === 0 && <p className="text-sm text-muted-foreground mb-4">Tidak ada varian. Item akan menggunakan harga, poin, dan estimasi durasi dasar.</p>}
                  
                  {fields.map((fieldItem, index) => (
                    <Card key={fieldItem.id} className="mb-4 p-4 border-dashed">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mb-2">
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
                              <FormLabel>Poin Varian (Opsional)</FormLabel>
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
                        <FormField
                          control={form.control}
                          name={`variants.${index}.estimatedDuration`}
                          render={({ field: variantField }) => (
                            <FormItem>
                              <FormLabel>Estimasi Durasi Varian (Opsional)</FormLabel>
                              <FormControl>
                                <Input placeholder="mis. 45 mnt" {...variantField} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {itemType === 'Produk' && (
                          <>
                            <FormField
                              control={form.control}
                              name={`variants.${index}.stockQuantity`}
                              render={({ field: variantField }) => (
                                <FormItem>
                                  <FormLabel>Stok Varian</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="mis. 20" {...variantField} 
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
                            <FormField
                              control={form.control}
                              name={`variants.${index}.costPrice`}
                              render={({ field: variantField }) => (
                                <FormItem>
                                  <FormLabel>Harga Modal Varian (Rp)</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="mis. 55000" {...variantField} 
                                      value={variantField.value === undefined ? '' : variantField.value}
                                      onChange={e => {
                                        const val = e.target.value;
                                        variantField.onChange(val === '' ? undefined : parseFloat(val));
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}
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
    

