
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Loader2, ArrowLeft, Phone, DollarSign, Percent, Image as ImageIcon } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { STAFF_ROLES, type StaffRole, type StaffMember } from '@/types/staff';

const staffFormSchema = z.object({
  name: z.string().min(2, "Nama staf minimal 2 karakter").max(50, "Nama staf maksimal 50 karakter"),
  role: z.enum(STAFF_ROLES, { required_error: "Peran staf diperlukan" }),
  phone: z.string().regex(/^(|\+?[0-9\s-]{10,15})$/, "Format nomor telepon tidak valid (min 10, maks 15 digit)").optional().or(z.literal('')),
  baseSalary: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseFloat(String(val)),
    z.number({ invalid_type_error: "Gaji harus angka" }).nonnegative("Gaji tidak boleh negatif").optional()
  ),
  profitSharePercentage: z.preprocess(
    (val) => (val === "" || val === undefined || val === null) ? undefined : parseInt(String(val), 10),
    z.number({ invalid_type_error: "Persentase harus angka" }).min(0, "Minimal 0%").max(100, "Maksimal 100%").optional()
  ),
  photoUrl: z.string().url("URL foto tidak valid (mis. https://...)").optional().or(z.literal('')),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

export default function EditStaffPage() {
  const router = useRouter();
  const params = useParams();
  const staffId = params.id as string;
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [staffNotFound, setStaffNotFound] = useState(false);

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: '',
      role: undefined,
      phone: '',
      baseSalary: undefined,
      profitSharePercentage: undefined,
      photoUrl: '',
    },
  });

  useEffect(() => {
    if (!staffId) {
      setIsLoadingData(false);
      setStaffNotFound(true);
      toast({ title: "Error", description: "ID Staf tidak ditemukan.", variant: "destructive" });
      router.push('/staff/list');
      return;
    }

    const fetchStaffData = async () => {
      setIsLoadingData(true);
      try {
        const staffDocRef = doc(db, 'staffMembers', staffId);
        const staffDocSnap = await getDoc(staffDocRef);

        if (staffDocSnap.exists()) {
          const staffData = staffDocSnap.data() as StaffMember;
          form.reset({
            name: staffData.name,
            role: staffData.role,
            phone: staffData.phone || '',
            baseSalary: staffData.baseSalary, // undefined is fine if not set
            profitSharePercentage: staffData.profitSharePercentage, // undefined is fine
            photoUrl: staffData.photoUrl || '',
          });
        } else {
          setStaffNotFound(true);
          toast({ title: "Error", description: "Staf tidak ditemukan.", variant: "destructive" });
          router.push('/staff/list');
        }
      } catch (error) {
        console.error("Error fetching staff data: ", error);
        toast({ title: "Error", description: "Gagal mengambil data staf.", variant: "destructive" });
        setStaffNotFound(true);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchStaffData();
  }, [staffId, form, router, toast]);

  const onSubmit = async (data: StaffFormValues) => {
    if (!staffId) return;
    setIsSubmitting(true);
    try {
      const staffDocRef = doc(db, 'staffMembers', staffId);
      const updateData: Partial<Omit<StaffMember, 'id' | 'createdAt'>> & { updatedAt?: any } = {
        name: data.name,
        role: data.role,
        phone: data.phone || undefined,
        baseSalary: data.baseSalary || undefined,
        profitSharePercentage: data.profitSharePercentage || undefined,
        photoUrl: data.photoUrl || undefined,
        updatedAt: serverTimestamp(),
      };
      
      // Explicitly remove fields that are undefined to avoid writing them as null to Firestore if not desired
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof typeof updateData] === undefined && key !== 'updatedAt') {
          delete updateData[key as keyof typeof updateData];
        }
      });


      await updateDoc(staffDocRef, updateData);
      toast({
        title: "Sukses!",
        description: `Data staf "${data.name}" berhasil diperbarui.`,
      });
      router.push('/staff/list');
    } catch (error) {
      console.error("Error updating staff: ", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui data staf. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoadingData) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Edit Data Staf" />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data staf...</p>
        </main>
      </div>
    );
  }

  if (staffNotFound) {
     return (
      <div className="flex flex-col h-full">
        <AppHeader title="Error" />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <p className="text-lg text-destructive mb-4">Data staf tidak ditemukan.</p>
          <Button asChild variant="outline">
            <Link href="/staff/list">Kembali ke Daftar Staf</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title={`Edit Staf: ${form.getValues('name') || 'Staf'}`} />
      <main className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Edit Informasi Staf</CardTitle>
                <CardDescription>Perbarui detail staf di bawah ini, termasuk informasi kontak dan kompensasi.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap Staf</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap staf" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peran Staf</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih peran staf" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {STAFF_ROLES.map(roleValue => (
                            <SelectItem key={roleValue} value={roleValue}>{roleValue}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground"/>Nomor HP (Opsional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="mis. 081234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="baseSalary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground"/>Gaji Pokok (Rp, Opsional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="mis. 3000000" 
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
                    name="profitSharePercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Percent className="mr-2 h-4 w-4 text-muted-foreground"/>Bagi Hasil (%, Opsional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="mis. 25 (untuk 25%)" 
                            min="0" max="100" 
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
                  name="photoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><ImageIcon className="mr-2 h-4 w-4 text-muted-foreground"/>URL Foto (Opsional)</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="mis. https://example.com/foto.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/staff/list">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
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
