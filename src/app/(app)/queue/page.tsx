
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit3, CheckCircle, Clock, Loader2, Trash2, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc, 
  serverTimestamp, 
  Timestamp,
  where,
  writeBatch
} from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import type { Client, Motorcycle } from '@/types/client';
import type { ServiceProduct } from '@/app/(app)/services/page';
import type { Transaction, TransactionItem } from '@/types/transaction';
import { v4 as uuidv4 } from 'uuid';


interface QueueItem {
  id: string;
  customerName: string;
  clientId?: string; 
  vehicleInfo: string;
  service: string; // Nama layanan
  serviceId?: string; // ID layanan
  status: 'Menunggu' | 'Dalam Layanan' | 'Selesai';
  estimatedTime: string;
  staff?: string; // Nama staf yang menangani
  createdAt: Timestamp; 
}

const queueItemFormSchema = z.object({
  customerName: z.string().min(1, "Nama pelanggan diperlukan"), // Akan menjadi select
  clientId: z.string().optional(),
  vehicleInfo: z.string().min(1, "Info kendaraan diperlukan"), // Akan menjadi select
  service: z.string().min(1, "Layanan diperlukan"), // Akan menjadi select
  serviceId: z.string().optional(),
  estimatedTime: z.string().min(1, "Estimasi waktu diperlukan"),
  status: z.enum(['Menunggu', 'Dalam Layanan', 'Selesai']),
});

type QueueItemFormData = z.infer<typeof queueItemFormSchema>;

interface ClientForSelect extends Client {
  // jika ada tambahan spesifik untuk select
}
interface ServiceForSelect extends ServiceProduct {
// jika ada tambahan spesifik untuk select
}

interface QueueItemFormProps {
  onSubmit: (data: QueueItemFormData) => Promise<void>;
  defaultValues: QueueItemFormData;
  onCancel: () => void;
  isSubmitting: boolean;
  clientsList: ClientForSelect[];
  servicesList: ServiceForSelect[];
}

