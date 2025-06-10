
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
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { STAFF_ROLES, type StaffRole, type StaffMember } from '@/types/staff';

const staffFormSchema = z.object({
  name: z.string().min(2, "Nama staf minimal 2 karakter").max(50, "Nama staf maksimal 50 karakter"),
  role: z.enum(STAFF_ROLES, { required_error: "Peran staf diperlukan" }),
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
        updatedAt: serverTimestamp(),
      };

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
                <CardDescription>Perbarui detail staf di bawah ini.</CardDescription>
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
                          {STAFF_ROLES.map(role => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/staff/list">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Staf
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
