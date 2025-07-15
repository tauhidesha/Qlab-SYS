"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit3, Trash2, Wrench, ShoppingBag, Search, Loader2, Gift, UploadCloud, DollarSign, Package } from 'lucide-react';
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
import Papa from 'papaparse';
import { v4 as uuidv4 } from 'uuid'; 
import { embedText } from '@/ai/flows/embed-text-flow';

export interface ServiceProductVariant { 
  id: string; 
  name: string;
  price: number;
  pointsAwarded?: number;
  estimatedDuration?: string;
  stockQuantity?: number; 
  costPrice?: number; 
}

export interface ServiceProduct { 
  id: string;
  name: string;
  type: 'Layanan' | 'Produk';
  category: string;
  price: number; 
  description?: string;
  pointsAwarded?: number;
  estimatedDuration?: string;
  variants?: ServiceProductVariant[];
  stockQuantity?: number; 
  costPrice?: number; 
  createdAt?: any; 
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

          const requiredHeaders = ['name', 'type', 'category'];
          const actualHeaders = Object.keys(parsedData[0] || {});
          const missingHeaders = requiredHeaders.filter(h => !actualHeaders.includes(h));
          if (missingHeaders.length > 0) {
            toast({
              title: "Format CSV Salah",
              description: `Header kolom wajib yang hilang: ${missingHeaders.join(', ')}. Lihat info format CSV.`,
              variant: "destructive",
              duration: 10000,
            });
            setIsImporting(false);
            return;
          }
          
          const batch = writeBatch(db);
          let itemsAddedCount = 0;
          let itemsFailedCount = 0;
          const failedItemsLog: string[] = [];

