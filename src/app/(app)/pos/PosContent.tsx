"use client";

// Impor React dan hooks
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Impor komponen UI dari shadcn/ui
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppHeader from '@/components/layout/AppHeader';

// Impor ikon dari lucide-react
import { PlusCircle, Trash2, CreditCard, Loader2, ShoppingBag, UserPlus, Star, Tags, MessageSquareText, Send, Gift, UserCog, PackageSearch, Search } from 'lucide-react';

// Impor utilitas dan konfigurasi Firebase
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, arrayUnion, serverTimestamp, addDoc, type Timestamp, getDocs, getDoc, deleteDoc, deleteField as firestoreDeleteField } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

// Impor tipe data kustom
import type { Transaction, TransactionItem } from '@/types/transaction';
import type { ServiceProduct, ServiceProductVariant } from '@/app/(app)/services/page';
import type { Client } from '@/types/client';
import type { StaffMember } from '@/types/staff';
import type { LoyaltyReward } from '@/types/loyalty';


const SHOP_NAME = "QLAB Auto Detailing";

// --- KONFIGURASI BONUS ITEM OTOMATIS ---
const TRIGGER_SERVICE_ID = 'SVC_ADVANCE_FORMULA_PLACEHOLDER';
const BONUS_STICKER_PRODUCT_ID = 'PROD_STICKER_REWARD_PLACEHOLDER';
// --- END KONFIGURASI BONUS ITEM OTOMATIS ---


