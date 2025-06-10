
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Banknote, FileText, Download, Loader2, Eye, CheckCircle, Save, UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, doc, updateDoc, addDoc, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller, useWatch, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { StaffMember } from '@/types/staff';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PayrollEntry {
  id: string;
  staffId: string;
  staffName: string;
  period: string;
  baseSalary: number;
  // profitShare: number; // Dihapus
  totalHours?: number; 
  deductions?: number; 
  netPay: number;
  status: 'Tertunda' | 'Dibayar' | 'Dibuat';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  paidAt?: Timestamp;
}

const payrollFormSchema = z.object({
  staffId: z.string().min(1, "Staf harus dipilih"),
  baseSalary: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number({ invalid_type_error: "Gaji pokok harus angka" }).nonnegative("Gaji pokok tidak boleh negatif")
  ),
  // profitShare: z.preprocess( // Dihapus
  //   (val) => parseFloat(String(val)),
  //   z.number({ invalid_type_error: "Bagi hasil harus angka" }).nonnegative("Bagi hasil tidak boleh negatif")
  // ),
  totalHours: z.preprocess(
    (val) => val ? parseFloat(String(val)) : undefined,
    z.number({ invalid_type_error: "Total jam harus angka" }).nonnegative("Total jam tidak boleh negatif").optional()
  ),
  deductions: z.preprocess(
    (val) => val ? parseFloat(String(val)) : undefined,
    z.number({ invalid_type_error: "Potongan harus angka" }).nonnegative("Potongan tidak boleh negatif").optional()
  ),
});

type PayrollFormData = z.infer<typeof payrollFormSchema>;

interface CreatePayrollDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PayrollFormData & { staffName: string; period: string; status: PayrollEntry['status'], netPay: number }) => Promise<void>;
  staffList: StaffMember[];
  selectedPeriod: string;
  isSubmitting: boolean;
  loadingStaff: boolean;
}

function CalculatedNetPay({ control }: { control: Control<PayrollFormData & { netPay?: number }> }) {
  const baseSalary = useWatch({ control, name: 'baseSalary' });
  // const profitShare = useWatch({ control, name: 'profitShare' }); // Dihapus
  const deductions = useWatch({ control, name: 'deductions' });

  const netPay = (baseSalary || 0) - (deductions || 0); // Dihapus profitShare dari perhitungan

  return (
    <div className="mt-4">
      <Label>Gaji Bersih (Dihitung Otomatis)</Label>
      <Input type="text" value={`Rp ${netPay.toLocaleString('id-ID')}`} readOnly className="mt-1 bg-muted" />
    </div>
  );
}

