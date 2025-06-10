
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Wrench, ShoppingBag, Search, Loader2, Gift, UploadCloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React, { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
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
import {
  Dialog,
  DialogHeader as InfoDialogHeader,
  DialogContent as InfoDialogContent,
  DialogTitle as InfoDialogTitle,
  DialogDescription as InfoDialogDescription,
  DialogFooter as InfoDialogFooter,
  DialogTrigger as InfoDialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { buttonVariants } from '@/components/ui/button';
import Papa from 'papaparse';

export interface ServiceProductVariant {
  id: string; // Client-generated UUID for new, Firestore ID for existing (though in embedded array, it's more like a key)
  name: string;
  price: number;
  pointsAwarded?: number;
}

export interface ServiceProduct {
  id: string;
  name: string;
  type: 'Layanan' | 'Produk';
  category: string;
  price: number; // Base price or price if no variants
  description?: string;
  pointsAwarded?: number; // Points for base product or if no variants
  createdAt?: any; 
  variants?: ServiceProductVariant[];
}

export default function ServicesPage() {
  const [items, setItems] = useState<ServiceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemToDelete, setItemToDelete] = useState<ServiceProduct | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const { toast } = useToast();

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

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    try {
      await deleteDoc(doc(db, 'services', itemToDelete.id));
      toast({
        title: "Sukses",
        description: `Item "${itemToDelete.name}" berhasil dihapus.`,
      });
      setItems(items.filter(item => item.id !== itemToDelete.id));
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting item: ", error);
      toast({
        title: "Error",
        description: "Gagal menghapus item.",
        variant: "destructive",
      });
      setItemToDelete(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsImporting(true);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const parsedData = results.data as Array<Record<string, string>>;
          if (!parsedData || parsedData.length === 0) {
            toast({ title: "File Kosong", description: "File CSV yang diupload tidak berisi data.", variant: "destructive" });
            setIsImporting(false);
            return;
          }

          const expectedHeaders = ['name', 'type', 'category', 'price'];
          const actualHeaders = Object.keys(parsedData[0]);
          const missingHeaders = expectedHeaders.filter(h => !actualHeaders.includes(h));
          if (missingHeaders.length > 0) {
            toast({
              title: "Format CSV Salah",
              description: `Header kolom yang hilang: ${missingHeaders.join(', ')}. Pastikan CSV memiliki kolom: name, type, category, price, description (opsional), pointsAwarded (opsional). Varian tidak didukung via CSV saat ini.`,
              variant: "destructive",
              duration: 10000,
            });
            setIsImporting(false);
            return;
          }
          
          const batch = writeBatch(db);
          let itemsAddedCount = 0;
          let itemsFailedCount = 0;

          parsedData.forEach((row, index) => {
            const name = row.name?.trim();
            const type = row.type?.trim();
            const category = row.category?.trim();
            const priceString = row.price?.trim();
            const description = row.description?.trim() || '';
            const pointsAwardedString = row.pointsAwarded?.trim();

            if (!name || !type || !category || !priceString) {
              console.warn(`Baris ${index + 2} dilewati: field wajib tidak lengkap.`);
              itemsFailedCount++;
              return;
            }

            if (type !== 'Layanan' && type !== 'Produk') {
              console.warn(`Baris ${index + 2} dilewati: tipe tidak valid ('${type}'). Harus 'Layanan' atau 'Produk'.`);
              itemsFailedCount++;
              return;
            }
            
            const price = parseFloat(priceString);
            if (isNaN(price) || price <= 0) {
              console.warn(`Baris ${index + 2} dilewati: harga tidak valid ('${priceString}').`);
              itemsFailedCount++;
              return;
            }
            
            let pointsAwarded = 0;
            if (pointsAwardedString) {
                const parsedPoints = parseInt(pointsAwardedString, 10);
                if (!isNaN(parsedPoints) && parsedPoints >= 0) {
                    pointsAwarded = parsedPoints;
                } else {
                    console.warn(`Baris ${index + 2}: pointsAwarded tidak valid ('${pointsAwardedString}'), akan diabaikan.`);
                }
            }

            const newItemRef = doc(collection(db, 'services'));
            batch.set(newItemRef, {
              name,
              type,
              category,
              price,
              description,
              pointsAwarded,
              variants: [], // Variants not supported via CSV import for now
              createdAt: serverTimestamp(),
            });
            itemsAddedCount++;
          });

          try {
            await batch.commit();
            toast({
              title: "Import Selesai",
              description: `${itemsAddedCount} item berhasil diimpor. ${itemsFailedCount > 0 ? `${itemsFailedCount} item gagal (cek konsol untuk detail).` : ''}`,
            });
            fetchItems(); 
          } catch (error) {
            console.error("Error importing CSV: ", error);
            toast({ title: "Error Impor", description: "Gagal menyimpan data ke database.", variant: "destructive" });
          } finally {
            setIsImporting(false);
            if (fileInputRef.current) {
              fileInputRef.current.value = ""; 
            }
          }
        },
        error: (error: any) => {
          console.error("Error parsing CSV:", error);
          toast({ title: "Error Parsing CSV", description: error.message, variant: "destructive" });
          setIsImporting(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && !isImporting) {
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
        <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Katalog Layanan & Produk</CardTitle>
                <CardDescription>Kelola penawaran Anda dan detailnya, termasuk varian produk.</CardDescription>
              </div>
               <div className="flex gap-2 items-center">
                 <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari item..."
                    className="pl-8 sm:w-[200px] md:w-[150px] lg:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileChange}
                />
                <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
                  <InfoDialogTrigger asChild>
                    <Button variant="outline" size="sm">Info Format CSV</Button>
                  </InfoDialogTrigger>
                  <InfoDialogContent>
                    <InfoDialogHeader>
                      <InfoDialogTitle>Format CSV untuk Impor Layanan/Produk</InfoDialogTitle>
                      <InfoDialogDescription>
                        Pastikan file CSV Anda memiliki header kolom berikut (urutan tidak masalah, case-sensitive):
                      </InfoDialogDescription>
                    </InfoDialogHeader>
                    <ul className="list-disc list-inside space-y-1 text-sm my-4">
                      <li><code className="bg-muted px-1 rounded-sm">name</code> (Teks, Wajib) - Nama layanan/produk.</li>
                      <li><code className="bg-muted px-1 rounded-sm">type</code> (Teks, Wajib) - Harus 'Layanan' atau 'Produk'.</li>
                      <li><code className="bg-muted px-1 rounded-sm">category</code> (Teks, Wajib) - Kategori item.</li>
                      <li><code className="bg-muted px-1 rounded-sm">price</code> (Angka, Wajib) - Harga item (contoh: 50000).</li>
                      <li><code className="bg-muted px-1 rounded-sm">description</code> (Teks, Opsional) - Deskripsi item.</li>
                      <li><code className="bg-muted px-1 rounded-sm">pointsAwarded</code> (Angka, Opsional) - Poin loyalitas yang diberikan.</li>
                    </ul>
                    <p className="text-xs text-muted-foreground">Baris pertama CSV harus berisi nama header. Varian produk tidak didukung melalui impor CSV saat ini. Baris dengan data wajib yang kosong atau format harga/tipe yang salah akan dilewati.</p>
                    <InfoDialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">Tutup</Button>
                      </DialogClose>
                    </InfoDialogFooter>
                  </InfoDialogContent>
                </Dialog>
                <Button onClick={triggerFileInput} disabled={isImporting}>
                  {isImporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                  Import CSV
                </Button>
                <Button asChild>
                  <Link href="/services/new">
                    <PlusCircle className="mr-2 h-4 w-4" /> Tambah Item Baru
                  </Link>
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
                    <TableHead className="text-right">Harga Dasar</TableHead>
                    <TableHead className="text-center">Poin Dasar</TableHead>
                    <TableHead className="text-center">Jml. Varian</TableHead>
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
                      <TableCell className="text-center">
                        {item.pointsAwarded && item.pointsAwarded > 0 ? (
                           <div className="flex items-center justify-center">
                             <Gift className="mr-1 h-3 w-3 text-yellow-500" /> {item.pointsAwarded}
                           </div>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell className="text-center">{item.variants?.length || 0}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild className="hover:text-primary">
                           <Link href={`/services/${item.id}/edit`}>
                            <Edit3 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setItemToDelete(item)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
               {filteredItems.length === 0 && !loading && (
                <div className="text-center py-10 text-muted-foreground">
                   {items.length > 0 ? 'Tidak ada item yang cocok dengan pencarian Anda.' : 'Tidak ada layanan atau produk yang ditemukan.'}
                   {items.length === 0 && <Link href="/services/new" className="text-primary hover:underline ml-1">Tambah item baru</Link>}
                </div>
              )}
            </CardContent>
             <CardFooter>
              <p className="text-xs text-muted-foreground">Menampilkan {filteredItems.length} dari {items.length} item.</p>
            </CardFooter>
          </Card>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus item "{itemToDelete?.name}"? Tindakan ini tidak dapat diurungkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setItemToDelete(null)}>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteItem} className={buttonVariants({variant: "destructive"})}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}

    