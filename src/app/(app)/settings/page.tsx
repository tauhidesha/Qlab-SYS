
"use client"; 

import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Palette, Bell, Users, CreditCard as CreditCardIcon, Gift, DollarSign, Loader2, Wallet, Award } from 'lucide-react'; // Added Award
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  // const [pointToRupiahRate, setPointToRupiahRate] = React.useState('10'); // No longer direct conversion
  const [minPointsToRedeemGeneral, setMinPointsToRedeemGeneral] = React.useState('100'); // General minimum for eligibility
  
  const [initialBankBalance, setInitialBankBalance] = React.useState('');
  const [initialPhysicalCashBalance, setInitialPhysicalCashBalance] = React.useState('');
  const [isLoadingFinancialSettings, setIsLoadingFinancialSettings] = useState(true);
  const [isSavingFinancialSettings, setIsSavingFinancialSettings] = useState(false);

  useEffect(() => {
    const fetchFinancialSettings = async () => {
      setIsLoadingFinancialSettings(true);
      try {
        const settingsDocRef = doc(db, 'appSettings', 'financial');
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.initialBankBalance !== undefined) {
            setInitialBankBalance(String(data.initialBankBalance));
          }
          if (data.initialPhysicalCashBalance !== undefined) {
            setInitialPhysicalCashBalance(String(data.initialPhysicalCashBalance));
          }
           if (data.minPointsToRedeemGeneral !== undefined) { // Load general min points
            setMinPointsToRedeemGeneral(String(data.minPointsToRedeemGeneral));
          }
        }
      } catch (error) {
        console.error("Error fetching financial/loyalty settings: ", error);
        toast({
          title: "Error",
          description: "Gagal memuat pengaturan finansial/loyalitas.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingFinancialSettings(false);
      }
    };

    fetchFinancialSettings();
  }, [toast]);

  const handleSaveFinancialSettings = async () => {
    setIsSavingFinancialSettings(true);
    try {
      const bankBalance = parseFloat(initialBankBalance);
      const physicalCashBalance = parseFloat(initialPhysicalCashBalance);
      const minPoints = parseInt(minPointsToRedeemGeneral, 10);


      if (isNaN(bankBalance) || bankBalance < 0) {
        toast({ title: "Input Tidak Valid", description: "Saldo awal bank harus berupa angka positif.", variant: "destructive"});
        setIsSavingFinancialSettings(false); return;
      }
      if (isNaN(physicalCashBalance) || physicalCashBalance < 0) {
        toast({ title: "Input Tidak Valid", description: "Saldo awal kas fisik harus berupa angka positif.", variant: "destructive"});
        setIsSavingFinancialSettings(false); return;
      }
       if (isNaN(minPoints) || minPoints < 0) {
        toast({ title: "Input Tidak Valid", description: "Minimum poin umum untuk redeem harus angka positif.", variant: "destructive"});
        setIsSavingFinancialSettings(false); return;
      }


      const settingsDocRef = doc(db, 'appSettings', 'financial'); // Re-using 'financial' doc for simplicity
      await setDoc(settingsDocRef, { 
        initialBankBalance: bankBalance,
        initialPhysicalCashBalance: physicalCashBalance,
        minPointsToRedeemGeneral: minPoints, // Save general min points
        updatedAt: serverTimestamp() 
      }, { merge: true });

      toast({
        title: "Sukses",
        description: "Pengaturan finansial & loyalitas dasar berhasil disimpan.",
      });
    } catch (error) {
      console.error("Error saving settings: ", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan pengaturan.",
        variant: "destructive",
      });
    } finally {
      setIsSavingFinancialSettings(false);
    }
  };


  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Pengaturan" />
      <main className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 mb-6"> {/* Adjusted for 7 tabs */}
            <TabsTrigger value="general"><Building className="mr-2 h-4 w-4 hidden md:inline" />Umum</TabsTrigger>
            <TabsTrigger value="loyalty"><Gift className="mr-2 h-4 w-4 hidden md:inline" />Loyalitas</TabsTrigger>
            <TabsTrigger value="loyalty_rewards"><Award className="mr-2 h-4 w-4 hidden md:inline" />Reward</TabsTrigger> {/* New Tab */}
            <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4 hidden md:inline" />Tampilan</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4 hidden md:inline" />Notifikasi</TabsTrigger>
            <TabsTrigger value="users"><Users className="mr-2 h-4 w-4 hidden md:inline" />Peran</TabsTrigger>
            <TabsTrigger value="billing"><CreditCardIcon className="mr-2 h-4 w-4 hidden md:inline" />Tagihan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Umum Bengkel</CardTitle>
                <CardDescription>Kelola informasi bengkel Anda dan pengaturan dasar.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="workshop-name">Nama Bengkel</Label>
                  <Input id="workshop-name" defaultValue="QLAB Auto Detailing" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workshop-address">Alamat</Label>
                  <Input id="workshop-address" defaultValue="Jl. Sudirman No. 123, Jakarta" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workshop-phone">Nomor Telepon</Label>
                  <Input id="workshop-phone" type="tel" defaultValue="+62 21 555 0123" />
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled>Simpan Perubahan Umum (Segera)</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-primary" />
                  Pengaturan Finansial & Loyalitas Dasar
                </CardTitle>
                <CardDescription>Pengaturan terkait keuangan dasar dan minimal poin untuk menukar reward.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoadingFinancialSettings ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Memuat pengaturan...</span>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="initial-bank-balance">Saldo Awal Rekening Bank Utama (Rp)</Label>
                      <Input 
                        id="initial-bank-balance" 
                        type="number" 
                        placeholder="mis. 10000000" 
                        value={initialBankBalance}
                        onChange={(e) => setInitialBankBalance(e.target.value)}
                        disabled={isSavingFinancialSettings}
                      />
                      <p className="text-xs text-muted-foreground">
                        Saldo awal rekening bank utama Anda. Digunakan untuk Laporan Arus Kas Bank.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="initial-physical-cash-balance">Saldo Awal Kas Fisik (Tunai) (Rp)</Label>
                      <Input 
                        id="initial-physical-cash-balance" 
                        type="number" 
                        placeholder="mis. 1000000" 
                        value={initialPhysicalCashBalance}
                        onChange={(e) => setInitialPhysicalCashBalance(e.target.value)}
                        disabled={isSavingFinancialSettings}
                      />
                      <p className="text-xs text-muted-foreground">
                        Saldo awal kas fisik (tunai) di tangan. Digunakan untuk Laporan Arus Kas Fisik.
                      </p>
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="min-points-redeem-general">Minimum Poin Umum untuk Tukar Reward</Label>
                      <Input 
                        id="min-points-redeem-general" 
                        type="number" 
                        value={minPointsToRedeemGeneral}
                        onChange={(e) => setMinPointsToRedeemGeneral(e.target.value)}
                        placeholder="mis. 100"
                        disabled={isSavingFinancialSettings}
                      />
                       <p className="text-xs text-muted-foreground">Klien harus memiliki setidaknya poin ini untuk bisa menukarkan reward apapun.</p>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveFinancialSettings} disabled={isSavingFinancialSettings || isLoadingFinancialSettings}>
                  {isSavingFinancialSettings ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Simpan Pengaturan Finansial & Loyalitas
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Dasar Program Loyalitas</CardTitle>
                <CardDescription>Konfigurasi umum bagaimana program loyalitas berjalan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="loyalty-program-active" className="font-medium">Aktifkan Program Loyalitas</Label>
                    <p className="text-sm text-muted-foreground">Izinkan pelanggan mendapatkan dan menukarkan poin.</p>
                  </div>
                  <Switch id="loyalty-program-active" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Pengaturan detail poin yang diberikan per layanan/produk dapat diatur di halaman "Layanan & Produk".
                  Pengaturan reward spesifik (item merchandise, diskon, dll.) ada di tab "Reward".
                </p>
              </CardContent>
              <CardFooter>
                <Button disabled>Simpan Pengaturan Loyalitas (Segera)</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty_rewards"> {/* New Tab Content */}
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Reward Loyalitas</CardTitle>
                <CardDescription>Kelola item atau diskon yang dapat ditukar dengan poin loyalitas.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Fitur untuk menambah, mengubah, dan menghapus reward akan segera tersedia di sini.
                  Untuk saat ini, reward masih didefinisikan secara manual dalam kode.
                </p>
                {/* Placeholder for future CRUD UI for rewards */}
              </CardContent>
              <CardFooter>
                <Button disabled>Simpan Reward (Segera)</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Tampilan</CardTitle>
                <CardDescription>Sesuaikan tampilan dan nuansa aplikasi.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Pengaturan tema (mis., mode terang/gelap) dapat dikelola di sini.</p>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="dark-mode-toggle">Mode Gelap</Label>
                  <Switch id="dark-mode-toggle" checked disabled aria-readonly /> 
                  <span className="text-xs text-muted-foreground">(Default dan direkomendasikan)</span>
                </div>
              </CardContent>
               <CardFooter>
                <Button disabled>Simpan Perubahan Tampilan (Segera)</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
             <Card>
              <CardHeader>
                <CardTitle>Notifikasi</CardTitle>
                <CardDescription>Kelola preferensi notifikasi Anda.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">Pengaturan notifikasi akan segera tersedia.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users">
             <Card>
              <CardHeader>
                <CardTitle>Peran & Izin Pengguna</CardTitle>
                <CardDescription>Kelola akun staf dan tingkat akses mereka.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">Manajemen peran pengguna akan segera tersedia.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="billing">
             <Card>
              <CardHeader>
                <CardTitle>Tagihan & Langganan</CardTitle>
                <CardDescription>Kelola paket langganan dan metode pembayaran Anda.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">Informasi tagihan akan segera tersedia.</p>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}

    
