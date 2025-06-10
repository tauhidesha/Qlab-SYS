
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChartBig, Users, ShoppingCart, ListOrdered, CreditCard, Star as StarIcon } from 'lucide-react'; // Added CreditCard, StarIcon
import React from 'react';

export default function DashboardPage() {
  const summaryCards = [
    { title: "Pendapatan Hari Ini", value: "Rp 1.250.000", icon: ShoppingCart, change: "+15%", dataAiHint: "grafik uang" },
    { title: "Pelanggan Dilayani", value: "25", icon: Users, change: "+5", dataAiHint: "antrian orang" },
    { title: "Panjang Antrian", value: "3", icon: ListOrdered, dataAiHint: "daftar tunggu" },
    { title: "Layanan Tertunda", value: "8", icon: BarChartBig, dataAiHint: "progres tugas" },
  ];

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Dasbor" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {summaryCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                {card.change && <p className="text-xs text-muted-foreground">{card.change} dari kemarin</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card> {/* Was lg:col-span-2, now fits into md:grid-cols-2 */}
            <CardHeader>
              <CardTitle>Transaksi Terkini</CardTitle>
              <CardDescription>Gambaran umum penjualan terbaru.</CardDescription>
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
              <CardDescription>Pelanggan menunggu layanan.</CardDescription>
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

          {/* Kartu Baru: Metode Pembayaran Populer */}
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

          {/* Kartu Baru: Layanan & Produk Terlaris */}
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