          for (const row of parsedData) {
            const index = parsedData.indexOf(row);
            const name = row.name?.trim();
            const type = row.type?.trim() as ServiceProduct['type'] | undefined;
            const category = row.category?.trim();
            const priceString = row.price?.trim() || row['']?.trim(); 
            const description = row.description?.trim();
            const pointsAwardedString = row.pointsAwarded?.trim();
            const estimatedDurationString = row.estimatedDuration?.trim();
            const stockQuantityString = row.stockQuantity?.trim();
            const costPriceString = row.costPrice?.trim();

            if (!name || !type || !category) {
              console.warn(`Baris ${index + 2} dilewati: field wajib (name, type, category) tidak lengkap.`);
              failedItemsLog.push(`Baris ${index + 2}: Kolom wajib tidak lengkap.`);
              itemsFailedCount++;
              continue;
            }

            if (type !== 'Layanan' && type !== 'Produk') {
              console.warn(`Baris ${index + 2} dilewati: 'type' tidak valid ('${type}'). Harus 'Layanan' atau 'Produk'.`);
              failedItemsLog.push(`Baris ${index + 2}: Tipe tidak valid.`);
              itemsFailedCount++;
              continue;
            }
            
            let basePrice = parseFloat(priceString); 
            let basePointsAwarded = 0;
            if (pointsAwardedString) {
                const parsedPoints = parseInt(pointsAwardedString, 10);
                if (!isNaN(parsedPoints) && parsedPoints >= 0) {
                    basePointsAwarded = parsedPoints;
                } else {
                    console.warn(`Baris ${index + 2}: 'pointsAwarded' tidak valid ('${pointsAwardedString}'), akan diabaikan.`);
                }
            }

            let baseStockQuantity: number | undefined = undefined;
            if (stockQuantityString) {
                const parsedStock = parseInt(stockQuantityString, 10);
                if (!isNaN(parsedStock) && parsedStock >= 0) baseStockQuantity = parsedStock;
            }
            let baseCostPrice: number | undefined = undefined;
            if (costPriceString) {
                const parsedCost = parseFloat(costPriceString);
                if (!isNaN(parsedCost) && parsedCost >= 0) baseCostPrice = parsedCost;
            }

            const variants: ServiceProductVariant[] = [];
            for (let i = 1; i <= 5; i++) {
              const variantName = row[`variant${i}_name`]?.trim();
              const variantPriceString = row[`variant${i}_price`]?.trim();
              const variantPointsString = row[`variant${i}_pointsAwarded`]?.trim();
              const variantDurationString = row[`variant${i}_estimatedDuration`]?.trim();
              const variantStockString = row[`variant${i}_stockQuantity`]?.trim();
              const variantCostString = row[`variant${i}_costPrice`]?.trim();

              if (variantName && variantPriceString) {
                const variantPrice = parseFloat(variantPriceString);
                if (isNaN(variantPrice) || variantPrice <= 0) {
                  console.warn(`Baris ${index + 2}, Varian ${i}: harga varian tidak valid ('${variantPriceString}'). Varian ini dilewati.`);
                  continue; 
                }
                
                const newVariant: ServiceProductVariant = {
                  id: uuidv4(),
                  name: variantName,
                  price: variantPrice,
                };

                if (variantPointsString) {
                  const parsedVP = parseInt(variantPointsString, 10);
                  if (!isNaN(parsedVP) && parsedVP >= 0) {
                    newVariant.pointsAwarded = parsedVP;
                  }
                }
                if (variantDurationString) {
                  newVariant.estimatedDuration = variantDurationString;
                }
                if (type === 'Produk') {
                  if (variantStockString) {
                      const parsedVS = parseInt(variantStockString, 10);
                      if (!isNaN(parsedVS) && parsedVS >= 0) newVariant.stockQuantity = parsedVS;
                  }
                  if (variantCostString) {
                      const parsedVC = parseFloat(variantCostString);
                      if (!isNaN(parsedVC) && parsedVC >= 0) newVariant.costPrice = parsedVC;
                  }
                }
                variants.push(newVariant);
              } else if (variantName || variantPriceString) {
                console.warn(`Baris ${index + 2}, Varian ${i}: Nama dan Harga varian harus diisi bersamaan. Varian ini dilewati.`);
              }
            }

            if (variants.length > 0) {
                if (isNaN(basePrice)) basePrice = 0; 
            } else {
                if (isNaN(basePrice) || basePrice <= 0) {
                    console.warn(`Baris ${index + 2} dilewati: 'price' (harga dasar) wajib dan harus positif jika tidak ada varian. Diterima: '${priceString}'.`);
                    failedItemsLog.push(`Baris ${index + 2}: Harga dasar tidak valid.`);
                    itemsFailedCount++;
                    continue; 
                }
            }

            const newItemRef = doc(collection(db, 'services'));
            const newItemObject: any = {
              name,
              type,
              category,
              price: basePrice,
              createdAt: serverTimestamp()
            };

            if (description) newItemObject.description = description;
            if (basePointsAwarded > 0) newItemObject.pointsAwarded = basePointsAwarded;
            else if (basePointsAwarded === 0) newItemObject.pointsAwarded = 0;

            if (estimatedDurationString) newItemObject.estimatedDuration = estimatedDurationString;
            if (variants.length > 0) newItemObject.variants = variants;
            
            if (type === 'Produk') {
              if (baseStockQuantity !== undefined) newItemObject.stockQuantity = baseStockQuantity;
              else newItemObject.stockQuantity = 0; 

              if (baseCostPrice !== undefined) newItemObject.costPrice = baseCostPrice;
              else newItemObject.costPrice = 0; 
            }
            
            let embedding;
            try {
              const textToEmbed = `Layanan/Produk: ${newItemObject.name}. Deskripsi: ${newItemObject.description || 'Tidak ada deskripsi.'}`;
              embedding = await embedText(textToEmbed);
            } catch (embedError: any) {
              console.warn(`Embedding failed for CSV row ${index + 2} (${newItemObject.name}). Skipping this item. Error: ${embedError.message}`);
              failedItemsLog.push(`Baris ${index + 2} (${name}): Gagal embedding.`);
              itemsFailedCount++;
              continue;
            }

            newItemObject.embedding = embedding;

            batch.set(newItemRef, newItemObject);
            itemsAddedCount++;
          }

