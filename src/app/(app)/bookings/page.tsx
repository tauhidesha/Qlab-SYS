
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, PlusCircle, CalendarDays, Clock, User, Edit3, Trash2, PackageSearch } from 'lucide-react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  Timestamp, 
  addDoc, 
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
import type { BookingEntry, ManualBookingFormData } from '@/types/booking';
import type { Client } from '@/types/client';
import type { ServiceProduct, ServiceProductVariant } from '@/app/(app)/services/page';
import { format as formatDateFns, startOfMonth, endOfMonth, startOfDay, endOfDay, isSameDay, addMonths, subMonths, setHours, setMinutes, parse as parseDateFns } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerSingle } from '@/components/ui/date-picker-single';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { buttonVariants } from '@/components/ui/button';

const WALK_IN_CLIENT_VALUE = "##WALK_IN_CLIENT##";

const manualBookingFormSchema = z.object({
  clientId: z.string().optional(),
  customerName: z.string().min(1, "Nama pelanggan diperlukan."),
  vehicleInfo: z.string().min(1, "Informasi kendaraan diperlukan."),
  serviceId: z.string().min(1, "Layanan harus dipilih."),
  variantId: z.string().optional(),
  bookingDate: z.date({ required_error: "Tanggal booking diperlukan." }),
  bookingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format waktu booking JJ:MM (mis. 14:30)."),
  notes: z.string().max(300, "Catatan maksimal 300 karakter.").optional(),
  source: z.enum(["Manual", "WhatsApp", "Online"]).default("Manual"),
});

interface BookingFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitSuccess: () => void;
  clientsList: Client[];
  allServicesList: ServiceProduct[];
  existingBooking?: BookingEntry | null; // Untuk mode edit
}

