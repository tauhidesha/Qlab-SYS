
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, LogIn, LogOut, UserCheck, UserX, PlusCircle, Loader2, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, Timestamp, doc, updateDoc, serverTimestamp, addDoc } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
import { id as indonesiaLocale } from 'date-fns/locale';
import { format as formatDateFns } from 'date-fns';
import type { AttendanceRecord, GeolocationCoordinates } from '@/types/attendance';
import type { StaffMember } from '@/types/staff';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const manualAttendanceFormSchema = z.object({
  staffId: z.string().min(1, "Staf harus dipilih"),
  clockIn: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$|^$/, "Format Jam Masuk tidak valid (JJ:MM atau kosong)").optional().or(z.literal('')),
  clockOut: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$|^$/, "Format Jam Pulang tidak valid (JJ:MM atau kosong)").optional().or(z.literal('')),
  status: z.enum(['Hadir', 'Absen', 'Terlambat', 'Cuti'], { required_error: "Status kehadiran diperlukan" }),
  notes: z.string().max(200, "Catatan maksimal 200 karakter").optional(),
});

type ManualAttendanceFormData = z.infer<typeof manualAttendanceFormSchema>;

interface ManualAttendanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ManualAttendanceFormData) => Promise<void>;
  staffList: StaffMember[];
  selectedDate: Date;
  isSubmitting: boolean;
  loadingStaff: boolean;
}

