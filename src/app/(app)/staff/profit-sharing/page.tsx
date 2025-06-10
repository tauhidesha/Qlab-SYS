
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Save, CheckCircle, DollarSign, Percent as PercentIcon } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, doc, query, where, getDocs, setDoc, updateDoc, serverTimestamp, Timestamp, orderBy, type DocumentData } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { StaffMember } from '@/types/staff';
import type { DailyProfitShareEntry } from '@/types/profitSharing';
import type { Transaction, TransactionItem } from '@/types/transaction';
import { id as indonesiaLocale } from 'date-fns/locale';
import { format as formatDateFns, startOfDay, endOfDay } from 'date-fns';

interface ProfitShareFormState {
  staffDailyRevenue: number;
  profitSharePercentage: number;
  profitShareAmount: number;
  existingEntryId?: string;
  status: 'Belum Dibayar' | 'Dibayar';
  paidAt?: Timestamp;
  isLoadingSave: boolean;
  isLoadingPay: boolean;
}

export default function ProfitSharingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [technicianStaffList, setTechnicianStaffList] = useState<StaffMember[]>([]);
  const [profitShareEntries, setProfitShareEntries] = useState<Record<string, ProfitShareFormState>>({});
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [loadingEntriesAndRevenue, setLoadingEntriesAndRevenue] = useState(false);

  const { toast } = useToast();

  const formatDateForFirestore = (date: Date): string => formatDateFns(date, 'yyyy-MM-dd');

  const fetchTechnicianStaffList = useCallback(async () => {
    setLoadingStaff(true);
    try {
      const staffCollectionRef = collection(db, 'staffMembers');
      const q = query(staffCollectionRef, where("role", "==", "Teknisi"), orderBy("name"));
      const querySnapshot = await getDocs(q);
      const membersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
      setTechnicianStaffList(membersData);
    } catch (error) {
      console.error("Error fetching technician staff list: ", error);
      toast({ title: "Error", description: "Gagal mengambil daftar staf teknisi.", variant: "destructive" });
    } finally {
      setLoadingStaff(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTechnicianStaffList();
  }, [fetchTechnicianStaffList]);

  const calculateRevenueAndPopulateEntries = useCallback(async (date: Date) => {
    if (technicianStaffList.length === 0) {
        setProfitShareEntries({});
        setLoadingEntriesAndRevenue(false);
        return;
    }
    setLoadingEntriesAndRevenue(true);
    const formattedDate = formatDateForFirestore(date);
    const newEntriesState: Record<string, ProfitShareFormState> = {};

    try {
      const transactionsRef = collection(db, 'transactions');
      const dateStart = startOfDay(date);
      const dateEnd = endOfDay(date);
      
      const transactionsQuery = query(
        transactionsRef,
        where('status', '==', 'paid'),
        where('paidAt', '>=', Timestamp.fromDate(dateStart)),
        where('paidAt', '<=', Timestamp.fromDate(dateEnd))
      );
      const transactionsSnapshot = await getDocs(transactionsQuery);
      const paidTransactions = transactionsSnapshot.docs.map(doc => doc.data() as Transaction);

      const entriesCollectionRef = collection(db, 'dailyProfitShares');
      const existingEntriesQuery = query(entriesCollectionRef, where("date", "==", formattedDate));
      const existingEntriesSnapshot = await getDocs(existingEntriesQuery);
      const existingDbEntries = existingEntriesSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as DailyProfitShareEntry));

      for (const staff of technicianStaffList) {
        let staffDailyRevenue = 0;
        paidTransactions.forEach(transaction => {
          if (transaction.items && Array.isArray(transaction.items)) {
            transaction.items.forEach(item => {
              if (item.type === 'service' && item.staffName === staff.name) {
                staffDailyRevenue += (item.price || 0) * (item.quantity || 1);
              }
            });
          }
        });

        const staffProfitSharePercentage = staff.profitSharePercentage || 0;
        
        const existingEntry = existingDbEntries.find(e => e.staffId === staff.id);

        if (existingEntry) {
          // If entry exists, use its data. The staffDailyRevenue and profitShareAmount will be from the time it was saved.
          // The percentage used is also the one saved at that time.
          newEntriesState[staff.id] = {
            staffDailyRevenue: existingEntry.staffDailyRevenue, 
            profitSharePercentage: existingEntry.profitSharePercentage, 
            profitShareAmount: existingEntry.profitShareAmount, 
            existingEntryId: existingEntry.id,
            status: existingEntry.status,
            paidAt: existingEntry.paidAt,
            isLoadingSave: false,
            isLoadingPay: false,
          };
        } else {
          // For new entries, calculate based on current transactions and profile percentage
          const profitShareAmount = (staffDailyRevenue * staffProfitSharePercentage) / 100;
          newEntriesState[staff.id] = {
            staffDailyRevenue: staffDailyRevenue,
            profitSharePercentage: staffProfitSharePercentage,
            profitShareAmount: profitShareAmount,
            status: 'Belum Dibayar',
            isLoadingSave: false,
            isLoadingPay: false,
          };
        }
      }
      setProfitShareEntries(newEntriesState);

    } catch (error) {
      console.error("Error calculating revenue or fetching entries: ", error);
      toast({ title: "Error", description: "Gagal memproses data bagi hasil.", variant: "destructive" });
    } finally {
      setLoadingEntriesAndRevenue(false);
    }
  }, [technicianStaffList, toast]);


  useEffect(() => {
    if (technicianStaffList.length > 0) {
      calculateRevenueAndPopulateEntries(selectedDate);
    } else {
      setProfitShareEntries({}); 
    }
  }, [selectedDate, technicianStaffList, calculateRevenueAndPopulateEntries]);


  const handleSaveEntry = async (staffId: string) => {
    const staff = technicianStaffList.find(s => s.id === staffId);
    // Get the calculated/current values from state, not from a form input directly
    const entryFromState = profitShareEntries[staffId]; 
    if (!staff || !entryFromState) return;

    setProfitShareEntries(prev => ({ ...prev, [staffId]: { ...prev[staffId], isLoadingSave: true }}));

    // Data to save is the snapshot from the current state calculation
    const dataToSave: Omit<DailyProfitShareEntry, 'id' | 'createdAt' | 'updatedAt' | 'paidAt'> & { paidAt?: Timestamp } = {
      staffId: staff.id,
      staffName: staff.name,
      date: formatDateForFirestore(selectedDate),
      staffDailyRevenue: entryFromState.staffDailyRevenue, 
      profitSharePercentage: entryFromState.profitSharePercentage,
      profitShareAmount: entryFromState.profitShareAmount,
      status: entryFromState.status || 'Belum Dibayar',
    };
    if(entryFromState.paidAt) dataToSave.paidAt = entryFromState.paidAt;


    try {
      const docIdToUse = entryFromState.existingEntryId || doc(collection(db, 'dailyProfitShares')).id;
      const docRef = doc(db, 'dailyProfitShares', docIdToUse);

      if (entryFromState.existingEntryId) {
        await updateDoc(docRef, { ...dataToSave, updatedAt: serverTimestamp() });
        toast({ title: "Sukses", description: `Bagi hasil untuk ${staff.name} berhasil diperbarui.` });
      } else {
        await setDoc(docRef, { ...dataToSave, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        // After first save, update local state with the new existingEntryId
        setProfitShareEntries(prev => ({
            ...prev,
            [staffId]: { ...prev[staffId], existingEntryId: docRef.id }
        }));
        toast({ title: "Sukses", description: `Bagi hasil untuk ${staff.name} berhasil disimpan.` });
      }
      // Re-fetch to ensure consistency, especially if status or other details might change server-side
      // or if revenue calculation logic changes for saved entries
      await calculateRevenueAndPopulateEntries(selectedDate); 
    } catch (error) {
      console.error("Error saving profit share entry: ", error);
      toast({ title: "Error", description: "Gagal menyimpan data bagi hasil.", variant: "destructive" });
    } finally {
       setProfitShareEntries(prev => ({ ...prev, [staffId]: { ...prev[staffId], isLoadingSave: false }}));
    }
  };

  const handleMarkAsPaid = async (staffId: string) => {
    const staff = technicianStaffList.find(s => s.id === staffId);
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
        [staffId]: { ...prev[staffId], status: 'Dibayar', paidAt: Timestamp.now(), isLoadingPay: false }
      }));
    } catch (error) {
      console.error("Error marking as paid: ", error);
      toast({ title: "Error", description: "Gagal menandai sebagai dibayar.", variant: "destructive" });
      setProfitShareEntries(prev => ({ ...prev, [staffId]: { ...prev[staffId], isLoadingPay: false }}));
    }
  };
  
  const currentDay = new Date();
  const isTodaySelected = selectedDate.toDateString() === currentDay.toDateString();
  // Check if selectedDate is strictly before today (ignoring time part)
  const isPastDateSelected = startOfDay(selectedDate) < startOfDay(currentDay);


  if (loadingStaff) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Bagi Hasil Harian Teknisi" />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat daftar teknisi...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Bagi Hasil Harian Teknisi" />
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
                disabled={(date) => date > new Date()} 
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Entri Bagi Hasil untuk {formatDateFns(selectedDate, 'PPP', { locale: indonesiaLocale })}</CardTitle>
              <CardDescription>
                Pendapatan harian dihitung dari transaksi layanan teknisi yang telah dibayar pada tanggal terpilih. Persentase dari profil staf.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingEntriesAndRevenue ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2">Menghitung pendapatan dan memuat data bagi hasil...</p>
                </div>
              ) : technicianStaffList.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">Tidak ada staf teknisi terdaftar.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Teknisi</TableHead>
                      <TableHead className="w-[180px]">Pendapatan Harian (Rp)</TableHead>
                      <TableHead className="w-[150px]">Bagi Hasil (%)</TableHead>
                      <TableHead className="w-[180px]">Nominal Bagi Hasil (Rp)</TableHead>
                      <TableHead className="text-center w-[120px]">Status</TableHead>
                      <TableHead className="text-right w-[150px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {technicianStaffList.map((staff) => {
                      const entry = profitShareEntries[staff.id] || { 
                          staffDailyRevenue: 0, 
                          profitSharePercentage: staff.profitSharePercentage || 0, 
                          profitShareAmount: 0, 
                          status: 'Belum Dibayar',
                          isLoadingSave: false,
                          isLoadingPay: false,
                       };
                      const isPaid = entry.status === 'Dibayar';
                      // Disable save if date is past AND entry not paid. Allow saving for today.
                      // Disable pay if date is past AND entry not paid. Allow paying for today.
                      // If paid, all actions disabled.
                      const canEditOrPayToday = isTodaySelected && !isPaid;
                      const canViewOnlyPastUnpaid = isPastDateSelected && !isPaid;
                      const canViewOnlyPaid = isPaid;

                      const disableSaveButton = canViewOnlyPaid || canViewOnlyPastUnpaid || entry.isLoadingSave || entry.isLoadingPay;
                      const disablePayButton = canViewOnlyPaid || canViewOnlyPastUnpaid || entry.isLoadingSave || entry.isLoadingPay || (!entry.existingEntryId && !isPaid) ;

                      return (
                        <TableRow key={staff.id}>
                          <TableCell className="font-medium">{staff.name}</TableCell>
                          <TableCell>
                            <div className="relative">
                               <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                type="text"
                                value={entry.staffDailyRevenue.toLocaleString('id-ID')}
                                readOnly
                                className="pl-8 bg-muted/50"
                                />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="relative">
                                <PercentIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    value={String(entry.profitSharePercentage)}
                                    readOnly
                                    className="pl-8 bg-muted/50"
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
                                    className="bg-muted pl-8 font-semibold"
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
                                disabled={disableSaveButton}
                                variant="outline"
                            >
                              {entry.isLoadingSave ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            </Button>
                            <Button 
                                size="sm" 
                                variant={isPaid ? "secondary" : "default"}
                                onClick={() => handleMarkAsPaid(staff.id)} 
                                disabled={disablePayButton}
                                className={!isPaid && !disablePayButton ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                            >
                              {entry.isLoadingPay ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                     {technicianStaffList.length > 0 && Object.keys(profitShareEntries).length === 0 && !loadingEntriesAndRevenue && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground py-4">
                                Tidak ada transaksi layanan oleh teknisi pada tanggal ini atau data bagi hasil belum ada.
                            </TableCell>
                        </TableRow>
                     )}
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
    
