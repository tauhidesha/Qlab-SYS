
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
import { collection, getDocs, query, where, orderBy, Timestamp, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
import { id as indonesiaLocale } from 'date-fns/locale';
import { format as formatDateFns } from 'date-fns';
import type { AttendanceRecord, GeolocationCoordinates } from '@/types/attendance';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [rowActionLoading, setRowActionLoading] = useState<Record<string, boolean>>({});
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
    // rowActionLoading is set before calling this function.
    // It will be reset in the finally block here.
    try {
      const recordDocRef = doc(db, 'attendanceRecords', recordId);
      await updateDoc(recordDocRef, { ...data, updatedAt: serverTimestamp() });
      toast({ title: "Sukses", description: "Data absensi berhasil diperbarui." });
      fetchAttendance(selectedDate); // Refresh data
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
        toast({ title: "Absen Masuk Gagal", description: `${errorMsg} Lokasi wajib untuk absen.`, variant: "destructive" });
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
        toast({ title: "Absen Pulang Gagal", description: `${errorMsg} Lokasi wajib untuk absen.`, variant: "destructive" });
        setRowActionLoading(prev => ({ ...prev, [recordId]: false }));
      }
    );
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
              <Button disabled><PlusCircle className="mr-2 h-4 w-4" /> Entri Manual (Segera)</Button>
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
    </div>
  );
}

    