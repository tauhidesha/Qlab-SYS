
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Star, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { toast } from "@/hooks/use-toast";
import type { Client } from '@/types/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const clientsCollectionRef = collection(db, 'clients');
      const q = query(clientsCollectionRef, orderBy("name"));
      const querySnapshot = await getDocs(q);
      const clientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
      setClients(clientsData);
    } catch (error) {
      console.error("Error fetching clients: ", error);
      toast({
        title: "Error",
        description: "Tidak dapat mengambil data klien dari Firestore.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDeleteClient = async () => {
    if (!clientToDelete) return;
    try {
      await deleteDoc(doc(db, 'clients', clientToDelete.id));
      toast({
        title: "Sukses",
        description: `Klien "${clientToDelete.name}" berhasil dihapus.`,
      });
      setClients(clients.filter(client => client.id !== clientToDelete.id));
      setClientToDelete(null);
    } catch (error) {
      console.error("Error deleting client: ", error);
      toast({
        title: "Error",
        description: "Gagal menghapus klien.",
        variant: "destructive",
      });
      setClientToDelete(null);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    (client.motorcycles && client.motorcycles.some(mc => mc.name.toLowerCase().includes(searchTerm.toLowerCase()) || mc.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Manajemen Klien" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data klien...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Manajemen Klien" />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <AlertDialog open={!!clientToDelete} onOpenChange={(open) => !open && setClientToDelete(null)}>
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle>Daftar Klien</CardTitle>
              <CardDescription>Kelola data klien, sepeda motor, dan poin loyalitas.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
               <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari klien..."
                  className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/clients/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> 
                  <span className="sm:inline">Tambah Klien Baru</span>
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Telepon</TableHead>
                    <TableHead>Sepeda Motor</TableHead>
                    <TableHead className="text-center">Poin Loyalitas</TableHead>
                    <TableHead>Kunjungan Terakhir</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside text-sm">
                          {client.motorcycles && client.motorcycles.length > 0 ? client.motorcycles.map(mc => (
                            <li key={mc.licensePlate}>
                              {mc.name} ({mc.licensePlate})
                            </li>
                          )) : <span className="text-muted-foreground">Tidak ada sepeda motor</span>}
                        </ul>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {client.loyaltyPoints?.toLocaleString('id-ID') || 0}
                        </div>
                      </TableCell>
                      <TableCell>{client.lastVisit || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild className="hover:text-primary">
                          <Link href={`/clients/${client.id}/edit`}>
                            <Edit3 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setClientToDelete(client)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {filteredClients.map((client) => (
                <Card key={client.id} className="p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base truncate">{client.name}</h3>
                      <p className="text-sm text-muted-foreground">{client.phone}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {client.motorcycles && client.motorcycles.length > 0 && (
                            <span>{client.motorcycles.length} motor</span>
                          )}
                          {client.lastVisit && (
                            <span>• {client.lastVisit}</span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{client.loyaltyPoints?.toLocaleString('id-ID') || 0}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-3">
                      <Button variant="ghost" size="icon" asChild className="hover:text-primary h-8 w-8">
                        <Link href={`/clients/${client.id}/edit`}>
                          <Edit3 className="h-3 w-3" />
                        </Link>
                      </Button>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8" onClick={() => setClientToDelete(client)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {filteredClients.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                <p>{clients.length > 0 ? 'Tidak ada klien yang cocok dengan pencarian Anda.' : 'Belum ada klien yang terdaftar.'}</p>
                {clients.length === 0 && (
                  <p className="mt-2">
                    <Link href="/clients/new" className="text-primary hover:underline">
                      Tambah klien baru
                    </Link>
                  </p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">Menampilkan {filteredClients.length} dari {clients.length} klien.</p>
          </CardFooter>
        </Card>
        
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus klien "{clientToDelete?.name}"? Tindakan ini tidak dapat diurungkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setClientToDelete(null)}>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteClient} className={buttonVariants({variant: "destructive"})}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
