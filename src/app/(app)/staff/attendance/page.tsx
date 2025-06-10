
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, LogIn, LogOut, UserCheck, UserX, PlusCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore'; // Added Timestamp
import { useToast } from "@/hooks/use-toast";
import { id as indonesiaLocale } from 'date-fns/locale';
import { format as formatDateFns } from 'date-fns'; // Import format from date-fns

interface AttendanceRecord {
  id: string;
  staffId: string; // Added staffId for better linking
  staffName: string;
  date: string; // YYYY-MM-DD
  clockIn?: string; // HH:mm
  clockOut?: string; // HH:mm
  status: 'Hadir' | 'Absen' | 'Terlambat' | 'Cuti';
  notes?: string;
  createdAt?: Timestamp; // Added for tracking
  updatedAt?: Timestamp; // Added for tracking
}

export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { toast } = useToast();

  const formatDateForFirestore = (date: Date): string => {
    return formatDateFns(date, 'yyyy-MM-dd'); // Using date-fns format
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
      setAttendanceRecords([]); // Clear records on error
    } finally {
      setLoading(false);
    }
  }, [toast]); // Removed formatDateForFirestore as it's stable

  useEffect(() => {
    fetchAttendance(selectedDate);
  }, [selectedDate, fetchAttendance]);

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
                      <TableHead>Pulang Kerja</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.staffName}</TableCell>
                        <TableCell>{record.clockIn || <span className="text-muted-foreground">-</span>}</TableCell>
                        <TableCell>{record.clockOut || (record.clockIn ? <span className="text-muted-foreground italic">Belum Pulang</span> : <span className="text-muted-foreground">-</span>)}</TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell className="text-right space-x-1">
                          {!record.clockIn && record.status !== 'Absen' && record.status !== 'Cuti' && <Button variant="outline" size="sm" disabled><LogIn className="mr-1 h-3 w-3"/> Masuk</Button>}
                          {record.clockIn && !record.clockOut && record.status === 'Hadir' && <Button variant="outline" size="sm" disabled><LogOut className="mr-1 h-3 w-3"/> Pulang</Button>}
                        </TableCell>
                      </TableRow>
                    ))}
                    {attendanceRecords.length === 0 && (
                       <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
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
                disabled={(date) => date > new Date() || date < new Date("2020-01-01")} // Adjusted min date
                initialFocus
                locale={indonesiaLocale}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