export default function PosContent() {
  const [openTransactions, setOpenTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isSubmittingItem, setIsSubmittingItem] = useState(false);

  const [availableItems, setAvailableItems] = useState<ServiceProduct[]>([]);
  const [loadingCatalogItems, setLoadingCatalogItems] = useState(true);
  const [selectedCatalogItemId, setSelectedCatalogItemId] = useState<string>('');
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(undefined);
  const [itemQuantity, setItemQuantity] = useState<number | string>(1);
  const [itemCategories, setItemCategories] = useState<string[]>([]);
  const [selectedItemCategoryTab, setSelectedItemCategoryTab] = useState<string>("Semua");
  const [selectedStaffForNewItemToAdd, setSelectedStaffForNewItemToAdd] = useState<string | undefined>(undefined);


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
  const [clientSearchTermForNewBill, setClientSearchTermForNewBill] = useState('');
  const [isSubmittingNewBill, setIsSubmittingNewBill] = useState(false);

  const [selectedClientDetails, setSelectedClientDetails] = useState<Client | null>(null);
  const [isRedeemPointsDialogOpen, setIsRedeemPointsDialogOpen] = useState(false);
  const [isSubmittingRedemption, setIsSubmittingRedemption] = useState(false);

  const [availableLoyaltyRewards, setAvailableLoyaltyRewards] = useState<LoyaltyReward[]>([]);
  const [loadingLoyaltyRewards, setLoadingLoyaltyRewards] = useState(true);
  const [minPointsToRedeemConfig, setMinPointsToRedeemConfig] = useState(100);
  const [availableRewardsForClient, setAvailableRewardsForClient] = useState<LoyaltyReward[]>([]);
  const [selectedRewardToRedeem, setSelectedRewardToRedeem] = useState<LoyaltyReward | null>(null);


  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
  const [whatsAppNumberInput, setWhatsAppNumberInput] = useState('');
  const [lastPaidTransactionDetails, setLastPaidTransactionDetails] = useState<Transaction | null>(null);
  const [isSendingWhatsAppReceipt, setIsSendingWhatsAppReceipt] = useState(false);

  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [isDeletingTransaction, setIsDeletingTransaction] = useState<boolean>(false);

  const [assignableStaffList, setAssignableStaffList] = useState<StaffMember[]>([]);
  const [loadingAssignableStaff, setLoadingAssignableStaff] = useState(true);


  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


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
    if (!searchParams) return;
    const qid = searchParams.get('qid');
    if (qid && openTransactions.length > 0 && !loadingTransactions && !selectedTransactionId) {
      const matchedTransaction = openTransactions.find(t => t.queueItemId === qid);
      if (matchedTransaction) {
        setSelectedTransactionId(matchedTransaction.id);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('qid');
        router.replace(newUrl.pathname + newUrl.search);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openTransactions, searchParams, router, pathname, loadingTransactions]);

  useEffect(() => {
    const fetchAvailableItems = async () => {
      setLoadingCatalogItems(true);
      try {
        const itemsCollectionRef = collection(db, 'services');
        const q = query(itemsCollectionRef, orderBy("name"));
        const querySnapshot = await getDocs(q);
        const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct));
        setAvailableItems(itemsData);

        const uniqueCategories = Array.from(new Set(itemsData.map(item => item.category).filter(Boolean)));
        setItemCategories(["Semua", ...uniqueCategories]);

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

  const fetchAssignableStaff = useCallback(async () => {
    setLoadingAssignableStaff(true);
    try {
      const staffCollectionRef = collection(db, 'staffMembers');
      const q = query(staffCollectionRef, where("role", "==", "Teknisi"), orderBy("name"));
      const querySnapshot = await getDocs(q);
      const staffData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
      setAssignableStaffList(staffData);
    } catch (error) {
      console.error("Error fetching assignable staff: ", error);
      toast({ title: "Error", description: "Tidak dapat mengambil daftar staf teknisi.", variant: "destructive" });
    } finally {
      setLoadingAssignableStaff(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAssignableStaff();
  }, [fetchAssignableStaff]);


  const filteredGalleryItems = useMemo(() => {
    if (selectedItemCategoryTab === "Semua") {
      return availableItems;
    }
    return availableItems.filter(item => item.category === selectedItemCategoryTab);
  }, [availableItems, selectedItemCategoryTab]);

  const handleCategoryTabChange = (category: string) => {
    setSelectedItemCategoryTab(category);
    setSelectedCatalogItemId('');
    setSelectedVariantId(undefined);
    setItemQuantity(1);
    setSelectedStaffForNewItemToAdd(undefined);
  };

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

  useEffect(() => {
    const fetchLoyaltyRewards = async () => {
      setLoadingLoyaltyRewards(true);
      try {
        const rewardsCollectionRef = collection(db, 'loyaltyRewards');
        const q = query(rewardsCollectionRef, where("isActive", "==", true), orderBy("pointsRequired"));
        const querySnapshot = await getDocs(q);
        const rewardsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LoyaltyReward));
        setAvailableLoyaltyRewards(rewardsData);

        const settingsDocRef = doc(db, 'appSettings', 'financial');
        const settingsSnap = await getDoc(settingsDocRef);
        if (settingsSnap.exists() && settingsSnap.data()?.minPointsToRedeemGeneral) {
          setMinPointsToRedeemConfig(settingsSnap.data()?.minPointsToRedeemGeneral);
        }

      } catch (error) {
        console.error("Error fetching loyalty rewards: ", error);
        toast({ title: "Error", description: "Tidak dapat mengambil daftar reward loyalitas.", variant: "destructive" });
      } finally {
        setLoadingLoyaltyRewards(false);
      }
    };
    fetchLoyaltyRewards();
  }, [toast]);

  const selectedTransaction = useMemo(() => {
    if (!selectedTransactionId) return null;
    return openTransactions.find(t => t.id === selectedTransactionId) || null;
  }, [openTransactions, selectedTransactionId]);

  useEffect(() => {
    const updateSelectedClientDetails = async () => {
      if (selectedTransaction?.clientId) {
        const client = availableClients.find(c => c.id === selectedTransaction.clientId);
        setSelectedClientDetails(client || null);
      } else {
        setSelectedClientDetails(null);
      }
    };
    updateSelectedClientDetails();
  }, [selectedTransaction, availableClients]);


  const handleSelectTransaction = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
  };

  const resetAddItemForm = () => {
    setSelectedCatalogItemId('');
    setSelectedVariantId(undefined);
    setItemQuantity(1);
    setSelectedItemCategoryTab("Semua");
    setSelectedStaffForNewItemToAdd(undefined);
  };

  const handleSelectGalleryItem = (item: ServiceProduct) => {
    setSelectedCatalogItemId(item.id);
    setSelectedVariantId(undefined);
    setSelectedStaffForNewItemToAdd(undefined);
  };

  const selectedGalleryItemDetails = useMemo(() => {
    return availableItems.find(item => item.id === selectedCatalogItemId);
  }, [availableItems, selectedCatalogItemId]);

  const selectedVariantDetails = useMemo(() => {
    if (!selectedGalleryItemDetails || !selectedVariantId) return null;
    return selectedGalleryItemDetails.variants?.find(v => v.id === selectedVariantId) || null;
  }, [selectedGalleryItemDetails, selectedVariantId]);


  const handleAddItemToTransaction = async () => {
    if (!selectedTransaction || !selectedCatalogItemId) {
      toast({ title: "Input Tidak Lengkap", description: "Pilih item dari galeri dan pastikan jumlah diisi.", variant: "destructive" });
      return;
    }

    const catalogItem = availableItems.find(item => item.id === selectedCatalogItemId);
    if (!catalogItem) {
      toast({ title: "Error", description: "Item katalog tidak ditemukan.", variant: "destructive" });
      return;
    }

    if (catalogItem.variants && catalogItem.variants.length > 0 && !selectedVariantId) {
      toast({ title: "Input Tidak Lengkap", description: "Pilih varian untuk item ini.", variant: "destructive" });
      return;
    }

    const quantity = parseInt(String(itemQuantity), 10);
    if (isNaN(quantity) || quantity <= 0) {
      toast({ title: "Input Tidak Valid", description: "Jumlah harus angka positif.", variant: "destructive" });
      return;
    }

    if (catalogItem.type === 'Layanan' && !selectedStaffForNewItemToAdd) {
      toast({ title: "Input Tidak Lengkap", description: "Pilih staf teknisi untuk layanan ini.", variant: "destructive" });
      return;
    }

    setIsSubmittingItem(true);
    let itemName = catalogItem.name;
    let itemPrice = catalogItem.price;
    let itemPoints = catalogItem.pointsAwarded || 0;

    if (selectedVariantId && catalogItem.variants) {
      const variant = catalogItem.variants.find(v => v.id === selectedVariantId);
      if (variant) {
        itemName = `${catalogItem.name} - ${variant.name}`;
        itemPrice = variant.price;
        itemPoints = variant.pointsAwarded || 0;
      } else {
        toast({ title: "Error", description: "Varian yang dipilih tidak ditemukan.", variant: "destructive" });
        setIsSubmittingItem(false);
        return;
      }
    }

    const mainTransactionItem: TransactionItem = {
      id: uuidv4(),
      catalogItemId: catalogItem.id,
      variantId: selectedVariantId,
      name: itemName,
      price: itemPrice,
      quantity: quantity,
      type: catalogItem.type === 'Layanan' ? 'service' : 'product',
      pointsAwardedPerUnit: itemPoints,
      ...(catalogItem.type === 'Layanan' && selectedStaffForNewItemToAdd && { staffName: selectedStaffForNewItemToAdd }),
    };

    let itemsToActuallyAdd: TransactionItem[] = [mainTransactionItem];
    let bonusStickerAddedMessage: string | null = null;

    if (catalogItem.id === TRIGGER_SERVICE_ID) {
      const stickerAlreadyInTransaction = selectedTransaction.items.some(it => it.catalogItemId === BONUS_STICKER_PRODUCT_ID);
      if (!stickerAlreadyInTransaction) {
        const stickerProduct = availableItems.find(item => item.id === BONUS_STICKER_PRODUCT_ID);
        if (stickerProduct) {
          const stickerTransactionItem: TransactionItem = {
            id: uuidv4(),
            catalogItemId: stickerProduct.id,
            name: stickerProduct.name,
            price: 0,
            quantity: 1,
            type: 'reward_merchandise',
            pointsAwardedPerUnit: 0,
          };
          itemsToActuallyAdd.push(stickerTransactionItem);
          bonusStickerAddedMessage = `${stickerProduct.name} berhasil ditambahkan sebagai bonus!`;
        } else {
          console.warn(`Produk bonus sticker dengan ID "${BONUS_STICKER_PRODUCT_ID}" tidak ditemukan di katalog.`);
          toast({ title: "Info", description: "Produk bonus sticker tidak ditemukan di katalog.", variant: "default" });
        }
      }
    }


    try {
      const transactionDocRef = doc(db, 'transactions', selectedTransaction.id);
      const currentItems = selectedTransaction.items || [];

      const updatedItemsForCalc = [...currentItems, ...itemsToActuallyAdd];

      const { subtotal: newSubtotal, total: newTotal } = calculateTransactionTotals(
        updatedItemsForCalc,
        selectedTransaction.discountAmount,
        selectedTransaction.discountPercentage,
        selectedTransaction.pointsRedeemedValue
      );

      await updateDoc(transactionDocRef, {
        items: arrayUnion(...itemsToActuallyAdd),
        subtotal: newSubtotal,
        total: newTotal,
        updatedAt: serverTimestamp(),
      });

      toast({ title: "Sukses", description: `${mainTransactionItem.name} berhasil ditambahkan.` });
      if (bonusStickerAddedMessage) {
        toast({ title: "Bonus!", description: bonusStickerAddedMessage });
      }
      setIsAddItemDialogOpen(false);
      resetAddItemForm();
    } catch (error) {
      console.error("Error adding item(s) to transaction: ", error);
      toast({ title: "Error", description: "Gagal menambahkan item.", variant: "destructive" });
    } finally {
      setIsSubmittingItem(false);
    }
  };

  const resetNewBillDialogState = () => {
    setNewBillType('walk-in');
    setSelectedClientIdForNewBill(undefined);
    setClientSearchTermForNewBill('');
  };

  const filteredAvailableClientsForNewBill = useMemo(() => {
    if (!clientSearchTermForNewBill) {
      return availableClients;
    }
    const lowercasedFilter = clientSearchTermForNewBill.toLowerCase();
    return availableClients.filter(client =>
      client.name.toLowerCase().includes(lowercasedFilter) ||
      (client.phone && client.phone.includes(clientSearchTermForNewBill))
    );
  }, [availableClients, clientSearchTermForNewBill]);

  const handleConfirmCreateBill = async () => {
    if (newBillType === 'existing-client' && !selectedClientIdForNewBill) {
      toast({ title: "Input Kurang", description: "Silakan pilih klien terdaftar.", variant: "destructive" });
      return;
    }

    setIsSubmittingNewBill(true);
    try {
      let customerNameForBill = "Pelanggan Walk-in #" + (openTransactions.filter(t => t.customerName.startsWith("Pelanggan Walk-in")).length + 1 + Math.floor(Math.random() * 100));
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
        pointsRedeemed: 0,
        pointsRedeemedValue: 0,
        total: 0,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      };

      const newTransactionData: Partial<Omit<Transaction, 'id'>> & { createdAt: any, updatedAt: any } = {
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


  const calculateTransactionTotals = (
    items: TransactionItem[],
    discountAmountParam: number = 0,
    discountPercentageParam: number = 0,
    pointsRedeemedValueParam: number = 0
  ) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let effectiveDiscountAmount = 0;

    if (pointsRedeemedValueParam > 0) {
      effectiveDiscountAmount = pointsRedeemedValueParam;
    } else if (discountAmountParam > 0) {
      effectiveDiscountAmount = discountAmountParam;
    } else if (discountPercentageParam > 0) {
      effectiveDiscountAmount = subtotal * (discountPercentageParam / 100);
    }

    const total = Math.max(0, subtotal - effectiveDiscountAmount);
    return { subtotal, total, discountAmountApplied: effectiveDiscountAmount };
  };

  const handleRemoveItemFromTransaction = async (itemIdToRemove: string) => {
    if (!selectedTransaction) return;

    setIsSubmittingItem(true);
    try {
      const transactionDocRef = doc(db, 'transactions', selectedTransaction.id);
      let updatedItemsArray = selectedTransaction.items.filter(item => item.id !== itemIdToRemove);
      let newRedeemedReward = selectedTransaction.redeemedReward;
      let newPointsRedeemed = selectedTransaction.pointsRedeemed;
      let newPointsRedeemedValue = selectedTransaction.pointsRedeemedValue;

      const removedItem = selectedTransaction.items.find(item => item.id === itemIdToRemove);
      if (removedItem?.type === 'reward_merchandise' && newRedeemedReward && newRedeemedReward.name === removedItem.name) {
        newRedeemedReward = undefined;
        newPointsRedeemed = 0;
        newPointsRedeemedValue = 0;
      }

      const { subtotal, total, discountAmountApplied } = calculateTransactionTotals(
        updatedItemsArray,
        newRedeemedReward && newRedeemedReward.type === 'discount_transaction' ? 0 : selectedTransaction.discountAmount,
        newRedeemedReward && newRedeemedReward.type === 'discount_transaction' ? 0 : selectedTransaction.discountPercentage,
        newPointsRedeemedValue
      );

      await updateDoc(transactionDocRef, {
        items: updatedItemsArray,
        subtotal: subtotal,
        total: total,
        discountAmount: discountAmountApplied,
        redeemedReward: newRedeemedReward === undefined ? firestoreDeleteField() : newRedeemedReward,
        pointsRedeemed: newPointsRedeemed === 0 ? firestoreDeleteField() : newPointsRedeemed,
        pointsRedeemedValue: newPointsRedeemedValue === 0 ? firestoreDeleteField() : newPointsRedeemedValue,
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
    if (!selectedTransaction) return;

    if (selectedTransaction.redeemedReward) {
      toast({ title: "Info Diskon", description: "Reward sedang aktif. Hapus reward untuk menerapkan diskon manual.", variant: "default" });
      return;
    }

    const newDiscountAmount = parseFloat(newDiscountAmountInput) || 0;
    const newDiscountPercentage = parseFloat(newDiscountPercentageInput) || 0;

    let appliedDiscountAmount = 0;
    let appliedDiscountPercentage = 0;

    if (newDiscountAmount > 0) {
      appliedDiscountAmount = newDiscountAmount;
    } else if (newDiscountPercentage > 0) {
      appliedDiscountPercentage = newDiscountPercentage;
    }

    const { total, discountAmountApplied } = calculateTransactionTotals(items, appliedDiscountAmount, appliedDiscountPercentage, 0);

    try {
      const transactionDocRef = doc(db, 'transactions', transactionId);
      await updateDoc(transactionDocRef, {
        discountAmount: appliedDiscountAmount > 0 ? appliedDiscountAmount : (appliedDiscountPercentage > 0 ? discountAmountApplied : 0),
        discountPercentage: appliedDiscountPercentage,
        total: total,
        pointsRedeemed: firestoreDeleteField(),
        pointsRedeemedValue: firestoreDeleteField(),
        redeemedReward: firestoreDeleteField(),
        updatedAt: serverTimestamp()
      });
      toast({ title: "Diskon Diperbarui", description: "Diskon manual berhasil diterapkan.", variant: "default" });
    } catch (error) {
      console.error("Error updating discount:", error);
      toast({ title: "Error Diskon", description: "Gagal menyimpan perubahan diskon.", variant: "destructive" });
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

  const handleOpenRedeemPointsDialog = () => {
    if (selectedClientDetails && selectedTransaction && (selectedClientDetails.loyaltyPoints || 0) >= minPointsToRedeemConfig) {
      const affordableRewards = availableLoyaltyRewards.filter(reward =>
        reward.isActive && (selectedClientDetails.loyaltyPoints || 0) >= reward.pointsRequired
      );
      setAvailableRewardsForClient(affordableRewards);
      setSelectedRewardToRedeem(null);
      setIsRedeemPointsDialogOpen(true);
    } else {
      toast({ title: "Info", description: `Klien tidak memenuhi syarat (poin < ${minPointsToRedeemConfig}) atau tidak ada reward yang aktif/terjangkau.`, variant: "default" });
    }
  };

  const handleRedeemReward = async () => {
    if (!selectedTransaction || !selectedClientDetails || !selectedRewardToRedeem) return;

    if ((selectedClientDetails.loyaltyPoints || 0) < selectedRewardToRedeem.pointsRequired) {
      toast({ title: "Poin Tidak Cukup", description: "Poin klien tidak cukup untuk menukarkan reward ini.", variant: "destructive" });
      return;
    }

    setIsSubmittingRedemption(true);
    const transactionDocRef = doc(db, 'transactions', selectedTransaction.id);
    let updatedItems = [...selectedTransaction.items];
    let discountValueFromReward = 0;

    const rewardDetailsToStore = {
      id: selectedRewardToRedeem.id,
      name: selectedRewardToRedeem.name,
      type: selectedRewardToRedeem.type,
      value: selectedRewardToRedeem.rewardValue,
    };

    if (selectedRewardToRedeem.type === 'merchandise') {
      const merchandiseItem: TransactionItem = {
        id: uuidv4(),
        catalogItemId: `reward_${selectedRewardToRedeem.id}`,
        name: selectedRewardToRedeem.rewardValue as string,
        price: 0,
        quantity: 1,
        type: 'reward_merchandise',
        pointsAwardedPerUnit: 0,
      };
      updatedItems.push(merchandiseItem);
    } else if (selectedRewardToRedeem.type === 'discount_transaction') {
      discountValueFromReward = selectedRewardToRedeem.rewardValue as number;
    }

    const { subtotal, total } = calculateTransactionTotals(
      updatedItems,
      0,
      0,
      discountValueFromReward
    );

    try {
      await updateDoc(transactionDocRef, {
        items: updatedItems,
        pointsRedeemed: selectedRewardToRedeem.pointsRequired,
        pointsRedeemedValue: discountValueFromReward,
        discountAmount: discountValueFromReward,
        discountPercentage: 0,
        redeemedReward: rewardDetailsToStore,
        total: total,
        subtotal: subtotal,
        notes: `${selectedTransaction.notes || ''} [Tukar ${selectedRewardToRedeem.pointsRequired} poin: ${selectedRewardToRedeem.name}]`.trim(),
        updatedAt: serverTimestamp(),
      });
      toast({ title: "Sukses", description: `Reward "${selectedRewardToRedeem.name}" berhasil diterapkan.` });
      setIsRedeemPointsDialogOpen(false);
    } catch (error) {
      console.error("Error applying reward: ", error);
      toast({ title: "Error", description: "Gagal menerapkan reward.", variant: "destructive" });
    } finally {
      setIsSubmittingRedemption(false);
    }
  };


  const handleConfirmPayment = async () => {
    if (!selectedTransaction) {
      toast({ title: "Error", description: "Tidak ada transaksi yang dipilih.", variant: "destructive" });
      return;
    }
    if (!selectedPaymentMethod) {
      toast({ title: "Input Kurang", description: "Silakan pilih metode pembayaran.", variant: "destructive" });
      return;
    }

    setIsProcessingPayment(true);
    try {
      const transactionDocRef = doc(db, 'transactions', selectedTransaction.id);

      let pointsEarnedThisTransaction = 0;

      if (selectedTransaction.clientId && (!selectedTransaction.pointsRedeemed || selectedTransaction.pointsRedeemed === 0)) {
        pointsEarnedThisTransaction = selectedTransaction.items.reduce((sum, item) => {
          if (item.type === 'reward_merchandise') return sum;
          const awardedPoints = (typeof item.pointsAwardedPerUnit === 'number' && !isNaN(item.pointsAwardedPerUnit)) ? item.pointsAwardedPerUnit : 0;
          const qty = (typeof item.quantity === 'number' && !isNaN(item.quantity) && item.quantity > 0) ? item.quantity : 1;
          return sum + (awardedPoints * qty);
        }, 0);
      }

      if (selectedTransaction.clientId) {
        const clientDocRef = doc(db, 'clients', selectedTransaction.clientId);
        const clientDocSnap = await getDoc(clientDocRef);

        if (clientDocSnap.exists()) {
          const clientData = clientDocSnap.data() as Client;
          let currentLoyaltyPoints = (typeof clientData.loyaltyPoints === 'number' && !isNaN(clientData.loyaltyPoints)) ? clientData.loyaltyPoints : 0;

          const pointsRedeemedThisTransaction = (typeof selectedTransaction.pointsRedeemed === 'number' && !isNaN(selectedTransaction.pointsRedeemed)) ? selectedTransaction.pointsRedeemed : 0;
          let newLoyaltyPoints = currentLoyaltyPoints;
          const clientUpdateMessageParts: string[] = [];

          if (pointsRedeemedThisTransaction > 0) {
            newLoyaltyPoints -= pointsRedeemedThisTransaction;
            clientUpdateMessageParts.push(`${pointsRedeemedThisTransaction} poin ditukar`);
          } else {
            newLoyaltyPoints += pointsEarnedThisTransaction;
            if (pointsEarnedThisTransaction > 0) {
              clientUpdateMessageParts.push(`${pointsEarnedThisTransaction} poin baru diperoleh`);
            }
          }

          const today = new Date().toLocaleDateString('en-CA');

          await updateDoc(clientDocRef, {
            loyaltyPoints: Math.max(0, newLoyaltyPoints),
            lastVisit: today,
          });

          let clientUpdateMessage = `Kunjungan terakhir untuk ${clientData.name} telah diperbarui.`;
          if (clientUpdateMessageParts.length > 0) {
            clientUpdateMessage += ` ${clientUpdateMessageParts.join(', ')}.`;
          } else if (pointsRedeemedThisTransaction === 0 && pointsEarnedThisTransaction === 0) {
            clientUpdateMessage += ` (Tidak ada perubahan poin pada transaksi ini).`;
          }
          toast({ title: "Info Klien Diperbarui", description: clientUpdateMessage.trim() });
        }
      }

      const finalTransactionData: Transaction = {
        ...selectedTransaction,
        paymentMethod: selectedPaymentMethod,
        pointsEarnedInThisTx: pointsEarnedThisTransaction,
      };

      await updateDoc(transactionDocRef, {
        status: 'paid',
        paymentMethod: selectedPaymentMethod,
        notes: paymentNotes || selectedTransaction.notes || '',
        paidAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        pointsEarnedInThisTx: pointsEarnedThisTransaction,
      });
      toast({ title: "Pembayaran Sukses", description: `Transaksi untuk ${selectedTransaction.customerName} berhasil dibayar.` });

      setLastPaidTransactionDetails(finalTransactionData);
      setWhatsAppNumberInput(selectedClientDetails?.phone || '');
      setIsWhatsAppDialogOpen(true);

      setIsPaymentDialogOpen(false);
      setSelectedTransactionId(null);
      setSelectedClientDetails(null);

    } catch (error) {
      console.error("Error processing payment or updating client: ", error);
      toast({ title: "Error Pembayaran/Klien", description: "Gagal memproses pembayaran atau memperbarui data klien.", variant: "destructive" });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const generateWhatsAppReceiptText = (transaction: Transaction): string => {
    let text = `*Struk Digital - ${SHOP_NAME}*\n\n`;
    text += `ID Transaksi: ${transaction.id.substring(0, 8)}...\n`;
    text += `Pelanggan: ${transaction.customerName}\n`;
    if (transaction.paidAt && transaction.paidAt.toDate) {
      text += `Tanggal: ${transaction.paidAt.toDate().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}\n\n`;
    } else {
      text += `Tanggal: ${new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}\n\n`;
    }

    text += `Item:\n`;
    transaction.items.forEach(item => {
      text += `- ${item.name} (${item.quantity} x Rp ${item.price.toLocaleString('id-ID')})`;
      if (item.staffName) text += ` (Oleh: ${item.staffName})`;
      if (item.type === 'reward_merchandise') text += ` (REWARD)`;
      text += ` = Rp ${(item.quantity * item.price).toLocaleString('id-ID')}\n`;
    });
    text += `\nSubtotal: Rp ${transaction.subtotal.toLocaleString('id-ID')}\n`;

    if (transaction.redeemedReward && transaction.redeemedReward.type === 'discount_transaction' && transaction.pointsRedeemedValue && transaction.pointsRedeemedValue > 0) {
      text += `Diskon Reward (${transaction.redeemedReward.name}): - Rp ${transaction.pointsRedeemedValue.toLocaleString('id-ID')}\n`;
    } else if (transaction.discountAmount > 0 && (!transaction.redeemedReward || transaction.redeemedReward.type !== 'discount_transaction')) {
      text += `Diskon Manual: - Rp ${transaction.discountAmount.toLocaleString('id-ID')}\n`;
    }

    text += `*Total: Rp ${transaction.total.toLocaleString('id-ID')}*\n`;
    text += `Metode Bayar: ${transaction.paymentMethod || 'N/A'}\n`;

    if (transaction.pointsRedeemed && transaction.pointsRedeemed > 0 && transaction.redeemedReward) {
      text += `Reward Ditukar: ${transaction.redeemedReward.name} (${transaction.pointsRedeemed.toLocaleString('id-ID')} poin)\n`;
      text += `(Tidak ada poin baru diperoleh pada transaksi ini karena penukaran reward.)\n`;
    } else if (transaction.pointsEarnedInThisTx && transaction.pointsEarnedInThisTx > 0) {
      text += `Poin Baru Diperoleh: ${transaction.pointsEarnedInThisTx.toLocaleString('id-ID')} poin\n`;
    }

    const feedbackBaseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;
    let feedbackUrl = `[APP_BASE_URL_BELUM_DISET_DI_.ENV]/public/feedback/${transaction.id}`;

    if (feedbackBaseUrl && feedbackBaseUrl.trim() !== '') {
      const normalizedBaseUrl = feedbackBaseUrl.endsWith('/') ? feedbackBaseUrl.slice(0, -1) : feedbackBaseUrl;
      feedbackUrl = `${normalizedBaseUrl}/public/feedback/${transaction.id}`;
    } else {
      console.warn("NEXT_PUBLIC_APP_BASE_URL is not set. Feedback link will be a placeholder.");
    }

    text += `\nKami sangat menghargai masukan Anda! Isi survei singkat di: ${feedbackUrl}`;
    text += `\n\nTerima kasih atas kunjungan Anda!`;
    return text;
  }

  const formatWhatsAppNumber = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.substring(1);
    } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13) {
      cleaned = '62' + cleaned;
    } else if (!cleaned.startsWith('62')) {
      cleaned = '62' + cleaned;
    }
    return cleaned;
  };

  const handleSendWhatsAppReceipt = async () => {
    if (!lastPaidTransactionDetails || !whatsAppNumberInput) {
      toast({ title: "Error", description: "Detail transaksi atau nomor WhatsApp tidak valid.", variant: "destructive" });
      return;
    }
    const formattedNumber = formatWhatsAppNumber(whatsAppNumberInput);
    if (!/^\d+$/.test(formattedNumber) || formattedNumber.length < 10) {
      toast({ title: "Nomor Tidak Valid", description: "Format nomor WhatsApp tidak benar.", variant: "destructive" });
      return;
    }

    const receiptText = generateWhatsAppReceiptText(lastPaidTransactionDetails);
    setIsSendingWhatsAppReceipt(true);

    try {
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: formattedNumber, message: receiptText }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Struk Terkirim via API",
          description: `Struk digital sedang dikirim ke ${formattedNumber}. ID Pesan: ${result.messageId || 'N/A'}`,
        });
      } else {
        throw new Error(result.error || 'Gagal mengirim struk via API server.');
      }
    } catch (error) {
      console.error("Error sending WhatsApp receipt via API:", error);
      toast({
        title: "Gagal Mengirim Struk",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim struk.",
        variant: "destructive",
      });
    } finally {
      setIsSendingWhatsAppReceipt(false);
      setIsWhatsAppDialogOpen(false);
      setLastPaidTransactionDetails(null);
    }
  };

  const handleDeleteOpenTransaction = async () => {
    if (!transactionToDelete) return;
    setIsDeletingTransaction(true);
    try {
      await deleteDoc(doc(db, 'transactions', transactionToDelete.id));
      toast({
        title: "Sukses",
        description: `Transaksi untuk "${transactionToDelete.customerName}" berhasil dihapus.`,
      });
      if (selectedTransactionId === transactionToDelete.id) {
        setSelectedTransactionId(null);
        setSelectedClientDetails(null);
      }
      setTransactionToDelete(null);
    } catch (error) {
      console.error("Error deleting transaction: ", error);
      toast({
        title: "Error",
        description: "Gagal menghapus transaksi.",
        variant: "destructive",
      });
    } finally {
      setIsDeletingTransaction(false);
    }
  };

  const handleClearReward = async () => {
    if (!selectedTransaction || !selectedTransaction.redeemedReward) return;

    setIsSubmittingRedemption(true);
    try {
      const transactionDocRef = doc(db, 'transactions', selectedTransaction.id);
      let updatedItemsArray = selectedTransaction.items.filter(item => item.type !== 'reward_merchandise');

      const { subtotal, total } = calculateTransactionTotals(
        updatedItemsArray,
        0,
        0,
        0
      );

      await updateDoc(transactionDocRef, {
        items: updatedItemsArray,
        subtotal: subtotal,
        total: total,
        discountAmount: 0,
        discountPercentage: 0,
        pointsRedeemed: firestoreDeleteField(),
        pointsRedeemedValue: firestoreDeleteField(),
        redeemedReward: firestoreDeleteField(),
        notes: selectedTransaction.notes?.replace(/\[Tukar.*?poin.*?\]/g, '').trim() || '',
        updatedAt: serverTimestamp(),
      });
      toast({ title: "Reward Dihapus", description: "Reward telah dihapus dari transaksi." });
    } catch (error) {
      console.error("Error clearing reward:", error);
      toast({ title: "Error", description: "Gagal menghapus reward.", variant: "destructive" });
    } finally {
      setIsSubmittingRedemption(false);
    }
  };

  if (loadingTransactions || loadingCatalogItems || loadingClients || loadingAssignableStaff || loadingLoyaltyRewards) {
    return (
      <div className="flex flex-col h-full">
        <AppHeader title="Penjualan" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Memuat data...</p>
        </div>
      </div>
    );
  }

  const isAddItemButtonDisabled = isSubmittingItem || !selectedCatalogItemId || loadingCatalogItems ||
    (selectedGalleryItemDetails?.type === 'Layanan' && loadingAssignableStaff) ||
    (selectedGalleryItemDetails?.variants && selectedGalleryItemDetails.variants.length > 0 && !selectedVariantId);

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Penjualan" />
      <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <AlertDialog open={!!transactionToDelete} onOpenChange={(open) => !open && setTransactionToDelete(null)}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <CardTitle className="text-lg flex-grow mr-4">Transaksi Terbuka</CardTitle>
                <Button
                  onClick={() => { resetNewBillDialogState(); setIsCreateBillDialogOpen(true); }}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0"
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
                      <div key={trans.id} className="flex items-center gap-2">
                        <Button
                          variant={selectedTransactionId === trans.id ? "secondary" : "outline"}
                          className="w-full justify-start h-auto py-3 flex-grow"
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
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive flex-shrink-0"
                            onClick={() => setTransactionToDelete(trans)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin menghapus transaksi untuk "{transactionToDelete?.customerName}"? Transaksi ini berstatus 'terbuka' dan akan dihapus permanen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setTransactionToDelete(null)} disabled={isDeletingTransaction}>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteOpenTransaction}
                  disabled={isDeletingTransaction}
                  className={buttonVariants({ variant: "destructive" })}
                >
                  {isDeletingTransaction ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Hapus Transaksi
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {selectedTransaction ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Detail Pesanan: {selectedTransaction.customerName}</CardTitle>
                      <CardDescription>
                        Transaksi ID: {selectedTransaction.id} | Staf Layanan Utama: {selectedTransaction.serviceStaffName || "Belum Ditugaskan"}
                      </CardDescription>
                      {selectedClientDetails && (
                        <div className="mt-1 text-sm text-primary flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          Poin Klien: {(selectedClientDetails.loyaltyPoints || 0).toLocaleString('id-ID')}
                        </div>
                      )}
                    </div>
                    {selectedClientDetails && (selectedClientDetails.loyaltyPoints || 0) >= minPointsToRedeemConfig && !selectedTransaction.redeemedReward && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={handleOpenRedeemPointsDialog}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={loadingLoyaltyRewards}
                      >
                        {loadingLoyaltyRewards ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Tags className="mr-2 h-4 w-4" />} Tukar Reward
                      </Button>
                    )}
                    {selectedTransaction.redeemedReward && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={handleClearReward}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Hapus Reward Aktif
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-2">
                    <Button
                      size="sm"
                      onClick={() => { resetAddItemForm(); setIsAddItemDialogOpen(true); }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Tambah Item
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
                            {item.staffName && <span className="text-xs text-muted-foreground block">Oleh: {item.staffName}</span>}
                            {item.type === 'reward_merchandise' && <Badge variant="secondary" className="ml-2 text-xs">REWARD</Badge>}
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
                              disabled={isSubmittingItem || (item.type === 'reward_merchandise' && selectedTransaction.redeemedReward?.name === item.name)}
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
                    <span>Subtotal ({selectedTransaction.items.reduce((acc, item) => acc + item.quantity, 0)} item)</span>
                    <span>Rp {selectedTransaction.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  {selectedTransaction.redeemedReward && selectedTransaction.redeemedReward.type === 'discount_transaction' && selectedTransaction.pointsRedeemedValue ? (
                    <div className="flex justify-between text-green-600">
                      <span>Diskon dari Reward: {selectedTransaction.redeemedReward.name}</span>
                      <span>- Rp {(selectedTransaction.pointsRedeemedValue).toLocaleString('id-ID')}</span>
                    </div>
                  ) : selectedTransaction.redeemedReward && selectedTransaction.redeemedReward.type === 'merchandise' ? (
                    <div className="flex justify-between text-green-600">
                      <span>Reward Merchandise: {selectedTransaction.redeemedReward.name}</span>
                      <span>(Termasuk)</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span>Diskon Manual</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Rp"
                          className="w-24 h-8 text-right"
                          defaultValue={selectedTransaction.discountPercentage > 0 ? '' : (selectedTransaction.discountAmount || "")}
                          onBlur={(e) => {
                            handleDiscountChange(selectedTransaction.id, selectedTransaction.items, e.target.value, '0');
                          }}
                          disabled={selectedTransaction.discountPercentage > 0 || !!selectedTransaction.redeemedReward}
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
                          disabled={selectedTransaction.discountAmount > 0 || !!selectedTransaction.redeemedReward}
                        />
                      </div>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>Rp {selectedTransaction.total.toLocaleString('id-ID')}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-2">
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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


      <Dialog open={isCreateBillDialogOpen} onOpenChange={(isOpen) => {
        setIsCreateBillDialogOpen(isOpen);
        if (!isOpen) resetNewBillDialogState();
      }}>
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
                <div className="relative mt-2 mb-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari klien (nama/HP)..."
                    className="pl-8 w-full h-9"
                    value={clientSearchTermForNewBill}
                    onChange={(e) => setClientSearchTermForNewBill(e.target.value)}
                  />
                </div>
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
                    {loadingClients ? (
                      <SelectItem value="loading" disabled>Memuat...</SelectItem>
                    ) : filteredAvailableClientsForNewBill.length === 0 ? (
                      <SelectItem value="no-clients" disabled>
                        {clientSearchTermForNewBill ? "Tidak ada klien cocok." : "Tidak ada klien terdaftar."}
                      </SelectItem>
                    ) : (
                      filteredAvailableClientsForNewBill.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name} ({client.phone})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsCreateBillDialogOpen(false); resetNewBillDialogState(); }} disabled={isSubmittingNewBill}>Batal</Button>
            <Button
              onClick={handleConfirmCreateBill}
              disabled={isSubmittingNewBill || (newBillType === 'existing-client' && !selectedClientIdForNewBill && !loadingClients)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmittingNewBill ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
              Buat Transaksi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>



      {selectedTransaction && (
        <Dialog open={isAddItemDialogOpen} onOpenChange={(isOpen) => {
          setIsAddItemDialogOpen(isOpen);
          if (!isOpen) resetAddItemForm();
        }}>
          <DialogContent className="sm:max-w-2xl md:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Tambah Item ke Transaksi</DialogTitle>
              <DialogDescription>Untuk {selectedTransaction.customerName}. Pilih item dari galeri di bawah.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2 pb-4">
              {loadingCatalogItems ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2">Memuat item...</p>
                </div>
              ) : availableItems.length === 0 ? (
                <p className="text-center text-muted-foreground">Tidak ada item di katalog.</p>
              ) : (
                <Tabs value={selectedItemCategoryTab} onValueChange={handleCategoryTabChange}>
                  <TabsList className="mb-4">
                    {itemCategories.map(category => (
                      <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                    ))}
                  </TabsList>
                  <ScrollArea className="h-72 pr-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredGalleryItems.map(item => (
                        <Card
                          key={item.id}
                          onClick={() => handleSelectGalleryItem(item)}
                          className={cn(
                            "cursor-pointer hover:shadow-lg transition-shadow duration-150 flex flex-col",
                            selectedCatalogItemId === item.id && "ring-2 ring-primary shadow-lg"
                          )}
                        >
                          <CardHeader className="p-3 flex-grow">
                            <CardTitle className="text-sm md:text-base line-clamp-2">{item.name}</CardTitle>
                            <CardDescription className="text-xs md:text-sm">Rp {item.price.toLocaleString('id-ID')}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-3 pt-0 text-xs">
                            <Badge
                              variant={item.type === 'Layanan' ? 'default' : 'secondary'}
                              className="mb-1 capitalize text-xs px-1.5 py-0.5 h-auto"
                            >
                              {item.type}
                            </Badge>
                            {item.pointsAwarded && item.pointsAwarded > 0 && (
                              <div className="flex items-center text-muted-foreground">
                                <Gift className="mr-1 h-3 w-3 text-yellow-500" /> {item.pointsAwarded} pts
                              </div>
                            )}
                            {item.variants && item.variants.length > 0 && (
                              <div className="flex items-center text-muted-foreground mt-1">
                                <PackageSearch className="mr-1 h-3 w-3 text-blue-500" /> {item.variants.length} varian
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                      {filteredGalleryItems.length === 0 && selectedItemCategoryTab !== "Semua" && (
                        <p className="col-span-full text-center text-muted-foreground py-4">
                          Tidak ada item dalam kategori "{selectedItemCategoryTab}".
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </Tabs>
              )}

              {selectedCatalogItemId && selectedGalleryItemDetails && (
                <div className="mt-4 p-3 border rounded-md bg-muted/30 space-y-2">
                  <p className="font-medium text-sm">Item Terpilih: {selectedGalleryItemDetails.name}</p>
                  <p className="text-xs text-muted-foreground">Harga Dasar: Rp {selectedGalleryItemDetails.price.toLocaleString('id-ID')}</p>
                  {selectedGalleryItemDetails.variants && selectedGalleryItemDetails.variants.length > 0 && (
                    <div className="space-y-1">
                      <Label htmlFor="item-variant-select">Pilih Varian</Label>
                      <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
                        <SelectTrigger id="item-variant-select">
                          <SelectValue placeholder="Pilih varian produk/layanan" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedGalleryItemDetails.variants.map(variant => (
                            <SelectItem key={variant.id} value={variant.id}>
                              {variant.name} (Rp {variant.price.toLocaleString('id-ID')})
                              {variant.pointsAwarded ? ` - ${variant.pointsAwarded} Pts` : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="item-quantity">Jumlah</Label>
                  <Input
                    id="item-quantity"
                    type="number"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                    placeholder="1"
                    min="1"
                    disabled={!selectedCatalogItemId || loadingCatalogItems}
                    className="w-full"
                  />
                </div>
                {selectedGalleryItemDetails?.type === 'Layanan' && (
                  <div className="space-y-2">
                    <Label htmlFor="staff-assign-select" className="flex items-center">
                      <UserCog className="mr-2 h-4 w-4 text-muted-foreground" />Staf Pelaksana
                    </Label>
                    <Select
                      value={selectedStaffForNewItemToAdd}
                      onValueChange={setSelectedStaffForNewItemToAdd}
                      disabled={loadingAssignableStaff || !selectedCatalogItemId}
                    >
                      <SelectTrigger id="staff-assign-select" className="w-full">
                        <SelectValue placeholder={loadingAssignableStaff ? "Memuat staf..." : "Pilih staf"} />
                      </SelectTrigger>
                      <SelectContent>
                        {!loadingAssignableStaff && assignableStaffList.length === 0 && (
                          <SelectItem value="no-staff" disabled>Tidak ada teknisi tersedia.</SelectItem>
                        )}
                        {assignableStaffList.map(staff => (
                          <SelectItem key={staff.id} value={staff.name}>
                            {staff.name} ({staff.role})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsAddItemDialogOpen(false); resetAddItemForm(); }} disabled={isSubmittingItem}>Batal</Button>
              <Button
                onClick={handleAddItemToTransaction}
                disabled={isAddItemButtonDisabled}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmittingItem && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Tambah Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}


      {selectedTransaction && selectedClientDetails && (
        <Dialog open={isRedeemPointsDialogOpen} onOpenChange={(isOpen) => {
          setIsRedeemPointsDialogOpen(isOpen);
          if (!isOpen) setSelectedRewardToRedeem(null);
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tukar Reward Loyalitas</DialogTitle>
              <DialogDescription>
                Klien: {selectedClientDetails.name} | Poin Tersedia: {(selectedClientDetails.loyaltyPoints || 0).toLocaleString('id-ID')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2 pb-4">
              {loadingLoyaltyRewards ? (
                <div className="flex items-center justify-center"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Memuat daftar reward...</div>
              ) : availableRewardsForClient.length === 0 ? (
                <p className="text-center text-muted-foreground">Tidak ada reward yang bisa ditukarkan dengan poin Anda saat ini.</p>
              ) : (
                <RadioGroup
                  value={selectedRewardToRedeem?.id}
                  onValueChange={(value) => {
                    const reward = availableRewardsForClient.find(r => r.id === value);
                    setSelectedRewardToRedeem(reward || null);
                  }}
                >
                  <Label className="mb-2 block">Pilih Reward:</Label>
                  {availableRewardsForClient.map((reward) => (
                    <div key={reward.id} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 cursor-pointer has-[input:checked]:bg-accent/20 has-[input:checked]:border-accent">
                      <RadioGroupItem value={reward.id} id={`reward-${reward.id}`} className="mt-1" />
                      <Label htmlFor={`reward-${reward.id}`} className="font-normal w-full cursor-pointer">
                        <div className="font-medium">{reward.name} ({reward.pointsRequired} Poin)</div>
                        <p className="text-xs text-muted-foreground">
                          {reward.type === 'merchandise' ? `Dapatkan: ${reward.rewardValue}` :
                            reward.type === 'discount_transaction' ? `Diskon: Rp ${(reward.rewardValue as number).toLocaleString('id-ID')}` :
                              reward.description}
                        </p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRedeemPointsDialogOpen(false)} disabled={isSubmittingRedemption}>Batal</Button>
              <Button
                onClick={handleRedeemReward}
                disabled={isSubmittingRedemption || !selectedRewardToRedeem || availableRewardsForClient.length === 0 || loadingLoyaltyRewards}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmittingRedemption && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Tukarkan Reward
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}



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
              <Button
                onClick={handleConfirmPayment}
                disabled={isProcessingPayment || !selectedPaymentMethod}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isProcessingPayment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Konfirmasi Pembayaran
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}


      <Dialog open={isWhatsAppDialogOpen} onOpenChange={(isOpen) => {
        setIsWhatsAppDialogOpen(isOpen);
        if (!isOpen) setLastPaidTransactionDetails(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <MessageSquareText className="mr-2 h-5 w-5 text-green-500" /> Kirim Struk via WhatsApp
            </DialogTitle>
            <DialogDescription>
              Masukkan nomor WhatsApp pelanggan untuk mengirim struk digital.
              {lastPaidTransactionDetails && ` (Transaksi: ${lastPaidTransactionDetails.customerName})`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-number-input">Nomor WhatsApp</Label>
              <Input
                id="whatsapp-number-input"
                placeholder="mis. 6281234567890 atau 081234567890"
                value={whatsAppNumberInput}
                onChange={(e) => setWhatsAppNumberInput(e.target.value)}
                type="tel"
                disabled={isSendingWhatsAppReceipt}
              />
              <p className="text-xs text-muted-foreground">
                Akan diformat ke standar internasional (mis. 62xxxx).
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsWhatsAppDialogOpen(false); setLastPaidTransactionDetails(null); }} disabled={isSendingWhatsAppReceipt}>
              Lewati
            </Button>
            <Button
              onClick={handleSendWhatsAppReceipt}
              disabled={!whatsAppNumberInput || !lastPaidTransactionDetails || isSendingWhatsAppReceipt}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSendingWhatsAppReceipt ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Kirim Struk
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}