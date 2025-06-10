
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
import { Save, Loader2, ArrowLeft, Phone, DollarSign, Percent, Image as ImageIcon, UploadCloud, Trash2 } from 'lucide-react';
import { db, app } from '@/lib/firebase'; // Pastikan 'app' diekspor dari firebase.ts
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { STAFF_ROLES, type StaffRole, type StaffMember } from '@/types/staff';
import { v4 as uuidv4 } from 'uuid'; // Untuk nama file unik

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
  photoUrl: z.string().url("URL foto tidak valid").optional().or(z.literal('')),
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);

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
            baseSalary: staffData.baseSalary,
            profitSharePercentage: staffData.profitSharePercentage,
            photoUrl: staffData.photoUrl || '',
          });
          if (staffData.photoUrl) {
            setImagePreview(staffData.photoUrl);
            setExistingPhotoUrl(staffData.photoUrl);
          }
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('photoUrl', ''); // Kosongkan field photoUrl di form jika ada file baru
    }
  };

  const handleRemoveImage = async () => {
    setSelectedFile(null);
    setImagePreview(null);
    form.setValue('photoUrl', ''); // Hapus URL dari form juga

    // Jika ada existingPhotoUrl dan ingin menghapusnya dari storage (opsional)
    // if (existingPhotoUrl) {
    //   try {
    //     const storage = getStorage(app);
    //     const imageRef = storageRef(storage, existingPhotoUrl); // Perlu cara untuk mendapatkan path dari URL
    //     await deleteObject(imageRef);
    //     toast({ title: "Info", description: "Foto lama dihapus dari storage." });
    //   } catch (error) {
    //     console.warn("Gagal menghapus foto lama dari storage:", error);
    //   }
    // }
    setExistingPhotoUrl(null); // Hapus dari state
    const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = ""; // Reset file input
    }
  };


  const onSubmit = async (data: StaffFormValues) => {
    if (!staffId) return;
    setIsSubmitting(true);
    let finalPhotoUrl = data.photoUrl || ''; // Ambil dari form jika tidak ada file baru

    try {
      const staffDocRef = doc(db, 'staffMembers', staffId);

      if (selectedFile) { // Jika ada file baru yang dipilih untuk diupload
        const storage = getStorage(app);
        const uniqueFileName = `${uuidv4()}-${selectedFile.name}`;
        const imagePath = `staff_photos/${staffId}/${uniqueFileName}`;
        const imageStorageRef = storageRef(storage, imagePath);
        
        toast({ title: "Mengupload gambar baru...", description: "Mohon tunggu sebentar." });
        await uploadBytes(imageStorageRef, selectedFile);
        finalPhotoUrl = await getDownloadURL(imageStorageRef);
        toast({ title: "Upload Berhasil", description: "Gambar staf berhasil diupload." });

        // Hapus foto lama dari storage jika ada dan foto baru diupload
        // if (existingPhotoUrl && existingPhotoUrl !== finalPhotoUrl) {
        //   try {
        //     const oldImageRef = storageRef(storage, existingPhotoUrl); // Perlu cara konversi URL ke ref yg benar
        //     await deleteObject(oldImageRef);
        //     toast({ title: "Info", description: "Foto lama telah dihapus dari storage." });
        //   } catch (err) {
        //     console.warn("Gagal menghapus foto lama dari storage:", err);
        //   }
        // }

      } else if (data.photoUrl === '' && existingPhotoUrl) {
        // Kasus dimana gambar dihapus (form.setValue('photoUrl', '') dipanggil oleh handleRemoveImage)
        // dan tidak ada file baru yang dipilih
        finalPhotoUrl = ''; // Pastikan photoUrl dikosongkan di Firestore
        // Penghapusan file dari storage bisa ditambahkan di sini jika diinginkan,
        // tapi untuk sekarang kita hanya mengosongkan URL di Firestore.
      }


      const updateData: Partial<Omit<StaffMember, 'id' | 'createdAt'>> & { updatedAt?: any } = {
        name: data.name,
        role: data.role,
        phone: data.phone || undefined,
        baseSalary: data.baseSalary,
        profitSharePercentage: data.profitSharePercentage,
        photoUrl: finalPhotoUrl || undefined, // Simpan URL baru atau kosongkan
        updatedAt: serverTimestamp(),
      };
      
      Object.keys(updateData).forEach(key => {
        const K = key as keyof typeof updateData;
        if (updateData[K] === undefined && K !== 'updatedAt' && K !== 'photoUrl') {
          delete updateData[K];
        }
      });
       if (updateData.photoUrl === undefined) {
         updateData.photoUrl = ''; // Pastikan dikirim sebagai string kosong jika undefined
       }


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
        description: `Gagal memperbarui data staf: ${error instanceof Error ? error.message : 'Kesalahan tidak diketahui'}`,
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
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                    </FormControl>
                     {(imagePreview || selectedFile) && ( // Tampilkan tombol hapus jika ada preview atau file dipilih
                      <Button type="button" variant="ghost" size="icon" onClick={handleRemoveImage} title="Hapus gambar">
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    )}
                  </div>
                   <p className="text-xs text-muted-foreground mt-1">Upload file gambar baru (JPG, PNG, GIF). Maks 2MB. Jika tidak ada file baru dipilih, foto lama akan dipertahankan kecuali dihapus.</p>
                  {/* Field photoUrl di form tidak lagi ditampilkan langsung, dikelola oleh state */}
                  <FormMessage>{form.formState.errors.photoUrl?.message}</FormMessage>
                </FormItem>

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

