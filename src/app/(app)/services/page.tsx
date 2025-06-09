
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Wrench, ShoppingBag, Search, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { toast } from "@/hooks/use-toast";

export interface ServiceProduct { // Diekspor agar bisa digunakan di QueuePage
  id: string;
  name: string;
  type: 'Layanan' | 'Produk';
  category: string;
  price: number;
  description: string;
}

export default function ServicesPage() {
  const [items, setItems] = useState<ServiceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const itemsCollectionRef = collection(db, 'services');
        const q = query(itemsCollectionRef, orderBy("name"));
        const querySnapshot = await getDocs(q);
        const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct));
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching services/products: ", error);
        toast({
          title: "Error",
          description: "Tidak dapat mengambil data layanan/produk dari Firestore.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Layanan & Produk" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat layanan & produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Layanan & Produk" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Katalog Layanan & Produk</CardTitle>
              <CardDescription>Kelola penawaran Anda dan detailnya.</CardDescription>
            </div>
             <div className="flex gap-2 items-center">
               <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari item..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Tambah Item Baru
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Harga</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant={item.type === 'Layanan' ? 'default' : 'secondary'} className="capitalize">
                        {item.type === 'Layanan' ? <Wrench className="mr-1 h-3 w-3" /> : <ShoppingBag className="mr-1 h-3 w-3" />}
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">Rp {item.price.toLocaleString('id-ID')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {filteredItems.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                 {items.length > 0 ? 'Tidak ada item yang cocok dengan pencarian Anda.' : 'Tidak ada layanan atau produk yang ditemukan.'} Tambah item baru untuk memulai.
              </div>
            )}
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground">Menampilkan {filteredItems.length} dari {items.length} item.</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

    