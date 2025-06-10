
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
        where('paymentMethod', '==', 'Transfer Bank')
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
    <div className="flex flex-col h-full">
      <AppHeader title="Laporan Arus Kas (Bank)" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Filter Laporan</CardTitle>
              <CardDescription>Pilih rentang tanggal untuk melihat laporan arus kas bank.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
              <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
              <Button variant="outline" disabled className="w-full sm:w-auto"><Download className="mr-2 h-4 w-4" /> Ekspor (Segera)</Button>
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
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Landmark className="mr-3 h-7 w-7" />
                  Ringkasan Arus Kas Rekening Bank - Periode: {reportData.period}
                </CardTitle>
                <CardDescription>
                  Perhitungan ini didasarkan pada Saldo Awal Bank yang tercatat di Pengaturan. Untuk akurasi maksimal, pastikan saldo awal dan semua transaksi tercatat dengan benar.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-muted/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Saldo Awal Bank</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(reportData.initialBankBalance)}</div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Penerimaan Bank</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">{formatCurrency(reportData.bankInflows.totalBankInflows)}</div>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">Total Pengeluaran Bank</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-700 dark:text-red-300">{formatCurrency(reportData.bankOutflows.totalBankOutflows)}</div>
                  </CardContent>
                </Card>
                 <Card className={`${reportData.netBankCashFlow >= 0 ? 'bg-primary/10' : 'bg-destructive/10'}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`text-sm font-medium ${reportData.netBankCashFlow >= 0 ? 'text-primary' : 'text-destructive'}`}>Saldo Akhir Bank (Estimasi)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${reportData.netBankCashFlow >= 0 ? 'text-primary' : 'text-destructive'}`}>{formatCurrency(reportData.finalBankBalance)}</div>
                     <p className={`text-xs ${reportData.netBankCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        Arus Bersih: {formatCurrency(reportData.netBankCashFlow)}
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-green-500"/>Rincian Penerimaan Bank</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><TrendingDown className="mr-2 h-5 w-5 text-red-500"/>Rincian Pengeluaran Bank</CardTitle>
                </CardHeader>
                <CardContent>
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
                      {/* Pembayaran Gaji & Bagi Hasil sudah termasuk di expensesFromBank jika paymentSource-nya 'Transfer Bank' */}
                       <TableRow className="font-semibold bg-muted/50">
                        <TableCell>Total Pengeluaran dari Bank</TableCell>
                        <TableCell className="text-right">{formatCurrency(reportData.bankOutflows.totalBankOutflows)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Catatan: Saldo Awal Bank diambil dari pengaturan dan dianggap sebagai saldo awal sebelum periode yang dipilih. Saldo Akhir Bank adalah estimasi berdasarkan data yang tercatat di sistem untuk periode tersebut.
                </p>
            </CardFooter>
          </>
        )}
      </main>
    </div>
  );
}

    