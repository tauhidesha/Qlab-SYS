
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, MessageSquareText, Sparkles, Copy, Send, User, Search, Bot, MessageCircle, ThumbsUp, ThumbsDown, Edit2, ShieldAlert, BrainCircuit, PhoneForwarded, Info, Settings, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import type { WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/firebase';
import { collection, getDocs as getFirestoreDocs, query, orderBy, type Timestamp, onSnapshot, addDoc, serverTimestamp, where, limit, setDoc, doc, getDoc as getFirestoreDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Client } from '@/types/client';
import type { DirectMessage } from '@/types/directMessage';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AiSettingsFormSchema,
  type AiSettingsFormValues,
  DEFAULT_AI_SETTINGS,
  AI_AGENT_BEHAVIORS,
  AI_TRANSFER_CONDITIONS,
} from '@/types/aiSettings';
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
  DialogFooter, // Added DialogFooter
  DialogClose // Added DialogClose
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
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface ChatMessageUi extends Omit<DirectMessage, 'timestamp' | 'id'> {
  id: string;
  timestamp: string;
}

interface PlaygroundMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  feedback?: 'good' | 'bad' | null;
  correction?: string;
  isEditingCorrection?: boolean;
  currentCorrectionText?: string;
}

interface Customer {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessageTimestamp: string;
  lastMessage: string;
  unreadCount: number;
  phone?: string;
}

function formatPhoneNumberForMatching(number?: string): string {
  if (!number || typeof number !== 'string' || number.trim() === '') {
    return '';
  }
  let cleaned = number.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13 && /^\d+$/.test(cleaned)) {
    cleaned = '62' + cleaned;
  } else if (!cleaned.startsWith('62') && /^\d{9,13}$/.test(cleaned) && !cleaned.startsWith('+')) {
    cleaned = '62' + cleaned;
  }
  if (cleaned.startsWith('62') && cleaned.length >= 10) {
    return cleaned;
  }
  return '';
}

