
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Loader2, ArrowLeft, Phone, DollarSign, Percent, Image as ImageIcon, CalendarOff } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { STAFF_ROLES, type NewStaffMemberData } from '@/types/staff';

const daysOfWeek = [
  { id: 0, label: "Minggu" },
  { id: 1, label: "Senin" },
  { id: 2, label: "Selasa" },
  { id: 3, label: "Rabu" },
  { id: 4, label: "Kamis" },
  { id: 5, label: "Jumat" },
  { id: 6, label: "Sabtu" },
];

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
  photoUrl: z.string().url("URL foto tidak valid. Pastikan formatnya benar (mis. http:// atau https://).").optional().or(z.literal('')),
  daysOff: z.array(z.number()).optional(),
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
      phone: '',
      baseSalary: undefined,
      profitSharePercentage: undefined,
      photoUrl: '',
      daysOff: [],
    },
  });

  const onSubmit = async (data: StaffFormValues) => {
    setIsSubmitting(true);
    try {
      const newStaffEntry: NewStaffMemberData & { createdAt: any } = {
        name: data.name,
        role: data.role,
        createdAt: serverTimestamp(),
      };

      if (data.photoUrl && data.photoUrl.trim() !== '') {
        newStaffEntry.photoUrl = data.photoUrl;
      }
      if (data.phone && data.phone.trim() !== '') newStaffEntry.phone = data.phone;
      if (typeof data.baseSalary === 'number' && !isNaN(data.baseSalary)) newStaffEntry.baseSalary = data.baseSalary;
      if (typeof data.profitSharePercentage === 'number' && !isNaN(data.profitSharePercentage)) {
        newStaffEntry.profitSharePercentage = data.profitSharePercentage;
      }
      if (data.daysOff) {
        newStaffEntry.daysOff = data.daysOff;
      }


      await addDoc(collection(db, 'staffMembers'), newStaffEntry);

      toast({
        title: "Sukses!",
        description: `Staf baru "${data.name}" berhasil ditambahkan.`,
      });
      router.push('/staff/list');

    } catch (error: any) {
      console.error("Error adding staff member: ", error);
      toast({
        title: "Error",
        description: `Gagal menambahkan staf baru: ${error.message || "Silakan coba lagi."}`,
        variant: "destructive",
      });
    } finally {
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
                <CardDescription>Isi detail staf baru di bawah ini, termasuk informasi kontak dan kompensasi.</CardDescription>
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
                            value={field.value === undefined ? '' : String(field.value)}
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
                            value={field.value === undefined ? '' : String(field.value)}
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
                      <FormLabel className="flex items-center"><ImageIcon className="mr-2 h-4 w-4 text-muted-foreground"/>URL Foto Staf (Opsional)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="mis. https://example.com/foto.jpg" {...field} />
                      </FormControl>
                       <p className="text-xs text-muted-foreground mt-1">Masukkan URL gambar yang sudah dihosting.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="daysOff"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base flex items-center">
                          <CalendarOff className="mr-2 h-4 w-4 text-muted-foreground" />
                          Hari Libur Tetap (Opsional)
                        </FormLabel>
                        <FormDescription>
                          Pilih hari libur reguler untuk staf ini. Penggajian akan mengabaikan potongan absensi pada hari-hari ini.
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-2">
                        {daysOfWeek.map((day) => (
                          <FormField
                            key={day.id}
                            control={form.control}
                            name="daysOff"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={day.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(day.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), day.id])
                                          : field.onChange(
                                              (field.value || []).filter(
                                                (value) => value !== day.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {day.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
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