function ManualAttendanceDialog({ isOpen, onClose, onSubmit, staffList, selectedDate, isSubmitting, loadingStaff }: ManualAttendanceDialogProps) {
  const form = useForm<ManualAttendanceFormData>({
    resolver: zodResolver(manualAttendanceFormSchema),
    defaultValues: {
      staffId: '',
      clockIn: '',
      clockOut: '',
      status: 'Hadir',
      notes: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        staffId: '',
        clockIn: '',
        clockOut: '',
        status: 'Hadir',
        notes: '',
      });
    }
  }, [isOpen, form]);

  const internalSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Entri Absensi Manual</DialogTitle>
          <DialogDescription>
            Tanggal: {formatDateFns(selectedDate, 'PPP', { locale: indonesiaLocale })}.
            Data lokasi tidak akan dicatat untuk entri manual.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={internalSubmit} className="space-y-4 py-2 pb-4">
            <FormField
              control={form.control}
              name="staffId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Staf</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={loadingStaff}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={loadingStaff ? "Memuat staf..." : "Pilih staf"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loadingStaff ? (
                        <SelectItem value="loading" disabled>Memuat...</SelectItem>
                      ) : staffList.length === 0 ? (
                        <SelectItem value="no-staff" disabled>Tidak ada staf.</SelectItem>
                      ) : (
                        staffList.map(staff => (
                          <SelectItem key={staff.id} value={staff.id}>{staff.name} ({staff.role})</SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clockIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Masuk (JJ:MM)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="mis. 09:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clockOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Pulang (JJ:MM)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="mis. 17:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Kehadiran</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {['Hadir', 'Absen', 'Terlambat', 'Cuti'].map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan (Opsional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="mis. Izin sakit, Dinas luar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Batal</Button>
              <Button type="submit" disabled={isSubmitting || loadingStaff || staffList.length === 0}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Simpan Entri Manual
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [rowActionLoading, setRowActionLoading] = useState<Record<string, boolean>>({});
  
  const [isManualEntryDialogOpen, setIsManualEntryDialogOpen] = useState(false);
  const [allStaffMembers, setAllStaffMembers] = useState<StaffMember[]>([]);
  const [loadingAllStaff, setLoadingAllStaff] = useState(true);
  const [isSubmittingManualEntry, setIsSubmittingManualEntry] = useState(false);

  const { toast } = useToast();

  const formatDateForFirestore = (date: Date): string => {
    return formatDateFns(date, 'yyyy-MM-dd');
  };

  const getCurrentTimeHHMM = (): string => {
    return formatDateFns(new Date(), 'HH:mm');
  };

  const fetchAttendance = useCallback(async (dateToFetch: Date) => {
    setLoading(true);
    try {
      const attendanceCollectionRef = collection(db, 'attendanceRecords');
      const formattedDate = formatDateForFirestore(dateToFetch);
      const q = query(attendanceCollectionRef, where("date", "==", formattedDate), orderBy("staffName"));
      const querySnapshot = await getDocs(q);
      const recordsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AttendanceRecord));
      setAttendanceRecords(recordsData);
    } catch (error) {
      console.error("Error fetching attendance records: ", error);
      toast({
        title: "Error Pengambilan Data",
        description: "Tidak dapat mengambil data absensi dari Firestore.",
        variant: "destructive",
      });
      setAttendanceRecords([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAttendance(selectedDate);
  }, [selectedDate, fetchAttendance]);

  const fetchAllStaff = useCallback(async () => {
    setLoadingAllStaff(true);
    try {
      const staffCollectionRef = collection(db, 'staffMembers');
      const q = query(staffCollectionRef, orderBy("name"));
      const querySnapshot = await getDocs(q);
      const membersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
      setAllStaffMembers(membersData);
    } catch (error) {
      console.error("Error fetching all staff members: ", error);
      toast({ title: "Error", description: "Gagal memuat daftar staf untuk entri manual.", variant: "destructive" });
    } finally {
      setLoadingAllStaff(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAllStaff();
  }, [fetchAllStaff]);


  const handleGeolocation = (
    onSuccess: (coords: GeolocationCoordinates) => void,
    onError: (errorMsg: string) => void
  ) => {
    if (!navigator.geolocation) {
      onError("Geolocation tidak didukung oleh browser ini.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onSuccess({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        let message = "Gagal mendapatkan lokasi.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Izin akses lokasi ditolak.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Informasi lokasi tidak tersedia.";
            break;
          case error.TIMEOUT:
            message = "Waktu permintaan lokasi habis.";
            break;
        }
        onError(message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const updateAttendanceRecord = async (recordId: string, data: Partial<AttendanceRecord>) => {
    try {
      const recordDocRef = doc(db, 'attendanceRecords', recordId);
      await updateDoc(recordDocRef, { ...data, updatedAt: serverTimestamp() });
      toast({ title: "Sukses", description: "Data absensi berhasil diperbarui." });
      fetchAttendance(selectedDate); 
    } catch (error) {
      console.error("Error updating attendance record: ", error);
      toast({ title: "Error", description: "Gagal memperbarui data absensi.", variant: "destructive" });
    } finally {
      setRowActionLoading(prev => ({ ...prev, [recordId]: false }));
    }
  };

  const handleClockIn = (recordId: string) => {
    setRowActionLoading(prev => ({ ...prev, [recordId]: true }));
    handleGeolocation(
      (coords) => {
        updateAttendanceRecord(recordId, {
          clockIn: getCurrentTimeHHMM(),
          clockInLocation: coords,
          status: 'Hadir', 
        });
      },
      (errorMsg) => {
        toast({ title: "Absen Masuk Gagal", description: `${errorMsg} Lokasi wajib untuk absen. Absen tidak tercatat.`, variant: "destructive" });
        setRowActionLoading(prev => ({ ...prev, [recordId]: false })); 
      }
    );
  };

  const handleClockOut = (recordId: string) => {
    setRowActionLoading(prev => ({ ...prev, [recordId]: true }));
    handleGeolocation(
      (coords) => {
        updateAttendanceRecord(recordId, {
          clockOut: getCurrentTimeHHMM(),
          clockOutLocation: coords,
        });
      },
      (errorMsg) => {
        toast({ title: "Absen Pulang Gagal", description: `${errorMsg} Lokasi wajib untuk absen. Absen tidak tercatat.`, variant: "destructive" });
        setRowActionLoading(prev => ({ ...prev, [recordId]: false }));
      }
    );
  };

  const handleManualSubmit = async (data: ManualAttendanceFormData) => {
    setIsSubmittingManualEntry(true);
    const selectedStaffMember = allStaffMembers.find(s => s.id === data.staffId);
    if (!selectedStaffMember) {
      toast({ title: "Error", description: "Staf yang dipilih tidak valid.", variant: "destructive" });
      setIsSubmittingManualEntry(false);
      return;
    }

    try {
      const newRecordData: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt' | 'clockInLocation' | 'clockOutLocation'> = {
        staffId: data.staffId,
        staffName: selectedStaffMember.name,
        date: formatDateForFirestore(selectedDate),
        clockIn: data.clockIn || undefined,
        clockOut: data.clockOut || undefined,
        status: data.status,
        notes: data.notes || undefined,
      };
      await addDoc(collection(db, 'attendanceRecords'), {
        ...newRecordData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({ title: "Sukses", description: `Entri absensi manual untuk ${selectedStaffMember.name} berhasil ditambahkan.` });
      setIsManualEntryDialogOpen(false);
      fetchAttendance(selectedDate); // Refresh data
    } catch (error) {
      console.error("Error adding manual attendance entry: ", error);
      toast({ title: "Error", description: "Gagal menambahkan entri absensi manual.", variant: "destructive" });
    } finally {
      setIsSubmittingManualEntry(false);
    }
  };


  const getStatusBadge = (status: AttendanceRecord['status']) => {
    switch(status) {
      case 'Hadir': return <Badge variant="default" className="bg-green-500 hover:bg-green-600"><UserCheck className="mr-1 h-3 w-3" />Hadir</Badge>;
      case 'Absen': return <Badge variant="destructive"><UserX className="mr-1 h-3 w-3" />Absen</Badge>;
      case 'Terlambat': return <Badge variant="outline" className="border-yellow-500 text-yellow-600 dark:text-yellow-400"><Clock className="mr-1 h-3 w-3" />Terlambat</Badge>;
      case 'Cuti': return <Badge variant="secondary">Cuti</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Absensi Staf" />
      <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Log Absensi</CardTitle>
                <CardDescription>Catatan absensi staf harian untuk {formatDateFns(selectedDate, 'PPP', { locale: indonesiaLocale })}.</CardDescription>
              </div>
              <Button 
                onClick={() => setIsManualEntryDialogOpen(true)}
                disabled={loadingAllStaff}
              >
                {loadingAllStaff ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />} 
                Entri Manual
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2">Memuat absensi...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Staf</TableHead>
                      <TableHead>Masuk Kerja</TableHead>
                      <TableHead>Lokasi Masuk</TableHead>
                      <TableHead>Pulang Kerja</TableHead>
                      <TableHead>Lokasi Pulang</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.staffName}</TableCell>
                        <TableCell>{record.clockIn || <span className="text-muted-foreground">-</span>}</TableCell>
                        <TableCell>
                          {record.clockInLocation ? (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1 text-blue-500" />
                              <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="truncate cursor-help">
                                      Lat: {record.clockInLocation.latitude.toFixed(3)}, Lon: {record.clockInLocation.longitude.toFixed(3)}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Akurasi: {record.clockInLocation.accuracy?.toFixed(0) || 'N/A'} meter</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ) : record.clockIn ? (<span className="text-muted-foreground text-xs italic">Tidak ada data</span>) : (<span className="text-muted-foreground">-</span>) }
                        </TableCell>
                        <TableCell>{record.clockOut || (record.clockIn ? <span className="text-muted-foreground italic">Belum Pulang</span> : <span className="text-muted-foreground">-</span>)}</TableCell>
                        <TableCell>
                          {record.clockOutLocation ? (
                             <div className="flex items-center text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1 text-red-500" />
                               <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="truncate cursor-help">
                                      Lat: {record.clockOutLocation.latitude.toFixed(3)}, Lon: {record.clockOutLocation.longitude.toFixed(3)}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Akurasi: {record.clockOutLocation.accuracy?.toFixed(0) || 'N/A'} meter</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ) : record.clockOut ? (<span className="text-muted-foreground text-xs italic">Tidak ada data</span>) : (<span className="text-muted-foreground">-</span>) }
                        </TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell className="text-right space-x-1">
                          {!record.clockIn && record.status !== 'Absen' && record.status !== 'Cuti' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleClockIn(record.id)}
                              disabled={rowActionLoading[record.id]}
                            >
                              {rowActionLoading[record.id] ? <Loader2 className="mr-1 h-3 w-3 animate-spin"/> : <LogIn className="mr-1 h-3 w-3"/>}
                               Masuk
                            </Button>
                          )}
                          {record.clockIn && !record.clockOut && (record.status === 'Hadir' || record.status === 'Terlambat') && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleClockOut(record.id)}
                              disabled={rowActionLoading[record.id]}
                            >
                               {rowActionLoading[record.id] ? <Loader2 className="mr-1 h-3 w-3 animate-spin"/> : <LogOut className="mr-1 h-3 w-3"/>}
                               Pulang
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {attendanceRecords.length === 0 && (
                       <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                          Tidak ada catatan absensi untuk tanggal ini.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Tampilan Kalender</CardTitle>
              <CardDescription>Pilih tanggal untuk melihat absensi.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                disabled={(date) => date > new Date() || date < new Date("2020-01-01")}
                initialFocus
                locale={indonesiaLocale}
              />
            </CardContent>
          </Card>
           <Card className="mt-6">
            <CardHeader>
              <CardTitle>Catatan Geotagging</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>Fitur geotagging memerlukan izin akses lokasi dari browser pengguna (staf yang melakukan clock-in/out).</p>
              <p>Jika izin ditolak atau lokasi tidak dapat diperoleh, sistem akan <span className="font-semibold">menolak</span> proses clock-in/out.</p>
              <p>Akurasi lokasi tergantung pada perangkat dan kondisi jaringan. Opsi `enableHighAccuracy` diaktifkan untuk hasil terbaik.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <ManualAttendanceDialog
        isOpen={isManualEntryDialogOpen}
        onClose={() => setIsManualEntryDialogOpen(false)}
        onSubmit={handleManualSubmit}
        staffList={allStaffMembers}
        selectedDate={selectedDate}
        isSubmitting={isSubmittingManualEntry}
        loadingStaff={loadingAllStaff}
      />
    </div>
  );
}
