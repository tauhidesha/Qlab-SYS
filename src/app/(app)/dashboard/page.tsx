
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChartBig, Users, ShoppingCart, ListOrdered, CreditCard, Star as StarIcon, Loader2 } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { startOfDay, endOfDay, format as formatDateFns } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import type { Transaction, TransactionItem } from '@/types/transaction';
import type { QueueItem } from '@/app/(app)/queue/page'; // Assuming QueueItem type is exported from queue page

interface DashboardSummary {
  todaysRevenue: number;
  transactionsToday: number;
  queueWaiting: number;
  queueInService: number;
}

interface RecentTransaction extends Transaction {
  formattedPaidAt?: string;
}

interface PopularPaymentMethod {
  method: string;
  count: number;
  percentage: string;
}

interface BestsellingItem {
  id: string;
  name: string;
  quantitySold: number;
}

export default function DashboardPage() {
  const [summaryData, setSummaryData] = useState<DashboardSummary>({
    todaysRevenue: 0,
    transactionsToday: 0,
    queueWaiting: 0,
    queueInService: 0,
  });
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
  const [loadingRecentTransactions, setLoadingRecentTransactions] = useState(true);
  const [currentQueueDetailed, setCurrentQueueDetailed] = useState<QueueItem[]>([]);
  const [loadingQueueDetailed, setLoadingQueueDetailed] = useState(true);
  const [popularPaymentMethods, setPopularPaymentMethods] = useState<PopularPaymentMethod[]>([]);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(true);
  const [bestsellingItems, setBestsellingItems] = useState<BestsellingItem[]>([]);
  const [loadingBestsellers, setLoadingBestsellers] = useState(true);

  const { toast } = useToast();

  const fetchDashboardData = useCallback(async () => {
    setLoadingSummary(true);
    setLoadingRecentTransactions(true);
    setLoadingPaymentMethods(true);
    setLoadingBestsellers(true);

    try {
      const today = new Date();
      const todayStart = startOfDay(today);
      const todayEnd = endOfDay(today);

      // Summary: Todays Revenue & Transactions
      const transactionsRef = collection(db, 'transactions');
      const paidTransactionsTodayQuery = query(
        transactionsRef,
        where('status', '==', 'paid'),
        where('paidAt', '>=', Timestamp.fromDate(todayStart)),
        where('paidAt', '<=', Timestamp.fromDate(todayEnd))
      );
      const paidTransactionsTodaySnap = await getDocs(paidTransactionsTodayQuery);
      let revenue = 0;
      paidTransactionsTodaySnap.forEach(doc => {
        revenue += (doc.data() as Transaction).total;
      });
      
      setSummaryData(prev => ({
        ...prev,
        todaysRevenue: revenue,
        transactionsToday: paidTransactionsTodaySnap.size,
      }));
      setLoadingSummary(false); // Summary part done

      // Recent Transactions (last 5 paid)
      const recentTransQuery = query(transactionsRef, where('status', '==', 'paid'), orderBy('paidAt', 'desc'), limit(5));
      const recentTransSnap = await getDocs(recentTransQuery);
      const recentTransData = recentTransSnap.docs.map(doc => {
        const data = doc.data() as Transaction;
        return { 
          ...data, 
          id: doc.id,
          formattedPaidAt: data.paidAt ? formatDateFns(data.paidAt.toDate(), 'dd MMM, HH:mm', { locale: indonesiaLocale }) : 'N/A'
        };
      });
      setRecentTransactions(recentTransData);
      setLoadingRecentTransactions(false);

      // Popular Payment Methods & Bestselling Items (from all paid transactions for simplicity, can be scoped later)
      const allPaidTransactionsQuery = query(transactionsRef, where('status', '==', 'paid'));
      const allPaidTransactionsSnap = await getDocs(allPaidTransactionsQuery);
      
      const paymentMethodCounts: Record<string, number> = {};
      const itemCounts: Record<string, { name: string; quantity: number }> = {};
      let totalPaidTransactions = 0;

      allPaidTransactionsSnap.forEach(doc => {
        const transaction = doc.data() as Transaction;
        totalPaidTransactions++;
        if (transaction.paymentMethod) {
          paymentMethodCounts[transaction.paymentMethod] = (paymentMethodCounts[transaction.paymentMethod] || 0) + 1;
        }
        transaction.items.forEach(item => {
          if (item.type !== 'reward_merchandise') { // Exclude rewards
            const current = itemCounts[item.catalogItemId] || { name: item.name, quantity: 0 };
            itemCounts[item.catalogItemId] = { 
              name: item.name, 
              quantity: current.quantity + item.quantity 
            };
          }
        });
      });

      const popularMethods = Object.entries(paymentMethodCounts)
        .map(([method, count]) => ({
          method,
          count,
          percentage: totalPaidTransactions > 0 ? ((count / totalPaidTransactions) * 100).toFixed(0) + "%" : "0%",
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
      setPopularPaymentMethods(popularMethods);
      setLoadingPaymentMethods(false);

      const bestsellers = Object.entries(itemCounts)
        .map(([id, data]) => ({
          id,
          name: data.name,
          quantitySold: data.quantity,
        }))
        .sort((a, b) => b.quantitySold - a.quantitySold)
        .slice(0, 4);
      setBestsellingItems(bestsellers);
      setLoadingBestsellers(false);

    } catch (error) {
      console.error("Error fetching dashboard data: ", error);
      toast({ title: "Error", description: "Gagal memuat data dasbor.", variant: "destructive" });
      // Set all loading states to false on error
      setLoadingSummary(false);
      setLoadingRecentTransactions(false);
      setLoadingQueueDetailed(false); // Ensure this is also handled
      setLoadingPaymentMethods(false);
      setLoadingBestsellers(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDashboardData(); // Initial fetch for non-realtime data

    // Real-time listener for queue counts (summary) and detailed queue
    setLoadingQueueDetailed(true);
    const queueRef = collection(db, 'queueItems');
    const unsubscribeQueue = onSnapshot(queueRef, async (snapshot) => {
      try {
        const waitingQuery = query(queueRef, where('status', '==', 'Menunggu'), orderBy('createdAt', 'asc'));
        const inServiceQuery = query(queueRef, where('status', '==', 'Dalam Layanan'), orderBy('createdAt', 'asc'));
        
        const [waitingSnap, inServiceSnap] = await Promise.all([getDocs(waitingQuery), getDocs(inServiceQuery)]);
        
        setSummaryData(prev => ({
          ...prev,
          queueWaiting: waitingSnap.size,
          queueInService: inServiceSnap.size,
        }));

        const detailedQueueData: QueueItem[] = [
          ...waitingSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as QueueItem)),
          ...inServiceSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as QueueItem))
        ].sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0)) // Ensure combined sort
         .slice(0, 5); // Limit for display

        setCurrentQueueDetailed(detailedQueueData);

      } catch (error) {
        console.error("Error on queue snapshot update: ", error);
        toast({ title: "Error Update Antrian", description: "Gagal mendapatkan update antrian real-time.", variant: "warning" });
      } finally {
        setLoadingQueueDetailed(false);
        // Ensure summary loading is false if it was depending on initial queue fetch
        if (loadingSummary && !summaryData.todaysRevenue) setLoadingSummary(false);
      }
    }, (error) => {
      console.error("Queue listener error: ", error);
      toast({ title: "Error Listener Antrian", description: "Gagal koneksi ke update antrian.", variant: "warning" });
      setLoadingQueueDetailed(false);
      setLoadingSummary(false);
    });
    
    return () => {
      unsubscribeQueue();
    };
  }, [fetchDashboardData, toast]); // fetchDashboardData removed from deps to prevent re-triggering its full fetch on queue update


  const summaryCardsConfig = [
    { title: "Pendapatan Hari Ini", getValue: () => `Rp ${summaryData.todaysRevenue.toLocaleString('id-ID')}`, icon: ShoppingCart, dataAiHint: "grafik uang", isLoading: loadingSummary },
    { title: "Transaksi Selesai Hari Ini", getValue: () => summaryData.transactionsToday.toString(), icon: Users, dataAiHint: "antrian orang", isLoading: loadingSummary },
    { title: "Antrian Menunggu", getValue: () => summaryData.queueWaiting.toString(), icon: ListOrdered, dataAiHint: "daftar tunggu", isLoading: loadingSummary || loadingQueueDetailed },
    { title: "Antrian Dalam Layanan", getValue: () => summaryData.queueInService.toString(), icon: BarChartBig, dataAiHint: "progres tugas", isLoading: loadingSummary || loadingQueueDetailed },
  ];

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Dasbor" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {summaryCardsConfig.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                {card.isLoading ? <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" /> : <card.icon className="h-5 w-5 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                {card.isLoading ? <div className="text-2xl font-bold">-</div> : <div className="text-2xl font-bold">{card.getValue()}</div>}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaksi Terkini</CardTitle>
              <CardDescription>5 penjualan terakhir yang sudah dibayar.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingRecentTransactions ? (
                <div className="flex items-center justify-center py-10"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div>
              ) : recentTransactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">Tidak ada transaksi terbayar.</p>
              ) : (
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-md border">
                      <div>
                        <p className="font-medium">{tx.customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {tx.items.length > 0 ? tx.items[0].name : 'Item tidak tersedia'}
                          {tx.items.length > 1 ? ` (+${tx.items.length - 1} lainnya)` : ''}
                        </p>
                        <p className="text-xs text-muted-foreground">{tx.formattedPaidAt}</p>
                      </div>
                      <p className="font-semibold text-primary">Rp {tx.total.toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Antrian Saat Ini</CardTitle>
              <CardDescription>Pelanggan menunggu atau sedang dilayani.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingQueueDetailed ? (
                <div className="flex items-center justify-center py-10"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div>
              ) : currentQueueDetailed.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">Antrian kosong.</p>
              ) : (
                <div className="space-y-3">
                  {currentQueueDetailed.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-md border bg-card">
                      <div className="flex items-center gap-3">
                         {item.status === 'Menunggu' ? <ListOrdered className="h-5 w-5 text-yellow-500" /> : <BarChartBig className="h-5 w-5 text-blue-500" />}
                         <div>
                           <p className="font-medium">{item.customerName}</p>
                           <p className="text-xs text-muted-foreground">{item.service}</p>
                         </div>
                      </div>
                      <Badge variant={item.status === 'Menunggu' ? 'outline' : 'default'} className="capitalize">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                Metode Pembayaran Populer
              </CardTitle>
              <CardDescription>Metode pembayaran yang paling sering digunakan.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingPaymentMethods ? (
                <div className="flex items-center justify-center py-10"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div>
              ) : popularPaymentMethods.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">Belum ada data pembayaran.</p>
              ) : (
                <div className="space-y-3">
                  {popularPaymentMethods.map((pm) => (
                    <div key={pm.method} className="flex justify-between items-center">
                      <span>{pm.method}</span>
                      <Badge variant="secondary" className="text-sm">{pm.percentage} ({pm.count})</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <StarIcon className="h-5 w-5 mr-2 text-primary" />
                Layanan & Produk Terlaris
              </CardTitle>
              <CardDescription>Item yang paling banyak terjual.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingBestsellers ? (
                <div className="flex items-center justify-center py-10"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div>
              ) : bestsellingItems.length === 0 ? (
                 <p className="text-center text-muted-foreground py-4">Belum ada item terjual.</p>
              ) : (
                <div className="space-y-3">
                  {bestsellingItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <span className="truncate max-w-[70%]">{item.name}</span>
                      <Badge variant="default" className="text-sm">{item.quantitySold}x</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
