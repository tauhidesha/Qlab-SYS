"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChartBig, Users, ShoppingCart, ListOrdered, CreditCard, Star as StarIcon, Loader2, TrendingUp } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { startOfDay, endOfDay, format as formatDateFns, getDaysInMonth, getDate } from 'date-fns';
import { id as indonesiaLocale } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import type { Transaction, TransactionItem } from '@/types/transaction';
import type { QueueItem } from '@/app/(app)/queue/page'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";


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

interface DailyIncomeChartData {
  date: string; // e.g., "01", "02", ... "31"
  Pemasukan: number; // Total income for that day
}

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false); // State to ensure client-side rendering for charts

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    setIsClient(true);
  }, []);

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
  const [dailyIncomeData, setDailyIncomeData] = useState<DailyIncomeChartData[]>([]);
  const [loadingDailyIncome, setLoadingDailyIncome] = useState(true);

  const { toast } = useToast();

  const fetchDashboardData = useCallback(async () => {
    setLoadingSummary(true);
    setLoadingRecentTransactions(true);
    setLoadingPaymentMethods(true);
    setLoadingBestsellers(true);
    setLoadingDailyIncome(true);

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
      setLoadingSummary(false); 

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
          if (item.type !== 'reward_merchandise') { 
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

      // Daily Income for Current Month
      const currentMonthStart = startOfDay(new Date(today.getFullYear(), today.getMonth(), 1));
      const currentMonthEnd = endOfDay(new Date(today.getFullYear(), today.getMonth() + 1, 0));
      const daysInMonth = getDaysInMonth(today);
      const initialDailyData: DailyIncomeChartData[] = Array.from({ length: daysInMonth }, (_, i) => ({
        date: formatDateFns(new Date(today.getFullYear(), today.getMonth(), i + 1), 'dd'),
        Pemasukan: 0,
      }));

      const monthlyIncomeQuery = query(
        transactionsRef,
        where('status', '==', 'paid'),
        where('paidAt', '>=', Timestamp.fromDate(currentMonthStart)),
        where('paidAt', '<=', Timestamp.fromDate(currentMonthEnd)),
        orderBy('paidAt', 'asc')
      );
      const monthlyIncomeSnap = await getDocs(monthlyIncomeQuery);
      monthlyIncomeSnap.forEach(doc => {
        const transaction = doc.data() as Transaction;
        if (transaction.paidAt) {
          const dayOfMonth = getDate(transaction.paidAt.toDate()); // 1-31
          const dayIndex = dayOfMonth - 1;
          if (initialDailyData[dayIndex]) {
            initialDailyData[dayIndex].Pemasukan += transaction.total;
          }
        }
      });
      setDailyIncomeData(initialDailyData);
      setLoadingDailyIncome(false);


    } catch (error) {
      console.error("Error fetching dashboard data: ", error);
      toast({ title: "Error", description: "Gagal memuat data dasbor.", variant: "destructive" });
      setLoadingSummary(false);
      setLoadingRecentTransactions(false);
      setLoadingQueueDetailed(false); 
      setLoadingPaymentMethods(false);
      setLoadingBestsellers(false);
      setLoadingDailyIncome(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDashboardData(); 

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
        ].sort((a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0)) 
         .slice(0, 5); 

        setCurrentQueueDetailed(detailedQueueData);

      } catch (error) {
        console.error("Error on queue snapshot update: ", error);
        toast({ title: "Error Update Antrian", description: "Gagal mendapatkan update antrian real-time.", variant: "destructive" });
      } finally {
        setLoadingQueueDetailed(false);
        if (loadingSummary && !summaryData.todaysRevenue) setLoadingSummary(false);
      }
    }, (error) => {
      console.error("Queue listener error: ", error);
      toast({ title: "Error Listener Antrian", description: "Gagal koneksi ke update antrian.", variant: "destructive" });
      setLoadingQueueDetailed(false);
      setLoadingSummary(false);
    });
    
    return () => {
      unsubscribeQueue();
    };
  }, [toast]); // Removed fetchDashboardData from here as it should only run once typically

  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(1).replace(/\.0$/, '')} Jt`;
    }
    if (value >= 1000) {
      return `Rp ${Math.floor(value / 1000)} Rb`;
    }
    return `Rp ${value.toLocaleString('id-ID')}`;
  };

  const summaryCardsConfig = [
    { title: "Pendapatan Hari Ini", shortTitle: "Pendapatan", getValue: () => formatCompactCurrency(summaryData.todaysRevenue), icon: ShoppingCart, dataAiHint: "grafik uang", isLoading: loadingSummary },
    { title: "Transaksi Selesai Hari Ini", shortTitle: "Transaksi", getValue: () => summaryData.transactionsToday.toString(), icon: Users, dataAiHint: "antrian orang", isLoading: loadingSummary },
    { title: "Antrian Menunggu", shortTitle: "Menunggu", getValue: () => summaryData.queueWaiting.toString(), icon: ListOrdered, dataAiHint: "daftar tunggu", isLoading: loadingSummary || loadingQueueDetailed },
    { title: "Antrian Dalam Layanan", shortTitle: "Dalam Layanan", getValue: () => summaryData.queueInService.toString(), icon: BarChartBig, dataAiHint: "progres tugas", isLoading: loadingSummary || loadingQueueDetailed },
  ];
  
  const dailyIncomeChartConfig = {
    Pemasukan: {
      label: "Pemasukan",
      color: "hsl(var(--accent))", // Menggunakan warna aksen (oranye)
    },
  } satisfies ChartConfig;

  const formatYAxis = (tickItem: number) => `Rp ${(tickItem / 1000000).toFixed(1)} Jt`;


  return (
    <div className="flex flex-col h-full overflow-x-hidden">
      <AppHeader title="Dasbor" />
      <main className="flex-1 overflow-y-auto overflow-x-hidden px-1 py-3 sm:px-4 sm:py-6 w-full">
        <div className="grid gap-1 sm:gap-2 sm:gap-3 grid-cols-2 lg:grid-cols-4 mb-3 sm:mb-4 sm:mb-6 w-full min-w-0">
          {summaryCardsConfig.map((card) => (
            <Card key={card.title} className="p-1 sm:p-2 sm:p-4 min-w-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-0 pt-0">
                <CardTitle className="text-xs sm:text-sm font-medium leading-tight min-w-0 truncate pr-1">
                  <span className="block sm:hidden">{card.shortTitle}</span>
                  <span className="hidden sm:block">{card.title}</span>
                </CardTitle>
                {card.isLoading ? <Loader2 className="h-3 w-3 sm:h-5 sm:w-5 text-muted-foreground animate-spin flex-shrink-0" /> : <card.icon className="h-3 w-3 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />}
              </CardHeader>
              <CardContent className="px-0 pb-0">
                {card.isLoading ? <div className="text-sm sm:text-2xl font-bold">-</div> : <div className="text-xs sm:text-sm sm:text-2xl font-bold truncate">{card.getValue()}</div>}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-3 sm:mb-4 sm:mb-6 w-full min-w-0 overflow-hidden">
            <CardHeader className="pb-2 sm:pb-3 sm:pb-4">
                <CardTitle className="flex items-center text-sm sm:text-base sm:text-lg min-w-0">
                    <TrendingUp className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span className="truncate">Pendapatan Harian</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Total pendapatan dari transaksi terbayar per hari dalam bulan ini.</CardDescription>
            </CardHeader>
            <CardContent className="min-w-0 overflow-hidden p-2 sm:p-4">
                {loadingDailyIncome ? (
                    <div className="flex items-center justify-center h-[140px] sm:h-[200px] sm:h-[250px] sm:h-[350px]"><Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-primary" /></div>
                ) : !isClient ? (
                    <div className="flex items-center justify-center h-[140px] sm:h-[200px] sm:h-[250px] sm:h-[350px]"><Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-primary" /></div>
                ) : dailyIncomeData.length === 0 ? (
                    <p className="text-center text-muted-foreground py-10 h-[140px] sm:h-[200px] sm:h-[250px] sm:h-[350px] flex items-center justify-center text-xs sm:text-sm">Belum ada data pendapatan untuk bulan ini.</p>
                ) : (
                <div className="w-full overflow-hidden">
                <ChartContainer config={dailyIncomeChartConfig} className="h-[140px] sm:h-[200px] sm:h-[250px] sm:h-[350px] w-full min-w-0">
                    <BarChart accessibilityLayer data={dailyIncomeData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="date" 
                            tickLine={false} 
                            axisLine={false} 
                            tickMargin={2}
                            fontSize={7}
                            interval={1}
                            minTickGap={5}
                            tickFormatter={(value) => value}
                        />
                        <YAxis 
                            tickFormatter={formatYAxis} 
                            tickLine={false} 
                            axisLine={false} 
                            tickMargin={1}
                            fontSize={6}
                            width={30}
                        />
                        <ChartTooltip 
                            cursor={false} 
                            content={<ChartTooltipContent 
                                        labelFormatter={(value, payload) => `Tgl ${value}/${formatDateFns(new Date(), 'MM', {locale: indonesiaLocale})}`}
                                        formatter={(value) => `Rp ${Number(value).toLocaleString('id-ID')}`} 
                                        indicator="dot" 
                                     />} 
                        />
                        <Bar dataKey="Pemasukan" fill="var(--color-Pemasukan)" radius={1} />
                    </BarChart>
                </ChartContainer>
                </div>
                )}
            </CardContent>
        </Card>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 sm:gap-4 sm:gap-6 w-full min-w-0">
          <Card className="min-w-0">
            <CardHeader className="pb-2 sm:pb-3 sm:pb-4">
              <CardTitle className="text-sm sm:text-base sm:text-lg">Transaksi Terkini</CardTitle>
              <CardDescription className="text-xs sm:text-sm">5 penjualan terakhir yang sudah dibayar.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingRecentTransactions ? (
                <div className="flex items-center justify-center py-8 sm:py-10"><Loader2 className="h-6 w-6 sm:h-7 sm:w-7 animate-spin text-primary" /></div>
              ) : recentTransactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-4 text-sm">Tidak ada transaksi terbayar.</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-2 sm:p-3 rounded-md border">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base truncate">{tx.customerName}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          {tx.items.length > 0 ? tx.items[0].name : 'Item tidak tersedia'}
                          {tx.items.length > 1 ? ` (+${tx.items.length - 1} lainnya)` : ''}
                        </p>
                        <p className="text-xs text-muted-foreground">{tx.formattedPaidAt}</p>
                      </div>
                      <p className="font-semibold text-primary text-sm sm:text-base ml-2 flex-shrink-0">Rp {tx.total.toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-sm sm:text-base sm:text-lg">Antrian Saat Ini</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Pelanggan menunggu atau sedang dilayani.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingQueueDetailed ? (
                <div className="flex items-center justify-center py-8 sm:py-10"><Loader2 className="h-6 w-6 sm:h-7 sm:w-7 animate-spin text-primary" /></div>
              ) : currentQueueDetailed.length === 0 ? (
                <p className="text-center text-muted-foreground py-4 text-sm">Antrian kosong.</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {currentQueueDetailed.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 sm:p-3 rounded-md border bg-card">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                         {item.status === 'Menunggu' ? <ListOrdered className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0" /> : <BarChartBig className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />}
                         <div className="min-w-0 flex-1">
                           <p className="font-medium text-sm sm:text-base truncate">{item.customerName}</p>
                           <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.service}</p>
                         </div>
                      </div>
                      <Badge variant={item.status === 'Menunggu' ? 'outline' : 'default'} className="capitalize text-xs flex-shrink-0">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center text-sm sm:text-base sm:text-lg">
                <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                Metode Pembayaran Populer
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Metode pembayaran yang paling sering digunakan.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingPaymentMethods ? (
                <div className="flex items-center justify-center py-8 sm:py-10"><Loader2 className="h-6 w-6 sm:h-7 sm:w-7 animate-spin text-primary" /></div>
              ) : popularPaymentMethods.length === 0 ? (
                <p className="text-center text-muted-foreground py-4 text-sm">Belum ada data pembayaran.</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {popularPaymentMethods.map((pm) => (
                    <div key={pm.method} className="flex justify-between items-center">
                      <span className="text-sm sm:text-base truncate flex-1">{pm.method}</span>
                      <Badge variant="secondary" className="text-xs sm:text-sm ml-2 flex-shrink-0">{pm.percentage} ({pm.count})</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center text-sm sm:text-base sm:text-lg">
                <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                Layanan & Produk Terlaris
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Item yang paling banyak terjual.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingBestsellers ? (
                <div className="flex items-center justify-center py-8 sm:py-10"><Loader2 className="h-6 w-6 sm:h-7 sm:w-7 animate-spin text-primary" /></div>
              ) : bestsellingItems.length === 0 ? (
                 <p className="text-center text-muted-foreground py-4 text-sm">Belum ada item terjual.</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {bestsellingItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <span className="truncate max-w-[70%] text-sm sm:text-base">{item.name}</span>
                      <Badge variant="default" className="text-xs sm:text-sm flex-shrink-0">{item.quantitySold}x</Badge>
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




