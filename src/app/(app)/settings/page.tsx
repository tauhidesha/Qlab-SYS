
"use client"; 

import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Bell, Users, CreditCard as CreditCardIcon, Gift, DollarSign, Loader2, Wallet, Award, PlusCircle, Edit3, Trash2, SlidersHorizontal, Settings2, Zap } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, collection, addDoc, updateDoc, deleteDoc, query, orderBy, getDocs as getFirestoreDocs, where } from 'firebase/firestore'; 
import { useToast } from '@/hooks/use-toast';
import type { LoyaltyReward } from '@/types/loyalty';
import type { DirectReward, DirectRewardFormData } from '@/types/directReward';
import type { ServiceProduct } from '@/app/(app)/services/page';
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const loyaltyRewardFormSchema = z.object({
  name: z.string().min(3, "Nama reward minimal 3 karakter").max(100, "Nama reward maksimal 100 karakter"),
  description: z.string().max(250, "Deskripsi maksimal 250 karakter").optional(),
  pointsRequired: z.preprocess(
    (val) => parseInt(String(val), 10),
    z.number({ required_error: "Poin diperlukan"}).int().positive("Poin harus angka positif")
  ),
  type: z.enum(['merchandise', 'discount_transaction'], { required_error: "Tipe reward diperlukan" }),
  rewardValue: z.union([
    z.string().min(1, "Nilai reward (merch) diperlukan"), 
    z.preprocess( 
      (val) => parseFloat(String(val)),
      z.number({ required_error: "Nilai reward (diskon) diperlukan"}).positive("Nilai diskon harus positif")
    )
  ]),
  isActive: z.boolean().default(true),
}).refine(data => {
  if (data.type === 'merchandise' && typeof data.rewardValue !== 'string') {
    return false;
  }
  if (data.type === 'discount_transaction' && typeof data.rewardValue !== 'number') {
    return false;
  }
  return true;
}, {
  message: "Nilai reward tidak sesuai dengan tipe reward.",
  path: ["rewardValue"],
});

type LoyaltyRewardFormValues = z.infer<typeof loyaltyRewardFormSchema>;

const directRewardFormSchema = z.object({
  triggerServiceId: z.string().min(1, "Layanan pemicu harus dipilih"),
  rewardProductId: z.string().min(1, "Produk reward harus dipilih"),
  description: z.string().max(200, "Deskripsi maksimal 200 karakter").optional(),
  isActive: z.boolean().default(true),
});

type DirectRewardFormValues = z.infer<typeof directRewardFormSchema>;


