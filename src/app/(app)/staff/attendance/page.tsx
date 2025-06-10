
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
import { collection, getDocs, query, where, orderBy, Timestamp, doc, updateDoc, serverTimestamp, addDoc, DocumentData } from 'firebase/firestore';
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

interface DisplayRecord extends StaffMember {
  attendance?: AttendanceRecord;
}


export default function AttendancePage() {
  const [displayRecords, setDisplayRecords] = useState<DisplayRecord[]>([]);
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

  const fetchStaffAndAttendance = useCallback(async (dateToFetch: Date) => {
    setLoading(true);
    setLoadingAllStaff(true); // Also set this as we're refetching staff too or for the first time.
    const formattedDate = formatDateForFirestore(dateToFetch);
    let staffList: StaffMember[] = [];

    try {
      // Fetch all staff members
      const staffCollectionRef = collection(db, 'staffMembers');
      const staffQuery = query(staffCollectionRef, orderBy("name"));
      const staffSnapshot = await getDocs(staffQuery);
      staffList = staffSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
      setAllStaffMembers(staffList); // Update allStaffMembers for manual entry dialog
      setLoadingAllStaff(false);

      if (staffList.length === 0) {
        setDisplayRecords([]);
        setLoading(false);
        return;
      }

      // Fetch attendance records for the selected date
      const attendanceCollectionRef = collection(db, 'attendanceRecords');
      const attendanceQuery = query(attendanceCollectionRef, where("date", "==", formattedDate));
      const attendanceSnapshot = await getDocs(attendanceQuery);
      const attendanceData = attendanceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AttendanceRecord));

      // Merge staff list with their attendance records
      const mergedRecords: DisplayRecord[] = staffList.map(staff => {
        const attendance = attendanceData.find(att => att.staffId === staff.id);
        return {
          ...staff, // Spread all staff member properties
          attendance: attendance, // Attach attendance record if found
        };
      });
      setDisplayRecords(mergedRecords);

    } catch (error) {
      console.error("Error fetching staff and attendance: ", error);
      toast({
        title: "Error Pengambilan Data",
        description: "Tidak dapat mengambil data staf atau absensi.",
        variant: "destructive",
      });
      setDisplayRecords([]); // Clear records on error
    } finally {
      setLoading(false);
    }
  }, [toast]);


  useEffect(() => {
    fetchStaffAndAttendance(selectedDate);
  }, [selectedDate, fetchStaffAndAttendance]);


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

  const handleClockIn = (staff: DisplayRecord) => {
    setRowActionLoading(prev => ({ ...prev, [staff.id]: true }));
    handleGeolocation(
      async (coords) => {
        try {
          const newRecordData: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'> = {
            staffId: staff.id,
            staffName: staff.name,
            date: formatDateForFirestore(selectedDate),
            clockIn: getCurrentTimeHHMM(),
            clockInLocation: coords,
            status: 'Hadir',
          };
          
          // If attendance record already exists, update it. Otherwise, create a new one.
          if (staff.attendance?.id) {
            const recordDocRef = doc(db, 'attendanceRecords', staff.attendance.id);
            await updateDoc(recordDocRef, { 
                ...newRecordData,
                updatedAt: serverTimestamp() 
            });
             toast({ title: "Sukses", description: `${staff.name} berhasil clock-in (update).` });
          } else {
            await addDoc(collection(db, 'attendanceRecords'), {
              ...newRecordData,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
            toast({ title: "Sukses", description: `${staff.name} berhasil clock-in.` });
          }
          fetchStaffAndAttendance(selectedDate); 
        } catch (error) {
            console.error("Error clocking in: ", error);
            toast({ title: "Error", description: "Gagal mencatat absensi masuk.", variant: "destructive" });
        } finally {
            setRowActionLoading(prev => ({ ...prev, [staff.id]: false }));
        }
      },
      (errorMsg) => {
        toast({ title: "Absen Masuk Gagal", description: `${errorMsg} Lokasi wajib untuk absen. Absen tidak tercatat.`, variant: "destructive" });
        setRowActionLoading(prev => ({ ...prev, [staff.id]: false })); 
      }
    );
  };

  const handleClockOut = (staff: DisplayRecord) => {
    if (!staff.attendance?.id) {
        toast({ title: "Error", description: "Tidak ada data clock-in untuk staf ini.", variant: "destructive" });
        return;
    }
    setRowActionLoading(prev => ({ ...prev, [staff.id]: true }));
    handleGeolocation(
      async (coords) => {
        try {
          const recordDocRef = doc(db, 'attendanceRecords', staff.attendance!.id);
          await updateDoc(recordDocRef, { 
            clockOut: getCurrentTimeHHMM(),
            clockOutLocation: coords,
            updatedAt: serverTimestamp()
          });
          toast({ title: "Sukses", description: `${staff.name} berhasil clock-out.` });
          fetchStaffAndAttendance(selectedDate); 
        } catch (error) {
            console.error("Error clocking out: ", error);
            toast({ title: "Error", description: "Gagal mencatat absensi pulang.", variant: "destructive" });
        } finally {
            setRowActionLoading(prev => ({ ...prev, [staff.id]: false }));
        }
      },
      (errorMsg) => {
        toast({ title: "Absen Pulang Gagal", description: `${errorMsg} Lokasi wajib untuk absen. Absen tidak tercatat.`, variant: "destructive" });
        setRowActionLoading(prev => ({ ...prev, [staff.id]: false }));
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
        const formattedDate = formatDateForFirestore(selectedDate);
        // Check if an attendance record already exists for this staff on this date
        const attendanceCollectionRef = collection(db, 'attendanceRecords');
        const q = query(attendanceCollectionRef, where("staffId", "==", data.staffId), where("date", "==", formattedDate));
        const querySnapshot = await getDocs(q);

        const updateData: Partial<AttendanceRecord> & {updatedAt: DocumentData} = {
            clockIn: data.clockIn || undefined,
            clockOut: data.clockOut || undefined,
            status: data.status,
            notes: data.notes || undefined,
            updatedAt: serverTimestamp(),
        };
         // Remove location data if it exists as this is a manual entry
        if (updateData.clockInLocation) delete updateData.clockInLocation;
        if (updateData.clockOutLocation) delete updateData.clockOutLocation;


        if (!querySnapshot.empty) {
            // Update existing record
            const existingDocRef = querySnapshot.docs[0].ref;
            await updateDoc(existingDocRef, updateData);
            toast({ title: "Sukses", description: `Absensi manual untuk ${selectedStaffMember.name} berhasil diperbarui.` });
        } else {
            // Create new record
            const newRecordData: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt' | 'clockInLocation' | 'clockOutLocation'> = {
                staffId: data.staffId,
                staffName: selectedStaffMember.name,
                date: formattedDate,
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
        }
      
      setIsManualEntryDialogOpen(false);
      fetchStaffAndAttendance(selectedDate);
    } catch (error) {
      console.error("Error adding/updating manual attendance entry: ", error);
      toast({ title: "Error", description: "Gagal memproses entri absensi manual.", variant: "destructive" });
    } finally {
      setIsSubmittingManualEntry(false);
    }
  };

  const getStatusBadge = (status?: AttendanceRecord['status']) => {
    if (!status) return <Badge variant="outline">Belum Ada Status</Badge>;
    switch(status) {
      case 'Hadir': return <Badge variant="default" className="bg-green-500 hover:bg-green-600"><UserCheck className="mr-1 h-3 w-3" />Hadir</Badge>;
      case 'Absen': return <Badge variant="destructive"><UserX className="mr-1 h-3 w-3" />Absen</Badge>;
      case 'Terlambat': return <Badge variant="outline" className="border-yellow-500 text-yellow-600 dark:text-yellow-400"><Clock className="mr-1 h-3 w-3" />Terlambat</Badge>;
      case 'Cuti': return <Badge variant="secondary">Cuti</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };
  
  const isLoadingOverall = loading || loadingAllStaff;


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
              {isLoadingOverall && displayRecords.length === 0 ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2">Memuat data staf dan absensi...</p>
                </div>
              ) : allStaffMembers.length === 0 && !loadingAllStaff ? (
                  <div className="text-center py-10 text-muted-foreground">
                      Tidak ada staf terdaftar. Silakan tambahkan staf terlebih dahulu.
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
                    {displayRecords.map((record) => {
                      const attendance = record.attendance;
                      const canClockIn = !attendance || (!attendance.clockIn && attendance.status !== 'Absen' && attendance.status !== 'Cuti');
                      const canClockOut = attendance?.clockIn && !attendance.clockOut && (attendance.status === 'Hadir' || attendance.status === 'Terlambat');
                      
                      return (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.name}</TableCell>
                          <TableCell>{attendance?.clockIn || <span className="text-muted-foreground">-</span>}</TableCell>
                          <TableCell>
                            {attendance?.clockInLocation ? (
                              <div className="flex items-center text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1 text-blue-500" />
                                <TooltipProvider delayDuration={100}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="truncate cursor-help">
                                        Lat: {attendance.clockInLocation.latitude.toFixed(3)}, Lon: {attendance.clockInLocation.longitude.toFixed(3)}
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Akurasi: {attendance.clockInLocation.accuracy?.toFixed(0) || 'N/A'} meter</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            ) : attendance?.clockIn ? (<span className="text-muted-foreground text-xs italic">Tidak ada data</span>) : (<span className="text-muted-foreground">-</span>) }
                          </TableCell>
                          <TableCell>{attendance?.clockOut || (attendance?.clockIn ? <span className="text-muted-foreground italic">Belum Pulang</span> : <span className="text-muted-foreground">-</span>)}</TableCell>
                          <TableCell>
                            {attendance?.clockOutLocation ? (
                              <div className="flex items-center text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1 text-red-500" />
                                <TooltipProvider delayDuration={100}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="truncate cursor-help">
                                        Lat: {attendance.clockOutLocation.latitude.toFixed(3)}, Lon: {attendance.clockOutLocation.longitude.toFixed(3)}
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Akurasi: {attendance.clockOutLocation.accuracy?.toFixed(0) || 'N/A'} meter</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            ) : attendance?.clockOut ? (<span className="text-muted-foreground text-xs italic">Tidak ada data</span>) : (<span className="text-muted-foreground">-</span>) }
                          </TableCell>
                          <TableCell>{getStatusBadge(attendance?.status)}</TableCell>
                          <TableCell className="text-right space-x-1">
                            {canClockIn && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleClockIn(record)}
                                disabled={rowActionLoading[record.id]}
                              >
                                {rowActionLoading[record.id] ? <Loader2 className="mr-1 h-3 w-3 animate-spin"/> : <LogIn className="mr-1 h-3 w-3"/>}
                                Masuk
                              </Button>
                            )}
                            {canClockOut && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleClockOut(record)}
                                disabled={rowActionLoading[record.id]}
                              >
                                {rowActionLoading[record.id] ? <Loader2 className="mr-1 h-3 w-3 animate-spin"/> : <LogOut className="mr-1 h-3 w-3"/>}
                                Pulang
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {displayRecords.length === 0 && !isLoadingOverall && (
                       <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                          Belum ada data absensi untuk tanggal ini.
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
              <p>Fitur geotagging memerlukan izin akses lokasi dari browser. Jika izin ditolak atau lokasi tidak dapat diperoleh, proses clock-in/out akan <span className="font-semibold">gagal</span> dan absensi tidak tercatat.</p>
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
