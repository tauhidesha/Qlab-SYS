
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlusCircle, Trash2, Save, Loader2, ArrowLeft } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import type { Client, Motorcycle } from '@/types/client';
import Link from 'next/link';

const motorcycleSchema = z.object({
  name: z.string().min(1, "Nama motor diperlukan"),
  licensePlate: z.string().min(1, "Plat nomor diperlukan").regex(/^[A-Z]{1,2}\s\d{1,4}\s[A-Z]{1,3}$/, "Format plat nomor tidak valid (contoh: B 1234 XYZ)"),
});

const clientFormSchema = z.object({
  name: z.string().min(2, "Nama klien minimal 2 karakter").max(50, "Nama klien maksimal 50 karakter"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit").max(15, "Nomor telepon maksimal 15 digit").regex(/^\+?[0-9\s-]{10,15}$/, "Format nomor telepon tidak valid"),
  motorcycles: z.array(motorcycleSchema).min(0).max(5, "Maksimal 5 motor per klien"),
  loyaltyPoints: z.number().nonnegative("Poin loyalitas tidak boleh negatif.").optional(),
  lastVisit: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [clientNotFound, setClientNotFound] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      motorcycles: [],
      loyaltyPoints: 0,
      lastVisit: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'motorcycles',
  });

  useEffect(() => {
    if (!clientId) {
      setIsLoadingData(false);
      setClientNotFound(true);
      toast({ title: "Error", description: "ID Klien tidak ditemukan.", variant: "destructive" });
      router.push('/clients');
      return;
    }

    const fetchClientData = async () => {
      setIsLoadingData(true);
      try {
        const clientDocRef = doc(db, 'clients', clientId);
        const clientDocSnap = await getDoc(clientDocRef);

        if (clientDocSnap.exists()) {
          const clientData = clientDocSnap.data() as Client;
          form.reset({
            name: clientData.name,
            phone: clientData.phone,
            motorcycles: clientData.motorcycles || [],
            loyaltyPoints: clientData.loyaltyPoints || 0,
            lastVisit: clientData.lastVisit || '',
          });
        } else {
          setClientNotFound(true);
          toast({ title: "Error", description: "Klien tidak ditemukan.", variant: "destructive" });
          router.push('/clients');
        }
      } catch (error) {
        console.error("Error fetching client data: ", error);
        toast({ title: "Error", description: "Gagal mengambil data klien.", variant: "destructive" });
        setClientNotFound(true); // Assume not found if there's an error fetching
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchClientData();
  }, [clientId, form, router]);

  const onSubmit = async (data: ClientFormValues) => {
    if (!clientId) return;
    setIsSubmitting(true);
    try {
      const clientDocRef = doc(db, 'clients', clientId);
      
      const updateData: Partial<Omit<Client, 'id'>> & { updatedAt?: any } = {
        name: data.name,
        phone: data.phone,
        motorcycles: data.motorcycles.filter(mc => mc.name && mc.licensePlate),
        loyaltyPoints: data.loyaltyPoints || 0,
        // lastVisit is typically updated by transactions, not manually here unless specified
        // lastVisit: data.lastVisit, 
        updatedAt: serverTimestamp(),
      };

      await updateDoc(clientDocRef, updateData);
      toast({
        title: "Sukses!",
        description: `Klien "${data.name}" berhasil diperbarui.`,
      });
      router.push('/clients');
    } catch (error) {
      console.error("Error updating client: ", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui klien. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoadingData) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Edit Klien" />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data klien...</p>
        </main>
      </div>
    );
  }

  if (clientNotFound) {
     return (
      <div className="flex flex-col h-full">
        <AppHeader title="Error" />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <p className="text-lg text-destructive mb-4">Klien tidak ditemukan.</p>
          <Button asChild variant="outline">
            <Link href="/clients">Kembali ke Daftar Klien</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title={`Edit Klien: ${form.getValues('name') || 'Klien'}`} />
      <main className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Informasi Klien</CardTitle>
                <CardDescription>Perbarui detail klien di bawah ini.</CardDescription>
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
                
                <FormField
                  control={form.control}
                  name="loyaltyPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poin Loyalitas</FormLabel>
                      <FormControl>
                        <Input 
                            type="number" 
                            placeholder="0" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} 
                        />
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
                                <Input 
                                  placeholder="mis. B 1234 XYZ" 
                                  {...motorcycleField}
                                  onChange={(e) => motorcycleField.onChange(e.target.value.toUpperCase())}
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
