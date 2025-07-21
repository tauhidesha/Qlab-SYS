
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Banknote, FileText, Download, Loader2, Eye, CheckCircle, Save, UserPlus, Percent } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, doc, updateDoc, addDoc, serverTimestamp, Timestamp, writeBatch, getDoc, limit, DocumentData, deleteField } from 'firebase/firestore';
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
import type { ExpenseFormData, ExpenseCategory, PaymentSource } from '@/types/expense';
import type { PayrollEntry } from '@/types/payroll';
import type { DailyProfitShareEntry } from '@/types/profitSharing';
import { id as indonesiaLocale } from 'date-fns/locale';
import { format as formatDateFns, getDaysInMonth, getDate, getDay, parseISO, startOfDay, endOfDay, subMonths } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { AttendanceRecord } from '@/types/attendance';


// Ganti skema Anda dengan versi yang lebih eksplisit ini
const payrollFormSchema = z.object({
  staffId: z.string().min(1, "Staf harus dipilih"),
  baseSalary: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number({ required_error: "Gaji pokok wajib diisi", invalid_type_error: "Gaji pokok harus angka" })
  ),
  totalHours: z.preprocess(
    (val) => val ? parseFloat(String(val)) : undefined,
    z.number().nonnegative().optional()
  ),
  manualDeductions: z.preprocess(
    (val) => val ? parseFloat(String(val)) : undefined,
    z.number().nonnegative().optional()
  ),

  // Jadikan field tambahan ini eksplisit sebagai field yang wajib
  staffName: z.string(), // z.string() sudah wajib secara default
  period: z.string(),
  netPay: z.number(),
  status: z.enum(['Dibuat', 'Tertunda', 'Dibayar']),
  totalDeductions: z.number(),
});

type PayrollFormData = z.infer<typeof payrollFormSchema>;

interface CreatePayrollDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PayrollFormData & { staffName: string; period: string; status: PayrollEntry['status'], netPay: number, totalDeductions: number }) => Promise<void>;
  staffList: StaffMember[];
  selectedPeriod: string;
  isSubmitting: boolean;
  loadingStaff: boolean;
}

function CalculatedNetPayInDialog({ control }: { control: Control<PayrollFormData & { netPay?: number }> }) {
  const baseSalary = useWatch({ control, name: 'baseSalary' });
  const manualDeductions = useWatch({ control, name: 'manualDeductions' });

  const netPay = (baseSalary || 0) - (manualDeductions || 0);

  return (
    <div className="mt-4">
      <Label>Gaji Bersih (Sebelum Potongan Otomatis)</Label>
      <Input type="text" value={`Rp ${netPay.toLocaleString('id-ID')}`} readOnly className="mt-1 bg-muted" />
      <p className="text-xs text-muted-foreground mt-1">Potongan absensi/keterlambatan akan dihitung saat disimpan.</p>
    </div>
  );
}

