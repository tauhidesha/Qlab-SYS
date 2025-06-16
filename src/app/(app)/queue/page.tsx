
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit3, CheckCircle, Clock, Loader2, Trash2, UserPlus, PackageSearch, FileText, MessageSquareText, Search } from 'lucide-react'; // Added Search
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  writeBatch,
  deleteField,
  limit,
  type DocumentData
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
import { Input } from '@/components/ui/input'; // Added Input
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
import type { ServiceProduct, ServiceProductVariant } from '@/app/(app)/services/page';
import type { Transaction, TransactionItem } from '@/types/transaction';
import { v4 as uuidv4 } from 'uuid';
import type { StaffMember, StaffRole } from '@/types/staff';
import Link from 'next/link';


export interface QueueItem { // Exporting for Dashboard
  id: string;
  customerName: string;
  clientId?: string; 
  vehicleInfo: string;
  service: string; // Nama layanan (bisa termasuk nama varian)
  serviceId?: string; // ID layanan utama
  variantId?: string; // ID varian layanan jika ada
  status: 'Menunggu' | 'Dalam Layanan' | 'Selesai';
  estimatedTime: string;
  staff?: string; // Nama staf yang menangani
  createdAt: Timestamp; 
  completedAt?: Timestamp;
  serviceStartTime?: Timestamp; // Kapan layanan mulai dikerjakan
}

const queueItemFormSchema = z.object({
  customerName: z.string().min(1, "Nama pelanggan diperlukan"),
  clientId: z.string().optional(),
  vehicleInfo: z.string().min(1, "Info kendaraan diperlukan"), 
  serviceId: z.string().min(1, "Layanan harus dipilih"), // ID layanan utama
  variantId: z.string().optional(), // ID varian jika ada
  estimatedTime: z.string().min(1, "Estimasi waktu diperlukan (otomatis terisi)"), // Akan read-only
  status: z.enum(['Menunggu', 'Dalam Layanan', 'Selesai']),
});

type QueueItemFormData = z.infer<typeof queueItemFormSchema>;

interface ClientForSelect extends Client {
  // jika ada tambahan spesifik untuk select
}
interface ServiceForSelect extends ServiceProduct {
// jika ada tambahan spesifik untuk select
}

const WALK_IN_CLIENT_VALUE = "##WALK_IN_CLIENT##";

interface QueueItemFormProps {
  onSubmit: (data: QueueItemFormData, serviceNameDisplay: string) => Promise<void>;
  defaultValues: Partial<QueueItemFormData>; // Make defaultValues partial
  onCancel: () => void;
  isSubmitting: boolean;
  clientsList: ClientForSelect[];
  allServicesList: ServiceForSelect[]; // Now receives all services
}