function QueueItemForm({ onSubmit, defaultValues, onCancel, isSubmitting, clientsList, servicesList }: QueueItemFormProps) {
  const form = useForm<QueueItemFormData>({
    resolver: zodResolver(queueItemFormSchema),
    defaultValues: defaultValues,
  });

  const selectedClientId = form.watch('clientId');
  const [selectedClientMotorcycles, setSelectedClientMotorcycles] = useState<Motorcycle[]>([]);

  useEffect(() => {
    form.reset(defaultValues);
    const client = clientsList.find(c => c.id === defaultValues.clientId);
    setSelectedClientMotorcycles(client?.motorcycles || []);
    if (client && defaultValues.vehicleInfo) {
      const vehicleExists = client.motorcycles.some(m => `${m.name} (${m.licensePlate.toUpperCase()})` === defaultValues.vehicleInfo);
      if (!vehicleExists) {
        form.setValue('vehicleInfo', '');
      }
    } else if (!defaultValues.clientId) {
        form.setValue('customerName', defaultValues.customerName || ''); // For walk-in
    }
  }, [defaultValues, form, clientsList]);

  useEffect(() => {
    if (selectedClientId) {
      const client = clientsList.find(c => c.id === selectedClientId);
      form.setValue('customerName', client?.name || '');
      setSelectedClientMotorcycles(client?.motorcycles || []);
      const currentVehicleInfo = form.getValues('vehicleInfo');
      if (currentVehicleInfo) {
        const vehicleIsValidForNewCustomer = client?.motorcycles.some(m => `${m.name} (${m.licensePlate.toUpperCase()})` === currentVehicleInfo);
        if (!vehicleIsValidForNewCustomer) {
          form.setValue('vehicleInfo', '');
        }
      }
    } else {
      // Manual input for customer name if no client is selected (walk-in)
      setSelectedClientMotorcycles([]);
      form.setValue('vehicleInfo', ''); 
    }
  }, [selectedClientId, clientsList, form]);


  const internalSubmit = form.handleSubmit(async (data) => {
     // Ensure serviceId is populated based on selected service name
    const selectedService = servicesList.find(s => s.name === data.service);
    if (selectedService) {
      data.serviceId = selectedService.id;
    }
    await onSubmit(data);
  });
  
  return (
    <Form {...form}>
      <form onSubmit={internalSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pelanggan Terdaftar (Opsional)</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  if (!value) { // If "Walk-in" or empty is chosen
                    form.setValue('customerName', ''); // Clear or allow manual input
                  }
                }} 
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pelanggan atau biarkan kosong untuk walk-in" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">-- Pelanggan Walk-in --</SelectItem>
                  {clientsList.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} ({client.phone})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Pelanggan (Walk-in)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Masukkan nama jika pelanggan walk-in" 
                  {...field} 
                  disabled={!!selectedClientId} // Disable if a registered client is selected
                />
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
              {selectedClientId ? (
                <Select 
                  onValueChange={field.onChange} 
                  value={field.value}
                  disabled={selectedClientMotorcycles.length === 0}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={selectedClientMotorcycles.length > 0 ? "Pilih info kendaraan" : "Klien ini tidak memiliki motor terdaftar"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedClientMotorcycles.map(motorcycle => (
                      <SelectItem key={motorcycle.licensePlate} value={`${motorcycle.name} (${motorcycle.licensePlate.toUpperCase()})`}>
                        {motorcycle.name} ({motorcycle.licensePlate.toUpperCase()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <FormControl>
                  <Input placeholder="Mis. Honda Vario (B 1234 XYZ)" {...field} />
                </FormControl>
              )}
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
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  const selectedService = servicesList.find(s => s.name === value);
                  form.setValue('serviceId', selectedService?.id || undefined);
                }} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih layanan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {servicesList.map(service => (
                    <SelectItem key={service.id} value={service.name}>
                      {service.name} (Rp {service.price.toLocaleString('id-ID')})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
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

interface AssignStaffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (staffName: string) => Promise<void>;
  staffList: string[]; // Assuming staff list is just names for now
  isSubmitting: boolean;
}

function AssignStaffDialog({ isOpen, onClose, onSubmit, staffList, isSubmitting }: AssignStaffDialogProps) {
  const [selectedStaff, setSelectedStaff] = useState<string>('');

  const handleSubmit = async () => {
    if (!selectedStaff) {
      toast({ title: "Error", description: "Silakan pilih staf.", variant: "destructive" });
      return;
    }
    await onSubmit(selectedStaff);
    setSelectedStaff(''); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setSelectedStaff(''); 
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tugaskan Staf</DialogTitle>
          <DialogDescription>Pilih staf yang akan menangani layanan ini.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Label htmlFor="staff-select">Staf yang Bertugas</Label>
          <Select value={selectedStaff} onValueChange={setSelectedStaff}>
            <SelectTrigger id="staff-select">
              <SelectValue placeholder="Pilih staf" />
            </SelectTrigger>
            <SelectContent>
              {staffList.map(staffName => (
                <SelectItem key={staffName} value={staffName}>
                  {staffName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => { onClose(); setSelectedStaff('');}} disabled={isSubmitting}>Batal</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !selectedStaff}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
            Konfirmasi Staf
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default function QueuePage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [currentEditingItem, setCurrentEditingItem] = useState<QueueItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<QueueItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [clientsList, setClientsList] = useState<ClientForSelect[]>([]);
  const [servicesList, setServicesList] = useState<ServiceForSelect[]>([]);
  // Placeholder staff list, ideally fetched from Firestore or config
  const staffList = ['Andi P.', 'Budi S.', 'Rian S.', 'Siti K.', 'Eko W.', 'Lainnya']; 

  const [isAssignStaffDialogOpen, setIsAssignStaffDialogOpen] = useState(false);
  const [itemBeingAssigned, setItemBeingAssigned] = useState<QueueItem | null>(null);

  const { toast } = useToast();
  
  const fetchClients = useCallback(async () => {
    try {
      const clientsCollectionRef = collection(db, 'clients');
      const q = query(clientsCollectionRef, orderBy("name"));
      const querySnapshot = await getDocs(q);
      const clientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClientForSelect));
      setClientsList(clientsData);
    } catch (error) {
      console.error("Error fetching clients for dropdown: ", error);
      toast({
        title: "Error",
        description: "Tidak dapat mengambil data klien untuk dropdown.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchServices = useCallback(async () => {
    try {
      const servicesCollectionRef = collection(db, 'services');
      const q = query(servicesCollectionRef, orderBy("name"));
      const querySnapshot = await getDocs(q);
      const servicesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceForSelect));
      setServicesList(servicesData);
    } catch (error) {
      console.error("Error fetching services for dropdown: ", error);
      toast({
        title: "Error",
        description: "Tidak dapat mengambil data layanan untuk dropdown.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchClients();
    fetchServices();
  }, [fetchClients, fetchServices]);

  const fetchQueueItems = useCallback(async () => {
    setLoading(true);
    try {
      const queueCollectionRef = collection(db, 'queueItems');
      const q = query(queueCollectionRef, orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(q);
      
      const itemsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          createdAt: data.createdAt || Timestamp.now() 
        } as QueueItem;
      });
      setQueueItems(itemsData);

    } catch (error) {
      console.error("Error fetching queue items: ", error);
      let description = "Tidak dapat mengambil data antrian.";
      if (error instanceof Error) {
          description = `Error: ${error.message}.`;
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
    clientId: undefined,
    vehicleInfo: '',
    service: '',
    serviceId: undefined,
    estimatedTime: '',
    status: 'Menunggu',
  };

  const handleOpenAddDialog = () => {
    console.log('[QueuePage] handleOpenAddDialog called');
    setCurrentEditingItem(null); 
    setIsFormDialogOpen(true);
    console.log('[QueuePage] isFormDialogOpen changed to:', true);
  };

  const handleEditItem = (item: QueueItem) => {
    setCurrentEditingItem(item);
    setIsFormDialogOpen(true);
  };

  const handleFormSubmit = async (formData: QueueItemFormData) => {
    setIsSubmitting(true);
    try {
      const firestoreData: Omit<QueueItem, 'id' | 'createdAt' | 'staff'> = {
        customerName: formData.customerName,
        clientId: formData.clientId,
        vehicleInfo: formData.vehicleInfo,
        service: formData.service,
        serviceId: formData.serviceId,
        estimatedTime: formData.estimatedTime,
        status: formData.status,
      };

      if (currentEditingItem) { 
        const itemDocRef = doc(db, 'queueItems', currentEditingItem.id);
        await updateDoc(itemDocRef, firestoreData); 
        toast({ title: "Sukses", description: "Item antrian berhasil diperbarui." });
      } else { 
        await addDoc(collection(db, 'queueItems'), { 
          ...firestoreData, 
          createdAt: serverTimestamp() 
        });
        toast({ title: "Sukses", description: "Item baru berhasil ditambahkan ke antrian." });
      }
      setIsFormDialogOpen(false);
      setCurrentEditingItem(null);
      fetchQueueItems(); 
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast({ title: "Error", description: "Gagal menyimpan item antrian.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (item: QueueItem, newStatus: QueueItem['status']) => {
    if (newStatus === 'Dalam Layanan') {
      setItemBeingAssigned(item);
      setIsAssignStaffDialogOpen(true);
    } else if (newStatus === 'Selesai') {
      try {
        const itemDocRef = doc(db, 'queueItems', item.id);
        await updateDoc(itemDocRef, { status: newStatus, staff: item.staff || 'Tidak Ditugaskan' }); // Keep staff if already assigned
        toast({ title: "Status Diperbarui", description: `Status untuk ${item.customerName} diubah menjadi ${newStatus}.` });
        fetchQueueItems(); 
      } catch (error) {
        console.error("Error updating status to Selesai: ", error);
        toast({ title: "Error", description: "Gagal memperbarui status item.", variant: "destructive" });
      }
    }
  };

  const handleConfirmAssignStaff = async (staffName: string) => {
    if (!itemBeingAssigned) return;
    setIsSubmitting(true);
    try {
      const batch = writeBatch(db);
      const itemDocRef = doc(db, 'queueItems', itemBeingAssigned.id);
      batch.update(itemDocRef, { 
        status: 'Dalam Layanan',
        staff: staffName 
      });

      // Create or update transaction
      const serviceDetails = servicesList.find(s => s.name === itemBeingAssigned.service || s.id === itemBeingAssigned.serviceId);
      if (!serviceDetails) {
        toast({ title: "Error", description: "Detail layanan tidak ditemukan untuk membuat transaksi.", variant: "destructive" });
        setIsSubmitting(false);
        return;
      }

      const newTransactionItem: TransactionItem = {
        id: serviceDetails.id || uuidv4(),
        name: serviceDetails.name,
        price: serviceDetails.price,
        quantity: 1,
        type: 'service',
        staffName: staffName,
      };
      
      const transactionsRef = collection(db, "transactions");
      const q = query(transactionsRef, 
        where("customerName", "==", itemBeingAssigned.customerName), 
        where("status", "==", "open")
      );
      const existingTransactionsSnap = await getDocs(q);

      let transactionIdToUpdate: string | null = null;
      let existingItems: TransactionItem[] = [];

      if (!existingTransactionsSnap.empty) {
        const existingDoc = existingTransactionsSnap.docs[0];
        transactionIdToUpdate = existingDoc.id;
        existingItems = (existingDoc.data() as Transaction).items || [];
      }
      
      const updatedItems = [...existingItems, newTransactionItem];
      const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      if (transactionIdToUpdate) {
        const transactionDocRef = doc(db, 'transactions', transactionIdToUpdate);
        batch.update(transactionDocRef, {
          items: updatedItems,
          serviceStaffName: staffName, // Or update logic for multiple staff
          updatedAt: serverTimestamp(),
          subtotal: subtotal,
          total: subtotal // Assuming no discount for now
        });
      } else {
        const newTransactionRef = doc(collection(db, 'transactions')); // Auto-generate ID
        batch.set(newTransactionRef, {
          clientId: itemBeingAssigned.clientId,
          customerName: itemBeingAssigned.customerName,
          queueItemId: itemBeingAssigned.id,
          status: 'open',
          items: [newTransactionItem],
          serviceStaffName: staffName,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          subtotal: newTransactionItem.price,
          discountAmount: 0,
          discountPercentage: 0,
          total: newTransactionItem.price,
        } as Omit<Transaction, 'id'>);
      }

      await batch.commit();

      toast({ title: "Staf Ditugaskan & Transaksi Dibuat/Diperbarui", description: `${staffName} ditugaskan ke ${itemBeingAssigned.customerName}. Status diubah & transaksi diperbarui.` });
      fetchQueueItems();
      setIsAssignStaffDialogOpen(false);
      setItemBeingAssigned(null);
    } catch (error) {
      console.error("Error assigning staff and creating/updating transaction: ", error);
      toast({ title: "Error", description: "Gagal menugaskan staf atau memproses transaksi.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
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

  if (loading && (clientsList.length === 0 || servicesList.length === 0)) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Manajemen Antrian" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data antrian dan pendukung...</p>
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
              {loading && queueItems.length === 0 ? (
                 <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2">Memuat antrian...</p>
                </div>
              ) : queueItems.length === 0 && !loading ? (
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
            console.log('[QueuePage] Dialog open state changed:', openState);
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
                clientId: currentEditingItem.clientId,
                vehicleInfo: currentEditingItem.vehicleInfo,
                service: currentEditingItem.service,
                serviceId: currentEditingItem.serviceId,
                estimatedTime: currentEditingItem.estimatedTime,
                status: currentEditingItem.status,
              } : defaultQueueItemValues}
              onCancel={() => { setIsFormDialogOpen(false); setCurrentEditingItem(null);}}
              isSubmitting={isSubmitting}
              clientsList={clientsList}
              servicesList={servicesList}
            />
          </DialogContent>
        </Dialog>

        <AssignStaffDialog
          isOpen={isAssignStaffDialogOpen}
          onClose={() => {
            setIsAssignStaffDialogOpen(false);
            setItemBeingAssigned(null);
          }}
          onSubmit={handleConfirmAssignStaff}
          staffList={staffList} // Ensure staffList is passed
          isSubmitting={isSubmitting}
        />
      </main>
    </div>
  );
}
