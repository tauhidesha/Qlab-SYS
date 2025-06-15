
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, MessageSquareText, Sparkles, Copy, Send, User, Search, Bot, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateWhatsAppReply, type WhatsAppReplyInput, type WhatsAppReplyOutput } from '@/ai/flows/cs-whatsapp-reply-flow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, type Timestamp } from 'firebase/firestore';
import type { Client } from '@/types/client';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  sender: 'user' | 'customer';
  text: string;
  timestamp: string;
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

export default function AiCsAssistantPage() {
  const [customerMessageInput, setCustomerMessageInput] = useState('');
  // State untuk AI Playground
  const [playgroundInput, setPlaygroundInput] = useState('');
  const [playgroundReply, setPlaygroundReply] = useState('');
  const [isLoadingPlaygroundSuggestion, setIsLoadingPlaygroundSuggestion] = useState(false);

  const { toast } = useToast();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaygroundMode, setIsPlaygroundMode] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isPlaygroundMode && selectedCustomer && chatHistory.length > 0) {
      scrollToBottom();
    }
  }, [chatHistory, selectedCustomer, isPlaygroundMode]);


  const fetchCustomers = async (): Promise<Customer[]> => {
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
  };

  const fetchChatHistory = async (customerId: string): Promise<ChatMessage[]> => {
    console.log(`Fetching chat history for customer ${customerId} (placeholder)...`);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const customerName = customers.find(c => c.id === customerId)?.name;

    if (customerName?.toLowerCase().includes("rina")) {
      return [
        { id: 'chat1', sender: 'customer', text: 'Halo, motor saya kok suaranya kasar ya setelah servis kemarin?', timestamp: '10:25' },
        { id: 'chat2', sender: 'user', text: `Halo Kak ${customerName || 'Rina'}, bisa dijelaskan lebih detail kasarnya seperti apa?`, timestamp: '10:26' },
        { id: 'chat3', sender: 'customer', text: 'Seperti ada suara "grek grek grek" gitu pas digas awal.', timestamp: '10:28' },
      ];
    } else if (customerName?.toLowerCase().includes("bambang")) {
      return [
        { id: 'chat4', sender: 'customer', text: `Terima kasih banyak ya QLAB, motor saya jadi kinclong lagi!`, timestamp: 'Kemarin' },
      ];
    }
    return [ { id: 'chat_default', sender: 'customer', text: `Halo ${customerName || 'Pelanggan'}, ada yang bisa dibantu?`, timestamp: 'Baru saja'} ];
  };

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectPlayground = () => {
    setIsPlaygroundMode(true);
    setSelectedCustomer(null);
    setChatHistory([]);
    setCustomerMessageInput(''); 
    setPlaygroundInput('');
    setPlaygroundReply('');
  };

  const handleCustomerSelect = async (customer: Customer) => {
    setIsPlaygroundMode(false); 
    setSelectedCustomer(customer);
    setCustomerMessageInput('');
    const history = await fetchChatHistory(customer.id);
    setChatHistory(history);
  };

  const handleGetPlaygroundSuggestion = async () => {
    if (!playgroundInput.trim()) {
      toast({
        title: "Input Kosong",
        description: "Mohon masukkan skenario atau pertanyaan untuk AI.",
        variant: "destructive",
      });
      return;
    }
    setIsLoadingPlaygroundSuggestion(true);
    setPlaygroundReply('');
    try {
      const input: WhatsAppReplyInput = { 
        customerMessage: playgroundInput.trim(),
      };
      const result: WhatsAppReplyOutput = await generateWhatsAppReply(input);
      setPlaygroundReply(result.suggestedReply);
      toast({
        title: "Respon AI Dihasilkan!",
        description: "AI telah merespons input Anda.",
      });
    } catch (error) {
      console.error("Error generating AI reply for playground:", error);
      toast({
        title: "Error AI",
        description: "Gagal mendapatkan respon dari AI. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPlaygroundSuggestion(false);
    }
  };
  
  const handleCopyPlaygroundReply = () => {
    if (!playgroundReply) {
      toast({
        title: "Tidak Ada Respons",
        description: "Tidak ada respons AI untuk disalin.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(playgroundReply)
      .then(() => {
        toast({
          title: "Respons Disalin!",
          description: "Respons AI telah disalin ke clipboard.",
        });
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Gagal Menyalin",
          description: "Tidak dapat menyalin teks ke clipboard.",
          variant: "destructive",
        });
      });
  };


  const handleSendMessage = async () => {
    if (!customerMessageInput.trim() || !selectedCustomer || isPlaygroundMode) return;
    
    const textToSend = customerMessageInput.trim();
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory(prev => [...prev, newMessage]);
    setCustomerMessageInput(''); 

    if (!selectedCustomer.phone) {
      toast({
        title: "Info Tidak Lengkap",
        description: "Nomor HP pelanggan tidak tersedia untuk pengiriman WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    setIsSendingWhatsApp(true);
    try {
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: selectedCustomer.phone, message: textToSend }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        toast({
          title: "Pesan Terkirim",
          description: `Pesan Anda telah dikirim ke ${selectedCustomer.name}.`,
        });
      } else {
        throw new Error(result.error || 'Gagal mengirim pesan via server lokal.');
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      toast({
        title: "Gagal Mengirim Pesan",
        description: error instanceof Error ? error.message : "Terjadi kesalahan.",
        variant: "destructive",
      });
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

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="flex flex-col h-full bg-background">
      <AppHeader title="Asisten CS AI untuk WhatsApp" />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
        
        <div className="col-span-1 md:col-span-1 lg:col-span-1 border-r border-border bg-card flex flex-col">
          <CardHeader className="p-4">
            <CardTitle className="text-lg flex items-center">
              <User className="mr-2 h-5 w-5" /> Daftar Pelanggan
            </CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari pelanggan..."
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
                        <p className="text-xs text-muted-foreground truncate">{customer.lastMessage}</p>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        {customer.lastMessageTimestamp}
                        {customer.unreadCount > 0 && (
                          <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-destructive-foreground bg-destructive rounded-full">
                            {customer.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </ScrollArea>
        </div>

        
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col bg-background">
          {isPlaygroundMode ? (
            <>
              <div className="p-4 border-b bg-card">
                <h2 className="text-xl font-semibold flex items-center"><Bot className="mr-2 h-6 w-6 text-primary" /> AI Playground</h2>
                <p className="text-sm text-muted-foreground">Uji coba langsung kemampuan AI untuk berbagai skenario.</p>
              </div>
              <ScrollArea className="flex-1 p-4 space-y-4 bg-card/50">
                  <p className="text-center text-muted-foreground py-10">Masukkan pertanyaan atau skenario Anda di bawah dan dapatkan respons dari AI.</p>
              </ScrollArea>
              <Separator />
              <Card className="rounded-none border-0 border-t shadow-none">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-accent" />
                    Interaksi dengan AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="playground-input">Masukkan Pertanyaan/Skenario Anda:</Label>
                    <Textarea
                      id="playground-input"
                      placeholder="Contoh: Buatkan saya email penawaran diskon untuk layanan detailing motor..."
                      value={playgroundInput}
                      onChange={(e) => setPlaygroundInput(e.target.value)}
                      rows={5}
                      disabled={isLoadingPlaygroundSuggestion}
                      className="bg-background"
                    />
                  </div>
                  <Button onClick={handleGetPlaygroundSuggestion} disabled={isLoadingPlaygroundSuggestion} className="w-full sm:w-auto">
                    {isLoadingPlaygroundSuggestion ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Minta Respon AI
                  </Button>

                  {playgroundReply && !isLoadingPlaygroundSuggestion && (
                    <div className="space-y-2 pt-3">
                      <Label htmlFor="ai-response" className="flex items-center text-md font-semibold">
                        Respons AI:
                      </Label>
                      <Card className="bg-muted/80 p-3 shadow-sm">
                        <Textarea
                          id="ai-response"
                          value={playgroundReply}
                          readOnly
                          rows={8}
                          className="border-dashed bg-background"
                        />
                      </Card>
                      <Button onClick={handleCopyPlaygroundReply} variant="outline" size="sm" className="mt-2">
                        <Copy className="mr-2 h-4 w-4" /> Salin Respons
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 border-t">
                    <p className="text-xs text-muted-foreground">
                    Mode playground: AI akan mencoba menjawab berdasarkan input Anda saja.
                    </p>
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
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/80' : 'text-muted-foreground/80'} text-right`}>
                        {message.timestamp}
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
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="customer-message-input">Ketik balasan Anda:</Label>
                    <div className="flex items-end space-x-2">
                      <Textarea
                        id="customer-message-input"
                        placeholder="Ketik pesan Anda di sini..."
                        value={customerMessageInput}
                        onChange={(e) => setCustomerMessageInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={3}
                        disabled={isSendingWhatsApp}
                        className="bg-background flex-1 resize-none"
                      />
                      <Button 
                        size="icon" 
                        onClick={handleSendMessage}
                        disabled={isSendingWhatsApp || !customerMessageInput.trim()}
                        className="h-10 w-10 shrink-0"
                        aria-label="Kirim Pesan Manual"
                      >
                        {isSendingWhatsApp ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      </Button>
                    </div>
                     {!selectedCustomer?.phone && (
                         <p className="text-xs text-destructive mt-1">Nomor HP pelanggan tidak tersedia untuk pengiriman WhatsApp.</p>
                       )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
    
