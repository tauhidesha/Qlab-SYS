
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit3, CheckCircle, Clock, Loader2, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, addDoc, updateDoc, doc, deleteDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


interface QueueItem {
  id: string;
  customerName: string;
  vehicleInfo: string;
  service: string;
  status: 'Menunggu' | 'Dalam Layanan' | 'Selesai';
  estimatedTime: string;
  staff?: string;
  createdAt: Timestamp; 
}

const queueItemFormSchema = z.object({
  customerName: z.string().min(1, "Nama pelanggan diperlukan"),
  vehicleInfo: z.string().min(1, "Info kendaraan diperlukan"),
  service: z.string().min(1, "Layanan diperlukan"),
  estimatedTime: z.string().min(1, "Estimasi waktu diperlukan"),
  staff: z.string().optional(),
  status: z.enum(['Menunggu', 'Dalam Layanan', 'Selesai']),
});

type QueueItemFormData = z.infer<typeof queueItemFormSchema>;

interface QueueItemFormProps {
  onSubmit: (data: QueueItemFormData) => Promise<void>;
  defaultValues: QueueItemFormData;
  onCancel: () => void;
  isSubmitting: boolean;
}

function QueueItemForm({ onSubmit, defaultValues, onCancel, isSubmitting }: QueueItemFormProps) {
  const form = useForm<QueueItemFormData>({
    resolver: zodResolver(queueItemFormSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const internalSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={internalSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Pelanggan</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama pelanggan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vehicleInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Info Kendaraan</FormLabel>
              <FormControl>
                <Input placeholder="mis. Honda Beat - B 1234 ABC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Layanan</FormLabel>
              <FormControl>
                <Input placeholder="mis. Cuci Reguler, Ganti Oli" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimatedTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimasi Waktu</FormLabel>
              <FormControl>
                <Input placeholder="mis. 15 mnt, 1 jam" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="staff"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staf (Opsional)</FormLabel>
              <FormControl>
                <Input placeholder="Nama staf yang menangani" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status antrian" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Menunggu">Menunggu</SelectItem>
                  <SelectItem value="Dalam Layanan">Dalam Layanan</SelectItem>
                  <SelectItem value="Selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Simpan
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}


export default function QueuePage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [currentEditingItem, setCurrentEditingItem] = useState<QueueItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<QueueItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    console.log('[QueuePage] isFormDialogOpen changed to:', isFormDialogOpen);
  }, [isFormDialogOpen]);

  const fetchQueueItems = useCallback(async () => {
    setLoading(true);
    console.log("Mengambil item antrian dari Firestore...");
    try {
      const queueCollectionRef = collection(db, 'queueItems');
      const q = query(queueCollectionRef, orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(q);
      
      console.log(`Mengambil ${querySnapshot.docs.length} dokumen antrian.`);
      
      const itemsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          createdAt: data.createdAt || Timestamp.now() 
        } as QueueItem;
      });
      
      console.log('Data item antrian yang dipetakan:', itemsData);
      setQueueItems(itemsData);

    } catch (error) {
      console.error("Error fetching queue items: ", error);
      let description = "Tidak dapat mengambil data antrian. Silakan periksa koneksi internet Anda.";
      if (error instanceof Error) {
          description = `Error: ${error.message}. Silakan periksa aturan keamanan Firestore dan nama koleksi ('queueItems').`;
      }
      toast({
        title: "Error Pengambilan",
        description: description,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchQueueItems();
  }, [fetchQueueItems]);

  const defaultQueueItemValues: QueueItemFormData = {
    customerName: '',
    vehicleInfo: '',
    service: '',
    estimatedTime: '',
    staff: '',
    status: 'Menunggu',
  };

  const handleOpenAddDialog = () => {
    console.log('[QueuePage] handleOpenAddDialog called');
    setCurrentEditingItem(null);
    setIsFormDialogOpen(true);
  };

  const handleEditItem = (item: QueueItem) => {
    setCurrentEditingItem(item);
    setIsFormDialogOpen(true);
  };

  const handleFormSubmit = async (data: QueueItemFormData) => {
    setIsSubmitting(true);
    try {
      if (currentEditingItem) { 
        const itemDocRef = doc(db, 'queueItems', currentEditingItem.id);
        await updateDoc(itemDocRef, { ...data, staff: data.staff || "" }); 
        toast({ title: "Sukses", description: "Item antrian berhasil diperbarui." });
      } else { 
        await addDoc(collection(db, 'queueItems'), { 
          ...data, 
          staff: data.staff || "", 
          createdAt: serverTimestamp() 
        });
        toast({ title: "Sukses", description: "Item baru berhasil ditambahkan ke antrian." });
      }
      setIsFormDialogOpen(false);
      fetchQueueItems(); 
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast({ title: "Error", description: "Gagal menyimpan item antrian.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (item: QueueItem, newStatus: QueueItem['status']) => {
    try {
      const itemDocRef = doc(db, 'queueItems', item.id);
      await updateDoc(itemDocRef, { status: newStatus });
      toast({ title: "Status Diperbarui", description: `Status untuk ${item.customerName} diubah menjadi ${newStatus}.` });
      fetchQueueItems(); 
    } catch (error) {
      console.error("Error updating status: ", error);
      toast({ title: "Error", description: "Gagal memperbarui status item.", variant: "destructive" });
    }
  };
  
  const handleDeleteConfirmation = (item: QueueItem) => {
    setItemToDelete(item);
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    setIsSubmitting(true);
    try {
      await deleteDoc(doc(db, 'queueItems', itemToDelete.id));
      toast({
        title: "Sukses",
        description: `Item antrian untuk "${itemToDelete.customerName}" berhasil dihapus.`,
      });
      setItemToDelete(null);
      fetchQueueItems();
    } catch (error) {
      console.error("Error deleting item: ", error);
      toast({
        title: "Error",
        description: "Gagal menghapus item antrian.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const getStatusBadgeVariant = (status: QueueItem['status']) => {
    if (status === 'Dalam Layanan') return 'default'; 
    if (status === 'Selesai') return 'secondary'; 
    return 'outline'; 
  };
  
  const getStatusIcon = (status: QueueItem['status']) => {
    if (status === 'Dalam Layanan') return <Clock className="h-4 w-4 text-primary" />;
    if (status === 'Selesai') return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <Clock className="h-4 w-4 text-yellow-500" />;
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Manajemen Antrian" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data antrian...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Manajemen Antrian" />
      <main className="flex-1 overflow-y-auto p-6">
        <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Antrian Pelanggan</CardTitle>
                <CardDescription>Kelola pelanggan yang menunggu dan sedang dilayani.</CardDescription>
              </div>
              <Button onClick={handleOpenAddDialog}>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah ke Antrian
              </Button>
            </CardHeader>
            <CardContent>
              {queueItems.length === 0 && !loading ? (
                <div className="text-center py-10 text-muted-foreground">
                  Antrian saat ini kosong. Klik "Tambah ke Antrian" untuk memulai.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {queueItems.map((item) => (
                    <Card key={item.id} className="shadow-lg flex flex-col">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.customerName}</CardTitle>
                          <Badge variant={getStatusBadgeVariant(item.status)} className="capitalize">
                            {getStatusIcon(item.status)}
                            <span className="ml-1">{item.status}</span>
                          </Badge>
                        </div>
                        <CardDescription>{item.vehicleInfo} - {item.service}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="text-sm text-muted-foreground mb-1">
                          Estimasi: {item.estimatedTime}
                        </div>
                        {item.staff && (
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Avatar className="h-5 w-5 mr-2">
                               <AvatarImage src={`https://placehold.co/40x40.png?text=${item.staff.substring(0,1)}`} data-ai-hint="avatar karyawan" />
                               <AvatarFallback>{item.staff.substring(0,1)}</AvatarFallback>
                            </Avatar>
                            Staf: {item.staff}
                          </div>
                        )}
                         <div className="text-xs text-muted-foreground mt-1">
                          Masuk: {item.createdAt?.toDate().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-4 border-t mt-auto">
                        <Button variant="outline" size="sm" onClick={() => handleEditItem(item)} className="w-full sm:w-auto order-1 sm:order-1">
                          <Edit3 className="mr-2 h-4 w-4" /> Ubah
                        </Button>
                        
                        {item.status === 'Menunggu' && (
                          <Button size="sm" onClick={() => handleStatusChange(item, 'Dalam Layanan')} className="w-full sm:w-auto order-2 sm:order-2">
                            Mulai Layanan
                          </Button>
                        )}
                        {item.status === 'Dalam Layanan' && (
                          <Button size="sm" variant="secondary" onClick={() => handleStatusChange(item, 'Selesai')} className="w-full sm:w-auto order-2 sm:order-2">
                            Tandai Selesai
                          </Button>
                        )}
                        
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteConfirmation(item)} className="w-full sm:w-auto order-3 sm:order-3">
                            <Trash2 className="mr-2 h-4 w-4" /> Hapus
                          </Button>
                        </AlertDialogTrigger>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <AlertDialogContent>
              <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
              <AlertDialogDescription>
                  Apakah Anda yakin ingin menghapus item antrian untuk "{itemToDelete?.customerName}"? Tindakan ini tidak dapat diurungkan.
              </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setItemToDelete(null)}>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteItem} disabled={isSubmitting} className={buttonVariants({variant: "destructive"})}>
                  {isSubmitting && itemToDelete ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Hapus
              </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={isFormDialogOpen} onOpenChange={(openState) => {
            setIsFormDialogOpen(openState);
            if (!openState) { 
                setCurrentEditingItem(null); 
            }
        }}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{currentEditingItem ? 'Ubah Item Antrian' : 'Tambah Item ke Antrian'}</DialogTitle>
              <DialogDescription>
                {currentEditingItem ? 'Ubah detail item antrian di bawah ini.' : 'Isi detail item antrian baru.'}
              </DialogDescription>
            </DialogHeader>
            <QueueItemForm
              onSubmit={handleFormSubmit}
              defaultValues={currentEditingItem ? {
                customerName: currentEditingItem.customerName,
                vehicleInfo: currentEditingItem.vehicleInfo,
                service: currentEditingItem.service,
                estimatedTime: currentEditingItem.estimatedTime,
                staff: currentEditingItem.staff || '',
                status: currentEditingItem.status,
              } : defaultQueueItemValues}
              onCancel={() => setIsFormDialogOpen(false)}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

    