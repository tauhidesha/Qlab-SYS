
"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock, CheckCircle, ListOrdered } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface QueueItem {
  id: string;
  customerName: string;
  clientId?: string;
  vehicleInfo: string;
  service: string;
  serviceId?: string;
  status: 'Menunggu' | 'Dalam Layanan' | 'Selesai';
  estimatedTime: string;
  staff?: string;
  createdAt: Timestamp;
  completedAt?: Timestamp; // Added for auto-hide logic
}

const AUTO_HIDE_DELAY_MS = 5 * 60 * 1000; // 5 minutes

export default function QueueDisplayPage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [loadingQueue, setLoadingQueue] = useState(true);
  const { toast } = useToast();

  const getStatusBadgeVariant = (status: QueueItem['status']) => {
    if (status === 'Dalam Layanan') return 'default';
    if (status === 'Selesai') return 'secondary';
    return 'outline';
  };

  const getStatusIcon = (status: QueueItem['status']) => {
    if (status === 'Dalam Layanan') return <Clock className="h-5 w-5 text-primary" />;
    if (status === 'Selesai') return <CheckCircle className="h-5 w-5 text-green-500" />;
    return <Clock className="h-5 w-5 text-yellow-500" />; // Menunggu
  };

  useEffect(() => {
    setLoadingQueue(true);
    const queueCollectionRef = collection(db, 'queueItems');
    const q = query(queueCollectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const now = Date.now();
      const itemsData = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt || Timestamp.now(),
            completedAt: data.completedAt
          } as QueueItem;
        })
        .filter(item => {
          if (item.status === 'Selesai' && item.completedAt) {
            const completedTime = item.completedAt.toDate().getTime();
            if (now - completedTime > AUTO_HIDE_DELAY_MS) {
              return false; // Hide if completed more than 5 minutes ago
            }
          }
          return true;
        });
        
      setQueueItems(itemsData);
      setLoadingQueue(false);
    }, (error) => {
      console.error("Error fetching queue items with real-time updates: ", error);
      toast({ title: "Error Koneksi", description: "Tidak dapat mengambil data antrian secara real-time.", variant: "destructive" });
      setLoadingQueue(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [toast]);
  
  // Effect to periodically re-filter items to hide completed ones
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      setQueueItems(prevItems => 
        prevItems.filter(item => {
          if (item.status === 'Selesai' && item.completedAt) {
            const completedTime = item.completedAt.toDate().getTime();
            return !(now - completedTime > AUTO_HIDE_DELAY_MS);
          }
          return true;
        })
      );
    }, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      <div className="w-full max-w-5xl mx-auto">
        <Card className="shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-3">
              <ListOrdered className="h-10 w-10 text-primary mr-3" />
              <CardTitle className="text-4xl font-bold tracking-tight">Status Antrian Layanan</CardTitle>
            </div>
            <CardDescription className="text-lg text-muted-foreground">
              Pelanggan yang sedang menunggu dan dilayani saat ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            {loadingQueue && queueItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                <p className="text-2xl text-muted-foreground">Memuat data antrian...</p>
              </div>
            ) : queueItems.length === 0 ? (
              <div className="text-center py-20">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
                <p className="text-3xl font-semibold text-muted-foreground">Antrian saat ini kosong!</p>
                <p className="text-lg text-muted-foreground mt-2">Silakan menikmati waktu Anda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {queueItems.map((item) => (
                  <Card key={item.id} className="shadow-lg flex flex-col bg-card hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="pb-3 pt-4 px-4">
                       <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                              <CardTitle className="text-2xl font-semibold truncate" title={item.customerName}>
                                  {item.customerName}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground truncate" title={item.vehicleInfo}>{item.vehicleInfo}</p>
                          </div>
                          <Badge variant={getStatusBadgeVariant(item.status)} className="capitalize text-sm px-3 py-1.5 h-auto flex-shrink-0 ml-2 mt-1">
                            <span className="mr-1.5">{getStatusIcon(item.status)}</span>
                            {item.status}
                          </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow px-4 pb-4">
                      <div className="text-lg font-medium text-primary mb-1 truncate" title={item.service}>
                          Layanan: {item.service}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Estimasi: {item.estimatedTime}
                      </div>
                      {item.staff && (
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                             <AvatarImage src={`https://placehold.co/40x40.png?text=${item.staff.substring(0,1)}`} data-ai-hint="avatar karyawan" />
                             <AvatarFallback>{item.staff.substring(0,1)}</AvatarFallback>
                          </Avatar>
                          Teknisi: {item.staff}
                        </div>
                      )}
                       <div className="text-xs text-muted-foreground mt-2">
                        Masuk Antrian: {item.createdAt?.toDate().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                       {item.status === 'Selesai' && item.completedAt && (
                           <div className="text-xs text-green-600 mt-1">
                              Selesai pada: {item.completedAt?.toDate().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                       )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
           <CardFooter className="text-center text-sm text-muted-foreground pt-6 pb-4">
              <p>Layar ini akan diperbarui secara otomatis. Terima kasih atas kesabaran Anda.</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