function QueueItemForm({ onSubmit, defaultValues, onCancel, isSubmitting, clientsList, allServicesList }: QueueItemFormProps) {
  const form = useForm<QueueItemFormData>({
    resolver: zodResolver(queueItemFormSchema),
    defaultValues: { // Ensure all fields have a default, even if undefined for optional
      customerName: defaultValues.customerName || '',
      clientId: defaultValues.clientId || WALK_IN_CLIENT_VALUE,
      vehicleInfo: defaultValues.vehicleInfo || '',
      serviceId: defaultValues.serviceId || undefined,
      variantId: defaultValues.variantId || undefined,
      estimatedTime: defaultValues.estimatedTime || '',
      status: defaultValues.status || 'Menunggu',
    }
  });

  const selectedClientId = form.watch('clientId');
  const selectedServiceId = form.watch('serviceId');
  
  const [selectedClientMotorcycles, setSelectedClientMotorcycles] = useState<Motorcycle[]>([]);
  const [availableVariants, setAvailableVariants] = useState<ServiceProductVariant[]>([]);

  // Filter for only "Layanan" type items for the service dropdown
  const availableServiceItems = React.useMemo(() => {
    return allServicesList.filter(s => s.type === 'Layanan');
  }, [allServicesList]);

  // Effect for handling client selection and motorcycle list
  useEffect(() => {
    const initialClientId = defaultValues.clientId || WALK_IN_CLIENT_VALUE;
    const isWalkInByDefault = initialClientId === WALK_IN_CLIENT_VALUE;
    
    form.reset({
      ...defaultValues,
      customerName: isWalkInByDefault && !defaultValues.customerName ? '' : defaultValues.customerName || '',
      clientId: initialClientId, 
      vehicleInfo: defaultValues.vehicleInfo || '',
      estimatedTime: defaultValues.estimatedTime || '', // Preserve estimatedTime if editing
      status: defaultValues.status || 'Menunggu',
      serviceId: defaultValues.serviceId,
      variantId: defaultValues.variantId,
    });

    if (initialClientId && initialClientId !== WALK_IN_CLIENT_VALUE) {
      const client = clientsList.find(c => c.id === initialClientId);
      setSelectedClientMotorcycles(client?.motorcycles || []);
      if (client && defaultValues.vehicleInfo) {
        const vehicleExists = client.motorcycles.some(m => `${m.name} (${m.licensePlate.toUpperCase()})` === defaultValues.vehicleInfo);
        if (!vehicleExists) {
          form.setValue('vehicleInfo', '');
        }
      }
    } else {
      setSelectedClientMotorcycles([]);
      form.setValue('vehicleInfo', defaultValues.vehicleInfo || ''); 
    }
  }, [defaultValues, form, clientsList]);


  useEffect(() => {
    if (selectedClientId && selectedClientId !== WALK_IN_CLIENT_VALUE) {
      const client = clientsList.find(c => c.id === selectedClientId);
      setSelectedClientMotorcycles(client?.motorcycles || []);
      const currentVehicleInfo = form.getValues('vehicleInfo');
      if (currentVehicleInfo) {
        const vehicleIsValidForNewCustomer = client?.motorcycles.some(m => `${m.name} (${m.licensePlate.toUpperCase()})` === currentVehicleInfo);
        if (!vehicleIsValidForNewCustomer) {
          form.setValue('vehicleInfo', ''); 
        }
      }
    } else { 
      setSelectedClientMotorcycles([]);
      if (selectedClientId === WALK_IN_CLIENT_VALUE) {
        form.setValue('vehicleInfo', form.getValues('vehicleInfo') || '');
      } else {
        form.setValue('vehicleInfo', '');
      }
    }
  }, [selectedClientId, clientsList, form]);

  // Effect for handling service and variant selection
  useEffect(() => {
    const service = availableServiceItems.find(s => s.id === selectedServiceId);
    if (service) {
      const variants = service.variants?.filter(v => v.name && v.price > 0) || [];
      setAvailableVariants(variants);
      
      // Reset variant if service changes or if the current variant is not valid for the new service
      const currentVariantId = form.getValues('variantId');
      if (!currentVariantId || !variants.find(v => v.id === currentVariantId)) {
          form.setValue('variantId', undefined); 
      }

      if (variants.length > 0) {
        const preSelectedVariant = variants.find(v => v.id === form.getValues('variantId')); // Use current form value for variant
        if (preSelectedVariant) {
            form.setValue('estimatedTime', preSelectedVariant.estimatedDuration || service.estimatedDuration || '');
        } else {
            form.setValue('estimatedTime', ''); 
        }
      } else {
        form.setValue('estimatedTime', service.estimatedDuration || '');
      }
    } else {
      setAvailableVariants([]);
      form.setValue('variantId', undefined);
      form.setValue('estimatedTime', '');
    }
  }, [selectedServiceId, availableServiceItems, form]);

  const selectedVariantId = form.watch('variantId');
  useEffect(() => {
    if (selectedServiceId) {
      const service = availableServiceItems.find(s => s.id === selectedServiceId);
      if (service) {
        if (availableVariants.length > 0) {
          const variant = availableVariants.find(v => v.id === selectedVariantId);
          if (variant) {
            form.setValue('estimatedTime', variant.estimatedDuration || service.estimatedDuration || '');
          } else {
            form.setValue('estimatedTime', ''); 
          }
        } else {
          form.setValue('estimatedTime', service.estimatedDuration || '');
        }
      }
    }
  }, [selectedVariantId, selectedServiceId, availableVariants, availableServiceItems, form]);


  const internalSubmit = form.handleSubmit(async (data) => {
    const selectedService = availableServiceItems.find(s => s.id === data.serviceId);
    let serviceNameDisplay = selectedService?.name || "Layanan Tidak Diketahui";
    if (data.variantId) {
        const selectedVariant = selectedService?.variants?.find(v => v.id === data.variantId);
        if (selectedVariant) {
            serviceNameDisplay = `${selectedService?.name} - ${selectedVariant.name}`;
        }
    }
    await onSubmit(data, serviceNameDisplay);
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
                  if (value === WALK_IN_CLIENT_VALUE) {
                    form.setValue('customerName', ''); 
                    setSelectedClientMotorcycles([]);
                    form.setValue('vehicleInfo', '');
                  } else {
                    const client = clientsList.find(c => c.id === value);
                    form.setValue('customerName', client?.name || '');
                    setSelectedClientMotorcycles(client?.motorcycles || []);
                    const currentVehicle = form.getValues('vehicleInfo');
                    if(client && currentVehicle && !client.motorcycles.some(m => `${m.name} (${m.licensePlate.toUpperCase()})` === currentVehicle)){
                        form.setValue('vehicleInfo', '');
                    }
                  }
                }} 
                value={field.value || WALK_IN_CLIENT_VALUE} 
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pelanggan atau isi nama (walk-in)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={WALK_IN_CLIENT_VALUE}>-- Pelanggan Walk-in --</SelectItem>
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
              <FormLabel>Nama Pelanggan</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Masukkan nama pelanggan" 
                  {...field} 
                  disabled={!!selectedClientId && selectedClientId !== WALK_IN_CLIENT_VALUE}
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
              {(selectedClientId && selectedClientId !== WALK_IN_CLIENT_VALUE && selectedClientMotorcycles.length > 0) ? (
                <Select 
                  onValueChange={field.onChange} 
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih info kendaraan" />
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
                  <Input 
                    placeholder="Mis. Honda Vario (B 1234 XYZ)" 
                    {...field} 
                    disabled={!!selectedClientId && selectedClientId !== WALK_IN_CLIENT_VALUE && selectedClientMotorcycles.length === 0}
                  />
                </FormControl>
              )}
               {selectedClientId && selectedClientId !== WALK_IN_CLIENT_VALUE && selectedClientMotorcycles.length === 0 && (
                <p className="text-sm text-muted-foreground">Klien ini tidak memiliki motor terdaftar. Isi manual atau tambahkan di halaman klien.</p>
               )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serviceId" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Layanan</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                }} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih layanan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableServiceItems.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} (Rp {service.price.toLocaleString('id-ID')})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {availableVariants.length > 0 && (
            <FormField
            control={form.control}
            name="variantId"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="flex items-center"><PackageSearch className="mr-2 h-4 w-4 text-muted-foreground"/>Varian Layanan</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih varian layanan" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {availableVariants.map(variant => (
                        <SelectItem key={variant.id} value={variant.id}>
                        {variant.name} (Rp {variant.price.toLocaleString('id-ID')})
                        {variant.estimatedDuration ? ` - ${variant.estimatedDuration}` : ''}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        )}
        <FormField
          control={form.control}
          name="estimatedTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimasi Waktu</FormLabel>
              <FormControl>
                <Input placeholder="Otomatis terisi" {...field} readOnly />
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
  staffList: StaffMember[]; 
  isSubmitting: boolean;
  loadingStaff: boolean;
}

