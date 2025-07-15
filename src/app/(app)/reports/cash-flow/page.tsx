
"use client";

import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-picker-range';
import { Loader2, FileText, Download, TrendingUp, TrendingDown, Landmark } from 'lucide-react';
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

interface CashFlowReportData {
  period: string;
  initialBankBalance: number;
  
  bankInflows: {
    posNonCashSales: number;
    otherIncomeBankTransfers: number;
    cashDepositsToBank: number;
    totalBankInflows: number;
  };
  
  bankOutflows: {
    expensesFromBank: number;
    totalBankOutflows: number;
  };
  
  netBankCashFlow: number;
  finalBankBalance: number;
}

export default function CashFlowPage() {
  const [loading, setLoading] = useState(false); // Default to false until a period is selected
  const [reportData, setReportData] = useState<CashFlowReportData | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const today = new Date();
    return { from: startOfMonth(today), to: endOfMonth(today) };
  });
  const { toast } = useToast();

  const fetchCashFlowData = useCallback(async (selectedDateRange: DateRange) => {
    if (!selectedDateRange.from) {
      setReportData(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const startDate = Timestamp.fromDate(selectedDateRange.from);
    // Ensure endDate covers the whole day if only 'from' is selected or 'from' and 'to' are the same day
    const endDate = selectedDateRange.to 
      ? Timestamp.fromDate(new Date(selectedDateRange.to.getTime() + 86399999)) 
      : Timestamp.fromDate(new Date(selectedDateRange.from.getTime() + 86399999));

    try {
      // 1. Fetch Initial Bank Balance
      let initialBankBalance = 0;
      const financialSettingsDocRef = doc(db, 'appSettings', 'financial');
      const financialSettingsSnap = await getDoc(financialSettingsDocRef);
      if (financialSettingsSnap.exists()) {
        initialBankBalance = financialSettingsSnap.data()?.initialBankBalance || 0;
      }

      // 2. Fetch Bank Inflows
      // 2a. POS Non-Cash Sales
      const transactionsRef = collection(db, 'transactions');
      const posSalesQuery = query(
        transactionsRef,
        where('status', '==', 'paid'),
        where('paidAt', '>=', startDate),
        where('paidAt', '<=', endDate),
        where('paymentMethod', 'in', ['QRIS', 'Kartu Debit']) // Assuming these are bank transactions
      );
      const posSalesSnapshot = await getDocs(posSalesQuery);
      let posNonCashSales = 0;
      posSalesSnapshot.forEach(doc => {
        posNonCashSales += (doc.data() as Transaction).total;
      });

      // 2b. Other Income (Bank Transfers)
      const incomeEntriesRef = collection(db, 'incomeEntries');
      const otherIncomeQuery = query(
        incomeEntriesRef,
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        where('paymentMethod', '==', 'Transfer Bank'),
        orderBy('paymentMethod'), 
        orderBy('date') 
      );
      const otherIncomeSnapshot = await getDocs(otherIncomeQuery);
      let otherIncomeBankTransfers = 0;
      otherIncomeSnapshot.forEach(doc => {
        otherIncomeBankTransfers += (doc.data() as IncomeEntry).amount;
      });
      
      // 2c. Cash Deposits to Bank (from Expenses with category "Setoran Tunai ke Bank")
      const expensesRef = collection(db, 'expenses');
      const cashDepositsQuery = query(
        expensesRef,
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        where('category', '==', 'Setoran Tunai ke Bank')
        // No paymentSource filter needed, as its category implies it's money going TO bank
      );
      const cashDepositsSnapshot = await getDocs(cashDepositsQuery);
      let cashDepositsToBank = 0;
      cashDepositsSnapshot.forEach(doc => {
        cashDepositsToBank += (doc.data() as Expense).amount;
      });
      
      const totalBankInflows = posNonCashSales + otherIncomeBankTransfers + cashDepositsToBank;

      // 3. Fetch Bank Outflows
      const expensesFromBankQuery = query(
        expensesRef,
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        where('paymentSource', '==', 'Transfer Bank')
      );
      const expensesFromBankSnapshot = await getDocs(expensesFromBankQuery);
      let expensesFromBank = 0;
      expensesFromBankSnapshot.forEach(doc => {
         // Exclude "Setoran Tunai ke Bank" from outflows as it's an internal transfer, already counted as inflow
        if ((doc.data() as Expense).category !== "Setoran Tunai ke Bank") {
            expensesFromBank += (doc.data() as Expense).amount;
        }
      });
      const totalBankOutflows = expensesFromBank;
      
      // 4. Calculate Net Flow and Final Balance
      const netBankCashFlow = totalBankInflows - totalBankOutflows;
      const finalBankBalance = initialBankBalance + netBankCashFlow; // For simplicity, assuming initial balance is for the start of time, not start of period.
                                                                  // A true running balance would require fetching all transactions affecting bank before period start.

      const periodLabel = `${formatDateFns(selectedDateRange.from, 'dd MMM yyyy', { locale: indonesiaLocale })} - ${formatDateFns(selectedDateRange.to || selectedDateRange.from, 'dd MMM yyyy', { locale: indonesiaLocale })}`;

      setReportData({
        period: periodLabel,
        initialBankBalance,
        bankInflows: {
          posNonCashSales,
          otherIncomeBankTransfers,
          cashDepositsToBank,
          totalBankInflows,
        },
        bankOutflows: {
          expensesFromBank,
          totalBankOutflows,
        },
        netBankCashFlow,
        finalBankBalance,
      });

    } catch (error) {
      console.error("Error fetching cash flow data: ", error);
      toast({ title: "Error", description: "Gagal mengambil data laporan arus kas.", variant: "destructive" });
      setReportData(null);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (dateRange?.from) {
      fetchCashFlowData(dateRange);
    } else {
      setReportData(null); 
      setLoading(false);
    }
  }, [dateRange, fetchCashFlowData]);
  
  const formatCurrency = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;

  return (
    <div className="flex flex-col h-full min-h-0">
      <AppHeader title="Laporan Arus Kas (Bank)" />
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        <Card className="h-fit">
          <CardHeader className="pb-4 space-y-4">
            <div>
              <CardTitle className="text-lg sm:text-xl">Filter Laporan</CardTitle>
              <CardDescription className="text-sm">
                Pilih rentang tanggal untuk melihat laporan arus kas bank.
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
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">
                Silakan pilih rentang tanggal untuk menampilkan laporan arus kas.
              </p>
            </CardContent>
          </Card>
        ) : !reportData && dateRange?.from ? (
            <Card>
                <CardContent className="py-20 text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
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
                  <Landmark className="mr-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">
                    <span className="block sm:hidden">Arus Kas - {reportData.period}</span>
                    <span className="hidden sm:block">Ringkasan Arus Kas - {reportData.period}</span>
                  </span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm pl-6 sm:pl-7 lg:pl-8">
                  Saldo berdasarkan pengaturan. Pastikan data tercatat benar.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 sm:gap-3 lg:gap-4 grid-cols-2 lg:grid-cols-4 px-3 sm:px-6">
                <Card className="bg-muted/30">
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium">Saldo Awal</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm sm:text-lg lg:text-xl font-bold break-all">{formatCurrency(reportData.initialBankBalance)}</div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700">
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">Penerimaan</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-green-700 dark:text-green-300 break-all">{formatCurrency(reportData.bankInflows.totalBankInflows)}</div>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700">
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-300">Pengeluaran</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm sm:text-lg lg:text-xl font-bold text-red-700 dark:text-red-300 break-all">{formatCurrency(reportData.bankOutflows.totalBankOutflows)}</div>
                  </CardContent>
                </Card>
                 <Card className={`${reportData.netBankCashFlow >= 0 ? 'bg-primary/10' : 'bg-destructive/10'}`}>
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className={`text-xs sm:text-sm font-medium ${reportData.netBankCashFlow >= 0 ? 'text-primary' : 'text-destructive'}`}>Saldo Akhir</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className={`text-sm sm:text-lg lg:text-xl font-bold ${reportData.netBankCashFlow >= 0 ? 'text-primary' : 'text-destructive'} break-all`}>{formatCurrency(reportData.finalBankBalance)}</div>
                     <p className={`text-xs ${reportData.netBankCashFlow >= 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
                        Net: {formatCurrency(reportData.netBankCashFlow)}
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
                    Rincian Penerimaan Bank
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
                          <TableCell>Penjualan Non-Tunai (POS)</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.bankInflows.posNonCashSales)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Pemasukan Lain (via Transfer Bank)</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.bankInflows.otherIncomeBankTransfers)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Setoran Tunai ke Bank</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.bankInflows.cashDepositsToBank)}</TableCell>
                        </TableRow>
                        <TableRow className="font-semibold bg-muted/50">
                          <TableCell>Total Penerimaan ke Bank</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.bankInflows.totalBankInflows)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Mobile Card View */}
                  <div className="sm:hidden space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs text-muted-foreground">POS Non-Tunai</span>
                        <span className="font-medium text-sm">{formatCurrency(reportData.bankInflows.posNonCashSales)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs text-muted-foreground">Transfer Bank</span>
                        <span className="font-medium text-sm">{formatCurrency(reportData.bankInflows.otherIncomeBankTransfers)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs text-muted-foreground">Setoran Tunai</span>
                        <span className="font-medium text-sm">{formatCurrency(reportData.bankInflows.cashDepositsToBank)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-green-50 dark:bg-green-900/30 rounded-md px-2 mt-2">
                        <span className="font-semibold text-green-700 dark:text-green-300 text-sm">Total</span>
                        <span className="font-bold text-green-700 dark:text-green-300 text-sm">{formatCurrency(reportData.bankInflows.totalBankInflows)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <TrendingDown className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-500"/>
                    Rincian Pengeluaran Bank
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
                          <TableCell>Biaya Operasional & Lainnya (via Transfer Bank)</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.bankOutflows.expensesFromBank)}</TableCell>
                        </TableRow>
                         <TableRow className="font-semibold bg-muted/50">
                          <TableCell>Total Pengeluaran dari Bank</TableCell>
                          <TableCell className="text-right">{formatCurrency(reportData.bankOutflows.totalBankOutflows)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Mobile Card View */}
                  <div className="sm:hidden space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs text-muted-foreground">Biaya Operasional</span>
                        <span className="font-medium text-sm">{formatCurrency(reportData.bankOutflows.expensesFromBank)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-red-50 dark:bg-red-900/30 rounded-md px-2 mt-2">
                        <span className="font-semibold text-red-700 dark:text-red-300 text-sm">Total</span>
                        <span className="font-bold text-red-700 dark:text-red-300 text-sm">{formatCurrency(reportData.bankOutflows.totalBankOutflows)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-4">
              <CardContent className="px-3 sm:px-6 py-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Catatan:</strong> Saldo Awal Bank diambil dari pengaturan dan dianggap sebagai saldo awal sebelum periode yang dipilih. Saldo Akhir Bank adalah estimasi berdasarkan data yang tercatat di sistem untuk periode tersebut.
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}

    
