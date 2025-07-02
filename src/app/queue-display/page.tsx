"use client"
import React, { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Loader2, Clock, CheckCircle, ListOrdered } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

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
    completedAt?: Timestamp;
    serviceStartTime?: Timestamp;
}

const AUTO_HIDE_DELAY_MS = 5 * 60 * 1000; // 5 menit
const TIME_UP_MESSAGE = "Segera Selesai";

// Fungsi parsing yang lebih robust
function parseEstimatedTimeToMinutes(timeString: string): number | null {
    if (!timeString) return null;

    let totalMinutes = 0;
    const timeStr = timeString.toLowerCase().replace('sisa', '').trim();

    const hourMatch = timeStr.match(/(\d+)\s*(jam|hr)/);
    if (hourMatch) {
        totalMinutes += parseInt(hourMatch[1], 10) * 60;
    }

    const minuteMatch = timeStr.match(/(\d+)\s*(mnt|menit|min)/);
    if (minuteMatch) {
        totalMinutes += parseInt(minuteMatch[1], 10);
    }

    // Jika tidak ada 'jam' atau 'menit', coba parse sebagai angka saja
    if (!hourMatch && !minuteMatch) {
        const rawNumberMatch = timeStr.match(/^(\d+)/);
        if (rawNumberMatch) {
            totalMinutes = parseInt(rawNumberMatch[1], 10);
        }
    }

    return totalMinutes > 0 ? totalMinutes : null;
}


type BadgeVariant = BadgeProps["variant"];