function CreatePayrollDialog({ isOpen, onClose, onSubmit, staffList, selectedPeriod, isSubmitting, loadingStaff }: CreatePayrollDialogProps) {
   const { toast } = useToast();
   const form = useForm<PayrollFormData>({
  resolver: zodResolver(payrollFormSchema),
  defaultValues: {
    staffId: '',
    staffName: '',
    period: selectedPeriod,
    baseSalary: 0,
    totalHours: undefined,
    manualDeductions: undefined,
    netPay: 0,
    status: 'Dibuat',
    totalDeductions: 0,
  },
});

  const selectedStaffId = form.watch('staffId');

  useEffect(() => {
    if (selectedStaffId) {
      const staff = staffList.find(s => s.id === selectedStaffId);
      if (staff) {
        form.setValue('baseSalary', staff.baseSalary || 0);
      }
    } else {
      form.setValue('baseSalary', 0);
    }
  }, [selectedStaffId, staffList, form]);


  useEffect(() => {
    if (isOpen) {
      form.reset({
        staffId: '',
        staffName: '',
        period: selectedPeriod,
        baseSalary: 0,
        totalHours: undefined,
        manualDeductions: undefined,
        netPay: 0,
        status: 'Dibuat',
        totalDeductions: 0,
      });
    }
  }, [isOpen, selectedPeriod, form]);

  const internalSubmit = form.handleSubmit(async (data) => {
    const selectedStaffMember = staffList.find(s => s.id === data.staffId);
    if (!selectedStaffMember) {
        toast({ title: "Error", description: "Staf tidak ditemukan.", variant: "destructive"});
        return;
    }
    const initialNetPay = (data.baseSalary || 0) - (data.manualDeductions || 0);
    const initialTotalDeductions = data.manualDeductions || 0;
    await onSubmit({ ...data, staffName: selectedStaffMember.name, period: selectedPeriod, status: 'Dibuat', netPay: initialNetPay, totalDeductions: initialTotalDeductions });
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
              name="manualDeductions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potongan Manual Tambahan (Rp, Opsional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="mis. 100000" {...field}
                           onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CalculatedNetPayInDialog control={form.control as Control<PayrollFormData & { netPay?: number }>} />
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

interface ParsedCalculationDetail {
  date: string;
  formattedDate: string;
  events: string[];
}

const parseCalculationDetails = (details?: string): ParsedCalculationDetail[] => {
  if (!details || details.trim() === "Tidak ada potongan otomatis.") {
    return [{ date: "N/A", formattedDate: "N/A", events: ["Tidak ada potongan otomatis."] }];
  }

  const lines = details.trim().split('\n'); // Use single newline character
  const groupedByDate: Record<string, string[]> = {};

  lines.forEach(line => {
    const match = line.match(/^(\d{4}-\d{2}-\d{2}):\s*(.*)$/); // Regex to capture date and event
    if (match) {
      const date = match[1];
      const event = match[2];
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(event);
    } else if (line.trim() !== "") { // Handle lines that might not fit the regex (e.g., general notes)
        if (!groupedByDate["GeneralNotes"]) groupedByDate["GeneralNotes"] = [];
        groupedByDate["GeneralNotes"].push(line.trim());
    }
  });

  const parsedEntries = Object.entries(groupedByDate).map(([date, events]) => ({
    date,
    formattedDate: date === "GeneralNotes" ? "Catatan Umum" : formatDateFns(parseISO(date), 'dd MMM yyyy, EEEE', { locale: indonesiaLocale }),
    events,
  }));

  // Sort by date, keeping GeneralNotes potentially at the end or start if needed
  parsedEntries.sort((a, b) => {
    if (a.date === "GeneralNotes") return 1;
    if (b.date === "GeneralNotes") return -1;
    return parseISO(a.date).getTime() - parseISO(b.date).getTime();
  });

  return parsedEntries;
};


function DetailPayrollDialog({ isOpen, onClose, entry }: DetailPayrollDialogProps) {
  if (!entry) return null;

  const parsedDetails = parseCalculationDetails(entry.calculationDetails);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detail Penggajian: {entry.staffName}</DialogTitle>
          <DialogDescription>Periode: {entry.period}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2 text-sm">

          <div className="font-medium text-lg">Ringkasan Gaji</div>
          <div className="flex justify-between items-center">
            <span>Gaji Pokok:</span>
            <span className="font-semibold">Rp {entry.baseSalary.toLocaleString('id-ID')}</span>
          </div>
           {typeof entry.profitShareReceivedThisPeriod === 'number' && entry.profitShareReceivedThisPeriod > 0 && (
             <div className="flex justify-between items-center text-blue-600 dark:text-blue-400">
                <span>Bagi Hasil Harian Diterima:</span>
                <span className="font-semibold">Rp {entry.profitShareReceivedThisPeriod.toLocaleString('id-ID')}</span>
            </div>
           )}
           <div className="flex justify-between items-center">
            <span>Total Semua Potongan:</span>
            <span className="font-semibold text-red-600">Rp {(entry.totalDeductions || 0).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center font-bold text-xl mt-1 border-t pt-2">
            <span>GAJI BERSIH (DITRANSFER):</span>
            <span className="text-primary">Rp {entry.netPay.toLocaleString('id-ID')}</span>
          </div>

          {typeof entry.totalHours === 'number' && (
             <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                <span>Total Jam Kerja Tercatat:</span>
                <span>{entry.totalHours} jam</span>
            </div>
          )}
          <Separator className="my-3" />

          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-medium">
                Rincian Nilai Potongan (Total: Rp {(entry.totalDeductions || 0).toLocaleString('id-ID')})
              </AccordionTrigger>
              <AccordionContent className="space-y-1 pl-2">
                <div className="flex justify-between items-center">
                  <span>- Potongan Keterlambatan:</span>
                  <span className="text-red-600">Rp {(entry.latenessDeduction || 0).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>- Potongan Absensi:</span>
                  <span className="text-red-600">Rp {(entry.absenceDeduction || 0).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>- Potongan Telat Buka Toko:</span>
                  <span className="text-red-600">Rp {(entry.telatBukaDeduction || 0).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>- Potongan Manual Lainnya:</span>
                  <span className="text-red-600">Rp {(entry.manualDeductions || 0).toLocaleString('id-ID')}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
            {entry.calculationDetails && (
              <AccordionItem value="calculation-log-details">
                <AccordionTrigger className="text-base font-medium">Log Kalkulasi Potongan Otomatis</AccordionTrigger>
                <AccordionContent className="p-0">
                  <ScrollArea className="h-[200px] border rounded-md">
                    <Table className="text-xs">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[180px]">Tanggal</TableHead>
                          <TableHead>Keterangan</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parsedDetails.map((detailItem, index) => (
                          <TableRow key={`${detailItem.date}-${index}`}>
                            <TableCell className="font-medium align-top py-2">{detailItem.formattedDate}</TableCell>
                            <TableCell className="align-top py-2">
                              {detailItem.events.map((event, eventIndex) => (
                                <div key={eventIndex} className={eventIndex > 0 ? "mt-1" : ""}>{event}</div>
                              ))}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          <Separator className="my-3" />

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span>Status Pembayaran:</span>
              <span className={`font-medium ${entry.status === 'Dibayar' ? 'text-green-600' : 'text-yellow-600'}`}>
                {entry.status}
              </span>
            </div>
            {entry.paidAt && (
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Tanggal Pembayaran:</span>
                <span>{entry.paidAt.toDate().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            )}
          </div>

          <div className="mt-3 pt-2 border-t text-xs text-muted-foreground space-y-0.5">
             <div className="flex justify-between"><span>Dibuat:</span> <span>{entry.createdAt?.toDate().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span></div>
             <div className="flex justify-between"><span>Diperbarui:</span> <span>{entry.updatedAt?.toDate().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span></div>
          </div>

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

const parsePeriodToDateRange = (period: string): { startDate: Date, endDate: Date } | null => {
    const parts = period.split(" ");
    if (parts.length !== 2) return null;

    const monthName = parts[0];
    const year = parseInt(parts[1], 10);

    const monthNamesId = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const monthIndex = monthNamesId.findIndex(m => m.toLowerCase() === monthName.toLowerCase());

    if (monthIndex === -1 || isNaN(year)) return null;

    const startDate = new Date(year, monthIndex, 1);
    const endDate = endOfDay(new Date(year, monthIndex + 1, 0));
    return { startDate, endDate };
};

type PeriodLabel = string;
const generatePreviousMonthsLabels = (count: number): PeriodLabel[] => {
  const labels: PeriodLabel[] = [];
  let currentDate = new Date();
  for (let i = 0; i < count; i++) {
    labels.push(formatDateFns(currentDate, 'MMMM yyyy', { locale: indonesiaLocale }));
    currentDate = subMonths(currentDate, 1);
  }
  return labels;
};


export default function PayrollPage() {
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);
  const [loadingPayroll, setLoadingPayroll] = useState(true);
  const availablePeriods = React.useMemo(() => generatePreviousMonthsLabels(12), []);
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
    setIsPayButtonEnabled(true);
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
      toast({ title: "Error", description: "Tidak dapat mengambil daftar staf.", variant: "destructive" });
      setStaffList([]);
    } finally {
      setLoadingStaff(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStaffList();
  }, [fetchStaffList]);

  const calculateDeductionsAndNetPay = async (staff: StaffMember, period: string, manualDeductionsInput: number = 0): Promise<Partial<PayrollEntry>> => {
    const periodDates = parsePeriodToDateRange(period);
    if (!periodDates) return { baseSalary: staff.baseSalary || 0, totalDeductions: manualDeductionsInput, netPay: (staff.baseSalary || 0) - manualDeductionsInput, calculationDetails: "Periode tidak valid.", profitShareReceivedThisPeriod: 0 };

    const { startDate, endDate } = periodDates;
    let latenessDeduction = 0;
    let absenceDeduction = 0;
    let telatBukaDeductionTotalForStaff = 0;
    let profitShareReceivedThisPeriod = 0;
    let calculationDetails = "";

    const profitShareQuery = query(
      collection(db, 'dailyProfitShares'),
      where("staffId", "==", staff.id),
      where("date", ">=", formatDateFns(startDate, 'yyyy-MM-dd')),
      where("date", "<=", formatDateFns(endDate, 'yyyy-MM-dd')),
      where("status", "==", "Dibayar")
    );
    const profitShareSnapshot = await getDocs(profitShareQuery);
    profitShareSnapshot.forEach(doc => {
      profitShareReceivedThisPeriod += (doc.data() as DailyProfitShareEntry).profitShareAmount;
    });


    const attendanceRecords: Record<string, AttendanceRecord> = {};
    const attendanceCollectionRef = collection(db, 'attendanceRecords');
    const attendanceQuery = query(attendanceCollectionRef,
      where("staffId", "==", staff.id),
      where("date", ">=", formatDateFns(startDate, 'yyyy-MM-dd')),
      where("date", "<=", formatDateFns(endDate, 'yyyy-MM-dd'))
    );
    const attendanceSnapshot = await getDocs(attendanceQuery);
    attendanceSnapshot.forEach(doc => {
        const attData = doc.data() as AttendanceRecord;
        attendanceRecords[attData.date] = attData;
    });

    const shopLateOpeningDays = new Set<string>();
    if (Array.isArray(staffList) && staffList.length > 0) {
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = formatDateFns(d, 'yyyy-MM-dd');
            const dayOfWeek = getDay(d);

            let allStaffPresentAndLate = true;
            let anyStaffScheduledAndPresent = false;

            const dailyAttendancePromises = Array.isArray(staffList) ? staffList.map(async (sMember) => {
                const staffMemberDaysOff = sMember.daysOff || [];
                if (staffMemberDaysOff.includes(dayOfWeek)) return null;

                const attQuery = query(collection(db, 'attendanceRecords'),
                                        where("staffId", "==", sMember.id),
                                        where("date", "==", dateStr),
                                        limit(1));
                const attSnap = await getDocs(attQuery);
                return attSnap.empty ? null : attSnap.docs[0].data() as AttendanceRecord;
            }) : [];
            const dailyAttendances = (await Promise.all(dailyAttendancePromises)).filter(Boolean) as AttendanceRecord[];

            if (dailyAttendances.length > 0) {
                anyStaffScheduledAndPresent = true;
                for (const att of dailyAttendances) {
                    if (att.status === 'Cuti' || att.status === 'Absen') {
                        continue;
                    }
                    if (!att.clockIn || att.clockIn < "09:05") {
                        allStaffPresentAndLate = false;
                        break;
                    }
                }
            } else {
                allStaffPresentAndLate = false;
            }

            if (anyStaffScheduledAndPresent && allStaffPresentAndLate) {
                shopLateOpeningDays.add(dateStr);
            }
        }
    }

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = formatDateFns(d, 'yyyy-MM-dd');
        const dayOfWeek = getDay(d);
        const staffDaysOff = staff.daysOff || [];
        let dailyLatenessDeduction = 0;
        let alreadyDeductedForTelatBukaThisDay = false;

        if (staffDaysOff.includes(dayOfWeek)) {
            calculationDetails += `${dateStr}: Hari Libur Staf.\n`;
            continue;
        }

        const attendance = attendanceRecords[dateStr];

        if (attendance) {
            if (attendance.status === 'Cuti') {
                calculationDetails += `${dateStr}: Cuti.\n`;
                continue;
            }
            if (attendance.status === 'Absen') {
                absenceDeduction += 50000;
                calculationDetails += `${dateStr}: Absen (-Rp 50.000).\n`;
            } else if (attendance.clockIn) {
                let isTelatParah = false;
                if (attendance.clockIn >= "10:00") {
                    dailyLatenessDeduction = 50000;
                    calculationDetails += `${dateStr}: Telat >=10:00 (-Rp 50.000).\n`;
                    isTelatParah = true;
                }

               if (!isTelatParah && shopLateOpeningDays.has(dateStr)) {
                    telatBukaDeductionTotalForStaff += 25000;
                    calculationDetails += `${dateStr}: Potongan Telat Buka Toko (-Rp 25.000).\n`;
                    alreadyDeductedForTelatBukaThisDay = true;
                }

                if (!isTelatParah && !alreadyDeductedForTelatBukaThisDay && attendance.clockIn >= "09:05") {
                    dailyLatenessDeduction = 15000;
                    calculationDetails += `${dateStr}: Telat >=09:05 (-Rp 15.000).\n`;
                } else if (!isTelatParah && alreadyDeductedForTelatBukaThisDay && attendance.clockIn >= "09:05") {
                    calculationDetails += `${dateStr}: Telat >=09:05 (digugurkan oleh Telat Buka Toko).\n`;
                }
                latenessDeduction += dailyLatenessDeduction;
            } else {
                absenceDeduction += 50000;
                calculationDetails += `${dateStr}: ${attendance.status} tanpa clockIn, dianggap Absen (-Rp 50.000).\n`;
            }
        } else {
            absenceDeduction += 50000;
            calculationDetails += `${dateStr}: Tidak ada catatan absensi (-Rp 50.000).\n`;
        }
    }

    const totalCalculatedDeductions = latenessDeduction + absenceDeduction + telatBukaDeductionTotalForStaff;
    const totalDeductions = totalCalculatedDeductions + (manualDeductionsInput || 0);
    const netPay = (staff.baseSalary || 0) - totalDeductions;

    return {
        baseSalary: staff.baseSalary || 0,
        latenessDeduction: latenessDeduction,
        absenceDeduction: absenceDeduction,
        telatBukaDeduction: telatBukaDeductionTotalForStaff,
        profitShareReceivedThisPeriod: profitShareReceivedThisPeriod,
        manualDeductions: manualDeductionsInput || 0,
        totalDeductions: totalDeductions,
        netPay: netPay,
        calculationDetails: calculationDetails.trim() || "Tidak ada potongan otomatis.",
    };
  };

  const fetchPayrollData = useCallback(async (period: string) => {
    setLoadingPayroll(true);
    try {
      const payrollCollectionRef = collection(db, 'payrollData');
      const q = query(payrollCollectionRef, where("period", "==", period), orderBy("staffName"));
      const querySnapshot = await getDocs(q);
      let data = querySnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt || Timestamp.now(),
          updatedAt: docSnap.data().updatedAt || Timestamp.now()
        } as PayrollEntry));

      if (Array.isArray(staffList) && staffList.length > 0) {
        const batch = writeBatch(db);
        let entriesModified = false;

        for (const staff of staffList) {
          const existingEntry = data.find(p => p.staffId === staff.id);
          const calculatedData = await calculateDeductionsAndNetPay(staff, period, existingEntry?.manualDeductions || 0);

          const corePayrollValues: Partial<PayrollEntry> = {
            baseSalary: calculatedData.baseSalary ?? 0,
            latenessDeduction: calculatedData.latenessDeduction ?? 0,
            absenceDeduction: calculatedData.absenceDeduction ?? 0,
            telatBukaDeduction: calculatedData.telatBukaDeduction ?? 0,
            profitShareReceivedThisPeriod: calculatedData.profitShareReceivedThisPeriod ?? 0,
            manualDeductions: calculatedData.manualDeductions ?? 0,
            totalDeductions: calculatedData.totalDeductions ?? 0,
            netPay: calculatedData.netPay ?? 0,
            calculationDetails: calculatedData.calculationDetails ?? "Tidak ada detail.",
            totalHours: calculatedData.totalHours
          };

          if (existingEntry) {
            if (existingEntry.status !== 'Dibayar' ||
                existingEntry.latenessDeduction !== corePayrollValues.latenessDeduction ||
                existingEntry.absenceDeduction !== corePayrollValues.absenceDeduction ||
                existingEntry.telatBukaDeduction !== corePayrollValues.telatBukaDeduction ||
                (existingEntry.profitShareReceivedThisPeriod ?? 0) !== corePayrollValues.profitShareReceivedThisPeriod ||
                existingEntry.totalDeductions !== corePayrollValues.totalDeductions ||
                existingEntry.netPay !== corePayrollValues.netPay
            ) {
              const entryDocRef = doc(db, 'payrollData', existingEntry.id);
              const updateDataForFirestore: any = {
                ...corePayrollValues,
                staffId: staff.id,
                staffName: staff.name,
                period: period,
                status: (existingEntry.status === 'Dibayar' ? 'Dibayar' : 'Tertunda') as PayrollEntry['status'],
                updatedAt: serverTimestamp()
              };
               if (updateDataForFirestore.totalHours === undefined) updateDataForFirestore.totalHours = deleteField();


              batch.update(entryDocRef, updateDataForFirestore);
              entriesModified = true;
            }
          } else {
            const newDocRef = doc(collection(db, 'payrollData'));
            const newEntryData: any = {
                ...corePayrollValues,
                staffId: staff.id,
                staffName: staff.name,
                period: period,
                status: 'Tertunda' as PayrollEntry['status'],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            if (newEntryData.totalHours === undefined) {
                newEntryData.totalHours = deleteField();
            }
            batch.set(newDocRef, newEntryData);
            entriesModified = true;
          }
        }
        if (entriesModified) {
          await batch.commit();
          const updatedSnapshot = await getDocs(q);
          data = updatedSnapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt || Timestamp.now(),
            updatedAt: docSnap.data().updatedAt || Timestamp.now()
          } as PayrollEntry));
          if(entriesModified) toast({title: "Info", description: "Data penggajian telah dihitung ulang dan diperbarui."});
        }
      }
      setPayrollData(data);
    } catch (error) {
      console.error("Error fetching or calculating payroll data: ", error);
      toast({ title: "Error", description: "Gagal mengambil atau menghitung data penggajian.", variant: "destructive" });
    } finally {
      setLoadingPayroll(false);
    }
  }, [toast, staffList]);

  useEffect(() => {
    if (selectedPeriod && selectedPeriod !== 'Periode Tidak Tersedia' && !loadingStaff) {
        fetchPayrollData(selectedPeriod);
    } else {
      setPayrollData([]);
      setLoadingPayroll(false);
    }
  }, [selectedPeriod, loadingStaff, fetchPayrollData]);


  const handleCreatePayrollSubmit = async (data: PayrollFormData & { staffName: string; period: string; status: PayrollEntry['status'], netPay: number, totalDeductions: number }) => {
    setIsSubmittingCreate(true);
    const staff = staffList.find(s => s.id === data.staffId);
    if (!staff) {
      toast({ title: "Error", description: "Staf tidak ditemukan.", variant: "destructive" });
      setIsSubmittingCreate(false);
      return;
    }

    try {
      const calculatedData = await calculateDeductionsAndNetPay(staff, data.period, data.manualDeductions || 0);
      const finalData: Omit<PayrollEntry, 'id' | 'createdAt' | 'updatedAt'> = {
        staffId: data.staffId,
        staffName: data.staffName,
        period: data.period,
        baseSalary: data.baseSalary,
        totalHours: data.totalHours,
        manualDeductions: data.manualDeductions,
        latenessDeduction: calculatedData.latenessDeduction ?? 0,
        absenceDeduction: calculatedData.absenceDeduction ?? 0,
        telatBukaDeduction: calculatedData.telatBukaDeduction ?? 0,
        profitShareReceivedThisPeriod: calculatedData.profitShareReceivedThisPeriod ?? 0,
        totalDeductions: calculatedData.totalDeductions ?? 0,
        netPay: calculatedData.netPay ?? 0,
        status: 'Tertunda',
        calculationDetails: calculatedData.calculationDetails,
      };

      const finalDataForFirestore: any = {...finalData};
      if (finalDataForFirestore.totalHours === undefined) finalDataForFirestore.totalHours = deleteField();
      if (finalDataForFirestore.profitShareReceivedThisPeriod === undefined) finalDataForFirestore.profitShareReceivedThisPeriod = 0;


      const payrollCollectionRef = collection(db, 'payrollData');
      const q = query(payrollCollectionRef, where("staffId", "==", data.staffId), where("period", "==", data.period), limit(1));
      const existingSnapshot = await getDocs(q);

      if (!existingSnapshot.empty) {
        const existingDocRef = existingSnapshot.docs[0].ref;
        await updateDoc(existingDocRef, { ...finalDataForFirestore, updatedAt: serverTimestamp()});
        toast({ title: "Sukses", description: `Entri penggajian untuk ${data.staffName} berhasil diperbarui.` });
      } else {
        await addDoc(collection(db, 'payrollData'), {
          ...finalDataForFirestore,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast({ title: "Sukses", description: `Entri penggajian untuk ${data.staffName} berhasil dibuat.` });
      }
      setIsCreateDialogOpen(false);
      fetchPayrollData(selectedPeriod);
    } catch (error) {
      console.error("Error creating/updating payroll entry: ", error);
      toast({ title: "Error", description: "Gagal memproses entri penggajian.", variant: "destructive" });
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
      const paidTimestamp = Timestamp.now();
      const entryDocRef = doc(db, 'payrollData', entryToPay.id);

      const staffMember = staffList.find(s => s.id === entryToPay.staffId);
      if (!staffMember) throw new Error("Staf tidak ditemukan untuk kalkulasi final.");

      const finalCalculatedData = await calculateDeductionsAndNetPay(staffMember, entryToPay.period, entryToPay.manualDeductions || 0);

      const dataForUpdate: any = {
        baseSalary: finalCalculatedData.baseSalary ?? 0,
        latenessDeduction: finalCalculatedData.latenessDeduction ?? 0,
        absenceDeduction: finalCalculatedData.absenceDeduction ?? 0,
        telatBukaDeduction: finalCalculatedData.telatBukaDeduction ?? 0,
        profitShareReceivedThisPeriod: finalCalculatedData.profitShareReceivedThisPeriod ?? 0,
        manualDeductions: finalCalculatedData.manualDeductions ?? 0,
        totalDeductions: finalCalculatedData.totalDeductions ?? 0,
        netPay: finalCalculatedData.netPay ?? 0,
        calculationDetails: finalCalculatedData.calculationDetails ?? "Tidak ada detail.",
        status: 'Dibayar',
        paidAt: paidTimestamp,
        updatedAt: serverTimestamp(),
      };
      if (finalCalculatedData.totalHours !== undefined) {
        dataForUpdate.totalHours = finalCalculatedData.totalHours;
      } else {
        dataForUpdate.totalHours = deleteField();
      }


      await updateDoc(entryDocRef, dataForUpdate);

      const expenseData: Omit<ExpenseFormData, 'date' | 'category'> & { date: Timestamp, category: ExpenseCategory, paymentSource: PaymentSource, createdAt: any, updatedAt: any } = {
        date: paidTimestamp,
        category: "Gaji & Komisi Staf",
        description: `Pembayaran Gaji ${entryToPay.staffName} - Periode ${entryToPay.period}`,
        amount: finalCalculatedData.netPay ?? 0,
        paymentSource: "Transfer Bank",
        notes: `Pembayaran gaji otomatis dari modul penggajian. Detail: ${finalCalculatedData.calculationDetails || ''}`,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'expenses'), expenseData);

      toast({ title: "Sukses", description: `Penggajian untuk ${entryToPay.staffName} telah ditandai Dibayar dan dicatat sebagai pengeluaran.` });
      setIsConfirmPaidOpen(false);
      fetchPayrollData(selectedPeriod);
    } catch (error) {
      console.error("Error marking as paid or creating expense: ", error);
      toast({ title: "Error", description: "Gagal memperbarui status penggajian atau mencatat pengeluaran.", variant: "destructive" });
    } finally {
      setIsSubmittingPayment(false);
      setEntryToPay(null);
    }
  };

  if ((loadingStaff || loadingPayroll) && selectedPeriod !== 'Periode Tidak Tersedia') {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Penggajian Staf" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data penggajian...</p>
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
              <CardDescription>Kelola dan proses penggajian staf. Potongan otomatis berdasarkan absensi dan keterlambatan.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod} disabled={loadingPayroll || loadingStaff}>
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
                {loadingStaff && isCreateDialogOpen ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                Entri/Edit Manual
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
                    {selectedPeriod === 'Periode Tidak Tersedia' ? 'Silakan pilih periode untuk melihat data penggajian.'
                     : staffList.length === 0 && !loadingStaff ? 'Tidak ada staf terdaftar. Silakan tambahkan data staf terlebih dahulu.'
                     : `Tidak ada data penggajian untuk periode ${selectedPeriod}. Sistem akan mencoba membuat entri dasar saat daftar staf dimuat.`}
                </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Staf</TableHead>
                    <TableHead className="text-right">Gaji Pokok</TableHead>
                     <TableHead className="text-right">Bagi Hasil Diterima</TableHead>
                    <TableHead className="text-right">Total Potongan</TableHead>
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
                      <TableCell className="text-right text-blue-600 dark:text-blue-400">
                        Rp {(entry.profitShareReceivedThisPeriod || 0).toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell className="text-right text-red-600">Rp {(entry.totalDeductions || 0).toLocaleString('id-ID')}</TableCell>
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
                                  <p>Pembayaran dapat dilakukan mulai tanggal tertentu.</p>
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
        <Card className="mt-6">
            <CardHeader><CardTitle>Informasi Potongan Otomatis</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
                <p><span className="font-semibold">Keterlambatan:</span> Masuk pukul 09:05-09:59: -Rp 15.000. Masuk pukul 10:00 atau lebih: -Rp 50.000.</p>
                <p><span className="font-semibold">Absensi Tidak Sah:</span> Tidak hadir tanpa status "Cuti" atau bukan hari libur staf: -Rp 50.000/hari.</p>
                <p><span className="font-semibold">Telat Buka Toko:</span> Jika semua staf yang hadir pada satu hari tercatat masuk pukul 09:05 atau lebih, masing-masing staf tersebut mendapat potongan tambahan -Rp 25.000 untuk hari itu. Jika potongan "Telat Buka" aktif, potongan keterlambatan normal (Rp 15.000 karena masuk 09:05-09:59) tidak berlaku untuk staf tersebut di hari yang sama. Namun, jika staf sudah kena potongan telat 1 jam (Rp 50.000), potongan "Telat Buka Toko" tidak dikenakan.</p>
                <p className="text-xs text-muted-foreground">Jam operasional bengkel: 09:00 - 21:00. Semua perhitungan potongan dilakukan relatif terhadap jam operasional ini dan data absensi yang tercatat.</p>
            </CardContent>
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
              Tindakan ini akan memperbarui status, mencatat tanggal pembayaran, dan membuat entri pengeluaran otomatis.
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
