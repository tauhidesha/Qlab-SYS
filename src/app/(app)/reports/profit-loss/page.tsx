
"use client";

import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, TrendingUp, Download, DollarSign, TrendingDown, Sparkles } from 'lucide-react'; // Added Sparkles
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { Transaction } from '@/types/transaction';
import type { IncomeEntry, IncomeCategory } from '@/types/income';
import type { Expense, ExpenseCategory } from '@/types/expense';
import { format as formatDateFns, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';
import { analyzeProfitLoss, type AnalyzeProfitLossInput, type AnalyzeProfitLossOutput } from '@/ai/flows/analyze-profit-loss-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ProfitLossReportData {
  period: string; // Label periode, mis. "Juli 2024"
  periodValue: string; // Nilai periode untuk AI, mis. "2024-07"
  totalRevenue: number;
  revenueFromSales: number;
  revenueFromOtherIncome: number;
  otherIncomeBreakdown: { category: IncomeCategory; amount: number }[];
  totalExpenses: number;
  expensesBreakdown: { category: ExpenseCategory; amount: number }[];
  netProfit: number;
}

const generatePreviousMonths = (count: number): { value: string; label: string }[] => {
  const months = [];
  let currentDate = new Date();
  for (let i = 0; i < count; i++) {
    const month = currentDate.getMonth(); // 0-11
    const year = currentDate.getFullYear();
    months.push({
      value: `${year}-${(month + 1).toString().padStart(2, '0')}`, // YYYY-MM
      label: formatDateFns(currentDate, 'MMMM yyyy', { locale: indonesiaLocale }),
    });
    currentDate = subMonths(currentDate, 1);
  }
  return months;
};

