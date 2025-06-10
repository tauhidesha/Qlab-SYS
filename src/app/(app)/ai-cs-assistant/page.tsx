
"use client";

import React, { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, MessageSquareText, Sparkles, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateWhatsAppReply, type WhatsAppReplyInput, type WhatsAppReplyOutput } from '@/ai/flows/cs-whatsapp-reply-flow';

export default function AiCsAssistantPage() {
  const [customerMessage, setCustomerMessage] = useState('');
  const [suggestedReply, setSuggestedReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetSuggestion = async () => {
    if (!customerMessage.trim()) {
      toast({
        title: "Input Kosong",
        description: "Mohon masukkan pesan pelanggan terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSuggestedReply('');
    try {
      const input: WhatsAppReplyInput = { customerMessage };
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
      setIsLoading(false);
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

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Asisten CS AI untuk WhatsApp" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquareText className="mr-2 h-6 w-6 text-primary" />
              Buat Draf Balasan WhatsApp dengan AI
            </CardTitle>
            <CardDescription>
              Tempelkan pesan WhatsApp dari pelanggan di bawah ini, dan AI akan membantu Anda membuat draf balasan yang sopan dan profesional.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="customer-message">Pesan dari Pelanggan:</Label>
              <Textarea
                id="customer-message"
                placeholder="Contoh: 'Halo QLAB, mau tanya untuk paket detailing motor Vario berapa ya biayanya dan berapa lama pengerjaannya?'"
                value={customerMessage}
                onChange={(e) => setCustomerMessage(e.target.value)}
                rows={5}
                disabled={isLoading}
              />
            </div>
            <Button onClick={handleGetSuggestion} disabled={isLoading || !customerMessage.trim()} className="w-full sm:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Dapatkan Saran Balasan AI
            </Button>

            {suggestedReply && !isLoading && (
              <div className="space-y-2 pt-4">
                <Label htmlFor="suggested-reply" className="flex items-center text-lg font-semibold">
                  <Sparkles className="mr-2 h-5 w-5 text-accent" /> Saran Balasan dari AI:
                </Label>
                <Card className="bg-muted/50 p-4">
                  <Textarea
                    id="suggested-reply"
                    value={suggestedReply}
                    readOnly
                    rows={8}
                    className="border-dashed bg-background"
                  />
                </Card>
                <Button onClick={handleCopyReply} variant="outline" size="sm" className="mt-2">
                  <Copy className="mr-2 h-4 w-4" /> Salin Balasan
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Selalu periksa kembali saran dari AI sebelum mengirimkannya ke pelanggan. AI adalah alat bantu, keputusan akhir ada di tangan Anda.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
