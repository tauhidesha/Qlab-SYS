
"use client";

import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-picker-range';
import { Loader2, Download, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, Timestamp, doc, getDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { Transaction } from '@/types/transaction';
import type { IncomeEntry } from '@/types/income';
import type { Expense } from '@/types/expense';
import type { DateRange } from "react-day-picker";
import { format as formatDateFns, startOfMonth, endOfMonth } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PhysicalCashFlowReportData {
  period: string;
  initialPhysicalCashBalance: number;
  cashInflows: {
    posCashSales: number;
    otherIncomeCash: number;
    totalCashInflows: number;
  };
  cashOutflows: {
    expensesFromCash: number; 
    cashDepositsToBank: number; 
    totalCashOutflows: number;
  };
  netPhysicalCashFlow: number;
  finalPhysicalCashBalance: number;
}

export default function PhysicalCashFlowPage() {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<PhysicalCashFlowReportData | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const today = new Date();
    return { from: startOfMonth(today), to: endOfMonth(today) };
  });
  const { toast } = useToast();

  const fetchPhysicalCashFlowData = useCallback(async (selectedDateRange: DateRange) => {
    if (!selectedDateRange.from) {
      setReportData(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const startDate = Timestamp.fromDate(selectedDateRange.from);
    const endDate = selectedDateRange.to 
      ? Timestamp.fromDate(new Date(selectedDateRange.to.getTime() + 86399999)) 
      : Timestamp.fromDate(new Date(selectedDateRange.from.getTime() + 86399999));

    try {
      // 1. Fetch Initial Physical Cash Balance
      let initialPhysicalCashBalance = 0;
      const financialSettingsDocRef = doc(db, 'appSettings', 'financial');
      const financialSettingsSnap = await getDoc(financialSettingsDocRef);
      if (financialSettingsSnap.exists()) {
        initialPhysicalCashBalance = financialSettingsSnap.data()?.initialPhysicalCashBalance || 0;
      }

      // 2. Fetch Cash Inflows
      // 2a. POS Cash Sales
      const transactionsRef = collection(db, 'transactions');
      const posSalesQuery = query(
        transactionsRef,
        where('status', '==', 'paid'),
        where('paidAt', '>=', startDate),
        where('paidAt', '<=', endDate),
        where('paymentMethod', '==', 'Tunai')
      );
      const posSalesSnapshot = await getDocs(posSalesQuery);
      let posCashSales = 0;
      posSalesSnapshot.forEach(doc => {
        posCashSales += (doc.data() as Transaction).total;
      });

      // 2b. Other Income (Cash)
      const incomeEntriesRef = collection(db, 'incomeEntries');
      const otherIncomeQuery = query(
        incomeEntriesRef,
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        where('paymentMethod', '==', 'Tunai')
      );
      const otherIncomeSnapshot = await getDocs(otherIncomeQuery);
      let otherIncomeCash = 0;
      otherIncomeSnapshot.forEach(doc => {
        otherIncomeCash += (doc.data() as IncomeEntry).amount;
      });
      
      const totalCashInflows = posCashSales + otherIncomeCash;

      // 3. Fetch Cash Outflows
      const expensesRef = collection(db, 'expenses');
      // 3a. Expenses paid from Cash (excluding deposits to bank)
      const expensesFromCashQuery = query(
        expensesRef,
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        where('paymentSource', '==', 'Kas Tunai')
      );
      const expensesFromCashSnapshot = await getDocs(expensesFromCashQuery);
      let expensesFromCash = 0;
      expensesFromCashSnapshot.forEach(doc => {
        if ((doc.data() as Expense).category !== "Setoran Tunai ke Bank") {
            expensesFromCash += (doc.data() as Expense).amount;
        }
      });

      // 3b. Cash Deposits to Bank (outflow from physical cash)
      const cashDepositsToBankQuery = query(
        expensesRef,
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        where('category', '==', 'Setoran Tunai ke Bank')
        // paymentSource is implicitly Kas Tunai or should be treated as such for this context
      );
      const cashDepositsToBankSnapshot = await getDocs(cashDepositsToBankQuery);
      let cashDepositsToBank = 0;
      cashDepositsToBankSnapshot.forEach(doc => {
        cashDepositsToBank += (doc.data() as Expense).amount;
      });
      
      const totalCashOutflows = expensesFromCash + cashDepositsToBank;
      
      // 4. Calculate Net Flow and Final Balance
      const netPhysicalCashFlow = totalCashInflows - totalCashOutflows;
      const finalPhysicalCashBalance = initialPhysicalCashBalance + netPhysicalCashFlow;

      const periodLabel = `${formatDateFns(selectedDateRange.from, 'dd MMM yyyy', { locale: indonesiaLocale })} - ${formatDateFns(selectedDateRange.to || selectedDateRange.from, 'dd MMM yyyy', { locale: indonesiaLocale })}`;

      setReportData({
        period: periodLabel,
        initialPhysicalCashBalance,
        cashInflows: {
          posCashSales,
          otherIncomeCash,
          totalCashInflows,
        },
        cashOutflows: {
          expensesFromCash,
          cashDepositsToBank,
          totalCashOutflows,
        },
        netPhysicalCashFlow,
        finalPhysicalCashBalance,
      });

    } catch (error) {
      console.error("Error fetching physical cash flow data: ", error);
      toast({ title: "Error", description: "Gagal mengambil data laporan arus kas fisik.", variant: "destructive" });
      setReportData(null);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (dateRange?.from) {
      fetchPhysicalCashFlowData(dateRange);
    } else {
      setReportData(null); 
      setLoading(false);
    }
  }, [dateRange, fetchPhysicalCashFlowData]);
  
  const formatCurrency = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;

  return (
    <div className="flex flex-col h-full min-h-0">
      <AppHeader title="Laporan Arus Kas Fisik (Tunai)" />
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        <Card className="h-fit">
          <CardHeader className="pb-4 space-y-4">
            <div>
              <CardTitle className="text-lg sm:text-xl">Filter Laporan</CardTitle>
              <CardDescription className="text-sm">
                Pilih rentang tanggal untuk melihat laporan arus kas fisik (tunai).
              </CardDescription>
            </div>
            
            {/* Mobile-first controls layout */}
            <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-2">
              <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
              <Button variant="outline" disabled className="w-full sm:w-auto sm:flex-shrink-0">
                <Download className="mr-2 h-4 w-4" /> 
                <span className="hidden sm:inline">Ekspor (Segera)</span>
                <span className="sm:hidden">Ekspor</span>
              </Button>
            </div>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-3 text-lg">Memuat data laporan...</p>
          </div>
        ) : !reportData && !dateRange?.from ? (
           <Card>
            <CardContent className="py-20 text-center">
              <Wallet className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">
                Silakan pilih rentang tanggal untuk menampilkan laporan arus kas fisik.
              </p>
            </CardContent>
          </Card>
        ) : !reportData && dateRange?.from ? (
            <Card>
                <CardContent className="py-20 text-center">
                    <Wallet className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-xl text-muted-foreground">
                        Tidak ada data untuk periode yang dipilih.
                    </p>
                </CardContent>
            </Card>
        ) : reportData && (
          <>
            <Card className="border-primary/30">
              <CardHeader className="px-3 sm:px-6">
                <CardTitle className="flex items-start text-primary text-sm sm:text-base lg:text-lg">
                  <Wallet className="mr-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">
                    <span className="block sm:hidden">Kas Fisik - {reportData.period}</span>
                    <span className="hidden sm:block">Arus Kas Fisik - {reportData.period}</span>
                  </span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm pl-6 sm:pl-7 lg:pl-8">
                  Saldo berdasarkan pengaturan kas fisik.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 sm:gap-3 lg:gap-4 grid-cols-2 lg:grid-cols-4 px-3 sm:px-6">
                <Card className="bg-muted/30">
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Saldo Awal</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm sm:text-lg lg:text-xl font-bold break-all">{formatCurrency(reportData.initialPhysicalCashBalance)}</div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700">
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">Penerimaan</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-green-700 dark:text-green-300 break-all">{formatCurrency(reportData.cashInflows.totalCashInflows)}</div>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700">
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-300">Pengeluaran</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-red-700 dark:text-red-300 break-all">{formatCurrency(reportData.cashOutflows.totalCashOutflows)}</div>
                  </CardContent>
                </Card>
                 <Card className={`${reportData.netPhysicalCashFlow >= 0 ? 'bg-primary/10' : 'bg-destructive/10'}`}>
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className={`text-xs sm:text-sm font-medium ${reportData.netPhysicalCashFlow >= 0 ? 'text-primary' : 'text-destructive'}`}>Saldo Akhir</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className={`text-sm sm:text-lg lg:text-xl font-bold ${reportData.netPhysicalCashFlow >= 0 ? 'text-primary' : 'text-destructive'} break-all`}>{formatCurrency(reportData.finalPhysicalCashBalance)}</div>
                     <p className={`text-xs ${reportData.netPhysicalCashFlow >= 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
                        Net: {formatCurrency(reportData.netPhysicalCashFlow)}
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-500"/>
                    Rincian Penerimaan Kas
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 sm:px-6">
                  {/* Desktop Table View */}
                  <div className="hidden sm:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sumber Penerimaan</TableHead>
                          <TableHead className="text-right">Jumlah (Rp)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Penjualan Tunai (POS)</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.cashInflows.posCashSales)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Pemasukan Lain (Tunai)</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.cashInflows.otherIncomeCash)}</TableCell>
                        </TableRow>
                        <TableRow className="font-semibold bg-muted/50">
                          <TableCell>Total Penerimaan Kas Fisik</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.cashInflows.totalCashInflows)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Mobile Card View */}
                  <div className="sm:hidden space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs text-muted-foreground">POS Tunai</span>
                        <span className="font-medium text-sm">{formatCurrency(reportData.cashInflows.posCashSales)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs text-muted-foreground">Pemasukan Lain</span>
                        <span className="font-medium text-sm">{formatCurrency(reportData.cashInflows.otherIncomeCash)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-green-50 dark:bg-green-900/30 rounded-md px-2 mt-2">
                        <span className="font-semibold text-green-700 dark:text-green-300 text-sm">Total</span>
                        <span className="font-bold text-green-700 dark:text-green-300 text-sm">{formatCurrency(reportData.cashInflows.totalCashInflows)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <TrendingDown className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-500"/>
                    Rincian Pengeluaran Kas
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 sm:px-6">
                  {/* Desktop Table View */}
                  <div className="hidden sm:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Jenis Pengeluaran</TableHead>
                          <TableHead className="text-right">Jumlah (Rp)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Biaya Operasional & Lainnya (dari Kas Tunai)</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.cashOutflows.expensesFromCash)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Setoran Tunai ke Bank (dari Kas Fisik)</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.cashOutflows.cashDepositsToBank)}</TableCell>
                        </TableRow>
                         <TableRow className="font-semibold bg-muted/50">
                          <TableCell>Total Pengeluaran Kas Fisik</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.cashOutflows.totalCashOutflows)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Mobile Card View */}
                  <div className="sm:hidden space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs text-muted-foreground">Biaya Operasional</span>
                        <span className="font-medium text-sm">{formatCurrency(reportData.cashOutflows.expensesFromCash)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs text-muted-foreground">Setoran ke Bank</span>
                        <span className="font-medium text-sm">{formatCurrency(reportData.cashOutflows.cashDepositsToBank)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-red-50 dark:bg-red-900/30 rounded-md px-2 mt-2">
                        <span className="font-semibold text-red-700 dark:text-red-300 text-sm">Total</span>
                        <span className="font-bold text-red-700 dark:text-red-300 text-sm">{formatCurrency(reportData.cashOutflows.totalCashOutflows)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-4">
              <CardContent className="px-3 sm:px-6 py-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Catatan:</strong> Saldo Awal Kas Fisik diambil dari pengaturan. Saldo Akhir Kas Fisik adalah estimasi berdasarkan data yang tercatat di sistem untuk periode tersebut.
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}

    