export default function ProfitLossPage() {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<ProfitLossReportData | null>(null);
  const availablePeriods = React.useMemo(() => generatePreviousMonths(12), []);
  const [selectedPeriod, setSelectedPeriod] = useState<string>(availablePeriods[0]?.value || '');
  
  const [aiAnalysis, setAiAnalysis] = useState<AnalyzeProfitLossOutput | null>(null);
  const [isLoadingAiAnalysis, setIsLoadingAiAnalysis] = useState(false);
  const [aiAnalysisError, setAiAnalysisError] = useState<string | null>(null);

  const { toast } = useToast();

  const fetchProfitLossData = useCallback(async (periodValue: string) => {
    if (!periodValue) {
      setReportData(null);
      setAiAnalysis(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setAiAnalysis(null); 
    setAiAnalysisError(null);

    const [year, month] = periodValue.split('-').map(Number);
    const startDate = Timestamp.fromDate(startOfMonth(new Date(year, month - 1, 1)));
    const endDate = Timestamp.fromDate(endOfMonth(new Date(year, month - 1, 1)));
    const periodLabel = availablePeriods.find(p => p.value === periodValue)?.label || periodValue;

    try {
      const transactionsRef = collection(db, 'transactions');
      const salesQuery = query(
        transactionsRef,
        where('status', '==', 'paid'),
        where('paidAt', '>=', startDate),
        where('paidAt', '<=', endDate)
      );
      const salesSnapshot = await getDocs(salesQuery);
      let revenueFromSales = 0;
      salesSnapshot.forEach(doc => {
        revenueFromSales += (doc.data() as Transaction).total;
      });

      const incomeEntriesRef = collection(db, 'incomeEntries');
      const incomeQuery = query(
        incomeEntriesRef,
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      );
      const incomeSnapshot = await getDocs(incomeQuery);
      let revenueFromOtherIncome = 0;
      const otherIncomeBreakdownMap = new Map<IncomeCategory, number>();
      incomeSnapshot.forEach(doc => {
        const income = doc.data() as IncomeEntry;
        revenueFromOtherIncome += income.amount;
        otherIncomeBreakdownMap.set(
          income.category,
          (otherIncomeBreakdownMap.get(income.category) || 0) + income.amount
        );
      });
      const otherIncomeBreakdown = Array.from(otherIncomeBreakdownMap).map(([category, amount]) => ({ category, amount }));

      const expensesRef = collection(db, 'expenses');
      const expensesQuery = query(
        expensesRef,
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      );
      const expensesSnapshot = await getDocs(expensesQuery);
      let totalExpenses = 0;
      const expensesBreakdownMap = new Map<ExpenseCategory, number>();
      expensesSnapshot.forEach(doc => {
        const expense = doc.data() as Expense;
        // Exclude "Setoran Tunai ke Bank" from P&L expenses as it's a balance sheet movement
        if (expense.category !== "Setoran Tunai ke Bank") {
            totalExpenses += expense.amount;
            expensesBreakdownMap.set(
            expense.category,
            (expensesBreakdownMap.get(expense.category) || 0) + expense.amount
            );
        }
      });
      const expensesBreakdown = Array.from(expensesBreakdownMap).map(([category, amount]) => ({ category, amount }));

      const totalRevenue = revenueFromSales + revenueFromOtherIncome;
      const netProfit = totalRevenue - totalExpenses;
      
      setReportData({
        period: periodLabel,
        periodValue: periodValue,
        totalRevenue,
        revenueFromSales,
        revenueFromOtherIncome,
        otherIncomeBreakdown,
        totalExpenses,
        expensesBreakdown,
        netProfit,
      });

    } catch (error) {
      console.error("Error fetching profit/loss data: ", error);
      toast({ title: "Error", description: "Gagal mengambil data laporan laba rugi.", variant: "destructive" });
      setReportData(null);
    } finally {
      setLoading(false);
    }
  }, [toast, availablePeriods]);

  useEffect(() => {
    if (selectedPeriod) {
      fetchProfitLossData(selectedPeriod);
    } else {
      setReportData(null);
      setAiAnalysis(null);
      setLoading(false);
    }
  }, [selectedPeriod, fetchProfitLossData]);

  useEffect(() => {
    if (reportData && !isLoadingAiAnalysis && !aiAnalysis && !aiAnalysisError) {
      const fetchAnalysis = async () => {
        setIsLoadingAiAnalysis(true);
        setAiAnalysisError(null);
        try {
          const inputForAI: AnalyzeProfitLossInput = {
            period: reportData.period,
            totalRevenue: reportData.totalRevenue,
            revenueFromSales: reportData.revenueFromSales,
            revenueFromOtherIncome: reportData.revenueFromOtherIncome,
            otherIncomeBreakdown: reportData.otherIncomeBreakdown,
            totalExpenses: reportData.totalExpenses,
            expensesBreakdown: reportData.expensesBreakdown,
            netProfit: reportData.netProfit,
          };
          const analysisResult = await analyzeProfitLoss(inputForAI);
          setAiAnalysis(analysisResult);
        } catch (error) {
          console.error("Error fetching AI analysis: ", error);
          setAiAnalysisError("Gagal mendapatkan analisa AI. Silakan coba lagi nanti.");
          toast({ title: "Analisa AI Error", description: "Terjadi masalah saat mengambil analisa dari AI.", variant: "destructive" });
        } finally {
          setIsLoadingAiAnalysis(false);
        }
      };
      fetchAnalysis();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportData]); // Trigger only when reportData changes

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Laporan Laba Rugi Bulanan" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Filter Laporan</CardTitle>
              <CardDescription>Pilih periode bulan dan tahun untuk melihat laporan.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod} disabled={loading}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Pilih Periode" />
                </SelectTrigger>
                <SelectContent>
                  {availablePeriods.map(p => (
                    <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                  ))}
                  {availablePeriods.length === 0 && <SelectItem value="" disabled>Tidak ada periode tersedia</SelectItem>}
                </SelectContent>
              </Select>
              <Button variant="outline" disabled className="w-full sm:w-auto"><Download className="mr-2 h-4 w-4" /> Ekspor (Segera)</Button>
            </div>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-3 text-lg">Memuat data laporan untuk {availablePeriods.find(p=>p.value === selectedPeriod)?.label || selectedPeriod}...</p>
          </div>
        ) : !reportData ? (
          <Card>
            <CardContent className="py-20 text-center">
              <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">
                {selectedPeriod ? "Tidak ada data untuk periode yang dipilih." : "Silakan pilih periode untuk menampilkan laporan."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Laba Rugi - {reportData.period}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <Card className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Pendapatan</CardTitle>
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">Rp {reportData.totalRevenue.toLocaleString('id-ID')}</div>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">Total Biaya</CardTitle>
                    <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-700 dark:text-red-300">Rp {reportData.totalExpenses.toLocaleString('id-ID')}</div>
                  </CardContent>
                </Card>
                <Card className={`${reportData.netProfit >= 0 ? 'bg-primary/10 dark:bg-primary/20 border-primary/30' : 'bg-destructive/10 dark:bg-destructive/20 border-destructive/30'}`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className={`text-sm font-medium ${reportData.netProfit >= 0 ? 'text-primary' : 'text-destructive'}`}>Laba / Rugi Bersih</CardTitle>
                    <TrendingUp className={`h-5 w-5 ${reportData.netProfit >= 0 ? 'text-primary' : 'text-destructive'}`} />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${reportData.netProfit >= 0 ? 'text-primary' : 'text-destructive'}`}>Rp {reportData.netProfit.toLocaleString('id-ID')}</div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
            
            {isLoadingAiAnalysis ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Sparkles className="mr-2 h-5 w-5 text-accent" />Analisa AI ✨</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2 text-muted-foreground">AI sedang menganalisa data...</p>
                </CardContent>
              </Card>
            ) : aiAnalysisError ? (
              <Alert variant="destructive">
                <Sparkles className="h-4 w-4" />
                <AlertTitle>Analisa AI Gagal</AlertTitle>
                <AlertDescription>{aiAnalysisError}</AlertDescription>
              </Alert>
            ) : aiAnalysis && (
              <Card className="bg-accent/5 dark:bg-accent/10 border-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-accent"><Sparkles className="mr-2 h-6 w-6" />Analisa AI ✨</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Ringkasan Performa:</h4>
                    <p className="text-sm">{aiAnalysis.summary}</p>
                  </div>
                  {aiAnalysis.keyObservations && aiAnalysis.keyObservations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-1">Observasi Kunci:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {aiAnalysis.keyObservations.map((obs, index) => <li key={index}>{obs}</li>)}
                      </ul>
                    </div>
                  )}
                  {aiAnalysis.recommendations && aiAnalysis.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-1">Saran/Rekomendasi:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {aiAnalysis.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rincian Pendapatan</CardTitle>
                  <CardDescription>Sumber pendapatan untuk periode {reportData.period}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sumber Pendapatan</TableHead>
                        <TableHead className="text-right">Jumlah (Rp)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Penjualan (POS)</TableCell>
                        <TableCell className="text-right">{reportData.revenueFromSales.toLocaleString('id-ID')}</TableCell>
                      </TableRow>
                      {reportData.otherIncomeBreakdown.length > 0 && reportData.otherIncomeBreakdown.map(item => (
                        <TableRow key={item.category}>
                          <TableCell className="pl-6">Pemasukan Lain: {item.category}</TableCell>
                          <TableCell className="text-right">{item.amount.toLocaleString('id-ID')}</TableCell>
                        </TableRow>
                      ))}
                       <TableRow className="font-semibold bg-muted/50">
                        <TableCell>Total Pendapatan</TableCell>
                        <TableCell className="text-right">{reportData.totalRevenue.toLocaleString('id-ID')}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rincian Biaya</CardTitle>
                  <CardDescription>Kategori pengeluaran untuk periode {reportData.period}. (Tidak termasuk Setoran Tunai ke Bank)</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kategori Biaya</TableHead>
                        <TableHead className="text-right">Jumlah (Rp)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportData.expensesBreakdown.length > 0 ? reportData.expensesBreakdown.map(item => (
                        <TableRow key={item.category}>
                          <TableCell>{item.category}</TableCell>
                          <TableCell className="text-right">{item.amount.toLocaleString('id-ID')}</TableCell>
                        </TableRow>
                      )) : (
                        <TableRow><TableCell colSpan={2} className="text-center text-muted-foreground">Tidak ada biaya tercatat.</TableCell></TableRow>
                      )}
                       <TableRow className="font-semibold bg-muted/50">
                        <TableCell>Total Biaya</TableCell>
                        <TableCell className="text-right">{reportData.totalExpenses.toLocaleString('id-ID')}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
