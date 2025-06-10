
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Save, CheckCircle, DollarSign, Percent as PercentIcon } from 'lucide-react'; // Explicitly import PercentIcon
import { db } from '@/lib/firebase';
import { collection, doc, query, where, getDocs, setDoc, updateDoc, serverTimestamp, Timestamp, orderBy } from 'firebase/firestore'; // Added orderBy
import { useToast } from '@/hooks/use-toast';
import type { StaffMember } from '@/types/staff';
import type { DailyProfitShareEntry } from '@/types/profitSharing';
import { id as indonesiaLocale } from 'date-fns/locale';
import { format as formatDateFns } from 'date-fns';

interface ProfitShareFormState {
  staffDailyRevenue: string;
  profitSharePercentage: string;
  profitShareAmount: number;
  existingEntryId?: string;
  status: 'Belum Dibayar' | 'Dibayar';
  paidAt?: Timestamp;
  isLoadingSave: boolean;
  isLoadingPay: boolean;
}

export default function ProfitSharingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [profitShareEntries, setProfitShareEntries] = useState<Record<string, ProfitShareFormState>>({});
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [loadingEntries, setLoadingEntries] = useState(false);

  const { toast } = useToast();

  const formatDateForFirestore = (date: Date): string => formatDateFns(date, 'yyyy-MM-dd');

  const fetchStaffList = useCallback(async () => {
    setLoadingStaff(true);
    try {
      const staffCollectionRef = collection(db, 'staffMembers');
      const q = query(staffCollectionRef, orderBy("name")); // orderBy should now be defined
      const querySnapshot = await getDocs(q);
      const membersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
      setStaffList(membersData);
    } catch (error) {
      console.error("Error fetching staff list: ", error);
      toast({ title: "Error", description: "Gagal mengambil daftar staf.", variant: "destructive" });
    } finally {
      setLoadingStaff(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStaffList();
  }, [fetchStaffList]);

  const fetchProfitSharingEntries = useCallback(async (date: Date) => {
    if (staffList.length === 0) {
        setProfitShareEntries({});
        setLoadingEntries(false);
        return;
    }
    setLoadingEntries(true);
    const formattedDate = formatDateForFirestore(date);
    const newEntriesState: Record<string, ProfitShareFormState> = {};
    try {
      const entriesCollectionRef = collection(db, 'dailyProfitShares');
      const q = query(entriesCollectionRef, where("date", "==", formattedDate));
      const querySnapshot = await getDocs(q);
      const existingDbEntries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DailyProfitShareEntry));

      staffList.forEach(staff => {
        const existingEntry = existingDbEntries.find(e => e.staffId === staff.id);
        if (existingEntry) {
          newEntriesState[staff.id] = {
            staffDailyRevenue: String(existingEntry.staffDailyRevenue || ''),
            profitSharePercentage: String(existingEntry.profitSharePercentage || staff.profitSharePercentage || ''),
            profitShareAmount: existingEntry.profitShareAmount || 0,
            existingEntryId: existingEntry.id,
            status: existingEntry.status,
            paidAt: existingEntry.paidAt,
            isLoadingSave: false,
            isLoadingPay: false,
          };
        } else {
          newEntriesState[staff.id] = {
            staffDailyRevenue: '',
            profitSharePercentage: String(staff.profitSharePercentage || ''), // Default to staff profile, or empty string if none
            profitShareAmount: 0,
            status: 'Belum Dibayar',
            isLoadingSave: false,
            isLoadingPay: false,
          };
        }
      });
      setProfitShareEntries(newEntriesState);
    } catch (error) {
      console.error("Error fetching profit sharing entries: ", error);
      toast({ title: "Error", description: "Gagal mengambil data bagi hasil.", variant: "destructive" });
    } finally {
      setLoadingEntries(false);
    }
  }, [staffList, toast]);

  useEffect(() => {
    if (staffList.length > 0) {
      fetchProfitSharingEntries(selectedDate);
    } else {
      setProfitShareEntries({}); // Clear entries if no staff
    }
  }, [selectedDate, staffList, fetchProfitSharingEntries]);

  const handleInputChange = (staffId: string, field: 'staffDailyRevenue' | 'profitSharePercentage', value: string) => {
    setProfitShareEntries(prev => {
      const staffEntry = { ...(prev[staffId] || { // Ensure staffEntry is initialized if not present
        staffDailyRevenue: '', 
        profitSharePercentage: String(staffList.find(s=>s.id===staffId)?.profitSharePercentage || ''), 
        profitShareAmount: 0, 
        status: 'Belum Dibayar',
        isLoadingSave: false,
        isLoadingPay: false,
      }) };
      
      staffEntry[field] = value;

      const revenue = parseFloat(staffEntry.staffDailyRevenue) || 0;
      const percentage = parseFloat(staffEntry.profitSharePercentage) || 0;
      staffEntry.profitShareAmount = (revenue * percentage) / 100;

      return { ...prev, [staffId]: staffEntry };
    });
  };

  const handleSaveEntry = async (staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    const entryData = profitShareEntries[staffId];
    if (!staff || !entryData) return;

    setProfitShareEntries(prev => ({ ...prev, [staffId]: { ...prev[staffId], isLoadingSave: true }}));

    const revenue = parseFloat(entryData.staffDailyRevenue) || 0;
    // Use current input percentage, fallback to staff profile, then to 0
    const percentage = parseFloat(entryData.profitSharePercentage) || (staff.profitSharePercentage || 0);
    const profitAmount = (revenue * percentage) / 100;

    const dataToSave: Omit<DailyProfitShareEntry, 'id' | 'createdAt' | 'updatedAt' | 'paidAt'> & { paidAt?: Timestamp } = {
      staffId: staff.id,
      staffName: staff.name,
      date: formatDateForFirestore(selectedDate),
      staffDailyRevenue: revenue,
      profitSharePercentage: percentage,
      profitShareAmount: profitAmount,
      status: entryData.status || 'Belum Dibayar',
    };
    if(entryData.paidAt) dataToSave.paidAt = entryData.paidAt;


    try {
      if (entryData.existingEntryId) {
        const docRef = doc(db, 'dailyProfitShares', entryData.existingEntryId);
        await updateDoc(docRef, { ...dataToSave, updatedAt: serverTimestamp() });
        toast({ title: "Sukses", description: `Bagi hasil untuk ${staff.name} berhasil diperbarui.` });
      } else {
        const docRef = doc(collection(db, 'dailyProfitShares'));
        await setDoc(docRef, { ...dataToSave, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        setProfitShareEntries(prev => ({
            ...prev,
            [staffId]: { ...prev[staffId], existingEntryId: docRef.id, profitShareAmount: profitAmount }
        }));
        toast({ title: "Sukses", description: `Bagi hasil untuk ${staff.name} berhasil disimpan.` });
      }
       // Re-fetch after saving to ensure UI consistency with DB, especially status and timestamps
      await fetchProfitSharingEntries(selectedDate);
    } catch (error) {
      console.error("Error saving profit share entry: ", error);
      toast({ title: "Error", description: "Gagal menyimpan data bagi hasil.", variant: "destructive" });
    } finally {
       setProfitShareEntries(prev => ({ ...prev, [staffId]: { ...prev[staffId], isLoadingSave: false }}));
    }
  };

  const handleMarkAsPaid = async (staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    const entryData = profitShareEntries[staffId];
    if (!staff || !entryData || !entryData.existingEntryId) {
      toast({ title: "Error", description: "Simpan data terlebih dahulu sebelum menandai dibayar.", variant: "destructive"});
      return;
    }
    if (entryData.status === 'Dibayar') {
      toast({ title: "Info", description: "Bagi hasil ini sudah ditandai dibayar.", variant: "default"});
      return;
    }

    setProfitShareEntries(prev => ({ ...prev, [staffId]: { ...prev[staffId], isLoadingPay: true }}));
    try {
      const docRef = doc(db, 'dailyProfitShares', entryData.existingEntryId);
      await updateDoc(docRef, {
        status: 'Dibayar',
        paidAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({ title: "Sukses", description: `Bagi hasil untuk ${staff.name} ditandai sudah dibayar.` });
      setProfitShareEntries(prev => ({
        ...prev,
        [staffId]: { ...prev[staffId], status: 'Dibayar', paidAt: Timestamp.now() }
      }));
    } catch (error) {
      console.error("Error marking as paid: ", error);
      toast({ title: "Error", description: "Gagal menandai sebagai dibayar.", variant: "destructive" });
    } finally {
      setProfitShareEntries(prev => ({ ...prev, [staffId]: { ...prev[staffId], isLoadingPay: false }}));
    }
  };
  
  const currentDay = new Date();
  const isTodaySelected = selectedDate.toDateString() === currentDay.toDateString();
  const isPastDateSelected = selectedDate < currentDay && !isTodaySelected;


  if (loadingStaff) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Bagi Hasil Harian Staf" />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat daftar staf...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Bagi Hasil Harian Staf" />
      <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Pilih Tanggal</CardTitle>
              <CardDescription>Pilih tanggal untuk melihat atau mengelola data bagi hasil harian.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
                locale={indonesiaLocale}
                disabled={(date) => date > new Date()} // Disable future dates
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Entri Bagi Hasil untuk {formatDateFns(selectedDate, 'PPP', { locale: indonesiaLocale })}</CardTitle>
              <CardDescription>
                Masukkan pendapatan harian tiap staf. Persentase bagi hasil diambil dari profil staf, namun dapat diubah.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingEntries ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2">Memuat data bagi hasil...</p>
                </div>
              ) : staffList.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">Tidak ada staf terdaftar.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Staf</TableHead>
                      <TableHead className="w-[180px]">Pendapatan Harian (Rp)</TableHead>
                      <TableHead className="w-[150px]">Bagi Hasil (%)</TableHead>
                      <TableHead className="w-[180px]">Nominal Bagi Hasil (Rp)</TableHead>
                      <TableHead className="text-center w-[120px]">Status</TableHead>
                      <TableHead className="text-right w-[150px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffList.map((staff) => {
                      const entry = profitShareEntries[staff.id] || { 
                          staffDailyRevenue: '', 
                          profitSharePercentage: String(staff.profitSharePercentage || ''), 
                          profitShareAmount: 0, 
                          status: 'Belum Dibayar',
                          isLoadingSave: false,
                          isLoadingPay: false,
                       };
                      const isPaid = entry.status === 'Dibayar';
                      const isDisabled = isPaid || isPastDateSelected;


                      return (
                        <TableRow key={staff.id}>
                          <TableCell className="font-medium">{staff.name}</TableCell>
                          <TableCell>
                            <div className="relative">
                               <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                type="number"
                                placeholder="0"
                                value={entry.staffDailyRevenue}
                                onChange={(e) => handleInputChange(staff.id, 'staffDailyRevenue', e.target.value)}
                                disabled={isDisabled}
                                className="pl-8"
                                />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="relative">
                                <PercentIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    placeholder={String(staff.profitSharePercentage || '0')}
                                    value={entry.profitSharePercentage}
                                    onChange={(e) => handleInputChange(staff.id, 'profitSharePercentage', e.target.value)}
                                    disabled={isDisabled}
                                    className="pl-8"
                                />
                            </div>
                          </TableCell>
                          <TableCell>
                             <div className="relative">
                                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    value={entry.profitShareAmount.toLocaleString('id-ID')}
                                    readOnly
                                    className="bg-muted pl-8"
                                />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              isPaid ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                     : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}>
                              {entry.status}
                            </span>
                            {isPaid && entry.paidAt && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    {formatDateFns(entry.paidAt.toDate(), 'dd MMM yy', {locale: indonesiaLocale})}
                                </p>
                            )}
                          </TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button 
                                size="sm" 
                                onClick={() => handleSaveEntry(staff.id)} 
                                disabled={isDisabled || entry.isLoadingSave || entry.isLoadingPay}
                                variant="outline"
                            >
                              {entry.isLoadingSave ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            </Button>
                            <Button 
                                size="sm" 
                                variant={isPaid ? "secondary" : "default"}
                                onClick={() => handleMarkAsPaid(staff.id)} 
                                disabled={isPaid || entry.isLoadingSave || entry.isLoadingPay || !entry.existingEntryId || isPastDateSelected }
                                className={!isPaid && !isPastDateSelected ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                            >
                              {entry.isLoadingPay ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}


    