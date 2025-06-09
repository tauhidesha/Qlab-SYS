
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Palette, Bell, Users, CreditCard as CreditCardIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Pengaturan" />
      <main className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-6">
            <TabsTrigger value="general"><Building className="mr-2 h-4 w-4 hidden md:inline" />Umum</TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4 hidden md:inline" />Tampilan</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4 hidden md:inline" />Notifikasi</TabsTrigger>
            <TabsTrigger value="users"><Users className="mr-2 h-4 w-4 hidden md:inline" />Peran Pengguna</TabsTrigger>
            <TabsTrigger value="billing"><CreditCardIcon className="mr-2 h-4 w-4 hidden md:inline" />Tagihan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Umum</CardTitle>
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
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="loyalty-program" className="font-medium">Aktifkan Program Loyalitas</Label>
                    <p className="text-sm text-muted-foreground">Izinkan pelanggan mendapatkan dan menukarkan poin.</p>
                  </div>
                  <Switch id="loyalty-program" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Simpan Perubahan</Button>
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
                <Button disabled>Simpan Perubahan</Button>
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