function AssignStaffDialog({ isOpen, onClose, onSubmit, staffList, isSubmitting, loadingStaff }: AssignStaffDialogProps) {
  const [selectedStaffName, setSelectedStaffName] = useState<string>('');

  const handleSubmit = async () => {
    if (!selectedStaffName) {
      toast({ title: "Error", description: "Silakan pilih staf teknisi.", variant: "destructive" });
      return;
    }
    await onSubmit(selectedStaffName);
    setSelectedStaffName(''); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setSelectedStaffName(''); 
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tugaskan Staf</DialogTitle>
          <DialogDescription>Pilih staf teknisi yang akan menangani layanan ini.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Label htmlFor="staff-select">Staf Teknisi yang Bertugas</Label>
          <Select value={selectedStaffName} onValueChange={setSelectedStaffName} disabled={loadingStaff}>
            <SelectTrigger id="staff-select">
              <SelectValue placeholder={loadingStaff ? "Memuat staf teknisi..." : "Pilih staf teknisi"} />
            </SelectTrigger>
            <SelectContent>
              {loadingStaff ? (
                <SelectItem value="loading" disabled>Memuat...</SelectItem>
              ) : staffList.length === 0 ? (
                 <SelectItem value="no-staff" disabled>Tidak ada staf teknisi tersedia.</SelectItem>
              ) : (
                staffList.map(staff => (
                  <SelectItem key={staff.id} value={staff.name}>
                    {staff.name} ({staff.role})
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => { onClose(); setSelectedStaffName('');}} disabled={isSubmitting}>Batal</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !selectedStaffName || loadingStaff || staffList.length === 0}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
            Konfirmasi Staf
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to format estimated time for notifications
function formatEstimatedTimeForNotification(timeString?: string): string {
  if (!timeString || timeString.trim() === '' || timeString.trim().toLowerCase() === 'n/a') {
    return 'Estimasi waktu akan diinformasikan segera';
  }

  const cleanedTime = timeString.trim();
  const numericValue = parseInt(cleanedTime, 10);

  if (!isNaN(numericValue) && String(numericValue) === cleanedTime && numericValue > 0) {
    const totalMinutes = numericValue;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let result = "sekitar ";
    if (hours > 0) {
      result += `${hours} jam`;
      if (minutes > 0) {
        result += ` ${minutes} menit`;
      }
    } else if (minutes > 0) {
      result += `${minutes} menit`;
    } else { // Fallback if numericValue > 0 but hours and minutes are 0 (e.g. for "0")
      return `sekitar ${cleanedTime} menit`; // Or handle as "Estimasi belum ditentukan"
    }
    return result;
  }

  // If it's not a pure number, assume it's already formatted (e.g., "1 jam", "30 mnt")
  return `sekitar ${cleanedTime}`;
}


export default function QueuePage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [loadingQueue, setLoadingQueue] = useState(true);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [currentEditingItem, setCurrentEditingItem] = useState<QueueItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<QueueItem | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  
  const [clientsList, setClientsList] = useState<ClientForSelect[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [allServicesList, setAllServicesList] = useState<ServiceForSelect[]>([]); 
  const [loadingServices, setLoadingServices] = useState(true);
  
  const [assignableStaffList, setAssignableStaffList] = useState<StaffMember[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(true);

  const [isAssignStaffDialogOpen, setIsAssignStaffDialogOpen] = useState(false);
  const [itemBeingAssigned, setItemBeingAssigned] = useState<QueueItem | null>(null);
  const [isSubmittingStaffAssignment, setIsSubmittingStaffAssignment] = useState(false);

  const [queueSearchTerm, setQueueSearchTerm] = useState(''); // State for search

  const { toast } = useToast();
  
  const sendQueueNotification = async (
    clientId: string | undefined,
    customerName: string,
    message: string,
    actionDescription: string
  ) => {
    console.log(`[QueuePage] Attempting to send notification for: ${actionDescription} to ${customerName} (Client ID: ${clientId})`);
    if (!clientId || clientId === WALK_IN_CLIENT_VALUE) {
      console.log(`[QueuePage] Notification for ${actionDescription} SKIPPED: Walk-in customer or no client ID.`);
      toast({
        title: "Info Notifikasi",
        description: `Notifikasi "${actionDescription}" untuk ${customerName} tidak dikirim (pelanggan walk-in atau ID tidak ada).`,
        variant: "default",
      });
      return;
    }

    const client = clientsList.find(c => c.id === clientId);
    if (!client) {
        console.log(`[QueuePage] Notification for ${actionDescription} FAILED: Client with ID ${clientId} not found in clientsList.`);
        toast({
            title: "Info Notifikasi",
            description: `Notifikasi "${actionDescription}" untuk ${customerName} tidak dikirim (data klien tidak ditemukan).`,
            variant: "default",
        });
        return;
    }

    if (!client.phone || client.phone.trim() === '') {
      console.log(`[QueuePage] Notification for ${actionDescription} SKIPPED for ${customerName}: No phone number found for client ID ${clientId}.`);
      toast({
        title: "Info Notifikasi",
        description: `Notifikasi "${actionDescription}" untuk ${customerName} tidak dikirim (nomor HP tidak ditemukan pada data klien).`,
        variant: "default",
      });
      return;
    }
    
    console.log(`[QueuePage] Found client: ${client.name}, Phone: ${client.phone}. Preparing to send message: "${message}" (Phone to use: "${client.phone}")`);

    try {
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: client.phone, message: message }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        console.log(`[QueuePage] Notification for ${actionDescription} to ${customerName} (->${client.phone}) SENT successfully via API. Message ID: ${result.messageId}`);
        toast({
          title: "Notifikasi Terkirim",
          description: `Notifikasi "${actionDescription}" untuk ${customerName} telah dikirim via WhatsApp.`,
        });
      } else {
        throw new Error(result.error || `Gagal mengirim notifikasi WhatsApp dari API route. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`[QueuePage] Error sending WhatsApp notification for ${actionDescription} to ${customerName} (->${client.phone}) via API:`, error);
      toast({
        title: "Gagal Kirim Notifikasi",
        description: `Gagal mengirim notifikasi "${actionDescription}" untuk ${customerName}. ${error instanceof Error ? error.message : 'Error tidak diketahui.'}`,
        variant: "destructive",
      });
    }
  };

  const fetchClients = useCallback(async () => {
    setLoadingClients(true);
    try {
      const clientsCollectionRef = collection(db, 'clients');
      const q = query(clientsCollectionRef, orderBy("name"));
      const querySnapshot = await getDocs(q);
      const clientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ClientForSelect));
      setClientsList(clientsData);
    } catch (error) {
      console.error("Error fetching clients for dropdown: ", error);
      toast({ title: "Error", description: "Tidak dapat mengambil data klien.", variant: "destructive" });
    } finally {
      setLoadingClients(false);
    }
  }, [toast]);

  const fetchServices = useCallback(async () => {
    setLoadingServices(true);
    try {
      const servicesCollectionRef = collection(db, 'services');
      const q = query(servicesCollectionRef, orderBy("name"));
      const querySnapshot = await getDocs(q);
      const servicesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceForSelect));
      setAllServicesList(servicesData); 
    } catch (error) {
      console.error("Error fetching services for dropdown: ", error);
      toast({ title: "Error", description: "Tidak dapat mengambil data layanan.", variant: "destructive" });
    } finally {
      setLoadingServices(false);
    }
  }, [toast]);

  const fetchAssignableStaff = useCallback(async () => {
    setLoadingStaff(true);
    try {
      const staffCollectionRef = collection(db, 'staffMembers');
      const q = query(staffCollectionRef, where("role", "==", "Teknisi"), orderBy("name"));
      const querySnapshot = await getDocs(q);
      const staffData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
      setAssignableStaffList(staffData);
    } catch (error) {
      console.error("Error fetching assignable staff: ", error);
      toast({ title: "Error", description: "Tidak dapat mengambil daftar staf teknisi untuk penugasan.", variant: "destructive" });
    } finally {
      setLoadingStaff(false);
    }
  }, [toast]);


  useEffect(() => {
    fetchClients();
    fetchServices();
    fetchAssignableStaff();
  }, [fetchClients, fetchServices, fetchAssignableStaff]);

  const fetchQueueItems = useCallback(async () => {
    setLoadingQueue(true);
    const AUTO_HIDE_DELAY_MS = 5 * 60 * 1000; 
    try {
      const queueCollectionRef = collection(db, 'queueItems');
      const q = query(queueCollectionRef, orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(q);
      const now = Date.now();
      
      const itemsData = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          return { 
            id: doc.id, 
            ...data,
            createdAt: data.createdAt || Timestamp.now(),
            completedAt: data.completedAt, 
            serviceStartTime: data.serviceStartTime, 
          } as QueueItem;
        })
        .filter(item => {
          if (item.status === 'Selesai' && item.completedAt) {
            const completedTime = item.completedAt.toDate().getTime();
            if (now - completedTime > AUTO_HIDE_DELAY_MS) {
              return false; 
            }
          }
          return true;
        });
      setQueueItems(itemsData);

    } catch (error) {
      console.error("Error fetching queue items: ", error);
      let description = "Tidak dapat mengambil data antrian.";
      if (error instanceof Error) { description = `Error: ${error.message}.`; }
      toast({ title: "Error Pengambilan", description: description, variant: "destructive" });
    } finally {
      setLoadingQueue(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchQueueItems();
    const intervalId = setInterval(() => {
       const now = Date.now();
       const AUTO_HIDE_DELAY_MS = 5 * 60 * 1000;
       setQueueItems(prevItems => 
         prevItems.filter(item => {
           if (item.status === 'Selesai' && item.completedAt) {
             const completedTime = item.completedAt.toDate().getTime();
             return !(now - completedTime > AUTO_HIDE_DELAY_MS);
           }
           return true;
         })
       );
    }, 60000); 

    return () => clearInterval(intervalId);
  }, [fetchQueueItems]); 

  const defaultQueueItemValues: Partial<QueueItemFormData> = { 
    customerName: '',
    clientId: WALK_IN_CLIENT_VALUE, 
    vehicleInfo: '',
    serviceId: undefined,
    variantId: undefined,
    estimatedTime: '',
    status: 'Menunggu',
  };

  const handleOpenAddDialog = () => {
    setCurrentEditingItem(null); 
    setIsFormDialogOpen(true);
  };

  const handleEditItem = (item: QueueItem) => {
    setCurrentEditingItem(item); 
    setIsFormDialogOpen(true);
  };

  const handleFormSubmit = async (formData: QueueItemFormData, serviceNameDisplay: string) => {
    setIsSubmittingForm(true);
    try {
      const { clientId: formClientId, ...otherFormData } = formData;
      const actualClientId = formClientId === WALK_IN_CLIENT_VALUE ? undefined : formClientId;

      const firestoreData: Partial<Omit<QueueItem, 'id' | 'createdAt' | 'staff' | 'completedAt' | 'serviceStartTime'>> & { clientId?: string } = {
          customerName: otherFormData.customerName,
          vehicleInfo: otherFormData.vehicleInfo,
          service: serviceNameDisplay,
          serviceId: otherFormData.serviceId,
          variantId: otherFormData.variantId,
          estimatedTime: otherFormData.estimatedTime,
          status: otherFormData.status,
          ...(actualClientId && { clientId: actualClientId }),
      };
      
      if (!actualClientId) { delete firestoreData.clientId; }
      if (!otherFormData.variantId) { delete firestoreData.variantId; }

      let itemWasJustAdded = false;

      if (currentEditingItem) { 
        const itemDocRef = doc(db, 'queueItems', currentEditingItem.id);
        const updatePayload: any = {...firestoreData};
        
        if (formData.status !== currentEditingItem.status) {
          if (formData.status === 'Selesai') {
            updatePayload.completedAt = serverTimestamp();
            updatePayload.serviceStartTime = currentEditingItem.serviceStartTime || deleteField(); 
          } else if (formData.status === 'Dalam Layanan' && currentEditingItem.status !== 'Dalam Layanan') {
            updatePayload.serviceStartTime = serverTimestamp();
            updatePayload.completedAt = deleteField(); 
          } else if (formData.status === 'Menunggu') {
            updatePayload.serviceStartTime = deleteField();
            updatePayload.completedAt = deleteField();
          }
        }
        await updateDoc(itemDocRef, updatePayload); 
        toast({ title: "Sukses", description: "Item antrian berhasil diperbarui." });
      } else { 
        await addDoc(collection(db, 'queueItems'), { 
          ...firestoreData, 
          createdAt: serverTimestamp(),
          ...(formData.status === 'Selesai' && { completedAt: serverTimestamp() }),
          ...(formData.status === 'Dalam Layanan' && { serviceStartTime: serverTimestamp() }),
        });
        toast({ title: "Sukses", description: "Item baru berhasil ditambahkan ke antrian." });
        itemWasJustAdded = true;
      }
      
      if (itemWasJustAdded && formData.status === 'Menunggu') {
        const message = `Halo ${formData.customerName}, motor ${formData.vehicleInfo} Anda telah terdaftar dalam antrian kami untuk layanan ${serviceNameDisplay}. Estimasi waktu akan diinformasikan segera. Terima kasih! - QLAB`;
        await sendQueueNotification(actualClientId, formData.customerName, message, "penambahan antrian");
      }

      setIsFormDialogOpen(false);
      setCurrentEditingItem(null);
      fetchQueueItems(); 
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast({ title: "Error", description: "Gagal menyimpan item antrian.", variant: "destructive" });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleStatusChange = async (item: QueueItem, newStatus: QueueItem['status']) => {
    if (newStatus === 'Dalam Layanan') {
      setItemBeingAssigned(item);
      setIsAssignStaffDialogOpen(true);
    } else if (newStatus === 'Selesai') {
      try {
        const itemDocRef = doc(db, 'queueItems', item.id);
        const updateData: any = { 
            status: newStatus, 
            staff: item.staff || 'Tidak Ditugaskan',
            completedAt: serverTimestamp(),
        };
        if (!item.serviceStartTime) {
          updateData.serviceStartTime = item.serviceStartTime || serverTimestamp(); 
        }
        await updateDoc(itemDocRef, updateData);
        toast({ title: "Status Diperbarui", description: `Status untuk ${item.customerName} diubah menjadi ${newStatus}.` });
        
        const message = `Halo ${item.customerName}, layanan ${item.service} untuk ${item.vehicleInfo} Anda telah SELESAI. Silakan datang ke kasir untuk proses selanjutnya. Terima kasih! - QLAB`;
        await sendQueueNotification(item.clientId, item.customerName, message, "penyelesaian layanan");

        fetchQueueItems(); 
      } catch (error) {
        console.error("Error updating status to Selesai: ", error);
        toast({ title: "Error", description: "Gagal memperbarui status item.", variant: "destructive" });
      }
    }
  };

  const handleConfirmAssignStaff = async (staffName: string) => {
    if (!itemBeingAssigned) return;
    setIsSubmittingStaffAssignment(true);
    try {
      const batch = writeBatch(db);
      const itemDocRef = doc(db, 'queueItems', itemBeingAssigned.id);
      const serviceStartTime = serverTimestamp();
      batch.update(itemDocRef, { 
        status: 'Dalam Layanan',
        staff: staffName,
        serviceStartTime: serviceStartTime, 
        completedAt: deleteField() 
      });

      const serviceDetails = allServicesList.find(s => s.id === itemBeingAssigned.serviceId);
      if (!serviceDetails) {
        toast({ title: "Error", description: "Detail layanan utama tidak ditemukan untuk transaksi.", variant: "destructive" });
        setIsSubmittingStaffAssignment(false);
        return;
      }

      let itemName = serviceDetails.name;
      let itemPrice = serviceDetails.price;
      let itemPoints = serviceDetails.pointsAwarded || 0;

      if (itemBeingAssigned.variantId && serviceDetails.variants) {
          const variant = serviceDetails.variants.find(v => v.id === itemBeingAssigned.variantId);
          if (variant) {
              itemName = `${serviceDetails.name} - ${variant.name}`;
              itemPrice = variant.price;
              itemPoints = variant.pointsAwarded || 0;
          }
      }

      const newTransactionItem: TransactionItem = {
        id: uuidv4(), 
        catalogItemId: serviceDetails.id,
        variantId: itemBeingAssigned.variantId,
        name: itemName,
        price: itemPrice,
        quantity: 1,
        type: 'service',
        staffName: staffName,
        pointsAwardedPerUnit: itemPoints,
      };
      
      const transactionsRef = collection(db, "transactions");
      const q = query(transactionsRef, 
        where("customerName", "==", itemBeingAssigned.customerName), 
        where("status", "==", "open")
      );
      const existingTransactionsSnap = await getDocs(q);

      let transactionIdToUpdate: string | null = null;
      let existingItems: TransactionItem[] = [];
      let existingTransactionData: Partial<Transaction> = {};


      if (!existingTransactionsSnap.empty) {
        const existingDoc = existingTransactionsSnap.docs[0];
        transactionIdToUpdate = existingDoc.id;
        const currentTransaction = existingDoc.data() as Transaction;
        existingItems = currentTransaction.items || [];
        existingTransactionData = currentTransaction;
      }
      
      const updatedItems = [...existingItems, newTransactionItem];
      const { subtotal, total, discountAmount } = calculateTransactionTotals(
        updatedItems, 
        existingTransactionData.discountAmount || 0, 
        existingTransactionData.discountPercentage || 0
      );


      if (transactionIdToUpdate) {
        const transactionDocRef = doc(db, 'transactions', transactionIdToUpdate);
        batch.update(transactionDocRef, {
          items: updatedItems,
          serviceStaffName: staffName, 
          queueItemId: itemBeingAssigned.id, 
          updatedAt: serverTimestamp(),
          subtotal: subtotal,
          total: total,
          discountAmount: discountAmount
        });
      } else {
        const newTransactionRef = doc(collection(db, 'transactions')); 
        batch.set(newTransactionRef, {
          clientId: itemBeingAssigned.clientId === WALK_IN_CLIENT_VALUE ? undefined : itemBeingAssigned.clientId,
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
      
      const formattedEstimatedTime = formatEstimatedTimeForNotification(itemBeingAssigned.estimatedTime);
      const message = `Halo ${itemBeingAssigned.customerName}, layanan ${itemBeingAssigned.service} untuk ${itemBeingAssigned.vehicleInfo} Anda sudah mulai dikerjakan oleh Teknisi ${staffName}. Estimasi selesai: ${formattedEstimatedTime}. - QLAB`;
      await sendQueueNotification(itemBeingAssigned.clientId, itemBeingAssigned.customerName, message, "mulai layanan");
      
      fetchQueueItems();
      setIsAssignStaffDialogOpen(false);
      setItemBeingAssigned(null);
    } catch (error) {
      console.error("Error assigning staff and creating/updating transaction: ", error);
      toast({ title: "Error", description: "Gagal menugaskan staf atau memproses transaksi.", variant: "destructive" });
    } finally {
      setIsSubmittingStaffAssignment(false);
    }
  };

  const calculateTransactionTotals = (items: TransactionItem[], discountAmount: number = 0, discountPercentage: number = 0) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let currentDiscountAmount = discountAmount;
    if (discountPercentage > 0 && discountAmount === 0) { 
        currentDiscountAmount = subtotal * (discountPercentage / 100);
    }
    const total = subtotal - currentDiscountAmount;
    return { subtotal, total, discountAmount: currentDiscountAmount };
  };
  
  const handleDeleteConfirmation = (item: QueueItem) => {
    setItemToDelete(item);
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    setIsSubmittingForm(true); 
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
      setIsSubmittingForm(false);
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

  const isLoadingOverall = loadingQueue || loadingClients || loadingServices || loadingStaff;

  const filteredQueueItems = useMemo(() => {
    if (!queueSearchTerm) return queueItems;
    const lowercasedFilter = queueSearchTerm.toLowerCase();
    return queueItems.filter(item =>
      item.customerName.toLowerCase().includes(lowercasedFilter) ||
      item.vehicleInfo.toLowerCase().includes(lowercasedFilter) ||
      item.service.toLowerCase().includes(lowercasedFilter)
    );
  }, [queueItems, queueSearchTerm]);


  if (isLoadingOverall && queueItems.length === 0) { 
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
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <CardTitle>Antrian Pelanggan</CardTitle>
                <CardDescription>Kelola pelanggan yang menunggu dan sedang dilayani.</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari antrian..."
                    className="pl-8 w-full"
                    value={queueSearchTerm}
                    onChange={(e) => setQueueSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={handleOpenAddDialog} disabled={loadingClients || loadingServices} className="w-full sm:w-auto">
                  { (loadingClients || loadingServices) && !isFormDialogOpen ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <PlusCircle className="mr-2 h-4 w-4" /> }
                   Tambah ke Antrian
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingQueue && filteredQueueItems.length === 0 && !queueSearchTerm ? (
                 <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2">Memuat antrian...</p>
                </div>
              ) : filteredQueueItems.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  {queueSearchTerm ? "Tidak ada antrian yang cocok dengan pencarian Anda." : "Antrian saat ini kosong."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredQueueItems.map((item) => (
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
                         {item.serviceStartTime && item.status === 'Dalam Layanan' && (
                            <div className="text-xs text-muted-foreground mt-1">
                                Mulai: {item.serviceStartTime.toDate().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})}
                            </div>
                         )}
                         {item.completedAt && item.status === 'Selesai' && (
                            <div className="text-xs text-muted-foreground mt-1">
                                Selesai: {item.completedAt.toDate().toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})}
                            </div>
                         )}
                      </CardContent>
                       <CardFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-4 border-t mt-auto">
                        <Button variant="outline" size="sm" onClick={() => handleEditItem(item)} className="w-full sm:w-auto order-1 sm:order-1" disabled={loadingClients || loadingServices}>
                          { (loadingClients || loadingServices) && currentEditingItem?.id === item.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Edit3 className="mr-2 h-4 w-4" /> }
                          Ubah
                        </Button>
                        
                        {(item.status === 'Dalam Layanan' || item.status === 'Selesai') && (
                             <Button asChild size="sm" variant="outline" className="w-full sm:w-auto order-2 sm:order-2">
                                <Link href={`/pos?qid=${item.id}`}>
                                    <FileText className="mr-2 h-4 w-4" /> Lihat Transaksi
                                </Link>
                            </Button>
                        )}

                        {item.status === 'Menunggu' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(item, 'Dalam Layanan')} 
                            className="w-full sm:w-auto order-3 sm:order-3" 
                            disabled={loadingStaff}
                          >
                             { loadingStaff && itemBeingAssigned?.id === item.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null }
                            Mulai Layanan
                          </Button>
                        )}
                        {item.status === 'Dalam Layanan' && (
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            onClick={() => handleStatusChange(item, 'Selesai')} 
                            className="w-full sm:w-auto order-3 sm:order-3"
                          >
                            Tandai Selesai
                          </Button>
                        )}
                        
                        <AlertDialogTrigger asChild>
                           <Button 
                             variant="destructive" 
                             size="sm" 
                             onClick={() => handleDeleteConfirmation(item)} 
                             className="w-full sm:w-auto order-4 sm:order-4"
                           >
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
              <AlertDialogAction onClick={handleDeleteItem} disabled={isSubmittingForm} className={buttonVariants({variant: "destructive"})}>
                  {isSubmittingForm && itemToDelete ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Hapus
              </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={isFormDialogOpen} onOpenChange={(openState) => {
            setIsFormDialogOpen(openState);
            if (!openState) { setCurrentEditingItem(null); }
        }}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{currentEditingItem ? 'Ubah Item Antrian' : 'Tambah Item ke Antrian'}</DialogTitle>
              <DialogDescription>
                {currentEditingItem ? 'Ubah detail item antrian di bawah ini.' : 'Isi detail item antrian baru.'}
              </DialogDescription>
            </DialogHeader>
            {(loadingClients || loadingServices) ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2">Memuat data pendukung form...</p>
                </div>
            ) : (
              <QueueItemForm
                onSubmit={handleFormSubmit}
                defaultValues={currentEditingItem ? { 
                  customerName: currentEditingItem.customerName,
                  clientId: currentEditingItem.clientId || WALK_IN_CLIENT_VALUE, 
                  vehicleInfo: currentEditingItem.vehicleInfo || '',
                  serviceId: currentEditingItem.serviceId, 
                  variantId: currentEditingItem.variantId, 
                  estimatedTime: currentEditingItem.estimatedTime || '',
                  status: currentEditingItem.status,
                } : defaultQueueItemValues}
                onCancel={() => { setIsFormDialogOpen(false); setCurrentEditingItem(null);}}
                isSubmitting={isSubmittingForm}
                clientsList={clientsList}
                allServicesList={allServicesList} 
              />
            )}
          </DialogContent>
        </Dialog>

        <AssignStaffDialog
          isOpen={isAssignStaffDialogOpen}
          onClose={() => {
            setIsAssignStaffDialogOpen(false);
            setItemBeingAssigned(null);
          }}
          onSubmit={handleConfirmAssignStaff}
          staffList={assignableStaffList} 
          isSubmitting={isSubmittingStaffAssignment}
          loadingStaff={loadingStaff}
        />
      </main>
    </div>
  );
}

export type { QueueItem as QueueItemType }; // Export for dashboard
    
