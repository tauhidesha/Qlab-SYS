
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Trash2, CreditCard, Loader2, ShoppingBag, Edit, UserPlus } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, arrayUnion, serverTimestamp, addDoc, type Timestamp, getDocs } from 'firebase/firestore';
import type { Transaction, TransactionItem } from '@/types/transaction';
import type { ServiceProduct } from '@/app/(app)/services/page'; // Import ServiceProduct
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function PosPage() {
  const [openTransactions, setOpenTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isSubmittingItem, setIsSubmittingItem] = useState(false);
  
  // For Add Item Dialog
  const [availableItems, setAvailableItems] = useState<ServiceProduct[]>([]);
  const [loadingCatalogItems, setLoadingCatalogItems] = useState(true);
  const [selectedCatalogItemId, setSelectedCatalogItemId] = useState<string>('');
  const [itemName, setItemName] = useState(''); // Will be auto-filled
  const [itemPrice, setItemPrice] = useState<number | string>(''); // Will be auto-filled
  const [itemQuantity, setItemQuantity] = useState<number | string>(1);
  const [itemType, setItemType] = useState<'service' | 'product' | 'food_drink' | 'other'>('product'); // Will be auto-filled


  const { toast } = useToast();

  useEffect(() => {
    setLoadingTransactions(true);
    const transactionsRef = collection(db, 'transactions');
    const q = query(transactionsRef, where('status', '==', 'open'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const transactionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
      setOpenTransactions(transactionsData);
      setLoadingTransactions(false);
    }, (error) => {
      console.error("Error fetching open transactions: ", error);
      toast({
        title: "Error",
        description: "Tidak dapat mengambil data transaksi terbuka.",
        variant: "destructive",
      });
      setLoadingTransactions(false);
    });

    return () => unsubscribe();
  }, [toast]);

  useEffect(() => {
    const fetchAvailableItems = async () => {
        setLoadingCatalogItems(true);
        try {
            const itemsCollectionRef = collection(db, 'services');
            const q = query(itemsCollectionRef, orderBy("name"));
            const querySnapshot = await getDocs(q);
            const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct));
            setAvailableItems(itemsData);
        } catch (error) {
            console.error("Error fetching available items: ", error);
            toast({
                title: "Error",
                description: "Tidak dapat mengambil daftar item layanan/produk.",
                variant: "destructive",
            });
        } finally {
            setLoadingCatalogItems(false);
        }
    };
    fetchAvailableItems();
  }, [toast]);

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const resetAddItemForm = () => {
    setSelectedCatalogItemId('');
    setItemName('');
    setItemPrice('');
    setItemQuantity(1);
    setItemType('product');
  };

  const handleAddItemToTransaction = async () => {
    if (!selectedTransaction || !selectedCatalogItemId) {
        toast({ title: "Input Tidak Lengkap", description: "Pilih item dari katalog dan pastikan jumlah diisi.", variant: "destructive" });
        return;
    }

    const catalogItem = availableItems.find(item => item.id === selectedCatalogItemId);
    if (!catalogItem) {
        toast({ title: "Error", description: "Item katalog tidak ditemukan.", variant: "destructive" });
        return;
    }

    const quantity = parseInt(String(itemQuantity), 10);
    if (isNaN(quantity) || quantity <= 0) {
        toast({ title: "Input Tidak Valid", description: "Jumlah harus angka positif.", variant: "destructive" });
        return;
    }

    setIsSubmittingItem(true);
    const newItem: TransactionItem = {
      id: catalogItem.id, // Use catalog item ID
      name: catalogItem.name,
      price: catalogItem.price,
      quantity: quantity,
      type: catalogItem.type === 'Layanan' ? 'service' : 'product', // Map from ServiceProduct type
    };

    try {
      const transactionDocRef = doc(db, 'transactions', selectedTransaction.id);
      const updatedItems = arrayUnion(newItem);
      // Recalculate totals
      const tempUpdatedItems = [...selectedTransaction.items, newItem];
      const { subtotal: newSubtotal, total: newTotal } = calculateTransactionTotals(
        tempUpdatedItems,
        selectedTransaction.discountAmount,
        selectedTransaction.discountPercentage
      );


      await updateDoc(transactionDocRef, {
        items: updatedItems,
        subtotal: newSubtotal,
        total: newTotal,
        updatedAt: serverTimestamp(),
      });

      toast({ title: "Sukses", description: `${newItem.name} berhasil ditambahkan ke transaksi.` });
      setIsAddItemDialogOpen(false);
      resetAddItemForm();
    } catch (error) {
      console.error("Error adding item to transaction: ", error);
      toast({ title: "Error", description: "Gagal menambahkan item.", variant: "destructive" });
    } finally {
      setIsSubmittingItem(false);
    }
  };
  
  const handleCreateNewManualTransaction = async () => {
    setLoadingTransactions(true); 
    try {
        const newTransactionData: Omit<Transaction, 'id'> = {
            customerName: "Pelanggan Walk-in " + (openTransactions.filter(t=> t.customerName.startsWith("Pelanggan Walk-in")).length + 1),
            status: 'open',
            items: [],
            subtotal: 0,
            discountAmount: 0,
            discountPercentage: 0,
            total: 0,
            createdAt: serverTimestamp() as Timestamp, 
            updatedAt: serverTimestamp() as Timestamp,
        };
        await addDoc(collection(db, 'transactions'), newTransactionData);
        toast({ title: "Sukses", description: "Transaksi manual baru berhasil dibuat."});
    } catch (error) {
        console.error("Error creating manual transaction: ", error);
        toast({ title: "Error", description: "Gagal membuat transaksi manual baru.", variant: "destructive" });
    } finally {
        setLoadingTransactions(false);
    }
  };

  const calculateTransactionTotals = (items: TransactionItem[], discountAmount: number = 0, discountPercentage: number = 0) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let currentDiscountAmount = discountAmount;
    if (discountPercentage > 0 && discountAmount === 0) { // Apply percentage if amount is not set
        currentDiscountAmount = subtotal * (discountPercentage / 100);
    } else if (discountAmount > 0) { // If amount is set, it overrides percentage
        // currentDiscountAmount is already discountAmount
    }
    const total = subtotal - currentDiscountAmount;
    return { subtotal, total, discountAmount: currentDiscountAmount };
  };
  
  const handleRemoveItemFromTransaction = async (itemIdToRemove: string) => {
    if (!selectedTransaction) return;

    setIsSubmittingItem(true);
    try {
        const transactionDocRef = doc(db, 'transactions', selectedTransaction.id);
        const updatedItemsArray = selectedTransaction.items.filter(item => item.id !== itemIdToRemove);
        
        const { subtotal, total, discountAmount } = calculateTransactionTotals(updatedItemsArray, selectedTransaction.discountAmount, selectedTransaction.discountPercentage);

        await updateDoc(transactionDocRef, {
            items: updatedItemsArray,
            subtotal: subtotal,
            total: total,
            discountAmount: discountAmount, 
            updatedAt: serverTimestamp(),
        });

        toast({ title: "Sukses", description: "Item berhasil dihapus dari transaksi." });
    } catch (error) {
        console.error("Error removing item from transaction: ", error);
        toast({ title: "Error", description: "Gagal menghapus item.", variant: "destructive" });
    } finally {
        setIsSubmittingItem(false);
    }
  };

  const handleDiscountChange = async (transactionId: string, items: TransactionItem[], newDiscountAmount: number, newDiscountPercentage: number) => {
    const { total, discountAmount: calculatedDiscountAmount } = calculateTransactionTotals(items, newDiscountAmount, newDiscountPercentage);
    
    // Optimistically update local state for better UX
    setSelectedTransaction(prev => {
      if (prev && prev.id === transactionId) {
        return {
          ...prev,
          discountAmount: newDiscountAmount > 0 ? newDiscountAmount : (newDiscountPercentage > 0 ? calculatedDiscountAmount : 0),
          discountPercentage: newDiscountPercentage,
          total: total
        };
      }
      return prev;
    });

    // Debounce or onBlur save to Firestore
    try {
        const transactionDocRef = doc(db, 'transactions', transactionId);
        await updateDoc(transactionDocRef, {
            discountAmount: newDiscountAmount > 0 ? newDiscountAmount : (newDiscountPercentage > 0 ? calculatedDiscountAmount : 0),
            discountPercentage: newDiscountPercentage,
            total: total,
            updatedAt: serverTimestamp()
        });
        // toast({ title: "Diskon Diperbarui", description: "Diskon berhasil disimpan."});
    } catch (error) {
        console.error("Error updating discount:", error);
        toast({ title: "Error Diskon", description: "Gagal menyimpan perubahan diskon.", variant: "destructive"});
        // Revert optimistic update if needed, or re-fetch
    }
  };


  if (loadingTransactions) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Titik Penjualan" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat transaksi terbuka...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Titik Penjualan" />
      <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Transaksi Terbuka</CardTitle>
                <Button onClick={handleCreateNewManualTransaction} size="sm" variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" /> Bill Baru
                </Button>
            </CardHeader>
            <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
              {openTransactions.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">Tidak ada transaksi terbuka.</p>
              ) : (
                <div className="space-y-3">
                  {openTransactions.map((trans) => (
                    <Button
                      key={trans.id}
                      variant={selectedTransaction?.id === trans.id ? "secondary" : "outline"}
                      className="w-full justify-start h-auto py-3"
                      onClick={() => handleSelectTransaction(trans)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">{trans.customerName}</span>
                        <span className="text-xs text-muted-foreground">
                          {trans.items.length} item - Total: Rp {trans.total.toLocaleString('id-ID')}
                        </span>
                         <span className="text-xs text-muted-foreground">
                            Staf Layanan: {trans.serviceStaffName || 'N/A'}
                         </span>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {selectedTransaction ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Detail Pesanan: {selectedTransaction.customerName}</CardTitle>
                  <CardDescription>
                    Transaksi ID: {selectedTransaction.id} | Staf Layanan: {selectedTransaction.serviceStaffName || "Belum Ditugaskan"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-2">
                     <Button size="sm" onClick={() => { resetAddItemForm(); setIsAddItemDialogOpen(true); }}>
                        <PlusCircle className="mr-2 h-4 w-4"/> Tambah Item
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Jml</TableHead>
                        <TableHead className="text-right">Harga</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTransaction.items.map((item, index) => ( // Added index for unique key if item.id is not unique enough across adds
                        <TableRow key={`${item.id}-${index}`}>
                          <TableCell>
                            {item.name}
                            {item.type === 'service' && item.staffName && <span className="text-xs text-muted-foreground block">Oleh: {item.staffName}</span>}
                          </TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">Rp {item.price.toLocaleString('id-ID')}</TableCell>
                          <TableCell className="text-right">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</TableCell>
                          <TableCell>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive hover:text-destructive h-8 w-8"
                                onClick={() => handleRemoveItemFromTransaction(item.id)} // Assuming item.id is unique enough for removal here
                                disabled={isSubmittingItem}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {selectedTransaction.items.length === 0 && (
                        <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-4">Belum ada item.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan Pembayaran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({selectedTransaction.items.reduce((acc,item)=> acc + item.quantity, 0)} item)</span>
                    <span>Rp {selectedTransaction.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Diskon</span>
                    <div className="flex items-center gap-2">
                         <Input 
                            type="number" 
                            placeholder="Rp" 
                            className="w-24 h-8 text-right" 
                            value={selectedTransaction.discountPercentage > 0 ? '' : (selectedTransaction.discountAmount || "")}
                            onChange={(e) => {
                                const newDiscountAmount = parseFloat(e.target.value) || 0;
                                handleDiscountChange(selectedTransaction.id, selectedTransaction.items, newDiscountAmount, 0);
                            }}
                            disabled={selectedTransaction.discountPercentage > 0}
                        />
                        <span className="text-sm">atau</span>
                        <Input 
                            type="number" 
                            placeholder="%" 
                            className="w-16 h-8 text-right" 
                            value={selectedTransaction.discountAmount > 0 ? '' : (selectedTransaction.discountPercentage || "")}
                            onChange={(e) => {
                                const newDiscPercent = parseFloat(e.target.value) || 0;
                                handleDiscountChange(selectedTransaction.id, selectedTransaction.items, 0, newDiscPercent);
                            }}
                            disabled={selectedTransaction.discountAmount > 0}
                         />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>Rp {selectedTransaction.total.toLocaleString('id-ID')}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-2">
                    <Button className="w-full" disabled>
                      <CreditCard className="mr-2 h-5 w-5" /> Proses Pembayaran (Segera)
                    </Button>
                    <Button variant="outline" className="w-full" disabled>Simpan sebagai Draf (Segera)</Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            <Card className="flex items-center justify-center h-full">
              <CardContent className="text-center text-muted-foreground">
                <ShoppingBag className="mx-auto h-12 w-12 mb-4" />
                <p>Pilih transaksi dari daftar di sebelah kiri untuk melihat detailnya,</p>
                <p>atau buat bill baru untuk pelanggan walk-in.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {selectedTransaction && (
        <Dialog open={isAddItemDialogOpen} onOpenChange={(isOpen) => {
            setIsAddItemDialogOpen(isOpen);
            if (!isOpen) resetAddItemForm();
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Item ke Transaksi</DialogTitle>
              <DialogDescription>Untuk {selectedTransaction.customerName}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="catalog-item-select">Pilih Item dari Katalog</Label>
                <Select 
                    value={selectedCatalogItemId}
                    onValueChange={(value) => {
                        setSelectedCatalogItemId(value);
                        const foundItem = availableItems.find(item => item.id === value);
                        if (foundItem) {
                            setItemName(foundItem.name);
                            setItemPrice(foundItem.price);
                            setItemType(foundItem.type === 'Layanan' ? 'service' : 'product');
                        } else {
                            setItemName('');
                            setItemPrice('');
                            setItemType('product');
                        }
                    }}
                    disabled={loadingCatalogItems}
                >
                    <SelectTrigger id="catalog-item-select">
                        <SelectValue placeholder={loadingCatalogItems ? "Memuat item..." : "Pilih item"} />
                    </SelectTrigger>
                    <SelectContent>
                        {!loadingCatalogItems && availableItems.length === 0 && (
                            <SelectItem value="no-items" disabled>Tidak ada item di katalog.</SelectItem>
                        )}
                        {availableItems.map(item => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.name} (Rp {item.price.toLocaleString('id-ID')}) - [{item.type}]
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>

              {selectedCatalogItemId && (
                <>
                  <div className="space-y-2">
                    <Label>Nama Item</Label>
                    <Input value={itemName} readOnly className="bg-muted/50"/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Harga Satuan (Rp)</Label>
                      <Input type="number" value={itemPrice} readOnly className="bg-muted/50"/>
                    </div>
                     <div className="space-y-2">
                        <Label>Jenis Item</Label>
                        <Input value={itemType === 'service' ? 'Layanan' : 'Produk'} readOnly className="bg-muted/50 capitalize"/>
                    </div>
                  </div>
                </>
              )}
               <div className="space-y-2">
                  <Label htmlFor="item-quantity">Jumlah</Label>
                  <Input 
                    id="item-quantity" 
                    type="number" 
                    value={itemQuantity} 
                    onChange={(e) => setItemQuantity(e.target.value)} 
                    placeholder="1" 
                    min="1" 
                    disabled={!selectedCatalogItemId}
                  />
                </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsAddItemDialogOpen(false); resetAddItemForm(); }} disabled={isSubmittingItem}>Batal</Button>
              <Button onClick={handleAddItemToTransaction} disabled={isSubmittingItem || !selectedCatalogItemId || loadingCatalogItems}>
                {isSubmittingItem && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Tambah Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
