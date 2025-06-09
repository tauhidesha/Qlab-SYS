
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit3, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { toast } from "@/hooks/use-toast";

interface QueueItem {
  id: string;
  customerName: string;
  vehicleInfo: string;
  service: string;
  status: 'Menunggu' | 'Dalam Layanan' | 'Selesai';
  estimatedTime: string;
  staff?: string;
}

export default function QueuePage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueueItems = async () => {
      setLoading(true);
      console.log("Mengambil item antrian dari Firestore...");
      try {
        const queueCollectionRef = collection(db, 'queueItems');
        const q = query(queueCollectionRef);
        const querySnapshot = await getDocs(q);
        
        console.log(`Mengambil ${querySnapshot.docs.length} dokumen antrian.`);
        
        const itemsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...data } as QueueItem;
        });
        
        console.log('Data item antrian yang dipetakan:', itemsData);
        setQueueItems(itemsData);

      } catch (error) {
        console.error("Error fetching queue items: ", error);
        let description = "Tidak dapat mengambil data antrian. Silakan periksa koneksi internet Anda.";
        if (error instanceof Error) {
            description = `Error: ${error.message}. Silakan periksa aturan keamanan Firestore dan nama koleksi ('queueItems').`;
        }
        toast({
          title: "Error Pengambilan",
          description: description,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchQueueItems();
  }, []);

  const getStatusBadgeVariant = (status: QueueItem['status']) => {
    if (status === 'Dalam Layanan') return 'default'; 
    if (status === 'Selesai') return 'secondary'; 
    return 'outline'; 
  };
  
  const getStatusIcon = (status: QueueItem['status']) => {
    if (status === 'Dalam Layanan') return <Clock className="h-4 w-4 text-primary" />;
    if (status === 'Selesai') return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <Clock className="h-4 w-4 text-yellow-500" />;
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Manajemen Antrian" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data antrian...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Manajemen Antrian" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Antrian Pelanggan</CardTitle>
              <CardDescription>Kelola pelanggan yang menunggu dan sedang dilayani.</CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Tambah ke Antrian
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {queueItems.map((item) => (
                <Card key={item.id} className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.customerName}</CardTitle>
                      <Badge variant={getStatusBadgeVariant(item.status)} className="capitalize">
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </Badge>
                    </div>
                    <CardDescription>{item.vehicleInfo} - {item.service}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-1">
                      Perkiraan Waktu: {item.estimatedTime}
                    </div>
                    {item.staff && (
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Avatar className="h-5 w-5 mr-2">
                           <AvatarImage src={`https://placehold.co/40x40.png?text=${item.staff.substring(0,1)}`} data-ai-hint="avatar karyawan" />
                           <AvatarFallback>{item.staff.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        Dilayani oleh: {item.staff}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit3 className="mr-2 h-4 w-4" /> Ubah
                    </Button>
                    {item.status === 'Menunggu' && <Button size="sm">Mulai Layanan</Button>}
                    {item.status === 'Dalam Layanan' && <Button size="sm" variant="secondary">Tandai Selesai</Button>}
                  </CardFooter>
                </Card>
              ))}
            </div>
            {queueItems.length === 0 && !loading && (
              <div className="text-center py-10 text-muted-foreground">
                Antrian saat ini kosong.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
