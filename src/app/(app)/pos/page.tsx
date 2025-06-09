
"use client";
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Trash2, CreditCard, Loader2, ShoppingBag, UserPlus } from 'lucide-react';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, arrayUnion, serverTimestamp, addDoc, type Timestamp, getDocs, getDoc } from 'firebase/firestore';
import type { Transaction, TransactionItem } from '@/types/transaction';
import type { ServiceProduct } from '@/app/(app)/services/page'; 
import type { Client } from '@/types/client';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from '@/components/ui/textarea';


export default function PosPage() {
  const [openTransactions, setOpenTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isSubmittingItem, setIsSubmittingItem] = useState(false);
  
  const [availableItems, setAvailableItems] = useState<ServiceProduct[]>([]);
  const [loadingCatalogItems, setLoadingCatalogItems] = useState(true);
  const [selectedCatalogItemId, setSelectedCatalogItemId] = useState<string>('');
  const [itemName, setItemName] = useState(''); 
  const [itemPrice, setItemPrice] = useState<number | string>(''); 
  const [itemQuantity, setItemQuantity] = useState<number | string>(1);
  const [itemType, setItemType] = useState<'service' | 'product' | 'food_drink' | 'other'>('product');
  const [itemPointsAwarded, setItemPointsAwarded] = useState<number>(0);


  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [paymentNotes, setPaymentNotes] = useState<string>('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentMethods = ["Tunai", "QRIS", "Kartu Debit"];

  const [isCreateBillDialogOpen, setIsCreateBillDialogOpen] = useState(false);
  const [newBillType, setNewBillType] = useState<'walk-in' | 'existing-client'>('walk-in');
  const [availableClients, setAvailableClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [selectedClientIdForNewBill, setSelectedClientIdForNewBill] = useState<string | undefined>(undefined);
  const [isSubmittingNewBill, setIsSubmittingNewBill] = useState(false);


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

  useEffect(() => {
    const fetchClients = async () => {
        setLoadingClients(true);
        try {
            const clientsCollectionRef = collection(db, 'clients');
            const q = query(clientsCollectionRef, orderBy("name"));
            const querySnapshot = await getDocs(q);
            const clientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
            setAvailableClients(clientsData);
        } catch (error) {
            console.error("Error fetching clients: ", error);
            toast({
                title: "Error",
                description: "Tidak dapat mengambil daftar klien.",
                variant: "destructive",
            });
        } finally {
            setLoadingClients(false);
        }
    };
    fetchClients();
  }, [toast]);

  const selectedTransaction = useMemo(() => {
    if (!selectedTransactionId) return null;
    return openTransactions.find(t => t.id === selectedTransactionId) || null;
  }, [openTransactions, selectedTransactionId]);

  const handleSelectTransaction = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
  };

  const resetAddItemForm = () => {
    setSelectedCatalogItemId('');
    setItemName('');
    setItemPrice('');
    setItemQuantity(1);
    setItemType('product');
    setItemPointsAwarded(0);
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
      id: uuidv4(), 
      catalogItemId: catalogItem.id,
      name: catalogItem.name,
      price: catalogItem.price,
      quantity: quantity,
      type: catalogItem.type === 'Layanan' ? 'service' : 'product', 
      pointsAwardedPerUnit: catalogItem.pointsAwarded || 0,
    };

    try {
      const transactionDocRef = doc(db, 'transactions', selectedTransaction.id);
      const currentItems = selectedTransaction.items || [];
      const updatedItemsForCalc = [...currentItems, newItem];
      
      const { subtotal: newSubtotal, total: newTotal } = calculateTransactionTotals(
        updatedItemsForCalc,
        selectedTransaction.discountAmount,
        selectedTransaction.discountPercentage
      );

      await updateDoc(transactionDocRef, {
        items: arrayUnion(newItem),
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
  
  const resetNewBillDialogState = () => {
    setNewBillType('walk-in');
    setSelectedClientIdForNewBill(undefined);
  };

  const handleConfirmCreateBill = async () => {
    if (newBillType === 'existing-client' && !selectedClientIdForNewBill) {
      toast({ title: "Input Kurang", description: "Silakan pilih klien terdaftar.", variant: "destructive" });
      return;
    }
    
    setIsSubmittingNewBill(true);
    try {
      let customerNameForBill = "Pelanggan Walk-in #" + (openTransactions.filter(t => t.customerName.startsWith("Pelanggan Walk-in")).length + 1 + Math.floor(Math.random()*100));
      let clientIdForBill: string | undefined = undefined;

      if (newBillType === 'existing-client' && selectedClientIdForNewBill) {
        const client = availableClients.find(c => c.id === selectedClientIdForNewBill);
        if (client) {
          customerNameForBill = client.name;
          clientIdForBill = client.id;
        } else {
          toast({ title: "Error", description: "Klien yang dipilih tidak ditemukan.", variant: "destructive" });
          setIsSubmittingNewBill(false);
          return;
        }
      }

      const newTransactionBaseData = {
        customerName: customerNameForBill,
        status: 'open' as 'open',
        items: [] as TransactionItem[],
        subtotal: 0,
        discountAmount: 0,
        discountPercentage: 0,
        total: 0,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };
      
      const newTransactionData: Partial<Transaction> & { createdAt: any, updatedAt: any } = {
        ...newTransactionBaseData,
      };

      if (clientIdForBill) {
        newTransactionData.clientId = clientIdForBill;
      }
      

      const docRef = await addDoc(collection(db, 'transactions'), newTransactionData);
      setSelectedTransactionId(docRef.id); 
      toast({ title: "Sukses", description: `Transaksi baru untuk ${customerNameForBill} berhasil dibuat.` });
      setIsCreateBillDialogOpen(false);
      resetNewBillDialogState();
    } catch (error) {
      console.error("Error creating new bill: ", error);
      toast({ title: "Error", description: "Gagal membuat bill baru.", variant: "destructive" });
    } finally {
      setIsSubmittingNewBill(false);
    }
  };


  const calculateTransactionTotals = (items: TransactionItem[], discountAmount: number = 0, discountPercentage: number = 0) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let currentDiscountAmount = discountAmount;
    if (discountPercentage > 0 && discountAmount === 0) { 
        currentDiscountAmount = subtotal * (discountPercentage / 100);
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

  const handleDiscountChange = async (transactionId: string, items: TransactionItem[], newDiscountAmountInput: string, newDiscountPercentageInput: string) => {
    const newDiscountAmount = parseFloat(newDiscountAmountInput) || 0;
    const newDiscountPercentage = parseFloat(newDiscountPercentageInput) || 0;

    let appliedDiscountAmount = 0;
    let appliedDiscountPercentage = 0;

    if (newDiscountAmount > 0) {
        appliedDiscountAmount = newDiscountAmount;
    } else if (newDiscountPercentage > 0) {
        appliedDiscountPercentage = newDiscountPercentage;
    }

    const { total, discountAmount: calculatedDiscountAmount } = calculateTransactionTotals(items, appliedDiscountAmount, appliedDiscountPercentage);
    
    try {
        const transactionDocRef = doc(db, 'transactions', transactionId);
        await updateDoc(transactionDocRef, {
            discountAmount: appliedDiscountAmount > 0 ? appliedDiscountAmount : (appliedDiscountPercentage > 0 ? calculatedDiscountAmount : 0),
            discountPercentage: appliedDiscountPercentage,
            total: total,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating discount:", error);
        toast({ title: "Error Diskon", description: "Gagal menyimpan perubahan diskon.", variant: "destructive"});
    }
  };

  const handleOpenPaymentDialog = () => {
    if (selectedTransaction && selectedTransaction.items.length > 0) {
      setSelectedPaymentMethod('');
      setPaymentNotes('');
      setIsPaymentDialogOpen(true);
    } else {
      toast({
        title: "Tidak Dapat Memproses",
        description: "Tidak ada item dalam transaksi atau transaksi tidak dipilih.",
        variant: "destructive"
      });
    }
  };

  const handleConfirmPayment = async () => {
    console.log("[POS] handleConfirmPayment started");
    if (!selectedTransaction) {
      toast({ title: "Error", description: "Tidak ada transaksi yang dipilih.", variant: "destructive"});
      console.log("[POS] No selected transaction.");
      return;
    }
    if (!selectedPaymentMethod) {
      toast({ title: "Input Kurang", description: "Silakan pilih metode pembayaran.", variant: "destructive"});
      console.log("[POS] No payment method selected.");
      return;
    }

    setIsProcessingPayment(true);
    console.log("[POS] Processing payment for transaction ID:", selectedTransaction.id);
    try {
      const transactionDocRef = doc(db, 'transactions', selectedTransaction.id);
      await updateDoc(transactionDocRef, {
        status: 'paid',
        paymentMethod: selectedPaymentMethod,
        notes: paymentNotes || '',
        paidAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({ title: "Pembayaran Sukses", description: `Transaksi untuk ${selectedTransaction.customerName} berhasil dibayar.`});
      console.log("[POS] Transaction status updated to 'paid'.");
      
      if (selectedTransaction.clientId) {
        console.log("[POS] Client ID found:", selectedTransaction.clientId, "Attempting to update client loyalty points.");
        try {
            const clientDocRef = doc(db, 'clients', selectedTransaction.clientId);
            const clientDocSnap = await getDoc(clientDocRef);

            if (clientDocSnap.exists()) {
                const clientData = clientDocSnap.data() as Client;
                console.log("[POS] Client data found:", clientData);
                console.log("[POS] Transaction items for points calculation:", selectedTransaction.items);

                const pointsEarned = selectedTransaction.items.reduce((sum, item) => {
                    const awardedPoints = (typeof item.pointsAwardedPerUnit === 'number' && !isNaN(item.pointsAwardedPerUnit)) ? item.pointsAwardedPerUnit : 0;
                    const qty = (typeof item.quantity === 'number' && !isNaN(item.quantity) && item.quantity > 0) ? item.quantity : 0;
                    console.log(`[POS] Item: ${item.name}, Points per unit: ${awardedPoints}, Qty: ${qty}, Points for this item: ${awardedPoints * qty}`);
                    return sum + (awardedPoints * qty);
                }, 0);
                console.log("[POS] Total points earned from this transaction:", pointsEarned);

                const currentLoyaltyPoints = (typeof clientData.loyaltyPoints === 'number' && !isNaN(clientData.loyaltyPoints)) ? clientData.loyaltyPoints : 0;
                console.log("[POS] Current client loyalty points:", currentLoyaltyPoints);
                
                const newLoyaltyPoints = currentLoyaltyPoints + pointsEarned;
                console.log("[POS] New client loyalty points:", newLoyaltyPoints);
                
                const today = new Date().toLocaleDateString('en-CA'); 

                await updateDoc(clientDocRef, {
                    loyaltyPoints: newLoyaltyPoints,
                    lastVisit: today,
                });
                
                if (pointsEarned > 0) {
                  toast({ title: "Info Klien Diperbarui", description: `Poin loyalitas (${pointsEarned} poin) & kunjungan terakhir untuk ${clientData.name} telah diperbarui.` });
                  console.log(`[POS] Client ${clientData.name} updated with ${pointsEarned} new points and last visit.`);
                } else {
                  toast({ title: "Info Klien Diperbarui", description: `Kunjungan terakhir untuk ${clientData.name} telah diperbarui.` });
                  console.log(`[POS] Client ${clientData.name} last visit updated (no points earned).`);
                }
            } else {
                console.log("[POS] Client document not found for ID:", selectedTransaction.clientId);
            }
        } catch (clientUpdateError) {
            console.error("[POS] Error updating client loyalty/visit: ", clientUpdateError);
            toast({ title: "Peringatan", description: "Pembayaran berhasil, tapi gagal memperbarui data loyalitas klien.", variant: "destructive" });
        }
      } else {
        console.log("[POS] No client ID in transaction. Skipping client update.");
      }
      
      setIsPaymentDialogOpen(false);
      setSelectedTransactionId(null); 
      console.log("[POS] Payment dialog closed, selected transaction reset.");
    } catch (error) {
      console.error("[POS] Error processing payment: ", error);
      toast({ title: "Error Pembayaran", description: "Gagal memproses pembayaran.", variant: "destructive"});
    } finally {
      setIsProcessingPayment(false);
      console.log("[POS] handleConfirmPayment finished.");
    }
  };


  if (loadingTransactions || loadingCatalogItems || loadingClients) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Titik Penjualan" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data...</p>
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
                <Button 
                  onClick={() => { resetNewBillDialogState(); setIsCreateBillDialogOpen(true); }} 
                  size="sm" 
                  variant="outline"
                >
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
                      variant={selectedTransactionId === trans.id ? "secondary" : "outline"}
                      className="w-full justify-start h-auto py-3"
                      onClick={() => handleSelectTransaction(trans.id)}
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
                            defaultValue={selectedTransaction.discountPercentage > 0 ? '' : (selectedTransaction.discountAmount || "")}
                            onBlur={(e) => {
                                handleDiscountChange(selectedTransaction.id, selectedTransaction.items, e.target.value, '0');
                            }}
                            disabled={selectedTransaction.discountPercentage > 0}
                        />
                        <span className="text-sm">atau</span>
                        <Input 
                            type="number" 
                            placeholder="%" 
                            className="w-16 h-8 text-right" 
                            defaultValue={selectedTransaction.discountAmount > 0 ? '' : (selectedTransaction.discountPercentage || "")}
                            onBlur={(e) => {
                                handleDiscountChange(selectedTransaction.id, selectedTransaction.items, '0', e.target.value);
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
                    <Button 
                      className="w-full" 
                      onClick={handleOpenPaymentDialog}
                      disabled={!selectedTransaction || selectedTransaction.items.length === 0 || isProcessingPayment}
                    >
                      {isProcessingPayment ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CreditCard className="mr-2 h-5 w-5" />}
                      Proses Pembayaran
                    </Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            <Card className="flex items-center justify-center h-full">
              <CardContent className="text-center text-muted-foreground">
                <ShoppingBag className="mx-auto h-12 w-12 mb-4" />
                <p>Pilih transaksi dari daftar di sebelah kiri untuk melihat detailnya,</p>
                <p>atau buat bill baru.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Dialog for Creating New Bill */}
      <Dialog open={isCreateBillDialogOpen} onOpenChange={setIsCreateBillDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Bill Baru</DialogTitle>
            <DialogDescription>Pilih jenis pelanggan atau pelanggan terdaftar.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 pb-4">
            <RadioGroup value={newBillType} onValueChange={(value: 'walk-in' | 'existing-client') => setNewBillType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="walk-in" id="rb-walk-in" />
                <Label htmlFor="rb-walk-in">Pelanggan Walk-in</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing-client" id="rb-existing-client" />
                <Label htmlFor="rb-existing-client">Klien Terdaftar</Label>
              </div>
            </RadioGroup>

            {newBillType === 'existing-client' && (
              <div className="space-y-2">
                <Label htmlFor="client-select-for-bill">Pilih Klien</Label>
                <Select 
                  value={selectedClientIdForNewBill}
                  onValueChange={setSelectedClientIdForNewBill}
                  disabled={loadingClients}
                >
                  <SelectTrigger id="client-select-for-bill">
                    <SelectValue placeholder={loadingClients ? "Memuat klien..." : "Pilih klien"} />
                  </SelectTrigger>
                  <SelectContent>
                    {!loadingClients && availableClients.length === 0 && (
                      <SelectItem value="no-clients" disabled>Tidak ada klien terdaftar.</SelectItem>
                    )}
                    {availableClients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name} ({client.phone})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={resetNewBillDialogState} disabled={isSubmittingNewBill}>Batal</Button>
            </DialogClose>
            <Button onClick={handleConfirmCreateBill} disabled={isSubmittingNewBill || (newBillType === 'existing-client' && !selectedClientIdForNewBill && !loadingClients)}>
              {isSubmittingNewBill ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
              Buat Transaksi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Dialog for Adding Item to Transaction */}
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
                            setItemPointsAwarded(foundItem.pointsAwarded || 0);
                        } else {
                            setItemName('');
                            setItemPrice('');
                            setItemType('product');
                            setItemPointsAwarded(0);
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
                                {item.name} (Rp {item.price.toLocaleString('id-ID')}) - [{item.type}] {item.pointsAwarded && item.pointsAwarded > 0 ? `(${item.pointsAwarded} pts)` : ''}
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
                   <div className="space-y-2">
                      <Label>Poin Diberikan per Unit</Label>
                      <Input type="number" value={itemPointsAwarded} readOnly className="bg-muted/50"/>
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

      {/* Dialog for Payment Processing */}
      {selectedTransaction && (
         <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Proses Pembayaran</DialogTitle>
              <DialogDescription>
                Untuk transaksi: {selectedTransaction.customerName} <br />
                Total Tagihan: <span className="font-bold text-lg">Rp {selectedTransaction.total.toLocaleString('id-ID')}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="payment-method-select">Metode Pembayaran</Label>
                <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <SelectTrigger id="payment-method-select">
                    <SelectValue placeholder="Pilih metode pembayaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map(method => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-notes">Catatan (Opsional)</Label>
                <Textarea 
                  id="payment-notes" 
                  value={paymentNotes} 
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="Mis. Pembayaran DP, Lunas dengan diskon khusus, dll." 
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isProcessingPayment}>Batal</Button>
              </DialogClose>
              <Button onClick={handleConfirmPayment} disabled={isProcessingPayment || !selectedPaymentMethod}>
                {isProcessingPayment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Konfirmasi Pembayaran
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

