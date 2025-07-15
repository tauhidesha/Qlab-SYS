
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Search, Loader2, Package, DollarSign, Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc, where } from 'firebase/firestore';
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
import type { ServiceProduct } from '@/app/(app)/services/page'; // Reuse the type
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function InventoryProductsPage() {
  const [products, setProducts] = useState<ServiceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [productToDelete, setProductToDelete] = useState<ServiceProduct | null>(null);

  const { toast } = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const itemsCollectionRef = collection(db, 'services');
      const q = query(itemsCollectionRef, where("type", "==", "Produk"), orderBy("name"));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products for inventory: ", error);
      toast({
        title: "Error",
        description: "Tidak dapat mengambil data produk dari Firestore.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      // Note: We are deleting from the 'services' collection as products are stored there
      await deleteDoc(doc(db, 'services', productToDelete.id));
      toast({
        title: "Sukses",
        description: `Produk "${productToDelete.name}" berhasil dihapus.`,
      });
      setProducts(products.filter(product => product.id !== productToDelete.id));
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product: ", error);
      toast({
        title: "Error",
        description: "Gagal menghapus produk.",
        variant: "destructive",
      });
      setProductToDelete(null);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Inventaris Produk" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Inventaris Produk" />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle className="flex items-center"><Package className="mr-2 h-6 w-6"/>Daftar Produk Inventaris</CardTitle>
                <CardDescription>Kelola stok, harga modal, dan detail produk fisik Anda.</CardDescription>
              </div>
               <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                 <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari produk..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/services/new">
                    <PlusCircle className="mr-2 h-4 w-4" /> 
                    <span className="sm:inline">Tambah Produk Baru</span>
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Foto</TableHead>
                      <TableHead>Nama Produk</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead className="text-center">Stok Dasar</TableHead>
                      <TableHead className="text-right">Harga Modal Dasar</TableHead>
                      <TableHead className="text-center">Varian</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Avatar className="h-12 w-12 rounded-md">
                             <AvatarImage src={product.description || `https://placehold.co/60x60.png?text=${product.name.charAt(0)}`} alt={product.name} data-ai-hint="foto produk" />
                             <AvatarFallback><ImageIcon className="h-5 w-5 text-muted-foreground"/></AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-center">
                          {product.stockQuantity !== undefined ? product.stockQuantity : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          {product.costPrice !== undefined ? `Rp ${product.costPrice.toLocaleString('id-ID')}` : '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          {product.variants && product.variants.length > 0 
                            ? <Badge variant="outline">{product.variants.length} Varian</Badge> 
                            : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" asChild className="hover:text-primary">
                             <Link href={`/services/${product.id}/edit`}>
                              <Edit3 className="h-4 w-4" />
                            </Link>
                          </Button>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setProductToDelete(product)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile & Tablet Card View */}
              <div className="lg:hidden space-y-3">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 flex-1 min-w-0">
                        <Avatar className="h-12 w-12 rounded-md flex-shrink-0">
                          <AvatarImage src={product.description || `https://placehold.co/60x60.png?text=${product.name.charAt(0)}`} alt={product.name} />
                          <AvatarFallback><ImageIcon className="h-5 w-5 text-muted-foreground"/></AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-base truncate">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          
                          {/* Product Details */}
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Stok Dasar:</span>
                              <span className="font-medium">
                                {product.stockQuantity !== undefined ? product.stockQuantity : '-'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Harga Modal:</span>
                              <span className="font-medium">
                                {product.costPrice !== undefined ? `Rp ${product.costPrice.toLocaleString('id-ID')}` : '-'}
                              </span>
                            </div>
                            {product.variants && product.variants.length > 0 && (
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Varian:</span>
                                <Badge variant="outline" className="text-xs">
                                  {product.variants.length} varian
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 ml-3 flex-shrink-0">
                        <Button variant="ghost" size="icon" asChild className="hover:text-primary h-8 w-8">
                          <Link href={`/services/${product.id}/edit`}>
                            <Edit3 className="h-3 w-3" />
                          </Link>
                        </Button>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8" onClick={() => setProductToDelete(product)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
               {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-10 text-muted-foreground">
                   {products.length > 0 ? 'Tidak ada produk yang cocok dengan pencarian Anda.' : 'Belum ada produk yang terdaftar di inventaris.'}
                   {products.length === 0 && <Link href="/services/new" className="text-primary hover:underline ml-1">Tambah produk baru</Link>}
                </div>
              )}
            </CardContent>
             <CardFooter>
              <p className="text-xs text-muted-foreground">Menampilkan {filteredProducts.length} dari {products.length} produk.</p>
            </CardFooter>
          </Card>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus produk "{productToDelete?.name}" dari katalog dan inventaris? Tindakan ini tidak dapat diurungkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setProductToDelete(null)}>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProduct} className={buttonVariants({variant: "destructive"})}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