function BookingFormDialog({ isOpen, onOpenChange, onSubmitSuccess, clientsList, allServicesList, existingBooking }: BookingFormDialogProps) {
  const { toast } = useToast();
  const [isSubmittingBookingForm, setIsSubmittingBookingForm] = useState(false);

  const form = useForm<ManualBookingFormData>({
    resolver: zodResolver(manualBookingFormSchema),
    defaultValues: {
      clientId: WALK_IN_CLIENT_VALUE,
      customerName: '',
      vehicleInfo: '',
      serviceId: undefined,
      variantId: undefined,
      bookingDate: new Date(),
      bookingTime: '',
      notes: '',
      source: 'Manual',
    }
  });

  const selectedClientId = form.watch('clientId');
  const selectedServiceId = form.watch('serviceId');
  const [selectedClientMotorcycles, setSelectedClientMotorcycles] = useState<Client['motorcycles']>([]);
  const [availableVariants, setAvailableVariants] = useState<ServiceProductVariant[]>([]);
  
  const availableServiceItems = React.useMemo(() => {
    return allServicesList.filter(s => s.type === 'Layanan');
  }, [allServicesList]);

  useEffect(() => {
    if (existingBooking) {
      const bookingTimeDate = existingBooking.bookingDateTime.toDate();
      form.reset({
        clientId: existingBooking.clientId || WALK_IN_CLIENT_VALUE,
        customerName: existingBooking.customerName,
        vehicleInfo: existingBooking.vehicleInfo,
        serviceId: existingBooking.serviceId,
        // variantId: // This needs to be set after serviceId is processed
        bookingDate: bookingTimeDate,
        bookingTime: formatDateFns(bookingTimeDate, 'HH:mm'),
        notes: existingBooking.notes || '',
        source: existingBooking.source || 'Manual',
      });
      // Trigger client and service effects after reset
      if (existingBooking.clientId && existingBooking.clientId !== WALK_IN_CLIENT_VALUE) {
        const client = clientsList.find(c => c.id === existingBooking.clientId);
        setSelectedClientMotorcycles(client?.motorcycles || []);
      }
      if (existingBooking.serviceId) {
         const service = availableServiceItems.find(s => s.id === existingBooking.serviceId);
         if (service) {
            const variants = service.variants?.filter(v => v.name && v.price > 0) || [];
            setAvailableVariants(variants);
            // Now set variantId if it exists in the loaded service's variants
            if (service.variants?.some(v => v.id === (existingBooking as any).variantId)) { // Cast as any to access potential variantId on booking
                form.setValue('variantId', (existingBooking as any).variantId);
            }
         }
      }

    } else {
      form.reset({ // Reset to default for new booking
        clientId: WALK_IN_CLIENT_VALUE,
        customerName: '',
        vehicleInfo: '',
        serviceId: undefined,
        variantId: undefined,
        bookingDate: new Date(),
        bookingTime: '',
        notes: '',
        source: 'Manual',
      });
      setSelectedClientMotorcycles([]);
      setAvailableVariants([]);
    }
  }, [existingBooking, form, clientsList, availableServiceItems]);


  useEffect(() => {
    if (selectedClientId && selectedClientId !== WALK_IN_CLIENT_VALUE) {
      const client = clientsList.find(c => c.id === selectedClientId);
      form.setValue('customerName', client?.name || '');
      setSelectedClientMotorcycles(client?.motorcycles || []);
       if (!client?.motorcycles?.some(m => `${m.name} (${m.licensePlate.toUpperCase()})` === form.getValues('vehicleInfo'))) {
        form.setValue('vehicleInfo', '');
      }
    } else {
      if (selectedClientId === WALK_IN_CLIENT_VALUE && !existingBooking) { // Only clear name if creating new walk-in
        form.setValue('customerName', '');
      }
      setSelectedClientMotorcycles([]);
    }
  }, [selectedClientId, clientsList, form, existingBooking]);

  useEffect(() => {
    const service = availableServiceItems.find(s => s.id === selectedServiceId);
    if (service) {
      const variants = service.variants?.filter(v => v.name && v.price > 0) || [];
      setAvailableVariants(variants);
      if (!variants.find(v => v.id === form.getValues('variantId')) && !existingBooking?.id) { // Only reset variant if new booking
          form.setValue('variantId', undefined); 
      }
    } else {
      setAvailableVariants([]);
      if (!existingBooking?.id) form.setValue('variantId', undefined);
    }
  }, [selectedServiceId, availableServiceItems, form, existingBooking]);

  const handleBookingFormSubmitInternal = async (data: ManualBookingFormData) => {
    setIsSubmittingBookingForm(true);
    try {
      const [hour, minute] = data.bookingTime.split(':').map(Number);
      const bookingDateTime = setMinutes(setHours(data.bookingDate, hour), minute);
      const bookingTimestamp = Timestamp.fromDate(bookingDateTime);

      const selectedService = allServicesList.find(s => s.id === data.serviceId);
      let serviceNameDisplay = selectedService?.name || "Layanan Tidak Diketahui";
      let estimatedDuration = selectedService?.estimatedDuration;

      if (data.variantId) {
        const variant = selectedService?.variants?.find(v => v.id === data.variantId);
        if (variant) {
          serviceNameDisplay = `${selectedService?.name} - ${variant.name}`;
          estimatedDuration = variant.estimatedDuration || estimatedDuration;
        }
      }

      const bookingDataPayload: Omit<BookingEntry, 'id' | 'createdAt' | 'updatedAt' | 'queueItemId'> = {
        customerName: data.customerName,
        clientId: data.clientId === WALK_IN_CLIENT_VALUE ? undefined : data.clientId,
        customerPhone: data.clientId !== WALK_IN_CLIENT_VALUE ? clientsList.find(c => c.id === data.clientId)?.phone : undefined,
        vehicleInfo: data.vehicleInfo,
        serviceId: data.serviceId,
        serviceName: serviceNameDisplay,
        bookingDateTime: bookingTimestamp,
        status: 'Confirmed',
        notes: data.notes,
        source: data.source,
        estimatedDuration: estimatedDuration || undefined,
      };

      if (existingBooking?.id) {
        const bookingDocRef = doc(db, "bookings", existingBooking.id);
        await updateDoc(bookingDocRef, { ...bookingDataPayload, updatedAt: serverTimestamp() });
        toast({ title: "Booking Diperbarui", description: `Booking untuk ${data.customerName} berhasil diperbarui.` });
      } else {
        const bookingDocRef = await addDoc(collection(db, "bookings"), {
          ...bookingDataPayload,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast({ title: "Booking Sukses", description: `Booking untuk ${data.customerName} berhasil dibuat.` });
        if (isSameDay(bookingDateTime, new Date())) {
          const queueItemData = {
            customerName: data.customerName,
            clientId: bookingDataPayload.clientId,
            vehicleInfo: data.vehicleInfo,
            service: serviceNameDisplay,
            serviceId: data.serviceId,
            variantId: data.variantId,
            status: 'Menunggu' as 'Menunggu',
            estimatedTime: estimatedDuration || 'N/A',
            bookingId: bookingDocRef.id,
            createdAt: bookingTimestamp,
          };
          const queueDocRef = await addDoc(collection(db, 'queueItems'), queueItemData);
          await updateDoc(bookingDocRef, { queueItemId: queueDocRef.id, status: 'In Queue' });
          toast({ title: "Info Antrian", description: "Booking hari ini juga ditambahkan ke antrian." });
        }
      }
      
      onSubmitSuccess(); // Call the success callback
      onOpenChange(false); // Close dialog
    } catch (error) {
      console.error("Error submitting booking form: ", error);
      toast({ title: "Error Booking", description: "Gagal menyimpan booking.", variant: "destructive" });
    } finally {
      setIsSubmittingBookingForm(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{existingBooking ? "Edit Booking" : "Buat Booking Baru"}</DialogTitle>
        <DialogDescription>
          {existingBooking ? "Ubah detail booking di bawah ini." : "Jadwalkan layanan untuk pelanggan."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleBookingFormSubmitInternal)} className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-2">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pelanggan Terdaftar (Opsional)</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(value)} 
                  value={field.value || WALK_IN_CLIENT_VALUE} 
                >
                  <FormControl><SelectTrigger><SelectValue placeholder="Pilih pelanggan atau isi nama (walk-in)" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value={WALK_IN_CLIENT_VALUE}>-- Pelanggan Walk-in --</SelectItem>
                    {clientsList.map(client => (
                      <SelectItem key={client.id} value={client.id}>{client.name} ({client.phone})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pelanggan</FormLabel>
                <FormControl><Input placeholder="Nama pelanggan" {...field} disabled={!!selectedClientId && selectedClientId !== WALK_IN_CLIENT_VALUE && !existingBooking} /></FormControl>
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Pilih kendaraan" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {selectedClientMotorcycles.map(motorcycle => (
                        <SelectItem key={motorcycle.licensePlate} value={`${motorcycle.name} (${motorcycle.licensePlate.toUpperCase()})`}>
                          {motorcycle.name} ({motorcycle.licensePlate.toUpperCase()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <FormControl><Input placeholder="Mis. Honda Vario (B 1234 XYZ)" {...field} disabled={!!selectedClientId && selectedClientId !== WALK_IN_CLIENT_VALUE && selectedClientMotorcycles.length === 0 && !existingBooking} /></FormControl>
                )}
                 {selectedClientId && selectedClientId !== WALK_IN_CLIENT_VALUE && selectedClientMotorcycles.length === 0 && !existingBooking &&(
                  <p className="text-sm text-muted-foreground">Klien ini tidak memiliki motor terdaftar. Isi manual.</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bookingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-1">Tanggal Booking</FormLabel>
                  <DatePickerSingle date={field.value} onDateChange={field.onChange} disabled={(d) => d < startOfDay(new Date()) && !isSameDay(d, startOfDay(new Date())) } />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bookingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waktu Booking (JJ:MM)</FormLabel>
                  <FormControl><Input type="time" placeholder="mis. 14:30" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Layanan</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Pilih layanan" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {availableServiceItems.map(service => (
                      <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
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
                  <FormLabel className="flex items-center"><PackageSearch className="mr-2 h-4 w-4 text-muted-foreground"/>Varian Layanan (Opsional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Pilih varian (jika ada)" /></SelectTrigger></FormControl>
                      <SelectContent>
                      {availableVariants.map(variant => (
                          <SelectItem key={variant.id} value={variant.id}>{variant.name} (Rp {variant.price.toLocaleString('id-ID')})</SelectItem>
                      ))}
                      </SelectContent>
                  </Select>
                  </FormItem>
              )}
              />
          )}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan (Opsional)</FormLabel>
                <FormControl><Textarea placeholder="Catatan tambahan untuk booking ini..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmittingBookingForm}>Batal</Button>
            <Button type="submit" disabled={isSubmittingBookingForm}>
              {isSubmittingBookingForm ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {existingBooking ? "Simpan Perubahan" : "Simpan Booking"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}


export default function BookingsPage() {
  const [currentDisplayDate, setCurrentDisplayDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [bookingsForMonth, setBookingsForMonth] = useState<BookingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [clientsList, setClientsList] = useState<Client[]>([]);
  const [allServicesList, setAllServicesList] = useState<ServiceProduct[]>([]);
  const [loadingDialogDeps, setLoadingDialogDeps] = useState(true);

  const [editingBookingEntry, setEditingBookingEntry] = useState<BookingEntry | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<BookingEntry | null>(null);
  const [isDeletingBooking, setIsDeletingBooking] = useState(false);


  const fetchBookingsForMonth = useCallback(async (monthDate: Date) => {
    setLoading(true);
    try {
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('bookingDateTime', '>=', Timestamp.fromDate(monthStart)),
        where('bookingDateTime', '<=', Timestamp.fromDate(monthEnd)),
        orderBy('bookingDateTime', 'asc')
      );
      const querySnapshot = await getDocs(q);
      const monthBookingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookingEntry));
      setBookingsForMonth(monthBookingsData);
    } catch (error) {
      console.error("Error fetching bookings for month: ", error);
      toast({ title: "Error", description: "Gagal mengambil data booking bulanan.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchBookingsForMonth(currentDisplayDate);
  }, [currentDisplayDate, fetchBookingsForMonth]);
  
  useEffect(() => {
    const fetchInitialDialogDeps = async () => {
        setLoadingDialogDeps(true);
        try {
            const clientsPromise = getDocs(query(collection(db, 'clients'), orderBy("name")));
            const servicesPromise = getDocs(query(collection(db, 'services'), orderBy("name")));
            const [clientsSnapshot, servicesSnapshot] = await Promise.all([clientsPromise, servicesPromise]);
            
            setClientsList(clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client)));
            setAllServicesList(servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct)));
        } catch (error) {
            console.error("Error fetching dependencies for booking dialog:", error);
            toast({ title: "Error Data Dialog", description: "Gagal memuat data untuk form booking.", variant: "destructive"});
        } finally {
            setLoadingDialogDeps(false);
        }
    };
    fetchInitialDialogDeps();
  }, [toast]);


  const bookingsOnSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return bookingsForMonth.filter(booking =>
      isSameDay(booking.bookingDateTime.toDate(), selectedDate)
    );
  }, [selectedDate, bookingsForMonth]);

  const daysWithBookings = useMemo(() => {
    return bookingsForMonth.map(booking => booking.bookingDateTime.toDate());
  }, [bookingsForMonth]);

  const handleOpenNewBookingDialog = () => {
    setEditingBookingEntry(null);
    setIsBookingFormOpen(true);
  };
  
  const handleEditBooking = (booking: BookingEntry) => {
    setEditingBookingEntry(booking);
    setIsBookingFormOpen(true);
  };

  const handleDeleteBookingConfirmation = (booking: BookingEntry) => {
    setBookingToDelete(booking);
  };

  const handleDeleteBooking = async () => {
    if (!bookingToDelete) return;
    setIsDeletingBooking(true);
    try {
      await deleteDoc(doc(db, 'bookings', bookingToDelete.id!));
      // If booking was in queue, ideally also remove/update queue item
      // This part can be complex if queue item has advanced status.
      // For now, just deleting booking.
      if (bookingToDelete.queueItemId) {
        try {
          await deleteDoc(doc(db, 'queueItems', bookingToDelete.queueItemId));
          toast({ title: "Info", description: "Item antrian terkait juga dihapus." });
        } catch (queueError) {
           console.warn("Could not delete linked queue item:", queueError);
           toast({ title: "Peringatan", description: "Gagal menghapus item antrian terkait secara otomatis.", variant: "default" });
        }
      }

      toast({ title: "Sukses", description: `Booking untuk ${bookingToDelete.customerName} berhasil dihapus.` });
      setBookingToDelete(null);
      fetchBookingsForMonth(currentDisplayDate); // Refresh data
    } catch (error) {
      console.error("Error deleting booking: ", error);
      toast({ title: "Error Hapus Booking", description: "Gagal menghapus booking.", variant: "destructive" });
    } finally {
      setIsDeletingBooking(false);
    }
  };

  const refreshBookings = () => {
    fetchBookingsForMonth(currentDisplayDate);
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Kalender Booking" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Kalender Jadwal Booking</CardTitle>
              <CardDescription>Lihat dan kelola jadwal booking pelanggan.</CardDescription>
            </div>
            <Button onClick={handleOpenNewBookingDialog} disabled={loadingDialogDeps}>
                {loadingDialogDeps && !isBookingFormOpen ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                Buat Booking Baru
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex justify-center md:justify-start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentDisplayDate}
                onMonthChange={setCurrentDisplayDate}
                className="rounded-md border shadow-sm"
                modifiers={{ booked: daysWithBookings }}
                modifiersClassNames={{ booked: 'booked-day' }}
                locale={indonesiaLocale}
              />
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-3">
                Booking untuk: {selectedDate ? formatDateFns(selectedDate, "PPP", { locale: indonesiaLocale }) : "Pilih tanggal"}
              </h3>
              {loading ? (
                <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : bookingsOnSelectedDate.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">Tidak ada booking untuk tanggal ini.</p>
              ) : (
                <ScrollArea className="h-[400px] pr-3">
                  <div className="space-y-3">
                    {bookingsOnSelectedDate.map(booking => (
                      <Card key={booking.id} className="bg-card hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3 pt-4 px-4">
                          <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-md flex items-center">
                                <User className="mr-2 h-4 w-4 text-primary" /> {booking.customerName}
                                </CardTitle>
                                <CardDescription className="text-xs">{booking.vehicleInfo}</CardDescription>
                            </div>
                             <Badge variant={booking.status === 'In Queue' ? 'default' : booking.status === 'Confirmed' ? 'secondary' : 'outline'} className="capitalize text-xs">
                                {booking.status}
                             </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3 pt-1 text-sm">
                          <p><Clock className="inline mr-1.5 h-3.5 w-3.5 text-muted-foreground" /> Pukul: {formatDateFns(booking.bookingDateTime.toDate(), "HH:mm", { locale: indonesiaLocale })}</p>
                          <p className="truncate"><Wrench className="inline mr-1.5 h-3.5 w-3.5 text-muted-foreground" /> Layanan: {booking.serviceName}</p>
                          {booking.notes && <p className="text-xs text-muted-foreground mt-1 truncate">Catatan: {booking.notes}</p>}
                        </CardContent>
                        <CardFooter className="px-4 py-2 border-t flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditBooking(booking)} className="h-7 px-2 text-xs hover:bg-accent/80">
                                <Edit3 className="mr-1 h-3.5 w-3.5"/> Edit
                            </Button>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteBookingConfirmation(booking)} className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive">
                                    <Trash2 className="mr-1 h-3.5 w-3.5"/> Hapus
                                </Button>
                            </AlertDialogTrigger>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </CardContent>
        </Card>

        <BookingFormDialog
          isOpen={isBookingFormOpen}
          onOpenChange={setIsBookingFormOpen}
          onSubmitSuccess={refreshBookings}
          clientsList={clientsList}
          allServicesList={allServicesList}
          existingBooking={editingBookingEntry}
        />
        
        {bookingToDelete && (
            <AlertDialog open={!!bookingToDelete} onOpenChange={(open) => !open && setBookingToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Konfirmasi Penghapusan Booking</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus booking untuk "{bookingToDelete.customerName}" pada layanan "{bookingToDelete.serviceName}"? 
                        Jika booking ini sudah masuk antrian, item antrian terkait juga akan dihapus. Tindakan ini tidak dapat diurungkan.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setBookingToDelete(null)} disabled={isDeletingBooking}>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteBooking} disabled={isDeletingBooking} className={buttonVariants({variant: "destructive"})}>
                        {isDeletingBooking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Hapus Booking
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )}

      </main>
    </div>
  );
}
