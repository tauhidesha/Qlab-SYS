
import AppHeader from '@/components/layout/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, Banknote, Users } from 'lucide-react';

export default function StaffPage() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Manajemen Staf" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Dasbor Staf</CardTitle>
            <CardDescription>Gambaran umum dan akses cepat ke modul terkait staf.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Absensi</CardTitle>
                <CalendarDays className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Catat dan lihat absensi staf, waktu masuk, dan waktu pulang.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/staff/attendance">Buka Absensi</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Penggajian</CardTitle>
                <Banknote className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Kelola penggajian staf, termasuk perhitungan bagi hasil.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/staff/payroll">Buka Penggajian</Link>
                </Button>
              </CardFooter>
            </Card>
             <Card className="md:col-span-2 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Daftar Staf</CardTitle>
                <Users className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lihat dan kelola profil serta informasi staf.
                </p>
              </CardContent>
              <CardFooter>
                <Button disabled className="w-full">Lihat Daftar Staf (Segera Hadir)</Button>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
