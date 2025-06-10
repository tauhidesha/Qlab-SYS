
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Save, CheckCircle, Eye, X } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, doc, query, where, getDocs, setDoc, updateDoc, serverTimestamp, Timestamp, orderBy } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { StaffMember } from '@/types/staff';
import type { DailyProfitShareEntry } from '@/types/profitSharing';
import type { Transaction, TransactionItem } from '@/types/transaction';
import { id as indonesiaLocale } from 'date-fns/locale';
import { format as formatDateFns, startOfDay, endOfDay } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProfitShareFormState {
  staffDailyRevenue: number;
  profitSharePercentage: number;
  profitShareAmount: number;
  contributingItems: TransactionItem[]; 
  existingEntryId?: string;
  status: 'Belum Dibayar' | 'Dibayar';
  paidAt?: Timestamp;
  isLoadingSave: boolean;
  isLoadingPay: boolean;
}

interface ProfitShareDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  entryData?: ProfitShareFormState & { staffName: string; date: string };
}

function ProfitShareDetailDialog({ isOpen, onClose, entryData }: ProfitShareDetailDialogProps) {
  if (!isOpen || !entryData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Bagi Hasil: {entryData.staffName}</DialogTitle>
          <DialogDescription>
            Tanggal: {formatDateFns(new Date(entryData.date), 'PPP', { locale: indonesiaLocale })}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Card className="bg-muted/50">
            <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Total Pendapatan Harian:</p>
                <p className="font-semibold">Rp {entryData.staffDailyRevenue.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Persentase Bagi Hasil:</p>
                <p className="font-semibold">{entryData.profitSharePercentage}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Nominal Bagi Hasil (Total):</p>
                <p className="font-semibold text-primary">Rp {entryData.profitShareAmount.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status:</p>
                <p className={`font-semibold ${entryData.status === 'Dibayar' ? 'text-green-600' : 'text-yellow-600'}`}>{entryData.status}</p>
              </div>
            </CardContent>
          </Card>
          
          <h4 className="font-medium text-md mt-4">Rincian Transaksi Kontribusi:</h4>
          {entryData.contributingItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">Tidak ada transaksi layanan yang berkontribusi pada pendapatan harian staf ini.</p>
          ) : (
            <ScrollArea className="h-[250px] border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Layanan</TableHead>
                    <TableHead className="text-right">Harga Satuan</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Subtotal Layanan</TableHead>
                    <TableHead className="text-right">Est. Bagi Hasil Item</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entryData.contributingItems.map((item, index) => {
                    const itemSubtotal = (item.price || 0) * (item.quantity || 1);
                    const itemProfitShare = (itemSubtotal * entryData.profitSharePercentage) / 100;
                    return (
                      <TableRow key={`${item.id}-${index}`}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">Rp {(item.price || 0).toLocaleString('id-ID')}</TableCell>
                        <TableCell className="text-center">{item.quantity || 1}</TableCell>
                        <TableCell className="text-right">Rp {itemSubtotal.toLocaleString('id-ID')}</TableCell>
                        <TableCell className="text-right">Rp {itemProfitShare.toLocaleString('id-ID')}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default function ProfitSharingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [technicianStaffList, setTechnicianStaffList] = useState<StaffMember[]>([]);
  const [profitShareEntries, setProfitShareEntries] = useState<Record<string, ProfitShareFormState>>({});
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [loadingEntriesAndRevenue, setLoadingEntriesAndRevenue] = useState(false);

  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedStaffEntryForDetail, setSelectedStaffEntryForDetail] = useState<ProfitShareFormState & { staffName: string; date: string } | undefined>(undefined);


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
        let staffDailyRevenueFromTransactions = 0;
        const contributingItems: TransactionItem[] = [];

        paidTransactions.forEach(transaction => {
          if (transaction.items && Array.isArray(transaction.items)) {
            transaction.items.forEach(item => {
              if (item.type === 'service' && item.staffName === staff.name) {
                const itemSubtotal = (item.price || 0) * (item.quantity || 1);
                staffDailyRevenueFromTransactions += itemSubtotal;
                contributingItems.push(item);
              }
            });
          }
        });
        
        const existingEntryFromDb = existingDbEntries.find(e => e.staffId === staff.id);
        const staffProfileProfitSharePercentage = staff.profitSharePercentage || 0;

        if (existingEntryFromDb) {
          newEntriesState[staff.id] = {
            staffDailyRevenue: existingEntryFromDb.staffDailyRevenue, // Gunakan revenue tersimpan
            profitSharePercentage: existingEntryFromDb.profitSharePercentage, // Gunakan persentase tersimpan
            profitShareAmount: existingEntryFromDb.profitShareAmount, // Gunakan nominal tersimpan
            contributingItems: contributingItems, // Selalu ambil item kontribusi live untuk dialog
            existingEntryId: existingEntryFromDb.id,
            status: existingEntryFromDb.status,
            paidAt: existingEntryFromDb.paidAt,
            isLoadingSave: false,
            isLoadingPay: false,
          };
        } else {
          // Jika tidak ada entri tersimpan, hitung berdasarkan transaksi hari ini dan profil staf
          const profitShareAmountCalculated = (staffDailyRevenueFromTransactions * staffProfileProfitSharePercentage) / 100;
          newEntriesState[staff.id] = {
            staffDailyRevenue: staffDailyRevenueFromTransactions,
            profitSharePercentage: staffProfileProfitSharePercentage,
            profitShareAmount: profitShareAmountCalculated,
            contributingItems: contributingItems,
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
    const entryFromState = profitShareEntries[staffId]; 
    if (!staff || !entryFromState) return;

    setProfitShareEntries(prev => ({ ...prev, [staffId]: { ...prev[staffId], isLoadingSave: true }}));

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
        setProfitShareEntries(prev => ({
            ...prev,
            [staffId]: { ...prev[staffId], existingEntryId: docRef.id }
        }));
        toast({ title: "Sukses", description: `Bagi hasil untuk ${staff.name} berhasil disimpan.` });
      }
      // Tidak perlu memanggil calculateRevenueAndPopulateEntries lagi di sini karena data yang disimpan
      // adalah snapshot dari state saat ini. Cukup update state lokal jika perlu (seperti existingEntryId).
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
  
  const handleOpenDetailDialog = (staffId: string) => {
    const staffMember = technicianStaffList.find(s => s.id === staffId);
    const entry = profitShareEntries[staffId];
    if (staffMember && entry) {
      setSelectedStaffEntryForDetail({
        ...entry,
        staffName: staffMember.name,
        date: formatDateForFirestore(selectedDate), // Kirim tanggal yang dipilih ke dialog
      });
      setIsDetailDialogOpen(true);
    } else {
        toast({title: "Info", description: "Data detail untuk staf ini belum siap atau tidak ditemukan.", variant:"default"});
    }
  };

  const currentDay = new Date();
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
                Nominal bagi hasil dihitung dari total pendapatan layanan staf pada tanggal terpilih dikali persentase bagi hasil dari profil staf.
                Klik nama teknisi untuk melihat rincian transaksi kontribusi.
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
                      <TableHead className="text-right">Nominal Bagi Hasil (Rp)</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {technicianStaffList.map((staff) => {
                      const entry = profitShareEntries[staff.id] || { 
                          staffDailyRevenue: 0, 
                          profitSharePercentage: staff.profitSharePercentage || 0, 
                          profitShareAmount: 0, 
                          contributingItems: [],
                          status: 'Belum Dibayar',
                          isLoadingSave: false,
                          isLoadingPay: false,
                       };
                      const isPaid = entry.status === 'Dibayar';
                      const disableActions = isPaid || (isPastDateSelected && !entry.existingEntryId);
                      const disableSaveButton = disableActions || entry.isLoadingSave || entry.isLoadingPay;
                      const disablePayButton = disableActions || !entry.existingEntryId || entry.isLoadingSave || entry.isLoadingPay;


                      return (
                        <TableRow key={staff.id}>
                          <TableCell className="font-medium">
                            <Button variant="link" className="p-0 h-auto text-left" onClick={() => handleOpenDetailDialog(staff.id)}>
                              {staff.name}
                            </Button>
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            Rp {entry.profitShareAmount.toLocaleString('id-ID')}
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
                                    {formatDateFns(entry.paidAt.toDate(), 'dd MMM yy, HH:mm', {locale: indonesiaLocale})}
                                </p>
                            )}
                          </TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button 
                                size="sm" 
                                onClick={() => handleSaveEntry(staff.id)} 
                                disabled={disableSaveButton}
                                variant="outline"
                                title={entry.existingEntryId ? "Perbarui Data Tersimpan" : "Simpan Data Hari Ini"}
                            >
                              {entry.isLoadingSave ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            </Button>
                            <Button 
                                size="sm" 
                                variant={isPaid ? "secondary" : "default"}
                                onClick={() => handleMarkAsPaid(staff.id)} 
                                disabled={disablePayButton}
                                className={!isPaid && !disablePayButton ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                                title="Tandai Sudah Dibayar"
                            >
                              {entry.isLoadingPay ? <Loader2 className="h-4 w-4 animate-spin" /> : (isPaid ? <CheckCircle className="h-4 w-4 text-green-700" /> : <CheckCircle className="h-4 w-4" />)}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                     {technicianStaffList.length > 0 && Object.keys(profitShareEntries).length === 0 && !loadingEntriesAndRevenue && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground py-4">
                                Tidak ada transaksi layanan oleh teknisi pada tanggal ini atau data bagi hasil belum ada.
                            </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground">
                    { isPastDateSelected ? "Data pada tanggal lampau bersifat historis. " : "" }
                </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <ProfitShareDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        entryData={selectedStaffEntryForDetail}
      />
    </div>
  );
}
    
