
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { STAFF_ROLES, type StaffRole, type NewStaffMemberData } from '@/types/staff';

const staffFormSchema = z.object({
  name: z.string().min(2, "Nama staf minimal 2 karakter").max(50, "Nama staf maksimal 50 karakter"),
  role: z.enum(STAFF_ROLES, { required_error: "Peran staf diperlukan" }),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

export default function NewStaffPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: '',
      role: undefined,
    },
  });

  const onSubmit = async (data: StaffFormValues) => {
    setIsSubmitting(true);
    try {
      const newStaffData: NewStaffMemberData & { createdAt: any } = {
        name: data.name,
        role: data.role,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'staffMembers'), newStaffData);
      toast({
        title: "Sukses!",
        description: `Staf baru "${data.name}" berhasil ditambahkan.`,
      });
      router.push('/staff/list');
    } catch (error) {
      console.error("Error adding staff member: ", error);
      toast({
        title: "Error",
        description: "Gagal menambahkan staf baru. Silakan coba lagi.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Tambah Staf Baru" />
      <main className="flex-1 overflow-y-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Informasi Staf</CardTitle>
                <CardDescription>Isi detail staf baru di bawah ini.</CardDescription>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Simpan Staf
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  );
}
