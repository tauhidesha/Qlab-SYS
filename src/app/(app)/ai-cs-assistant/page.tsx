
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, MessageSquareText, Sparkles, Copy, Send, User, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateWhatsAppReply, type WhatsAppReplyInput, type WhatsAppReplyOutput } from '@/ai/flows/cs-whatsapp-reply-flow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, type Timestamp } from 'firebase/firestore';
import type { Client } from '@/types/client';

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
}

export default function AiCsAssistantPage() {
  const [customerMessageInput, setCustomerMessageInput] = useState('');
  const [suggestedReply, setSuggestedReply] = useState('');
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  const { toast } = useToast();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomers = async (): Promise<Customer[]> => {
    console.log("Fetching actual customers from Firestore...");
    try {
      const clientsCollectionRef = collection(db, 'clients');
      const q = query(clientsCollectionRef, orderBy("name"));
      const querySnapshot = await getDocs(q);
      const clientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
      
      // Map Firestore Client data to local Customer type
      return clientsData.map(client => ({
        id: client.id,
        name: client.name,
        avatarUrl: `https://placehold.co/40x40.png?text=${client.name.charAt(0)}`, // Placeholder avatar
        lastMessageTimestamp: client.lastVisit || 'N/A', // Using lastVisit as placeholder
        lastMessage: 'Klik untuk melihat chat...', // Placeholder
        unreadCount: 0, // Placeholder
      }));
    } catch (error) {
      console.error("Error fetching customers from Firestore: ", error);
      toast({
        title: "Error Database",
        description: "Gagal mengambil daftar pelanggan dari database.",
        variant: "destructive",
      });
      return []; // Return empty array on error
    }
  };

  const fetchChatHistory = async (customerId: string): Promise<ChatMessage[]> => {
    // Placeholder: Replace with actual data fetching logic for chat history
    console.log(`Fetching chat history for customer ${customerId} (placeholder)...`);
    await new Promise(resolve => setTimeout(resolve, 300));
    // Simulate different chat histories based on customer ID
    if (customerId === '1' || customers.find(c=>c.id === customerId)?.name.includes("Budi")) {
      return [
        { id: 'chat1', sender: 'customer', text: 'Halo, motor saya kok suaranya kasar ya setelah servis kemarin?', timestamp: '10:25' },
        { id: 'chat2', sender: 'user', text: 'Halo Kak Budi, bisa dijelaskan lebih detail kasarnya seperti apa?', timestamp: '10:26' },
        { id: 'chat3', sender: 'customer', text: 'Seperti ada suara "grek grek grek" gitu pas digas awal.', timestamp: '10:28' },
      ];
    } else if (customerId === '2' || customers.find(c=>c.id === customerId)?.name.includes("Citra")) {
      return [
        { id: 'chat4', sender: 'customer', text: 'Terima kasih banyak ya QLAB, motor saya jadi kinclong lagi!', timestamp: 'Kemarin' },
      ];
    }
    return [ { id: 'chat_default', sender: 'customer', text: 'Ada yang bisa dibantu?', timestamp: 'Baru saja'} ];
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoadingCustomers(true);
      try {
        const fetchedCustomers = await fetchCustomers();
        setCustomers(fetchedCustomers);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        toast({ title: "Error", description: "Gagal memuat daftar pelanggan.", variant: "destructive" });
      } finally {
        setLoadingCustomers(false);
      }
    };
    loadInitialData();
  }, [toast]);

  const handleCustomerSelect = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setSuggestedReply(''); 
    setCustomerMessageInput(''); // Clear input when customer changes
    // TODO: Fetch actual chat history for the selected customer
    const history = await fetchChatHistory(customer.id);
    setChatHistory(history);
  };

  const handleGetSuggestion = async () => {
    if (!customerMessageInput.trim() && chatHistory.length === 0) {
      toast({
        title: "Input Kosong",
        description: "Mohon masukkan pesan pelanggan atau pastikan ada riwayat chat.",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingSuggestion(true);
    setSuggestedReply('');
    try {
      // Construct chat history string for the AI
      const historyString = chatHistory.map(msg => `${msg.sender === 'user' ? 'Anda' : 'Pelanggan'}: ${msg.text}`).join('\n');
      
      const input: WhatsAppReplyInput = { 
        customerMessage: customerMessageInput || (chatHistory.length > 0 ? chatHistory[chatHistory.length -1].text : "Tolong bantu saya."), // Use last customer message if input is empty
        chatHistory: historyString || undefined 
      };
      
      const result: WhatsAppReplyOutput = await generateWhatsAppReply(input);
      setSuggestedReply(result.suggestedReply);
      toast({
        title: "Saran Dihasilkan!",
        description: "AI telah membuat draf balasan untuk Anda.",
      });
    } catch (error) {
      console.error("Error generating AI reply:", error);
      toast({
        title: "Error AI",
        description: "Gagal mendapatkan saran balasan dari AI. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSuggestion(false);
    }
  };

  const handleCopyReply = () => {
    if (!suggestedReply) {
      toast({
        title: "Tidak Ada Balasan",
        description: "Tidak ada teks balasan untuk disalin.",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(suggestedReply)
      .then(() => {
        toast({
          title: "Teks Disalin!",
          description: "Saran balasan telah disalin ke clipboard.",
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

  const handleSendMessage = () => {
    if (!customerMessageInput.trim() || !selectedCustomer) return;
    // Simulate sending message and adding to chat history
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user', // Assuming the CS is the user here
      text: customerMessageInput,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory(prev => [...prev, newMessage]);
    // Potentially, after sending, you might want to get an AI suggestion for the NEXT reply
    // For now, just clear the input
    setCustomerMessageInput('');
    // Or, if you want to automatically get a suggestion for customer's *next* potential message
    // handleGetSuggestion(); // This would use the new message as context if logic is adjusted
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="flex flex-col h-full bg-background">
      <AppHeader title="Asisten CS AI untuk WhatsApp" />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
        {/* Customer List Sidebar */}
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
          <ScrollArea className="flex-grow">
            <CardContent className="p-0">
              {loadingCustomers ? (
                <div className="p-4 text-center text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto my-4" />
                  Memuat pelanggan...
                </div>
              ) : filteredCustomers.length === 0 ? (
                 <p className="p-4 text-center text-muted-foreground">
                  {searchTerm ? "Pelanggan tidak ditemukan." : "Belum ada pelanggan."}
                 </p>
              ) : (
                filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className={`p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0 ${selectedCustomer?.id === customer.id ? 'bg-accent/20' : ''}`}
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

        {/* Chat and AI Suggestion Area */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col bg-background">
          {!selectedCustomer ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <MessageSquareText className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Pilih pelanggan untuk memulai percakapan</p>
              <p className="text-sm text-muted-foreground">atau lihat/lanjutkan riwayat chat mereka.</p>
            </div>
          ) : (
            <>
              {/* Chat History Display */}
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
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/80' : 'text-muted-foreground/80'} text-right`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                {chatHistory.length === 0 && (
                    <p className="text-center text-muted-foreground py-10">Belum ada riwayat chat untuk pelanggan ini.</p>
                )}
              </ScrollArea>
              
              <Separator />

              {/* AI Suggestion Area */}
              <Card className="rounded-none border-0 border-t shadow-none">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-accent" />
                    Bantuan Balasan AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="customer-message-input">Tulis Pesan Pelanggan (jika baru) / Konteks Tambahan:</Label>
                    <Textarea
                      id="customer-message-input"
                      placeholder="Tempel pesan terakhir pelanggan di sini, atau tambahkan konteks untuk AI..."
                      value={customerMessageInput}
                      onChange={(e) => setCustomerMessageInput(e.target.value)}
                      rows={3}
                      disabled={isLoadingSuggestion}
                      className="bg-background"
                    />
                  </div>
                  <Button onClick={handleGetSuggestion} disabled={isLoadingSuggestion || !selectedCustomer} className="w-full sm:w-auto">
                    {isLoadingSuggestion ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Dapatkan Saran Balasan dari AI
                  </Button>

                  {suggestedReply && !isLoadingSuggestion && (
                    <div className="space-y-2 pt-3">
                      <Label htmlFor="suggested-reply" className="flex items-center text-md font-semibold">
                        Saran Balasan:
                      </Label>
                      <Card className="bg-muted/80 p-3 shadow-sm">
                        <Textarea
                          id="suggested-reply"
                          value={suggestedReply}
                          readOnly
                          rows={5}
                          className="border-dashed bg-background"
                        />
                      </Card>
                      <Button onClick={handleCopyReply} variant="outline" size="sm" className="mt-2">
                        <Copy className="mr-2 h-4 w-4" /> Salin Balasan
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 border-t">
                  <div className="flex w-full items-center space-x-2">
                    {/* 
                    <Input 
                      type="text" 
                      placeholder="Ketik balasan Anda atau gunakan saran AI..." 
                      value={userReplyInput} 
                      onChange={(e) => setUserReplyInput(e.target.value)}
                      className="flex-1 bg-background"
                    />
                    <Button onClick={handleSendMessage} disabled={!userReplyInput.trim()}>
                      <Send className="mr-2 h-4 w-4" /> Kirim
                    </Button>
                    */}
                     <p className="text-xs text-muted-foreground">
                        Selalu periksa kembali saran dari AI sebelum mengirimkannya.
                     </p>
                  </div>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