export default function AiCsAssistantPage() {
  const [customerMessageInput, setCustomerMessageInput] = useState('');
  const [currentPlaygroundInput, setCurrentPlaygroundInput] = useState('');
  const [playgroundChatHistory, setPlaygroundChatHistory] = useState<PlaygroundMessage[]>([]);
  const [isLoadingPlaygroundSuggestion, setIsLoadingPlaygroundSuggestion] = useState(false);

  const { toast } = useToast();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessageUi[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaygroundMode, setIsPlaygroundMode] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const playgroundMessagesEndRef = useRef<HTMLDivElement>(null);
  const unsubscribeChatRef = useRef<(() => void) | null>(null);

  // AI Agent Settings State & Form
  const [isAiSettingsDialogOpen, setIsAiSettingsDialogOpen] = useState(false);
  const [isLoadingAiSettings, setIsLoadingAiSettings] = useState(true);
  const [isSavingAiSettings, setIsSavingAiSettings] = useState(false);
  const aiSettingsForm = useForm<AiSettingsFormValues>({
    resolver: zodResolver(AiSettingsFormSchema),
    defaultValues: DEFAULT_AI_SETTINGS,
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
      await setDoc(settingsDocRef, { ...dataToSave, updatedAt: serverTimestamp() }, { merge: true });
      toast({ title: "Sukses", description: "Pengaturan Agen AI berhasil disimpan." });
      // Keep dialog open for KB management, do not setIsAiSettingsDialogOpen(false);
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
      setKbEntryToDelete(null); // Close the alert dialog
    } catch (error) {
      console.error("Error deleting Knowledge Base entry: ", error);
      toast({ title: "Error", description: "Gagal menghapus entri Knowledge Base.", variant: "destructive" });
    } finally {
      setIsSubmittingKbEntry(false);
    }
  };


  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isPlaygroundMode && selectedCustomer && chatHistory.length > 0) {
      scrollToBottom(messagesEndRef);
    }
  }, [chatHistory, selectedCustomer, isPlaygroundMode]);

  useEffect(() => {
    if (isPlaygroundMode && playgroundChatHistory.length > 0) {
      scrollToBottom(playgroundMessagesEndRef);
    }
  }, [playgroundChatHistory, isPlaygroundMode]);


  const fetchCustomers = useCallback(async (): Promise<Customer[]> => {
    console.log("Fetching actual customers from Firestore...");
    try {
      const clientsCollectionRef = collection(db, 'clients');
      const q = query(clientsCollectionRef, orderBy("name"));
      const querySnapshot = await getFirestoreDocs(q);
      const clientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));

      return clientsData.map(client => ({
        id: client.id,
        name: client.name,
        avatarUrl: client.photoUrl || `https://placehold.co/40x40.png?text=${client.name.charAt(0)}`,
        lastMessageTimestamp: client.lastVisit || 'N/A',
        lastMessage: 'Klik untuk melihat chat...',
        unreadCount: 0,
        phone: client.phone,
      }));
    } catch (error) {
      console.error("Error fetching customers from Firestore: ", error);
      toast({
        title: "Error Database",
        description: "Gagal mengambil daftar pelanggan dari database.",
        variant: "destructive",
      });
      return [];
    }
  }, [toast]);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoadingCustomers(true);
      try {
        const fetchedCustomers = await fetchCustomers();
        setCustomers(fetchedCustomers);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoadingCustomers(false);
      }
    };
    loadInitialData();
  }, [fetchCustomers]);

  useEffect(() => {
    if (unsubscribeChatRef.current) {
      unsubscribeChatRef.current();
      unsubscribeChatRef.current = null;
    }

    if (selectedCustomer && !isPlaygroundMode) {
      const phoneToQuery = formatPhoneNumberForMatching(selectedCustomer.phone);

      if (phoneToQuery) {
        const messagesRef = collection(db, 'directMessages');
        const q = query(
          messagesRef,
          where("senderNumber", "==", phoneToQuery),
          orderBy("timestamp", "asc")
        );

        unsubscribeChatRef.current = onSnapshot(q, (querySnapshot) => {
          const history: ChatMessageUi[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as DirectMessage;
            history.push({
              ...data,
              id: doc.id,
              timestamp: data.timestamp?.toDate().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) || 'N/A',
            });
          });
          setChatHistory(history);
        }, (error) => {
          console.error(`Error fetching real-time chat for ${selectedCustomer.name} (phone: ${phoneToQuery}):`, error);
          toast({
            title: "Error Real-time Chat",
            description: "Gagal memuat pesan secara real-time.",
            variant: "destructive",
          });
        });
      } else {
        setChatHistory([]);
        if (selectedCustomer.phone) {
          console.warn(`Nomor telepon pelanggan "${selectedCustomer.name}" (${selectedCustomer.phone}) tidak valid atau tidak dapat diformat untuk query.`);
           toast({ title: "Info Pelanggan", description: `Nomor HP ${selectedCustomer.name} (${selectedCustomer.phone}) tidak dapat diformat, riwayat chat mungkin tidak tampil.`, variant: "default"});
        }
      }
    } else {
      setChatHistory([]);
    }

    return () => {
      if (unsubscribeChatRef.current) {
        unsubscribeChatRef.current();
      }
    };
  }, [selectedCustomer, toast, isPlaygroundMode]);


  const handleSelectPlayground = () => {
    setIsPlaygroundMode(true);
    setSelectedCustomer(null);
    setCustomerMessageInput('');
    setCurrentPlaygroundInput('');
    setPlaygroundChatHistory([]);
    if (unsubscribeChatRef.current) {
      unsubscribeChatRef.current();
      unsubscribeChatRef.current = null;
    }
  };

  const handleCustomerSelect = async (customer: Customer) => {
    setIsPlaygroundMode(false);
    setSelectedCustomer(customer);
    setCustomerMessageInput('');
  };

  const handleSendPlaygroundMessage = async () => {
    if (!currentPlaygroundInput.trim()) {
      toast({
        title: "Input Kosong",
        description: "Mohon masukkan pertanyaan untuk AI.",
        variant: "destructive",
      });
      return;
    }

    const userMessageText = currentPlaygroundInput.trim();
    const userMessage: PlaygroundMessage = {
      id: uuidv4(),
      sender: 'user',
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedPlaygroundHistory = [...playgroundChatHistory, userMessage];
    setPlaygroundChatHistory(updatedPlaygroundHistory);
    setCurrentPlaygroundInput('');
    setIsLoadingPlaygroundSuggestion(true);

    const genkitChatHistory: ChatMessage[] = updatedPlaygroundHistory
      .slice(0, -1)
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        content: msg.text,
      }));

    try {
      const result: WhatsAppReplyOutput = await generateWhatsAppReply({
        customerMessage: userMessageText,
        chatHistory: genkitChatHistory,
      });

      const aiMessage: PlaygroundMessage = {
        id: uuidv4(),
        sender: 'ai',
        text: result.suggestedReply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        feedback: null,
        currentCorrectionText: result.suggestedReply,
      };
      setPlaygroundChatHistory(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error generating AI reply for playground:", error);
      const errorMessage: PlaygroundMessage = {
        id: uuidv4(),
        sender: 'ai',
        text: "Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi.",
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setPlaygroundChatHistory(prev => [...prev, errorMessage]);
      toast({
        title: "Error AI",
        description: "Gagal mendapatkan respon dari AI.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPlaygroundSuggestion(false);
    }
  };

  const handlePlaygroundKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendPlaygroundMessage();
    }
  };

  const handleSendMessage = async () => {
    const customerPhone = selectedCustomer?.phone;
    if (!customerMessageInput.trim() || !selectedCustomer || isPlaygroundMode || !customerPhone) {
        toast({
          title: "Tidak Dapat Mengirim",
          description: "Pesan kosong, pelanggan tidak dipilih, atau nomor HP pelanggan tidak tersedia.",
          variant: "destructive",
        });
        return;
    }
    
    const formattedPhoneForSending = formatPhoneNumberForMatching(customerPhone);
    if (!formattedPhoneForSending) {
        toast({
          title: "Nomor Tidak Valid",
          description: `Nomor HP pelanggan "${customerPhone}" tidak dapat diformat dengan benar untuk pengiriman.`,
          variant: "destructive",
        });
        return;
    }

    const textToSend = customerMessageInput.trim();
    const originalInput = customerMessageInput;
    setCustomerMessageInput('');
    setIsSendingWhatsApp(true);

    try {
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: formattedPhoneForSending, message: textToSend }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Pesan Terkirim ke WhatsApp",
          description: `Pesan Anda sedang dikirim ke ${selectedCustomer.name}.`,
        });

        const directMessagesRef = collection(db, 'directMessages');
        const csMessageData: Omit<DirectMessage, 'id'> = {
          customerId: selectedCustomer.id,
          customerName: selectedCustomer.name,
          senderNumber: formattedPhoneForSending,
          text: textToSend,
          sender: 'user',
          timestamp: serverTimestamp() as any,
          read: true,
        };
        await addDoc(directMessagesRef, csMessageData);
        console.log("CS manual reply saved to directMessages.");

        try {
            const lockResponse = await fetch('/api/whatsapp/set-intervention-lock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senderNumber: formattedPhoneForSending }),
            });
            const lockResult = await lockResponse.json();
            if (lockResponse.ok && lockResult.success) {
                console.log(`AI lock set for ${formattedPhoneForSending} via API call from UI.`);
            } else {
                console.warn(`Failed to set AI lock for ${formattedPhoneForSending} via API: ${lockResult.error}`);
            }
        } catch (lockError) {
            console.error(`Error calling set-intervention-lock API from UI:`, lockError);
        }

      } else {
        throw new Error(result.error || 'Gagal mengirim pesan via server lokal.');
      }
    } catch (error) {
      console.error("Error sending WhatsApp message or saving to DB:", error);
      toast({
        title: "Gagal Mengirim Pesan",
        description: error instanceof Error ? error.message : "Terjadi kesalahan.",
        variant: "destructive",
      });
      setCustomerMessageInput(originalInput);
    } finally {
      setIsSendingWhatsApp(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isPlaygroundMode && selectedCustomer) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSetManualLock = async () => {
    if (!selectedCustomer || !selectedCustomer.phone) {
      toast({ title: "Info", description: "Pilih pelanggan dengan nomor HP untuk mengaktifkan lock AI.", variant: "default" });
      return;
    }
    const formattedPhoneForLock = formatPhoneNumberForMatching(selectedCustomer.phone);
    if (!formattedPhoneForLock) {
      toast({ title: "Nomor Tidak Valid", description: `Nomor HP pelanggan "${selectedCustomer.phone}" tidak dapat diformat.`, variant: "destructive" });
      return;
    }

    setIsSendingWhatsApp(true);
    try {
      const response = await fetch('/api/whatsapp/set-intervention-lock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderNumber: formattedPhoneForLock }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        toast({ title: "Lock AI Aktif", description: `AI tidak akan merespons ${selectedCustomer.name} selama 1 jam.`, variant: "default" });
      } else {
        throw new Error(result.error || "Gagal mengaktifkan lock AI.");
      }
    } catch (error) {
      console.error("Error manually setting AI lock:", error);
      toast({ title: "Error Lock AI", description: error instanceof Error ? error.message : "Terjadi kesalahan.", variant: "destructive" });
    } finally {
      setIsSendingWhatsApp(false);
    }
  };

  const handlePlaygroundFeedback = (messageId: string, feedback: 'good' | 'bad') => {
    setPlaygroundChatHistory(prevHistory =>
      prevHistory.map(msg =>
        msg.id === messageId
          ? { ...msg, feedback, isEditingCorrection: feedback === 'bad' && !msg.correction, currentCorrectionText: msg.currentCorrectionText ?? msg.text }
          : msg
      )
    );
  };

  const handlePlaygroundCorrectionChange = (messageId: string, text: string) => {
    setPlaygroundChatHistory(prevHistory =>
      prevHistory.map(msg =>
        msg.id === messageId ? { ...msg, currentCorrectionText: text } : msg
      )
    );
  };

  const handleSavePlaygroundCorrection = (messageId: string) => {
    setPlaygroundChatHistory(prevHistory =>
      prevHistory.map(msg =>
        msg.id === messageId
          ? { ...msg, correction: msg.currentCorrectionText, isEditingCorrection: false }
          : msg
      )
    );
    toast({ title: "Koreksi Disimpan", description: "Feedback Anda telah dicatat.", variant: "default" });
  };


  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.phone && customer.phone.includes(searchTerm))
  );


  return (
    <div className="flex flex-col h-full bg-background">
      <AppHeader title="Asisten CS AI untuk WhatsApp" />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">

        {/* Kolom Daftar Pelanggan & Playground */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 border-r border-border bg-card flex flex-col">
          <CardHeader className="p-4">
            <CardTitle className="text-lg flex items-center">
              <User className="mr-2 h-5 w-5" /> Daftar Pelanggan
            </CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari pelanggan (nama/HP)..."
                className="pl-8 w-full h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>

          <div
            key="ai-playground"
            className={cn(
              "p-3 hover:bg-muted cursor-pointer border-b border-t border-border",
              isPlaygroundMode ? 'bg-accent text-accent-foreground' : ''
            )}
            onClick={handleSelectPlayground}
          >
            <div className="flex items-center space-x-3">
              <Avatar className={cn(
                "h-9 w-9 flex items-center justify-center",
                isPlaygroundMode ? "bg-accent-foreground text-accent" : "bg-primary/10 text-primary"
              )}>
                <Bot className="h-5 w-5" />
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">AI Playground</p>
                <p className="text-xs text-muted-foreground truncate">Uji coba AI tanpa pelanggan.</p>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-grow">
            <CardContent className="p-0">
              {loadingCustomers ? (
                <div className="p-4 text-center text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto my-4" />
                  Memuat pelanggan...
                </div>
              ) : filteredCustomers.length === 0 && searchTerm ? (
                 <p className="p-4 text-center text-muted-foreground">
                  Pelanggan tidak ditemukan.
                 </p>
              ) : filteredCustomers.length === 0 && !searchTerm ? (
                 <p className="p-4 text-center text-muted-foreground">
                  Belum ada pelanggan.
                 </p>
              ): (
                filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className={`p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0 ${selectedCustomer?.id === customer.id && !isPlaygroundMode ? 'bg-accent/20' : ''}`}
                    onClick={() => handleCustomerSelect(customer)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={customer.avatarUrl} alt={customer.name} data-ai-hint="avatar pelanggan" />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{customer.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{customer.phone || 'No HP tidak ada'}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </ScrollArea>
        </div>

        {/* Kolom Chat atau Playground View & AI Settings Button */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col bg-background p-4 space-y-4 overflow-y-auto">
          {isPlaygroundMode ? (
            <>
              <Card className="flex-shrink-0">
                <CardHeader className="p-4 border-b">
                  <CardTitle className="text-lg flex items-center"><Bot className="mr-2 h-6 w-6 text-primary" /> AI Playground</CardTitle>
                  <CardDescription>Uji coba langsung kemampuan AI. Berikan feedback untuk membantu AI belajar.</CardDescription>
                </CardHeader>
                <ScrollArea className="h-[400px] p-4 space-y-4"> {/* Fixed height for chat */}
                  {playgroundChatHistory.map((message) => (
                    <div key={message.id}>
                      <div
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/80' : 'text-secondary-foreground/80'} text-right`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                      {message.sender === 'ai' && (
                        <div className="flex justify-start mt-1.5 ml-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-7 w-7 hover:bg-green-100 dark:hover:bg-green-800", message.feedback === 'good' && "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300")}
                            onClick={() => handlePlaygroundFeedback(message.id, 'good')}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-7 w-7 ml-1 hover:bg-red-100 dark:hover:bg-red-800", message.feedback === 'bad' && "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300")}
                            onClick={() => handlePlaygroundFeedback(message.id, 'bad')}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {message.sender === 'ai' && message.feedback === 'bad' && message.isEditingCorrection && !message.correction && (
                        <div className="mt-2 ml-1 space-y-2 max-w-md">
                          <Textarea
                            placeholder="Tulis koreksi Anda di sini..."
                            value={message.currentCorrectionText || ''}
                            onChange={(e) => handlePlaygroundCorrectionChange(message.id, e.target.value)}
                            rows={3}
                            className="text-sm bg-background"
                          />
                          <Button size="sm" onClick={() => handleSavePlaygroundCorrection(message.id)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                            <Edit2 className="mr-2 h-4 w-4" /> Simpan Koreksi
                          </Button>
                        </div>
                      )}
                      {message.sender === 'ai' && message.correction && (
                        <Card className="mt-2 ml-1 p-3 border-green-500 bg-green-50 dark:bg-green-900/30 max-w-md">
                          <p className="text-xs font-medium text-green-700 dark:text-green-300">Koreksi Anda:</p>
                          <p className="text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap">{message.correction}</p>
                        </Card>
                      )}
                    </div>
                  ))}
                  {playgroundChatHistory.length === 0 && (
                      <p className="text-center text-muted-foreground py-10">Mulai percakapan dengan AI di bawah.</p>
                  )}
                  <div ref={playgroundMessagesEndRef} />
                </ScrollArea>
                <Separator />
                <CardFooter className="p-4">
                  <div className="flex items-end space-x-2 w-full">
                    <Textarea
                      id="playground-chat-input"
                      placeholder="Ketik pertanyaan atau skenario Anda..."
                      value={currentPlaygroundInput}
                      onChange={(e) => setCurrentPlaygroundInput(e.target.value)}
                      onKeyDown={handlePlaygroundKeyDown}
                      rows={2}
                      disabled={isLoadingPlaygroundSuggestion}
                      className="bg-background flex-1 resize-none"
                    />
                    <Button
                      size="icon"
                      onClick={handleSendPlaygroundMessage}
                      disabled={isLoadingPlaygroundSuggestion || !currentPlaygroundInput.trim()}
                      className="h-10 w-10 shrink-0"
                      aria-label="Kirim Pesan ke AI"
                    >
                      {isLoadingPlaygroundSuggestion ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </>
          ) : !selectedCustomer ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <MessageSquareText className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Pilih pelanggan untuk memulai percakapan</p>
              <p className="text-sm text-muted-foreground">atau masuk ke mode Playground AI dari daftar di samping.</p>
            </div>
          ) : (
            <>
              <Card className="flex-shrink-0">
                <CardHeader className="p-4 border-b">
                  <div className="flex justify-between items-center">
                      <div>
                          <CardTitle className="text-lg flex items-center">
                          Percakapan dengan: {selectedCustomer.name}
                          </CardTitle>
                          <CardDescription>{selectedCustomer.phone || "Nomor HP tidak tersedia"}</CardDescription>
                      </div>
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSetManualLock}
                          disabled={isSendingWhatsApp || !selectedCustomer.phone}
                          title="Aktifkan lock AI selama 1 jam (jika Anda baru balas dari HP)"
                      >
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          Ambil Alih (Lock AI 1 Jam)
                      </Button>
                  </div>
                </CardHeader>
                <ScrollArea className="h-[400px] p-4 space-y-4">
                  {chatHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow ${
                          message.sender === 'customer'
                            ? 'bg-muted text-muted-foreground'
                            : message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'customer' ? 'text-muted-foreground/80'
                          : message.sender === 'user' ? 'text-primary-foreground/80'
                          : 'text-secondary-foreground/80'
                          } text-right`}>
                          {message.timestamp} {message.sender === 'ai' && '(AI Otomatis)'}
                        </p>
                      </div>
                    </div>
                  ))}
                  {chatHistory.length === 0 && (
                      <p className="text-center text-muted-foreground py-10">Belum ada riwayat chat untuk pelanggan ini.</p>
                  )}
                  <div ref={messagesEndRef} />
                </ScrollArea>
                <Separator />
                <Card className="rounded-none border-0 border-t shadow-none">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center">
                      <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                      Balas Pesan Pelanggan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-end space-x-2">
                      <Textarea
                        id="customer-message-input"
                        placeholder="Ketik balasan Anda di sini..."
                        value={customerMessageInput}
                        onChange={(e) => setCustomerMessageInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={3}
                        disabled={isSendingWhatsApp || !selectedCustomer?.phone}
                        className="bg-background flex-1 resize-none"
                      />
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={isSendingWhatsApp || !customerMessageInput.trim() || !selectedCustomer?.phone}
                        className="h-10 w-10 shrink-0"
                        aria-label="Kirim Pesan Manual"
                      >
                        {isSendingWhatsApp ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      </Button>
                    </div>
                    {!selectedCustomer?.phone && (
                          <p className="text-xs text-destructive mt-1">Nomor HP pelanggan tidak tersedia untuk pengiriman WhatsApp.</p>
                        )}
                  </CardContent>
                </Card>
              </Card>
            </>
          )}
          
          {/* AI Settings Dialog Trigger */}
          <div className="mt-auto p-4 flex justify-start">
            <Dialog open={isAiSettingsDialogOpen} onOpenChange={setIsAiSettingsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" /> Pengaturan Agen & Knowledge Base AI
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
                <Card className="shadow-none border-none">
                  <CardHeader className="p-6 sticky top-0 bg-background/95 backdrop-blur z-10 border-b">
                    <CardTitle className="flex items-center"><BrainCircuit className="mr-2 h-5 w-5 text-primary" />Pengaturan Agen & Knowledge Base AI</CardTitle>
                    <CardDescription>Konfigurasi perilaku agen AI dan kelola sumber pengetahuan di halaman ini.</CardDescription>
                  </CardHeader>
                  
                  <Tabs defaultValue="agent-settings" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 m-6 mb-0">
                      <TabsTrigger value="agent-settings">Pengaturan Agen AI</TabsTrigger>
                      <TabsTrigger value="knowledge-base">Manajemen Knowledge Base</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="agent-settings">
                      <Form {...aiSettingsForm}>
                        <form onSubmit={aiSettingsForm.handleSubmit(handleSaveAiAgentSettings)}>
                          <CardContent className="p-6 space-y-6">
                            {isLoadingAiSettings ? (
                                <div className="flex items-center space-x-2">
                                  <Loader2 className="h-5 w-5 animate-spin" />
                                  <span>Memuat pengaturan AI...</span>
                                </div>
                            ) : (
                              <>
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
                          <CardFooter className="p-6 sticky bottom-0 bg-background/95 backdrop-blur z-10 border-t">
                            <Button type="submit" disabled={isSavingAiSettings || isLoadingAiSettings}>
                              {isSavingAiSettings ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                              Simpan Pengaturan Agen AI
                            </Button>
                          </CardFooter>
                        </form>
                      </Form>
                    </TabsContent>

                    <TabsContent value="knowledge-base">
                        <CardContent className="p-6 space-y-4">
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
                    </TabsContent>
                  </Tabs>
                  
                  {/* Dialog untuk Form Knowledge Base */}
                  <Dialog open={isKbFormDialogOpen} onOpenChange={(isOpen) => {
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

                </Card>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

