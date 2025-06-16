
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, MessageSquareText, Sparkles, Copy, Send, User, Search, Bot, MessageCircle, ThumbsUp, ThumbsDown, Edit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateWhatsAppReply } from '@/ai/flows/cs-whatsapp-reply-flow';
import type { WhatsAppReplyOutput, ChatMessage } from '@/types/ai/cs-whatsapp-reply';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, type Timestamp, onSnapshot, addDoc, serverTimestamp, where, limit } from 'firebase/firestore';
import type { Client } from '@/types/client';
import type { DirectMessage } from '@/types/directMessage';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

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

function formatPhoneNumberForMatching(number: string): string {
  let cleaned = number.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8') && cleaned.length >= 9 && cleaned.length <= 13) {
    cleaned = '62' + cleaned;
  } else if (!cleaned.startsWith('62') && !(cleaned.length < 9)) {
     if (cleaned.length >= 9 && cleaned.length <=13 && !cleaned.startsWith('+')) {
        cleaned = '62' + cleaned;
    }
  }
  return cleaned;
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
      const querySnapshot = await getDocs(q);
      const clientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));

      return clientsData.map(client => ({
        id: client.id,
        name: client.name,
        avatarUrl: `https://placehold.co/40x40.png?text=${client.name.charAt(0)}`,
        lastMessageTimestamp: client.lastVisit || 'N/A',
        lastMessage: 'Klik untuk melihat chat...',
        unreadCount: 0,
        phone: client.phone ? formatPhoneNumberForMatching(client.phone) : undefined,
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

    if (selectedCustomer && selectedCustomer.phone && !isPlaygroundMode) {
      const formattedPhoneForQuery = selectedCustomer.phone; // Assumes phone is already formatted
      const messagesRef = collection(db, 'directMessages');
      const q = query(
        messagesRef,
        where("senderNumber", "==", formattedPhoneForQuery),
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
        console.error(`Error fetching real-time chat for ${selectedCustomer.name}:`, error);
        toast({
          title: "Error Real-time Chat",
          description: "Gagal memuat pesan secara real-time.",
          variant: "destructive",
        });
      });
    } else {
      setChatHistory([]); // Clear history if no customer selected or in playground mode
    }

    return () => {
      if (unsubscribeChatRef.current) {
        unsubscribeChatRef.current();
      }
    };
  }, [selectedCustomer, toast, isPlaygroundMode]);


  const handleSelectPlayground = () => {
    setIsPlaygroundMode(true);
    setSelectedCustomer(null); // Clear selected customer
    setCustomerMessageInput('');
    setCurrentPlaygroundInput('');
    setPlaygroundChatHistory([]);
    if (unsubscribeChatRef.current) {
      unsubscribeChatRef.current(); // Unsubscribe from any active customer chat
      unsubscribeChatRef.current = null;
    }
  };

  const handleCustomerSelect = async (customer: Customer) => {
    setIsPlaygroundMode(false); // Ensure not in playground mode
    setSelectedCustomer(customer);
    setCustomerMessageInput(''); // Clear any manual reply input
    // Chat history will be fetched by the useEffect hook for selectedCustomer
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
      .slice(0, -1) // Exclude the current user message for history
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        content: msg.text,
      }));

    try {
      const result: WhatsAppReplyOutput = await generateWhatsAppReply({
        customerMessage: userMessageText,
        chatHistory: genkitChatHistory,
        // senderNumber is not relevant for playground mode here
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

  const handleSendMessage = async () => { // For CS Agent manual reply
    if (!customerMessageInput.trim() || !selectedCustomer || isPlaygroundMode || !selectedCustomer.phone) {
        toast({
          title: "Tidak Dapat Mengirim",
          description: "Pesan kosong, pelanggan tidak dipilih, atau nomor HP pelanggan tidak tersedia.",
          variant: "destructive",
        });
        return;
    }

    const textToSend = customerMessageInput.trim();
    const originalInput = customerMessageInput; // Save for potential revert on error
    setCustomerMessageInput(''); // Clear input immediately
    setIsSendingWhatsApp(true);

    try {
      // 1. Send message via WhatsApp server
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: selectedCustomer.phone, message: textToSend }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Pesan Terkirim ke WhatsApp",
          description: `Pesan Anda sedang dikirim ke ${selectedCustomer.name}.`,
        });

        // 2. Save CS agent's message to Firestore directMessages
        const directMessagesRef = collection(db, 'directMessages');
        const csMessageData: Omit<DirectMessage, 'id'> = {
          customerId: selectedCustomer.id,
          customerName: selectedCustomer.name,
          senderNumber: selectedCustomer.phone, // The customer's number this message is directed to
          text: textToSend,
          sender: 'user', // Mark as sent by CS agent
          timestamp: serverTimestamp() as any, // Firestore server timestamp
          read: true, // Agent's own message is "read" by the system
        };
        await addDoc(directMessagesRef, csMessageData);
        console.log("CS manual reply saved to directMessages.");
        // UI will update automatically due to onSnapshot listener

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
      setCustomerMessageInput(originalInput); // Revert input on error
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

        {/* Customer List Pane */}
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

          {/* AI Playground Selector */}
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
          {/* End AI Playground Selector */}
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
                      {/* TODO: Add unread count badge if needed */}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </ScrollArea>
        </div>
        {/* End Customer List Pane */}

        {/* Chat/Playground Pane */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col bg-background">
          {isPlaygroundMode ? (
            // Playground Mode UI
            <>
              <CardHeader className="p-4 border-b bg-card">
                <CardTitle className="text-lg flex items-center"><Bot className="mr-2 h-6 w-6 text-primary" /> AI Playground</CardTitle>
                <CardDescription>Uji coba langsung kemampuan AI. Berikan feedback untuk membantu AI belajar.</CardDescription>
              </CardHeader>
              <ScrollArea className="flex-1 p-4 space-y-4 bg-card/50">
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
              <Card className="rounded-none border-0 border-t shadow-none">
                <CardContent className="p-4">
                  <div className="flex items-end space-x-2">
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
                </CardContent>
              </Card>
            </>
          ) : !selectedCustomer ? (
            // No customer selected UI
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <MessageSquareText className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Pilih pelanggan untuk memulai percakapan</p>
              <p className="text-sm text-muted-foreground">atau masuk ke mode Playground AI dari daftar di samping.</p>
            </div>
          ) : (
            // Customer Chat Mode UI
            <>
              <CardHeader className="p-4 border-b bg-card">
                <CardTitle className="text-lg flex items-center">
                   Percakapan dengan: {selectedCustomer.name}
                </CardTitle>
                <CardDescription>{selectedCustomer.phone || "Nomor HP tidak tersedia"}</CardDescription>
              </CardHeader>
              <ScrollArea className="flex-1 p-4 space-y-4 bg-card/50">
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
                            : 'bg-secondary text-secondary-foreground' // AI reply
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
            </>
          )}
        </div>
        {/* End Chat/Playground Pane */}
      </div>
    </div>
  );
}

