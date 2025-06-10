
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChartBig, Users, ShoppingCart, ListOrdered, CreditCard, Star as StarIcon, Loader2 } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp, startOfDay, endOfDay, onSnapshot } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { Transaction } from '@/types/transaction';

interface DashboardSummary {
  todaysRevenue: number;
  transactionsToday: number;
  queueWaiting: number;
  queueInService: number;
}

export default function DashboardPage() {
  const [summaryData, setSummaryData] = useState<DashboardSummary>({
    todaysRevenue: 0,
    transactionsToday: 0,
    queueWaiting: 0,
    queueInService: 0,
  });
  const [loadingSummary, setLoadingSummary] = useState(true);
  const { toast } = useToast();

  const fetchDashboardSummary = useCallback(async () => {
    setLoadingSummary(true);
    try {
      const today = new Date();
      const todayStart = startOfDay(today);
      const todayEnd = endOfDay(today);

      // Todays Revenue & Transactions
      const transactionsRef = collection(db, 'transactions');
      const paidTransactionsQuery = query(
        transactionsRef,
        where('status', '==', 'paid'),
        where('paidAt', '>=', Timestamp.fromDate(todayStart)),
        where('paidAt', '<=', Timestamp.fromDate(todayEnd))
      );
      const paidTransactionsSnap = await getDocs(paidTransactionsQuery);
      let revenue = 0;
      paidTransactionsSnap.forEach(doc => {
        revenue += (doc.data() as Transaction).total;
      });
      const transactionsCount = paidTransactionsSnap.size;

      // Queue Data - Using onSnapshot for real-time updates on queue
      const queueRef = collection(db, 'queueItems');
      const waitingQuery = query(queueRef, where('status', '==', 'Menunggu'));
      const inServiceQuery = query(queueRef, where('status', '==', 'Dalam Layanan'));

      const waitingSnap = await getDocs(waitingQuery);
      const inServiceSnap = await getDocs(inServiceQuery);
      
      setSummaryData({
        todaysRevenue: revenue,
        transactionsToday: transactionsCount,
        queueWaiting: waitingSnap.size,
        queueInService: inServiceSnap.size,
      });

    } catch (error) {
      console.error("Error fetching dashboard summary: ", error);
      toast({ title: "Error", description: "Gagal memuat ringkasan dasbor.", variant: "destructive" });
    } finally {
      setLoadingSummary(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDashboardSummary(); // Initial fetch

    // Real-time listener for queue counts
    const queueRef = collection(db, 'queueItems');
    const unsubscribeQueue = onSnapshot(queueRef, async () => {
        // Refetch only queue parts or re-evaluate summaryData based on new queue snapshot
        // For simplicity, we can refetch the queue part of summaryData
        try {
            const waitingQuery = query(queueRef, where('status', '==', 'Menunggu'));
            const inServiceQuery = query(queueRef, where('status', '==', 'Dalam Layanan'));
            const waitingSnap = await getDocs(waitingQuery);
            const inServiceSnap = await getDocs(inServiceQuery);
            setSummaryData(prev => ({
                ...prev,
                queueWaiting: waitingSnap.size,
                queueInService: inServiceSnap.size,
            }));
        } catch (error) {
            console.error("Error on queue snapshot update: ", error);
        }
    }, (error) => {
        console.error("Queue listener error: ", error);
        toast({ title: "Error Update Antrian", description: "Gagal mendapatkan update antrian real-time.", variant: "warning" });
    });
    
    // Optional: Real-time listener for revenue/transactions if needed, but can be heavy.
    // For now, revenue and transactions are fetched once on load.
    // If real-time for revenue/transactions is critical, a similar onSnapshot pattern can be applied.

    return () => {
        unsubscribeQueue();
        // unsubscribeTransactions(); // if implemented
    };
  }, [fetchDashboardSummary, toast]);


  const summaryCardsConfig = [
    { title: "Pendapatan Hari Ini", getValue: () => `Rp ${summaryData.todaysRevenue.toLocaleString('id-ID')}`, icon: ShoppingCart, dataAiHint: "grafik uang" },
    { title: "Transaksi Selesai Hari Ini", getValue: () => summaryData.transactionsToday.toString(), icon: Users, dataAiHint: "antrian orang" },
    { title: "Antrian Menunggu", getValue: () => summaryData.queueWaiting.toString(), icon: ListOrdered, dataAiHint: "daftar tunggu" },
    { title: "Antrian Dalam Layanan", getValue: () => summaryData.queueInService.toString(), icon: BarChartBig, dataAiHint: "progres tugas" },
  ];

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Dasbor" />
      <main className="flex-1 overflow-y-auto p-6">
        {loadingSummary ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium"><Loader2 className="h-4 w-4 animate-spin inline-block mr-2" /> Memuat...</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-</div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {summaryCardsConfig.map((card) => (
              <Card key={card.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <card.icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.getValue()}</div>
                  {/* <p className="text-xs text-muted-foreground">{card.change} dari kemarin</p> */}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaksi Terkini</CardTitle>
              <CardDescription>Gambaran umum penjualan terbaru. (Data Placeholder)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md border">
                    <div>
                      <p className="font-medium">Layanan {i + 1}: Detailing Lengkap</p>
                      <p className="text-sm text-muted-foreground">Klien: John Doe - Honda CBR250RR</p>
                    </div>
                    <p className="font-semibold text-primary">Rp {(350000).toLocaleString('id-ID')}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Antrian Saat Ini</CardTitle>
              <CardDescription>Pelanggan menunggu layanan. (Data Placeholder)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md border bg-card">
                    <div className="flex items-center gap-3">
                       <Users className="h-5 w-5 text-accent" />
                       <div>
                         <p className="font-medium">Pelanggan #{i+153}</p>
                         <p className="text-xs text-muted-foreground">Cuci Motor</p>
                       </div>
                    </div>
                    <span className="text-sm text-muted-foreground">Menunggu</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                Metode Pembayaran Populer
              </CardTitle>
              <CardDescription>Metode pembayaran yang paling sering digunakan oleh pelanggan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>QRIS</span>
                  <Badge variant="default" className="text-sm">65%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tunai</span>
                  <Badge variant="secondary" className="text-sm">25%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Kartu Debit</span>
                  <Badge variant="outline" className="text-sm">10%</Badge>
                </div>
                 <p className="text-xs text-muted-foreground pt-2">*Data placeholder untuk ilustrasi.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <StarIcon className="h-5 w-5 mr-2 text-primary" />
                Layanan & Produk Terlaris
              </CardTitle>
              <CardDescription>Item yang paling banyak diminati pelanggan bulan ini.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Cuci Motor Premium</span>
                  <Badge variant="default" className="text-sm">120x</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Paket Detailing Lengkap</span>
                  <Badge variant="secondary" className="text-sm">75x</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sanitasi Helm</span>
                  <Badge variant="secondary" className="text-sm">90x</Badge>
                </div>
                 <div className="flex items-center justify-between">
                  <span>Pelumas Rantai (Merek X)</span>
                  <Badge variant="outline" className="text-sm">50x</Badge>
                </div>
                <p className="text-xs text-muted-foreground pt-2">*Data placeholder untuk ilustrasi.</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