export default function QueueDisplayPage() {
    const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
    const [loadingQueue, setLoadingQueue] = useState(true);
    const [countdownTimers, setCountdownTimers] = useState<Record<string, string>>({});
    const { toast } = useToast();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const getStatusBadgeVariant = (status: QueueItem['status']): BadgeVariant => {
        return status === 'Menunggu' ? 'outline' : undefined;
    };

    const getStatusIcon = (status: QueueItem['status']) => {
        if (status === 'Dalam Layanan') return <Clock className="h-5 w-5 mr-1.5 text-accent-foreground" />;
        if (status === 'Selesai') return <CheckCircle className="h-5 w-5 mr-1.5 text-accent-foreground" />;
        return <Clock className="h-5 w-5 mr-1.5 text-yellow-500" />;
    };

    // useEffect utama untuk mengambil data dari Firestore
    useEffect(() => {
        setLoadingQueue(true);
        const queueCollectionRef = collection(db, 'queueItems');
        const q = query(queueCollectionRef, orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const now = Date.now();
            const itemsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            } as QueueItem)).filter(item => {
                // Filter item yang sudah selesai lebih dari 5 menit yang lalu
                if (item.status === 'Selesai' && item.completedAt) {
                    const completedTime = item.completedAt.toDate().getTime();
                    return now - completedTime < AUTO_HIDE_DELAY_MS;
                }
                return true;
            });

            setQueueItems(itemsData);

            // Inisialisasi atau update timer saat data berubah
            setCountdownTimers(prev => {
                const newTimers: Record<string, string> = {};
                for (const item of itemsData) {
                    if (item.status === 'Dalam Layanan') {
                        // Pertahankan timer yang ada jika masih valid, atau set nilai default
                        newTimers[item.id] = prev[item.id] || item.estimatedTime;
                    }
                }
                return newTimers;
            });

            setLoadingQueue(false);
        }, (error) => {
            console.error("Error fetching queue items:", error);
            toast({ title: "Error Koneksi", description: "Tidak dapat mengambil data antrian.", variant: "destructive" });
            setLoadingQueue(false);
        });

        return () => unsubscribe();
    }, [toast]);

    // useEffect tunggal untuk mengelola semua countdown timer
    useEffect(() => {
        // Hapus interval lama jika ada
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Buat interval baru yang berjalan setiap detik
        intervalRef.current = setInterval(() => {
            const itemsInService = queueItems.filter(item => item.status === 'Dalam Layanan' && item.serviceStartTime);
            
            if (itemsInService.length === 0) return; // Tidak perlu update jika tidak ada yg dilayani

            const newCountdownValues: Record<string, string> = {};

            itemsInService.forEach(item => {
                const estimatedDurationMinutes = parseEstimatedTimeToMinutes(item.estimatedTime);
                if (estimatedDurationMinutes === null) {
                    newCountdownValues[item.id] = item.estimatedTime; // Tampilkan estimasi awal jika tidak bisa diparse
                    return;
                }

                const serviceStartTimeMs = item.serviceStartTime!.toDate().getTime();
                const targetEndTimeMs = serviceStartTimeMs + estimatedDurationMinutes * 60 * 1000;
                const nowMs = Date.now();
                const remainingMs = targetEndTimeMs - nowMs;

                if (remainingMs <= 0) {
                    newCountdownValues[item.id] = TIME_UP_MESSAGE;
                } else {
                    const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
                    const seconds = Math.floor((remainingMs / 1000) % 60);
                    newCountdownValues[item.id] = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            });

            setCountdownTimers(prev => ({ ...prev, ...newCountdownValues }));

        }, 1000);

        // Fungsi cleanup untuk membersihkan interval saat komponen di-unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [queueItems]); // Dependensi pada queueItems agar interval dievaluasi ulang saat data berubah


    return (
        <>
            <div className="w-full h-full">
                <Card className="shadow-2xl border-2 border-primary/20 h-full flex flex-col">
                    <CardHeader className="text-center pb-6 pt-8">
                        <div className="flex items-center justify-center mb-4">
                            <ListOrdered className="h-12 w-12 text-primary mr-4" />
                            <CardTitle className="text-5xl font-bold tracking-tight">Status Antrian Layanan</CardTitle>
                        </div>
                        <CardDescription className="text-xl text-muted-foreground">
                            Pelanggan yang sedang menunggu dan dilayani saat ini.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-2 sm:px-4 flex-grow overflow-y-auto">
                        {loadingQueue ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center h-full">
                                <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                                <p className="text-2xl text-muted-foreground">Memuat data antrian...</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[60px] text-center text-lg font-semibold">No.</TableHead>
                                        <TableHead className="text-lg font-semibold">Nama Pelanggan</TableHead>
                                        <TableHead className="text-lg font-semibold">Layanan & Kendaraan</TableHead>
                                        <TableHead className="text-center text-lg font-semibold">Status</TableHead>
                                        <TableHead className="text-lg font-semibold">Teknisi</TableHead>
                                        <TableHead className="text-center text-lg font-semibold">Waktu</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {queueItems.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-20">
                                                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
                                                <p className="text-3xl font-semibold text-muted-foreground">Antrian saat ini kosong!</p>
                                                <p className="text-lg text-muted-foreground mt-2">Silakan menikmati waktu Anda.</p>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        queueItems.map((item, index) => {
                                            const isSelesai = item.status === 'Selesai';
                                            const isDalamLayanan = item.status === 'Dalam Layanan';
                                            return (
                                                <TableRow
                                                    key={item.id}
                                                    className={cn(
                                                        "text-lg",
                                                        isDalamLayanan && 'bg-blue-950/25',
                                                        isSelesai && 'opacity-60' // Opacity sedikit dikurangi agar tidak terlalu hilang
                                                    )}
                                                >
                                                    <TableCell className="text-center font-medium py-4 px-3 text-xl">{index + 1}</TableCell>
                                                    <TableCell className="font-medium py-4 px-3 text-xl">{item.customerName}</TableCell>
                                                    <TableCell className="py-4 px-3">
                                                        <div className="font-medium text-xl">{item.service}</div>
                                                        <div className="text-base text-muted-foreground">{item.vehicleInfo}</div>
                                                    </TableCell>
                                                    <TableCell className="text-center py-4 px-3">
                                                        <Badge
                                                            variant={getStatusBadgeVariant(item.status)}
                                                            className={cn(
                                                                "capitalize text-lg px-4 py-2 h-auto",
                                                                (isSelesai || isDalamLayanan) && "bg-accent text-accent-foreground"
                                                            )}
                                                        >
                                                            {getStatusIcon(item.status)}
                                                            {item.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="py-4 px-3 text-xl">
                                                        {item.staff ? (
                                                            <div className="flex items-center">
                                                                <Avatar className="h-9 w-9 mr-3">
                                                                    <AvatarImage src={`https://placehold.co/40x40.png?text=${item.staff.substring(0, 1)}`} />
                                                                    <AvatarFallback>{item.staff.substring(0, 1)}</AvatarFallback>
                                                                </Avatar>
                                                                {item.staff}
                                                            </div>
                                                        ) : (
                                                            <span className="text-muted-foreground italic text-base">Belum ada</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-center py-4 px-3">
                                                        {isSelesai && item.completedAt ? (
                                                            <div className="flex flex-col items-center">
                                                                <span className="text-accent text-xl font-medium">Selesai</span>
                                                                <span className="text-base text-muted-foreground">
                                                                    Pukul {item.completedAt.toDate().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                            </div>
                                                        ) : isDalamLayanan ? (
                                                            <div className="flex flex-col items-center">
                                                                {countdownTimers[item.id] !== TIME_UP_MESSAGE && (
                                                                    <span className="text-sm text-muted-foreground">Sisa Waktu</span>
                                                                )}
                                                                <span className={cn(
                                                                    'text-2xl font-semibold', 
                                                                    countdownTimers[item.id] === TIME_UP_MESSAGE ? 'text-amber-500 animate-pulse' : 'text-accent'
                                                                )}>
                                                                    {countdownTimers[item.id] || item.estimatedTime}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center">
                                                                <span className="text-base text-muted-foreground">Estimasi</span>
                                                                <span className="text-xl font-semibold">{item.estimatedTime}</span>
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                    <CardFooter className="text-center text-base text-muted-foreground pt-8 pb-6 border-t mt-auto">
                        <p>Layar ini akan diperbarui secara otomatis. Terima kasih atas kesabaran Anda.</p>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}