function CreatePayrollDialog({ isOpen, onClose, onSubmit, staffList, selectedPeriod, isSubmitting, loadingStaff }: CreatePayrollDialogProps) {
  const form = useForm<PayrollFormData & { staffName: string; period: string; netPay: number; status: PayrollEntry['status'] }>({
    resolver: zodResolver(payrollFormSchema),
    defaultValues: { 
      staffId: '',
      staffName: '',
      period: selectedPeriod,
      baseSalary: 0,
      // profitShare: 0, // Dihapus
      totalHours: 0,
      deductions: 0,
      netPay: 0,
      status: 'Dibuat',
    },
  });

  const selectedStaffId = form.watch('staffId');

  useEffect(() => {
    if (selectedStaffId) {
      const staff = staffList.find(s => s.id === selectedStaffId);
      if (staff) {
        form.setValue('baseSalary', staff.baseSalary || 0);
        // Perhitungan profitShare dihapus dari sini
      }
    }
  }, [selectedStaffId, staffList, form]);


  useEffect(() => {
    if (isOpen) {
      form.reset({
        staffId: '',
        staffName: '',
        period: selectedPeriod,
        baseSalary: 0,
        // profitShare: 0, // Dihapus
        totalHours: 0,
        deductions: 0,
        netPay: 0,
        status: 'Dibuat',
      });
    }
  }, [isOpen, selectedPeriod, form]);

  const internalSubmit = form.handleSubmit(async (data) => {
    const selectedStaffMember = staffList.find(s => s.id === data.staffId);
    if (!selectedStaffMember) {
        toast({ title: "Error", description: "Staf tidak ditemukan.", variant: "destructive"});
        return;
    }
    const calculatedNetPay = (data.baseSalary || 0) - (data.deductions || 0); // Dihapus profitShare
    await onSubmit({ ...data, staffName: selectedStaffMember.name, period: selectedPeriod, status: 'Dibuat', netPay: calculatedNetPay });
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Buat Entri Penggajian Baru</DialogTitle>
          <DialogDescription>
            Periode: {selectedPeriod}. Isi detail di bawah ini.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={internalSubmit} className="space-y-4 py-2 pb-4">
            <FormField
              control={form.control}
              name="staffId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Staf</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      const staff = staffList.find(s => s.id === value);
                      if (staff) {
                        form.setValue('baseSalary', staff.baseSalary || 0);
                        // Perhitungan profitShare dihapus
                      }
                    }} 
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
                        <SelectItem value="no-staff" disabled>Tidak ada staf terdaftar.</SelectItem>
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
            <FormField
              control={form.control}
              name="baseSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gaji Pokok (Rp)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="mis. 3000000" {...field} 
                           onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* FormField untuk profitShare dihapus */}
            <FormField
              control={form.control}
              name="totalHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Jam Kerja (Opsional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="mis. 160" {...field} 
                           onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deductions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potongan (Rp, Opsional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="mis. 100000" {...field} 
                           onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CalculatedNetPay control={form.control as Control<PayrollFormData & { netPay?: number }>} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Batal</Button>
              <Button type="submit" disabled={isSubmitting || loadingStaff || staffList.length === 0} className="bg-accent text-accent-foreground hover:bg-accent/90">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Simpan Entri
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface DetailPayrollDialogProps {
  isOpen: boolean;
  onClose: () => void;
  entry: PayrollEntry | null;
}

function DetailPayrollDialog({ isOpen, onClose, entry }: DetailPayrollDialogProps) {
  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detail Penggajian: {entry.staffName}</DialogTitle>
          <DialogDescription>Periode: {entry.period}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2 text-sm">
          <div className="flex justify-between"><span>Gaji Pokok:</span> <span>Rp {entry.baseSalary.toLocaleString('id-ID')}</span></div>
          {/* Tampilan Bagi Hasil dihapus */}
          <div className="flex justify-between"><span>Total Jam:</span> <span>{entry.totalHours ? `${entry.totalHours} jam` : 'N/A'}</span></div>
          <div className="flex justify-between"><span>Potongan:</span> <span>Rp {(entry.deductions || 0).toLocaleString('id-ID')}</span></div>
          <hr/>
          <div className="flex justify-between font-semibold"><span>Gaji Bersih:</span> <span>Rp {entry.netPay.toLocaleString('id-ID')}</span></div>
          <hr/>
          <div className="flex justify-between"><span>Status:</span> <span>{entry.status}</span></div>
          {entry.paidAt && <div className="flex justify-between"><span>Tgl. Bayar:</span> <span>{entry.paidAt.toDate().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>}
          <div className="flex justify-between text-xs text-muted-foreground"><span>Dibuat:</span> <span>{entry.createdAt?.toDate().toLocaleString('id-ID')}</span></div>
          <div className="flex justify-between text-xs text-muted-foreground"><span>Diperbarui:</span> <span>{entry.updatedAt?.toDate().toLocaleString('id-ID')}</span></div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Tutup</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function PayrollPage() {
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);
  const [loadingPayroll, setLoadingPayroll] = useState(true);
  const availablePeriods = ['Agustus 2024', 'Juli 2024', 'Juni 2024', 'Mei 2024', 'April 2024', 'Maret 2024'];
  const [selectedPeriod, setSelectedPeriod] = useState<string>(availablePeriods[0] || 'Periode Tidak Tersedia');
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);
  
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedEntryForDetail, setSelectedEntryForDetail] = useState<PayrollEntry | null>(null);

  const [isConfirmPaidOpen, setIsConfirmPaidOpen] = useState(false);
  const [entryToPay, setEntryToPay] = useState<PayrollEntry | null>(null);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(true);

  const { toast } = useToast();

  const [isPayButtonEnabled, setIsPayButtonEnabled] = useState(false);

  useEffect(() => {
    const today = new Date();
    const currentDayOfMonth = today.getDate();
    setIsPayButtonEnabled(currentDayOfMonth >= 28);
  }, []); 

  const fetchStaffList = useCallback(async () => {
    setLoadingStaff(true);
    try {
      const staffCollectionRef = collection(db, 'staffMembers');
      const q = query(staffCollectionRef, orderBy("name"));
      const querySnapshot = await getDocs(q);
      const membersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
      setStaffList(membersData);
    } catch (error) {
      console.error("Error fetching staff list: ", error);
      toast({
        title: "Error",
        description: "Tidak dapat mengambil daftar staf.",
        variant: "destructive",
      });
      setStaffList([]);
    } finally {
      setLoadingStaff(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStaffList();
  }, [fetchStaffList]);

  const fetchPayrollData = useCallback(async (period: string) => {
    setLoadingPayroll(true);
    try {
      const payrollCollectionRef = collection(db, 'payrollData');
      const q = query(payrollCollectionRef, where("period", "==", period), orderBy("staffName"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(docSnap => ({ 
          id: docSnap.id, 
          ...docSnap.data(), 
          createdAt: docSnap.data().createdAt || Timestamp.now(), 
          updatedAt: docSnap.data().updatedAt || Timestamp.now() 
        } as PayrollEntry));
      setPayrollData(data);
    } catch (error) {
      console.error("Error fetching payroll data: ", error);
      toast({
        title: "Error",
        description: "Tidak dapat mengambil data penggajian.",
        variant: "destructive",
      });
    } finally {
      setLoadingPayroll(false);
    }
  }, [toast]);

  useEffect(() => {
    if (selectedPeriod && selectedPeriod !== 'Periode Tidak Tersedia' && !loadingStaff && staffList.length > 0) {
      const autoCreatePayrollEntries = async () => {
        setLoadingPayroll(true); 
        const batch = writeBatch(db);
        let entriesCreatedCount = 0;
        
        const currentPayrollCollectionRef = collection(db, 'payrollData');
        const q = query(currentPayrollCollectionRef, where("period", "==", selectedPeriod));
        const currentPeriodPayrollSnapshot = await getDocs(q);
        const existingEntriesForPeriod = currentPeriodPayrollSnapshot.docs.map(d => d.data() as PayrollEntry);

        for (const staff of staffList) {
          const existingEntry = existingEntriesForPeriod.find(p => p.staffId === staff.id && p.period === selectedPeriod);
          if (!existingEntry) {
            const baseSalary = staff.baseSalary || 0;
            // profitShare tidak lagi dihitung di sini
            const netPay = baseSalary; // Awalnya netPay = baseSalary, deductions dan hours 0

            const newEntryData: Omit<PayrollEntry, 'id' | 'createdAt' | 'updatedAt' | 'paidAt'> = {
              staffId: staff.id,
              staffName: staff.name,
              period: selectedPeriod,
              baseSalary: baseSalary,
              // profitShare: 0, // Dihapus
              totalHours: 0,
              deductions: 0,
              netPay: netPay,
              status: 'Dibuat',
            };
            const newDocRef = doc(collection(db, 'payrollData'));
            batch.set(newDocRef, { ...newEntryData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
            entriesCreatedCount++;
          }
        }

        if (entriesCreatedCount > 0) {
          try {
            await batch.commit();
            toast({ title: "Info", description: `${entriesCreatedCount} entri penggajian dasar berhasil dibuat otomatis.` });
          } catch (error) {
            console.error("Error auto-creating payroll entries: ", error);
            toast({ title: "Error", description: "Gagal membuat entri penggajian otomatis.", variant: "destructive" });
          }
        }
        fetchPayrollData(selectedPeriod); 
      };
      autoCreatePayrollEntries();
    } else if (selectedPeriod && selectedPeriod !== 'Periode Tidak Tersedia') {
        fetchPayrollData(selectedPeriod); 
    } else {
      setPayrollData([]); 
      setLoadingPayroll(false);
    }
  }, [selectedPeriod, staffList, loadingStaff, fetchPayrollData, toast]);


  const handleCreatePayrollSubmit = async (data: PayrollFormData & { staffName: string; period: string; status: PayrollEntry['status'], netPay: number }) => {
    setIsSubmittingCreate(true);
    try {
      const newEntry: Omit<PayrollEntry, 'id' | 'createdAt' | 'updatedAt'> = {
        staffId: data.staffId,
        staffName: data.staffName,
        period: data.period,
        baseSalary: data.baseSalary,
        // profitShare: 0, // Dihapus
        totalHours: data.totalHours,
        deductions: data.deductions,
        netPay: data.netPay,
        status: data.status,
      };
      await addDoc(collection(db, 'payrollData'), {
        ...newEntry,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({ title: "Sukses", description: `Entri penggajian untuk ${data.staffName} berhasil dibuat.` });
      setIsCreateDialogOpen(false);
      fetchPayrollData(selectedPeriod);
    } catch (error) {
      console.error("Error creating payroll entry: ", error);
      toast({ title: "Error", description: "Gagal membuat entri penggajian.", variant: "destructive" });
    } finally {
      setIsSubmittingCreate(false);
    }
  };

  const handleOpenDetailDialog = (entry: PayrollEntry) => {
    setSelectedEntryForDetail(entry);
    setIsDetailDialogOpen(true);
  };

  const handleConfirmPay = (entry: PayrollEntry) => {
    setEntryToPay(entry);
    setIsConfirmPaidOpen(true);
  };

  const processPayment = async () => {
    if (!entryToPay) return;
    setIsSubmittingPayment(true);
    try {
      const entryDocRef = doc(db, 'payrollData', entryToPay.id);
      await updateDoc(entryDocRef, {
        status: 'Dibayar',
        paidAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({ title: "Sukses", description: `Penggajian untuk ${entryToPay.staffName} telah ditandai sebagai Dibayar.` });
      setIsConfirmPaidOpen(false);
      fetchPayrollData(selectedPeriod);
    } catch (error) {
      console.error("Error marking as paid: ", error);
      toast({ title: "Error", description: "Gagal memperbarui status penggajian.", variant: "destructive" });
    } finally {
      setIsSubmittingPayment(false);
      setEntryToPay(null);
    }
  };

  if (loadingPayroll && payrollData.length === 0 && selectedPeriod === 'Periode Tidak Tersedia') {
    // Initial state, don't show main loader
  } else if ((loadingPayroll || loadingStaff) && (selectedPeriod !== 'Periode Tidak Tersedia')) { 
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Penggajian Staf" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Penggajian Staf" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manajemen Penggajian</CardTitle>
              <CardDescription>Kelola dan proses penggajian staf.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pilih Periode" />
                </SelectTrigger>
                <SelectContent>
                  {availablePeriods.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                   {availablePeriods.length === 0 && <SelectItem value="no-period" disabled>Tidak ada periode</SelectItem>}
                </SelectContent>
              </Select>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)} 
                disabled={selectedPeriod === 'Periode Tidak Tersedia' || loadingStaff}
              >
                {(loadingStaff && isCreateDialogOpen) || (loadingStaff && !isCreateDialogOpen && selectedPeriod !== 'Periode Tidak Tersedia' && staffList.length === 0) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />} 
                Buat Manual
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loadingPayroll && selectedPeriod !== 'Periode Tidak Tersedia' ? (
                 <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-2">Memuat data untuk {selectedPeriod}...</p>
                </div>
            ) : payrollData.length === 0 || selectedPeriod === 'Periode Tidak Tersedia' ? (
                <div className="text-center py-10 text-muted-foreground">
                    {selectedPeriod === 'Periode Tidak Tersedia' ? 'Silakan pilih periode untuk melihat data penggajian.' : `Tidak ada data penggajian untuk periode ${selectedPeriod}. Entri dasar mungkin dibuat otomatis jika ada staf.`}
                </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Staf</TableHead>
                    <TableHead className="text-right">Gaji Pokok</TableHead>
                    {/* Kolom Bagi Hasil dihapus */}
                    <TableHead className="text-right">Gaji Bersih</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.staffName}</TableCell>
                      <TableCell className="text-right">Rp {entry.baseSalary.toLocaleString('id-ID')}</TableCell>
                      {/* Sel Bagi Hasil dihapus */}
                      <TableCell className="text-right font-semibold">Rp {entry.netPay.toLocaleString('id-ID')}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${entry.status === 'Dibayar' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : entry.status === 'Tertunda' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}>
                          {entry.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDetailDialog(entry)} className="hover:text-primary">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {(entry.status === 'Tertunda' || entry.status === 'Dibuat') && (
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleConfirmPay(entry)} 
                                  disabled={!isPayButtonEnabled}
                                  className={isPayButtonEnabled ? "text-green-600 hover:text-green-700" : "text-muted-foreground cursor-not-allowed"}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              {!isPayButtonEnabled && (
                                <TooltipContent>
                                  <p>Pembayaran dapat dilakukan mulai tanggal 28.</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="outline" disabled><Download className="mr-2 h-4 w-4" /> Ekspor Semua (Segera)</Button>
          </CardFooter>
        </Card>
      </main>

      <CreatePayrollDialog
        isOpen={isCreateDialogOpen}
        onClose={() => {
          setIsCreateDialogOpen(false);
        }}
        onSubmit={handleCreatePayrollSubmit}
        staffList={staffList}
        selectedPeriod={selectedPeriod}
        isSubmitting={isSubmittingCreate}
        loadingStaff={loadingStaff}
      />

      <DetailPayrollDialog
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        entry={selectedEntryForDetail}
      />
      
      <AlertDialog open={isConfirmPaidOpen} onOpenChange={(open) => {if(!open) {setIsConfirmPaidOpen(false); setEntryToPay(null);}}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Pembayaran</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menandai penggajian untuk "{entryToPay?.staffName}" periode "{entryToPay?.period}" sebagai Dibayar?
              Tindakan ini akan mencatat tanggal pembayaran.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {setEntryToPay(null); setIsConfirmPaidOpen(false);}} disabled={isSubmittingPayment}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={processPayment} disabled={isSubmittingPayment || !isPayButtonEnabled} className={buttonVariants({ className: "bg-green-600 hover:bg-green-700" })}>
              {isSubmittingPayment ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Ya, Tandai Dibayar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
