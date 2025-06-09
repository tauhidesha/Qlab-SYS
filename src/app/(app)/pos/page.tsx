
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
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, arrayUnion, serverTimestamp, addDoc, type Timestamp } from 'firebase/firestore';
import type { Transaction, TransactionItem } from '@/types/transaction';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs for items
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


// Placeholder data for services/products if not fetched
const placeholderServices = [
  { id: 'S001', name: 'Cuci Motor Premium', price: 75000, type: 'Layanan', category: 'Pencucian' },
  { id: 'P001', name: 'Pelumas Rantai (Merek X)', price: 60000, type: 'Produk', category: 'Pelumas' },
  { id: 'F001', name: 'Kopi Susu', price: 15000, type: 'Minuman', category: 'Minuman Dingin' },
  { id: 'F002', name: 'Roti Bakar Coklat', price: 12000, type: 'Makanan', category: 'Makanan Ringan' },
];


export default function PosPage() {
  const [openTransactions, setOpenTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isSubmittingItem, setIsSubmittingItem] = useState(false);
  
  // For Add Item Dialog
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState<number | string>('');
  const [itemQuantity, setItemQuantity] = useState<number | string>(1);
  const [itemType, setItemType] = useState<'product' | 'food_drink' | 'other'>('product');


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

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleAddItemToTransaction = async () => {
    if (!selectedTransaction) return;
    if (!itemName || !itemPrice || !itemQuantity) {
        toast({ title: "Input Tidak Lengkap", description: "Nama, harga, dan jumlah item harus diisi.", variant: "destructive" });
        return;
    }

    const price = parseFloat(String(itemPrice));
    const quantity = parseInt(String(itemQuantity), 10);

    if (isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
        toast({ title: "Input Tidak Valid", description: "Harga dan jumlah harus angka positif.", variant: "destructive" });
        return;
    }

    setIsSubmittingItem(true);
    const newItem: TransactionItem = {
      id: uuidv4(), // Generate unique ID for this item instance
      name: itemName,
      price: price,
      quantity: quantity,
      type: itemType,
    };

    try {
      const transactionDocRef = doc(db, 'transactions', selectedTransaction.id);
      const updatedItems = arrayUnion(newItem);
      const newSubtotal = selectedTransaction.subtotal + (newItem.price * newItem.quantity);
      // Assuming discount doesn't change when adding items, recalculate total
      const newTotal = newSubtotal - selectedTransaction.discountAmount;


      await updateDoc(transactionDocRef, {
        items: updatedItems,
        subtotal: newSubtotal,
        total: newTotal, // Recalculate total based on new subtotal and existing discount
        updatedAt: serverTimestamp(),
      });

      toast({ title: "Sukses", description: `${itemName} berhasil ditambahkan ke transaksi.` });
      setIsAddItemDialogOpen(false);
      // Reset form
      setItemName('');
      setItemPrice('');
      setItemQuantity(1);
      setItemType('product');
      // selectedTransaction will update via onSnapshot
    } catch (error) {
      console.error("Error adding item to transaction: ", error);
      toast({ title: "Error", description: "Gagal menambahkan item.", variant: "destructive" });
    } finally {
      setIsSubmittingItem(false);
    }
  };
  
  const handleCreateNewManualTransaction = async () => {
    // For now, let's just create a basic transaction for a "Pelanggan Walk-in"
    // In the future, this would open a dialog to select/enter customer details.
    setLoadingTransactions(true); // Show loading feedback
    try {
        const newTransactionRef = doc(collection(db, 'transactions')); // Auto-generate ID
        const initialTransactionData: Omit<Transaction, 'id'> = {
            customerName: "Pelanggan Walk-in " + (openTransactions.filter(t=> t.customerName.startsWith("Pelanggan Walk-in")).length + 1), // Simple naming
            status: 'open',
            items: [],
            subtotal: 0,
            discountAmount: 0,
            discountPercentage: 0,
            total: 0,
            createdAt: serverTimestamp() as Timestamp, // Cast needed due to serverTimestamp
            updatedAt: serverTimestamp() as Timestamp,
        };
        await addDoc(collection(db, 'transactions'), initialTransactionData);
        toast({ title: "Sukses", description: "Transaksi manual baru berhasil dibuat."});
        // Data will refresh via onSnapshot
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
    if (discountPercentage > 0) {
        currentDiscountAmount = subtotal * (discountPercentage / 100);
    }
    const total = subtotal - currentDiscountAmount;
    return { subtotal, total, discountAmount: currentDiscountAmount };
  };
  
  // Function to remove an item from the selected transaction
  const handleRemoveItemFromTransaction = async (itemIdToRemove: string) => {
    if (!selectedTransaction) return;

    setIsSubmittingItem(true); // Reuse submitting state or create a new one
    try {
        const transactionDocRef = doc(db, 'transactions', selectedTransaction.id);
        const updatedItemsArray = selectedTransaction.items.filter(item => item.id !== itemIdToRemove);
        
        const { subtotal, total, discountAmount } = calculateTransactionTotals(updatedItemsArray, selectedTransaction.discountAmount, selectedTransaction.discountPercentage);

        await updateDoc(transactionDocRef, {
            items: updatedItemsArray,
            subtotal: subtotal,
            total: total,
            discountAmount: discountAmount, // Keep existing discount structure
            updatedAt: serverTimestamp(),
        });

        toast({ title: "Sukses", description: "Item berhasil dihapus dari transaksi." });
        // selectedTransaction will update via onSnapshot, which re-renders the details
    } catch (error) {
        console.error("Error removing item from transaction: ", error);
        toast({ title: "Error", description: "Gagal menghapus item.", variant: "destructive" });
    } finally {
        setIsSubmittingItem(false);
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
        {/* Left Side: Open Transactions List */}
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

        {/* Right Side: Selected Transaction Details & Actions */}
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
                     <Button size="sm" onClick={() => setIsAddItemDialogOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4"/> Tambah Item Manual
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
                      {selectedTransaction.items.map((item) => (
                        <TableRow key={item.id}>
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
                                onClick={() => handleRemoveItemFromTransaction(item.id)}
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
                            value={selectedTransaction.discountAmount || ""}
                            onChange={(e) => {
                                const newDiscountAmount = parseFloat(e.target.value) || 0;
                                const {total} = calculateTransactionTotals(selectedTransaction.items, newDiscountAmount, 0);
                                setSelectedTransaction(prev => prev ? {...prev, discountAmount: newDiscountAmount, discountPercentage: 0, total} : null);
                            }}
                            // Add onBlur to save to Firestore
                        />
                        <span className="text-sm">atau</span>
                        <Input 
                            type="number" 
                            placeholder="%" 
                            className="w-16 h-8 text-right" 
                            value={selectedTransaction.discountPercentage || ""}
                            onChange={(e) => {
                                const newDiscPercent = parseFloat(e.target.value) || 0;
                                const {total, discountAmount} = calculateTransactionTotals(selectedTransaction.items, 0, newDiscPercent);
                                setSelectedTransaction(prev => prev ? {...prev, discountAmount, discountPercentage: newDiscPercent, total} : null);
                            }}
                            // Add onBlur to save to Firestore
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
                    <Button className="w-full" disabled> {/* Payment processing for later */}
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

      {/* Dialog for Adding Manual Item */}
      {selectedTransaction && (
        <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Item Manual ke Transaksi</DialogTitle>
              <DialogDescription>Untuk {selectedTransaction.customerName}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Nama Item</Label>
                <Input id="item-name" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="mis. Kopi Susu, Stiker QLAB" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-price">Harga Satuan (Rp)</Label>
                  <Input id="item-price" type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} placeholder="15000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-quantity">Jumlah</Label>
                  <Input id="item-quantity" type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} placeholder="1" min="1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-type">Jenis Item</Label>
                <Select value={itemType} onValueChange={(value: 'product' | 'food_drink' | 'other') => setItemType(value)}>
                    <SelectTrigger id="item-type">
                        <SelectValue placeholder="Pilih jenis item" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="product">Produk</SelectItem>
                        <SelectItem value="food_drink">Makanan/Minuman</SelectItem>
                        <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)} disabled={isSubmittingItem}>Batal</Button>
              <Button onClick={handleAddItemToTransaction} disabled={isSubmittingItem}>
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

    