          try {
            await batch.commit();
            toast({
              title: "Import Selesai",
              description: `${itemsAddedCount} item berhasil diimpor dengan embedding. ${itemsFailedCount > 0 ? `${itemsFailedCount} item gagal (cek konsol untuk detail: ${failedItemsLog.slice(0,2).join(', ')}...).` : ''}`,
              duration: 7000,
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

  // Helper function to get display price and label
  const getDisplayPrice = (item: ServiceProduct) => {
    const basePrice = item.price || 0;
    
    // If base price exists and > 0, use it
    if (basePrice > 0) {
      return {
        price: basePrice,
        label: "Harga Dasar",
        isVariantPrice: false
      };
    }
    
    // If no base price, find minimum variant price
    if (item.variants && item.variants.length > 0) {
      const variantPrices = item.variants
        .map(v => v.price)
        .filter(p => p > 0);
      
      if (variantPrices.length > 0) {
        const minPrice = Math.min(...variantPrices);
        return {
          price: minPrice,
          label: "Mulai dari",
          isVariantPrice: true
        };
      }
    }
    
    // Fallback to 0
    return {
      price: 0,
      label: "Harga Dasar",
      isVariantPrice: false
    };
  };

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
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle>Katalog Layanan & Produk</CardTitle>
                <CardDescription>Kelola penawaran Anda dan detailnya, termasuk varian produk, stok, dan harga modal.</CardDescription>
              </div>
               <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                 <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari item..."
                    className="pl-8 w-full sm:w-[200px] lg:w-[250px]"
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
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">Info Format CSV</Button>
                  </InfoDialogTrigger>
                  <InfoDialogContent className="sm:max-w-lg">
                    <InfoDialogHeader>
                      <InfoDialogTitle>Format CSV untuk Impor Layanan/Produk</InfoDialogTitle>
                      <InfoDialogDescription>
                        Pastikan file CSV Anda memiliki header kolom berikut (urutan tidak masalah, case-sensitive):
                      </InfoDialogDescription>
                    </InfoDialogHeader>
                    <ul className="list-disc list-inside space-y-1 text-sm my-4">
                      <li><code className="bg-muted px-1 rounded-sm">name</code> (Teks, Wajib)</li>
                      <li><code className="bg-muted px-1 rounded-sm">type</code> (Teks, Wajib) - Harus 'Layanan' atau 'Produk'.</li>
                      <li><code className="bg-muted px-1 rounded-sm">category</code> (Teks, Wajib)</li>
                      <li><code className="bg-muted px-1 rounded-sm">price</code> (Angka, Wajib jika tidak ada varian, bisa 0 jika ada varian)</li>
                      <li><code className="bg-muted px-1 rounded-sm">description</code> (Teks, Opsional)</li>
                      <li><code className="bg-muted px-1 rounded-sm">pointsAwarded</code> (Angka, Opsional)</li>
                      <li><code className="bg-muted px-1 rounded-sm">estimatedDuration</code> (Teks, Opsional) - Mis. "30 mnt".</li>
                      <li><code className="bg-muted px-1 rounded-sm">stockQuantity</code> (Angka, Opsional) - Hanya untuk Produk.</li>
                      <li><code className="bg-muted px-1 rounded-sm">costPrice</code> (Angka, Opsional) - Hanya untuk Produk.</li>
                      <li className="font-semibold mt-2">Untuk Varian (Opsional, maksimal 5 varian):</li>
                      <li><code className="bg-muted px-1 rounded-sm">variantN_name</code> (Wajib jika <code className="bg-muted px-1 rounded-sm">variantN_price</code> diisi)</li>
                      <li><code className="bg-muted px-1 rounded-sm">variantN_price</code> (Angka, Wajib jika <code className="bg-muted px-1 rounded-sm">variantN_name</code> diisi, &gt;0)</li>
                      <li><code className="bg-muted px-1 rounded-sm">variantN_pointsAwarded</code> (Angka, Opsional)</li>
                      <li><code className="bg-muted px-1 rounded-sm">variantN_estimatedDuration</code> (Teks, Opsional)</li>
                      <li><code className="bg-muted px-1 rounded-sm">variantN_stockQuantity</code> (Angka, Opsional) - Hanya untuk Produk.</li>
                      <li><code className="bg-muted px-1 rounded-sm">variantN_costPrice</code> (Angka, Opsional) - Hanya untuk Produk.</li>
                      <li>Ganti 'N' dengan angka 1 sampai 5 (mis. variant1_name, variant2_price).</li>
                    </ul>
                    <p className="text-xs text-muted-foreground">Baris pertama CSV harus berisi nama header. Kolom ke-4 (setelah category) bisa kosong atau diisi dengan header 'price'.</p>
                    <InfoDialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">Tutup</Button>
                      </DialogClose>
                    </InfoDialogFooter>
                  </InfoDialogContent>
                </Dialog>
                <Button onClick={triggerFileInput} disabled={isImporting} className="w-full sm:w-auto">
                  {isImporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                  <span className="sm:inline">Import CSV</span>
                </Button>
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/services/new">
                    <PlusCircle className="mr-2 h-4 w-4" /> 
                    <span className="sm:inline">Tambah Item Baru</span>
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
                      <TableHead>Nama</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead className="text-right">Harga</TableHead>
                      <TableHead className="text-center">Poin</TableHead>
                      <TableHead className="text-center">Stok</TableHead>
                      <TableHead className="text-right">Hrg. Modal</TableHead>
                      <TableHead className="text-center">Varian</TableHead>
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
                        <TableCell className="text-right">
                          {(() => {
                            const displayPrice = getDisplayPrice(item);
                            return (
                              <div className="text-right">
                                <div>Rp {displayPrice.price.toLocaleString('id-ID')}</div>
                                {displayPrice.isVariantPrice && (
                                  <div className="text-xs text-muted-foreground">{displayPrice.label}</div>
                                )}
                              </div>
                            );
                          })()}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.pointsAwarded && item.pointsAwarded > 0 ? (
                             <div className="flex items-center justify-center">
                               <Gift className="mr-1 h-3 w-3 text-yellow-500" /> {item.pointsAwarded}
                             </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                         <TableCell className="text-center">
                          {item.type === 'Produk' ? (item.stockQuantity !== undefined ? item.stockQuantity : '-') : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.type === 'Produk' ? (item.costPrice !== undefined ? `Rp ${item.costPrice.toLocaleString('id-ID')}` : '-') : '-'}
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
              </div>

              {/* Mobile & Tablet Card View */}
              <div className="lg:hidden space-y-3">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={item.type === 'Layanan' ? 'default' : 'secondary'} className="text-xs">
                            {item.type === 'Layanan' ? <Wrench className="mr-1 h-3 w-3" /> : <ShoppingBag className="mr-1 h-3 w-3" />}
                            {item.type}
                          </Badge>
                          {item.variants && item.variants.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {item.variants.length} varian
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-medium text-base truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        
                        {/* Price Section */}
                        <div className="mt-2">
                          {(() => {
                            const displayPrice = getDisplayPrice(item);
                            return (
                              <div className="mb-2">
                                <span className="font-semibold text-lg">Rp {displayPrice.price.toLocaleString('id-ID')}</span>
                                {displayPrice.isVariantPrice && (
                                  <div className="text-xs text-muted-foreground">{displayPrice.label}</div>
                                )}
                              </div>
                            );
                          })()}
                          
                          {/* Icons Section */}
                          {((item.pointsAwarded && item.pointsAwarded > 0) || (item.type === 'Produk' && item.stockQuantity !== undefined && item.stockQuantity > 0)) && (
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              {item.pointsAwarded && item.pointsAwarded > 0 && (
                                <div className="flex items-center">
                                  <Gift className="mr-1 h-3 w-3 text-yellow-500" />
                                  {item.pointsAwarded}
                                </div>
                              )}
                              {item.type === 'Produk' && item.stockQuantity !== undefined && item.stockQuantity > 0 && (
                                <div className="flex items-center">
                                  <Package className="mr-1 h-3 w-3 text-blue-500" />
                                  {item.stockQuantity}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 ml-3">
                        <Button variant="ghost" size="icon" asChild className="hover:text-primary h-8 w-8">
                          <Link href={`/services/${item.id}/edit`}>
                            <Edit3 className="h-3 w-3" />
                          </Link>
                        </Button>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive h-8 w-8" onClick={() => setItemToDelete(item)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
               {filteredItems.length === 0 && !loading && (
                <div className="text-center py-10 text-muted-foreground">
                   <p>{items.length > 0 ? 'Tidak ada item yang cocok dengan pencarian Anda.' : 'Tidak ada layanan atau produk yang ditemukan.'}</p>
                   {items.length === 0 && (
                     <p className="mt-2">
                       <Link href="/services/new" className="text-primary hover:underline">
                         Tambah item baru
                       </Link>
                     </p>
                   )}
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

