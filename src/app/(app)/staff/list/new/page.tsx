
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
import { Save, Loader2, ArrowLeft, Phone, DollarSign, Percent, Image as ImageIcon, Trash2 } from 'lucide-react';
import { db, app } from '@/lib/firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore'; // Import doc
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { STAFF_ROLES, type NewStaffMemberData } from '@/types/staff';
import { v4 as uuidv4 } from 'uuid';

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
  photoUrl: z.string().url("URL foto tidak valid").optional().or(z.literal('')), // Kept for Zod schema, but UI uses file input
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

export default function NewStaffPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "Ukuran File Terlalu Besar",
          description: "Ukuran file foto maksimal adalah 2MB.",
          variant: "destructive",
        });
        event.target.value = ""; // Reset file input
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('photoUrl', ''); 
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    form.setValue('photoUrl', ''); 
    const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = ""; 
    }
  };

  const onSubmit = async (data: StaffFormValues) => {
    setIsSubmitting(true);
    let finalPhotoUrl = '';

    try {
      // Create a new document reference with an auto-generated ID to get staffId first
      const newStaffDocRef = doc(collection(db, 'staffMembers'));
      const staffId = newStaffDocRef.id;

      if (selectedFile) {
        const storage = getStorage(app);
        const uniqueFileName = `${uuidv4()}-${selectedFile.name}`;
        const imagePath = `staff_photos/${staffId}/${uniqueFileName}`;
        const imageStorageRef = storageRef(storage, imagePath);
        
        toast({ title: "Mengupload gambar...", description: "Proses ini mungkin butuh beberapa saat." });
        await uploadBytes(imageStorageRef, selectedFile);
        finalPhotoUrl = await getDownloadURL(imageStorageRef);
        toast({ title: "Upload Berhasil", description: "Gambar staf berhasil diupload." });
      }

      const newStaffEntry: NewStaffMemberData & { createdAt: any; id: string; photoUrl?: string } = {
        id: staffId, // Store the auto-generated ID
        name: data.name,
        role: data.role,
        createdAt: serverTimestamp(),
      };

      if (finalPhotoUrl) {
        newStaffEntry.photoUrl = finalPhotoUrl;
      }
      if (data.phone && data.phone.trim() !== '') newStaffEntry.phone = data.phone;
      if (typeof data.baseSalary === 'number' && !isNaN(data.baseSalary)) newStaffEntry.baseSalary = data.baseSalary;
      if (typeof data.profitSharePercentage === 'number' && !isNaN(data.profitSharePercentage)) {
        newStaffEntry.profitSharePercentage = data.profitSharePercentage;
      }
      
      // Use setDoc with the pre-generated ref instead of addDoc
      await addDoc(collection(db, 'staffMembers'), newStaffEntry);


      toast({
        title: "Sukses!",
        description: `Staf baru "${data.name}" berhasil ditambahkan.`,
      });
      router.push('/staff/list');

    } catch (error: any) {
      console.error("Error adding staff member: ", error);
      let errorMessage = "Gagal menambahkan staf baru. Silakan coba lagi.";
      if (error.code && typeof error.code === 'string') {
        if (error.code.startsWith('storage/')) {
          errorMessage = `Error upload gambar: ${error.message || 'Tidak diketahui'}`;
        } else if (error.code.startsWith('firestore/')) {
          errorMessage = `Error penyimpanan data: ${error.message || 'Tidak diketahui'}`;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false); // Ensure reset on error
    } finally {
      // isSubmitting will be false if an error occurred and was caught.
      // If successful, router.push happens, and this component might unmount.
      // For safety, ensure it's set, though if an error is thrown and caught, it's handled above.
      if(isSubmitting) setIsSubmitting(false);
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
                            value={field.value === undefined ? '' : String(field.value)} // Ensure value is string for input
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
                            value={field.value === undefined ? '' : String(field.value)} // Ensure value is string for input
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
                
                <FormItem>
                  <FormLabel className="flex items-center"><ImageIcon className="mr-2 h-4 w-4 text-muted-foreground"/>Foto Staf (Opsional)</FormLabel>
                  {imagePreview && (
                    <div className="my-2">
                      <img src={imagePreview} alt="Preview Foto Staf" className="h-32 w-32 object-cover rounded-md border" />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <FormControl>
                       <Input 
                          id="photo-upload"
                          type="file" 
                          accept="image/*" 
                          onChange={handleFileChange} 
                          className="block flex-grow text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                    </FormControl>
                    {(imagePreview || selectedFile) && (
                      <Button type="button" variant="ghost" size="icon" onClick={handleRemoveImage} title="Hapus gambar" className="flex-shrink-0">
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    )}
                  </div>
                   <p className="text-xs text-muted-foreground mt-1">Upload file gambar (JPG, PNG, GIF). Maks 2MB.</p>
                  <FormMessage>{form.formState.errors.photoUrl?.message}</FormMessage>
                </FormItem>

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

    