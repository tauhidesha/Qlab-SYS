
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, MessageCircle, Info, PlusCircle, Trash2, Settings, Edit2, BrainCircuit, PhoneForwarded, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs as getFirestoreDocs, query, orderBy, addDoc, serverTimestamp, setDoc, doc, getDoc as getFirestoreDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AiSettingsFormSchema,
  type AiSettingsFormValues,
  // DEFAULT_AI_SETTINGS, // Diambil dari types/aiSettings
  AI_AGENT_BEHAVIORS,
  AI_TRANSFER_CONDITIONS,
} from '@/types/aiSettings';
import { DEFAULT_AI_SETTINGS } from '@/types/aiSettings'; // IMPORT BARU
import {
  KnowledgeBaseEntryFormSchema,
  type KnowledgeBaseFormData,
  type KnowledgeBaseEntry,
} from '@/types/knowledgeBase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, 
  DialogClose 
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader as AlertDialogHeaderEl, 
  AlertDialogTitle as AlertDialogTitleEl,   
  AlertDialogDescription as AlertDialogDescriptionEl, 
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AiCsAssistantSettingsPage() {
  const router = useRouter();
  const { toast } = useToast();

  // AI Agent Settings State & Form
  const [isLoadingAiSettings, setIsLoadingAiSettings] = useState(true);
  const [isSavingAiSettings, setIsSavingAiSettings] = useState(false);
  const aiSettingsForm = useForm<AiSettingsFormValues>({
    resolver: zodResolver(AiSettingsFormSchema),
    defaultValues: DEFAULT_AI_SETTINGS, // Menggunakan DEFAULT_AI_SETTINGS yang diimpor
  });
  const watchedEnableFollowUp = aiSettingsForm.watch('enableFollowUp');
  const watchedEnableHumanHandoff = aiSettingsForm.watch('enableHumanHandoff');

  // Knowledge Base State & Form
  const [knowledgeBaseEntries, setKnowledgeBaseEntries] = useState<KnowledgeBaseEntry[]>([]);
  const [isLoadingKnowledgeBase, setIsLoadingKnowledgeBase] = useState(true);
  const [isKbFormDialogOpen, setIsKbFormDialogOpen] = useState(false);
  const [editingKbEntry, setEditingKbEntry] = useState<KnowledgeBaseEntry | null>(null);
  const [kbEntryToDelete, setKbEntryToDelete] = useState<KnowledgeBaseEntry | null>(null);
  const [isSubmittingKbEntry, setIsSubmittingKbEntry] = useState(false);
  const kbEntryForm = useForm<KnowledgeBaseFormData>({
    resolver: zodResolver(KnowledgeBaseEntryFormSchema),
    defaultValues: {
      topic: '',
      content: '',
      keywordsInput: '',
      isActive: true,
    }
  });

  const fetchAiAgentSettings = useCallback(async () => {
    setIsLoadingAiSettings(true);
    try {
      const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
      const docSnap = await getFirestoreDoc(settingsDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const followUpDelaysWithDefaults = {
          ...DEFAULT_AI_SETTINGS.followUpDelays,
          ...(data.followUpDelays || {}),
        };
        aiSettingsForm.reset({
          ...DEFAULT_AI_SETTINGS,
          ...data,
          followUpDelays: followUpDelaysWithDefaults,
          humanAgentWhatsAppNumber: data.humanAgentWhatsAppNumber || '',
          mainPrompt: data.mainPrompt || DEFAULT_AI_SETTINGS.mainPrompt,
        } as AiSettingsFormValues);
      } else {
        aiSettingsForm.reset(DEFAULT_AI_SETTINGS);
      }
    } catch (error) {
      console.error("Error fetching AI agent settings: ", error);
      toast({ title: "Error", description: "Gagal memuat pengaturan agen AI.", variant: "destructive" });
      aiSettingsForm.reset(DEFAULT_AI_SETTINGS);
    } finally {
      setIsLoadingAiSettings(false);
    }
  }, [aiSettingsForm, toast]);

  const handleSaveAiAgentSettings = async (data: AiSettingsFormValues) => {
    setIsSavingAiSettings(true);
    try {
      const settingsDocRef = doc(db, 'appSettings', 'aiAgentConfig');
      const dataToSave = { ...data };
      if (data.enableFollowUp) {
        dataToSave.followUpDelays = data.followUpDelays || DEFAULT_AI_SETTINGS.followUpDelays;
      }
      if (!data.enableHumanHandoff) {
        dataToSave.humanAgentWhatsAppNumber = '';
      }
      if (!dataToSave.mainPrompt || dataToSave.mainPrompt.trim() === "") {
        dataToSave.mainPrompt = DEFAULT_AI_SETTINGS.mainPrompt;
      }
      await setDoc(settingsDocRef, { ...dataToSave, updatedAt: serverTimestamp() }, { merge: true });
      toast({ title: "Sukses", description: "Pengaturan Agen AI berhasil disimpan." });
    } catch (error) {
      console.error("Error saving AI agent settings: ", error);
      toast({ title: "Error", description: "Gagal menyimpan pengaturan Agen AI.", variant: "destructive" });
    } finally {
      setIsSavingAiSettings(false);
    }
  };

  useEffect(() => {
    fetchAiAgentSettings();
  }, [fetchAiAgentSettings]);

  const fetchKnowledgeBaseEntries = useCallback(async () => {
    setIsLoadingKnowledgeBase(true);
    try {
      const kbCollectionRef = collection(db, 'knowledge_base_entries');
      const q = query(kbCollectionRef, orderBy("topic"));
      const querySnapshot = await getFirestoreDocs(q);
      const entriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as KnowledgeBaseEntry));
      setKnowledgeBaseEntries(entriesData);
    } catch (error) {
      console.error("Error fetching knowledge base entries: ", error);
      toast({ title: "Error", description: "Gagal memuat data knowledge base.", variant: "destructive" });
    } finally {
      setIsLoadingKnowledgeBase(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchKnowledgeBaseEntries();
  }, [fetchKnowledgeBaseEntries]);

  const handleOpenKbForm = (entry: KnowledgeBaseEntry | null = null) => {
    setEditingKbEntry(entry);
    if (entry) {
      kbEntryForm.reset({
        topic: entry.topic,
        content: entry.content,
        keywordsInput: entry.keywords.join(', '),
        isActive: entry.isActive !== undefined ? entry.isActive : true,
      });
    } else {
      kbEntryForm.reset({
        topic: '',
        content: '',
        keywordsInput: '',
        isActive: true,
      });
    }
    setIsKbFormDialogOpen(true);
  };

  const handleKbFormSubmit = async (values: KnowledgeBaseFormData) => {
    setIsSubmittingKbEntry(true);
    const keywordsArray = values.keywordsInput.split(',').map(kw => kw.trim()).filter(kw => kw.length > 0);
    
    if (keywordsArray.length === 0) {
      kbEntryForm.setError("keywordsInput", { type: "manual", message: "Minimal satu kata kunci valid diperlukan setelah dipisah koma." });
      setIsSubmittingKbEntry(false);
      return;
    }

    const kbData: Omit<KnowledgeBaseEntry, 'id' | 'createdAt' | 'updatedAt'> = {
      topic: values.topic,
      content: values.content,
      keywords: keywordsArray,
      isActive: values.isActive,
    };

    try {
      if (editingKbEntry) {
        const kbDocRef = doc(db, 'knowledge_base_entries', editingKbEntry.id);
        await updateDoc(kbDocRef, { ...kbData, updatedAt: serverTimestamp() });
        toast({ title: "Sukses", description: "Entri Knowledge Base berhasil diperbarui." });
      } else {
        await addDoc(collection(db, 'knowledge_base_entries'), { ...kbData, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        toast({ title: "Sukses", description: "Entri Knowledge Base baru berhasil ditambahkan." });
      }
      fetchKnowledgeBaseEntries();
      setIsKbFormDialogOpen(false);
      setEditingKbEntry(null);
    } catch (error) {
      console.error("Error saving Knowledge Base entry: ", error);
      toast({ title: "Error", description: "Gagal menyimpan entri Knowledge Base.", variant: "destructive" });
    } finally {
      setIsSubmittingKbEntry(false);
    }
  };

  const handleDeleteKbEntry = async () => {
    if (!kbEntryToDelete) return;
    setIsSubmittingKbEntry(true);
    try {
      await deleteDoc(doc(db, 'knowledge_base_entries', kbEntryToDelete.id));
      toast({ title: "Sukses", description: `Entri Knowledge Base "${kbEntryToDelete.topic}" berhasil dihapus.` });
      fetchKnowledgeBaseEntries();
      setKbEntryToDelete(null); 
    } catch (error) {
      console.error("Error deleting Knowledge Base entry: ", error);
      toast({ title: "Error", description: "Gagal menghapus entri Knowledge Base.", variant: "destructive" });
    } finally {
      setIsSubmittingKbEntry(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <AppHeader title="Pengaturan Agen & Knowledge Base AI" />
      
      <div className="p-4 border-b">
        <Button variant="outline" onClick={() => router.push('/ai-cs-assistant')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Asisten CS
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="agent-settings" className="w-full p-6">
          <TabsList className="grid w-full grid-cols-2 mb-6 sticky top-0 bg-background/95 backdrop-blur z-10 p-1 h-auto">
            <TabsTrigger value="agent-settings" className="py-2">Pengaturan Agen AI</TabsTrigger>
            <TabsTrigger value="knowledge-base" className="py-2">Manajemen Knowledge Base</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agent-settings">
            <Form {...aiSettingsForm}>
              <form onSubmit={aiSettingsForm.handleSubmit(handleSaveAiAgentSettings)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><BrainCircuit className="mr-2 h-5 w-5 text-primary" />Pengaturan Perilaku & Prompt Agen AI</CardTitle>
                    <CardDescription>Konfigurasi bagaimana Zoya merespon dan berinteraksi.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isLoadingAiSettings ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Memuat pengaturan AI...</span>
                        </div>
                    ) : (
                      <>
                        <FormField
                          control={aiSettingsForm.control}
                          name="mainPrompt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center"><Sparkles className="mr-2 h-4 w-4 text-muted-foreground" />Prompt Utama Zoya</FormLabel>
                              <FormControl><Textarea placeholder="Masukkan prompt utama untuk Zoya di sini..." {...field} rows={15} className="text-xs leading-relaxed font-mono" /></FormControl>
                              <FormDescription>Ini adalah instruksi inti yang mengarahkan Zoya. Gunakan placeholder seperti {`{\`{{{customerMessage}}}\`}`} atau {`{\`{{{currentDate}}}\`}`}. Perubahan di sini akan langsung mempengaruhi respon AI.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Separator />
                        <FormField
                          control={aiSettingsForm.control}
                          name="agentBehavior"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Perilaku Agen AI</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Pilih perilaku agen" /></SelectTrigger></FormControl>
                                <SelectContent>
                                  {AI_AGENT_BEHAVIORS.map(behavior => (
                                    <SelectItem key={behavior} value={behavior}>{behavior}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={aiSettingsForm.control}
                          name="welcomeMessage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center"><MessageCircle className="mr-2 h-4 w-4 text-muted-foreground" />Pesan Selamat Datang</FormLabel>
                              <FormControl><Textarea placeholder="Tulis pesan selamat datang dari agen AI..." {...field} rows={3} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={aiSettingsForm.control}
                          name="knowledgeBaseDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center"><Info className="mr-2 h-4 w-4 text-muted-foreground" />Deskripsi/Panduan Umum Knowledge Base AI</FormLabel>
                              <FormControl><Textarea placeholder="Panduan tingkat tinggi untuk AI tentang bagaimana menggunakan knowledge base..." {...field} rows={4} /></FormControl>
                              <FormDescription>Informasi ini akan membantu AI memahami konteks jawaban.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormItem>
                          <FormLabel>Kondisi Transfer ke Manusia</FormLabel>
                          <FormDescription>Pilih kondisi kapan percakapan harus dialihkan ke staf manusia.</FormDescription>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 pt-2">
                            {AI_TRANSFER_CONDITIONS.map((condition) => (
                              <FormField
                                key={condition}
                                control={aiSettingsForm.control}
                                name="transferConditions"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(condition)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), condition])
                                            : field.onChange(
                                                (field.value || []).filter(
                                                  (value) => value !== condition
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm">{condition}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage>{aiSettingsForm.formState.errors.transferConditions?.message}</FormMessage>
                        </FormItem>

                        <FormField
                          control={aiSettingsForm.control}
                          name="enableHumanHandoff"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel className="flex items-center"><PhoneForwarded className="mr-2 h-4 w-4 text-muted-foreground"/>Aktifkan Notifikasi Handoff</FormLabel>
                                <FormDescription>Notifikasi dikirim jika kondisi transfer terpenuhi.</FormDescription>
                              </div>
                              <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                          )}
                        />
                        {watchedEnableHumanHandoff && (
                            <FormField
                              control={aiSettingsForm.control}
                              name="humanAgentWhatsAppNumber"
                              render={({ field }) => (
                                <FormItem className="pl-4 mt-2">
                                  <FormLabel>Nomor WhatsApp Agen Manusia</FormLabel>
                                  <FormControl><Input type="tel" placeholder="mis. +6281234567890" {...field} /></FormControl>
                                  <FormDescription>Nomor ini akan menerima notifikasi saat handoff.</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                        )}

                        <FormField
                          control={aiSettingsForm.control}
                          name="enableFollowUp"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Aktifkan Fitur Follow-up</FormLabel>
                                <FormDescription>AI mengirim follow-up jika pelanggan belum berkunjung/transaksi.</FormDescription>
                              </div>
                              <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                          )}
                        />
                        {watchedEnableFollowUp && (
                          <Card className="p-4 bg-muted/50 border-dashed">
                            <CardHeader className="p-0 pb-3">
                                <CardTitle className="text-md">Pengaturan Jadwal Follow-up</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-4">
                              <FormField
                                control={aiSettingsForm.control}
                                name="followUpMessageTemplate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Template Pesan Follow-up</FormLabel>
                                    <FormControl><Textarea placeholder="Tulis template pesan untuk follow-up..." {...field} rows={3} /></FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={aiSettingsForm.control}
                                    name="followUpDelays.firstAttemptHours"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Penundaan Pertama (Jam)</FormLabel>
                                        <FormControl><Input type="number" placeholder="mis. 24" {...field} 
                                        onChange={e => field.onChange(parseInt(e.target.value, 10) || undefined)}
                                        value={field.value === undefined ? '' : String(field.value)}
                                        /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={aiSettingsForm.control}
                                    name="followUpDelays.secondAttemptDays"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Penundaan Ke-2 (Hari)</FormLabel>
                                        <FormControl><Input type="number" placeholder="mis. 7" {...field}
                                        onChange={e => field.onChange(parseInt(e.target.value, 10) || undefined)}
                                        value={field.value === undefined ? '' : String(field.value)}
                                        /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={aiSettingsForm.control}
                                    name="followUpDelays.thirdAttemptDays"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Penundaan Ke-3 (Hari)</FormLabel>
                                        <FormControl><Input type="number" placeholder="mis. 7" {...field} 
                                        onChange={e => field.onChange(parseInt(e.target.value, 10) || undefined)}
                                        value={field.value === undefined ? '' : String(field.value)}
                                        /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={aiSettingsForm.control}
                                    name="followUpDelays.fourthAttemptDays"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Penundaan Ke-4 (Hari)</FormLabel>
                                        <FormControl><Input type="number" placeholder="mis. 30" {...field} 
                                        onChange={e => field.onChange(parseInt(e.target.value, 10) || undefined)}
                                        value={field.value === undefined ? '' : String(field.value)}
                                        /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </>
                    )}
                  </CardContent>
                  <CardFooter> 
                    <Button type="submit" disabled={isSavingAiSettings || isLoadingAiSettings}>
                      {isSavingAiSettings ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Simpan Pengaturan Agen AI
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="knowledge-base">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Info className="mr-2 h-5 w-5 text-primary" />Manajemen Knowledge Base</CardTitle>
                <CardDescription>Tambah, edit, atau hapus informasi yang dapat diakses oleh AI.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4"> 
                  <div className="flex justify-end mb-4">
                      <Button onClick={() => handleOpenKbForm(null)}>
                          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Entri KB
                      </Button>
                  </div>
                  {isLoadingKnowledgeBase ? (
                      <div className="flex items-center justify-center py-10">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                  ) : knowledgeBaseEntries.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Belum ada entri knowledge base.</p>
                  ) : (
                      <Table>
                      <TableHeader>
                          <TableRow>
                          <TableHead>Topik</TableHead>
                          <TableHead>Potongan Konten</TableHead>
                          <TableHead>Kata Kunci</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {knowledgeBaseEntries.map((entry) => (
                          <TableRow key={entry.id}>
                              <TableCell className="font-medium max-w-xs truncate">{entry.topic}</TableCell>
                              <TableCell className="max-w-md truncate">{entry.content}</TableCell>
                              <TableCell className="text-xs max-w-xs">
                              {entry.keywords.map(kw => <Badge key={kw} variant="outline" className="mr-1 mb-1">{kw}</Badge>)}
                              </TableCell>
                              <TableCell className="text-center">
                              <Badge variant={entry.isActive ? "default" : "outline"}>
                                  {entry.isActive ? "Aktif" : "Nonaktif"}
                              </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleOpenKbForm(entry)} className="hover:text-primary">
                                  <Edit2 className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon" onClick={() => setKbEntryToDelete(entry)} className="text-destructive hover:text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                      </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                      <AlertDialogHeaderEl>
                                      <AlertDialogTitleEl>Konfirmasi Penghapusan</AlertDialogTitleEl>
                                      <AlertDialogDescriptionEl>
                                          Apakah Anda yakin ingin menghapus entri knowledge base dengan topik "{kbEntryToDelete?.topic}"? Tindakan ini tidak dapat diurungkan.
                                      </AlertDialogDescriptionEl>
                                      </AlertDialogHeaderEl>
                                      <AlertDialogFooter>
                                      <AlertDialogCancel onClick={() => setKbEntryToDelete(null)} disabled={isSubmittingKbEntry}>Batal</AlertDialogCancel>
                                      <AlertDialogAction onClick={handleDeleteKbEntry} disabled={isSubmittingKbEntry} className={buttonVariants({variant: "destructive"})}>
                                          {isSubmittingKbEntry ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                          Hapus
                                      </AlertDialogAction>
                                      </AlertDialogFooter>
                                  </AlertDialogContent>
                              </AlertDialog>
                              </TableCell>
                          </TableRow>
                          ))}
                      </TableBody>
                      </Table>
                  )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={isKbFormDialogOpen} onOpenChange={(isOpen: boolean) => {
        setIsKbFormDialogOpen(isOpen);
        if (!isOpen) setEditingKbEntry(null);
      }}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingKbEntry ? "Edit Entri Knowledge Base" : "Tambah Entri Knowledge Base Baru"}</DialogTitle>
            <DialogDescription>
              {editingKbEntry ? "Ubah detail entri di bawah ini." : "Isi detail untuk entri knowledge base baru."}
            </DialogDescription>
          </DialogHeader>
          <Form {...kbEntryForm}>
            <form onSubmit={kbEntryForm.handleSubmit(handleKbFormSubmit)} className="space-y-4 py-2 pb-4">
              <FormField
                control={kbEntryForm.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topik Utama</FormLabel>
                    <FormControl><Input placeholder="mis. Jam Buka, Kebijakan Garansi" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={kbEntryForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konten Informasi</FormLabel>
                    <FormControl><Textarea placeholder="Tuliskan detail informasi atau jawaban untuk topik ini..." {...field} rows={5} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={kbEntryForm.control}
                name="keywordsInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata Kunci (pisahkan dengan koma)</FormLabel>
                    <FormControl><Textarea placeholder="mis. operasional, jadwal, garansi servis, syarat klaim" {...field} rows={2} /></FormControl>
                    <FormDescription className="text-xs">Kata kunci membantu AI menemukan informasi ini.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={kbEntryForm.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Aktifkan Entri Ini</FormLabel>
                      <FormDescription className="text-xs">Entri ini akan digunakan oleh AI jika aktif.</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsKbFormDialogOpen(false)} disabled={isSubmittingKbEntry}>Batal</Button>
                <Button type="submit" disabled={isSubmittingKbEntry} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {isSubmittingKbEntry && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Simpan Entri KB
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