export default function SettingsPage() {
  const { toast } = useToast();
  const [workshopName, setWorkshopName] = useState('QLAB Auto Detailing');
  const [workshopAddress, setWorkshopAddress] = useState('Jl. Sudirman No. 123, Jakarta');
  const [workshopPhone, setWorkshopPhone] = useState('+62 21 555 0123');
  const [isLoadingGeneralSettings, setIsLoadingGeneralSettings] = useState(true);
  const [isSavingGeneralSettings, setIsSavingGeneralSettings] = useState(false);

  const [minPointsToRedeemGeneral, setMinPointsToRedeemGeneral] = React.useState('');
  const [initialBankBalance, setInitialBankBalance] = React.useState('');
  const [initialPhysicalCashBalance, setInitialPhysicalCashBalance] = React.useState('');
  const [isLoadingFinancialSettings, setIsLoadingFinancialSettings] = useState(true);
  const [isSavingFinancialSettings, setIsSavingFinancialSettings] = useState(false);

  const [loyaltyRewards, setLoyaltyRewards] = useState<LoyaltyReward[]>([]);
  const [isLoadingRewards, setIsLoadingRewards] = useState(true);
  const [isRewardFormDialogOpen, setIsRewardFormDialogOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<LoyaltyReward | null>(null);
  const [rewardToDelete, setRewardToDelete] = useState<LoyaltyReward | null>(null);
  const [isSubmittingReward, setIsSubmittingReward] = useState(false);

  const [directRewards, setDirectRewards] = useState<DirectReward[]>([]);
  const [isLoadingDirectRewards, setIsLoadingDirectRewards] = useState(true);
  const [isDirectRewardFormDialogOpen, setIsDirectRewardFormDialogOpen] = useState(false);
  const [editingDirectReward, setEditingDirectReward] = useState<DirectReward | null>(null);
  const [directRewardToDelete, setDirectRewardToDelete] = useState<DirectReward | null>(null);
  const [isSubmittingDirectReward, setIsSubmittingDirectReward] = useState(false);

  const [availableServicesForDropdown, setAvailableServicesForDropdown] = useState<ServiceProduct[]>([]);
  const [availableProductsForDropdown, setAvailableProductsForDropdown] = useState<ServiceProduct[]>([]);
  const [isLoadingServicesForDropdown, setIsLoadingServicesForDropdown] = useState(true);


  const rewardForm = useForm<LoyaltyRewardFormValues>({
    resolver: zodResolver(loyaltyRewardFormSchema),
    defaultValues: {
      name: '',
      description: '',
      pointsRequired: 0,
      type: undefined,
      rewardValue: '',
      isActive: true,
    },
  });
  const watchedRewardType = rewardForm.watch('type');

  const directRewardForm = useForm<DirectRewardFormValues>({
    resolver: zodResolver(directRewardFormSchema),
    defaultValues: {
      triggerServiceId: '',
      rewardProductId: '',
      description: '',
      isActive: true,
    }
  });

  useEffect(() => {
    const fetchGeneralSettings = async () => {
      setIsLoadingGeneralSettings(true);
      try {
        const settingsDocRef = doc(db, 'appSettings', 'generalDetails');
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWorkshopName(data.workshopName || 'QLAB Auto Detailing');
          setWorkshopAddress(data.workshopAddress || 'Jl. Sudirman No. 123, Jakarta');
          setWorkshopPhone(data.workshopPhone || '+62 21 555 0123');
        }
      } catch (error) {
        console.error("Error fetching general settings: ", error);
        toast({
          title: "Error",
          description: "Gagal memuat pengaturan umum bengkel.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingGeneralSettings(false);
      }
    };
    fetchGeneralSettings();
  }, [toast]);

  const handleSaveGeneralSettings = async () => {
    setIsSavingGeneralSettings(true);
    try {
      const settingsDocRef = doc(db, 'appSettings', 'generalDetails');
      await setDoc(settingsDocRef, { 
        workshopName,
        workshopAddress,
        workshopPhone,
        updatedAt: serverTimestamp() 
      }, { merge: true });
      toast({ title: "Sukses", description: "Pengaturan umum bengkel berhasil disimpan." });
    } catch (error) {
      console.error("Error saving general settings: ", error);
      toast({ title: "Error", description: "Gagal menyimpan pengaturan umum.", variant: "destructive" });
    } finally {
      setIsSavingGeneralSettings(false);
    }
  };


  useEffect(() => {
    const fetchFinancialSettings = async () => {
      setIsLoadingFinancialSettings(true);
      try {
        const settingsDocRef = doc(db, 'appSettings', 'financial');
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.initialBankBalance !== undefined) {
            setInitialBankBalance(String(data.initialBankBalance));
          } else {
            setInitialBankBalance('');
          }
          if (data.initialPhysicalCashBalance !== undefined) {
            setInitialPhysicalCashBalance(String(data.initialPhysicalCashBalance));
          } else {
            setInitialPhysicalCashBalance('');
          }
          if (data.minPointsToRedeemGeneral !== undefined) {
            setMinPointsToRedeemGeneral(String(data.minPointsToRedeemGeneral));
          } else {
            setMinPointsToRedeemGeneral('');
          }
        } else {
          setInitialBankBalance('');
          setInitialPhysicalCashBalance('');
          setMinPointsToRedeemGeneral('');
        }
      } catch (error) {
        console.error("Error fetching financial/loyalty settings: ", error);
        toast({
          title: "Error",
          description: "Gagal memuat pengaturan finansial/loyalitas.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingFinancialSettings(false);
      }
    };
    fetchFinancialSettings();
  }, [toast]);

  const fetchLoyaltyRewards = useCallback(async () => {
    setIsLoadingRewards(true);
    try {
      const rewardsCollectionRef = collection(db, 'loyaltyRewards');
      const q = query(rewardsCollectionRef, orderBy("name"));
      const querySnapshot = await getFirestoreDocs(q);
      const rewardsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LoyaltyReward));
      setLoyaltyRewards(rewardsData);
    } catch (error) {
      console.error("Error fetching loyalty rewards: ", error);
      toast({ title: "Error", description: "Tidak dapat mengambil data reward loyalitas.", variant: "destructive" });
    } finally {
      setIsLoadingRewards(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchLoyaltyRewards();
  }, [fetchLoyaltyRewards]);

  const fetchDirectRewards = useCallback(async () => {
    setIsLoadingDirectRewards(true);
    try {
      const rewardsCollectionRef = collection(db, 'directRewards');
      const q = query(rewardsCollectionRef, orderBy("triggerServiceName"));
      const querySnapshot = await getFirestoreDocs(q);
      const rewardsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DirectReward));
      setDirectRewards(rewardsData);
    } catch (error) {
      console.error("Error fetching direct rewards: ", error);
      toast({ title: "Error", description: "Gagal mengambil data reward langsung.", variant: "destructive" });
    } finally {
      setIsLoadingDirectRewards(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchDirectRewards();
  }, [fetchDirectRewards]);

  const fetchServicesAndProductsForDropdowns = useCallback(async () => {
    setIsLoadingServicesForDropdown(true);
    try {
      const servicesRef = collection(db, 'services');
      const servicesQuery = query(servicesRef, where("type", "==", "Layanan"), orderBy("name"));
      const productsQuery = query(servicesRef, where("type", "==", "Produk"), orderBy("name"));

      const [servicesSnapshot, productsSnapshot] = await Promise.all([
        getFirestoreDocs(servicesQuery),
        getFirestoreDocs(productsQuery)
      ]);

      const servicesData = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct));
      const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ServiceProduct));
      
      setAvailableServicesForDropdown(servicesData);
      setAvailableProductsForDropdown(productsData);

    } catch (error) {
      console.error("Error fetching services/products for dropdowns: ", error);
      toast({ title: "Error Data", description: "Gagal memuat daftar layanan/produk untuk form.", variant: "destructive" });
    } finally {
      setIsLoadingServicesForDropdown(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchServicesAndProductsForDropdowns();
  }, [fetchServicesAndProductsForDropdowns]);


  const handleSaveFinancialSettings = async () => {
    setIsSavingFinancialSettings(true);
    try {
      const bankBalanceStr = initialBankBalance.trim();
      const physicalCashStr = initialPhysicalCashBalance.trim();
      const minPointsStr = minPointsToRedeemGeneral.trim();

      const bankBalance = bankBalanceStr === '' ? 0 : parseFloat(bankBalanceStr);
      const physicalCashBalance = physicalCashStr === '' ? 0 : parseFloat(physicalCashStr);
      const minPoints = minPointsStr === '' ? 0 : parseInt(minPointsStr, 10);

      if (isNaN(bankBalance) || bankBalance < 0) {
        toast({ title: "Input Tidak Valid", description: "Saldo awal bank harus berupa angka positif atau 0.", variant: "destructive"});
        setIsSavingFinancialSettings(false); return;
      }
      if (isNaN(physicalCashBalance) || physicalCashBalance < 0) {
        toast({ title: "Input Tidak Valid", description: "Saldo awal kas fisik harus berupa angka positif atau 0.", variant: "destructive"});
        setIsSavingFinancialSettings(false); return;
      }
       if (isNaN(minPoints) || minPoints < 0) {
        toast({ title: "Input Tidak Valid", description: "Minimum poin umum untuk redeem harus angka positif atau 0.", variant: "destructive"});
        setIsSavingFinancialSettings(false); return;
      }

      const settingsDocRef = doc(db, 'appSettings', 'financial');
      await setDoc(settingsDocRef, { 
        initialBankBalance: bankBalance,
        initialPhysicalCashBalance: physicalCashBalance,
        minPointsToRedeemGeneral: minPoints,
        updatedAt: serverTimestamp() 
      }, { merge: true });

      toast({ title: "Sukses", description: "Pengaturan finansial & loyalitas dasar berhasil disimpan." });
    } catch (error) {
      console.error("Error saving settings: ", error);
      toast({ title: "Error", description: "Gagal menyimpan pengaturan.", variant: "destructive" });
    } finally {
      setIsSavingFinancialSettings(false);
    }
  };

  const handleOpenRewardForm = (reward: LoyaltyReward | null = null) => {
    setEditingReward(reward);
    if (reward) {
      rewardForm.reset({
        name: reward.name,
        description: reward.description || '',
        pointsRequired: reward.pointsRequired,
        type: reward.type,
        rewardValue: reward.rewardValue,
        isActive: reward.isActive,
      });
    } else {
      rewardForm.reset({
        name: '',
        description: '',
        pointsRequired: 0,
        type: undefined,
        rewardValue: '',
        isActive: true,
      });
    }
    setIsRewardFormDialogOpen(true);
  };

  const handleRewardFormSubmit = async (values: LoyaltyRewardFormValues) => {
    setIsSubmittingReward(true);
    const rewardData: Omit<LoyaltyReward, 'id'> = {
      name: values.name,
      description: values.description,
      pointsRequired: values.pointsRequired,
      type: values.type,
      rewardValue: values.type === 'discount_transaction' ? Number(values.rewardValue) : String(values.rewardValue),
      isActive: values.isActive,
    };

    try {
      if (editingReward) {
        const rewardDocRef = doc(db, 'loyaltyRewards', editingReward.id);
        await updateDoc(rewardDocRef, rewardData);
        toast({ title: "Sukses", description: "Reward berhasil diperbarui." });
      } else {
        await addDoc(collection(db, 'loyaltyRewards'), rewardData);
        toast({ title: "Sukses", description: "Reward baru berhasil ditambahkan." });
      }
      fetchLoyaltyRewards();
      setIsRewardFormDialogOpen(false);
      setEditingReward(null);
    } catch (error) {
      console.error("Error saving reward: ", error);
      toast({ title: "Error", description: "Gagal menyimpan reward.", variant: "destructive" });
    } finally {
      setIsSubmittingReward(false);
    }
  };

  const handleDeleteReward = async () => {
    if (!rewardToDelete) return;
    setIsSubmittingReward(true); 
    try {
      await deleteDoc(doc(db, 'loyaltyRewards', rewardToDelete.id));
      toast({ title: "Sukses", description: `Reward "${rewardToDelete.name}" berhasil dihapus.` });
      fetchLoyaltyRewards();
      setRewardToDelete(null);
    } catch (error) {
      console.error("Error deleting reward: ", error);
      toast({ title: "Error", description: "Gagal menghapus reward.", variant: "destructive" });
    } finally {
      setIsSubmittingReward(false);
    }
  };

  const handleOpenDirectRewardForm = (reward: DirectReward | null = null) => {
    setEditingDirectReward(reward);
    if (reward) {
      directRewardForm.reset({
        triggerServiceId: reward.triggerServiceId,
        rewardProductId: reward.rewardProductId,
        description: reward.description || '',
        isActive: reward.isActive,
      });
    } else {
      directRewardForm.reset({
        triggerServiceId: '',
        rewardProductId: '',
        description: '',
        isActive: true,
      });
    }
    setIsDirectRewardFormDialogOpen(true);
  };

  const handleDirectRewardFormSubmit = async (values: DirectRewardFormValues) => {
    setIsSubmittingDirectReward(true);

    const triggerService = availableServicesForDropdown.find(s => s.id === values.triggerServiceId);
    const rewardProduct = availableProductsForDropdown.find(p => p.id === values.rewardProductId);

    if (!triggerService || !rewardProduct) {
      toast({ title: "Error Data", description: "Layanan pemicu atau produk reward tidak ditemukan.", variant: "destructive" });
      setIsSubmittingDirectReward(false);
      return;
    }

    const directRewardData: Omit<DirectReward, 'id' | 'createdAt' | 'updatedAt'> = {
      triggerServiceId: values.triggerServiceId,
      triggerServiceName: triggerService.name,
      rewardProductId: values.rewardProductId,
      rewardProductName: rewardProduct.name,
      description: values.description,
      isActive: values.isActive,
    };

    try {
      if (editingDirectReward) {
        const rewardDocRef = doc(db, 'directRewards', editingDirectReward.id);
        await updateDoc(rewardDocRef, {...directRewardData, updatedAt: serverTimestamp()});
        toast({ title: "Sukses", description: "Aturan reward langsung berhasil diperbarui." });
      } else {
        await addDoc(collection(db, 'directRewards'), {...directRewardData, createdAt: serverTimestamp(), updatedAt: serverTimestamp()});
        toast({ title: "Sukses", description: "Aturan reward langsung baru berhasil ditambahkan." });
      }
      fetchDirectRewards();
      setIsDirectRewardFormDialogOpen(false);
      setEditingDirectReward(null);
    } catch (error) {
      console.error("Error saving direct reward: ", error);
      toast({ title: "Error", description: "Gagal menyimpan aturan reward langsung.", variant: "destructive" });
    } finally {
      setIsSubmittingDirectReward(false);
    }
  };

  const handleDeleteDirectReward = async () => {
    if (!directRewardToDelete) return;
    setIsSubmittingDirectReward(true);
    try {
      await deleteDoc(doc(db, 'directRewards', directRewardToDelete.id));
      toast({ title: "Sukses", description: `Aturan reward untuk "${directRewardToDelete.triggerServiceName}" berhasil dihapus.` });
      fetchDirectRewards();
      setDirectRewardToDelete(null);
    } catch (error) {
      console.error("Error deleting direct reward: ", error);
      toast({ title: "Error", description: "Gagal menghapus aturan reward langsung.", variant: "destructive" });
    } finally {
      setIsSubmittingDirectReward(false);
    }
  };


  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Pengaturan" />
      <main className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 mb-6">
            <TabsTrigger value="general"><SlidersHorizontal className="mr-2 h-4 w-4 hidden md:inline" />Umum</TabsTrigger>
            <TabsTrigger value="loyalty"><Gift className="mr-2 h-4 w-4 hidden md:inline" />Loyalitas Dasar</TabsTrigger>
            <TabsTrigger value="loyalty_rewards"><Award className="mr-2 h-4 w-4 hidden md:inline" />Daftar Reward Poin</TabsTrigger>
            <TabsTrigger value="direct_rewards"><Zap className="mr-2 h-4 w-4 hidden md:inline" />Reward Langsung</TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4 hidden md:inline" />Tampilan</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4 hidden md:inline" />Notifikasi</TabsTrigger>
            <TabsTrigger value="billing"><CreditCardIcon className="mr-2 h-4 w-4 hidden md:inline" />Tagihan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Umum Bengkel</CardTitle>
                <CardDescription>Kelola informasi bengkel Anda dan pengaturan dasar.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoadingGeneralSettings ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Memuat pengaturan umum...</span>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="workshop-name">Nama Bengkel</Label>
                      <Input id="workshop-name" value={workshopName} onChange={(e) => setWorkshopName(e.target.value)} disabled={isSavingGeneralSettings}/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workshop-address">Alamat</Label>
                      <Input id="workshop-address" value={workshopAddress} onChange={(e) => setWorkshopAddress(e.target.value)} disabled={isSavingGeneralSettings}/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workshop-phone">Nomor Telepon</Label>
                      <Input id="workshop-phone" type="tel" value={workshopPhone} onChange={(e) => setWorkshopPhone(e.target.value)} disabled={isSavingGeneralSettings}/>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveGeneralSettings} disabled={isSavingGeneralSettings || isLoadingGeneralSettings}>
                   {isSavingGeneralSettings ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Simpan Perubahan Umum
                </Button>
              </CardFooter>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-primary" />
                  Pengaturan Keuangan Dasar
                </CardTitle>
                <CardDescription>Pengaturan terkait saldo awal untuk laporan keuangan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoadingFinancialSettings ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Memuat pengaturan...</span>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="initial-bank-balance">Saldo Awal Rekening Bank Utama (Rp)</Label>
                      <Input 
                        id="initial-bank-balance" 
                        type="number" 
                        placeholder="mis. 10000000" 
                        value={initialBankBalance}
                        onChange={(e) => setInitialBankBalance(e.target.value)}
                        disabled={isSavingFinancialSettings}
                      />
                      <p className="text-xs text-muted-foreground">
                        Saldo awal rekening bank utama Anda. Digunakan untuk Laporan Arus Kas Bank.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="initial-physical-cash-balance">Saldo Awal Kas Fisik (Tunai) (Rp)</Label>
                      <Input 
                        id="initial-physical-cash-balance" 
                        type="number" 
                        placeholder="mis. 1000000" 
                        value={initialPhysicalCashBalance}
                        onChange={(e) => setInitialPhysicalCashBalance(e.target.value)}
                        disabled={isSavingFinancialSettings}
                      />
                      <p className="text-xs text-muted-foreground">
                        Saldo awal kas fisik (tunai) di tangan. Digunakan untuk Laporan Arus Kas Fisik.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveFinancialSettings} disabled={isSavingFinancialSettings || isLoadingFinancialSettings}>
                  {isSavingFinancialSettings ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Simpan Pengaturan Keuangan
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Dasar Program Loyalitas</CardTitle>
                <CardDescription>Konfigurasi umum bagaimana program loyalitas berjalan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 {isLoadingFinancialSettings ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Memuat pengaturan...</span>
                  </div>
                ) : (
                <>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <Label htmlFor="loyalty-program-active" className="font-medium">Aktifkan Program Loyalitas</Label>
                      <p className="text-sm text-muted-foreground">Izinkan pelanggan mendapatkan dan menukarkan poin.</p>
                    </div>
                    <Switch id="loyalty-program-active" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-points-redeem-general">Minimum Poin Umum untuk Tukar Reward</Label>
                    <Input 
                      id="min-points-redeem-general" 
                      type="number" 
                      value={minPointsToRedeemGeneral}
                      onChange={(e) => setMinPointsToRedeemGeneral(e.target.value)}
                      placeholder="mis. 100"
                      disabled={isSavingFinancialSettings}
                    />
                      <p className="text-xs text-muted-foreground">Klien harus memiliki setidaknya poin ini untuk bisa menukarkan reward apapun.</p>
                  </div>
                </>
                )}
                <p className="text-sm text-muted-foreground">
                  Pengaturan detail poin yang diberikan per layanan/produk dapat diatur di halaman "Layanan & Produk".
                  Pengaturan reward spesifik (item merchandise, diskon, dll.) ada di tab "Daftar Reward Poin".
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveFinancialSettings} disabled={isSavingFinancialSettings || isLoadingFinancialSettings}>
                  {isSavingFinancialSettings ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Simpan Pengaturan Loyalitas Dasar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty_rewards">
            <AlertDialog open={!!rewardToDelete} onOpenChange={(open) => !open && setRewardToDelete(null)}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Manajemen Reward Poin Loyalitas</CardTitle>
                    <CardDescription>Kelola item atau diskon yang dapat ditukar dengan poin loyalitas.</CardDescription>
                  </div>
                  <Button onClick={() => handleOpenRewardForm(null)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Tambah Reward Poin
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingRewards ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : loyaltyRewards.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Belum ada reward poin yang dikonfigurasi.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama Reward</TableHead>
                          <TableHead className="text-center">Poin</TableHead>
                          <TableHead>Tipe</TableHead>
                          <TableHead>Nilai</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loyaltyRewards.map((reward) => (
                          <TableRow key={reward.id}>
                            <TableCell className="font-medium">{reward.name}</TableCell>
                            <TableCell className="text-center">{reward.pointsRequired}</TableCell>
                            <TableCell className="capitalize">{reward.type === 'merchandise' ? 'Merchandise' : 'Diskon Transaksi'}</TableCell>
                            <TableCell>
                              {reward.type === 'discount_transaction' 
                                ? `Rp ${(reward.rewardValue as number).toLocaleString('id-ID')}`
                                : reward.rewardValue}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant={reward.isActive ? "default" : "outline"}>
                                {reward.isActive ? "Aktif" : "Nonaktif"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleOpenRewardForm(reward)} className="hover:text-primary">
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => setRewardToDelete(reward)} className="text-destructive hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin menghapus reward poin "{rewardToDelete?.name}"? Tindakan ini tidak dapat diurungkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setRewardToDelete(null)} disabled={isSubmittingReward}>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteReward} disabled={isSubmittingReward} className={buttonVariants({variant: "destructive"})}>
                    {isSubmittingReward ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TabsContent>

          <TabsContent value="direct_rewards">
             <AlertDialog open={!!directRewardToDelete} onOpenChange={(open) => !open && setDirectRewardToDelete(null)}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Manajemen Reward Langsung (Beli X Dapat Y)</CardTitle>
                    <CardDescription>Atur reward otomatis ketika pelanggan membeli layanan tertentu.</CardDescription>
                  </div>
                  <Button onClick={() => handleOpenDirectRewardForm(null)} disabled={isLoadingServicesForDropdown}>
                     {isLoadingServicesForDropdown && !isDirectRewardFormDialogOpen ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                     Tambah Aturan Baru
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoadingDirectRewards || isLoadingServicesForDropdown ? (
                    <div className="flex items-center justify-center py-10">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="ml-2">Memuat data...</span>
                    </div>
                  ) : directRewards.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Belum ada aturan reward langsung yang dikonfigurasi.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Layanan Pemicu</TableHead>
                          <TableHead>Produk Reward</TableHead>
                          <TableHead>Deskripsi</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {directRewards.map((reward) => (
                          <TableRow key={reward.id}>
                            <TableCell className="font-medium">{reward.triggerServiceName}</TableCell>
                            <TableCell>{reward.rewardProductName}</TableCell>
                            <TableCell className="text-xs max-w-xs truncate">{reward.description || "-"}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={reward.isActive ? "default" : "outline"}>
                                {reward.isActive ? "Aktif" : "Nonaktif"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleOpenDirectRewardForm(reward)} className="hover:text-primary">
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => setDirectRewardToDelete(reward)} className="text-destructive hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
               <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin menghapus aturan reward langsung untuk layanan "{directRewardToDelete?.triggerServiceName}"?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDirectRewardToDelete(null)} disabled={isSubmittingDirectReward}>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteDirectReward} disabled={isSubmittingDirectReward} className={buttonVariants({variant: "destructive"})}>
                    {isSubmittingDirectReward ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Hapus Aturan
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TabsContent>


          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Tampilan</CardTitle>
                <CardDescription>Sesuaikan tampilan dan nuansa aplikasi.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Pengaturan tema (mis., mode terang/gelap) dapat dikelola di sini.</p>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="dark-mode-toggle">Mode Gelap</Label>
                  <Switch id="dark-mode-toggle" checked disabled aria-readonly /> 
                  <span className="text-xs text-muted-foreground">(Default dan direkomendasikan)</span>
                </div>
              </CardContent>
               <CardFooter>
                <Button disabled>Simpan Perubahan Tampilan (Segera)</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
             <Card>
              <CardHeader>
                <CardTitle>Notifikasi</CardTitle>
                <CardDescription>Kelola preferensi notifikasi Anda.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">Pengaturan notifikasi akan segera tersedia.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users">
             <Card>
              <CardHeader>
                <CardTitle>Peran & Izin Pengguna</CardTitle>
                <CardDescription>Kelola akun staf dan tingkat akses mereka.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">Manajemen peran pengguna akan segera tersedia.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="billing">
             <Card>
              <CardHeader>
                <CardTitle>Tagihan & Langganan</CardTitle>
                <CardDescription>Kelola paket langganan dan metode pembayaran Anda.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">Informasi tagihan akan segera tersedia.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isRewardFormDialogOpen} onOpenChange={(isOpen) => {
          setIsRewardFormDialogOpen(isOpen);
          if (!isOpen) setEditingReward(null);
        }}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingReward ? "Edit Reward Poin" : "Tambah Reward Poin Baru"}</DialogTitle>
              <DialogDescription>
                {editingReward ? "Ubah detail reward poin di bawah ini." : "Isi detail untuk reward poin loyalitas baru."}
              </DialogDescription>
            </DialogHeader>
            <Form {...rewardForm}>
              <form onSubmit={rewardForm.handleSubmit(handleRewardFormSubmit)} className="space-y-4 py-2 pb-4">
                <FormField
                  control={rewardForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Reward</FormLabel>
                      <FormControl><Input placeholder="mis. Gantungan Kunci Keren" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={rewardForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi (Opsional)</FormLabel>
                      <FormControl><Textarea placeholder="Deskripsi singkat tentang reward" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={rewardForm.control}
                  name="pointsRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poin Dibutuhkan</FormLabel>
                      <FormControl><Input type="number" placeholder="mis. 100" {...field} onChange={e => field.onChange(parseInt(e.target.value,10) || 0)} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={rewardForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipe Reward</FormLabel>
                      <Select onValueChange={(value) => {
                          field.onChange(value as 'merchandise' | 'discount_transaction');
                          rewardForm.setValue('rewardValue', ''); 
                        }} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Pilih tipe reward" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="merchandise">Merchandise</SelectItem>
                          <SelectItem value="discount_transaction">Diskon Transaksi</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={rewardForm.control}
                  name="rewardValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {watchedRewardType === 'merchandise' ? "Nama Item Merchandise" : 
                         watchedRewardType === 'discount_transaction' ? "Jumlah Diskon (Rp)" : 
                         "Nilai Reward"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type={watchedRewardType === 'discount_transaction' ? "number" : "text"}
                          placeholder={watchedRewardType === 'merchandise' ? "mis. Topi QLAB" : 
                                         watchedRewardType === 'discount_transaction' ? "mis. 25000" : 
                                         "Isi nilai reward"}
                          {...field}
                          onChange={e => {
                            if (watchedRewardType === 'discount_transaction') {
                              field.onChange(parseFloat(e.target.value) || '');
                            } else {
                              field.onChange(e.target.value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={rewardForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Aktifkan Reward</FormLabel>
                        <FormDescription>Reward ini akan tampil dan bisa ditukarkan jika aktif.</FormDescription>
                      </div>
                      <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild><Button type="button" variant="outline" disabled={isSubmittingReward}>Batal</Button></DialogClose>
                  <Button type="submit" disabled={isSubmittingReward} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    {isSubmittingReward && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Simpan Reward Poin
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog open={isDirectRewardFormDialogOpen} onOpenChange={(isOpen) => {
          setIsDirectRewardFormDialogOpen(isOpen);
          if (!isOpen) setEditingDirectReward(null);
        }}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingDirectReward ? "Edit Aturan Reward Langsung" : "Tambah Aturan Reward Langsung"}</DialogTitle>
              <DialogDescription>
                Atur layanan mana yang akan memicu pemberian produk reward secara otomatis.
              </DialogDescription>
            </DialogHeader>
            {isLoadingServicesForDropdown ? (
                <div className="flex items-center justify-center py-10"><Loader2 className="h-6 w-6 animate-spin" /> Memuat data layanan/produk...</div>
            ) : (
              <Form {...directRewardForm}>
                <form onSubmit={directRewardForm.handleSubmit(handleDirectRewardFormSubmit)} className="space-y-4 py-2 pb-4">
                  <FormField
                    control={directRewardForm.control}
                    name="triggerServiceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Layanan Pemicu</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Pilih layanan pemicu" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {availableServicesForDropdown.length === 0 && <SelectItem value="" disabled>Tidak ada layanan</SelectItem>}
                            {availableServicesForDropdown.map(service => (
                              <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={directRewardForm.control}
                    name="rewardProductId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Produk Reward</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Pilih produk reward" /></SelectTrigger></FormControl>
                          <SelectContent>
                             {availableProductsForDropdown.length === 0 && <SelectItem value="" disabled>Tidak ada produk</SelectItem>}
                            {availableProductsForDropdown.map(product => (
                              <SelectItem key={product.id} value={product.id}>{product.name} (Harga: Rp {product.price.toLocaleString('id-ID')})</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs">Produk ini akan ditambahkan otomatis dengan harga Rp 0 ke transaksi.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={directRewardForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi (Opsional)</FormLabel>
                        <FormControl><Textarea placeholder="Deskripsi singkat aturan ini, mis. Promo Juli" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={directRewardForm.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Aktifkan Aturan Ini</FormLabel>
                        </div>
                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="outline" disabled={isSubmittingDirectReward}>Batal</Button></DialogClose>
                    <Button type="submit" disabled={isSubmittingDirectReward || isLoadingServicesForDropdown} className="bg-accent text-accent-foreground hover:bg-accent/90">
                      {isSubmittingDirectReward && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Simpan Aturan Reward Langsung
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            )}
          </DialogContent>
        </Dialog>

      </main>
    </div>
  );
}
    
